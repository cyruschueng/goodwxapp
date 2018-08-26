var page = 10;
var last = false;
var city = '全国';
var chengshi = '全国';
var zhiwei = '';
var cityinfo=[];
var sheng = [];
var app = getApp()
var index=0;
var res = wx.getSystemInfoSync()
var h3 = res.windowWidth - 80;
var s=0;
Page({
  data: {
    grids: [],
    diquxianshi: 'none',
    zhiweixianshi: 'block',
    height3:h3,
    multiIndex: [0, 0],
    info: [],
    zhiwei: '',
    remen: {},
    inputShowed: false,
    inputVal: "",
    scrollTop: 0,
    scrollHeight: 0,
    jiazai: 'none',
    remenyincang: 'none',
    region:[[],[]]
  },
  formsubmit2: function (e) {
    console.log(e.detail.formId);
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=moreFormId',
      data: {
        'openid': openid,
        'formId': e.detail.formId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
      }
    })
  },
  remen: function (e) {
    //  console.log('5555555555');
    var that = this;
    //  console.log(chengshi);
    var remenci = e.target.dataset.hi;
    zhiwei = remenci;
    that.setData({
      zhiwei: remenci,
      remenyincang: 'none'
    })

    that.formSubmit(e, chengshi, remenci)
  },
  xuanzhong: function (e) {
    var that = this;
    that.setData({
      remenyincang: 'block',
    })
  },
 
  xuanzhongcitys: function (e) {
    // console.log(e);
    var that = this;
    city = e.currentTarget.dataset.hi
    that.setData({
      city: e.currentTarget.dataset.hi,
      diquxianshi: 'none',
      zhiweixianshi: 'block'
    })
  },
  formSubmit: function (e, city, zhiwei) {
    var that = this;
    // console.log('点击啦点击了');
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    last = false;
    page = 10;



    wx.getSystemInfo({
      success: function (res) {
        // console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    // console.log(chengshi);
    that.getdata(that, chengshi, zhiwei);

  },
  getdata: function (that, city, zhiwei) {
    // console.log(page);
    var session_id = wx.getStorageSync('session_id')

    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=zhiweisearch2', //真实的接口地址
      data: {
        'page': page,
        'city': city,
        'zhiwei': zhiwei,
      },
      method: 'get',
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        console.log(res.data)
        // 设置数据

        // 多次循环

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

  onLoad: function () {
    
    var that = this;
    page = 10;
    last = false;
    that.getdata(that, chengshi, "", );
    //   取出地区
    // 加载数据
    wx.showToast({
      title: '加载中…',
      icon: 'loading',
      duration: 100000
    });
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=getArea2',
      data: {

      },
      success: function (e) {
        console.log(e.data);
        cityinfo=e.data.city;
        sheng=e.data.sheng
        that.setData({
          region: [sheng, cityinfo[0]]
        })
       
      }
    })
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
        // 设置数据
        that.setData({
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
  },
  onReachBottom: function () {
    var that = this;
    // console.log(city+'asd'+zhiwei);
    that.getdata(that, chengshi, zhiwei, true);
  },
  onShareAppMessage: function () {
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    console.log(openid);
    return {
      title: "专业餐饮领域求职招聘平台",
      desc: "",
      path: '/pages/zhiwei/zhiwei',
      success: function () {
        //转发成功获得金币
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=CheckShare',
          method: 'get',
          data: {
            'openid': openid
          },
          success: function (res) {
            if (res.data == 1) {
              wx.showModal({
                title: '提示',
                content: '每天只能分享领取一次，明天再来吧～～',
                showCancel: false,
              })
            } else {
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getJinbi',
                method: 'post',
                data: {
                  'openid': openid
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (e) {
                  wx.showModal({
                    title: '提示',
                    content: e.data,
                    showCancel: false,
                  })
                }
              })
            }
          }
        })
      }
    }
  },

  bindMultiPickerColumnChange: function (e) {
    var that=this;
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var c = e.detail.value;
    var d = e.detail.column;
   if(d==0){
      var arr=[c,0]
      index=c
   }else{
     var arr=[index,c]
   }
   if(c==0&&d==0){
     var areaarr = [sheng, cityinfo[0]]
   }else{
     var areaarr = [sheng, cityinfo[index]];
   }
   console.log(arr);
    that.setData({
      region: areaarr ,
      multiIndex:arr
    });
  },
  bindMultiPickerChange:function(e){
    var that=this;
    
    if (e.detail.value[0]==0){
       chengshi='全国';
    }else{
       chengshi = cityinfo[e.detail.value[0]][e.detail.value[1]];
    }
    console.log(chengshi);
    that.getdata(that, chengshi, zhiwei);
  },
  tiaozhuan(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../jobs/jobs?token='+id,
    })
    s=1;
  },
  onHide:function(){
   var that=this;
   if(s==1){
      s=0;
   }else{
     chengshi = '全国';
     zhiwei = '';
     page = 10;
     that.setData({
       zhiwei: '',
       multiIndex: [0, 0],
       region: [sheng, cityinfo[0]]
     })
     that.getdata(that, chengshi, zhiwei);
     s=0;
   }
    
  }
});