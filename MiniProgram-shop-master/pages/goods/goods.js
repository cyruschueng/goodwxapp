// pages/goods/goods.js
const web_url = getApp().globalData.web_url;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    classify_items: [],
    currentTab:0,
    navbar: ['综合排序', '价格优先', '销量优先'],
    lists: [],

    price_sort:true,
    sales_volume:true,

    goods_num: 1,
    animationData_1: {},
    animationData_2: {}
  },
  selectItem:function(e){
    console.log(e.currentTarget.dataset)
    var that = this
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.id;
    that.setData({
      currentList: index,
      cart_idx:idx
    })
    if(index == 0){
      wx.request({
        url: web_url + '/app.php?c=Goods&act=index',
        data: {},
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          that.setData({
            lists: res.data,
          })
        },
      })
    }else{
      wx.request({
        url: web_url + '/app.php?c=Goods&act=index',
        data: {
          cate_id: idx
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          that.setData({
            lists: res.data,
          })
        },
      })
    }
    
  },
  navbarTap:function(e){
    var that = this
    var index = e.currentTarget.dataset.id;
    var lists = that.data.lists;
    that.setData({
      currentTab: index
    })
    if(index==0){
      if (that.data.cate_id == 0){
        wx.request({
          url: web_url + '/app.php?c=Goods&act=index',
          data: {},
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            var lists = res.data
            that.setData({
              lists: lists,
            })
          },
        })
      }else{

        wx.request({
          url: web_url + '/app.php?c=Goods&act=index',
          data: {
            cate_id: that.data.cart_idx
          },
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            var lists = res.data
            that.setData({
              lists: lists,
            })
          },
        })
      }
    }else if(index==1){
      var price_sort = e.currentTarget.dataset.pricesort;
      var onOff = price_sort;
      if (price_sort){
        lists.sort(that.sortBy('price',1,-1));  //降序排列
      }else{
        lists.sort(that.sortBy('price',-1,1))   //升序排列
      };
      price_sort = !price_sort;
      onOff = price_sort;
      that.setData({
        lists:lists,
        price_sort: price_sort,
        onOff: onOff
      })
    }else if(index==2){
      var sales_volume = e.currentTarget.dataset.salesvolume;
      var onOff = sales_volume;
      if (sales_volume) {
        lists.sort(that.sortBy('sales_volume',1,-1));
      } else {
        lists.sort(that.sortBy('sales_volume',-1,1))
      };
      sales_volume = !sales_volume;
      onOff = sales_volume;
      that.setData({
        lists: lists,
        sales_volume: sales_volume,
        onOff: onOff
      })
    }
  },
  //排序功能
  //by函数接受一个成员名字符串做为参数
  //并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
  sortBy: function (name,one,_one) {
    return function (o, p) {
      var a, b;
      if (typeof o === "object" && typeof p === "object" && o && p) {
        a = o[name];
        b = p[name];
        if (a === b) {
          return 0;
        }
        if (typeof a === typeof b) {
          return a < b ? one : _one;
        }
        return typeof a < typeof b ? one : _one;
      }
      else {
        throw ("error");
      }
    }
  },
  //搜索商品功能
  formSubmit:function(e){
    console.log(e.detail.value.keyword)
    let that = this
    wx.request({
      url: web_url + '/app.php?c=Goods&act=index',
      data: {
        keyword: e.detail.value.keyword
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          lists: res.data,
        })
      },
    })
  },
  //产品详情
  goods_details: function (e) {
    var idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods-details/goods-details?id=' + idx
    })
  },

  //动画函数
  animationFn: function (btt, top_fixed) {
    var that = this;
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
    })
  },
  //点加入购物车图标，调用动画
  toShopcart: function (e) {
    var that = this;
    var goods_id = e.currentTarget.dataset.id
    wx.request({
      url: web_url + '/app.php?c=Goods&act=show',
      data: {
        user_id: that.data.user_id,
        id: goods_id
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var title = res.data.name;
        var price = res.data.price;
        var stock = res.data.inventory;
        var goods_img = res.data.thumb
        that.setData({
          title: title,
          price: price,
          stock: stock,
          goods_img: goods_img,
          goods_id: goods_id
        })
      },
    })
    that.animationFn(0, 0)
  },
  //关闭动画块
  animation_close: function () {
    var that = this
    that.animationFn('-500rpx', '1250rpx')
  },
  //减少购买数量
  minusCount: function (e) {
    var that = this
    let goods_num = that.data.goods_num;
    goods_num--;
    if (goods_num == 0) {
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
    
    //获取导航
    wx.request({
      url: web_url + '/app.php?c=Goods&act=cate',
      data: {},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        let allItems = [{name:'全部',id:0}];
        let lists = res.data.list;
        let classify_items = allItems.concat(lists)
        that.setData({
          classify_items: classify_items
        })
      }
    })

    wx.request({
      url: web_url + '/app.php?c=Goods&act=index',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var lists = res.data
        that.setData({
          lists: lists
        })
      },
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
  onShareAppMessage: function () {
  
  }
})