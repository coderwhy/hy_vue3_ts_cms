import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
import type { PageFormData } from '@/types/page'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  function handleQueryClick(searchInfo: PageFormData) {
    contentRef.value?.fetchPageListData(searchInfo)
  }
  function handleResetClick() {
    contentRef.value?.handleResetClick()
  }

  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
