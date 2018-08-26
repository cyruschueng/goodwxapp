const app = getApp();
const util = require('../../../../utils/util');
const requestUtil = require('../../../../utils/requestUtil');
const $ = require('../../../../utils/underscore');
const _DuoguanData = require('../../../../utils/data');
const WxParse = require('../../../../wxParse/wxParse.js');
import plugUtil from '../../../../utils/plugUtil';
function GetDateDiff(DiffTime) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式   
  return DiffTime.replace(/\-/g, "/");
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    like: null,
    rule: true,
    isin: false,
    inlike: false,
    mylike: null,
    likeid: null,
    listinfo: null,
    headlist: null,
    cutdown: '00 天 00 时 00 分 00 秒',
    getshow: true,
    getit: false,
  },
  title:'',
  setintvalid: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.hideShareMenu();
    that.setData({
      options: options
    }, function () {
      util.trySyncUserInfo();
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ed4649',
      })
      that.mylikeinit(options);
      wx.stopPullDownRefresh();
    })

  },
  mylikeinit: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/IndexApi/index.html', options, (info) => {
      that.title=info.share_title
      that.setData({
        like: info,
        mylike: info.myinfo,
        inlike: info.mylike,
        likeid: info.id
      }, function () {
        let userinfo = wx.getStorageSync('user_info');
        let uid = userinfo.uid;
        let likeid = that.data.likeid;
        let url = 'pages/plug-in/supportCompetition/help/help?userid=' + uid + '&likeid=' + likeid;
        plugUtil.setShare(that, that.data.options.module, url);
        let options = {};
        options.likeid = that.data.likeid;
        that.mylikelist(options);
        that.mylikeheadimg(options);
        if (that.data.like.ljstart) {
          that.mylikelj(that.data.like.ljstart_true_time);
        }
        if (that.data.like.start){
          that.mylikelj(that.data.like.start_time);
        }
      })
      WxParse.wxParse('description', 'html', info.like_content, that);
    });
  },
  mylikelj: function (info) {
    let thistime = new Date().getTime();
    let start_time = Date.parse(GetDateDiff(info));
    let cha = start_time - thistime;
    let that = this;
    that.setintvalid = setInterval(function () {
      cha -= 1000;
      if (cha <= 0) {
        clearInterval(that.setintvalid);
        cha = 0;
        return;
      }
      that.time_meter(cha);
    }, 1000);
  },
  time_meter: function (timer) {
    let that = this;
    let dd = parseInt(timer / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
    let hh = parseInt(timer / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
    let mm = parseInt(timer / 1000 / 60 % 60, 10);//计算剩余的分钟数
    let ss = parseInt(timer / 1000 % 60, 10);//计算剩余的秒数
    dd = that.checkTime(dd);
    hh = that.checkTime(hh);
    mm = that.checkTime(mm);
    ss = that.checkTime(ss);
    let cutdown = dd + ' 天 ' + hh + '时' + mm + '分' + ss + '秒'
    that.setData({
      cutdown: cutdown
    })
  },
  checkTime: function (i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },
  mylikeheadimg: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/getmylikehead.html', options, (info) => {
      that.setData({
        headlist: info
      })
    });
  },
  mylikelist: function (options) {
    let that = this;
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/getlist.html', options, (info) => {
      that.setData({
        listinfo: info
      })
    });
  },
  rule_show: function () {
    let that = this;
    that.setData({
      rule: false
    })
  },
  rule_hide: function () {
    let that = this;
    that.setData({
      rule: true,
    })
  },
  Instrant: function (e) {
    let that = this;
    that.setData({
      isin: true
    }, function () {
      let formid = e.detail.formId;
      requestUtil.pushFormId(formid);
      let options = {};
      options.likeid = e.detail.value.likeid;
      requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/inlike.html', options, (info) => {
        that.setData({
          inlike: info
        }, function () {
          let options = that.data.options;
          that.mylikeinit(options);
        })
      });
    })
  },
  lookrank: function () {
    let that = this;
    wx.navigateTo({
      url: '/pages/plug-in/supportCompetition/ranking/ranking?likeid=' + that.data.likeid,
    })
  },
  getshow: function () {
    let that = this;
    that.setData({
      getshow: false
    })
  },
  gethide: function () {
    let that = this;
    that.setData({
      getshow: true
    })
  },
  getprize: function (e) {
    let fromid = e.detail.formId;
    requestUtil.pushFormId(fromid);
    let that = this;
    that.setData({
      getit: true
    }, function () {
      let options = e.detail.value;
      if ($.isEmpty(options) || options.realname == "" || options.mobile == "") {
        that.setData({
          getit: false,
        }, function () {
          wx.showModal({
            content: '信息填写不完整',
          })
        })
        return;
      }
      that.setData({
        getit: false,
      }, function () {
        options = $.extend({ likeid: that.data.likeid }, options);
        requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/MarketingLike/Mylike/getprize.html', options, (info) => {
          that.setData({
            getshow: info
          }, function () {
            that.mylikeinit(that.data.options);
          })
        });
      })
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
    let that = this;
    let options = that.data.options;
    util.trySyncUserInfo();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ed4649',
    })
    that.mylikeinit(options);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    let that = this;
    if (e.type == 'submit') {
      let formid = e.detail.formId;
      requestUtil.pushFormId(formid);
    }
    let userinfo = wx.getStorageSync('user_info');
    let uid = userinfo.uid;
    let likeid = that.data.likeid;
    let url = 'pages/plug-in/supportCompetition/help/help?userid=' + uid + '&likeid=' + likeid;
    return {
      title: that.title ? that.title : that.data.like.like_title,
      path:url,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      }
    }
  }
})