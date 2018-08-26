var util = require('../../utils/util.js');
var app = getApp();
var sign_key = app.globalData.sign_key;
var artInfoUrl = app.globalData.artInfoUrl;
var canTap=true,member_id,timer,_that,s=0;
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = false;
innerAudioContext.onPlay(() => {
    console.log('开始播放');
    timer = setInterval(_that.countDown,1000);
    _that.setData({pauseStatus:true})
});
innerAudioContext.onEnded((res) => {
    clearInterval(timer);
_that.setData({pauseStatus:false})
})
innerAudioContext.onStop((res) => {
    clearInterval(timer)
})
innerAudioContext.onPause((res) => {
    clearInterval(timer);
    _that.setData({pauseStatus:false})
})
innerAudioContext.onError((res) => {
    console.log(res.errMsg)
    clearInterval(timer);
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pauseStatus:false,
    audio_min:'00',
    audio_sis:'00',
    infoData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

        console.log(options);
        var id = parseInt(options.id);
        member_id = parseInt(options.id);
        this.getInfo(member_id,id);
        // let userInfo = wx.getStorageSync('userInfo');
        // if(userInfo){
        //     this.setData({head_url:JSON.parse(userInfo).avatarUrl})
        // }
        // var open = wx.getStorageSync('openid');
        // this.setData({bg_src:bgsrcArr[ind],firstCid:cidArr[ind],scene:sceneArr[ind],books:books})
        // var that = this;
        // bTimer = setInterval(function () {
        //     var open = wx.getStorageSync('openid');
        //     console.log(open);
        //     if(open !=''){
        //         clearInterval(bTimer);
        //         console.log(wx.getStorageSync('cid'));
        //         if(wx.getStorageSync('cid')){
        //             that.getBooks(wx.getStorageSync('cid'));
        //             that.setData({
        //                 firstCid:cidArr[parseInt(wx.getStorageSync('cid')-3)],
        //             });
        //         }else {
        //             that.getBooks(3);
        //         }
        //     }
        // },200);
  },
    //选择绘本
    getInfo:function (mem,id) {
        console.log(mem,id);
        var s = "id"+id+"member_id"+mem+sign_key;
        var sign = util.SHA256(s);
        var str = "?id="+id+"&member_id="+mem+"&sign="+sign;
        var that = this;
        wx.showLoading({
            title: '加载课程..',
        });
        console.log(artInfoUrl+str);
        wx.request({
            url: artInfoUrl+str,
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                that.setData({infoData:res.data.data});
                innerAudioContext.src = res.data.data.autio_path;
            },
            fail:function () {
                console.log('fffff')
            }
        })
    },
    clickRaz:function () {
      this.setData({razStatus:true})
    },
    clickLesson:function () {
      this.setData({razStatus:false})
    },
    audioPlay:function () {
        if(!innerAudioContext.paused){
            innerAudioContext.pause();
        }else {
            innerAudioContext.play();
            // this.setData({audio_sis:parseInt(innerAudioContext.duration)})
        }
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      // this.audioCtx = wx.createAudioContext("artAudio");
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      s = 0;
      _that = this;
      canTap = true;
      var that = this;
  },
    countDown:function ()
    {
        s++;
        console.log(s);
        this.setData({audio_sis:s});
        // return;
        // var now = new Date();
        // var leftTime=endDate.getTime()-now.getTime();
        // var leftTime=end*1000-now.getTime();
        // console.log(leftTime);
        var mm = parseInt(s/60 % 60, 10);//计算剩余的分钟数
        var ss = parseInt(s % 60, 10);//计算剩余的秒数
        mm = this.checkTime(mm);
        ss = this.checkTime(ss);//小于10的话加0
        console.log(mm)
        console.log(ss)
        this.setData({audio_min:mm,audio_sis:ss});
    },
    checkTime:function(i)
    {
        if (i < 10&&i>0) {
            i = "0" + i;
        }else if(i<=0){
            i = '00';
        }
        return i;
    },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      // canTap = true;
      innerAudioContext.stop();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      innerAudioContext.stop();
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
  onShareAppMessage: function (res) {
      return {
          title: '海量绘本，纯正美式发音，等你来读',
          path: '/pages/index/index?to=index',
          imageUrl:'/images/index/share_index.png',
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      }
  }
})