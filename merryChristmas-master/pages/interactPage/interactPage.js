Page({
  data: {
    // picUrl: 'https://normal.zhutuitui.com/file/bg_gif.gif',
    picUrl: "/img/interactPage.gif",
    musicUrl: '/img/music.mp3',
    appliances: [
      { name: '冰箱', id: 0, left: 248, top: 324, width: 150, height: 162, rotate: 0 },
      { name: '空调', id: 1, left: 410, top: 440, width: 180, height: 80, rotate: 0 },
      { name: '热水器', id: 2, left: 210, top: 500, width: 170, height: 90, rotate: 0 },
      { name: '集成灶', id: 3, left: 440, top: 574, width: 150, height: 186, rotate: 0 },
      { name: '彩电', id: 4, left: 150, top: 630, width: 172, height: 128, rotate: 0 },
      { name: '洗衣机', id: 5, left: 400, top: 254, width: 150, height: 170, rotate: 0 },
    ]
  },
  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onReady() {

  },
  // 点击家电
  appliances(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/animationPage/animationPage?id=' + id,
    })
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