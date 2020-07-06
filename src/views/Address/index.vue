<template>
  <div class="add">
    <!-- 地址 -->
    <div v-if="addressList != ''">
      <van-cell is-link center class="address_box" @click="toaddressList">
        <template #title>
          <div class="left">
            <div class="name">{{ addressList[0].consignee }}</div>
            <div
              class="moren"
              v-if="choose === 1 || addressList[0].isDefault === 1"
            >
              默认
            </div>
            <div v-else></div>
          </div>
          <div>
            <div>{{ addressList[0].mobile }}</div>
            <div class="address">
              {{ addressList[0].provinceCn }}{{ addressList[0].cityCn
              }}{{ addressList[0].districtCn }}{{ addressList[0].address }}
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <div v-else>
      <van-cell class="header">
        <template #title>
          <div class="add_title" @click="toAdd">添加地址信息+</div>
        </template>
      </van-cell>
    </div>
    <!-- 商品信息 -->
    <van-cell class="shop" v-if="goodsDetail != ''">
      <template #icon>
        <img
          class="image"
          :src="goodsDetail.goods.goodsGalleries[0].imgUrl"
          alt=""
          width="66px"
          height="66px"
        />
      </template>
      <template #title>
        <div class="shop_box">
          <div class="title">{{ goodsDetail.goods.goodsName }}</div>
          <div class="price">{{ goodsDetail.goldNumber }}酷币</div>
        </div>
      </template>
    </van-cell>
    <!-- 备注 -->
    <div class="remark">
      <p>备注：</p>
      <p>1.您的兑换商品将于n个工作日内寄出;</p>
      <p>2.如有问题请关注 <span> “酷开爱看电视”</span>微信工;</p>
    </div>
    <van-button
      color="linear-gradient(to right, #FF8600, #FD4E00)"
      @click="onClickButton"
      size="16"
      class="btn"
      >立即领取</van-button
    >
  </div>
</template>

<script>
import Vue from "vue";
import { Cell, CellGroup, AddressList, Toast } from "vant";

Vue.use(Cell);
Vue.use(CellGroup)
  .use(AddressList)
  .use(Toast);

import { taskApiControl, mallApiControl } from "@/core";
export default {
  data() {
    return {
      addressList: [], //地址信息
      goodsDetail: [], //商品信息
      orderSn: "", //订单编号
      choose: 0, //判断要显示的地址
    };
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
  },
  created() {
    this.$store.commit("setloginurl", window.location.href);
  },
  mounted() {
    // 订单地址
    let address = this.$route.params.address;
    let orderid = this.$route.params.orderid || this.$store.state.ordersid;
    this.orderSn = orderid;
    //订单地址ID
    let addressid = this.$route.query.addressid;
    this.$store.commit("setorders", this.orderSn);
    this.queryUserAddress(addressid, address);
    if (addressid != "") {
      this.queryorderInfo({
        orderSn: this.orderSn,
      });
    } else {
      this.queryorderInfo(orderid);
    }
  },
  methods: {
    //地址列表
    async queryUserAddress(addressid, address) {
      let res = await taskApiControl.queryUserAddress();
      if (res.code === 200) {
        let list = res.data;
        // debugger
        if (addressid) {
          this.addressList = list.filter((item) => {
            return item.addressId === parseInt(addressid);
          });
          // console.log(this.addressList);
        } else if (address) {
          this.addressList = list.filter((item) => {
            return item.address === address;
          });
          //表示是从添加地址进来的
          this.choose = 1;
        } else {
          this.addressList = list.filter((item) => {
            return item.isDefault === 1;
          });
        }
        console.log(this.addressList);
      }
    },
    //订单详情信息
    async queryorderInfo(data) {
      let res = await taskApiControl.queryorderInfo(data);
      // console.log(res);
      if (res.code == 200) {
        this.goodsDetail = res.data;
      }
    },
    // 保存订单信息
    async querySaveReceiveInfo() {
      let data = this.addressList[0];
      let res = await taskApiControl.querySaveReceiveInfo({
        address: data.address,
        addressId: data.addressId,
        city: data.city,
        cityCn: data.cityCn,
        country: data.country,
        district: data.district,
        defaultAddress: data.isDefault,
        mobile: data.mobile,
        province: data.province,
        provinceCn: data.provinceCn,
        receiver: data.consignee,
        regionCn: data.districtCn,
        orderSn: this.orderSn,
      });
      if (res.code == 200) {
        // this.goodsDetail = res.data.activity;
        // console.log(this.goodsDetail);
        this.$router.push(`/sucess?code=1`);
      } else {
        this.$router.push(`/sucess?code=0`);
      }
    },
    toAdd() {
      this.$router.push("/add");
    },
    toaddressList() {
      this.$router.push(
        `/addressList?addressid=${this.addressList[0].addressId}`
      );
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onClickButton() {
      this.querySaveReceiveInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  background-color: #f2f2f2;
  // height: 667px;
  height: 100%;

  .header {
    margin-bottom: 10px;
    height: 50px;
    text-align: center !important;
    display: inline-block;
  }

  .add_title {
    text-align: center;
    margin-top: 3px;
    color: #333333;
    line-height: 27px;
    font-size: 14px;
    cursor: pointer;
  }
  .shop {
    height: 86px;
    margin-top: 10px;
    .image {
      margin-right: 10px;
    }
    .shop_box {
      display: flex;
      flex-direction: column;
      .title {
        margin-top: 5px;
        color: #333333;
        width: 300px;
        line-height: 27px;
        font-size: 18px;
        font-weight: 530;
      }
      .price {
        padding-top: 10px;
        color: #fd4e00;
        line-height: 24px;
      }
    }
  }
  .remark {
    margin-top: 15px;
    margin-left: 13px;
    color: #9b9b9b;
    p {
      font-size: 14px;
      line-height: 21px;
      span {
        color: #fd4e00;
      }
    }
  }
  .btn {
    width: 355px;
    height: 50px;
    margin-top: 20px;
    margin-left: 10px;
  }
  .van-cell::after {
    position: relative;
    content: "";
  }
  .address_box {
    .van-cell__title {
      display: flex;
      .left {
        width: 90px;
        vertical-align: middle;
        .name {
          margin-top: 3px;
          color: #333333;
          font-size: 14px;
          line-height: 21px;
        }
        .moren {
          width: 30px;
          // margin-top: px;
          padding: 0px 2px;
          color: #fd4e00;
          font-size: 12px;
          line-height: 18px;
          border: 1px solid #fd4e00;
          box-shadow: 1px 1px 2px 1px rgba(253, 78, 0, 0.3);
        }
      }
      .address {
        color: #999999;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
}
</style>
