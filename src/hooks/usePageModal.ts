import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
import type { PageRecord } from '@/types/page'

type Callback = (item: PageRecord) => void

function usePageModal(editCallback?: Callback) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleNewDataClick() {
    modalRef.value?.setDialogVisible()
  }
  function handleEditDataClick(data: PageRecord) {
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
