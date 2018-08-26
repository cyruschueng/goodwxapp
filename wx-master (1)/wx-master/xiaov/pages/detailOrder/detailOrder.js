// pages/detailOrder/detailOrder.js
var app = getApp()
//还款明细，
var repayDetail = function (that) {
  console.log(that.data.detailOrderList[that.data.index])
  var str = {
    "OperationType": "10037",
    //  "uid": wx.getStorageSync('uid'),
    "BO_ID": that.data.detailOrderList[that.data.index].id,
    "page": that.data.page
    // "state": "ok"
  }
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10037)
      console.log(res)
      if (res.data.CODE == "00") {
        //判断初始页是否有数据，
        //这两者综合
        if (that.data.page <= 1) {
          that.data.repayDetail = [];
        } else {
          var detail = that.data.repayDetail
        }
        if (res.data.data.length) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "支付中"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付成功"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "支付失败"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付异常"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付终止"
            }
            if (that.data.page > 1) {
              detail.push(res.data.data[i])
            }
          }
          if (that.data.page <= 1) {
            that.setData({
              repayDetail: res.data.data
            })
            console.log(that.data.repayDetail)
          } else {
            that.setData({
              repayDetail: detail
            })
          }
        } else {
          if (that.data.page <= 1) {
            that.setData({
              show1: true,
              show2: true
            })
          } else {
            that.data.page--;
            console.log(that.data.page)
            wx.showToast({
              title: '没有数据了',
              image: "../../images/icon/f.png",
              duration: 1000,
              mask: true,
            })
          }

        }
      }
    }
  })
}
//扣款明细
var DeductionsDetails = function (that) {
  var str = {
    "OperationType": "10038",
    // "uid": wx.getStorageSync('uid'),
    "BO_ID": that.data.detailOrderList[that.data.index].id,
    "page": that.data.page1
    // "state": "ok"
  }

  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10038)
      console.log(res)

      if (res.data.CODE == "00") {
        if (that.data.page1 <= 1) {
          that.data.DeductionsDetails = [];
        } else {
          var detail = that.data.DeductionsDetails
        }
        if (res.data.data.length) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "支付中"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付成功"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "支付失败"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付异常"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "支付终止"
            }
            if (that.data.page1 > 1) {
              detail.push(res.data.data[i])
            }
          }
          if (that.data.page1 <= 1) {
            that.setData({
              DeductionsDetails: res.data.data
            })
            console.log(that.data.DeductionsDetails)
          } else {
            that.setData({
              DeductionsDetails: detail
            })
            console.log(detail)
          }
        } else {
          if (that.data.page1 <= 1) {
            console.log(1)
            that.setData({
              show1: true,
              show2: true
            })
          } else {
            that.data.page1--;
            console.log(that.data.page1)
            wx.showToast({
              title: '没有数据了',
              image: "../../images/icon/f.png",
              duration: 1000,
              mask: true,
            })
          }
        }
      }
    }
  })
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    index: '',
    detailOrderList: [],
    cardId: [],
    arr: [],
    hasAsoMoney: "",   //已还金额
    notReturnMoney: "",
    page: 1,
    page1: 1,
    show1: '',
    repayDetail: [],
    DeductionsDetails: [],
    visible: "",  //和账单记录与我的还款区别
    arr: [],
    // bankName:"",
    // cardId:"",
    // createTime:"",
    show2: false//显示null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync("navOrder") != 1) {
      that.setData({
        visible: true
      })
    } else {
      that.setData({
        visible: false
      })
    }
    that.setData({
      index: wx.getStorageSync("detailOrderIndex"),
      detailOrderList: wx.getStorageSync("detailOrder"),
      cardId: wx.getStorageSync("detailOrderCardNum"),
      arr: wx.getStorageSync("status"),
      page: 1
    })
    repayDetail(that)
    var orderList = wx.getStorageSync("detailOrder");
    var that = this;
    var str = {
      "OperationType": "10035",
      "BO_ID": that.data.detailOrderList[that.data.index].id
    }
    //发起请求*
    wx.request({
      url: app.globalData.url,
      data: str,
      method: 'POST',
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("10035")
        console.log(res)
        if (res.data.CODE == "00") {
          that.setData({
            notReturnMoney: res.data.NotReturnMoney,
            hasAsoMoney: res.data.HasAsoMoney,
            arr: [
              {
                title: "银行名称",
                dec: that.data.detailOrderList[that.data.index].bankName
              },
              {
                title: "银行卡号",
                dec: that.data.cardId[that.data.index]
              },
              {
                title: "创建时间",
                dec: that.data.detailOrderList[that.data.index].createTime
              },
              {
                title: "还款天数",
                dec: that.data.detailOrderList[that.data.index].hk_Date
              },
              {
                title: "订单状态",
                dec: that.data.arr[that.data.index]
              },
              {
                title: "还款金额",
                dec: that.data.detailOrderList[that.data.index].borrowMoney
              },
              {
                title: "已还金额",
                dec: res.data.HasAsoMoney
              },
              {
                title: "待还金额",
                dec: res.data.NotReturnMoney
              },
            ]
          })
        }
      }
    })
  },
  //选择扣款明细还是还款明细
  onTab: function (e) {
    var that = this;
    that.setData({
      show: !that.data.show
    })
    if (that.data.show) {
      DeductionsDetails(that)
    } else {
      repayDetail(that);
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    if (that.data.show) {
      that.data.page1++;
      DeductionsDetails(that)
    } else {
      that.data.page++;
      repayDetail(that);
    }
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})