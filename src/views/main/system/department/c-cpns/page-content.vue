<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewData">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" :border="true" style="width: 100%">
        <el-table-column align="center" type="selection" label="选择" />
        <el-table-column align="center" type="index" label="序号" width="80" />
        <el-table-column align="center" prop="name" label="部门名称" width="180" />
        <el-table-column align="center" prop="leader" label="领导名称" width="180" />
        <el-table-column align="center" prop="parentId" label="上级部门" width="180" />
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ utcFormat(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ utcFormat(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="EditPen"
              link
              @click="handleEditClick(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              link
              @click="handleDeleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="content">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { utcFormat } from '@/utils/format'
import { ref } from 'vue'

const emit = defineEmits(['newDataClick', 'editDataClick'])

// 1.请求数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
function fetchPageListData(queryInfo: any = {}) {
  // 1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 2.发生网络请求
  systemStore.getPageListDataAction('department', { offset, size, ...queryInfo })
}
fetchPageListData()

// 2.展示数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.绑定分页数据
function handleCurrentChange() {
  fetchPageListData()
}
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 10
  fetchPageListData()
}

// 4.新建数据的处理
function handleNewData() {
  emit('newDataClick')
}

// 5.删除和编辑操作
function handleDeleteClick(id: number) {
  systemStore.deletePageDataAction('department', id)
}

function handleEditClick(data: any) {
  emit('editDataClick', data)
}

// 暴露函数
defineExpose({
  fetchPageListData,
  handleResetClick
})
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>
