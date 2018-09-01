import Api from '/../../../../utils/config/api.js';  //每个有请求的JS文件都要写这个，注意路径
import { GLOBAL_API_DOMAIN } from '/../../../../utils/config/config.js';
var utils = require('../../../../utils/util.js')
var app = getApp();
Page({
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    comment_list: [],
    page: 1,
    id: '',
    source: '',   //请求来源   查明是谁来调用这个文件
    cmtType: '',  //评论类别
    reFresh: true
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      // source: options.source,
      cmtType: options.cmtType
    });
    this.commentList();
  },
  //评论列表
  commentList: function () {
    let that = this;
    wx.request({
      url: that.data._build_url + 'cmt/list',
      data: {
        refId: that.data.id,
        cmtType: that.data.cmtType,
        zanUserId: app.globalData.userInfo.userId,
        page: that.data.page,
        rows: 8
      },
      success: function (res) {
        let data = res.data;
        wx.hideLoading();
        if (data.code == 0 && data.data.list != null && data.data.list != "" && data.data.list != []) {
          let comment_list = that.data.comment_list;
          let _data = res.data.data.list
          for (let i = 0; i < _data.length; i++) {
            _data[i].content = utils.uncodeUtf16(_data[i].content)
            comment_list.push(_data[i]);
          }
          that.setData({
            comment_list: comment_list,
            reFresh: true
          })
        } else {
          that.setData({
            reFresh: false
          })
        }
        if (that.data.page == 1) {
          wx.stopPullDownRefresh();
        } else {
          wx.hideLoading();
        }
      }
    })
  },
  //评论点赞
  toLike: function (event) {
    let that = this,
      id = event.currentTarget.id,
      index = "";
    for (var i = 0; i < this.data.comment_list.length; i++) {
      if (this.data.comment_list[i].id == id) {
        index = i;
      }
    }
    wx.request({
      url: that.data._build_url + 'zan/add?refId=' + id + '&type=4&userId=' + app.globalData.userInfo.userId,
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            icon: 'none',
            title: '点赞成功'
          })
          var comment_list = that.data.comment_list
          comment_list[index].isZan = 1;
          comment_list[index].zan++;
          that.setData({
            comment_list: comment_list
          });
        }
      }
    })
  },
  //取消点赞
  cancelLike: function (event) {
    let that = this,
      id = event.currentTarget.id,
      cmtType = "",
      index = "";
    for (var i = 0; i < this.data.comment_list.length; i++) {
      if (this.data.comment_list[i].id == id) {
        index = i;
      }
    }
    wx.request({
      url: that.data._build_url + 'zan/delete?refId=' + id + '&type=4&userId=' + app.globalData.userInfo.userId,
      method: "POST",
      success: function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            icon: 'none',
            title: '已取消'
          })
          var comment_list = that.data.comment_list
          comment_list[index].isZan = 0;
          comment_list[index].zan == 0 ? comment_list[index].zan : comment_list[index].zan--;
          that.setData({
            comment_list: comment_list
          });
        }
      }
    })
  },
  //用户下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      comment_list: [],
      page: 1,
      reFresh: true
    });
    this.commentList();
  },
  //用户上拉触底
  onReachBottom: function () {
    if (this.data.reFresh) {
      wx.showLoading({
        title: '加载中..'
      })
      this.setData({
        page: this.data.page + 1
      });
      this.commentList();
    }
  }
})