import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import personal from "./personal";
import workplace from "./workplace";


const store = new Vuex.Store({
  modules: {
    personal,
    workplace
  },
});


export default store;