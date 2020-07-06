<template>
  <div class="home">
    <van-tabs v-model="active" @click="onClick" sticky>
      <van-tab
        :title="tab.specialAreaTabTitle"
        v-for="tab in goodsList"
        :key="tab.id"
      >
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="item in tab.activitys"
            :key="item.id"
            icon="photo-o"
            @click="
              goodsclick(item.id, item.goods.goodsName, item.goods.goodsId)
            "
          >
            <!-- to="/detail?" -->
            <div class="goodsList">
              <div>
                <van-image
                  :src="item.goods.goodsGalleries[0].imgUrl"
                  class="goods_Ima"
                />
              </div>
              <div class="goods_Text">{{ item.goods.goodsName }}</div>
              <div class="goods_Price">
                <span>
                  {{ item.goldPrice
                  }}<img src="../assets/images/kubi.png" alt="" class="kubi_tu"
                /></span>
              </div>
              <div class="goods_Value">
                <span>价值：{{ item.goods.marketPrice }}</span
                ><span>剩余件数：{{ item.activityStock }}</span>
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
    <Nav ref="navclick" :valuedata="0" />
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/views/Nav.vue";
import { mallApiControl, taskApiControl } from "@/core";
import initMixin from "@/mixins/initMixin";
import commonUtil from "@/utils/index";
import cacheUtil from "@/utils/cache";
import { handleloginurl } from "@/utils/login"; //是否登录判断
import Vue from "vue";
import {
  Button,
  Icon,
  Cell,
  Tab,
  Tabs,
  Toast,
  Grid,
  GridItem,
  Image,
  Form,
} from "vant";
Vue.use(Button)
  .use(Cell)
  .use(Tab)
  .use(Tabs)
  .use(Grid)
  .use(GridItem)
  .use(Icon)
  .use(Image);

let tab_name = "";
export default {
  name: "Home",
  components: {
    Nav,
  },
  data() {
    return {
      active: 0,
      goodsList: [],
      time: new Date().getTime(),
      timePageStart: 0,
    };
  },
  // mixins: [initMixin],
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
    this.timePageStart = commonUtil.getTimeBySecond();
  },
  async mounted() {
    await this.mallInit();
    let state = window.location.href;
  },
  created() {
    this.$store.commit("setloginurl", window.location.href);
  },
  updated() {
    tab_name = "";
  },
  methods: {
    async mallInit() {
      let ret = await mallApiControl.init();
      // window.console.log(this.goodsList);
      if (ret.code === 200) {
        console.log(ret);
        let topicId = 95;
        let data = await mallApiControl.topicPage({ topicId });
        this.goodsList = data.data;
        this.active = this.goodsList.findIndex((item) => {
          return item.specialAreaTabSelect === "1";
        });
        console.log(this.goodsList);

        for (let i = 0; i < this.goodsList.length; i++) {
          tab_name += this.goodsList[i].specialAreaTabTitle + "-";
        }
        let that = this;
        this.$submitLogShow({
          page_name: "兑换商城主页",
          tab_name: tab_name,
          page_state: "加载成功",
          load_duration: commonUtil.getTimeBySecond() - that.timePageStart,
          open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
        });
      }
    },
    goodsclick(id, name, goodsId) {
      this.$router.push("detail?actId=" + id);
      this.$submitLogClick({
        page_name: "兑换商城主页",
        tab_name: this.goodsList[this.active].specialAreaTabTitle,
        commodity_id: goodsId,
        commodity_name: name,
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
    },
    onClick(name, title) {},
    getUserInfo() {
      console.log(this.$store.state.user.jsSdkInfo);
      console.log(this.$store.state.user.wxUserInfo);
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
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582778211873&di=1d3b87c0108cdbd2984383e7df7e8771&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170430%2F6e8b2cb24fcb491bbf4d9a69c836ebe2_th.jpeg",
      });
    },
    handleVConsole() {
      if (document.getElementById("__vconsole").style.display === "none")
        document.getElementById("__vconsole").style.display = "block";
      else {
        document.getElementById("__vconsole").style.display = "none";
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  // overflow: scroll;
  @include flex(column, wrap);
  .vant-btn {
    width: 355px;
    margin: 10px;
    touch-action: none;
  }

  .goodsList {
    width: 170px;
    // height: 266px;
    margin-left: 1px;
    display: flex;
    flex-direction: column;
    .goods_Ima {
      width: 170px;
      height: 145px;
    }
    .goods_Text {
      padding-left: 5px;
      height: 36px;
      font-size: 14px;
      line-height: 18px;
      max-width: 400px;
      display: -webkit-box;
      -webkit-box-orient: vertical; //文字溢出隐藏
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .goods_Price {
      padding-left: 5px;
      height: 22px;
      color: #fa6400;
      font-size: 12px;
      margin-top: 4px;
      line-height: 17px;
      font-weight: bold;
      span {
        font-size: 16px;
      }
    }
    .goods_Value {
      padding-left: 5px;
      height: 14px;
      font-size: 10px;
      line-height: 14px;
      color: #999999;
      display: flex;
      span {
        flex: 1;
      }
    }
  }
  .van-grid-item__content {
    padding-top: 10px;
  }
}
::v-deep .van-grid {
  margin-bottom: 50px;
}
.kubi_tu {
  width: 18px;
  height: 17px;
  vertical-align: top;
}
.goodsList {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding-bottom: 8px;
}
::v-deep .van-tab {
  font-weight: bold;
  color: #cccccc;
}
::v-deep .van-tab--active {
  font-weight: bolder;
  color: #333333;
}
::v-deep .van-grid-item__content {
  padding-bottom: 0px;
}
</style>
