export default [
  { name: '登录', path: '/user/login', component: './user/Login', layout: false },
  { name: '用户管理', path: '/user/list', key: 'user_list', component: './user/List' },
  { component: './404' },
  { path: '/', redirect: '/user/list' },
];
