// pages/myCenter/details/details.js
var app = getApp();
Page({
  data: {
    tabindex:0,
    viewindex:0,
    ShowPhoneInfo: true,
    viewLeft: 0,
    showView: true,
    currentTab: 0,
    avatarUrl: "",
    nickName: "",
    currentTab: 0,
    currentindex: 0,
    arrowClosed: 'active',
    arrowOpened: '',
    imgWidth: 0,
    imgHeight: 0,
    imgNum: 0,
    itemimglist: [],
    looksdata: 0,
    loversdata: 0,
    collectiondata: 0,
    introduce: "",
    position: "",//职务
    myPhone: "",
    wechat: "",//微信号
    address: "",//地址
    third_session: "",
    userIdentity: "普通用户",
    isDaiLi: "",//vip等级
    development_mode: 0,
    likeiconsrc: "/images/icon_home_praise.png",//赞背景图
    collectsrc: "/images/icon_home_favor.png",//收藏背景图
    fromid: "",//分享者id
    user_id: "",//我的推荐人
    fromshopid:"",//我代言的门店
    ShowRecommendState: true,//显示我的推荐人有无状态
    ShowRepresentState: true,//显示代言的门店有无状态
    itemuserinfo:true,
    listinfoshow:true,
  },
  onLoad: function (options) {
    console.log("传递fromid" + options.user_info);
    var _this = this;
    //判断有没有我的推荐人
    if (options.user_info > 0) {
      _this.refreshReferences(options.user_info);
      _this.setData({
        user_id: options.user_info,
        ShowRepresentState: true,
        ShowRecommendState:true,
        itemuserinfo: false,
      });
    }else{
      _this.setData({
        ShowRepresentState: false,
        itemuserinfo:true,
      });
    }
    //判断有没有代言的门店
    if (options.fromshopid > 0) {
      _this.refreshRepresenShop(options.fromshopid);
      _this.setData({
        fromshopid: options.fromshopid,
        ShowRecommendState: true,
        listinfoshow: false,
      });
    } else {
      _this.setData({
        ShowRecommendState: false,
        listinfoshow:true,
      });
    }
  },
  onReady: function () {
    this.animation = wx.createAnimation();
    var width = wx.getSystemInfoSync().screenWidth;
    var imgWidth = (width - 40) / 3;
    var imgHeight = imgWidth * 148 / 202;
    this.setData({
      imgWidth: imgWidth,
      imgHeight: imgHeight
    });
  },
  onShareAppMessage: function () {

  },
  changeType: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
      currentindex: e.target.dataset.current
    })
  },
  changetab:function(e){
    this.setData({
      tabindex: e.target.dataset.index,
      viewindex: e.target.dataset.index
    })
  },
  //刷新我的推荐人
  refreshReferences: function (userid){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: userid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(resdata.photos[0].photo_url);
        _this.setData({
          looksdata: resdata.popularity,
          loversdata: resdata.lovers,
          collectiondata: resdata.collection,
          introduce: resdata.introduce,
          nickName: resdata.nickname,
          avatarUrl: resdata.headimgurl,
          // position: resdata.position,
          itemimglist: resdata.photos,
          isDaiLi: res.data.data.isDaiLi,
          myPhone: resdata.mobile,//手机
          wechat: resdata.wechat,//微信
          address: resdata.address,//地址
        })
        if (resdata.photos.length > 0) {
          _this.setData({
            imgNum: res.data.data.photos.length,
          })
        }
      }
    })
  },
  //刷新我代言的门店
  refreshRepresenShop: function (shop_id){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getShopInfo',
      method: 'get',
      data: {
        shop_id: shop_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        _this.initprolist(res.data.data.cat_info[0].cat_id)
        _this.setData({
          shop_name: resdata.shop_name,//店铺名称
          address: resdata.address,//店铺地址
          shop_imgs: resdata.shop_imgs,//店铺展示轮播图
          boxwidth: resdata.cat_info.length * 70
      
        })
      }
    })
  }
})