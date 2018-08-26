/* http请求 在这里要指定请求的    方式  和    url地址  和请求的 所有参数
*/
import axios from 'axios'
// import { local } from './localStorage'
import $axios from './axios'  // 项目中数据
import * as allurl from './apiUrl' // 接口地址
import state from './../index' // 项目中所有数据

export default {
  tologin(sub,cb) {
    $axios.get(sub, allurl.TO_LOGIN.type, allurl.TO_LOGIN.url, cb)
  },
  async test2(sub) {
    const res = await $axios.get(sub, allurl.TEST2.type, allurl.TEST2.url)
    return res
  }
}
