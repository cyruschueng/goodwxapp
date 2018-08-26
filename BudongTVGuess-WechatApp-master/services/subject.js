const app = getApp();
const util = require('../utils/util.js');
const bus = require('../utils/bus.js');
const subject = {
  next: function (data, success) {
    util.request('/subject/next.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success, null, true);
  },
  answer: function (data, success) {
    util.request('/subject/answer.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  },
  skip: function (data, success) {
    util.request('/subject/skip.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  },
  tip: function (data, success) {
    util.request('/subject/tip.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  }
}
module.exports = subject;