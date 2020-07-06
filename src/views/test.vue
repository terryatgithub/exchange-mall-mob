<template>
  <van-tabbar v-model="active">
    <van-tabbar-item @click="tohome">
      <span>自定义</span>
      <template #icon="props">
        <img :src="props.active ? icon1.active : icon1.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item @click="totask">
      <span>自定义</span>
      <template #icon="props">
        <img :src="props.active ? icon2.active : icon2.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item @click="tomy">
      <span>自定义</span>
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

export default {
  name: "Nav",
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
        active: require("../assets/images/tab_my_active.png"),
        inactive: require("../assets/images/tab_my.png"),
      },
    };
  },
  props: {},

  created() {},
  methods: {
    tohome() {
      // this.$router.push("/");
      // this.$submitLogClick({
      //   menu_name: "兑换商城",
      // });
    },
    totask() {
      // this.$router.push("/task");
      // this.$submitLogClick({
      //   menu_name: "任务广场",
      // });
    },
    tomy() {
      // this.$router.push("/my");
      // this.$submitLogClick({
      //   menu_name: "我的页面",
      // });
    },
  },
};
</script>

<style lang="scss"></style>
