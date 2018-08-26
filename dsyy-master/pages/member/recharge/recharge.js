var util = require('../../../utils/util.js')
var vm = null
//获取应用实例
var token = null
var level_id = 0
var app = getApp()
Page({
  data: {
    title: "确认支付",  //标题
    money: "",  //确认金额
    show: true,
    cards:[],  //获取会员类型
    upgrade:false,  //是否是升级
    arrhythmia:false   //退卡失常时为true
  },
  onLoad: function (options) {
    if (util.judgeIsAnyNullStr(options.levelid)) {
      return;
    }
    vm = this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
    level_id = options.levelid
    if (options.upgrade)
    {
      vm.setData({
        upgrade:true
      })
    }
    token = app.globalData.userInfo.token
    console.log("level_id：" + level_id)
    vm.getMember(level_id)  //获取会员
  },
  openMember: function () {
    var param = {
      token: token,
      level_id: level_id,
    }
    util.wxPrepay(param, function (ret) {
      console.log("wxPrepay：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        var obj = ret.data.obj
        console.log("pay param：" + JSON.stringify(obj))
        wx.requestPayment({
          'timeStamp': obj.timeStamp + "",
          'nonceStr': obj.nonceStr,
          'package': obj.package,
          'signType': obj.signType,
          'paySign': obj.paySign,
          'success': function (res) {
            console.log("pay success：" + JSON.stringify(res))
            var userInfo = app.globalData.userInfo
            userInfo.level = level_id
            app.globalData.userInfo = userInfo
            app.storeUserInfo(userInfo)  //更新缓存
            console.log("更新缓存：" + JSON.stringify(app.globalData.userInfo))
            vm.setData({
              show: false
            })
            //如果是会员升级要退回上一个等级的卡钱
            if(vm.data.upgrade)
            {
              var param = {
                token: app.globalData.userInfo.token
              }
              util.refundMember(param, function (ret) {
                console.log("refundMember：" + JSON.stringify(ret))
                if (ret.data.code=="200")
                {
                    vm.setData({
                      arrhythmia: false   //退卡失常时为true
                    })
                }
                else
                {
                  vm.setData({
                    arrhythmia: true   //退卡失常时为true
                  })
                }
              })
            }
          },
          'fail': function (res) {
            console.log("pay fail" + JSON.stringify(res))
            
          }
        })
      }
    })
  },
  borrowBook: function () {
    wx.navigateTo({
      url: '/pages/member/borrow/borrow',
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