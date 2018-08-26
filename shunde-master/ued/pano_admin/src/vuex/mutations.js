const createMenu = function (state, router) {
  //
}
const mutations = {
  // 权限菜单
  MENULOADED (state, loaded) {
    state.isMenuLoaded = loaded
  },
  ADD_MENU (state, menus) {
    if (!menus || menus.length === 0) {
      state.menus = []
    } else {
      createMenu(state.menus, menus)
    }
  },
  // mutation 方法名字约定大写
  // poi列表
  UPDATEPOILISTS (state, poilists = {}) {
    for (let i in poilists) {
      state.poilists[poilists[i].id] = poilists[i]
      if (state.poilists[poilists[i].id].poiName) {
        state.poilists[poilists[i].id].name = state.poilists[poilists[i].id].poiName
      }
    }
  },
  // 全景信息
  UPDATEPANOINFO (state, panoInfo = {}) {
    if (!panoInfo.id) return
    if (!state.panoInfos[panoInfo.id]) {
      state.panoInfos[panoInfo.id] = {}
    }
    for (let i in panoInfo) {
      state.panoInfos[panoInfo.id][i] = panoInfo[i]
    }
  },
  // 用户信息
  UPDATEUSERINFO (state, userInfo = {}) {
    for (let i in state.userInfo) {
      if (typeof userInfo[i] !== 'undefined') {
        state.userInfo[i] = userInfo[i]
      }
    }
  },
  // 部门列表信息
  UPATEDEPARTMENTLISTINFO (state, departmentList = []) {
    if (!departmentList.data) return
    state.departmentList = departmentList.data
  },
  // 更新user permissions
  UPDATEUSERPERMISSIONS (state, list = []) {
    state.userPermissions._origin = list
    // uriPattern
    for (let i in list) {
      for (let j in list[i].resources) {
        state.userPermissions.uriPattern[list[i].resources[j].uriPattern] = list[i].resources[j]
      }
    }
    state.userPermissions.isValid = true
  },
  // 删除用户permissions
  DELETEUSERPERMISSIONS (state) {
    state.userPermissions.isValid = false
    state.userPermissions._origin = []
    state.userPermissions.uriPattern = {}
    // console.log(state.userPermissions)
  }
}

export default mutations
