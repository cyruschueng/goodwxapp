import config from 'config'
import request from './request'
import { getUserInfoByLogin } from './wx'
import { fetchUser } from 'actions'
import store from '../store/index'

// 获取后端session
export const getSession = () => request({
  method: 'get',
  url: config.urls.getSession
})

export const addMobile = (data) => request({
  method: 'post',
  url: config.urls.addMobile,
  data
})

// 提交用户信息
export const createWxUserInfo = (data) => request({
  method: 'POST',
  url: config.urls.createWxUserInfo,
  data
})

export const checkUserInfo = (res) => {
  if (res) {
    // 本地保存
    store.dispatch(fetchUser(res.userInfo))
    createWxUserInfo(res)
  } else {
    // 获取用户信息
    return getUserInfoByLogin().then((res) => {
      // 提交信息给后端
      createWxUserInfo(res)
      // 本地保存
      store.dispatch(fetchUser(res.userInfo))
    })
  }
}
