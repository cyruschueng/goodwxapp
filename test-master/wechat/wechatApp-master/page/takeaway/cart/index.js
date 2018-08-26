var app = getApp()
Page({
  data: {
    storeNane:'',
    menu: {}, //菜单分类
    menudata: {},//菜单数据
    activeCategoryId: '川菜',// 当前选择栏目
    price: 0, //总价
    num: 0, //份数
    buymenu:{}, //本地购物车
    show:0,//显示隐藏购物车
    scList: [], //远端加载购物车
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession:''
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.dataset.name
    });
  },

  onShow:function(){
    this.getList();
  },


  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '购物车'
    })

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


  changeshow:function(){
    this.setData({
      show: !(this.data.show)
    });
    
  },

 



  //添加
  add: function (e) {
    var dataset = e.currentTarget.dataset;
    var newbuymenu = this.data.buymenu;
    
    if (newbuymenu[dataset.id]){
      if (newbuymenu[dataset.id].num == 0){
        newbuymenu[dataset.id].num++
        this.cart(dataset.id, 0, dataset.price, dataset.name)
      }else{
        newbuymenu[dataset.id].num++
        this.cart(dataset.id, 1)
      }
      
    }else{
      newbuymenu[dataset.id] = dataset
      newbuymenu[dataset.id].num = 1
      this.cart(dataset.id, 0, dataset.price, dataset.name)
    }

    this.setData({
      buymenu: newbuymenu
    });

    this.sum()

  },

  //菜品添加/修改份数
  cart: function (meunId, aaa, price,name2){
    var newbuymenu = this.data.buymenu;
    if (aaa) {//改份数

      var subdata = { id: '', num: 0 };

      subdata.id = newbuymenu[meunId].id;
      subdata.num = newbuymenu[meunId].num;

      if (newbuymenu[meunId].num == 0 ){
        this.cartremove(meunId)
      }else{
        app.commonAjax('cat/cart/update', [], subdata, function (res) {

        }, app)

        
      }


      

    } else {//新加菜
      var subdata = { shopId: 6, memberId: 1, menuId: '', num: '', sourceType:1 };

      subdata.menuId = meunId;
      subdata.num = 1;
      var that = this;


      app.commonAjax('cat/cart/add', ['shopId','memberId'], subdata, function (res) {
        var newbuymenu = {};
        newbuymenu.id = res.data.data.id;
        newbuymenu.num = res.data.data.num;
        newbuymenu.menuId = res.data.data.menuId;
        newbuymenu.price = price;
        newbuymenu.menuName = name2;

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

    },app)
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
    var that = this;

    app.commonAjax('cat/takeout/index', ['shopId', 'memberId', 'bizId'], {}, function (res) {

      that.setData({
        menu: res.data.data.cmtList,
        menudata: res.data.data.cmList,
        scList: res.data.data.scList
      });

      var newscList = {};
      for (var i in res.data.data.scList) {
        newscList[res.data.data.scList[i].menuId] = res.data.data.scList[i]

      }
      that.setData({
        buymenu: newscList
      });

      that.sum()
      wx.hideLoading()
    }, app)


  },

  // getList: function () {
  //   var that = this;

  //   var pages = getCurrentPages();
  //   var prevPage = pages[pages.length - 2];
  //   console.log('页面66666')
  //   console.log(prevPage)

  //       that.setData({
  //         menu: prevPage.data.menu,
  //         menudata: prevPage.data.menudata,
  //         scList: prevPage.data.scList,
  //         buymenu: prevPage.data.buymenu,
  //         num: prevPage.data.num
  //       });

  //       that.sum()


  // },
  //
  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  //清空购物车
  clear:function(){

    var that = this;
    var subdata = {  sourceType: 1 };

    app.commonAjax('cat/cart/clear', ['memberId','shopId'], subdata, function (res) {
      that.setData({
        buymenu: []
      });

      wx.navigateBack({
        delta: 1
      })

      that.sum();

      that.setData({
        show: 0
      });
    }, app)

  },


  //结算
  settle: function(){

    var subdata = {  menuIds: [], nums: [] }
    var that = this;

    for (var i in this.data.buymenu) {
      if (this.data.buymenu[i].num > 0) {
        subdata.menuIds.push(this.data.buymenu[i].menuId);
        subdata.nums.push(this.data.buymenu[i].num);
      }
    }

    app.commonAjax('cat/orderFood/minisubmit', ['memberId', 'shopId'], subdata, function (res) {
      wx.navigateTo({
        url: '/page/takeaway/submit/index'
      })
    }, app)

  },


})