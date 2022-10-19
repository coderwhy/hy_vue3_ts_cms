const searchConfig = {
  pageName: 'department',
  formItems: [
    {
      label: '部门名称',
      prop: 'name',
      type: 'input',
      initialValue: 'aaa',
      placeholder: '请输入部门名称'
    },
    {
      label: '部门领导',
      prop: 'leader',
      type: 'input',
      placeholder: '请输入部门领导'
    },
    {
      label: '创建时间',
      prop: 'createAt',
      type: 'date-picker',
      placeholder: '请选择创建时间范围'
    }
  ]
}

export default searchConfig
