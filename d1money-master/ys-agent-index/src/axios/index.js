import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import querystring from 'querystring'
Vue.use(Vuex)

const instance = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 30000

let post = ({url, data = {}, tips = false, isloadding = false}) => {
    return new Promise((resolve, reject) => {
        if (isloadding) {
            Vue.$vux.loading.show({
                text: ''
            })
        }
        axios.post(url, querystring.stringify(data))
            .then(res => {
                isloadding && Vue.$vux.loading.hide()
                if (res.data.code === 'SUCCESS') {
                    resolve(res.data.body)
                } else {
                    if (parseInt(res.data.code) === 100000) {
                        this.$router.go(0)
                    } else {
                        if (tips) {
                            Vue.$vux.toast.show({
                                type: 'cancel',
                                text: '错误码:' + res.data.code + ', 错误信息: ' + res.data.msg
                            })
                        }
                    }
                    reject(res.data.code, res.data.msg)
                }
            })
            .catch(err => {
                Vue.$vux.toast.show({
                    type: 'cancel',
                    text: '请求超时'
                })
                isloadding && Vue.$vux.loading.hide()
                reject(err, '请求超时')
            })
    })
}
/***
 * 上传图片专用函数
 */
let upload = ({url, data = {}, tips = false, isloadding = false}) => {
    return new Promise((resolve, reject) => {
        if (isloadding) {
            Vue.$vux.loading.show({
                text: ''
            })
        }
        instance.post(url, data)
            .then(res => {
                isloadding && Vue.$vux.loading.hide()
                if (res.data.code === 'SUCCESS') {
                    resolve(res.data.body)
                } else {
                    if (parseInt(res.data.code) === 100000) {
                        this.$router.go(0)
                    } else {
                        if (tips) {
                            Vue.$vux.toast.show({
                                type: 'cancel',
                                text: '错误码:' + res.data.code + ', 错误信息: ' + res.data.msg
                            })
                        }
                    }
                    reject(res.data.code, res.data.msg)
                }
            })
            .catch(err => {
                Vue.$vux.toast.show({
                    type: 'cancel',
                    text: '请求超时'
                })
                isloadding && Vue.$vux.loading.hide()
                reject(err, '请求超时')
            })
    })
}

export default {
    post,
    upload
}
