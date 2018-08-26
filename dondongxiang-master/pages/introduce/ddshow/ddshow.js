// pages/introduce/ddshow/ddshow.js
var app = getApp();
var isDaiLi = "";//vip等级 
Page({
  data: {
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
    visiticonsrc:"/images/friends/icon_home_visit.png",//赞背景图
    likeiconsrc:"/images/friends/icon_home_praise.png",//赞背景图
    collectsrc: "/images/friends/icon_home_favor.png",//收藏背景图
    fromid: "",//分享者id
    user_id:"",//该用户ID
    shop_id: "",//店铺id(如果有店铺的话)
    cat_id: [],//店铺分类(如果有分类的话)
    mygoods: [],//我的产品
    DynamicList: [], //动态数组
    Dynamicimg_urls: [],//动态的图片数组
    Dynamicimg_url: "" ,//动态的图片
    Dynamiccontent: ""//动态的内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      if (options.user_info > 0) {
        _this.inituserinfo(options.user_info);
        _this.setData({
          user_id: options.user_info
        });
        getCurrentPageUrlWithArgs();
      }
      // if (!app.globalData.from_id > 0) {
      //   getCurrentPageUrlWithArgs();
      // }
      
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.inituserinfo(this.data.user_id,true);
  },
  ShowMsgBg: function () {
    this.setData({
      ShowPhoneInfo: true
    })
  },
  powerDrawer: function (e) {
    this.setData({
      ShowPhoneInfo: false
    })},
  changeType: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
      currentindex: e.target.dataset.current
    })
  },
  //编辑我的咚咚跳到首页
  jumpToMyPage:function(){
    wx.reLaunch({
      url: '../introduce'
    })
  },
  previewImage: function (e) {
    var itemimgarr = this.data.itemimglist;
    var current = e.target.dataset.src;
    var imgarr = [];
    for (var i = 0; i < itemimgarr.length; i++) {
      imgarr.push(itemimgarr[i].photo_url);
    }
    wx.previewImage({
      current: current,
      urls: imgarr
    })
  },
  //复制微信号
  copyTBL:function(){
    wx.setClipboardData({
      data: this.data.wechat,
      success: function (res) {  
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    }); 
  },
  //拨打电话
  calling:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.myPhone, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })  
  },
  //初始化首页数据
  inituserinfo: function (userid,ref) {
    var _this = this;
    wx.request({
      url: app.globalData.url +'/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: userid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.errcode == 0 && ref == true) {
          setTimeout(function () {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 1000
            })
          }, 800)
        }
        var resdata = res.data.data;
        _this.setData({
          looksdata: resdata.popularity,
          loversdata: resdata.lovers,
          collectiondata: resdata.collection,
          introduce: resdata.introduce,
          nickName: resdata.nickname,
          avatarUrl: resdata.headimgurl,
          position: resdata.position,
          itemimglist: resdata.photos,
          isDaiLi: res.data.data.isDaiLi,
          myPhone: resdata.mobile,//手机
          wechat: resdata.wechat,//微信
          address: resdata.address,//地址
          shop_id: resdata.shop_id//店铺ID
        })
        //判断用户身份
        switch (resdata.isDaiLi) {
          case 0:
            _this.setData({
              userIdentity: "普通用户"
            })
            break;
          case 1:
            _this.setData({
              userIdentity: "大使"
            })
            break;
          case 2:
            _this.setData({
              userIdentity: "销售"
            })
            break;
          case 3:
            _this.setData({
              userIdentity: "地主"
            })
            break;
          case 4:
            _this.setData({
              userIdentity: "进入店铺"
            })
            break;
          case 5:
            _this.setData({
              userIdentity: "进入店铺"
            })
            break;
          default:
            console.log("default");
        }
        _this.getMyDynamicRequest();//获取动态
        if (resdata.photos.length > 0) {
          _this.setData({
            imgNum: res.data.data.photos.length,
          })
        }
      }
    })
  },
  LinkStore: function () {
    //判断店主才能有进入店铺
    var that = this;
    var shop_id = that.data.shop_id;
    console.log("店铺ID" + shop_id);
    if (shop_id > 0) {
      wx.navigateTo({
        url: '/pages/business/shop/shop?shop_id=' + shop_id
      })
    } else {

    }

  },
  linklike:function(e){
      var _this = this;
      _this.setData({
        likeiconsrc:"/images/friends/loveSelect.png"
      })
  },
  linkcollect:function(e){
    var _this = this;
    _this.collectionRequest(0,_this.data.user_id);
    
  },
  //人气已赞收藏操作
  collectionRequest: function (Type, colleId) {
    var _this = this;
    wx.request({
      url: app.globalData.url +'/index/index/collection',
      method: 'POST',
      data: {
        user_id: app.globalData.user_id,
        collection_user_id: colleId,
        type: Type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(res.data);
        // if (resdata.){}
        if (Type==0){
          if (resdata.op_type>0){
            _this.setData({
              collectsrc: "/images/friends/favuorSelect.png",
            })
          }else{
            _this.setData({
              collectsrc: "/images/friends/icon_home_favor.png",
            })
          }
          _this.setData({
            collectiondata: resdata.num
          })
        }
        _this.setData({
          // looksdata: resdata.popularity,
          // loversdata: resdata.lovers,
          // collectiondata: resdata.collection,
          // introduce: resdata.introduce,
          // nickName: resdata.nickname,
          // position: resdata.position,
          // itemimglist: resdata.photos,
          // imgNum: res.data.data.photos.length
        })
      }
    })
  },
  //获取个人动态
  getMyDynamicRequest: function () {
    var _this = this;
    console.log("某人动态id" + _this.data.user_id)
    wx.request({
      url: app.globalData.url + '/user/user/getMyDynamic',
      method: 'GET',
      data: {
        user_id: _this.data.user_id,
        page: 1,
        size: 1,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data.data;
        console.log(res)
        console.log(resdata[0].img_url);
        _this.setData({
          Dynamicimg_urls: resdata[0].img_url,
          Dynamiccontent: resdata[0].content,
        })
        _this.setData({
          Dynamicimg_url: _this.data.Dynamicimg_urls[0]
        })
        
      }
    })
  },
  //获取门店商品分类
  getMyShopRequest: function () {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/getGoodsCatInfo',
      method: 'POST',
      data: {
        shop_id: this.data.shop_id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(resdata)
        _this.setData({
          cat_id: resdata
        })
      }
    })
  },
  //获取商品
  getMygoodsRequest: function () {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/goodsmanager/getGoodsList',
      method: 'GET',
      data: {
        shop_id: this.data.shop_id,
        cat_id: this.data.cat_id[0].cat_id,
        page: 1,
        size: 2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(resdata)
        _this.setData({
          mygoods: resdata
        })
      }
    })
  }
})

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var _this = this
  var pages = getCurrentPages()    //获取加载的页面
  var currentPage = pages[pages.length - 1]    //获取当前页面的对象
  var url = currentPage.route    //当前页面url
  var options = currentPage.options    //如果要获取url中所带的参数可以查看options
  console.log("打印页面url:" + url);
  console.log("打印页面参数:" + options);
  console.log("打印页面参数formid:" + options.fromId);
  console.log("打印页面参数type:" + options.type);

  if (options.user_info > 0) {
  //非用户分享情况下默认为官方id
    //获取分享页fromid绑定我的推荐人options.fromId
    wx.request({
      url: app.globalData.url +'/login/login/bindFromId',
      method: 'post',
      data: {
        user_id: app.globalData.user_id,
        fromid: options.user_info,//绑定分享人id
        shop_id: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          console.log("绑定推荐人成功");
          app.globalData.from_id = options.user_info;
        };

      }
    })
  }
  return options
}