App({

  globalData: {
    memberId: '',
    bizId: '',
    shopId: '',
    busname: '',
    thirdSession: '',
    username: '',
    address: '',
    linkphone: '',
    endTime: '',
    startTime: '',
    scan: 0,
    error:0
  },

  onLaunch: function () {
    wx.setStorage({
      key: 'scan',
      data: 0,
    })

    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })

    this.appshow()
  },


  onHide: function () {
    //保存退出时候的时间
    wx.setStorage({
      key: 'timestamp',
      data: Date.parse(new Date())
    })

    wx.setStorage({
      key: 'scan',
      data: 1,
    })

  },

  onShow: function () {


    var that = this;

    wx.getStorage({
      key: 'scan',
      success: function (res) {
        if (res.data) {
          var ontimestamp = Date.parse(new Date());


          wx.getStorage({
            key: 'timestamp',
            success: function (res) {
              console.log(res.data)
              if (ontimestamp - res.data >= 60000) {

                wx.switchTab({
                  url: '/page/index/index'
                })

                wx.getStorage({
                  key: 'busname',
                  success: function (res) {
                    that.globalData.busname = res.data;
                  },
                })
                that.appshow()

                


              }else{
                wx.getStorage({
                  key: 'memberId',
                  success: function (res) {
                    that.globalData.memberId = res.data;
                  },
                })
                wx.getStorage({
                  key: 'bizId',
                  success: function (res) {
                    that.globalData.bizId = res.data;
                  },
                })
                wx.getStorage({
                  key: 'shopId',
                  success: function (res) {
                    that.globalData.shopId = res.data;
                  },
                })
                wx.getStorage({
                  key: 'busname',
                  success: function (res) {
                    that.globalData.busname = res.data;
                  },
                })

              }
            },
          })

        }
      },
    })


    







    // wx.getStorage({
    //   key: 'busname',
    //   success: function (res) {
    //     that.globalData.busname = res.data;
    //   },
    // })
    // console.log('globalData')
    // console.log(this.globalData)
    // wx.getStorage({
    //   key: 'scan',
    //   success: function(res) {
    //     if( !(res.data) ){
    //       that.appshow()
    //     }else{
    //       wx.getStorage({
    //         key: 'memberId',
    //         success: function(res) {
    //           that.globalData.memberId = res.data;
    //         },
    //       })
    //       wx.getStorage({
    //         key: 'bizId',
    //         success: function (res) {
    //           that.globalData.bizId = res.data;
    //         },
    //       })
    //       wx.getStorage({
    //         key: 'shopId',
    //         success: function (res) {
    //           that.globalData.shopId = res.data;
    //         },
    //       })
    //       wx.getStorage({
    //         key: 'busname',
    //         success: function (res) {
    //           that.globalData.busname = res.data;
    //         },
    //       })
    //     }
    //   },
    // })

  },

  //未登陆跳到登陆页面
  ZZtoLogin: function () {
    wx.navigateTo({
      url: '/page/login/index'
    })
  },

  appshow: function () {
    var that = this;
    //获取本地3rd
    wx.getStorage({
      key: '3rd_session',
      success: function (res) {
        if (res.data) {

          console.log('本地获取3rd成功')
          // 获取成功、判断是否失效

          wx.checkSession({
            success: function () {
              console.log('没失效')
              that.getuser(res.data)
              that.globalData.thirdSession = res.data

            },
            fail: function () {
              that.userLogin()
            }
          })
        } else {
          that.userLogin()
        }
      },
      //获取3rd 失败 调用login获取code
      fail: function () {
        that.userLogin()
      }
    })
  },

  //获取用户信息
  getuser: function (key) {
    var that = this;
    var subdata = {}
    subdata.sessionKey = key;
    wx.request({
      url: 'https://lingju360.natappvip.cc/miniapp/miniprogram/userInfo/getUserInfoBySKey',
      data: subdata,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success: function (res) {
        if (res.data.data == -1) {
          wx.setStorage({
            key: 'logins',
            data: 0,
          })
        } else {

          wx.setStorage({
            key: 'logins',
            data: 1,
          });
          that.globalData.memberId = res.data.data.id
          wx.setStorage({
            key: 'memberId',
            data: res.data.data.id,
          });

          that.getAdd()

        }
      },
      fail: function () {
        wx.setStorage({
          key: 'logins',
          data: 0,
        })

        console.log('服务器错误1')

        that.globalData.error = 1;
      }
    })
  },

  //login获取code
  userLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('login获取code-----------' + res.code)

          var subdata = {};

          subdata.userCode = res.code;
          //成功获取code后 获取3rd
          wx.request({
            url: 'https://lingju360.natappvip.cc/miniapp/miniprogram/userInfo/getSessionKey',
            data: subdata,
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            success: function (res) {
              console.log('--------------返回数据3rd')
              //成功返回3rd、存到本地
              if (res.data.data) {
                wx.setStorage({
                  key: '3rd_session',
                  data: res.data.data
                })
                that.getuser(res.data.data)
              } else {
                that.userLogin()
              }
            },
            fail:function(){
              console.log('服务器错误')

              that.globalData.error = 1;
            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function () {
        console.log('login获取code失败')
        
      }
    });

  },


  //获取地址
  getAdd: function () {
    var that = this;


    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var subdata = {};
        subdata.latitude = res.latitude;
        subdata.longitude = res.longitude;
        subdata.thirdSession = that.globalData.thirdSession;
        wx.request({
          url: 'https://lingju360.natappvip.cc/miniapp/cat/baseInfo/selectShopByDistance',
          data: subdata,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success: function (res) {
            console.log('--------------获取地址')
            console.log(res.data)

            that.globalData.bizId = res.data.data[0].bizId;
            that.globalData.shopId = res.data.data[0].id;
            that.globalData.busname = res.data.data[0].busname;
            that.globalData.address = res.data.data[0].address;
            that.globalData.linkphone = res.data.data[0].linkphone;
            that.globalData.endTime = res.data.data[0].endTime;
            that.globalData.startTime = res.data.data[0].startTime;

            wx.setStorage({
              key: 'busname',
              data: res.data.data[0].busname,
            })

            wx.setStorage({
              key: 'bizId',
              data: res.data.data[0].bizId,
            })

            wx.setStorage({
              key: 'shopId',
              data: res.data.data[0].id,
            })


            console.log('globalData')
            console.log(that.globalData)

          }
        })
      }
    })


  },


  //ajax
  commonAjax: function (url, baseData, data, cb, app) {

    var subUrl = "https://lingju360.natappvip.cc/miniapp/" + url;

    baseData.forEach(function (item, index) {
      data[item] = app.globalData[item]
    })
    data.thirdSession = app.globalData.thirdSession;

    console.log('提交数据')
    console.log(data)

    wx.request({
      url: subUrl,
      data: data,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'post',
      success: function (res) {
        console.log('返回数据')
        console.log(res);
        cb(res)

      }
    })
  }



})
