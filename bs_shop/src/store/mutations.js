import Vue from 'vue';
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
    //首页轮播图
    [HOME_CASUAL](state, { homecasual }) {
        state.homecasual = homecasual;
    },
    //首页导航栏
    [HOME_NAV](state, { homenav }) {
        state.homenav = homenav;
    },
    //首页商品列表
    [HOME_SHOP_LIST](state, { homeshoplist }) {
        state.homeshoplist = homeshoplist;
    },
    //推荐页商品列表
    [RECOMMEND_SHOP_LIST](state, { recommendshoplist }) {
        state.recommendshoplist = state.recommendshoplist.concat(recommendshoplist);
    },
    //搜索页商品列表
    [SEARCH_GOODS](state, { searchgoods }) {
        state.searchgoods = searchgoods;
    },
    // 异步获取用户信息
    [USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo;
    },
    // 清空用户信息
    [RESET_USER_INFO](state) {
        state.userInfo = {};
    },
    // 购物车商品数据
    [CART_GOODS_LIST](state, { cartgoods }) {
        state.cartgoods = cartgoods;
    },
    // 增加购物车商品数量
    [ADD_GOODS_COUNT](state, { goods }) {
        goods.buy_count++;
    },
    // 减少购物车商品数量
    [REDUCE_GOODS_COUNT](state, { goods }) {
        goods.buy_count--;
        if (goods.buy_count === 0) {
            const index = state.cartgoods.indexOf(goods);
            state.cartgoods.splice(index, 1)
        }

    },
    //判断是否选中全部商品
    [SELECTED_ALL_GOODS](state, { isSelected }) {
        state.cartgoods.forEach((goods, index) => {
            if (goods.checked) { // 该属性存在
                goods.checked = !isSelected;
            } else { // 该属性不存在
                Vue.set(goods, 'checked', !isSelected);
            }
        });
    },
    //判断选中单个商品
    [SELECTED_SINGER_GOODS](state, { goods }) {
        // 1.1 判断是否有选中的属性
        if (goods.checked) {
            goods.checked = !goods.checked;
        } else {
            Vue.set(goods, 'checked', true);
        }
    },
    //删除一个购物车商品
    [DEL_SINGER_GOODS](state, { goods }) {
        const index = state.cartgoods.indexOf(goods);
        state.cartgoods.splice(index, 1);
    },
    // 我的商品商品数据
    [MY_ORDER_GOODS](state, { ordergoods }) {
        state.ordergoods = ordergoods;
    },
    // 我的搜索栏商品数据
    [MY_SEARCH_BOXS](state, { searchboxs }) {
        state.searchboxs = searchboxs;
    },
}