// pages/complain/complain.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrCheckbox:[
      { name: "欺诈", value:"欺诈"},
      { name: "色情", value: "色情" },
      { name: "政治谣言", value: "政治谣言" },
      { name: "诱导分享", value: "诱导分享" },
      { name: "恶意营销", value: "恶意营销" },
      { name: "隐私信息收集", value: "隐私信息收集" }
    ],
    arrChecked:[],
    tel:''
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
  getTel:function(e){
    let tel = e.detail.value;
    that.setData({tel:tel})
  },
  submitComplain:function(){
    wx.showLoading({
      title: '加载中...',
    })
    let _DATA = {
      "mobile": that.data.tel,
      "content": JSON.stringify(that.data.arrChecked)
    }
    let params = {
      _C: "My",
      _A: "insertComplain",
      _DATA: JSON.stringify(_DATA)
    }
    common.request("submitComplain", that, "form", params);
  },
  changeCheckBox:function(e){
    var arrCheckbox = that.data.arrCheckbox;
    var arrChecked = e.detail.value;
    that.setData({ arrChecked: arrChecked})
    for (let [index, elem] of arrCheckbox.entries()){
      arrCheckbox[index].checked = false;
      for (let [i, ele] of arrChecked.entries()){
        if(ele == elem.value){
          arrCheckbox[index].checked = true;
          break;
        }
      }
    }
    that.setData({ arrCheckbox: arrCheckbox})
  },
  urlTarget: function (event) {
    const url_name = event.currentTarget.dataset.url;
    common.urlTarget(url_name, "", params);
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        switch (methodName) {
          case 'submitComplain':
            common.showSuccessTip("提交成功");
            wx.hideLoading();
            break;
            break;
        }

      } else {
        console.log(ret);
        wx.hideLoading();
      }
    } else {
      console.log("接口有问题：" + methodName);
      wx.hideLoading();
    }
  },
  onFail: function (methodName) {
    console.log("接口调用失败：" + methodName);
  },
  onComplete: function (methodName) {

  }
})