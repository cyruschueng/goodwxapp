import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import base from './modules/base'
import rules from './modules/rules'
import stopmClient from './websocket'

// console.log(stopmClient)
Vue.use(Vuex)

const state = {
  showShop: false,
  globalData: {}, // 全局参数，重要参数
  adminleftnavnum: 'main', // 管理后台左侧导航
  isCollapse: false // 导航的收起
}

const actions = {}

const mutations = {
  stopmClientInit() {
    stopmClient.init()
  },
  setData(state, res) {
    state[res.key] = res.val
  },
  setGlobalData(state, res) {
    state.globalData = state.globalData.length <= 0 ? {} : state.globalData
    state.globalData[res.key] = res.val
  },
  topShopShow(state, res) {
    state.showShop = res
  },
  changeAdminleftnavnum(state, res) {
    state.adminleftnavnum = res
  },
  changeCollapse(state, res) {
    if (res) {
      state.isCollapse = res
    } else {
      state.isCollapse = !state.isCollapse
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    login,
    base,
    rules
  }
})
