// pages/detail/detail.js
Page({
  data: {
    current:1,
    hidden:'0',
    num:1,
    iscollted:'0',
    seltedColor:'颜色',
    seletedSize:'尺码',
    colorId:'-1',
    sizeId:'-1',
    actives_type:'0',
    paycarShow:'1',
    btn:'btn',
    tobuy:'tobuy',
    distribution_switch:'1',
  },
  onLoad: function (e) {
    //获取商品id
    var that = this;
    that.setData({
      id: e.id
    })
    //获取用户分销id
    if (e.user_id&&e.active_type==1) {
      that.setData({
        distributer: e.user_id,
        actives_type: '1',
        is_distribution: '0',
        paycarShow: '0',
        btn: 'btn1',
        tobuy: 'tobuy1',
        distribution_switch: '-1'
      })
    } else {
      that.setData({
        distributer: '0',
        actives_type: '0',
        paycarShow: '1',      
      })
    }
    //判断用户是否可以分销
    if (getApp().globalData.is_distribution == '1') {
      that.setData({
        shareType: 'share',
      })
    }
    //获取商品信息
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/goodsinfo',
      method:'POST',
      data:{id:e.id},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: res => {
        that.setData({
          detail:res.data,
          price:res.data.goods_price,
          imglen:res.data.goods_img.length,
          pre_price: res.data.goods_price
        })
        //是否可以进行分销
        if (res.data.is_distribution == '1' && getApp().globalData.is_distribution == '1'){
          that.setData({
            shareType: 'share',
            distribution:' '
          })
        }else{
          that.setData({
            distribution:'distribution',
          })
        }
      },
      complete:function(){
        //判断收藏
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/user/isCollect',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: { goods_id: e.id, user_id: getApp().globalData.userid, admin_user_id: getApp().globalData.shopId },
          method: 'POST',
          success: function (res) {
            if(res.data.code=='1'){
              that.setData({
                iscollted:'1'
              })
            }else{
              that.setData({
                iscollted:'0'
              })
            }
          },
        })        
      }
    })   
  }, 
  onShow:function(){
    var that = this;
    //判断用户是否可以分销
    if (getApp().globalData.is_distribution == '1') {
      that.setData({
        shareType: 'share',
        distribution: ' '
      })
    }
  },
  //终止回调函数
  return:function(){
    return false;
  },
  //分销绑定
  distribution:function(){
    wx.navigateTo({
      url: '/pages/distribution/distribution',
    })
  },
  //分销分享
  onShareAppMessage:function(e){
    var that = this;
    wx.showShareMenu({
      withShareTicket: true,
    })
    return{
      title:that.data.goods_name,
      path:'/pages/detail/detail?id='+that.data.id+'&user_id='+getApp().globalData.userid+'active_type='+that.data.active_type,
      success:function(res){
        console.log(res)
      }
    }
  },
  //轮播图指针
  swiperChange:function(e){
    this.setData({
      current:e.detail.current+1
    })
  },
  //关闭引导层
  close: function () {
    this.setData({
      hidden: '0',
    })
  },
  //修改颜色
  changeColor: function (e) {
    var colorId = e.currentTarget.dataset.index;
    this.setData({
      colorCurrent: colorId,
      seletedColor: this.data.detail.color[colorId].attr_value,
      colorId:colorId,
    })
  },
  //修改尺寸
  changeSize: function (e) {
    var sizeId = e.currentTarget.dataset.index;
    var price = ((-(-this.data.detail.goods_price - this.data.detail.size[sizeId].attr_pric))*this.data.num).toFixed(2);
    this.setData({
      sizeCurrent: sizeId,
      seletedSize: this.data.detail.size[sizeId].attr_value,
      price:price,
      pre_price:price,
      sizeId: sizeId,
    })
  },
  //增加数量
  add: function () {
    var price = (this.data.pre_price * (this.data.num+1)).toFixed(2);
    this.setData({
      num: this.data.num + 1,
      price:price
    })
  },
  //减少数量
  reverse: function () {
    var price = (this.data.pre_price * (this.data.num - 1)).toFixed(2)
    if (this.data.num <= 1) {
      this.setData({
        num: 1,
      })
    } else {
      this.setData({
        num: this.data.num - 1,
        price:price
      })
    }
  },
  //加入购物车
  addto: function () {
    this.setData({
      hidden: '1',
      tip: '添加购物车',
      bg: '#f19249',
      ovf:'hidden'
    })
  },
  //立即购买
  tobuy:function(){
    this.setData({
      hidden:'1',
      tip:'提交',
      bg:'#ff0100',
      ovf: 'hidden'
    })
  },
  //加入/取消收藏
  collect: function () {
    var that = this;
    var iscollted = that.data.iscollted;
    if (iscollted == '0') {
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/addCollect',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { goods_id: that.data.id, user_id: getApp().globalData.userid, admin_user_id: getApp().globalData.shopId },
        method: 'POST',
        success: function (res) {
          that.setData({
            iscollted: '1',
          })
        },
      })
    } else {
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/user/cancelCollect',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: { goods_id: that.data.id, user_id: getApp().globalData.userid },
        method: 'POST',
        success: function (res) {
          console.log(res.data)
          that.setData({
            iscollted: '0',
          })
        },
      })
    }
  },
  //跳转到购物车
  topaycar: function () {
    wx.navigateTo({
      url: '/pages/paycar/paycar',
    })
  },
  //购买
  sub:function(e){
    var that = this;
    if (that.data.distributer == getApp().globalData.userid) {
      that.setData({
        distributer: '0'
      })
    }
    //判断是否选择颜色,尺寸
    if (that.data.colorId!='-1'&&that.data.sizeId!='-1'){
      //判断点击来源是否为立即购买
      if (e.currentTarget.dataset.tip == '提交') {
        console.log(that.data)
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/addCart',
          data: { user_id: getApp().globalData.userid, goods_id: that.data.id, goods_name: that.data.detail.goods_name, goods_price: that.data.price, goods_number: that.data.num, goods_attr_color: that.data.detail.color[that.data.colorId].attr_value, goods_attr_size: that.data.detail.size[this.data.sizeId].attr_value, actives_type: that.data.actives_type},
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res) {
            wx.navigateTo({
              url: '/pages/payment/payment?cart_id=' + res.data.cart_id + '&user_id=' + that.data.distributer + '&distribution_royalty=' + that.data.detail.distribution_royalty + '&actives_type=' + that.data.actives_type,
            })
          },
        })
      } else {
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/addCart',
          data: { user_id: getApp().globalData.userid, goods_id: that.data.id, goods_name: that.data.detail.goods_name, goods_price: that.data.price, goods_number: that.data.num, goods_attr_color: that.data.detail.color[that.data.colorId].attr_value, goods_attr_size: that.data.detail.size[this.data.sizeId].attr_value },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: function (res) {
            if (res.data.code > 0) {
              wx.showToast({
                title: res.data.message,
              })
            }
          },
        })
      }
    }else{
      wx.showToast({
        title: '请选择参数',
        image:'/pages/source/images/err.png',
        duration:2000,
        success:function(){
          that.setData({
            seltedColor: '颜色',
            seletedSize: '尺码',           
          })
        }
      })
    }
  },
  //生成分销二维码
  qrcode:function(){
    var that = this;
    if (getApp().globalData.is_distribution == '1'){
      that.setData({
        canvas: '1',
        canvasWrap: '1'
      })
      wx.request({
        // 获取token
        url: 'https://xcx.bjletusq.com/index.php/home/common/getCodeImg',
        data: { goods_id: that.data.detail.id, admin_user_id: getApp().globalData.shopId, path: '/pages/detail/detail?id=' + that.data.id, user_id: getApp().globalData.userid, width: 300 },
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success(res) {
          if (res.data.code == '1') {
            console.log(res.data)
            wx.previewImage({
              urls: [res.data.poster,],
              success: function () {
                that.setData({
                  canvasWrap: '0',
                  canvas: '0'
                })
              }
            })
          } else {
            wx.showToast({
              title: '网络繁忙',
              image: '/pages/source/images/err.png'
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '/pages/distribution/distribution',
      })
    }

  },
})