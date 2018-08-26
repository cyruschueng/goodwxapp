//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    abc:''
  },


  jumpCarousel:function(){
    wx.switchTab({   //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      url: '../carousel/carousel'
    });
  },
  //获取数据
  clickData:function(e){
  //   wx.request({
  //     url: '../../jsonFile/list.js',   //要http或者https
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     dataType: 'json',
  //     success: function (res) {
  //       console.log(res)
  //     }
  //   })
    console.log('GET不到数据')
  },
  getLocation:function(){

    // wx.getLocation({
    //   type: 'wgs84',
    //   success: function (res) {
    //     console.log(res)
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     var speed = res.speed
    //     var accuracy = res.accuracy
    //   }
    // })

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })

  },

  //上传图片
  clickImg:function(){
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://weixin.qq.com', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = res.data
            //do something
          }
        })
      }
    })
  },

  //拨打电话号码
  getCall:function(){
    wx.makePhoneCall({
      phoneNumber: '15777775935' //仅为示例，并非真实的电话号码
    })

  },
  //扫码
  getCode: function () {
    let a = 2
    // 允许从相机和相册扫码
    if(a>5){
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })  
    }
    if(a>1){
      // 只允许从相机扫码
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          console.log(res)
        }
      })
    }
 

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  //获取位置
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)    //经度
        console.log(res.latitude)     //纬度
      }
    })
  },
  //移动位置
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
    //移动标注
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
//缩放视野展示所有经纬度
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [
        {
        latitude: 23.10229,   //纬度
        longitude: 113.3345211, //经度
      },
       {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  //获取设备信息
  getInfo:function(){
      wx.getSystemInfo({
        success: function (res) {
          console.log(res.brand)      //手机品牌
          console.log(res.model)      //手机型号
          console.log(res.pixelRatio)  //	设备像素比
          console.log(res.screenWidth)  //屏幕宽度
          console.log(res.screenHeight)  //屏幕高度
          console.log(res.windowWidth)  //可使用窗口宽度
          console.log(res.windowHeight)  //可使用窗口高度
          console.log(res.language)    //微信设置的语言
          console.log(res.statusBarHeight)  //状态栏的高度
          console.log(res.system)    //操作系统版本
          console.log(res.version)    //微信版本号
          console.log(res.platform)  //	客户端平台
        }
      })
    },

    //添加联系人
    addPerson:function(){
      wx.addPhoneContact({
        mobilePhoneNumber:15777775935,  //保存的电话号码
        success:function(res){
            console.log(res ,"right")    //点击确定
        },
        fail:function(err){
          console.log(err, 'err')       //点击取消
        }
      })
    },

    //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
    jumpOne:function(){
      wx.navigateTo({
        url: '../test/test?id=1'
      })
    },

     //关闭当前页面，跳转到应用内的某个页面。
    jumpTwo: function () {
      wx.redirectTo({
        url: '../nextPage/nextPage?page=2'
      })
    },
    //关闭所有页面，打开到应用内的某个页面。
    jumpThree: function () {
      wx.reLaunch({
        url: '../finishpage/finishpage?page="666"'
      })
    },
    //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
    jumpFour: function () {
      wx.navigateTo({
        url: '../test/test?id=1'
      })
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    // wx.showShareMenu({  //显示当前页面的转发按钮
    //   withShareTicket: true
    // })
    // wx.hideShareMenu()  //隐藏转发按钮
    return {
      title: '好的',
      path: '/page/test/test',
      success: function (res) {
        // 转发成功
        console.log('1')
      },
      fail: function (res) {
        // 转发失败
        console.log('0')
      }
    }
  },
  setJump:function(res){
    // console.log(res)
    // wx.openSetting({
      
    // })
    // wx.getUserInfo({    //获取用户信息
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.getLocation({    //获取地理位置
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.chooseLocation({    //获取地理附近位置
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.chooseAddress({       //获取通讯地址
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.chooseInvoiceTitle({       //获取发票抬头
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    // wx.getWeRunData({       //微信运动步数
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.startRecord()
      }
    })
    // wx.getSetting({
    //   success:function(res){
    //       console.log(res)
    //   }
    // })
  }
})