// pages/mine/mission/question/add/add.js

const app = getApp()
const api = require('../../../../../api/index.js')

Page({

  /*
    说明：页面的初始数据
  */
  data: {
    missionId: 0,
    title: '',
    tip: '',
    voiceRecording: false,
    voicePlaying: false,
    voiceFileName: '',
    categoryIndex: 0,
    categoryItems: ['电视剧','电影','广告','电视节目','歌曲','歌手','其他']
  },

  /*
    说明：页面加载事件
  */
  onLoad: function (options) {

    console.log(options)
    this.setData({
      missionId: options.missionId || 0
    })
  },

  /*
    说明：分享回调事件
  */
  onShareAppMessage: function (res) {

    return api.wechat.getShareMessage('分享标题', '/pages/index/index')
  },

  /*
    说明：开始录音事件
  */
  onVoiceRecord: function(){

    var _this = this;
    var _start = function(){

      wx.startRecord({
        success: function (res) {

          _this.setData({
            voiceFileName: res.tempFilePath
          })
        },
        fail: function (res) {

          wx.showToast({
            title: res.errMsg,
          })
        }
      })
      _this.setData({
        voiceRecording: true
      })
    }
    var _over = function(){

      wx.stopRecord()
      _this.setData({
        voiceRecording: false
      })
    }

    if (this.data.voiceRecording){
      _over()
    } else {
      _start()
      setTimeout(_over, 2000)
    }
  },

  /*
    说明：播放录音事件
  */
  onVoicePlay: function(){

    var _this = this;

    if (this.data.playing){
      wx.stopVoice()
      this.setData({
        voicePlaying: false
      })
    } else {
      wx.playVoice({
        filePath: this.data.voiceFileName,
        complete: function () {

          _this.setData({
            voicePlaying: false
          })
        }
      })
      this.setData({
        voicePlaying: true
      })
    }
  },

  /*
    说明： 选择题目分类事件
  */
  onCategoryChange: function (e) {

    var changeIndex = e.detail.value || -1;

    this.data.categoryItems = this.data.categoryItems || [];

    if (changeIndex > -1 && changeIndex < this.data.categoryItems.length) {
      this.setData({
        categoryIndex: changeIndex
      });
    }
  },

  /*
    说明： 题目答案输入事件
  */
  onTitleInput: function (e) {

    this.setData({
      title: e.detail.value || ''
    })
  },

  /*
    说明： 点击键盘下一项事件
  */
  onTitleNext: function(){

    this.setData({
      titleFocus: false,
      tipFocus: true
    })
  },

  /*
    说明： 答案提示输入事件
  */
  onTipInput: function (e) {

    this.setData({
      tip: e.detail.value || ''
    })
  },

  /*
    说明： 保存题目事件
  */
  onQuestionSaveTap: function(){

    var _this = this;

    this.setData({
      titleFocus: false,
      tipFocus: false
    })
    
    if (!this.data.voiceFileName){
      wx.showToast({
        title: '请先录制音频',
      })
    } else if (!this.data.title){
      wx.showToast({
        title: '题目答案不能为空',
      })
    } else if (!this.data.tip) {
      wx.showToast({
        title: '答案提示不能为空',
      })
    } else {
      api.client.mission.question.add(
        this.data.missionId, 
        this.data.title, 
        this.data.tip,
        this.data.categoryItems[this.data.categoryIndex], 
        this.data.voiceFileName, function(data){

        wx.navigateBack({
          
        })
        wx.showToast({
          title: '添加成功',
        })
      })
    }
  }

})