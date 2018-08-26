import { Index } from './index-model.js';
import { Config } from '../../utils/config.js';


var index = new Index();
var app = getApp();
Page({
  data: {
    hasStoreNo: true,
    loadingHidden: false,
    swiperList: [{ storeNo: 'B02S0002', imgUrl: '/images/mock/brand_fiveplus.jpg' }, { storeNo: 'B02S0003', imgUrl: '/images/mock/brand_ochirly.jpg' }],
    storeList: [],
    brandPicMap: ['/images/mock/fiveplus.png', '/images/mock/ochirly.png', '/images/mock/adidas.png'],
    userInfo: {}, // 用户手机号和头像
    poster: '', // 门店海报图片
    time: 3, //倒计时
  },
  onReady() {
    this.enterHome();
  },
  enterHome(options) {
    var that = this;
    var storeNo = wx.getStorageSync('storeNo');
    if (storeNo != null && storeNo != '') {
      wx.redirectTo({
        url: '/pages/poster/poster?storeNo=' + storeNo
      })
    } else {
      this._loadData();
      this.setData({
        hasStoreNo: false
      });
    }

  },
  _loadData() {
    // 获取banner和各个门店数据
    var that = this;
    // 获取轮播图数据
    // index.getSwiperData(res => {
    //   if (res.status) {
    //     var swiperList = res.data;
    //     swiperList.forEach(item => {
    //       item.goodsPic += Config.processImage;
    //     })
    //   }
    // })
    // 获取门店列表
    index.getStoreList(d => {
      if (d.status) {
        var storeList = d.data;
        storeList.forEach(item => {
          item.goodsList.forEach(i => {
            i.goodsPic += Config.processImage;
          })
        })
        that.setData({
          loadingHidden: true,
          storeList: storeList.slice(0, 2)
        });
      }
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh() {
    this._loadData();
  },
  storeHandle(e) {
    app.aldstat.sendEvent('非扫码进店');
    var storeNo = index.getDataSet(e, 'storeno');
    wx.setStorageSync('storeNo', storeNo);
    wx.redirectTo({
      url: '/pages/poster/poster?storeNo=' + storeNo
    })
  },
  onProductTap(e) {
    var userInfo = app.globalData.userInfo;
    var storeNo = index.getDataSet(e, 'storeno');
    wx.setStorageSync('storeNo', storeNo);
    var goodsId = index.getDataSet(e, 'id');
    if (!userInfo) {
      app.getUserSetting(data => {
        // debugger
        // if (data.gender) {
        //   wx.navigateTo({
        //     url: '../product/product?storeNo=' + storeNo + '&id=' + goodsId
        //   })
        // }
      });
    } else {
      wx.navigateTo({
        url: '../product/product?storeNo=' + storeNo + '&id=' + goodsId
      })
    }
  },
  completeInformation() {
    wx.navigateTo({
      url: '/pages/information/index/index',
    })
  },
  onShareAppMessage() {
    return {
      title: '叮店严选',
      imageUrl: this.data.swiperList[0].imgUrl
    }
  }

})
