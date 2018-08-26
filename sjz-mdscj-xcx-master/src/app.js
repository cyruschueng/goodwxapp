require('es6-promise').polyfill();

import wx from 'labrador';
import { setStore } from 'labrador-redux';
import createStore from './createStore';
import request from './utils/request';
import * as types from './types';
import config from './config';

if (__DEV__) {
  console.log('当前为开发环境');
}

// // 向labrador-redux注册store
const store = createStore();

request.setStore(store);

setStore(store);

export default class {
  async onLaunch (ops) {
    ops = ops || {};
    console.log('onLaunchShareOps', ops);
    wx.setStorage({key: 'dataShare', data: ops.shareTicket});
    wx.setNavigationBarTitle({title: config.miniProName});
  }
  async onShow(ops) {
    ops = ops || {};
    console.log('onShowShareOps', ops);
    wx.setStorage({key: 'dataShare', data: ops.shareTicket});
  }
}
