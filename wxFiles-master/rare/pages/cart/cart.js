var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        pic: '/img/g3.png', guige: '200*100', price: '25.00', num: 2, title: '的说法都是 手动阀是的是的'
      },
      {
        pic: '/img/g3.png', guige: '200*100', price: '25.00', num: 2, title: '的说法都是 手动阀是的是的'
      },
      {
        pic: '/img/g3.png', guige: '200*100', price: '25.00', num: 2, title: '的说法都是 手动阀是的是的'
      },
      {
        pic: '/img/g3.png', guige: '200*100', price: '25.00', num: 2, title: '的说法都是 手动阀是的是的'
      }
    ],
    check: [],
    checkall: false,
    sum:0.00,
    count:0
  },
  del: function (e) {
    var li = [e.currentTarget.id]
    li.push()
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if(res.confirm){
          wx.request({
            url: app.url + 'WxUserBuy/updategwdel',
            method:'post',
            data:{
              ids: li
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function(res){
              console.log(res)
              if(res.data.code==100){
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 800
                })
                wx.redirectTo({
                  url: '/pages/cart/cart',
                })
              }
            }
          })
        }else{

        }
      }
    })
  },
  checkedAll: function (e) {
    var that = this
    var check = this.data.check
    var op =  that.data.list
    var sum = 0;
    var count = 0
    if (this.data.checkall == true) {
      for (var i = 0; i < check.length; i++) {
        check[i] = 0
      }
      this.setData({
        check: check,
        checkall: false,
        sum: 0,
        count: 0
      })
    } else {
      for (var i = 0; i < check.length; i++) {
        check[i] = 1
      }
      for(var i=0;i<op.length;i++){
        sum = sum + (op[i].sellprice*op[i].buypron)
        count = count + op[i].buypron
      }
      this.setData({
        check: check,
        checkall: true,
        sum:sum,
        count:count
      })
    }
  },
  checked: function (e) {
    var id = e.currentTarget.dataset.id
    var val = e.currentTarget.dataset.val
    var check = this.data.check
    if (val == 0) {
      check[id] = 1
    } else {
      check[id] = 0
    }
    this.setData({
      check: check
    })

    var temp = 0;
    var op = this.data.list
    var sum = 0;
    var count = 0
    for (var i = 0; i < this.data.check.length; i++) {
      if (this.data.check[i] == 0) {
        temp = 1
      }
      if (this.data.check[i] == 1){
        sum = sum + (op[i].buypron*op[i].sellprice)
        count = count + op[i].buypron
      }
      
    }
    if (temp == 0) {
      this.setData({
        checkall: true,
        sum: sum,
        count: count
      })
    } else {
      this.setData({
        checkall: false,
        sum: sum,
        count: count
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.load(that)
    var check = []
    
    wx.request({
      url: app.url + 'WxUserBuy/buymsgall?openid=' + app.globalData.openid,
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.data.object.length; i++) {
          check.push(0)
        }
        that.setData({
          check: check
        })
        that.setData({
          list: res.data.object
        })
      }
    })
  },
  onShow: function () {

  },
  navToPayfor: function (e) {
    if(this.data.count == 0){
      wx.showToast({
        title: '您还没有选择商品',
        image: '/img/60.png',
        duration: 800
      })
    }else{
      var that = this
      var li = []
      for (var i = 0; i < that.data.check.length; i++) {
        if (that.data.check[i] == 1) {
          li.push(that.data.list[i])
        }
      }
      wx.navigateTo({
        url: '/pages/payfor/payfor?ol=1&types=1&sum=' + that.data.sum + '&count=' + that.data.count + '&list=' + JSON.stringify(li),
      })
    }
    
  }
})