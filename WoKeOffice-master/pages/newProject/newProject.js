Page({

  data: {
    projectName: '',
    array: ['选择团队', '蜗壳办公开发团队', '精弘网络产品开发部'],
    team: 0,
    startDate: '2018-04-18',
    endDate: '2018-04-18',
    visible: true,
  },

  onLoad: function (options) {
  
  },

  confirmProject: function() {
    wx: wx.switchTab({
      url: '../projects/projects'
    })
  },

  pickTeam: function (e) {
    this.setData({
      team: e.detail.value
    })
  },

  pickStartDate: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  pickEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  changeVisibility: function (e) {
    this.setData({
      visible: e.detail.value
    })
  }
})