// 只做请求 公用的http请求
import promise from 'es6-promise'
import router from '@/router/index'
import state from '@/store/index'
import storage from '@/store/api/localStorage'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
promise.polyfill()
let fastUrl = ''
let resdata = {}
let baseUrl = 'http://192.168.1.212/restful'
// 根据webpack的配置获取域名
const HOST_NAME = process.env.HOST_NAME
if (HOST_NAME !== undefined) {
  console.log(HOST_NAME)
  baseUrl = HOST_NAME
}
// baseUrl = 'http://192.168.1.135/restful'
export default {
  request(sub, allurl, method,cb) {
    // if (fastUrl === allurl.url && allurl.name !== '获取菜品列表') {
    //   ElementUI.Message.error('操作频繁，请放松心态，稍后重试！')
    //   cb(resdata.data)
    //   return
    // }
    // fastUrl = allurl.url
    // setTimeout(() => {
    //   fastUrl = ''
    // }, 300)
    console.log('提交数据========>' + allurl)
    console.log(sub, allurl)
    return axios({
      method: method,
      url: baseUrl + allurl,
      data: qs.stringify(sub),
      timeout: 0,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then((res) => {
        console.log('返回数据<========' + allurl)
        console.log(res)
        resdata = res
        checkStatus(res, cb)
        // return checkStatus(res)
      })
      // .catch((res) => {
      //   ElementUI.Message.error('服务器或网络异常，请稍后重试！')
      // })
  }
}

function checkStatus(response, cb) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    checkCode(response.data, cb)
  } else {
    ElementUI.Message.error('网络异常')
  }
}

function checkCode(res, cb) {
  if ( res.code === 4102 ) {
    state.commit('setData', { key: 'globalData', val: {} })
    storage.clear('globalData')
    router.push('/login')
    ElementUI.Message.error('登录时态已过期，请重新登录！')
    window.location.reload()
  } else if ( res.code === -9010 ) { // 达达是否商户注册
    const aaa = -1
    cb(aaa)
  } else if (res.code === 8001) { // 支付中
    cb(res)
  } else if (res.code === 2105) {
    ElementUI.Message.warning(res.message)
  } else if (res.code !== 0) {
    ElementUI.Message.error(res.message)
  } else {
    cb(res)
  }
}
