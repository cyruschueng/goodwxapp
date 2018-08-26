// pages/index/index.js

const app = getApp()
const api = require('../../api/index.js')
const store = require('../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    missionPageId: 1,
    missionIsEnd: false,
    missionItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {
    
    // wx.navigateTo({
    //   url: '/pages/index/mission/guess/guess?missionId=2'
    // })
    //  this.missionLoad()
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function(res){

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：任务关卡点击事件
  */
  onMissionItemTap: function(obj){

    wx.navigateTo({
      url: '/pages/index/mission/start/start?missionId=' + obj.currentTarget.dataset.missionId
    })
  },

  /*
    说明：上拉刷新事件
  */
  onReachBottom: function () {

    if (!this.data.missionIsEnd) {
      this.setData({
        missionPageId: this.data.missionPageId + 1
      })
      this.missionLoad()
    }
  },

  /*
    说明：加载精选关卡方法
  */
  missionLoad: function(){

    var _this = this;
    api.mission.list(this.data.missionPageId, function (data) {

      _this.data.missionPageId == 1 && (_this.data.missionItems = [])
      _this.data.missionItems = (_this.data.missionItems || []).concat((data.data || {}).items || [])
      _this.setData({
        missionIsEnd: (data.data.pageCount <= _this.data.missionPageId), 
        missionItems: _this.data.missionItems
      })
    })
  }
})
