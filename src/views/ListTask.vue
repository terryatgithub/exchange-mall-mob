<template>
  <div class="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card v-for="(item, index) in TaskList" :key="index">
        <template #title>
          <div class="title" v-if="TaskList != ''">
            {{ item.taskName }}
          </div>
        </template>
        <template #desc>
          <div class="time">
            <!-- 2020.0502 14:00 -->
            {{ item.createDate }}
          </div>
        </template>
        <template #tags>
          <div class="coins">
            <!-- 100金币+1000成长值 -->
            {{ item.coins }}金币+{{ item.points }}成长值
          </div>
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { homeApiControl, userApiControl, taskApiControl } from "@/core";
import initMixin from "@/mixins/initMixin";
import commonUtil from "@/utils/index";
import cacheUtil from "@/utils/cache";
import Vue from "vue";
import {
  Button,
  Cell,
  Swipe,
  SwipeItem,
  Lazyload,
  Card,
  Tag,
  List,
  Divider,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Dialog,
  Overlay,
} from "vant";
Vue.use(Button)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Card)
  .use(Tag)
  .use(List)
  .use(Divider)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Dialog)
  .use(Overlay);

export default {
  // name: "ListTask",
  data() {
    return {
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      Nowtime: new Date().getTime(),
      TaskList: [],
    };
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
  },
  created() {
    this.$store.commit("setloginurl", window.location.href);
  },
  mounted() {},
  methods: {
    async onLoad() {
      let res = await taskApiControl.queryTaskHistory({
        sign: "",
        openId: "",
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        currentTimestamp: this.Nowtime,
        type: 0,
      });
      let state = 1;
      if (res.code === "0") {
        this.TaskList = [...this.TaskList, ...res.data.results];
        state = 1;
      } else {
        state = 0;
      }
      this.$submitLogShow({
        page_name: "任务记录页面",
        page_state: state ? "加载成功" : "加载异常",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
      // 将加载状态设置为 false
      this.loading = false;
      // 将页码 ++
      this.pageIndex++;
      // 判断结果是否为空
      if (res.data.results.length === 0) {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: #eeeeee;
  height: 100%;
  .van-list {
    padding-top: 10px;
  }
  .van-card__content {
    min-height: 56px;
  }
  .van-card__footer {
    float: right;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .van-card__desc::before {
    content: "时间: ";

    color: #999999;
    font-size: 12px;
    line-height: 18px;
  }
  .title {
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
  .coins {
    color: #f7b500;
  }
  .time::before,
  .coins::before {
    content: "获得: ";
    color: #999999;
    font-size: 12px;
    line-height: 18px;
  }
  .time {
    color: #333333;
    padding: 4px 0px;
  }
  .van-card {
    height: 86px;
    // padding: 15px 0px 0px 15px;
  }
  .van-card__title {
    color: #333333;
    line-height: 24px;
    font-size: 16px;
    // margin: 15px 0px 0px 15px;
  }
  .van-card__desc {
    margin: 5px 0px;
  }
}
</style>
