var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    AccountGroup: [],//分组
    uidStr:'',
    accountArrOne:[],
  },
// 返回上一个页面
  userDetailback:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 点击列表
  groupCheck:function(e){
    var that = this
    var url = '&action=addAccountToGroup&uid=' + that.data.uidStr + '&id=' + e.currentTarget.dataset.id
    var groupName = e.currentTarget.dataset.groupname
    that.addAccountToGroupFunc(that, url, groupName)
  },
  // 向分组中添加成员 22.5
  addAccountToGroupFunc: function (that, url,groupName) {
    // util.showLoading(that);
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        util.toastOK(that, '移动成功')

        if (that.data.accountArrOne.length!=0){
          var accountArrOne = that.data.accountArrOne
          accountArrOne.group = groupName
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/userAdmInfo/userAdmInfo?accountArrOne=' + JSON.stringify(accountArrOne),
            })
          }, 1500)
        }else{
          setTimeout(function () {
            wx.navigateBack({
              delta:1
            })
          }, 1500)
        }
      } else {
        util.errtipFunc(that, err, desc, '移动失败')
      }
    }, function () {
      util.errtipFunc(that, '', '', '移动失败')
    }, 'Manu', function () {
      // setTimeout(function(){
      //   util.cancelLoading(that)
      // },1500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that  = this;
  if (options.accountArrOne){
    that.setData({
      uidStr: JSON.parse(options.accountArrOne).uid,
      accountArrOne: JSON.parse(options.accountArrOne)
    })
  }
  if (options.uidStr){
    that.setData({
      uidStr: options.uidStr,
    })
  }
  that.queryAccountGroupFunc(that)
  },
  // 22.1查询分组
  queryAccountGroupFunc: function (that) {
    var url = "&action=queryAccountGroup&page=" + that.data.page0 + '&pagesize=' + that.data.pagesize0
    util.http_oper(encodeURI(url), function (err, dat, desc) {
      if (err == 0) {
        that.setData({
          AccountGroup: dat.group
        })
      } else {
        util.errtipFunc(that, err, desc, '分组')
      }
    }, function () {
      util.errtipFunc(that, '', '', '分组')
    }, 'Manu')
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