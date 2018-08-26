var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上页面的9个
    buildSecOpt: {},
    // 本页面3个
    name: '',
    address: '',
    logo: '/images/plant_img1.png',
    datpic:{},
    // 9个
    nominalPower: '',
    designCompany: '',
    install: '',
    unitProfit: '',
    coal: '',
    co2: '',
    so2: '',
    longitude: '',
    latitude: '',
    buildSecdis:false,
    // 9个 end
  },
  // 电站名称
  staNameInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        name: util.trim(e.detail.value),
      })
    }
  },
  // 电站描述
  staDescInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        address: e.detail.value
      })
    }
  },
  // 点击添加电站图片 第一步
  chooseImageTap: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择'],
      itemColor: "#f7982a",
      // 弹出弹框选择
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 第二步
  chooseWxImage: function (type) {
    let that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      // 第四步拿到图片路径
      success: function (res) {
        that.setData({
          logo: res.tempFilePaths[0],
          buildSecdis:true,
        })
        wx.showToast({
          title: '上传中！',
          icon: 'loading',
          duration: 1500,
          mask: true,
        })
        wx.uploadFile({
          url: util.http_upload_pic_url(), 
          filePath: that.data.logo,
          name: 'pic',
          success: function (res) {
            var dataJson = JSON.parse(res.data)
            that.setData({
              datpic: dataJson.dat
            })
          },
          fail:function(){
            wx.showToast({
              title: '上传失败！',
              icon: 'loading',
              duration: 1500
            })
          },
          complete:function(){
            that.setData({
              buildSecdis: false
            })
          }
        })
      }
    })
  },
     
  listPage: function () {
    var that = this;
    // 上页面9个
    var longitude = that.data.buildSecOpt.longitude
    var latitude = that.data.buildSecOpt.latitude
    var nominalPower = that.data.buildSecOpt.nominalPower
    var designCompany = that.data.buildSecOpt.designCompany
    var install = that.data.buildSecOpt.install
    var unitProfit = that.data.buildSecOpt.unitProfit
    var coal = that.data.buildSecOpt.coal
    var co2 = that.data.buildSecOpt.co2
    var so2 = that.data.buildSecOpt.so2

    var d = new Date();
    var timezone = -(d.getTimezoneOffset() * 60)
    var name = that.data.name
    var address = that.data.address

    if (util.trim(name) == '') {
      wx.showToast({
        title: '输入电站名称',
        icon: 'loading',
        duration: 1500,
      });
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      // 创建电站 
      util.http_oper(encodeURI("&action=addPlant&profit.currency=￥&nominalPower=" + nominalPower + '&name=' + name + '&designCompany=' + designCompany + '&install=' + install + '&profit.unitProfit=' + unitProfit + '&profit.coal=' + coal + '&profit.co2=' + co2 + '&profit.so2=' + so2 + "&address.timezone=" + timezone + '&address.lon=' + longitude + '&address.lat=' + latitude + '&address.address=' + address + '&picBig=' + that.data.datpic.picBig + '&picSmall=' + that.data.datpic.picSmall), function (err, dat, desc) {
        if (err == 0) {
          wx.hideLoading()
          wx.showToast({
            title: '创建成功！',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){

            wx.reLaunch({
              url: '/pages/list/list',
            })
          },1500)
        } else {
          wx.hideLoading()
          util.errBoxFunc(that, err, desc)
        }
      }, function () {
        wx.hideLoading()
        util.netWork(that)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      buildSecOpt: options
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