<template>
  <div class="list" v-if="TaskInfo != ''">
    <!-- <div class="list"> -->
    <div class="header">
      <van-image
        v-if="login === true"
        round
        width="66px"
        height="66px"
        :src="UserInfo.avatar"
      />
      <van-image
        v-else
        round
        width="66px"
        height="66px"
        :src="require('../assets/images/head.png')"
      />
      <div class="name">
        <p>
          <span v-if="login === true">{{ UserInfo.userName }}</span>
          <span v-else class="title">未登录</span>
          <span>{{ UserInfo.mobilePhone }}</span>
        </p>
        <!-- 等级，金币 -->
        <div v-if="login === true">
          <div>
            <img src="../assets/images/VIP.png" alt="" class="gold" /><span>{{
              TaskInfo.level.gradeName
            }}</span>
          </div>
          <!-- <div>
            <img src="../assets/images/experience.png" alt="" />{{
              TaskInfo.points
            }}
          </div> -->
          <div>
            <img src="../assets/images/kubi.png" alt="" class="gold" />
            <span>{{ TaskInfo.coins }}</span>
          </div>
        </div>
        <div v-else class="tologin">登录后可同步VIP特权</div>
      </div>
      <div v-if="login === true" class="set" @click="show = true">
        <p>设置</p>
      </div>
      <div v-else class="loginlink" @click="btnlogin"><p>立即登录</p></div>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="popup">
        <div @click="again">切换用户</div>
        <div @click="logout">退出登录</div>
        <div @click="show = false">取消</div>
      </div>
    </van-popup>
    <van-cell
      title="兑换记录"
      is-link
      :border="false"
      icon="search"
      class="cell_one"
      @click="tolistexchange"
    >
      <template #icon>
        <!-- <van-icon  style="line-height: inherit;" /> -->
        <img
          src="../assets/images/dui.png"
          alt=""
          width="24px"
          height="24px"
          class="tu"
          style="margin-right: 10px; vertical-align: middle;"
        />
      </template>
    </van-cell>
    <van-cell
      :border="false"
      title="消费记录"
      is-link
      icon="search"
      @click="tolisttask"
    >
      <template #icon>
        <!-- <van-icon  style="line-height: inherit;" /> -->
        <img
          src="../assets/images/renwu.png"
          alt=""
          width="24px"
          height="24px"
          class="tu"
          style="margin-right: 10px;vertical-align: middle;"
        />
      </template>
    </van-cell>
    <Nav :valuedata="2" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/views/Nav.vue";
import { homeApiControl, userApiControl, taskApiControl } from "@/core";
import initMixin from "@/mixins/initMixin";
import commonUtil from "@/utils/index";
import cacheUtil from "@/utils/cache";
import { handleloginurl } from "@/utils/login";
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
  Popup,
  Toast,
  Overlay,
  Image as VanImage,
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
  .use(Overlay)
  .use(VanImage)
  .use(Toast)
  .use(Popup);
export default {
  name: "My",
  components: {
    Nav,
  },
  data() {
    return {
      UserInfo: [], //用户头像，电话
      TaskInfo: [], //用户等级，经验，金币
      NowTime: new Date().getTime(),
      timePageStart: 0,
      show: false, //设置弹窗是否显示
      login: true, //判断是否登录
    };
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
    this.timePageStart = commonUtil.getTimeBySecond();
  },
  created() {
    this.$store.commit("setloginurl", window.location.href);
    // let _href = window.location.href;
    // let new_href = handleloginurl(_href);
    // this.$store.commit("setloginurl", new_href);
  },
  async mounted() {
    this.queryUserInfo();
    let data = {
      currentTimestamp: this.NowTime,
      accessToken: "",
      clientId: "",
    };
    this.queryPointsCoinsLevelInfo(data);
  },
  methods: {
    //重新登录
    again() {
      this.$checklogin("againlogin");
    },
    btnlogin() {
      this.$router.push("/");
    },
    //退出登录
    async logout() {
      let res = await taskApiControl.querylogout();
      if (res.code === 200) {
        this.show = false;
        this.login = false;
        this.$toast.success("退出成功");
      }
    },
    //获取用户头像等
    async queryUserInfo() {
      let res = await taskApiControl.queryUserInfo();
      // console.log(res);
      if (res.code === 200) {
        this.UserInfo = res.data;
      }
    },
    //用户等级，金币
    async queryPointsCoinsLevelInfo(data) {
      let res = await taskApiControl.queryPointsCoinsLevelInfo(data);
      console.log(res);
      if (res.code === "0") {
        this.TaskInfo = res.data;
      }
      //数据采集
      let that = this;
      this.$submitLogShow({
        page_name: "我的页面",
        page_state: "加载成功",
        load_duration: commonUtil.getTimeBySecond() - that.timePageStart,
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    }, //数据采集
    tolistexchange() {
      this.$router.push("/listexchange");
      this.$submitLogClick({
        page_name: "我的页面",
        button_name: "兑换记录",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    }, //数据采集
    tolisttask() {
      this.$router.push("/listtask");
      this.$submitLogClick({
        page_name: "我的页面",
        button_name: "任务记录",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  background-color: #fff;
  height: 100%;
  .header {
    font-size: 12px;
    margin-top: 20px;
    margin-left: 20px;
    height: 66px;
    width: 355px;
    display: flex;
    justify-content: space-between;
    .name {
      margin-left: -15px;
      margin-top: -3px;
      width: 150px;
      p {
        span:first-child {
          font-size: 16px !important;
          line-height: 22px;
          font-weight: bold;
          color: #333333;
        }
        span:last-child {
          font-size: 14px;
          padding-left: 5px;
          font-size: 14px;
          color: #666666;
        }
      }

      div {
        margin-top: 18px;
        // display: flex;
        width: 200px;
        div {
          font-size: 14px;
          line-height: 21px;
          display: inline;
          margin-right: 10px;
        }
        div img {
          vertical-align: middle;
        }
      }
    }
    .set {
      width: 77px;
      height: 32px;
      margin-top: 20px;
      text-align: center;
      cursor: pointer;
      background-color: #f5f4f0;
      border-radius: 100px 0px 0px 100px;
      p {
        line-height: 12px;
      }
    }
  }
}
::v-deep .van-cell {
  height: 50px;
  line-height: 35px;
  // line-height: 24px;
  color: #333333;
  font-size: 17px;
  vertical-align: middle;
}
::v-deep .van-cell__left-icon,
.van-cell__left-icon,
.van-cell__right-icon {
  line-height: 35px;
}
::v-deep .van-cell__left-icon {
  line-height: 35px;
}
::v-deep .cell_one {
  margin-top: 25px;
}
.tu {
  margin-top: 3px;
  vertical-align: middle;
}
.gold {
  margin-top: -3px;
}
.popup {
  width: 100%;
  height: 161px;
  font-size: 16px;
  color: #333333;
  text-align: center;
  div {
    width: 100%;
    height: 70px;
    line-height: 56px;
    // flex: 1;
    margin-top: 3px;
  }
}
::v-deep .van-popup--bottom.van-popup--round {
  border-radius: 10px 10px 0 0;
}
.title {
  font-size: 33px;
  line-height: 22px;
  color: #333333;
  font-weight: bold;
}
.tologin {
  font-size: 14px;
  line-height: 20px;
  color: #666666;
  opacity: 0.8;
}
.loginlink {
  width: 89px;
  height: 32px;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #fcb232;
  border-radius: 100px 0px 0px 100px;
  p {
    font-size: 15px;
    // line-height: 22px;
    color: #ffffff;
    line-height: 2px;
  }
}
</style>
