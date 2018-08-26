//index.js
//获取应用实例

const
  app = getApp(),
  UserIO = require('../../io/User'),
  PlayIO = require('../../io/Play'),
  constants = require('../../config/constants')

Page({
  data: {
    user: null,
    // http://www.easyicon.net/language.en/iconsearch/wooden%20fish/
    bannerBgList: [
      '../../static/img/blue-fish.png',
      '../../static/img/demo-fish.png',
      '../../static/img/yellow-fish.png',
      '../../static/img/ugly-fish.png',
    ],
    totalCounts: 0,
    rankImg: '../../static/img/rank.png',
  },

  onLoad(opts) {
    // this.getUserInfo()
  },

  onShow() {
    this.getUserInfo()
  },

  getUserInfo() {
    // 首次进入页面先判断用户是否为新用户
    let userInfo = wx.BaaS.storage.get('userinfo')
    UserIO.getUser({uid: userInfo.id})
      .then(res => {
        // console.log('user', res)
        if (!res.data.objects.length) {
          UserIO.addUser()
          this.setData({
            user: {
              name: userInfo.nickName,
              uid: userInfo.id,
              avatar_url: userInfo.avatarUrl,
              groups_id: null,
              groups_info: null,
            }
          })
        } else {
          let data = res.data.objects[0]
          let user = Object.assign(data, {
            groups_info: data.groups_info.map
            (item => {return JSON.parse(item)}),
          })
          this.setData({user: data})

          // 获取用户当天在所有群组的生崽数的数据
          PlayIO.getPlayerData({
            uid: userInfo.id,
          })
          .then(res => {
            let totalPlayData = res.data.objects
            let totalCounts = 0
            totalPlayData.forEach(item => {
              totalCounts += item.counts
            })

            this.setData({
              totalCounts,
            })
          })
        }
      })
      .catch(res => {})
  },

  getUserPlayData() {
    let {user} = this.data
    let opt = {
      uid: user.uid,
    }

  },

  shareGame(e) {
    let url = constants.ROUTES.SHARE
    wx.navigateTo({url})
  },

  goToRank(e) {
    let url = constants.ROUTES.RANK
    wx.navigateTo({url})
  },

  goToGroup(e) {
    let {user} = this.data
    let gid = e.target.dataset.gid
    let url = constants.ROUTES.GROUP + '?gid=' + gid + '&user=' + JSON.stringify(user)
    wx.navigateTo({url})
  }
})