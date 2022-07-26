const routes = [
  { path: '/', redirect: '/accounts' },
  { path: '/user', component: () => import('../views/user') },
  { path: '/login', component: () => import('../views/login') },
  { path: '/statistics', component: () => import('../views/statistics') },
  { path: '/tags', component: () => import('../views/tags/Tags.vue') },
  { path: '/tags/:tagId(\\d+)', component: () => import('../views/tags/Tag.vue') },
  { path: '/accounts', component: () => import('../views/accounts/Accounts.vue') },
  { path: '/accounts/:accountId(\\d+)', component: () => import('../views/accounts/Account.vue') },
];

export default routes;