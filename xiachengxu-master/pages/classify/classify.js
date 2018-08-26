import { Home } from '../home/home-model.js';
import SafeRenderUtil from '../../utils/saveRender.js';
import { Config } from '../../utils/config.js';
var app = getApp();
var home = new Home();

var currentPage=1,size=5;//定义默认加载页数和条数
Page({
  data: {
    storeNo:"",//部门编号
    classifyId:"",//类别id
    requestProducts: [],//衣服列表
    navList: []//导航列表
  },
  onLoad: function (options) {
    
    var storeNoLink = options.storeno || '',//店铺编号
    linkId = options.id || '';//类别id，比如裙装，热裤等等
    
    var that = this;
    this.setData({
      storeNo: storeNoLink
    })
    this.setData({
      classifyId: linkId
    })
    
   /*-----------------nav start---------------------*/
    this.navList();
    /*----------------------list start------------------*/
    
    this.goodsList();
  
    /*----------------------list end------------------*/

  },
  onPullDownRefresh:function(){
    　wx.showNavigationBarLoading() //在标题栏中显示加载
      currentPage=1;
      this.setData({ requestProducts: [] });
      /*----------------------list start------------------*/
      this.goodsList();
     
  },
  onReachBottom:function(){
    wx.showNavigationBarLoading() //在标题栏中显示加载
    currentPage++;
    /*----------------------list start------------------*/
    this.goodsList();
    
  },
  goodsList: function (){//获取商品列表
 
    var that=this;
    var param = {
      "data": {
        "storeNo": that.data.storeNo,
        "tagId": that.data.classifyId,
        "page": currentPage,
        "size": size
      }
    };
    var params = JSON.stringify(param);
    console.log("params_____+=====-=-==________________________" + params);
    wx.request({
      url: 'https://dingdian-ppe.parllay.cn/wxserver/goods/getGoodsListByTag',
      data: params,
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       
        var status = res.data.status;
        var data = res.data.data;

        var productsCurrent = that.data.requestProducts;
        console.log("goodsListres--------------------------------",res);
        if (status) {
          var productsitem = that.dataHandle(data);
          var productsList=productsCurrent.concat(productsitem);//整合当前两个数组，加载现加载内容和之前加载内容；
          that.setData(
            { requestProducts: productsList }
          );
        }
        console.log("productsCurrent++++++++++++++==" ,res);
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    });
  },
  navList:function(){
    var storeNoLink = this.data.storeNo;
    var linkId = this.data.classifyId;
    var that = this;

    console.log("storeNoLink------------------------" , storeNoLink);
    /*----------------------nav start------------------*/
    wx.request({
      url: 'https://dingdian-ppe.parllay.cn/wxserver/tag/getTagByStoreNo?storeNo=' + storeNoLink,
      method: 'GET',
      success: function (res) {
        var data = res.data.data;
        var status = res.data.status;
        console.log("navList:res-------------------------",res);
        if (status) {
          var item = [];//修改nav的数据
          if (data) {
            for (var i = 0; i < data.length; i++) {
              var json = {};
              for (var name in data[i]) {
                json[name] = data[i][name];
              }
              /*判断是否选中某个类品*/
              if (linkId == "") {
                if (i == 0) {
                  json.selected = true;
                } else {
                  json.selected = false;
                }
              } else {
                if (json["tagId"] == linkId) {
                  json.selected = true;
                } else {
                  json.selected = false;
                }
              }

              item.push(json);
            }
          }
          that.setData({ navList: item });
        }

      }/*success end*/
    });
    /*----------------------nav end------------------*/

  },
  navChange:function(e){
    var id = e.currentTarget.dataset.id;
    var navList = this.data.navList;
    currentPage = 1;
    this.setData({ requestProducts: [] });
    for (var i = 0; i < navList.length;i++){
      var item = 'navList[' + i + '].selected';
      if (navList[i].tagId == id){
        
        this.setData({ [item] : true});

        this.setData({
          classifyId: id
        })
      }else{
        this.setData({ [item]: false });
      }
    }
    
    this.goodsList();
  },
  dataHandle:function (obj) {//处理json数据
    var item = [];
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
  collectProduct(e) {
    debugger
    home.dealFormIds(e.currentTarget.dataset.id);
    app.aldstat.sendEvent('加入预购清单-首页');

    wx.showTabBarRedDot({ index: 2 });
    var id = home.getDataSet(e, 'id');
    var index = home.getDataSet(e, 'index');
    var { mapList, isShowPopup } = this.data;
    var list = this.data[mapList[index]];
    debugger
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
  }
})