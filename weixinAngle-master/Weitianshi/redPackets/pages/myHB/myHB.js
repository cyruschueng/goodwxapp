var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RP = require('../../../utils/model/redPackets.js')
let rp = new RP.redPackets();
Page({
  data: {
    imgUrls: app.globalData.picUrl.meifaguo,
    redHB: true,
    imgUrls2: app.globalData.picUrl.shengcheng2,
    openHover2: app.globalData.picUrl.openHover2,
    bindContact: false
  },
  onShow() {
    let that = this;
    app.loginPage(user_id => {
      wx.showLoading({
        title: 'loading',
        mask: true,
      });
      // 请求已发红包数据
      rp.publishedHBList.call(this, user_id);
      rp.packetStatic.call(this)
      app.initPage(this);
      // 确认红包可以生成
      rp.makeSureHB.call(this)
    })
  },
  //跳转生成红包页面
  createHB() {
    this.setData({
      bindContact: true
    });
    setTimeout(() => {
      this.setData({
        bindContact: false
      });
    }, 1000);
    app.href("/redPackets/pages/publishHB/publishHB")
  },
  //发红包详情
  findHB(e) {
    console.log(e) 
    let uniqueId = e.currentTarget.dataset.uniqueid;
    let user_id = wx.getStorageSync("user_id");
    let status = e.currentTarget.dataset.status;
    if(status == 0 ){
      app.href('/redPackets/pages/publishedHB/publishedHB?unique_id=' + uniqueId);
    }else{
      app.href('/redPackets/pages/openedHB/openedHB?unique_id=' + uniqueId);
    }
  },
  //加载更多
  loadMore() {
    let currentPage = this.data.currentPage;
    let page_end = this.data.page_end;
    if (page_end == true) {
      return app.errorHide(this, '没有更多了');
    }
    currentPage++;
    this.setData({
      currentPage
    })
    rp.publishedHBList.call(this, wx.getStorageSync('user_id'), currentPage);
  }
})