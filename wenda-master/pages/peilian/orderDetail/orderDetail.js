import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');


Page({
  data: {
    orderId: 'WTX-PL-T-T-10000687',

    headImg:'',
    headName: '',
    trainerLevel: '',
    grabTime: '',
    trainerInfoFlag: true,

    level: '',
    gameRegion: '',
    gameNumber: '',
    amount: '',
    createTime: '',
    couponValue: '',
    originalAmount: '',

    shareModalFlag: true,
    detailCouponFlag: true,

    quesImages: '',
    playResultText: '游戏结果',
    playContract: '退款申述',
    val: 'ss',
    appealFlag: false,   //申诉中
    orderEvidenceFlag: false,  //申诉结束
    kfModalFlag: true,
    playAgreeFlag: false,
    playContractFlag: false,
    orderResulgFlag: true,
    hasRedPacket: '',    //是否显示红包
    actualPersons: '',   //实际游戏人数
    gamePerson: ''   //游戏人数

  },
  onLoad(options) {
    if (options.orderId) {
      this.setData({ orderId: options.orderId });
    }
  },
  onShow() {
    APP.login(this.gainData, this);
  },
  gainData() {
    var orderId = this.data.orderId;
    wx.request({
      url: APP_BASE + `help/training/order/detail`,
      data: {
        sid: APP.globalData.sid,
        orderId: orderId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          if (data.data.training) {
            var processNode = data.data.training.processNode;
            if (processNode >= 7) {
              this.initOrderInfo(data.data);
              return;
            }

            var hasRedPacket = data.data.hasRedPacket;
            this.setData({hasRedPacket});

            this.initTrainerInfo(data.data);
            this.initOrderInfo(data.data);


            if (processNode >= 3) {   //陪玩大神端结果已经确认
              this.initOrderResultInfo(data.data.training);
            }
          }
        }
      }
    })
  },
  initTrainerInfo(data) {
    if (!data.training.trainer) {
      return;
    }
    let info = data.training.trainer;
    var headImg = info.avatarUrl;
    var headName = info.nickName;
    var trainerLevel = info.pvpLevel.name + info.pvpLevelStar;
    var grabTime = this.gainGrabTime(data.training.grabTime, data.payTime);
    var trainerInfoFlag = false;

    this.setData({ headImg, headName, trainerLevel, grabTime, trainerInfoFlag})
  },
  initOrderInfo(data) {
    var level = data.training.level.name;
    var gameRegion = `${data.training.gameRegion === 1 ? '微信大区' : 'QQ大区'}`;

    var gameNumber = `游戏局数：${data.training.gameNumber}`;
    var gamePerson = `游戏人数：${data.training.gamePersons}人`
    
    var createTime = `下单时间：${this.transferTime(data.createTime * 1000)}`;
    var couponValue = `${data.coupon ? `-¥${data.coupon.value / 100}` : '未使用'}`
    var originalAmount = `总价：¥${data.originalAmount / 100}`;
    var amount = `实付：¥${data.amount / 100}`;

    this.setData({ level, gameRegion, gameNumber, amount, createTime, couponValue, originalAmount, gamePerson })

  },
  initOrderResultInfo(data) {
    var orderResulgFlag = false;
    var result = [data.resultVictory, data.resultDefeat, data.resultLost];
    var playResultText = '游戏结果';

    if (!data.affirmResult) {
      var playAgreeFlag = true;
      var playContractFlag = true;
    }

    if (data.processNode === 4 && this.data.hasRedPacket) {    //已经结束，认同结果
      var detailCouponFlag = false;
    }
    var playContract = '退款申诉';
    var val = 'ss';
    if (data.processNode === 5 || data.processNode === 6) {
      playContract = '联系客服';
      val = 'kf';
    }
    var appealFlag = false;
    if (data.processNode === 5) {    //申述中
      appealFlag = true;
    }

    var quesImages = '';
    var orderEvidenceFlag = false;
    if (data.processNode === 6) {  //申述结果
      appealFlag = false;
      orderEvidenceFlag = true;
      playResultText = '申诉结果';
      if (data.appeal.evidenceImg) {
        quesImages = 'https://image.qunmee.com/wxapp/' + data.appeal.evidenceImg;
      }

      result = [data.appeal.judgeResultVictory, data.appeal.judgeResultDefeat, data.appeal.judgeResultLost];
    }

    var victoryNum = result[0] + '局';
    var defeatNum = result[1] + '局';
    var failNum = result[2] + '局';

    var actualPersons = `实际游戏人数：${data.actualPersons}人`;

    this.setData({ playAgreeFlag, playContractFlag, playResultText, playContract, appealFlag, quesImages, orderEvidenceFlag, victoryNum, defeatNum, failNum, val, detailCouponFlag, orderResulgFlag, actualPersons});
  },
  playAgreeEv: function () {
    var sid = APP.globalData.sid;
    var orderId = this.data.orderId;
    wx.request({
      url: server + "help/training/order/finish",
      data: { sid, orderId },
      success: (data) => {
        if (data.data.suc == '200') {
          mta.Event.stat("playindexnum", {})
          var playAgreeFlag = false;
          var playContractFlag = false;
          var appealFlag = false;
          var orderEvidenceFlag = false;
          var detailCouponFlag = true;
          var shareModalFlag = true;
          if (this.data.hasRedPacket) {
            detailCouponFlag = false;
            shareModalFlag = false;
          }
          this.setData({ playAgreeFlag, playContractFlag, appealFlag, orderEvidenceFlag, detailCouponFlag, shareModalFlag});

        }
        else {
          wx.showToast({
            title: '确认失败，请重新确认',
            duration: 1000
          });
        }
      }
    })
  },
  playContractEv: function (ev) {
    var target = ev.target;
    var sid = APP.globalData.sid;
    var orderId = this.data.orderId;
    var val = target.dataset.val;

    if (val == 'ss') {
      wx.request({
        url: server + "help/training/order/appeal",
        data: { sid, orderId },
        success: (data) => {
          if (data.data.suc == '200') {
            this.setData({
              appealFlag: true,
              playContract: '联系客服',
              val: 'kf'
            })
          }
          else {
            wx.showToast({
              title: '申述失败，请重新申请',
              duration: 1000
            });
          }
        }
      })
    }
    else {
      this.setData({ kfModalFlag: false });
    }
  },
  quesImagesEv: function () {
    wx.previewImage({
      current: this.data.quesImages, // 当前显示图片的http链接
      urls: [this.data.quesImages] // 需要预览的图片http链接列表
    })
  },
  kfModalEv: function (ev) {
    if (ev.target.dataset.id == 'modal') {
      this.setData({ kfModalFlag: true });
    }
  },
  detailCouponEv: function () {
    mta.Event.stat("orderdetailclickcoupon", {})
    this.setData({ shareModalFlag: false });
  },
  shareModalCloseEv: function () {
    this.setData({ shareModalFlag: true });
  },
  gainGrabTime(startTime, grabTime) {
    var time = (startTime - grabTime);
    var str = '';

    if (time < 60) {
      str = `${time}秒内接单`;
    }
    else if (time >= 60 && time <= 89) {
      str = `1分钟内接单`;
    }
    else {
      str = '1分钟内接单';
    }

    return str;
  },
  transferTime(time) {

    var now = time ? new Date(time) : new Date();
    var year = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate();

    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();

    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();

    var value = '';
    function _tranferDate(val) {
      return val < 10 ? '0' + val : val;
    }

    return `${_tranferDate(year)}-${_tranferDate(nowMonth)}-${_tranferDate(nowDay)} ${_tranferDate(hour)}:${_tranferDate(min)}:${_tranferDate(sec)}`;

  },
  onShareAppMessage: function () {
    var obj = {};
    if (this.data.hasRedPacket) {
      obj = {
        title: '老铁送福利！最高5元[王者荣耀]上分优惠券等您来领！！!',
        path: '/pages/peilian/getCoupon/getCoupon?orderId=' + this.data.orderId,
        success: function (res) {
          mta.Event.stat("orderdetailsharenum", {});
        },
        fail: function (res) {
          // 转发失败
        },
        complete: function (res) {

        }
      }
    }

    return obj;
  }
})