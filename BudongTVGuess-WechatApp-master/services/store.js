const app = getApp();
const util = require('../utils/util.js');
const bus = require('../utils/bus.js');
const store = {

  goods: function (data, success) {
    util.request('/store/goods.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  },
  take: function(data, success){
    util.request('/store/take.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  }
}
module.exports = store;