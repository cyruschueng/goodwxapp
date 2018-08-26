//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    jobChoose: { 'php': 0, 'java': 0, 'python': 0, 
                'front': 0,'maintenance': 0,'go': 0
               },
    showJobChoosePanel:0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
    var set_job = wx.getStorageSync('set_job')
    if(!(set_job > 0)){
      this.setData({"showJobChoosePanel":1})
    }
  },

  onShow:function(){
    this.setData({'userInfo':app.globalData.userInfo})
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //职业选择
  chooseJob:function(e){
    var id = e.currentTarget.id
    var jobChoose = this.data.jobChoose
    if (jobChoose[id] > 0){
      jobChoose[id] = 0;
    } else {
      jobChoose[id] = 1;
    }
    this.setData({ jobChoose: jobChoose })
  },
  //提交职业
  submitJob:function(){
    var that = this;
    var jobs = [];
    var jobChoose = this.data.jobChoose
    for (var i in jobChoose){
      if(jobChoose[i] >0){
        jobs.push(i)
      }
    }
    wx.request({
      url: app.globalData.apiDomain+'/my/settings',
      data:{'jobs':jobs,'token':wx.getStorageSync('token')},
      method:'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType:'json',
      success:function(res){
        if(res.data.status > 0){
          /*var t = setTimeout(function(){
            that.setData({ 'showJobChoosePanel': 0 })
            wx.setStorageSync('set_job', 1);
            t = null;
            if(t == null){
              t = setTimeout(function () {
                wx.showModal({
                  title: '已设置职业',
                  content: '如果想更改，可点击左上角进行设置',
                  showCancel: false,
                  success: function (res) {
                    t = null
                  }
                })
              }, 200);
            }
          },500)*/
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000,
            success:function(){
              var t = setTimeout(function(){
                that.setData({ 'showJobChoosePanel': 0 })
                wx.setStorageSync('set_job', 1);
                t = null;
              },2000);
            }
          })
        } else {
          wx.showToast({
            title: '未作设置',
            icon: 'none',
            duration: 2000,
            success: function () {
              var t = setTimeout(function () {
                that.setData({ 'showJobChoosePanel': 0 })
                t = null;
              }, 2000);
            }
          })
        }
      }
    })
  },
  //开始答题
  start:function(){
    if(app.globalData.userInfo.ticket > 0){
      wx.navigateTo({
        url: '/pages/play/index',
      })
    } else {
      
    }
  },
  //分享
  onShareAppMessage:function(res){

  }
})
