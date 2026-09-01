import type { IUser } from '@/service/main/types'
import type { PageRecord } from '@/types/page'

export type { IUser }

export interface ISystemState {
  usersTotalCount: number
  usersList: IUser[]
  usersLoading: boolean
  usersError: string | null
  usersMutationLoading: boolean

  pageList: PageRecord[]
  pageTotalCount: number
  pageLoading: boolean
  pageError: string | null
  pageMutationLoading: boolean
}
