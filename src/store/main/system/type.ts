import type { IUser } from '@/service/main/types'

export type { IUser }

export interface ISystemState {
  usersTotalCount: number
  usersList: IUser[]

  pageList: unknown[]
  pageTotalCount: number
}
