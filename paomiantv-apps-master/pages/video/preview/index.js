const app = getApp()
Page({
  data: {
    videoUrl: null,
    imgUrl: null
  },
  onLoad: function (options) {
    this.setData({
      videoUrl: options.videoUrl,
      imgUrl: options.imgUrl
    })

    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '泡面春节天天乐',
      path: '/pages/video/preview/index?videoUrl=' + this.data.videoUrl + "&imgUrl=" + this.data.imgUrl,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  downloadVideo: function () {



    wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete: function (res) {
              console.log(res)
            }
          })
        }
      }
    })



    wx.showLoading({
      title: '正在下载...',
      mask: true
    })

    const downloadTask = wx.downloadFile({
      url: this.data.videoUrl,
      success: res => {
        console.log("download =" + JSON.stringify(res))
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function () {
            wx.hideLoading()
            app.showMsg("视频文件已经保存");
          },
          fail: res => {
            wx.hideLoading()
            app.showMsg("视频文件保存出错，" + res.errMsg);
            console.log("download =" + JSON.stringify(res))
          }
        })
      },
      fail: res => {
        wx.hideLoading()
        console.log(this.data.videoUrl + ",失败：" + JSON.stringify(res));
      }
    })

    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已经下载的数据长度', res.totalBytesWritten)
      console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
    })
  },

  shareVideo: function () {
    app.showMsg("点击右上角「···」分享给好友", );
  }
})