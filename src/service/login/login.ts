import hyRequest from '..'
import type { IApiResponse } from '../types'
import type { IAccountLoginParams, ILoginData, IMenu, IUserInfo } from './types'

export function accountLogin(account: IAccountLoginParams) {
  return hyRequest.post<IApiResponse<ILoginData>>({
    url: '/login',
    data: account
  })
}

export function getUserById(id: number) {
  return hyRequest.get<IApiResponse<IUserInfo>>({
    url: '/users/' + id
  })
}

export function getRoleMenus(id: number) {
  return hyRequest.get<IApiResponse<IMenu[]>>({
    url: `/role/${id}/menu`
  })
}
