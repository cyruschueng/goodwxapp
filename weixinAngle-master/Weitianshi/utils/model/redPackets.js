let app = getApp();
let _this = this;
let url_common = app.globalData.url_common
let url_publishHB = url_common + '/api/payment/unifyOrder'
let url_publishedHB = url_common + '/api/payment/getUserRedPacket'
export class redPackets {

  // 发布红包
  publishHB(user_id, number, money, title, cb1, cb2) {
    return app.httpPost({
      url: url_publishHB,
      data: {
        user_id: user_id,
        number: number,
        money: money,
        title: title,
        open_session: app.globalData.open_session
      }
    }, this).then(res => {
      let unique_id = res.data.data.packet_unique_id;
      let prepay_id = res.data.data.prepay_id;
      if (cb1 && cb1 != null) {
        cb1(unique_id, prepay_id)
      } else {
        if (cb2) {
          cb2()
        } else {
          let that = this;
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            complete: function (response) {
              if (response.errMsg == 'requestPayment:ok') {
                app.formIdSubmit(prepay_id);
                wx.redirectTo({
                  url: '/redPackets/pages/publishedHB/publishedHB?unique_id=' + unique_id
                })
              } else {
                // app.errorHide(that, response.errMsg);
              }
            }
          })
        }
      }
    })
  }

  // 已发布红包的列表
  publishedHBList(user_id, currentPage) {
    app.httpPost({
      url: url_publishedHB,
      data: {
        user_id: user_id,
        page: currentPage
      }
    }, this).then(res => {
      wx.hideLoading();
      console.log(res.data.data)
      if (!currentPage) {
        this.setData({
          HBInfo: res.data.data,
          page_end: res.data.page_end
        })
      } else {
        let hbInfo = this.data.HBInfo;
        let newPage = res.data.data;
        hbInfo = hbInfo.concat(newPage);
        this.setData({
          HBInfo: hbInfo,
          page_end: res.data.page_end
        })
      }
    });
  }

  // 更多群红包信息
  otherGroupHB(openGId = '') {
    let user_id = wx.getStorageSync('user_id');
    let open_ss
    if (!user_id) {
      app.loginPage(user_id => {
        _this.otherGroupHB(openGId)
      })
      return;
    }
    app.httpPost({
      url: url_common + '/api/payment/getMoreGroup',
      data: {
        user_id,
        openGId,
        open_session: app.globalData.open_session
      }
    }, this).then(res => {
      console.log(res.data.data.length)
      this.setData({
        groupInfo: res.data.data
      })
    })
  }

  // 具体某个群里的红包
  groupInsideHB(openGId, currentPage) {
    let user_id = wx.getStorageSync('user_id');
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    app.httpPost({
      url: url_common + '/api/payment/getMoreGroupPacket',
      data: {
        user_id,
        openGId,
        page: currentPage
      }
    }, this).then(res => {
      wx.hideLoading()
      if (!currentPage) {
        let insideHB = res.data.data;
        insideHB.forEach((x, index) => {
          insideHB[index].per = (x.packet.drawed_num) / (x.packet.number) * 100;
        });
        this.setData({
          insideHB: insideHB
        })
      } else {
        let insideHB = this.data.insideHB;
        let newPage = res.data.data;
        console.log(newPage)
        insideHB = insideHB.concat(newPage);
        insideHB.forEach((x, index) => {
          insideHB[index].per = (x.packet.drawed_num) / (x.packet.number) * 100;
        });
        this.setData({
          insideHB: insideHB,
          page_end: res.data.page_end
        })
      }
    })
  }

  // 红包领取记录
  getHBRecord(user_id, unique_id, currentPage) {
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    app.httpPost({
      url: url_common + '/api/payment/getDrawedRecord',
      data: {
        user_id, unique_id,
        page: currentPage
      }
    }, this).then(res => {
      console.log(res)
      wx.hideLoading()
      if (!currentPage) {
        this.setData({
          whoGet: res.data.data
        })
      } else {
        let whoGet = this.data.whoGet;
        whoGet.forEach((x) => {
          console.log(x)
        });
        let newPage = res.data.data;
        whoGet = whoGet.concat(newPage);
        this.setData({
          whoGet: whoGet,
          page_end: res.data.page_end
        })
      }
    })
  }

  // 平台红包统计
  recordHB() {
    let user_id = wx.getStorageSync('user_id');
    app.httpPost({
      url: url_common + '/api/payment/getPacketStatistic',
      data: {
        user_id
      }
    }, this).then(res => {
      this.setData({
        recordHB: res.data.data
      })
    })
  }

  // 发布红包的用户相关信息
  pushHBPerson(unique_id, cb) {
    let user_id = wx.getStorageSync('user_id');
    app.httpPost({
      url: url_common + '/api/payment/getPacketUser',
      data: {
        user_id, unique_id
      }
    }, this).then(res => {
      app.log('发红包者和红包信息', res)
      this.setData({
        personInfo: res.data.data,
      });
      // 如果不是红包拥有人,则禁止分享
      if (res.data.data.user.user_id != user_id) {
        wx.hideShareMenu()
      } else {
        wx.showShareMenu({
          withShareTicket: true
        })
      }
      if (cb) cb(res);
    })
  }

  // 开红包动作
  openHB(unique_id) {
    let user_id = wx.getStorageSync('user_id');
    let shareTicket = this.data.shareTicket;
    if (!unique_id) return app.errorHide(this, 'unique_id不存在');
    app.httpPost({
      url: url_common + '/api/payment/toBalance',
      data: {
        user_id,
        packet_unique_id: unique_id,
        open_session: app.globalData.open_session
      }
    }, this, res => {
      if (res.data.error_msg == '红包已被领完') {
        app.redirectTo("/redPackets/pages/openedHB/openedHB?unique_id=" + unique_id + '&&shareTicket=' + shareTicket)
        this.setData({
          preventQuickClick: true
        })
      }
    }).then(res => {
      let bounce_money = res.data.data.bounce_money;
      this.setData({
        show: false,
        bounce_money,
        kai: true,
        preventQuickClick: true
      });
    }).catch(res => {
      this.setData({
        preventQuickClick: true
      })
    })

  }
  // 开完红包后跳转
  openedHB(added_user_id, is_card) {
    let unique_id = this.data.unique_id;
    let shareTicket = this.data.shareTicket;
    this.setData({
      show: false
    })
    if (is_card == 0) {
      app.operationModel('contactsAdd', this, added_user_id)
    } else if (is_card == 3) {
      app.operationModel('contactsAddDirect', this, added_user_id);
    }
    app.redirectTo("/redPackets/pages/openedHB/openedHB?unique_id=" + unique_id + '&&shareTicket=' + shareTicket)
  }

  //红包发布个数及人脉信息
  packetStatic() {
    let user_id = wx.getStorageSync('user_id');
    app.httpPost({
      url: url_common + '/api/payment/getUserPacketStatistic',
      data: {
        user_id
      }
    }, this).then(res => {
      console.log(res)
      this.setData({
        packetStatic: res.data.data
      })
    })
  }
  // 确认红包功能状态
  makeSureHB() {
    app.httpPost({
      url: url_common + '/api/payment/checkPacketStatus',
      data: {},
    }, this).then(res => {
      this.setData({
        packetStatus: res.data.packet_status
      })
    })
  }
}