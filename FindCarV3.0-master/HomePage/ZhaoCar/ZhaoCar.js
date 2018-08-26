//获取应用实例
// var WxSearch = require('../../wxSearch/wxSearch.js')
// var detail = ''
// var dijkl = ''
// var baoMa = ''
// var beiZhun = ''
// var lianXiRen = ''
// var dianHua = ''

const app = getApp()
const { wc } = app
let { companyNo } = app
const { imgUrl, data, code, success } = wc

Page({
  data: {
    pagenum: 0
    // wxSearchData:{
    //   view:{
    //     isShow: true
    //   }
    // }
  },
  onPullDownRefresh: function () {
    this.onLoad()
    this.setData({
      searchValue: '',
      pagenum: 0
    })
  },
  onReachBottom: function () {
    let searchValue = this.data.searchValue
    this.getList([searchValue, ++this.data.pagenum])
  },
  wxSearchFn: function () {
    let searchValue = this.data.searchValue
    this.getList([searchValue])
    this.setData({
      pagenum: 0
    })
  },
  wxSearchInput: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  makePhone: function (e) {
    let phone = e.currentTarget.dataset.phone.toString()
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

  getList: function ([carname = '', pagenum = 0]) {
    const that = this
    let carList = this.data.carList || []
    let showCarData = {
      a: 'getShowCar',
      input: {
        pagenum,
        carname,
      }
    }

    wc.get(showCarData, (json) => {
      if (json[code] === success) {
        for (let i in json[data].carlist) {
          for (let j in json[data].carlist[i].carsinfo) {
            if (!!json[data].carlist[i].carsinfo[j].car_img) {
              json[data].carlist[i].carsinfo[j].car_img = imgUrl + json[data].carlist[i].carsinfo[j].car_img
            }
          }
          if (pagenum > 0) {
            carList.push(json[data].carlist[i])
          }
        }
        that.setData({
          carList: pagenum > 0 ? carList : json[data].carlist
        })
      } else if (json[code] === '30003') {
        wc.showToast(['数据已全部加载'])
      } else {
        wc.showToast(['操作失败', 'loading'])
      }
    })
  },
  onLoad: function () {
    companyNo = app.companyNo
    this.getList([])

    //初始化的时候渲染wxSearchdata
    // WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    // WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  onShow: function () {
    this.getList([])
  },
  // wxSearchFn: function (e) {
  //   var that = this
  //   WxSearch.wxSearchAddHisKey(that);

  // },
  // wxSearchInput: function (e) {
  //   var that = this
  //   WxSearch.wxSearchInput(e, that);
  // },
  // wxSerchFocus: function (e) {
  //   var that = this
  //   WxSearch.wxSearchFocus(e, that);
  // },
  // wxSearchBlur: function (e) {
  //   var that = this
  //   WxSearch.wxSearchBlur(e, that);
  // },
  // wxSearchKeyTap: function (e) {
  //   var that = this
  //   WxSearch.wxSearchKeyTap(e, that);
  // },
  // wxSearchDeleteKey: function (e) {
  //   var that = this
  //   WxSearch.wxSearchDeleteKey(e, that);
  // },
  // wxSearchDeleteAll: function (e) {
  //   var that = this;
  //   WxSearch.wxSearchDeleteAll(that);
  // },
  // wxSearchTap: function (e) {
  //   var that = this
  //   WxSearch.wxSearchHiddenPancel(that);
  // }
})
