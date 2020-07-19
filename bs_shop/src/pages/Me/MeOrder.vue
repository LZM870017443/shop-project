<template>
  <div id="MeOrder">
    <!-- 商品清单 -->
    <!--导航栏-->
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="我的购物清单"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!--内容-->
    <van-cell-group style="margin-top: 35px">
      <van-cell
        :title="`${ordergoods.is_pay ==='1'? '待支付': '已支付'}`"
        :value="`共${checkedShopCount}件`"
      ></van-cell>
      <van-card
        v-for="(goods, index) in ordergoods"
        :key="index"
        :num="goods.buy_count"
        :price="goods.price/100"
        :title="goods.goods_name"
        :thumb="goods.thumb_url"
      ></van-card>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getOrdersGoods } from "./../../api/index";
export default {
  name: "MeOrder",
  mounted() {
    // 请求商品数据
    this.$store.dispatch("reqsOrderGoods");
  },
  computed: {
    ...mapState(["ordergoods"]),
    // 1. 获取选中的商品
    checkedordergoods() {
      let ordergoods = [];
      this.ordergoods.forEach((goods, index) => {
        if (goods.checked) {
          ordergoods.push(goods);
        }
      });
      return ordergoods;
    },
    // 2. 选中商品的总件数
    checkedShopCount() {
      return this.ordergoods.length;
    }
  }
};
</script>

<style scoped>
#MeOrder {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 201;
  /* overflow: auto; */
}
</style>