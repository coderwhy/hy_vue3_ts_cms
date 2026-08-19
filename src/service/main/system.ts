import hyRequest from '..'
import type { IApiResponse, IPaginatedData } from '../types'
import type { IDepartment, IMenu, IPageQuery, IRole, IUser } from './types'

/** 用户的网络请求 */
export function getUserListData(queryInfo: IPageQuery) {
  return hyRequest.post<IApiResponse<IPaginatedData<IUser>>, IPageQuery>({
    url: '/users/list',
    data: queryInfo
  })
}

export function newUserData(userInfo: Partial<IUser>) {
  return hyRequest.post<IApiResponse<IUser>, Partial<IUser>>({
    url: '/users',
    data: userInfo
  })
}

export function deleteUserData(id: number) {
  return hyRequest.delete<IApiResponse<unknown>>({
    url: '/users/' + id
  })
}

export function editUserData(id: number, userInfo: Partial<IUser>) {
  return hyRequest.patch<IApiResponse<IUser>, Partial<IUser>>({
    url: '/users/' + id,
    data: userInfo
  })
}

/** 获取页面的数据 */
export function getPageListData(pageName: string, queryInfo: IPageQuery) {
  return hyRequest.post<IApiResponse<IPaginatedData<Record<string, unknown>>>, IPageQuery>({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageData(pageName: string, id: number) {
  return hyRequest.delete<IApiResponse<unknown>>({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, dataInfo: Record<string, unknown>) {
  return hyRequest.post<IApiResponse<Record<string, unknown>>, Record<string, unknown>>({
    url: `/${pageName}`,
    data: dataInfo
  })
}

export function editPageData(pageName: string, id: number, dataInfo: Record<string, unknown>) {
  return hyRequest.patch<IApiResponse<Record<string, unknown>>, Record<string, unknown>>({
    url: `/${pageName}/${id}`,
    data: dataInfo
  })
}

/** 获取部门的信息 */
export function getDepartmentData(queryInfo: IPageQuery) {
  return hyRequest.post<IApiResponse<IPaginatedData<IDepartment>>, IPageQuery>({
    url: '/department/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: IPageQuery) {
  return hyRequest.post<IApiResponse<IPaginatedData<IRole>>, IPageQuery>({
    url: '/role/list',
    data: queryInfo
  })
}

/** 获取菜单的信息 */
export function getMenuData() {
  return hyRequest.post<IApiResponse<IPaginatedData<IMenu>>>({
    url: '/menu/list'
  })
}
