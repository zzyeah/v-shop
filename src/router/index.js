import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classify from '../views/Classify.vue';
import Shopping from '../views/Shopping.vue';
import My from '../views/Mine.vue';
import Search from '../views/Search.vue';
import Login from '../views/Login.vue';
import History from '../views/History.vue';
import Address from '../views/Address.vue';
import AddressEdit from '../views/AddressEdit.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/address',
    name: 'address',
    component: Address,
  },
  {
    path: '/addressedit/:addressId',
    name: 'address-edit',
    component: AddressEdit,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'classify',
        component: Classify,
      },
      {
        path: 'shopping',
        name: 'shopping',
        component: Shopping,
      },
      {
        path: 'my',
        name: 'my',
        component: My,
      },
      {
        path: 'history',
        name: 'history',
        component: History,
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
  },
  {
    path: '*',
    redirect: '/home/classify',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
