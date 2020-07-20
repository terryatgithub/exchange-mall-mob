<template>
  <div class="task">
    <van-tabs v-model="active" @click="onClick" sticky swipeable :swipe-threshold="4">
      <van-tab :title="tab.name" v-for="(tab, index) in TaskList" :key="index">
        <div>
          <van-grid :border="false" :column-num="2" class="cneter">
            <van-grid-item
              class="taskItem"
              v-for="item in tab.taskList"
              :key="item.name"
              icon="photo-o"
            >
              <!-- recommendImageUrl -->
              <div
                class="box"
                :class="[item.missionStatus === 2 ? 'unfinished' : 'box']"
                @click="
                  toApp(
                    item.taskAttr,
                    item.clickAction,
                    item.detailEvent2,
                    item.missionStatus,
                    item.appPackage,
                    item.missionId,
                    item.taskTag,
                    item.title
                  )
                "
              >
                <div class="header">
                  <div class="title">{{ item.title }}</div>
                  <div class="content">{{ item.subTitle }}</div>
                </div>
                <div class="bottom">
                  <span v-if="item.missionStatus === 2">
                    <img src="../assets/images/kubi_true.png" alt />
                    <span class="img_true">+{{ item.rewardCoins | numFilter }}</span>
                  </span>
                  <span v-else>
                    <img src="../assets/images/kubi.png" alt />
                    +{{
                    item.rewardCoins | numFilter
                    }}
                  </span>
                  <span v-if="item.missionStatus === 2">
                    <img src="../assets/images/express_true.png" alt />
                    <span class="img_true">+{{ item.rewardPoints | numFilter }}</span>
                  </span>
                  <span v-else>
                    <img src="../assets/images/experience.png" alt />
                    +{{
                    item.rewardPoints | numFilter
                    }}
                  </span>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
    <Nav class="nav" :valuedata="1" />
    <!-- <Test></Test> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/views/Nav.vue";
import Test from "@/views/test.vue";
import { homeApiControl, userApiControl, taskApiControl } from "@/core";
import initMixin from "@/mixins/initMixin";
import commonUtil from "@/utils/index";
import cacheUtil from "@/utils/cache";
import { handleloginurl } from "@/utils/login";
import Vue from "vue";
import { Button, Cell, Tab, Tabs, Toast, Grid, GridItem, Image } from "vant";
Vue.use(Button)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(Grid)
  .use(GridItem)
  .use(Toast)
  .use(Image);

let tab_name = "";
export default {
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  name: "Task",
  components: {
    Nav
    // Test,
  },
  data() {
    return {
      // isRouterAlive: true,
      active: 0,
      showList: [],
      TaskList: [],
      time: new Date().getTime(),
      timePageStart: 0
    };
  },
  mixins: [initMixin],
  beforeCreate() {
    this.timePageStart = commonUtil.getTimeBySecond();
  },
  created() {
    this.$store.commit("setloginurl", window.location.href);
    this.$checklogin(this.$store.state.loginurl);
  },
  async mounted() {
    console.log(this.$router.currentRoute);

    let data = {
      currentTimestamp: this.time,
      source: "YINHE",
      clientId: "9F072A0ABF6E2B3D",
      clientType: 2,
      accessToken: ""
    };
    this.queryTaskList(data);
  },

  updated() {
    tab_name = "";
    // this.$checklogin(this.$store.state.loginurl);
  },

  methods: {
    //任务列表
    async queryTaskList(data) {
      let res = await taskApiControl.queryTaskList(data);
      let List;
      if (res.code === "0") {
        List = res.data;
        let alllist = [
          { name: "日常任务", taskList: [] },
          { name: "新手任务", taskList: [] }
        ];
        for (let i = 0; i < 2; i++) {
          alllist[i].taskList = List.filter(item => {
            return item.taskTag === i + 1;
          });
        }
        this.TaskList = alllist;
        // console.log(this.TaskList);
      }
      for (let i = 0; i < this.TaskList.length; i++) {
        tab_name += this.TaskList[i].name + "-";
      }
      //数据采集
      let that = this;
      this.$submitLogShow({
        page_name: "任务主页面",
        tab_name: tab_name,
        page_state: "加载成功",
        load_duration: commonUtil.getTimeBySecond() - that.timePageStart,
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录"
      });
    },
    // 完成任务接口
    async querySubmitTask(data, taskTag, title) {
      let res = await taskApiControl.querySubmitTask(data);
      // console.log(res);
      if (res.code === "0") {
        this.$toast.success("完成成功");
      }
      let task_state;
      if (res.data.missionRewardDetails[0].status === -1) {
        task_state = "未完成";
      } else {
        let taskStates = ["未完成", "进行中", "已完成", "未完成"];
        task_state = taskStates[res.data.missionRewardDetails[0].status];
      }
      //数据采集-结果
      // debugger;
      this.$submitLogResult({
        task_id: res.data.missionRewardDetails[0].missionId,
        task_name: title,
        task_type: this.TaskList[taskTag - 1].name,
        task_state: task_state,
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录"
      });
    },
    //打开APP
    toApp(
      taskAttr,
      clickAction,
      detailEvent2,
      missionStatus,
      appPackage,
      missionId,
      taskTag,
      title
    ) {
      // debugger;
      if (missionStatus === 2) {
        this.$toast.fail("您已完成");
        return;
      }
      let data = {
        openId: "",
        sign: true,
        accessToken: "",
        userVipInfo: "",
        currentTimestamp: this.time,
        taskAttr: taskAttr,
        tagName: "app",
        appPackage: appPackage,
        openPage: detailEvent2,
        appVersion: "1000",
        appVersionName: "V1.01"
      };
      //数据采集-点击
      this.$submitLogClick({
        page_name: "任务主页",
        task_id: missionId,
        task_name: title,
        tab_name: this.TaskList[taskTag - 1].name,
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录"
      });
      this.querySubmitTask(data, taskTag, title);
      if (
        appPackage.indexOf("http") != -1 ||
        appPackage.indexOf("https") != -1
      ) {
        window.location.href = appPackage;
      } else {
        window.location.href = "http://" + appPackage;
      }
    },
    onClick(name, title) {},
    getUserInfo() {
      // console.log(this.$store.state.user.jsSdkInfo);
      // console.log(this.$store.state.user.wxUserInfo);
    },
    setLocalStorage() {
      const _value = commonUtil.createUniqueString();
      console.log(_value);
      cacheUtil.setLocalStorage("fyb_test", _value);
    },
    getLocalStorage() {
      console.log(cacheUtil.getLocalStorage("fyb_test"));
    },
    showNoticeToast() {
      this.$Notice.info({ content: "这是提示弹窗", duration: 3 });
    },
    async showQRCodeToast() {
      await this.$showQRCodeToast({ qrUrl: "https://www.baidu.com" });
    },
    async showMiniAppCodeToast() {
      await this.$showQRCodeToast({
        miniappUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778211873&di=1d3b87c0108cdbd2984383e7df7e8771&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170430%2F6e8b2cb24fcb491bbf4d9a69c836ebe2_th.jpeg"
      });
    },
    handleVConsole() {
      if (document.getElementById("__vconsole").style.display === "none")
        document.getElementById("__vconsole").style.display = "block";
      else {
        document.getElementById("__vconsole").style.display = "none";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .nav {
//   position: fixed;
//   left: 0;
//   bottom: 0;
// }
::v-deep .van-grid {
  margin-bottom: 50px;
}
::v-deep .van-grid-item__content {
  padding: 10px 8px;
}
.task {
  @include flex(column, wrap);
  .vant-btn {
    width: 355px;
    // margin: 10px;
  }
  // .taskItem {
  //   height: 98px;
  // }
  height: 100%;
  background-color: #fff;
  .center {
    background-color: #fff;
  }
  .box {
    width: 187px;
    height: 102px;
    cursor: pointer;
    text-align: center;
    margin-bottom: 1px;
    background-image: linear-gradient(#fff3e6, #ffffff);
    box-shadow: 0px 2px 4px 0px rgba(236, 236, 236, 0.1);
    background-color: #ffffff;
    background-size: cover;
    background-image: url(../assets/images/task.png);
    .header {
      margin-top: 2px;
      padding-left: 10px;
      color: #ffffff;
      text-align: center;
      height: 74px;
      .title {
        padding-top: 10px;
        // display: inline-block;
        font-size: 14px;
        line-height: 21px;
      }
      .content {
        // display: inline-block;
        padding: 2px 10px 0px 10px;
        font-size: 10px;
        line-height: 14px;
      }
    }
    .bottom {
      width: 172px;
      margin-left: 8px;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 2px 4px 0px rgba(236, 236, 236, 1);
      background-image: linear-gradient(#fff3e6, #ffffff);
      border-radius: 0px 0px 4px 4px;

      span {
        flex: 1;
        // box-shadow: 0px 2px 4px 0px rgba(236, 236, 236, 1);
        color: #ffab00;
        font-size: 12px;
        line-height: 18px;
        img {
          vertical-align: bottom;
          // padding-right: 5px;
        }
      }
    }
  }
}
::v-deep .van-tab {
  margin-right: 10px;
  margin-left: 4px;
}
.unfinished {
  background-image: url(../assets/images/task_falut.png) !important;
}
.task .box .bottom .img_true {
  color: #666666;
  font-size: 12px;
  line-height: 18px;
  padding-bottom: 5px;
  img {
    vertical-align: bottom;
    // padding-right: 5px;
  }
}
.van-toast__text {
  white-space: nowrap;
}
::v-deep .van-grid-item__content {
  padding: 0px;
}
::v-deep .van-tab {
  font-weight: bold;
  color: #cccccc;
}
::v-deep .van-tab--active {
  font-weight: bolder;
  color: #333333;
}
</style>
