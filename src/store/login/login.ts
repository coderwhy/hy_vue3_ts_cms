import router, { addRoutesWithMenu } from '@/router'
import { accountLogin, getRoleMenus, getUserById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import { mapMenuToPersssions } from '@/utils/map-menu'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async accountLoginAction(account: any) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      // 2.保存在cache中
      localCache.setCache('token', token)

      // 3.获取用户信息
      const userRes = await getUserById(id)
      this.userInfo = userRes.data
      localCache.setCache('useInfo', this.userInfo)

      // 4.根据role的id获取菜单
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 5.保存权限信息
      const permissions = mapMenuToPersssions(this.userMenus)
      this.permissions = permissions
      localCache.setCache('permissions', this.permissions)

      // 5.获取所有的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 5.动态添加路由
      addRoutesWithMenu(this.userMenus)

      // 跳转到首页
      router.push('/main')
    },

    loadLocalDataAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
      this.permissions = localCache.getCache('permissions')

      if (this.token && this.userMenus) {
        addRoutesWithMenu(this.userMenus) // 获取所有的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      }
    }
  }
})

export default useLoginStore
