const searchConfig = {
  pageName: 'role',
  formItems: [
    {
      label: '角色名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入角色名称'
    },
    {
      label: '角色权限',
      prop: 'intro',
      type: 'input',
      placeholder: '请输入角色权限'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date-picker'
    }
  ]
}

export default searchConfig
