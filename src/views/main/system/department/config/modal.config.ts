const modalConfig = {
  pageName: 'department',
  title: '新建部门',
  formItems: [
    {
      label: '部门名称',
      prop: 'name',
      type: 'input',
      placeholder: '请输入部门名称'
    },
    {
      label: '部门领导',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入部门领导'
    },
    {
      label: '上级部门',
      prop: 'parentId',
      type: 'select',
      options: [],
      placeholder: '请输入部门领导'
    }
  ]
}

export default modalConfig
