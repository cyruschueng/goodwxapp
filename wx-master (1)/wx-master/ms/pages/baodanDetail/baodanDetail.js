// pages/baodanDetail/baodanDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var start = (wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].PolicyStartDate).split(" ")[0];
    console.log(start.split(" ")[0])
    var end = (wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].PolicyEndDate).split(" ")[0];
      console.log(end.split(" ")[0])
    that.setData({
      list:[
        {
         
          title:"中国人保财产险",
          dec: ""
        },
        {
         
          title: wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].SafeId,
          dec: ""
        },
        {
         
          title: "由人保产险承保",
          dec: ""
        },
        {
          
          title: "被保险人",
          dec: wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].RealName
        },
        {
          
          title: "保障额度",
          dec: wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].SafeMoney
        },
        {
         
          title: "可赔次数",
          dec: "无限次"
        },
        {
          title: "保险费",
          dec: wx.getStorageSync("baodanList")[wx.getStorageSync("baodanOrder")].Money
        },

        {
          title: "保障期限",
          dec:  start+"-"+end
        },  
      ]
    })
  },

ontip:function(){
  wx.navigateTo({
    url: '../xieyi/xieyi'
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