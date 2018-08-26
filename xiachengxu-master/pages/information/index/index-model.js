import { Base } from '../../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  // 获取用户个人信息
  getUserInfo(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/user/getUserInfo',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: data => {
        callback && callback(null);
      }
    };
    this.request(param);
  }
  // 更新用户头像和手机号
  updateUserInfo(params, callback) {
    var url = '/wxserver/user/updateUser';
    this.commonRequest(url, params, callback);
  }
  // 解密用户手机号码
  descryptPhone(params, callback) {
    var url = '/wxserver/phoneno/decode';
    this.commonRequest(url, params, callback);
  }

  /**
   * 公共的请求部分代码
   */
  commonRequest(url, params, callback) {
    var that = this;
    var param = {
      url: url,
      type: 'POST',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: data => {
        callback && callback(null);
      }
    };
    this.request(param);
  }
}

module.exports = {
  Index
}