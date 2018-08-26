let app = getApp();
Page({
  data: {
  
  },
  onShow(){
    // 登录扫码
    app.loginPage( user_id =>{
        wx.scanCode({
          onlyFromCamera: true,
          success: function(res) {
            console.log(1);
          },
          fail: function(res) {

          },
          complete: function(res) {

          },
        })
    })
  }
})