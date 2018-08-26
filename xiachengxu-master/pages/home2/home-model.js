import { Base } from '../../utils/base.js';
import mockData from '../../data/mock-data.js';

// 首页model 层使用ES6语法
class Home extends Base {
  constructor() {
    super();
  }
  // 获取用户个人信息
  getUserInfo(params, callback) {
    var url = '/wxserver/user/getUserInfo';
    this.commonRequest(url, params, callback);
  }
  /*banner图片信息*/
  showGuide(params, callback) {
    var url = '/wxserver/home/getGuide';
    this.commonRequest(url, params, callback);
  }

  // 三个类别轮播图
  getSwiperList(params, callback) {
    var url = '/wxserver/activity/getActivity';
    this.commonRequest(url, params, callback);
  }

  /*首页商品数据*/
  getProductsData(params, callback) {
    var url = '';
    if (params.index != null) {
      var mapList = [
        '/wxserver/goods/getCommendGoods',
        '/wxserver/goods/getDiscountGoods',
        '/wxserver/goods/getNewGoods'
      ];
      url = mapList[params.index];
      delete params.index;
    } else {
      url = '/wxserver/activity/getActivityGoods';
    }
    this.commonRequest(url, params, callback);
  }

  /**
   * 收藏接口
   */
  collectProduct(params, callback) {
    var url = '/wxserver/event/insertEventClickFavorite';
    this.commonRequest(url, params, callback);
  }

  insertPageView(params, callback) {
    var url = '/wxserver/event/insertPageview';
    this.commonRequest(url, params, callback);
  }

  getStoreInfo(params, callback) {
    var url = '/wxserver/store/getStoreById';
    this.commonRequest(url, params, callback);
  }
  // 保存收集的formIds
  saveFormIds(params, callback) {
    var url = '/wxserver/formid/saveFormIds';
    var that = this;
    var param = {
      url: url,
      type: 'POST',
      data: params,
      sCallback: function (data) {
        wx.removeStorageSync('formIds');
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        wx.removeStorageSync('formIds');
        callback && callback({ status: false });
      }
    };
    this.request(param);
  }

  // 发送服务通知
  sendServiceMessage(params, callback) {
    var url = '/wxserver/home/guideServiceNotification';
    this.commonRequest(url, params, callback);
  }

  // 关注门店
  attentionStore(params, callback) {
    var that = this;
    var url = params.attenStatus ? '/wxserver/event/cancelAttenStore' : '/wxserver/event/insertAttenStore';
    delete params.attenStatus;
    this.commonRequest(url, params, callback);
  }

  // 获取商品列表(使用简约模板)
  getPosterData(params, callback) {
    var url = '/wxserver/activity/getActivity';
    this.commonRequest(url, params, callback);
  }


  /**
   * 公共请求方法
   */
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
  Home
}
