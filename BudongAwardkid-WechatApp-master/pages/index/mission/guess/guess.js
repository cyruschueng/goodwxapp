// pages/index/mission/guess/guess.js

const app = getApp()
const api = require('../../../../api/index.js')
const store = require('../../../../utils/store.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    coins: 120,
    playing: false,
    missionInfo: {
      header: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520788630722&di=efdf0233b520d2dc9d6907acfc6673ce&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01df25579edca20000018c1bce2efb.png',
      nick: '申栩',
      sex: '男性',
      age: '1983',
      duration: 2,
      max: 12
    }
  },

  /*
    说明：页面加载事件
  */
  onLoad: function (options) {

    this.questionNext(options.missionId);
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明： 输入内容事件
  */
  onSubjectInput: function(e){

    this.data.missionInfo.answer = e.detail.value;
    this.setData({
      missionInfo: this.data.missionInfo
    })
  },

  /*
    说明： 按下键盘完成事件
  */
  onSubjectDone: function(e){

    var _this = this;

    if (e.detail.value){
      if (e.detail.value == this.data.missionInfo.title){
        if (this.data.missionInfo.questionIndex >= this.data.missionInfo.questionCount){
          wx.navigateTo({
            url: '/pages/index/mission/rank/rank',
          })
        } else {
          wx.showModal({
            title: '答题结果',
            content: '恭喜！答对了',
            confirmText: '下一题',
            cancelText: '放弃',
            success: function (res) {
              if (res.confirm) {
                _this.setData({
                  playing: false
                });
                _this.questionNext(_this.data.missionInfo.missionId);
              } else if (res.cancel) {
                wx.navigateBack()
              }
            }
          })
        }
      } else {
        wx.showModal({
          title: '答题结果',
          content: '很遗憾！答错了',
          confirmText: '再试试',
          cancelText: '放弃',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
              wx.navigateBack()
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '答案不能为空',
      })
    }
  },

  /*
    说明：显示提示事件
  */
  onTip: function(){

    if (this.data.coins >= 30){
      this.setData({
        coins: this.data.coins - 30
      })
      wx.showModal({
        title: '答案提示',
        content: this.data.missionInfo.tip,
        showCancel: false,
        confirmText: '知道了'
      })
    } else {
      wx.showToast({
        title: '金币不足',
      })
    }
  },

  /*
    说明：跳过这一题事件
  */
  onSkip: function(){

    if (this.data.missionInfo.questionIndex >= this.data.missionInfo.questionCount) {
      wx.showToast({
        title: '已是最后一题',
      })
    }else{
      if (this.data.coins >= 30) {
        this.setData({
          playing: false,
          coins: this.data.coins - 30
        });
        this.questionNext(this.data.missionInfo.missionId);
      } else {
        wx.showToast({
          title: '金币不足',
        })
      }
    }
  },

  /*
    说明：重听这一题事件
  */
  onReplay: function () {

    if (this.data.coins >= 30) {
      this.setData({
        playing: false,
        coins: this.data.coins - 30
      });
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(this.questionPlay, 100)
    } else {
      wx.showToast({
        title: '金币不足',
      })
    }
  },

  /*
    说明： 加载下一题方法
  */
  questionNext: function(missionId){

    var _this = this;

    api.mission.guess.next(missionId, function (data) {

      _this.setData({
        missionInfo: data.data || {}
      })
      _this.timer && clearTimeout(_this.timer);
      _this.timer = setTimeout(_this.questionPlay, 1000)
    })
  },

  /*
    说明： 播放音频方法
  */
  questionPlay: function(){

    this.setData({
      playing: true
    });
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(this.questionStop, 11000)
  },

  /*
    说明： 停止播放音频方法
  */
  questionStop: function(){

    this.setData({
      playing: false
    });
  }
})