const app = getApp();
const util = require('../../../../utils/util');
const requestUtil = require('../../../../utils/requestUtil');
const $ = require('../../../../utils/underscore');
const _DuoguanData = require('../../../../utils/data');
const WxParse = require('../../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule_hide: true,
    wordcon: null,
    word_hide: true,
    lotter_rec: null,
    lot_more: false,
    get_word: false,
    lot: true,
    ass: false,
    win: false,
    ass_rec: null,
    win_rec: null,
    lotpage: 1,
    is_help: false,
    is_my: true,
    userid: null,
    helpword: null,
    canget: false,
    help_hide: true,
    redstatus: 1,
    redcode: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.trySyncUserInfo();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2e5fcf',
    })
    this.mywordinit(options);
  },
  mywordinit: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/IndexApi/wordIndex.html', options, (info) => {
      that.setData({
        word_hide: true,
        wordcon: info,
        wid: info.id,
        get_word: info.get_word,
        is_help: info.is_help,
        is_my: info.mine,
        userid: options.userid,
        helpword: info.helpword,
        redstatus: info.redstatus,
        redcode: info.redcode
      }, function () {
        that.lotter_rec();
      })
      WxParse.wxParse('description', 'html', info.word_content, that);
    });
  },
  lotter_rec: function () {
    let that = this;
    let options = {};
    options.wid = that.data.wid;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/IndexApi/lotter.html', options, (info) => {
      if (info != null) {
        that.setData({
          lotter_rec: info,
          lot_more: true
        })
      }
    });
  },
  nohelp: function (e) {
    this.setData({
      is_help: true
    })
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
  getword: function (e) {
    let that = this;
    that.setData({
      canget: true
    }, function () {
      let formid = e.detail.formId;
      requestUtil.pushFormId(formid);
      let options = {};
      options.wid = e.detail.value.wid;
      requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/GetWordApi/getMyWord.html', options, (info) => {
        if (info.word) {
          that.setData({
            word_hide: false,
            myword: info.word,
            canget: false
          })
        }
      });
    })
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
    util.trySyncUserInfo();
    let that=this;
    let options={};
    if ($.isUndefined(that.data.userid)==false){
      options.userid = that.data.userid;
    }    
    that.mywordinit(options);
    wx.stopPullDownRefresh()
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
    let that = this;
    let userinfo = wx.getStorageSync('user_info');
    let uid = userinfo.uid;
    if (res.type == 'submit') {
      let formid = res.detail.formId;
      requestUtil.pushFormId(formid);
    }
    return {
      title: that.data.wordcon.share_title,
      path: '/pages/plug-in/collectWord/index/index?userid=' + uid,
      success: function (res) {
      },
      fail: function (res) {
      }
    }
  },
  showrule: function (e) {
    let formid = e.detail.formId;
    requestUtil.pushFormId(formid);
    this.setData({
      rule_hide: false
    })
  },
  hiderule: function (e) {
    this.setData({
      rule_hide: true
    })
  },
  onlot: function () {
    let that = this;
    that.setData({
      lot: true,
      ass: false,
      win: false
    })
  },
  onass: function () {
    let that = this;
    that.setData({
      lot: false,
      ass: true,
      win: false
    }, function () {
      let options = {};
      options.wid = that.data.wid;
      requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/GetWordApi/onass.html', options, (info) => {
        that.setData({
          ass_rec: info
        })
      })
    })
  },
  onwin: function () {
    let that = this;
    that.setData({
      lot: false,
      ass: false,
      win: true
    }, function () {
      let options = {};
      options.wid = that.data.wid;
      requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/GetWordApi/onwin.html', options, (info) => {
        that.setData({
          win_rec: info
        })
      })
    })
  },
  mygetword: function (e) {
    wx.reLaunch({
      url: '/pages/plug-in/collectWord/index/index',
      fail: function (res) {
        console.log(res);
      }
    })
  },
  helpuser: function () {
    let that = this;
    let options = {};
    options.wid = that.data.wid;
    options.userid = that.data.userid
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/GetWordApi/helpuser.html', options, (info) => {
      that.setData({
        is_help: true,
        help_hide: false,
        helpword: info.word,
        userid: options.userid
      })

    });
  },
  helpinit: function () {
    let that = this;
    let options = {};
    options.userid = that.data.userid;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/IndexApi/wordIndex.html', options, (info) => {
      that.setData({
        word_hide: true,
        wordcon: info,
        wid: info.id,
        get_word: info.get_word,
        is_help: info.is_help,
        help_hide: info.is_help,
        is_my: info.mine,
        userid: options.userid,
        helpword: info.helpword
      }, function () {
        that.lotter_rec();
      })
      WxParse.wxParse('description', 'html', info.word_content, that);
    });
  },
  redeem: function (e) {
    let that = this;
    let formid = e.detail.formId;
    requestUtil.pushFormId(formid);
    let options = {};
    options.wid = that.data.wid;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingWord/IndexApi/redeem.html', options, (info) => {
      that.setData({
        redstatus: 3,
        redcode: info
      })
    });
  }
})