// page/verification/index/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deskNo: '',
    memberFlag: '',
    verifyList: '',
    checkboxNum: 0,
    sum: 0, //选中的总条数
    checked: [], //选中列表的索引值
    carts: [],
    total: null,//总金额
    lists: [],//分部金额
    dataIndex: null,
    //hide: false,
    foodName: "",//点击当前减号的时候，当前食物名字
    ordershopid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 

    this.setData({
      deskNo: options.deskNo,
      memberflag: options.memberflag,
      ordershopid: options.orderShopId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.listShow();

  },
  //页面渲染
  listShow() {
    app.commonAjax('/shop/manage/verifyBusiness/verifyDetail', ['shopId'], { orderShopId: this.data.ordershopid,deskNo: this.data.deskNo, flag: this.data.memberflag }, (res) => {
      var verifyList = res.data.data

      var checked = []

      verifyList.forEach((item, index) => {
        checked.push(index)
        var index1 = index
        item.orderMenuList.forEach((item, index) => {
          item.index = index1 + ',' + index
        })
      })

      this.setData({
        checkboxNum: checked.length,
        checked: checked,
        verifyList: verifyList,
        verifyListNum: verifyList.length,

      })
      this.sum()
      this.TotalMoney();
    }, app, 'post')
  },

  // 判断复选框
  checkboxChange: function (e) {
    this.setData({
      checkboxNum: e.detail.value.length,
      checked: e.detail.value
    });
    this.sum();
  },

  //计算总条数
  sum() {
    var newsum = 0;
    this.data.checked.forEach((item) => {

      this.data.verifyList[item].orderMenuList.forEach((item,index)=>{
        newsum += item.catNum
      })

      // newsum += this.data.verifyList[item].orderMenuList.length

    })
    this.setData({
      sum: newsum
    })
  },
  //点击加号事件
  bandAdd(e) {
    const index = e.currentTarget.dataset.index;
    var index1 = index.split(',')[0]
    var index2 = index.split(',')[1]
    var verifyList = this.data.verifyList;
    
    var clickmenu = verifyList[index1].orderMenuList[index2];
    var subdata = {};
    subdata.orderId = clickmenu.id//会员订单ID
    subdata.menuId = clickmenu.menuId//菜品ID
    subdata.memberId = clickmenu.memberId//会员ID
    if (clickmenu.menuSpecId) {
      subdata.menuSpecId = clickmenu.menuSpecId//规格ID(存在则传入接口)
    }
    if (clickmenu.flavour) {
      subdata.flavour = clickmenu.flavour//flavour-口味(存在则传入接口)
    }
    // ajax  加号
    app.commonAjax('/shop/manage/verifyBusiness/addMenuById', ['shopId'], subdata, (res) => {
      verifyList[index1].orderMenuList[index2].catNum++
      this.setData({
        verifyList: verifyList
      });
      this.TotalMoney();
      this.sum()
    }, app, 'post')
    

  },
  //点击减号事件
  bandMinus(e) {
    const index = e.currentTarget.dataset.index;
    var index1 = index.split(',')[0];
    var index2 = index.split(',')[1];
    var verifyList = this.data.verifyList;
    var clickmenu = verifyList[index1].orderMenuList[index2]
    var subdata = {}
    subdata.menuId = clickmenu.menuId//菜品ID
    subdata.orderId = clickmenu.id//会员订单ID

    if (clickmenu.menuSpecId) {
      subdata.menuSpecId = clickmenu.menuSpecId//规格ID(存在则传入接口)

    }
    if (clickmenu.flavour) {
      subdata.flavour = clickmenu.flavour//flavour-口味(存在则传入接口)
    }
    if (verifyList[index1].orderMenuList[index2].catNum == 1) {
      this.setData({
        //hide: true,
        foodName: verifyList[index1].orderMenuList[index2].menuName
      });
      wx.showModal({
        title: '温馨提示',
        cancelText: '否',
        confirmText: '是',
        content: '确定取消菜品（' + verifyList[index1].orderMenuList[index2].menuName + '）？',
        success: (res) => {
          if (res.confirm) {
            app.commonAjax('/shop/manage/verifyBusiness/cancelMenuById', ['shopId'], subdata, (res) => {
              var deleteOK = res.data.message
              this.setData({
                deleteOK: deleteOK
              });
              if (this.data.deleteOK == 'ok') {
                this.listShow();
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 1500
                })
              } else {
                wx.showToast({
                  title: '取消失败',
                  image: '/image/i/x.png',
                  duration: 1500
                })
              }
              this.setData({
                verifyList: verifyList
              });
              this.TotalMoney();
              this.sum()
            }, app, 'post')


          } else if (res.cancel) {
            
          }
        }
      })

    } else if (verifyList[index1].orderMenuList[index2].catNum <= 0) {
      return false;
    } else {
      app.commonAjax('/shop/manage/verifyBusiness/cancelMenuById', ['shopId'], subdata, (res) => {
        verifyList[index1].orderMenuList[index2].catNum--
        
        this.setData({
          verifyList: verifyList
        });
        this.TotalMoney();
        this.sum()
      }, app, 'post')
      
    }
    
  },
  //计算总金额
  TotalMoney() {
    var total = null //总金额
    var listtotal = null  //单个金额变量 
    var lists = []  //分部金额list数组
    for (var i = 0; i < this.data.verifyList.length; i++) {
      for (var j = 0; j < this.data.verifyList[i].orderMenuList.length; j++) {
        listtotal += this.data.verifyList[i].orderMenuList[j].catNum * this.data.verifyList[i].orderMenuList[j].price
      }
      listtotal = listtotal.toFixed(2)
      lists.push(listtotal)
      total += listtotal
      listtotal = null
    }
    this.setData({
      total: total,
      lists: lists
    })
  },
  // 不取消菜品
  cancel() {
    this.setData({
      hide: false
    })
  },
  // 下单事件
  orderIng() {
    var subdata = {}
    var orderIds = {};
    var deskId = {};
    var arrayNumber = this.data.checked;
    var orderIngList = this.data.verifyList;
    var suborderIds = [];
    if (this.data.checked.length != 0) {
      for (var i = 0; i < arrayNumber.length; i++) {
        for (var j = 0; j < orderIngList[i].orderMenuList.length; j++) {
          orderIds.orderIds = orderIngList[i].orderMenuList[j].id;
          deskId.deskId = orderIngList[i].orderMenuList[j].deskId;
        }
        suborderIds.push(orderIds.orderIds)
      }
      subdata.orderIds = suborderIds;
      subdata.deskId = deskId.deskId;
      app.commonAjax('/shop/manage/verifyBusiness/ordering', ['shopId'], subdata, (res) => {
        if (res.data.code == 0) {
          wx.redirectTo({
            url: '/page/verifymenu/index?deskTypeId=' + deskId.deskId + '&deskNo=' + this.data.deskNo
          })
        }else{
          wx.showToast({
            title: '下单失败',
            image: '/image/i/x.png',
            duration: 2000
          })
        }
      }, app, 'post')

    }else{
      wx.showToast({
        title: '请选择订单',
        image: '/image/i/x.png',
        duration: 2000
      })
    }
  }
})