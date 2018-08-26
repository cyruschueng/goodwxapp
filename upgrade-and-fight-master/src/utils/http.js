import axios from './axios';
import wx from './wechat';

const service = axios.create({
  timeout: '5000',
});
//  自定义请求拦截器
service.interceptors.request.use((data) => {
  wx.showLoading({
    title: '加载中',
  });
  return data;
}, (error) => {
  return Promise.reject(error);
});

//  自定义返回拦截器
service.interceptors.response.use((data) => {
  wx.hideLoading();
  return data;
}, (error) => {
  return Promise.reject(error);
});

service.getRequest = function ({ url, params }) {
  let str = '';
  if (typeof params === 'string') {
    str = params;
  } else {
    for (const props in params) {
      if (params.hasOwnProperty(props)) {
        str += `&${props}=${params[props]}`;
      }
    }
  }
  return service.get(`https://killmonster.myscrm.cn${url}${str}`, {
    params: params,
  });
};

service.postRequest = function ({ url, params }) {
  return service.post(`https://killmonster.myscrm.cn${url}`, params);
};

export default service;
