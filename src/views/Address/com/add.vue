<template>
  <div class="box addSate">
    <div class="address">
      <van-cell-group>
        <van-field
          v-model="userInfo.consignee"
          clearable
          label="收货人："
          placeholder="收货人姓名"
          maxlength="5"
          @click-right-icon="$toast('收货人姓名必填')"
        />
        <van-field
          v-model="userInfo.mobile"
          clearable
          label="手机号码："
          placeholder="收货人手机号"
          type="number"
          maxlength="11"
          @click-right-icon="$toast('收货人手机号必填')"
        />
        <van-field
          v-model="changeArea"
          label="省市地区："
          placeholder="选择省/市/区"
          @focus="showAreaPop"
          right-icon="arrow"
          @click="showAreaPop"
          :disabled="true"
        />
        <van-field
          v-model="userInfo.address"
          clearable
          label="详细地址："
          placeholder="街道门牌、楼层房间等信息"
          @click-right-icon="$toast('收货人手机号必填')"
        />
        <!-- <div class="set-default">
        <label class="default-label">设置为默认地址</label>
        <van-switch
          class="switch-btn"
          v-model="userInfo.default"
          size="20px"
          active-color="#07c160"
          inactive-color="#C7C7C7"
        />
      </div> -->
      </van-cell-group>
    </div>
    <van-checkbox
      v-model="userInfo.default"
      checked-color="#07c160"
      class="checkbox"
      >设为默认地址</van-checkbox
    >
    <van-button
      color="linear-gradient(to right, #FF8600, #FD4E00)"
      @click="submitOrder"
      size="16"
      class="btn"
      >保存</van-button
    >
    <!-- <div class="pd15">
      <van-button
        type="danger"
        size="large"
        @click="submitOrder"
        class="submit-btn"
        >提交</van-button
      > </div> -->
    <!-- <van-button type="primary" size="large" @click="delectAdd" class="delect-btn">删除</van-button> -->

    <van-popup v-model="areaPop" position="bottom">
      <!-- <van-area :area-list="areaList" :columns-num="2" title="标题" /> -->
      <van-picker
        @cancel="onCancel"
        show-toolbar
        @confirm="onConfirm"
        :area-list="areaList"
        value-key="name"
        :columns="areaColumns"
        @change="handleSelectRegion"
      />
    </van-popup>
  </div>
</template>
<script>
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
  Picker,
  Popup,
  CellGroup,
  Switch,
  Field,
  Toast,
  Checkbox,
  CheckboxGroup,
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
  .use(Picker)
  .use(Popup)
  .use(CellGroup)
  .use(Switch)
  .use(Toast)
  .use(Field)
  .use(Checkbox)
  .use(CheckboxGroup);

import { taskApiControl } from "@/core";
import areaList from "@/views/Address/com/areas";

let ordersId = 0;

export default {
  data() {
    return {
      allAreaList: null,
      areaList: null, //地址列表
      selectedAddress: [],
      addressId: null,
      changeArea: null,
      userInfo: {
        consignee: "", //收货人姓名
        mobile: "", //手机号
        address: "", //详细地址
        default: false, //是否默认
        provinceCn: "", //省地址
        cityCn: "", //市地址
        districtCn: "", //县地址
        city: "", //市编号
        province: "", //省编号
        district: "", //县编号
      },
      areaPop: false, //弹出框是否显示
    };
  },
  computed: {
    //用户选择地址区域
    areaColumns() {
      const areaList = this.areaList;
      const address = this.selectedAddress;
      const { provinces, cities, districts } = areaList;
      let [province, city, district] = address;
      const provinceValues = provinces["1"];
      province = province || provinceValues[0];
      const provinceIndex = provinceValues.findIndex(
        (item) => item.id === province.id
      );
      const cityValues = cities[province.id];
      city = city || cityValues[0];
      const cityIndex = cityValues.findIndex((item) => item.id === city.id);
      const districtValues = districts[city.id];
      district = district || districtValues[0];
      const districtIndex = districtValues.findIndex(
        (item) => item.id === district.id
      );
      return [
        {
          values: provinceValues,
          defaultIndex: provinceIndex,
        },
        {
          values: cityValues,
          defaultIndex: cityIndex,
        },
        {
          values: districtValues,
          defaultIndex: districtIndex,
        },
      ];
    },
  },
  methods: {
    //修改地址信息
    async querySaveAddress(data) {
      let res = await taskApiControl.querySaveAddress(data);
      // console.log(res);
      if (res.code === 200) {
        Toast.success("保存成功");
        this.$router.push({
          name: "address",
          params: {
            address: data.address,
          },
        });
      }
    },
    //地址列表信息
    async queryUserAddress(ordersid) {
      let res = await taskApiControl.queryUserAddress();
      if (res.code === 200) {
        let list = res.data;
        let data = list.filter((item) => {
          return item.addressId === ordersid;
        });
        // console.log(data);
        let data2 = data.map((item) => {
          return {
            address: item.address,
            provinceCn: item.provinceCn,
            cityCn: item.cityCn,
            districtCn: item.districtCn,
            consignee: item.consignee,
            mobile: item.mobile,
            isDefault: item.isDefault ? true : false,
            id: item.addressId,
            city: item.city,
            province: item.province,
            district: item.district,
          };
        });
        this.userInfo = Object.assign({}, data2[0]);
        this.changeArea = `${this.userInfo.provinceCn}/${this.userInfo.cityCn}/${this.userInfo.districtCn}`;
        console.log(this.userInfo);
      }
    },
    onConfirm(res) {
      //   debugger;
      console.log(res);
      this.userInfo.provinceCn = res[0].name;
      this.userInfo.cityCn = res[1].name;
      this.userInfo.districtCn = res[2].name;
      this.userInfo.province = res[0].id;
      this.userInfo.city = res[1].id;
      this.userInfo.district = res[2].id;
      this.changeArea = `${res[0].name}/${res[1].name}/${res[2].name}`;
      this.areaPop = false;
    },
    onCancel() {
      this.areaPop = false;
    },
    showAreaPop(value) {
      this.areaPop = true;
    },
    handleSelectRegion(component, selected, idx) {
      this.selectedAddress = selected.filter((item, index) => index <= idx);
    },

    submitOrder(content) {
      if (this.userInfo.consignee === "") {
        this.$toast.fail("请输入名字！");
        return false;
      }
      if (this.userInfo.mobile === "") {
        this.$toast.fail("请填写手机号码！");
        return false;
      }
      var reg2 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg2.test(this.userInfo.mobile)) {
        this.$toast.fail("请输入正确的手机号格式!");
        return false;
      }
      if (this.userInfo.provinceCn === "") {
        this.$toast.fail("请选择收货地址");
        return false;
      }
      if (this.userInfo.address === "") {
        this.$toast.fail("请填写详细地址");
        return false;
      }
      var reg = /^[\u2E80-\u9FFF]+$/;
      if (!reg.test(this.userInfo.consignee)) {
        this.$toast.fail("有且只能输入中文名字!");
        return false;
      }

      let val = this.userInfo;
      let params = {
        address: val.address,
        cityCn: val.cityCn,
        defaultAddress: val.default ? 1 : 0,
        mobile: val.mobile,
        provinceCn: val.provinceCn,
        receiver: val.consignee,
        regionCn: val.districtCn,
        country: 1,
        city: val.city,
        district: val.district,
        province: val.province,
      };
      if (this.userInfo != "") {
        params.addressId = ordersId;
      }
      this.querySaveAddress(params);
    },
    delectAdd() {
      this.$service
        .delectSite({
          id: this.addressId,
        })
        .then((res) => {
          this.userInfo = {};
          this.this.areaPop = false;
          location.reload();
        });
    },
    querySite() {
      this.$service
        .getSite({
          id: this.addressId,
        })
        .then((res) => {
          this.userInfo = res.data;
          this.changeArea = `${res.data.provinceCn}/${res.data.cityCn}/${res.data.districtCn}`;
        });
    },
  },
  beforeCreate() {
    this.$checklogin(this.$store.state.loginurl);
  },
  created() {
    this.areaList = areaList;
    this.$store.commit("setloginurl", window.location.href);
  },
  mounted() {
    let ordersid = this.$route.query.ordersid || "";
    // console.log(ordersid);
    ordersId = parseInt(ordersid);
    if (ordersid != "") {
      this.queryUserAddress(parseInt(ordersid));
    }
    // this.addressId = this.$route.query.id;
    // if (this.addressId) {
    //   this.querySite();
    //   // this.addressId = this.userInfo.addressId
    // }
    // import("@/views/Address/com/areas").then((result) => {
    //   result.default;
    // });
    // this.areaList = this.allAreaList;
  },
};
</script>
<style lang="scss" scoped>
.box {
  @include flex(column, wrap);
  .vant-btn {
    width: 355px;
    margin: 10px;
    touch-action: none;
  }
  width: 100%;
  // height: 667px;
  height: 100%;
  background-color: #f2f2f2;
  .address {
    width: 355px;
    height: 227px;
    margin: 10px;
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
  }
}
::v-deep .van-field__label {
  color: #999999;
  font-size: 16px;
  line-height: 24px;
}
::v-deep .van-cell {
  height: 55px;
}
::v-deep .van-field__label {
  line-height: 40px;
}
::v-deep .van-cell__value {
  line-height: 40px;
}
::v-deep .van-checkbox__label {
  color: #999999;
}
::v-deep .checkbox {
  margin-left: 15px;

  margin-top: 10px;
  font-size: 16px !important;
  line-height: 24px;
}
::v-deep .van-checkbox__icon .van-icon {
  width: 20px;
  height: 20px;
}
.btn {
  position: absolute;
  width: 355px;
  height: 50px;
  left: 10px;
  bottom: 40px;
}
</style>
