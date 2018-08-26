// pages/comment/index.js
import { apiRequest } from '../../utils/net';

// https://github.com/icindy/wxParse
const WxParse = require('../../wxParse/wxParse.js');

import { formatTime } from '../../utils/commen.js';

let offset = 1;

function comments(id, that) {
  wx.showLoading({
    title: '加载中...',
  });
  apiRequest({
    url: '/comment/music',
    method: 'GET',
    data: {
      id: id,
      limit: 15,
      offset: offset
    },
    success: function (res) {
      wx.hideLoading();
      let comments = [];
      let content = [];
      res.data.comments.forEach((item, index) => {
        let time = formatTime(new Date(item.time));

        content.push(
          `<div class="weui-cell weui-cell_access">
              <div class="weui-cell__hd">
                  <img src="${item.user.avatarUrl}" class="avatarUrl">
              </div>
              <div class="weui-cell__bd comment-section">
                  ${item.user.nickname}
                  <div>${item.content}</div>
              </div>
              <span class="weui-cell__ft time">${time}</span>
          </div>
          `
        );
      });
      // 数组拼接concat
      content = that.data.content.concat(content)
      that.setData({
        content: content
      });
      for (let i = 0; i < content.length; i++) {
        WxParse.wxParse('content' + i, 'html', content[i], that);
        if (i === content.length - 1) {
          /**
          * WxParse.wxParse(bindName , type, data, target,imagePadding)
          * 1.bindName绑定的数据名(必填)
          * 2.type可以为html或者md(必填)
          * 3.data为传入的具体数据(必填)
          * 4.target为Page对象,一般为this(必填)
          * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
          */
          WxParse.wxParseTemArray("contentArray", 'content', content.length, that, 5);
        }
      }

    }
  });
  offset = offset + 1;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    windowHeight: 0,
    content: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    // 在这里设置表情
    /**
    * WxParse.emojisInit(reg,baseSrc,emojis)
    * 1.reg，如格式为[00]=>赋值 reg='[]'
    * 2.baseSrc,为存储emojis的图片文件夹
    * 3.emojis,定义表情键值对
    */
    WxParse.emojisInit('[]', "../../wxParse/emojis/", {
      "微笑": "00.gif",
      "撇嘴": "01.gif",
      "色": "02.gif",
      "呆": "03.gif",
      "得意": "04.gif",
      "大哭": "09.gif",
      "衰": "36.gif",      
      "亲亲": "52.gif",
      "牵手": "81.gif"

    });

    that.setData({
      id: options.id
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      },
    })

    comments(options.id, that);

  },
  onShow: function () {
    let that = this;
    // let replyArr = that.data.comments;
    // console.log(that.data.comments)
    // for (let i = 0; i < replyArr.length; i++) {
    //   WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
    //   if (i === replyArr.length - 1) {
    //     WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
    //   }
    // }
  },
  lower(e) {
    let that = this;
    comments(that.data.id, that)
  },
  comment(e) {
    console.log(e)
    wx.request({
      url: '',
      method: 'POST',
      data: {

      },
      success: function (res) {

      },
      fail: function (err) {

      }
    })
  }

})