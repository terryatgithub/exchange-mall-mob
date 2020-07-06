import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from "@/store";
// import Vuemain from "../main.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "兑换商城主页",
    },
  },
  {
    path: "/detail",
    name: "GoodsDetail",
    meta: {
      title: "兑换商品详情",
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/GoodsDetail.vue"),
  },
  {
    path: "/task",
    name: "Task",
    // redirect: "/task",
    meta: {
      title: "玩任务 挣现金",
    },
    component: () => import(/* webpackChunkName: "task" */ "../views/Task.vue"),
  },
  //测试----------------------------------------
  {
    path: "/newaddress",
    name: "newaddress",
    component: () =>
      import(
        /* webpackChunkName: "newaddress" */ "../views/Address/com/newaddress.vue"
      ),
  },
  {
    path: "/test",
    name: "test",
    component: () => import(/* webpackChunkName: "test" */ "../views/test.vue"),
  },
  //测试----------------------------------------
  {
    path: "/my",
    name: "My",
    meta: {
      title: "个人中心",
    },
    component: () => import(/* webpackChunkName: "my" */ "../views/My.vue"),
  },
  {
    path: "/listexchange",
    name: "ListExchange",
    meta: {
      title: "兑换记录",
    },
    component: () =>
      import(/* webpackChunkName: 'myexchagne' */ "../views/ListExchange.vue"),
  },
  {
    path: "/listtask",
    name: "ListTask",
    meta: {
      title: "消费记录",
    },
    component: () =>
      import(/* webpackChunkName: 'myexchagne' */ "../views/ListTask.vue"),
  },
  {
    path: "/sucess",
    name: "sucess",
    component: () =>
      import(/* webpackChunkName: 'address' */ "../views/sucess.vue"),
  },
  {
    path: "/address",
    name: "address",
    meta: {
      title: "领取页面",
    },
    component: () =>
      import(/* webpackChunkName: 'address' */ "../views/Address/index.vue"),
  },
  {
    path: "/add",
    name: "add",
    meta: {
      title: "填写地址",
    },
    component: () =>
      import(/* webpackChunkName: 'address' */ "../views/Address/com/add.vue"),
  },
  {
    path: "/addressList",
    name: "addressList",
    meta: {
      title: "兑换领取",
    },
    component: () =>
      import(
        /* webpackChunkName: 'address' */ "../views/Address/com/addressList.vue"
      ),
  },
  {
    path: "*",
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // Vue.$checklogin(store.state.loginurl);
  // console.log(Vue);

  next();
  // if (checklogin2()) {

  // }else{

  // }
});
export default router;
