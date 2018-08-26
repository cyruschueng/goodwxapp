"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
import { Token } from '../../utils/token.js';
import { $wuxButton } from '../../packages/@wux/components/wux'
import api from '../../api/api_v1.js'
exports.default = Page({
  data: {
    types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    index: 3,
    opened: !1,
    uid: 0,
    maskStatus: 'hide'
  },
  onLoad() {
    // 1. 初始化菜单按钮
    this.initButton();
    // 2. 载入用户的聚会列表
    var that = this;
    var uid = wx.getStorageSync('uid')
    if (uid) {
      this.setData({ uid: uid })
      that.loadActivityList(uid);
    } else {
      var token = new Token();
      token.getTokenFromServer((cb) => {
        that.setData({ uid: cb.uid })
        token.saveUserInfo(cb.uid)
        that.loadActivityList(cb.uid);
      });
    }
  },

  // 初始化菜单按钮 默认在左下角
  initButton(position = 'bottomLeft') {
    var that = this;
    this.setData({
      opened: !1,
    })

    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '关于我们',
          icon: "/common/assets/images/menu_yj_1.png",
        },
        {
          label: '聚会游戏',
          icon: "/common/assets/images/menu_yx_1.png",
        },
        {
          label: '发布活动',
          icon: "/common/assets/images/menu_fb_1.png",
        }
      ],
      buttonClicked(index, item) {
        index === 0 && wx.navigateTo({
          url: '/pages/about/index'
        })

        index === 1 && wx.navigateTo({
          url: '/pages/game/index'
        })

        index === 2 && wx.navigateTo({
          url: '/pages/activity/index'
        })

        return true
      },
      callback(vm, opened) {
        if (opened) {
          that.setData({ maskStatus: 'show' })
        } else {
          that.setData({ maskStatus: 'hide' })
        }
        vm.setData({
          opened,
        })
      },
    })
  },

  // 载入聚会列表
  loadActivityList: function (uid) {
    var that = this;
    api.getActivityList({
      query: {
        id: uid
      },
      success: (res) => {
        if (res.data.res === 0) {
          console.log('activity_list', res.data.data)
          that.setData({
            activity_list: res.data.data,
          })
        }
      } 
    })
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadActivityList(this.data.uid);
    wx.stopPullDownRefresh();
  },

  onRefresh: function () {
    this.loadActivityList(this.data.uid);
  }
});
