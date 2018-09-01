import { queryLoginKey, domain } from './loginKey.js';

function wxService(config) {
  queryLoginKey().then(function (loginKey) {
    if (config.url.indexOf('http') != 0) {
      config.url = domain + config.url;
    }
    config.header = config.header || {};
    config.method = 'POST';
    config.header.cookie = 'robot_center_mini_program_login_cookie=' + loginKey;
    config.data = config.data || {};
    const success = config.success,
      fail = config.fail || function (res) {
        if (!res) {
          wx.showToast({
            title: '未知的网络错误'
          });
        } else {
          const statusCode = res.statusCode;
          const { code, data, msg } = res.data || {};

          if (statusCode === 200) {
            if (code === 200) {
              // Nothing to do
            } else {
              wx.showToast({
                title: msg || '无数据'
              });
            }
          } else {
            wx.showToast({
              title: `网络错误，HTTP Status Code ${statusCode}`
            });
            console.error(res);
          }
        }
      };


    if (!!success) {
      config.success = function (res) {
        const { statusCode } = res;
        const { code, data, msg } = res.data || {};
        if (statusCode === 200 && code === 200) {
          success(res.data.data, res.data);
        } else {
          fail(res);
        }
      }
    }
    const completeFunc = config.complete;
    config.complete = function (res) {
      if (config.showLoading) {
        wx.hideLoading();
      }
      typeof completeFunc === 'function' && completeFunc(res);
    }
    if (config.showLoading) {
      wx.showLoading({
        title: config.loadingText || '加载中...',
        mask: config.loadingMask
      });
    }
    wx.request(config);
  });
}

export default wxService;
