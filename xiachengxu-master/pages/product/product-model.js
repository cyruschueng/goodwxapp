import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

class Product extends Base {
  constructor() {
    super();
  }
  // 显示导购欢迎页面
  showGuide(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/home/getGuide',
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
  /**
   * 获取商品详情
   */
  getDetailInfo(params, callback) {
    let url = params.useSimple ? '/wxserver/post/getPostDetail' : '/wxserver/home/getGoodsDetails';
    delete params.useSimple;
    var param = {
      url,
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
  /**
   * 点赞
   */
  praise(params, callback) {
    var that = this;
    var url = params.data.flag ? '/wxserver/event/cancelEventClickLike' : '/wxserver/event/insertEventClickLike';
    delete params.data.flag;
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
    // callback({ success: true });
  }

  /**
   * 收藏
   */
  collect(params, callback) {
    var that = this;
    var url = params.useSimple ? '/wxserver/cart/batchCart' : '/wxserver/event/insertEventClickFavorite';
    delete params.useSimple;
    var param = {
      url,
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

    // callback({ success: true });
  }

  /**
   * 流量详情页
   */
  insertPageView(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/event/insertPageview',
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
  /**
   * 获取门店信息
   */
  getStoreInfo(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/store/getStoreById',
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

  /**
   * 获取三条店长推荐商品
   */
  getRecommendProducts(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/goods/getCommendGoods',
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

  // 发送服务通知
  sendServiceMessage(params, callback) {
    var that = this;
    var param = {
      url: '/wxserver/home/guideServiceNotification',
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
  Product
}