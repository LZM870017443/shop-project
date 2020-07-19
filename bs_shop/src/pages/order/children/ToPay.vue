<template>
  <!-- 付款页 -->
  <div class="ToPay">
    付款页
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="确认交易"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 中间 -->
    <div class="centent">
      <div class="shop_name">订单号：5187101242</div>
      <div class="pay_money">￥{{sumPrice}}元</div>
    </div>
    <van-cell-group title>
      <van-cell title="收款单位" value="毕设商城" />
    </van-cell-group>

    <!-- 按钮 -->
    <div class="btm_pay" @click="put_pw()">
      <a>立即支付</a>
    </div>
    <!-- 遮罩 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <!-- 输入密码 -->
        <!-- 密码输入框 -->
        <van-password-input
          :value="value"
          info="密码为 6 位数字"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          style=" margin-top: 80%;"
        />
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = true"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { addMyOrders, deleteShopToCart } from "./../../../api/index";
import PubSub from "pubsub-js";

export default {
  name: "ToPay",
  data() {
    return {
      value: "",
      showKeyboard: true,
      show: false
    };
  },
  computed: {
    ...mapState(["cartgoods", "userInfo"]),
    // 商品总价
    totalPrice() {
      let totalPrice = 0;
      this.cartgoods.forEach((goods, index) => {
        if (goods.checked) {
          totalPrice += (goods.price / 100) * goods.buy_count;
        }
      });
      return totalPrice;
    },
    // 配送费
    disPrice() {
      let disPrice = 0;
      // 商品总价 > 40 免配送费  <40 6元
      if (this.totalPrice > 40) {
        disPrice = 0;
        console.log(this.totalPrice);
        return disPrice;
      } else {
        disPrice = 6;
        return disPrice;
      }
    },
    //合计
    sumPrice() {
      let sumPrice = 0;
      sumPrice = this.totalPrice + this.disPrice;
      return sumPrice;
    }
  },
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //点击立即支付
    put_pw() {
      this.show = true;
    },
    //加入我的清单
    add_order() {
      this.cartgoods.forEach(async (goods, index) => {
        if (goods.checked) {
          let result = await addMyOrders(
            this.userInfo.id,
            goods.goods_id,
            goods.goods_name,
            goods.thumb_url,
            goods.price
          );
          console.log(result);
        }
      });
    },
    //删除在购物车中已购买的商品
    del_cart_shops() {
      this.cartgoods.forEach(async (goods, index) => {
        if (goods.checked) {
          let result = await deleteShopToCart(this.userInfo.id, goods.goods_id);
          console.log(result);
        }
      });
    },
    //输入密码
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6) {
        // console.log("密码正确");
        this.showKeyboard = true;
        this.show = false;
        this.add_order();
        this.del_cart_shops();
        PubSub.publish("view_cart");
        this.$router.push("/chat");
      } else {
        this.errorInfo = "";
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  }
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.ToPay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #efeff4;
  /* background-color: red; */
  z-index: 200;
}

.centent {
  width: 100%;
  height: 60px;
  background-color: #fafafafa;
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  padding: 18px 0;
}

.pay_money {
  margin: 10px 0;
  font-size: 45px;
}

.btm_pay {
  width: 90%;
  margin-left: 5%;
  height: 40px;
  background-color: green;
  text-align: center;
  color: #ffff;
  font-size: 24px;
  margin-top: 30px;
  display: flex;
}

.btm_pay a {
  align-self: center;
  flex: 1;
}
</style>
