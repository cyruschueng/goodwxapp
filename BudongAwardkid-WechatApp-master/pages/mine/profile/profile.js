// pages/mine/profile/profile.js

const app = getApp()
const api = require('../../../api/index.js')
const store = require('../../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    birthyear: 1982,
    birthyearIndex: 0,
    birthyearItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {

    for(let i = 2018; i > 1920; i--){
      this.data.birthyearItems.push(i+'年');
      i == store.client.birthyear && (this.data.birthyearIndex = 2018 - i);
    }
    this.setData({
      birthyearItems: this.data.birthyearItems,
      birthyearIndex: this.data.birthyearIndex,
      nick: store.client.nick,
      gender: store.client.gender,
      birthyear: store.client.birthyear,
      avatarUrl: store.client.avatarUrl
    });
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：选择出生年份事件
  */
  onBirthyearChange: function(e){

    var changeIndex = e.detail.value || -1;

    this.data.birthyearItems = this.data.birthyearItems || [];

    if (changeIndex > -1 && changeIndex < this.data.birthyearItems.length){
      this.setData({
        birthyear: parseInt(this.data.birthyearItems[changeIndex]),
        birthyearIndex: changeIndex
      });
    }
  },

  /*
    说明：保存个人资料事件
  */
  onProfileChange: function(){

    api.client.birthyear(this.data.birthyear, function(data){

      if (data.code == 0){
        wx.navigateBack({
          
        })
        wx.showToast({
          title: '修改成功',
        })
      } else {
        wx.showToast({
          title: data.message,
        })
      }
    });
  }
})