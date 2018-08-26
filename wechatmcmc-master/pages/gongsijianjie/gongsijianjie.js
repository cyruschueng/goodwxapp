//获取应用实例
var app = getApp()
var city;
var token='';
var logo_old='';
Page({
    data: {
      userinfo: [],
      logo:'http://7pun6r.com2.z0.glb.qiniucdn.com/dfbdf1b6df1b65df1b65.jpg',
        isAgree: true,
        info:{},
        zhiweitype:["厨师长","炒锅","凉菜部","烧腊","面点","西餐厨师","上什","砧板","折荷/水台","服务员","管理人员","其他"],
        zhiweiIndex:0,
        shengtype:{},
        shengIndex:0,
        shitype:{},
        shiIndex:0,
        qutype:{},
        quIndex:0,
        guimotype:{},
        guimoIndex:0,
        user_guimo:'',
    },
    // onLoad: function () {
    //   $openid=app.getUserinfo.wxopenid;
    //   wx.request({
    //     url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=',
    //   })
    // },
    bindshengChange: function (e) {
      var that = this;
      //console.log('picker account 发生选择改变，携带值为', e.detail.value);
      this.setData({
        shengIndex: e.detail.value
      })
      if (e.detail.value==0){
        that.setData({
          shitype: ['请选择'],
          shiIndex: 0,
          qutype: ['请选择'],
          quIndex: 0,
        })
     }else{
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
      if(e.detail.value==0){
        that.setData({
         
          shiIndex: 0,
          qutype: ['请选择'],
          quIndex: 0,
        })
      }else{
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
    bindguimoChange: function(e) {
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            guimoIndex: e.detail.value
        })
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
    //         console.log(tempFilePaths[0]);
            
    //         wx.uploadFile({
    //           url: 'https://www.mcmchw.com/index.php?m=Home&c=Upload&a=useruploadimg',
    //         filePath: tempFilePaths[0],
    //         header:{
    //                 'content-type':'multipart/form-data',
    //                 'Cookie':'PHPSESSID='+session_id+'; path=/'
    //             },
    //         name: 'file',
    //         formData:{
    //           url: tempFilePaths[0],
    //           token: token,
    //           lei: 0
    //         },
    //         success: function(res){
               
    //           var s = JSON.parse(res.data)

    //           that.setData({
    //             logo: s
    //           })
    //         },
    //         fail:function (res) {
    //             console.log(res)
    //         }
    //         })
    //     }
    //     })
    // },
    formSubmit: function(e) {
        var that = this;
        // 提交表单数据
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if (e.detail.value.logo == '' || e.detail.value.logo =='/images/renwu.png'){
            wx.showModal({
                title: '提醒',
                content: '请上传企业logo',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                    // console.log('用户点击确定')
                    }
                }
                })
            return -1;
        }
        if(e.detail.value.title=='' || e.detail.value.logo ==''  || e.detail.value.lianxiren==''||e.detail.value.phone==''){
            wx.showModal({
                title: '提醒',
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
        if (e.detail.value.qu == 0||e.detail.value.shi == 0){
          wx.showToast({
            title: '请把地址填写完整',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        var num = /^[0-9]*$/
        if (!(num.test(e.detail.value.phone))){
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
        // 提交数据
        // 加载数据
        wx.showToast({
            title: '提交中……',
            icon: 'loading',
            duration: 500
        });
        var session_id = wx.getStorageSync('session_id')
        var openid = wx.getStorageSync('wxopenid');
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=savegongsi', //真实的接口地址
            data: {
                'title':e.detail.value.title,
                'logo':e.detail.value.logo,
                'guimo':that.data.guimotype[that.data.guimoIndex],
                'sheng':that.data.shengtype[that.data.shengIndex],
                
                'shi':that.data.shitype[that.data.shiIndex],
                'qu':that.data.qutype[that.data.quIndex],
                'jiedao':e.detail.value.jiedao,
                'lianxiren':e.detail.value.lianxiren,
                'phone':e.detail.value.phone,
                'jieshao':e.detail.value.jieshao,
                'openid':openid
                
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            method:'post',
            success: function(res) {
                // console.log(res.data)
                // 提交成功
                if(res.data.status == 1){
                  wx.request({
                    url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=sendMessage',
                    method: 'POST',
                    data: {
                      template_id: 'Fo3y6bpvYYc0ta3athK3ngnVVjh4A60xSciL4hD446I',
                      openid: openid,
                      code: 5,
                      page: 'pages/fabu/fabu'
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                    },
                    success: function () {

                    }
                  }) 
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
                    content: '您没做任何修改',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        // console.log('用户点击确定')
                      }
                    }
                  }) 
                }
                
                
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
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=gongsijianjie', //真实的接口地址
                data: {
                  'openid':openid
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                method: 'post',
                success: function(res) {
                  city = res.data.shiindex;
                  if (res.data.logo == null){
                    if (wx.getStorageSync('logo')){
                      res.data.logo = wx.getStorageSync('logo')
                    }
                      else{
                      res.data.logo='/images/renwu.png'
                      }
                     //res.data.logo='http://www.mcmchw.com/mcmc.jpg'
                    }
                  logo_old = res.data.logo;
                // console.log(res.data)
                    that.setData({
                        info: res.data,
                        logo: res.data.logo,
                        guimotype:res.data.guimo,
                        shengtype:res.data.sheng,
                        shengIndex:res.data.shengindex,
                        shitype:res.data.shi,
                        shiIndex:res.data.shiindex,
                        qutype:res.data.qu,
                        quIndex:res.data.quindex,
                        guimoIndex:res.data.user_guimo,
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