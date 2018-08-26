import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'
import querystring from 'querystring'

axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000

let post = ({url, data = {}, tips = false}) => {
    return new Promise((resolve, reject) => {
        axios.post(url, querystring.stringify(data))
            .then(res => {
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
                reject(err, '请求超时')
            })
    })
}

export default {
    post
}
