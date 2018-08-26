// pages/friends/friends.js
var app = getApp();
Page({
  data: {
    reqdata: [],
    msgtext:true,
  },
  onLoad: function (op) {
    this.refreshfrinends("", true);
  },
  getinputval: function (e) {
      this.refreshfrinends(e.detail.value)
  },
  //刷新收藏
  refreshfrinends:function(val,ref){
    var res = (val == undefined ? " " : val);
    var _this = this;
    wx.request({
      url: app.globalData.url +'/user/user/getFriends',
      method: 'get',
      data: {
        user_id: app.globalData.user_id,
        type: 0,
        search: res
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (ref==true){
          setTimeout(function () {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 1000
            })
          }, 500)
        }
        if (res.data.errcode==0){
          _this.setData({
            reqdata: res.data.data.friends,
            msgtext:true,
          })
        }else{
          _this.setData({
            reqdata: "",
            msgtext:false,
          })
        }
        
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.refreshfrinends("",true);
  },
  dialphone:function(e){
    var phone = e.currentTarget.dataset.index == "" ? "号码为空" : e.currentTarget.dataset.index;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  detailsTap: function (e) {
    wx.navigateTo({
      url: '/pages/introduce/ddshow/ddshow?user_info=' + e.currentTarget.dataset.indexid + ''
    })
  },
  
})
