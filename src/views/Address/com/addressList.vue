<template>
  <div class="addressList">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    />

    <van-button
      color="linear-gradient(to right, #FF8600, #FD4E00)"
      @click="onClickButton"
      size="16"
      class="btn"
      >添加新地址</van-button
    >
  </div>
</template>

<script>
import Vue from "vue";
import {
  Cell,
  CellGroup,
  AddressList,
  Toast,
  Overlay,
  Picker,
  Popup,
  Switch,
  Field,
} from "vant";

Vue.use(CellGroup)
  .use(AddressList)
  .use(Toast)
  .use(Overlay)
  .use(Picker)
  .use(Popup)
  .use(CellGroup)
  .use(Switch)
  .use(Field)
  .use(Cell);
import { taskApiControl } from "@/core";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
  },
  created() {
    this.chosenAddressId = this.$route.query.addressid;
    this.$store.commit("setloginurl", window.location.href);
  },
  mounted() {
    this.queryUserAddress();
  },
  methods: {
    //地址列表信息
    async queryUserAddress() {
      let res = await taskApiControl.queryUserAddress();
      if (res.code === 200) {
        // console.log(res);
        let data = res.data;
        let newdata = [];
        this.list = data.map((item) => {
          return {
            provinceCn: item.provinceCn,
            cityCn: item.cityCn,
            districtCn: item.districtCn,
            name: item.consignee,
            tel: item.mobile,
            isDefault: item.isDefault ? true : false,
            id: item.addressId + "",
            address:
              item.provinceCn + item.cityCn + item.districtCn + item.address,
            country: item.country,
            province: item.province,
            city: item.city,
            district: item.district,
            addressDetail: item.address,
          };
        });
        console.log(this.list);
      }
    },
    //修改地址信息方法
    async querySaveAddress(data) {
      let res = await taskApiControl.querySaveAddress(data);
      console.log(res);
    },
    onAdd() {
      Toast("新增地址");
    },
    select(val) {
      this.chosenAddressId = this.$route.query.addressid;
      console.log(val);
      this.querySaveAddress({
        addressId: val.id,
        address: val.addressDetail,
        cityCn: val.cityCn,
        defaultAddress: 0,
        mobile: val.tel,
        provinceCn: val.provinceCn,
        receiver: val.name,
        regionCn: val.districtCn,
        country: val.country,
        city: val.city,
        district: val.district,
        province: val.province,
      });
      this.$router.push(`/address?addressid=${val.id}`);
    },
    onEdit(item) {
      this.$router.push(`/add?ordersid=${item.id}`);
    },
    onClickButton() {
      this.$router.push("/add");
    },
  },
};
</script>

<style lang="scss" scoped>
.addressList {
  height: 100%;
  background-color: #f2f2f2;
  .btn {
    width: 355px;
    height: 50px;
    position: absolute;
    font-size: 18px;
    line-height: 27px;
    border-radius: 5px;
    left: 10px;
    bottom: 40px;
  }
}

.van-cell::after {
  position: relative;
  content: "";
}
.van-address-list {
  // height: 190px;
  padding: 0px;
}
.van-address-list__bottom {
  display: none;
}
.van-address-item {
  border-radius: 0px;
}
</style>
