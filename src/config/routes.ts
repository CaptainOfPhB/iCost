import User from '../views/User';
import Login from '../views/login';
import { Tags, Tag } from '../views/tags';
import Statistics from '../views/statistics';
import { Accounts, Account } from '../views/accounts';

const routes = [
  { path: '/login', component: Login },
  { path: '/tags', component: Tags },
  { path: '/tags/:id', component: Tag },
  { path: '/accounts', component: Accounts },
  { path: '/accounts/:id', component: Account },
  { path: '/user/:userId', name: 'user', component: User },
  { path: '/statistics', component: Statistics },
];

export default routes;