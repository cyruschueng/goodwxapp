/* eslint-disable import/first */
import {routerRedux} from 'dva/router';
import {login, loadWxLoginParam} from '../services/login';
import {queryURL} from '../utils/utils';
import {notification} from 'antd';

export default {
  namespace: 'login',
  state: {
    status: undefined,
    wxLogin: {
      // appid: 'wxd8ad71b8c200e25e',
      // redirect_uri: 'http://ys.d1money.com/oauth/redirect?from=EMS',
      // href: 'https://security.qn.d1money.com/ys/manager/wxLogin.css',
      // scope: 'snsapi_login',
      // state: '1512457675937_428385',
      // style: 'black',
      appid: '',
      redirect_uri: '',
      href: '',
      scope: '',
      state: '',
      style: '',
    },
  },

  effects: {
    * accountSubmit({payload}, {call, put}) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      try {
        const loginResult = yield call(login, payload);
        console.log(loginResult);
        if (loginResult && loginResult.result === true) {
          window.location.href = loginResult.url;
        }
      } catch (e) {
        yield put({
          type: 'changeSubmitting',
          payload: false,
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    // 获取微信二维码信息
    * loadWxLoginParam(action, { put, call }) {
      try {
        const WxLoginParam = yield call(loadWxLoginParam);
        yield put({
          type: 'updateState',
          payload: WxLoginParam,
        });
      } catch (e) {
        console.log(e);
      }
    },
    // *accountSubmit({ payload }, { call, put }) {
    //   yield put({
    //     type: 'changeSubmitting',
    //     payload: true,
    //   });
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   yield put({
    //     type: 'changeSubmitting',
    //     payload: false,
    //   });
    // },
    // *mobileSubmit(_, { call, put }) {
    //   yield put({
    //     type: 'changeSubmitting',
    //     payload: true,
    //   });
    //   const response = yield call(fakeMobileLogin);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   yield put({
    //     type: 'changeSubmitting',
    //     payload: false,
    //   });
    // },
    // *logout(_, { put }) {
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: {
    //       status: false,
    //     },
    //   });
    //   yield put(routerRedux.push('/user/login'));
    // },
  },

  reducers: {
    updateState(state, {payload}) {
      const wxLogin = payload;
      return {
        ...state,
        wxLogin,
      };
    },
    changeLoginStatus(state, {payload}) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, {payload}) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      console.log(history);
      const {location} = history;
      const {search} = location;
      const errCode = queryURL(search, 'errCode');
      if (errCode != null) {
        if (parseInt(errCode) === 100000) {
          notification.info({
            message: '错误提示',
            description: '用户超时，请重新登录',
          });
        } else if (parseInt(errCode) < 9999999 && parseInt(errCode) >= 9000000) {
          notification.info({
            message: '错误提示',
            description: '授权登录失败，您可能没有登录权限',
          });
        } else {
          notification.info({
            message: '错误提示',
            description: '登录失败',
          });
        }
      }
      dispatch({type: 'loadWxLoginParam'});
    },
  },
};
