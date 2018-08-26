var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picBig:'/images/plant_img1.png',
    hiddenInfo:true,
    webQueryPlants:{},
  },
  infoEdit:function(e){
    var that = this;  
    var arg = e.currentTarget.dataset.arg;
    if (arg == 'install'){
      wx.navigateTo({
        url: '/pages/editInfo/editInfo?usr=' + that.data.webQueryPlants.usr + '&pid=' + that.data.webQueryPlants.pid + '&arg=' + arg + '&install=' + that.data.webQueryPlants.install,
      })
    }else{
      wx.navigateTo({
        url: '/pages/editInfo/editInfo?usr=' + that.data.webQueryPlants.usr + '&pid=' + that.data.webQueryPlants.pid + '&arg=' + arg,
      })
    } 
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad:function (options) {
    var that = this;
    if (wx.getStorageSync("PlantIn") !="Adm")
    wx.setStorageSync('PlantIn', 'listIn')

    // 底部导航
    app.editTabBar2();
    var webQueryPlants = wx.getStorageSync('checkPlant')
    wx.setNavigationBarTitle({ title: webQueryPlants.name })

    // 处理图片

    that.setData({
      webQueryPlants: webQueryPlants
    })
    
  },
  queryInfo:function(that,pid){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    util.http_oper(encodeURI("&action=queryPlantInfo&plantid="+pid), function (err, dat, desc) {
      if (err == 0) {
        dat.nominalPower = util.formatKw(dat.nominalPower, 1, 0)
        if (!dat.designCompany || (dat.designCompany == "undefined")){
          dat.designCompany = ''
        }
        if (dat.install){
          dat.install = dat.install.substring(0,10)
        }
        // 处理图片 
        if (!dat.picBig) {// 如果没有picBig,则赋值picBig
          dat.picBig = '/images/plant_img1.png'
        } else { // 如果有picBig
          var picUnde = dat.picBig.substring(28, dat.picBig.length) == 'undefined';
          if (picUnde) {
            dat.picBig = '/images/plant_img1.png'
          }
        }

        that.setData({ 
          webQueryPlants: dat
        })
      } else {
        util.errBoxFunc(that, err, desc)
      }
    }, function () {
      util.netWork(that)
    }, function () {
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.queryInfo(that, that.data.webQueryPlants.pid)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})