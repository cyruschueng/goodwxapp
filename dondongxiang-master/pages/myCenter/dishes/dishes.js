var app = getApp();
var MD5Util = require('../../../utils/md5.js');
Page({
	data: {
      curIndex:0,
      cart:[],
      cartTotal:0,
      cartname: 0,
      cartnum: 0,
      cartprice:0,
      dishes: [],
      openid: "",
      user_id: 0,
      getList:[],//服务器请求返回信息
      dishesList:[
          [
              {
                name:"大使",price:10,oldprice:199,
                textone:"直接5% 间接5%",texttwo:"门店代言权",
                num:1,id:1
              },
              {
                name:"销售",price:199,oldprice: 599,
                textone: "直接比例15% 间接比例15%",
                texttwo: "语音销售权",num:1,id:2
              },
              {
                name:"地主",price:699,oldprice: 1299,
                textone: "直接20% 间接20%",texttwo: "瓜棚使用权",
                num:1,id:3
              }
              ,
              {
                name: "店主",price: 1299,oldprice: 1899,
                textone: "直接比例30% 间接比例30%",texttwo: "店铺使用权",
                num: 1,id:4
              }
              ,
              {
                name: "合伙人",price: 8888,
                oldprice: 18888,textone: "直接40% 间接40%",
                texttwo: "店主也可使用88个冬瓜升级至合伙人(所有功能使用权)",num: 1,id:5
              }
          ]
      ]
	},
	// 选择菜品
	selectDish (event) {
    console.log(event);
      let dish = event.currentTarget.dataset.dish;
      let indexArr = this.data.dishesList[0][dish - 1];
      let flag = true;
      let	cart = this.data.cart;
      if(cart.length > 0){
          cart.forEach(function(item,index){
              if(item == dish){
                  cart.splice(index,1);
                  flag = false;
              }
          })
      }
      if(flag) cart.push(dish);
      this.setData({
          cartTotal : dish,
          cartname : indexArr.name,
          cartnum : indexArr.num,
          cartprice : indexArr.price,
      });
      this.setStatus(dish);
	},
	setStatus (dishId) {
      let dishes = this.data.dishesList;
      for (let dish of dishes){
        dish.forEach((item) => {
            item.status =  false
            if(item.id == dishId){
                item.status = !item.status || false
            }
        })
      }
      this.setData({
          dishesList:this.data.dishesList
      })
	},
  pay: function () {
    console.log("启动支付");
    var userid = this.data.user_id;
    var goods_info = [{ shop_id: 0, goods_id: this.data.cartTotal, sales_id: 0, goods_price: this.data.cartprice, goods_num: 1 }];//包装订单信息

    var total_fee = this.data.cartprice;

    wx.request({
      url: app.globalData.url +'/pay/orders/orders/',
      method: 'POST',
      data: {
        user_id: userid,   /*购买用户ID*/
        goods_info: goods_info,   /*购物车产品详情数组*/
        total_fee: total_fee,
        address_id:0,
        is_shop_consume: 0,
        goods_type: 1
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res)
        var sign = '';
        var resdata = res.data.data;
        var signA = "appId=" + "wxf13757beab3b800c" + "&nonceStr=" + res.data.data.nonce_str + "&package=prepay_id=" + res.data.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.data.timestamp;
        var signB = signA + "&key=" + "15914378810jiang0gong13660865011";
        sign = MD5Util.hexMD5(signB).toUpperCase();
        wx.requestPayment({
          'timeStamp': resdata.timestamp,
          'nonceStr': resdata.nonce_str,
          'package': 'prepay_id=' + resdata.prepay_id,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
	onLoad(){
      this.setData({
          openid: app.globalData.openid,
          user_id: app.globalData.user_id
      })
	}
})