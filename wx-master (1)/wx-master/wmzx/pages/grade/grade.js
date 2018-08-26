// pages/grade/grade.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
  },
   calling:function(e){
     
   },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx283fcc0ee6743fb4&secret=51ac65b9e11c2c490ce3df645fe336cf',
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
       
        success: function (res) {
          console.log("token")
          console.log(res)
          if(res.statusCode==200){
            that.setData({
              code:res.data.access_token
            })

            var ACCESS_TOKEN = res.data.access_token
            wx.request({
              url: "https://api.weixin.qq.com/datacube/getweanalysisappiduserportrait?access_token=res.data.access_token",
              method: 'GET',
              data: {
                "begin_date": "2017-11-15",
                "end_date": "2017-06-12"
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },

              success: function (res) {
                console.log(1)
                console.log(res)

              }
            })
          }
        }

      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("ACCESS_TOKEN")
    // var ACCESS_TOKEN = this.data.code
    // wx.request({
    //   url:"https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=ACCESS_TOKEN",
    //   method: 'GET',
    //   data: { "path": "pages/index/index", "width": 430 },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
     
    //   success: function (res) {
    //   console.log(1)
    //   console.log(res)

    //   }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
 
  
})