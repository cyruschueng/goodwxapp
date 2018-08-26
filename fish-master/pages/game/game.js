//index.js
//获取应用实例

const
  app = getApp(),
  UserIO = require('../../io/User'),
  PlayIO = require('../../io/Play'),
  GroupIO = require('../../io/Group'),
  constants = require('../../config/constants'),
  utils = require('../../utils/index')

Page({

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  data: {
    musicIcon: '../../static/img/music.png',
    seaHourseImg: '../../static/img/sea-hourse.png',
    dotMove: '',
    intialCounts: 0,
    counts: 0,
    controls: false,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '浙江温州皮革厂',
    author: '无名氏',
    src: 'https://cloud-minapp-3906.cloud.ifanrusercontent.com/1eXoX2VRQQbFuXzX.mp3',
    gid: 0,
    user: null,
    player: null,
  },

  onLoad(opts) {
    console.log(app.globalData.gid)
    this.setData({
      user: JSON.parse(opts.user)
    })

    let params = {
      uid: JSON.parse(opts.user).uid,
      gid: opts.gid || app.globalData.gid,
    }

    PlayIO.getPlayerData(params)
      .then(res => {
        if (res.data.objects.length !== 0) {
          this.setData({
            player: res.data.objects[0],
            intialCounts: res.data.objects[0].counts,
            counts: res.data.objects[0].counts,
          })
        } else {
          this.setData({
            player: {
              gid: opts.gid,
              user: opts.user,
              uid: JSON.parse(opts.user).uid,
            }
          })
        }
      })
  },

  onUnload() {
    let {player, intialCounts, counts, user} = this.data
    let opts = {
      uid: user.uid,
      gid: player.gid,
    }

    // 如果用户是从新的群组加入游戏，需要更新 user 表数据
    UserIO.updateUser({
      groupID: player.gid,
      recordID: user.id,
      groupInfo: {
        name: '未命名群组' + player.gid.slice(0, 4),
        gid: player.gid,
        headName: '未命名群组'.slice(0, 1).toUpperCase(),
      }
    })

    // 更新用户当日的数据
    PlayIO.getPlayerData(opts)
      .then(res => {
        if (res.data.objects.length === 0) {
          PlayIO.addPlayerData({
            user: user,
            gid: player.gid,
            counts,
            group: {
              name: '未命名群组' + player.gid.slice(0, 4),
              headName: '未命名群组'.slice(0, 1).toUpperCase(),
              gid: player.gid
            }
          })
        } else {
          let record = res.data.objects[0]

          PlayIO.updatePlayerData({
            recordID: record.id,
            counts: counts - intialCounts,
          })
        }
      })
    // 更新用户所在群的数据
    GroupIO.getGroups({
      gid: player.gid,
    }).then(res => {
      if (res.data.objects.length === 0) {
        GroupIO.createGroup({
          name: '未命名群组' + player.gid.slice(0, 4),
          counts,
          gid: player.gid,
        })
      } else {
        let record = res.data.objects[0]
        GroupIO.updateGroup({
          counts: counts - intialCounts,
          recordID: record.id,
        })
      }
    })
  },

  touchStart(e) {
    let _this = this
    let {counts} = this.data
    this.audioCtx.play()
    this.setData({
      dotMove: 'dot-move',
      counts: ++counts,
    })
    setTimeout(() => {
      _this.setData({
        dotMove: ''
      })
    }, 200)
  },


  touchEnd: utils.debounce(function(){
    console.log('大于 400 ms 才显示')
    this.audioCtx.seek(0) 
    this.audioCtx.pause()
  }, 400),


})