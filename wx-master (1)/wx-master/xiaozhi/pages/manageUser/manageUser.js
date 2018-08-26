// pages/manageUser/manageUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        "img":"../../images/manageUser/1.png",
        "txt":"未注册"
      },
      {
        "img": "../../images/manageUser/2.png",
        "txt": "已开通"
      },
      {
        "img": "../../images/manageUser/3.png",
        "txt": "禁止"
      },
      {
        "img": "../../images/manageUser/4.png",
        "txt": "统计"
      }
    ]
  },
onTap:function(e){
  console.log(e)
  var index = e.currentTarget.dataset.index;
  console.log(index)
  if(index!==3){
    wx.navigateTo({
      url: '../membership/membership',
    })
    wx.setStorageSync("order", index);
    wx.setStorageSync("userToMember",true)  //从用户管理进入用户列表
  }else{
    wx.navigateTo({
      url: '../count/count',
    })
    wx.setStorageSync("order", index);
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})