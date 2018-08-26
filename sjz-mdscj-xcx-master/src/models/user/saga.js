import wx from 'labrador';

import * as types from '../../types';
import * as service from '../../services/user';

import { takeEvery } from 'redux-saga';
import { call, put, select, take, fork } from 'redux-saga/effects';

function *userLogin () {
  while (true) {
    try {
      const { source } = yield take(types.USER_LOGIN_REQUEST);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: {}
      }});

      const loginRes = yield call(wx.login);
      const userInfo = yield call(wx.getUserInfo);
      yield call(service.ucLogin, loginRes.code, userInfo.encryptedData, userInfo.iv, userInfo.rawData, userInfo.signature, source);
      const res = yield call(service.getInfo);

      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});

      yield put({type: types.USER_LOGIN_SUCCESS, payload: res.data});
      if (!source) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1500
        });
      }
    } catch (e) {
      yield put({type: types.UPDATE_VIEW_CONFIG, payload: {
        pageLoading: false
      }});
      let loginCancel = ~e.toString().indexOf('getUserInfo') || ~e.toString().indexOf('login');
      if (loginCancel) {
        wx.showModal({
          title: '警告', 
          content: '若不授权将无法进行下面的流程,请10分钟后再次点击授权或者删除小程序重新进入',
          cancelText: '不授权',
          confirmText: '授权',
          complete: (res) =>{
            if (res.confirm) {
              wx.openSetting({
                complete:(res)=>{
                  if (res.authSetting['scope.userInfo']) {
                    const currentPage = wx.currentPages[wx.currentPages.length - 1];
                    currentPage.onLoad(currentPage.options);
                  }
                }
              });
            } else {
              wx.navigateBack();
            }
          }
        });
      } else if (e && e.type !== 'API_ERROR') {
        throw e;
      }
    }
  }
}

function *authAction ({payload}) {
  const userId = yield select(state => state.user.id);
  if (userId) {
    yield put(payload);
  } else {
    yield put({type: types.USER_LOGIN_REQUEST});
    yield take(types.USER_LOGIN_SUCCESS);
    yield put(payload);
  }
}

function *relogin () {
  while (true) {
    yield take(types.USER_NEED_RELOGIN);
    yield put({type: types.USER_LOGIN_REQUEST});
    const previousAuthAction = yield select(state => state.user.previousAuthAction);
    if (previousAuthAction) {
      yield take(types.USER_LOGIN_SUCCESS);
      yield put(previousAuthAction);
    }
  }
}

function *submitFormId () {
  while (true) {
    const { payload } = yield take(types.FORM_ID_SAVE_REQUEST);
    try {
      yield call(service.saveUserFormId, payload);
    } catch (e) {
      console.log(e);
    }
  }
}

export default function * () {
  yield takeEvery(types.AUTH_ACTION_DISPATCH, authAction);
  yield [
    fork(userLogin),
    fork(relogin),
    fork(submitFormId)
  ]
}
