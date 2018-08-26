//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
      userList: [],
    },

    //生命周期函数--监听页面加载
    onLoad: function () {
        var that = this;
        wx.request({
            url:"https://www.easy-mock.com/mock/5a377c8698cab80712b31809/example/list",
            method: 'GET',
            success: function(res) {
                that.setData({
                    userList: res.data.data
                })
            }
        });
    },

    //事件处理函数
    //我要积分页面,跳转,这个要做出判断是否登录,没有登录跳转其他的页面
    bindViewIntegral: function (event){
      var that = this;
      //获得当前的本地登录信息
      var key = wx.getStorageSync('key');
      if(key === "login:ok") {
        wx.switchTab({
          url: '../qrcode/qrcode'
        })
      }else {
        wx.navigateTo({
          url: '../qrcodenull/qrcodenull'
        })
      }

    },

    //点击跳转到 积分兑换优惠劵
    bindIntegralMall: function (){
      wx.navigateTo({
        url: '../integralmall/integralmall'
      })
    },

    //点击跳转到 开心通告栏
    bindHappynotice: function (){
      wx.navigateTo({
        url: '../happynotice/happynotice'
      })
    },



})
