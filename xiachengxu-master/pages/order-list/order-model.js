import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

class Order extends Base {
  constructor() {
    super();
  }
  getUserOrder(params, callback) {
    var that = this, url = '';
    /**
     * 用户端接口
     */
    url = params.data.current == 0 ? '/wxserver/book/getBooking' : '/wxserver/book/getOverBooking';

    delete params.data.current;
    var param = {
      url: url,
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

    // setTimeout(() => {
    //   callback(mockData.order_data);
    // }, 1000);
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
}

module.exports = {
  Order
}


