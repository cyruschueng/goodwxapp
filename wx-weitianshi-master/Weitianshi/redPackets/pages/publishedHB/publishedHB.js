let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let shareModel = require('../../../utils/model/shareModel.js')
let RP = require('../../../utils/model/redPackets.js')
let rp = new RP.redPackets();
Page({
  data: {
    bg_hongbao2: app.globalData.picUrl.bg_hongbao2,
    queding: app.globalData.picUrl.queding_1,
    zhuanfa: app.globalData.picUrl.zhuanfa,
    tankuang: app.globalData.picUrl.tankuang,
    open: app.globalData.picUrl.open,
    show: true,
    kai: true,
    openHover: app.globalData.picUrl.zhanfaHover,
    bindContact: false
  },
  onLoad: function (options) {
    let unique_id = options.unique_id;
    let user_id = wx.getStorageSync('user_id');
    this.setData({
      unique_id
    })
    rp.pushHBPerson.call(this, unique_id);
  },
  // 开红包
  kai() {
    let that = this;
    let unique_id = this.data.unique_id;
    let added_user_id = this.data.personInfo.user.user_info;
    that.setData({
      kai: false,
    })
    rp.openHB.call(this, unique_id);
  },
  // 打开红包后,点击确定跳转
  makeSure() {
    let unique_id = this.data.unique_id;
    this.setData({
      show: false,
      bindContact: true
    })
    setTimeout(() => {
      this.setData({
        bindContact: false
      });
    }, 1000);
    app.redirectTo("/redPackets/pages/openedHB/openedHB?unique_id=" + unique_id)
  },
  // 分享页面 
  onShareAppMessage() {
    let unique_id = this.data.unique_id;
    let personInfo = this.data.personInfo;
    return shareModel.redPacketsShare(personInfo.user.user_real_name, personInfo.packet.money, unique_id)
  }
})