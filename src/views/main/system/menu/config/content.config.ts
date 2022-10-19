const contentConfig = {
  pageName: 'menu',
  propsList: [
    { prop: 'name', label: '菜单名称', width: '180px' },
    { prop: 'type', label: '级别', width: '120px' },
    { type: 'normal', prop: 'url', label: '菜单url', width: '240px' },
    { type: 'normal', prop: 'sort', label: '排序', width: '120px' },
    { type: 'normal', prop: 'permission', label: '权限', width: '180px' },
    { type: 'time', prop: 'createAt', label: '创建时间' },
    { type: 'time', prop: 'updateAt', label: '更新时间' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}

export default contentConfig
