import {
  UPDATE_USER_INFO,
  UPDATE_SID,
  UPDATE_OPENID,
  UPDATE_PHONENUMBER
} from '../action-types'
import Immutable from 'immutable'

// 更新用户信息
export const userInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return Immutable.merge(state, action.userInfo)
    default:
      return state
  }
}

// 更新session
export const sid = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SID:
      return action.sid
    default:
      return state
  }
}

// 更新openId
export const openId = (state = '', action) => {
  switch (action.type) {
    case UPDATE_OPENID:
      return action.openId
    default:
      return state
  }
}

// 更新手机号
export const phoneNumber = (state = '', action) => {
  switch (action.type) {
    case UPDATE_PHONENUMBER:
      return action.phoneNumber
    default:
      return state
  }
}
