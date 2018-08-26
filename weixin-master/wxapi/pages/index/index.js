//index.js
var names = require('names.js')  // require 不支持绝对路径
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    array: [{
      name: 'lzc'
    }, {
      name: 'fll'
    }],
    obj: {
      name: 'lwy',
      age: 2
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 1. 生命周期函数： 监听页面加载
  onLoad: function () {
    console.log('/app/index/onLoad/只会被调用一次')
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 2. 生命周期函数：监听页面初次渲染完成
  onReady: function () {
    console.log('/pages/index/onReady/页面初次渲染完毕')
    // 对页面进行设置如：wx.setNavigationBarTitle 请在 onReady 之后设置
  },
  // 3. 生命周期函数：监听页面显示
  onShow: function () {
    console.log('/pages/index/onShow/页面显示')
    // 获取当前页面的路由：Page.prototype.route
    console.log('/pages/index/onShow/页面路由：', this.route)
    // 改变数据，并将改变从逻辑层发送到视图层
    // key 的格式可以多样化：
    // 比如：改变对象数组中某个对象的某个成员值

    this.setData({
      motto: '你好，世界！'
    })

    this.pageRoutes()
    this.moduleConcept()
  },
  // 4. 生命周期函数：监听页面隐藏
  onHide: function () {
    console.log('/pages/index/onHide/页面隐藏')
  },
  // 5. 生命周期函数：监听页面卸载
  onUnload: function () {
    console.log('/pages/index/onUnload/页面卸载')
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    // 需要在 config 的 window 选项中开启 enablePullDownRefresh
    console.log('/pages/index/onPullDownRefresh/正在下拉')
  },
  // 页面上拉触底部事件的处理函数
  onReachBottom: function () {
    console.log('/pages/index/onReachBottom/拉到底了')
  },
  // 用户点击右上角转发
  onShareAppMessage: function () {
    console.log('/pages/index/onShareAppMessage/点击转发')
    // 需要返回一个 Object，用于自定义转发的内容，包含字段：
    return {
      title: '我的转发标题', // 转发标题(默认：当前小程序名称)
      path: '/page/user?id=888'  // 转发路径(默认：当前页面的path，必须是以/开头的完整路径)
    }
  },
  // 页面滚动触发事件的处理函数
  onPageScroll: function () {
    // 参数为 Object = { 
        // scrollTop: Number //页面在垂直方向已滚动的距离
    // }
    console.log('/pages/index/onPageScroll/页面滚动事件')
  },

  // 事件处理句柄，绑定点击事件：bindtap
  // 如：<view bindtap="viewTap"></view>
  viewTap: function () {
    console.log('view tapped.')
  },

  switchName: function () {
    var name1 = this.data.array[0].name
    var name2 = this.data.array[1].name
    console.log('/pages/index/switchName/', name1, name2)
    this.setData({
      // 数组形式key
      'array[0].name': this.data.array[1].name,
      'array[1].name': this.data.array[0].name,
      // 对象形式key
      'obj.name': this.data.obj.age,
      'obj.age': this.data.obj.name
    })
  },

  // 1. 页面路由
  pageRoutes: function () {
    // 页面路由
    console.log('/pages/index/pageRoutes/获取当前页面实例', getCurrentPages())
    // 路由方法：
    // 1. 初始化： 小程序打开的第一个页面，路由后页面： onLoad, onShow
    // 2. 打开新页面：触发时机（调用wx.navigateTo或<navigator open-type="navigateTo"/>），路由前页（onHide），路由后页面（onLoad, onShow）
    // 3. 页面重定向：触发时机（调用wx.redirectTo或<navigator open-type="redirectTo"/>），路由前页（onUnload），路由后页（onLoad, onShow）
    // 4. 页面返回：触发时机（调用wx.navigateBack或<navigator open-type="navigateBack"/>），路由前页（onUnload），路由后页（onShow）
    // 5. Tab切换：触发时机（调用wx.switchTab或<navigator open-type="switchTab"/>），路由前页（），路由后页（下表）
    // 6 重启动：触发时机（调用wx.reLaunch或<navigator open-type="reLaunch"/>），路由前页（onUnload），路由后页（onLoad, onShow）
    // Tip1: navigateTo, redirectTo只能打开非tabBar页面， switchTab 只能打开tabBar页面，reLaunch可以打开任意页面
    // Tip2: 调用页面的路由带的参数可以在目标页面的 onLoad 中获取
  },

  // 2. 模块化概念
  moduleConcept: function () {
    var globalData = getApp().globalData
    console.log('/pages/index/moduleConcept/globalData/全局属性', globalData)
    console.warn('husband name', names.getName('husband'))
    console.warn('wife name', names.getName('wife'))
    console.warn('daught name', names.getName('daught'))
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
