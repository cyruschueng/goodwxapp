// pages/ranking/ranking.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
var interval = '';
var arrSmallPics = [];
Page({
  data: {
    gid:'',       // 群id
    aid:'',       // 活动id
    ainfo:'',     // 海报信息
    avatar: '',
    posterSrc:'',
    showPuzzle:false,
    useTime:0,
    // test1:'../../image/poster2018.png',
    // test2: '../../image/2018.png',
    preIndex:'',
    prePic:'',
    arrPic0:[],   // 原始九宫格
    arrPic: [],   // 交换后的九宫格
    arrRank:[],   // 拼图成绩排名
    hasMe:'',     // 是否已拼过该海报
    canvasId:'myCanvas'
  },
  onLoad: function (options) {
    that = this;
    let aid = options.aid;
    let gid = options.gid;
    that.setData({ 
      aid: aid?aid:26,
      gid: gid?gid:''
    })
    wx.showShareMenu({
      withShareTicket: true
    })    
  },
  onReady: function () {
  
  },
  onShow: function () {    
    that.setData({
      avatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '../../image/2018.png' 
    });
    that.getActiveInfo();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ret) {
    return {
      title: "海报拼图赢赏金",
      path: "/pages/share?aid=" + that.data.aid,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {       // 将encryptedData、iv传给后台解密=>获取群id
            console.log("ranking界面转发成功：");
            console.log(res);
          },
          fail: function (res) {
            console.log("ranking界面转发失败：");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log("ranking转发失败，来自：" + ret.from);
        console.log(res);
      }
    }
  },
  getActiveInfo:function(){
    let params = {
      _C: 'Act',
      _A: 'selectOne',
      id: that.data.aid,
      group_id: that.data.gid
    }
    common.request("getActiveInfo", that, "form", params);
  },
  urlTarget:function(e){
    const name = e.currentTarget.dataset.url;
    common.urlTarget(name,"switchTab");
  },
  openPuzzle:function(){
    let ainfo = that.data.ainfo;
    if(that.data.hasMe){
      common.showErrorTip("此拼图您已拼过");
      //return false;
    }
    if (ainfo.limit_sex > 0){           // 性别限制1男，2女
      if (ainfo.limit_sex != app.globalData.userInfogender){
        common.showErrorTip("此拼图限制性别");
        return false;
      }
    }
    if (ainfo.limit_distance > 0) {     // 距离限制
      // 计算当前与海报距离
      
    }
    // 切割的图片数组打散
    that.randomPics();
    that.setData({showPuzzle:true});
    var time = 0;    
    interval = setInterval(function(){
      time += 1;
      that.setData({useTime:time})
    },1000)
  },
  cancelGame:function(){
    clearInterval(interval);
    that.setData({
      showPuzzle:false,
      useTime:0,
      preIndex:'',
      prePic:'',
      arrPic: that.data.arrPic0   // 恢复原九宫格位置
    })
  },  
  onSuccess: function (methodName, res) {
    console.log(methodName);
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        let info = data.info;
        switch (methodName) {
          case 'getActiveInfo':
            if(info){
              var curInfo = info;
              let poster = app.globalData.imgDir + info.pic
              //curInfo.pic = poster;
              that.setData({ 
                ainfo: curInfo,
                posterSrc: poster,
                arrRank: data.user_data_one_group,
                hasMe: data.is_i_in
              })
              that.canvas();
            }
            break;
          case 'insertResult':
            that.setData({
              showPuzzle:false
            })
            // 提示成功以及最终用时


            // 更新当前组海报排名
            thatgetActiveInfo();
            break;
        }

      } else {
        console.log(ret);
      }
    } else {
      console.log("接口有问题：" + methodName);
    }
  },
  onFail: function (methodName) {
    console.log("接口调用失败：" + methodName);
  },
  onComplete: function (methodName) { 

  },
  exchangePic: function (e) {
    let dataset = e.currentTarget.dataset;
    let curIndex = dataset.index;
    let curPic = dataset.src;
    if (!that.data.preIndex){
      that.setData({
        preIndex: curIndex,
        prePic: curPic
      })
    }else{
      // 交换
      let arrPic0 = that.data.arrPic0;
      var arrPic = that.data.arrPic;
      let preIndex = that.data.preIndex;
      let prePic = that.data.prePic;
      arrPic[preIndex] = curPic;
      arrPic[curIndex] = prePic;
      that.setData({
        arrPic: arrPic
      })
      var flag = true;
      for(let [index,elem] of arrPic.entries()){       
        if (elem != arrPic0[index]){
          flag = false;
        }
      }
      if (flag){
        common.showSuccessTip("拼图成功！");
        clearInterval(interval);
        // 插入一条成绩
        let _DATA = {
          'act_id' :that.data.aid,// 活动id
          'group_id' :that.data.gid,//分组id
          'use_time' :that.data.useTime,// 用时
        }
        let params = {
          _C:'Act',
          _A:'insertUser',
          _DATA: JSON.stringify(_DATA)
        }
        common.request("insertResult",that,"form",params);
      }
      // 交换完毕清空上一次的
      that.setData({
        preIndex: '',
        prePic: ''
      })
    }
  },
  randomPics:function(){
    var arrPic0 = that.data.arrPic0;
    var arrPic = arrPic0.concat();
    arrPic = arrPic.sort(function () {
      return (0.5 - Math.random());
    })
    that.setData({
      arrPic: arrPic
    })
  },
  canvas:function(){ 
    var arrSmallPics = [];
    const ctx = wx.createCanvasContext(that.data.canvasId);
    ctx.save();
    ctx.drawImage(that.data.posterSrc, 0, 0, 270, 270);
    ctx.restore();
    ctx.draw();
    setTimeout(function(){
      that.getSmallPics(0);
    },500)    
    
  },
  getSmallPics: function (index,x,y){
    let nextIndex = index + 1;
    wx.canvasToTempFilePath({
      x: x,
      y: y,
      width: 90,
      height: 90,
      destWidth: 90,
      destHeight: 90,
      canvasId: that.data.canvasId,
      success: function (res) {        
        if (index < 9){
          arrSmallPics[index] = res.tempFilePath;
          that.getSmallPics(nextIndex, (nextIndex % 3) * 90, parseInt(nextIndex / 3) * 90);
          if(index == 8){
            that.setData({
              arrPic0: arrSmallPics,
              arrPic: arrSmallPics
            })
          }
        }
      },
      fail:function(res){
        console.log(res);
      }
    })
  }
})