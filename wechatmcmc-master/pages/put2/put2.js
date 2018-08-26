// pages/z_test/z_test.js
var urlarr = [];
var arrr = 0;
var city ;
// var session_id = wx.getStorageSync('session_id');
// var openid = wx.getStorageSync('wxopenid');
var status = 0;
var start = [];
var shopid;
var token;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [],
    width: 0,
    height: 0,
    logo: [],
    box: 0,
    shengtype: [],
    shengIndex: 0,
    shitype: [],
    shiIndex: 0,
    qutype: [],
    quIndex: 0,
    isAgree: true,
    TypeIndex:0,
    Type: ['餐饮设计', '食材调料', '餐厨用品', '酒水饮品'],
  },
  
  bindtypeChange: function (e) {
    var id = e.detail.value
    var that = this;
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
            TypeIndex: token
          })
        } else {
          token = id;
          that.setData({
            TypeIndex: id
          })
        }


      }
    })

  },
  upload: function () {
    var that = this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    var llen = start.length;
    if(arrr==0){
      for (var i = 0; i < llen; i++) {
        if (start[i] != "") {
          arrr += 1;
        }
      }
    }
    if (arrr < 9) {
      
      var num = 9 - arrr;
     
      wx.chooseImage({
        count: num,
        success: function (res) {
          console.log(res);
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
                console.log(e);
                var urllen = urlarr.length
                var imgdata = JSON.parse(e.data);
                console.log(imgdata);
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
    } else {
      wx.showToast({
        title: '最多只能上传9张图片',
        image: '/images/waring.png',
        duration: 2000
      })
    }

  },
  close: function (e) {

    var that = this;
    var id = e.currentTarget.dataset.id;
   
        start[id] = "";
        var len = start.length;
        var num = 0
        for (var i = 0; i < len; i++) {
          if (start[i] != "") {
            num += 1;
          }
        }
        
        var width = (num + 1) * 64 + (num + 2) * 10
        that.setData({
          width: width,
          logo: start,
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
    var that = this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    urlarr = [];
    token = e.token;
    console.log(status);
    var res = wx.getSystemInfoSync();

    that.setData({
      height: res.windowHeight * 0.6,
      width: res.windowWidth,
      TypeIndex: token
    })
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shop2',
      data: {

      },
      method: 'get',
      header: {
        'content-type': 'multipart/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        var res2 = wx.getSystemInfoSync();
        var box = (res2.windowWidth - 64) / 2
        console.log(res);
        city = res.data.shiindex;
        that.setData({
          box: box,
          // Type:res.data.leibie,
         
        })
      }
    })
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getGSinfo',
      data: {
        'openid': openid,
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        console.log(res);
        status=res.data.status;
        if(status==0){
        
          wx.showModal({
            title: '提示',
            content: '请先完善企业信息后再发布信息',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.navigateTo({
                  url: '../gongsijianjie/gongsijianjie'
                })
              }
            }
          })
        }else{
          that.setData({
            gsinfo: res.data.company,
            shengIndex:res.data.sheng,
            shiIndex: res.data.shi,
            quIndex: res.data.qu,
            shengtype: res.data.shengtype,
            shitype: res.data.shitype,
            qutype: res.data.qutype,
          
          })
        }
      }
    })
    // console.log(status);
  
  },
  formSubmit: function (e) {

    var that = this;
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
      success: function (res) {
        console.log(res);
      }
    })
    if (e.detail.value.title == '' || e.detail.value.lianxiren == '' || e.detail.value.phone == '' ) {
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
    if (e.detail.value.shi == 0 || e.detail.value.qu == 0) {
      wx.showToast({
        title: '地址信息不完整',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
    if (e.detail.value.title.length > 30) {
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

    var changdu = start.length;
    var strs = "";
    for (var i = 0; i < changdu; i++) {
      if (start[i] != "") {
        strs = strs + start[i] + ','
      }
    }
    strs = strs.substring(0, strs.length - 1)
    if (strs == "") {
      wx.showToast({
        title: '请至少上传一张图片',
        icon: 'info',
        duration: 2000
      })
      return -1;
    }
  //  console.log(openid);
    if (status == 0) {
      wx.showModal({
        title: '提示',
        content: '请先完善企业信息后再发布信息',

        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.navigateTo({
              url: '../gongsijianjie/gongsijianjie'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '发布成功',
        icon: 'info',
        duration: 2000
      })
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=saveShop',
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        data: {

          'logo': strs,
          'title': e.detail.value.title,
          'province': that.data.shengtype[e.detail.value.sheng],
          'city': that.data.shitype[e.detail.value.shi],
          'area': that.data.qutype[e.detail.value.qu],
          'address': e.detail.value.jiedao,
          'contacts': e.detail.value.lianxiren,
          'phone': e.detail.value.phone,
          'content': e.detail.value.jieshao,
          'openid': openid,
          'liebie': token,

        },
        success: function (e) {

          urlarr = [];
          wx.switchTab({
            url: '../fabu/fabu'
          })

        }
      })
    }

  },
  preview: function (e) {
    var url = e.currentTarget.dataset.img;
    var len = start.length;
    var imgarr = [];
    for (var i = 0; i < len; i++) {
      if (start[i] != "") {
        imgarr[i] = start[i];
      }
    }
    wx.previewImage({
      current: url,
      urls: imgarr,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    var that=this;
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getGSinfo',
      data: {
        'openid': openid,
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        console.log(res);
        status = res.data.status;
        if (status == 0) {
          // wx.showModal({
          //   title: '提示',
          //   content: '请先完善企业信息后再发布信息',
          //   showCancel: false,
          //   success: function (res) {
          //     if (res.confirm) {
          //       // console.log('用户点击确定')
          //       wx.navigateTo({
          //         url: '../gongsijianjie/gongsijianjie'
          //       })
          //     }
          //   }
          // })
        } else {
          that.setData({
            gsinfo: res.data.company,
            shengIndex: res.data.sheng,
            shiIndex: res.data.shi,
            quIndex: res.data.qu,
            shengtype: res.data.shengtype,
            shitype: res.data.shitype,
            qutype: res.data.qutype,
          })
        }
      }
    })
    console.log(status);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    start = [];
    arrr = 0;
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

 
 

})