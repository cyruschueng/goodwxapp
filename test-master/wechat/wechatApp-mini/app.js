App({
  globalData: {
    domMainName: 'https://lingju360.natappvip.cc',
    memberId: null,
    bizId: '',
    shopId: '',
    deskId: '',
    busname: '零距互联体验店',
    thirdSession: '',
    userId: '',
    username: '',
    linkphone: '',
    headsculpture: '',
    appId: '',
    scan: 0
  },

  onLaunch(options) {

    // console.log('转发')
    
    // console.log(options.shareTicket)

    this.globalData.sharetickets = options.shareTicket


    wx.setStorageSync('storage_authorized', 'auto')

    //获取本地手机号
    this.globalData.userphone = wx.getStorageSync('userphone')

    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}


    //真实环境下动态获取参数    
    // this.globalData.shopId = extConfig.shopId;
    // this.globalData.bizId = extConfig.bizId;
    this.globalData.appId = extConfig.appid;
    this.globalData.appid = extConfig.appid;


    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })
    this.UserLogin()
  },

  //用户进入
  UserLogin() {
    this.Login()
  },

  //login获取sessionKey
  Login() {
    wx.login({
      success: (res) => {

        if (res.code) {
          this.globalData.userCode = res.code
          this.UserInfo(res.code, this.globalData.appId)

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: (res) => {
        console.log('login失败', res)
      }
    });
  },


  //获取用户信息，提交解密用户信息
  UserInfo(userCode, appId) {
    var that = this;
    wx.getUserInfo({
      success: (res) => {
        const subdata = {}
        subdata.encryptedData = res.encryptedData
        subdata.userCode = userCode
        subdata.iv = res.iv
        subdata.appid = appId
        this.baseAjax('/miniapp/miniprogram/userInfo/getShopInfo', { appid: this.globalData.appid}, 'post', (res1) => {

          this.globalData.shopId = res1.data.data.id.toString();
          this.globalData.bizId = res1.data.data.bizId.toString();
          this.globalData.shopName = res1.data.data.busname

          if (res1.data.code == 0) {
            wx.setStorageSync('storage_authorized', true)
            subdata.shopId = this.globalData.shopId
            this.baseAjax('/miniapp/miniprogram/userInfo/decryptUserInfo', subdata, 'post', (res) => {

              if (res.data.code == 0) {
                var res_member = res.data.data.member
                this.globalData.code = userCode
                this.globalData.headsculpture = res_member.headsculpture
                this.globalData.username = res_member.alias
                this.globalData.userphone = res_member.phone
                this.globalData.memberId = res_member.id
                this.globalData.thirdSession = res.data.data.thirdSession
                this.globalData.openid = res_member.mpOpenid ? res_member.mpOpenid : res_member.openid

                wx.setStorage({
                  key: 'sessionKey',
                  data: res.data.data.thirdSession,
                })
                wx.setStorage({
                  key: 'userphone',
                  data: res_member.phone,
                })
                wx.setStorage({
                  key: 'memberId',
                  data: res_member.id
                })

                if (getCurrentPages().length > 0) {
                  this.indexInit(getCurrentPages()[0])
                } else {
                  setTimeout(() => {
                    this.indexInit(getCurrentPages()[0])
                  }, 800)
                }
                wx.hideLoading()
              }
            }, this)
          }
        }, this)

      },
      fail: (res) => {

        //储存未授权信息
        wx.setStorageSync('storage_authorized', false)

        if (getCurrentPages()[0].route != 'page/authorized/index') {
          wx.redirectTo({
            url: '/page/authorized/index',
          })
        }

        // wx.showModal({
        //   cancelText: '不授权',
        //   confirmText: '授权',
        //   title: '警告',
        //   content: '若不授权微信登陆，将无法使用零距智能餐厅功能，点击授权，则可重新使用，若点击不授权，后期还使用小程序，需在微信【发现】——【小程序】——删掉【零距智能餐厅】，重新搜索授权登陆，方可使用。',
        //   success: (res) => {
        //     if (res.confirm) {
        //       wx.openSetting({
        //         success: (res) => {
        //           if (res.authSetting['scope.userInfo']) {
        //             that.Login()
        //           }

        //         }
        //       })
        //     } else if (res.cancel) {
        //       wx.redirectTo({
        //         url: '/page/authorized/index',
        //       })
        //     }
        //   }
        // })


      }
    })
  },

  //首页初始化
  indexInit(pages) {
    if (pages.route == "page/takeoutpay/index") { //如果首页是订餐页面
      pages.getList()//获取首页菜品数据
      pages.getuserphone()//获取首页手机号
    }

    if (pages.route == "page/queue/index") { //如果首页是取号
      pages.getQueue()//获取取号
    }

    if (pages.route == "page/selectDesk/selectPeople/index") { //如果首页是选桌号
      pages.selectByDeskId()//获取桌号
    }

    if (pages.route == "page/selectDesk/index") { //如果首页是选桌
      pages.selectByDeskId()//获取桌号
      pages.getIdleTableInfo()//获取餐桌
    }

    if (pages.route == "page/index/index") { //如果直接进入首页

      pages.selectShopInfo()//获取商家信息
      pages.getuserphone()//获取首页手机号
      pages.getvalid()//获取优惠券
      pages.getCashCouponInfo()//获取代金券列表
      pages.getcouponId() //获取别人分享给我的优惠券
      pages.getCouponByInfo()
    }

    if (pages.route == "page/order/index") { //如果直接进入已点菜品
      pages.getOrderMenus()
    }
  },


  onHide() {
    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })
  },

  onShow(options) {

    // console.log(wx.getStorageSync('storage_authorized'))

    //查询是否授权
    if (wx.getStorageSync('storage_authorized') === false) {

      wx.redirectTo({
        url: '/page/authorized/index',
      })

    }


    var ontimestamp = Date.parse(new Date());

    wx.getStorage({
      key: 'timestamp',
      success: (res) => {

        if (ontimestamp - res.data >= 60000) {

        }
      }
    })
  },



  baseAjax: (url, data, method, cb, that) => {
    var subUrl = getApp().globalData.domMainName + url;
    console.log(data)
    wx.request({
      url: subUrl,
      data: data,
      method: method,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: (res) => {
        console.log(res)
        if (res.data.code == 7004) {

          wx.showToast({
            title: '登录状态已过期！',
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {
              that.Login() //重新login获取Session
            }
          })

        } else {
          cb(res)
        }
      },
      fail: (res) => {
        // _fail(res)
        // wx.showToast({
        //   title: '请求超时',
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }
    })
  },

  

  commonAjax: (url, baseData, data, cb, globalData, method) => {

    if (globalData.url == url) {
      return
    }

    globalData.url = url

    setTimeout(()=>{
      globalData.url = ''
    },300)

    var that = this

    var subUrl = getApp().globalData.domMainName + url;

    baseData.forEach(function (item, index) {
      data[item] = globalData[item]
    })
    if (!globalData.thirdSession){
      return
    }
    data.thirdSession = globalData.thirdSession;
    data.lastUpdatedBy = globalData.username;
    data.createdBy = globalData.username;

    console.log('提交数据')
    console.log({ url, data })

    wx.request({
      url: subUrl,
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: method,
      success: (res) => {
        console.log('返回数据')
        console.log(res.data);
        if (res.data.code == 7004) {
          getApp().Login()
        }  else if (res.data.code != 0 && res.data.code != 2 ) {
          wx.showToast({
            title: res.data.message,
            image: '/image/i/x.png',
            duration: 2000
          })
        } else if (res.data.code == 300) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: res.data.data
                })
              } else if (res.cancel) {
              }
            }
          })
          
        }
        else {
          cb(res)
        }

      },
      fail: (res) => {
        // wx.showToast({
        //   title: '请求超时',
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }
    })
  }
})
