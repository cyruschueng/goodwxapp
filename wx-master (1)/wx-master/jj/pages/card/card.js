// ======信用卡列表======pages/card/card.js
var app = getApp();
var mask = require("../../utils/numberMask.js")
var urlData = require("../../utils/util.js")
var request_card_list = function (that) {
  var str = {
    "OperationType": "10022",
    "uid": wx.getStorageSync('uid')
  }
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10022)
      console.log(res)
      if (res.data.CODE == '00') {
        if (res.data.data.length) {
          that.setData({
            // list: res.data.data,
            show: true
          })
        } else {
          that.setData({
            show: false
          })
        }

        if (res.data.data.length) {
          that.setData({
            show1: true
          })
          //卡号处理
          var len = res.data.data.length;
          for (var i = 0; i < res.data.data.length; i++) {
            that.data.cardId.push(res.data.data[i].acctNo)
            if (res.data.data[i].state == 0) {
              res.data.data[i].state = "未申请"
            } else if (res.data.data[i].state == 1) {
              res.data.data[i].state = "还款中"
            } else if (res.data.data[i].state == 2) {
              res.data.data[i].state = "还款完成"
            } else if (res.data.data[i].state == 3) {
              res.data.data[i].state = "还款异常"
            } else if (res.data.data[i].state == 4) {
              res.data.data[i].state = "拉黑"
            }
          }
          var cardList = mask(that.data.cardId, len)
          console.log(res.data.data)
          function mask(cardId, len) {
            var arr = [];
            for (var j = 0; j < len; j++) {
              var str = cardId[j];
              var reg = /^(\d{4})\d+(\d{4})$/;
              str = str.replace(reg, "$1****$2");
              arr.push(str);
            }
            return arr
          }
          that.setData({
            cardId: cardList,
            list: res.data.data,
          })
          console.log(that.data.list)
          wx.setStorageSync("cardList", res.data.data)
          wx.setStorageSync("cardId", that.data.cardId)
        } else {
          wx.removeStorageSync("listIndex")
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
    card: "true",
    cardId: [],  //信用卡号集合
    index: 0,
    listIndex: {},
    list: [],   //信用卡集合
    show: "",
    nav1: [],
    sta: [],
    add: true,//控值添加信用卡按钮的显示
    r: "",
    g: "",
    b: "", //银行卡背景色的rgb
    a: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //请求信用卡列表
    var that = this;
    console.log("onLoad")
    console.log(wx.getStorageSync("cardId"))
    if (wx.getStorageSync("smartToCard")) {
      that.setData({
        add: false
      })
    }
    console.log(that.data.add)
  },

  //点击添加信用卡
  bindAdd: function (e) {
    wx.navigateTo({
      url: "../add/add"
    })
  },

  tap: function (e) {
    console.log(e)
    var that = this;
    var num = e.currentTarget.dataset.index;
    if (wx.getStorageSync("method") != 2) {
      //  var sta = [];
      //  var length = wx.getStorageSync("cardList").length
      //  for (var i = 0; i < length; i++) {
      //    if (wx.getStorageSync("cardList")[i].state == 0) {
      //      sta.push("未申请")
      //    } else if (wx.getStorageSync("cardList")[i].state == 1) {
      //      sta.push("还款中")
      //    } else if (wx.getStorageSync("cardList")[i].state == 2) {
      //      sta.push("还款完成")
      //    } else if (wx.getStorageSync("cardList")[i].state == 3) {
      //      sta.push("还款异常")
      //    } else if (wx.getStorageSync("cardList")[i].state == 4) {
      //      sta.push("拉黑")
      //    }
      //  }
      //  that.setData({
      //    sta: sta
      //  })
      //  console.log(sta)
      if (that.data.list[num].state == "还款中" || that.data.list[num].state == "还款异常" || that.data.list[num].state == "拉黑") {
        wx.showModal({
          title: '此信用卡' + that.data.list[num].state,
          content: '请选择其他信用卡！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        //判断method==2？是什么都不执行，不是的话，缓存点击的信用卡数据
        if (wx.getStorageSync("method") == 2) {

        } else {

          console.log(num)
          if (that.data.list[num]) {

          }
          wx.setStorageSync("listIndex", that.data.list[num])  //缓存点击选择的信用卡
          wx.setStorageSync("chooseCard", that.data.list[num])
          wx.navigateBack({
            delta: 1
          })
        }
      }
    }

  },

  //删除信用卡
  alter: function (e) {
    var that = this;
    console.log(e)
    //删除信用卡的序列号，
    var Index = e.currentTarget.dataset.index; //获取自定义属性
    if (that.data.list[Index].state == "还款中" || that.data.list[Index].state == "还款异常") {
      wx.showModal({
        title: '此信用卡' + that.data.list[Index].state + "您不能执行此操作",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      var len = that.data.list[Index].acctNo.length
      wx.showModal({
        title: '提示',
        content: '是否删除尾号为：' + that.data.list[Index].acctNo.slice(len - 4, len) + "的信用卡",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            //请求删除
            urlData.removeCard(that, that.data.list, Index, that.data.cardId)
            // var str = {
            //   "OperationType": "10023",
            //   "cardid": that.data.list[Index].id
            // }

            // //发起请求*
            // wx.request({
            //   url: app.globalData.url,
            //   data: str,
            //   method: 'POST',
            //   header: { "content-type": "application/json" },
            //   success: function (res) {
            //     console.log(10023)
            //     console.log(res)
            //     if (res.data.CODE == "00") {
            //       //删除点击的信用卡
            //       //缓存删除后的信用卡数据
            //       var len = wx.getStorageSync("cardList").length;
            //       var newCardList = [];
            //       var newCardId = [];
            //       for (var i = 0; i < len; i++) {
            //         if (i != Index) {
            //           newCardList.push(wx.getStorageSync("cardList")[i])
            //           newCardId.push(wx.getStorageSync("cardId")[i])
            //         }
            //       }
            //       wx.setStorageSync("cardList", newCardList)
            //       wx.setStorageSync("cardId", newCardId)
            //       that.setData({
            //         list: wx.getStorageSync("cardList"),
            //         cardId: wx.getStorageSync("cardId")
            //       })
            //       console.log(Index)
            //       console.log(wx.getStorageSync("cardList").slice(Index))
            //       console.log(wx.getStorageSync("cardId").splice(Index))
            //       wx.showToast({
            //         title: '信用卡删除',
            //         duration: 1000,
            //         mask: true,
            //       })
            //       that.onLoad();
            //       that.onShow()
            //     } else {
            //       wx.showToast({
            //         title: res.data.MESSAGE,
            //         image: '../../images/icon/f.png',
            //         duration: 1000
            //       })
            //     }
            //   }
            // })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
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
    console.log("onShow")

    var that = this;

    if (wx.getStorageSync("addBackCard")) {
      console.log("有新的信用卡")
      request_card_list(that)
      // choose_color(that)
    } else {
      console.log("没有新的信用卡")
      //判断本地数据是否存在，存在使用本地数据，不存在请求
      if (wx.getStorageSync("cardId").length && wx.getStorageSync("cardList").length) {
        console.log("本地数据")
        that.setData({
          list: wx.getStorageSync("cardList"),
          cardId: wx.getStorageSync("cardId"),
          show: true
        })
      }
      else {
        console.log("请求数据")
        that.data.cardId = [];
        that.data.list = [];
        //请求信用卡列表
        request_card_list(that)
      }
    }
    console.log(this.data.list)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorageSync("addBackCard")
    wx.removeStorageSync("smartToCard")
  },

  /**
   * 生命周期函数--监听页面卸载
   */

  onUnload: function () {
    wx.removeStorageSync("addBackCard")
    wx.removeStorageSync("smartToCard")

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