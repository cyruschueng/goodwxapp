import { Base } from '../../utils/base.js';

class Cart extends Base {
  constructor() {
    super()
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
  getCartProducts(params, callback) {
    var url = '/wxserver/cart/CartPage';
    this.commonRequest(url, params, callback);
  }

  // 删除预购清单商品
  deleteProduct(params, callback) {
    var url = '/wxserver/event/cancelEventClickFavorite';
    this.commonRequest(url, params, callback);
  }
}
module.exports = {
  Cart
}


