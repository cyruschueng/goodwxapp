// pages/club/memberActivitiesDetails.js

import moment from '../../utils/npm/moment';
import * as clubService from '../../services/club-service';
import * as clubdata from '../../utils/clubdata-format';
import * as AuthService from '../../services/auth-service';
import { Base64 } from '../../utils/urlsafe-base64';

var timer;

let pageOptions = {

  /**
   * 页面的初始数据
   */
  data: {
    days: 0,
    hour: 0,
    mints: 0,
    second: 0,
    clock: false,
    activities: null,

    activeId: '',
    gym: null,

    isCertificationMem: false,
    is_modal_Hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      activeId: options.activeId,
      gym: AuthService.getMemberInfo() ? AuthService.getMemberInfo().gym : ''
    })

    if (options.gym) {
      this.setData({
        gym: options.gym
      })
    }

    this.getClubDetail(options.activeId);

    // 验证 查看的人 是否是会员，若不是，则调用注册 。用转发的人的gym
    
    console.log('options .. ' + JSON.stringify(options));
    // 1、检验是否是会员
    this.getCertifiMem();
    

  },
  onUnload: function (options) {
    clearTimeout(timer);
  },
  getCertifiMem() {
    if (AuthService.getMemberInfo()) {
      this.setData({
        isCertificationMem: true
      })
      console.log('*已认证会员*');
    } else {
      console.log('*未认证会员*');
    }
    this.setData({
      is_modal_Hidden: true
    })
  },

  // 详情
  getClubDetail(activeId) {
    clubService.queryClubActiveDetail(activeId,this.data.gym).then((result) => {
      if (result.result.state == 'end') {
        this.setData({
          clock: true
        })
      }
      this.setData({
        activities: clubdata.formatClubDetail(result.result)
      })
      this.activitiesCountdown(this, result.result.state);
    }).catch((error) => {
      console.log(error);
    })
  },

  // 活动 结束倒计时
  activitiesCountdown(that, state) {
    var EndTime = this.data.activities.endTime;
    var StartTime = this.data.activities.startTime;
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];

    if (state == 'ready') {
      total_micro_second = StartTime - NowTime || [];
    }
    // console.log('EndTime: ' + EndTime);
    // console.log('剩余时间：' + total_micro_second);
    // 渲染倒计时时钟
    that.activitiesDateformat(total_micro_second, that);

    if (total_micro_second <= 0) {
      that.setData({
        clock: true
      });
      return;
    }
    timer = setTimeout(function () {
      total_micro_second -= 1000;
      that.activitiesCountdown(that, state);
    }, 1000)
  },

  // 时间格式化输出，如11:03 25:19 每1s都会调用一次
  activitiesDateformat(micro_second,that) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // console.log(' *** ' + day + "天" + hr + "小时" + min + "分钟" + sec + "秒" );
    that.setData({
      days: day,
      hour: hr,
      mints: min,
      second: sec
    })
  },

  bindCardItemTap(e) {

    if (this.data.activities.timeTitle == '活动已结束') {
      wx.showToast({
        icon: 'none',
        title: '活动已结束！'
      })
    } else {
      // 当 转发出去 点击的人 打算点击买卡的时候 再请求注册 会员
      if (this.data.isCertificationMem) {
        // 已认证 会员 
        console.log('已认证 会员 .. ');

        if (this.data.activities.state == 'join') {
          wx.showToast({
            icon: 'none',
            title: '您已参加过此活动！'
          })
        } else {

          if (e.currentTarget.dataset.cards.cardType == '005' || e.currentTarget.dataset.cards.cardType == '006') {
            // 一种是走的 购买课程
            var qsCard = Base64.encodeURI(JSON.stringify(e.currentTarget.dataset.cards));
            wx.navigateTo({
              url: '../home/onlinePaymentForClass?cards=' + qsCard,
            })
          } else {
            // 一种是走的 购买卡
            var qsCard = Base64.encodeURI(JSON.stringify(e.currentTarget.dataset.cards));
            wx.navigateTo({
              url: '../home/onlinePaymentForCard?cards=' + qsCard,
            })
          } 
        }

      } else {
        // 未认证 会员
        // 请求 微信授权
        this.getWXAuthorization();
        // 请求 会员认证
        this.getMyCertification();
        console.log('未认证 会员 .. ');
      }
    }

  },
  // 请求 微信授权
  getWXAuthorization() {
    AuthService.wxappLogin().then(() => {
      console.log('LoggedIn.');
    }).catch(error => {
      console.log('Not Logged In');
    });
    console.log('请求 微信授权 .. ');
  },
  // 请求会员认证
  getMyCertification() {
    this.setData({
      is_modal_Hidden: false
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var me = this;
    return {
      title: me.data.activities.title,
      path: 'pages/club/memberActivitiesDetails?activeId=' + me.data.activeId + '&gym=' + me.data.gym,
      success: function (res) {
        // 转发成功
        console.log('转发成功 title.. ' + me.data.activities.title);
        console.log('转发成功 activeId.. ' + me.data.activeId);
        console.log('转发成功 activeId.. ' + me.data.gym);
        // console.log('转发成功 res.. ' + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log('转发失败');
      }
    }
  }
}

Page(pageOptions)