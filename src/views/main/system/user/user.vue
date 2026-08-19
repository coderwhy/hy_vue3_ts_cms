<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <UserPageSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />

    <!-- 2.展示区域 -->
    <UserPageContent
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />

    <!-- 3.新建和编辑 -->
    <UserPageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserPageSearch from './c-cpns/page-search.vue'
import UserPageContent from './c-cpns/page-content.vue'
import UserPageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'
import type { PageFormData, PageRecord } from '@/types/page'

// 1.重置功能
const contentRef = ref<InstanceType<typeof UserPageContent>>()
function handleQueryClick(searchInfo: PageFormData) {
  contentRef.value?.fetchUserListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}

// 2.新建和编辑数据
const modalRef = ref<InstanceType<typeof UserPageModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
function handleEditDataClick(data: PageRecord) {
  modalRef.value?.setDialogVisible(false, data)
}
</script>

<style lang="less" scoped></style>
