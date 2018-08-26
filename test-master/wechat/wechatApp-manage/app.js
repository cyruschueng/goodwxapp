App({

  globalData: {
    domMainName:'https://lingju360.com',
    memberId: '',
    bizId: '',
    shopId: '',
    busname: '店铺标题',
    thirdSession: '',
    userId:'',
    username: '',
    linkphone: '',
    headsculpture:'',
    scan: 0
  },

  onLaunch () {
    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })
    this.UserLogin()
  },

  //用户进入
  UserLogin () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask:false
    // })
    wx.checkSession({
      success:()=>{
        wx.getStorage({
          key: 'sessionKey',
          success:  (res) => {

            if( res.data.length <=0){
              this.Login()
            }else{
              this.globalData.thirdSession = res.data

              wx.getStorage({
                key: 'username',
                success: (res) => {


                  this.globalData.username = res.data

                  wx.getStorage({
                    key: 'password',
                    success: (res) => {


                      this.globalData.password = res.data

                      this.getUserInfoBySKey(res.data)

                    },
                    fail: (res) => {

                      this.Login()
                    }
                  })

                },
                fail: (res) => {

                  this.Login()
                }
              })


            }


            

            
          },
          fail: (res) =>{
            
            this.Login()
          }
        })
      },
      fail:()=>{
        this.Login()
      }
    })
  },

  //login获取sessionKey
  Login(){
    wx.login({
      success: (res) => {
        if (res.code) {

          this.UserInfo(res.code)

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail:(res)=>{
        console.log('login失败',res)
      }
    });
  },


  //直接获取用户信息
  getUserInfoBySKey(sessionKey){


    wx.showLoading({
      title: '自动登录中！',
      mask: false
    })

    var subdata = {};

    subdata.thirdSession = this.globalData.thirdSession
    subdata.username = this.globalData.username
    subdata.password = this.globalData.password

    this.baseAjax('/shop/user/getUserInfoBySKey', subdata, 'post', (res) => {


      if(res.data.code == 0){
        // this.globalData.username = res.data.data.alias
        this.globalData.headsculpture = res.data.data.userInfo.avatar

        this.globalData.username = res.data.data.userInfo.username
        this.globalData.shopId = res.data.data.userInfo.busid
        this.globalData.bizId = res.data.data.baseinfo.bizId
        this.globalData.linkphone = res.data.data.userInfo.phone
        this.globalData.userId = res.data.data.userInfo.userId

        this.globalData.baseinfo = res.data.data.baseinfo
        this.globalData.userInfo = res.data.data.userInfo

        // getCurrentPages()[0].baseinfo()

        
          wx.reLaunch({
            url: '/page/index/index'
          })
        

        

        wx.hideLoading()
      } else {

        wx.showToast({
          title: res.data.message,
          image: '/image/i/x.png',
          duration: 1500,
          success:()=>{
            setTimeout(()=>{
              wx.redirectTo({
                url: '/page/login/index'
              })
            },1500)
          }
        })
        
        

      }

      
    
    }, this)

  },

  //获取用户信息，提交解密用户信息
  UserInfo(userCode){
    var that = this;
    wx.getUserInfo({
      success: (res)=>{
        const subdata = {}
        subdata.encryptedData = res.encryptedData
        subdata.userCode = userCode
        subdata.iv = res.iv
        this.baseAjax('/shop/user/decryptUserInfo', subdata, 'post', (res) => {

          //解密用户信息成功
          if(res.data.code == 0){


            this.globalData.headsculpture = res.data.data.member.headsculpture
            this.globalData.username = res.data.data.member.alias
            this.globalData.thirdSession = res.data.data.thirdSession


            wx.setStorage({
              key: 'sessionKey',
              data: res.data.data.thirdSession,
            })


            wx.hideLoading()
          }else{

            setTimeout(()=>{
              this.Login()    //重新login获取Session
            },200000)


             
            // wx.showToast({
            //   title: '获取用户信息失败！',
            //   image: '/image/i/x.png',
            //   duration: 2000,
            //   success: () => {
                
            //   }
            // })
          }
          
        })
      },
      fail:(res)=>{

        //储存未授权信息
        wx.setStorageSync('storage_authorized', false)

        if (getCurrentPages()[0].route != 'page/authorized/index') {
          wx.redirectTo({
            url: '/page/authorized/index',
          })
        }

        // wx.showModal({
        //   cancelText:'不授权',
        //   confirmText:'授权',
        //   title: '警告',
        //   content: '若不授权微信登陆，将无法使用零距智能餐厅功能，点击授权，则可重新使用，若点击不授权，后期还使用小程序，需在微信【发现】——【小程序】——删掉【零距智能餐厅】，重新搜索授权登陆，方可使用。',
        //   success:  (res) => {
        //     if (res.confirm) {
        //       wx.openSetting({
        //         success: (res) => {
        //           console.log(res)
                  
        //           if (res.authSetting['scope.userInfo']){
        //             that.Login()
        //           }
        //         }
        //       })
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
        console.log('login失败', res)
      }
    })
  },


  onHide () {
    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })
  },

  onShow () {
    var ontimestamp = Date.parse(new Date());

    // var sessionKey = wx.getStorageSync('sessionKey')

    // if (sessionKey){
      
    // }else{
    //   this.UserLogin()
    // }

    wx.getStorage({
      key: 'timestamp',
      success: (res) => {
        
        if (ontimestamp - res.data >= 600000) {
         // console.log('onshow')
          this.UserLogin()
          
        }
      }
    })

    
  },


  baseAjax: (url, data, method, cb, that) => {
    
    var subUrl = getApp().globalData.domMainName + url;
    console.log(data)
    wx.request({
      url: subUrl,
      data:data,
      method: method,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:(res) => {
        

        console.log(res)
        if (res.data.code == 7004 || res.data.code == 7003) {

           getApp().Login()
          
          wx.showToast({
            title: '登录状态已过期！',
            image: '/image/i/x.png',
            duration: 2000,
            success: () => {
              //重新login获取Session
            }
          })

        } else {
          cb(res)
        }
      },
      fail:(res) => {
        
        // wx.showToast({
        //   title: '请求超时',
        //   image: '/image/i/x.png',
        //   duration: 2000
        // })
      }
    })
  },


  commonAjax: (url, baseData, data, cb, app, method) => {

    var subUrl = getApp().globalData.domMainName + url;

    baseData.forEach(function (item, index) {
      data[item] = app.globalData[item]
    })

    data.thirdSession = app.globalData.thirdSession;
    data.lastUpdatedBy = app.globalData.username;
    data.createdBy = app.globalData.username;


    console.log('提交数据')
    console.log({url,data})

    wx.request({
      url: subUrl,
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: method,
      success: (res) => {
      console.log('返回数据')
      console.log(res.data);

      if (res.data.code == 7004 || res.data.code == 7003) {

        getApp().Login()

          wx.showToast({
            title: '登录状态已过期！',
            image: '/image/i/x.png',
            duration: 2000,
            success:()=>{
              // this.Login() //重新login获取Session
            }
          })

        } else if (res.data.code != 0 && res.data.code != 2) {
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

        } else {
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
