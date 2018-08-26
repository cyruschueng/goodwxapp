// 足迹的 controller 层
import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

class Foot extends Base {
  constructor() {
    super();
  }
  /* 获取用户浏览历史记录 */
  getUserViewHistory(params, callback) {
    // 请求后端获取用户浏览历史记录
    // setTimeout(() => {
    //   callback && typeof callback == 'function' && callback(mockData.products_data);
    // }, 1000);
    var current = params.data.current;
    var url = current == 0 ? '/wxserver/event/getCustomerAllPV' :
      current == 1 ? '/wxserver/event/findEventClickFavoriteByCustomer' :
        '/wxserver/event/findEventClickLikeByCustomer';
    delete params.data.current;
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
  Foot
}