// pages/bindphone/bindphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'获取验证码',
    identifying:'identifying',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getName:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  getDel:function(e){
    this.setData({
      userphone:e.detail.value
    })
  },
  getPhonecode:function(e){
    this.setData({
      phoneCode:e.detail.value
    })
  },
  bindphone:function(){
    var that = this;
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/common/adduser',
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {bind:'1', openid: getApp().globalData.openid,name:that.data.username,phone:that.data.userphone,vercode:that.data.phoneCode },
      success: res => {
        console.log(res.data)
        if(!res.data.code){
          getApp().globalData.username = res.data.name;
          getApp().globalData.userphone = res.data.phone;
          wx.showToast({
            title: '修改成功',
            success:function(){
              wx.navigateBack({})
            }
          })
        }else if(res.data.code=='0'||res.data.code=='-1'){
          wx.showToast({
            title: '网络错误',
            image:'/pages/source/images/err.png'
          })
        }else{
          wx.showToast({
            title: '请勿频繁操作',
            image: '/pages/source/images/err.png'
          })          
        }
      }
    })
  },
  identifying:function(){
    var that = this;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/
    if(reg.test(that.data.userphone)){
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/common/getPhoneCode',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { user_id: getApp().globalData.userid, phone: that.data.userphone },
        success: res => {
          var time = 60;
          that.setData({
            time: time + 's',
            identifying: ''
          })
          var timer = setInterval(function () {
            time--
            that.setData({
              time: time + 's',
              identifying: ''
            })
            if (time == 0) {
              clearInterval(timer);
              that.setData({
                time: '获取验证码',
                identifying: 'identifying'
              })
            }
          }, 1000)
        }
      })   
    }else{
      wx.showToast({
        title: '号码错误',
        image:'/pages/source/images/err.png'
      })
    }
  }
})