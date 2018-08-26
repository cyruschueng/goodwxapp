var app = getApp();
Page({

  data: {
    currentTab: 0, // 预设当前项的值
    teamName: '精弘网络产品开发部',
    peopleNumber: '35',
    projectNumber: '6',
    todoNumber: '68',
  },

  onLoad: function (options) {
  
  },

  createTeam: function() {
    wx.navigateTo({
      url: '../newTeam/newTeam'
    })
  },

  /**
   * 滚动切换标签样式
   */
  switchHeadTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },

  /**
   * 点击标题切换当前页时改变样式
   */
  switchNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) {return false;}
    else {
      this.setData({
        currentTab:cur
      })
    }
  },

  viewTeam1: function () {
    app.globalData.thisTeamName = this.data.teamName;
    wx.navigateTo({
      url: '../teamDetail/teamDetail?teamID=team1'
    })
  },
})