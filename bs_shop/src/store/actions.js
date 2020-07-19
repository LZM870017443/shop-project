import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods,
    getUserInfo,
    getLogout,
    getCartsGoods,
    getOrdersGoods,
    getSearchBoxs
} from '../api'

import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST,
    SEARCH_GOODS,
    USER_INFO,
    RESET_USER_INFO,
    CART_GOODS_LIST,
    ADD_GOODS_COUNT,
    REDUCE_GOODS_COUNT,
    SELECTED_ALL_GOODS,
    SELECTED_SINGER_GOODS,
    DEL_SINGER_GOODS,
    MY_ORDER_GOODS,
    MY_SEARCH_BOXS
} from './mutation-types'


export default {
    // 获取首页的轮播图
    async reqHomeCasual({ commit }) {
        const result = await getHomeCasual();
        commit(HOME_CASUAL, { homecasual: result.message })
    },
    //  获取首页的导航
    async reqHomeNav({ commit }) {
        const result = await getHomeNav();
        commit(HOME_NAV, { homenav: result.message.data })
    },
    //  获取首页的商品列表
    async reqHomeShopList({ commit }) {
        const result = await getHomeShopList();
        // debugger;
        commit(HOME_SHOP_LIST, { homeshoplist: result.message.goods_list })
    },
    //  获取推荐页的商品列表
    async reqRecommendShopList({ commit }, params) {
        // console.log(params);
        const result = await getRecommendShopList(params);
        commit(RECOMMEND_SHOP_LIST, { recommendshoplist: result.message });
        params.callback && params.callback();

    },
    //  获取搜索页的商品列表
    async reqSearchGoods({ commit }) {
        const result = await getSearchGoods();
        commit(SEARCH_GOODS, { searchgoods: result.message.data })
    },
    //  同步用户信息
    syncUserInfo({ commit }, userInfo) {
        commit(USER_INFO, { userInfo })

    },
    //  异步获取用户信息 解决自动登入
    async getUserInfo({ commit }) {
        const result = await getUserInfo();
        console.log(result);
        if (result.success_code === 200) {
            commit(USER_INFO, { userInfo: result.message });
        }
    },
    // 退出登入，清空用户信息
    async logOut({ commit }) {
        const result = await getLogout();
        // console.log(result);
        if (result.success_code == 200) {
            commit(RESET_USER_INFO);
        }
    },
    //请求购物车数据
    async reqCartsGoods({ commit }) {
        const result = await getCartsGoods();
        if (result.success_code === 200) {
            commit(CART_GOODS_LIST, { cartgoods: result.message })
        }
    },
    //单个商品的增加减少
    async updateGoodsCount({ commit }, { goods, isAdd }) {
        // const result = await getCartsGoods();
        if (isAdd) {
            commit(ADD_GOODS_COUNT, { goods })

        } else {
            commit(REDUCE_GOODS_COUNT, { goods })
        }
    },
    //判断是否选中全部商品
    selectedAll({ commit }, { isSelected }) {
        //提交操作
        commit(SELECTED_ALL_GOODS, { isSelected })
    },
    // 单个商品的选中和取消
    singerGoodsSelected({ commit }, { goods }) {
        commit(SELECTED_SINGER_GOODS, { goods });
    },

    // 单个商品的删除
    delGoodsSinger({ commit }, { goods }) {
        commit(DEL_SINGER_GOODS, { goods });
    },
    //请求我的清单数据
    async reqsOrderGoods({ commit }) {
        const result = await getOrdersGoods();
        if (result.success_code === 200) {
            commit(MY_ORDER_GOODS, { ordergoods: result.message })
        }
    },
    //请求我的清单数据
    async reqsSearchBoxs({ commit }, { goods_name }) {
        const result = await getSearchBoxs(goods_name);
        if (result.success_code === 200) {
            commit(MY_SEARCH_BOXS, { searchboxs: result.message })
        }
    },
}