import { GET, POST, promisify } from '../../../libs/request.js';
import { server, imgServer, wxappServer } from '../../../libs/config.js';
var mta = require('../../../libs/mta_analysis.js');

var app = getApp();
Page({
  data: {
    orderCreateFlag: false,
    orderInGroupFlag: false,
    orderId: '',
    index: 0,
    regionIndex: 0,
    levelId: null,
    gameRegion: null,
    gameNumber: 1,
    regionArray: ['微信大区', 'QQ大区'],
    levelArray: ['倔强青铜', '秩序白银', '荣耀黄金', '尊贵铂金', '永恒钻石'],
    levelDefault: '选择段位',
    regionDefault: '选择大区',
    levelValArray: [
      { text: '永恒钻石', value: 5, chosed: false},
      { text: '尊贵铂金', value: 4, chosed: false},
      { text: '荣耀黄金', value: 3, chosed: false},
      { text: '秩序白银', value: 2, chosed: false},
      { text: '倔强青铜', value: 1, chosed: false}],
    regionValArray: [
      { text: '微信大区', value: 1, chosed: false},
      { text: 'QQ大区', value: 2, chosed: false}],
    numberValArray: [
      { text: '1', value: 1, chosed: true},
      { text: '2', value: 2, chosed: false},
      { text: '3', value: 3, chosed: false}
    ],
    headImg: '',
    nickName: 'haha',
    qrCode: 'https://image.qunmee.com/wxapp/qunmee_task1499153381635.jpg',
    desc: '3星',
    qqUrl: 'https://jq.qq.com/?_wv=1027&k=4B2Ella',

    openGid: '',
    showCommonBanner: false,   //是否正常显示通用banner
    ifInGroup: false,    //是否显示联系群主tip
    ifBindGroupOwner: false,    //当前群是否绑定群主
    ifGroupOwner: false,         //是否是群主
    orderUserCount: 0,    //群内下单用户数
    orderUsers: [],          //群内下单用户头像
    groupOwner: '',
    balance: '',
    ifShowOpenGid: 0,
    formId: '',
    regionClassArr: ['play-choose-item-left-first', 'play-choose-item-left-sec'],
    levelClassArr: ['play-choose-item-left-first play-choose-item-top-sec', 'play-choose-item-left-sec play-choose-item-top-sec', 'play-choose-item-left-third play-choose-item-top-sec', 'play-choose-item-left-first play-choose-item-top-third', 'play-choose-item-left-sec play-choose-item-top-third'],
    numberClassArr: ['play-choose-item-left-first', 'play-choose-item-left-sec', 'play-choose-item-left-third'],
    priceStr: '',  //段位价格
    headTipInfo: '请选择您的游戏信息',
    headTipInfoFlag: false  ,
    singlePersonFlag: true,  //是否多人上车
    countDown:''  //发车倒计时
  },
  onLoad: function (options) {
    mta.Page.init();
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  gainData: function () {
    var that = this;
    var sid = app.globalData.sid;
    var showCommonBanner = false;
    if (app.globalData.shareTicket) {
      this.gainGroupInfo();
    }
    else {
      showCommonBanner = true;
      this.setData({ showCommonBanner});
    }
    
    var from = 2;
    wx.request({
      url: server + "help/training/order/check",
      data: { sid , from},
      success: (data) => {
        if (data.data.suc == '200') {
          var subData = data.data.data;
          var orderInGroupFlag = false;
          var orderCreateFlag = false;
          if (subData) {
            var orderId = subData.orderId;
            var processNode = subData.training.processNode;
            this.setData({ orderId });
            if (processNode > 1 && processNode < 3) {   //陪玩进行中
              if (!this.data.countDown) {
                this.initTipInGroup();
              } 
              this.loopGainState();
              orderInGroupFlag = true;
            }
            else {
              orderCreateFlag = true;
            }
          }
          else {
            orderCreateFlag = true;
          }
          this.setData({ orderInGroupFlag, orderCreateFlag })
        }
        else {
          wx.showToast({
            title: '系统错误',
            duration: 1000
          });
        }
      }
    })
  },
  gainGroupInfo: function () {    //获取群ID和群昵称
    var sid = app.globalData.sid;
    var openGid = this.data.openGid;
    if (openGid) {
      this.gainDetailData({openGid, sid});
    }
    else {
      this.gainSecretDetailData();
    }

  },
  gainSecretDetailData: function () {
    var sid = app.globalData.sid;
    var openGid = this.data.openGid;
    wx.getShareInfo({
      shareTicket: app.globalData.shareTicket,
      complete: (res) => {
        if (res.err_code) {
          this.setData({ showCommonBanner: true });
          return;
        }
        var { encryptedData, iv } = res;
        wx.login({
          success: (res) => {
            if (res.code) {
              var code = res.code;
              this.gainDetailData({ openGid, sid, code, encryptedData, iv });
            }
          }
        })

      }
    })
  },
  gainDetailData: function (obj) {
    var { openGid, code, sid, encryptedData, iv} = obj;
    wx.request({
      url: server + "help/wxgroup/detail",
      data: { openGid, code, sid, encryptedData, iv },
      success: (data) => {
        if (data.data.suc == '200' && data.data.data) {
          var subData = data.data.data;
          console.log(subData);
          var openGid = subData.openGid;
          var ifShowOpenGid = subData.isShow;
          this.setData({ openGid, ifShowOpenGid});
          if (subData.managerName) {
            var groupOwner = subData.managerName;
            var ifBindGroupOwner = true;
            var showCommonBanner = false;
            var ifInGroup = false;
            this.setData({ ifBindGroupOwner, groupOwner, showCommonBanner, ifInGroup })
          }
          else {
            this.setData({ showCommonBanner: true, ifInGroup: true })
          }

          if (subData.isManager) {
            var ifGroupOwner = true;
            var orderUserCount = subData.orderUserCount;
            var orderUsers = subData.orderUsers;
            var balance = subData.balance / 100;
            orderUsers.length > 8 && (orderUsers.length = 8);
            this.setData({ balance, ifGroupOwner, orderUserCount, orderUsers })
          }
        }
        else {
          // wx.showToast({
          //   title: '获取群详情接口失败',
          //   duration: 1000
          // });
          this.gainSecretDetailData();
        }
      }
    })
  },
  playTipEv: function () {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  accountDetailEv: function () {
    wx.navigateTo({
      url: '../accountDetail/accountDetail',
    })
  },
  loopGainState: function () {
    setTimeout(() => {
      this.gainData();
    }, 2000);
  },
  delayPublishEv: function (ev) {
    this.setData({
      formId: ev.detail.formId
    })
    var This = this;
    setTimeout(function () {
      This.playNextEv();
    }, 300)
  },
  playNextEv: function () {
    if (!this.data.gameRegion) {
      wx.showToast({
        title: '请选择您的大区',
        duration: 1000
      });
      return;
    }

    if (!this.data.levelId) {
      wx.showToast({
        title: '请选择您的段位',
        duration: 1000
      });
      return;
    }

    var sid = app.globalData.sid;
    var levelId = this.data.levelId;
    var typeId = 1;
    var gameType = 1;
    var gameRegion = this.data.gameRegion;
    var openGid = this.data.openGid;
    var fromTarget = 2;
    var formId = this.data.formId;
    var gameNumber = this.data.gameNumber;

    wx.request({
      url: server + "help/training/order/create",
      data: { sid, levelId, typeId, gameType, gameRegion, gameNumber, openGid, fromTarget, formId },
      success: function (data) {
        if (data.data.suc == '200') {
          mta.Event.stat("playindexnextnum", {})
          wx.navigateTo({
            url: '../confirmOrder/confirmOrder?orderId=' + data.data.data.orderId,
          })
        }
        else {
          wx.showToast({
            title: '订单创建失败，请重新创建',
            duration: 1000
          });
        }
      }
    })
  },
  chooseItemEv: function (ev) {
    var target = ev.target;
    var type = target.dataset.type;
    var val = target.dataset.val;

    var typeArr = '';
    var typeArrName = '';

    switch (type) {
      case 'gameRegion': typeArrName = 'regionValArray'; typeArr = this.data.regionValArray; break;
      case 'levelId': typeArrName = 'levelValArray'; typeArr = this.data.levelValArray;break;
      case 'gameNumber': typeArrName = 'numberValArray'; typeArr = this.data.numberValArray;break;
    }

     typeArr = typeArr.map((item, key)=> {
      if (item.value == val ) {
        item.chosed = true;
      }
      else {
        item.chosed = false;
      }
      return item;
    })



     this.setData({ [typeArrName]: typeArr, [type]:val})
     this.dealOrderInfo();

  },
  dealOrderInfo: function () {
    var str = `已选：<span class="play-head-info-detail-split">微信大区</span><span>永恒钻石</span>`;
    var priceStr = `价格：10元／局`;
    var noneStr = `请选择您的游戏信息`;

    var levelIdArr = ['倔强青铜', '秩序白银', '荣耀黄金', '尊贵铂金', '永恒钻石'];
    var gameRegionArr = ['微信大区', 'QQ大区'];
    var priceArr = [3, 4, 5, 10, 20];
    var headTipInfoFlag = false;
    var headTipInfo = `请选择您的游戏信息`;

    if (this.data.gameRegion && this.data.levelId) {
      //str = `已选：<span class="play-head-info-detail-split">${gameRegionArr[this.gameRegion - 1]}</span><span class="play-head-info-detail-split">${levelIdArr[this.levelId - 1]}</span>${this.gameNumber}局`;
      headTipInfoFlag = true;
      priceStr = `价格：${priceArr[this.data.levelId - 1]}元／局`;
    }
    else if (this.data.gameRegion) {
      headTipInfo = `请选择您的游戏段位`;
      priceStr = '';
    }
    else if (this.data.levelId) {
      headTipInfo = `请选择您的游戏大区`;
      priceStr = `价格：${priceArr[this.data.levelId - 1]}元／局`;

    }
    else {
      headTipInfo = `请选择您的游戏信息`;
      priceStr = '';
    }

    this.setData({ headTipInfoFlag, headTipInfo, priceStr});

  },
  initTipInGroup: function () {
    var sid = app.globalData.sid;
    var orderId = this.data.orderId;
    var This = this;
    wx.request({
      url: server + "help/training/order/detail",
      data: { sid, orderId },
      success: (data) => {
        if (data.data.suc == '200') {
          var info = data.data.data.training.trainer;
          var gameRegion = data.data.data.training.gameRegion;
          var nickName = info.nickName;
          var headImg = info.avatarUrl;
          var desc = info.pvpLevel.name + info.pvpLevelStar + '星';
          var qrCode = 'https://image.qunmee.com/wxapp/' + ((gameRegion === 1) ? info.qrCodeImg : info.qqGroupImg);

          var singlePersonFlag = (data.data.data.training.gamePersons > 1) ? false : true;
          this.countDownEv(data.data.data.training.countdown);
          this.setData({ nickName, headImg, desc, qrCode, singlePersonFlag});

        }
      }
    })
  },
  countDownEv: function (time) {
    var This = this;
    this.setData({time: time});
    var callback = function () {
      if (This.data.time > 0) {
        setTimeout(callback, 1000)
      }
      This.setData({ countDown: tranferCountDwon(This.data.time), time: This.data.time - 1 });
    }

    callback();

    function tranferCountDwon(value) {
      if (value <= 0) {
        return '准备发车';
      }
      var min = '';
      var sec = '';

      min = _tranferDate(Math.floor(value / 60));
      sec = _tranferDate(value % 60);

      function _tranferDate(val) {
        return val < 10 ? '0' + val : val;
      }

      return `${min}:${sec}`;


    }
  },
  transferTime: function (time) {

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
  onShow: function () {
    this.setData({ countDown: '' });
    console.log(1)
    console.log(this.data.countDown);
    wx.clearStorage();
    mta.Event.stat("playindexcount", {});
    app.login(this.gainData, this);
  },
  onShareAppMessage: function () {
    return {
      title: '问技陪练，正规公司运营，职业王者服务',
      path: '/pages/peilian/playIndex/playIndex',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      },
      complete: function (res) {
        console.log(res.shareTickets[0]);
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete: function (res) {
            var { encryptedData, iv } = res;
            wx.login({
              success: function (res) {
                if (res.code) {
                  var sid = app.globalData.sid;
                  var code = res.code;
                  wx.request({
                    url: server + "help/wxgroup/share",
                    data: { sid, encryptedData, code, iv },
                    success: (data) => {
                      if (data.data.suc == '200') {
                      }
                      else {
                        wx.showToast({
                          title: '获取分享入群信息失败',
                          duration: 1000
                        });
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    }
  }
})