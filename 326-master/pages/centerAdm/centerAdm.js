
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listOne: [
      {
        pic: 'yezhutitle.png',
        type: 'about',
        label: '关于'
      }
    ],
    listNavData: {
      width: 'width33',
      outPutT: '',
      listNav: [
        {
          pic: '/images/plant_sums.png',
          label: '电站总数',
          val: '0',
          valUnit: ''
        }, {
          pic: '/images/device_suns.png',
          label: '设备总数',
          val: '0',
          valUnit: ''
        }, {
          pic: '/images/duanxin_sum.png',
          label: '短信额度',
          val: '0',
          valUnit: ''
        }
      ]
    },
    uid:'',
    usr:'',
    isCheck: '未绑定',
    wxCheck: false,
    wxNoCheckbind:false,
    wxCheckbind: false,
    wxNoChenckbind: false,
  },
  CenterModi: function () {  // 修改头像
    var that = this;
    wx.navigateTo({
      url: '/pages/CenterModi/CenterModi?usId=' + that.data.uid,
    })
  },
  logOut: function () {// 退出
    var stationArr = wx.getStorageSync('stationArr')
    if (stationArr && (stationArr.length != 0)) {// 是否是子页面
      stationArr = stationArr.splice(0, stationArr.length - 1) // 子页面
      wx.setStorageSync('stationArr', stationArr)
      wx.redirectTo({
        url: '/pages/user/user',
      })
    } else {
      wx.clearStorageSync()
      wx.redirectTo({
        url: '/pages/index/index?fromLoginOut=true',
      })
    }
  },
  replaceSkinpage:function(){
    wx.navigateTo({
      url: '/pages/replaceSkin/replaceSkin',
    })
  },
  listOnetap: function (e) { //单条页面跳转
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 'about') {
      wx.navigateTo({
        url: '/pages/about/about',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  listOnetap: function (e) { //单条页面跳转
    var that = this
    var type = e.currentTarget.dataset.type
    if (type == 'safe') {
      wx.navigateTo({
        url: '/pages/modiPassword/modiPassword?AccountInfo=' + JSON.stringify(that.data.AccountInfo),
      })
    } else if (type == 'about') {
      wx.navigateTo({
        url: '/pages/about/about',
      })
    } else if (type == 'rank') {
      wx.showToast({
        title: '请先绑定微信',
        icon: 'loading',
        duration: 1500
      })
    }
  },

  onWechart: function () {//绑定微信号:获取用户信息和手机号才允许绑定，否则不允许；
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    util.queryCode(function (opsCode) {
      if (opsCode.code) {
        var wxCharCode = util.wxCharCode()
        var url = '&action=wxAccountBindLogin&code=' + opsCode.code + '&appid=' + wxCharCode.appid + "&secret=" + wxCharCode.secret;
        util.http_oper(encodeURI(url), function (err, dat, desc) {
          if (err == 0) {
            that.setData({
              isCheck: '已绑定',
              wxCheck: false,
              wxCheckbind: true,
              wxNoCheckbind: false,
              isStorUsrInfo: true,
            })
            wx.showToast({
              title: '绑定成功',
              icon: 'success',
              duration: 1500
            })
          } else if (err == 272) {
            wx.showToast({
              title: '该微信已绑其它账号',
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '绑定失败',
              icon: 'loading',
              duration: 1500
            })
          }
        }, function () { }, function () {
          wx.hideLoading()
        })
      }
    })
  },
  offWechart: function () {// 解绑微信号
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var url = '&action=qwAccountCancelBind&type=wx'
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          isCheck: '未绑定',
          wxCheck: true,
          wxCheckbind: false,
          wxNoCheckbind: true
        })
        wx.showToast({
          title: '解绑成功',
          icon: 'success',
          duration: 1500
        })
      } else {
        wx.showToast({
          title: '解绑失败',
          icon: 'loading',
          duration: 1500
        })
      }
    }, function () { }, function () {
      wx.hideLoading()
    })
  },

  getPhoneNumber: function (e) {// 未绑定时候：获取手机号、并绑定(用户拒绝获取手机号或用户信息，则绑定失败)
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
      wx.showToast({
        title: '绑定失败',
        icon: 'loading',
        duration: 1500
      })
    } else {
      var that = this
      util.queryDecrypt(e.detail, function (err, dat) {
        if (err == 0) {
          wx.getUserInfo({
            success: function (res) {
              res.userInfo.mobile = JSON.parse(dat.data).phoneNumber //存上一步获得的手机号
              that.setData({
                wx_userInfo: res.userInfo,
              })
              // 绑定前向数据库添加用户信息
              var globalData0 = util.wxCharCode()
              // util.queryOpenid(function (resOpenid) {
              util.queryCode(function (resOpenid) {
                var urlUsrInfo = '&action=bindWxUsrInfo&code=' + resOpenid.code + '&nickName=' + that.data.wx_userInfo.nickName + "&avatar=" + that.data.wx_userInfo.avatarUrl + '&mobile=' + that.data.wx_userInfo.mobile + '&gender=' + that.data.wx_userInfo.gender + '&city=' + that.data.wx_userInfo.city + '&province=' + that.data.wx_userInfo.province + '&country=' + that.data.wx_userInfo.country + '&lang=' + that.data.wx_userInfo.language + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret;;
                console.log(urlUsrInfo)
                util.http_oper(encodeURI(urlUsrInfo), function (err, dat, desc) {
                  if (err == 0) {
                    that.onWechart()
                  } else {
                    wx.showToast({
                      title: '绑定用户信息失败',
                      icon: 'loading',
                      duration: 1500
                    })
                  }
                })
              })
            },
            fail: function () {
              wx.showToast({
                title: '绑定失败',
                icon: 'loading',
                duration: 1500
              })
            }
          })
        }
      }, function () {

      }, function () { }, 'appidLogin')
    }
  },

  queryWXbind: function () { // 查询微信号绑定情况
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: false,
    })
    var appCode = util.wxCharCode()
    util.queryCode(function (resCode) {
      var url = '&action=queryWxBindAccount&code=' + resCode.code + "&appid=" + appCode.appid + "&secret=" + appCode.secret
      util.http_oper(encodeURI(url), function (err, dat, desc) {
        if (err == 0) {
          if (dat.isUsrBindedWx == true) {
            that.setData({
              wxCheckbind: true,
              wxNoCheckbind:false,
              isCheck: '已绑定',
              isStorUsrInfo: true,
            })
          } else {
            that.setData({
              wxCheck: true,
              wxNoCheckbind:true,
              isCheck: '未绑定',
            })
          }
        } else {
          util.errBoxFunc(that, err, desc)
        }
      }, function () {
        util.netWork(that)
      }, function () {
        wx.hideLoading()
      })
    })
  },
  onLoad: function (options) {
  var that = this;
  wx.showShareMenu({
    withShareTicket: true //要求小程序返回分享目标信息
  })
  var listNavData = that.data.listNavData
  listNavData.listNav[0].val = options.PlantCount?options.PlantCount:'0'
  listNavData.listNav[1].val = JSON.parse(options.WarningDeviceCountView).total ? JSON.parse(options.WarningDeviceCountView).total:'0'
  listNavData.listNav[2].val = '--'
  that.setData({
    listNavData: listNavData,
    uid: options.uid,
    usr: options.usr
  })
  that.queryWXbind()
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function (res) { //分享时已存储用户的信息和手机号
    var that = this;
    var wx_userInfo = that.data.wx_userInfo
    var id = {}
    return {
      title: '恒通源光伏监控',
      imageUrl: '/images/plant_img1.png',
      path: '/pages/shareEneryToday/shareEneryToday?id=' + id,
      success(e) {
        wx.showShareMenu({
          withShareTicket: true
        });
        wx.getShareInfo({
          shareTicket: e.shareTickets[0],
          success:function(groupRes) {//解密获得群ID
            util.queryDecrypt(groupRes, function (err, dat, desc) {
              var openGIdPre = dat.data.split(',')[0].split(':')[1]
              var openGId = openGIdPre.substring(1, openGIdPre.length - 1);
              // util.queryOpenid(function (resOpenid) {
              var globalData0 = util.wxCharCode()
              util.queryCode(function (resOpenid) {
                var urlenery = "&action=queryUsrEnergyPerDayMonthFromWxGroup&wxgroup=" + openGId + "&appid=" + globalData0.appid + "&secret=" + globalData0.secret + "&code=" + resOpenid.code;
                util.http_oper(encodeURI(urlenery), function (err, dat, desc) {
                  console.log("主场号参与排名：")
                  console.log(err)
                  console.log(dat)
                  console.log(desc)
                  if (err == 0) {
                    util.toast(that, "排名成功")
                  } else {
                    util.toast(that, "err:"+err+","+desc)
                  }
                }, function () {
                  util.toast(that, "排名网络响应失败")
                }, function () {
                }, 'appidLogin')
              })
            }, function () { }, function () { }, 'appidLogin')
          },fail:function(){
            util.toast(that, "解码手机号失败，稍后再试")
          }
        })
      }
    }
  }
})