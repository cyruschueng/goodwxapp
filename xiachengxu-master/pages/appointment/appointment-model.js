import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

class Appointment extends Base {
  constructor() {
    super()
  }

  makeAppoint(params, callback) {
    var param = {
      url: params.data.bookingId ? '/wxserver/book/editBooking/' : '/wxserver/book/insertBooking',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      }
    };
    this.request(param);

    // setTimeout(() => {
    //   callback && callback({ success: true });
    // }, 1000);
  }

  /**
   * 取消预约到店
   */
  cancelAppoint(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/book/cancelBooking',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

    // setTimeout(() => {
    //   callback({ success: true });
    // }, 1000);
  }
  /**
   * 获取预约详细信息
   */
  getStoreInfo(params, callback) {
    var param = {
      url: '/wxserver/home/getStoreDetails',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      }
    };
    this.request(param);
  }
  // 小程序管理端赴约/已赴约接口
  appointOperate(params, callback) {
    var param = {
      url: '/wxserver/book/editBookingStatus',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(param);

  }

  appointMultipleProducts(params, callback) {
    var param = {
      url: '/wxserver/book/insertBookings',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        callback && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(param);

  }

  descryptPhone(params, callback) {
    var url = '/wxserver/phoneno/decode';
    this.commonRequest(url, params, callback);
  }

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
  Appointment
}


