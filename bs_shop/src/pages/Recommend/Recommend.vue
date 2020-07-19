<template>
    <div class="Box">
       <ul class="recommend" v-if="userInfo.id&&recommendshoplist.length>0">
         <div class="recommend-top">精选推荐</div>
        <ShopList 
        tag="li" 
        v-for="(item,index) in recommendshoplist" 
        :key="index" 
        :item='item' 
        :clickCellBtn="dealWithCellBtn"
        /> 
      </ul>
      <select-login v-else/>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
import ShopList from './../../components/ShopList/ShopList'
import { Indicator } from 'mint-ui';
import {addGoodsToCart} from './../../api/index'
import SelectLogin from './../../components/Login/SelectLogin';

  export default {
    name: "Box",
     components: {
      ShopList,
      SelectLogin
    },
    data() {
      return {
        page: 1,
        count: 10
      }
    },
    mounted() {
      //发送请求
      Indicator.open('加载中...');
      this.$store.dispatch('reqRecommendShopList', {
        page: this.page, count: this.count, callback: () => {
          Indicator.close();
        }
      });
    },
    computed:{
       ...mapState(['recommendshoplist','userInfo']),
    },
    watch: {
      recommendshoplist() {
        //$nextTick 延迟到下次DOM更新在执行操作
        this.$nextTick(() => {
          // 让当前的页码+1
          this.page += 1;
          //初始化
          this._initBScroll();
        })
      }
      
    },
    methods: {
      _initBScroll(){
           // 1.1 初始化
        this.listScroll = new BScroll('.Box', {
          scrollY: true,
          click: true,
          probeType: 3
        });
      //       // 1.2 监听列表的滚动
        this.listScroll.on('touchEnd', (pos) => {
      //       // 1.2.1 监听下拉
      //     //console.log(pos.y);
      //     // console.log(this.listScroll.maxScrollY);
          if (pos.y >= 50) {
            console.log('下拉刷新');
          }
      //        // 1.2.2 监听上拉
          if (this.listScroll.maxScrollY > pos.y + 20) {
            // console.log(this.page);
            console.log('上拉加载更多');
             Indicator.open('正在加载数据...');
            this.$store.dispatch('reqRecommendShopList', {page: this.page, count: this.count, callback: ()=>{          
                 Indicator.close(); 
              }});
          }
        });
      //         // 1.3 列表滚动结束
        this.listScroll.on('scrollEnd', () => {
           console.log('滚动结束');
          this.listScroll.refresh();
        }); 
      },
      //加入购物车
     async dealWithCellBtn(goods){
            // console.log(goods)
            //发送请求
            let result = await addGoodsToCart(this.userInfo.id, goods.goods_id, goods.goods_name, goods.thumb_url, goods.price);
            console.log(result);
             Toast(
              "添加成功",
             );
        },
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .Box
    background #f5f5f5
    width 100%
    height 100%
    touch-action: none;
    .recommend
      display flex
      flex-direction row
      //换行
      flex-wrap wrap
      background #f5f5f5
      padding-bottom 40px
      .recommend-top
        width 100%
        height 50px
        border-bottom 1px solid #aaaaaa
        text-align center
        line-height 50px
        font-size 15px
        color #e02e24
        font-weight bolder
        background-color #ffffff
        padding-bottom 3px
      
</style>
