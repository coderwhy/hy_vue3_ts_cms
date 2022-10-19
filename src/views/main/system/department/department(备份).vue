<template>
  <div class="department">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

// content的逻辑处理
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(searchInfo: any) {
  console.log(searchInfo)
  contentRef.value?.fetchPageListData(searchInfo)
}
function handleResetClick() {
  contentRef.value?.handleResetClick()
}

// modal的逻辑处理
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewDataClick() {
  modalRef.value?.setDialogVisible()
}
function handleEditDataClick(data: any) {
  console.log({ ...data })
  modalRef.value?.setDialogVisible(false, data)
}
</script>

<style lang="less" scoped></style>
