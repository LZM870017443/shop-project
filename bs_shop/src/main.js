import Vue from 'vue'
import App from './App.vue'
import 'default-passive-events'
import router from './router'
import store from './store'
//引入fastclick
// import FastClick from 'fastclick'

// if ('addEventListener' in document) {
//     document.addEventListener('touchmove', function(event) {
//         event.preventDefault();
//     }, {
//         passive: false
//     });
// }

// 引入全局UI组件库-vant
import vant from 'vant';
import 'vant/lib/index.css';
Vue.use(vant);

//引入样式
import './../static/css/reset.css'

//引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
//点击上拉
import { Actionsheet } from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
//日期
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(Mint);


//引入ly-tab底部全局选项卡
import LyTab from 'ly-tab'
Vue.use(LyTab)

// 引入字体图标文件
import '@/common/css/style.css'

//图片懒加载
import VueLazyload from 'vue-lazyload';
import loading from '../static/img/loading.png'
Vue.use(VueLazyload, {
    loading: loading,
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')