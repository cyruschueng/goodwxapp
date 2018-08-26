// pages/details/details.js
const web_url = getApp().globalData.web_url;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicator_dots:false,
    autoplay:true,

    imgUrl: [],
    title:'',
    price:'',
   
    freight:'',
    stock:'',
    goods_num:1,
    animationData_1: {},
    animationData_2: {},
  },
  //点击店铺跳转主页
  toIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
      success: function(res) {},
    })
  },
  //开关评论
  setOnOff:function(){
    let that = this;
    let isOnOff = that.data.isOnOff;
    isOnOff = !isOnOff;
    that.data.isOnOff = isOnOff
    console.log(that.data)
    that.setData({
      isOnOff: isOnOff
    })
  },
  //动画函数
  animationFn: function (btt, top_fixed,onOff){
    var that = this;
    var actionBuy = onOff;
    var animation_1 = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "50% 50% 0",
    });
    animation_1.bottom(btt).step();
    var animation_2 = wx.createAnimation({
      duration: 0,
      timingFunction: "linear",
      delay: 0,
      transformOrigin: "50% 50% 0",
    });
    animation_2.top(top_fixed).step();
    that.setData({
      animationData_1: animation_1.export(),
      animationData_2: animation_2.export(),
      actionBuy: actionBuy
    })
  },
  //点加入购物车，调用动画
  toShopcart:function(){
    var that = this;
    that.animationFn(0,0,true)
  },
  //点加立即购买，调用动画
  toBuy:function(){
    var that =this;
    that.animationFn(0, 0, false)
  },
  //关闭动画块
  animation_close:function(){
    var that = this
    that.animationFn('-500rpx', "1250rpx")
  },
  //减少购买数量
  minusCount:function(e){
    var that = this
    let goods_num = that.data.goods_num;
    goods_num--;
    if (goods_num == 0){
      goods_num = 1
    }
    that.setData({
      goods_num: goods_num
    })
  },
  //增加购买数量
  addCount: function (e) {
    var that = this;
    let goods_num = that.data.goods_num;
    goods_num++;
    that.setData({
      goods_num: goods_num
    })
  },
  //手动输入购买数量
  changeNumFn: function (e) {
    var that = this;
    let goods_num = e.detail.value;
    that.setData({
      goods_num: goods_num
    })
  },
  //提交购物车
  submitOrder: function (e) {
    var that = this;
    wx.request({
      url: web_url + '/app.php?c=Cart',
      data: {
        user_id: that.data.user_id,
        goods_id: that.data.goods_id,
        goods_num: that.data.goods_num
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.showToast({
          title: '加入成功',
          icon: 'succcess',
          image: '',
          duration: 2000,
          mask: true,
        })
      },
    })
  },
  //提交支付
  submitBuy:function(){
    var that = this;
    var way = 0;
    wx.navigateTo({
      url: '/pages/payHtml/payHtml?way=' + way + '&goods_id=' + that.data.goods_id + '&goods_num=' + that.data.goods_num,
      success: function (res) { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('jiazai', options)
    var that = this;
    if (options.fuserId == null) {
      wx.setStorageSync('fuserId', null)
    } else {
      wx.setStorageSync('fuserId', options.fuserId)
    }

    try {
      var user_id = wx.getStorageSync('user_id')
      var userMessage = wx.getStorageSync('user_info')
      that.setData({
        user_id: user_id
      })
    } catch (e) {
      // Do something when catch error
    }
    if (options.fuserId == null) {
      that.setData({
        goods_id: options.id
      })
    } else {
      that.setData({
        goods_id: options.goods_id,
        fuserid: options.fuserId
      })
    }
    console.log('000000000',that.data.user_id)
    console.log('that.data.fuserId', that.data.fuserid)
    //分销请求
    wx.request({
      url: web_url + '/app.php?c=User&act=fxuser',
      data: {
        fuserid: that.data.fuserid
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('测试分销', res)
      }
    })
    
    // 转发前配置转发信息
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        console.log('----', res)
      },
    })
    console.log('===', options)
    console.log('fuserId', options.fuserId)
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }

    //请求加载页面信息
    wx.request({
      url: web_url + '/app.php?c=Goods&act=show',
      data: {
        user_id: that.data.user_id,
        id: that.data.goods_id
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var imgUrl = res.data.images;
        var title = res.data.name;
        var price = res.data.price;
        var freight = res.data.fare;
        var stock = res.data.inventory;
        var goods_img = res.data.thumb
        that.setData({
          imgUrl: imgUrl,
          title: title,
          price: price,
          freight:freight,
          stock: stock,
          goods_img: goods_img
        })
      },
    })
    //获取评论内容
    wx.request({
      url: web_url + '/app.php?c=Message&act=messagelist',
      data: {
        goodsid: that.data.goods_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('pinglun', res.data)
        let evaluate_num = 0
        if (res.data !== null){

          evaluate_num = res.data.length
        }
        that.setData({
          evaluate_list:res.data,
          evaluate_num: evaluate_num
        })
      }
    })

    //获取详情资料
    wx.request({
      url: web_url + '/app.php?c=Goods&act=show', //仅为示例，并非真实的接口地址
      data: {
        id: that.data.goods_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          particular: res.data,
        });

        var article = res.data.content;

        if (article == "") {
          article = "管理员好懒，什么都没有留下~";
        }
        /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
        WxParse.wxParse('article', 'html', article, that, 0);
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  //转发页面
  onShareAppMessage: function (options) {
    // console.log('options', options)
    var that = this
    return {
      title: that.data.title,
      path: '/pages/goods-details/goods-details?fuserId=' + that.data.user_id + '&goods_id=' + that.data.goods_id,
      success: function (res) {
        // console.log('转发', res)
        wx.showModal({
          title: '转发成功',
          content: '',
          showCancel: false,
        })
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            // console.log('获取转发信息', res)
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        console.log('转发失败', res)
      }
    }
  },
})