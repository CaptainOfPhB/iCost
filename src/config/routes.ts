import Login from '../views/login';
import { Tags, Tag } from '../views/tags';
import { Accounts, Account } from '../views/accounts';

const routes = [
  { path: '/login', component: Login },
  { path: '/tags', component: Tags },
  { path: '/tags/:id', component: Tag },
  { path: '/accounts', component: Accounts },
  { path: '/accounts/:id', component: Account },
];

export default routes;