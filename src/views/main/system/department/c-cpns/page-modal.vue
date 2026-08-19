<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建数据" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导名称" />
          </el-form-item>
          <el-form-item label="上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级" style="width: 100%">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="modal">
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import type { PageRecord } from '@/types/page'

interface IDepartmentFormData {
  name: string
  leader: string
  parentId: number | string
}

const dialogVisible = ref(false)
const isEdit = ref(false)
const editData = ref<PageRecord | null>(null)

// 部门和角色的数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

// 定义数据绑定
const formData = reactive<IDepartmentFormData>({
  name: '',
  leader: '',
  parentId: ''
})

// 点击确定
const systemStore = useSystemStore()
function handleConfirmClick() {
  dialogVisible.value = false
  const departmentData: PageRecord = {
    name: formData.name,
    leader: formData.leader,
    parentId: formData.parentId === '' ? null : Number(formData.parentId)
  }
  if (!isEdit.value) {
    systemStore.newPageDataAction('department', departmentData)
  } else if (editData.value && typeof editData.value.id === 'number') {
    systemStore.editPageDataAction('department', editData.value.id, departmentData)
  }
}

// 新建或者编辑
function setDialogVisible(isNew = true, data: PageRecord = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  Object.assign(formData, {
    name: isNew ? '' : toStringValue(data.name),
    leader: isNew ? '' : toStringValue(data.leader),
    parentId: isNew ? '' : toNumberValue(data.parentId)
  })
}

function toStringValue(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

function toNumberValue(value: unknown) {
  return typeof value === 'number' || typeof value === 'string' ? value : ''
}

defineExpose({
  setDialogVisible
})
</script>

<style scoped lang="less">
.form {
  padding: 10px 30px;
}
</style>
