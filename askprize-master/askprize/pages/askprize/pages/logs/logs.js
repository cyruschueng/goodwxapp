//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    var now = Date.now();
    var last = [1520837487,1520836865,1520832082999, 1520832081797, 1520832080790, 1520832032588, 1520831997657, 1520831968002, 1520831945031];
    for (var i=0;i<last.length;i++) {
      var timer = util.downTimer(last[i]);
      var ntime = Math.floor((now - last[i])/1000);
      console.log('-------' + last[i], timer);

      console.log(timer.day+'天'+timer.hour+'小时'+timer.minute+'分钟'+timer.second+'秒');
    }
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
