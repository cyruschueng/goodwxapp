
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickname:"",
      avatar:""
  },
  done:function(e){
    wx.navigateTo({
      url: '/pages/myCreate/myCreate',
    })
  },
  doing: function (e) {
    wx.navigateTo({
      url: '/pages/visit/visit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that =this;
    wx.request({
      url: getApp().appApi.getUserInfoAPI,
      data: {
        id: wx.getStorageSync('uid')
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        console.log(res)
        that.setData({
          nickname: res.data.result.item.username,
          department: res.data.result.item.department,
          avatar: res.data.result.item.avatar ? res.data.result.item.avatar : getApp().globalData.default_avatar,
          uid: res.data.result.item.uid
        })
      }
    });
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
    getApp().globalData.access =200;
   
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
  go_edit:function(){
    console.log(this.data.uid);
    var that = this;
    wx.navigateTo({
      url: '/pages/user/user?id='+that.data.uid,
    })
  },
  help: function () {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  }
})