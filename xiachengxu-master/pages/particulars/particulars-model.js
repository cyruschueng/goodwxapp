import { Base } from '../../utils/base.js';

class Particulars extends Base {
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

  // 获取商品列表(使用简约模板)
  getCustomerData(params, callback) {
    var urlMap = [
      "/wxserver/clerk/getAllCustomer",
      "/wxserver/clerk/getBrowseCustomer",
      "/wxserver/clerk/getFavoriteCustomer",
      "/wxserver/clerk/getLikeCustomer"
    ]
    var url = urlMap[params.current];
    delete params.current;
    this.commonRequest(url, params, callback);
  }

  getTotalCount(params, callback) {
    var url = '/wxserver/clerk/getAllCustomerCount';
    this.commonRequest(url, params, callback);
  }



}
module.exports = {
  Particulars
}