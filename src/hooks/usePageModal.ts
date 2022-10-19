import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type callbackType = (item: any) => void

function usePageModal(editCallback?: callbackType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewDataClick() {
    modalRef.value?.setDialogVisible()
  }
  function handleEditDataClick(data: any) {
    modalRef.value?.setDialogVisible(false, data)
    if (editCallback) editCallback(data)
  }

  return {
    modalRef,
    handleNewDataClick,
    handleEditDataClick
  }
}

export default usePageModal
