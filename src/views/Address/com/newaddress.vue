<template>
  <div class="bg-color addSate">
    <van-cell-group>
      <van-field
        v-model="userInfo.consignee"
        clearable
        label="姓名"
        placeholder="收货人姓名"
        maxlength="5"
        @click-right-icon="$toast('收货人姓名必填')"
      />
      <van-field
        v-model="userInfo.mobile"
        clearable
        label="电话"
        placeholder="收货人手机号"
        type="number"
        maxlength="11"
        @click-right-icon="$toast('收货人手机号必填')"
      />
      <van-field
        v-model="changeArea"
        label="地区"
        placeholder="选择省/市/区"
        @focus="showAreaPop"
      />
      <van-field
        v-model="userInfo.address"
        clearable
        label="详细地址"
        placeholder="街道门牌、楼层房间等信息"
        @click-right-icon="$toast('收货人手机号必填')"
      />
      <van-field
        v-model="userInfo.zipcode"
        clearable
        label="邮政编码"
        placeholder="邮政编码"
        type="number"
      />
      <div class="set-default">
        <label class="default-label">设置为默认地址</label>
        <van-switch
          class="switch-btn"
          v-model="userInfo.default"
          size="20px"
          active-color="#07c160"
          inactive-color="#C7C7C7"
        />
      </div>
    </van-cell-group>
    <div class="pd15">
      <van-button
        type="danger"
        size="large"
        @click="submitOrder"
        class="submit-btn"
        >提交</van-button
      >
      <!-- <van-button type="primary" size="large" @click="delectAdd" class="delect-btn">删除</van-button> -->
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      allAreaList: null,
      areaList: null,
      selectedAddress: [],
      addressId: null,
      changeArea: null,
      userInfo: {
        consignee: "",
        mobile: "",
        address: "",
        zipcode: "",
        provinceCn: "",
        cityCn: "",
        districtCn: "",
        default: false,
        city: "",
        province: "",
        district: "",
      },
      areaPop: false,
    };
  },
  computed: {
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
      // debugger
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
    onConfirm(res) {
      // debugger;
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
      // debugger
      if (this.userInfo.consignee === "") {
        this.$toast("请输入名字");
        return false;
      }
      let reg = /^[\u2E80-\u9FFF]+$/;
      if (!reg.test(this.userInfo.consignee)) {
        this.$toast("有且只能输入中文名字!");
        return false;
      }
      let params = {};
      params = this.userInfo;
      this.$service.saveAdd(params).then((res) => {
        if (res.message === "SUCCESS") {
          this.$toast("保存成功！");
          this.$router.go(-1);
        }
      });
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
          // debugger;
          this.userInfo = res.data;
          // this.defalutCity = res.data.city,
          // this.defalutProvince = res.data.province,
          // this.defalutDistrict = res.data.district,
          this.changeArea = `${res.data.provinceCn}/${res.data.cityCn}/${res.data.districtCn}`;
        });
    },
  },
  mounted() {
    this.addressId = this.$route.query.id;
    if (this.addressId) {
      this.querySite();
      // this.addressId = this.userInfo.addressId
    }
    import("@/views/Address/com/areas").then((result) => {
      this.areaList = result.default;
    });
    this.areaList = this.allAreaList;
  },
};
</script>
<style scoped></style>
