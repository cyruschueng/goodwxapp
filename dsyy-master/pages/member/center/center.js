var util = require('../../../utils/util.js')
var vm = null
var level_image = ""
var current_level_image = ""
var future_level_image = ""
var show_recharge = ""
var show_upgrade = ""
var show_cancellation = ""
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "会员卡",  //页面标题
    bg: "",   //背景
    userInfo: [],  //
    level_image: "",  //当前等级
    notice: [
      { img: "/images/member_recharge.png", title: "会员充值", url: "/pages/member/card/card", show: true },
      { img: "/images/member_upgrade.png", title: "会员升级", url: "/pages/member/upgrade/upgrade", show: false },
      { img: "/images/member_cancellation.png", title: "退会员卡", url: "/pages/member/cancellation/cancellation", show: false },
    ],    //列表导航
  },
  onLoad: function () {
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    var bg = "http://dsyy.isart.me/bg_member.png"
    bg = util.qiniuUrlTool(bg, "user_bg")
    var userInfo = app.globalData.userInfo;
    vm.setData({
      userInfo: userInfo,
      bg: bg,
    })
    //对升级会员进行判断
    var level_id = app.globalData.userInfo.level;
    vm.getMember(level_id)  //获取会员信息
  },
  //跳转页面
  jumpUrl: function (e) {
    var url = e.currentTarget.dataset.url
    console.log("url：" + JSON.stringify(url))

    wx.navigateTo({
      url: url
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
            if (level_id == 0) {
              level_image = ""
              current_level_image = ""
              future_level_image = ""
              show_recharge = true
              show_upgrade = false
              show_cancellation = false
            }
            else if (level_id == cards[cards.length - 1].id) {
              level_image = "/images/level_" + (i + 1) + ".png"
              current_level_image = ""
              future_level_image = ""
              show_recharge = false
              show_upgrade = false
              show_cancellation = true
            }
            else {
              level_image = "/images/level_" + (i + 1) + ".png"
              current_level_image = "/images/leve_" + (i + 1) + "_to_" + (i + 2) + ".png"
              future_level_image = "/images/level_" + (i + 2) + ".png"
              show_recharge = false
              show_upgrade = true
              show_cancellation = true
            }
            console.log("获取会员类型：" + ret.data.code)
            var notice = vm.data.notice
            notice[1].current_level_image = current_level_image
            notice[1].future_level_image = future_level_image
            notice[0].show = show_recharge
            notice[1].show = show_upgrade
            notice[2].show = show_cancellation
            console.log("当前信息：" + JSON.stringify(notice))
            vm.setData({
              level_image: level_image,
              notice: notice
            })
          }
        }
      }
    })
  }
})
