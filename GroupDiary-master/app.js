//app.js
const AV = require('./utils/av-weapp-min.js');

AV.init({
  appId: 'FntyMB6DcVYYIm1t5O4BoYH6-gzGzoHsz',
  appKey: 'cyMP20g04lPEu3n2u6p4KDlG',
});

App({
  onLaunch: function (ops) {
    //当情景值为 1044，即通过带 shareTicket 的微信群分享卡片进入小程序
    if (ops.scene == 1044) {
      this.globalData.shareTicket = ops.shareTicket
    }
  },

  globalData: {
    shareTicket: "",
    updateUserSuccess: false,
    refreshRecordList: false
  }
})
