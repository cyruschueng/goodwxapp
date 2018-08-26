var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config');
var innerAudioContext = '';
Page({
  data: {
    notify_ids: [],
    notifies: [],
    notify: "",
    loaded: false,
    shared_ids: []
  },
  onLoad: function (options) {
    app.globalData.notifyReload = 1;
    that = this;
    console.log(options.notify_ids.split("@"))
    var notify_ids = options.notify_ids.split("@");
    that.setData({
      notify_ids: notify_ids
    });
    app.getImprint(function (imprint) {
      util.AJAX2(config.notifiesQueryUrl, "加载中", { notify_ids: notify_ids }, "post", { imprint: imprint }, function (res) {
        if (res.data.status == "ok") {
          console.log(res.data.notifies);
          var notifies = res.data.notifies;
          notifies.forEach(function (item) {
            item.feedback_type = util.getFeedBackType(item.feedback_type);
          });
          that.setData({
            loaded: true,
            notifies: notifies,
            notify: res.data.notifies[0],
            winWidth: app.globalData.winWidth, 
            winHeight: app.globalData.winHeight
          });
        } else {
          wx.showToast({
            title: '加载出现异常',
          })
        }
      });
    });
  },

  ListpreviewImage: function (e) {
    var images = e.currentTarget.dataset.imgurls;
    var image = e.currentTarget.dataset.imgurl;
    var newImages = new Array();
    var isStart = false;
    images.forEach(function (item) {
      if (item == image) {
        isStart = true;
      }
      if (isStart) {
        newImages.push(item);
      }
    })
    wx.previewImage({
      urls: newImages,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },





  playStart: function (e) {
    var from = e.currentTarget.dataset.from;
    var tmp_record = e.currentTarget.dataset.record;
    var record_id = e.currentTarget.dataset.record_id;
    if (!innerAudioContext) {
      innerAudioContext = wx.createInnerAudioContext();
    }
   if (from == "notify") {
      if (that.data.tmp_record) {
        innerAudioContext.stop();
      }
      that.setData({ tmp_record: tmp_record, current_record_id: "" });
    }
    var tempFilePath = that.data.tmp_record;
    innerAudioContext.autoplay = true
    innerAudioContext.src = tempFilePath;
    console.log(tempFilePath);
    innerAudioContext.onPlay(() => {
      that.setData({ playing: true });
      that.playAnimation();
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    });
    innerAudioContext.onEnded(() => {
      that.setData({ playing: false });
    })
    innerAudioContext.onStop(() => {
      console.log('暂时一个');
    })
  },

  playAnimation: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      playAnimation: animation.export()
    })
    var n = 0;
    //连续动画需要添加定时器,所传参数每次+1就行
    var interval = setInterval(function () {
      if (!that.data.playing) {
        clearInterval(interval);
      }
      n = n + 1;
      console.log(n);
      if (n % 2 == 0) {
        this.animation.scale(0.5, 0.5).step();
        if (!that.data.playing) {
          this.animation.scale(1, 1).step();
        }

      } else {
        this.animation.scale(1, 1).step()
      }
      //this.animation.rotate(180 * (n)).step()
      this.setData({
        playAnimation: this.animation.export()
      })
    }.bind(this), 500)

  },










  onShareAppMessage: function (options) {
    var id = options.target.id;
    var notify = "";
    var shared_ids = that.data.shared_ids;
    that.data.notifies.forEach(function (item) {
      if (item._id == id) {
        notify = item;
      }
    });
    var title = notify.title;
    var path = '/example/notify/notify?from=&_id=' + notify._id + '&cid=' + notify.cls+'&gid='+notify.open_gid;
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });

    var imageUrl="../../image/a0.jpg";
    if(notify.type==0){
      if (notify.subject == '语文' || notify.subject == '数学' || notify.subject == '英语'){
        imageUrl = "../../image/" + notify.subject + ".jpg";
      }
    }else{
      imageUrl = "../../image/b1.jpg";
    }
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {
        if (!res.shareTickets) {
          wx.showModal({
            title: '提示',
            content: '请分享到对应的班级群',
          })
          return;
        }
        app.getImprint(function (imprint) {
          app.getGid(imprint, res.shareTickets[0],function(resData,err){
             if(err){
               return;
             }
             if (resData.status == "ok" && resData.bind && resData.gid == notify.open_gid) {
               
               if (shared_ids.indexOf(id) == -1) {
                 shared_ids.push(id);
               }
               if (that.data.notify_ids.length > shared_ids.length){
                 wx.showToast({
                   title: 'ok,继续分享',
                   icon: 'success',
                   duration: 1000
                 });
               }
               if (that.data.notify_ids.length == shared_ids.length) {
                 wx.showToast({
                   title: '全部分享成功',
                   icon: 'success',
                   duration: 1000
                 });
                 setTimeout(function () {
                   app.globalData.notifyReload=1;
                   wx.navigateBack({
                     
                   })
                  //  wx.redirectTo({
                  //    url: '../start/start',
                  //  })
                 }.bind(this), 1000);
               }
             } else if (resData.status == "ok" && resData.gid != notify.open_gid) {
               wx.showModal({
                 title: '提示',
                 content: '您分享的群和关联的群不一致，请仔细核对',
               })
             } else {
               wx.showModal({
                 title: '提示',
                 content: '出现未知错误,请重新分享一下',
               })
             }
           })
        });
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },
  navigate: function (e) {
    wx.navigateTo({
      url: '../start/start'
    })
  },
});