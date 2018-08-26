const app = getApp();
const util = require('../utils/util.js')

Page({
  data: {
    ajaxurl:app.globalData.ajaxurl,
    boxy:'60%',
    shareinfo:{"title":"","path":""},
    from:''
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.shareinfo.title||'自定义转发标题',
      path: this.data.shareinfo.path||'/page/user?id=123',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onLoad: function (opt) {
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff4e3b'
    });
    wx.setNavigationBarTitle({
      title: '口令红包'
    });

    wx.getSystemInfo({  
      success: function(res) {   
        self.setData({
          boxy:(res.windowWidth*1.08)+'px'
        }) 
      }  
    });

    this.getshareinfo();
    this.setData({
      from:opt.type||'o'
    });

  },
  getshareinfo:function(){ //获取分享信息
    var self = this;
    wx.request({
      url: self.data.ajaxurl+'back.json?v='+(new Date().getTime()), //仅为示例，并非真实的接口地址
      success: function(res) {
        if(res.data.code){
         self.setData({
          shareinfo:{"title":"这是我的分享标题","path":"xxxxxx"}
         });
        }else{
          wx.showModal({
            title: '提示',
            content: '提示错误信息字段',
            showCancel:false
          })
        };
      }
    })
  },
  showimg:function(){// 预览图片
    var self = this;
    wx.previewImage({
      current: 'http://7ximo5.com1.z0.glb.clouddn.com/Fg-oMApnS2aK0P1HNkLWxoUhxCx6', // 当前显示图片的http链接
      urls: ["http://7ximo5.com1.z0.glb.clouddn.com/Fg-oMApnS2aK0P1HNkLWxoUhxCx6","http://7ximo5.com1.z0.glb.clouddn.com/FtnfgB55nd0SxdX7T5-l81ApJtU6"] // 需要预览的图片http链接列表
    })
  }
})
18201762176