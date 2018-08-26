//index.js
//获取应用实例
var app = getApp();
var urlData = require('../../utils/util.js');
var alter= require("../../template/template.js")
require("../../utils/mdM.js")
Page({
  data: {
    uid: wx.getStorageSync("uid"),
    nickName: wx.getStorageSync("nickName"),  //微信昵称
    avatarUrl: wx.getStorageSync("avatarUrl"),//微信头像
    header:"",
    userData: [],  //用户数据

    banners: [],  //公告
    display: false, //是否实名
    mer: "", //用户类别
    login_share: "",
    list: [],
    cardId: [],
    // showModalStatus: false,
    item: "",
    index: 0,
     num: "",
    key: "",
    logout: "注销",
    money: "",
    realName: wx.getStorageSync("realName"),
    method: "",
    img1: wx.getStorageSync("imgNav1"),
    img2: wx.getStorageSync("imgNav2"),

    imgUrls: [
      "../../images/index/1.png",
      "../../images/index/2.png"
    ],
    //index-nav
    nav1: [
      {
        "url": "repayment",
        "src": "../../images/index/load.png",
        "txt": "申请还款"
      },
      {
        "url": "card",
        "src": "../../images/index/manage.png",
        "txt": "信用卡管理"
      },
      {
        "url": "ApplyCreditCard",
        "src": "../../images/index/smartBill.png",
        "txt": "申请信用卡"
      },

      {
        "url": "tutorial",
        "src": "../../images/index/tutorial.png",
        "txt": "使用教程"
      },
      {
        "url": "bill",
        "src": "../../images/index/bill.png",
        "txt": "订单记录"
      },
      {
        "url": "manageUser",
        "src": "../../images/index/manageUse.png",
        "txt": "用户管理"
      }
    ]
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    that.setData({
      item:alter.alter
    })
  },
  //注销
  catchLogout: function (e) {
    var that = this;
    wx.showModal({
      title: '是否退出',
      content: '',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync()  //清楚本地数据
          that.setData({
            display: false
          })
          wx.setStorageSync("display", that.data.display)
          that.onLoad();

          console.log('用户点击退出')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //点击nav区域跳转
  onSkip: function (e) {
    var that = this;
    var title = e.currentTarget.dataset.title; //获取自定义属性

    if (title == "repayment") {
      that.setData({
        method: 0
      })
      title = "smartBill"
      wx.setStorageSync("method", that.data.method)
    } else if (title == "card") {
      that.setData({
        method: 2
      })
      wx.setStorageSync("method", that.data.method)
    }
    if (wx.getStorageSync("uid")) {
      if (wx.getStorageSync("userData").realname) {
        //限制进入智能账单,合作伙伴
        if (title == "smartBill" && that.data.method == 1 || title == "grade" || title == "tutorial" || title =="ApplyCreditCard") {
          wx.showToast({
            title: '敬请期待',
            image: "../../images/icon/s.png",
            duration: 1000,
            mask: true
          })
        } else {
          wx.navigateTo({
            url: ".." + "/" + title + "/" + title,
          })
        }

      } else {
        wx.navigateTo({
          url: '../realName/realName',
        })
      }
    } else {
      //没有登录弹窗
      that.setData({
        showModalStatus: true
      })
    }
  },

  //去注册：
  regist: function (e) {
    this.setData({
      showModalStatus: false
    })
   
    wx.navigateTo({
      url: '../regist/regist',
    })
  },

  //去登陆：
  login: function () {
    this.setData({
      showModalStatus: false
    })

    wx.navigateTo({
      url: '../login/login',
    })
  },

  //关闭弹窗
  close: function () {
    this.setData({
      showModalStatus: false
    })
    
  },

  onShow: function () {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    //判断登录的状态
    if (wx.getStorageSync("uid")) {
      that.setData({
        login_state: "未实名"
      })
    } else {
      that.setData({
        login_state: "未登录"
      })
    }
    console.log(that.data.login_state)
    that.setData({
      uid: wx.getStorageSync("uid"),
      display: wx.getStorageSync("display")
    });
    urlData.header(that, that.data.nickName, that.data.avatarUrl, that.data.uid)
    //查询个人详情
    urlData.personaInfo(that, wx.getStorageSync("uid"), that.data.userData, that.data.display, that.data.phone, that.data.mer, that.data.show)
    //公告
    urlData.notice(that, that.data.banners)
    //借款订单列表
    urlData.BorrowList(that, wx.getStorageSync("uid"), 1, that.data.term, 0, that.data.num, that.data.money)
    //信用卡列表列表
    urlData.cardList(that, wx.getStorageSync("uid"), that.data.list, that.data.cardId)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    that.onShow()

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '小侄管家',
      path: '/pages/index/index',
      imageUrl: "../../images/logo_share.png",
      success: function (res) {
        // 转发成功
        console.log("转发成功")
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
