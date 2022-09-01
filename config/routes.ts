export default [
  { name: '登录', path: '/login', component: './Login', layout: false },

  //子页路由
  { name: '用户详情', path: '/user/detail/:id/:phone', component: './UserManagement/Detail' },
  { name: '购买订单详情', path: '/purchase/detail/:id', component: './StorageManagement/PurchaseOrder/detail' },
  { name: '报损订单详情', path: '/reportDamage/detail/:id', component: './StorageManagement/ReportDamageOrder/detail' },
  { name: '追损订单详情', path: '/chaseDamage/detail/:id', component: './StorageManagement/ChaseDamageOrder/detail' },
  { name: '回收订单详情', path: '/returnOrder/detail/:id', component: './StorageManagement/ReturnOrder/detail' },

  //菜单路由
  {
    name: '用户管理',
    path: '/user',
    key: 'user_list',
    component: './UserManagement/List',
    showMenu: true,
  },
  {
    name: '订阅中心',
    path: '/order',
    key: 'order',
    showMenu: true,
    routes: [
      {
        name: '书袋管理',
        path: '/order/bag/list',
        key: 'bag_list',
        component: './OrderManagement/BagOrder',
      },
      {
        name: '订阅管理',
        path: '/order/subscribe/list',
        key: 'subscribe_list',
        component: './OrderManagement/Subscribe',
      },
      {
        name: '短信模版',
        path: '/order/template/list',
        key: 'text_template',
        component: './OrderManagement/TextTemplate',
      },
    ],
  },
  {
    name: '工单中心',
    path: '/work',
    key: 'work_order',
    showMenu: true,
    routes: [
      {
        name: '异常工单',
        path: '/work/unusual/list',
        key: 'unusual_order_list',
        component: './WorkOrderManagement/UnusualOrder',
      },
      {
        name: '超时工单',
        path: '/work/overTime/list',
        key: 'overtime_order_list',
        component: './WorkOrderManagement/OverTimeOrder',
      },
      {
        name: '丢件工单',
        path: '/work/lost/list',
        key: 'lost_order_list',
        component: './WorkOrderManagement/LostOrder',
      },
    ],
  },
  {
    name:'仓储管理',
    path: '/storage',
    key:'storage',
    showMenu: true,
    routes: [
      {
        name:'购买订单',
        path:'/storage/purchaseOrder',
        key:'purchase_order_list',
        component:'./StorageManagement/PurchaseOrder'
      },
      {
        name:'报损订单',
        path:'/storage/reportDamageOrder',
        key:'report_damage_list',
        component:'./StorageManagement/ReportDamageOrder'
      },
      {
        name:'追损订单',
        path:'/storage/chaseDamageOrder',
        key:'damage_list',
        component:'./StorageManagement/ChaseDamageOrder'
      },
      {
        name:'入库订单',
        path:'/storage/goodsInOrder',
        key:'goods_in_list',
        component:'./StorageManagement/GoodsInOrder'
      },
      {
        name:'回收订单',
        path:'/storage/returnOrder',
        key:'return_list',
        component:'./StorageManagement/ReturnOrder'
      },
    ]
  },
  {
    name: '权限管理',
    path: '/auth',
    key: 'auth',
    showMenu: true,
    routes: [
      {
        name: '角色管理',
        path: '/auth/role',
        key: 'auth_role',
        component: './AuthManagement/Role',
      },
      {
        name: '账号管理',
        path: '/auth/account',
        key: 'auth_account',
        component: './AuthManagement/Account',
      },
      {
        name: '日志管理',
        path: '/auth/journal',
        key: 'auth_journal',
        component: './AuthManagement/Journal',
      },
    ],
  },
  { path: '/', redirect: '/user' },
  { component: './404', layout: false },
];
