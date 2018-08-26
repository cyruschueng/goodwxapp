var page =10;
var last = false;
var city = '全国';
var chengshi = '全国';
var zhiwei='';
var app = getApp()
Page({
    data: {
        grids: [],
        diquxianshi:'none',
        zhiweixianshi:'block',
        city:'全国',
        info:[],
        zhiwei:'',
        remen:{},
        inputShowed: false,
        inputVal: "",
        scrollTop : 0,
        scrollHeight:0,
        jiazai:'none',
        remenyincang:'none',
        
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
    remen:function(e){
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
    xuanzhong:function(e){
        var that = this;
        that.setData({
            remenyincang:'block',
        })
    },
    selectcitys:function(){
        var that = this;
        wx.redirectTo({
            url: '../citys/citys?token=1'
        })
        // that.setData({
        //     diquxianshi:'block',
        //     zhiweixianshi:'none'
        // })
    },
    xuanzhongcitys:function(e){
        // console.log(e);
        var that = this;
        city = e.currentTarget.dataset.hi
        that.setData({
            city:e.currentTarget.dataset.hi,
            diquxianshi:'none',
            zhiweixianshi:'block'
        })
    },
    formSubmit: function(e,city,zhiwei) {
        var that = this;
        // console.log('点击啦点击了');
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        last = false;
        page =10;
        
        
        
            wx.getSystemInfo({
            success:function(res){
                // console.info(res.windowHeight);
                that.setData({
                    scrollHeight:res.windowHeight
                });
            }
        });
        // console.log(chengshi);
        that.getdata(that,chengshi,zhiwei,false);

    },
    getdata:function(that,city,zhiwei,start){
    // console.log(page);
      var session_id = wx.getStorageSync('session_id')
     
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=zhiweisearch2', //真实的接口地址
          data: {
            'page':page,
            'city':city,
            'zhiwei':zhiwei,
          },
          method:'get',
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
            // console.log(res.data)
            // 设置数据
           
                // 多次循环
               
                that.setData({
                  info: res.data.info,
                  
                })
            
          page +=10;
          // 隐藏提示
          wx.hideToast()
          
          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })
   
  },

  onLoad:function(options){
    city='';
    zhiwei='';
      var token = options.token;
      chengshi = options.city;
      if(chengshi == ''){
        chengshi = "全国";
        city = "全国";
      }else{
           city = chengshi;
      }
      
      var that = this;
      page =10;
      last = false;
      that.getdata(that,chengshi,"",false);
    //   取出地区
    // 加载数据
      wx.showToast({
          title: '加载中…',
          icon: 'loading',
          duration:100000
      });
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweiremen', //真实的接口地址
          data: {
          },
          method:'get',
          header: {
              'content-type': 'application/json',
          },
          success: function(res) {
            // console.log(res.data)
            // 设置数据
            that.setData({
                remen:res.data.remen,
                city:chengshi,
            })

          
          // 隐藏提示
          wx.hideToast()
          // console.log(that.data.info)

          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })

     
  },
  onReachBottom: function () {
    var that = this;
    // console.log(city+'asd'+zhiwei);
    that.getdata(that, city, zhiwei, true);
  },
  onShareAppMessage: function () {},
});