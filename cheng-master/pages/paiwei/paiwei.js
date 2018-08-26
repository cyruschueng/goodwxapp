// pages/paiwei/paiwei.js
Page({
  data: {
    comeIn:true
  },
  onLoad: function (options) {
    console.log('options:', options);
    this.setData({
      houseImg: options.houseImg,
      houseName: options.houseName,
      housemid: options.housemid,
      otherImg: options.otherImg,
      otherName: options.otherName,
      room_id: options.room_id,
      othermid: options.othermid
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    let that = this;
      setTimeout(function(){
        console.log('../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.housemid + '&housemid=' + that.data.housemid);
        wx.reLaunch({
          url: '../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.housemid + '&housemid=' + that.data.housemid + '&room_id=' + that.data.room_id
        },5000)
      })
  },
 
})