export interface IApiResponse<T> {
  code: number
  data: T
}

export interface IAccountLoginParams {
  name: string
  password: string
}

export interface ILoginData {
  id: number
  name: string
  token: string
}

export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface IDepartment {
  id: number
  name: string
  parentId: number | null
  createAt: string
  updateAt: string
  leader: string
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

export interface IMenu {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  permission?: string
  children?: IMenu[]
}
