// pages/count/count.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:"",
    nickName:"",
    mer:"",
    phone:"",
    // total:"",
    // succ: "",
    // num: "",
    // page:0,
    // money: "",
    // totalNum: "",
    // totalMoney: "",
    arr1:[
     
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var str = {
      "OperationType": "10034",
      "uid": wx.getStorageSync("uid"),
    }
    //发起请求*
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(10034)
        console.log(res)
        if (res.data.CODE == "00") {
          var arr = [
            {
              src: "../../images/count/1.png",
              dec: "您本月成交的笔数(笔)",
              num: ""
            },
            {
              src: "../../images/count/2.png",
              dec: "您本月累计成交额（元）",
              num: ""
            },
            {
              src: "../../images/count/3.png",
              dec: "已推广用户（人）",
              num: ""
            },
            {
              src: "../../images/count/4.png",
              dec: "认证成功（人）",
              num: ""
            },
            {
              src: "../../images/count/5.png",
              dec: "共成交笔数（笔）",
              num: ""
            },
            {
              src: "../../images/count/6.png",
              dec: "累计成交额（元）",
              num: ""
            }
          ]
          arr[0].num = res.data.mothTotalNumber;
          arr[1].num = res.data.mothTotalMoney;

          arr[2].num = res.data.puCount;
          arr[3].num = res.data.approveCount;

          arr[4].num = res.data.totalNumber;
          arr[5].num = res.data.totalMoney;
          console.log(that.data.arr)
          that.setData({
            arr1: arr,
            imgUrl: wx.getStorageSync("avatarUrl"),
            nickName: wx.getStorageSync("nickName"),
            mer: wx.getStorageSync("mer"),
            phone: wx.getStorageSync("phone"),
          })
        }
      }
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
    var that = this;
    console.log("onShow")
    
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