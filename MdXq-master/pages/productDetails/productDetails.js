// pages/productDetails/productDetails.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;
var model_idArr=[];//为提交订单做准备
var product_infos = [];//商品和规格id
var amount = 0;//订单总价
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 产品图片轮播图
    imgUrlInfo:[],
    // 产品信息
    productDetailsInfoObj:{},
    swiperParam:{
      indicatorDots: true,
      indicatorColor: "#aaa",
      indicatorActiveColor: "#f1f1f1",
      autoplay: true,
      circular: true,
      interval: 3000
    },
    // 商品ID
    product_id:0,
    // 为你推荐数组
    recommendGoodsInfo: [],
    // 规格数量选择是否弹出
    isShowSizeAndAmount:false,
    quantity:1,
    model_id:1,
    mallProductModels:[],
    currentId:0,
    minusStatus: 'disabled',
    customer_id:0,
    level:0,
    vip_price:0,
    market_price:0,
    member_price:0,
    customer_id: 0,
    isShopCartPage:false,
    pathStr:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_id:options.product_id
    })
    if (options.isShopCartPage){
      this.setData({
        model_id: options.model_id,
        quantity: options.quantity,
        isShopCartPage: options.isShopCartPage
      })
    }
    console.log(decodeURIComponent(options.customer_id))
    
    if (options.customer_id){
      this.setData({
        customer_id: options.customer_id
      })
    }
    console.log(this.data.pathStr)
    console.log(options.customer_id)
    this.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=' + shop_id+'&recommend_id=4')

    
  },
  // 点击减号按钮函数
  bindMinus: function (e) {
    // console.log(e)
    var quantity = this.data.quantity;
    if (quantity > 1) {
      quantity--;
    }
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var quantity = this.data.quantity;
    quantity++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      quantity: quantity,
      minusStatus: minusStatus
    });
  },
  // 改变选中的规格背景颜色
  chooseSize(e) {
    // console.log(e)
    var that=this;
    var currendID = e.currentTarget.dataset.id;
    var model_ID = e.currentTarget.dataset.model_id;
    var vip_price = e.currentTarget.dataset.vip_price;
    var market_price = e.currentTarget.dataset.market_price;
    var member_price = e.currentTarget.dataset.member_price;
    if(that.data.level==1){
      that.setData({
        market_price: market_price
      })
    } else if (that.data.level == 2){
      that.setData({
        member_price: member_price
      })
    }else{
      that.setData({
        vip_price: vip_price
      })
    }
    this.setData({
      currentId: currendID,
      model_id: model_ID
    })
  },
  // 弹出规格数量选择窗口
  isShow(e){
    this.setData({
      isShowSizeAndAmount: !this.data.isShowSizeAndAmount
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              recommendGoodsInfo: data
            })
          }
          // console.log(that.data.recommendGoodsInfo)
        }
      }
    })
  },
  // 加入购物车点击事件
  addShopppingCart: function (e){
    // console.log(this.data.product_id)
    var that = this;
    var model_idObj={};
    model_idObj.model_id = that.data.model_id;
    // model_idObj.num=1;
    model_idArr.push(model_idObj);
    wx.setStorage({
      key: 'model_idArr',
      data: JSON.stringify(model_idArr),
    })
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var url = baseUrl + '/api/shopping/cart/add?customer_id=' + that.data.customer_id + '&model_id=' + that.data.model_id + '&product_id=' + that.data.product_id + '&quantity=' + that.data.quantity;
        // console.log(url)
        wx.request({
          url: url,
          success(res) {
            // console.log(res)
            if (res.data.success) {
              wx.showToast({
                title: '成功加入购物车',
              })
            } else {
              wx.showToast({
                title: '加入购物车失败',
              })
            }
          }, fail(error) {

          }
        })
      },
    })
  },
  // 获取商品详情数据
  getProductDetail(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data = res.data.result;
          // console.log(that.data.model_id)
          // console.log(that.data.isShopCartPage)
          that.setData({
            vip_price: data.mallProductModels[0].vip_price,
            member_price: data.mallProductModels[0].member_price,
            market_price: data.mallProductModels[0].market_price
          })
          // 轮播图
          var imgUrlInfo = [];
          for (var i = 0; i < data.banner_diagram.split(',').length;i++){
            var imgUrlInfoObj={};
            imgUrlInfoObj={
              imgurl :imgUrl + data.banner_diagram.split(',')[i]
            }
            imgUrlInfo.push(imgUrlInfoObj)
            that.setData({
              imgUrlInfo: imgUrlInfo
            })
          }
          // console.log(that.data.imgUrlInfo)
          // 产品信息
          var productDetailsInfoObj = {
            product_id: data.product_id,
            product_name: data.product_name,
            member_price: data.member_price,
            market_price: data.market_price,
            vip_price: data.vip_price,
            sales_volume: data.sales_volume,
            // spec: data.spec,
            detail_diagram: data.detail_diagram,
            mallProductModels: data.mallProductModels,
            stock_count: data.stock_count,
            is_collection: data.is_collection
          }
          if (that.data.isShopCartPage) {
            that.setData({
              model_id: that.data.model_id
            })
            for (var j = 0; j < data.mallProductModels.length; j++) {
              if (data.mallProductModels[j].model_id == that.data.model_id) {
                that.setData({
                  currentId: j
                })
              }
            }
          } else {
            that.setData({
              model_id: data.mallProductModels[0].model_id
            })
          }
          that.setData({
            productDetailsInfoObj:productDetailsInfoObj,
            mallProductModels: data.mallProductModels,
          })
          if (data.mallProductModels.length!=0){
            that.setData({
              model_id: data.mallProductModels[0].model_id
            })
          }
          // console.log(that.data.productDetailsInfoObj)
        }
      },
      fail(error) {

      }
    })
  },
  // 点击立即购买
  buyNowTap(e){
    var product_infosObj={};
    product_infosObj.model_id = this.data.model_id;
    product_infosObj.quantity = this.data.quantity;
    product_infosObj.product_id = this.data.product_id;
    product_infos.push(product_infosObj)
    if (this.data.level == 1) {
      amount = this.data.quantity *this.data.market_price;
    } else if (this.data.level == 2 ) {
      amount = this.data.quantity * this.data.member_price;
    } else {
      amount = this.data.quantity * this.data.vip_price;
    }
    // console.log(product_infos)
    wx.navigateTo({
      url: '../submitOrder/submitOrder?product_infos=' + JSON.stringify(product_infos)+ '&amount=' + amount + '&isShopCart=false',
    })
  },
  // 点击收藏商品
  collectTab(e){
    // console.log(e)
    var that = this;
    var product_id = that.data.product_id;
    var productDetailsInfoObj = that.data.productDetailsInfoObj;
    wx.request({
      url: baseUrl + '/api/collection/save?product_id=' + product_id + '&customer_id=' + that.data.customer_id,
      success(res){
        // console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '收藏成功',
          })
          productDetailsInfoObj.is_collection = true;
          that.setData({
            productDetailsInfoObj: productDetailsInfoObj
          })
        } else if (res.data.msg == "该商品已经收藏"){
          wx.showToast({
            title: "该商品已经收藏",
          })
        }
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
    var that=this;
    // 获取level
    wx.getStorage({
      key: 'level',
      success: function(res) {
        that.setData({
          level:res.data
        })
      },
    })
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        // console.log(res)
        that.setData({
          customer_id:res.data
        })
        that.getProductDetail(baseUrl + '/api/product/load?product_id=' + that.data.product_id + '&customer_id=' + that.data.customer_id)
      },
    })
    // 分享
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // 分享成功
        // console.log('shareMenu share success')
        // console.log('分享' + res)
      },
      fail: function (res) {
        // 分享失败
        // console.log(res)
      }
    })
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
  
  onShareAppMessage: function (res) {
    var that=this;
    var pathStr = '/pages/productDetails/productDetails?product_id=' + that.data.product_id + '&customer_id=' + that.data.customer_id;
    that.setData({
      pathStr: pathStr
    })
    return {
      title: '发给老安',
      path: pathStr,
      success: function (res) {
        console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 分享失败
        // console.log(res)
      },
      complete(res){
        console.log
      }
    }
  }
})