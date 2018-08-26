const requestUrl = require('../../../../config').requestUrl
const duration = 2000

Page({
cancelRequest(){
  if (this.requestTask){
    this.requestTask.abort()
  }
},
makeRequest: function() {
  var self = this

  self.setData({
    loading: true
  })

  this.requestTask = wx.request({
    url: requestUrl,
    method: 'GET',
    data: {
      noncestr: Date.now()
    },
    success: function(result) {
      wx.showToast({
        title: '请求成功',
        icon: 'success',
        mask: true,
        duration: duration
      })
      self.setData({
        loading: false
      })
      console.log('request success', result)
    },

    fail: function({errMsg}) {
      console.log('request fail', errMsg)
      self.setData({
        loading: false
      })
    }
  })
}
})
