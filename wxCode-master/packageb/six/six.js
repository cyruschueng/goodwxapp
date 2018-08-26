// pages/six/six.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    node: [
      {
        name: 'hr',

      }
    ],
    items: [
      {
        name: 'usa', value: 'amerace'
      },
      {
        name: 'chn', value: 'china', checked: 'true'
      },
      {
        name: 'bra', value: 'basisi'
      },
      {
        name: 'jpn', value: 'japen'
      },
    ],
    list: [
      {
        value: 'a'
      },
      {
        value: 'b'
      },
      {
        value: 'c'
      },
      {
        value: 'd'
      },
      {
        value: 'e'
      },
      {
        value: 'f'
      }
    ],
    focus: false,
    inputcontent: '',
    country: ['usa', 'chn', 'jpn', 'bas'],
    index: 0,
    date: '2018-02-02',
    obj: [
      {'a': 'a'},
      {'b': 'b'},
      {'c': 'c'}
    ],
    rkey: 'a',
    time: '07:23',
    region: ['天津市', '天津市', '河东区'],
    customItem: ['省', '市', '县'],
    multiArray: [
      ['a', 'b'],
      ['c', 'd', 'e', 'f', 'g' ],
      ['h', 'i', 'j']
    ],
    multiIndex: [0, 0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  checkboxChange: function (e) {
    console.log('current: ' + e.detail.value)
  },
  formSubmit(e) {
    console.log(e.detail.value)
  },
  formReset(e) {
    console.log('reset')
  },
  bindButtonTap () {
    this.setData({
      focus: true
    })
  },
  syncdata (e) {
    this.setData({
      inputcontent: e.detail.value
    })
  },
  accordbt (e) {
    console.log(e)
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  timechange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  regionchange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  multiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  multiPickerColumnChange(e) {
    console.log(e)
  }
})