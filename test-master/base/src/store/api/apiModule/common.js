import $axios from './../axios'
import state from './../../index'
import utils from '@/utils/utils'

// 公共模块
export default {
  // 上传文件
  updateFile(sub, cb, baseData) {
    sub = utils.mergeBaseData(sub, state.state.globalData, baseData)
    $axios.request(sub, 'url', 'post', cb)
  }
}
