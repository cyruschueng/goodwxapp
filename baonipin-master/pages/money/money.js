// pages/money/money.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:true, //默认为输入框
    money:8.88
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  //全部提现
  allMoney(){
    this.setData({
      money: this.data.data,
      all: this.data.all
    })
    console.log(this.data.data);
  },
  bindPickerChange: function (e) {
    console.log('money', e.detail.value)
    this.setData({
      money: e.detail.value
    })
  },
  // 提现
  pay(e){
    let that = this;
    console.log("formId:", e.detail.formId);
    // 提现
    wx.request({
      url: apiurl + "red/apply-cash?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        money: that.data.money,
        form_id: e.detail.formId
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("提现:", res);
        var status = res.data.status;
        if (status == 1){
          tips.success("提现成功！");
        }else{
          tips.alert(res.data.msg);
        }
        
      }
    })
   
  },
  // 常见问题
  question() {
    wx.navigateTo({
      url: '../question/question'
    })
  }
})