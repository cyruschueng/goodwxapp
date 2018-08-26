// pages/mine/mission/detail/detail.js

const app = getApp()
const api = require('../../../../api/index.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    missionId: 1,
    questionItems: []
  },

  /*
    说明：页面加载事件
  */
  onLoad: function () {

    this.questionLoad();
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index', function(res){

      console.log(res)
    })
  },

  /*
    说明：播放题目事件
  */
  onQuestionPlay: function(e){

    for (let i = 0; i < this.data.questionItems.length; i++){
      if (this.data.questionItems[i].id == e.currentTarget.dataset.questionId){
        this.data.questionItems[i].playing = true;
      } else {
        this.data.questionItems[i].playing = false;
      }
    }
    this.setData({
      questionItems: this.data.questionItems
    })
  },

  /*
    说明：删除题目事件
  */
  onQuestionDelete: function(e){

    var _this = this;

    api.client.mission.question._delete(e.currentTarget.dataset.questionId, function (data) {

      for (let i = 0; i < _this.data.questionItems.length; i++ ){
        if (_this.data.questionItems[i].id == e.currentTarget.dataset.questionId){
          _this.data.questionItems.splice(i,1);
        }
      }
      _this.setData({
        questionItems: _this.data.questionItems
      });
      wx.showToast({
        title: '删除成功',
      })
    })
  },

  /*
    说明：添加新题目事件
  */
  onQuestionAdd: function(){

    wx.navigateTo({
      url: '/pages/mine/mission/question/add/add?missionId=' + this.data.missionId,
    })
  },

  /*
    说明：发布关卡
  */
  onShareToTimeline: function(){

    wx.showToast({
      title: '保存图片，分享到朋友圈',
    })
  },

  /*
    说明：加载关卡题目
  */
  questionLoad: function(){

    var _this = this;

    api.client.mission.question.list(this.data.questionId, function(data){

      _this.data.questionItems = (data.data || {}).items || [];
      _this.setData({
        questionItems: _this.data.questionItems
      })
      console.log(data)
    });
  }
})