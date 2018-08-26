// const uploadFileUrl = require('../../../../config').uploadFileUrl
const uploadFileUrl = "http://localhost:8080/upload_image"

Page({
  data: {
    progress: 0,
    loading: false
  },
cancelRequest() {
  if (this.uploadTask) {
    console.log("cancel upload image")
    this.uploadTask.abort()
  }
  this.setData({
    progress: 0
  })
},
  chooseImage: function () {
    var self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        var imageSrc = res.tempFilePaths[0]
        self.setData({
          loading: true
        })

self.uploadTask = wx.uploadFile({
  url: uploadFileUrl,
  filePath: imageSrc,
  name: 'image',
  success: function (res) {
    wx.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 1000
    })

    self.setData({
      imageSrc,
      loading: false
    })
  },
  fail: function ({ errMsg }) {
    console.log('uploadImage fail, errMsg is', errMsg)
  },
  complete: function () {
    self.uploadTask = null
  }
})

self.uploadTask.onProgressUpdate((res) => {
  self.setData({
    progress: res.progress
  })
  console.log('上传进度', res.progress)
  // console.log('已经上传的数据长度', res.totalBytesSent)
  // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
})
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  }
})
