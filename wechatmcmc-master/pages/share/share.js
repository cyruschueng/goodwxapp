// share.js
var app=getApp();
var id;

Page({
  data: {
       token:1,
       zhiwei:[],
       height:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    
    var session_id = wx.getStorageSync('session_id')
    var openid;
     if(e.token==1){
     openid=wx.getStorageSync('wxopenid')
      id = wx.getStorageSync('wxopenid')
     }else{
        openid=e.openid
        id=e.openid
     }
     
    
     wx.request({
       url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=share',
       data:{
         'openid':openid
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded',
         'Cookie': 'PHPSESSID=' + session_id + '; path=/'
       },
       method:'post',
       success:function(res){
        //  console.log(res);
         
              that.setData({
                zhiwei: res.data,
                token: e.token,
                
              })
            
        wx.getSystemInfo({
          success: function(res) {
            that.setData({
              
              height: res.windowHeight * 0.08
            })
          },
        })
        // console.log(that.data.height)
            // 
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
  
  onShareAppMessage: function () {
    return {
      title: "招聘餐饮各岗位人员",
      desc: "",
      path: '/pages/share/share?openid=' +id + '&token=0'

    }   
  }
})