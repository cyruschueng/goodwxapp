const app = getApp();
const util = require('../utils/util.js');
Page({
  data: {
    userInfo: {},
    data:{"total":0,"num":0,"list":[]},
    ajaxurl:app.globalData.apiurl,
    page:1,
    loadtext:"加载更多···",
    isloadall:false,
    type:"sent"
  },
  onLoad: function () {
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f5f5f5'
    });
    wx.setNavigationBarTitle({
      title: '我的记录'
    });

    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        }
      })
    };


    //加载红包列表数据
    this.getajax();
  },
  onReachBottom:function(res){ // 设置底部加载
    if(this.data.isloadall){return false;};
    this.setData({
      page: this.data.page+1
    })
    this.getajax();
  },
  changeway:function(e){// 更改红包加载方式
    this.setData({
      type:e.currentTarget.dataset.way,
      page:1,
      data:{"total":0,"num":0,"list":[]}
    });
    this.getajax();
  },
  getajax:function(){// 获取红包列表信息
    if(this.data.isloadall){return false;};
    var self = this,
      ajaxurl = self.data.type == "sent" ? 'red_packs?v=' :'prizes?v=';
    wx.request({
      url: self.data.ajaxurl+ajaxurl+(new Date().getTime()), //仅为示例，并非真实的接口地址
      header: {
          "Authorization":"PlainUserToken teststr",
          "x-total-count": "1",
          "x-per-page": "50",
          "x-page": self.data.page
      },
      success: function(res) {
        if(res.statusCode==200){
          var list = res.data||[],
            data = res.data.data;
            list.map(ls=>{
              ls.timestr = util.formatTime(new Date(ls.updated_at),1);
              return ls;
            })
          self.setData({
            data:{"num":0,"total":0,"list":self.data.data.list.concat(list)}
          });
          if(list.length<10){
            self.setData({isloadall:true,loadtext:"已加载全部"});
          }
        }else{
          wx.showModal({
            title: '提示',
            content: res.errMsg,
            showCancel:false
          })
        };
      }
    })
  }
})
