<template>
  <div class="content">
    <div v-if="contentConfig.header" class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewData">
        {{ contentConfig.header?.btnTitle }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        :border="true"
        style="width: 100%"
        v-bind="contentConfig.childrenProps"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'time'">
            <el-table-column align="center" :prop="item.prop" :label="item.label">
              <template #default="scope">
                {{ utcFormat(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :label="item.label" :width="item.width">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  type="primary"
                  size="small"
                  icon="EditPen"
                  link
                  @click="handleEditClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
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
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
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
import usePermission from '@/hooks/usePermission'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenProps?: any
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newDataClick', 'editDataClick'])

// 0.判断是否有增删改查的权限
const isCreate = usePermission(props.contentConfig.pageName, 'create')
const isDelete = usePermission(props.contentConfig.pageName, 'delete')
const isUpdate = usePermission(props.contentConfig.pageName, 'update')
const isQuery = usePermission(props.contentConfig.pageName, 'query')

// 1.请求数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
function fetchPageListData(queryInfo: any = {}) {
  if (!isQuery) return
  // 1.获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  // 2.发生网络请求
  systemStore.getPageListDataAction(props.contentConfig.pageName, { offset, size, ...queryInfo })
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
  systemStore.deletePageDataAction(props.contentConfig.pageName, id)
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
