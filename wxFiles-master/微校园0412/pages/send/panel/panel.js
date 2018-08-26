var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barflag:0,
    list:[],
    list1:[],
    list2:[],
    loading:true,
    show:true
  },
  changeBar: function (e){
    var id = e.currentTarget.dataset.id;
    this.setData({barflag:id})
  },
  navToMysend: function (e){
    wx.redirectTo({
      url: '/pages/mypsy/mypsy',
    })
  },
  navToDetail:function(e){
    wx.navigateTo({
      url: '/pages/order/orderDetail/orderDetail?value=1&id='+e.currentTarget.dataset.na,
    })
  },
  linked: function(){
    wx.connectSocket({
      url: app.globalData.WS,
    })
  },
  dook: function(e){
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psysure.do',
      data: { id: that.data.list1[e.currentTarget.dataset.id].id, psyid: wx.getStorageSync("appid") },
      success:function(res){
        if (res.data == 1) {
          var li = that.data.list1;
          var temp = [];
          temp.push(li[e.currentTarget.dataset.id]);
          li.splice(e.currentTarget.dataset.id,1);
          wx.showToast({
            title: '确认成功',
            duration: 800
          })
          var l2 = that.data.list2;

          for (var i = 0; i < l2.length; i++) {
            temp.push(l2[i])
          }
          that.setData({ list1: li, list2: temp });
        } else {
          wx.showToast({
            title: '确认失败',
            duration: 800,
            image: '/images/60.png'
          })
        }
      }
    })
  },
  recapt: function(e){
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psyjs.do',
      data:{id:that.data.list[e.currentTarget.dataset.id].id,psyid:wx.getStorageSync("appid")},
      success: function (res){
        if(res.data == 1){
          var li = that.data.list;
          var temp = [];
          temp.push(li[e.currentTarget.dataset.id]);
          li.splice(e.currentTarget.dataset.id,1);
          wx.showToast({
            title: '接单成功',
            duration:800
          })
          var l1 = that.data.list1;
          
          for(var i=0;i<l1.length;i++){
            temp.push(l1[i])
          }
          that.setData({list:li,list1:temp});
        }else{
          wx.showToast({
            title: '兄弟手太慢了',
            duration: 800,
            image:'/images/60.png'
          })
          var li = that.data.list;
          var temp = [];
          temp.push(li[e.currentTarget.dataset.id]);
          li.splice(e.currentTarget.dataset.id, 1);
          var l1 = that.data.list1;

          for (var i = 0; i < l1.length; i++) {
            temp.push(l1[i])
          }
          that.setData({ list: li });
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    setInterval(function(){
      wx.getLocation({
        success: function (res) {
          console.log(res)
          wx.sendSocketMessage({
            data: JSON.stringify({ protocol: 1005, id: wx.getStorageSync("appid"), location: res.latitude + "," + res.longitude, })
          })
        },
      })
    },10000)
    wx.connectSocket({
      url: app.globalData.WS,
    })
    wx.onSocketClose(function (res) {
      console.log('已断开')
      that.setData({
        show: false
      })
      wx.connectSocket({
        url: app.globalData.WS,
      })
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！');
      that.setData({
        show: true
      })
      wx.sendSocketMessage({
        data: JSON.stringify({ protocol: 1001, id: app.globalData.ID, address: wx.getStorageSync('psyaddress') }),
      });
    })
    wx.onSocketMessage(function (res) {
      console.log(res.data)
      var re = JSON.parse(res.data);
      var list = that.data.list;
      var li=[];
      li.push(re);
      for(var i=0;i<list.length;i++){
        li.push(list[i]);
      }
      console.log( JSON.parse(res.data))
      that.setData({list:li});
      wx.vibrateLong({
        complete:function(res){
          wx.playBackgroundAudio({
            dataUrl: app.globalData.IP + 'controller/voice/blk.mp3',
            title: '您有新订单,请及时处理',
            coverImgUrl: ''
          })
        }
      })
    });
    wx.request({
      url: app.globalData.IP + 'wx/findpsyorder.do',
      data:{id:wx.getStorageSync("appid")},
      success: function (res) {
        console.log(res)
        var l = [];
        var l1 = [];
        var l2 = [];
        for(var i=0;i<res.data.length;i++){
          if(res.data[i].paystatus == '1'){
            l.push(res.data[i]);
          } else if (res.data[i].paystatus == '2' || res.data[i].paystatus == '4'){
            l1.push(res.data[i])
          } else if (res.data[i].paystatus == '3' || res.data[i].paystatus == '5' || res.data[i].paystatus == '6'){
            l2.push(res.data[i])
          }
        }
        that.setData({ list: l, list1: l1, list2: l2, loading: false, url: app.globalData.IP + "controller/"})
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

 
})