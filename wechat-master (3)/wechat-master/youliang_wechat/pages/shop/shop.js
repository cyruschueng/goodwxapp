Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    sheng_num:100,
    bol:true,
    textcontent:'',
    hidden:false,
  },
  bindinput:function(e){
    console.log(e.detail.value);
    this.textcontent= e.detail.value;

    var len = e.detail.value.length;
    console.log(e.detail.value.length);
    //ajax
    this.setData({
      num:len,
      sheng_num: 100-len,
    })
    if(len>=95){
      this.setData({
        bol:false
      })
    }else{
      this.setData({
        bol:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      hidden: true,
    })
  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  evaSubmit: function (eee) {
    var that = this;
    //提交(自定义的get方法)
    
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          //获取openid接口  
          url: 'https://youliang.shaoziketang.com/update.php',
          data: {
            code: res.code,
            brand: that.textcontent,
           
          },
          method: 'POST',
          success: function (res) {
            console.log(333333);
            console.log(res);
            wx.redirectTo({
            
              url: '../user/user',
              
            }) 
          }
        })

      }
    })



   
    
   }
 

})