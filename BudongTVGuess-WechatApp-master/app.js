//  app.js

const bus = require('./utils/bus.js');

App({
  onLaunch: function (options) {
    
    bus.launchClientId = options.query.fromClientId || 0;
    bus.launchScene = options.scene || 0;

    wx.getSystemInfo({
      success: this.systemInfoSuccess
    });
    wx.getShareInfo({
      shareTicket: options.shareTicket,
      success: this.shareInfoSuccess 
    });
  },
  onLoad: function (options){
    
  },
  systemInfoSuccess: function (res){

    bus.system = res || {};
  },
  shareInfoSuccess: function(res){

    bus.launchShareTicketData = res.encryptedData || "";
    bus.launchShareTicketIV = res.iv || "";
  },
  globalData: { 
    
  }
})