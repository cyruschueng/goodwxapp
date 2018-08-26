//app.js
App({
  onLaunch: function () {
    let _this = this;
    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          let code = res.code;
          _this.globalData.code = code;
          // 获取用户信息
          wx.getUserInfo({
            success: res => {
              _this.globalData.userInfo = res.userInfo;
              console.log('user_info', res.userInfo)
              _this.login(code, res.encryptedData, res.iv)
              wx.redirectTo({
                url: '/pages/themePage/themePage',
                // url: 'pages/interactPage/interactPage'
                // url: '/pages/sharePage/sharePage'
                // url: '/pages/phoneInfo/phoneInfo'
              })
            },
            fail: res => {
              wx.redirectTo({
                url: '/pages/escPage/escPage',
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onShow() {
    // 音频播放
    let audioCtx = wx.createInnerAudioContext();
    audioCtx.autoplay = true;
    audioCtx.loop = true;
    audioCtx.src = 'https://normal.zhutuitui.com/file/music.mp3';
  },
  // 登录
  login(code, encryptedData, iv) {
    let _this = this;
    wx.request({
      url: this.globalData.url + '/api/wechat/auth',
      data: {
        code,
        encryptedData,
        iv
      },
      method: 'POST',
      success(res) {
        console.log('openid', res.data.data)
        console.log('openid', res.data.data.openid)
        _this.globalData.openid = res.data.data.openid;
        _this.globalData.user_avatar = res.data.data.avatar;
        _this.globalData.remain_count = res.data.data.total_count - res.data.data.use_count;
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  // 错误提示
  errorHide(target, errorText, time) {
    let that = target;
    that.setData({
      error: "1",
      error_text: errorText
    })
    let errorTime = setTimeout(function () {
      that.setData({
        error: "0"
      });
    }, time)
  },
  // 弹框提示 
  showModel(title, content) {
    wx.showModal({
      title: title,
      content: content,
    })
  },
  // 抽奖记录和剩余抽奖次数
  rewardLog(that) {
    let requestData = {
      url: this.globalData.url + '/api/wechat/getUserRecord',
      data: {
        openid: this.globalData.openid
      }
    }
    this.httpPost(that, requestData, res => {
      let response = res.data.data;
      console.log(response)
      that.setData({
        remain_count: response.remain_count,
        record: response.record,
      })
    })
  },
  // 分享功能函数
  shareFunc(that) {
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
  // 请求重新封装
  httpPost(that, requestData, callBack1, callBack2) {
    wx.request({
      url: requestData.url,
      data: requestData.data,
      method: 'POST',
      success(res) {
        if (res.statusCode == 200) {
          callBack1(res);
        } else {
          console.log('fail', res)
          if (callBack2) { callBack2(res) }
        }
      },
      fail(res) {
        this.errorHide(that, res.data.errMsg, 3000)
      },
      complete(res) {

      }
    })
  },
  // 获取access_token
  getAccess_token(that, formId) {
    let _this = this;
    let requestData = {
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbf46b749173344b7&secret=e4045090cc272299d773121c6306b154',
      data: {
        grant_type: 'client_credential',
        appid: "wxbf46b749173344b7",
        secret: 'e4045090cc272299d773121c6306b154'
      }
    }
    _this.httpPost(that, requestData, res => {
      console.log('access_token', res);
      // _this.pushMessage(that, res.data.access_token, formId)
    })
  },
  // 推送模版消息
  pushMessage(that, access_token, formId) {
    let _this = this;
    let requestData = {
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
      data: {
        touser: _this.globalData.openid,
        template_id: 'bqh0MeHk_-LS1tLGOQX7qyGo-SI6fAfZM3AKMJ8KHFY',
        form_id: formId,
        data: {
          keyword1: {
            "value": "Dyson戴森吹风机",
            "color": "#173177"
          },
          keyword2: {
            "value": "12月26日00:00-1月1日16：00",
            "color": "#173177"
          },
          keyword3: {
            "value": '您在7天内参与过圣诞抽奖活动，成功激活一个试用机会！详情请关注“百诚先生”公众号，自定义菜单参与试用活动！',
            "color": "#173177"
          }
        }
      }
    }
    _this.httpPost(that, requestData, res => {
      if (res.statusCode == 200) {
        that.setData({
          formId: 0
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'https://normal.zhutuitui.com',
    openid: '',
    user_avatar: '',
    phone: '',
    name: '',
    wx: ''
  }
})