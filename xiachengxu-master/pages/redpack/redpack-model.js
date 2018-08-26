import { Base } from '../../utils/base.js';

class RedPack extends Base {
  constructor() {
    super();
  }
  /**
   * 获取拼团参加的人数信息
   */
  getUserList(params, callback) {
    var postData = {
      url: '/wxserver/hb/showBonusPage',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(postData);
  }
  // getRecommendProducts(params, callback) {
  //   var postData = {
  //     url: '/wxserver/wx/selectwxGood',
  //     data: params,
  //     type: 'POST',
  //     sCallback: function (data) {
  //       callback && callback(data);
  //     },
  //     eCallback: data => {
  //       callback && callback(null);
  //     }
  //   };
  //   this.request(postData);
  // }
  /**
   * 新开一个拼团
   */
  addCampaign(params, callback) {
    var postData = {
      url: '/wxserver/hb/insertCampaignInstance',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(postData);
  }

  /**
   * 参加别人的拼团
   */
  insertCampaign(params, callback) {
    var postData = {
      url: '/wxserver/hb/insertCampaignTask',
      type: 'POST',
      data: params,
      sCallback: function (data) {
        typeof callback == 'function' && callback(data);
      },
      eCallback: data => {
        callback && callback({ status: false });
      }
    };
    this.request(postData);
  }
}

module.exports = {
  RedPack
}