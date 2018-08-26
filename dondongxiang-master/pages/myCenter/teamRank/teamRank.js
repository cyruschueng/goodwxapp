// pages/dynamic/teamRank/teamRank.js
var app = getApp();
Page({
  data: {
    currentTab: 0,
    currentindex:0,
    MsgView:true,
    myaddfamily: [],
    familyArt:[],
    myfamily:[],
    imgUrls: [
      {
        "content": "谁动了我的冰箱！",
        "hashId": "DDE51B6C09E1557D6542627755901308",
        "unixtime": 1418967626,
        "updatetime": "2014-12-19 13:40:26",
        "photo": "http://img.juhe.cn/joke/201412/19/DDE51B6C09E1557D6542627755901308.gif"
      }],
  },
  onLoad: function () {
      this.myaddfamily();
      this.familyArt();
      this.myfamily();//我的家族
  },
  swichNav: function (e) {
      var that = this;
      that.setData({
          currentTab: e.target.dataset.current,
          currentindex: e.target.dataset.current
      })
  },
  //上拉刷新
  onReachBottom: function () {
    wx.showLoading({
      title: '数据加载中'
    })
    wx.hideLoading()

  },
  addteam:function(){
      wx.navigateTo({
        url: '/pages/myCenter/addteam/addteam'
      })
  },
  addstate:function(){
    wx.showModal({
      title: '代理说明',
      content: '1.成为中级代理即可创建家族战队2.每个人当前只可加入一个战队3.退出战队时候贡献值清零4.进入战队后金币收益会1:1增加贡献值，双收益',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  agencyteam:function(){
    wx.navigateTo({
      url: '/pages/myCenter/dishes/dishes'
    })
  },
  //我加入的家族
  myaddfamily:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/family/familyinfo/myjoinfamily?user_id=' + app.globalData.user_id+'',
      method: 'post',
      data: { user_id: app.globalData.user_id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
            myaddfamily: res.data.data.data
        })
      }
    })
  },
  //退出我加入的家族
  outmyfamily:function(e){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/family/familyinfo/exitfamily',
      method: 'post',
      data: { user_id: app.globalData.user_id, family_id: e.currentTarget.dataset.id},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          wx.showToast({
            title: res.data.errmsg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            _this.myaddfamily();
            // _this.addfamilyArt();
            _this.familyArt();
          }, 2000);
      }
    })
  },
  //家族动态
  familyArt:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/family/familyinfo/familyList?user_id=' + app.globalData.user_id + '',
      method: 'post',
      data: { user_id: app.globalData.user_id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        _this.setData({
          familyArt: res.data.data.data
        })
      }
    })
  },
  //加入家族列表
  addfamilyArt:function(e){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/family/familyinfo/joinfamily',
      method: 'post',
      data: { user_id: app.globalData.user_id, family_id: e.currentTarget.dataset.id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          _this.myaddfamily();
          _this.familyArt();
        }, 2000);
      }
    })
  },
  //我的家族
  myfamily:function(){
      var _this = this;
      wx.request({
        url: app.globalData.url +'/family/familyinfo/myfamily?user_id=' + app.globalData.user_id + '',
        method: 'post',
        data: { user_id: app.globalData.user_id },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          if (res.data.errcode == 0){
            _this.setData({
              myfamily: res.data.data.data,
              MsgView: false
            })
          }else{
            _this.setData({
              myfamily: res.data.data.data,
              MsgView: true
            })
          }
        }
      })
  },
  lookfamilydist:function(e){
    wx.navigateTo({
      url: '/pages/myCenter/teamRank/familydist/familydist?familyid=' + e.currentTarget.dataset.id+''
    })
  }
})