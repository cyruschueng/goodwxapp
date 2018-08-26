// pages/orders/orders.js
Page({
  data: {
    status:['全部','待付款','待成团','待发货','待收货','已完成'],
    status1: [ '待付款', '拼团中', '待发货', '待收货','已完成'], 
    more: [
      ['立即付款', '取消订单'], ['邀请好友拼团'], [], [], ['再次购买','删除订单']
    ],
    coindex:'0',
  },
  onLoad: function (e) {
    var that = this;
    //设置进入页面内指针
    if(!e.current){
      that.setData({
        current:0
      })
    }else{
      var current = parseInt(e.current);
      that.setData({
        current: current,
      })
    }
    //请求所有订单
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getOrder',
      data: { user_id: getApp().globalData.userid ,admin_user_id:getApp().globalData.shopId},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        res.data.forEach(function(val,index){
          val.orderIndex = index;
        })
        that.setData({
          order:res.data,
        })

        /*
          0:未支付
          1:待成团
          2:代发货
          3:待收货
          4:待评价
         */
        //控制每个swiper-item长度,确认高度
        var order = that.data.order;
        var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
        var length = [];
        order.forEach(function (val, index) {
          if(val.is_del=='0'){
            switch (val.status) {
              case '0':
                sta1++;
                break;
              case '1':
                sta2++;
                break;
              case '2':
                sta3++;
                break;
              case '3':
                sta4++;
                break;
              case '4':
                sta5++;
                break;
              default:
                break;
            }
          }

        })
        length.push(order.length * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
        //获得每个item高度
        that.setData({
          height: length,
          heightCurrent: '0',
        })
      },
    })
  },
  //上方banner导航栏,点击切换
  nav:function(e){
    var navIndex = e.currentTarget.dataset.index;
    var coindex = this.data.coindex;
    if(navIndex>coindex){
      this.setData({
        navPos:'120rpx',
        heightCurrent:navIndex,
      })
    }else{
      this.setData({
        navPos: '-120rpx',
        heightCurrent: navIndex,        
      })
    }
    this.setData({
      current:navIndex,
      coindex:navIndex,
    })
  },
  //轮播图滑动切换,逆向数据渲染
  swiper:function(e){
    var that = this;
    var swiperCurrent = e.detail.current;
    setTimeout(function(){
      that.setData({
        current: swiperCurrent,
        heightCurrent:swiperCurrent,
      })
    },200)
  },
  checkdetail:function(e){
    var that = this;
    var order = that.data.order;
    console.log(e);
    switch(e.currentTarget.dataset.type){
      case '立即付款':
        console.log(that.data.height)
        wx.request({
          url: 'https://xcx.bjletusq.com/index.php/home/product/pay',
          data: { order_sn: e.currentTarget.dataset.order.order_sn },
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          method: 'POST',
          success: res => {
            if(res.data.code=='1'){
              //调取微信支付
              wx.requestPayment({
                //支付时间戳
                timeStamp: res.data.rows.timeStamp,
                //支付随机字符串
                nonceStr: res.data.rows.nonceStr,
                //支付密钥
                package: res.data.rows.package,
                //支付密钥类型
                signType: 'MD5',
                //支付签名
                paySign: res.data.rows.paySign,
                success: function (res1) {
                  //如果为拼团,状态改为1
                  if (e.currentTarget.dataset.order.actives_type == '2') {
                    order[e.currentTarget.dataset.index].status = '1';
                    that.setData({
                      order: order,
                    })
                    //控制每个swiper-item长度,确认高度
                    var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
                    var length = [];
                    order.forEach(function (val, index) {
                      switch (val.status) {
                        case '0':
                          sta1++;
                          break;
                        case '1':
                          sta2++;
                          break;
                        case '2':
                          sta3++;
                          break;
                        case '3':
                          sta4++;
                          break;
                        case '4':
                          sta5++;
                          break;
                        default:
                          break;
                      }
                    })
                    length.push(order.length * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
                    //获得每个item高度
                    that.setData({
                      height: length,
                      heightCurrent: '0',
                    })
                  } else {
                    //普通支付状态改为2
                    order[e.currentTarget.dataset.index].status = '2';
                    that.setData({
                      order: order,
                    })
                    //控制每个swiper-item长度,确认高度
                    var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
                    var length = [];
                    order.forEach(function (val, index) {
                      switch (val.status) {
                        case '0':
                          sta1++;
                          break;
                        case '1':
                          sta2++;
                          break;
                        case '2':
                          sta3++;
                          break;
                        case '3':
                          sta4++;
                          break;
                        case '4':
                          sta5++;
                          break;
                        default:
                          break;
                      }
                    })
                    length.push(order.length * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
                    //获得每个item高度
                    that.setData({
                      height: length,
                      heightCurrent: '0',
                    })
                    console.log(that.data.height)
                  }
                },
              })
            }else{
              wx.showToast({
                title: '网络错误',
                image:'/pages/source/images/err.png'
              })
            }
          }
        })        
      break;
      case '邀请好友拼团':
        wx.navigateTo({
          url: '/pages/share/share?order_sn='+e.currentTarget.dataset.order.order_sn,
        })
      break;
      case '取消订单':
        wx.showModal({
          title: '取消订单',
          content: '确认取消订单?',
          success:function(event){
            if(event.confirm){
              console.log(that.data.height)
              wx.request({
                url: 'https://xcx.bjletusq.com/index.php/home/user/delOrder',
                data: { orderid: e.currentTarget.dataset.order.id },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'POST',
                success: res => {
                  if (res.data.code == 1) {
                    order[e.currentTarget.dataset.index].is_del = '1';
                    that.setData({
                      order: order
                    })
                    var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
                    var length = [];
                    var showlength = 0;
                    order.forEach(function (val, index) {
                      if (val.is_del == '0') {
                        switch (val.status) {
                          case '0':
                            sta1++;
                            break;
                          case '1':
                            sta2++;
                            break;
                          case '2':
                            sta3++;
                            break;
                          case '3':
                            sta4++;
                            break;
                          case '4':
                            sta5++;
                            break;
                          default:
                            break;
                        };
                        showlength++;
                      }

                    })
                    length.push(showlength * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
                    //获得每个item高度
                    that.setData({
                      height: length,
                    })
                    console.log(that.data.height)
                    wx.showToast({
                      title: '订单取消成功',
                      duration:2000
                    })
                  } else {
                    wx.showToast({
                      title: '网络错误',
                      image: '/pages/source/images/err.png'
                    })
                  }
                }
              })
            }
          }
        })
      break;
      case '删除订单':
        wx.showModal({
          title: '删除订单',
          content: '确认删除订单?',
          success: function (event) {
            if (event.confirm) {
              console.log(that.data.height)
              wx.request({
                url: 'https://xcx.bjletusq.com/index.php/home/user/delOrder',
                data: { orderid: e.currentTarget.dataset.order.id },
                header: { "Content-Type": "application/x-www-form-urlencoded" },
                method: 'POST',
                success: res => {
                  if (res.data.code == 1) {
                    order[e.currentTarget.dataset.index].is_del = '1';
                    that.setData({
                      order: order
                    })
                    var sta1 = 0, sta2 = 0, sta3 = 0, sta4 = 0, sta5 = 0;
                    var length = [];
                    var showlength = 0;
                    order.forEach(function (val, index) {
                      if (val.is_del == '0') {
                        switch (val.status) {
                          case '0':
                            sta1++;
                            break;
                          case '1':
                            sta2++;
                            break;
                          case '2':
                            sta3++;
                            break;
                          case '3':
                            sta4++;
                            break;
                          case '4':
                            sta5++;
                            break;
                          default:
                            break;
                        };
                        showlength++;
                      }

                    })
                    length.push(showlength * 443 + 80, sta1 * 443 + 80, sta2 * 443 + 80, sta3 * 443 + 80, sta4 * 443 + 80, sta5 * 443 + 80);
                    //获得每个item高度
                    that.setData({
                      height: length,
                    })
                    console.log(that.data.height)
                    wx.showToast({
                      title: '订单取消成功',
                      duration: 2000
                    })
                  } else {
                    wx.showToast({
                      title: '网络错误',
                      image: '/pages/source/images/err.png'
                    })
                  }
                }
              })
            }
          }
        })
      break;      
      case "再次购买":
        wx.navigateTo({
          url: '/pages/detail/detail?id='+e.currentTarget.dataset.order.goods_list[0].goods_id,
        })
      break;
      default:
      wx.showToast({
        title: '网络错误',
      })
      break;
    }
  },
})