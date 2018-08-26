import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

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
  getSwiperData(callback) {
    var param = {
      url: '/wxserver/home/getIndexTop',
      type: 'POST',
      data: {},
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(param);
  }

  getStoreList(callback) {
    var param = {
      url: '/wxserver/home/getGoodsShow',
      type: 'POST',
      data: {},
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(param);
  }

  commonRequest(url, params, callback) {
    var that = this;
    var param = {
      url: url,
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(param);
  }


}

module.exports = {
  Index
}