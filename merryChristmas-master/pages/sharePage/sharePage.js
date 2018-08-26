let app = getApp();
Page({
  data: {
    shareButton: true,
    remain_count: 0,
    rewardResult: '遗憾,下次加油吧'
  },
  onLoad: function (options) {
    let that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    app.rewardLog(this);

  },
  // 分享
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
                    if (share_qun_count % 2 == 1 || response.remain_count == 0) {
                      app.showModel('congratulation', '加油,再分享一个不同的群就可以增加抽奖机会了')
                    } else if (share_qun_count % 2 == 0) {
                      app.showModel('congratulation', '恭喜你,您目前有' + response.remain_count + '次抽奖机会')
                    }
                    that.setData({
                      remain_count: response.remain_count
                    })
                  })
                }
              })
            }
          })
        }
        // 模版消息推送
        if (that.data.formId) {
          app.getAccess_token(that, that.data.formId)
        }
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败', res)
      }
    }
  },
  // 去绑定手机号码
  goToBindPhone() {
    wx.navigateTo({
      url: '/pages/phoneInfo/phoneInfo',
    })
  },
  // 查看抽象记录
  goRewardLog() {
    wx.navigateTo({
      url: '/pages/rewardLog/rewardLog',
    })
  },
  // 抽奖
  reward() {
    let that = this;
    let remain_count = this.data.remain_count;
    if (remain_count == 0) {
      app.showModel('您没有抽奖机会', '赶快分享获得分享机会吧!')
      return
    }
    let requestData = {
      url: app.globalData.url + '/api/wechat/drawPrize',
      data: {
        openid: app.globalData.openid
      }
    }
    app.httpPost(that, requestData, res => {
      console.log('抽奖结果', res)
      let response = res.data.data;
      if (response.status_code == 0) {
        app.showModel('对不起', '您的抽奖机会已经用光了,下次再来吧')
      } else {
        let reward_id = response.win_prize.id;
        switch (reward_id) {
          case 1: {
            app.showModel('恭喜你', '中大奖了,快来绑定手机号码领奖吧')
            break;
          }
          case 2: {
            app.showModel('恭喜你', '中大奖了,快来绑定手机号码领奖吧')
            break;
          }
          case 3: {
            app.showModel('恭喜你', '中大奖了,快来绑定手机号码领奖吧')
            break;
          }
          case 4: {
            // app.errorHide(that, '很遗憾', '这次没中奖,下次没准就能中哦', 3000)
            app.showModel('很遗憾', '这次没中奖,下次没准就能中哦')
            break;
          }
          default: {
            app.showModel('很遗憾', '这次没中奖,下次没准就能中哦')
          }
        }
        // 模版消息推送
        if (that.data.formId) {
            app.getAccess_token(that, that.data.formId)
        }
      }
      that.setData({
        remain_count: response.remain_count
      })
    })
  },
  // formSubmit
  formSubmit(e) {
    this.setData({
      formId: e.detail.formId
    })
  },

  // 获取手机号码授权
  getPhoneNumber(e) {
    let iv = e.detail.iv;
    let encryptedData = e.detail.encryptedData
  },
})