// pages/z_test/z_test.js
var urlarr = [];
var city;
var status=0;
var start = [];
var token;
var leibie;
var arrr = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    width:0,
    height:0,
    logo: [],
    box:0,
    shengtype:[],
    shengIndex: 0,
    shitype: [],
    shiIndex: 0,
    qutype: [],
    quIndex: 0,
    isAgree:true,
    Type: ['餐饮设计', '食材调料', '餐厨用品','酒水饮品'],
    TypeIndex:0,
  },
  bindtypeChange:function(e){
    var id=e.detail.value
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkNum',
      data: {
        'openid': openid,
        'token': id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
        
          if (e.data.num >= e.data.max) {
            wx.showModal({
              title: '提示',
              content: '本服务类别最多只能发布' + e.data.max + '条',
              showCancel: false
            })
            
            that.setData({
              TypeIndex: leibie
            })
          } else {
            leibie = id;
            that.setData({
              TypeIndex: id
            })
          }
        

      }
    })
    
  },
  upload: function () {
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    var llen=start.length;
    if (arrr == 0) {
      for (var i = 0; i < llen; i++) {
        if (start[i] != "") {
          arrr += 1;
        }
      }
    }
    
    if (arrr<9){
      
      var num = 9 - arrr;
    console.log(num);
      wx.chooseImage({
        count: num,
        success: function (res) {
          var imgarr = res.tempFilePaths;
          var len = imgarr.length;
          var arr = [];
          for (var i = 0; i < len; i++) {

            wx.uploadFile({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Upload&a=qiyeuploadimg',
              filePath: imgarr[i],
              name: 'cherry',
              method: 'post',
              header: {
                'content-type': 'multipart/form-data',
                'Cookie': 'PHPSESSID=' + session_id + '; path=/'
              },
              success: function (e) {
                var urllen = urlarr.length
                var imgdata = JSON.parse(e.data);
                var s = "https://www.mcmchw.com/Public/qiye/" + imgdata.cherry.savepath + imgdata.cherry.savename
                urlarr[urllen] = s;
                var len3 = start.length;
                start[len3] = s;

                var len2 = start.length;
                // num = 10 - len2;
                var width = (len2 + 1) * 64 + (len2 + 2) * 10
                that.setData({
                  width: width,
                  logo: start,
                })

              }
            })

          }
        },
      })
    }else{
      wx.showToast({
        title: '最多只能上传9张图片',
        image:'/images/waring.png',
        duration: 2000
      })
    }
    
  },
  close:function(e){
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
     var that=this;
      var id = e.currentTarget.dataset.id;
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Upload&a=qiyedele',
        data:{
          img: start[id],
          openid:openid,
          id:token,
        },
        success: function (res){
          start[id]="";
          var len=start.length;
          var num=0
          for(var i=0;i<len;i++){
            if(start[i]!=""){
                num+=1;
            }
          }
          arrr-=1;
          var width = (num + 1) * 64 + (num + 2) * 10
          that.setData({
             width: width,
            logo: start,
          })
        }
      })
  },
 
  
  bindshengChange: function (e) {
    var that = this;
    // console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      shengIndex: e.detail.value
    })
    if (e.detail.value == 0) {
      that.setData({
        shitype: ['请选择'],
        shiIndex: 0,
        qutype: ['请选择'],
        quIndex: 0,
      })
    } else {
      // console.log('城市的序号'.city);
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shi', //真实的接口地址
        data: {
          'sheng': that.data.shengtype[e.detail.value],
          'city': 1
        },
        method: 'get',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          // console.log(res.data)
          // 设置区的值
          that.setData({
            shitype: res.data.shi,
            shiIndex: 1,
            qutype: res.data.qu,
            quIndex: 1,
          })
        },
        // 接口调用失败
        fail: function () {

        },
        complete: function () {
        }
      })
    }
  
  },
  bindshiChange: function (e) {
    var that = this;
    // console.log('picker account 发生选择改变，携带值为', e.detail.value);
    this.setData({
      shiIndex: e.detail.value
    })
    if (e.detail.value == 0) {
      that.setData({

        shiIndex: 0,
        qutype: ['请选择'],
        quIndex: 0,
      })
    } else {
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=qu', //真实的接口地址
        data: {
          'qu': that.data.shitype[e.detail.value],
        },
        method: 'get',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          // console.log(res.data)
          // 设置区的值
          that.setData({
            qutype: res.data.qu
          })
        },
        // 接口调用失败
        fail: function () {

        },
        complete: function () {
        }
      })
    }
   

  },
  bindquChange: function (e) {
    var that = this;
    // console.log('picker account 发生选择改变，携带值为', e.detail.value);
    that.setData({
      quIndex: e.detail.value
    })

  },
  onLoad: function (e) {
     var that=this;
   
     var session_id = wx.getStorageSync('session_id');
     var openid = wx.getStorageSync('wxopenid');
     urlarr=[];
    token=e.token;
    leibie=e.leibie;
     var res=wx.getSystemInfoSync();
     
   that.setData({
     height: res.windowHeight * 0.6,
     width:res.windowWidth,
     TypeIndex:leibie
   })
     wx.request({
       url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shop',
       data:{
          'openid':openid,
          'token':token,
       },
       method:'get',
       header: {
         'content-type': 'multipart/x-www-form-urlencoded',
         'Cookie': 'PHPSESSID=' + session_id + '; path=/'
       },
       success:function(res){
        
         for (var i = 0; i < 10; i++) {
           if (res.data.logo[i]){
             start[i] = res.data.logo[i];
             
              }
         }
         var len2 = start.length;
         var width = (len2 + 1) * 64 + (len2 + 2) * 10
        
         if(start==""){
           var res2 = wx.getSystemInfoSync();
            var box=(res2.windowWidth-64)/2
            that.setData({
              box:box
            })
         }
         city = res.data.shiindex;
         console.log(res.data);
        that.setData({
          logo: start,
          // Type:res.data.leibie,
          width:width,
          info:res.data,
          shengtype: res.data.sheng,
          shengIndex: res.data.shengindex,
          shitype: res.data.shi,
          shiIndex: res.data.shiindex,
          qutype: res.data.qu,
          quIndex: res.data.quindex,
        })
       }
     })  
  },
  formSubmit: function (e) {
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    console.log(e);
    var that=this;
    if (e.detail.value.title == '' || e.detail.value.lianxiren == '' || e.detail.value.phone == '' || e.detail.value.shi == 0 || e.detail.value.qu == 0) {
      wx.showModal({
        title: '提醒',
        content: '请填写完整信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            
          }
        }
      })
      return -1;
    }
    if(e.detail.value.title.length>30){
      wx.showToast({
        title: '服务名称最多30个字',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
    var num = /^[0-9]*$/
    if (!(num.test(e.detail.value.phone))) {
      wx.showToast({
        title: '电话必须是数字',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
    if (e.detail.value.phone.length != 11) {
      wx.showToast({
        title: '手机号最多11位',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
    
    var changdu=start.length;
    var strs="";
    for(var i=0;i<changdu;i++){
        if(start[i]!=""){
          strs=strs+start[i]+','
        }
    }
    strs = strs.substring(0, strs.length - 1)
    if(strs==""){
      wx.showToast({
        title: '请至少上传一张图片',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
    
    wx.showToast({
      title: '发布成功',
      icon: 'info',
      duration: 2000
    })
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=saveShop',
        method:'post',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        data:{
          'id':token,
          'logo':strs,
          'title': e.detail.value.title,
          
          'province': that.data.shengtype[e.detail.value.sheng],
          'city': that.data.shitype[e.detail.value.shi],
          'area': that.data.qutype[e.detail.value.qu],
          'address': e.detail.value.jiedao,
          'contacts': e.detail.value.lianxiren,
          'phone': e.detail.value.phone,
          'content': e.detail.value.jieshao,
          'openid': openid,
          'liebie':leibie,
          
        },
        success:function(e){
          console.log(e);
            urlarr=[];
            wx.navigateBack({
              delta:1
            })
          
        }
      })
    
  },
  preview:function(e){
    var url = e.currentTarget.dataset.img;
    var len=start.length;
    var imgarr=[];
    for(var i=0;i<len;i++){
        if(start[i]!=""){
          imgarr[i]=start[i];
        }
    }
    wx.previewImage({
      current: url,
      urls: imgarr,
    })
  },
 
  
  onUnload: function () {
    start = [];
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    // var url=JSON.stringify(urlarr);
    var len = urlarr.length;
    if (urlarr != "") {
      for (var i = 0; i < len; i++) {
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Upload&a=fordele',
          method: 'GET',
          data: {
            'img': urlarr[i],
          },
          header: {
            'content-type': 'application/json',
            'Cookie': 'PHPSESSID=' + session_id + '; path=/'
          },
          success: function (e) {
            
          }
        })
      }
    }
   
  },

 

})