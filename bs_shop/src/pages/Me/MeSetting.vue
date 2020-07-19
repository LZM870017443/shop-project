<template>
  <div class="me-setting">
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
     
    />
    <div  style="margin-top:150xp">
      <me-common-cell left-icon="itlike-3" left-title="绑定手机号" />
    </div>
    <div style="margin-top: 10px">
      <me-common-cell left-icon="itlike-3" left-title="免密支付设置" />
      <me-common-cell left-icon="itlike-2" left-title="免拼卡设置" />
      <me-common-cell
        left-icon="itlike-1"
        left-title="免拼设置"
        right-title="还有0次免拼机会"
        right-title-color="#a5a5a5"
      />
      <me-common-cell left-icon="itlike-2" left-title="拼小圈设置" />
      <me-common-cell left-icon="itlike-4" left-title="直播设置" />
      <me-common-cell left-icon="itlike-2" left-title="消息接收设置" />
    </div>

    <div style="margin-top: 10px">
      <me-common-cell left-icon="itlike-4" left-title="常见问题" :clickCell="dealClickCell" />
      <me-common-cell left-icon="itlike-5" left-title="意见反馈" :clickCell="dealClickCell" />
    </div>

    <div style="margin-top: 10px">
      <me-common-cell left-icon="itlike-3" left-title="商家免费入住" />
      <me-common-cell left-icon="itlike-4" left-title="清除缓存" />
      <me-common-cell left-icon="itlike-5" left-title="关于毕设商城" />
    </div>

    <div class="logout" @click="dealLogout">退出登录</div>
  </div>
</template>

<script>
import MeCommonCell from "./MeCommonCell";
import { Toast, MessageBox } from "mint-ui";
import { mapActions } from "vuex";

export default {
  name: "MeSetting",
  components: {
    MeCommonCell
  },
  methods: {
    ...mapActions(["logOut"]),
    //点击了左边
    onClickLeft() {
      // Toast('返回');
      this.$router.go(-1);
    },
    dealClickCell(props) {
      Toast("点击了" + props);
      // this.$router.replace('/home');
    },
    dealLogout() {
      // console.error(111);
      MessageBox.confirm("确定执行此操作?")
        .then(action => {
          // console.log(action);
          if ("confirm" === action) {
            this.logOut({});
            // 回到主界面
            this.$router.replace("/home");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.me-setting {
  width: 100%;
  height: 100%;
  background-color: #ececec;


  .logout {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
