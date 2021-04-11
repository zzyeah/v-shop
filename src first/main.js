import Vue from 'vue';
import Vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
// import animate from './tools/animate';
import 'lib-flexible';
import 'vant/lib/index.css';

Vue.prototype.$api = api;
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
