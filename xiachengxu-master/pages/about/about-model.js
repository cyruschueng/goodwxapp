import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

class About extends Base {
  constructor() {
    super()
  }
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

    // setTimeout(() => {
    //   callback && callback({ success: true });
    // }, 1000);
  }
}
module.exports = {
  About
}


