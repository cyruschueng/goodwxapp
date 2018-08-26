//index.js
//获取应用实例
const app = getApp();
const common = require("../../js/common.js");
var that = '';
var canvasMarginL = 0;      // 中间截图canvas的左边距
var canvasMarginT = 0;
var preMoveX = 0;
var preMoveY = 0;
var posterMarginL = 0;      // 计算海报移动后的左边距
var posterMarginT = 0;
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: '',
    hasUserInfo: false,
    hasImg:false,
    hasMember:false,
    memberInfo:'',
    imgSrc: '',//../../image/poster001.png
    winWidth: app.globalData.phoneInfo.windowWidth,
    winHeight: app.globalData.phoneInfo.windowHeight,
    canvasHeight:0,
    canvasId:'mycanvas',
    radioInfo:'SHOW',
    radioSex:'all',
    inputWx:'',
    inputName:'',
    inputTel:'',
    inputAddress:'',
    inputCoordinate:'',
    inputDiffDistance:'',
    inputDeclaration:'',
    showMemberInfo: false,
    showCanvas:false,
    showHome:true,
    preX:0,
    preY:0,
    logo:'../../image/camera.png',
    mapInfo:'',
    canvasMarginL: 0,     // 子画布左边距
    canvasMarginT: 0,     // 子画布上边距
    posterW:0,            // 海报宽
    posterH: 0,           // 海报高
    posterW2: 0,           // 适应切图的海报宽
    posterH2: 0,           // 适应切图的海报高
    privateInfo:'',        // openId等信息
  },
  onLoad: function () {
    that = this;
    //let code = wx.getStorageSync("code");
    //console.log("缓存code:"+code);
    console.log(app.globalData);
    let canvasHeight = that.data.winHeight - 50;
    canvasMarginL = ((that.data.winWidth - 310) / 2).toFixed(2);
    canvasMarginT = ((canvasHeight - 310) / 2).toFixed(2);
    posterMarginL = parseFloat(canvasMarginL);
    posterMarginT = parseFloat(canvasMarginT);
    that.setData({
      showHome: true,
      showCanvas: false,
      showMemberInfo: false,
      canvasHeight: canvasHeight,
      canvasMarginL: ((that.data.winWidth-310)/2).toFixed(2),
      canvasMarginT: ((canvasHeight - 310) / 2).toFixed(2),
      preX: ((that.data.winWidth - 310) / 2).toFixed(2),
      preXY: ((canvasHeight - 310) / 2).toFixed(2),
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      that.getUserSetting();
    }
    
    that.openScopeMap();
  },
  onShow:function(){
    let privateInfo = wx.getStorageSync("pivateInfo");
    console.log("缓存privateInfo：");
    console.log(wx.getStorageSync("pivateInfo"));
    if (privateInfo.openId) {
      console.log("有openId，即将获取会员信息");
      that.getMemberInfo();
    }else{
      console.log("无openId，判断有没有code");      
      let code = wx.getStorageSync("code");
      if (code){        
        let params = {
          _C: "Key",
          _A: "getWxId",
          code: code
        }
        common.request("getSessionKey", that, "form", params);
      } else {// 没有code,即将查看用户授权
        that.getUserSetting();
      }      
    }
    if(!app.globalData.userInfo){
      that.openScopeUserInfo();
    }
  },
  getUserInfo: function(e) {      // 获取用户微信信息
    // 判断是否有个人信息
    app.globalData.userInfo = e.detail.userInfo
    that.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  urlTarget:function(e){
    common.urlTarget(e.currentTarget.dataset.url);
  },
  addImg:function(){              // 点击选择拼图
    that.delayAddImg();
  },
  delayAddImg:function(){         // 延迟判断是否有个人信息
    setTimeout(function(){
      if (that.data.hasMember) {
        that.chooseImg();
      } else {
        that.setData({
          showHome: false,
          showCanvas: false,
          showMemberInfo: true
        })
      } 
    },300)
  },
  chooseImg:function(){   // 选择海报    
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) { 
        that.setData({
          showHome: false,
          showMemberInfo: false,
          showCanvas: true
        });       
        let tempFilePaths = res.tempFilePaths;
        that.getImgInfo(tempFilePaths[0]);        
      }
    })
  },
  delImg:function(){
    that.setData({
      hasImg: false,
      imgSrc: '',
      showHome: true,
      showMemberInfo: false,
      showCanvas: false
    })
    preMoveX = 0;
    preMoveY = 0;
    posterMarginL = parseFloat(that.data.canvasMarginL);      // 计算海报移动后的左边距
    posterMarginT = parseFloat(that.data.canvasMarginT);
  },
  cancel:function(){
    that.delImg();
  },
  next:function(){
    that.exportImg();
  },
  drawImg:function(x,y,w,h){
    let ctx = wx.createCanvasContext(that.data.canvasId);
    ctx.setGlobalAlpha(1);
    ctx.drawImage(that.data.imgSrc,x,y,w,h);
    ctx.setStrokeStyle("white");
    ctx.strokeRect(canvasMarginL,canvasMarginT,310,310);
    ctx.draw();
  },
  getImgInfo:function(src){
    wx.getImageInfo({
      src: src,
      success:function(res){
        let imgW = res.width;       // 原海报宽
        let imgH = res.height;      // 原海报高
        if(imgW < 310 || imgH < 310){
          common.showErrorTip("宽高至少310px");
          that.setData({
            showHome: true,
            showCanvas: false,
            showMemberInfo: false
          })
        }else{
          that.setData({
            hasImg: true,
            imgSrc: src
          }) 
          let shortSide = imgW > imgH ? imgH : imgW;
          let ImgRatio = shortSide / 310;
          let imgW2 = imgW / ImgRatio;
          let imgH2 = imgH / ImgRatio;
          // 海报首次出现的位置
          that.setData({
            posterW: imgW,
            posterH: imgH,
            posterW2: imgW2,
            posterH2: imgH2,
            showHome: false,
            showMemberInfo: false,
            showCanvas: true
          })          
          that.drawImg(canvasMarginL - 0, canvasMarginT - 0, imgW2, imgH2);
        }
      }
    })
  },
  exportImg:function(){
    wx.canvasToTempFilePath({
      canvasId: that.data.canvasId,
      x: canvasMarginL+2,
      y: canvasMarginT+2,
      width:310-4,
      height:310-4,
      quality:1,
      success:function(res){
        console.log(res);
        that.setData({ 
          imgSrc: res.tempFilePath          
        });
        //common.showSuccessTip("图片裁剪成功");
        that.delImg();
        common.urlTarget("generatePuzzles", "", "?poster=" + res.tempFilePath);
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  changeRadioInfo: function (e) {
    that.setData({ radioInfo: e.detail.value});
  },
  changeRadioSex: function (e) {
    that.setData({ radioSex: e.detail.value });
  },
  getMemberInfo:function(openId){
    let params = {
      _C: 'User',
      _A: 'selectOne'
    }
    common.request("getMemberInfo", that, "form", params);
  },
  submitInfo: function () {
    var flag = false;
    let radioInfo = that.data.radioInfo;
    let inputWx = that.data.inputWx;
    let inputName = that.data.inputName;
    let inputTel = that.data.inputTel;
    let inputAddress = that.data.mapInfo ? that.data.mapInfo.address : '';
    let inputCoordinate = that.data.inputCoordinate;
    let inputDiffDistance = that.data.inputDiffDistance;
    let inputDeclaration = that.data.inputDeclaration;
    flag = common.verifyNull(inputWx,"微信号");
    flag && (flag = common.verifyNull(inputName,"联系人"));
    flag && (flag = common.verifyTel(inputTel));
    // flag && (flag = common.verifyNull(inputAddress,"地址"));
    if(flag){
      let params = {
        _C:"User",
        _A:"updateOne",
        _DATA: JSON.stringify({
          lat: that.data.mapInfo ? that.data.mapInfo.latitude : '',
          lng: that.data.mapInfo ? that.data.mapInfo.longitude : '',
          mobile: inputTel,
          avatarUrl: that.data.userInfo.avatarUrl,
          is_show_info: radioInfo,
          name: inputName,
          nick_name: that.data.userInfo.nickName,
          wx: inputWx,
          address: inputAddress,
          //declaration: inputDiffDistance,
          //distance: inputDiffDistance,
          gender: that.data.userInfo.gender,
          city: that.data.userInfo.city,
          logo: that.data.logo
        })        
      }
      //common.showErrorTip("提交会员信息");
      common.request("submitMemberInfo",that,"form",params);
    }    
  },
  getWx:function(e){
    let curVal = e.detail.value;
    that.setData({ inputWx: curVal })
  },
  getName:function(e){
    let curVal = e.detail.value;
    that.setData({ inputName: curVal})
  },
  getTel: function (e) {
    let curVal = e.detail.value;
    that.setData({ inputTel: curVal })
  }, 
  getAddress: function (e) {
    let curVal = e.detail.value;
    that.setData({ inputAddress: curVal })
  },
  getDiffDistance: function (e) {
    let curVal = e.detail.value;
    that.setData({ inputDiffDistance: curVal })
  },
  getDeclaration: function (e) {
    let curVal = e.detail.value;
    that.setData({ inputDiffDistance: curVal })
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = res.data.data;
        let info = res.data.data.info ? res.data.data.info : '';
        switch (methodName) {
          case 'getMemberInfo':  // 获取会员信息
          console.log("会员信息获取成功");
            if(!info){
              that.setData({
                hasMember: false
              })
            }else{
              that.setData({
                hasMember: true,
                hasUserInfo:true,
                memberInfo: info
              })
            }             
            break;
          case 'submitMemberInfo':  // 提交会员信息
            that.setData({
              hasMember: true,
              showHome: true,
              showCanvas: false,
              showMemberInfo: false
            })
            common.showSuccessTip("提交成功");
            break;
          case 'getSessionKey':
              console.log("openId成功获取---------");
              let params = {
                sessionKey : info.session_key,
                openId : info.openid,
                unionId : info.unionid ? info.unionid : ''
              }
              if (!info.errcode){
                wx.setStorageSync("pivateInfo", params);            
              }              
              that.getMemberInfo(info.openid);    // 第一次通过openId获取会员信息
            break;

        }

      } else {
        // 提交会员信息接口有bug
        console.log(res);
      }
    } else {
      console.log("接口有问题：" + methodName);
    }
  },
  onFail: function (methodName) {
    console.log("接口调用失败：" + methodName);
    if (methodName == "getSessionKey"){
      let code = wx.getStorageSync("code");
      if (code) {
        let params = {
          _C: "Key",
          _A: "getWxId",
          code: code
        }
        common.request("getSessionKey", that, "form", params);
      } else {// 没有code,即将查看用户授权
        that.getUserSetting();
      }  

    }
  },
  onComplete: function (methodName) { 

  },
  touchStart:function(e){
    console.log("触摸start：");
    console.log(e);
  },
  touchMove:function(e){
    that.moveCompute(e);
  },
  touchEnd: function (e) {        // 触摸结束，清空上一次的触摸点
    preMoveX = 0;
    preMoveY = 0;
  },
  moveCompute:function(e){    // 海报移动计算
    canvasMarginL = parseFloat(canvasMarginL);
    canvasMarginT = parseFloat(canvasMarginT);
    posterMarginL = parseFloat(posterMarginL);
    posterMarginT = parseFloat(posterMarginT);
    let posterW2 = that.data.posterW2;
    let posterH2 = that.data.posterH2;
    let curMoveX = e.touches[0].x;
    let curMoveY = e.touches[0].y;
    let moveW = curMoveX - preMoveX;
    let moveH = curMoveY - preMoveY;

    // 如果海报W > 海报H，横向移动；
    if (posterW2 > posterH2){
      if(preMoveX){
        posterMarginL += moveW;
        if(curMoveX > preMoveX){ // 右移
          // 移动后的海报右侧 <=  canvasMarginL+310，按移动位置draw，否则draw海报最右端 
          if (posterMarginL >= canvasMarginL){   // 海报移至最右边
            posterMarginL = canvasMarginL;
          }
          that.drawImg(posterMarginL, canvasMarginT, posterW2, posterH2);
        } else { // 左移
          if (posterMarginL + posterW2 <= canvasMarginL + 310) {   // 海报移至最左边
            posterMarginL = canvasMarginL + 310 - posterW2;
          }
          that.drawImg(posterMarginL, canvasMarginT, posterW2, posterH2);
        }
      }
    } else {    // 竖向移动；
      if(preMoveY){
        posterMarginT += moveH;
        if (curMoveY > preMoveY) { // 下移
          if (posterMarginT >= canvasMarginT) {   // 边界限制,海报移至最下边
            posterMarginT = canvasMarginT;
          }
          that.drawImg(canvasMarginL, posterMarginT, posterW2, posterH2);
        } else { // 上移
          if (posterMarginT + posterH2 <= canvasMarginT + 310) {   // 边界限制,海报移至最上边
            posterMarginT = canvasMarginT + 310 - posterH2;
          }

          that.drawImg(canvasMarginL, posterMarginT, posterW2, posterH2);
        }

      }
    }
    preMoveX = curMoveX;
    preMoveY = curMoveY;
  },
  uploadLogo:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        that.setData({ logo: tempFilePaths[0] });
        let params = {          
          path: "logo"
        }
        common.uploadFile(that, "submitLogo", tempFilePaths[0], params);
      }
    })    
  },
  getUserSetting: function () {
    wx.getSetting({   //查看用户授权列表
      success: function (res) {
        let authSettings = res.authSetting;         
        if (!authSettings['scope.userInfo']){   // 用户未授权个人信息
          that.openScopeUserInfo();
        }
        // 位置未授权
        if (authSettings['scope.userInfo'] && !authSettings['scope.userLocation']) {   // 用户未授权地图
          that.openScopeMap();
        }
      }
    })
  },
  openScopeUserInfo:function(){     // 开启用户授权
    wx.getUserInfo({
      withCredentials: true,  // openid、sessionKey、unionid的获取需要设置此项
      success: res => {       // 用户授权成功，获取用户信息
        app.globalData.userInfo = res.userInfo;
        that.setData({
          hasUserInfo: true,
          userInfo: res.userInfo
        });
        that.getUserSetting();  // 判断地图授权
        // 获取oppenid
        console.log("获取oppenid");
        let code = wx.getStorageSync("code");
        let params = {
          _C: "Key",
          _A: "getWxId",
          code: code
        }        
        common.request("getSessionKey", that, "form", params);

      },
      fail:res => {   // 用户仍未授权
        common.showErrorTip("头像未授权");
        setTimeout(function(){
          that.openSetting();     // 打开授权设置引导界面
        },1500)        

      }
    })
  },
  openScopeMap:function(){    // 开启地图授权
    wx.getLocation({
      success: function(res) {
        console.log("用户当前latitude:" + res.latitude);
        console.log("用户当前longitude:" + res.longitude);
      },
      fail:function(){
        common.showErrorTip("位置未授权");
        setTimeout(function(){
          that.openSetting();
        },1500)
      }
    })

  },
  openSetting: function () {   // 打开授权设置引导界面
    wx.openSetting({
      success: function (res) {       
        if (res.authSetting['scope.userInfo']) { // 用户授权成功，去获取用户信息
          that.openScopeUserInfo();
        }

      }
    });
  },
  chooseMap:function(){
    wx.chooseLocation({
      success: function (res) {
        that.setData({mapInfo:res});
      },
      fail:function(err){
        wx.openSetting({
            success:function(res){
              console.log("引导用户授权：");
              console.log(res);
            }
        });
      }
    })
  },
  uploadLogoImg:function(){
    let logo = that.data.logo;
    let params = {
      path: "logo"
    }
    common.uploadFile(that, "submitLogo", logo, params);
  },
  onUpload: function (result, res, submitName) {    
    if (result == "fail" || res.statusCode == 400){
      console.log("submitName:" + submitName);
      console.log(res);
      if (submitName == "submitLogo"){
        setTimeout(function(){
          that.uploadLogoImg();
        },300)
      }

    }else{
      let data = JSON.parse(res.data);
      if (res.statusCode != 200 || data.code != 200) {
        common.showErrorTip(submitName + "上传失败");
        return false;
      }
      // 上传成功
      let info = data.data.info;
      let pic = app.globalData.imgDir + info.pic;
      console.log(submitName + "服务器图片地址：" + pic);
      switch (submitName) {
        case 'submitLogo':

          break;
      }
    }
    
  }
  
})
