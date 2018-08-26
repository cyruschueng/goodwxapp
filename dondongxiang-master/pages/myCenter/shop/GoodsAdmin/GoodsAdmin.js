// pages/myCenter/shop/GoodsAdmin/GoodsAdmin.js
var app = getApp();
var pageshow = 1;
var pusharr = [];
Page({
  data: {
    currentTab: 0,
    currentindex: 0,
    shop_id:0,
    prolist:[],
    sellingnumber:0,//出售中数量
    soldoutlist:[],
    footmsgtext:true,
    soldmsgtext:true,
    psgecof:1,
    sellsum:0,
  },
  onLoad: function (options) {
    this.setData({
      shop_id: options.shop_id
    })
    this.getprolist(1);//出售中列表
    this.getdelpro(1);//下架列表
    pageshow = 1;
    pusharr = [];
    this.setData({
      psgecof: 1,
    })
  },
  //下啦刷新
  onPullDownRefresh:function(){
    pageshow=1;
    pusharr=[];
    this.setData({
      psgecof: 1,
    })
    this.getprolist(1,true);
    this.getdelpro(1,true);
  },
  //上拉加载
  onReachBottom:function(){
    pageshow++;
    this.setData({
      psgecof: pageshow,
    })
    this.getprolist(this.data.psgecof);
  },
  changeType:function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.current,
      currentindex: e.currentTarget.dataset.current
    })
  },
  showmobilemsg:function (msg, data,url) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定' + msg + '此商品?',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: url,
            method: "post",
            data: data,
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.errcode == 0) {
                _this.viewmsg(msg + "成功!");
                setTimeout(function () {
                  pageshow = 1;
                  pusharr = [];
                  _this.setData({
                    psgecof: 1,
                  })
                  _this.getprolist(1);
                  _this.getdelpro(1);
                }, 800)
              } else {
                _this.viewmsg(msg + "失败!");
              }
            }
          })
        }
      }
    })
  },
  //获取出售中商品
  getprolist:function(page,msg){
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/goodsmanager/shopGoodsList',
      data: {
          shop_id: _this.data.shop_id,
          up_status:1,
          page: page
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          console.log(res);
          if (res.data.errcode==0){
              var data = res.data.data.arr;
              _this.setData({
                  sellsum: res.data.data.pager.total_num
              })
              if (data.length == 0) {
                _this.setData({
                  footmsgtext: false
                })
              }
              if (msg == true){
                setTimeout(function () {
                    _this.viewmsg("刷新成功");
                    wx.stopPullDownRefresh();
                }, 1000)
              }
              for (var i = 0; i < data.length; i++) {
                pusharr.push(data[i]);
                _this.setData({
                  prolist: pusharr,
                  footmsgtext: true,
                })
              }
          }else{
              _this.viewmsg("网络有问题")
          }
          _this.setData({
            sellingnumber: res.data.data.pager.total_num,
          })
      }
    })
  },
  //获取下架商品
  getdelpro: function (page,msg){
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/goodsmanager/shopGoodsList',
      data: {
        shop_id: _this.data.shop_id,
        up_status: 0,
        page: page,
        size:100,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        if (res.data.errcode == 0) {
            _this.setData({
                soldoutlist: res.data.data.arr,
            })
            if (msg == true) {
              setTimeout(function () {
                _this.viewmsg("刷新成功");
                wx.stopPullDownRefresh();
              }, 1000)
            }
            if (res.data.data.pager.total_num==0){
              _this.setData({
                soldmsgtext: false
              })
            } else if (res.data.data.pager.total_num>0){
              _this.setData({
                soldmsgtext: true
              })
            }
        } else {
          _this.viewmsg("网络有问题")
        }
      }
    })
  },
  viewmsg: function (e) {
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 2000
    })
  },
  //下架商品
  goodsxj:function(e){
      var url = app.globalData.url+'/shop/goodsmanager/changeUpStatus';
      var data = {
          goods_id: e.currentTarget.dataset.goodsid,
          shop_id: this.data.shop_id,
          up_status: 0
      }
      this.showmobilemsg("下架", data, url);
  },
  //上架商品
  goodputaway:function(e){
      var url = app.globalData.url+'/shop/goodsmanager/changeUpStatus';
      var data = {
        goods_id: e.currentTarget.dataset.goodsid,
        shop_id: this.data.shop_id,
        up_status: 1
      }
      this.showmobilemsg("上架", data, url)
  },
  //编辑商品
  goodsedit: function (e) {
    wx.navigateTo({
      url: "/pages/myCenter/shop/publish/publish?goodsid=" + e.currentTarget.dataset.goodsid + "&shop_id=" + this.data.shop_id
    })
  },
  //删除商品
  goodsdel: function (e) {
      var data = {
          goods_id: e.currentTarget.dataset.goodsid,
          shop_id: this.data.shop_id
      }
      var url = app.globalData.url+'/shop/goodsmanager/delGoods';
      this.showmobilemsg("删除",data,url);
  }
})