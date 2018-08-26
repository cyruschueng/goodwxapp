import * as passenger_api from './js/passenger_api'
import * as driver_api from './js/driver_api'
import * as util from './js/utils'
import { checkEntities, track, initSystemInfo, getCurrentUser } from './js/utils'
import * as constants from './js/constants'
import * as amapFile from './js/amap-wx'

var myAmapFun = new amapFile.AMapWX({key:'35d96308ca0be8fd6029bd3585064095'})

var appConfig = {
    onLaunch: function (ops) {
      let that = this
      // 获取微信群ID
      if(ops.scene == 1044){
        wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              console.log(res.encryptedData)
              console.log(res.iv)
              // 后台解密，获取 openGId
            }
        })
      }
      this.getWechatInfo()
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
                that.weChatSignin(userInfo)
              },
              fail () {
                wx.showModal({
                  title: '提示',
                  content: '您拒绝了登录系统，如想正常使用所有功能，请重新授权！',
                  cancelText: '拒绝',
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
                      wx.showModal({
                        title: '提示',
                        content: '您拒绝了获取您的微信相关信息，无法继续使用该程序，如想继续使用，请五分钟后重试或者删除本程序之后再次进入',
                        showCancel: false
                      })
                    }
                  }
                })
                  reject()
                }
              })
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
      let parmas = Object.assign({}, {code: code}, {type: 'No_2'})
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
          this.address_gaode()
        }else{
          this.globalData.entities.loginInfo = {
            openId: openId
          }
          this.address_gaode()
        }
      })
    },
    address_gaode(){
      let self = this
      myAmapFun.getRegeo({
        success:function(data){
            let address = data[0].regeocodeData.formatted_address.replace((data[0].regeocodeData.addressComponent.province + data[0].regeocodeData.addressComponent.district),"")
            let startLocation = [data[0].longitude, data[0].latitude]
            let latitude = data[0].latitude
            let longitude = data[0].longitude
            let search_location = [data[0].longitude, data[0].latitude]
            let params = Object.assign({}, {
              address: address,
              startAddress: address,
              startLocation: startLocation,
              latitude: latitude,
              longitude: longitude,
              search_location: search_location
            })
            self.globalData.entities.locationGao = params
        },
        fail:function(e){
          wx.showModal({
            title: '提示',
            content: '您关闭了定位服务，如想正常使用定位功能，请开启定位！',
            cancelText: '拒绝',
            confirmText: '开启定位',
            success: function(res) {
              if (res.confirm) {
                if (wx.openSetting) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting['scope.userLocation']) {
                        self.getWechatInfo()
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
        }
      })
    }
}

App(appConfig)

export var app = getApp()
