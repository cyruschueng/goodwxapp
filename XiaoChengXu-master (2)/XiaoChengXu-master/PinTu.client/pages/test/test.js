// pages/test/test.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getAccessToken: function (){
    let params = {
      grant_type:"client_credential",
      appid:"wx3d00770652053edd",
      secret:"t9RRtRNYJkL2Dfe6CwiKO27f128AsERs"
    }
    wx.request({
      url: "https://api.weixin.qq.com/cgi-bin/token",
      dataType: "POST",
      data: params,
      success: function (res) {
        console.log(res);
      }, fail(res) {
        console.log(res);
      }
    })
  },
  sendTemplateMsg: function (formId){
    let privateInfo = wx.getStorageSync("pivateInfo");
    let params = {
      "touser": privateInfo.openId,
      "template_id": "PhJQUu5tBKmPCbic-vOhVdq8r_4PtZ6y49-X39hd4FY",
      "page": "pages/index/index",
      "form_id": formId,
      "data": {
        "keyword1": {
          "value": "小组海报拼图",
          "color": "#173177"
        },
        "keyword2": {
          "value": "2018年01月18日 17:30",
          "color": "#173177"
        },
        "keyword3": {
          "value": "小石头",
          "color": "#173177"
        },
        "keyword4": {
          "value": "6.5",
          "color": "#173177"
        }
      }
    }
    let accessToken = "6_dA7dGLzqc8u4ceB6YfHuIaRYYYrbVmOES6nXcbThPLQMcZNsbaRKwuZrgqreIvJSDuSlFXPDv6C07LHjI5SMiGWQX5IdoxZrwMGhj66LBLa4s5j2BHetv3sW9QRtbaQXl57RBhzXDc3V2zSlRBNiABAAKW";
    common.sendTpl(accessToken, params,that,"groupSuccess");
  },
  onTplSuccess: function (res, tplName){
    console.log(tplName + "创建成功：" +res);
      switch(tplName){
        case "groupSuccess":
      
          break;
      }
  },
  onTplFail: function (res, tplName) {
    console.log(tplName+"创建失败："+res);
    switch (tplName) {
      case "groupSuccess":
        common.showErrorTip("groupSuccess模版fail");
        break;
    }
  },
  formSubmit:function(e){
    console.log(e);
    const formId = e.detail.formId;
    that.sendTemplateMsg(formId);
  }
})