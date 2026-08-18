import type { IDepartment, IRole } from '../main/types'

export type { IDepartment, IMenu, IRole } from '../main/types'

export interface IAccountLoginParams {
  name: string
  password: string
}

export interface ILoginData {
  id: number
  name: string
  token: string
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: IRole
  department: IDepartment | null
}
