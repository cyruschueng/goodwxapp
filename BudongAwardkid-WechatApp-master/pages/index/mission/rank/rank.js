// pages/index/mission/rank/rank.js

const app = getApp()
const api = require('../../../../api/index.js')
const store = require('../../../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    avatarUrl: '',
    title: '',
    questionIndex: 0,
    questionRight: 0,
    questionCount: 0,
    playerItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function (options) {

    this.setData({
      avatarUrl: store.client.avatarUrl
    })
    this.missionRank(options.missionId || 0)
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：获取关卡排行榜方法 
  */
  missionRank: function (missionId) {

    var _this = this;

    api.mission.rank(missionId, function (data) {

      data = data.data || {}
      _this.setData({
        title: data.title,
        questionIndex: data.questionIndex,
        questionRight: data.questionRight,
        questionCount: data.questionCount,
        playerItems: data.items || []
      })
    })
  }
})