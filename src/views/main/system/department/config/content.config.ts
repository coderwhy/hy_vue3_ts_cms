const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  propsList: [
    { type: 'selection', label: '选择', width: 80 },
    { type: 'index', label: '序号', width: 60 },

    { type: 'normal', prop: 'name', label: '部门名称', width: 180 },
    { type: 'normal', prop: 'leader', label: '部门领导', width: 180 },
    { type: 'normal', prop: 'parentId', label: '上级名称', width: 180 },
    { type: 'time', prop: 'createAt', label: '创建时间' },
    { type: 'time', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: 180 }
  ]
}

export default contentConfig
