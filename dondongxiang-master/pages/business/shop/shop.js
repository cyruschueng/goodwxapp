// pages/cooperation/shop/shop.js
var app = getApp();
Page({
  data: {
    confimgurl:'/images/icon_home_arrow.png',
    conftab:0,
    hiddenbtn:true,
    showdesc:true,
    coverHeight: 0,
    openStatus: 'closed',
    arrorbottom:"arrorbottomhide",
    arrowsrc:'/images/business/shop/icon_filter_arrow.png',
    boxwidth:375,
    shop_id:0,
    tabclass:0,
    prolist:[],
    shop_imgs:[],//店铺海报图
    shop_name:"XXXX",//店铺名字
    Shopkeeperheadimgurl:"",//店主头像
    Shopkeepername:"",//店主名称
    ShopkeeperId:0,//店主ID
    address:"XXXX",//店铺地址
    tel:"",//电话
    posterUrl:"",//海报url
    introduce:"XXXX",//店铺介绍
    act_description:"XXXXX",//活动描述
    link_url:"",//易企秀链接
    cat_info:[],//店铺产品分类
    goodslist:[],//产品列表
    current_catid:1,//当前请求分类id
    shoplongitude: 0,//店铺地址坐标longitude
    shoplatitude: 0//店铺地址坐标latitude
  },
  onLoad: function (options) {
    var _this = this;
    console.log(options)
    if (options.shop_id>0){
      _this.setData({
        shop_id : options.shop_id
      });
      _this.requestShopdata(options.shop_id);
      _this.requestgoodsdata(options.shop_id, _this.data.current_catid);
      
    }

    if (options.fromshop_id>0){
      getCurrentPageUrlWithArgs();
    }
  },
  onReady: function () {
    var width = wx.getSystemInfoSync().screenWidth;
    this.setData({
      coverHeight: width * 338 / 720
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var fromshop_id = app.globalData.user_id;
    var shopid = this.data.shop_id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '就是这个店，我推荐给你了',
      path: '/pages/business/shop/shop?fromshop_id=' + fromshop_id + '&shop_id=' + shopid,
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '转发失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  //根据店铺分类点击请求产品列表
  choosecatgoods:function(e){
      this.setData({
        tabclass: e.currentTarget.dataset.index,
      })
      this.initprolist(e.currentTarget.dataset.index);
  },
  //初始化商品列表
  initprolist: function (cat_id){
      var _this = this;
      wx.request({
        url: app.globalData.url +'/shop/goodsmanager/getGoodsList',
        method: 'get',
        data: {
          shop_id: _this.data.shop_id,
          cat_id: cat_id,
          size: 2
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
            _this.setData({
                prolist: res.data.data.data,
            })
        }
      })
  },
  openDesc: function () {
    this.setData({
      openStatus: 'opened'
    });
  },
  closeDesc: function () {
    this.setData({
      openStatus: 'closed'
    });
  },
  changeActive1: function () {
    this.setData({
      showTab: 'active'
    });
  },
  arrorbottomhide:function(){
      this.setData({
        arrowsrc:'/images/business/shop/icon_filter_arrow_up.png',
        showdesc:false,
        arrorbottom:"arrorbottomshow"
      })
  },
  arrorbottomshow:function(){
    this.setData({
      arrowsrc: '/images/icon_filter_arrow.png',
      showdesc: true,
      arrorbottom:"arrorbottomhide"
    })
  },
  viewMoreGoods: function () {
    wx.navigateTo({
      url: '/pages/business/goodsList/goodsList?shop_id=' + this.data.shop_id + '&cat_info=' + this.data.cat_info
    })
  },
  goodsDetail:function(e){
    wx.navigateTo({
      url: '/pages/myCenter/shop/goodsDetail/goodsDetail?goodsid=' + e.currentTarget.dataset.index+'&shop_id='+this.data.shop_id
    })
  },
  //请求店铺信息
  requestShopdata: function (shop_id) {
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
           tel: resdata.tel,//店铺电话
           introduce: resdata.introduce,//店铺介绍
           cat_info: resdata.cat_info,
           link_url: resdata.link_url,//活动链接
           act_description: resdata.act_description,//活动描述
           posterUrl: resdata.link_url,//海报URL
          // is_represent: resdata.is_represent,//是否代言
           shop_imgs: resdata.shop_imgs,//店铺展示轮播图
           boxwidth: resdata.cat_info.length*70,
           shopimg: resdata.poster,
           Shopkeeperheadimgurl: resdata.headimgurl,//店主头像
           ShopkeeperId: resdata.user_id,//用户ID
           shoplongitude: resdata.longitude,//店铺地址坐标longitude
           shoplatitude: resdata.latitude//店铺地址坐标latitude
        })
      }
    })
  },
  //根据店铺产品分类请求产品列表
  requestgoodsdata: function (shop_id,cat_id) {
    var _this = this;
    wx.request({
      url: app.globalData.url +'/shop/goodsmanager/getGoodsList',
      method: 'get',
      data: {
        shop_id: shop_id,
        cat_id: cat_id,
        page: 1,
        size: 2,
        search:""
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        _this.setData({
          goodslist: resdata,//对应的产品列表
        })
      }
    })
  },
  //去店铺地理位置
  goshoploation :function(){
       wx.openLocation({
         latitude: this.data.shoplatitude,
         longitude: this.data.shoplongitude,
          scale: 28
        })
     },
  //跳到咚企秀
  gowebaction:function(){
    wx.navigateTo({
      url: "/pages/business/shop/shopweb/shopweb"
    })
  },
  //拨打店铺电话
  makingcall:function(e){
    var _this = this;
    wx.makePhoneCall({
      phoneNumber: _this.data.tel
    })
  },
  //获取店铺吗
  getshopcode:function(){
    wx.showLoading({
      title: '加载中',
    })
      var that = this;
      wx.request({
        url: app.globalData.url +'/erweima/createimg/getShopPic',
        method: 'get',
        data: {
            user_id: app.globalData.user_id,
            shop_id: that.data.shop_id,
            page: 'pages/business/shop/shop',
        },
        success: function (res) {
          wx.hideLoading()
          var imgarr = [res.data.data.img_url];
          wx.previewImage({
            current: res.data.data.img_url, // 当前显示图片的http链接
            urls: imgarr // 需要预览的图片http链接列表
          })
        }
      })
  },
  conftbtn:function(e){
      if (e.currentTarget.dataset.tab==0){
          this.setData({
            confimgurl:'/images/icon_home_close.png',
            conftab:1,
            hiddenbtn:false,
          })
      } else if (e.currentTarget.dataset.tab == 1){
        this.setData({
          confimgurl: '/images/icon_home_arrow.png',
          conftab: 0,
          hiddenbtn:true,
        })
      }
  },
  //查看店主信息
  goshopkeeper:function(){
    wx.navigateTo({
      url: '/pages/introduce/ddshow/ddshow?user_info=' + this.data.ShopkeeperId + ''
    })
  },
  //回首页
  goindex:function(){
    wx.switchTab({
      url: '/pages/introduce/introduce'
    })
  }
})

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  // wx.showToast({
  //   title: '获取fromId',
  //   icon: 'success',
  //   duration: 2000
  // })
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  console.log("要绑定的店铺推荐人"+options.fromshop_id);
  if (options.fromshop_id > 0) {
    //获取分享页fromshop_id绑定我的推荐人options.fromshop_id
    wx.request({
      url: app.globalData.url +'/login/login/bindFromId',
      method: 'post',
      data: {
        user_id: app.globalData.user_id,
        fromid: options.fromshop_id,
        type: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.errcode == 0) {

          console.log("绑定店铺推荐人成功");
        };

      }
    })
  }
  return options
}