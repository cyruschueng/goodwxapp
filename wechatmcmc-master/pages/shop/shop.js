var token;
// var session_id = wx.getStorageSync('session_id');
// var openid = wx.getStorageSync('wxopenid');
var urlarr=[];
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   info:[],
   logo:[],
   leixing:"",
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    token=options.token;
    // console.log(token);
    var res=wx.getSystemInfoSync();
    var h=res.windowHeight*0.6
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopDetails',
      data:{
        'token':token,
        
        },
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(e){
        // console.log(e.data);
        var leixing = "";
        var id=e.data[0].leixing;
        if (id == 0) {
          leixing = '餐饮设计';
        } else if (id == 1) {
          leixing = '食材调料';
        } else if (id == 2) {
          leixing = '餐厨用品';
        } else if (id == 3) {
          leixing = '酒水饮品';
        }
        urlarr = e.data[0].logo;
           that.setData({
             info:e.data[0],
             logo:e.data[0].logo,
             height:h,
             leixing:leixing,
           })
      }
    })
  },
  //拨打电话
  call: function (e) {
    // console.log(e);
    var numbers = e.currentTarget.dataset.id
    wx.makePhoneCall({
      phoneNumber: numbers //仅为示例，并非真实的电话号码
    })
  },
  //收藏
  shoucang:function(){
    var that=this;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkshoucang',
      data: {
        'token': token,
        'openid': openid,
        'type':1
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        wx.showModal({
          title: '提示',
          confirmText: '确定',
          // showCancel:false,
          confirmColor: '#3CC51F',
          content: res.data.info,
          success: function (res) {
            if (res.confirm) {
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shoucangzhiwei', //真实的接口地址
                data: {
                  'token': token,
                  'openid': openid,
                  'type': 1
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (res) {
                  that.setData({
                    sc: res.data.sc
                  }),
                    wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 1000
                    })
                }
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  lookimg:function(e){
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current:url,
      urls: urlarr,
    })
  },
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  onShareAppMessage: function () {
    return {
      title: '共享餐饮机会', 
  }
  }
})
