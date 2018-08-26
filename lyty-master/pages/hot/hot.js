var postsData = require('../../data/hot/hot.js')//此处用的是
Page({
  data:{
    
  },
  onLoad: function (option) {
     this.setData({
      postList:postsData.postList[0]
    })
      //console.log(postsData)  
    
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log(res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
    },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
   
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    
    // 用户点击右上角分享
    return {
      title: '【专业服务！一手送签！】', // 分享标题
      desc: '', // 分享描述
      path: 'pages/hot/hot', // 分享路径
      success:function(res){
        console.log(res)
        console.log(res.shareTickets[0])
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:function(res){console.log(res)},
          fail:function(res){console.log(res)}
        })
      },
      fail:function(res){
        console.log(res)
      }
    }
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '18811569656'
    })
  },
  callTel:function(){
    wx.makePhoneCall({
      phoneNumber: '010-65939099'
      
    })
  },
  callMb:function(){
    wx.makePhoneCall({
      phoneNumber: '18810353658'
    })
  },
  goTo:function(){
    wx.reLaunch({
      url: '/pages/travel/travel'
    })
  }
})