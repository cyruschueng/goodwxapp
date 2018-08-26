// pages/sendkami/sendkami.js
var app = getApp()
var sendKami = function (that) {
  console.log("分发记录")
  //请求订单列表，这里没有用缓存，因为懒。
  var str = {
    "OperationType": "10050",
    "uid": wx.getStorageSync('uid'),
    "page": that.data.page
  }
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10050)
      console.log(res)
      if (res.data.CODE == "00") {
        //请求成功，判断第一页是否有数据
        if (that.data.page == 1) {
          if (res.data.data.length) {
            that.setData({
              arr: res.data.data,
              show: false
            })
            console.log(res.data.data)
            console.log(that.data.show)
            //缓存订单数据
            wx.setStorageSync("arr", res.data.data);//时间排序订单详情
           
          } else {
            that.setData({
              show: true
            })
          }
          //页数大于=2时处理
        } else if (that.data.page >= 2) {
          if (res.data.data.length) {
            var arr = that.data.arr
            console.log(arr)
            for (var i = 0; i < res.data.data.length; i++) {
              arr.push(res.data.data[i])
            }
            wx.setStorageSync("arr", arr);//订单详情
            that.setData({
              arr: arr
            })
          } else {
            //这里使在下一页没有数据时，page不变
            that.data.page--;
            wx.showToast({
              title: '没有数据了',
              duration: 1000,
              image: "../../images/icon/s.png",
              mask: true,
            })
          }
        }
        console.log("page")
        console.log(that.data.page)
      }
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    show:"",
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    sendKami(that)
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
    this.setData({
      page:1
    })
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.data.page++;
    sendKami(that);
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止上拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})