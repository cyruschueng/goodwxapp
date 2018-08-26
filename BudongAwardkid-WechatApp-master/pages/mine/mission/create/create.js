// pages/mine/mission/create/create.js

const app = getApp()
const api = require('../../../../api/index.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    title: ''
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {

  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：分享回调事件
  */
  onTitleInput: function(e){

    this.setData({
      title: e.detail.value || ''
    })
  },

  /*
    说明：保存并录制题目
  */
  onCreateTap: function(){

    api.client.mission.create(this.data.title, function(data){

      if (data.code == 0 ){
        wx.navigateTo({
          url: '/pages/mine/mission/detail/detail?missionId=' + (data.data.missionId || 0),
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    });
  },

  onSubmit: function(){

    wx.showToast({
      title: 'asdf ',
    })
  }
})
