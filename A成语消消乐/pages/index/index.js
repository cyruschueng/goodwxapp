// pages/before/before.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 3
  },
  onLoad(options){
    console.log(options);
    let that = this;
    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      if (options.scene) {
        var strs = new Array(); //定义一数组 
        strs = scene.split("_"); //字符分割 
        console.log(strs);
        console.log("friend_mid:", strs[2]);
        console.log("num:", strs[2]);
        var friend_mid = strs[2];
        var num = strs[3];
        that.setData({
          scene: options.scene,
          friend_mid: friend_mid,
          num: num
        })
        wx.setStorageSync('friend_mid', strs[2]);
        wx.setStorageSync('num', strs[3])
        // wx.redirectTo({
        //   url: '../shareMusic/shareMusic?mid=' + strs[2] + '&num=' + strs[3],
        // })
      }
    }
  },
  onShow: function () {
    const that = this;
    let time = that.data.time;
    var second = that.data.second;
    let scene = that.data.scene;

    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    var id = extConfig.kid;
    console.log("kid",extConfig.kid);

    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements",
      data:{
        operator_id: id
      },
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            head_adver
          })

          var inter = setInterval(function () {
            if (second <= 1) {
              clearInterval(inter);
              if (scene != "undefined" && scene != "" && scene) {
                console.log('shareMusic',scene);
                // wx.redirectTo({
                //   url: '../shareMusic/shareMusic?friend_mid=' + that.data.friend_mid + '&num=' + that.data.num,
                // })
              }else{
                  wx.reLaunch({
                    url: '../indexs/indexs',
                  })
              }
            }
            second--;
            console.log(second);
            that.setData({
              second,
              inter
            })
          }, 1000)
        }
      }
    })
  },

  jumpAd() {
    let that = this;
    var inter = this.data.inter;
    let scene = that.data.scene;
    clearInterval(inter);
    if (scene != "undefined" && scene != "" && scene) {
      console.log('shareMusic', scene);
      // wx.redirectTo({
      //   url: '../shareMusic/shareMusic?friend_mid=' + that.data.friend_mid + '&num=' + that.data.num,
      // })
    } else {
      wx.reLaunch({
        url: '../indexs/indexs',
      })
    }
  },
})
