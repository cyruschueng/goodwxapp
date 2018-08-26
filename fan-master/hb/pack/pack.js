// create by zhangred 2017/11/16
const app = getApp();
const util = require('../utils/util.js');
Page({
  data: {
    ajaxurl:app.globalData.apiurl,
    data:{},
    winer:{"total":0,"geted":0,"money":0,"list":[]},
    playid:0,
    isloading:false,
    id:0
  },
  onLoad: function (opt) {
    this.setData({
      id:opt.id
    });
    var self = this;
    // 页面设置
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff4e3b'
    });
    wx.setNavigationBarTitle({
      title: '口令红包'
    });

    // 获取语音口令信息
    var self = this;
    wx.request({
      url: self.data.ajaxurl+'red_packs/'+opt.id+'?v='+(new Date().getTime()),
      header: {
          "Authorization":"PlainUserToken teststr"
      },
      success: function(res) {
        console.log(1,res)
        if(res.statusCode==200){
         self.setData({
          data:res.data
         });
         self.getlist(opt.id);
        }else{
          wx.showModal({
            title: '提示',
            content: '提示错误信息字段',
            showCancel:false
          })
        };
      }
    })
  },
  getlist:function(id){
    // // 获取口令红包获得者列表
    // var self = this;
    // wx.request({
    //   url: self.data.ajaxurl+'winerinfo.json?v='+(new Date().getTime()), //仅为示例，并非真实的接口地址
    //   success: function(res) {
    //     if(res.data.code){
    //       var dt = res.data.data;
    //       dt.list.map(ls=>{
    //         ls.timestr = util.formatTime(new Date(ls.time),1);
    //         return ls;
    //       })
    //       self.setData({
    //         winer:res.data.data
    //       })
    //     }else{
    //       wx.showModal({
    //         title: '提示',
    //         content: '提示错误信息字段',
    //         showCancel:false
    //       })
    //     };
    //   }
    // })
  },
  playvoice:function(e){ // 播放语音
    var self = this;
    var id = e.currentTarget.dataset.id,
      path = e.currentTarget.dataset.path;
    if(this.data.playid==id){ // 如果在播放此语音，暂停
      wx.stopVoice();
      self.setData({
        playid:0
      });
      return false;
    };
    self.setData({
      playid:id
    });
    console.log(path)
    wx.playVoice({
      filePath: path,
      complete: function(){
        console.log('done')
        self.setData({
          playid:0
        });
      }
    })
  },
  startyy:function(e){ // 开始录音
    var self = this;
    wx.startRecord({
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        // 此处需上传语音判断

      },
      fail: function(res) {
         //录音失败
      }
    })
  },
  endyy:function(e){ // 中断录音
    wx.stopRecord()
  },
  zhuanfa:function(){
    var self = this;
    if(self.data.isloading){
      return false;
    };
    self.setData({
      isloading:true
    });
    wx.showLoading({
      title: '正在生成\r\n分享图片'
    });
    wx.request({ // 生成图片
      url: self.data.ajaxurl+'back.json?v='+(new Date().getTime()), //仅为示例，并非真实的接口地址
      success: function(res) {
        wx.hideLoading();
        self.setData({
          isloading:false
        });
        if(res.data.code){
          wx.setStorage({
            key:"shareimgurl",
            data:"images/003.jpg"
          });
          wx.navigateTo({
            url: '/pack/packshare?id=1'
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '提示错误信息字段',
            showCancel:false
          });
        };
      }
    })

  }
})
