Page({
  data: {
    imgUrls: [
      'resources/pic/wine-2.jpg',
      'resources/pic/1.png',
      'resources/pic/2.png',
      'resources/pic/3.png',
      'resources/pic/4.png',
      'resources/pic/5.png',
      'resources/pic/6.png',
      'resources/pic/7.png',
      'resources/pic/8.png'
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
  copyUrl: function (event) {
    console.log('url'+event);
    wx.setClipboardData({
      data: 'www.juhehuli.com',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data); // data
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
      imageUrl: '/image/code-share.png',
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

