var app = getApp()
Page({
  data: {
    menu_Name: '',//当前菜的名称
    mark: '+',//加还是减号
    show_menu_Name: 0,//显示
    menu: {}, //菜单分类
    menudata: {},//菜单数据
    activeCategoryId: '',// 当前选择栏目
    price: 0, //总价
    num: 0, //份数
    buymenu:{}, //本地购物车
    show:0,//显示隐藏购物车
    scList: [], //远端加载购物车
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession: '',
    deskId:'',
    click_time: 0,
    settle_time:0,
    deskNo:''
  },
  tabClick: function (e) {
    this.setData({
      activeCategoryId: e.currentTarget.dataset.name
    });
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

  onShow: function () {

    console.log()

    var that = this;
    that.getList()
  },
  onLoad:function(option){
    if (option.deskNo){
      wx.setNavigationBarTitle({
        title: '桌号：' + option.deskNo
      })
    } else {
      wx.setNavigationBarTitle({
        title: '购物车'
      })
    }
    
    console.log(option)

    this.setData({
      headsculpture: app.globalData.headsculpture, 
      shopId: option.shopId,
      deskId: option.deskId,
      deskNo: option.deskNo
    })  

  },


  //添加

  add(e) {

    var that = this;
    var timeoutflag;
    if (this.data.click_time == 0) {
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


    var buymenu = this.data.buymenu
    // 菜已经存在
    if (buymenu[menudata.id]) {

      if (e.currentTarget.dataset.isneedweigh) {

        //菜的份数超过一份
        if (buymenu[menudata.id].num>0){
          wx.showToast({
            title: '该菜只能点一份',
            image: '/image/i/x.png',
            duration: 2000
          })
          
        } else if (buymenu[menudata.id].num == 0) {
          buymenu[menudata.id].num++
          this.show_menu_name('+', menudata.name)
        }

      } else {
        this.show_menu_name('+', menudata.name)
        buymenu[menudata.id].num++
      }


    } else {
      menudata.num = 1

      this.show_menu_name('+', menudata.name)
      buymenu[menudata.id] = menudata
    }



    this.setData({
      buymenu: buymenu
    })
    this.save()
    //this.sum()

  },


  minus(e) {
    var menudata = e.currentTarget.dataset;


    if (this.data.buymenu[menudata.id].num <= 0) {
      this.data.buymenu[menudata.id].num = 0
    } else {
      this.data.buymenu[menudata.id].num--
    }

    this.show_menu_name('-', this.data.buymenu[menudata.id].name)

    this.save()
    //this.sum()

  },

  //减少
  minus(e) {
    var menudata = e.currentTarget.dataset;

    if (this.data.buymenu[menudata.id].num <= 0) {
      this.data.buymenu[menudata.id].num = 0
    } else {
      this.data.buymenu[menudata.id].num--
    }

    this.show_menu_name('-', e.currentTarget.dataset.name)
    this.save()
    //this.sum()

  },

  //储存
  save() {
    this.setData({
      buymenu: this.data.buymenu
    })
    var key = this.data.shopId + this.data.deskId
    wx.setStorageSync(key, this.data.buymenu)

    this.sum()
  },





  //获取菜品

  getList: function () {
    
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


  //清空购物车

  clear(){

    wx.showModal({
      title: '提示',
      content: '确定清空购物车？',
      success: (res) => {
        if (res.confirm) {
          this.clear_b()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  clear_b() {

    this.setData({
      buymenu: {},
      show: 0
    });

    this.save()

    wx.navigateBack({
      delta: 1
    })

  },
  //返回上一页
  goBack: function () {

    this.save()

    wx.navigateBack({
      delta: 1
    })
  },
  //结算

  settle(e) {

    var that = this;
    var timeoutflag;
    if (this.data.settle_time == 0) {
      this.setData({
        settle_time: 1
      })
      this.settle_b(that, e.detail.formId)
      timeoutflag = setTimeout(() => {
        this.setData({
          settle_time: 0
        })
        clearTimeout(timeoutflag);
      }, 10000);
    }
  },


  settle_b(that, formId){

    var subdata = {};

    subdata.formId = formId;
    // subdata.username = this.data.username;

    var newbuymenu = [];

    wx.getStorage({
      key: this.data.shopId + this.data.deskId,
      success: (res) => {
        console.log()
        res.data
        for (var i in res.data) {

          if (res.data[i].num>0){
            var list = {}

            list.menuId = i;
            list.weight = res.data[i].num;
            list.flavour = res.data[i].flavour ? res.data[i].flavour : '';
            list.menuSpecId = res.data[i].menuspecjson ? res.data[i].menuspecjson.id : '';
            list.isNeedWeigh = res.data[i].isNeedWeigh ? 1 : 0;
            list.unit = res.data[i].unit;
            newbuymenu.push(list)
          }

        }
        if (this.data.deskId) {
          subdata.deskId = this.data.deskId
        } else {
          subdata.buffet = 1
        }
        
        subdata.menus = JSON.stringify(newbuymenu)

        console.log(subdata)

        app.commonAjax('/miniapp/cat/order/submit', ['appid','shopId', 'bizId','memberId'], subdata,  (res) => {

          if(res.data.code == 0){
            //清除本地购物车
            
            this.setData({
              buymenu: {}
            })
            var key = this.data.shopId + this.data.deskId
            wx.setStorageSync(key, this.data.buymenu)

            this.sum()

            if (res.data.data.conFlag == 0) {
              wx.redirectTo({
                url: "/page/neworderlist/index?orderMemberId=" + res.data.data.orderMember.id + '&orderList=' + 'true' + '&orderNo=' + res.data.data.orderMember.orderNo + '&deskId=' + this.data.deskId
              })
            } else {
              wx.redirectTo({
                url: "/page/takeoutpay/cart/submit/index?orderMemberId=" + res.data.data.orderMember.id + '&orderNo=' + res.data.data.orderMember.orderNo + '&deskId=' + this.data.deskId
              })
            }

            // wx.showToast({
            //   title: '下单成功',
            //   icon: 'success',
            //   duration: 2000,
            //   success: ()=>{
            //   }
            // })
          }

        },app.globalData,  'post')

      }
    })


  },


})