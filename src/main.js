import Vue from 'vue'
import App from './App'
import './styles/index.css';

import routes from './router/index'
import VueRouter from 'vue-router';
import store from "./vuex/store";
import VueMask from 'v-mask';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueMask);

const router = new VueRouter({
  routes
})



new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>',
})
