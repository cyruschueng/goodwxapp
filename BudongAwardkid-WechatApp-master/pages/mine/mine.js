//  pages/mine/mine.js

const app = getApp()
const api = require('../../api/index.js')
const store = require('../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    nick: '',
    gender: 0,
    birthyear: 1982,
    avatarUrl: '',
    missionItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {

    var _this = this;

    this.setData({
      nick: store.client.nick,
      gender: store.client.gender,
      birthyear: store.client.birthyear,
      avatarUrl: store.client.avatarUrl
    });
    this.missionLoad();
  },

  /*
    说明：用户资料点击事件
  */
  onHeaderTap: function(){

    wx.navigateTo({
      url: '/pages/mine/profile/profile',
    })
  },

  /*
    说明： 查看积分点击事件
  */
  onScoreTap: function(){

    wx.navigateTo({
      url: '/pages/mine/score/score',
    })
  },

  /*
    说明：任务关卡点击事件
  */
  onMissionItemTap: function(e){

    console.log(e)
    wx.navigateTo({
      url: '/pages/mine/mission/detail/detail?missionId=' + e.currentTarget.dataset.missionId,
    })
  },

  /*
    说明：创建新关卡点击事件
  */
  onMissionCreateTap: function () {

    wx.navigateTo({
      url: '/pages/mine/mission/create/create',
    })
  },

  /*
    说明：关于我们点击事件
  */
  onAboutTap: function(){

    wx.navigateTo({
      url: '/pages/mine/about/about',
    })
  },

  /*
    说明：加载用户关卡
  */
  missionLoad: function(){

    var _this = this;
    
    api.client.mission.list(function (data) {

      _this.data.missionItems = (data.data || {}).items || [];
      _this.setData({
        missionItems: _this.data.missionItems
      })
    })
  }
})