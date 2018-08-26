const app = getApp();
import tips from '../../utils/tips.js';
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    num: Math.random(),
    win1:false
  },
  onShow: function () {
    let that = this;
    wx.request({
      url: app.data.apiurl3 + "photo/activity-info?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("活动信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            win1: res.data.data.win
          })
          wx.hideLoading()
        } else {
          //tips.alert(res.data.msg);
        }
      }
    })
  },
  chart(){
    if (this.data.win1==false){
      tips.alert('集齐星座才可领取')
    }else{
      wx.navigateToMiniProgram({
          appId: 'wx22c7c27ae08bb935',
          path: 'pages/photoWall/photoWall?poster=http://ovhvevt35.bkt.clouddn.com/photo/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180105171204.png&photowall=1',
          envVersion: 'release',
          success(res) {
            // 打开成功
            console.log(res);
          }
        })
    }
  },
 // 参与活动
  activeIn(e) {
    wx.setStorageSync('cate_id', 13);
    wx.setStorageSync('nowImage', 1);
    wx.setStorageSync('nowTitle', '节日活动')
    wx.switchTab({
      url: '../templatePhoto/templatePhoto'
    })
  }

})