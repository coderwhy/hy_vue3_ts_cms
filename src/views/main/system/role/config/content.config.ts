const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', label: '选择', width: '80px' },
    { type: 'index', label: '序号', width: '80px' },
    { type: 'normal', prop: 'name', label: '角色名称', width: '180px' },
    { type: 'normal', prop: 'intro', label: '角色权限', width: '180px' },
    { type: 'time', prop: 'createAt', label: '创建时间' },
    { type: 'time', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '180px' }
  ]
}

export default contentConfig
