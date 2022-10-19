<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-data-click="handleNewDataClick"
      @edit-data-click="handleEditDataClick"
    />
    <page-modal :modal-config="modalConfig" ref="modalRef" :other-info="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ label: 'name', children: 'children' }"
          @check="handleMenuCheckChange"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import { mapMenuToIds } from '@/utils/map-menu'
import type { ElTree } from 'element-plus'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal(editCallback)

// 菜单的展示
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleMenuCheckChange(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(data: any) {
  nextTick(() => {
    const menuList = mapMenuToIds(data.menuList)
    treeRef.value?.setCheckedKeys(menuList)
  })
}
</script>

<style scoped></style>
