var app = getApp();
var common = require('../../../utils/common.js');
Page({
  data: {
    version: ''
  },
  onLoad: function() {
    this.getVersion();
  },

  // 获取版本
  getVersion: function() {
    this.setData({
      version: app.version
    });
  },
  join:function(){
    common.showModal('联系人：沈新宇 \n联系QQ：228919450 ');
  },
  aboutme:function(){
    common.showModal('作者：软件1431-沈新宇\r\n我们是机电工程系移动互联应用开发兴趣小组，我们崇尚技术的力量，同时也欣赏设计的美！');
  },
  // 设置剪切板
  setClipboardData: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.content,
      success: () => {
        wx.showToast({
          title: '内容已复制',
          icon: 'success',
          duration: 2000
        });
      }
    });
  }
});
