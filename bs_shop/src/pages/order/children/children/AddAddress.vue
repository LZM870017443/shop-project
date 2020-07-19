<template>
  <div id="addAddress">
    <!-- 添加地址
    导航栏-->
    <van-nav-bar
      :fixed="true"
      :border="true"
      title="添加地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 地址编辑 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
      style="padding-top: 50px"
    />
  </div>
</template>

<script>
import areaList from "./area";
import { Toast } from "vant";
import { addUserAddress } from "./../../../../api/index";
import { mapState } from "vuex";
import PubSub from "pubsub-js";

export default {
  name: "AddAddress",
  data() {
    return {
      areaList: areaList,
      searchResult: [],
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 保存
    async onSave(content) {
      console.log(content);
      if (this.userInfo.id) {
        let result = await addUserAddress(
          this.userInfo.id,
          content.name,
          content.tel,
          content.province + content.city + content.county,
          content.addressDetail,
          content.postalCode,
          content.isDefault,
          content.province,
          content.city,
          content.county,
          content.areaCode
        );
        console.log(result);
        // 判断
        if (result.success_code === 200) {
          // 成功
          Toast({
            message: "添加地址成功！",
            duration: 400
          });
          // 回去
          this.$router.back();
          // 发起通知
            PubSub.publish("backToMyAddress");
        } else {
          Toast({
            message: "添加地址失败！",
            duration: 400
          });
        }
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "莲福路XXXX号",
            address: "崇武镇莲西村"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style scoped>
#addAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 9999;
}
</style>