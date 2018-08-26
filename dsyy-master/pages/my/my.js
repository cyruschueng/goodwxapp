var util = require('../../utils/util.js')
var vm = null
//获取应用实例
var app = getApp()
Page({
  data: {
    title: "",  //页面标题
    myBg: "",   //头部图片
    myName: "",  //微信昵称
    myPhoto: "",   //微信头像
    myNav: [],    //模块导航
    myNotice: [],    //列表导航
    myType: 0,   //用户类型
    bar: ""  //书吧
  },
  onLoad: function () {
    vm = this
    ////更新缓存
    // var token = app.globalData.userInfo.token;

    // var user_id = app.globalData.userInfo.id;
    // // var user_id=17  //测试
    // var user_name = app.globalData.userInfo.nick_name;  //获取昵称
    // var user_photo = app.globalData.userInfo.avatar;    //获取头像
    // var user_type = app.globalData.userInfo.type;  //获取用户类型
    // vm.setData({
    //   myName: user_name,
    //   myPhoto: user_photo,
    //   myType: user_type
    // })
    // console.log("user id:" + user_id);
    // //判断用户是否为书吧管理员，如果是执行getAdmin，如果不是执行getMember
    // if (user_type == 1) {
    //   vm.getAdmin();
    // }
    // else {
    //   vm.getMember();
    // }
    
  },
  onShow: function () {
    //更新缓存
    var token = app.globalData.userInfo.token;
    var param = {
      token: token
    }
    util.getUserDetailInfoById(param, function (ret) {
      console.log("更新：" + JSON.stringify(ret))
      if (ret.data.code == "200") {
        app.globalData.userInfo = ret.data.obj
        app.storeUserInfo(ret.data.obj)
        console.log("更新后的缓存：" + JSON.stringify(app.globalData.userInfo))

        var user_id = ret.data.obj.id;
        // var user_id=17  //测试
        var user_type = ret.data.obj.type;  //获取用户类型
        var user_name = ret.data.obj.nick_name;  //获取昵称
        var user_photo = ret.data.obj.avatar;    //获取头像
        vm.setData({
          myName: user_name,
          myPhoto: user_photo,
          myType: user_type
        })
        console.log("user id:" + user_id);
        //判断用户是否为书吧管理员，如果是执行getAdmin，如果不是执行getMember
        if (user_type == 1) {
          vm.getAdmin();
        }
        else {
          vm.getMember();
        }
      }
    })
  },
  //管理员
  getAdmin: function () {
    var myBg = "http://dsyy.isart.me/bg.png"
    myBg = util.qiniuUrlTool(myBg, "user_bg")
    vm.setData({
      title: "管理员中心",
      myBg: myBg,
      myNav: [
        { img: "/images/admin_lend.png", title: "图书借出", url: "/pages/admin/lend/lend" },
        { img: "/images/admin_ret.png", title: "图书归还", url: "/pages/admin/return/return" },
        { img: "/images/admin_input.png", title: "图书录入", url: "/pages/admin/cbook/cbook" },
        { img: "/images/admin_bar.png", title: "书吧管理", url: "/pages/admin/bar/bar" }
      ],
      myNotice: [
        { img: "/images/admin_notice_about.png", title: "关于我们", url: "/pages/about/about" },
        { img: "/images/admin_notice_feedback.png", title: "意见反馈", url: "/pages/feedback/feedback" },
      ]
    })
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })

    //管理员选择书吧
    vm.getBarId();
  },
  //非管理员
  getMember: function () {
    var myBg = "http://dsyy.isart.me/bg.png"
    myBg = util.qiniuUrlTool(myBg, "user_bg")
    vm.setData({
      title: "个人中心",
      myBg: myBg,
      myNav: [
        { img: "/images/member_scan.png", title: "我要借阅", url: "/pages/member/borrow/borrow" }
      ],
      myNotice: [
        { img: "/images/admin_notice_history.png", title: "历史借阅", url: "/pages/member/history/history" },
        { img: "/images/admin_notice_member.png", title: "会员卡", url: "/pages/member/center/center" },
        { img: "/images/admin_notice_about.png", title: "关于我们", url: "/pages/about/about" },
        { img: "/images/admin_notice_feedback.png", title: "意见反馈", url: "/pages/feedback/feedback" }
      ]
    })
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
  },
  //跳转修改信息页面
  editInfo: function (e) {
    wx.navigateTo({
      url: "/pages/user/user"
    })
  },
  //跳转页面
  jumpUrl: function (e) {
    var url = e.currentTarget.dataset.url
    console.log("url：" + JSON.stringify(url))

    wx.navigateTo({
      url: url
    })
  },
  //如果是书吧管理员判断并选择书吧
  getBarId: function () {
    var param = {}
    util.getBarListByUserId(param, function (ret) {
      console.log("书吧：" + JSON.stringify(ret))
      var barInfo_id = []
      var barInfo_name = []
      if (ret.data.code == "200") {
        console.log(ret.data.obj.length)
        if (ret.data.obj.length > 0) {
          if (ret.data.obj.length > 1) {
            for (var i = 0; i < ret.data.obj.length; i++) {
              barInfo_id[i] = ret.data.obj[i].barInfo.id
              barInfo_name[i] = ret.data.obj[i].barInfo.name
            }
            console.log("barInfo_id：" + JSON.stringify(barInfo_id))
            console.log("barInfo_name：" + JSON.stringify(barInfo_name))
            //选择书吧
            wx.showActionSheet({
              itemList: barInfo_name,
              success: function (res) {
                console.log("res: " + JSON.stringify(res))
                console.log(res.tapIndex)
                if (res.cancel) {
                  app.globalData.barDetail.barid = ret.data.obj[0].barInfo.id
                  app.globalData.barDetail.barname = ret.data.obj[0].barInfo.name
                  console.log("barDetail" + JSON.stringify(app.globalData.barDetail))
                  vm.setData({
                    bar: app.globalData.barDetail
                  })
                }
                else {
                  var bar_id = barInfo_id[res.tapIndex]
                  var bar_name = barInfo_name[res.tapIndex]
                  app.globalData.barDetail.barid = bar_id
                  app.globalData.barDetail.barname = bar_name
                  console.log("barDetail" + JSON.stringify(app.globalData.barDetail))
                  vm.setData({
                    bar: app.globalData.barDetail
                  })
                  console.log(vm.data.bar)
                }
              },
              fail: function (res) {
                app.globalData.barDetail.barid = ret.data.obj[0].barInfo.id
                app.globalData.barDetail.barname = ret.data.obj[0].barInfo.name
                console.log("barDetail" + JSON.stringify(app.globalData.barDetail))
                vm.setData({
                  bar: app.globalData.barDetail
                })
              }
            })
          }
          else {
            app.globalData.barDetail.barid = ret.data.obj[0].barInfo.id
            app.globalData.barDetail.barname = ret.data.obj[0].barInfo.name
            console.log("barDetail" + JSON.stringify(app.globalData.barDetail))
            vm.setData({
              bar: app.globalData.barDetail
            })
          }
        }
      }
    })
  },
})
