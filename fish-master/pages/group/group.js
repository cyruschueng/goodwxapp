//index.js
//获取应用实例

const
  app = getApp(),
  UserIO = require('../../io/User'),
  PlayIO = require('../../io/Play'),
  GroupIO = require('../../io/Group'),
  constants = require('../../config/constants')

Page({
  data: {
    user: null,
    members: null,
    people: 0,
    totalCounts: 0,
    fishImg: '../../static/img/fat-fish.png',
    group: null
  },

  onLoad(opts) {
    // 用户分享页面到群组
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    let {gid, user} = opts

    this.setData({
      gid,
      user: JSON.parse(user),
      groupName: JSON.parse(user).groups_info.find(item => item.gid === gid).name
    })
    this.getPlayerDataAndGroupData(gid)
  },

  onShow() {
    let {gid} = this.data
    this.getPlayerDataAndGroupData(gid)
  },

  getPlayerDataAndGroupData(gid) {
    // 获取用户所在群组的当日所有用户的数据
    PlayIO.getPlayerData({gid})
      .then(res => {
        let data = res.data.objects
        let totalCounts = 0
        data.forEach(item => {
          totalCounts += item.counts
        })

        this.setData({
          members: data.map(item => {
            return Object.assign(item, {
              user: JSON.parse(item.user)
            })
          }),
          people: data.filter(item => item.counts !== 0).length,
          totalCounts,

        })
      })
  },

  startGame(e) {
    let {user, gid} = this.data
    let url = constants.ROUTES.GAME + `?gid=${gid}&user=${JSON.stringify(user)}`
    wx.navigateTo({url})
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'The Creation',
      path: constants.ROUTES.INDEX,
      success(res){
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
})