// import Vue from 'vue'

const actions = {
  // isActivate ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     Vue.prototype.$api.isActivate().then((res) => {
  //       if (res) {
  //         if (res.code === '0' && res.data === 1) {
  //           commit('isActivate', true)
  //           resolve()
  //         } else {
  //           commit('isActivate', false)
  //           resolve()
  //         }
  //       }
  //     })
  //   })
  // }
  fetchPoiList ({commit}, context) {
    return new Promise((resolve, reject) => {
      context.$api.searchPoi({}).then(res => {
        if (res.code === 0) {
          commit('UPDATEPOILISTS', res.data)
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  fetchUserPermissions ({commit}, context) {
    return new Promise((resolve, reject) => {
      context.$api.getUserPermissions({}).then(res => {
        if (res.code === 0) {
          commit('UPDATEUSERPERMISSIONS', res.data)
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  }
}

export default actions
