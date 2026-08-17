import useLoginStore from '@/store/login/login'

function usePermission(pageName: string, handleName: string) {
  const queryPermission = `${pageName}:${handleName}`
  const permissions = useLoginStore().permissions
  return !!permissions.find((item) => item.includes(queryPermission))
}

export default usePermission
