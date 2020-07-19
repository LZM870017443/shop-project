import ajax from './ajax'

// 基础路径
const BASE_URL = '/api';
// const BASE_URL = 'http://127.0.0.1:3000';
// const BASE_URL = 'http://localhost:3000';

// 请求方法
// 请求首页的轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');
//  请求首页的导航
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');
//  请求首页的商品列表
export const getHomeShopList = () => ajax(BASE_URL + '/api/homeshoplist');
//  请求推荐页的商品列表
export const getRecommendShopList = (params) => ajax(BASE_URL + '/api/recommendshoplist', params);
//  请求详情页的商品列表
export const getDetailPages = (goods_id) => ajax(BASE_URL + '/api/DetailPages', { goods_id }, 'POST');

//  请求搜索页的商品列表
export const getSearchGoods = () => ajax(BASE_URL + '/api/searchgoods');


//  请求短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', phone);
//  手机验证码登入 验证码匹对
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', { phone, code }, 'POST');
//  用户名密码登入
export const pwdLogin = (name, pwd, phone, captcha) => ajax(BASE_URL + '/api/login_pwd', { name, pwd, phone, captcha }, 'POST');
//  获取登入用户信息
export const getUserInfo = () => ajax(BASE_URL + '/api/user_info');
//  退出登入
export const getLogout = () => ajax(BASE_URL + '/api/logout');
//  修改用户信息
export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday, user_sign) => ajax(BASE_URL + '/api/change_user_msg', { user_id, user_name, user_sex, user_address, user_birthday, user_sign }, 'POST');


// 加入购物车
export const addGoodsToCart = (user_id, goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_shop_cart', { user_id, goods_id, goods_name, thumb_url, price }, 'POST');
// 请求购物车的数据
export const getCartsGoods = (user_id) => ajax(BASE_URL + '/api/cart_goods', { user_id }, 'POST');
// 删除购物车商品
export const deleteShopToCart = (user_id, goods_id) => ajax(BASE_URL + '/api/delete_shop_cart', { user_id, goods_id }, 'POST');
// 增加减少购物车数量
export const updateShopsCount = (user_id, goods_id, isAdd, buy_count) => ajax(BASE_URL + '/api/update_shop_count', { user_id, goods_id, isAdd, buy_count }, 'POST');

// 搜索栏的数据
export const getSearchBoxs = (goods_name) => ajax(BASE_URL + '/api/search_box', { goods_name }, 'POST');

// 加入我的清单
export const addMyOrders = (user_id, goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_my_orders', { user_id, goods_id, goods_name, thumb_url, price }, 'POST');
// 请求我的清单的数据
export const getOrdersGoods = (user_id) => ajax(BASE_URL + '/api/my_orders_goods', { user_id }, 'POST');



//  地址接口
// 获取当前用户的地址
export const getUserAddress = (user_id) => ajax(BASE_URL + '/api/address/search/' + user_id);
// 添加新的地址
export const addUserAddress = (user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/add', { user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');
//  编辑用户的地址
export const changeUserAddress = (address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode) => ajax(BASE_URL + '/api/address/edit', { address_id, user_id, address_name, address_phone, address_area, address_area_detail, address_post_code, address_tag, province, city, county, areaCode }, 'POST');
// 删除用户的地址
export const delUserAddress = (address_id) => ajax(BASE_URL + '/api/address/del/' + address_id);
//  获取单条地址
export const getCurrentUserAddress = (user_id, address_id) => ajax(BASE_URL + '/api/address/one', { user_id, address_id }, 'POST');