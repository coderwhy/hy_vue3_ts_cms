import axios from 'axios'
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

const requestControllers = {
  users: null as AbortController | null,
  page: null as AbortController | null
}

let usersRequestId = 0
let pageRequestId = 0

function getRequestErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseMessage = (error.response?.data as { message?: unknown } | undefined)?.message
    return typeof responseMessage === 'string' ? responseMessage : error.message
  }
  return error instanceof Error ? error.message : '请求失败，请稍后重试'
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    usersLoading: false,
    usersError: null,
    usersMutationLoading: false,
    pageList: [],
    pageTotalCount: 0,
    pageLoading: false,
    pageError: null,
    pageMutationLoading: false
  }),
  actions: {
    async getUserListDataAction(queryInfo: IPageQuery) {
      const requestId = ++usersRequestId
      requestControllers.users?.abort()
      const controller = new AbortController()
      requestControllers.users = controller
      this.usersLoading = true
      this.usersError = null

      try {
        const userListResult = await getUserListData(queryInfo, { signal: controller.signal })
        if (requestId !== usersRequestId) return

        const { list, totalCount } = userListResult.data
        this.usersList = list
        this.usersTotalCount = totalCount
      } catch (error: unknown) {
        if (requestId !== usersRequestId || axios.isCancel(error)) return
        this.usersError = getRequestErrorMessage(error)
      } finally {
        if (requestId === usersRequestId) {
          this.usersLoading = false
          requestControllers.users = null
        }
      }
    },
    async newUserDataAction(userInfo: IUserPayload) {
      this.usersMutationLoading = true
      try {
        // 1.创建用户数据
        await newUserData(userInfo)

        // 2.请求新的数据
        await this.getUserListDataAction({ offset: 0, size: 10 })
      } finally {
        this.usersMutationLoading = false
      }
    },
    async deleteUserDataAction(id: number) {
      this.usersMutationLoading = true
      try {
        await deleteUserData(id)
        await this.getUserListDataAction({ offset: 0, size: 10 })
      } finally {
        this.usersMutationLoading = false
      }
    },
    async editUserDataAction(id: number, userInfo: IUserPayload) {
      this.usersMutationLoading = true
      try {
        await editUserData(id, userInfo)
        await this.getUserListDataAction({ offset: 0, size: 10 })
      } finally {
        this.usersMutationLoading = false
      }
    },

    // 页面的网络请求
    async getPageListDataAction(pageName: string, queryInfo: IPageQueryParams) {
      const requestId = ++pageRequestId
      requestControllers.page?.abort()
      const controller = new AbortController()
      requestControllers.page = controller
      this.pageLoading = true
      this.pageError = null

      try {
        const pageListResult = await getPageListData(pageName, queryInfo, {
          signal: controller.signal
        })
        if (requestId !== pageRequestId) return

        const { list, totalCount } = pageListResult.data
        this.pageList = list
        this.pageTotalCount = totalCount
      } catch (error: unknown) {
        if (requestId !== pageRequestId || axios.isCancel(error)) return
        this.pageError = getRequestErrorMessage(error)
      } finally {
        if (requestId === pageRequestId) {
          this.pageLoading = false
          requestControllers.page = null
        }
      }
    },
    async deletePageDataAction(pageName: string, id: number) {
      this.pageMutationLoading = true
      try {
        await deletePageData(pageName, id)
        await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      } finally {
        this.pageMutationLoading = false
      }
    },
    async newPageDataAction(pageName: string, pageData: PageRecord) {
      this.pageMutationLoading = true
      try {
        await newPageData(pageName, pageData)
        await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      } finally {
        this.pageMutationLoading = false
      }
    },
    async editPageDataAction(pageName: string, id: number, pageData: PageRecord) {
      this.pageMutationLoading = true
      try {
        await editPageData(pageName, id, pageData)
        await this.getPageListDataAction(pageName, { offset: 0, size: 10 })
      } finally {
        this.pageMutationLoading = false
      }
    }
  }
})

export default useSystemStore
