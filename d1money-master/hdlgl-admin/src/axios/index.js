import Vue from 'vue'
import iView from 'iview'
import axios from 'axios'
import querystring from 'querystring'

Vue.use(iView)
axios.defaults.baseURL = '/admin/ys-gzrz/services'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 2500

let post = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, querystring.stringify(params))
            .then(res => {
                if (res.data.code === 'SUCCESS') {
                    resolve(res.data.body)
                } else {
                    reject(res.data.code, res.data.msg)
                    if (res.data.code === '100000') {
                        this.$router.go(0)
                    } else {
                        this.$Notice.error({
                            title: '获取数据失败',
                            desc: '错误码:' + res.data.code + ', 错误信息: ' + res.data.msg
                        })
                    }
                }
            })
            .catch((err) => {
                reject(err, '数据请求失败, 可能由于您的网络未连接或太长时间停留在页面, 检查网络, 并重新登陆企业应用进入服务商后台')
            })
    })
}

export default {
    post
}
