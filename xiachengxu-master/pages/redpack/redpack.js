// pages/redpack/redpack.js
import { RedPack } from 'redpack-model.js';
import { countDown } from '../../utils/util.js';
var redpack = new RedPack();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOwn: false, // 是否属于自己开的团
    hasMe: false, // 是否已经参加此拼团
    complete: false, // 此拼团是否完成
    showRedPackInfo: false, // 获得红包弹窗
    isShowTip: false, // 文字弹窗提示
    products: [], // 推荐的商品列表
    tipInfo: '',
    redpackDetail: {
      // 红包页的所有详细信息（包括团长和其他人的信息）
      wxUid: 12,
      nickName: 'Luby',
      headImage: '/images/icon/logo.png',
    },
    existList: [// 此团存在的人的信息
      // {
      //   wxUid: 1,
      //   nickName: 'Luby',
      //   avatarUrl: 'Luby'
      // }
    ],
    remainList: [1, 2, 3], // 剩余几个人凑齐
    userList: [    // 该团拼完后各个人得奖数据
      {
        nickName: 'Luby',
        avatarUrl: '/images/icon/logo.png',
        bonus: 15
      },
      {
        nickName: 'parllay',
        avatarUrl: '/images/icon/logo.png',
        bonus: 5
      },
      {
        nickName: '肖声',
        avatarUrl: '/images/icon/logo.png',
        bonus: 20,
        isBest: true
      },
      {
        nickName: 'sun',
        avatarUrl: '/images/icon/logo.png',
        bonus: 10
      }
    ],
    isShowRule: false,
    ruleList: [
      '1、可用于购买拼多多平台全场商品使用，一个订单仅限使用一张，有效期3天，请尽快使用;',
      '2、活动期间，每个用户每天最多可邀请5个用户，多邀请的无效;',
      '3、活动最终解释权归拼多多所有;',
      '4、需要关注“拼多多”公众号，以便接收活动消息与红包奖励通知;',
      '5、毎邀请一位未关注拼多多公众号的新人好友，即可获得红包奖励，最高可得20元，奖励累计，无上限;',
      '6、新二维码有效期为30天，失效后需重新生成。'
    ],
    totalMill: 3600000, // 倒计时毫秒数
    remainMill: 0, // 剩余时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    if (options.id) {
      // 获取拼团状态
      this._loadData();
    } else {
      this.addCampaign();
    }
  },
  _loadData() {
    var that = this;
    /**
     * 如果传来ID则去获取此ID的拼团的数据
     * 否则去校验此人是否开了团，有则获取数据
     * 没有开过则为他新开一个拼团
     */
    var postData = {
      data: {
        instanceId: this.data.id
      }
    };
    this.getRedPackInfo(postData);

    // this.getRecommendProducts();
  },
  // 获取该团的用户列表信息
  getRedPackInfo(params) {
    var that = this, userInfo = that.data.userInfo;
    // countDown(that, 'remainMill', this.data.totalMill);
    /**
     * 查询到拼团信息有如下几种情况
     * 1、是自己开的团还没结束
     * 2、不是自己开的团还没结束（已经参加或者还没参加）
     * 3、过期或者结束（需要再次调用获取好友手气接口，有自己则显示分到的金额数，没有自己则显示四个人的头像）
     * 4、查询出错后端报错
     */
    redpack.getUserList(params, res => {
      if (res.status && res.code == 0) {
        // 此拼团还未结束
        var remainMill = res.data.endTime - new Date().getTime(), data = res.data;
        if (remainMill) {
          countDown(that, 'remainMill', remainMill);
        }
        let exist = false;
        data.friendList.forEach(item => {
          if (item.wxUid == userInfo.wxUid) {
            // 参团列表里包含自己
            exist = true;
          }
        });
        var remainList = that.remainPush(data.friendList);
        that.setData({
          complete: !remainMill > 0,
          isOwn: data.wxUid == userInfo.wxUid,
          hasMe: exist,
          redpackDetail: {
            wxUid: data.wxUid,
            nickName: data.nickName,
            headImage: data.headImage
          },
          existList: data.friendList,
          remainList: remainList
        });
      } else {
        // 查询出错

      }
    });
  },
  /**
   * 获取推荐商品
   */
  getRecommendProducts() {
    var that = this;
    var params = {
      data: {
        wxUid: 'jack',
        wxSid: 'jack',
        storeId: 1,
        page: 1,
        size: 10
      }
    };
    redpack.getRecommendProducts(params, res => {
      let data = res.status ? res.data : [];
      that.setData({
        products: data
      });
    })
  },
  onProductTap(e) {
    var id = redpack.getDataSet(e, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },
  closeRedPackInfo() {
    /**
     * 查询此拼团信息，还剩几个人可以拆开红包
     */
    // todo
    var num = this.data.remainList.length, that = this;
    var info = '您的红包还差' + num + '人才能拆开，别忘记了邀请好友一起拆哦';
    this.setData({
      showRedPackInfo: !this.data.showRedPackInfo,
      isShowTip: true,
      tipInfo: info
    });
    setTimeout(() => {
      that.setData({
        isShowTip: false
      });
    }, 2000);
  },
  showRules() {
    this.setData({
      isShowRule: true
    });
  },
  closeRule() {
    this.setData({
      isShowRule: false
    });
  },
  /**
   * 开团
   */
  addCampaign() {
    var userInfo = app.globalData.userInfo, that = this;
    if (!userInfo) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data
        });
      });
    } else {
      var postData = {
        data: {
          campId: 123,
          instanceName: '圣诞节活动',
          fromInstance: 1,
          fromUser: '1',
          fromUid: '1',
          wxUid: userInfo.nickName,
          nickName: userInfo.nickName,
          headImage: userInfo.avatarUrl
        }
      }, that = this;

      redpack.addCampaign(postData, res => {
        /**
         * 开团有以下3种情况
         * 1、自己24小时之前没有开过，或者自己之前开的团完成或者是过期则开团成功 status: true, code: 0;
         * 2、自己24小时内开的团则不重复开团，重新调用一次获取拼团的信息 status: true, code: 1,需要返回他开团的拼团ID
         * 3、开团失败、后端报错 status = false, code: 0
         */
        if (res.status) {
          if (res.code == 0) {
            var userInfo = that.data.userInfo;
            // 新开团倒计时24小时
            countDown(that, 'remainMill', 86400000);
            that.setData({
              existList: [],
              remainList: [1, 2, 3]
            });
          } else {
            // 之前已经开过的团
            let data = res.data, remainList = [];
            countDown(that, 'remainMill', data.endTime - new Date().getTime());
            for (var i = 1; i <= 3 - data.friendList.length; i++) {
              remainList.push(i);
            }
            remainList = that.remainPush(data.friendlist);
            that.setData({
              existList: data.friendList,
              remainList: remainList
            });
          }
          this.setData({
            redpackDetail: {
              wxUid: userInfo.wxUid,
              nickName: userInfo.nickName,
              headImage: userInfo.avatarUrl
            },
            showRedPackInfo: true,
            isOwn: true,
            hasMe: true,
          });
        } else {

        }
      });

    }
  },
  /**
   * 参团
   */
  insertCampaign() {
    var userInfo = app.globalData.userInfo, that = this;
    if (!userInfo) {
      app.getUserSetting(data => {
        that.setData({
          userInfo: data
        });
      });
    } else {
      var postData = {
        instanceId: 1,
        wxUid: 'Luby',
        nickName: userInfo.nickName,
        headImage: userInfo.avatarUrl
      };
      redpack.insertCampaign(postData, res => {
        /**
         * 参团有可能出现3种情况
         * 1、参团成功，将自己加入参团 status: true, code: 0
         * 2、参团成功，自己是最后一个参团的人 status: true, code: 1
         * 3、参团失败，可能红包已被拆完或者是后台报错 status: false, code: 0
         */
        if (res.status) {
          // 参团成功
          that._loadData();
        } else {

        }
      });

    }
  },
  remainPush(arr) {
    var remainList = [];
    for (var i = 1; i <= 3 - arr.length; i++) {
      remainList.push(i);
    }
    return remainList;
  }

})