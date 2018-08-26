var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errBox: {},
    accountArrOne:{},
    bUid:'',
    ToNextDelta: false,
    userCountH: true,
    userCountH: true,
    statusEnable:''
  },
  stationTap: function (e) {
    var that = this;
    var url = "&action=applyBrowsePermission&uid=" + e.currentTarget.dataset.uid
    util.stationTo(that, url, '', 'usrpage')
  },
  editU:function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/editU/editU?id=' + e.currentTarget.dataset.id + '&accountArrOne=' + JSON.stringify(that.data.accountArrOne),
    })
  },
  userback:function(){
    wx.navigateBack({
      delta:1
    })
  },
  groupClasspag:function(e){
    var that = this;
    wx.navigateTo({
      url: '/pages/groupClass/groupClass?accountArrOne=' + JSON.stringify(that.data.accountArrOne),
    })
  },
  // 24.1.2 账号查询 0电站业主 1厂家账号 2经销商 3集团账号 5电站浏览账号
  webQueryAccountsFunc: function (that) {
    var url = "&action=webQueryAccounts&browseuid=" + that.data.bUid
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          userTotal:dat.total,
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
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var that = this
    var accountArrOne = JSON.parse(options.accountArrOne)
    console.log(accountArrOne.enable)
    var statusEnable = accountArrOne.enable.toString()
    if (statusEnable == "false") {
      that.setData({
        statusEnable: '关闭'
      })
    } else {
      that.setData({
        statusEnable: '开启'
      })
    }
    that.setData({
      bUid: accountArrOne.uid,
      accountArrOne: accountArrOne,
      userCountH:true,
    })
    if (accountArrOne.role == 1 || (accountArrOne.role == 2)){
      that.setData({
        userCountH:false
      })
      that.webQueryAccountsFunc(that)
    }
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
    var that = this;
    
    if (that.data.ToNextDelta == true) {
      var stationArr = wx.getStorageSync('stationArr')
      // 是否是子页面
      if (stationArr && (stationArr.length != 0)) {
        stationArr = stationArr.splice(0, stationArr.length - 1)
        wx.setStorageSync('stationArr', stationArr)

        wx.navigateBack({
          delta: 1
        })
      } 
    }
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