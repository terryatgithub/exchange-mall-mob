import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css";
import "@/styles/index.scss";
import "@/styles/border.css";
import "amfe-flexible";
import fastClick from "fastclick";
import router from "./router";
import store from "./store";
import filters from "@/filters";
import { checklogin } from "@/utils/login";
import Notice from "@/components/notice";
import QRCodeToast from "@/components/qrToast";
// import { submitLogShow, submitLogClick, submitLogResult } from './utils/dataCollect.js'
import submitLog from "./utils/dataCollect.js";
Vue.use(submitLog);

//连续点击路由报错
import VueRouter from "vue-router";
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

Vue.prototype.$Notice = Notice;
Vue.prototype.$showQRCodeToast = QRCodeToast;
Vue.prototype.$checklogin = checklogin;


Vue.config.productionTip = false;

fastClick.attach(document.body);

Object.keys(filters).forEach((filterName) => {
  Vue.filter(filterName, filters[filterName]);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
