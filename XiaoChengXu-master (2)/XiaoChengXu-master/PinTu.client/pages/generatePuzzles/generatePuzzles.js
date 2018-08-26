// pages/generatePuzzles/generatePuzzles.js
const app = getApp();
const common = require("../../js/common.js");
var that = '';
var curArrIndex = 0;    // 当前活动图片数组下标
var arrTempFile = [];
var curIdx = 0;
var formId = "";
var aid = 0;
var accessToken='';
Page({
  data: {
    moneyNo1:'',
    moneyNo2: '',
    moneyNo3: '',
    moneyNo4: '',
    moneyTotal: '',
    group:10,
    singleMoney:'',   // 单个红包金额
    moneyService:0.04,
    diffDistance:'',
    radioSex:'',
    inputDiffDistance:'',
    inputDescription:'',
    logo: '../../image/camera.png',
    poster:'../../image/poster001.png',
    onlinePoster:'',
    arrActive: ['../../image/camera.png']
  },
  onLoad: function (options) {
    that = this;
    that.setData({ poster: options.poster})
  },
  onReady: function () {
  
  },
  onShow: function () {
    that.getAccessToken();
  },
  onShareAppMessage: function () {
  
  },
  changeRadioSex: function (e) {
    that.setData({ radioSex: e.detail.value });
  },
  getDiffDistance: function (e) {
    let curVal = e.detail.value;
    curVal = parseInt(curVal);
    that.setData({ inputDiffDistance: curVal })
  },
  getDescription: function (e) {
    let curVal = e.detail.value;
    if (curVal.length <= 140){
      that.setData({ inputDescription: curVal })
    }else{
      common.showErrorTip("最多140字符");
    }
    
  },
  chooseImg000: function (e) {      // 原来的单个图片上传
    curArrIndex = e.currentTarget.dataset.index;
    wx.showLoading({
      title: '图片加载中...',
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        console.log("临时文件1：" + tempFilePaths[0]);
        that.setData({ actTempImg: tempFilePaths[0] });
        let params = {
          path: "act"
        }
        console.log("上传的图片文件：" + tempFilePaths[0]);
        common.uploadFile(that, "submitActiveImg", tempFilePaths[0], params);    
      },
      fail:function(){
        wx.hideLoading();
      }
    })
  },
  chooseImg: function (e) {
    curArrIndex = e.currentTarget.dataset.index;
    wx.showLoading({
      title: '图片加载中...',
    })
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;  
        arrTempFile = res.tempFilePaths;   
        that.setData({ actTempImg: tempFilePaths[0] });
        curIdx = 0;
        that.uploadActiveImg();     
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  },
  getNo1:function(e){
    var no1 = parseFloat(e.detail.value);
    if (!no1 || no1 < 1) {
      common.showErrorTip("冠军最低1元");
      no1 = 1;
    }
    that.computeMoney(no1);
  },
  getSingleMoney:function(e){    // 单个红包金额
    var singleMoney = parseFloat(e.detail.value);
    if (!singleMoney || singleMoney < 1.9) {
      common.showErrorTip("金额最低1.9元");
      singleMoney = 1.9;
    }
    that.setData({ singleMoney: singleMoney})
    that.moneyDistribute();
  },
  getGroup:function(e){
    var group = e.detail.value;
    if (!group || group < 1) {
      common.showErrorTip("最少一个红包");
      group = 1;
    }
    that.setData({
      group: parseInt(group)
    })
    that.moneyDistribute();
    //that.computeMoney();
  },
  moneyDistribute: function (){   // 红包金额分布
    let single = that.data.singleMoney;
    let group = that.data.group;
    let moneyTotalNoService = single * group; // 总金额（不包含手续费）
    let moneyService = moneyTotalNoService * 0.02;   // 手续费
    let moneyTotal = moneyTotalNoService + moneyService; // 总金额（包含手续费）
    let no1 = single / 1.9;
    let no2 = no1 * 0.5;
    let no3 = no1 * 0.2;
    let no4 = no1 * 0.1;
    let strNo4 = no4.toString();
    let no4PointIdx = strNo4.indexOf('.');
    that.setData({
      moneyNo1: no1.toFixed(2),
      moneyNo2: no2.toFixed(2),
      moneyNo3: no3.toFixed(2),
      // moneyNo4: no4.toFixed(2),
      moneyNo4: strNo4.slice(0, no4PointIdx+3),   // 不进行四舍五入，直接截取最后两位小数
      moneyTotal: moneyTotal.toFixed(2),
      moneyService: moneyService.toFixed(2)
    })
  },
  computeMoney:function(no1){
    var no1 = no1 ? no1 : (that.data.moneyNo1 ? that.data.moneyNo1:2);
    no1 = parseFloat(no1);
    let no2 = no1 * 0.5;
    let no3 = no2 * 0.2;
    let no4 = no3 * 0.1;
    let group = that.data.group;    
    let moneyTotalNoService = group * (no1 + no2 + no3 + no4 * 2);  // 总金额（不包含手续费）
    let moneyService = moneyTotalNoService * 0.02;   // 手续费
    let moneyTotal = moneyService + group * (no1 + no2 + no3 + no4 * 2); // 总金额（包含手续费）
    that.setData({
      moneyNo1: no1.toFixed(2),
      moneyNo2: no2.toFixed(2),
      moneyNo3: no3.toFixed(2),
      moneyNo4: no4.toFixed(2),
      moneyTotal: moneyTotal.toFixed(2),
      moneyService: moneyService.toFixed(2)
    })
  },
  clickGenerate:function(e){ 
    formId = e.detail.formId;

    if (!that.data.singleMoney){
      common.showErrorTip("请先完善信息");
      return false;
    }
    wx.showLoading({
      title: '信息提交中...',
    })
    that.uploadPoster();
    
  },
  submitActive:function(){   
    var arrActive = that.data.arrActive.concat();
    if (arrActive.includes("../../image/camera.png")) { // 有"../../image/camera.png"
      arrActive.splice(-1, 1);   // 需要提交的活动图片数组
    }
    for (let [index, elem] of arrActive.entries()) {
      arrActive[index] = elem.replace(app.globalData.imgDir, '');
    } 
    let params = {
      _C: "Act",
      _A: "insertOne",
      _DATA: JSON.stringify({
        'type':'poster', // '【common普通；poster海报】',
        'degree_type' :'3*3',
        'pay_total': that.data.moneyTotal,    // 总金额（包含手续费）
        'pay_fee': that.data.moneyService,//'发起人手续费',
        'award_first': that.data.moneyNo1,// '冠军奖励',
        'award_two': that.data.moneyNo2,//'亚军奖励',
        'award_third': that.data.moneyNo3,//'季军奖励',
        'award_all': that.data.moneyNo4,// '参与奖励',
        'num_group': that.data.group,// '参与组数',
        'num_person': that.data.group*5,// '参与人数',
        'limit_sex': that.data.radioSex,// '【1男，2女】',
        'limit_distance': that.data.inputDiffDistance,//'限制距离【单位米】',
        "description": that.data.inputDescription,
        'pic': that.data.onlinePoster,
        "description_pic": arrActive
      })
    }
    common.request("submitActive", that, "form", params);
  },
  onSuccess: function (methodName, res) {
    if (res.statusCode == 200) {
      let ret = res.data;
      if (ret.code == 200) {
        let data = ret.data;
        let info = data.info;
        switch (methodName) {
          case 'submitActive':
            aid = data.id;    // 活动id
            // 通过活动id获取活动信息
            that.getActiveInfo();            
            common.urlTarget("share","","?aid="+data.id+"&poster="+that.data.poster);
            break;
          case 'submitImg':
            
            break;
          case 'getWxPayInfo':
            let timeStamp = info.timeStamp;
            let nonceStr = info.nonceStr;
            let pkg = info.package;
            let paySign = info.paySign;
            let orderId = '';  
            wx.hideLoading();          
            common.wxpay(timeStamp, nonceStr, pkg, paySign,that);            
            break;
          case 'getActiveInfo':   // 活动详情
            let keyVal1 = "海报拼越快赏金越高";  
            let keyVal2 = "5/ "+data.group.list.length+"(人/组)";
            let keyVal3 = info.user_info.nick_name;
            let keyVal4 = "红包"+info.pay_total+"元";
            that.sendTemplateMsg(keyVal1, keyVal2, keyVal3, keyVal4); // 创建消息模版 
            break;
          case 'getAccessToken':
            accessToken = info.access_token;
            break;
        }

      } else {
        common.showErrorTip(ret || ret.msg);
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
  uploadActiveImg:function(){
    wx.showLoading({
      title: '图片上传中...',
    })
    let actTempImg = that.data.actTempImg;
    let params = {
      path: "act"
    }
    common.uploadFile(that, "submitActiveImg", actTempImg, params); 
  },
  uploadPoster:function(){
    let params = {
      path: "act/poster"
    }
    setTimeout(function () {
      common.uploadFile(that, "submitPoster", that.data.poster, params);
    }, 300)
  },
  onUpload: function (result, res, submitName) {
    console.log(submitName);
    console.log(res);
    if (result == "fail" || res.statusCode == 400){      
      if (submitName == "submitActiveImg"){
          setTimeout(function(){
            that.uploadActiveImg();
          },500);
      }
      if (submitName == "submitPoster"){
        setTimeout(function(){
          that.uploadPoster();
        },500)
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
        case 'submitPoster':
          that.setData({ onlinePoster: info.pic })
          let params = {
            _C: 'Pay',
            _A: 'get',
            money: that.data.moneyTotal
            // money: 0.01
          }
          common.request("getWxPayInfo", that, "form", params);
          break;
        case 'submitActiveImg':
          var arrActive = that.data.arrActive.concat();
          if (arrActive.length <= 6) {
            arrActive[curArrIndex] = pic;
            if (curArrIndex >= arrActive.length - 1 && arrActive.length != 6) {  // 当前下标是当前展示的最后一个，则可添加新的图片
              arrActive[arrActive.length] = "../../image/camera.png";
            }
          }
          that.setData({ arrActive: arrActive });
          wx.hideLoading();
          if (arrTempFile.length > 1 && curIdx + 1 <= arrTempFile.length && arrActive.length <= 6 && arrActive.includes("../../image/camera.png")){
            curIdx += 1;
            curArrIndex += 1;
            let curSrc = arrTempFile[curIdx];
            if (curSrc){
              that.setData({ actTempImg: curSrc });
              that.uploadActiveImg();
            }
            
          }
          break;
      }

    }    
  },
  onWxPay: function (result,res){
    if (result == "success"){
      that.submitActive();
    }
  },
  sendTemplateMsg: function (keyVal1, keyVal2, keyVal3, keyVal4) {
    let privateInfo = wx.getStorageSync("pivateInfo");
    let tplId = "z74PLV4Vxo8O8Xi_eVCVbSH6gjz63n0uWC_PzHNOmr8";    // 活动模版
    let params = {
      "template_id": tplId,
      "page": "pages/index/index",
      "form_id": formId,
      "data": {
        "keyword1": {
          "value": keyVal1,
          "color": "#173177"
        },
        "keyword2": {
          "value": keyVal2,
          "color": "#173177"
        },
        "keyword3": {
          "value": keyVal3,
          "color": "#173177"
        },
        "keyword4": {
          "value": keyVal4,
          "color": "#173177"
        }
      }
    } 
    common.sendTpl(accessToken, params, that, "groupSuccess");
  },
  onTplSuccess: function (res, tplName) {
    console.log(tplName + "创建成功：" + res);
    switch (tplName) {
      case "groupSuccess":

        break;
    }
  },
  onTplFail: function (res, tplName) {
    console.log(tplName + "创建失败：" + res);
    switch (tplName) {
      case "groupSuccess":
        common.showErrorTip("groupSuccess模版fail");
        break;
    }
  },
  getActiveInfo: function () {
    let params = {
      _C: 'Act',
      _A: 'selectOne',
      id: aid
    }
    common.request("getActiveInfo", that, "form", params);
  },
  getAccessToken:function(){
    let params = {
      _C: 'Key',
      _A: 'getAccessToken'
    };
    common.request("getAccessToken", that, "form", params);
  }
})