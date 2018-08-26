// pages/myCenter/myCenter.js
var app = getApp();
var shop_id = "0";//店铺id
Page({
  data: {
    // text:"这是一个页面"
    hiddenfunction: true,//
    isHiddenToast: true,
    balance:0,//积分
    oneselfnumber:0,//冬瓜
    shop_id:0,//店铺id
    from_id:0,//我的推荐人ID
    userIdentity:"",//用户身份
    willPayOrderarr: [],//代付款订单数组
    willSendOrderarr: [],//代发货订单数组
    willSeliveryOrderarr: [],//代收货订单数组
    willBackOrderarr: [],//退款退货订单数组
    linkmessage:[
      {
        groupName: "用户交流群",
        groupTap: "",
        icon: "/images/myCenter/Communication-Bt.png",
        rightImage: "/images/myCenter/arrow.png"
      },
      {
        groupName: "身份升级",
        groupTap: "dishes",
        icon: "/images/myCenter/upgrade-Bg.png",
        rightImage: "/images/myCenter/arrow.png"
      }
    ],
    messages: [
      {
        groupName: "生成海报图",
        groupTap: "",
        icon: "/images/myCenter/Posters-Bg.png",
        rightImage: "/images/myCenter/arrow.png"
      },
      {
        groupName: "我的瓜田",
        groupTap: "shopindex",
        icon: "/images/myCenter/shop-Bg.png",
        rightImage: "/images/myCenter/arrow.png"
      },
      {
        groupName: "家族排行",
        groupTap: "teamRank",
        icon: "/images/myCenter/seniority.png",
        rightImage: "/images/myCenter/arrow.png"
      },
      {
        groupName: "我的瓜棚",
        groupTap: "za",
        icon: "/images/myCenter/myGuapeng.png",
        rightImage: "/images/myCenter/arrow.png"
      },
      {
        groupName: "消息",
        groupTap: "words",
        icon: "/images/myCenter/message.png",
        rightImage: "/images/myCenter/arrow.png"
      }
    ]
  },

  isShowToast: function () {
    this.setData({
      isHiddenToast: false
    })
  },
  toastChange: function () {
    this.setData({
      isHiddenToast: true
    })
  },
  //身份升级
  tapdishes: function () {
    var that = this;
    if (app.globalData.development_mode > 0) {
      shop_id = that.data.shop_id;
      wx.navigateTo({
        url: "/pages/myCenter/dishes/dishes"
      })
    }
  },
  //购物车
  tapchatblock:function(){
      wx.navigateTo({
          url: "/pages/myCenter/shop/chatblock/chatblock"
      })
  },
  //收货地址
  tapaddressblock: function () {
      wx.navigateTo({
          url: "/pages/myCenter/shop/chartmap/chartmap"
      })
  },
  //我的瓜田
  tapshopindex: function () {
    var that = this;
    if (app.globalData.development_mode > 0) {
      shop_id = that.data.shop_id;
      wx.navigateTo({
        url: "/pages/myCenter/shop/index/index?shop_id=" + that.data.shop_id
      })
    }
  },
  //家族排行榜
  tapteamRank: function () {
    wx.navigateTo({
      url: "/pages/myCenter/teamRank/teamRank"
    })
  },
  //瓜棚
  tapza: function () {
    if (app.globalData.development_mode > 0) {
      wx.navigateTo({
        url: "/pages/myCenter/line/line"
      })
    }
  },
  //消息
  tapwords:function () {
    console.log("1312423")
    wx.navigateTo({
      url: "/pages/myCenter/wordview/wordview"
    })
  },
  //在线客服
  tapcontact: function () {
    wx.navigateTo({
      url: "/pages/myCenter/contact/contact"
    })
  },
  //关于咚咚
  tapabout: function () {
    wx.navigateTo({
      url: "/pages/myCenter/about/about"
    })
  },
  onLoad: function (options) {
    var that = this
    if (app.globalData.development_mode > 0) {
      that.setData({
        hiddenfunction: false
      })
    };
    that.setData({
      avatarUrl: app.globalData.userinfo.avatarUrl,
      nickName: app.globalData.userinfo.nickName
    })
    that.GetUserDataInfo(app.globalData.user_id);
    that.RefreshCurrency();
    console.log("kaifa"+app.globalData.development_mode);
    
  },
  bindtap: function (event) {
    wx.navigateTo({
      url: "/pages/message/search/search"
    })
  },
  onPullDownRefresh: function () {
    this.GetUserDataInfo(app.globalData.user_id);
    wx.stopPullDownRefresh();
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  detailsTap: function (event) {
    //跳到代言
    if (!this.data.hiddenfunction){
      wx.navigateTo({
        url: "/pages/myCenter/myRecommend/myRecommend"
      })
    }
  },
  recommendTap: function (event) {
    //跳到详情
    var fromid = this.data.from_id;
    var fromshopid = app.globalData.fromshopid;
    console.log("传递fromid" + app.globalData.from_id);
    console.log("传递shopfromid" + app.globalData.fromshopid);
    wx.navigateTo({
      url: "/pages/myCenter/details/details?user_info=" + fromid + "&fromshopid=" + fromshopid,
    })
  },
  cashTap: function (event) {
    wx.navigateTo({
      url: "/pages/myCenter/cash/cash"
    })
  },
  orderinfo:function(e){
      wx.navigateTo({
        url: "/pages/myCenter/order/order?oderid=" + e.currentTarget.dataset.index+""
      })
  },
  GetUserDataInfo: function (userid) {
    var that = this;
    wx.request({
      url: app.globalData.url +'/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: userid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        that.setData({
          balance: resdata.balance,
          shop_id: resdata.shop_id,//我的店铺id
          from_id: resdata.fromid //我的推荐人ID
        })
        //判断用户身份
        switch (resdata.isDaiLi) {
          case 0:
            that.setData({
              userIdentity: "普通用户"
            })
            break;
          case 1:
            that.setData({
              userIdentity: "大使"
            })
            break;
          case 2:
            that.setData({
              userIdentity: "销售"
            })
            break;
          case 3:
            that.setData({
              userIdentity: "地主"
            })
            break;
          case 4:
            that.setData({
              userIdentity: "店主"
            })
            break;
          case 4:
            that.setData({
              userIdentity: "合伙人"
            })
            break;
          default:
            console.log("default");
        }
      }
    })
  },
  //获取用户订单信息
  getUserOrderInfo: function (userid, statustype) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/ordermanage/orders/myorders',
      method: 'get',
      data: { 
        user_id: userid,
        page:1,
        shop_id:0,
        status:statustype,//订单状态
        size:10
           },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        //判断用户身份
        switch (statustype) {
          case 0:
            that.setData({
              willPayOrderarr: resdata.arr //代付款
            })
            break;
          case 1:
            that.setData({
              willSendOrderarr: resdata.arr //代发货
            })
            break;
          case 2:
            that.setData({
              willSeliveryOrderarr: resdata.arr // 待收货
            })
            break;
          case 3:
            that.setData({
              willBackOrderarr: resdata.arr // 退款／退货
            })
            break;
          default:
            console.log("default");
        }
      }
    })

  },
      //更新市场可购买冬瓜数量等数值
    RefreshCurrency: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/sxcurrency/Trade/renovate',
      method: 'POST',
      data: {
        id: app.globalData.user_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
         console.log(res);
        // console.log("货币返回数据" + resdata.buy);
        that.setData({
          oneselfnumber: resdata.personal
        })
      }
    })
  }
  
})
