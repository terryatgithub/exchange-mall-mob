import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import { localSet, localGet } from "../utils/mylocal";
Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", false, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  modules,
  getters,
  state: {
    // 用来保存orderid信息
    ordersid: localGet("orders") || 0,
    // 用来保存loginurl信息
    loginurl: localGet("loginurl") || "",
    // 用来保存登录信息
    loginstate: localGet("loginstate") || 0,
  },
  mutations: {
    setorders: function(state, payload) {
      // 将orderid保存信息到 vuex 中
      state.ordersid = payload;
      // 将服务器返回的orderid信息保存到本地中
      localSet("orders", payload);
    },
    setloginurl: function(state, payload) {
      state.loginurl = payload;
      localSet("loginurl", payload);
    },
    setloginstate: function(state, payload) {
      state.loginstate = payload;
      localSet("loginstate", payload);
    },
  },
});

export default store;
