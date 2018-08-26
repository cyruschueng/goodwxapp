import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
Vue.use(Vuex)

const state = {
  globalData: {},
  adminleftnavnum: 'main',  // 管理后台左侧导航
  isCollapse: false // 导航的收起
}

const actions = {}

const mutations = {
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
    login
  }
})
