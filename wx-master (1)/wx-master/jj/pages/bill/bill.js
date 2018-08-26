// pages/bill/bill.js
var urlData = require('../../utils/util.js');
var app = getApp();
//上拉加载更多
var loadMore = function (that, term) {
  console.log("账单列表")
  that.setData({
    hidden: true
  });
  console.log("使用请求数据")

  //请求订单列表，这里没有用缓存，因为懒。
  var str = {
    "OperationType": "10028",
    "uid": wx.getStorageSync('uid'),
    "page": that.data.page,
    "term": term,
    "level": that.data.level
  }
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10028)
      console.log(res)
      if (res.data.CODE == "00") {
        //请求成功，判断第一页是否有数据
        if (that.data.page == 1) {
          if (res.data.data.length) {
            that.setData({
              detailOrder: res.data.data,
              show: false
            })
            console.log(res.data.data)
            console.log(that.data.show)
            //缓存订单数据
            wx.setStorageSync("detailOrder", res.data.data);//时间排序订单详情
            //状态和银行卡号的处理
            var arr = [];
            var card = [];
            for (var i = 0; i < that.data.detailOrder.length; i++) {
              arr.push(that.data.detailOrder[i].state);
              if (arr[i] == "norm") {
                arr[i] = "无效订单"
              } else if (arr[i] == "fail") {
                arr[i] = "订单失败"
              } else if (arr[i] == "en") {
                arr[i] = "还款中"
              } else if (arr[i] == "succ") {
                arr[i] = "订单完成"
              }
              var str = that.data.detailOrder[i].bankCard;
              var reg = /^(\d{4})\d+(\d{4})$/;
              str = str.replace(reg, "$1****$2");
              card.push(str)
            }
            that.setData({
              status: arr,
              cardNum: card
            })
            //缓存订单状态和银行卡号
            wx.setStorageSync("status", arr)
            wx.setStorageSync("detailOrderCardNum", card)
          } else {
            that.setData({
              show: true
            })
          }
          //页数大于=2时处理
        } else if (that.data.page >= 2) {
          if (res.data.data.length) {
            var detail = that.data.detailOrder
            console.log(detail)
            for (var i = 0; i < res.data.data.length; i++) {
              detail.push(res.data.data[i])
            }
            wx.setStorageSync("detailOrder", detail);//订单详情
            that.setData({
              detailOrder: detail
            })
            var arr = [];
            var card = [];
            for (var i = 0; i < that.data.detailOrder.length; i++) {
              //订单状态的处理
              arr.push(that.data.detailOrder[i].state);
              if (arr[i] == "norm") {
                arr[i] = "无效订单"
              } else if (arr[i] == "fail") {
                arr[i] = "订单失败"
              } else if (arr[i] == "en") {
                arr[i] = "还款中"
              } else if (arr[i] == "succ") {
                arr[i] = "订单完成"
              }
              //银行卡号的处理
              var str = that.data.detailOrder[i].bankCard;
              var reg = /^(\d{4})\d+(\d{4})$/;
              str = str.replace(reg, "$1****$2");
              card.push(str)
            }
            that.setData({
              status: arr,
              cardNum: card
            })
            wx.setStorageSync("status", arr)
            wx.setStorageSync("detailOrderCardNum", card)
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
    className: false, //判断是金额排序还是时间排序的bool

    //name:"",   
    //bankId:'',
    //time:'', //
    //cardNumM:[],
    cardNum: [],  //处理后的银行卡号
    //jine:'',  
    //index:"",
    //statusM:[], //
    status: [], //订单状态
    level: 0,  //0是自己。1下级
    detailOrderM: [], //时间排序账单
    detailOrder: [], //金额排序账单
    show: "",  //判断是否有账单记录bool
    page: 1,  //订单页面
    term: "createTime",//默认时间排序
  },
  onLoad: function (options) {

  },
  //查询订单
  onTab: function () {
    var that = this;
    //查询订单
    that.setData({
      className: !that.data.className
    })
    var term = that.data.className ? "borrowMoney" : "createTime";
    //从新点击之后，page归1
    that.setData({
      term: term,
      page: 1
    })
    console.log(term)
    loadMore(that, that.data.term);
  },

  //点击订单进入订单详情
  bindDetail: function (e) {
    var that = this;
    console.log(e)
    var detailOrderIndex = e.currentTarget.dataset.index;
    // console.log(index+"订单序列号")
    wx.setStorageSync("detailOrderIndex", detailOrderIndex)
    wx.navigateTo({
      url: '../detailOrder/detailOrder',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  selectTime: function () {
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
    loadMore(that, that.data.term);
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.data.page++;
    var term = that.data.className ? "borrowMoney" : "createTime";
    loadMore(that, term);
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})