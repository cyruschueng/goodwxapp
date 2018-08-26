function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowWidth * 225 / 320;
import { $wuxToast } from '../../../packages/@wux/components/wux'
Page({
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    src: '',
    danmuList: [
      {
        text: '祝福你们白头到老',
        color: '#ff7777',
        time: 1
      },
      {
        text: '祝永结同疏',
        color: '#ff7777',
        time: 3
      }],
      width: width,
      height: height,
      input: '',
      url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = options.url;
    if (url) {
      this.setData({ url: url })
    }
  },

  bindInputBlur: function (e) {
    this.inputValue = e.detail.value,
    this.setData({
      input: ''
    })
  },

  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu: function () {
    if (!this.inputValue) {
      $wuxToast.show({
        type: 'text',
        timer: 1500,
        color: '#fff',
        text: '请输入弹幕内容',
        success: () => console.log('请输入弹幕内容')
      })
      return false;
    }
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: '#FF7777'
    })
    this.inputValue = '';
  }
})