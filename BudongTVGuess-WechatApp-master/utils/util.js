//  时间段格式化
const formatSpan = seconds => {

  var minute = Math.floor(seconds / 60);
  var second = seconds % 60;

  return (minute > 9 ? minute : '0' + minute) + ':' + (second > 9 ? second : '0' + second);
};

//  日期时间格式化
const formatTime = date => {

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  };

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

//  解密参数
const decodeParams = function(options){

  options = options || {};
  for (let key in options) {
    options[key] = decodeURIComponent(options[key]);
  }
  return options;
};

//  序列化参数
const serialize = function(data){

  data = data || {};
  var querys = [];
  for (let key in data){
    querys.push(key + '=' + encodeURIComponent(data[key]));
  }
  return querys.join('&');
}

//  异步请求方法
const request = function(url, data, success, fail, loading){

  loading == true && wx.showLoading({
    title: '正在请求..',
  });
  wx.request({
    url: 'https://shenxu.name/tvguess/api' + url,
    header: { 'content-type': 'application/json' },
    data: data,
    success: function (data) {

      loading == true && wx.hideLoading();
      data = data.data || {};
      if (data.code == 0) {
        success && success(data.data || {});
      } else {
        if (fail) {
          fail && fail.bind(this)(data);
        } else {
          showToast(data.message || "请求失败");
        }
      }
    },
    fail: function (res) {
      loading == true && wx.hideLoading();
      if (fail){
        fail && fail.bind(this)(res);
      } else {
        showToast(res);
      }
    }
  });
};

//  弹出浮动提示
const showToast = function (title) {

  wx.showToast({
    title: title,
  });
};

//  设置页面参数
const setData = function(page, key, value, delay){

  setTimeout(function(){

    var data = {};
    data[key] = value;
    page.setData(data);
  }, delay || 0);
};

//  设置页面标题
const setTitle = function (title) {

  wx.setNavigationBarTitle({
    title: title || ''
  });
};

//  跳转链接至
const setNavigate = function (url) {

  wx.navigateTo({ url: url });
};

module.exports = {
  formatSpan: formatSpan,
  formatTime: formatTime,
  decodeParams: decodeParams,
  serialize: serialize,
  request: request,
  showToast: showToast,
  setData: setData,
  setTitle: setTitle,
  setNavigate: setNavigate
}
