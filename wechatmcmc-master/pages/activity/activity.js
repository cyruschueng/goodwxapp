;// activity.js
var app=getApp();
// var session_id = wx.getStorageSync('session_id');
// var openid = wx.getStorageSync('wxopenid');
var name = wx.getStorageSync('wxname');

var res=wx.getSystemInfoSync();
var h=res.windowHeight*0.04;
var line = res.windowHeight*0.8*0.15;
var line2 = res.windowHeight *0.6* 0.15 * 0.7;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      display:'none',
      display2: 'none',
      height:h,
      logo:'',
      line:line,
      line2:line2,
      imgname0: '',
      imgname1: '',
      imgname2: '',

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
jump:function(){
    wx.redirectTo({
      url: '../activity/activity',
    })
},
block:function(){
  this.setData({
  display2:'block',  
  })
},
close: function () {
  this.setData({
    display2: 'none',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取转发后的群标识
    wx.showShareMenu({
      withShareTicket: true
    })
    
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
    })
    var session_id = wx.getStorageSync('session_id');
    var  openid = wx.getStorageSync('wxopenid');
    if (wx.getStorageSync('logo')){
      var logo = wx.getStorageSync('logo');
    }else{
      var logo = 'https://www.mcmchw.com/Public/tupian/大师.jpg';
    }
    that.setData({
      logo:logo,
      name:name,
    })
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getShare',
      method:'post',
      data:{
        'openid':openid,
      },
      header: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Cookie':'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(res){
        if (res.data.img != 1){
         that.setData({
           num: res.data.snum,
           imgname0: res.data.img[0],
           imgname1: res.data.img[1] ,
           imgname2: res.data.img[2],
          
         })
       }else{
         that.setData({
           num: res.data.snum, 
         })
         }
        
      }
    })
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
      return {
      title: '[10-80元红包]等你来领！',
      path: '/pages/activity/activity',
      success: function (res) {
        // 转发成功
        console.log(res);
        
        if (res.shareTickets){
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: function (e) {
              // console.log(e);
              //解密获得群id
              var session_key = wx.getStorageSync('session_key');
              // console.log(session_key);
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getOpenGid',
                method: 'post',
                data: {
                  'session_key': session_key,
                  'encryptedData': e.encryptedData,
                  'iv': e.iv
                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (e) {

                  // console.log(e.data);
                  if (e.data != 'null' && e.data != 'undefined' && e.data != '') {
                    //通过群ID获得图片

                    wx.request({
                      url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getUrlimg',
                      method: 'post',
                      data: {
                        'openid': openid,
                        'GId': e.data,
                      },
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                      },
                      success: function (e) {
                        //  console.log(e);

                        if (e.data.status == 111) {
                          wx.showModal({
                            title: '提示',
                            content: '分享失败',
                            showCancel: false,
                          })
                        } else {

                          if (e.data.status == 0) {
                            wx.showToast({
                              title: '恭喜集到一个菜品',
                              icon: 'success',
                              duration: 1000
                            })
                            that.setData({
                              imgname0: e.data.img[0],
                              imgname1: e.data.img[1],
                              imgname2: e.data.img[2],
                            })
                            if (e.data.add == 1) {
                              that.setData({
                                display: 'block',
                              })
                            }
                          } else {


                            wx.showModal({
                              title: '提示',
                              content: e.data.text,
                              showCancel: false,
                            })
                          }
                        }


                      }
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '分享失败',
                      showCancel: false,
                    })
                  }
                }

                // }
              })
            },
            complete: function () {
              //更新session_key
              wx.login({
                success: function (resa) {
                  wx.getUserInfo({
                    success: function (res) {

                    },
                    complete: function () {
                      if (resa.code) {

                        // 获取数据
                        wx.request({
                          url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=updateSession', //真实的接口地址
                          // method: 'get',
                          data: {
                            code: resa.code,
                          },
                          header: {
                            'content-type': 'application/json'
                          },
                          success: function (res) {
                            console.log(res);
                            wx.setStorageSync('wxopenid', res.data.openid)
                            wx.setStorageSync('session_id', res.data.session_id)
                            wx.setStorageSync('creattime', res.data.creattime)
                            wx.setStorageSync('session_key', res.data.session_key)
                            // 隐藏提示
                            wx.hideToast()
                          },
                          // 接口调用失败
                          fail: function () {

                          },
                          complete: function () {
                          }
                        })
                      } else {
                        // 获取登录状态失败
                        // console.log("登录失败")
                      }
                    }

                  })
                }
              })

              var session_key2 = wx.getStorageSync('session_key');
              console.log(session_key2);
            },
            fail: function () {

              //分享的不是微信群，在这里提示
              wx.showModal({
                title: '提示',
                content: '只有在微信群才能找到菜品',
                showCancel: false,
              })

            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '只有在微信群才能找到菜品',
            showCancel: false,
          })
        }
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})