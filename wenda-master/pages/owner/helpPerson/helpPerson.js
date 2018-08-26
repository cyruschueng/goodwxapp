import {GET,POST,promisify} from '../../../libs/request.js';
import {server, imgServer, wxappServer } from '../../../libs/config.js';

var app = getApp();
Page({
  data: {
      vipIcon:"../../../images/bigv.png",
      noAuth:"../../../images/noAuth.png",
      avatarUrl:'',
      userName:'',
      userId:'',
      accepted:'',
      answers:'',
      shares:'',
      content:'',
      isAuthVip:'',
      cUserId:''
  },
  onLoad: function (options) {
    // var fromPage = options.comeFrom;
    // if (fromPage === 'index') {
    //   hotapp.onEvent('singCardFromPageIndex');
    // }
    this.setData({
      cUserId:options.userId
    })
  },
  getData: function() {
    var that = this;
    var sid = app.globalData.sid;
    wx.request({
      url: wxappServer + "help/user/" + that.data.cUserId+"?sid="+sid,
      method: 'GET',
      "content-type": "application/x-www-form-urlencoded", 
      success: function(data){
       if (data.data.suc == '100') return;
       else if (data.data.suc == '200') {
          let subData = data.data.data;
          that.setData({
            avatarUrl:subData.avatarUrl,
            userName:subData.nickName,
            userId:'ID:'+subData.id,
            accepted:subData.accepts,
            answers:subData.answers,
            shares:subData.shares,
            content:subData.introduce,
            isAuthVip:!!subData.isAuthVip
          })
       }
      }
    })
  },
  onShow: function () {
    app.login(this.getData, this);
    //this.getData();
  }
})
