export default [
  { name: '登录', path: '/login', component: './Login', layout: false },

  //子页路由
  { name: '用户详情', path: '/user/detail/:id/:phone', component: './UserManagement/Detail' },

  //菜单路由
  {
    name: '用户管理',
    path: '/user/list',
    key: 'user_list',
    component: './UserManagement/List',
    showMenu: true,
  },
  {
    name: '权限管理',
    path: '/',
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

  { component: './404', layout: false },
];
