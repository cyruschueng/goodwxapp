// shoplist.js
var session_id = wx.getStorageSync('session_id');
var openid = wx.getStorageSync('wxopenid');
var res = wx.getSystemInfoSync()

var area="";
var token;
var page=10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: [],
    leibie: ['餐饮设计', '食材调料', '餐厨用品','酒水饮品'],
    info:[],
    index:0,
    k:0,
    token:token,
    height: res.windowHeight * 0.08,
    status:'none',
    
  },
  choosearea:function(){
    var that=this;
    // console.log(that.data.status);
    var s
    if(that.data.status=='none'){
      s='block';
    }else{
      s='none';
    }
    that.setData({
      status:s
    })
  },
  getdata:function(that){
    var aaa;
    var session_id = wx.getStorageSync('session_id');
    if (that.data.region!=""){
      aaa = that.data.region[that.data.k];
    }else{
      aaa="";
    }
    // console.log(aaa);
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shopList',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      data: {
        token: token,
        area: aaa,
        page:page,
      },
      success: function (e) {
        console.log(e);
        that.setData({
          info: e.data,
          
        })
        page+=10;
      }

    })
  },
  bindareaChange:function(e){

    var that = this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      k: e.detail.value
    })
    area = that.data.region[that.data.k]
    page = 10;
    that.getdata(that);
  },
  bindleibieChange: function (e) {
    var that=this;
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      index: e.detail.value
    })
    token = e.detail.value;
    page=10;
    that.getdata(that);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    
    token=options.token;
      wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getArea',
      data:{

      },
      success:function(e){
        // console.log(e.data);
        that.setData({
          index: token,
          region: e.data,
        })
      }
    })
   
   
    
  //  console.log(token);
   that.getdata(that);
  },
  //上拉触底加载更多
  onReachBottom:function(){
    // console.log('下拉加载');
      var that=this;
      that.getdata(that);
  },
  //拨打电话
  call:function(e){
      // console.log(e);
      var numbers = e.currentTarget.dataset.id
      wx.makePhoneCall({
        phoneNumber: numbers //仅为示例，并非真实的电话号码
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
    area = "";
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})