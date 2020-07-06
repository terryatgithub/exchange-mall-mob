<template>
  <!-- <div class="list" v-if="orderList != ''"> -->
  <div class="list">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="400"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in orderList"
        :key="item.id"
        :price="item.goldNumber"
        :title="item.goods.goodsName"
        :thumb="item.goods.goodsGalleries[0].imgUrl"
      >
        <!-- <template #title>
          <div class="van-card__title" plain>{{ item.goodsName }}</div>
        </template> -->
        <template #price>
          <div plain class="van-card__price-integer">
            <span class="kubi_title">{{ item.goldNumber }}</span>
            <img src="../assets/images/kubi.png" alt="" class="kubi_tu" />
          </div>
        </template>
        <template #footer>
          <van-button
            v-if="item.address === null && item.goods.goodsType === 1"
            round
            type="warning"
            size="normal"
            color="linear-gradient(to right, #FF8600, #FD4E00)"
            @click="toaddress(item.orderSn)"
            >继续领取</van-button
          >
          <van-button
            v-else
            round
            type="warning"
            size="normal"
            color="linear-gradient(to right, #FF8600, #FD4E00)"
            @click="btn(item.id)"
            >订单详情</van-button
          >
        </template>
      </van-card>
    </van-list>
    <div v-if="list != ''">
      <!-- 兑换提示框 ---跳转url,二维码跳转-->
      <van-overlay
        :show="showOverlay"
        @click="showOverlay = false"
        v-if="list.goods.goodsType === 1 || list.goods.goodsType === 8"
      >
        <div class="overlay-wrapper" @click.stop>
          <div class="prompt">
            <p class="one">兑换订单详情</p>
            <br />
            <p class="tow">兑换时间：{{ list.exchangeTime | timeFilter }}</p>
            <!-- <p class="three">兑换码：{{ list.goodsIdCoilCode }}</p> -->
          </div>
          <!-- url跳转 -->
          <div
            class="box_url"
            v-if="
              list.goods.goodsType === 1 ||
                (list.goods.goodsType === 8 && list.goods.receiveType == 1)
            "
          >
            <div class="top">
              <img
                :src="list.goods.goodsGalleries[0].imgUrl"
                alt=""
                width="80px"
                height="80px"
              />
              <div>
                <div class="title">{{ list.goods.goodsName }}</div>
                <br />
                <div class="price">
                  {{ list.goldNumber
                  }}<img
                    src="../assets/images/kubi@2x.png"
                    alt=""
                    class="kubi_tu2"
                  />
                </div>
              </div>
            </div>
            <div class="bottom">
              <!-- <div v-if="list.goods.goodsType != 1">
                <van-button class="url_btn">跳转购买</van-button>
                <van-button class="btn_address" @click="toMy">
                  返回主页 </van-button
                ><br />
              </div> -->
              <!-- <div v-else> -->
              <van-button class="btn_address" @click="toMy">
                返回
              </van-button>
              <!-- </div> -->
              <span class="url">首页→我的→兑换记录，查看所有兑换</span>
            </div>
          </div>
          <!-- 二维码 -->
          <div
            class="box_ma"
            v-else-if="
              list.goods.goodsType === 8 && list.goods.receiveType === 3
            "
          >
            <div class="top" v-if="orderList != ''">
              <img
                :src="list.goods.receiveSource"
                alt=""
                width="94px"
                height="94px"
              />
              <div>
                <span class="title">{{ list.goods.goodsName }}</span>
                <div class="price">
                  {{ list.goldNumber
                  }}<img
                    src="../assets/images/kubi@2x.png"
                    alt=""
                    class="kubi_tu2"
                  />
                </div>
                <div class="ma">长按二维码，</div>
                <div class="ma">
                  进入小程序购买商品
                </div>
              </div>
            </div>
            <div class="bottom">
              <van-button class="url_btn" @click="toMy"> 返回 </van-button
              ><br />
              <div class="url">首页→我的→兑换记录，查看所有兑换</div>
            </div>
          </div>
        </div>
      </van-overlay>
      <!-- 兑换提示框 ---兑换优惠券-->
      <van-overlay
        :show="showOverlay"
        @click="showOverlay = false"
        v-if="
          list.goods.goodsType === 2 ||
            list.goods.goodsType === 3 ||
            list.goods.goodsType === 4 ||
            (list.goods.goodsType === 8 && list.goods.receiveType === 2)
        "
      >
        <div class="overlay-wrapper" @click.stop>
          <!-- <div class="prompt discount">
            <p class="vip">兑换订单详情</p>
          </div> -->
          <div class="prompt">
            <p class="one">兑换订单详情</p>
            <br />
            <p class="tow">兑换时间：{{ list.exchangeTime | timeFilter }}</p>
            <p class="three">兑换码：{{ list.goodsIdCoilCode }}</p>
          </div>
          <!-- <div class="box_discount">
            <div class="top">
              <span class="title">{{ list.goods.goodsName }}</span>
              <span class="price">{{ list.goods.brief }}</span>
              <div class="discount_ma">兑换码：{{ list.coilCode }}</div>
            </div>
            <div class="bottom">
              <van-button class="url_btn" @click="toMy"> 返回 </van-button
              ><br />
              <div class="url">首页→我的→兑换记录，查看所有兑换</div>
            </div>
          </div> -->
          <div class="box_discount">
            <!-- 第三方优惠券 -->
            <div class="top" v-if="list.goods.goodsType === 8">
              <span class="title">{{ list.goods.goodsName }}</span>
              <span class="price">{{ list.goods.brief }}</span>
              <div class="discount_ma">兑换码：{{ orderList.coilCode }}</div>
            </div>
            <!-- 平台优惠券 -->
            <div v-else class="discount_ma_ping">
              <span class="title">{{ list.goods.goodsName }}</span>
            </div>
            <div class="bottom">
              <van-button class="url_btn" @click="toMy"> 返回 </van-button
              ><br />
              <div class="url">首页→我的→兑换记录，查看所有兑换</div>
            </div>
          </div>
        </div>
      </van-overlay>
      <!-- 兑换提示框 ---兑换会员-->
      <van-overlay
        :show="showOverlay"
        @click="showOverlay = false"
        v-if="
          list.goods.goodsType === 5 ||
            list.goods.goodsType === 6 ||
            list.goods.goodsType === 7
        "
      >
        <div class="overlay-wrapper" @click.stop>
          <!-- <div class="prompt_vip">
            <img
              src="../assets/images/ok.png"
              alt=""
              width="90px"
              height="90px"
            />
            <p class="vip">恭喜您，会员权益立即生效！</p>
            <span>可前往XXXVIP产品面查看</span>
          </div> -->
          <div class="prompt">
            <p class="one">兑换订单详情</p>
            <br />
            <p class="tow">兑换时间：{{ list.exchangeTime | timeFilter }}</p>
            <p class="three">兑换码：{{ list.goodsIdCoilCode }}</p>
          </div>
          <!-- 兑换会员 -->
          <div class="box_vip">
            <div class="top">
              <div class="vip_tu">
                <div :style="{ 'margin-top': '20px' }">会员卡</div>
                <!-- <div>VIP体验卡</div> -->
              </div>
              <div>
                <span class="title">{{ list.goods.goodsName }}</span>
                <span class="price"
                  >{{ list.goldNumber
                  }}<img
                    src="../assets/images/kubi@2x.png"
                    alt=""
                    class="kubi_tu2"
                /></span>
              </div>
            </div>
            <div class="bottom">
              <van-button class="url_btn" @click="toMy"> 返回 </van-button
              ><br />
              <div class="url">首页→我的→兑换记录，查看所有兑换</div>
            </div>
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {
  homeApiControl,
  userApiControl,
  taskApiControl,
  mallApiControl,
} from "@/core";
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
  name: "ListExchange",
  created() {
    this.$store.commit("setloginurl", window.location.href);
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      showOverlay: false, //弹框是否显示
      orderList: [], //兑换列表
      list: [], //商品详情列表
    };
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
  },
  mounted() {
    // this.queryShopHistory({ page: this.page, size: this.size });
  },
  methods: {
    // 商品兑换列表
    // async queryShopHistory(data) {
    //   let res = await taskApiControl.queryShopHistory(data);
    //   console.log(res);
    //   if (res.code === 200) {
    //     this.orderList = [...this.orderList, ...res.data.orders];
    //     console.log(this.orderList);
    //   }
    // },
    toaddress(orderSn) {
      this.$router.push({
        name: "address",
        params: {
          orderid: orderSn,
        },
      });
    },
    btn(goodsid) {
      // console.log(goodsid);
      let data = this.orderList.filter((item) => {
        return item.id === goodsid;
      });
      this.list = data[0];
      this.showOverlay = true;
      console.log(this.list);
    },
    toMy() {
      // this.$router.go(0);
      this.showOverlay = false;
    },

    async onLoad() {
      // (this.loading = false), (this.finished = true);
      let res = await taskApiControl.queryShopHistory({
        page: this.page,
        size: this.size,
      });
      console.log(this.page);
      console.log(this.size);
      console.log(res);
      let state = 1;
      if (res.code === 200) {
        this.orderList = [...this.orderList, ...res.data.orders];
        state = 1;
      } else {
        state = 0;
      }
      this.$submitLogShow({
        page_name: "兑换记录页面",
        page_state: state ? "加载成功" : "加载异常",
        open_id: this.$store.state.loginstate === 1 ? "已登录" : "未登录",
      });
      // 将加载状态设置为 false
      this.loading = false;
      // 将页码 ++
      this.page++;
      // 判断结果是否为空
      if (res.data.orders.length === 0) {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  height: 100%;
  .van-list {
    padding-top: 10px;
    background-color: #eeeeee;
    height: 667px;
  }
  .van-card__footer {
    float: right;
    position: absolute;
    height: 28px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .van-button {
    height: 30px;
    line-height: 30px;
  }
}
.van-card__content {
  padding: 10px 0px;
}

//弹框样式
.van-overlay {
  display: flex;
  align-items: center;
  justify-content: center;

  .overlay-wrapper {
    width: 295px;
    height: 388px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    border-radius: 12px;
  }
}
.prompt {
  width: 295px;
  height: 149px;
  margin-top: 0px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  p {
    margin: 0px;
    color: #333333;
    font-size: 17px;
    line-height: 24px;
  }
  .one {
    margin-top: 33px;
    font-size: 17px;
    font-weight: bold;
  }
  .tow,
  .three {
    font-size: 14px;
    line-height: 20px;
  }
  .vip {
    color: #fa6400;
  }
}
.goods_intro {
  font-size: 16px;
}

// 兑换会员
.prompt_vip {
  width: 295px;
  height: 171px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  p {
    margin-top: -3px;
    margin-bottom: 0px;
    color: #fa6400;
    font-size: 17px;
    line-height: 24px;
  }
  span {
    color: #fa6400;
    font-size: 12px;
    line-height: 17px;
    opacity: 0.6;
  }
}
// 兑换弹出框--url跳转
.overlay-wrapper .box_url .top {
  height: 80px;
  margin: 30px 22px;
  // border: 1px solid black;
  display: flex;
  img {
    margin-right: 11px;
  }
  .title {
    display: inline-block;
    margin-bottom: 14px;
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    font-weight: bold;
  }
  .price {
    font-size: 10px;
    line-height: 15px;
    color: #fd4e00;
    font-weight: bold;
  }
}
.van-overlay .box_url .bottom {
  text-align: center;
  .url_btn {
    width: 125px;
    height: 42px;
    background-color: #fcb232;
    color: #ffffff;
    font-size: 16px;
    line-height: 22px;
    border-radius: 8px;
    margin-right: 5px;
  }
  .cancel_btn {
    width: 125px;
    height: 42px;
    background-color: #afafaf;
    color: #ffffff;
    border-radius: 8px;
    line-height: 22px;
  }
  .url {
    display: inline-block;
    color: #999999;
    font-size: 10px;
    line-height: 15px;
  }
}
// 兑换弹出框--二维码跳转
.overlay-wrapper .box_ma .top {
  height: 94px;
  margin: 30px 10px;
  display: flex;
  img {
    margin-right: 11px;
  }
  .title {
    display: inline-block;
    // margin-bottom: 4px;
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .price {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 10px;
    line-height: 15px;
    color: #fd4e00;
  }
  .ma {
    color: #fcb232;
    font-size: 12px;
    line-height: 14px;
  }
}
.van-overlay .box_ma .bottom {
  text-align: center;
  .url_btn {
    width: 255px;
    height: 42px;
    background-color: #fcb232;
    color: #ffffff;
    font-size: 16px;
    line-height: 22px;
    border-radius: 8px;
    margin-right: 5px;
  }
  .url {
    color: #999999;
    font-size: 10px;
    line-height: 15px;
  }
}
// 兑换弹出框--兑换优惠券
.prompt {
  border: 0px;
}
.overlay-wrapper .box_discount .top {
  width: 254px;
  height: 144px;
  margin: 0px 20px 20px 20px;
  background-image: linear-gradient(#f5dbb0, #e1b882);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    display: inline-block;
    margin-top: 20px;
    font-size: 20px;
    color: #835b21;
    line-height: 48px;
    font-weight: Medium;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    font-size: 14px;
    line-height: 21px;
    opacity: 0.6;
    color: #835b21;
    font-weight: bold;
    font-family: Noto Sans S Chinese Regular;
  }
  .discount_ma {
    position: relative;
    width: 224px;
    height: 28px;
    margin: 15px 0px;
    padding: 7px 0px;
    text-align: center;
    background-color: rgba(46, 28, 13, 0.2);
    // opacity: 0.2;
    color: #111111;
    opacity: 1;
    font-size: 13px;
    // line-height: 21px;
    border-radius: 4px;
  }
}
.overlay-wrapper .box_discount .discount_ma_ping {
  width: 235px;
  height: 90px;
  margin: 24px 33px 26px 27px;
  background-image: url("../assets/images/quan.png");
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #835b21;
  font-size: 16px;
  line-height: 24px;
}
.van-overlay .box_discount .bottom {
  text-align: center;
  .url_btn {
    width: 255px;
    height: 42px;
    background-color: #fcb232;
    color: #ffffff;
    font-size: 16px;
    line-height: 22px;
    border-radius: 8px;
    margin-right: 5px;
  }
  .url {
    color: #999999;
    font-size: 10px;
    line-height: 15px;
  }
}
// 兑换弹出框--兑换会员
.overlay-wrapper .box_vip .top {
  height: 80px;
  margin: 20px 0px;
  display: flex;
  // img {
  //   margin-right: 11px;
  // }
  .vip_tu {
    width: 80px;
    height: 80px;
    font-size: 20px;
    background-image: linear-gradient(#2c2a27, #5b595b);
    background-image: url("../assets/images/card.png");
    background-position: center;
    margin-right: 10px;
    div {
      text-align: center;
      margin-top: 5px;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .title {
    display: inline-block;
    font-weight: Medium;
    font-weight: bold;
    margin-top: 14px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .price {
    display: inline-block;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 21px;
    color: #fd4e00;
  }
}
.van-overlay .box_vip .bottom {
  text-align: center;
  .url_btn {
    width: 255px;
    height: 42px;
    background-color: #fcb232;
    color: #ffffff;
    font-size: 16px;
    line-height: 22px;
    border-radius: 8px;
    margin-right: 5px;
  }
  .url {
    color: #999999;
    font-size: 10px;
    line-height: 15px;
  }
}
.btn_address {
  width: 255px;
  height: 42px;
  background-color: #fcb232;
  color: #ffffff;
  font-size: 16px;
  line-height: 22px;
  border-radius: 8px;
  // margin-right: 5px;
  // margin-left: 20px;
}
.van-card__price-currency,
.van-card__price-integer {
  color: #fd4e00;
  font-size: 14px;
}
::v-deep .van-card__title {
  font-size: 16px;
  line-height: 20px;
}
.kubi_tu {
  width: 19px;
  height: 19px;
  vertical-align: top;
}
.kubi_tu2 {
  width: 18px;
  height: 17px;
  vertical-align: middle;
  margin-top: -5px;
}
</style>
