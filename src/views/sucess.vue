<template>
  <div class="app">
    <div class="sucess" v-if="code === 1">
      <img width="73" height="90" src="../assets/images/icontrue.png" />
      <div class="title">领取成功</div>
      <div class="desc">感谢您的支持，我们将尽快为您发货</div>
    </div>
    <div class="fault" v-else-if="code === 0">
      <img width="73" height="90" src="../assets/images/icon.png" />
      <div class="title">抱歉，领取商品存在异常，请重试！</div>
      <!-- <div class="desc"></div> -->
      <van-button
        class="btn"
        @click="btn"
        color="linear-gradient(to right, #FF8600, #FD4E00)"
        >重新领取</van-button
      >
    </div>
    <!-- <div class="fault" v-else>
      <img width="73" height="90" src="../assets/images/icon.png" />
      <div class="title">您的金币不足！</div>
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage, Button } from "vant";
Vue.use(VanImage).use(Button);
export default {
  data() {
    return {
      fault: "../assets/images/icon.png",
      code: 1,
      goodsid: 0,
    };
  },
  mounted() {
    this.goodsid = parseInt(this.$store.state.goodsid);
    this.code = parseInt(this.$route.query.code);
  },
  methods: {
    btn() {
      this.$router.push(`/detail?actId=${this.goodsid}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  background-color: #f2f2f2;
  height: 100%;
  text-align: center;
  @include flex(column, wrap);
  .vant-btn {
    width: 375px;
    margin: 10px;
  }
  .sucess,
  .fault {
    width: 256px;
    height: 153px;
    margin: 0px 60px;
    margin-top: 155px;
    .title {
      font-size: 22px;
      line-height: 33px;
      color: #333333;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 16px;
      line-height: 24px;
      color: #999999;
    }
  }
}
.btn {
  position: absolute;
  width: 355px;
  height: 50px;
  border-radius: 4px;
  left: 10px;
  bottom: 40px;
  font-size: 18px;
  line-height: 27px;
}
</style>
