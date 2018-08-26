import { Base } from '../../utils/base.js';

class User extends Base {
  constructor() {
    super()
  }

  commonRequest(params, url, callback) {
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

  getUserInfo(params, callback) {
    var url = '/wxserver/user/getUserInfo';
    this.commonRequest(params, url, callback);
  }

  // 获取关注店铺
  getAttentionStores(params, callback) {
    var url = '/wxserver/user/attenAllStore';
    this.commonRequest(params, url, callback);
  }

  getMyGuides(params, callback) {
    var url = '/wxserver/user/getAllGuide';
    this.commonRequest(params, url, callback);
  }

}

module.exports = {
  User
}