let app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
let RP = require('../../../utils/model/redPackets.js');
let rp = new RP.redPackets();
Page({
  data: {
    activtyPagePic: app.globalData.picUrl.banner_jump1,
    bindContact: false,
    imgUrls2: app.globalData.picUrl.shengcheng2,
    openHover2: app.globalData.picUrl.openHover2,
    nonet: true,
  },
  onLoad(options) {
    let that = this;
    let index = options.index;//入口banner
    let str = 'banner_jump' + index;
    this.setData({
      activtyPagePic: app.globalData.picUrl[str]
    });
    let title = [0, '发红包扩人脉', '中国FA行业联盟成立大会', '微天使招募合伙人', '中国FA榜评选活动', '投募投资年度合作伙伴'];
    wx.setNavigationBarTitle({
      title: title[index],
    }),
      app.netWorkChange(that);
    rp.makeSureHB.call(this)
    if (index == 1) {
      this.setData({
        buttonStyle: true
      })
    }
  },
  //跳转生成红包页面
  createHB() {
    app.checkUserInfo(this, res => {
      this.setData({
        bindContact: true
      });
      setTimeout(() => {
        this.setData({
          bindContact: false
        });
      }, 1000);
      app.href("/redPackets/pages/publishHB/publishHB")
    })
  },

  // 微信授权绑定
  getPhoneNumber(e) {
    register.getPhoneNumber.call(this, e);
  },
  // 手机号码绑定
  telephoneRegister() {
    register.telephoneRegister.call(this);
  },
  // 关闭绑定方式选择弹框
  closeRegisterModal() {
    register.closeRegisterModal.call(this);
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
    wx.hideLoading();
  },
});