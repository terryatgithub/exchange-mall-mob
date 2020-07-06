<template>
  <div class="goodsDetail" v-if="list != ''">
    <van-swipe @change="onChange" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img lazy-load :src="item.imgUrl" @click="big(item)" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ images.length }}
        </div>
      </template>
    </van-swipe>

    <van-card class="goods-info" price="12">
      <template #num> 每人限兑{{ list.limitTimes }}件 </template>
      <template #origin-price>
        <div plain>市场价值: ￥{{ list.goods.marketPrice }}元</div>
      </template>
      <template #title>
        <div class="van-card__title" plain>{{ list.goods.goodsName }}</div>
      </template>
      <template #desc>
        <div
          class="goods-desc"
          v-if="list.goods.exchangeRules != ''"
          v-html="list.goods.exchangeRules"
        ></div>
        <div style="display:none"></div>
      </template>
      <template #price>
        <div plain class="van-card__price-integer">
          {{ list.goldPrice
          }}<img src="../assets/images/kubi@2x.png" alt="" class="kubi_tu" />
        </div>
      </template>
    </van-card>

    <van-card
      class="stock-info"
      desc="兑换时间：2020.05.05  00:00 - 2021.04.01  00:00"
      title="剩余数量：567件"
    >
      <template #title
        ><div class="goods_num">剩余数量：{{ list.activityStock }}件</div>
      </template>
      <template #desc
        ><div class="goods_num">
          兑换时间：{{ list.startTime | timeFilter }} -
          {{ list.endTime | timeFilter }}
        </div></template
      >
    </van-card>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <template #default>
        <div>
          <div
            v-if="!finished"
            class="more-detail"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchCancel"
          >
            <van-divider
              :style="{
                color: '#1989fa',
                borderColor: '#1989fa',
                padding: 'padding: 10px 35px 0;',
              }"
              >图文详情
            </van-divider>
            <div class="tips">上拉查看更多详情</div>
          </div>
          <div v-else class="goodsShow">
            <van-divider
              :style="{
                color: '#d8d8d8',
                borderColor: '#d8d8d8',
                padding: '10px 0px',
              }"
              >商品详情</van-divider
            >
            <div class="goods_intro" v-html="list.goods.commonRules"></div>
          </div>
        </div>
      </template>
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    </van-list>

    <van-button
      v-if="faultmsg === ''"
      color="linear-gradient(to right, #FF8600, #FD4E00)"
      @click="onClickButton"
      size="16"
      class="btn"
      >立即兑换</van-button
    >
    <van-button
      v-else
      color="#AFAFAF"
      @click="onClickButton"
      disabled
      size="16"
      class="btn"
      >兑换数量已达上限</van-button
    >
    <!-- 兑换提示框 ---跳转url,二维码跳转-->
    <van-overlay
      :show="showOverlay"
      @click="showOverlay = false"
      v-if="
        (list.goods.goodsType === 1 && code === '') ||
          (list.goods.goodsType === 8 && code === '')
      "
    >
      <div class="overlay-wrapper" @click.stop>
        <div class="prompt">
          <img
            src="../assets/images/ok.png"
            alt="图片加载异常"
            width="90px"
            height="90px"
          />
          <p>恭喜您，兑换完成！</p>
        </div>
        <!-- url跳转 -->
        <div
          class="box_url"
          v-if="
            (list.goods.goodsType === 1 && code === '') ||
              (list.goods.goodsType === 8 &&
                list.goods.receiveType == 1 &&
                code === '')
          "
        >
          <div class="top">
            <img
              :src="list.goods.goodsGalleries[0].imgUrl"
              alt="图片加载异常"
              width="80px"
              height="80px"
            />
            <div>
              <div class="title">{{ list.goods.goodsName }}</div>
              <div class="price">
                {{ list.goldPrice
                }}<img
                  src="../assets/images/kubi@2x.png"
                  alt=""
                  class="kubi_tu2"
                />
              </div>
            </div>
          </div>
          <div class="bottom">
            <div v-if="list.goods.goodsType != 1">
              <van-button
                class="url_btn"
                @click="toUrl(orderList.goods.receiveSource)"
                >跳转购买</van-button
              >
              <van-button class="cancel_btn" @click="goback">
                返回主页 </van-button
              ><br />
            </div>
            <div v-else>
              <van-button class="btn_address" @click="toAddress">
                填写地址
              </van-button>
            </div>
            <span class="url">首页→我的→兑换记录，查看所有兑换</span>
          </div>
        </div>
        <!-- 二维码 -->
        <div
          class="box_ma"
          v-else-if="list.goods.goodsType === 8 && list.goods.receiveType === 3"
        >
          <div class="top" v-if="orderList != ''">
            <img
              :src="orderList.goods.receiveSource"
              alt="图片加载异常"
              width="94px"
              height="94px"
            />
            <div>
              <span class="title">{{ orderList.goods.goodsName }}</span>
              <div class="price">
                ￥{{ orderList.goldNumber
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
            <van-button class="url_btn" @click="goback"> 返回主页 </van-button
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
        (list.goods.goodsType === 2 && code === '') ||
          (list.goods.goodsType === 3 && code === '') ||
          (list.goods.goodsType === 4 && code === '') ||
          (list.goods.goodsType === 8 &&
            list.goods.receiveType === 2 &&
            code === '')
      "
    >
      <div class="overlay-wrapper" @click.stop>
        <div class="prompt discount">
          <img
            src="../assets/images/ok.png"
            alt="图片加载异常"
            width="90px"
            height="90px"
          />
          <p class="vip">恭喜您，兑换完成！</p>
        </div>
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
            <van-button class="url_btn" @click="goback"> 返回主页 </van-button
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
        (list.goods.goodsType === 5 && code === '') ||
          (list.goods.goodsType === 6 && code === '') ||
          (list.goods.goodsType === 7 && code === '' && code === '')
      "
    >
      <div class="overlay-wrapper" @click.stop>
        <div class="prompt_vip">
          <img
            src="../assets/images/ok.png"
            alt="图片加载异常"
            width="90px"
            height="90px"
          />
          <p class="vip">恭喜您，会员权益立即生效！</p>
          <span>可前往XXXVIP产品面查看</span>
        </div>
        <!-- 兑换会员 -->
        <div class="box_vip">
          <div class="top">
            <div class="vip_tu">
              <div :style="{ 'margin-top': '20px' }">会员卡</div>
              <!-- <div>VIP体验卡</div> -->
            </div>
            <div v-if="orderList != ''">
              <span class="title">{{ orderList.goods.goodsName }}</span>
              <span class="price"
                >{{ orderList.goldNumber
                }}<img
                  src="../assets/images/kubi@2x.png"
                  alt=""
                  class="kubi_tu2"
              /></span>
            </div>
          </div>
          <div class="bottom">
            <van-button class="url_btn" @click="goback"> 返回主页 </van-button
            ><br />
            <div class="url">首页→我的→兑换记录，查看所有兑换</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 兑换提示框 ---错误提示-->
    <van-overlay
      :show="showOverlay"
      @click="showOverlay = false"
      v-if="code != ''"
    >
      <div class="fault" @click.stop>
        <div class="fault_prompt">
          <img
            src="../assets/images/fault.png"
            alt="图片加载异常"
            width="90px"
            height="90px"
          />
          <div v-if="code === ''">
            <p>数据异常，兑换失败！</p>
          </div>
          <div v-else-if="code.code === 20009">
            <div class="title">
              抱歉兑换失败！
            </div>
            <div class="text">
              {{ code.msg }}
            </div>
            <van-button
              class="tovip"
              url="http://wx.coocaa.com/movies/orderVIP.html"
              >前往开通VIP</van-button
            >
          </div>
          <div v-else-if="code.code === 20007">
            <div class="title_fault">
              登录过期，请重新登录！
            </div>
          </div>
          <div v-else>
            <p>{{ code.msg }}</p>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- <sucess /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import sucess from "@/views/sucess.vue";
import { homeApiControl, userApiControl, mallApiControl } from "@/core";
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
  ImagePreview,
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
  .use(ImagePreview)
  .use(Overlay);

export default {
  name: "Home",
  components: {
    // sucess,
  },
  data() {
    return {
      current: 0,
      images: [], //轮播图片
      list: [], //商品数据
      orderList: [], //兑换商品数据
      loading: false,
      finished: false,
      showOverlay: false,
      isshow: false,
      code: "", //兑换状态码
      faultmsg: "", //兑换提示
    };
  },
  mixins: [initMixin],
  beforeCreate() {
    // this.$checklogin(this.$store.state.loginurl);
  },
  async created() {
    this.$store.commit("setloginurl", window.location.href);
    //获取商品id
    let actId = this.$route.query.actId;
    console.log(actId);
    this.queryGoodsDetail(actId); //发请求
    // console.log(this.list);
    this.isshow = true;
    //检验用户兑换资格
    this.queryUserCheck({
      actId: actId,
    });
  },
  async mounted() {
    // console.log(this.list);
    // console.log("Home mounted()");
    // await this.init()
    // try {
    //   const data = await homeApiControl.init()
    //   console.log(data)
    // } catch (err) {
    //   console.log('111', err)
    // }
    // const data2 = await userApiControl.getUserInfo()
    // console.log(data2)
  },
  methods: {
    big() {
      let imgarr = this.images.map((item) => {
        return item.imgUrl;
      });
      // console.log(imgarr);
      // 预览图片
      ImagePreview({
        images: imgarr,
        // 预览框的关闭事件
        onClose: this.closePreview,
      });
    },
    async queryGoodsDetail(actId) {
      let res = await mallApiControl.actInfo({ actId });
      if (res.code == 200) {
        this.list = res.data.activity;
        this.images = res.data.activity.goods.goodsGalleries;
        // console.log(this.list);
      }
    },
    //检验用户兑换资格
    async queryUserCheck(data, two) {
      let res = await mallApiControl.UserCheck(data);
      // debugger;
      if (res.code === 20017 || res.code === 20003) {
        this.faultmsg = "兑换数量已达上限";
        return;
      }
      if (two === true) {
        if (res.code === 200) {
          // console.log(this.list.id);
          let data = {
            actId: this.list.id,
          };
          this.queryExchange(data);
          this.showOverlay = true;
        } else {
          this.code = res;
          this.showOverlay = true;
        }
      }
    },
    //兑换活动商品接口
    async queryExchange(data) {
      let res = await mallApiControl.Exchange(data);
      if (res.code === 200) {
        this.orderList = res.data;
        // console.log(this.orderList);
      }
    },
    goback() {
      this.$router.back();
    },
    toUrl(url) {
      window.location.href = "http://" + url;
    },
    toAddress() {
      // this.$router.push(`/address?goodsid=${this.list.id}`);
      this.$router.push({
        name: "address",
        params: {
          // goodsid: this.list.id,
          orderid: this.orderList.orderSn,
        },
      });
    },
    onTouchStart() {
      console.log("touch start.");
    },
    onTouchMove() {
      console.log("touch move.");
    },
    onTouchEnd() {
      console.log("touch end.");
      this.onLoad();
    },
    onTouchCancel() {
      console.log("touch cancel.");
    },
    onClickIcon() {
      alert("点击图标");
    },
    onClickButton() {
      this.queryUserCheck(
        {
          actId: this.list.id,
        },
        true
      );
      this.$store.commit("setorders", this.orderList.orderSn);
      // this.$store.commit("setgoods", this.list.id);
    },
    onLoad() {
      this.loading = false;
      this.finished = true;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.goodsDetail {
  height: 100%;
  position: relative;
  display: inline-block !important;
  @include flex(column, wrap);
  background-color: #eeeeee !important;
  .vant-btn {
    width: 375px !important;
    margin: 10px;
  }
}
.van-swipe {
  width: 375px;
  height: 306px;
  img {
    width: 100%;
    height: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
}
.van-card {
  padding: 0px 15px !important;
}
.goods-info {
  margin-top: 0 !important;
}
.van-divider {
  margin-top: 0px;
}
.van-card.goods-info {
  // height: 152px;
  .van-card__title {
    margin-top: 15px;
    color: #333333;
    font-size: 18px;
    font-weight: bold;
    line-height: 27px;
  }
  .goods-desc {
    // height: 40px;
    margin-top: 5px;
    color: #999999;
    font-size: 14px;
    line-height: 21px;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .van-card__price {
    .van-card__price-integer {
      // margin-top: 15px;
      color: #fd4e00;
      font-size: 26px;
      line-height: 39px;
      font-weight: bold;
      span:nth-child(2) {
        font-weight: bold;
      }
    }
  }
  .van-card__origin-price {
    // margin-top: 8px;
    display: block;
    color: #999999;
    font-size: 12px;
    line-height: 18px;
    margin-left: 0px;
  }
  .van-card__num {
    float: none;
    color: #999999;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.van-card.stock-info {
  margin: 10px 0px;
  height: 58px;
  display: flex;
  align-items: center;
  .van-card__title,
  .van-card__desc,
  .goods_num {
    color: #999999;
    font-size: 12px;
    line-height: 22px;
  }
  .van-card__content {
    min-height: 44px;
  }
}
.more-detail {
  background: #ffffff;
  width: 100%;
  min-height: 71px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  margin-bottom: 10px;
  .tips {
    margin-top: 6px;
    color: #bbbbbb;
    font-size: 12px;
    line-height: 22px;
    text-align: center;
  }
}
.goodsDetail .more-detail .van-divider {
  padding-top: 12px;
}
.van-divider {
  margin: 0px !important;
  border-color: rgb(236, 236, 2360) !important;
  color: rgb(100, 100, 100) !important;
  font-size: 16px;
}
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
.goodsShow {
  color: #333333;
  background-color: #ffffff;
  .goods_intro {
    width: 345px;
    margin: auto;
  }
}
.btn {
  // position: absolute;
  // left: 0;
  // bottom: 0;
  position: sticky;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 49px;
  opacity: 1;
}
.goods_num {
  color: #999999;
  font-size: 12px;
  line-height: 22px;
}
.van-card__price-integer {
  span {
    font-size: 18px;
    line-height: 27px;
    padding-left: 1px;
  }
}
.prompt {
  width: 295px;
  height: 149px;
  margin-top: 0px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  img {
    margin-top: 10px;
  }
  p {
    margin: 0px;
    color: #333333;
    font-size: 17px;
    line-height: 24px;
  }
  .vip {
    color: #fa6400;
  }
}
.goods_intro {
  font-size: 14px;
}

// 兑换会员
.prompt_vip {
  width: 295px;
  height: 171px;
  border-bottom: 1px solid #d8d8d8;
  text-align: center;
  img {
    margin-top: 10px;
  }
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
  margin: 30px 8px;
  // border: 1px solid black;
  display: flex;
  img {
    margin-right: 11px;
  }
  .title {
    height: 35px;
    display: inline-block;
    margin-bottom: 14px;
    font-size: 16px;
    color: #333333;
    line-height: 20px;
    font-weight: bold;
  }
  .price {
    font-size: 16px;
    line-height: 13px;
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
    line-height: 30px;
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
// 错误框提示
.fault {
  width: 295px;
  // height: 164px;
  background-color: #fcfcfc;
  border-radius: 12px;
  text-align: center;
  padding-bottom: 10px;
  .fault_prompt {
    margin-top: 4px;
    border: 0px;
    p {
      font-size: 16px;
      color: #fa6400;
      padding: 0px 30px;
      // padding-top: ;
      margin-top: 0px;
      background-color: #fff;
      border-radius: 12px;
    }
    .title {
      color: #333333;
      font-size: 16px;
      line-height: 21px;
    }
    .text {
      color: #333333;
      font-size: 14px;
      opacity: 0.6;
      margin-top: 12px;
      margin-bottom: 20px;
    }
    .tovip {
      background-color: #fcb232;
      width: 255px;
      height: 42px;
      color: #ffffff;
      margin: 0px auto;
      margin-bottom: 10px;
      border-radius: 5px;
    }
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
  margin-right: 5px;
}
// ::v-deep .van-button {
//   // position: sticky;
//   left: 0px;
//   bottom: 0px;
// }
.kubi_tu {
  width: 26px;
  height: 26px;
  vertical-align: middle;
  margin-top: -5px;
}
.kubi_tu2 {
  width: 18px;
  height: 17px;
  vertical-align: middle;
  margin-top: -3px;
}
.title_fault {
  font-size: 16px;
  color: #fa6400;
  text-align: center;
  padding-bottom: 10px;
}
</style>
