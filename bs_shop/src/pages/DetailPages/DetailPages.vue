<template>
  <div class="DetailPages">
    <!-- 头部 -->
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="详情页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 详情页  -->
    <img v-lazy="result.thumb_url" alt width="100%" v-if="result.thumb_url" />
    <div class="title">{{result.goods_name}}</div>
    <div class="price">
     ￥{{result.price/100}}
      </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDetailPages } from "./../../api/index";
import { Toast } from "vant";
import { addGoodsToCart } from "./../../api/index";
export default {
  name: "DetailPages",
  computed: {
    ...mapState(["recommendshoplist", "userInfo"])
  },
  mounted() {
    this.goods_id = this.$route.params.goods_id;
    //发送请求
    getDetailPages(this.goods_id)
      // console.log(result);
      .then(res => {
        this.result = res.message[0];
        //.then是接收正确返回的信息
      })
      .catch(err => {
        // .catch 返回报错信息
        console.log(err);
      });
  },

  data() {
    return {
      goods_id: 0,
      result: Object
    };
  },
  methods: {
    onClickLeft() {
      // Toast('返回');
      this.$router.go(-1);
    },
    onClickIcon() {
      // Toast("点击图标");
      this.$router.push("/chat");
    },
    async onClickButton() {
      let result = await addGoodsToCart(
        this.userInfo.id,
        this.result.goods_id,
        this.result.goods_name,
        this.result.thumb_url,
        this.result.price
      );
      console.log(result);
      Toast("添加成功");
    }
  }
};
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
img {
  margin-top: 50px;
}
.title
  font-size 30px
.price
  color red
  font-weight bolder
  font-size 24px
  text-align:right
  margin-right 10px
</style>