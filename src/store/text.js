// import Vue from 'vue'
// import Vuex from 'vuex'
// import {
//     localSet,
//     localGet
// } from '../utils/mylocal'
// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         // 用来保存用户信息
//         // 默认打开页面时，先从 localostage 中取出 token, 如果有就直接取出。如果没有就设置为一个空对象
//         goodsid: localGet('goodsid') || 0
//     },
//     mutations: {
//         setGoodsId: function (state, payload) {
//             // 将用户保存信息到 vuex 中
//             state.userInfo = payload,
//             // 将服务器返回的用户信息保存到本地中
//              localSet('goodsid', payload)
//         }
//     },
//     actions: {},
//     modules: {}
// })
