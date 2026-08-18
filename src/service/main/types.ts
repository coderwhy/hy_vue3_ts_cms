export interface IPageQuery {
  offset: number
  size: number
}

export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
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

export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
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
