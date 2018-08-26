var app = getApp()
Page({
  data: {
    headsculpture: '',
    menu_Name: '',//当前菜的名称
    mark:'+',//加还是减号
    show_menu_Name:0,//显示
    username: '',
    menu: {}, //菜单分类
    menudata: {},//菜单数据
    activeCategoryId: '',// 当前选择栏目
    price: 0, //总价
    num: 0, //份数
    buymenu: {}, //本地购物车
    show: 0,//显示隐藏购物车
    scList: [], //远端加载购物车
    maxImg: {},
    showMaxImg: 0,
    shopId: '',
    bizId: '',
    memberId: '',
    thirdSession: '',
    deskId: '',
    showAlert: 0,
    showData: {},
    menuspecjson: "",
    flavour: '',
    deskNo:'',
    click_time:0,
    ee: '' //当前点加的这个菜
  },

  onLoad: function (options) {
    
    wx.setNavigationBarTitle({
      title: '桌号：' + options.deskNo
    })

    this.setData({
      deskId: options.deskId,
      deskNo: options.deskNo
    })

    wx.showLoading({
      title: '加载中',
    })

    this.setData({
      headsculpture: app.globalData.headsculpture,      
      shopId: app.globalData.shopId
    })

    


  },

  //显示添加弹出框
  show_menu_name(mark,n){
    this.setData({
      menu_Name:n,
      mark:mark,
      show_menu_Name:1
    })
    setTimeout(()=>{
      this.setData({
        show_menu_Name: 0
      })
    },1000)
  },

  //搜索菜品
  queryList(e) {
    this.getList(e.detail.value)
  },



  onShow: function () {

    this.getList()

    this.setData({
      queryList:''
    })


    wx.getStorage({
      key: this.data.shopId + this.data.deskId,
      success: (res) => {
        this.setData({
          buymenu: (res.data ? res.data : {}),
          username: app.globalData.username
        });
        this.sum()
      },
    })




  },


  changeshow: function () {
    this.setData({
      show: !(this.data.show)
    });

  },


  //隐藏弹窗
  hideImg: function () {
    this.setData({
      showMaxImg: 0,
      menuspecjson: '',
      flavour: ''
    });
  },

  //改口味
  change_menuspecjson(e) {
    var newshowData = this.data.showData;
    newshowData.active_menuspecjson = e.currentTarget.dataset.index;
    this.setData({
      showData: newshowData
    })
  },
  change_flavour(e) {
    var newshowData = this.data.showData;
    newshowData.active_flavour = e.currentTarget.dataset.index;
    this.setData({
      showData: newshowData
    })
  },

  //弹窗添加
  add_alert(e) {
    var data = this.data.showData
    var menudata = this.data.ee;
    

    var buymenu = this.data.buymenu

    menudata.num = 1

    if (data.flavour) {
      menudata.flavour = data.flavour[data.active_flavour];
      menudata.price = data.price;
    }

    if (data.menuspecjson){
      menudata.menuspecjson = data.menuspecjson[data.active_menuspecjson];
      menudata.price = data.menuspecjson[data.active_menuspecjson].price;
    }
    
    
    this.show_menu_name('+',menudata.name)
    
    buymenu[menudata.id] = menudata


    this.setData({
      buymenu: buymenu,
      showAlert: 0
    })

    this.sum()
    // this.save()

  },

  //添加

  add(e){

    

    var that = this;
    var timeoutflag;
    if (this.data.click_time == 0){
      this.setData({
        click_time: 1
      })
      this.add_b(e, that)
      timeoutflag = setTimeout(() => {
        this.setData({
          click_time: 0
        })
        clearTimeout(timeoutflag);
      }, 100);
    }
  },

  add_b(e) {

    var menudata = e.currentTarget.dataset;

    //保存当前点+ 的菜
    this.setData({
      ee: menudata
    })


    var buymenu = this.data.buymenu

    // 菜已经存在
    if (buymenu[menudata.id]) {


      if (menudata.flavour || menudata.menuspecjson) {

        if (buymenu[menudata.id].num > 0) {
          this.show_menu_name('+',buymenu[menudata.id].name)
          buymenu[menudata.id].num++
        } else {
          var newshowData = {}

          newshowData.name = menudata.name;
          newshowData.price = menudata.price;

          
          newshowData.id = menudata.id;


          if (menudata.flavour) {
            newshowData.flavour = menudata.flavour.split(',');
          } else {
            newshowData.flavour = ''
          }

          if (menudata.menuspecjson) {
            newshowData.menuspecjson = JSON.parse(menudata.menuspecjson);
          } else {
            newshowData.menuspecjson = ''
          }

          newshowData.active_flavour = 0;
          newshowData.active_menuspecjson = 0;

          this.setData({
            showData: newshowData,
            showAlert: 1
          })
        }

      } else if (menudata.isneedweigh) {


        //称重菜菜的份数超过一份
        if (buymenu[menudata.id].num > 0) {
          wx.showToast({
            title: '该菜只能点一份',
            image: '/image/i/x.png',
            duration: 2000
          })

        } else if (buymenu[menudata.id].num == 0) {
          this.show_menu_name('+',buymenu[menudata.id].name)
          buymenu[menudata.id].num++
        }

      } else {
        this.show_menu_name('+',buymenu[menudata.id].name)
        buymenu[menudata.id].num++
      }


      //第一次点菜
    } else {

      //是弹窗类型的
      if (menudata.flavour || menudata.menuspecjson) {
        var newshowData = {}

        newshowData.name = menudata.name;
        newshowData.price = menudata.price;


        if (menudata.flavour) {
          newshowData.flavour = menudata.flavour.split(',');
        } else {
          newshowData.flavour = ''
        }

        if (menudata.menuspecjson) {
          newshowData.menuspecjson = JSON.parse(menudata.menuspecjson);
        } else {
          newshowData.menuspecjson = ''
        }


        newshowData.id = menudata.id;

        newshowData.active_flavour = 0;
        newshowData.active_menuspecjson = 0;



        this.setData({
          showData: newshowData,
          showAlert: 1
        })

      } else if (menudata.isneedweigh) {

        this.show_menu_name('+',menudata.name)

        menudata.num = 1
        menudata.isNeedWeigh = true
        buymenu[menudata.id] = menudata

      } else {

        this.show_menu_name('+',menudata.name)

        menudata.num = 1
        buymenu[menudata.id] = menudata
      }


    }

    
    // this.save()
    this.sum()


  },

  hidealert() {
    this.setData({
      showAlert: 0
    })
  },

  //减少
  minus(e) {
    var menudata = e.currentTarget.dataset;
    

    if (this.data.buymenu[menudata.id].num <= 0){
      this.data.buymenu[menudata.id].num =0
    }else{
      this.data.buymenu[menudata.id].num--
    }

    this.show_menu_name('-', this.data.buymenu[menudata.id].name)

    // this.save()
    this.sum()

  },

  //储存数据
  save() {
    this.setData({
      buymenu: this.data.buymenu
    })
    var key = this.data.shopId + this.data.deskId
    wx.setStorageSync(key, this.data.buymenu)

    this.sum()
  },




  //获取菜品
  getList: function (query_value) {
    var that = this;
    var subdata = {};

    if (query_value) {
      subdata.fuzzy = query_value
    }

    app.commonAjax('/shop/manage/menu/index', ['shopId', 'bizId'], subdata, function (res) {

      that.setData({
        menu: res.data.data.menuTypeList,
        menudata: res.data.data.menuList
      });

      if (res.data.data.menuList.length>0){
        that.setData({
          activeCategoryId: res.data.data.menuTypeList[0].id,
          activeCategoryName: res.data.data.menuTypeList[0].name
        });
      }

      var newscList = {};
      // for (var i in res.data.data.scList) {
      //   newscList[res.data.data.scList[i].menuId] = res.data.data.scList[i]

      // }

      // newscList = wx.getStorageSync('buymenu')




      // that.save()

      that.sum()
      wx.hideLoading()
    }, app, 'get')


  },

  //清空购物车
  clear() {

    this.setData({
      buymenu: [],
      show: 0
    });

    this.save()

  },

  //提交
  settle2222() {

    var subdata = {};

    subdata.deskId = this.data.deskId;
    subdata.username = this.data.username;

    var newbuymenu = [];

    wx.getStorage({
      key: this.data.shopId + this.data.deskId,
      success: (res) => {
        res.data
        for (var i in res.data) {
          var list = {}

          list.menuId = i;
          list.num = res.data[i].num;
          list.flavour = res.data[i].flavour ? res.data[i].flavour : '';
          list.menuSpec = res.data[i].menuspecjson ? res.data[i].menuspecjson.id : '';
          list.isNeedWeigh = res.data[i].isNeedWeigh ? res.data[i].isNeedWeigh : false;

          newbuymenu.push(list)
        }
        subdata.menuInfo = JSON.stringify(newbuymenu)

        app.commonAjax('/shop/manage/menu/submit', ['shopId', 'bizId'], subdata, function (res) {

        }, app, 'post')

      }
    })

  },

  //选好了
  settle: function () {

    this.save()

    wx.navigateTo({
      url: './cart/index?shopId=' + this.data.shopId + '&deskId=' + this.data.deskId + '&deskNo=' + this.data.deskNo
    })
  },

  //计算总价和份数
  sum: function () {


    this.setData({
      buymenu: this.data.buymenu
    })


    var newbuymenu = this.data.buymenu;
    var allprice = 0, allnum = 0;

    for (var i in newbuymenu) {

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


  //切换选项卡
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.dataset.name,
      activeCategoryName: e.currentTarget.dataset.namea
    });

    // wx.pageScrollTo({
    //   scrollTop: 0
    // })

  },


  //菜悬浮
  imgbox666: function (e) {
    this.setData({
      showMaxImg: 1
    });
    var imgdata = {};
    if (this.data.buymenu[e.currentTarget.dataset.id]) {
      var data = this.data.buymenu[e.currentTarget.dataset.id];
      data.menuId = e.currentTarget.dataset.id;
      this.setData({
        maxImg: data
      });

    } else {
      for (var i in this.data.menudata) {
        if (this.data.menudata[i].id == e.currentTarget.dataset.id) {
          var data = {}
          data.id = this.data.menudata[i].id
          data.menuId = this.data.menudata[i].id
          data.menuName = this.data.menudata[i].name
          data.menuPicture = this.data.menudata[i].picture
          data.num = 0
          data.price = this.data.menudata[i].price
          this.setData({
            maxImg: data
          });
        }
      }
    }
  },


})