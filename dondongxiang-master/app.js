//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    const that = this;

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.checkSession({
      success: function () {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function () {
        //登录态过期
        wx.login() //重新登录
        wx.showToast({
          title: '登录失败',
          icon: 'success',
          duration: 2000
        })
      }
    })
    that.registerUser();
  },
  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userinfo = res.userInfo;
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            console.log(code);
            console.log(res.iv);
            console.log(res.encryptedData);
            // 下面开始调用注册接口
            wx.request({
              url: 'https://shop.assistyoung.com/login/Login/getUserLoginState',
              data: {
                code: code,
                vi: iv,
                encrypted_data: encryptedData
              },
              method: "GET",
              header: { "content-type": 'application/json' },
              success: function (res) {
                console.log(res.data.errmsg);
                console.log(res);
                if (res.data.errcode == "0") {
                  wx.hideLoading();
                  console.log("登录时1" + res.data.data.user_id);

                  that.globalData.user_id = res.data.data.user_id;
                  that.globalData.from_id = res.data.data.from_id;
                  that.globalData.fromshop_id = res.data.data.fromshopid;
                  that.globalData.openid = res.data.data.openid;
                  that.globalData.third_session = res.data.data.third_session;
                  that.globalData.shop_id = res.data.data.shop_id;
                  that.globalData.bank_name = res.data.data.bank_name;
                  that.globalData.bank_no = res.data.data.bank_no;
                  that.globalData.bank_account_name = res.data.data.bank_account_name;
                  that.globalData.development_mode = res.data.data.development_mode;//上线模式判断

                } else {
                  wx.showToast({
                    title: '网络错误，请检查网络',
                  })
                }

              }
            })
          }
        })
      }
    })
  },
  globalData: {
      openid: null,
      user_id: null,
      from_id:null,
      fromshop_id:null,
      isDaiLi:null,
      shop_id:null,
      bank_name: "",//银行名字
      bank_no: "",//卡号
      bank_account_name: "",//开户名
      userinfo:[],
      position:"",
      third_session:"",
      development_mode:0,
      hasLocation: false, //默认未获取地址
      longitude:"",//用户地理位置
      latitude: "",
      default_address_id:0,//用户默认地址id
      url: "https://shop.assistyoung.com",

  },
  //获取经纬度  
  getLocation: function (e) {
    console.log(e)
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            // longitude: res.longitude,
            // latitude: res.latitude
          }
        })
      }
    })
  },  
  //根据经纬度在地图上显示  
  openLocation: function (e) {
    var value = e.detail.value
    wx.openLocation({
      // longitude: Number(value.longitude),
      // latitude: Number(value.latitude)
    })
  }  
})