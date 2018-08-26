var path = require('path');
var express = require('express');
var router = express.Router();

var util = require(path.join(rootPath) + '/util/util');
var logger = require(path.join(rootPath) + '/util/logger');
var midware = require(path.join(rootPath) + '/routes/midware');
var consumer = require(path.join(rootPath) + '/routes/receive/consumer');

var robam_main = require('./main');
var activity_config = require('./config');

//加入活动，获取个人信息req.userInfo, cb
router.get('/user/info', [midware.validation.userInfo, function (req, res) {
  robam_main.actuserInfo(req.userInfo,function (err, doc) {
    if (err) {
      logger.error(err)
    }
    util.resJson(res, err, doc);
  })
}]);

//获得勋章
router.post('/user/media', [midware.validation.userInfo, function (req, res) {
  var whichmedia=req.body.whichmedia;//0,1,2,3

  robam_main.getmedia(whichmedia,req.userInfo,function (err, doc) {
    if (err) {
      logger.error(err)
    }
    util.resJson(res, err, doc);
  })
}]);

//填写收货信息
router.post('/user/addr',[midware.validation.userInfo,function(req, res) {

  var baominginfo = {};
  baominginfo.name = req.body.name  || "";
  baominginfo.sexy = req.body.sexy || "";
  baominginfo.phone = req.body.phone || "";
  baominginfo.address = req.body.address  || "";
  baominginfo.size_cloth = req.body.size_cloth || "";
  baominginfo.size_shoe = req.body.size_shoe || "";

  if(baominginfo.name == "" || baominginfo.sexy == "" || baominginfo.phone == "" || baominginfo.address == "" || baominginfo.size_cloth == "" || baominginfo.size_shoe == "") {
    return util.resJson(res, "参数缺失");
  }

  robam_main.baoMing(baominginfo,req.userInfo,function(err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });
}]);

//活动抽奖
router.post('/user/actluck', [midware.validation.userInfo, function(req, res) {
  robam_main.actLuck(req.userInfo, function (err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });
}]);

//每日一领
router.get('/user/getquan', [midware.validation.userInfo, function(req, res) {
  robam_main.getquan(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//卡路里top10
router.get('/user/coltop', [midware.validation.userInfo, function(req, res) {
  robam_main.gettop(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//获得终极大奖
router.get('/user/bigprize', [midware.validation.userInfo, function(req, res) {
  robam_main.getbigprize(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);




consumer.pushStepFunction({
  eventName:activity_config.eventName,
  func:robam_main.pushActdata
});

module.exports = router;
