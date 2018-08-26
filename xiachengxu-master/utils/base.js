import { Config } from 'config.js';
import { Token } from './token.js';
class Base {
  constructor() {
    'use strict';
    this.restUrl = Config.restUrl;
  }
  request(params, reFetch) {
    var that = this,
      url = this.restUrl + params.url;
    if (!params.type) {
      params.type = 'GET';
    }
    if (Object.keys(params && params.data).length) {
      var wxSid = wx.getStorageSync('wxSid');
      var wxUid = wx.getStorageSync('wxUid');
      params.data.data.wxSid = wxSid;
      if (!params.data.from) {
        params.data.data.wxUid = wxUid;
      }

      delete params.data.from;
    }
    wx.request({
      url: url,
      method: params.type,
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var code = res.statusCode.toString();
        if (code.charAt(0) == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401' && !noFetch) {
            that._refetch(params);
          }
          that._processErr(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: (err) => {
        this._processErr(err);
        params.eCallback && params.eCallback(err);
      }
    })
  }
  _processErr(res) {
    console.log(res);
    wx.showToast({
      title: `请求服务错误`,
      icon: 'success',
      duration: 1000
    })
  }
  _refetch(param) {
    var token = new Token(), that = this;
    token.getTokenFromServer((token) => {
      that.request(param, true);
    });
  }
  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };
  /* 存储formId 以供发送模板消息 */
  dealFormIds(formId) {
    let formIds = wx.getStorageSync('formIds');//获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];
    let data = {
      formId: formId,
      createTime: parseInt(new Date().getTime()), //计算7天后的过期时间时间戳
      wxUid: wx.getStorageSync('wxUid'),
      storeNo: wx.getStorageSync('storeNo')
    }
    formIds.push(data);//将data添加到数组的末尾
    wx.setStorageSync('formIds', formIds) //保存推送码并赋值给全局变量
  }
}

module.exports = {
  Base
}
