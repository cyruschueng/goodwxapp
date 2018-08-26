import Vue from 'vue'
import Axios from 'axios'
import { Message } from 'element-ui'

var instance = Axios.create()
instance.defaults.transformRequest = [
  function (data) {
    return data
  }
]
var interceptor = {
  success (res) {
    return true
  },
  error (err) {
    Message.error({
      message: '服务错误，请稍后重试'
    })
    console.log(err)
  }
}
instance.interceptors.response.use(interceptor.success, interceptor.error)

export default {
  file: null,
  mySign: null,
  remotePath: '',
  callback: {},
  init (panoId, position, file, callback) {
    this.file = file
    this.callback = callback
    this.remotePath = `vizen/${panoId}/${position}.JPG` // 上传的名称必须是大写
    this.getSign(file, callback)
  },
  getSign (file, callback) {
    Vue.prototype.$api.getSignAli({
      params: {
        remotePath: this.remotePath
      }
    }).then(res => {
      this.mySign = res.data
      this.upload(res.data, file, callback)
    })
  },
  upload (mySign, file, callback) {
    var data = new FormData()
    data.append('key', mySign.dir)
    data.append('policy', mySign.policy)
    data.append('Signature', mySign.signature)
    data.append('OSSAccessKeyId', mySign.accessid)
    data.append('file', file)
    data.append('success_action_status', 200)
    instance.post(mySign.host, data).then(res => {
      console.log(mySign.dir)
      callback(`${mySign.host}/${mySign.dir}`)
    })
  }
}
