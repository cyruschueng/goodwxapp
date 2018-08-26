import { GLOBAL_API_DOMAIN } from '/../../utils/config/config.js';
import Api from '../../utils/config/api.js'
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    nickName: '',
    iconUrl: app.globalData.userInfo.iconUrl,
    isname: false,
    newname: '',
    qrCode: '',
    ismobile:true
  },
  onLoad:function(){
    this.setData({
      nickName:app.globalData.userInfo.nickName
    })
    if (app.globalData.userInfo.mobile){
      this.setData({
        ismobile:false
      })
    }
    this.getuserInfo()
  },
  onShow: function () {
    let that = this;
    wx.request({
      url: that.data._build_url + 'topic/myList',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId,
        page: '1',
        rows: 1,
      },
      success: function (res) {
        var data = res.data;
        that.setData({
          sumTotal: res.data.data.total
        })
      }
    })
    wx.request({
      url: that.data._build_url + 'fvs/list?userId=' + app.globalData.userInfo.userId + '&page=' + that.data.page + '&rows=10',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId,
        page: '1',
        rows: 1,
      },
      success: function (res) {
        var data = res.data;
        var aaa = res.data.data.total
        that.setData({
          collectTotal: res.data.data.total
        })
      }
    })
  },
  getPhoneNumber: function (e) { //获取用户授权的电话号码
    let that = this
    let msg = e.detail
    wx.login({
      success: res => {
        if (res.code) {
          let _parms = {
            code: res.code
          }
          Api.getOpenId(_parms).then((res) => {
            if (res.data.code == 0) {
              app.globalData.userInfo.openId = res.data.data.openId,
              app.globalData.userInfo.sessionKey = res.data.data.sessionKey
              let _pars = {
                sessionKey: res.data.data.sessionKey,
                ivData: msg.iv,
                encrypData: msg.encryptedData
              }
              Api.phoneAES(_pars).then((res) => {
                if (res.data.code == 0) {
                  let _data = JSON.parse(res.data.data)
                  app.globalData.userInfo.mobile = _data.phoneNumber
                  console.log("获取用户电话号码成功")
                  let _pars = {
                    id: app.globalData.userInfo.userId,
                    openId: app.globalData.userInfo.openId,
                  }
                  if (_data.phoneNumber) {
                    _parms.mobile = _data.phoneNumber
                  }
                  Api.updateuser(_pars).then((res) => {
                    if (res.data.code == 0) {
                      console.log("保存用户电话号码成功")
                      that.setData({
                        ismobile: false
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  getuserInfo: function () {  //从微信服务器获取用户信息
    let that = this;
    wx.getUserInfo({
      success: res => {
        if (res.userInfo) {
          that.setData({
            iconUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          })
          that.updatauser(res.userInfo)
        }
      },
      complete:res =>{
        this.wxgetsetting()
      }
    })
  },
  wxgetsetting: function () {  //若用户之前没用授权其用户信息，则调整此函数请求用户授权
    let that = this
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {// 用户未授受获取其用户信息
          wx.showModal({
            title: '提示',
            content: '享7要你的用户信息，快去授权！',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({  //打开授权设置界面
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      wx.getUserInfo({
                        success: res => {
                          if (res.userInfo) {
                            that.setData({
                              iconUrl: res.userInfo.avatarUrl,
                              nickName: res.userInfo.nickName,
                            })
                            that.updatauser(res.userInfo)
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      }
    })
  },
  updatauser: function (data) { //更新用户信息
    let that = this
    let _parms = {
      id: app.globalData.userInfo.userId,
      openId: app.globalData.userInfo.openId,
    }
    if (data.avatarUrl) {
      _parms.iconUrl = data.avatarUrl
    }
    if (data.nickName) {
      _parms.nickName = data.nickName
    }
    if (data.gender) {
      _parms.sex = data.gender
    }
    Api.updateuser(_parms).then((res) => {
      if (res.data.code == 0) {
        app.globalData.userInfo.nickName = data.nickName
        app.globalData.userInfo.iconUrl = data.avatarUrl
      }
    })
  },
  calling: function () { //享7客户电话
    wx.makePhoneCall({
      phoneNumber: '02759728176',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  enterEntrance: function (event) { //点击免费入驻
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) { // 用户未授受获取其用户信息或位置信息
          wx.showModal({
            title: '提示',
            content: '商家入驻必须授权用户信息',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({  //打开授权设置界面
                  success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                      this.getuserInf()
                    }
                  }
                })
              }
            }
          })
        } else{
          wx.navigateTo({
            url: 'free-of-charge/free-of-charge',
          })
        }
      }
    })
  },
  getuserInf:function(){
    let that = this
    wx.getUserInfo({
      success: function (res) {
        wx.navigateTo({
          url: 'free-of-charge/free-of-charge',
        })
        app.globalData.userInfo.iconUrl = res.userInfo.avatarUrl
        app.globalData.userInfo.nickName = res.userInfo.nickName
        let _parms = {
          userId: app.globalData.userInfo.userId,
          openId: app.globalData.userInfo.openId,
          iconUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          sex: res.userInfo.gender
        }
        Api.updateuser(_parms).then((res) => {
          if (res.data.code == 0) {
            app.globalData.userInfo.nickName = data.nickName
            app.globalData.userInfo.iconUrl = data.avatarUrl
          }
        })
      }
    })
  },
  DynamicState: function (e) {
    wx.navigateTo({
      url: 'allDynamicState/allDynamicState',
    })
  },
  myTickets: function (event) {
    wx.navigateTo({
      url: 'my-discount/my-discount',
    })
  },
  carefulness: function (event) {
    wx.navigateTo({
      url: 'personnel-order/personnel-order',
    })
  },
  enshrineClick: function (event) {
    wx.navigateTo({
      url: 'enshrine/enshrine',
    })
  },
  scanAqrCode: function (e) {
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: "qrCode",
      success: (res) => {
        let qrCodeArr = res.result.split('/');
        let qrCode = qrCodeArr[qrCodeArr.length - 1];
        that.setData({
          qrCode: qrCode
        });
        that.getCodeState();
      },
      fail: (res) => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      } 
    });
  },
  //判断二维码是否可以跳转
  getCodeState: function () {
    let that = this;
    wx.request({
      url: this.data._build_url+'cp/getByCode/' + that.data.qrCode,
      success: function (res) {
        var data = res.data;
        let current = res.currentTime;
        if (data.code == 0) {
          let isDue = that.isDueFunc(current, data.expiryDate);
          if (data.data.isUsed == 1) {
            wx.showToast({
              title: '您的票券已被使用',
              icon: 'none'
            })
            return false;
          } else if (isDue == 1) {
            wx.showToast({
              title: '您的票券已过期',
              icon: 'none'
            })
            return false;
          } else {
            wx.navigateTo({
              url: '../personal-center/call-back/call-back?code=' + that.data.qrCode
            })
            // wx.navigateTo({
            //   url: 'cancel-after-verification/cancel-after-verification?qrCode=' + that.data.qrCode + '&userId=' + app.globalData.userInfo.userId,
            // })
          }
        } else {
          wx.showToast({
            title: '请扫描有效票券',
            icon: 'none'
          },2000)
        }
      }
    })
  },
  isDueFunc: function (current, expiryDate) {     //对比时间是否过期
    let isDue = 0;
    if (new Date(expiryDate + " 23:59:59").getTime() < current) {
      isDue = 1;
    }
    return isDue;
  },
  aboutMe:function(e){   //关于我们
    wx.navigateTo({
      url: 'aboutMe/aboutMe',
    })
  },
  theHostApplication: function (e) {
    wx.showToast({
      icon: 'none',
      title: '该功能即将开放...',
    })
  },
})