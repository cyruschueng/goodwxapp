var page = 10;
var last = false;
var city;
var chengshi = '';
var zhiwei;
var cityinfo = [];
var sheng = [];
var app = getApp()
var index = 0;
var s=0;
Page({
  data: {
   
    diquxianshi: 'none',
    zhiweixianshi: 'block',
    city: '全国',
    info: [],
    remen: {},
    inputShowed: false,
    inputVal: "",
    scrollTop: 0,
    scrollHeight: 0,
    jiazai: 'none',
    remenyincang: 'none',
    multiIndex: [0, 0],
    region:[[],[]]
  },

  // xuanzhongcitys: function (e) {
  //   // console.log(e);
  //   var that = this;
  //   city = e.currentTarget.dataset.hi;
  //   that.setData({
  //     city: e.currentTarget.dataset.hi,
  //     diquxianshi: 'none',
  //     zhiweixianshi: 'block'
  //   })
  // },
  xuanzhong: function (e) {
    var that = this;
    that.setData({
      remenyincang: 'block',
    })
  },
  formSubmit: function (e, city, zhiwei) {
    last = false;
    var that = this;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    page = 10;
    // city = e.detail.value.city;
    // zhiwei = e.detail.value.zhiwei;

    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.getdata(that, city, zhiwei, false);

  },
  getdata: function (that, city, zhiwei, start) {


    // console.log(page);
    var session_id = wx.getStorageSync('session_id')

    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=jianliku2', //真实的接口地址
      data: {
        'page': page,
        'city': city,
        'zhiwei': zhiwei,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        // console.log(res.data)

        that.setData({
          info: res.data.info,
        })
        page += 10;
        // 隐藏提示
        wx.hideToast()
      },
      // 接口调用失败
      fail: function () {
      },
      complete: function () {
      }
    })

  },
  // bindDownLoad:function(){
  //   console.log("底部了");
  //   //   该方法绑定了页面滑动到底部的事件
  //  var that=this;

  //     that.getdata(that,city,zhiwei,true);
  // },
  scroll: function (event) {
    var that = this;
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    that.setData({
      //scrollTop : event.detail.scrollTop,
      remenyincang: 'none',
    });
  },
  remen: function (e) {
    // console.log(e);
    var that = this;
    //  console.log(chengshi);
    var remenci = e.target.dataset.hi;
    zhiwei = e.target.dataset.hi
    that.setData({
      zhiwei: remenci,
      remenyincang: 'none'
    })

    that.formSubmit(e, chengshi, remenci)
  },
  onLoad: function (options) {
    var that = this;
    chengshi = '全国'
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkzhiwei',
      data: {
        openid: openid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {

        if (e.data == 1) {
          zhiwei = '';
        
          //   取出地区
          // 加载数据
          page = 10;
          last = false;
          that.getdata(that, chengshi, "", false);

          wx.showToast({
            title: '加载中…',
            icon: 'loading',
            duration: 10000
          });
          wx.request({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=getArea2',
            data: {

            },
            success: function (e) {
              console.log(e.data);
              cityinfo = e.data.city;
              sheng = e.data.sheng
              that.setData({
                region: [sheng, cityinfo[0]]
              })

            }
          })
          // 获取数据
          wx.request({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweiremen', //真实的接口地址
            data: {
            },
            method: 'get',
            header: {
              'content-type': 'application/json',
            },
            success: function (res) {
              // console.log(res.data)
              //   默认取出数据
              // 设置数据
              that.setData({
                // grids:res.data.info,
                remen: res.data.remen,
                city: chengshi,
              })
              // 隐藏提示
              wx.hideToast()
              // console.log(that.data.info)

            },
            // 接口调用失败
            fail: function () {

            },
            complete: function () {
            }
          })


          wx.getSystemInfo({
            success: function (res) {
              // console.info(res.windowHeight);
              that.setData({
                scrollHeight: res.windowHeight
              });
            }
          });
        } else {
          wx.switchTab({
            url: '../index/index'
          })
          wx.showModal({
            title: '提示',
            content: '发布招聘职位后方可查看',
            showCancel: false
          })
         
        }

      }
    })
    
    
  },
  onReachBottom: function () {
    var that = this;

    that.getdata(that, chengshi, zhiwei, true);
  },
  onShow:function(){
    var that=this
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkzhiwei',
      data: {
        openid: openid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {

        if (e.data == 1) {
          // zhiwei = '';

          // //   取出地区
          // // 加载数据
          // page = 10;
          // last = false;
          // that.getdata(that, chengshi, "", false);

          // wx.showToast({
          //   title: '加载中…',
          //   icon: 'loading',
          //   duration: 10000
          // });
          // wx.request({
          //   url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=getArea2',
          //   data: {

          //   },
          //   success: function (e) {
          //     console.log(e.data);
          //     cityinfo = e.data.city;
          //     sheng = e.data.sheng
          //     that.setData({
          //       region: [sheng, cityinfo[0]]
          //     })

          //   }
          // })
          // // 获取数据
          // wx.request({
          //   url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweiremen', //真实的接口地址
          //   data: {
          //   },
          //   method: 'get',
          //   header: {
          //     'content-type': 'application/json',
          //   },
          //   success: function (res) {
          //     // console.log(res.data)
          //     //   默认取出数据
          //     // 设置数据
          //     that.setData({
          //       // grids:res.data.info,
          //       remen: res.data.remen,
          //       city: chengshi,
          //     })
          //     // 隐藏提示
          //     wx.hideToast()
          //     // console.log(that.data.info)

          //   },
          //   // 接口调用失败
          //   fail: function () {

          //   },
          //   complete: function () {
          //   }
          // })


         
        } else {
          wx.switchTab({
            url: '../index/index'
          })
          wx.showModal({
            title: '提示',
            content: '发布招聘职位后方可查看',
            showCancel: false,
            
          })
        
          
        }

      }
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var c = e.detail.value;
    var d = e.detail.column;
    if (d == 0) {
      var arr = [c, 0]
      index = c
    } else {
      var arr = [index, c]
    }
    if (c == 0 && d == 0) {
      var areaarr = [sheng, cityinfo[0]]
    } else {
      var areaarr = [sheng, cityinfo[index]];
    }
    console.log(arr);
    that.setData({
      region: areaarr,
      multiIndex: arr
    });
  },
  bindMultiPickerChange: function (e) {
    var that = this;

    if (e.detail.value[0] == 0) {
      chengshi = '全国';
    } else {
      chengshi = cityinfo[e.detail.value[0]][e.detail.value[1]];
    }
    console.log(chengshi);
    that.getdata(that, chengshi, zhiwei);
  },
  tiaozhuan:function(e){
    // console.log(e);
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../getjianlizhengbiao/getjianlizhengbiao?token='+id,
    })
    s=1;
  },
  onHide: function () {
    var that = this;
   if(s==1){
    s=0;
   }else{
     chengshi = '全国';
     zhiwei = '';
     page = 10
     that.setData({
       zhiwei: '',
       multiIndex: [0, 0],
       region: [sheng, cityinfo[0]]
     })
    that.getdata(that, chengshi, zhiwei);
    s=0;
   }
  },
 
});