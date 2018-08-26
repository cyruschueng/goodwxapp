//  ===========推广中心======pages/Promotion center/Promotion center.js
var app = getApp();
var urlData = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    Mer:"",  //用户类别
    page:0,
    
    totalMoney: '',  //总收益
    phone: '', //用户手机号
    display:'',
    num: '',  //还款笔数
    money: '', //还款金额
    subordinate:"",
    // member:[],  //会员代理
    pro:"",
    city:"",
    count:"",
    mer: ""   //下级用户人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取头部信息
    urlData.header(that, that.data.nickName, that.data.avatarUrl, that.data.uid)

    //判断是否有本地缓存的代理人数。
    // if(wx.getStorageSync("member")){
    //   that.setData({
    //    member:wx.getStorageSync("member")
    //   })
    // }else{
    //   that.data.member=[];
      //用户统计：
      // var str = {
      //   "OperationType": "10036",
      //   "uid": wx.getStorageSync("uid")
      // }
      //
      var str = {
        "OperationType": "10016",
        "uid": wx.getStorageSync("uid"),
        "sort":"All",
        "state": 6,
        "page": 0
      }
      //发起请求*
      wx.request({
        url: app.globalData.url,  
        data: str,
        method: 'POST',
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log("hhh")
          console.log(10036)
          console.log(res)
          if (res.data.CODE == "00") {
            console.log(res.data.data.length)
            //成功缓存在本地会员代理
            var arrPro=[],
                arrCity=[],
                arrCount=[],
                arrMer=[];
            var length = res.data.data.length;
            for(var i=0;i<length;i++){
              console.log(res.data.data[i])
              console.log("000")
              if(res.data.data[i].sort=="Mer"){
                console.log("Mer")
                arrMer.push(res.data.data[i])
              }
              if (res.data.data[i].sort == "Agpro") {
                arrPro.push(res.data.data[i])
              }
              if (res.data.data[i].sort == "Agcity") {
                arrCity.push(res.data.data[i])
              }
              if (res.data.data[i].sort == "Agcount") {
                arrCount.push(res.data.data[i])
              }
            }

            // wx.setStorageSync("member", res.data)
            // wx.setStorageSync("arrMer",arrMer);
            // wx.setStorageSync("arrPro", arrPro);
            // wx.setStorageSync("arrCity", arrCity);
            // wx.setStorageSync("arrCount", arrCount);
            that.setData({
              pro:arrPro,
              city:arrCity,
              count:arrCount,
              mer:arrMer
            })
          }
        }
      })
    // }
  },

  //去提现
  onSkip: function (e) {
    var that = this;
    var title = e.currentTarget.dataset.title; //获取自定义属性
    if (wx.getStorageSync('realName')) {
      //到钱包页面
      wx.navigateTo({
        url: ".." + "/" + title + "/" + title,
      })
    } else {
      wx.navigateTo({
        url: '../realName/realName',
      })
    }
  },

  //点击进入：代理页面
  ontip:function(e){
    var that = this;
    console.log(e)
    var order = e.currentTarget.dataset.index;
    if(wx.getStorageSync("realName")){
      //下级会员代理人数列表页面
      wx.navigateTo({
        url: '../membership/membership',
      })
      wx.setStorageSync("order",order)
    }else{
      wx.navigateTo({
        url: '../realName/realName',
      })
    }
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
    var that = this;
    that.onLoad()
    that.onLoad()
    that.setData({
      Mer: wx.getStorageSync("mer"),
      phone: wx.getStorageSync("phone"),
      display: wx.getStorageSync("display"),
      num: wx.getStorageSync("num"),
      money: wx.getStorageSync("money"),
      totalMoney:wx.getStorageSync("borrowList").totalMoney
    })
    //10016
    //urlData.subordinateList(that, wx.getStorageSync('uid'), "mer", 6, that.data.subordinate)
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
  
  }
})