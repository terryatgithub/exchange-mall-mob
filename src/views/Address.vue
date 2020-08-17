<template>
  <div class="address">
    <van-card
      price="100C+20元"
      origin-price="市场价值: ￥ 38元"
      desc="商品描述商品描述商品描述商品描述"
      title="商品名称商品名称商品名称商品名称"
    >
        <template #num>
           每人限兑2件 
        </template>
    </van-card>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { homeApiControl, userApiControl } from '@/core'
import initMixin from '@/mixins/initMixin'
import commonUtil from '@/utils/index'
import cacheUtil from '@/utils/cache'
import Vue from 'vue'
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
        AddressEdit,
        AddressList,
        Area,
        Toast
      } from 'vant'
Vue.use(Button).use(Cell).use(Swipe).use(SwipeItem)
   .use(Lazyload).use(Card).use(Tag).use(List).use(Divider)
   .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Dialog)
   .use(Overlay).use(AddressList).use(AddressEdit).use(Toast)
   .use(Area)
import areaList from '@/constants/arealist/area.js'

export default {
  name: 'ListExchange',
  data() {
    return {
      areaList,
      searchResult: [],
    }
  },
  mounted() {

  },
  methods: {
    onSave(content) {
      console.log({content})
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onLoad() {
      this.loading = false,
      this.finished = true
    }
  }
}
</script>

<style scoped lang="scss">
  .address {
    .van-list {
      padding-top: 10px;
    }
    .van-card__footer {
      float: right;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>