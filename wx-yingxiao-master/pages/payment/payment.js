// pages/payment/payment.js
Page({
  data: {
    hidden:'1',
    user_id:'0',
    group_goods_id: '0',
    group_head_id:'0'
  },
  onLoad: function (e) {
    var that = this;
    //三种进入判断用actives_type
    if(e.actives_type=='0'){
      // 普通购买
      that.setData({
        actives_type: '0',
        cart_id: e.cart_id,
        user_id: '0',
        distribution_royalty: '0',
      })
    }else if(e.actives_type=='1'){
      //用户分销后购买
      that.setData({
        actives_type:'1',
        cart_id: e.cart_id,
        user_id: e.user_id,
        distribution_royalty:e.distribution_royalty
      })
    }else{
      //拼团情况
      if (e.group_goods_id){
        //拼团列表入口
        that.setData({
          cart_id: e.cart_id,
          actives_type: '2',
          group_goods_id: e.group_goods_id,
          distribution_royalty: '0',
          group_head_id: e.group_head_id
        })            
      }else{
        //拼团商品入口
        that.setData({
          cart_id: e.cart_id,
          actives_type: '2',
          distribution_royalty: '0',
          group_head_id: e.group_head_id
        })   
      }    
    }


    //分销用户id id为空,则无人分销
    // if(e.user_id=='undefined'){
    //   that.setData({
    //     cart_id: e.cart_id,
    //     user_id: '0',
    //     distribution_royalty: '0',
    //     actives_type: '0'
    //   })
    // } else if (e.actives_type=='2'){
    //   //拼团
    //   that.setData({
    //     cart_id:e.cart_id,
    //     actives_type:'2',
    //     group_goods_id: e.group_goods_id,
    //     //分销提成为0
    //     distribution_royalty:'0'
    //   })
    //   if(e.group_head_id){
    //     that.setData({
    //       group_head_id:e.group_head_id
    //     })
    //   }
    // } else if (e.actives_type=='1'){
    //   //分销
    //   that.setData({
    //     cart_id: e.cart_id,
    //     user_id: e.user_id,
    //     distribution_royalty: e.distribution_royalty,
    //     actives_type: '1',
    //   })
    // }else{
    //   that.setData({
    //     cart_id: e.cart_id,
    //     user_id: '0',
    //     distribution_royalty: '0',  
    //   })
    // }
    //获取商品(数组)
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/product/getIdCart',
      data: {cart_id:e.cart_id},
      header: { 'content-type': 'application/x-www-form-urlencoded' }, 
      method: 'POST',
      success: function(res) {
        var sum = 0;
        var items = res.data.rows;
        var num = [];
        //获取总计,每条商品个数
        console.log(res.data.rows)
        items.forEach(function(val,index){
          sum += parseFloat(val.goods_price);   
          num[index] = val.goods_number;
        })
        that.setData({
          payment:res.data.rows,
          sum:sum.toFixed(2),
          num:num,
        })
      },
    })
    //获取用户地址信息
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
      method: 'POST',
      data: { user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        //判断默认地址
        if(res.data.code!='0'){
          //更新地址完成
          that.setData({
            addressList:res.data
          })
          //数据接连加载,判断默认
          res.data.forEach(function (val, index) {
            if (val.is_default == '1') {
              that.setData({
                address: val
              })
              return false;
            } else {
              that.setData({
                address: res.data[0]
              })
            }
          })
        }else{
          that.setData({
            address:''
          })
        }        
      },
    })     
  },
  onShow:function(){
    //刷新用户地址
    var that = this;
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
      method: 'POST',
      data: { user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        if (res.data.code != '0') {
          that.setData({
            addressList:res.data
          })
          res.data.forEach(function (val, index) {
            if (val.is_default == '1') {
              that.setData({
                address: val
              })
              return false;
            } else {
              that.setData({
                address: res.data[0]
              })
            }
          })
        } else {
          that.setData({
            address: ''
          })
        }
      },
    })      
  },
  //发送支付信息
  pay:function(){
    var that = this;
    if(that.data.address!=''){
      var orderInfo = {
        //用户openid
        openid: getApp().globalData.openid,
        //店铺id
        admin_user_id: getApp().globalData.shopId,
        // 用户id
        user_id: getApp().globalData.userid,
        //地址 收货人姓名
        consignee: that.data.address.consignee,
        //收货地址省 市 县
        province: that.data.address.province,
        city: that.data.address.city,
        area: that.data.address.area,
        //收货地址详细信息
        address: that.data.address.address,
        //收货人电话
        tel: that.data.address.tel,
        //商品总价格
        goods_amount: that.data.sum,
        //购物车id
        cart_id: that.data.cart_id,
        //分销人id
        share_user_id: that.data.user_id,
        //分销提成
        share_money: that.data.distribution_royalty,
        //判断分销?拼团?普通?
        actives_type: that.data.actives_type,
        //折扣(关联优惠券)
        bonus:0,
        //若为拼团
        group_goods_id: that.data.group_goods_id,
        //group_head_id
        group_head_id: that.data.group_head_id,
      }
      console.info(orderInfo)
      //支付信息请求
      wx.request({
        url: 'https://xcx.bjletusq.com/index.php/home/product/pay',
        data: orderInfo,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          //包含订单号
          console.log(res)
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
              //若为拼团
              if (that.data.actives_type=='2'){
                wx.navigateTo({
                  url: '/pages/share/share?share=1&order_sn='+res.data.order_sn,
                })
              }else{
                wx.showToast({
                  title: '支付成功',
                  success: function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }
                })
              }
            },
            fail:function(){
              console.log(res)
            }
          })
        },
      })
    }else{
      wx.showToast({
        title: '请选择地址',
        image:'/pages/source/images/info.png'
      })
    }
  },
  //跳转到地址修改页面
  bindAdd:function(){
    wx.navigateTo({
      url: '/pages/address/address?enc=1',
    })
  },
  //地址选择弹层
  changeAdd:function(e){
    var addList = this.data.addressList
    this.setData({
      address:addList[e.currentTarget.dataset.index],
      hidden:'1'
    })
  },
  //关闭弹层
  close:function(){
    this.setData({
      hidden:'1'
    })
  },
  //获取修改后的地址列表
  checkAdd:function(){
    var that = this;
    wx.request({
      url: 'https://xcx.bjletusq.com/index.php/home/user/getAddress',
      method: 'POST',
      data: { user_id: getApp().globalData.userid },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        that.setData({
          dataList:res.data,
          hidden:'0'
        })
      },
    })     
  }
})