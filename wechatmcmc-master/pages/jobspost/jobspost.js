//获取应用实例
var app = getApp()
var status1=0;
var token;
var wxopenid;
var zhiweigaibian = 0;
Page({
    data: {
       status:false,
        showTopTips: false,
        radioItems: [
            {name: 'cell standard', value: '0'},
            {name: 'cell standard', value: '1', checked: true}
        ],
        checkboxItems: [
            {name: 'standard is dealt for u.', value: '0', checked: true},
            {name: 'standard is dealicient for u.', value: '1'}
        ],
        date: "2016-09-01",
        time: "12:01",
        isAgree: true,
        zhiweitype:{},
        zhiweiIndex:0,
        jingyantype:{},
        jingyanIndex:0,
        renshutype:{},
        renshuIndex:0,
        xingbietype:{},
        xingbieIndex:0,
        
    },
    bindzhiweiChange: function(e) {
        // console.log('职位发送选择改变，携带值为', e.detail.value)
        zhiweigaibian = 1;
        this.setData({
            zhiweiIndex: e.detail.value
        })
    },
    bindjingyanChange: function(e) {
        // console.log('经验picker发送选择改变，携带值为', e)
        this.setData({
            jingyanIndex: e.detail.value
        })
    },
    bindrenshuChange: function(e) {
        // console.log('人数picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            renshuIndex: e.detail.value
        })
    },
    bindxingbieChange: function(e) {
        // console.log('性别picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            xingbieIndex: e.detail.value
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
        if(e.detail.value.title=='' ||  e.detail.value.zhiweileibie == 0 || zhiweigaibian == 0 || e.detail.value.renshu==''){
            wx.showModal({
                title: '发布职位',
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
        
        if (e.detail.value.zuidixinzi == ''){
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
        if (!(num.test(e.detail.value.zuigaoxinzi)) || !(num.test(e.detail.value.zuidixinzi))) {
          wx.showToast({
            title: '薪资必须是数字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        if (!(num.test(e.detail.value.renshu))) {
          wx.showToast({
            title: '人数必须是数字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        // 标题最多9个字
        if(e.detail.value.title.length > 9){
            wx.showToast({
            title: '标题最多9个字',
            icon: 'info',
                duration: 2000
            })
            return -1;
        }
        if (e.detail.value.user.length >4) {
          wx.showToast({
            title: '联系人最多4个字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        
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
            title: '联系电话必须是11为数字',
            icon: 'info',
            duration: 2000
          })
          return -1;
        }
        console.log(status1);
        if (status1== 0) {
          wx.showModal({
            title: '完善企业信息',
            content: '请先完善企业后再发布职位',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.navigateTo({
                  url: '../gongsijianjie/gongsijianjie'
                })
              }
            }
          })
          return -1;
        }
        
        // 提交数据
        // 加载数据
        that.setData({
          status: true
        })
        wx.showToast({
            title: '提交中……',
            icon: 'loading',
            duration: 10000
        });
        var session_id = wx.getStorageSync('session_id')
        var openid=wx.getStorageSync('wxopenid')
        // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Ceshi&a=zhiweipostAction', //真实的接口地址
            data: {
                'title':e.detail.value.title,
                'zhiwei':that.data.zhiweitype[e.detail.value.zhiweileibie],
                'jingyan':that.data.jingyantype[e.detail.value.jingyan],
                // 'renshu':that.data.renshutype[e.detail.value.renshu],
                'renshu':e.detail.value.renshu,
                'xingbie':that.data.xingbietype[e.detail.value.xingbie],
                'zuidixinzi':e.detail.value.zuidixinzi,
                'zuigaoxinzi':e.detail.value.zuigaoxinzi,
                'miaoshu':e.detail.value.miaoshu,
                'user':e.detail.value.user,
                'phone': e.detail.value.phone,
                'openid':openid
            },
            method:'post',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                // 跳转到其他页面
                that.setData({
                  status: false
                })
                if(res.data.status == 1){
                    // 成功，跳转
                    // wx.redirectTo({
                    //     url: '../jobs/jobs?token='+res.data.token
                    //     })
                  wx.showToast({
                    title: '发布成功',
                    icon: 'success',
                    duration: 1000
                  })
                  wx.request({
                    url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=sendMessage',
                    method:'POST',
                    data:{
                      template_id:'Fo3y6bpvYYc0ta3athK3ngnVVjh4A60xSciL4hD446I',
                      openid:openid,
                      code:4,
                      page:'pages/fabu/fabu'
                    },
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                    },
                    success:function(){

                    }
                  })
                  wx.switchTab({
                    url: '../fabu/fabu'
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

                
                
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })

    },
    formReset: function() {
        // console.log('form发生了reset事件')
    },
    // showTopTips: function(){
    //     var that = this;
    //     this.setData({
    //         showTopTips: true
    //     });
    //     setTimeout(function(){
    //         that.setData({
    //             showTopTips: false
    //         });
    //     }, 3000);
    // },
    radioChange: function (e) {
        // console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    checkboxChange: function (e) {
        // console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }

        this.setData({
            checkboxItems: checkboxItems
        });
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindCountryCodeChange: function(e){
        // console.log('picker country code 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    bindCountryChange: function(e) {
        // console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function(e) {
        // console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
  onLoad: function (options) {
    //console.log('onLoad')
    token = options.token
    var that = this
  console.log(status1);
    //调用应用实例的方法获取全局数据
   
    wx.showToast({
      title: '数据加载中…',
      icon: 'loading',
      duration: 10000
    });
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Ceshi&a=zhiweipost', //真实的接口地址
      data: {
        'openid': openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      method: 'post',
      success: function (res) {
        status1 = res.data.status;
        console.log(status1);
        if (res.data.company.name == null) {
          res.data.company.name = ''

        }
        console.log(res.data)
        that.setData({
          zhiweitype: res.data.zhiweileibie,
          jingyantype: res.data.jingyan,
          renshutype: res.data.renshu,
          xingbietype: res.data.xingbie,
          company: res.data.company,
        })
        // 隐藏提示
        wx.hideToast()
        if (res.data.status == 0) {
          wx.showModal({
            title: '提示',
            content: '请先完善企业信息后再发布职位',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.navigateTo({
                  url: '../gongsijianjie/gongsijianjie'
                })
              }
            }
          })
        }
        if (res.data.lahei == 1) {
          wx.showModal({
            title: '提示',
            content: '您的公司已被拉黑，如有疑问请联系客服',
            showCancel: false,
            success: function (res) {
              if (res) {
                wx.switchTab({
                  url: '../fabu/fabu'
                })
              }
            }
          })
        }
      },
      // 接口调用失败
      fail: function () {

      },
      complete: function () {
      }
    })
    
  },
  onShow:function(){
    var that=this;
    var session_id = wx.getStorageSync('session_id')
    var openid= wx.getStorageSync('wxopenid')
   
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=home&c=Mcmc&a=checkgongsijianjie',
      method:'post',
      data:{
        openid:openid
      },
      header:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(e){
        console.log(e);
      status1=e.data.status;
      that.setData({
        company:e.data.company
      })
     
      }
    })
  }
});