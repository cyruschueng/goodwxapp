var util = require('../../../utils/util.js')
var vm = null
var money=""
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "我要退卡",  //页面标题
    bg: "",   //背景
    money: "",
    showModal:false,
    show:true,
    count:0,  //判断有多少本未还图书
    normal: true  //退款失败时为false
  },
  onLoad: function () {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    var bg = "http://dsyy.isart.me/bg_member.png"
    bg = util.qiniuUrlTool(bg, "user_bg")
    vm.setData({
      bg: bg,
    })
    //对会员等级进行判断
    var level_id = app.globalData.userInfo.level;
    vm.getMember(level_id)  //获取会员
    vm.judge()  //判断会员是否有未还的书
  },
  //显示弹窗
  apply: function () {
    vm.setData({
      showModal: true,
      normal: true  //退款失败时为false
    })
  },
  //点击继续用
  clickRetain:function(){
    vm.setData({
      showModal: false
    })
  },
  //点击退卡
  clickCancellation:function(){
    var param={
      token: app.globalData.userInfo.token
    }
    util.refundMember(param,function(ret){
      console.log("refundMember："+JSON.stringify(ret))
      if(ret.data.code=="200")
      {
        var userInfo = app.globalData.userInfo
        userInfo.level = 0
        app.globalData.userInfo = userInfo
        app.storeUserInfo(userInfo)  //更新缓存
        vm.setData({
          show: false,
          normal: true  //退款失败时为false
        })
      }
      else
      {
        vm.setData({
          normal: false  //退款失败时为false
        })
      }
    })
  },
  //退卡完成
  complete: function () {
    wx.navigateBack({
      delta: 2
    })
  },
  //退卡失败点击关闭
  close:function(){
    vm.setData({
      showModal: false,
      show: true,
      normal: true  //退款失败时为false
    })
  },
  //判断会员是否有未还的书
  judge:function(){
    var param={}
    util.getDetailBorrowInfoByUserId(param, function (ret) {
      console.log("历史借阅：" + JSON.stringify(ret))
      if (ret.data.code = "200")
      {
        var bookInfos = ret.data.obj
        var count=0
        for (var i = 0; i < bookInfos.length; i++) {
          var status=bookInfos[i].borrowInfo.status
          if (status==0)
          {
            count++
          }
        }
        vm.setData({
          count:count
        })
      }
    })
  },
  //获取会员
  getMember: function (level_id) {
    var param = {}
    util.getMemberLevels(param, function (ret) {
      console.log("获取会员类型：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        var cards = ret.data.obj
        for (var i = 0; i < cards.length; i++) {
          if (level_id == cards[i].id) {
            var money = cards[i].price/100
            vm.setData({
              money: money
            })
          }
        }
        vm.setData({
          cards: ret.data.obj
        })
      }
    })
  }
})
