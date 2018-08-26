var urlData = require('../../utils/util.js');
var md5 = require("../../utils/md5.js");
var app  =getApp()
Page({
  data: {
    registBtnTxt: "确定",
    getBtnText: '发送验证码',
    btnLoading: false,
    disa:false,
    show:true,
    pwdLogin: false, //密码登录显示
    phone: '',           //登录手机号码
    code: '',              //验证码
    password: '', 
    password1:'',        //登录密码
    getBtn: true,
    inputPwd:"",
    focus:true,
    focus1:false,
    focus2:false
  },
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    //判断是找回密码还是设置登陆密码
    var that = this;
    if(wx.getStorageSync("access")==1){
      wx.setNavigationBarTitle({
        title: '修改登陆密码'
      })
      this.setData({
        inputPwd: "请输入修改密码"
      })
    }

    if (wx.getStorageSync("access") == 2) {
      wx.setNavigationBarTitle({
        title: '设置支付密码'
      })
      that.setData({
        show:false
      })
      console.log(that.data.show)
    }
    this.setData({
      inputPwd: "请输入修改密码"
    })
  },

  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  //获取手机号的值
  // getPhone: function (e) {
  //   this.setData({
  //     phone: e.detail.value
  //   })
  // },

  //获取验证码的值
  getCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    if (this.data.code.length == 6) {
      this.setData({
        focus1: true
      })
    }
  },

  //获取密码的值
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  firm:function(e){
    this.setData({
      focus2:true
    })
  },

  //获取密码的值
  getPassword1: function (e) {
    this.setData({
      password1: e.detail.value
    })
  },

  //确定修改密码
  login: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },
//跳转到登陆页面
  regist: function () {
    wx.redirectTo({
      url: '../regist/regist'
    })
  },

  //获取验证码
  sendCode: function () {
    var that = this;
    urlData.sendCode(that, wx.getStorageSync("phone"), that.data.disa, that.data.getBtnText)
  },

  //确定修改
  amend: function () {
    
    if (wx.getStorageSync("access") == 1 || wx.getStorageSync("access")==0) {
    var that = this;

    if (that.data.code && that.data.password && that.data.password1) {
      if (that.data.password == that.data.password1) {
        //验证验证码
        var str = {
          'OperationType': '10002',
          "mobile": wx.getStorageSync("phone"),
          "code": that.data.code
        }
        console.log(wx.getStorageSync("phone"))
        console.log(that.data.code)
        wx.request({
          url: app.globalData.url,
          data: str,
          method: 'POST',
          header: { "content-type": "application/json" },
          success: function (res) {
            console.log(10002)
            console.log(res)
            if (res.data.CODE == "00") {
              //修改登录密码：
              var mdPwd = md5.md5(that.data.password);
              mdPwd = md5.md5(mdPwd);
              var str = {
                'OperationType': '10017',
                "username": wx.getStorageSync("userData").username,
                "pwd": mdPwd
              }
              console.log(mdPwd)
              wx.request({
                url: app.globalData.url,
                data: str,
                method: 'POST',
                header: { "content-type": "application/json" },
                success: function (res) {
                  console.log(10017)
                  console.log(res)
                  if(res.data.CODE=="00"){

                    wx.showToast({
                      title: res.data.MESSAGE,
                      image: "../../images/icon/f.png",
                      duration: 1000,
                      mask: true,
                    })
                  wx.clearStorageSync();  //密码修改成功后清楚本地缓存，进入登录页面
                    setTimeout(function(){
                      //设置成功后跳转到首页
                      wx.redirectTo({
                        url: '../login/login',
                      })
                    },1000)
                  }
                }
              })
            } else {
              wx.showToast({
                title: res.data.MESSAGE,
                image: "../../images/icon/f.png",
                duration: 1000,
                mask: true,
              })
            }

          }
        })
      } else {
        wx.showToast({
          title: '两次密码不一致',
          image: "../../images/icon/f.png",
          duration: 1000,
          mask: true,
        })
      }
    } else {
      wx.showToast({
        title: '请填写完整信息',
        image: "../../images/icon/f.png",
        duration: 1000,
        mask: true,
      })
    }
  }

  if (wx.getStorageSync("access") == 2) {
//设置支付密码。
    var that = this;
    if (that.data.code && that.data.password && that.data.password1) {
      if (that.data.password == that.data.password1) {
        //验证验证码
        var str = {
          'OperationType': '10002',
          "mobile": wx.getStorageSync("phone"),
          "code": that.data.code
        }
        console.log(wx.getStorageSync("phone"))
        console.log(that.data.code)
        wx.request({
          url: app.globalData.url,
          data: str,
          method: 'POST',
          header: { "content-type": "application/json" },
          success: function (res) {
            console.log(10002)
            console.log(res)
            if (res.data.CODE == "00") {
              //设置支付密码
              var mdPwd = md5.md5(that.data.password);
              mdPwd = md5.md5(mdPwd);
              var str = {
                'OperationType': '10015',
                "uid": wx.getStorageSync('uid'),
                "payPwd": mdPwd
              }
              console.log(mdPwd)
              wx.request({
                url: app.globalData.url,
                data: str,
                method: 'POST',
                header: { "content-type": "application/json" },
                success: function (res) {
                  console.log(10015)
                  console.log(res)
                  if(res.data.CODE=="00"){
                    
                    wx.showToast({
                      title: res.data.MESSAGE,
                      image: "../../images/icon/f.png",
                      duration: 1000,
                      mask: true,
                    })
                    setTimeout(function () {
                      //设置成功后跳转到钱包
                      wx.switchTab({
                        url: '../wallet/wallet',
                      })
                    }, 1000)
                  }
                }
              })
            } else {
              wx.showToast({
                title: res.data.MESSAGE,
                image: "../../images/icon/f.png",
                duration: 1000,
                mask: true,
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '两次密码不一致',
          image: "../../images/icon/f.png",
          duration: 1000,
          mask: true,
        })
      }
    } else {
      wx.showToast({
        title: '请填写完整信息',
        image: "../../images/icon/f.png",
        duration: 1000,
        mask: true,
      })
    }
  }
  }
})
