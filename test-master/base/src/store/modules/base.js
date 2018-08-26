import api from '../api/http'

const state = {
  shopListByBiz: [{id: ''}],
  deskTypeList: {},
  roominfos: {}
}

const actions = {
  getBase({ commit }, sub) {
    api.deskManage.getShopListByBiz({}, (res) => {
      commit('addData', {key: 'shopListByBiz', val: res.data})
    }, ['shopId'])
    api.deskManage.deskTypeList({}, (res) => {
      commit('addData', { key: 'deskTypeList', val: res.data.rows })
    }, ['shopId'])
    api.deskRoomManage.loadRoominfos({}, (res) => {
      commit('addData', { key: 'roominfos', val: res.data.rows })
    }, ['shopId'])
  }
}

const mutations = {
  addData(state, res) {
    state[res.key] = {}
    state[res.key] = res.val
  }
}

export default {
  state,
  actions,
  mutations
}
