var app = getApp();
const apiUrl = require('../../config').config.userlvUrl;
const userInfoUrl = require('../../config').config.userInfoUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lv:{},
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this

    //1同步用户数据
    var userInfo = wx.getStorageSync('userInfo');
    //console.log(userInfo);
    /*
    wx.request({
      url: userInfoUrl, //仅为示例，并非真实的接口地址
      data: userInfo,
      method: 'POST',
      success: function (res) {
        //console.log(res)
      }
    })
    */
    that.setData({
      user: userInfo,
    })
    //2获取远程等级数据
    app.util.request({
      url: apiUrl,
      data: {
        openid: userInfo.openid,
        sessionid: userInfo.sessionid,
      },
      method: 'get',
      cachetime:'300',
      success: function (res) {
        var arr = res.data;
        //console.log(arr);
        if (arr.code == 1) {
          that.setData({
            lv: arr.data,
          })
        }
      }
    });
  },
  //存formId
  obtainFormId: function (e) {
    var xinxi = wx.getStorageSync('userInfo');
    console.log(xinxi);
    var formId = e.detail.formId;
    console.log(xinxi.openid, formId)
    app.setFormId(xinxi.openid, formId)
  },
  //进入等级
  goLv:function(e){
    var lv = e.target.dataset.lv;
    //console.log(lv);暂时不开发
    wx.navigateTo({
      url: '/pages/user/speed?lv=' + lv
    })
  },
  //锁定提示
  goClose:function(){
    wx.showToast({
      image: '/style/images/locked.png',
      title: '该等级尚未解锁',
      duration: 2000
    })
  }

})