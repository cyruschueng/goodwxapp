var util = require('../../utils/util.js')

//获取应用实例
var app = getApp()

var vm = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "关于我们",
    aboutTitle: "读书有益",
    aboutSubtitle: "V1.0.1（2017）",
    aboutIcon: "../../images/admin_about_icon.png",
    aboutArticle: [
      { title: "功能说明", url: "" },
      { title: "使用帮助", url: "" },
      { title: "使用说明", url: "" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
  },
  jumpUrl: function (e) {
    var url = e.currentTarget.dataset.url
    console.log("url：" + JSON.stringify(url))

    wx.navigateTo({
      url: url
    })
  }
})