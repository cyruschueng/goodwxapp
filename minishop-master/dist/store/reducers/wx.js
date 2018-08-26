import { UPDATE_NETWORK_TYPE } from '../action-types'

// 更新网路信息
export const networkType = (state = 'none', action) => {
  switch (action.type) {
    case UPDATE_NETWORK_TYPE:
      return action.networkType
    default:
      return state
  }
}
