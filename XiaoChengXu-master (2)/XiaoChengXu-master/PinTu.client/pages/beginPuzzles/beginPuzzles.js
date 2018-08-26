// pages/beginPuzzles/beginPuzzles.js
const app = getApp();
const common = require('../../js/common.js');
var that = '';
var intervalUseTime = '';
var arrSmallPics = [];
var arrPic0 = [];
var arrPic = [];
Page({
  data: {
    gid: '',       // 群id
    aid: '',       // 活动id
    ainfo: '',     // 海报信息
    avatar: '',
    posterSrc: '',
    showPuzzle: false,
    useTime: 0,
    preIndex: '',
    prePic: '',
    arrPic0: [],   // 原始九宫格
    arrPic: [],   // 交换后的九宫格
    curGroup: [],   // 当前组信息
    hasMe: '',     // 是否已拼过该海报
    canvasId: 'myCanvas',
    imgDir:'',
    showSuccessModal: false,
    personalPuzzles: '',  // 当前微信用户拼图用的时间、活动结束后就得赏金等信息
    showInitiatorModal:false,   // 显示海报发起人信息
    phoneInfo:'',
    diffDistance:0,    // 差距km
    userDistance:0,     // 用户实际距离
    userLng: '',   // 用户经度
    userLat:'',
    bigButton:{
      bg:"bgyellow",
      text:"开始拼图赢赏金",
      show:false,   // 是否显示content
      content:""
    },
    mapMarkers:[],
    markers: [{       // 标记点
      iconPath: "../../image/location2.png",
      id: 0,
      longitude: 113.324520,
      latitude: 23.099994,      
      width: 40,
      height: 40
    }],
    polyline: [{      // 路线
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{      // 控件
      id: 1,
      iconPath: '../../image/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 5,
        height: 12
      },
      clickable: true
    }]
  },
  onLoad: function (options) {
    that = this;
    let aid = options.aid;
    let gid = options.gid;
    that.setData({
      imgDir: app.globalData.imgDir,
      aid: aid ? aid : 31,
      gid: gid ? gid : ''
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    let phoneInfo = app.globalData.phoneInfo;
    that.setData({ phoneInfo: phoneInfo});
  },
  onReady: function () {
    wx.showLoading({
      title: '加载中...',
    })

  },
  onUnload:function(){
    arrSmallPics = [];
    arrPic0 = [];
    arrPic = [];
    clearInterval(intervalUseTime);
    that.setData({ useTime:0})    
  },
  onShow: function () {    
    that.setData({
      avatar: app.globalData.userInfo ? app.globalData.userInfo.avatarUrl : '../../image/2018.png',
      useTime:0,
      imgDir: app.globalData.imgDir
    });
    clearInterval(intervalUseTime);
    that.getActiveInfo();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ret) {
    var diffPeople = 10 - that.data.curGroup.list.length;
    return {
      title: "【仅剩" + diffPeople+"人】快来拼图赢赏金",
      path: "/pages/index/index?aid=" + that.data.aid,
      // imageUrl:"../../image/2018.png",
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {       // 将encryptedData、iv传给后台解密=>获取群id
            console.log("beginPuzzles界面转发成功：");
            console.log(res);
          },
          fail: function (res) {
            console.log("beginPuzzles界面转发失败：");
            console.log(res);
          }
        })
      },
      fail: function (res) {
        console.log("beginPuzzles转发失败，来自：" + ret.from);
        console.log(res);
      }
    }
  },
  getActiveInfo: function () {    
    let params = {
      _C: 'Act',
      _A: 'selectOne',
      id: that.data.aid,
      group_id: that.data.gid
    }
    common.request("getActiveInfo", that, "form", params);
  },
  urlTarget: function (e) {
    const name = e.currentTarget.dataset.url;
    common.urlTarget(name, "switchTab");
  },
  openPuzzle: function () {
    let ainfo = that.data.ainfo;
    if (that.data.curGroup.is_finish){         // 1代表活动结束
      //common.showErrorTip("该活动已结束");
      return false;
    }
    if (that.data.hasMe) {
      //common.showErrorTip("该拼图您已玩过");
      return false;
    }
    if (ainfo.limit_sex > 0) {           // 性别限制1男，2女
      if (ainfo.limit_sex != app.globalData.userInfo.gender) {
        //ainfo.limit_sex==1 && common.showErrorTip("男生才能玩");
        //ainfo.limit_sex== 2 && common.showErrorTip("女生才能玩");
        return false;
      }
    }
    if (ainfo.limit_distance > 0) {     // 距离限制
      let diffDistance = Math.abs(that.data.diffDistance).toFixed(2);
      //common.showErrorTip("超出" + diffDistance+"公里" );
      return false;

    }else{
      // 切割的图片数组打散
      if (!arrPic0) {
        setTimeout(function () {
          that.viewPuzzle();
        }, 300)
      } else {
        that.viewPuzzle();
      }

    }    
    
  },
  viewPuzzle:function(){
    that.randomPics();    
  },
  startAddTime:function(){
    that.setData({ showPuzzle: true });
    var time = 0;
    intervalUseTime = setInterval(function () {
      time += 1;
      that.setData({ useTime: time })
    }, 1000)
  },
  cancelGame: function () {
    clearInterval(intervalUseTime);
    that.setData({
      showPuzzle: false,
      useTime: 0,
      preIndex: '',
      prePic: '',
      arrPic: that.data.arrPic0   // 恢复原九宫格位置
    })
    arrPic = arrPic0.concat();
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        let info = data.info;
        switch (methodName) {
          case 'getActiveInfo':
            if (info) {
              var curInfo = info;
              let poster = app.globalData.imgDir + info.pic;
              var personalPuzzles = '';
              if (data.is_i_in){
                personalPuzzles = data.i.act_info;
              }
              that.setData({
                ainfo: curInfo,
                posterSrc: poster,
                curGroup: data.user_data_one_group,
                hasMe: data.is_i_in,
                gid: data.group_id,
                personalPuzzles: personalPuzzles
              })
              var bigButton = {
                bg: "bgc",
                text: "",
                show: false,
                content: ""
              }              
              if (curInfo.limit_distance > 0 && that.data.userDistance > curInfo.limit_distance){
                let limitDistance = parseFloat(curInfo.limit_distance);
                if (curInfo.limit_sex > 0) {           // 性别限制1男，2女
                  if (curInfo.limit_sex != app.globalData.userInfo.gender) {
                    if (curInfo.limit_sex == 1) {
                      bigButton.content = "商家限制了距他" + limitDistance.toFixed(1)+"公里的男生才能拼这张海报";
                      bigButton.show = true;
                      bigButton.text = "女士勿进";
                    } else {
                      bigButton.content = "商家限制了距他" + limitDistance.toFixed(1) +"公里的女生才能拼这张海报";
                      bigButton.show = true;
                      bigButton.text = "男士勿进";
                    }
                  }
                  that.setData({ bigButton: bigButton })  
                } else{
                  bigButton.content = "商家限制了距他" + limitDistance.toFixed(1) + "公里的人才能拼这张海报";
                  bigButton.show = true;
                  bigButton.text = "再靠近一点";
                  that.setData({ bigButton: bigButton })  
                }

              }else{
                if (curInfo.limit_sex > 0) {           // 性别限制1男，2女
                  if (curInfo.limit_sex != app.globalData.userInfo.gender) {
                    if (curInfo.limit_sex == 1) {
                      bigButton.text = "女士勿进";
                      bigButton.show = true;
                      bigButton.content = "商家限制了男生才能拼这张海报";
                    } else {
                      bigButton.text = "男士勿进";
                      bigButton.show = true;
                      bigButton.content = "商家限制了女生才能拼这张海报";
                    }
                    that.setData({ bigButton: bigButton })  
                  }
                  
                }

              }                    
              if (data.user_data_one_group.is_finish) {
                bigButton.text = "活动已结束";
                that.setData({ bigButton: bigButton })
              }
              if (data.is_i_in && !data.user_data_one_group.is_award) {    // 已拼过，但活动还未结束
                bigButton.text = "用时" + personalPuzzles.use_time + "秒";
                that.setData({ bigButton: bigButton })
              }
              if (data.user_data_one_group.is_award && data.is_i_in) {  // 拼图成功
                bigButton.text = "用时" + data.i.act_info.use_time + "秒，获得赏金" + data.i.act_info.get_award + "元";
                that.setData({ bigButton: bigButton })
              }                    
              wx.hideLoading();
              that.canvas();
              that.openScopeMap();    // 计算用户距离
            }
            break;
          case 'insertResult':
            that.setData({
              showPuzzle: false
            })
            // 提示成功以及最终用时


            // 更新当前组海报排名
            that.getActiveInfo();
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
    if (!that.data.preIndex) {
      that.setData({
        preIndex: curIndex,
        prePic: curPic
      })
    } else {
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
      for (let [index, elem] of arrPic.entries()) {
        if (elem != arrPic0[index]) {
          flag = false;
        }
      }
      if (flag) {
        common.showSuccessTip("拼图成功！");          
        that.setData({ showSuccessModal: true })        // 拼图成功，展示头像
        clearInterval(intervalUseTime);
        // 插入一条成绩
        let _DATA = {
          'act_id': that.data.aid,// 活动id
          'group_id': that.data.gid,//分组id
          'use_time': that.data.useTime,// 用时
        }
        let params = {
          _C: 'Act',
          _A: 'insertUser',
          _DATA: JSON.stringify(_DATA)
        }
        common.request("insertResult", that, "form", params);
      }
      // 交换完毕清空上一次的
      that.setData({
        preIndex: '',
        prePic: ''
      })
    }
  },
  randomPics: function () {    
    var flag = false;   // 记录是否打散
    var arrPic = [];
    wx.showLoading({
      title: '加载中...',
    })
    let intervalArr = setInterval(function(){
      arrPic = arrPic0.concat();
      arrPic = arrPic.sort(function () {
        console.log("打散中...");
        flag = true;
        return (0.5 - Math.random());
      })
      if (flag){
        that.setData({
          arrPic: arrPic
        })
        that.startAddTime();
        clearInterval(intervalArr);
        console.log("打散成功...");
        wx.hideLoading();
      }
    },200);
    
  },
  canvas: function () {
    var tempPoster = '';
    var posterSrc = that.data.posterSrc;
    wx.getImageInfo({
      src: that.data.posterSrc, //"https://pintu.xizai.com/meinv1.jpg"
      success:function(res){
        //console.log(res);
        tempPoster = res.path;
        var arrSmallPics = [];
        let ctx = wx.createCanvasContext(that.data.canvasId);
        ctx.setGlobalAlpha(0.8);
        ctx.drawImage(tempPoster, 0, 0, 270, 270);
        ctx.draw();
        setTimeout(function () {
          that.getSmallPics(0);
        }, 500)
      },
      fail:function(res){
        console.log(res);
      }
    })
    
  },
  getSmallPics: function (index, x, y) {
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
        if (index < 9) {
          arrSmallPics[index] = res.tempFilePath;
          that.getSmallPics(nextIndex, (nextIndex % 3) * 90, parseInt(nextIndex / 3) * 90);
          //console.log(index + "---" + arrSmallPics[index]);
          if (index == 8) {
            arrPic0 = arrSmallPics;
            arrPic = arrPic0.concat();
            that.setData({
              arrPic0: arrSmallPics,
              arrPic: arrSmallPics,
            })
          }
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  getDistance: function (lat1, lng1, lat2, lng2){     // 两个经纬度间的距离
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  openScopeMap: function () {    // 开启地图授权
    wx.getLocation({
      success: function (res) {        
        console.log("用户当前latitude:" + res.latitude);
        console.log("用户当前longitude:" + res.longitude);
        let ainfo = that.data.ainfo;
        let posterLat = ainfo.user_info.lat;
        let posterLng = ainfo.user_info.lng;
        let userMap = res;
        var distance = that.getDistance(posterLat, posterLng, userMap.latitude, userMap.longitude);// km
        console.log("海报posterLat:" + posterLat + "，posterLng：" + posterLng);
        console.log("拼图者latitude:" + userMap.latitude + "，longitude：" + userMap.longitude);
        let diffDistace = (distance - ainfo.limit_distance).toFixed(2);
        that.setData({
          userDistance: distance.toFixed(2),
          diffDistance: diffDistace,
          userLng: userMap.longitude,   // 用户经度
          userLat: userMap.latitude
        })
        if (ainfo.limit_distance < distance) {          
          //common.showErrorTip("超出范围" + diffDistace+"km");
          console.log(("超出范围" + diffDistace + "km"));
          return false;
        }
        var mapMarkers = [];
        var item = {};
        item.id = 2;
        item.iconPath = "../../image/location2.png";
        item.latitude = userMap.latitude; //23.099994
        item.longitude = userMap.longitude;//113.324520
        // item.width = 50;
        // item.height = 50;
        mapMarkers.push(item);
        item.id = 1;
        item.iconPath = "../../image/location.png";
        item.latitude = posterLat;//23.10
        item.longitude = posterLng;//113.33
        item.width = 8;
        item.height = 20;
        mapMarkers.push(item);

        var mapPolyline = that.data.polyline.concat();
        var points = mapPolyline[0].points.concat();
        points[0].longitude = posterLng;    // 海报位置112.85637
        points[0].latitude = posterLat;  //28.21294
        points[1].longitude = userMap.longitude;    // 用户位置112.93134
        points[1].latitude = userMap.latitude;  //28.23529
        mapPolyline[0].points = points;

        that.setData({
          mapMarkers: mapMarkers,
          markers: mapMarkers,
          polyline: mapPolyline
        })
      },
      fail: function () {
        common.showErrorTip("位置未授权");
        setTimeout(function () {
          that.openSetting();
        }, 1500)
      }
    })

  },
  openSetting: function () {   // 打开授权设置引导界面
    wx.openSetting({
      success: function (res) {
        if (res.authSetting['scope.userLocation']) {
          that.openScopeMap();
        }
      }
    });
  },
  contactPoster:function(){
    wx.makePhoneCall({
      phoneNumber: that.data.ainfo.user_info.mobile.toString(),
    })
  },
  priviewImg:function(e){
    let curIndex = e.currentTarget.dataset.index;
    let curSrc = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [curSrc],
      success:function(res){

      },
      fail:function(res){
        console.log(res);
      }
    })
  },
  closeSuccessModal: function () {
    that.setData({ showSuccessModal: false })
  },
  closeInitiatorModal:function(){   // 关闭发起人信息
    that.setData({ showInitiatorModal:false})
  },
  openMap:function(){
    let ainfo = that.data.ainfo;
    wx.openLocation({
      latitude: ainfo.user_info.lat,
      longitude: ainfo.user_info.lng,
      success:function(res){
        console.log(res);
      },
      fail:function(res){
        console.log(res);
      }
    })

  },
  openInitiatorModal:function(){
    that.setData({ showInitiatorModal:true})
  }
})