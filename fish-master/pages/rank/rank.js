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
    groups: null,
    user: null,
  },

  onLoad(opts) {

  },

  onShow() {
    this.getData()
  },

  getData() {
    // 获取用户数据
    let userInfo = wx.BaaS.storage.get('userinfo')
    UserIO.getUser({uid: userInfo.id})
      .then(res => {
        if (res.data.objects.length) {
          let data = res.data.objects[0]
          let user = Object.assign(data, {
            groups_info: data.groups_info.map
            (item => {return JSON.parse(item)}),
          })
          this.setData({user: data})
        }
      })
      .catch(res => {})

    // 获取当日全球的生下鱼宝宝个数最多的群组和所有的群组
    GroupIO.getGroups({ gid: '' })
      .then(res => {
        let topGroup = res.data.objects[0]
        topGroup = Object.assign(topGroup, {
          headName: topGroup.name.slice(0, 1).toUpperCase()
        })
        this.setData({
          topGroup,
          groups: res.data.objects,
        })
      })

    // 获取当日所有用户中生下鱼宝宝最多的用户
    PlayIO.getPlayerData({
      orderBy: '-counts',
    })
      .then(res => {
        let topUser = res.data.objects[0]
        topUser = Object.assign(topUser, {
          headName: JSON.parse(topUser.user).name.slice(0, 1).toUpperCase(),
          user: JSON.parse(topUser.user)
        })
        this.setData({
          topUser,
        })
      })
  },

  play() {
    let {user} = this.data
    let url = constants.ROUTES.GAME + '?user=' + JSON.stringify(user) + '&gid=' + app.globalData.gid
    wx.navigateTo({ url })
  }

})