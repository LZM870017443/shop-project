<template>
  <div class="Order">
    <!-- 头部 -->
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!--收货地址-->
    <van-contact-card
      :type="address_type"
      add-text="选择收货地址"
      :name="address_name"
      :tel="address_phone"
      @click="chooseAddress"
      style="padding-top: 50px;"
    />
    <!-- 送达时间 -->
    <van-cell-group style="margin-top: 20px;"></van-cell-group>
    <van-cell
      title="送达时间"
      :value="arriveDate"
      @click="showDatePopup"
      is-link
    />

    <!-- 购买清单 -->
    <router-link :to="{ path: '/order/orderDetail' }">
      <van-cell :value="`共${goodsCount}件`" is-link :center="true">
        <template #title>
          <van-cell :center="true">
            <template slot="title">
              <img
                v-for="(goods, index) in threecartgoods"
                :key="index"
                :src="goods.thumb_url"
                alt
                style="width: 30px;"
              />
              <span>......</span>
            </template>
          </van-cell>
        </template>
      </van-cell>
    </router-link>

    <!-- 支付方式 -->
    <van-cell-group style="margin-top: 10px;">
      <van-cell title="支付方式" value="微信" />
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group style="margin-top: 10px;">
      <van-cell title="备注">
        <input
          type="text"
          class="input1"
          placeholder="选填，备注您的特殊需求！"
          v-model="notice"
        />
      </van-cell>
    </van-cell-group>
    <!-- 配送费 -->
    <van-cell-group style="margin-top: 10px;">
      <van-cell title="商品金额" :value="`¥${totalPrice}`"></van-cell>
      <van-cell title="配送费" :value="`¥${disPrice}`"></van-cell>
    </van-cell-group>
    <!-- 提交订单 -->
    <van-submit-bar button-text="提交订单" @submit="onSubmit" class="btn_sub">
      合计：￥{{ sumPrice }}元
    </van-submit-bar>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>

    <!--弹出日期组件-->
    <van-popup v-model="dateShow" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="onDateCancel"
        @confirm="onDateConfirm"
      ></van-datetime-picker>
    </van-popup>

    <!-- 出口 -->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Moment from 'moment'
import { mapState } from 'vuex'
import { Toast } from 'vant'
import {
  postOrder,
  orderPaySuccess,
  getWXCode,
  queryPayStatus,
  getAllSelectedGoods,
  delAllSelectedGoods,
} from './../../api/index'

export default {
  name: 'Order',
  data() {
    return {
      // 1. 地址
      address_type: 'add', // 地址卡片类型
      address_name: null, // 收货人
      address_phone: null, // 收货人电话
      address_id: null, // 收货人地址ID

      // 2. 日期
      dateShow: false,
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      currentDate: new Date(),
      // 3. 送达时间
      arriveDate: '请选择送达时间',
      // 4. 备注
      notice: null,
    }
  },
  computed: {
    ...mapState(['cartgoods', 'userInfo']),

    // 商品总件数
    goodsCount() {
      let selectedGoodsCount = 0
      Object.values(this.cartgoods).forEach((goods, index) => {
        if (goods.checked) {
          selectedGoodsCount += 1
        }
      })
      // console.log(selectedGoodsCount);
      return selectedGoodsCount
    },

    // 商品总价
    totalPrice() {
      let totalPrice = 0
      // Object.values()返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值
      Object.values(this.cartgoods).forEach((goods, index) => {
        if (goods.checked) {
          totalPrice += (goods.price / 100) * goods.buy_count
        }
      })
      return totalPrice
    },
    //  取购物车中前三件选中的
    threecartgoods() {
      let cartgoods = []
      Object.values(this.cartgoods).forEach((goods, index) => {
        if (goods.checked) {
          cartgoods.push(goods)
        }
      })
      return cartgoods.slice(0, 3)
    },
    // 配送费
    disPrice() {
      let disPrice = 0
      // 商品总价 > 40 免配送费  <40 6元
      if (this.totalPrice > 40) {
        disPrice = 0
        console.log(this.totalPrice)
        return disPrice
      } else {
        disPrice = 6
        return disPrice
      }
    },
    //合计
    sumPrice() {
      let sumPrice = 0
      sumPrice = this.totalPrice + this.disPrice
      return sumPrice
    },
  },
  mounted() {
    // 接收收货地址
    PubSub.subscribe('userAddress', (msg, address) => {
      if (msg === 'userAddress') {
        // console.log(address);
        // 修改卡片的类型
        this.address_type = 'edit'
        this.address_name = address.name
        this.address_phone = address.tel
        this.address_id = address.address_id
      }
    })
  },
  methods: {
    //点击了左边
    onClickLeft() {
      // Toast('返回');
      this.$router.go(-1)
    },
    // 2.选择地址
    chooseAddress() {
      // alert(0);
      this.$router.push('/order/myAddress')
    },
    //提交订单
    onSubmit() {
      if (this.arriveDate === '请选择送达时间') {
        Toast({
          message: '请选择送达时间',
          duration: 500,
        })
        return
      }
      Toast({
        message: '提交成功',
        duration: 500,
      })

      this.$router.push('/order/toPay')
    },
    // 4.展示日期组件
    showDatePopup() {
      this.dateShow = true
    },
    // 5. 取消日期组件
    onDateCancel() {
      this.dateShow = false
    },
    // 6. 确认日期组件
    onDateConfirm(value) {
      this.dateShow = false
      this.arriveDate = Moment(value).format('YYYY-MM-DD hh:mm')
      // console.log(value);
    },
  },
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  touch-action: pan-y;
}

.input1 {
  border: none;
  text-align: right;
}
.btn_sub{
  color red
  font-size 50px
  font-weight bolder
}

/* 转场动画 */
.router-slider-enter-active, .router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter, .router-slider-leave-active {
  transform: translate3d(10px, 0, 0);
  opacity: 0;
}
</style>
