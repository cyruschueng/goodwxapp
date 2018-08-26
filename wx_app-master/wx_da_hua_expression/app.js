//app.js
var Api = require('utils/api.js');
var Key = require('utils/storage_key.js');
var g
var GLOBAL_PAGE
App({
  globalData:{
    pagePrivate:null,
    pagePublic:null,
    windowWidth:null,
    windowHeight:null,
    isLogin:false,
  }, 
  onLaunch: function (option) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // this.getUserInfo()
      
      console.log("onLaunch", option.scene,option.shareTicket)
      wx.getShareInfo({ 
          shareTicket: option.shareTicket,
          success:function(res){
              console.log(res)
          },
        })
     


        var that =this
        GLOBAL_PAGE = this
        var _pixelRatio,_windowWidth,_windowHeight
        
        wx.getSystemInfo({
          success: function(res) {
            //设置屏幕宽/高
            // console.log(res)
            that.globalData.windowWidth = res.windowWidth
            that.globalData.windowHeight = res.windowHeight

            console.log(res.windowWidth,res.windowHeight,res.pixelRatio)
          }
        })

        // that.login()
    },

    login:function(option){
        console.log("session:", wx.getStorageSync('session') )
        wx.login
        ({
            success: function (res) 
            {
              var _session = wx.getStorageSync('session') 
              if (! _session  ) //检查session,不存在，为false
                _session = "false"
              var url = Api.userLogin()
              console.log(res.code)
              wx.request
              ({  
                url: url, 
                method:"GET",
                data:{
                  js_code:res.code,
                  session:_session,
                },
                success: function(res)
                {
                  console.log("success:")
                  console.log(res)
                  if (res.data.status == "true") //登陆成功
                  {
                      GLOBAL_PAGE.globalData.isLogin = true
                      wx.setStorageSync('session', res.data.session)
                      //Todo 初始化页面、目录
                      // GLOBAL_PAGE.onInit()
                    //   getCurrentPages()[0].onInit(option)

                      //暂时专供抢画后保存图片用，日后与login合体
                    //   GLOBAL_PAGE.getUserInfoRequest()
                  }
               
                },
                fail:function(res) { 
                    wx.showModal({
                        title: '数据同步未成功，点击"我"右下角"+"重新同步',
                        showCancel:false,
                        confirmText:"知道啦",
                    }) 
                },
                complete:function(){
                    //无论登陆是否成功，立马初始化图片
                    getCurrentPages()[0].onInit(option)
                },
              })
            }
        });
    },

    getUserInfoRequest:function(){

        GLOBAL_PAGE.globalData.isLogin = true
        var url = Api.USER_INFO() 

        var session = wx.getStorageSync(Key.session) 
        if (! session  ) //检查session,不存在，为false
        session = "false"
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            method:"GET",
            data: {
              session: session,
            },
            success: function(res) {
              var object = res.data
              if (object.status == "true")
              {
                //设置selecCategory == 默认目录。
                  wx.setStorageSync(
                      Key.USER_INFO,
                      object.user_info
                  )
              // GLOBAL_PAGE.renderCategory()
              }
              else
                wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel:false,
                })
            },
            fail:function(res){
                wx.showModal({
                    title: '网络连接失败，请重试',
                    showCancel:false,
                })
            },
          })
      },

  //Page：private  初始化页面的钩子
    onInit:function( ){
      //数据初始化 图片
      var that = this;
      var url = Api.imgQuery() 

      var session = wx.getStorageSync(Key.session) 
      if (! session  ) //检查session,不存在，为false
        session = "false"

      //获取表情列表
      wx.request({
          url: url, //仅为示例，并非真实的接口地址
          method:"GET",
          data: {
            session: session,
            category_id: 'null',
          },
          success: function(res) {
            var object = res.data
            if (object.status == "true")
            {
                wx.setStorageSync(
                    Key.emoticon,
                    object.img_list
                )
                // GLOBAL_PAGE.renderEmoticon()
            }
            else
              wx.showModal({
                  title: '网络连接失败，请重试',
                  showCancel:false,
              })
          },
          fail:function(res){
              wx.showModal({
                  title: '网络连接失败，请重试',
                  showCancel:false,
              })
          },

        })

      //数据初始化 目录
        url = Api.categoryQuery() 
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          method:"GET",
          data: {
            session: session,
          },
          success: function(res) {
            var object = res.data
            if (object.status == "true")
            {
              //设置selecCategory == 默认目录。
                wx.setStorageSync(
                    Key.category,
                    object.category_list
                )
            // GLOBAL_PAGE.renderCategory()
            }
            else
              wx.showModal({
                  title: '网络连接失败，请重试',
                  showCancel:false,
              })
          },
          fail:function(res){
              wx.showModal({
                  title: '网络连接失败，请重试',
                  showCancel:false,
              })
          },
        })
    },


})


// ,{
//       "pagePath": "pages/manage/manage",
//       "text": "管理",
//       "iconPath":"images/icon_smile.png",
//       "selectedIconPath":"images/icon_big_hot.png"
//     }

// ,{
//       "pagePath": "pages/together/together",
//       "text": "一起画",
//       "iconPath":"images/icon_smile.png",
//       "selectedIconPath":"images/icon_big_hot.png"
//     }


//   "tabBar": {
//     "backgroundColor":"#fcfcfc",
//     "color":"#000",
//     "selectedColor":"#56abe4",
//     "borderStyle":"black",
//     "list": [{
//       "pagePath": "pages/public/public",
//       "text": "热图",
//       "iconPath":"images/icon_smile.png",
//       "selectedIconPath":"images/icon_big_hot.png"
//     },{
//       "pagePath": "pages/private/private",
//       "text": "我",
//       "iconPath":"images/icon_smile.png",
//       "selectedIconPath":"images/icon_big_my.png"
//     }]
//   },