// pages/myCenter/shop/chatblock/chatblock.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      carList:[
          {
              hasList:false,
              selected:false,
              shop_id:68,
              shop_name:"鬼上身",
              data:[
                {
                  goods_id:44,
                  goods_name:"空间来看1",
                  goods_price:"12",
                  id:18,
                  img_url:"https://www.assistedu.com/uploads/20180328/15222058541077.png",
                  shop_id:68,
                  shop_name:"鬼上身",
                  total_num:1,
                  user_id:54,
                  check: false,
                  index:0,
                },
                {
                  goods_id: 44,
                  goods_name: "空间来看1",
                  goods_price: "12",
                  id: 18,
                  img_url: "https://www.assistedu.com/uploads/20180328/15222058541077.png",
                  shop_id: 68,
                  shop_name: "鬼上身",
                  total_num: 1,
                  user_id: 54,
                  check: false,
                  index: 0,
                }
              ]
          },
          {
            hasList: false,
            selected: false,
            shop_id: 68,
            shop_name: "鬼上身",
            data: [
              {
                goods_id: 44,
                goods_name: "空间来看",
                goods_price: "12",
                id: 18,
                img_url: "https://www.assistedu.com/uploads/20180328/15222058541077.png",
                shop_id: 68,
                shop_name: "鬼上身",
                total_num: 1,
                user_id: 54,
                check: false,
                index: 1,
              },
              {
                goods_id: 44,
                goods_name: "空间来看",
                goods_price: "12",
                id: 18,
                img_url: "https://www.assistedu.com/uploads/20180328/15222058541077.png",
                shop_id: 68,
                shop_name: "鬼上身",
                total_num: 1,
                user_id: 54,
                check:false,
                index: 1,
              },
              {
                goods_id: 44,
                goods_name: "空间来看",
                goods_price: "12",
                id: 18,
                img_url: "https://www.assistedu.com/uploads/20180328/15222058541077.png",
                shop_id: 68,
                shop_name: "鬼上身",
                total_num: 1,
                user_id: 54,
                check: false,
                index: 1,
              }
            ]
          }
      ],//归类后的购物车数组
      hasList: false,          // 列表是否有数据
      totalPrice: 0,           // 总价，初始为0
      selectAllStatus: false,    // 全选状态
      goodslen:5,
  },
  onLoad: function (options) {
     //this.getcartInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
  
  },
  //结算
  gocart:function(){
    wx.navigateTo({
      url: '/pages/myCenter/shop/showbuy/showbuy',
    })

  },
  //返回购物车的信息
  getcartInfo:function(){
    var _this = this;
    //上传到服务器购物车接口
    wx.request({
      url: app.globalData.url + '/ordermanage/orders/cartList',
      method: "GET",
      data: {
        user_id: app.globalData.user_id,
        page:1,
        size:10,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        var resdata = res.data.data;
        if (res.data.errcode==0){
          var map = {},dest = [];
          for (var i = 0; i < resdata.length; i++) {
            var ai = resdata[i];
            if (!map[ai.shop_id]) {
              dest.push({
                  shop_id: ai.shop_id,
                  shop_name: ai.shop_name,
                  hasList: false,
                  selected: false,
                  chatselect: false,
                  data: [ai],
              });
              map[ai.shop_id] = ai;
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj.shop_id == ai.shop_id) {
                  dj.data.push(ai);
                  break;
                }
              }
            }
          }
          console.log(dest);
          _this.setData({
            carList: dest//返回购物车产品数组
          })
        }else{
          _this.viewmsg("获取失败！")
        }
        
      }
    })
  },
  //增加数量
  addCount:function(e){
      this.setData({
        total_num: this.data.total_num+1,
      })
  },
  //减少数量
  minusCount:function(e){
    this.setData({
      total_num: this.data.total_num - 1,
    })
  },
  //商品选中
  goodcheck:function(e){
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var carts = this.data.carList;
      var goodselect = carts[id].data[index].check;
      carts[id].data[index].check = !goodselect;
      var msg = [];
      var listarr = [];
      for (var i = 0; i < carts.length; i++){
        for (var j = 0; j < carts[i].data.length;j++){
          if (carts[i].data[j].check==true){
            listarr.push(carts[i].data[j].check);
            if (listarr.length == this.data.goodslen){
                this.setData({
                    selectAllStatus: true,
                });
            }else{
                this.setData({
                    selectAllStatus: false,
                });
            }
          }
        }
      }
      for (var i = 0; i < carts[id].data.length; i++){
        if (carts[id].data[i].check==true){
          msg.push(carts[id].data[i].check);
          if (msg.length == carts[id].data.length){
            carts[id].selected = true;
          }else{
            carts[id].selected = false;
          }
        }
      }
      this.setData({
        carList: carts,
      });
  },
  //店铺选中
  checkshop:function(e){
      var index = e.currentTarget.dataset.index;
      var carts = this.data.carList;
      var selected = carts[index].selected;
      carts[index].selected = !selected;
      var total = 0;
      var msg = [];
      for (var i = 0; i < carts.length; i++){
        if (carts[i].selected==true){
            msg.push(carts[i].selected);
            if (msg.length == carts.length) {
              this.setData({
                selectAllStatus: true,
              });
            }else{
              this.setData({
                selectAllStatus: false,
              });
            }
        }
        for (var j = 0; j < carts[i].data.length;j++){
            console.log(carts[i].data[j].check)
        }
      }
      for (var i = 0; i < carts[index].data.length; i++){
          carts[index].data[i].check = !selected;
      }
      this.setData({
          carList: carts,
          totalPrice: total.toFixed(2),
      });
  },
  //所有选中
  selectAll:function(e){
      this.setData({
          selectAllStatus:!this.data.selectAllStatus
      }) 
      var cartlist = this.data.carList;
      var total = 0;
      for (var i = 0; i < cartlist.length;i++){
          cartlist[i].selected = this.data.selectAllStatus;
          for (var j = 0; j < cartlist[i].data.length; j++){
              cartlist[i].data[j].check = this.data.selectAllStatus;
              if (cartlist[i].data[j].check==true){
                  total += cartlist[i].data[j].goods_price * cartlist[i].data[j].total_num;
              }else{
                  total = 0;
              }
          }
      }
      this.setData({
          carList: cartlist,
          totalPrice:total.toFixed(2),
      });
  },
  viewmsg: function (e) {
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 1000
    })
  }

})