<template>
  <!-- 分类页 -->
  <div class="search">
    <!-- 搜索栏 -->
    <search-nav :isShowSearchPanel="isShowSearchPanel" />
    <!-- 商品分类 -->
    <div class="shop">
      <!-- 左边栏 -->
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li
            class="menu-item"
            v-for="(goods,index) in searchgoods"
            :key="index"
            :class="{current: index === currentIndex}"
            @click="clickLeftItem(index)"
            ref="menulist"
          >
            <span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <!-- 右边栏 -->
      <div class="shop-wrapper">
        <ul ref="shopsParent">
      
          <li class="shops-li" v-for="(goods,index1) in searchgoods" :key="index1">  
              <!-- 头部 -->
            <div class="shop-title">
              <h4>{{goods.name}}</h4>
              <a href>查看更多></a>
            </div>
            <!-- 随机广告 -->
            <ul class="phone-type" v-if="goods.tag === 'phone'">
              <li v-for="(phone, index) in goods.category" :key="index">
                <img :src="phone.icon" alt />
              </li>
            </ul>
            <!-- 商品列表 -->
            <ul class="shops-items">
              <li v-for="(item,index2) in goods.items" :key="index2">
                <img :src="item.icon" alt />
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
      <!--搜索的面板-->
      <search-panel 
      v-if="isShow" 
      :isShowSearchPanel="isShowSearchPanel" />
  </div>
</template>

<script>
import SearchNav from "./children/SearchNav";
import { mapState } from "vuex";
import BScroll from "better-scroll";
import SearchPanel from "./children/SearchPanel";

export default {
  name: "Search",
  data() {
    return {
      scrollY: 0, // 右侧列表滑动的Y轴坐标(实时更新)
      rightLiTops: [], // 所有分类的头部位置
      isShow: false // 设置搜索面板的显示
    };
  },
  mounted() {
    this.$store.dispatch("reqSearchGoods");
  },
  computed: {
    ...mapState(["searchgoods"]),

    //1 动态决定左边栏哪个被选中  右-->左
    currentIndex() {
      //  1.1获取数据
      const { scrollY, rightLiTops } = this; //ES6取值
      //  1.2 取出索引//findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素下标。
      return rightLiTops.findIndex((liTop, index) => {
        this._leftScroll(index);
        //1.3大于上标的值和小于下表的值。之间的选上标
        return scrollY >= liTop && scrollY < rightLiTops[index + 1];
      });
    } 
  },
  components: {
    SearchNav,
    SearchPanel
  },
  watch: {
    searchgoods() {
      this.$nextTick(() => {
        //1.1初始化
        this._initBScroll();
        // 1.2求出右边所有版块的头部位置
        this._initRightLiTops();
      });
    }
  },
  methods: { 
     //1BScroll初始化
    _initBScroll() {
      //1.1 左边  可以滚动
      this.leftScroll = new BScroll(".menu-wrapper", {
        click: true
      });
      // 1.2右边   可以滚动
      this.rightScroll = new BScroll(".shop-wrapper", {
        probeType: 3,
        click: true
      });

      //1.3监听右边滑动 获取scrollY的值 on作用：监听当前实例上的自定义事件
      // 事件scroll:参数：触发时机：滚动过程中。
      this.rightScroll.on("scroll", pos => {
        //Math.abs 返回绝对数值  
        this.scrollY = Math.abs(pos.y);
       console.log(this.rightLiTops);
      //  console.log(this.scrollY);
      });
    },

    // 2求出右边所有版块的头部位置
    _initRightLiTops() {
      //2.1  临时数组
      const tempArr = [];
      // 2.2定义变量记录高度
      let top = 0;
      tempArr.push(top);
      // 2.3遍历li标签, 取出高度
      //2.3.1 获取右边shops-li"
      let allLis = this.$refs.shopsParent.getElementsByClassName("shops-li");
      //2.3.2截取allLis转真数组，遍历
      Array.prototype.slice.call(allLis).forEach(li => {
        //遍历后取出高度后叠加
        top += li.clientHeight;
        tempArr.push(top);
      });
      // 更新数据 拿到高度
      this.rightLiTops = tempArr;
    },

    //3点击切换商品块 左-->右
    clickLeftItem(index) {
      //取得分类头部位置
      this.scrollY = this.rightLiTops[index];
      //scrollTo（效果：滚动到指定的位置） 使右边栏发生滚动  水平 垂直 过渡时间
      this.rightScroll.scrollTo(0, -this.scrollY, 300);
    },

    // 4左侧联动 右侧滚动，左侧跟着滚动
    _leftScroll(index) {
      //获取左边栏li列表
      let menuLists = this.$refs.menulist;
       //console.log(menuLists);
      //用索引获取当前li标签列表
      let el = menuLists[index];
      // console.log(el);
      //scrollToElement作用：滚动到指定的目标元素。
                                  //元素 过渡时间 横轴移动量 竖轴。。。
      this.leftScroll.scrollToElement(el, 300, 0, -100);
    },
    // 5 设置搜索面板的显示
    isShowSearchPanel(flag) {
      this.isShow = flag;
    }
  }
};
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
@import '~@/common/stylus/base.styl';

.search {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}

.shop {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 50px;
  width: 100%;
  overflow: hidden;
}

// background-color #ffffff
.menu-wrapper {
  width: 80px;
  background-color: #e0e0e0;
  flex: 0 0 80px;

  .menu-item {
    width: 100%;
    height: 60px;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: lighter;
    color: #666666;
    position: relative;
  }

  .current {
    color: #e02124;
  }

  .current::before {
    content: '';
    background-color: #e02124;
    width: 4px;
    height: 30px;
    position: absolute;
    left: 0;
  }
}

.shop-wrapper {
  flex: 1;
  background-color: #fff;

  .shop-title {
    display: flex;
    // flex-direction:row; 沿水平主轴让元素从左向右排列
    flex-direction: row;
    padding: 0 10px;
    height: 44px;
    align-items: center;
    justify-content: space-between;
    color: #999;

    a {
      color: #999;
      text-decoration: none;
      font-weight: lighter;
    }
  }

  .shops-items {
    display: flex;
    flex-wrap: wrap;//必要时换行

    li {
      display: flex;
      flex-direction: column;
      width: 33.3%;
      height: 90px;
      justify-content: center;
      align-items: center;
      color: #666;
      font-weight: lighter;
      font-size: 14px;

      img {
        width: 60%;
        height: 60%;
        margin-bottom: 5px;
      }
    }
  }

  .phone-type {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-bottom-1px(#ccc);

    li {
      width: 33.3%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;

      img {
        width: 70%;
      }
    }
  }
}
</style>
