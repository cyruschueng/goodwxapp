import {
  UPDATE_USER_INFO,
  UPDATE_NETWORK_TYPE,
  UPDATE_SID,
  UPDATE_OPENID,
  UPDATE_PHONENUMBER
} from '../action-types'

export function fetchUser (userInfo) {
  return {
    type: UPDATE_USER_INFO,
    userInfo
  }
}

export function getNetworkType (networkType) {
  return {
    type: UPDATE_NETWORK_TYPE,
    networkType
  }
}

export function updateSid (sid) {
  return {
    type: UPDATE_SID,
    sid
  }
}

export function updateOpenId (openId) {
  return {
    type: UPDATE_OPENID,
    openId
  }
}

export function updatePhoneNumber (phoneNumber) {
  return {
    type: UPDATE_PHONENUMBER,
    phoneNumber
  }
}
