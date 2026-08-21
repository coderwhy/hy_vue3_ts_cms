import router, { addRoutesWithMenu, resetDynamicRoutes } from '@/router'
import { accountLogin, getRoleMenus, getUserById } from '@/service/login/login'
import type { IAccountLoginParams, IMenu, IUserInfo } from '@/service/login/types'
import { clearAuthCache } from '@/utils/auth'
import { localCache } from '@/utils/cache'
import { mapMenuToPermissions } from '@/utils/map-menu'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: IUserInfo | null
  userMenus: IMenu[]
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: null,
    userMenus: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: IAccountLoginParams) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      // 2.保存在cache中
      localCache.setCache('token', token)

      // 3.获取用户信息
      const userRes = await getUserById(id)
      this.userInfo = userRes.data
      localCache.setCache('userInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 5.保存权限信息
      const permissions = mapMenuToPermissions(this.userMenus)
      this.permissions = permissions
      localCache.setCache('permissions', this.permissions)

      // 5.获取所有的数据
      const mainStore = useMainStore()
      await mainStore.fetchEntireDataAction()

      // 5.动态添加路由
      addRoutesWithMenu(this.userMenus)

      // 跳转到首页
      router.push('/main')
    },

    async loadLocalDataAction() {
      this.token = localCache.getCache<string>('token') ?? ''
      this.userInfo = localCache.getCache<IUserInfo>('userInfo') ?? null
      this.userMenus = localCache.getCache<IMenu[]>('userMenus') ?? []
      this.permissions = localCache.getCache<string[]>('permissions') ?? []

      if (this.token && this.userMenus.length) {
        addRoutesWithMenu(this.userMenus) // 获取所有的数据
        const mainStore = useMainStore()
        await mainStore.fetchEntireDataAction()
      }
    },

    logoutAction() {
      this.$reset()
      useMainStore().$reset()
      clearAuthCache()
      resetDynamicRoutes()
      router.push('/login')
    }
  }
})

export default useLoginStore
