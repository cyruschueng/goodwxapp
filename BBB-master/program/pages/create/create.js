const util = require('../../utils/util.js')
Page({
  data: {
    inputValue: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  submit: function () {
    if (this.data.inputValue === '') {
      wx.showToast({
        title: '关键字不能为空',
        duration: 2000
      })  
    } else {
      let that = this;
      let key = String(this.data.inputValue).toUpperCase();
      console.log('keyvalue:'+key)
      util.requestGet(`main/getCoin/${key}`, function (response) {
        console.log(JSON.stringify(response))
        if (response.ok === false) {
          wx.showModal({
            title: '提示',
            content: '已经提交审核,请耐心等待.加速提交,请联系微信客服~',
            success: function (res) {
              wx.setStorageSync('hasClick', true);
              if (res.confirm) {
                wx.navigateTo({
                  url: "/pages/voteresult/voteresult"
                });
              } else if (res.cancel) {
                wx.navigateTo({
                  url: "/pages/voteresult/voteresult"
                });
              }
            }
          })
        } else {
          wx.showToast({
            title: "该币已存在",
            icon: 'loading',
            duration: 1000,
            mask: true
          });
        }
      })
     
    }
  }
})
