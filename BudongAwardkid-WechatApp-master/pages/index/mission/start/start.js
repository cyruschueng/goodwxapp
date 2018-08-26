// pages/index/mission/start/start.js

const app = getApp()
const api = require('../../../../api/index.js')
const store = require('../../../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    missionInfo: { }
  },
  
  /*
    说明：页面加载事件
  */
  onLoad: function (options) {

    this.missionDetail(options.missionId || 0)
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：开始答题点击事件
  */
  onMissionStart: function () {

    wx.navigateTo({
      url: '/pages/index/mission/guess/guess'
    })
  },

  /*
    说明：谁还玩过点击事件
  */
  onMissionRank: function () {

    wx.navigateTo({
      url: '/pages/index/mission/rank/rank?missionId=' + (this.data.missionInfo.id || 0)
    })
  },

  /*
    说明：获取关卡详情方法 
  */
  missionDetail: function(missionId){

    var _this = this;

    api.mission.detail(missionId, function(data){

      _this.setData({
        missionInfo: data.data || {}
      })
    })
  }
})