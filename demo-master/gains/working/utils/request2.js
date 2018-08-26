import axios from 'axios'
import cookie from './cookie'
import store from '@/store'
import * as types from '@/store/mutations-type'
import { Toast } from 'mint-ui';

const resInterceptor = axios.interceptors.response.use(function(response) {
  // Do something with response data
  if (response.data.code == '110008') {
    cookie.delCookie('token');//清除cookie中的token
    localStorage.removeItem('userInfo');//清除localStorage中的userInfo
    store.commit(types.UPDATE_USERINFO, {});//清除store中的userInfo
    console.log(types.UPDATE_USERINFO);
    // window.location.reload()
  }
  /*console.log(store.state.login.userInfo);
  console.log('lanjieqi', response);*/
  return response;
}, function(error) {
  // Do something with response error
  return Promise.reject(error);
});

export default resInterceptor;
