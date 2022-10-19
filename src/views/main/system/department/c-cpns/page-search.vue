<template>
  <div class="search">
    <!-- 1.1.表单输入 -->
    <el-form :model="searchForm" ref="formRef" label-width="120px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入部门名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="searchForm.leader" placeholder="请输入部门领导" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 1.2.搜索按钮  -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="page-search">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

const emit = defineEmits(['queryClick', 'resetClick'])

// 1.创建表单的数据
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

// 2.监听按钮的点击
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;

  .el-form-item {
    padding: 20px 40px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
