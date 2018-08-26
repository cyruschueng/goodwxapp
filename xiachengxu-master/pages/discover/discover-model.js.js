import { Base } from '../../utils/base.js';

class Discover extends Base {
  constructor() {
    super();
  }

  // 处理浏览人数
  processCount(count) {
    var s = Math.floor(count / 100000); // 10万 + 

    var diffW = count % 100000; // 计算十万后剩余的数目
    var w = Math.floor(diffW / 10000); // 万+

    var diffB = diffW % 10000; // 计算万余下的数量
    var q = Math.floor(diffB / 1000);// 千+

    var str = count;
    if (w > 0) {
      str = `${w}万`;
      if (q > 0) {
        str = `${w}.${q}万`;
      }
    }
    if (s > 0) {
      str = `${s * 10}万`;
      if (w > 0) {
        str = `${s * 10 + w} 万`;
      }
      if (q > 0) {
        str = `${s * 10 + w}.${q}万`;
      }
    }

    return str;

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
  getBriefProducts(params, callback) {
    var url = '/wxserver/post/findPostList';
    this.commonRequest(url, params, callback);
  }

  // 获取发现模块的详情
  getDetail(params, callback) {
    var url = '/wxserver/post/getPostDetail';
    this.commonRequest(url, params, callback);
  }

  // 获取店铺信息
  getStoreInfo(params, callback) {
    var url = '/wxserver/store/getStoreById';
    this.commonRequest(url, params, callback);
  }

  // 朋友圈点赞
  likeTap(params, callback) {
    var url = params.status ? '/wxserver/post/addPostLike' : '/wxserver/post/cancelPostLike';
    delete params.status;
    this.commonRequest(url, params, callback);
  }


}

module.exports = {
  Discover
}