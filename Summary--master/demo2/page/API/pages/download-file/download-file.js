// const downloadExampleUrl = require('../../../../config').downloadExampleUrl
const downloadExampleUrl = "http://img5.xiazaizhijia.com/walls/20151015/1440x900_5b600e6bc5e86b6.jpg"

Page({
  data: {
    progress: 0,
    loading: false,
    imageSrc:''
  },
  saveFile() {
    wx.saveFile({
      tempFilePath: this.data.imageSrc,
      success: function (res) {
        var savedFilePath = res.savedFilePath
        console.log("savedFilePath", savedFilePath)
      }
    })
  },
  cancelDownload() {
    if (this.downloadTask) {
      console.log("cancel download image")
      this.downloadTask.abort()
    }
    this.setData({
      progress: 0
    })
  },
  downloadImage: function() {
    var self = this

    self.setData({
      loading: true
    })

    self.downloadTask = wx.downloadFile({
      url: downloadExampleUrl,
      success: function(res) {
        console.log('downloadFile success, res is', res)

        self.setData({
          imageSrc: res.tempFilePath
        })
      },
      fail: function({errMsg}) {
        console.log('downloadFile fail, err is:', errMsg)
      },
      complete: function () {
        self.downloadTask = null
        self.setData({
          loading: false
        })
      }
    })
    self.downloadTask.onProgressUpdate((res) => {
      self.setData({
        progress: Math.round(res.progress *100)
      })
      console.log('下载进度', res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  }
})
