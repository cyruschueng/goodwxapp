//  ===========推广中心======pages/Promotion center/Promotion center.js
var app = getApp();
var urlData = require('../../utils/util.js');

var subordinateList = function (that) {
  var str = {
    "OperationType": "10016",
    "uid": wx.getStorageSync("uid"),
    "sort": "All",
    "state": 6,
    "page": that.data.page
  }
  //发起请求*
  wx.request({
    url: "http://ppp.zhybpay.com:1177/ashx/XYK_Server.ashx",
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10036)
      console.log(res)
      if (res.data.CODE == "00") {
        var length = res.data.data.length;
        for (var i = 0; i < length; i++) {
          if (res.data.data[i].sort == "Mer") {
            that.data.mer.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agpro") {
            that.data.pro.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agcity") {
            that.data.city.push(res.data.data[i])
          }
          if (res.data.data[i].sort == "Agcount") {
            that.data.count.push(res.data.data[i])
          }
        }
        if (length==15){
          that.data.page++;
          console.log(that.data.page)
          subordinateList(that);
        }
        that.setData({
          mer:that.data.mer,
          pro:that.data.pro,
          city:that.data.city,
          count:that.data.count
        })
        console.log(that.data.pro)
        console.log(that.data.city)
        console.log(that.data.count)
        console.log(that.data.mer)
      }
    }
  })
}  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    Mer: "",  //用户类别
    page: 1,
    totalMoney: '',  //总收益
    phone: '', //用户手机号
    display: '',
    num: '',  //还款笔数
    money: '', //还款金额
    subordinate: "",
    member: [],  //会员代理
    pro: [],
    city:[],
    count: [],
    mer: [], //下级用户人数
    user: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取下级
    console.log("aaa")
    // urlData.subordinateList(that, wx.getStorageSync("uid"), that.data.pro, that.data.city, that.data.count, that.data.mer, that.data.page)
    subordinateList(that)
   
  },


  //点击进入：代理页面
  ontip: function (e) {
    var that = this;
    console.log(e)
    var order = e.currentTarget.dataset.index;
    if (wx.getStorageSync("realName")) {
      //下级会员代理人数列表页面
      wx.navigateTo({
        url: '../membership/membership',
      })
      wx.setStorageSync("order", order)

    } else {
      wx.navigateTo({
        url: '../realName/realName',
      })
    }
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
    that.setData({
      display: wx.getStorageSync("display"),
    })
  },
  //拨打电话
  calling: function (e) {
    var that = this;
    wx.showModal({
      title: '您是否拨打4000222058咨询升级具备条件。',
      content: "",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: "4000222058",
            success: function (res) {
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
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