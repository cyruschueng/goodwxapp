var app = getApp()
Page({
  data: {
    storeNane:'',
    buymenu:{},
    price:0,
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession: '',
    num:0,
    
  },

  onShow:function(){
    var that = this;

    wx.getStorage({
      key: 'busname',
      success: function (res) {
        console.log(res.data)
        that.setData({
          storeNane: res.data
        })

      }
    })

  
  },

  onLoad:function(){

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log('页面66666999')
    console.log(pages)


    var that = this;
    wx.setNavigationBarTitle({
      title: '购买详情'
    });
    
    that.setData({
      buymenu: prevPage.data.buymenu,
      price: prevPage.data.price,
      storeNane: prevPage.data.storeNane,
      num: prevPage.data.num
    });
  },

//提交订单
  sub:function(){

    var subdata = {  }

    app.commonAjax('cat/orderFood/submitOrder', ['shopId', 'memberId','bizId'], subdata, function (res) {

      if (res.data.code === 0) {

        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            wx.redirectTo({
              url: '/page/order/index'
            })
          }
        })

      } else if (res.data.code === -1) {
        wx.showToast({
          title: '提交失败',
          icon: 'success',
          duration: 2000
        })
      }

    },app)

  }

})