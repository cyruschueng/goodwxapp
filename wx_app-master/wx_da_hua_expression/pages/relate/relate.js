//index.js
//获取应用实例

var GLOBAL_PAGE
var APP = getApp()
var app = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/storage_key.js');

Page({
  data: {

      hotLabel: ["历史有农药","意见反馈",],//顶部按钮
      keyword:"历史有农药",

    tagListDisplay: ["a", "211", "213", "a", "211", "213", "a", "211", "213", "a", "211", "213",], //优惠券目录

    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    classesPic: [],
    shelf: {
      english_name: "New Arrivals",
      name: "新品上架"
    },
    productNewList: [],
    taobaoList:[],
    bindtapName: "index",
    
    // hiddenTaoBao: true,
    hiddenIndex: false,
    hiddenUserBack: true,
    hiddenUserBack: true,

    tabShow: 0, //0 列表,1下单,2反馈
    userBackValue:"",//用户的意见反馈
  },
  navArticle:function(e){
      
  },



  toOperation:function() {
        wx.showActionSheet({
            itemList: ["退货","物流单号","状态"],
        })
  },

  toOrder: function () {
        wx.navigateTo({
            url: '../order/order',
        })
  },


  switchLabel:function(e){
    var keyword = e.currentTarget.dataset.keyword
    var hotLabel = GLOBAL_PAGE.data.hotLabel
    switch(keyword){
        case hotLabel[0]: 
          GLOBAL_PAGE.setData({
              tabShow:0
          });break;
        case hotLabel[1]: 
            GLOBAL_PAGE.setData({
                tabShow: 1
          });break;
        case hotLabel[2]: 
            GLOBAL_PAGE.setData({
                tabShow: 2
          });break;
    }
    GLOBAL_PAGE.setData({
      keyword:keyword
    })
  },


  onLoad: function (option) {
    // 生命周期函数--监听页面加载
    var that = this;
    GLOBAL_PAGE = this

    if(APP.globalData.isLogin == true)
        GLOBAL_PAGE.onInit(option)
    else
        APP.login(option)
    // GLOBAL_PAGE.test()
    //  GLOBAL_PAGE.setData({
    //       productNewList: [{art_id:"1",title:"监听页面加载听页面加载听页面加载听页",summary:"生命周期函数生命周期函数生命周期函数生命周期函数"},{art_id:"1",title:"监听页面加载听页面加载听页面加载听页",summary:"生命周期函数生命周期函数生命周期函数生命周期函数"}]
    //   })

  },

  onInit: function () {
     
      // GLOBAL_PAGE.taobao()
      GLOBAL_PAGE.same()
  },

  //淘宝优惠券帮助
  getHelpInfo: function () {
      wx.showModal({
        title: '优惠券领取使用方式',
        content: '点击【领券省X元】按钮复制下单链接，在【手机淘宝】或浏览器中打开',
        showCancel:false,
        confirmText:"知道了",
      })
  },
  //获取优惠券url 
  getDiscount:function(e){
    var discount_url = e.currentTarget.dataset.discount_url
    wx.setClipboardData({
        data: discount_url,
        success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                // console.log(res.data) // data
                wx.showToast({
                  title: '下单链接复制成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
        }
    })
  },
  //获取淘宝列表
  taobao:function(){
      wx.request({
          url: API.TAOBAO() , 
          method:"GET",
          data: {
          },
          success: function(res) {
              console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                  GLOBAL_PAGE.setData({
                     taobaoList: res.data.art_list
                  })
              }
          },
          fail:function(res){
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
          }
      })
  },
  //获取同款列表
  same:function(){
      wx.request({
          url: API.ARTICALE_LIST() , 
          method:"GET",
          data: {
          },
          success: function(res) {
              console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                  GLOBAL_PAGE.setData({
                     productNewList: res.data.art_list
                  })
              }
          },
          fail:function(res){
            wx.showModal({
                title: '网络连接失败，请重试',
                showCancel:false,
            })
          }
      })
  },

  onShareAppMessage: function () { 
      return {
        title: '手绘故事',
        desc: '历史有农药',
        path: '/pages/relate/relate',
        // path: '/pages/public/public?keyword='+GLOBAL_PAGE.data.keyword
      }
  },
  

  getUserBack:function(e){
    var value = e.detail.value
    console.log(value)
    GLOBAL_PAGE.setData({
      userBackValue:value
    })  
  },

  userBack: function (e) {
      if (GLOBAL_PAGE.data.userBackValue == ""){
          wx.showModal({
                title: '客官，请随便写点意见吧',
                confirmText:"写一写",
                showCancel:false,
          })
          return
      }

      wx.request({
          url: API.USER_BACK() , 
          method:"GET",
          data: {
            session: wx.getStorageSync(KEY.session),
            back: GLOBAL_PAGE.data.userBackValue,
          },
          success: function(res) {
              console.log("collect success:",res.data)
              var object = res.data
              if (object.status == "true")
              {
                   wx.showToast({
                      title: object.msg,
                      icon: 'success',
                      duration: 2000
                  })
              }
              else {
                  wx.showToast({
                      title: "感谢您提供的宝贵意见",
                      icon: 'success',
                      duration: 2000
                  })
              }
          },
          fail:function(res){
              wx.showToast({
                  title: "感谢您提供的宝贵意见",
                  icon: 'success',
                  duration: 2000
              })
          },
          complete:function(){
            GLOBAL_PAGE.setData({
              userBackValue:"",
            })
          }
      })
  },
  



  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },

  toNew: function (res) {
    this.setData({
      hiddenNew: false,
      hiddenHot: true,
      hiddenIndex: true
    })
  },
  toHot: function (res) {
    this.setData({
      hiddenNew: true,
      hiddenHot: false,
      hiddenIndex: true
    })
  },
  toIndex: function () {
    this.setData({
      hiddenNew: true,
      hiddenHot: true,
      hiddenIndex: false
    })
  }
})