var _function = require('../../../../utils/functionData.js');
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
var app = getApp()
Page({
  data: {
    userInfo: {},
    allAddress: []
  },
  //加载完成后 读取用户信息
  onShow: function () {
    var that = this
    //获取用户收货地址
    // _function.getUserAddressList(wx.getStorageSync("utoken"), that.initGetUserAddressListData, this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getAddressList.html',
      {},
      (data) => {
        that.initGetUserAddressListData(data)
      }, this, { isShowLoading: false });
  },
  initGetUserAddressListData: function (data) {
    var that = this
    that.setData({
      allAddress: data
    })
  },
  //添加新地址
  addrss_bind: function (e) {
    var aid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../address_add/index?aid=' + aid
    })
  },
  //获取微信地址
  get_weixin_address_bind: function (e) {
    console.log(wx.getSystemInfo.SDKVersion);
    if (!wx.chooseAddress) {
      wx.showModal({
        title: '提示',
        content: '对不起，当前微信版本不支持该功能',
        showCancel: false
      });
      return false;
    }
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    // _function.getUserInfo(wx.getStorageSync("utoken"), this.initGetUserInfoData, this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanUser/Api/getUserInfo.html',
      {},
      (data) => {
        that.initGetUserInfoData(data)
      }, this, { isShowLoading: false });
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})