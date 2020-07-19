<template>
    <div class="hot">
        <!-- 我是热门板块 -->
    <!--1.轮播图-->
    <div class="swiper-container" v-if="homecasual.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(casual,index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt="" width="100%"></div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
<!--中间导航 hotnav -->
      <HotNav/>
<!-- 广告位 -->
<div class="hot-ad">
  <img src="./../../imgs/hot_ad/home_ad.gif" alt="" width="100%">
</div>
<!-- 商品列表 -->
<HotShopList/>
    </div>
</template>

<script>

import HotNav from './HotNav'
import HotShopList from './HotShopList'

import {mapState} from 'vuex'

    export default {
     name: "Hot",
     components:{
      HotNav,
      HotShopList,
     },
    computed: {
      //展开轮播图数据
      ...mapState(['homecasual'])
    },
     mounted() {
       //请求轮播图数据（发送请求）
       this.$store.dispatch('reqHomeCasual')//调用action里reqHomeCasual
         //请求首页导航数据
      this.$store.dispatch('reqHomeNav');
            //请求首页商品列表数据
      this.$store.dispatch('reqHomeShopList');
  
     },
     watch: {
       //监听数据改变，延迟处理画面渲染，直到下次DOM更新是创建swiper实例
       homecasual(){
         //Vue.nextTick()作用：在下次dom更新循环结束之后，执行延迟回调。在修改数据之后立即使用这个方法，获得更新后的dom
         this.$nextTick(()=>{
              //Swiper实例
               new Swiper ('.swiper-container', {
               autoplay: {
                   delay: 1000,
                   stopOnLastSlide: false,
                   disableOnInteraction: true,
                   },
               loop: true, // 循环模式选项
               // 如果需要分页器
               pagination: {
               el: '.swiper-pagination',
             },
           }) 
         });
       }
     },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    .hot
      width 100%
      height 100%
      padding-top 46px
      background #f5f5f5
     .hot-ad
       padding 5px
       margin 8px 0
       background-color #ffffff
      
        
</style>
