// guanlishop.js
// var session_id=wx.getStorageSync('session_id');
// var openid=wx.getStorageSync('wxopenid');
var jinbi=0;
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    name:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    console.log(openid);
    var that=this;
    
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=selectShopList',
        
        data:{
          'openid':openid,
        },
        success:function(res){
          console.log(res);
         if(res.data){
           var len = res.data.length;
           jinbi = res.data.jinbi;
           var s = res.data.leibie;
           var len2 = s.length;
           var leibie=res.data.leibie
           for (var i = 0; i < len2; i++) {
             switch (s[i]["leibie"]) {
               case "0":
                 s[i]["name"] = '餐饮设计';
                 break;
               case "1":
                 s[i]["name"] = '食材调料';
                 break;
               case "2":
                 s[i]["name"] = '餐厨用品';
                 break;
               case "3":
                 s[i]["name"] = '酒水饮品';
                 break;
             }
           }
           console.log(s);

           that.setData({
             info: res.data.info,
             name: s
           })
         }
        }
      })
  },
  // 刷新事件
  shuaxin:function(e){
    var id = e.currentTarget.dataset.id;
    var stu = e.currentTarget.dataset.status;
    var session_id=wx.getStorageSync('session_id');
    var openid=wx.getStorageSync('wxopenid');
    if(stu==0){
      wx.showModal({
        title: '提示',
        content: '上架后才可以对店铺进行刷新',
        confirmText: '确定上架',
        confirmColor: '#3CC51F',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopshangjia',
              data: {
                'id': id
              },
              success: function (e) {
                if (e.data == 1) {
                  wx.showToast({
                    title: '上架成功',
                    icon: 'success',
                    duration: 1000
                  })
                  //删除后刷新

                  wx.redirectTo({
                    url: '../guanlishop/guanlishop'
                  })
                }
              }
            })
          }
        }
      })
     
    }else{
      wx.showModal({
        title: '刷新后排名靠前，曝光量大增',
        confirmText: '刷新',
        content: '刷新方式：-6金币，剩余金币:' + jinbi,
        confirmColor: '#3CC51F',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            if (jinbi < 6) {
              wx.showModal({
                title: '提示',
                confirmText: '去充值',
                content: '您的可用金币不足',
                confirmColor: '#3CC51F',

                success: function (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.navigateTo({
                      url: '../pay/pay'
                    })
                  }
                }
              })
            } else {
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopshuaxin',
                data: {
                  'id': id,
                  'openid': openid
                },
                method: 'get',
                header: {
                  'content-type': 'application/json',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (e) {
                  if (e.data == 1) {
                    jinbi -= 6;
                    wx.showToast({
                      title: '刷新成功',
                      icon: 'success',
                      duration: 1000
                    })
                  } else {
                    wx.showToast({
                      title: '刷新失败',
                      image: '/images/waring.png',
                      duration: 1000
                    })
                  }
                }
              })
            }
          }
        }
      })
    }
  
      
  },
  zhiding: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopzhiding',
      data: {
        'id': id
      },
      success: function (e) {
        if (e.data == 1) {
          wx.showToast({
            title: '置顶成功',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },
  xiajia: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopxiajia',
      data: {
        'id': id
      },
      success: function (e) {
        if(e.data==1){
          wx.showToast({
            title: '下架成功',
            icon: 'success',
            duration: 1000
          })
          //删除后刷新

          wx.redirectTo({
            url: '../guanlishop/guanlishop'
          })
        }
      }
    })
  },
  shangjia:function(e){
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopshangjia',
      data:{
        'id':id
      },
      success:function(e){
        if (e.data == 1) {
          wx.showToast({
            title: '上架成功',
            icon: 'success',
            duration: 1000
          })
          //删除后刷新

          wx.redirectTo({
            url: '../guanlishop/guanlishop'
          })
        }
      }
    })
  },
  shanchu: function (e) {
    var id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      content: '确认删除该职位吗？',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')

          wx.request({
            url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopshanchu',
            data: {
              'id': id,

            },
            success: function (e) {
              if (e.data == 1) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                })
                //删除后刷新

                wx.redirectTo({
                  url: '../guanlishop/guanlishop'
                })
              }
            }
          })
        }
      }
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
    console.log(openid);
    var that = this;

    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=selectShopList',

      data: {
        'openid': openid,
      },
      success: function (res) {
        console.log(res);
        if (res.data) {
          var len = res.data.length;
          jinbi = res.data.jinbi;
          var s = res.data.leibie;
          var len2 = s.length;
          for (var i = 0; i < len2; i++) {
            switch (s[i]["leibie"]) {
              case "0":
                s[i]["name"] = '餐饮设计';
                break;
              case "1":
                s[i]["name"] = '食材调料';
                break;
              case "2":
                s[i]["name"] = '餐厨用品';
                break;
              case "3":
                s[i]["name"] = '酒水饮品';
                break;
            }
          }
          console.log(s);

          that.setData({
            info: res.data.info,
            name: s
          })
        }
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})