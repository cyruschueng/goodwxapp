let app = getApp();
Page({
  data: {
    timeNum: 5,
    // picUrl: 'https://normal.zhutuitui.com/file/gif_2_2.gif',
    picUrl:'/img/themePage.gif'
  },
  onLoad: function (options) {
    this.delayRoute();
    console.log(app.globalData);
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // X秒后跳转
  delayRoute() {
    let that = this;
    let timeNum = this.data.timeNum;
    let time = setInterval(x => {
      timeNum--;
      that.setData({
        timeNum: timeNum
      })
      if (timeNum == 0) {
        wx.redirectTo({
          url: '/pages/interactPage/interactPage',
        })
        clearInterval(time);
      }
    }, 1000)
  },
  onShareAppMessage() {
    let that = this;
    let remain_count = that.data.remain_count;
    return {
      title: '百诚先生派送好礼！圣诞礼物惊喜降临！分享越多机会越多！',
      imageUrl: '/img/sharePage.jpg',
      path: '/pages/indexPage/indexPage',
      success: function (res) {
        let shareTickets = res.shareTickets;
        if (!res.shareTickets) {
          app.errorHide(that, '转发到微信群里才能抽奖哦', 3000)
        } else {
          wx.login({
            success(x) {
              let code = x.code;
              wx.getShareInfo({
                shareTicket: shareTickets,
                success(res) {
                  let iv = res.iv;
                  let encryptedData = res.encryptedData;
                  let requestData = {
                    url: app.globalData.url + '/api/wechat/incrementCount',
                    data: {
                      openid: app.globalData.openid,
                      code: code,
                      iv: iv,
                      encryptedData: encryptedData
                    }
                  }
                  app.httpPost(that, requestData, res => {
                    console.log('分享结果', res)
                    let response = res.data.data;
                    let share_qun_count = response.share_qun_count;
                  })
                }
              })
            }
          })
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败', res)
      }
    }
  },
})  