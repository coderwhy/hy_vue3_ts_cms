import hyRequest from '..'

export function accountLogin(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
