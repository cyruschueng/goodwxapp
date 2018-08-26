// pages/shopCart/shopCart.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice:'0.00',
    checkedAllState:true,
    num:'0',
    isEdit:true,
    items:[],
    totalPrice: ''
  },


  //编辑购物车
  bindEdit: function () {
    var that = this;
    let isEdit = that.data.isEdit;
    isEdit = !isEdit;
    that.setData({
      isEdit: isEdit,
    })
  },

  
  //减少数量
  minusCount: function (e) {
    var that = this;
    const index = e.currentTarget.dataset.id;
    let goods_num = that.data.items[index].goods_num;
    goods_num--;
    if (goods_num == 0) {
      goods_num = 1
    }
    let cart_id = that.data.items[index].id;
    wx.request({
      url: web_url + '/app.php?c=Cart&act=change',
      data: {
        cart_id: cart_id,
        goods_num: goods_num
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (!res.data.error) {
          that.data.items[index].goods_num = goods_num;
          that.setData({
            items: that.data.items
          })
          that.getTotalPrice();
        }
      },
    })
    
  },
  //增加数量
  addCount: function (e) {
    var that = this;
    const index = e.currentTarget.dataset.id;
    let goods_num = that.data.items[index].goods_num;
    goods_num++;
    let cart_id = that.data.items[index].id;
    wx.request({
      url: web_url + '/app.php?c=Cart&act=change',
      data: {
        cart_id: cart_id,
        goods_num: goods_num
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (!res.data.error) {
          that.data.items[index].goods_num = goods_num;
          that.setData({
            items: that.data.items
          })
          that.getTotalPrice();
        }
      },
    })

  },
  //手动改数量
  changeNumFn: function (e) {
    var that = this;
    let index = e.currentTarget.dataset.id;
    let goods_num = e.detail.value;
    let cart_id = that.data.items[index].id;
    wx.request({
      url: web_url + '/app.php?c=Cart&act=change',
      data: {
        cart_id: cart_id,
        goods_num: goods_num
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (!res.data.error) {
          that.data.items[index].goods_num = goods_num;
          that.setData({
            items: that.data.items
          })
          that.getTotalPrice();
        }
      },
    })


  },
  //单位是否选中
  bindCheck: function (e) {
    var that = this;;
    let index = e.currentTarget.dataset.id;
    let items = that.data.items;
    let checkedAllState = that.data.checkedAllState;
    let checkedState = items[index].checkedState;
    items[index].checkedState = !checkedState;
    var num = items.filter(function (item) {
      return item.checkedState == true
    }).length
    if( num == items.length){
      checkedAllState = true
    }else{
      checkedAllState = false
    }
    that.setData({
      items: items,
      num: num,
      checkedAllState: checkedAllState
    })
    that.getTotalPrice();
  },
  //全选购物车事件
  bindCheckAll: function () {
    var that = this;
    let checkedAllState = that.data.checkedAllState;
    checkedAllState = !checkedAllState;
    let items = that.data.items;
    for (let i = 0; i < items.length; i++) {
      items[i].checkedState = checkedAllState;
    }
    var num = items.filter(function (item) {
      return item.checkedState == true
    }).length
    that.setData({
      checkedAllState: checkedAllState,
      items: items,
      num: num
    })
    that.getTotalPrice();
  },
  //获取总价
  getTotalPrice: function (e) {
    var that = this;
    let items = that.data.items;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      // console.log(items[i].checkedState)
      //parseFloat 
      if (items[i].checkedState) {
        total += parseFloat(items[i].price) * parseInt(items[i].goods_num)
      }
    }
    that.setData({
      items: items,
      totalPrice: total.toFixed(2)
    });
  },
  //删除购物车
  delete_order: function () {
    var that = this;
    let items = that.data.items;
    //获取选中的订单，并把订单id发送到后台，执行删除
    let deleteArray = [];
    items.filter(function (item) {
      return item.checkedState == true
    }).forEach(function (item) {
      deleteArray.push(item.id)
    });
    let cart_idx = deleteArray.join(',');
    //获取未选中的订单，返回到页面的订单列表
    let delete_items = [];
    items.filter(function (item) {
      return item.checkedState == false || item.checkedState == null
    }).forEach(function (item) {
      delete_items.push(item)
      }); 
    wx.request({
      url: web_url + '/app.php?c=Cart&act=del',
      data: {
        cart_id: cart_idx
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        var num = 0
        if (!res.data.error) {
          that.setData({
            items: delete_items,
            num:num
          })
          that.getTotalPrice();
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {},
          })
        } 
      },
    })
  },

  //跳转支付页面
  toPayHtml: function (e) {
    var that = this;
    let items = that.data.items;
    let onShop = items.filter(function (item) {
      return item.checkedState == true
    }).length
    if (onShop == 0) {
      wx.showToast({
        title: '请勾选商品',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: true,
        success: function (res) { },
      })
    } else {
      let checkedArray = [];
      items.filter(function (item) {
        return item.checkedState == true
      }).forEach(function (item) {
        checkedArray.push(item.id)
      });
      var cart_idx = checkedArray.join(',');
      var way = 1;
      wx.navigateTo({
        url: '/pages/payHtml/payHtml?cart_id=' + cart_idx + '&way=' + way,
        success: function (res) { },
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
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
    //获取购物车订单列表
    var that = this
    wx.request({
      url: web_url + '/app.php?c=Cart&act=lists',
      data: {
        user_id: that.data.user_id
      },
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        var items = res.data.list;
        for (let i = 0; i < items.length; i++) {
          var checkedState = items[i].checkedState;
          checkedState = true;
          items[i].checkedState = checkedState
        }
        var num = res.data.list.length
        that.setData({
          items: items,
          num: num
        })
        that.getTotalPrice();
      },
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
  onShareAppMessage: function () {
  
  }
})