import { getDepartmentData, getMenuData, getRoleData } from '@/service/main/system'
import type { IDepartment, IMenu, IRole } from '@/service/main/types'
import { defineStore } from 'pinia'

interface IMainState {
  entireDepartments: IDepartment[]
  entireRoles: IRole[]
  entireMenus: IMenu[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireDepartments: [],
    entireRoles: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const [departmentResult, roleResult, menuResult] = await Promise.all([
        getDepartmentData({ offset: 0, size: 100 }),
        getRoleData({ offset: 0, size: 100 }),
        getMenuData()
      ])

      this.entireDepartments = departmentResult.data.list
      this.entireRoles = roleResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
