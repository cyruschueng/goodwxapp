import * as types from '../../types';
import { takeLatest } from 'redux-saga';
import { call, put, take, fork } from 'redux-saga/effects';

function *updateViewConfig ({payload = {}}) {
  const {
    title,
    pageLoading
  } = payload;
  if (title) {
    wx.setNavigationBarTitle({title});
  }
  if (typeof pageLoading !== 'undefined') {
    if (!pageLoading) {
      wx.hideToast();
    } else {
      const {title = '加载中', mask = true} = pageLoading;
      wx.showToast({
        title,
        mask,
        icon: 'loading',
        duration: 10000
      });
    }
  }
}

export default function * () {
  yield takeLatest(types.UPDATE_VIEW_CONFIG, updateViewConfig);
}
