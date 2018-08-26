import api from '../api/http'

const state = {
  login: false
}

const actions = {
  alert({ commit }, sub) {
    api.tologin(sub,(res) => {
      console.log(res)
      commit('clear', res)
    })
  }
}

const mutations = {
  clear(state, res) {
    state.buymenu = {}
  }
}

export default {
  state,
  actions,
  mutations
}
