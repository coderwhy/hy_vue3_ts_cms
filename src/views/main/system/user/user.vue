<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />

    <!-- 2.展示区域 -->
    <page-content
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />

    <!-- 3.新建和编辑 -->
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

// 1.重置功能
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(searchInfo: any) {
  contentRef.value?.fetchUserListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}

// 2.新建和编辑数据
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
function handleEditDataClick(data: any) {
  modalRef.value?.setDialogVisible(false, data)
}
</script>

<style lang="less" scoped></style>
