import { $wuxToptips } from '../../../packages/@wux/components/wux';
import { $wuxDialog } from '../../../packages/@wux/components/wux';
import { $wuxToast } from '../../../packages/@wux/components/wux'
import WxValidate from '../../../common/assets/plugins/WxValidate';
import { Token } from '../../../utils/token.js';
import api from '../../../api/api_v1.js'
import { Cache } from '../../../utils/cache.js';
import util from '../../../utils/util.js';
const qiniuUploader = require("../../../libs/qiniuUploader");
var playTimeInterval
var recordTimeInterval
var cache = new Cache();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      nickname: '',  // 昵称
      bless: '',     // 祝福
    },
    recording: false,
    playing: false,
    hasRecord: false,
    recordTime: 0,
    playTime: 0,
    formatedRecordTime: '00:00:00',
    formatedPlayTime: '00:00:00',
    tempFilePath: '',
    is_voice: false
  },
  card_id: 0,


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();  // 先初始化验证器
    this.card_id = +options.card_id;
    if (!this.card_id) {
      wx.showToast({
        title: '系统错误',
        icon: 'none',
        duration: 1000,
        complete: function () {
          wx.navigateBack({ delta: 1 });
        }
      });
    }    
  },

  /**
   * 初始化验证器
   */
  initValidate: function () {
    this.WxValidate = new WxValidate({
      nickname: { required: true }
    }, {
        nickname: {
          required: '请输入昵称',
        }
      })
  },

  /**
   * 表单提交
   */
  submitForm: function (e) { // 1 验证登录 2 验证数据 3 提交
    let token = cache.get('token');
    console.log('token_submit', token);
    if (!token) {
      $wuxDialog.alert({
        title: '登录失效',
        content: '点击确认重新登录',
        onConfirm(e) {
          let tk = new Token();
          tk.getTokenFromServer((cb) => {
            cache.set('token', cb.token, 7000);
          });
        },
      });
      return false;
    }
    console.log('submitForm', e);
    let that = this;
    const params = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }
    let data = {
      form_id: e.detail.formId,
      nickname: params.nickname,
      card_id: this.card_id
    } 
    if (data.card_id < 96) {
      this.showToptips({ msg: '主题测试，不保存数据！' });
      return false;
    }
    if (this.data.is_voice) {  // 语音祝福
      if (!this.data.tempFilePath) {
        this.showToptips({msg:'录一段祝福的话吧'})
        return false;
      }
      // this.saveQiniu(this.data.tempFilePath, data);
      this.saveVoice(this.data.tempFilePath, data);
    } else {  // 文字祝福
      if (!params.content) {
        this.showToptips({msg:'请输入祝福的话语'})
        return false;
      }
      data.cate_id = 1;
      data.content = params.content;
      this.saveBless(data);
    }

  },

  saveVoice: function (url, data) {
    let that = this;
    wx.uploadFile({
      url: 'https://www.juhuibei.com/api/v1/save_voice',
      filePath: url,
      name: 'voice',
      formData: data,
      success: function (res) {
        console.log('saveVoice', res.data);
        let url_df = res.data.replace("\\", "");
        url_df = "https://www.juhuibei.com/card/voice/" + url_df;
        url_df = url_df.replace("\"", "");
        url_df = url_df.replace("\"", "");
        if (url_df) {
          data.cate_id = 2;
          data.content = url_df;
          that.saveBless(data);
        }
      }
    })
  },

  saveBless: function (data) {
    let that = this;
    console.log('saveBless', data);
    api.saveBless({
      method: 'post',
      data: data,
      success: (res) => {
        console.log('saveBless', res);
        let url = 'https://www.juhuibei.com/card/' + that.card_id;
        if (res.data.res === 0) {
          $wuxToast.show({
            type: 'text',
            timer: 1000,
            color: '#FFFFF',
            text: '提交成功',
            success: () => wx.redirectTo({ url: '../view/index?url=' + url })
          })
        } else if (res.data.res === 1) {
          $wuxToast.show({
            type: 'text',
            timer: 2000,
            color: '#FF4444',
            text: '您已经祝福过了',
            success: () => wx.redirectTo({ url: '../view/index?url=' + url })
          })
        }
      }
    })
  },

  /**
   * 错误提示
   */
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },


  onHide: function () {
    if (this.data.playing) {
      this.stopVoice()
    } else if (this.data.recording) {
      this.stopRecordUnexpectedly()
    }
  },
  startRecord: function () {
    this.setData({ recording: true })

    var that = this
    recordTimeInterval = setInterval(function () {
      var recordTime = that.data.recordTime += 1
      that.setData({
        formatedRecordTime: util.formatTime(that.data.recordTime),
        recordTime: recordTime
      })
    }, 1000)
    wx.startRecord({
      success: function (res) {
        that.setData({
          hasRecord: true,
          tempFilePath: res.tempFilePath,
          formatedPlayTime: util.formatTime(that.data.playTime)
        })
      },
      complete: function () {
        that.setData({ recording: false })
        clearInterval(recordTimeInterval)
      }
    })
  },
  stopRecord: function () {
    wx.stopRecord()
  },
  stopRecordUnexpectedly: function () {
    var that = this
    wx.stopRecord({
      success: function () {
        console.log('stop record success')
        clearInterval(recordTimeInterval)
        that.setData({
          recording: false,
          hasRecord: false,
          recordTime: 0,
          formatedRecordTime: util.formatTime(0)
        })
      }
    })
  },
  playVoice: function () {
    var that = this
    playTimeInterval = setInterval(function () {
      var playTime = that.data.playTime + 1
      console.log('update playTime', playTime)
      that.setData({
        playing: true,
        formatedPlayTime: util.formatTime(playTime),
        playTime: playTime
      })
    }, 1000)
    wx.playVoice({
      filePath: this.data.tempFilePath,
      success: function () {
        clearInterval(playTimeInterval)
        var playTime = 0
        console.log('play voice finished')
        that.setData({
          playing: false,
          formatedPlayTime: util.formatTime(playTime),
          playTime: playTime
        })
      }
    })
  },
  pauseVoice: function () {
    clearInterval(playTimeInterval)
    wx.pauseVoice()
    this.setData({
      playing: false
    })
  },
  stopVoice: function () {
    clearInterval(playTimeInterval)
    this.setData({
      playing: false,
      formatedPlayTime: util.formatTime(0),
      playTime: 0
    })
    wx.stopVoice()
  },
  clear: function () {
    clearInterval(playTimeInterval)
    wx.stopVoice()
    this.setData({
      playing: false,
      hasRecord: false,
      tempFilePath: '',
      formatedRecordTime: util.formatTime(0),
      recordTime: 0,
      playTime: 0
    })
  },

  switchChange: function (e) {
    console.log(e);
    this.setData({
      is_voice: e.detail.value
    })
  },

  /**
  * 将录音保存到七牛
  */
  saveQiniu: function (src, data) {
    console.log(1);
    let that = this;
    // 先获取上传TOKEN
    api.getUploadToken({
      success: (res_token) => {
        if (res_token.data.res === 0) {
          console.log('token', res_token.data.data)
          // 上传到七牛
          qiniuUploader.upload(src, (res) => {
            console.log('qiniuUploader', res.imageURL);
            let url = res.imageURL;
            if (url) { // 直接调用上一个页面的setData()方法
              data.cate_id = 2;
              data.content = url;
              that.saveBless(data);
            }
          }, (error) => {
            console.log('error: ' + error);
          }, {
              region: 'SCN',
              domain: 'qiniu.juhuibei.com', // bucket 域名，下载资源时用到。
              // key: 'customFileName.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
              uptoken: res_token.data.data,
            });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})