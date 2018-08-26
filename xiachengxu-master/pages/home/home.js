import { Home } from 'home-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';
import { Config } from '../../utils/config.js';
var app = getApp();
var home = new Home();


Page({
  data: {
    storeNo:"",//店铺编号
    showExplore:false,
    limitedState:false,
    headInfos:{
      autoplay: true,
      circular: true,
      interval: 5000,
      duration: 1000,
      current:0,
      percent:0,
      imgInfos: []
    }, 
    bannerItem:{
      name:"限时特惠",
      desc:"Limited-time preferentail",
      autoplay: false,
      circular: true,
      interval: 5000,
      duration: 1000,
      current:0,
      percent:0,
      imgInfos: []
    },
    newArrival:{
      name: "新款上架",
      desc: "new stores",
      autoplay: false,
      circular: true,
      interval: 5000,
      duration: 1000,
      current:0,
      percent:0,
      imgInfos:[]
    },
    popular:{
      name: "热门分类",
      desc: "Popular categories",
      items: []
    },
    active:{
      name: "活动推荐",
      desc: "Activity recommended",
      items:[]
    },
    page: 1,
    tabs: ['店长推荐', '优惠商品', '最新商品'],
    swiperMap: ["recommend_swiper", "discount_swiper", "new_swiper"],
    mapList: ['recommendProducts', 'discountProducts', 'newProducts'],
    storeInfo: {}, // 店铺信息
    isCollapse: true,
    isShowActivity: false, // 显示红包弹出
    hotProducts: [], // 最热商品
    recommendProducts: [], // 推荐商品
    discountProducts: [], // 折扣商品
    newProducts: [], // 最新商品
    recommend_swiper: [], // 推荐商品轮播图
    discount_swiper: [],
    new_swiper: [],
    showGuide: false,
    userInfo: null,
    info: {},
    isShowPopup: false,
    loadingHidden: false,



  },
  onReady: function () {
    var storeNo = wx.getStorageSync('storeNo');
    this.setData({
      storeNo: storeNo
    })
    var that=this;
    var param = {
      data: {
        "storeNo": storeNo
      }
    };

    var params = JSON.stringify(param);
    wx.request({
      url: 'https://dingdian-ppe.parllay.cn/wxserver/index',
      data: params,
      dataType:'json',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
   
        var status = res.data.status;
        var data = res.data.data;
        console.log(res);
      
        if (status){
         /*------------头部head------------------*/
          for (var i in data.headerActivity) {
            data.headerActivity[i].imgUrl == undefined ? "/images/newIcon/unImg.png" : data.headerActivity[i].imgUrl;
          }

         that.setData(
           { "headInfos.imgInfos": data.headerActivity}
         );
         that.setData(
           { "headInfos.percent": Math.round(100 / data.headerActivity.length) }//设置进度条宽度
         );
        /*----------------------头部 结束 ------------------*/
        /*------------------限时特购bannerItem-------------*/
        
         var item = that.dataHandle(data.discountGoods);

         that.setData(
           { "bannerItem.imgInfos": item }
         );
         that.setData(
           { "bannerItem.percent": Math.round(100 / item.length) }//设置进度条宽度
         );
          /*------------限时特购bannerItem 结束------------------*/
         
        /*-------------------新款上架newArrival------------------*/
         var newitem = that.dataHandle(data.newActivity);
      
         that.setData(
           { "newArrival.imgInfos": newitem }
         );
         that.setData(
           { "newArrival.percent": Math.round(100 / newitem.length) }//设置进度条宽度
         );

       /*------------------新款上架newArrival end-------*/

         /*------------------------ 热门分类--------------------*/
         
         var popularitem = that.dataHandle(data.goodsTagList);

         that.setData(
           { "popular.items": popularitem}
         );
  /*----------------------- 热门分类 end-----------------------------*/
  /*---------------------店长推荐 active--------------------------------*/
         var activeitem = that.dataHandle(data.recommendActivity);

         that.setData(
           { "active.items": activeitem }
         );
  /*--------------------店长推荐 end--------------------------------*/
        }else{
          console.log("index----------" + res.method);
          
        }
        
      },
      fail: function (res) {
       
      }
    });

    this.getUserInfo();
  },
  onProductTap(e) {//商品详情
    
    // 存储formId
    home.dealFormIds(e.detail.formId);
    // 发送收集的 formIds
    var formIds = wx.getStorageSync('formIds');
    var params = {
      data: formIds
    }
   
    /*home.saveFormIds(params, null);*/
    
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data.userInfo
        });
      })
    } else {
      var id = home.getDataSet(e, "id");
      var storeNo = home.getDataSet(e, 'storeno');
      var index = home.getDataSet(e, 'index');
      var tabs = this.data.tabs;
      app.aldstat.sendEvent(tabs[index] + '-商品详情');
      wx.navigateTo({
        url: '../product/product?templateId=default&id=' + id + '&storeNo=' + storeNo
      });
    }

  },
  // 商品列表或者是轮播图点击的逻辑
  showDetailPopup(e) {

    var link = home.getDataSet(e, 'link');

    // 如果是 0 的link 就是跳转到活动列表页面
    if (link == 1) {
      let name = home.getDataSet(e, 'name');
      console.log("name-----------------",name);
      let id = home.getDataSet(e, 'id');
      wx.navigateTo({
        url: `/pages/home/list/list?id=${id}&name=${name}`
      })
    } else if(link == 3){
      let tagId = home.getDataSet(e, 'link_detail');
      wx.navigateTo({
        url: `/pages/product/product?id=${link_detail}`
      });
    }else if(link == 4 ){
      let linked = home.getDataSet(e, 'link_detail');
      wx.navigateTo({
        url: linked
      });
    }
  },
  getUserInfo() {
    var that = this;
    // 获取用户信息完成度
    var params = {
      data: {

      }
    };
    home.getUserInfo(params, res => {
      that.setData({
        info: res.data
      });
      console.log("res======================", res)
      if(res.data.mobile){

      
      wx.setStorageSync('mobile', res.data.mobile);
      }else{
        
      }
    })
  },
  classifyFn:function(e){//点击分类

  var storeNo = e.currentTarget.dataset.storeno;
  var id = e.currentTarget.dataset.id;
  console.log("home_--------------------storeNo:"+storeNo);
  wx.navigateTo({
    url: '../classify/classify?storeno=' + storeNo + '&id=' + id
  });
  },
  headChange: function (e) {
    var that=this;
    var current = e.detail.current;
   
    var percent=that.data.headInfos.percent;//进度条宽度
    this.setData({
      'headInfos.current': current* percent});
  },
  timeChange:function(e){
    var that = this;
    var current = e.detail.current;

    var percent = that.data.bannerItem.percent;//进度条宽度
    this.setData({
      'bannerItem.current': current * percent
    });
  },
  newArrivalChange:function(e){
    var that = this;
    var current = e.detail.current;
    var percent = that.data.newArrival.percent;//进度条宽度
    this.setData({
      'newArrival.current': current * percent
    });
  },
  limitedFn:function(e){
    this.setData({
      'limitedState': true
    });
  
    console.log(e.currentTarget.dataset.id);
  },
  exploreFn:function(e){
    /*探索点击事件*/
    var showExplore = this.data.showExplore?false:true;
    this.setData({ showExplore: showExplore});
  },
  dataHandle:function(obj){//处理json数据
    var item=[];
    if (obj){
      for (var i = 0; i < obj.length; i++) {
        var json = {};
        for (var name in obj[i]) {
          json[name] = obj[i][name];
        }

        item.push(json);
      }
    }
    return item;
  }, 
  discountFn: function (e) {//折扣商品列表

  },
  newGoods: function (e) {//新款上架
    var storeNo = this.data.storeNo;
    wx.navigateTo({
      url: '../newStores/newStores?storeno=' + storeNo
    });
  },
  allClassify: function (e) {//全部分类
    var id = this.data.popular.items[0].tagId;
    var storeNo = this.data.storeNo;
    wx.navigateTo({
      url: '../classify/classify?storeno=' + storeNo + '&id=' + id
    });
  }, getUserInfo() {
    var that = this;
    // 获取用户信息完成度
    var params = {
      data: {

      }
    };
    home.getUserInfo(params, res => {
      that.setData({
        info: res.data
      });
      wx.setStorageSync('mobile', res.data.mobile);
    })
  },
  onShow() {
    var isFresh = wx.getStorageSync('fresh');
    var info = this.data.info;
    if ((!info.mobile || !info.faceImage) && wx.getStorageSync('wxUid')) {
      this.getUserInfo();
    }
    if (isFresh) {
      this.getProductsList();
      wx.removeStorageSync('fresh');
    }

  },

  _loadData() {
    var that = this;

    // 获取三个类别的轮播图
    this.getSwiperList();

    // 获取商品列表
    this.getProductsList();
    // 获取店铺信息
    this.getStoreInfo();
    var info = this.data.info;
    if (!info.mobile || !info.faceImage) {
      this.getUserInfo();
    }

  },
  getStoreInfo() {
    var that = this;
    var storeNo = this.data.storeNo;
    var postData = {
      data: {
        storeNo
      }
    };
    home.getStoreInfo(postData, res => {
      that.setData({
        storeInfo: res && res.status ? res.data : {},
        loadingHidden: true
      });
      wx.setNavigationBarTitle({
        title: res.data.brandName
      })
      wx.hideLoading();
    })
  },
  /**
   * 获取三个类别的商品列表各6个
   */
  getProductsList() {
    /*获取商品列表数据 / 10条*/
    var that = this;
    var storeNo = this.data.storeNo;
    for (let i = 0; i < 3; i++) {
      (function () {
        var render = `render${i}`;
        var mapList = that.data.mapList;
        that[render] = new SafeRenderUtil({
          arrName: mapList[i],
          setData: that.setData.bind(that)
        });
        var page = 1, size = 6;
        home.getProductsData({ index: i, data: { page, size, storeNo }, }, (data) => {
          if (data && data.status) {
            let list = data.data;
            list.forEach(item => {
              item.goodsPic = item.goodsPic + Config.processImage;
            })
            that[render].addList(data.data);

          }
          wx.stopPullDownRefresh();
        });
      })(i);
    }
  },

  /**
   * 获取三个类别的轮播图各3 个
   */
  getSwiperList() {
    var that = this;
    var { storeNo, swiperMap } = this.data;
    for (let i = 0; i < 3; i++) {
      (function () {
        var render = `swiper${i}`;
        that[render] = new SafeRenderUtil({
          arrName: swiperMap[i],
          setData: that.setData.bind(that)
        });
        var params = {
          data: {
            type: i + 2,
            storeNo
          }
        };
        home.getSwiperList(params, res => {
          if (res && res.status) {
            let list = res.data;
            list.forEach(item => {
              item.imgUrl = item.imgUrl + Config.processImage;
            })
            that[render].addList(list);
          }
        });
      })(i);
    }

  },

  _getAuthorize(callback) {
    var that = this;
    var userInfo = this.data.userInfo;
    if (!userInfo) {
      app.getUserSetting(res => {
        that.setData({
          userInfo: res.userInfo
        });
        callback && callback();
      });
    } else {
      callback && callback();
    }

  },
  attentionTap(e) {
    var that = this;
    app.aldstat.sendEvent();
    home.dealFormIds(e.detail.formId);
    var storeInfo = this.data.storeInfo;
    var params = {
      attenStatus: storeInfo.attenStatus,
      data: {
        storeNo: this.data.storeNo
      }
    };
    home.attentionStore(params, res => {
      if (res && res.status) {
        let info = storeInfo.attenStatus ? '取消关注' : '关注成功';
        that.showTip(info);
        storeInfo.attenStatus = storeInfo.attenStatus ? 0 : 1;
        that.setData({
          storeInfo
        });
      } else {
        that.showReminder('关注失败，请稍后重试', null);
      }
    })
  },
  collectProduct(e) {
    home.dealFormIds(e.detail.formId);
    app.aldstat.sendEvent('加入预购清单-首页');

    wx.showTabBarRedDot({ index: 2 });
    var id = home.getDataSet(e, 'id');
    var index = home.getDataSet(e, 'index');
    var { mapList, isShowPopup } = this.data;
    var list = this.data[mapList[index]];
    var productItem = list.find(item => { return item.goodsId == id });
    if (productItem.isFavorite && !isShowPopup) {
      this.showMyTip('已加入过预购清单');
    } else if (!productItem.isFavorite) {
      list.forEach((item, index) => {
        if (item.goodsId == id) {
          item.isFavorite = 1;
        }
      })
      var params = {
        data: {
          goodsId: id,
          goodsName: productItem.goodsName,
          goodsPrice: productItem.goodsPrice,
          goodsPic: productItem.goodsPic,
          storeNo: this.data.storeNo
        }
      };
      home.collectProduct(params, data => {
        if (data.status) {
          wx.setStorageSync('cart-fresh', true);
          this.setData({
            [mapList[index]]: list
          });
          this.showMyTip('加入预购清单成功');
        } else {
          this.showMyTip('加入预购清单失败');
        }
      });
    }

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this._loadData();
  },


  enterActivity() {
    this.closeActivity();
    wx.navigateTo({
      url: '../redpack/redpack',
    })
  },
  closeActivity() {
    this.setData({
      isShowActivity: !this.data.isShowActivity
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var { storeInfo } = this.data;
    wx.showShareMenu({
      withShareTicket: true
    });
    return {
      title: storeInfo.brandName,
      path: '/pages/poster/poster?storeNo=' + storeInfo.storeNo,
      imageUrl: storeInfo.storeBoardContentList[0].mediaUrl,
      success: res => {
        console.log('shareTickets为：' + JSON.stringify(res));
        if (res.shareTickets) {
          console.log(res.shareTickets);
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: d => {
              console.log(d);
            }
          })
        }
      }
    }
  },
  showTip(title) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 1000
    })
  },
  showMyTip(title) {
    var that = this;
    this.setData({
      isShowPopup: true,
      tip: title
    });
    setTimeout(() => {
      that.setData({
        isShowPopup: false
      });
    }, 3000)
  },
  showReminder(content, cb) {
    wx.showModal({
      content: content,
      showCancel: false,
      confirmColor: '#1196ee',
      success: res => {
        if (res.confirm)
          cb && cb();
      }
    })
  },
  collapse(e) {
    if (this.data.isCollapse)
      app.aldstat.sendEvent('展开');
    else
      app.aldstat.sendEvent('收起');
    this.setData({
      isCollapse: !this.data.isCollapse
    });
    home.dealFormIds(e.detail.formId);
  },
  closeGuide(e) {
    this.setData({
      showGuide: false
    });
    var params = {
      data: {
        storeNo: this.data.storeNo,
        nickName: this.data.employee.nickName,
        formId: e.detail.formId
      }
    };
    home.sendServiceMessage(params, null);
  },
  completeInformation() {
    app.aldstat.sendEvent('首页-点击完善个人信息');
    wx.navigateTo({
      url: '/pages/information/index/index',
    })
  },
  // 进入分类列表
  showEventList(e) {
    var index = home.getDataSet(e, 'index');
    var tabs = this.data.tabs;
    app.aldstat.sendEvent(tabs[index]);
    wx.navigateTo({
      url: `/pages/home/list/list?index=${index}&name=${tabs[index]}`
    })
  },

  callPhone(e) {
    var phone = home.getDataSet(e, 'phone');
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})