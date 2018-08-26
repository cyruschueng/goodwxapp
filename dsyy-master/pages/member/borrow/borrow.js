var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "我要借阅",  //页面标题
    image:"/images/prompt.png",
    code:"请点击刷新",
    count:"0",  //可借阅总数
    count_borrow: "0",  //还可借阅的图书
    level:0,
    msg:"",  //信息
    show:true,  //是否显示借阅码
    buttonshow:true,  //是否显示升级按钮
  },
  onLoad: function (options) {
    vm=this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    util.showLoading("加载中")
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    //判断用户是否为会员，如果不是，引导用户注册会员
    var level = app.globalData.userInfo.level
    vm.setData({
      level: level
    })
    if(level>0)
    {
        vm.getCode()  //生成借书码
    }
    else
    {
      vm.setData({
        code: "您还不是会员，请先办理会员",
      })
      wx.redirectTo({
        url: '/pages/member/card/card',
      })
    }
    
  },
  //获取借阅码
  getCode: function () {
    util.showLoading("加载中")
    var token = app.globalData.userInfo.token;
    var param = {
      token: token
    }
    util.createBorrowCode(param, function (ret) {
      console.log("borrow：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        vm.setData({
          code: ret.data.obj.code,
          show: true,
          count: ret.data.obj.total_num,
          count_borrow: ret.data.obj.left_num
        })
      }
      else if (ret.data.code == "401")
      {
        vm.setData({
          code: "您还不是会员，请先办理会员",
        })
        wx.redirectTo({
          url: '/pages/member/card/card',
        })
      }
      else if (ret.data.code == "402")
      {
        vm.setData({
          msg: "借阅图书的数量已经超出您当前会员等级的限额",
          show:false,
          buttonshow: true,  //是否显示升级按钮
        })
      }
      else if (ret.data.code == "403") {
        vm.setData({
          msg: "借阅图书的数量已经超出您当前会员等级的限额",
          show: false,
          buttonshow: false,  //是否显示升级按钮
        })
      }
    })
  },
  //跳转会员升级
  upGrade:function(){
    wx.navigateTo({
      url: "/pages/member/upgrade/upgrade"
    })
  },
  //返回
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  }
})