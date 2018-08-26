// pages/tool/tool.js
var app = getApp();
var url = app.globalData.baseAPI;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initload: false,
    opsname:'',
    opsid:'',
    name:'',
    isNew:true
  },

  choose:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  home:function(){
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  joinxq:function(){
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    console.log(userInfo.id)
    // wx.request({
    //   url: 'https://api.changching.cn/api/v1/users/' + userInfo.id,
    //   method: 'PUT',
    //   data: {
    //     xiaoqu_id: that.data.xqid
    //   },
    //   header: {
    //     'Accept': "*/*",
    //     'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     console.log(that.data.xqid)
    //     if (that.data.xqid!=null){
    //       wx.reLaunch({
    //         url: '/pages/home/home'
    //       })
    //     }
    //   }
    // })
    wx.request({
      url: url + '/users/' + userInfo.id,
      method: 'PUT',
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      data: {
        xiaoqu_id: that.data.xqid
      },
      success: function (res) {
        userInfo.xqid = that.data.xqid
        userInfo.xqname = that.data.xqname
        userInfo.sqname = that.data.sqname
        wx.setStorage({
          "key": "userInfo",
          "data": userInfo
        })
        app.globalData.userInfo = userInfo;

        wx.reLaunch({
          url: '/pages/home/home',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var xqid = options.xqid
    var xqname = options.xqname
    var invitor = options.name
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
      xqid:xqid,
      xqname:xqname,
      invitor: invitor
    })

    if (userInfo.id != null) {
      that.setData({
        initload: true
      })
    }
    
    if (userInfo.xqid != null && userInfo.xqid != xqid) {
      // case1:当前用户的小区id跟所要查看的帖子的小区id是否一致
      that.setData({
        userInfo: userInfo,
        opsname: xqname,
        opsid: xqid,
        name: invitor,
        isNew: false
      })
    } else if (userInfo.xqid ==null){
      that.setData({
        userInfo: userInfo,
        opsname: xqname,
        opsid: xqid,
        name: invitor
      })
    }

  },

})