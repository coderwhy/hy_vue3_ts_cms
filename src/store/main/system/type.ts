import type { IUser } from '@/service/main/types'
import type { PageRecord } from '@/types/page'

export type { IUser }

export interface ISystemState {
  usersTotalCount: number
  usersList: IUser[]

  pageList: PageRecord[]
  pageTotalCount: number
}
