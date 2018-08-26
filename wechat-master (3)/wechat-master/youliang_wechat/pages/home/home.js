//index.js
//获取应用实例
const APP_ID = 'wxfaf1e160e6da492e';//输入小程序appid  
const APP_SECRET = '49feb29ba8667060b3180ccbcc910a6d';//输入小程序app_secret  49feb29ba8667060b3180ccbcc910a6d
const app = getApp()

Page({
  data: {
    userInfo: {},
    integral:' 0',
    grade: 'baibai',
    descript: '一句话描述自己',
    area: '未选择',
    class_name: '未填写',
    brand: '填写您经营门店的名称',
    hidden: false,
  },
  
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   if (app.globalData.userInfo) {
      this.fetchData(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.fetchData(app.globalData.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {

          app.globalData.userInfo = res.userInfo
          this.fetchData(app.globalData.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   console.log('onLoad');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      }) 
      that.update();
      that.fetchData(userInfo);
    })


    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        console.log('shareMenu share success')
        console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onShareAppMessage: function () {
    return {
      title: '优粮大学',
      path: '/pages/jifen/jifen',
      success: function (res) {
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },


  fetchData: function (userInfo) {
    
    console.log(userInfo);
    var that=this
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          //获取openid接口  
          url: 'https://youliang.shaoziketang.com/list.php',
          data: {
            code: res.code,
            area: userInfo.area,
            province: userInfo.province,
            country: userInfo.country,
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            integral: userInfo.integral,
            grade: userInfo.grade,
            city: userInfo.city,
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
            that.setData({
             integral: res.data.info.integral,    
             descript: res.data.info.descript,
             class_name: res.data.info.class_name,
             brand: res.data.info.brand,
             area: res.data.info.area,
             grade: res.data.info.grade,
             hidden: true, 
             
           })
            
          }
        })
      }
    })
    setTimeout(function () { 
      that.setData({
        hidden: true
      })
    }, 1500)
  },

 
  /**/
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '排行榜',
      path:'/pages/jifen/jifen',
      imageUrl: 'https://youliang.shaoziketang.com/qqq.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  evaSubmit: function (eee) {
    var that = this;
    //提交(自定义的get方法)
    wx.redirectTo({
      url: '../user/user',
    })
   
  },
})






