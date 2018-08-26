const app = getApp();
const util = require('../utils/util.js');
Page({
  data: {
    userInfo: {},
    money:'填写金额',
    ajaxurl:app.globalData.apiurl,
    isfocus:false,
    iserror:true,
    fee:0,
    total:45.36
  },
  onLoad: function () {
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f9f9f9'
    });
    wx.setNavigationBarTitle({
      title: '余额提现'
    });

    // // 获取用户信息
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    // }else {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo
    //       })
    //     }
    //   })
    // };

  },
  infocus:function(e){// 更改红包加载方式
    var v = parseInt(e.detail.value.trim())||0;
    this.setData({
      isfocus:true,
      money:v==0?'':v
    });
  },
  outblur:function(e){// 获取红包列表信息
    var v = parseFloat(e.detail.value.trim())||0;
    var self = this;

    if(v==0||v==''){
      this.setData({
        isfocus:false,
        money:'填写金额'
      });
    }else if(v<1){
      this.setData({
        money:'填写金额',
        isfocus:false,
        iserror:false
      });
      setTimeout(function(){
        self.setData({
          iserror:true
        });
      },3000);
    }else{
      v = v>this.data.total?this.data.total:v;
      this.setData({
        money:v
      });
    };
  },
  vchange:function(e){
    var v = parseFloat(e.detail.value.trim())||0;
    v = v>this.data.total?this.data.total:v;
    var self = this;
    if(v>1){ 
      this.setData({
        fee:(Math.floor(v)/100).toFixed(2)
      });
    }
  },
  inall:function(){
    if(this.data.total<1){
      wx.showModal({
        title: '提示',
        content: '余额不足',
        showCancel:false
      });
      return false;
    };

  },
  tixian:function(){
    if(this.data.money<1){
      wx.showModal({
        title: '提示',
        content: '余额不足',
        showCancel:false
      });
    }else{

    };
  }
})
