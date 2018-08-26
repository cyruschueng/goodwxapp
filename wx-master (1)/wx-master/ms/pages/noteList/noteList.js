// pages/noteList/noteList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteList:[],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this;
    var str = {
      'OperationType': '10043',
    }
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        if(res.data.CODE=="00"){
          wx.setStorageSync("noteList", res.data.data)
          console.log(res.data.data)
          var annc = [];
          for(var i = 0;i<res.data.data.length;i++){
            annc.push(res.data.data[i].ANNC.substring(0, 10))
          }
          console.log(annc)
          that.setData({
            noteList: res.data.data,
            list:annc
          })
          console.log(that.data.noteList)
        }
        
      }
    })
  },
ontip:function(e){
  var index = e.currentTarget.dataset.index;
  wx.setStorageSync("noteIndex", index);
  wx.navigateTo({
    url: '../noteListDetail/noteListDetail'
  })
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
  
  }
})