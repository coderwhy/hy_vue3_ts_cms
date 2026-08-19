import {
  deletePageData,
  deleteUserData,
  editPageData,
  editUserData,
  getPageListData,
  getUserListData,
  newPageData,
  newUserData
} from '@/service/main/system'
import type { IPageQuery, IPageQueryParams, IUserPayload } from '@/service/main/types'
import { defineStore } from 'pinia'
import type { PageRecord } from '@/types/page'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async getUserListDataAction(queryInfo: IPageQuery) {
      // 1.请求用户列表数据
      const userListResult = await getUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async newUserDataAction(userInfo: IUserPayload) {
      // 1.创建用户数据
      await newUserData(userInfo)

      // 2.请求新的数据
      await this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async deleteUserDataAction(id: number) {
      await deleteUserData(id)
      await this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: IUserPayload) {
      await editUserData(id, userInfo)
      await this.getUserListDataAction({ offset: 0, size: 10 })
    },

    // 页面的网络请求
    async getPageListDataAction(pageName: string, queryInfo: IPageQueryParams) {
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataAction(pageName: string, id: number) {
      await deletePageData(pageName, id)
      await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageData: PageRecord) {
      await newPageData(pageName, pageData)
      await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageData: PageRecord) {
      await editPageData(pageName, id, pageData)
      await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
