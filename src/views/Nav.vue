<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace @click="tohome">
      <span>兑换商城</span>
      <template #icon="props">
        <img :src="props.active ? icon1.active : icon1.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace @click="totask">
      <span>任务广场</span>
      <template #icon="props">
        <img :src="props.active ? icon2.active : icon2.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace @click="tomy">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? icon3.active : icon3.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar).use(TabbarItem);
import { Notify } from "vant";
export default {
  name: "Nav",
  props: ["valuedata"],
  data() {
    return {
      active: 0,
      icon1: {
        active: require("../assets/images/home_active.png"),
        inactive: require("../assets/images/home.png"),
      },
      icon2: {
        active: require("../assets/images/tab_task_active.png"),
        inactive: require("../assets/images/tab_task.png"),
      },
      icon3: {
        active: require("../assets/images/tab_task_active.png"),
        inactive: require("../assets/images/tab_task.png"),
      },
      // icon3: {
      //   active: require("../assets/images/tab_my_active.png"),
      //   inactive: require("../assets/images/tab_my.png"),
      // },
    };
  },
  // computed: {
  //   value: function() {
  //     return value;
  //   },
  // },
  created() {
    // debugger;
    this.active = this.valuedata;
  },
  // watch: {
  //   active: (newVal, oldVal) => {
  //     // debugger;
  //     console.log(newVal);
  //     this.active = newVal;
  //   },
  // },
  methods: {
    tohome() {
      // this.active = 0;
      this.$router.push("/");
      this.$submitLogClick({
        menu_name: "兑换商城",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    },
    totask() {
      // debugger;
      this.$router.push("/task");
      this.$submitLogClick({
        menu_name: "任务广场",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    },
    tomy() {
      // debugger;
      this.$router.push("/my");
      this.$submitLogClick({
        menu_name: "我的页面",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    },
  },
};
</script>

<style lang="scss"></style>
