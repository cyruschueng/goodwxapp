import * as passenger_api from './js/passenger_api'
import * as driver_api from './js/driver_api'
import * as util from './js/utils'
import { checkEntities, track, initSystemInfo, getCurrentUser } from './js/utils'
import * as constants from './js/constants'


var appConfig = {
    onLaunch: function () {
      this.getWechatInfo().then(res => {
        // this.initCallBack()
      })
    },
    initCallBack () {
    },
    getWechatInfo () {
      let that = this

      return new Promise((resolve, reject) => {
        wx.login({
          success (loginres) {
            wx.getUserInfo({
              withCredentials: true,
              success (res) {
                let userInfo = res.userInfo
                that.globalData.wechatInfo = userInfo
                that.globalData.appLaunch = true
                // that.globalData.wechatConfig = res
                util.setStorage({
                  key : 'wechatInfo',
                  data : userInfo
                })
                userInfo.code = loginres.code
                return that.weChatSignin(userInfo).then(resolve, reject)
              },
              fail () {
                wx.showModal({
                  title: '提示',
                  content: '您拒绝了登录系统，如想正常使用所有功能，请重新授权！',
                  cancelText: '残忍拒绝',
                  confirmText: '重新授权',
                  success: function(res) {
                    if (res.confirm) {
                      if (wx.openSetting) {
                        wx.openSetting({
                          success: (res) => {
                            if (res.authSetting['scope.userInfo']) {
                              that.getWechatInfo()
                            }
                          }
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                        })
                      }
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
                  reject()
                }
              })
            resolve('toLogin')
          },
          fail (err) {
            console.log('wx.login  error ', err)
            reject()
          }
        })
      })
    },
    globalData: {
      appLaunch      : false,
      callback       : null,
      unloadCallback : null,
      hasLogin       : false,
      wechatInfo     : null,
      userInfo       : null,
      wechatConfig   : {},
      entities       : {
        deviceInfo : wx.getSystemInfoSync(),
        loginInfo: {}
      }
    },
    weChatSignin (options, cb) {
      const that = this
      const { code } = options
      let parmas = Object.assign({}, {code: code}, {type: 'No_1'})
      return new Promise((resolve, reject) => {
          driver_api.postWechatLogin({
            data: parmas
          }).then(login_json => {
            util.saveUserInfo(login_json)
            let openId = login_json.data.result.Openid
            this.postFindLogin(openId)
          })
      })
    },
    postFindLogin(openId){
      driver_api.postFindLogin({
        data: {
          openId: openId
        }
      }).then(json => {
        let { status } = json.data
        if(status != -1){
          json.data.openId = openId
          this.globalData.entities.loginInfo = json.data

          util.setStorage({
            key : 'first_userInfo',
            data : json.data
          })
        }else{
          this.globalData.entities.loginInfo = {
            openId: openId
          }
        }
      })
    }
}

App(appConfig)

export var app = getApp()
