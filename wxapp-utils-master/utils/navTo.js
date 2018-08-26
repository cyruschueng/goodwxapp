/**
 * 跳转到指定路由，可以附带参数
 * @param {String} url
 * @param {Object} params
 * @param {String} m - 跳转方式 navTo | redTo | tab | relau
 */
export default function navTo(url, params = {}, m = 'navTo') {
  const methodHash = {
    'navTo': wx.navigateTo,
    'redTo': wx.redirectTo,
    'tab': wx.switchTab,
    'relau': wx.reLaunch
  }

  const method = methodHash[m];
  const keys = Object.keys(params || {});
  const search = keys.map(key => (key + '=' + params[key])).join('&');

  method({
    url: url + '?' + search
  });
}
