// pages/workInfo/workInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: null,
    telphone: null,
    videoUrl: '',
    name: null,
    start_time: null,
    end_time: null,
    num: null,
    text: null,
    img: [],
    img2:[],
    bwechaId: null,
    address: '',
    item1: '',
    item2: '',
    age: '',
    sex: '',
    username: '',
    companyName: ''
  },

  //打电话
  calling: function() {
    var phone = this.data.telphone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },

  //进入聊天
  talking: function(e) {
    var bwechaId = this.data.bwechaId;
    wx.navigateTo({
      url: '../talk/talk?bwechaId=' + bwechaId,
    })
  },

  //查看图片
  lookPic: function(e) {
    var src = 'https://xcx.misass.com'+e.currentTarget.dataset.itemIndex;
    var img2 = this.data.img2;
    var img = this.data.img;
    for(var i=0; i<img.length; i++) {
      var path = 'https://xcx.misass.com'+img[i];
      img2.push(path);
    }
    this.setData({
      img2: img2
    })
    console.log(img2);
    wx.previewImage({
      current: src,
      urls: this.data.img2,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.status);
    var that = this;
    this.setData({
      status: getApp().globalData.status
    })
    if (options.workid) {
      var workid = options.workid;
      if (this.data.status == 0) {
        wx.request({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Hiring/hiring_info',
          method: 'POST',
          data: {
            hiring_id: workid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            var imgPath = [];
            var imgPath2 = [];
            if (res.data.hiring.img != '') {
              imgPath2 = res.data.hiring.img.split(",");
              console.log(imgPath2);
              // for (var i = 1; i < imgPath2.length - 1; i++) {
              //   if (imgPath2[i] != '' || imgPath2[i] != undefined) {
              //     imgPath.push(imgPath2[i]);
              //   }
              // }
            }
            that.setData({
              address: res.data.hiring.address,
              start_time: res.data.hiring.start_time,
              end_time: res.data.hiring.end_time,
              name: res.data.hiring.name,
              num: res.data.hiring.num,
              text: res.data.hiring.text,
              img: imgPath2,
              videoUrl: res.data.hiring.video_url,
              bwechaId: res.data.hiring.wecha_id,
              item1: res.data.hiring.classification[2].name,
              item2: res.data.hiring.classification[1].name,
              telphone: res.data.hiring.user.responsible_phone,
              companyName: res.data.hiring.user.enterprise_name
            })
          }
        })
      }
    }else if(options.jobid) {
      var jobid = options.jobid;
      if(this.data.status == 1) {
        wx.request({
          url: 'https://xcx.misass.com/huadu/index.php?s=/api/Release/release_info',
          method: 'POST',
          data: {
            release_id: jobid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            that.setData({
              address: res.data.release.address,
              item1: res.data.release.classification[2].name,
              item2: res.data.release.classification[1].name,
              age: res.data.release.user.age,
              sex: res.data.release.user.sex,
              telphone: res.data.release.user.telphone,
              bwechaId: res.data.release.user.wecha_id,
              username: res.data.release.user.wecha_name
            })
          }
        })
      }
      // var obj = JSON.parse(options.obj);
      // var wecha_id = obj.wecha_id;
      // this.setData({
      //   item1: obj.item1,
      //   item2: obj.item2,
      //   address: obj.address,
      //   bwechaId: wecha_id
      // })
      // wx.request({
      //   url: 'https://xcx.misass.com/huadu/index.php?s=/api/User/info',
      //   method: 'POST',
      //   data: {
      //     wecha_id: wecha_id
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   },
      //   success: function(res) {
      //     console.log(res);
      //     that.setData({
      //       username: res.data.user.username,
      //       age: res.data.user.age,
      //       sex: res.data.user.sex,
      //       telphone: res.data.user.telphone           
      //     })
      //   }
      // })
    }
    
    // if(this.data.status == 0) {
    //   wx.request({
    //     url: 'https://xcx.misass.com/huadu/index.php?s=/api/Hiring/hiring_info',
    //     method: 'POST',
    //     data: {
    //       hiring_id: workid
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: function (res) {
    //       console.log(res);
    //       var imgPath = [];
    //       var imgPath2 = [];
    //       if(res.data.hiring.img != ''){
    //         imgPath2 = res.data.hiring.img.split(",");
    //         console.log(imgPath2);
    //         for(var i=1; i<imgPath2.length-1; i++) {
    //           if(imgPath2[i] != '' || imgPath2[i] != undefined) {
    //             imgPath.push(imgPath2[i]);
    //           }
    //         }
    //       }
    //       console.log(imgPath);
    //       that.setData({
    //         address: res.data.hiring.address,
    //         start_time: res.data.hiring.start_time,
    //         end_time: res.data.hiring.end_time,
    //         name: res.data.hiring.name,
    //         num: res.data.hiring.num,
    //         text: res.data.hiring.text,
    //         img: imgPath,
    //         videoUrl: res.data.hiring.video_url,
    //         bwechaId: res.data.hiring.wecha_id,
    //       })
    //     }
    //   })
    // }else if(this.data.status == 1) {
    //   wx.request({
    //     url: 'https://xcx.misass.com/huadu/index.php?s=/api/Release/release_info',
    //     method: 'POST',
    //     data: {
    //       hiring_id: workid
    //     },
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: function (res) {
    //       console.log(res);
    //     }
    //   })
    // }
    
    
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