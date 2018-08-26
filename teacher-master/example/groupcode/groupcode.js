var IMG_URL = 'https://campus002.oss-cn-beijing.aliyuncs.com/groupcode.png'//图片链接 https开头  
Page({
  data: {
    img_url: IMG_URL
  },
  saveImgToPhotosAlbumTap: function () {
    wx.downloadFile({
      url: IMG_URL,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })

  }
})



