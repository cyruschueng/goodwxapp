var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

var vm = null

var bar_id = 0

var bar_name = null

//书吧图书列表相关加载参数
var start_b = 0
var num_b = 12

Page({
  data: {
    title: "",  //标题
    barInfo: [],
    bookInfos: []
  },
  onLoad: function (options) {
    // options = { //测试数据
    //   barid: 2
    // }
    if (util.judgeIsAnyNullStr(options.barid)) {
      return;
    }
    vm = this
    bar_id = options.barid
    util.showLoading('加载中...');
    vm.loadBarPage()
  },
  //拨打电话
  callPhonenum: function (e) {
    console.log(JSON.stringify(e))
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phonenum
    })
  },

  //查看位置
  getMapPosition: function (e) {
    console.log("lon lat：" + JSON.stringify(e.currentTarget.dataset))
    var lon = e.currentTarget.dataset.lon
    var lat = e.currentTarget.dataset.lat
    var name = e.currentTarget.dataset.name
    var address = e.currentTarget.dataset.address
    wx.openLocation({
      latitude: lon,
      longitude: lat,
      scale: 28,
      name: name,
      address: address
    })
  },

  // 请求数据
  loadBarPage: function () {
    var param = {
      start: start_b,
      num: num_b,
      bar_id: bar_id,
      lat: app.globalData.userLocation.lat,
      lon: app.globalData.userLocation.lon
    }
    console.log(JSON.stringify(param))
    util.getBarPageByBarId(param, function (ret) {
      console.log(JSON.stringify(ret))
      if (ret.data.code == "200") {
        var img = ret.data.obj.barInfo.picture
        //图片处理
        ret.data.obj.barInfo.picture = util.qiniuUrlTool(ret.data.obj.barInfo.picture, "bar_detail")
        for (var i = 0; i < ret.data.obj.bookInfos.length; i++) {
          ret.data.obj.bookInfos[i].bookInfo.images_medium = util.qiniuUrlTool(ret.data.obj.bookInfos[i].bookInfo.images_medium, "folder_index")
        }
        vm.setData({
          barInfo: ret.data.obj.barInfo,
          bookInfos: ret.data.obj.bookInfos,
          title: bar_name
        })
        bar_name = ret.data.obj.barInfo.name
        wx.setNavigationBarTitle({ title: bar_name })
      }
    });
  },
  searchBook: function () {
    var barInfo = vm.data.barInfo
    //获取真实pictrue，不被七牛云存储处理的图片链接
    barInfo.picture = util.getRealImgUrl(barInfo.picture)
    console.log("我要传的值：" + JSON.stringify(barInfo))
    var target_url = '/pages/search/search?barInfo=' + JSON.stringify(barInfo)
    console.log(target_url)
    wx.navigateTo({
      url: target_url
    })
  },
  //根据图书id获取图书
  jumpBookInfo: function (e) {
    console.log(JSON.stringify("bookid:" + e.currentTarget.dataset.bookid))
    var bookid = e.currentTarget.dataset.bookid
    wx.navigateTo({
      url: '/pages/bookpage/bookpage?bookid=' + bookid
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: bar_name,
      path: '/pages/barpage/barpage?barid=' + bar_id,
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})