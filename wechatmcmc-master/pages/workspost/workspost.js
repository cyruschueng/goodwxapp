//获取应用实例
var zhiweigaibian = 0;
var app = getApp()
Page({
    data: {
        showTopTips: false,
        logo:"http://7pun6r.com2.z0.glb.qiniucdn.com/dfbdf1b6df1b65df1b65.jpg",
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
    },
    uplogo:function(){
        var that = this;
        var session_id = wx.getStorageSync('session_id')
        wx.chooseImage({
        success: function(res) {
            wx.showToast({
              title: '上传中…',
              icon: 'loading',
              duration: 10000
          });
            var tempFilePaths = res.tempFilePaths
            // console.log(tempFilePaths[0]);
            wx.uploadFile({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=uploadImage',
            filePath: tempFilePaths[0],
            header:{
                    'content-type':'multipart/form-data',
                    'Cookie':'PHPSESSID='+session_id+'; path=/'
                },
            name: 'file',
            formData:{
            },
            success: function(res){
                var data = res.data;//七牛会返回一个包含hash值和key的JSON字符串
                var data = JSON.parse(data);
                // console.log(data);
                that.setData({
                  logo: "https://www.mcmchw.com/Public/"+data.file.savepath+data.file.savename
              })
              
               // 隐藏提示
              wx.hideToast()
            },
            fail:function (res) {
                // console.log(res)
            }
            })
        }
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
        zhiweigaibian = 1;
        this.setData({
            zhiweiIndex: e.detail.value
        })
    },
    bindshengChange: function(e) {
        var that = this;
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            shengIndex: e.detail.value
        })
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shi', //真实的接口地址
            data: {
                'sheng':that.data.shengtype[e.detail.value],
            },
            method:'get',
            header: {
                'content-type': 'application/json',
            },
            success: function(res) {
                // console.log(res.data)
                // 设置区的值
                that.setData({
                    shitype:res.data.shi
                    })
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
    },
    bindshiChange: function(e) {
        var that = this;
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);
        this.setData({
            shiIndex: e.detail.value
        })
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=qu', //真实的接口地址
            data: {
                'qu':that.data.shitype[e.detail.value],
            },
            method:'get',
            header: {
                'content-type': 'application/json',
            },
            success: function(res) {
                // console.log(res.data)
                // 设置区的值
                that.setData({
                    qutype:res.data.qu
                    })
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })

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
        // 提交表单数据
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)
        if(e.detail.value.name =='' || e.detail.value.zuidixinzi==''||e.detail.value.zuigaoxinzi==''||e.detail.value.phone=='' || e.detail.value.sheng == 0 || zhiweigaibian == 0){
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
        if(e.detail.value.name.length > 6){
            wx.showToast({
            title: '姓名最多6个字',
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
            duration: 10000
        });
        var session_id = wx.getStorageSync('session_id')
        
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=workpostAction', //真实的接口地址
            data: {
                'name':e.detail.value.name,
                'zhiwei':that.data.zhiweitype[e.detail.value.zhiwei],
                'jingyan':that.data.jingyantype[e.detail.value.jingyan],
                'xingbie':that.data.xingbietype[e.detail.value.xingbie],
                'zuidixinzi':e.detail.value.zuidixinzi,
                'zuigaoxinzi':e.detail.value.zuigaoxinzi,
                'miaoshu':e.detail.value.miaoshu,
                'sheng':that.data.shengtype[e.detail.value.sheng],
                'shi':that.data.shitype[e.detail.value.shi],
                'qu':that.data.qutype[e.detail.value.qu],
                'phone':e.detail.value.phone,
                'logo':e.detail.value.logo,
            },
            method:'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                // 跳转到其他页面
                if(res.data.status == 1){
                    // console.log(res.data.status)
                    // 成功，跳转
                    wx.redirectTo({
                        url: '../success/success'
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
                wx.hideToast()
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })

    },
  onLoad: function (options) {
    // console.log('onLoad')
    // token = options.token
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
            method:'post',
            header: {
                'content-type': 'application/json',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
             // console.log(res.data.user_logo)
                if(res.data.user_logo == null){
                  res.data.user_logo = wx.getStorageSync('logo');
                }
            // console.log(res.data)
                that.setData({
                xingbietype: res.data.xingbie,
                jingyantype: res.data.jingyan,
                zhiweitype: res.data.zhiwei,
                shengtype: res.data.sheng,
                // 
                user_name:res.data.user_name,
                xingbieIndex:res.data.user_xingbie,
                jingyanIndex:res.data.user_jingyan,
                // zhiweiIndex:res.data.user_zhiwei,
                zhiweiIndex:0,
                user_zuidixinzi:res.data.user_zuidixinzi,
                user_zuigaoxinzi:res.data.user_zuigaoxinzi,
                // shengIndex:res.data.user_sheng,
                shengIndex:0,
                user_phone:res.data.user_phone,
                user_miaoshu:res.data.user_miaoshu,
                logo:res.data.user_logo
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