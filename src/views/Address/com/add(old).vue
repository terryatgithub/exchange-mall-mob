<template>
  <div class="add" v-if="AddressInfo != ''">
    <van-address-edit
      ref="addressEdit"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :address-info="AddressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
    <div class="test" ref="test">
      <van-field
        v-model="changeArea"
        label="地区"
        placeholder="选择省/市/区"
        @focus="showAreaPop"
      />
    </div>
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
    <van-checkbox v-model="checked" checked-color="#07c160" class="checkbox"
      >设为默认地址</van-checkbox
    >
  </div>
</template>

<script>
import Vue from "vue";
import {
  AddressEdit,
  Toast,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Picker,
  Popup,
  Switch,
  Field,
  CellGroup,
  Cell,
} from "vant";
Vue.use(Radio)
  .use(RadioGroup)
  .use(AddressEdit)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Toast)
  .use(Picker)
  .use(Popup)
  .use(CellGroup)
  .use(Switch)
  .use(Field)
  .use(Cell);

import areaList from "@/constants/arealist/area.js";
import { taskApiControl } from "@/core";

let ordersId = 0;
export default {
  data() {
    return {
      areaList, //地址信息
      AddressInfo: {},
      redio: 0,
      checked: false, //复选框
      searchResult: [],
      areaPop: false,
    };
  },
  mounted() {
    let ordersid = this.$route.query.ordersid || "";
    // console.log(ordersid);
    ordersId = parseInt(ordersid);
    if (ordersid != "") {
      this.queryUserAddress(parseInt(ordersid));
    }
  },
  methods: {
    //修改地址信息
    async querySaveAddress(data) {
      let res = await taskApiControl.querySaveAddress(data);
      // console.log(res);
      if (res.code === 200) {
        Toast.success("保存成功");
        this.$router.push("/address");
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
        console.log(data);
        let data2 = data.map((item) => {
          return {
            addressDetail: item.address,
            province: item.provinceCn,
            city: item.cityCn,
            county: item.districtCn,
            name: item.consignee,
            tel: item.mobile,
            isDefault: item.isDefault ? true : false,
            id: item.addressId,
            areaCode: "110101",
          };
        });
        this.AddressInfo = Object.assign({}, data2[0]);
        // console.log(this.AddressInfo);
        if (this.AddressInfo.isDefault === true) {
          this.checked === true;
        }
      }
    },
    onSave(val) {
      // Toast("save");
      // console.log(val);
      let data = {
        address: val.addressDetail,
        cityCn: val.city,
        defaultAddress: this.checked ? 1 : 0,
        mobile: val.tel,
        provinceCn: val.province,
        receiver: val.name,
        regionCn: val.county,
        country: 11,
        city: 12,
        district: 13,
        province: 14,
      };
      if (this.AddressInfo != "") {
        data.addressId = ordersId;
      }
      this.querySaveAddress(data);
    },
    onDelete() {
      Toast("delete");
    },
    onClickButton() {
      Toast("to");
    },
    Radiochange() {
      // this.radio === 0;
      console.log(this.redio);
    },
    Radioclick(e) {
      this.redio === 0;
      console.log(e);
    },
    onChangeDetail(val) {},
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-address-edit__default {
  display: none;
}
::v-deep .van-button--default {
  display: none !important;
}
::v-deep .van-cell {
  // height: 57px;
  // line-height: 57px;
  // padding-top: 10px;
  vertical-align: middle;
}
::v-deep .checkbox {
  margin-top: 10px;
  font-size: 16px !important;
  line-height: 24px;
}
::v-deep .van-checkbox__icon .van-icon {
  width: 20px;
  height: 20px;
}
::v-deep .van-address-edit__buttons {
  padding: 0px;
}
::v-deep .van-button--danger {
  width: 355px;
  height: 50px;
  position: absolute;
  left: 10px;
  bottom: 40px;
  background: linear-gradient(to right, #ff8600, #fd4e00);
  border: 0px;
  .van-button__text {
    color: #ffffff;
    font-size: 18px;
    line-height: 27px;
  }
}
::v-deep span {
  line-height: 24px;
  color: #999999;
}
// ::v-deep .redio {
//   margin-top: 12px;
//   margin-left: 20px;
//   font-size: 16px;
//   color: #999999;
// }
.add {
  height: 667px;
  position: relative;
  background-color: #f2f2f2;

  .van-address-edit {
    padding: 10px;
  }

  .btn {
    width: 355px;
    height: 50px;
    position: absolute;
    left: 10px;
    bottom: 40px;
    color: #ffffff;
  }
  .van-button__text {
    color: #ffffff;
    font-size: 18px;
    line-height: 27px;
  }
}
// .van-address-edit__fields:nth-last-child(){
//   display: none;
// }
::v-deep .van-cell:nth-child(5) {
  display: none !important;
}
.checkbox {
  height: 20px;
  // margin-top: 20px;
  margin-left: 18px;
  color: #333333;
  font-size: 16px;
  line-height: 24px;
}
.test {
  position: absolute;
  top: 100px;
  left: 10px;
  height: 30px;
  width: 355px;
}
</style>
