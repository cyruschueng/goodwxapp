import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');


Page({
  data: {
  
  },
  onShow() {
    APP.login(this.gainAll, this);
  },
  onShareAppMessage: function () {
    return {
      title: '问技陪练，正规公司运营，职业王者服务',
      path: '/pages/peilian/playIndex/playIndex',
    }
  
  },
  gainAll() {
    this.gainData();
  },
  gainData(){
    wx.request({
      url: APP_BASE + `help/support/getOne`,
      data: {
        sid: APP.globalData.sid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          this.setData({
            wechatId: data.data.wechatId
          })
        }
      }
    })
  }
})