const app = getApp();
const util = require('../utils/util.js');
const bus = require('../utils/bus.js');
const level = {

  review: function (data, success) {
    util.request('/about/review.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  }
}
module.exports = level;