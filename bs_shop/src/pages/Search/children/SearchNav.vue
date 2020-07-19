<template>
  <div class="search-nav">
    <!-- @click.prevent 阻止事件的默认行为-->
       <a href="" class="search-nav-icon" 
       @click.prevent="isShowSearchPanel(true)">
          <img src="../images/search.png" alt="" width="25px">
          <span>毕设商城</span>
      </a>
  </div>
</template>

<script>
export default {
  name: 'SearchNav',
   props:{
      isShowSearchPanel: Function
    },
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '~@/common/stylus/base.styl'
  .search-nav
    background #fff
    width 100%
    height 60px
    border-bottom-1px(#cccccc)
    position  fixed
    top 0
    left 0
    z-index 998
    display flex
    //	justify-content : center;元素在主轴（页面）上居中排列
    justify-content center
    //提示：使用 align-content 属性对齐交叉轴上的各项（垂直）。	
    align-items center
    .search-nav-icon
      width 95%
      height 70%
      background-color #e7e7e7
      border-radius  15px
      display flex
      justify-content center
      align-items center
      span
       color #a1a1a1
       margin-left 6px
       font-size 18px
       font-weight light
</style>

