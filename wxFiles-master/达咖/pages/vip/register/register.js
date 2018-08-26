var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:'',
    rpwd:''
  },
  pwdinput: function (e) {
    var that = this;
    if (e.detail.value.length < 7) {

      if (/^[0-9]*[1-9][0-9]*$/.test(e.detail.value) == true) {
        this.setData({
          pwd: e.detail.value
        })
      } else {
        wx.showToast({
          title: '请输入数字',
          image: '/img/60.png'
        })
        this.setData({
          pwd: that.data.pwd
        })
      }
    }else{
      this.setData({
        pwd: that.data.pwd
      })
      wx.showToast({
        title: '密码为6位数字',
        image: '/img/60.png'
      })
    }
  },
  rpwdinput: function (e) {
    var that = this;
    if (e.detail.value.length < 7) {
      if (/^[0-9]*[1-9][0-9]*$/.test(e.detail.value) == true) {
        this.setData({
          rpwd: e.detail.value
        })
      }else{
        wx.showToast({
          title: '请输入数字',
          image:'/img/60.png'
        })
        this.setData({
          rpwd: that.data.rpwd
        })
      }
    }else{
      this.setData({
        rpwd: that.data.rpwd
      })
      wx.showToast({
        title: '密码为6位数字',
        image: '/img/60.png'
      })
    }
  },
  submit: function (e) {
    var that = this;
    wx.showLoading({
      title: '注册信息中...',
    })
    if(e.detail.value.telNumber.length != 11){
      wx.showToast({
        title: '手机长度为11位',
        duration: 800,
        image: '/img/60.png'
      })
    } else if (this.data.pwd != this.data.rpwd){
      wx.showToast({
        title: '密码不一致',
        duration: 800,
        image: '/img/60.png'
      })
    } else if (this.data.pwd.length < 6) {
      wx.showToast({
        title: '请输入6位密码',
        duration: 800,
        image: '/img/60.png'
      })
    } else{
      app.wxRequest('uservip/wx/regist.do', {
        userid: wx.getStorageSync("openid"),
        phone: e.detail.value.telNumber,
        realname: e.detail.value.realName,
        paypass: that.data.pwd
      },function(res){
        wx.hideLoading();
        if(res){
          wx.showToast({
            title: '注册成功',
            duration:800
          })
          app.getUserInfo('');
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },800)
        } else{
          wx.showToast({
            title: '注册失败',
            duration: 800
          })
        }
      },function(){
        wx.hideLoading();
        wx.showToast({
          title: '服务器维护中...',
          image:'/img/60.png',
          duration: 800
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

})