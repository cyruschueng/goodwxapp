//app.js
var http = require('utils/util.js')
import Api from 'utils/config/api.js';
import { GLOBAL_API_DOMAIN } from '/utils/config/config.js';

App({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    openId: '',
    Info: {},
    lat: '',
    lng: '',
    sessionKey: ''
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  globalData: {  //全局变量
    userInfo: {
      openId: '',
      sessionKey:'',
      password: '',
      userType:'',
      userId: '',  
      shopId: '',
      userName: '',
      nikcName: '',
      phone:'',
      mobile:'',
      iconUrl: 'https://xq-1256079679.file.myqcloud.com/test_wxf91e2a026658e78e.o6zAJs-7D9920jC4XTKdzt72lobs.1hRpd2kGdEiOa3b258766fa20678a0bf8984308a16f9_0.3.jpg',
      sourceType: '1',
      city: '',
      loginTimes:'',
      sex: '', //gender	用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
      lat: '',
      lng: '',
      actInfoImg: ''   //活动详情图片
    },
    article: []
  }
})