var app = getApp();
const apiUrl = require('../../config').config.userlvUrl;
const userInfoUrl = require('../../config').config.userInfoUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lv_data:{},
    speed_arr:{},
    user: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    //console.log(opt);
    var that = this
    //1同步用户数据
    var userInfo = wx.getStorageSync('userInfo');
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
      cachetime: 3000,
      success: function (res) {
        var arr = res.data.data;
        //console.log(arr);
        var speed = arr[opt.lv - 1];
        var speed_arr = new Array();
        for (var i = 0; i < speed.speed; i++) {
          speed_arr[i] = i+1
          //document.write(cars[i] + "<br>");
        }
        //console.log(speed)
        that.setData({
          lv_data: speed,
          //lv: speed.speed,
          speed_arr: speed_arr
        })
      }
    });
    //console.log(that.data);
  },
  //存formId
  obtainFormId: function (e) {
    var xinxi = wx.getStorageSync('userInfo');
    console.log(xinxi);
    var formId = e.detail.formId;
    console.log(xinxi.openid, formId)
    app.setFormId(xinxi.openid, formId)
  },
  //操作历史记录
  goPlay:function(e){
    //console.log(e)
    var lv = e.target.dataset.lv;
    var speed = e.target.dataset.speed;
    //console.log(lv,speed);
    wx.navigateTo({
      url: '/pages/user/digital?lv=' + lv +'&speed='+ speed
    })
    
  }
})