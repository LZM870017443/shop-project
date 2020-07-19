// 1. 引入对应模块
import Vue from 'vue'
import VueRouter from 'vue-router'

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
        return VueRouterPush.call(this, to).catch(err => err)
    }
    //一级路由
import Home from './../pages/Home/Home'
import Recommend from './../pages/Recommend/Recommend'
import Search from './../pages/Search/Search'
import Chat from './../pages/Chat/Chat'
import Me from './../pages/Me/Me'
import Login from './../components/Login/Login'
//二级路由
import Hot from '../pages/Home/Children/Hot/Hot'
import Box from './../pages/Home/Children/Box'
import Dress from './../pages/Home/Children/Dress'
import Ele from './../pages/Home/Children/Ele'
import Food from './../pages/Home/Children/Food'
import General from './../pages/Home/Children/General'
import Man from './../pages/Home/Children/Man'
import Mbaby from './../pages/Home/Children/Mbaby'
import Shirt from './../pages/Home/Children/Shirt'

import Mesetting from './../pages/Me/MeSetting'
import Medetail from './../pages/Me/UserDetail'

//订单页
import Order from './../pages/order/Order'
import OrderDetail from './../pages/order/children/OrderDetail.vue'
import MyAddress from './../pages/order/children/MyAddress.vue'
import ToPay from './../pages/order/children/ToPay.vue'
import AddAddress from './../pages/order/children/children/AddAddress.vue'
import EditAddress from './../pages/order/children/children/EditAddress.vue'

import MeOrder from './../pages/Me/MeOrder.vue'

import DetailPages from './../pages/DetailPages/DetailPages.vue'

// 2. 声明使用
Vue.use(VueRouter);

// 3. 输出路由对象
export default new VueRouter({
    // 3.1 配置一级路由
    routes: [{
            path: '/home',
            component: Home,
            children: [
                // 热门版块
                { path: 'hot', component: Hot, meta: { showBottomTabBar: true }, },
                // 服饰版块
                { path: 'dress', component: Dress, meta: { showBottomTabBar: true }, },
                // 鞋包版块
                { path: 'box', component: Box, meta: { showBottomTabBar: true }, },
                // 母婴版块
                { path: 'mbaby', component: Mbaby, meta: { showBottomTabBar: true }, },
                // 百货版块
                { path: 'general', component: General, meta: { showBottomTabBar: true }, },
                // 食品版块
                { path: 'food', component: Food, meta: { showBottomTabBar: true }, },
                // 内衣版块
                { path: 'shirt', component: Shirt, meta: { showBottomTabBar: true }, },
                // 男装版块
                { path: 'man', component: Man, meta: { showBottomTabBar: true }, },
                // 电器版块
                { path: 'ele', component: Ele, meta: { showBottomTabBar: true }, },
                { path: '/home', redirect: '/home/hot' }
            ]
        },
        {
            path: '/recommend',
            component: Recommend,
            meta: { showBottomTabBar: true }
        },
        {
            path: '/search',
            component: Search,
            meta: { showBottomTabBar: true }
        },
        {
            path: '/chat',
            component: Chat,
            meta: { showBottomTabBar: true }
        },
        {
            path: '/order',
            component: Order,
            // meta: { showBottomTabBar: true },
            children: [{
                    path: 'myAddress',
                    component: MyAddress,
                    children: [
                        // 添加地址
                        { path: 'addAddress', component: AddAddress },
                        { path: 'editAddress', component: EditAddress },

                    ]
                },
                { path: 'toPay', component: ToPay },
                { path: 'orderDetail', component: OrderDetail }
            ]
        },
        {
            path: '/me',
            component: Me,
            meta: { showBottomTabBar: true },
            children: [
                { path: 'meorder', component: MeOrder, meta: { showBottomTabBar: true } }
            ]
        },
        {
            path: '/login',
            component: Login,
            meta: { showBottomTabBar: false },
        },
        {
            path: '/setting',
            component: Mesetting,
            meta: { showBottomTabBar: false },
        },
        {
            path: '/detail',
            component: Medetail,
            meta: { showBottomTabBar: false },
        },
        {
            path: '/detailpages/:goods_id',
            component: DetailPages,
        },
        {
            path: '/',
            redirect: '/home'
        },

    ]
});