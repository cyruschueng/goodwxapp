function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}
Page({
  data: {
    user:'',
    where:'',
    nickname:'',
    avatar:'',
    array: [],
    department:'',
    key:-1,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      array: [],
      key: parseInt(options.key) ? parseInt(options.key):-1,
      id: parseInt(options.id) ? parseInt(options.id):''
    });
    var result = getApp().wxRQ(getApp().appApi.listAPI, '', 'POST', success);
    function success(e){
      // console.log(e.data.result.list);
      var arrs = e.data.result.list;
      var array = that.data.array;
      for (var key in arrs){
        array.push(arrs[key]);
      }
      that.setData({
        array:array
      });

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
          // console.log(res)
          that.setData({
            nickname: res.data.result.item.nickname,
            department: res.data.result.item.department,
            avatar: res.data.result.item.avatar ? res.data.result.item.avatar : getApp().globalData.default_avatar,
            user: res.data.result.item.username,
          })
        }
      });
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
    
    // wx.setNavigationBarTitle({
    //   title: '微问卷'
    // })
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
  userchange:function(e){
   this.setData({
     user: e.detail.value
   })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      where: e.detail.value,
      department:''
    })
  },
  check:function(){
    var that = this;
    if (!trim(this.data.user)){
      wx.showModal({
        title: '爱心提示！',
        content: '用户名不能为空',
        showCancel: false
      });
      return false;
    }
    // console.log(this.data.array[this.data.where]);
    if (!this.data.array[this.data.where]) {
      wx.showModal({
        title: '温馨提示！',
        content: '部门不能为空',
        showCancel: false
      })
      return false;
    }else{
      wx.showLoading({
        title: '提交数据...',
      })
      wx.request({
        url: getApp().appApi.updateUserAPI,
        dataType: 'json',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token'),
          'uid': wx.getStorageSync('uid')
        },
        data: {
          openid: getApp().globalData.openid,
          department: that.data.array[that.data.where],
          username: that.data.user,
        },
        success: function (res) {
          wx.hideLoading();
          // console.log(res)
          if (res.data.code != 200) {
            wx.showModal({
              title: '失败！',
              content: res.data.msg,
              showCancel: false
            })
          }else{
           wx.showToast({
             title: '提交成功！',
           });

           setTimeout(function(){
             if(that.data.key==1){console.log(232);
               wx.redirectTo({
                 url: '/pages/create/create',
               })
             }else if(that.data.key==2){
               wx.reLaunch({
                 url: '/pages/addsOver/addsOver?id=' +that.data.id,
               });
             }else{
               wx.reLaunch({
                 url: '/pages/profile/profile',
               }); 
             }
           },500)
          }
        },
        fail: function (error) {
          setTimeout(() => {
            wx.hideLoading();
          }, 100);
          wx.showModal({
            title: '请求失败！',
            content: error,
            showCancel: false
          })
          // console.log(error);
        }
      });
    }
  }
})