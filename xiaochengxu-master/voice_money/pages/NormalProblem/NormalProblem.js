//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showView:true,
    items: [
      { content: "语音红包怎么玩？", detail:"你需要设置一个一定金额带口令的语音红包,分享给你的好友说对口令即可获得红包。"},
      { content: "我创建了但没有发出去", detail: "在【我的记录】中找到我发出的,点击相应相的详细信息可以看到发出的红包记录。"},
      { content: "好友可以转发我的语音红包么？", detail: "可以的,好友也可以转发你的分享给其他微信好友。"},
      { content: "发语音红包收取服务费吗？", detail: "不收,手续费是在余额提现的时候收取,你可以放心的发红包啦！"},
      { content: "未领取金额怎么处理", detail: "24小时内未领取的金额会自动提现到小程序中【余额提现】中。"},
      { content: "如何让余额提现到微信钱包", detail: "在【余额提现】界面中输入提现金额点击提现即可。注意：提现金额不小于1元,每天提现的次数不大于三次。"},
      { content: "提现收取服务费吗？", detail: "每次提现收取提现金额的百分之一,手续费来自微信支付平台,本平台不收取手续费。"},
      { content: "如何联系客服", detail: "点击右下角的联系客服按钮,即可联系在线客服,工作时间为：早上9：30-下午18：30"},
      { content: "金额小于1元怎么提现？", detail: "自己创建一个语音红包自己领取,凑齐一元便可以提现。" },
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  MyRecord: function () {
    wx.navigateTo({
      url: '../MyRecord/MyRecord'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //点击显示隐藏
  showDetail: function (e) {
    var id = e.currentTarget.data-id;
    var that = this;
    that.setData({
      detail: e.currentTarget.detail,
      showView: (!that.data.showView),
    })
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
