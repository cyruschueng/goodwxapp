var monkey=0;
var youhuimon = 0;
var youhuima;
var jianlinumpay;
var jine;
var yhid;
var payid;
var app = getApp()
var res = wx.getSystemInfoSync();
var line = res.windowHeight * 0.8 * 0.15;
var line2 = res.windowHeight * 0.7 * 0.15 * 0.7;
Page({
    data: {
        showTopTips: false,
        jianlishu:0,
        items: [],
        isAgree: false,
        youhuitext:'none',
        youhuistatus:0,
        youhuimon:null,
        zhifumon:null,
        display:"none",
        num:0,
        youhuiinfo:[],
        choose:false,
        lent:0,
        
        display2:'none',
        line: line,
        line2: line2,
    },
    formsubmit: function (e) {
      console.log(e.detail.formId);
      var session_id = wx.getStorageSync('session_id');
      var openid = wx.getStorageSync('wxopenid');
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
    block: function () {
      this.setData({
        display2: 'block',
      })
    },
    close: function () {
      this.setData({
        display2: 'none',
      })
    },
    xianshi:function(){
      if(this.data.num==0){
        this.setData({
          display: "none"
        })
      }else{
        if (this.data.display == "block") {
          this.setData({
            display: "none"
          })
        } else {
          this.setData({
            display: "block"
          })
        }
      }
     
    },
   
  
    onLoad:function(options){
        var that = this;
        app.getUserInfo(function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo
          })
        })
        var session_id = wx.getStorageSync('session_id');
        var openid = wx.getStorageSync('wxopenid');
       
        // 加载数据
        wx.showToast({
            title: '加载中…',
            icon: 'loading',
            duration: 10000,
           
        });
        // 获取数据
        
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=pay', //真实的接口地址
            data: {
              'openid':openid
            },
            method:'get',
               header: {
                'content-type': 'application/json',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
             // 设置数据
               
                var len = res.data.info.length;
                var money = res.data.info[len - 1].value;
                monkey = res.data.info[len - 1].value;
                jine = res.data.info[len - 1].value;
                jianlinumpay = res.data.info[len - 1].num;
                if (res.data.jianlishu==null){
                  res.data.jianlishu=0
                }
                 that.setData({
                   lent: len-1,
                    items: res.data.info,
                    jianlishu:res.data.jianlishu,
                });
                // 隐藏提示
                wx.hideToast()
             
          
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=dyyh',
                data: {
                  openid: openid,
                  monkey: money,
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (res) {
                  // console.log(res);
                  if (res.data.youhui == null) {
                    that.setData({
                      
                      num: 0,
                      display: "none"
                    });
                  } else {
                    that.setData({
                     
                      num: res.data.youhui.length,
                      youhuiinfo: res.data.youhui
                    });
                  }

                }
              })
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
    },
    radioChange: function(e) {
        // console.log('radio发生change事件，携带value值为：', e)
        var that = this
        var tempval = e.detail.value;
        var strs = new Array(); //定义一数组 
        strs = tempval.split("-"); //字符分割 
        monkey = strs[0];
        jianlinumpay = strs[1];
        jine = strs[0];
        var items = this.data.items;
        for (var i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value == e.detail.value
        }
        that.setData({
          youhuitext: 'none',
          youhuistatus: 0,
          choose: false,
          zhifumon: null,
        })
        
        var session_id = wx.getStorageSync('session_id')
        var openid = wx.getStorageSync('wxopenid')
       
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=dyyh',
          data:{
            openid:openid,
            monkey:monkey,
          },
          method:'post',
          header:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + session_id + '; path=/'
          },
          success:function(res){
            if(res.data.youhui==null){
              that.setData({
                items: items,
                num:0,            
                display: "none"
              }); 
            }else{
              that.setData({
                items: items,
                num: res.data.youhui.length,
                youhuiinfo: res.data.youhui
              }); 
            }
            
          }
        })
    },
    //选择优惠券之后
    shiyong:function(e){
      // console.log(e);
      var tempval = e.detail.value;
      var strs = new Array(); //定义一数组 
      strs = tempval.split("-"); //字符分割 
      yhid= strs[1];
      var qian=strs[0];
      var zhifumon = monkey - parseInt(qian);
      jine = monkey - parseInt(qian);
      this.setData({
        youhuitext: 'block',
        youhuistatus: 1,
        zhifumon: zhifumon,
        youhuimon: qian,
       
      });
    },
    payaction:function(){
        var that = this;
        
        var session_id = wx.getStorageSync('session_id')
        var openid = wx.getStorageSync('wxopenid')
        // 加载数据
        wx.showToast({
            title: '加载中…',
            icon: 'loading',
            duration: 10000
        });
        // var zhifumon = monkey - parseInt(youhuimon)
        // if(zhifumon<0){
        //         zhifumon = 0
        //     }
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=payAction', //真实的接口地址
            data: {
                monkey:jine,
                qian: monkey,
                jianlinumpay:jianlinumpay,
                openid:openid
            },
            method:'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                // 隐藏提示
                wx.hideToast()
                // 调用微信支付
                var token = res.data.order_id;
                //获取prepay_id用来发送那个模板消息
                payid=res.data.payid;
                wx.requestPayment({
                    'appId':res.data.appid,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'paySign': res.data.paySign,
                    'signType': res.data.signType,
                    'timeStamp': res.data.timeStamp,
                    'success':function(res){
                     
                      // console.log(payid)
                        var session_id = wx.getStorageSync('session_id')
                        var openid = wx.getStorageSync('wxopenid')
                        // 支付成功，跳转
                        wx.request({
                          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=paysuccess',
                          data:{
                              'token':token,
                              'openid':openid,
                              'yhid':yhid,
                              'payid':payid,

                          },
                          method:'post',
                          header: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                          },
                          success: function (e) {
                            // console.log(e)
                            wx.redirectTo({
                              url: '../pay/pay'
                            })
                          }
                        })
                       
                        
                    },
                    'fail':function(res){
                        // console.log(res)
                    }
                })

            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
    }
});