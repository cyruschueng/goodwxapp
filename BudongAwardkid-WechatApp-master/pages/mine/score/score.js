// pages/mine/score/score.js

const app = getApp()
const api = require('../../../api/index.js')
const store = require('../../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    avatarUrl: '',
    missionCount: 0,
    questionCount: 0,
    rankInAll: 0,
    rankInFriend: 0,
    friendItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {

    this.setData({
      avatarUrl: store.client.avatarUrl
    })
    this.missionLoad()
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：分享到朋友圈事件
  */
  onShareTap: function(){

    wx.showToast({
      title: '分享到朋友圈',
    })
  },

  /*
    说明：加载闯关记录方法
  */
  missionLoad: function(){

    var _this = this;

    api.client.rank(function(data){

      data = data.data || {};
      _this.setData({
        missionCount: data.missionCount,
        questionCount: data.questionCount,
        rankInAll: data.rankInAll,
        rankInFriend: data.rankInFriend,
        friendItems: data.friends || []
      })
    })
  }
})