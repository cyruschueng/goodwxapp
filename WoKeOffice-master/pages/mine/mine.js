var app = getApp;
Page({

  data: {
    teamNumber: 3,
    projectNumber: 6,
    mytodoNumber: 4, // 指派给我的任务数，区别于todoNumber
  },

  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })  
  },

  toTeams: function () {
    wx.switchTab({
      url: '../teams/teams'
    })
  },

  toProjects: function () {
    wx.switchTab({
      url: '../projects/projects'
    })
  },

  toMytodo: function () {
    // 跳转到“我的任务”界面
  },

  toMySchedule: function () {
    wx.navigateTo({
      url: '../mySchedule/mySchedule',
    // 跳转到“我的日程”界面
    })
  },

  toSettings: function () {
    wx.navigateTo({
      url: '../settings/settings',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    // 跳转到“设置”界面
  },
})