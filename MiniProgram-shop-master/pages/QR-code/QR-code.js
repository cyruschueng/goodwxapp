// pages/QR-code/QR-code.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic:'',
    userName:'',
    shopName:'',
    infoImg:''
  },
  //预览二维码图片
  bigImg:function(e){
    let url = e.currentTarget.dataset.src;
    let urls = [url]
    wx.previewImage({
      current: '',
      urls: urls,
      success: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.fuserId == null){
      wx.setStorageSync('fuserId', null)
    }else{
      wx.setStorageSync('fuserId', options.fuserId)
    }
    
    try {
      var user_id = wx.getStorageSync('user_id')
      var userMessage = wx.getStorageSync('user_info')
      that.setData({
        userId: user_id,
        userMessage: userMessage
      })
    } catch (e) {
      // Do something when catch error
    }
    if (options.fuserId == null){
      try {
        var user_id = wx.getStorageSync('user_id')
        var userMessage = wx.getStorageSync('user_info')
        that.setData({
          userPic: userMessage.avatarUrl,
          userName: userMessage.nickName
        })
      } catch (e) {
        // Do something when catch error
      }
    }else{
      that.setData({
        userPic: options.userPic,
        userName: options.userName
      })
    }

    //分销请求
    console.log('userId', user_id)
    console.log('fuserid', options.fuserId)
      wx.request({
        url: web_url + '/app.php?c=User&act=fxuser',
        data: {
          fuserid: options.fuserId
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log('测试分销', res)
        }
      })
    
      
    //转发前配置转发信息
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        console.log('----配置转发信息', res)

      },
    })
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    console.log('===options', options)
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          console.log(res)
          //错误信息
          var errMsg = res.errMsg; 
          // 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
          var encryptedData = res.encryptedData; 
          // 加密算法的初始向量
          var iv = res.iv;
        }
      })
    }
    

    //请求页面信息
    wx.request({
      url: web_url + '/app.php?c=Sjxinxi',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        that.setData({
          shopName: res.data.data.title,
          infoImg: res.data.data.thumb
        })
      }
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
//转发页面

  onShareAppMessage: function (options) {
    var that = this
    return {
      title: '',
      path: '/pages/QR-code/QR-code?fuserId=' + that.data.userId + '&userPic=' + that.data.userPic + '&userName=' + that.data.userName,
      success: function (res) {
        // console.log('转发', res)
        wx.showModal({
          title: '转发成功',
          content: '',
          showCancel: false,
        })
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            // console.log('获取转发信息', res)
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        console.log('转发失败', res)
      }
    }
  }
})