const
  app = getApp(),
  UserIO = require('../../io/User'),
  PlayIO = require('../../io/Play'),
  GroupIO = require('../../io/Group'),
  constants = require('../../config/constants')

Page({
  data: {
    musicIcon: '../../static/img/music.png',
    shellImg: '../../static/img/shell.png',

    topGroup: null,
    topUser: null,
  },

  onLoad(opts) {
    // 用户分享页面到群组
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })

    // 获取当日全球的生下鱼宝宝个数最多的群组
    GroupIO.getGroups({gid: ''})
      .then(res => {
        let topGroup = res.data.objects[0]
        topGroup = Object.assign(topGroup, {
          headName: topGroup.name.slice(0,1).toUpperCase()
        })
        this.setData({
          topGroup,
        })
      })
    
    // 获取当日所有用户中生下鱼宝宝最多的用户
    PlayIO.getPlayerData({
      orderBy: '-counts',
    })
    .then(res => {
      let topUser = res.data.objects[0]
      topUser = Object.assign(topUser, {
        headName: JSON.parse(topUser.user).name.slice(0,1).toUpperCase(),
        user: JSON.parse(topUser.user)
      })
      this.setData({
        topUser,
      })
    })
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