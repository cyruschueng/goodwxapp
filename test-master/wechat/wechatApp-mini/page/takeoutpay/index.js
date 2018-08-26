var app = getApp()
Page({
  data: {
    headsculpture: '',//头像
    menu_Name: '',//当前菜的名称
    mark: '+',//加还是减号
    show_menu_Name: 0,//显示左下角添加菜动画
    menu: {}, //菜单分类
    menudata: {},//菜单数据
    activeCategoryId: '',// 当前选择栏目
    price: 0, //总价
    num: 0, //份数
    buymenu: {}, //本地购物车
    show: 0,//显示隐藏购物车
    maxImg: {},
    showMaxImg: 0,
    shopId: '',
    bizId: '',
    memberId: '',
    deskId: '',
    showAlert: 0,
    showData: {},
    menuspecjson: "",
    flavour: '',
    currentOrderId:'',
    flag:'',
    deskNo: '',
    OrderMember: false, // 是否存在验单人员
    CartList: '', // 已经提交到购物车列表
    ee: '' //当前点加的这个菜
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: false
    })

    var deskId = ''
    if (options.scene){
      deskId = options.scene
    } else if (options.deskId){
      deskId = options.deskId
    }


    this.setData({
      deskId: deskId,
      headsculpture: app.globalData.headsculpture,
      shopId: app.globalData.shopId
    })

    // if (!this.data.deskId) {
    //   wx.redirectTo({
    //     url: '/page/index/index',
    //   })
    // }


  },

  //获取手机号
  getuserphone() {
    this.setData({
      userphone: app.globalData.userphone ? app.globalData.userphone : ''
    })
  },

  // 获取memberId

  getmemberId() {
    console.log(app.globalData.memberId)
    this.setData({
      memberId: app.globalData.memberId
    })
  },

  //显示添加弹出框
  show_menu_name(mark, n) {
    this.setData({
      menu_Name: n,
      mark: mark,
      show_menu_Name: 1
    })
    setTimeout(() => {
      this.setData({
        show_menu_Name: 0
      })
    }, 1000)
  },

  //搜索菜品
  queryList(e) {
    this.getList(e.detail.value)
  },



  onShow: function (e) {

    this.setData({
      queryList:'',
      userphone: app.globalData.userphone ? app.globalData.userphone : '',
      memberId: app.globalData.memberId
    })

    wx.getStorage({
      key: this.data.shopId + this.data.deskId,
      success: (res) => {
        this.setData({
          buymenu: (res.data ? res.data : {})
        });
        this.sum()
      },
    })
    this.getList()

    if (this.data.memberId) {
      
    }

    

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

    if (data.menuspecjson) {
      menudata.menuspecjson = data.menuspecjson[data.active_menuspecjson];
      menudata.price = data.menuspecjson[data.active_menuspecjson].price;
    }


    console.log(menudata)

    this.show_menu_name('+', menudata.name)

    buymenu[menudata.id] = menudata


    this.setData({
      buymenu: buymenu,
      showAlert: 0
    })

    this.sum()
    this.save()

  },

  //添加
  add(e) {

    

    var menudata = e.currentTarget.dataset;

    console.log(menudata)

    var buymenu = this.data.buymenu

    // 菜已经存在
    if (buymenu[menudata.id]) {

      


      if (menudata.flavour || menudata.menuspecjson) { //有弹出窗的菜

        console.log('6666666')

        if (buymenu[menudata.id].num > 0) {
          this.show_menu_name('+', buymenu[menudata.id].name)
          buymenu[menudata.id].num++
        } else {
          var newshowData = {}

          newshowData.name = menudata.name;
          newshowData.unit = menudata.unit;
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

      } else if (menudata.isneedweigh) {  // 需要称重的菜


        //称重菜菜的份数超过一份
        if (buymenu[menudata.id].num > 0) {
          wx.showToast({
            title: '该菜只能点一份',
            image: '/image/i/x.png',
            duration: 2000
          })

        } else if (buymenu[menudata.id].num == 0) {
          this.show_menu_name('+', buymenu[menudata.id].name)
          buymenu[menudata.id].num++
        }

      } else {  // 正常的份数菜
        this.show_menu_name('+', buymenu[menudata.id].name)
        buymenu[menudata.id].num++
      }


      //第一次点菜
    } else {


      console.log('777777')

      //是弹窗类型的
      if (menudata.flavour || menudata.menuspecjson) {

        var newshowData = {}

        newshowData.name = menudata.name;
        newshowData.unit = menudata.unit;
        newshowData.price = menudata.price;
        
        if (menudata.flavour){
          newshowData.flavour = menudata.flavour.split(',');
        }else{
          newshowData.flavour=''
        }

        if (menudata.menuspecjson) {
          newshowData.menuspecjson = JSON.parse(menudata.menuspecjson);
        } else {
          newshowData.menuspecjson = ''
        }

        
        newshowData.id = menudata.id;
        
        

        newshowData.active_flavour = 0;
        newshowData.active_menuspecjson = 0;

        console.log(newshowData)

        this.setData({
          showData: newshowData,
          showAlert: 1
        })

      } else if (menudata.isneedweigh) {

        this.show_menu_name('+', menudata.name)

        menudata.num = 1
        menudata.isNeedWeigh = true
        buymenu[menudata.id] = menudata

      } else {

        this.show_menu_name('+', menudata.name)

        menudata.num = 1
        buymenu[menudata.id] = menudata
      }


    }

    this.setData({
      ee: menudata,
      buymenu: buymenu
    })


    this.save()


  },

  hidealert() {
    this.setData({
      showAlert: 0
    })
  },

  //减少
  minus(e) {
    var menudata = e.currentTarget.dataset;


    if (this.data.buymenu[menudata.id].num <= 0) {
      this.data.buymenu[menudata.id].num = 0
    } else {
      this.data.buymenu[menudata.id].num--
    }
    

    this.show_menu_name('-', this.data.buymenu[menudata.id].name)

    this.save()

  },



  //跳到已经点的菜
  tomore() {
    wx.navigateTo({
      url: "/page/takeoutpay/cart/submit/index?deskId=" + this.data.deskId
    })
    // wx.navigateTo({
    //   url: "/page/order/index?currentOrderId=" + this.data.currentOrderId + "&flag=" + this.data.flag + "&deskId=" + this.data.deskId
    // })
  },


  //获取菜品
  getList: function (query_value) {


    this.setData({
      memberId: app.globalData.memberId,
      headsculpture: app.globalData.headsculpture
    })

    var subdata = {};

    if (this.data.deskId) {
      subdata.deskId = this.data.deskId
    }


    if (query_value) {
      subdata.fuzzy = query_value
    }

    app.commonAjax('/miniapp/cat/menuInfo/getMenuInfo', ['shopId', 'bizId', 'memberId'], subdata, (res) => {

      // if (!res.data.data.catDesk){
      //   wx.showToast({
      //     title: '餐桌号无效！',
      //     image: '/image/i/x.png',
      //     duration: 2000,
      //     success:()=>{
      //       setTimeout(()=>{
      //         wx.redirectTo({
      //           url: '/page/index/index',
      //         })
      //       },1500)
      //     }
      //   })
      //   return
      // }

      this.setData({
        memberId: app.globalData.memberId,
        menu: res.data.data.menuTypeList,
        OrderMember: res.data.data.existNoVerifyOrderMember,
        // orderMemberId: res.data.catDesk.id,
        menudata: res.data.data.menuList
      });

      var title = '自助点餐'

      if (res.data.data.catDesk) {
        this.setData({
          deskNo: res.data.data.catDesk.deskNo,
          currentOrderId: res.data.data.catDesk.currentOrderId,
          flag: res.data.data.catDesk.flag,
          CartList: res.data.data.catDesk.shoppingCartList ? res.data.data.catDesk.shoppingCartList : ''
        });
        title = '桌号：' + res.data.data.catDesk.deskNo
      }

      wx.setNavigationBarTitle({
        title: title
      })

      if (res.data.data.menuTypeList.length > 0) {
        this.setData({
          activeCategoryId: res.data.data.menuTypeList[0].id,
          activeCategoryname: res.data.data.menuTypeList[0].name
        });
      }

      var newscList = {};

      this.save()

      wx.hideLoading()
    }, app.globalData, 'post')

  },

  //清空购物车
  clear() {
    this.setData({
      buymenu: [],
      show: 0
    });
    this.save()
  },


  //选好了
  settle () {
    console.log('6666666'+this.data.userphone)
    if (!this.data.userphone){
      wx.navigateTo({
        url: '/page/login/index',
      })
    }else{
      wx.navigateTo({
        url: './cart/index?shopId=' + this.data.shopId + '&deskId=' + this.data.deskId + '&deskNo=' + this.data.deskNo
      })
    }

    
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

  //计算总价和份数
  sum: function () {

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
  //scroll
  scroll(e){
    // console.log(e.detail.scrollTop)
  },

  //切换选项卡
  tabClick: function (e) {
    wx.createSelectorQuery().select('#menu_list').boundingClientRect(function (rect) {
      // console.log(rect)
    }).exec()
    this.setData({
      activeCategoryId: e.currentTarget.dataset.name,
      activeCategoryname: e.currentTarget.dataset.namea
    });
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