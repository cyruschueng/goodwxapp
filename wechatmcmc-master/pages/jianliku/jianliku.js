var page = 10;
var last = false;
var city;
var chengshi = '全国';
var zhiwei;
var app = getApp()
Page({
    data: {
        grids: [],
        diquxianshi:'none',
        zhiweixianshi:'block',
        city:'全国',
        info:[],
        remen:{},
        inputShowed: false,
        inputVal: "",
        scrollTop : 0,
        scrollHeight:0,
        jiazai:'none',
        remenyincang:'none'
    },
    selectcitys:function(){
       var that = this;
        wx.redirectTo({
            url: '../citys/citys?token=2'
        })
        // that.setData({
        //     diquxianshi:'block',
        //     zhiweixianshi:'none'
        // })
    },
    xuanzhongcitys:function(e){
        // console.log(e);
        var that = this;
        city = e.currentTarget.dataset.hi;
        that.setData({
            city:e.currentTarget.dataset.hi,
            diquxianshi:'none',
            zhiweixianshi:'block'
        })
    },
    xuanzhong:function(e){
        var that = this;
        that.setData({
            remenyincang:'block',
        })
    },
    formSubmit: function(e,city,zhiwei) {
        last = false;
        var that = this;
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        page = 10;
        // city = e.detail.value.city;
        // zhiwei = e.detail.value.zhiwei;
        
        wx.getSystemInfo({
            success:function(res){
                // console.info(res.windowHeight);
                that.setData({
                    scrollHeight:res.windowHeight
                });
            }
        });
        that.getdata(that,city,zhiwei,false);

    },
    getdata:function(that,city,zhiwei,start){
      
   
      // console.log(page);
      var session_id = wx.getStorageSync('session_id')
     
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Test&a=jianliku2', //真实的接口地址
          data: {
            'page':page,
            'city':city,
            'zhiwei':zhiwei,
          },
          method:'get',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
            // console.log(res.data)
        
                that.setData({
                  info: res.data.info,
                })
          page+=10;
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
  // bindDownLoad:function(){
  //   console.log("底部了");
  //   //   该方法绑定了页面滑动到底部的事件
  //  var that=this;
   
  //     that.getdata(that,city,zhiwei,true);
  // },
  scroll:function(event){
    var that = this;
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     that.setData({
        //scrollTop : event.detail.scrollTop,
         remenyincang: 'none',
     });
  },
  remen:function(e){
         // console.log(e);
        var that = this;
        //  console.log(chengshi);
        var remenci = e.target.dataset.hi;
        zhiwei = e.target.dataset.hi
        that.setData({
            zhiwei:remenci,
            remenyincang:'none'
        })
       
        that.formSubmit(e,chengshi,remenci)
    },
  onLoad:function(options){
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
        //   取出地区
        // 加载数据
      page = 10;
      last = false;
      that.getdata(that,chengshi,"",false);

      wx.showToast({
          title: '加载中…',
          icon: 'loading',
          duration: 10000
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
            //   默认取出数据
            // 设置数据
            that.setData({
                // grids:res.data.info,
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
    

      wx.getSystemInfo({
          success:function(res){
              // console.info(res.windowHeight);
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
  },
  onReachBottom: function () {
    var that = this;

     that.getdata(that,city,zhiwei,true);
  },
});