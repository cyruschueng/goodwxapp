let app = getApp();
let RP = require('../../../utils/model/redPackets.js')
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let rp = new RP.redPackets();
Page({
  data: {
    imgUrls: app.globalData.picUrl.bg_hongbao,
    imgUrls2: app.globalData.picUrl.shengcheng,
    openHover: app.globalData.picUrl.openHover,
    nonet: true,
    number: 0,
    money: 0,
    title: "恭喜发财，投资名片换起来！",
    showButton: true,
    bindContact: false
  },
  onLoad() {
    app.loginPage(user_id => {
      rp.recordHB.call(this)
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // 红包标题
  redBagName(e) {
    let bagName = e.detail.value;
    this.setData({
      title: bagName
    })
  },
  // 红包金额
  redBagMoney(e) {
    let bagMoney = e.detail.value;
    this.setData({
      money: bagMoney
    })

  },
  // 红包个数
  redBagNum(e) {
    let that = this;
    let bagNum = e.detail.value;
    this.setData({
      number: bagNum
    })
  },
  // 发布红包
  createRedBag(e) {
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let number = this.data.number;
    let money = this.data.money;
    let title = this.data.title;
    console.log(number)
    app.formIdSubmit(e);
    let moneyReg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
    if (0 < money && money < 1) {
      app.errorHide(that, "红包金额不能小于1元", 1500);
    } else if (1 <= money && money <= 2018) {
      if (!moneyReg.test(money)) {
        app.errorHide(that, "红包金额请保留小数点后两位", 1500);
      } else {
        if (money / number < 1) {
          app.errorHide(that, "平均每个红包不小于1元", 1500);
        } else if (money / number >= 1) {
          rp.publishHB.call(this, user_id, number, money, title)
          this.setData({
            bindContact: true
          });
          setTimeout(() => {
            this.setData({
              bindContact: false
            });
          }, 1000);
        }
      }
    } else if (money > 2018) {
      app.errorHide(that, "金额请小于2018", 1500);
    } else if (money == 0) {
      app.errorHide(that, "请输入金额", 1500);
    }else if (number == 0 || number == "") {
      app.errorHide(that, "请输入红包个数", 1500);
    } else {
      app.errorHide(that, "请输入金额", 1500);
    }

  },
  //获取全部文字
  getAll(bagMoney) {
    let that = this;
    let money = bagMoney * 1;
    let moneyReg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
    console.log(typeof money)
  }
})