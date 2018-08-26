import { Base } from '../../utils/base.js';
class Poster extends Base {
  constructor() {
    super();
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

  getPosterData(params, callback) {
    var url = '/wxserver/storeActivity/getActivity';
    this.commonRequest(url, params, callback);
  }

}

module.exports = {
  Poster
}