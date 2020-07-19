<template>
  <div class="search-panel">
    <!-- 搜索栏 -->
    <form action="/" class="search-nav">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        class="search-input"
      />
    </form>

    <div class="search-content" v-show="isShow">
      <div class="title">
        <img src="../images/hot.png" alt width="25" />
        <span>热门搜索</span>
      </div>
      <ul class="search-list">
        <li>抽纸批发</li>
        <li>浴巾可穿</li>
        <li>石榴水果</li>
        <li>富豪卷纸</li>
        <li>冰箱收纳盒</li>
        <li>毛巾衣服</li>
        <li>小白鞋增高透气</li>
        <li>连衣裙夏</li>
      </ul>
    </div>
    <!-- 搜索的商品 -->
    <div class="shops">
      <van-card
        v-for="(goods, index) in searchboxs"
        :key="index"
        :num="goods.buy_count"
        :price="goods.market_price/100"
        :title="goods.short_name"
        :thumb="goods.thumb_url"
        v-show="isShow2" >
        <template #footer>
          <van-button size="mini" style="color:red" @click="tocartbtn(goods)">加入购物车</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState } from "vuex";
import { reqsSearchBoxs, addGoodsToCart } from "./../../../api/index";

export default {
  name: "SearchPanel",
  data() {
    return {
      value: "",
      isShow: true,
      isShow2: false
    };
  },
  computed: {
    ...mapState(["searchboxs", "userInfo"])
  },
  props: {
    isShowSearchPanel: Function
  },
  methods: {
    async tocartbtn(goods) {
      // console.log(goods)
      //发送请求
      //加入购物车
      let result = await addGoodsToCart(
        this.userInfo.id,
        goods.goods_id,
        goods.goods_name,
        goods.thumb_url,
        goods.market_price,
      );
       Toast(result)
      console.log(result);
    },
    onSearch(val) {
      // Toast(val);
      let goods_name = val;
      // console.log(goods_name);
      this.isShow = false;
      this.isShow2 = true;
      this.$store.dispatch("reqsSearchBoxs", { goods_name });

    },
    onCancel() {
      // Toast("取消");
      this.isShowSearchPanel(false);
    }
  }
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '~@/common/stylus/base.styl';

.search-panel {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  .search-nav {
    width: 100%;
    height: 60px;
    border-bottom-1px(#ddd);
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .search-input {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #ededed;
      width: 90%;
      height: 38px;
      border-radius: 10px;
      padding: 0 10px;

      input {
        width: 90%;
        height: 90%;
        padding-left: 8px;
        font-size: 16px;
        background: transparent;
        // outline-style 属性用于设置元素的整个轮廓的样式。样式不能是 none，否则轮廓不会出现。
        outline: none;
      }
    }
  }

  button {
    background: transparent;
    font-size: 16px;
    color: #aaa;
  }
}

.search-content {
  padding: 30px 15px;

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #aaa;
    margin-bottom: 10px;
  }

  .search-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    li {
      background: #ededed;
      color: #a6a6a6;
      margin: 5px 10px;
      padding: 5px;
      border-radius: 8px;
      font-weight: lighter;
      font-size: 15px;
    }
  }
}

.shops {
  width: 100%;
  height: 100%;
  overflow: auto;
  touch-action: pan-y;
  padding-bottom: 80px;
}
</style>
