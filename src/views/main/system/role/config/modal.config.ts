import type { IPageModalConfig } from '@/types/page'

const modalConfig: IPageModalConfig = {
  pageName: 'role',
  title: '新建角色',
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      prop: 'name',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      label: '权限介绍',
      prop: 'intro',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      label: '菜单权限',
      prop: 'menuList',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
