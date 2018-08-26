//获取应用实例
var logo_old='';
var token='';
var app = getApp()
Page({
    data: {
        showTopTips: false,
        logo: wx.getStorageSync('logo'),
        isAgree: true,
        xingbietype:{},
        xingbieIndex:0,
        jingyantype:{},
        jingyanIndex:0,
        zhiweitype:{},
        zhiweiIndex:0,
        shengtype:{},
        shengIndex:0,
        shitype:{},
        shiIndex:0,
        qutype:{},
        quIndex:0,
        user_name:'',
        user_xingbie:'',
        user_jingyan:'',
        user_zhiwei:'',
        user_zuidixinzi:'',
        user_zuigaoxinzi:'',
        user_sheng:'',
        user_shi:'',
        user_qu:'',
        user_phone:'',
        user_miaoshu:'',
        bron:'',
        truebron:'出生年月'
    },
    uplogo: function () {
      var that = this;
      // console.log('久图' + logo_old);
      var session_id = wx.getStorageSync('session_id')
      wx.chooseImage({
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          // console.log(tempFilePaths[0]);

          wx.uploadFile({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=uploadImage&logo_old=' + logo_old + '&token=' + token + "&lei=1",
            filePath: tempFilePaths[0],
            header: {
              'content-type': 'multipart/form-data',
              'Cookie': 'PHPSESSID=' + session_id + '; path=/'
            },
            name: 'file',
            formData: {

            },
            success: function (res) {
              var data = res.data;//七牛会返回一个包含hash值和key的JSON字符串
              var data = JSON.parse(data);
              // console.log(data);
              that.setData({
                logo: "https://www.mcmchw.com/Public/" + data.file.savepath + data.file.savename
              })
            },
            fail: function (res) {
              // console.log(res)
            }
          })
        }
      })
    },
    //腾讯云对象存储
    // uplogo:function(){
    //     var that = this;
       
    //     var session_id = wx.getStorageSync('session_id')
    //     wx.chooseImage({
    //     success: function(res) {
    //         var tempFilePaths = res.tempFilePaths
           
        
    //         wx.uploadFile({
    //           url: 'https://www.mcmchw.com/index.php?m=Home&c=Upload&a=useruploadimg',
    //         filePath: tempFilePaths[0],
    //         header:{
    //                 'content-type':'multipart/form-data',
    //                 'Cookie':'PHPSESSID='+session_id+'; path=/'
    //             },
    //         name: 'file',
    //         formData:{
    //          url:tempFilePaths[0],
    //          token:token,
    //          lei:1
    //         },
    //         method:'post',
    //         success: function(res){
    //           var s = JSON.parse(res.data)
              
    //             that.setData({
    //               logo:s
    //           })
    //         },
    //         fail:function (res) {
    //             console.log(res)
    //         }
    //         })
    //     }
    //     })
    // },
    //改变出生年月
    bindbronChange: function (e) {
      // console.log('picker account 发生选择改变，携带值为', e.detail.value);
      this.setData({
       
        truebron: e.detail.value
      })
    },
    bindxingbieChange: function(e) {
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            xingbieIndex: e.detail.value
        })
    },
    bindjingyanChange: function(e) {
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            jingyanIndex: e.detail.value
        })
    },
    bindzhiweiChange: function(e) {
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            zhiweiIndex: e.detail.value
        })
    },
    bindshengChange: function(e) {
        var that = this;
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        that.setData({
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
          // 获取数据
          wx.request({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shi', //真实的接口地址
            data: {
              'sheng': that.data.shengtype[e.detail.value],
            },
            method: 'get',
            header: {
              'content-type': 'application/json',
            },
            success: function (res) {
              // console.log(res.data)
              // 设置区的值
              that.setData({
                shitype: res.data.shi
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
    bindshiChange: function(e) {
        var that = this;
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        that.setData({
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
              'qu': that.data.shengtype[e.detail.value],
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
    bindquChange: function(e) {
        var that = this;
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        that.setData({
            quIndex: e.detail.value
        })
        
    },
    formSubmit: function(e) {
        var that = this;
        var num = /^[0-9]*$/
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
        // 提交表单数据
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(e.detail.value.logo=='' || e.detail.value.name =='' || e.detail.value.phone ==''){
            wx.showModal({
                title: '发布简历',
                content: '请填写完整信息',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                    // console.log('用户点击确定')
                    }
                }
                })
            return -1;
        }
        if (e.detail.value.zuidixinzi == '') {
          wx.showToast({
            title: '最低薪资不能为空',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        
        if (e.detail.value.zuigaoxinzi == '') {
          wx.showToast({
            title: '最高薪资不能为空',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        if (!(num.test(e.detail.value.zuigaoxinzi)) || !(num.test(e.detail.value.zuidixinzi)) ) {
          wx.showToast({
            title: '薪资必须是数字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        // 提交数据
        
        if (!(num.test(e.detail.value.phone))) {
          wx.showToast({
            title: '电话必须是数字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        if(e.detail.value.phone.length != 11){
            wx.showToast({
            title: '手机号最多11位',
            icon: 'info',
                duration: 2000
            })
            return -1;
        }
        // 加载数据
        wx.showToast({
            title: '提交中……',
            icon: 'loading',
            duration: 1000
        });
        var session_id = wx.getStorageSync('session_id')
        var openid=wx.getStorageSync('wxopenid')
        // 获取数据
        
        //console.log('就图片'+logo_old);
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=workpostAction', //真实的接口地址
            data: {
                'name':e.detail.value.name,
                'zhiwei':that.data.zhiweitype[e.detail.value.zhiwei],
                'jingyan':that.data.jingyantype[e.detail.value.jingyan],
                'xingbie':that.data.xingbietype[e.detail.value.xingbie],
                'bron':that.data.truebron,
                'zuidixinzi':e.detail.value.zuidixinzi,
                'zuigaoxinzi':e.detail.value.zuigaoxinzi,
                'miaoshu':e.detail.value.miaoshu,
                'sheng':that.data.shengtype[e.detail.value.sheng],
                'shi':that.data.shitype[e.detail.value.shi],
                'qu':that.data.qutype[e.detail.value.qu],
                'phone':e.detail.value.phone,
                'logo':e.detail.value.logo,
                
                'openid':openid
            },
            method:'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                // 跳转到其他页面
                if(res.data.status == 1){
                    // console.log(res.data.status)
                    // 成功，跳转
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 2000,
                      success:function(){
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    })
                  
                }else{
                    wx.showModal({
                        title: '提醒',
                        content: res.data.info,
                        showCancel:false,
                        success: function(res) {
                            if (res.confirm) {
                            // console.log('用户点击确定')
                            }
                        }
                        })
                }

                // 隐藏提示
                
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })

    },
  onLoad: function (options) {
    
     token = options.token
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
        // 加载数据
        wx.showToast({
            title: '数据加载中…',
            icon: 'loading',
            duration: 10000
        });
        var session_id = wx.getStorageSync('session_id')
        var openid = wx.getStorageSync('wxopenid')
        // 获取数据
       
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=workpost', //真实的接口地址
            data: {
              'openid':openid
            },
           
            header: {
                'content-type': 'application/json',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
              if (res.data.user_logo =='' || res.data.user_logo==null){
                if (wx.getStorageSync('logo')){
                  res.data.user_logo = wx.getStorageSync('logo')
                }else{
                  res.data.user_logo ='/images/renwu.png'
                }
        
              }
              logo_old = res.data.user_logo;
            // console.log(res.data)
                that.setData({
                xingbietype: res.data.xingbie,
                jingyantype: res.data.jingyan,
                
                zhiweitype: res.data.zhiwei,
                shengtype: res.data.sheng,
                shitype:res.data.shi, 
                user_name:res.data.user_name,
                xingbieIndex:res.data.user_xingbie,
                jingyanIndex:res.data.user_jingyan,
                zhiweiIndex:res.data.user_zhiwei,
                shengIndex: res.data.user_sheng,
                shiIndex:res.data.user_shi,
                user_zuidixinzi:res.data.user_zuidixinzi,
                user_zuigaoxinzi:res.data.user_zuigaoxinzi,
                
                user_phone:res.data.user_phone,
                user_miaoshu:res.data.user_miaoshu,
                logo:res.data.user_logo,
                bron:res.data.bron,
                truebron:res.data.truebron
                })
                // 隐藏提示
                wx.hideToast()
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })

      //更新数据
      that.setData({
        userInfo:userInfo
      })
      // console.log(userInfo)
    })
  },
});