var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var token = null
var app = getApp()
Page({
  data: {
    title: "会员升级",  //页面标题
    bg: "",   //图片
    userInfo:[],
    level_id:"",
    future_level_id:"",
    current_level:"",  //当前等级
    future_level:"",   //未来等级
    current_level_image:"",  //当前等级的图片
    current_description: "",  //当前会员等级描述
    future_description: "",  //未来会员等级描述
    upgrade_money:""  //升级金额
  },
  onLoad: function (options) {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })

    var bg = "http://dsyy.isart.me/banner_pay.png"
    bg = util.qiniuUrlTool(bg, "user_bg")
    console.log(bg)
    vm.setData({
      bg: bg,
      level_id: app.globalData.userInfo.level,
      userInfo: app.globalData.userInfo,
    })

    token = app.globalData.userInfo.token

    var level_id = app.globalData.userInfo.level
    vm.getMember(level_id)
  },
  //确认充值
  recharge: function () {
    
    var level_id = parseInt(vm.data.future_level_id)+1

    wx.navigateTo({
      url: '/pages/member/recharge/recharge?levelid=' + level_id + '&upgrade=true',
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
            vm.setData({
              level_id: cards[i].id,
              future_level_id: cards[i].id,
              current_level: "lv"+(i+1),  //当前等级
              future_level: "lv"+(i+2),  //未来等级
              current_level_image: "/images/level_"+(i+1)+".png",  //当前等级的图片
              current_description: cards[i].description,  //当前可借阅数目
              future_description: cards[i+1].description,  //未来可借阅数目
              upgrade_money: cards[i + 1].price/100  //升级金额
            })
          }
        }
      }
    })
  }
})