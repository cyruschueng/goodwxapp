var app = getApp()
Page({
  data: {
    storeNane:'零距餐厅龙华总店',
    menu: {}, //菜单分类
    menudata: {},//菜单数据
    activeCategoryId: '香锅',// 当前选择栏目
    price: 0, //总价
    num: 0, //份数
    buymenu:{}, //本地购物车
    show:0,//显示隐藏购物车
    memberId:0, //
    scList: [], //远端加载购物车
    maxImg: { },
    showMaxImg:0,

  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.dataset.name
    });
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '外卖'
    })
    wx.showLoading({
      title: '加载中',
    })
  },
  onShow:function(){
    

    var that = this;
    that.getList()



  },


  changeshow:function(){
    this.setData({
      show: !(this.data.show)
    });
    
  },

  //菜悬浮
  imgbox:function(e){
    this.setData({
      showMaxImg: 1
    });
    var imgdata={};
    if (this.data.buymenu[e.currentTarget.dataset.id]){
      var data = this.data.buymenu[e.currentTarget.dataset.id];
      data.menuId = e.currentTarget.dataset.id;
      this.setData({
        maxImg: data
      });

    }else{
      for (var i in this.data.menudata){
        if (this.data.menudata[i].id == e.currentTarget.dataset.id){
          var data = {}
          data.id = this.data.menudata[i].id
          data.menuId = this.data.menudata[i].id
          data.menuName = this.data.menudata[i].name
          data.menuPicture = this.data.menudata[i].picture
          data.num = 0
          data.price = this.data.menudata[i].price
          console.log(data)
          this.setData({
            maxImg: data
          });
        }
      }
    }
  },

  //隐藏弹窗
  hideImg:function(){
    this.setData({
      showMaxImg: 0
    });
  },

  //添加
  add: function (e) {
    var dataset = e.currentTarget.dataset;
    var newbuymenu = this.data.buymenu;
    
    if (newbuymenu[dataset.id]){
      if (newbuymenu[dataset.id].num == 0){
        newbuymenu[dataset.id].num++
        this.cart(dataset.id, 0, dataset.price, dataset.name, dataset.menupicture)
      }else{
        newbuymenu[dataset.id].num++
        this.cart(dataset.id, 1)
      }
      
    }else{
      newbuymenu[dataset.id] = dataset
      newbuymenu[dataset.id].num = 1
      this.cart(dataset.id, 0, dataset.price, dataset.name, dataset.menupicture)
    }

    //console.log(newbuymenu)    

    this.setData({
      buymenu: newbuymenu
    });

    this.sum()

  },

  //菜品添加/修改份数
  cart: function (meunId, aaa, price, name2, menuPicture){
    var newbuymenu = this.data.buymenu;
    if (aaa) {//改份数

      var subdata = { id: '', num: 0 };

      subdata.id = newbuymenu[meunId].id;
      subdata.num = newbuymenu[meunId].num;
      if (newbuymenu[meunId].num == 0 ){
        this.cartremove(meunId)
      }else{

        console.log(subdata)

        app.commonAjax('cat/cart/update', [], subdata, function (res) {

        },app)

        
      }

    } else {//新加菜
      var subdata = {  menuId: 'menuId', num: 'num', sourceType: 1 };
      
      subdata.menuId = meunId;
      subdata.num = 1;
      var that = this;

      app.commonAjax('cat/cart/add', ['memberId','shopId'], subdata, function (res) {
        var newbuymenu = {};
        newbuymenu.id = res.data.data.id;
        newbuymenu.num = res.data.data.num;
        newbuymenu.menuId = res.data.data.menuId;
        newbuymenu.price = price;
        newbuymenu.menuName = name2;
        newbuymenu.menuPicture = menuPicture;

        that.data.buymenu[res.data.data.menuId] = newbuymenu;

        that.setData({
          buymenu: that.data.buymenu
        });
      }, app)

    }
    this.sum()
  },

  //移除菜品 
  cartremove: function (meunId){
    var subdata = {};

    subdata.id = this.data.buymenu[meunId].id;

    app.commonAjax('cat/cart/remove', [], subdata, function (res) {

    }, app)

  },

  //减少
  minus: function (e) {

    var dataset = e.currentTarget.dataset;
    var newbuymenu = this.data.buymenu;
    newbuymenu[dataset.id].num--

    this.setData({
      buymenu: newbuymenu
    });
    this.cart(dataset.id, 1)
    this.sum()
  },

  //计算总价和份数
  sum: function(){

    var newbuymenu = this.data.buymenu;
    var allprice =0, allnum=0;

    for (var i in newbuymenu){
      allprice += (newbuymenu[i].price * newbuymenu[i].num);
      allnum += newbuymenu[i].num
    }
    allprice = allprice.toFixed(2)
    this.setData({
      price: allprice,
      num: allnum
    });
    if (this.data.num == 0) {
      this.setData({
        show: 0
      });
    }
  },

  //获取菜品
  getList: function () {
    var subdata = {  };
    
    var that = this;

    app.commonAjax('cat/takeout/index', ['shopId', 'memberId', 'bizId'], {}, function (res) {
      that.setData({
        menu: res.data.data.cmtList,
        menudata: res.data.data.cmList,
        scList: res.data.data.scList,
        activeCategoryId: res.data.data.cmtList[0].name
      });

      var newscList = {};
      for (var i in res.data.data.scList) {
        newscList[res.data.data.scList[i].menuId] = res.data.data.scList[i]

      }
      that.setData({
        buymenu: newscList
      });

      console.log(that.data.buymenu)
      that.sum()
      wx.hideLoading()
    },app)



  },

  //清空购物车
  clear:function(){

    var that = this;
    var subdata = { sourceType: 1 };

    app.commonAjax('cat/cart/clear', ['shopId', 'memberId'], subdata, function (res) {
      that.setData({
        buymenu: []
      });

      that.sum();

      that.setData({
        show: 0
      });

    }, app)

  },


  //结算
  settle: function(){

    wx.navigateTo({
      url: './cart/index'
    })
  },


})