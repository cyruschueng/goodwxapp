// register.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eye:true,
    times:60,
    eshow:'',
    disabled:true
  },
  onLoad(){
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
  },
  //切换明码密码
  eye(e){
    this.setData({ eye: this.data.eye ? false : true, eshow: true})
  },
  //发送手机验证码
  sendCode(){
    this.setData({ disabled: true })  //禁用
    var time = 60;  //限制时间
    var t = () => {
      this.setData({ disabled: false})  //移除禁用
      this.setData({ times: 60 })  
      clearInterval(s);          //清除定时器
    }
    setTimeout(t, (time + 1) * 1000);   //到时清除禁用
    var s = setInterval(()=> {  //显示时间
      time--;
      this.setData({ times: time })  
    }, 1000)
    let mobile = this.data.phone
   /**/ wx.request({
     url: app.globalData.apiBase + "index.php/weixin/registerCode.html",
      method : "get",
      data: { mobile},
      success:function(res){
        if(res.data.status==200){
          wx.showModal({
            content: '短信已发送' + mobile +'手机号，请注意查收',
          })
        }else{
          wx.showModal({
            content: res.data.message,
          })
        }
        
      }
    })

  },
   //查看手机号码是否已注册
  chenkPhone(e){  //
   // console.log(e.detail)
    this.setData({ phone: e.detail.value }) ;
    var reg = /^1[3|4|5|7|8|9]\d{9}$/;
    var g = (e.detail.value).match(reg);

    if (g){  //查看是否已注册
      let that=this;
      wx.request({
        url: app.globalData.apiBase + "index.php/weixin/checkMobile.html",
        data: { mobile: that.data.phone },
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          if (res.data.result == 1) {
            wx.showModal({
              title: '提示',
              content: '您的手机号码已注册，如忘记密码请找回',
              showCancel: false,
            }) 
            this.setData({ disabled: true })  //禁用                       
          } else if (res.data.result == 0) {
            that.setData({ disabled: false })  //移除禁用
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    } else { 
      this.setData({ disabled: true })
      return
    }
  },
  //同意注册
  register(){
    let mobile = this.data.phone;  //手机号
    let invcode = this.data.invcode;//邀请码
    let password = this.data.password; //用户密码
    let code = this.data.code; //手机邀请码
    let gameKey = wx.getStorageSync('gameKey');//必赢2奖品参数
    let trd_session = wx.getStorageSync('trd_session') ;
    if (!trd_session) return
    if (mobile == undefined || mobile.length !=11 || mobile=="") {
      wx.showToast({
        title: "手机号长度不足",
        duration: 1000,
        icon: 'loading',
      })
      return
    }
    if (code == undefined || code.length != 4 || code == "") {
      wx.showToast({
        title: "验证码长度不对",
        duration: 1000,
        icon: 'loading',
      })
      return
    }   
    if (password == undefined || password=="") {
      wx.showToast({
        title: "密码为空",
        duration: 1000,
        icon: 'loading',
      })
      return
    }
    wx.request({
      url: app.globalData.apiBase + "index.php/weixin/zhuce.html",
      data: { mobile, invcode, password, code, gameKey, trd_session },
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data.status == 200) {
           wx.setStorageSync('ptuserinfo',res.data.result);
           wx.setStorageSync('flag',3);
           app.globalData.uid = res.data.result.userid;
          //注册成功，跳转
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success() {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/welcome/welcome',
                })
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            duration: 1000,
            icon: 'loading',
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: "请求错误，",
          duration: 2000,
        })
      },
      complete: function (res) { },
    })
  },

  // 获取手机验证码
  chenkCode(e){
    this.setData({ code:e.detail.value})
  },
  //获取密码值
  chenkPassword(e){
    this.setData({ password: e.detail.value })
  },
  //获取邀请码值
  chenkInvCode(e){
    this.setData({ invcode: e.detail.value })
  },
  agreement(){
    wx.navigateTo({
      url: '/pages/register/agreement/agreement',
    })
  }
})