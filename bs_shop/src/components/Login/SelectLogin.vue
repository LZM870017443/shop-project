<template>
  <div class="select-login" :style="bgImg"> 
    <h4>选择登录方式</h4>
    <router-link tag="button" to="/login">手机登录</router-link>
    <!-- <TabBar/> -->
  </div>

</template>

<script>
// import TabBar  from './../TabBar/TabBar'
    export default {
        name: "SelectLogin",
        data() {
          return {
             bgImg: {
                backgroundImage: "url(" + require("./images/timgF0FCAPB52.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: " 100% 100%"
          },//背景图
          }
        },
        components:{
              // TabBar
        },
    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .select-login
    background-color #f5f5f5
    width 100%
    height 100%
    position fixed
    left 0
    top 0
    z-index 998
    display flex
    flex-direction column
    justify-content center
    align-items center
    button
      width 80%
      height 38px
      background-color purple
      border none
      border-radius 5px
      font-size 20px
      color #fff
      margin-top 30px
</style>
