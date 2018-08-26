var Interval;
var app = getApp();
Page({
  data: {
    Top: 0, //
    speed: 24, //滚动速度
    time: 2000, // 间隔时间
    ViewHeight: 40, //盒子高度
    selected1: false,
    modal:'show',
    location: '请选择所在院校',
    NoticeList:[],
    index_item: [
      {
        'img': '/images/index/takeaway.png',
        'text': '美食外卖',
        'url': '/pages/takeaway/takeaway'
      },

      {
        'img': '/images/index/drinking.png',
        'text': '甜点饮品',
        'url': '/pages/drinking/drinking'
      },

      {
        'img': '/images/index/fruit.png',
        'text': '生鲜水果',
        'url': '/pages/fruit/fruit'
      },

      {
        'img': '/images/index/snack.png',
        'text': '生活服务',
        'url': '/pages/snack/snack'
      },

    

      {
        'img': '/images/index/expressDelivery.png',
        'text': '代取快递',
        'url': '/pages/menu/expressDelivery/expressDelivery'
      },
      {
        'img': '/images/index/expect.png',
        'text': '每日签到',
      }
    ],
    title: '请选择所在院校',
    school: 0,
    zcid: 0,
    kdid: 0,
    zcid1: 0,
    zcid2: 0,
    kdid1: 0,
    kdid2: 0,
    slider: [],
    array: ['无'],
    arrayid:['0'],
    index: 0,
    dopen: false,
    shopList:[],
    url: app.globalData.IP,
    loading:0,
    car:[],
    loads:false
  },
  navToSearch:function(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  storeMenu: function (e) {
    var status = this.data.shopList[e.currentTarget.dataset.in].status
    if (status == 'off') {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id + '&rt=1',
      })

    } else {
      wx.navigateTo({
        url: '/pages/menu/item/storeMenu/storeMenu?id=' + e.currentTarget.id,
      })
    }


  }, 
  gotoTopic: function(e){
    var index = e.currentTarget.dataset.index;
    var item = this.data.NoticeList[index];
    wx.showModal({
      title: '提示',
      content: item.title,
      cancelText: item.cancelbtn,
      confirmText: item.surebtn,
      success:function(res){
        if(res.confirm){
          wx.navigateTo({
            url: item.page,
          })
        }
      }
    })
  },
  carload: function(e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.car;
    list[index] = 1;
    this.setData({car:list});
  },
  closeTot: function(){
    this.setData({dopen:false})
  },
  onShareAppMessage: function () {
    return {
      title: '蜗居校园生活，你的校园生活！',
      path: '/pages/index/index?pid='+app.globalData.ID,
    }
  },
  load:function(){
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    var that = this
    if (app.globalData.sid == 0){
      this.setData({loading:0})
    }else{
      this.setData({ loading: 1})
    }
    wx.request({
      url: app.globalData.IP + "wx/ggw.do",
      data: {
        id: wx.getStorageSync("school")
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        that.data.slider = [];
        that.data.slider.push(app.globalData.IP + "controller/" + res.data.m1);
        that.data.slider.push(app.globalData.IP + "controller/" + res.data.m2);
        that.data.slider.push(app.globalData.IP + "controller/" + res.data.m3);
        var list = [];
        for (var i = 0; i < that.data.slider.length; i++) {
          list[i] = 0
        }
        that.setData({
          car: list,
          slider: that.data.slider
        })
      },
    })
    that.setData({shopList:[]});
    wx.request({
      url: app.globalData.IP + 'wx/findshoptj.do?sid=' + app.globalData.sid,
      success: function(res){
        wx.hideLoading();
        for(var i=0;i<res.data.length;i++){
          res.data[i].code = false;
        }
        
        for(var i=0;i<res.data.length;i++){
          res.data[i].sales = 0;
          for (var j = 0; j < res.data[i].myclasses.length;j++){
            for(var k=0;k<res.data[i].myclasses[j].ps.length;k++){
              res.data[i].sales += res.data[i].myclasses[j].ps[k].sales
            }
          }
        }
        var tempDiscount = 1;
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].myclasses.length;j++){
            for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
              if (res.data[i].myclasses[j].ps[k].discount < tempDiscount){
                
                tempDiscount = res.data[i].myclasses[j].ps[k].discount;
                
              }
            }
          }
          res.data[i].minDiscount = (tempDiscount * 10 + '').substring(0, (tempDiscount * 10 + '').indexOf('.')+2);
          tempDiscount = 1
        }

       
        that.setData({shopList:res.data,loading:2})
      }
    })
    wx.request({
      url: app.globalData.IP + 'wx/allmessage.do',
      data:{
        sid: app.globalData.sid
      },
      success: function(res){
        wx.stopPullDownRefresh();
        if (res.data.length > 0){
          that.setData({ NoticeList: res.data });
        }
        
        
        if(res.data.length > 0){
          that.setData({ dopen: true })
        }else{
          that.setData({ dopen: false })
        }
      }
    })
  },
  wxload: function () {
    var that = this;
    if (wx.getStorageSync('school')) {
      var sid = wx.getStorageSync('school');
      app.globalData.sid = sid;
      that.getzk();
    };
    app.getWindow(this)
    app.login(that.data.pid, function () {
    })
    wx.request({
      url: app.globalData.IP + "wx/slistajax.do",
      success: function (res) {
        var l = [];
        var a = [];
        var temp = 0
        for (var i = 0; i < res.data.length; i++) {
          l.push(res.data[i].name)
          a.push(res.data[i].id)
          if (res.data[i].id == wx.getStorageSync("school")){
            temp = i;
          }
        }
        that.setData({
          array: l,
          arrayid: a,
        })
        
          that.setData({
            index: temp
          })

      }, fail: function () {
        wx.showModal({
          title: '抱歉',
          content: '服务器被外星人攻击了，给您造成不便请谅解',
          confirmText: '朕知道了',
          confirmColor: '#06c1ae',
          showCancel: false
        })
      }
    })
    this.load();
    // setTimeout(function () {
    //   app.run("进入首页界面");
    //   if (!wx.getStorageSync('school')) {
    //     wx.getLocation({
    //       type: 'wgs84',
    //       success: function (res) {
    //         wx.request({
    //           url: app.globalData.IP + "wx/getlocation.do",
    //           data: {
    //             latitude: res.latitude,
    //             longitude: res.longitude,
    //             userid: wx.getStorageSync("id"),
    //           },
    //           method: 'GET',
    //           success: function (res) {
    //             if (!wx.getStorageSync("school") && res.data.name) {
    //               var index = that.data.array.indexOf(res.data.name);
    //               if (index != -1) {
    //                 that.setData({
    //                   index: index
    //                 })
    //                 app.globalData.sid = that.data.arrayid[index];
    //                 wx.setStorageSync("school", that.data.arrayid[index]);
    //                 wx.setStorageSync("schoolname", res.data.name);
    //                 that.getzk();
    //                 //that.load();
    //               } else {
    //                 that.setData({
    //                   index: 0
    //                 })
    //               }


    //             }
    //           },
    //         })
    //       }
    //     })
    //   }
    // }, 1000);
  },
  onLoad: function (options) {
    wx.setStorageSync('ho', '0')
    var pid= 0;
    var that = this
    if(options.pid){
      pid = options.pid
    }
    this.setData({
      pid: pid
    })
    if (wx.getStorageSync("ho") == '0'){
      if (!wx.getStorageSync("id") || !wx.getStorageSync("school")) {
        
        wx.navigateTo({
          url: '/pages/welcome/welcome?pid=' + that.data.pid,
        })
      } else {

        this.wxload();
      }
    }
    
  },
  loadImg: function(e){
    var index = e.currentTarget.dataset.index;
    var list = this.data.shopList;
    list[index].code = true;
    this.setData({shopList:list})
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
    // 页面显示
    wx.getStorage({
      key: 'wxSearch',
      success: function (res) {
        if (typeof (res.data) != "undefined")
          that.setData({
            location: res.data,
          })
      },
    });
    if(that.data.loads){
      this.wxload();
      this.setData({
        loads:false
      })
    }
    if (wx.getStorageSync("ho") == '1'){
      if (!wx.getStorageSync("id") || !wx.getStorageSync("school")) {
        wx.navigateTo({
          url: '/pages/welcome/welcome?pid=' + that.data.pid,
        })
      }
    }
    
    that.setData({ shopList: [] ,loading:0});
    wx.request({
      url: app.globalData.IP + 'wx/findshoptj.do?sid=' + app.globalData.sid,
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].code = false;
        }

        for (var i = 0; i < res.data.length; i++) {
          res.data[i].sales = 0;
          for (var j = 0; j < res.data[i].myclasses.length; j++) {
            for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
              res.data[i].sales += res.data[i].myclasses[j].ps[k].sales
            }
          }
        }
        var tempDiscount = 1;
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < res.data[i].myclasses.length; j++) {
            for (var k = 0; k < res.data[i].myclasses[j].ps.length; k++) {
              if (res.data[i].myclasses[j].ps[k].discount < tempDiscount) {

                tempDiscount = res.data[i].myclasses[j].ps[k].discount;

              }
            }
          }
          res.data[i].minDiscount = (tempDiscount * 10 + '').substring(0, (tempDiscount * 10 + '').indexOf('.') + 2);
          tempDiscount = 1
        }


        that.setData({ shopList: res.data, loading: 2 })
      }
    })
    
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getzk: function () {
    var that=this;
    wx.request({
      url: app.globalData.IP + "wx/findzk.do",
      data: { id: app.globalData.sid },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        that.setData({
          zcid: res.data.zcyd,
          kdid: res.data.kddq
        })
      },
    })
  },
  chooseSchool: function (e) {
    var that = this;
    if (app.globalData.sid != that.data.arrayid[e.detail.value])
    {
      
      this.setData({
        index: e.detail.value
      })
      app.globalData.sid = that.data.arrayid[e.detail.value]
      wx.setStorageSync('school', that.data.arrayid[e.detail.value])
      wx.setStorageSync('schoolname', that.data.array[e.detail.value])
      wx.setStorageSync('index', e.detail.value)
      that.getzk();
      that.load()
    }
  },


  //点击item进行跳转
  item: function (e) {
    var that = this;
    if (wx.getStorageSync("school")) {
      var that = this;
      var ThisIndex = e.currentTarget.id;
      if (e.currentTarget.id < 4) {
        wx.navigateTo({
          url: '/pages/menu/item/item?ThisIndex=' + ThisIndex
        })
      } 
      else if (e.currentTarget.id == 4) {
        wx.navigateTo({
          url: '/pages/menu/expressDelivery/expressDelivery?id=' + that.data.kdid,
        })
      }
      else if (e.currentTarget.id == 5) {
        wx.request({
          url: app.globalData.IP+'wx/sign.do',
          data: { id: app.globalData.ID, sid: app.globalData.sid},
          success:function(res){
             wx.showModal({
               title: '提示',
               content: res.data,
               showCancel:false,
               confirmText:'朕知道了'
             })
          }
        })
      }
    } else {
      wx.showModal({
        title: '操作失败',
        content: "您还未选择所在院校，请点击选择",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }

  },
  EndMerro: function () {
    var that = this;
    clearInterval(Interval)
    if (that.data.Top % that.data.ViewHeight != 0) {
      Interval = setInterval(function () {
        that.data.Top += 1;
        that.setData({
          Top: that.data.Top
        });
        if (that.data.Top % that.data.ViewHeight == 0) {
          clearInterval(Interval)
        }
      }, that.data.speed);
    }
  },
  StarMerro: function () {
    var that = this;
    clearInterval(Interval);
    setTimeout(function () {
      that.Merro();
    }, that.data.time);
  },
  // Merro: function () {
  //   clearInterval(Interval);
  //   var that = this;
  //   Interval = setInterval(function () {
  //     that.data.Top += 1;
  //     that.setData({
  //       Top: that.data.Top
  //     });
  //     if (that.data.Top % that.data.ViewHeight == 0) {
  //       clearInterval(Interval);
  //       setTimeout(function () {
  //         that.Merro();
  //       }, that.data.time);
  //     }
  //     if (that.data.Top >= (that.data.NoticeList.length) * that.data.ViewHeight) {
  //       that.data.Top = 0;
  //     }
  //   }, that.data.speed);
  // },

})