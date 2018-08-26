// pages/introduce/introduce.js
var app = getApp();
var isDaiLi= "";//vip等级 
Page({
  data: {
    ShowPhoneInfo:true,
    viewLeft: 0,
    showView: true,
    hiddenfunction:true,//
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
    itemimglist:[],
    looksdata: 0,
    loversdata: 0,
    collectiondata:0,
    introduce:"",
    position:"",//职务
    myPhone:"",
    wechat:"",//微信号
    address:"",//地址
    third_session:"",
    userIdentity:"普通用户",
    isDaiLi:"",//vip等级
    development_mode: 0,
    fromid:"",//分享者id
    shop_id:"",//店铺id(如果有店铺的话)
    cat_id:[],//店铺分类(如果有分类的话)
    mygoods:[],//我的产品
    DynamicList:[], //动态数组
    Dynamicimg_url:"/images/business/shop/ddx.jpeg",//动态的图片
    Dynamiccontent:""//动态的内容
  },
  onLoad: function (options) {
    var _this = this;
    // wx.hideLoading();
    // if (app.globalData.development_mode > 0) {
    //   _this.setData({
    //     hiddenfunction: false
    //   })
    // }
    _this.registerUser();
  },
  registerUser: function () {
    var _this = this;
    wx.login({
      success: function (res) {
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            console.log(code);
            console.log(res.iv);
            console.log(res.encryptedData);
            // 下面开始调用注册接口
            wx.request({
              url: app.globalData.url +'/login/Login/getUserLoginState',
              data: {
                code: code,
                vi: iv,
                encrypted_data: encryptedData
              },
              method: "GET",
              header: { "content-type": 'application/json' },
              success: function (res) {
                console.log(res.data.errmsg);
                console.log(res);
                if (res.data.errcode == "0") {
                  var datares = res.data.data;
                  app.globalData.development_mode = datares.development_mode;//上线模式判断
                  _this.setData({
                    third_session: datares.third_session
                  })
                  // _this.decodePhoneInfo(datares.third_session);
                  _this.inituserinfo(datares.user_id);
                  // _this.getMyDynamicRequest(datares.user_id);
                  //判断用户身份
                  switch (datares.isDaiLi) {
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
                      _this.setData({
                        userIdentity: "普通用户"
                      })
                  }
                } else {
                  wx.showToast({
                    title: '网络错误，请检查网络',
                  })
                }

              }
            })
          }
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.inituserinfo(app.globalData.user_id,true);
    wx.stopPullDownRefresh();
    setTimeout(function(){
            wx.showToast({
              title: '下拉刷新',
              icon: 'success',
              duration: 1000
            })
          }, 800)

  },
  onShareAppMessage:function(res){
    var fromid = app.globalData.user_id;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '我是' + this.data.nickName+'--我为自己代言',
      path: '/pages/introduce/ddshow/ddshow?user_info='+fromid,
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
  changeType:function(e){
      var that = this;
      that.setData({
          currentTab: e.target.dataset.current,
          currentindex: e.target.dataset.current
      })
  },
  openArrow: function () {
      this.setData({
          arrowClosed: '',
          arrowOpened: 'active'
      });
  },
  closeArrow: function () {
      this.setData({
          arrowClosed: 'active',
          arrowOpened: ''
      });
  },
  editAction: function () {
    if (!this.data.hiddenfunction){
      wx.navigateTo({
        url: './medium/medium',
      })
    }
  },
  previewImage:function(e){
    var itemimgarr = this.data.itemimglist;
     var current = e.target.dataset.src;
     var imgarr = [];
     for (var i = 0; i < itemimgarr.length;i++){
       imgarr.push(itemimgarr[i].photo_url);
     }
     wx.previewImage({
        current: current,  
        urls: imgarr  
     })  
  },
  ShowMsgBg:function(){
    this.setData({
      ShowPhoneInfo: true
    })
  },
  powerDrawer: function(e){
      this.setData({
        ShowPhoneInfo:false
      })
  },
  LinkStore:function(){
    //判断有店ID才有进入店铺展示
     var that = this;
     var shop_id = that.data.shop_id;
     console.log("店铺ID" + shop_id);
     if (shop_id>0){
       wx.navigateTo({
         url: '/pages/business/shop/shop?shop_id=' + shop_id
       })
     }else{
       
     }
      
  },
  jumpToMyPage:function(){
      wx.navigateTo({
          url: './edit/edit'
      })
  },
  //获取小程序吗
  PreCodoImg:function(){
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.url +'/erweima/createimg/getUserPic?user_id=' + app.globalData.user_id+'',
      method: 'get',
      data: {
        page:"pages/myCenter/details/details",
        user_id: app.globalData.user_id
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
  linkmoods:function(){
      //人气
      wx.navigateTo({
        url: './moodspage/moods'
      })
  },
  linklike: function () {
      //已赞
      wx.navigateTo({
          url: './likepage/like'
      })
  },
  linkcollect: function () {
    var that = this;
      //收藏
    that.collectionRequest(0);
  },
  //人气已赞收藏操作
  collectionRequest:function(Type,colleId){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/index/index/collection',
      method: 'POST',
      data: {
        user_id: app.globalData.user_id,
        collection_user_id: colleid,
        type: Type,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        _this.setData({
          looksdata: resdata.popularity,
          loversdata: resdata.lovers,
          collectiondata: resdata.collection,
          introduce: resdata.introduce,
          nickName: resdata.nickname,
          position: resdata.position,
          itemimglist: resdata.photos,
          imgNum: res.data.data.photos.length,
          shop_id: res.data.data.shop_id
        })
      }
    })
  },
  //初始化首页数据
  inituserinfo: function (userid){
    wx.showLoading({
      title: '加载中',
    })
    var _this =this;
    wx.request({
      url: app.globalData.url +'/login/Login/getUserInfo',
      method: 'get',
      data: { user_id: userid },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        console.log(res.data.errcode);
        if (res.data.errcode == 0 ){
          var resdata = res.data.data;
        _this.setData({
          looksdata: resdata.popularity,
          loversdata: resdata.lovers,
          collectiondata: resdata.collection,
          introduce: resdata.introduce,
          position: resdata.position,
          itemimglist: resdata.photos,
          isDaiLi: res.data.data.isDaiLi,
          myPhone: resdata.mobile,//手机
          wechat: resdata.wechat,//微信
          address: resdata.address,//地址
          shop_id: resdata.shop_id,//店铺id
          fromid: resdata.fromid,//推荐人id
          avatarUrl: resdata.headimgurl,
          nickName: resdata.nickname
        })
        if (res.data.data.development_mode > 0) {
          _this.setData({
            hiddenfunction: false
          })
        }
        // if (resdata.headimgurl == "" || resdata.nickname == "") {
        //   console.log(resdata.headimgurl);
        //   console.log(resdata.nickname);
        //    _this.setUserdata(userid)
        //  }
        //判断用户身份
        switch (resdata.isDaiLi) {
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
            _this.setData({
              userIdentity: "普通用户"
            })
          }
        }
        if (!app.globalData.from_id > 0) {
          // getCurrentPageUrlWithArgs();
        }
        _this.getMyDynamicRequest();//获取动态
        if (res.data.data.default_address_id > 0) {
          app.globalData.default_address_id = resdata.default_address_id
        }
        if (res.data.data.photos.length > 0) {
          _this.setData({
            imgNum: res.data.data.photos.length,
          })
        }
      }
    }) 
  },
  //简单设置用户微信信息
  setUserdata: function (user_id) {
   var _this = this;
    wx.request({
      url: app.globalData.url +'/login/Login/setUserInfo',
      method: 'post',
      data: {
        user_id: user_id,
        nickname: app.globalData.userinfo.nickName,
        avatarUrl: app.globalData.userinfo.avatarUrl
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.errcode == "0") {
          _this.setData({
              avatarUrl: app.globalData.userinfo.avatarUrl,
              nickName: app.globalData.userinfo.nickName
              })
          // wx.showToast({
          //   title: '设置成功',
          //   icon: 'success',
          //   duration: 2000
          // })
        } else {
          // wx.showToast({
          //   title: '设置失败',
          //   icon: 'success',
          //   duration: 2000
          // })
        }
      }
    })
  },
  //获取个人动态
  getMyDynamicRequest: function () {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/user/user/getMyDynamic',
      method: 'GET',
      data: {
        user_id: app.globalData.user_id,
        page: 1,
        size: 1,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        console.log(res)

        _this.setData({
          Dynamicimg_url: resdata.data[0].img_url,
          Dynamiccontent: resdata.data[0].content

        })
      }
    })
  },
  //获取门店商品分类
  getMyShopRequest: function () {
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/getGoodsCatInfo',
      method: 'GET',
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
        cat_id:this.data.cat_id[0].cat_id,
        page:1,
        size:2
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
    //非用户分享情况下默认为官方id
    //获取分享页fromid绑定我的推荐人options.fromId
    wx.request({
      url: app.globalData.url +'/login/login/bindFromId',
      method: 'post',
      data: {
        user_id: app.globalData.user_id,
        fromid: app.globalData.user_id,//绑定官方自己id
        shop_id: 0
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.errcode == 0) {
          app.globalData.from_id = app.globalData.user_id;
        };
      }
    })

}
