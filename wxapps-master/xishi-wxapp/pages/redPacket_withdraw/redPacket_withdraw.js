var utils = require("../../utils/util.js");
import { withdraw_money, get_userBalance, get_serviceMsg } from "../../url.js";
var sessionKey = '';
Page({
  data: {
    balance:0,
    withdrawmoney:0,
    canWithdraw:false,
    initValue:'',
    serviceMsg: ''
  },

  onLoad: function (options) {
    sessionKey = wx.getStorageSync("sessionKey");
    if (!sessionKey) {
      utils.getSessionKey(utils.getSetting);
      return;
    }
    this.getBalance();
    this.setData({
      serviceMsg: wx.getStorageSync("serviceMsg")
    });
  },

  concatFun: function () {
    utils.requestLoading(get_serviceMsg + "?sessionKey=" + sessionKey, "post", JSON.stringify({ Type: "image" }), '数据加载中...',
      function (res) {
        if (res.Status == 5) {
          wx.removeStorageSync("sessionKey");
          utils.getSessionKey(utils.getSetting);
          return;
        }
        console.log(res);
      }, function (res) {
        console.log(res);
      })
  },

  getBalance:function(){
    let that = this;
    utils.requestLoading(get_userBalance+"?sessionKey="+sessionKey,"post","","数据加载中",function(res){
      if(res.Status == 5){
        wx.removeStorageSync("sessionKey");
        utils.getSessionKey(utils.getSetting);
        return;
      }
      that.setData({
        balance:res.money
      })
    },function(res){
      console.log(res);
    });
  },

  bindInput:function(e){
    let that = this;
    if (e.detail.value > 0 && e.detail.value <= that.data.balance){
      that.setData({
        canWithdraw: true
      })
    } else if (e.detail.value > that.data.balance){
      wx.showToast({
        title: '提现金额不得超过余额',
        icon:'none'
      })
    }else{
      that.setData({
        canWithdraw: false
      })
    }
    that.setData({
      withdrawmoney: e.detail.value
    })
  },

  withdrawAll:function(){
    this.setData({
      initValue: this.data.balance,
      withdrawmoney: this.data.balance
    })
  },

  withdrawFun:function(){
    let that = this;
    let isSubmit = true;
    if (isSubmit) {
      isSubmit = false;
      utils.requestLoading(withdraw_money + "?sessionKey=" + sessionKey, "post",
        JSON.stringify({ money: that.data.withdrawmoney }), "数据加载中...",
        function (res) {
          isSubmit = true;
          if (res.Status == 1) {
            wx.showToast({
              title: '提现成功',
              icon: 'success'
            });
            that.setData({
              initValue: '',
              withdrawmoney: 0
            })
            that.getBalance();
          } else if (res.Status == 5) {
            wx.removeStorageSync("sessionKey");
            utils.getSessionKey(utils.getSetting);
          } else {
            wx.showToast({
              title: res.Message,
              icon: 'none'
            })
          }
        }
      )
    }else{
      wx.showToast({
        title: '请求发送中...',
        icon:'none'
      })
    }
  }

  
})