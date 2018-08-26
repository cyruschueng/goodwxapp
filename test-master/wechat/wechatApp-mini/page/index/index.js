var app = getApp()
Page({
  data: {
    shareLogId: '',
    showZZ: false,// 防止快速点击两次
    show: 0,
    delit: true,
    username: '',
    ShopInfo: '',
    busname: '',
    memberId: '',
    imgUrls: [
      'https://lingju360.com/miniapp/resources/image/index/banner.png',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    hiddenmodalput: false, //显示登陆框
    validCodeShow: false, //显示验证码倒计时
    validCodeTime: 120, //验证码倒计时时间
    phone: '', //登陆框手机号
    ValidCode: '', //登陆框验证码
    userphone: '',
    error: 0,
    received: false,
    delit: false,
    couponId: '',
  },



  //弹出遮罩
  showZZ() {
    this.setData({
      showZZ: true
    })
    setTimeout(() => {
      this.setData({
        showZZ: false
      })
    }, 300)
  },

  //开发中
  InDevelopment() {
    wx.showToast({
      title: '功能暂未开放！',
      icon: 'loading',
      duration: 1000
    })
  },

  //获取手机号
  getuserphone() {
    this.setData({
      userphone: app.globalData.userphone ? app.globalData.userphone : ''
    })
  },

  //弹出注册窗口
  toLogin() {
    wx.navigateTo({
      url: '/page/login/index',
    })
    // this.setData({
    //   hiddenmodalput: !this.data.hiddenmodalput
    // })
  },
  //10元优惠活动
  delit() {
    this.setData({
      received: false,
      delit: false
    })
  },

  //领取优惠券
  getit() {
    app.commonAjax('/miniapp/cat/couponLink/receive', ['memberId'], { couponId: this.data.couponId }, (res) => {
      if (res.data.code == 0) {
        this.setData({
          delit: true,
          received: false
        })
      } else {
        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app.globalData, 'post')
  },

  //uuid生成规则
  uuid: function () {
    var mydate = new Date();
    var randowStr = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return randowStr + mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
  },

  //分享
  onShareAppMessage(options) {

    var that = this


    wx.showShareMenu({
      withShareTicket: true
    })

    var shareLogId = this.uuid();
    var memId;
    var subdata = {}
    subdata.shareLogUuid = shareLogId
    subdata.sharetickets = ''
    app.commonAjax('/miniapp/cat/share/insertShareAppMessage', ['appid'], { couponId: this.data.couponId, title: '零距智能餐厅', path: '/page/index/index', shareLogUuid: shareLogId }, (res) => {

      if (res.data.code == 0) {
        //shareLogId = res.data.id
        subdata.shareLogUuid = shareLogId
      }

    }, app.globalData, 'post')


    return {

      title: '零距智能餐厅',
      path: '/page/index/index?shareLogId=' + shareLogId + '&memberId=' + app.globalData.memberId,


      success:  (res) => {
        console.log('shareTickets')
        
        console.log(res)
        console.log(res.shareTickets)
        console.log('shareTickets')
        if (!res.shareTickets || typeof res.shareTickets == undefined || res.shareTickets == '' ){
          console.log('11111111111111111111111111111')
          subdata.sharetickets = ''
        }else{
          console.log('2222222222222222222222222222')
          subdata.sharetickets = res.shareTickets.toString()
        }
        subdata.status = 1
      },
      fail: (res) => {
        subdata.status = -1
      },
      complete:(res) => {

        console.log('complete1')
          wx.getShareInfo({
            shareTicket: subdata.sharetickets,
            success: (res) => {

              console.log('888888')

              subdata.encryptedData = res.encryptedData
              subdata.iv = res.iv
              console.log('success')

            },
            fail:(res)=>{
              console.log('fail')
            },
            complete:(res)=>{
              console.log('complete2')
              that.updateShareAppMessageSuccessFail(subdata)
            }
          })
        }


      


    }
  },

  updateShareAppMessageSuccessFail(subdata) {

    subdata.shareSessionKey = app.globalData.thirdSession

    app.commonAjax('/miniapp/cat/share/updateShareAppMessageSuccessFail', ['appid'], subdata, (res) => {

      this.setData({
        delit: false
      })


    }, app.globalData, 'post')
    // wx.login({
    //   success: (res) => {
    //     subdata.userCode = res.code
    //     console.log(subdata.userCode)
    //     console.log(res.code)

        
    //   }
    // })
  },

  onLoad: function (options) {

    // console.log(options)
    wx.setNavigationBarTitle({
      title: '首页',
    })

    if (options.shareLogId) {
      this.setData({
        shareLogId: options.shareLogId,
        memId: options.memberId,
        userphone: app.globalData.userphone ? app.globalData.userphone : ''
      })
    }

  },
  //获取我的优惠券
  getcouponId() {
    if (this.data.shareLogId && this.data.shareLogId != undefined) {
      app.commonAjax('/miniapp/cat/share/openShareAppMessageCouponInfo', ['memberId'], { shareLogUuid: this.data.shareLogId }, (res) => {

        if (res.data.code == 0) {
          this.setData({
            delit: true,
            received: res.data.data.receive,
            couponId: res.data.data.id,
            couponInfo: res.data.data
          })
        }

      }, app.globalData, 'post')
    }
  },

  //领取分享的券
  openShareAppMessage() {
    app.commonAjax('/miniapp/cat/share/openShareAppMessage', ['openid', 'sharetickets'], { shareLogUuid: this.data.shareLogId, memId: this.data.memId }, (res) => {

      if (res.data.code == 0) {
        this.setData({
          delit: true,
          received: false
        })
      }

    }, app.globalData, 'post')
  },

  //获取弹出框的券
  getCouponByInfo() {

    if (!this.data.shareLogId) {
      app.commonAjax('/miniapp/cat/couponInfo/getCouponByInfo', ['shopId', 'memberId'], {}, (res) => {

        if (res.data.code == 0 && !this.data.shareLogId && res.data.data) {

          this.setData({
            delit: true,
            received: res.data.data.receive,
            couponId: res.data.data.id,
            couponInfo: res.data.data
          })
        } else {
          this.setData({
            received: false
          })
        }


      }, app.globalData, 'post')
    }

  },

  //获取商家信息
  selectShopInfo() {
    app.commonAjax('/miniapp/cat/baseInfo/selectShopInfo', ['shopId', 'memberId'], {}, (res) => {

      // if (res.data.data.couponInfo && res.data.data.receive){
      //    this.setData({
      //      delit:true,
      //      received:true,
      //      couponId: res.data.data.couponInfo.id,
      //      couponInfo: res.data.data.couponInfo
      //    })
      // }else{
      //   this.setData({
      //     received: false
      //   })
      // }


      this.setData({
        username: app.globalData.username,
        ShopInfo: res.data.data,

      })

    }, app.globalData, 'post')
  },


  getbaseData: function () {
    this.setData({
      busname: app.globalData.busname,
      memberId: app.globalData.memberId
    })
  },

  onShow: function () {
    this.setData({
      userphone: app.globalData.userphone ? app.globalData.userphone : '',
      showZZ: false
    })

    this.selectShopInfo()//获取商家信息
    this.getuserphone()//获取首页手机号
    this.getvalid()//获取优惠券
    this.getCashCouponInfo()//获取代金券列表

    var that = this;

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          busname: res.data
        })
      },
    })

    var i = 0;

    this.setData({
      busname: app.globalData.busname
    })
    this.getbaseData();


    setTimeout(function () {
      that.setData({
        busname: app.globalData.busname
      })
    }, 1000)



    wx.getStorage({
      key: 'busname',
      success: function (res) {
        that.setData({
          busname: res.data
        })
      },
    })

    wx.getUserInfo({
      success: function (res) {

        that.setData({
          username: JSON.parse(res.rawData).nickName
        })
      }
    })

    //调用是否首页弹框优惠券
    this.coupon_s()
  },
  //是否首页弹框优惠券
  coupon_s() {

  },

  changeShow: function () {
    this.setData({
      show: !this.data.show
    })
  },

  //跳到团购页面
  groupbuying() {
    this.showZZ()//防止点击两次300
    wx.navigateTo({
      url: '/page/groupbuying/index',
    })
  },

  //跳转到外卖页面
  toTakeaway(){
    this.showZZ()//防止点击两次300
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        app.commonAjax('/miniapp/cat/takeout/getDistance', ['shopId'], { longitude: res.longitude, latitude: res.latitude}, (res)=> {

          app.commonAjax('/miniapp/cat/takeout/getDistributionInfo', ['shopId'], { }, (res1) => {

            wx.setStorageSync('takeoutData', res1.data.data)

            console.log(res.data.data[0].distance)
            console.log(res1.data.data)

            var dis = res.data.data[0].distance < res1.data.data.leastDistance

            if (true) {
              wx.navigateTo({
                url: '/page/takeaway/index',
              })
            }else {
              console.log('距离太远！')
              wx.showToast({
                title: '商家距离太远！',
                image: '/image/i/x.png',
                duration: 2000
              })
            }

          }, app.globalData, 'post')

          
        }, app.globalData, 'post')
      }
    })
    
  },

  //排队
  queue() {
    this.showZZ()//防止点击两次300
    app.commonAjax('/miniapp/cat/queue/getQueueInfo', ['shopId', 'memberId'], {}, function (res) {
      if (res.data.data.myNumber == null) {

        wx.navigateTo({
          url: '/page/queue/index'
        })

      } else {
        if (res.data.data.id != null) {

          wx.navigateTo({
            url: '/page/queue/queue_success/index'
          })

        }
      }
    }, app.globalData, 'post')

  },
  //预约
  reserve() {
    this.showZZ()//防止点击两次300
    app.commonAjax('/miniapp/cat/reserve/queueList', ['shopId', 'memberId'], {}, function (res) {

      if (res.data.data.length > 0) {
        wx.navigateTo({
          url: '/page/reserve/reserveListMore/index'
        })
      } else {
        wx.navigateTo({
          url: '/page/reserve/index'
        })

      }
    }, app.globalData, 'post')

  },

  //获取二维码参数
  getQueryString(url) {
    var href = url;

    href = href.substring(href.indexOf("=") + 1, href.length);
    return href;

  },

  //扫描二维码
  scan() {
    wx.scanCode({
      success: (res) => {

        console.log('res.result')
        console.log(res)
        if (res.path.indexOf('scene') >= 0) {

          console.log(this.getQueryString(res.path))

          wx.navigateTo({
            url: '/page/takeoutpay/index?deskId=' + this.getQueryString(res.path),
          })
        } else {
          wx.showToast({
            title: '无效二维码！',
            image: '/image/i/x.png',
            duration: 2000
          })
        }
      },
      fail: () => {
        // wx.showToast({
        //   title: '未识别二维码！',
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }
    })
  },


  //领取卡券
  card_sign() {
    app.commonAjax('/miniapp/cat/ticket/' + 'wx554b7eee9e20d69d' + '/card_sign', [], { 'code': '', 'openid': '', 'card_id': 'per9FxCpXgWO2K4cEYv3wyK9gSkI' }, (res) => {

      var cordInfo = res.data.data

      var cardExt = {
        code: '',
        openid: app.globalData.openid,
        timestamp: cordInfo.timestamp,
        signature: cordInfo.signature,
        nonce_str: cordInfo.nonceStr
      }

      console.log(cardExt)

      wx.addCard({
        cardList: [
          {
            cardId: 'per9FxCpXgWO2K4cEYv3wyK9gSkI',
            cardExt: JSON.stringify(cardExt)
          }
        ],
        success: (res) => {
          console.log(res.cardList) // 卡券添加结果
        }
      })


    }, app.globalData, 'post')
  },

  //获取优惠券列表
  getvalid() {
    app.commonAjax('/miniapp/cat/couponInfo/valid', ['memberId', 'bizId'], { couponType: 0 }, (res) => {

      var resdata = res.data.data

      var newdata = []

      resdata.forEach((item, index) => {

        if ((item.num > 0) && (item.canReceive == true)) {
          newdata.push(item)
        }
      })

      this.setData({
        couponlist: newdata.slice(0, 2)
      })

      if (newdata.length <= 0) {
        this.setData({
          Kcouponlist: true
        })
      }

    }, app.globalData, 'get')
  },

  //领取优惠券
  getcoupon(e) {
    console.log(e)
    let couponid = e.currentTarget.dataset.id
    let couponindex = e.currentTarget.dataset.index
    let couponlist = this.data.couponlist
    app.commonAjax('/miniapp/cat/couponLink/receive', ['memberId'], { couponId: couponid }, (res) => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '领取成功！',
          icon: 'success',
          duration: 1000
        })
        couponlist[couponindex].num--
        couponlist[couponindex].receivedCount++
        if (couponlist[couponindex].receivedCount == couponlist[couponindex].memberMaxNum) {
          couponlist[couponindex].canReceive = false
        }
        this.setData({
          couponlist: couponlist,
        })
      } else {
        wx.showToast({
          title: '领取失败！',
          image: '/image/i/x.png',
          duration: 1000
        })
      }

      //console.log(this.data.couponlist)
    }, app.globalData, 'post')
  },

  //获取代金券列表
  getCashCouponInfo() {
    app.commonAjax('/miniapp/cat/couponInfo/getCashCouponInfo', ['shopId'], {}, (res) => {

      this.setData({
        CashCouponInfo: res.data.data.slice(0, 2)
      })

      if (res.data.data.length <= 0) {
        this.setData({
          KCashCouponInfo: true
        })
      }

    }, app.globalData, 'get')
  },
  //前往我的卡劵
  seemine() {
    wx.navigateTo({
      url: '/page/coupon/couponList/index?cardType=' + 0
    })
  },
  // 点击立即购买事件
  buyVoucher(e) {
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/vouchers/buyVouchers/index?Id=' + id
    })
  }

})