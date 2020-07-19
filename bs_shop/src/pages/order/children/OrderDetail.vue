<template>
  <div id="orderDetail">
    <!-- 商品清单 -->
    <!--导航栏-->
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="商品清单"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
      class="top"
    />
    <!--内容-->

    <van-cell-group style="margin-top: 30px">
      <van-cell title="商品" :value="`共${checkedShopCount}件`"></van-cell>
      <van-card
        v-for="(goods, index) in checkedcartgoods"
        :key="index"
        :num="goods.buy_count"
        :price="goods.price/100"
        :title="goods.name"
        :thumb="goods.thumb_url"
        style=" overflow:auto;"
      ></van-card>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "OrderDetail",
  computed: {
    ...mapState(["cartgoods"]),
    // 1. 获取选中的商品
    checkedcartgoods() {
      let cartgoods = [];
      Object.values(this.cartgoods).forEach((goods, index) => {
        if (goods.checked) {
          cartgoods.push(goods);
        }
      });
      return cartgoods;
    },
    // 2. 选中商品的总件数
    checkedShopCount() {
      return this.checkedcartgoods.length;
    }
  }
};
</script>

<style scoped>
#orderDetail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 200;
 
}
</style>