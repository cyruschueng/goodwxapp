Page({
  data: {
    imgUrls: [
      'https://cdn.juhehuli.com/wine-2.jpg',
      'https://cdn.juhehuli.com/1.png',
      'https://cdn.juhehuli.com/2.png',
      'https://cdn.juhehuli.com/3.png',
      'https://cdn.juhehuli.com/4.png',
      'https://cdn.juhehuli.com/5.png',
      'https://cdn.juhehuli.com/6.png',
      'https://cdn.juhehuli.com/7.png',
      'https://cdn.juhehuli.com/8d.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000
  },
  onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }, 
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  saveImgToPhotosAlbumTap: function () {
    wx.downloadFile({
      url: 'https://cdn.juhehuli.com/code-share.jpeg',
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res)
            console.log('fail');
            wx.showToast({
              title: '保存失败',
              image: '/image/fail.png',
              duration: 2000
            })
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })

  },
  callMe: function (event) {
    console.log('call me phone'+event);
    wx.makePhoneCall({
      phoneNumber: '18026276507' //仅为示例，并非真实的电话号码
    })
  },
  copyEmail: function (event) {
    console.log('email'+event);
    wx.setClipboardData({
      data: 'hl@juhehuli.com',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data); // data
            //复制邮箱到剪切板
            wx.showToast({
              title: '复制到剪切板',
              icon: 'success',
              duration: 2000
            });

          }
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log('from menu')
    }
    return {
      title: '分享给朋友',
      path: 'page/index/index',
      imageUrl:'/image/code-share.png',
      success: function (res) {
        // 转发成功
        console.log('ok');

        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        
        if (res.shareTickets) {
          // 获取转发详细信息
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              res.errMsg; // 错误信息
              res.encryptedData;  //  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
              res.iv; // 加密算法的初始向量
              console.log(res);
            },
            fail() { },
            complete() { }
          });
        }
        
        
      },
      fail: function (res) {
        // 转发失败
        console.log('fail');
      }
    }
  }

})

