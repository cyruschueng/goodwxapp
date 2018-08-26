const util = require('../../utils/util.js')
Page({
  data: {
    searchValue: '',
    currentState: false,
    backgroundMake: '',
    backgroundNotMake: '',
    code:''
  },
  searchHandle: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
    if (this.data.searchValue === '') {
      wx.showModal({
        title: '提示',
        content: '请输入要比的币',
      })
    } else {
      this.setData({
        currentState: true
      })
      
      var that = this;

      util.requestGet(`main/getCoin/${this.data.searchValue}`, function (response) {
         that.setDate({
           code:that.data.searchVallue
         })
      })
    }
  },
  isMakeSelected: function() {
    this.setData({
      backgroundMake: '#f00',
      backgroundNotMake: ''
    })
  },
  isNotMakeSelected: function () {
    this.setData({
      backgroundMake: '',
      backgroundNotMake: '#f00'
    })
  },
  applySth: function () {
    wx.navigateTo({
      url: '../create/create'
    })
  }
})
