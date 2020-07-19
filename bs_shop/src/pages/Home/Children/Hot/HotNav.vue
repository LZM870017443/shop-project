<template>
  <div class="hot-nav">
    <!--滚动区域-->
    <div class="hot-nav-content" v-if="homenav.length>0">
      <div class="nav-content-inner">
        <a class="inner-item" v-for="(nav,index) in homenav " :key='index'>
          <img :src="nav.iconurl" alt="">
          <span>{{nav.icontitle}}</span>
        </a>
      </div>
    </div>
    <!--进度条-->
    <div class="hot-nav-bottom">
      <div class="hot-nav-bottom-inner" :style="innerBarStyle"></div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

  export default {
    name: "HotNav",
    data(){
      return {
        //  屏幕可视区域的宽度
        screenW: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        scrollContentW: 720,  // 滚动内容的宽度
        bgBarW: 100, // 滚动条背景的长度
        barXWidth: 0,// 滚动条的长度
        startX: 0,  //  起点
        endFlag: 0, //  记录结束点
        barMoveWidth: 0   // 移动的距离
      }
    },
    computed:{
      //获取导航栏数据
      ...mapState(['homenav']),
      //动态滚动条长度
      innerBarStyle(){
        return {
          width: `${this.barXWidth}px`, //动态计算滚动条长度
          left: `${this.barMoveWidth}px`//动态滚动条移动距离
        }
      }
    },
    mounted() {  
       this.getBottomBarWidth();//动态滚动条长度
       this.bindEvent();
    },
    methods:{
      // 获取滚动条的长度                         
      getBottomBarWidth(){       
        this.barXWidth = this.bgBarW * (this.screenW / this.scrollContentW)
      },
      // 移动端事件监听
      bindEvent(){
        //开始触摸                  绑定事件      回调函术         是否执行冒泡         
        this.$el.addEventListener('touchstart',this.handleTouchStart,false);
         //开始移动
         this.$el.addEventListener('touchmove',this.handleTouchMove,false);
         //触摸结束
         this.$el.addEventListener('touchend',this.handleTouchEnd,false);
      },
      // 开始触摸
      handleTouchStart(event){
        // console.log('开始触摸')
        //  console.log(event.touches);
         // 1. 获取第一个触点
        let touch = event.touches[0];
         // 2.求出起始点
        this.startX = Number(touch.pageX);
        // console.log(this.startX);
      },
      // 开始移动
      handleTouchMove(){
        // console.log('开始移动');
        // 1. 获取最后一个触点
        let touch = event.touches[0];
        // 2. 求出移动的距离
        let moveWidth = Number(touch.pageX) - this.startX;
        // console.log(moveWidth);
        // 3. 求出滚动条走的距离                                               每次从结束点开始              
        this.barMoveWidth = -((this.bgBarW / this.scrollContentW) * moveWidth - this.endFlag);

        // 4. 边界值处理
        if(this.barMoveWidth <= 0){ // 左边
          this.barMoveWidth = 0;
        }else if(this.barMoveWidth >= this.bgBarW - this.barXWidth){ // 右边
          this.barMoveWidth = this.bgBarW - this.barXWidth;
        }
      },
      // 结束触摸
      handleTouchEnd(){
        // console.log('结束触摸');
        this.endFlag = this.barMoveWidth;
      },
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot-nav
    width 100%
    height 180px
    position relative //相对定位
    background-color #fff
    padding-bottom 10px
    margin-top 10px
    .hot-nav-content
      width 100%
      overflow-x scroll //  横向滚动
      .nav-content-inner
        width 720px
        height 180px
        display flex  //伸缩布局
        flex-wrap wrap //自动换行
        .inner-item
          width 90px
          height 90px
          display flex
          flex-direction column  //排列灵活的项目将垂直显示，正如一个列一样。
          //用于设置或检索弹性盒子元素在主轴(纵轴)方向上的对齐方式。.
          justify-content center
          //定义flex子项在flex容器的当前行的侧轴(横轴)方向上的对齐
          align-items center
          font-size 14px
          color #666666
          img
            width 40%
            margin-bottom 5px
          
    .hot-nav-content::-webkit-scrollbar  //拿到滚动条将其隐藏
      display none

    .hot-nav-bottom
      width 100px
      height 2px
      background-color #ccc
      position absolute
      left 50%
      margin-left -50px
      bottom 8px
      .hot-nav-bottom-inner
         position absolute
         left 0
         height 100%
         background-color orangered
         width 0
</style>
