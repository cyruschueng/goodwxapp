//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code_languages:[],

    interview_skills: [],
    remain_skills:[],
    remain_skills_status:'hide',
    remain_skills_status_tips:'展开',
    tools:[],
    remain_tools:[],
    remain_tools_status:'hide',
    remain_tools_status_tips:'展开'
  },
  //事件处理函数
  /*bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
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
    wx.request({
      url: app.globalData.apiDomain+'/smallContent/index',
      success:res=>{
        //console.log(res.data.msg.tools);
        this.setData({ 'code_languages': res.data.msg.books,
                      'interview_skills':res.data.msg.ivs,
                      'remain_skills':res.data.msg.remain_ivs,
                      'tools':res.data.msg.tools,
                      'remain_tools': res.data.msg.remain_tools,
                    })
      }
    })
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jumpToNewPage:function(e){
    //手册页
    var id = e.currentTarget.id
    //console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id
    })
  },
  jumpToNewPage2: function (e) {
    //面试宝典列表页
    var id = e.currentTarget.id
    //console.log(id)
    wx.navigateTo({
      url: '/pages/detail/ivList?id=' + id
    })
  },
  jumpToToolPage: function (e) {
    //实用工具页
    var id = e.currentTarget.id
    var name = e.currentTarget.dataset.name
    var type = e.currentTarget.dataset.type
    //console.log(name)
    switch(type){
      case '0':
        //哈希
        var url = '/pages/detail/tool?id=' + id + '&name=' + name
        break;
      case '1':
        //编码
        var url = '/pages/detail/base?id=' + id + '&name=' + name
        break;
      case '3':
        //加密
        var url = '/pages/detail/crypt?id=' + id + '&name=' + name
        break;
      default:
        break;
    }
    wx.navigateTo({
      url: url
    })
    
  },
  show_remain_skills: function (e) {
    var _remain_skills_status = this.data.remain_skills_status
    var _remain_skills_status = _remain_skills_status == 'show' ? 'hide' : 'show'
    var _remain_skills_status_tips = _remain_skills_status == 'show' ? '收起' : '展开';
    this.setData({ 'remain_skills_status': _remain_skills_status })
    this.setData({ 'remain_skills_status_tips': _remain_skills_status_tips })
  },
  show_remain_tools:function(e){
    var _remain_tools_status = this.data.remain_tools_status
    var _remain_tools_status = _remain_tools_status == 'show' ? 'hide' : 'show'
    var _remain_tools_status_tips = _remain_tools_status == 'show' ? '收起' : '展开';
    this.setData({ 'remain_tools_status': _remain_tools_status})
    this.setData({ 'remain_tools_status_tips': _remain_tools_status_tips })
  },
  instruction:function(e){
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/detail/instruction?type='+type
    })
  },
  purchase:function(e){
    wx.request({
      url: app.globalData.apiDomain + '/pay/small_buy',
      data:{
        token:wx.getStorageSync('token'),
        title:'购买单条推送',
        desc:'购买单条推送'
      },
      success:function(res){
        wx.requestPayment({
          'timeStamp': res.data.timeStamp+'',
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
          },
          'fail': function (res) {
          }
        })
      },

    })
  },
  /*onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        //console.log(app.globalData.userInfo)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }*/
})
