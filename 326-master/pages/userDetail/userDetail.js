var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountArr:[],
    accountChecked:false,
    uidV:[],
    uidarr:[],
    page:0,
    pagesize:10,
  },
  //跳转到分组
  groupClasspage:function(){
    var that = this;
    if (that.data.uidV.length==0){
      util.toast(that, '请选择用户')
    }else{
      wx.navigateTo({
        url: '/pages/groupClass/groupClass?uidStr=' + (that.data.uidarr.join(',')),
      })
    }
  },
  //返回
  userpage:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 全选
  accountAllChecked: function (e) {
    var that = this;
    that.setData({
      accountChecked: !that.data.accountChecked,
    })
    if (that.data.accountChecked == true){
      var uidarr = []
      for (var i = 0; i < that.data.accountArr.length; i++) {
        uidarr.push(that.data.accountArr[i].uid)
      }
      that.setData({
        uidarr: uidarr
      })
    } else{
      that.setData({
        uidarr: []
      })
    }
   
  },
// 多选框 
  enableChange:function(e){
    var that = this;
    that.setData({
      uidV: e.detail.value,
      uidarr:[],
    })
    var uidarr = []
    for (var i = 0; i < that.data.uidV.length; i++) {
      uidarr.push(that.data.accountArr[that.data.uidV[i]].uid)
    }
    that.setData({
      uidarr: uidarr
    })
  },
  // 启用账号
  AbleAccount0:function (that){
  var that =this;
  that.setData({
    enableChoose: true,
    accountChecked:false,
  })
  that.disableOrEnableAccountFunc(that)
  },
  // 禁用账号
  EnableAccount: function (that) {
    var that = this;
    that.setData({
      enableChoose: false,
      accountChecked: false,
    })
    that.disableOrEnableAccountFunc(that)
  },
  // 启用账号 请求2.7
  disableOrEnableAccountFunc: function (that){
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    if (that.data.uidarr.length==0){
      wx.showToast({
        title: '请选择用户',  
        icon: 'loading', 
        duration:1500,
        mask: true,  
      })  
    }else{
      var url = "&action=disableOrEnableAccount&page=" + that.data.page + '&pagesize=' + that.data.pagesize + '&uid=' + that.data.uidarr.join(',') + '&enable=' + that.data.enableChoose
      
      util.http_oper(encodeURI(url), function (err, dat, desc) {
        if (err == 0) {
          wx.hideLoading()
          if (that.data.enableChoose==true){
            wx.showToast({
              title: '已开启',
              icon: 'success',
              duration: 1500,
              mask: true,
            }) 
          } else if (that.data.enableChoose == false){
            wx.showToast({
              title: '已禁用',
              icon: 'success',
              duration: 1500,
              mask: true,
            }) 
          }
          // 重组数组
          if (that.data.uidV!=''){
          for (var j = 0; j < that.data.uidV.length; j++) {
            that.data.accountArr[that.data.uidV[j]].enable = that.data.enableChoose
          }
        }else{
            for (var j = 0; j < that.data.accountArr.length; j++) {
              that.data.accountArr[j].enable = that.data.enableChoose
            }
        }
        that.setData({
          accountArr: that.data.accountArr,
        })
        } else {
          wx.hideLoading()
          util.errBoxFunc(that, err, desc)
        }
      }, function () {
        wx.hideLoading()
        util.netWork(that)
      }, function(){
        that.setData({
          uidarr:[]
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      that.setData({
        accountArr: JSON.parse(options.accountArr)
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
    var that = this;
    that.setData({
      accountChecked: false,
    })
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