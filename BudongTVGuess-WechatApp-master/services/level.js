const app = getApp();
const util = require('../utils/util.js');
const bus = require('../utils/bus.js');
const level = {

  all: function (data, success) {
    util.request('/level/all.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success, null, true);
  },
  restart: function(data, success){
    util.request('/level/restart.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success, null, true);
  },
  unlock: function (data, success) {
    util.request('/level/unlock.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), success);
  },
  rank: function(data, success){
    util.request('/level/rank.ashx', Object.assign(data, { 'sessionCode': bus.client.sessionCode || '' }), function(_data){

      _data.data = _data.data || [];
      for (let i = 0; i < _data.data.length; i++){
        _data.data[i].subjectTimespan = util.formatSpan(_data.data[i].subjectSeconds);
      }
      success && success(_data);
    }, null, true);
  }
}
module.exports = level;