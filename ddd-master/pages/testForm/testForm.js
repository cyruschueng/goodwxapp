// pages/testForm/testForm.js

var app = getApp();


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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail)
    app.fetchData({
      func:'notice.send_rctx',
      form_id: e.detail.formId,
      keyword1:"fffmA",
      keyword2:'fffffmA',
      keyword3:'ffffffmA'
    }).then((e)=>{
      console.log("formSubmit-A----------->",e);
    })

    let nextformId = parseInt(e.detail.formId) + 1;
    app.fetchData({
      func: 'notice.send_rctx',
      form_id: nextformId + '',
      keyword1: "ffffmb",
      keyword2: 'fffffmb',
      keyword3: 'ffffffmb'
    }).then(e => {
      console.log("formSubmit-B----------->", e);
    })
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})