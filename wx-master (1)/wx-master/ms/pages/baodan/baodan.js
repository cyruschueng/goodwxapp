// pages/baodan/baodan.js
var app = getApp()
var baodan = function (that) {
  var str = {
    "OperationType": "10051",
    "uid": wx.getStorageSync("uid"),
    "page": that.data.page
  };
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(10051)
      console.log(res)
      if (res.data.CODE == "00") {
        //请求成功，判断第一页是否有数据
        if (that.data.page == 1) {
          if (res.data.data.length > 0) {
            that.setData({
              detailOrder: res.data.data,
              show: false
            })
            //缓存订单数据
            wx.setStorageSync("baodanList", res.data.data);//时间排序订单详情
          } else {
            that.setData({
              show: true
            })
          }
          console.log(that.data.show)
          //页数大于=2时处理
        }else{
          if (res.data.data.length) {
            var detail = that.data.detailOrder
            console.log(detail)
            for (var i = 0; i < res.data.data.length; i++) {
              detail.push(res.data.data[i])
            }
            wx.setStorageSync("baodanList", detail);//订单详情
            that.setData({
              detailOrder: detail
            })
          } else {
            //这里使在下一页没有数据时，page不变
            that.data.page--;
            wx.showToast({
              title: '没有数据了',
              duration: 1000,
              image: "../../images/icon/s.png",
              mask: true,
            })
          }
        }
      }else{
        that.setData({
          show:true
        })
        wx.showModal({
          title: '提示',
          content: res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  })
}

//购买保单10052
var buyBaodan = function (that) {
  that.setData({
    dis:true
  })
  var str = {
    "OperationType": "10052",
    "uid": wx.getStorageSync("uid"),
    "Cardid": that.data.listData.id
  }
  console.log(that.data.listData.id)
  console.log(wx.getStorageSync("uid"))
  //发起请求*
  wx.request({
    url: app.globalData.url,
    data: str,
    method: 'POST',
    header: { "content-type": "application/json" },
    success: function (res) {
      if (res.data.CODE == "00") {
        that.setData({
          visible: false,
          cvn: "",
          card: true,
          focus: false,
          dis: true,
          date: ''
        })
        baodan(that)
        wx.navigateTo({
          url: '../baodanDetail/baodanDetail',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.MESSAGE,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.setData({
                visible: false,
                cvn: "",
                card: true,
                focus: false,
                dis: true,
                date: ''
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              that.setData({
                visible: false,
                cvn: "",
                card: true,
                focus: false,
                dis: true,
                date: ''
              })
            }
          }
        })
      }
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "",
    page: 1,
    visible:"",
    card:true,
    detailOrder: [],
    cvn:"",
    date:"",
    focus:false,
    dis:true,
    cardId:"",
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //请求保单列表
    baodan(that);
    
  },
  //点击进入详情
  ontip:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '../baodanDetail/baodanDetail',
    })
    wx.setStorageSync("baodanOrder", index)
  },

  //追加购买
  buy:function(){
    var that = this;
    wx.showModal({
      title: '3.5元/份',
      content: '是否确认追加购买',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
         that.setData({
           visible:true,
           card:true
         })
          wx.setStorageSync("baodanToCard",true)
          wx.setStorageSync("baodan", true)
          wx.removeStorageSync("baodanCard")
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //进入信用卡列表
  choose:function(){
    wx.navigateTo({
      url: '../card/card',
    })
    wx.setStorageSync("baodanToCard", true)
  },
  cvn:function(e){
    this.setData({
      cvn:e.detail.value
    })
    var that = this;
    if (that.data.cvn.length == 3) {
      that.setData({
        focus: true
      })
    }
  },
  blurCvn:function(){
    // var that = this;
    // if(that.data.cvn.length==3){
    //   that.setData({
    //     focus:true
    //   })
    // }
  },
  date:function(e){
    this.setData({
     date: e.detail.value
    })
    var that = this;
    if (that.data.date.length == 4 && that.data.cvn.length == 3) {
      that.setData({
        dis: false
      })
    }else{
      that.setData({
        dis: true
      })
    }
  },
  cancel:function(){
    this.setData({
      visible:false,
      cvn:"",
      card:true,
      focus: false,
      dis: true,
      date:''
    })
  },
  sure:function(){
    var that = this;
    if(that.data.cvn==wx.getStorageSync("baodanCard").cvn2){
      if (that.data.date == wx.getStorageSync("baodanCard").expDate) {
        buyBaodan(that)
      } else {
        wx.showModal({
          title: '提示',
          content: "请输入正确的有效日期",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: "请输入正确的CVN",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
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
    if (wx.getStorageSync("baodanCard")) {
      var reg = /^(\d{4})\d+(\d{4})$/;
      var cardId = wx.getStorageSync("baodanCard").acctNo.replace(reg, "$1****$2");
      that.setData({
        card: false,
        listData:wx.getStorageSync("baodanCard"),
        cardId: cardId
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (wx.getStorageSync("baodan")==true){

    }else{
      this.setData({
        visible: false,
        cvn: "",
        card: true,
        focus: false,
        dis: true,
        date: ''
      })
    }
    
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    that.data.page++;
    console.log("加载")
    baodan(that)
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})