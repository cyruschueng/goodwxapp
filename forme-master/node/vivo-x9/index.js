var path = require('path');
var express = require('express');
var router = express.Router();

var util = require(path.join(rootPath) + '/util/util');
var logger = require(path.join(rootPath) + '/util/logger');
var midware = require(path.join(rootPath) + '/routes/midware');
var consumer = require(path.join(rootPath) + '/routes/receive/consumer');
var imgReview = require(path.join(rootPath) + '/routes/review/reviewFunction');

var vivo_main = require('./main');
var activity_config = require('./config');

/**
 * @api {get}   /info 1、获取用户信息
 * @apiVersion  1.0.0
 * @apiName     getUinfo
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 获取用户信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          "_id": "591d4135eb51f423ab36a879",
 *           "userInfo": {
 *            "height": 165,
 *            "nick": "公司1",
 *            "portrait": "https://img3.codoon.com/portrait5a008ed12ca64e5c8e509df23fecfc9d",
 *            "sex": "1",
 *            "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *            "weight": 55
 *           },
 *           "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *           "join_time": "2017-05-18T06:37:41.514Z",
 *           "today_intime": "2017-05-18T08:44:25.505Z",
 *           "is_ranklot": false,//排行榜抽奖是否开启
 *           "shareimgtime": "2017-05-18T06:45:47.032Z",
 *           "isshare_img": false,//今日是否分享图片
 *           "totalnum_run": 2,//闯关抽奖机会
 *           "isaddrun":false,//闯完4关是否添加了机会
 *           "totalnum_img": 0,//分享图片抽奖机会
 *           "totalnum_rank_run": 1,//排行榜（跑步）抽奖机会
 *           "totalnum_rank_ride": 1,//排行榜（骑行）抽奖机会
 *           "isAddrank_run": false,
 *           "isAddrank_ride": false,
 *           "istop200_run": false,//是否是跑步top200
 *           "istop200_ride": true,//是否是骑行top200
 *           "run_ranknum":0,//跑步排行榜第几名
 *           "ride_ranknum"0,//骑行排行榜第几名
 *           "isget_prize": true,//是否获得过奖
 *           "is_nowprize": false,//抽奖时是否中奖
 *           "nowprize_name": "",//奖品名字
 *           "isshowtoast": false,//是否弹闯关弹窗
 *           "isgetmedia": false,//是否获得勋章
 *           "mylength_count_run": 26.6,//跑步里程
 *           "mylength_count_ride": 28,//骑行里程
 *           "__v": 15,
 *           "updateAt": "2017-05-18T08:47:39.928Z",
 *           "createAt": "2017-05-18T06:37:41.804Z",
 *           "isJoin": true,
 *           "light_arr": [//闯了几关
 *            "2017-05-18T08:40:08.366Z",
 *            "2017-05-18T08:41:19.456Z",
 *            "2017-05-18T08:43:14.302Z",
 *            "2017-05-18T08:44:11.191Z"
 *           ],
 *           islasefinish: false,//最后一关是否完成
 *           "prize_arr": [//已得到的奖品
 *            "vivoX9手机",
 *            "vivo移动电源"
 *           ],
 *           "img_arr": [//上传过的图片
 *            "http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg",
 *            "https://img3.codoon.com/portrait5a008ed12ca64e5c8e509df23fecfc9d",
 *            "http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg",
 *            "http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg"
 *           ]
 *         }
 *     }
 *
 */

/**
 * @api {get}   /imgshare 2、分享图片
 * @apiVersion  1.0.0
 * @apiName     shareImg
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 分享图片
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          "totalnum_img": 1,//分享图片抽奖机会+1(返的数据格式参考用户信息接口)
 *          "isshare_img": true,//今日是否分享图片
 *       }
 *     }
 *
 */

/**
 * @api {post}   /uploadimg 3、上传图片
 * @apiVersion  1.0.0
 * @apiName     uploadImg
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 上传图片
 *
 * @apiParam  {String}  url 图片地址 example: 'http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg'
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          //(返的数据格式参考用户信息接口)
 *       }
 *     }
 *
 */

/**
 * @api {post}   /imglist 4、图片列表
 * @apiVersion  1.0.0
 * @apiName     imgList
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 图片列表
 *
 * @apiParam  {Number}  pageNum 页码 example: 1
 * @apiParam  {Number}  pageSize 一页大小 example: 2
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *        "data": {
 *             "items": [
 *               {
 *                 "_id": "591d4774fa2bc365abb9dfee",
 *                 "photoId": "591d46e77e37ba58ab2609e0",
 *                 "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *                 "nick": "公司1",
 *                 "photo": "http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg",//图片地址
 *                 "isPass": 1,
 *                 "updateTime": "2017-05-18T07:04:20.265Z",
 *                 "__v": 0
 *               },
 *               {
 *                 "_id": "591d4771fa2bc365abb9dfed",
 *                 "photoId": "591d46e57e37ba58ab2609df",
 *                 "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *                 "nick": "公司1",
 *                 "photo": "http://activity-codoon.b0.upaiyun.com/constellationRun/upload/tianixie07.jpg",
 *                 "isPass": 1,
 *                 "updateTime": "2017-05-18T07:04:17.550Z",
 *                 "__v": 0
 *               }
 *             ],
 *             "isLastPage": false//是否是最后一页
 *           }
 *
 *     }
 *
 */

/**
 * @api {get}   /addmedia 5、获得勋章
 * @apiVersion  1.0.0
 * @apiName     addMedia
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 获取用户信息
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          "isgetmedia": true,//是否获得勋章(返的数据格式参考用户信息接口)
 *       }
 *     }
 *
 */

/**
 * @api {post}   /actluck 6、活动进行中抽奖
 * @apiVersion  1.0.0
 * @apiName     actLuck
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 活动进行中抽奖
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *           "is_nowprize": false,//抽奖时是否中奖(返的数据格式参考用户信息接口)
 *           "nowprize_name": "",//奖品名字
 *       }
 *     }
 *
 */

/**
 * @api {post}   /rankluck 7、活动结束后排行榜抽奖
 * @apiVersion  1.0.0
 * @apiName     rankLuck
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 活动结束后排行榜抽奖
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *           "is_nowprize": false,//抽奖时是否中奖(返的数据格式参考用户信息接口)
 *           "nowprize_name": "",//奖品名字
 *       }
 *     }
 *
 */

/**
 * @api {get}   /runtop 8、跑步排行榜
 * @apiVersion  1.0.0
 * @apiName     runTop
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 跑步排行榜
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *        "data": {
 *           "items": [
 *               {
 *               "userInfo": {
 *               "height": 165,
 *               "nick": "公司1",
 *               "portrait": "https://img3.codoon.com/portrait5a008ed12ca64e5c8e509df23fecfc9d",
 *               "sex": "1",
 *               "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *               "weight": 55
 *               },
 *               "mylength_count_run": 26.6//跑步里程
 *               }
 *           ]
 *       }
 *     }
 *
 */

/**
 * @api {get}   /ridetop 9、骑行排行榜
 * @apiVersion  1.0.0
 * @apiName     rideTop
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 骑行排行榜
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *        "data": {
 *           "items": [
 *               {
 *               "userInfo": {
 *               "height": 165,
 *               "nick": "公司1",
 *               "portrait": "https://img3.codoon.com/portrait5a008ed12ca64e5c8e509df23fecfc9d",
 *               "sex": "1",
 *               "userId": "b44c62d7-cd0b-4027-9e93-ad53163aca84",
 *               "weight": 55
 *               },
 *               "mylength_count_ride": 26.6//骑行里程
 *               }
 *           ]
 *       }
 *     }
 *
 */

/**
 * @api {get}   /closepop 10、关闭闯关弹窗
 * @apiVersion  1.0.0
 * @apiName     closePop
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 关闭闯关弹窗
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          "isshowtoast": false,//是否弹闯关弹窗(返的数据格式参考用户信息接口)
 *       }
 *     }
 *
 */

/**
 * @api {get}   /final 11、完成最后一关
 * @apiVersion  1.0.0
 * @apiName     finalTest
 * @apiGroup    Codoon
 * @apiPermission 咕咚用户
 *
 * @apiDescription 完成最后一关
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "true",
 *       "data": {
 *          "islasefinish": true,//是否完成最后一关
 *       }
 *     }
 *
 */

//加入活动，获取个人信息
router.get('/user/info', [midware.validation.userInfo, function (req, res) {
  vivo_main.actuserInfo(req.userInfo,function (err, doc) {
    if (err) {
      logger.error(err)
    }
    util.resJson(res, err, doc);
  })
}]);

//用户分享，增加一个抽奖机会（图片分享）
router.get('/user/imgshare', [midware.validation.userInfo, function(req, res) {
  vivo_main.imgShare(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//上传图片
router.post('/user/uploadimg',[midware.validation.userInfo,function(req, res) {
  var imgurl = req.body.url || '';
  if(imgurl == "") {
    return util.resJson(res, "参数缺失");
  }
  // logger.debug(imgurl);

  vivo_main.imgUpload(imgurl,req.userInfo,function(err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });

}]);

//获取图片列表
router.post('/user/imglist',[midware.validation.userInfo,function(req, res) {
  var pageSize = req.body.pageSize || '';;
  var pageNum = req.body.pageNum || '';;
  // if(pageSize == "" || pageNum == '') {
  //   return util.resJson(res, "参数缺失");
  // }

  vivo_main.imgList(pageSize,pageNum,req.userInfo,function(err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });

}]);

//获得勋章
router.get('/user/addmedia', [midware.validation.userInfo, function(req, res) {
  vivo_main.getMedia(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//活动抽奖
router.post('/user/actluck', [midware.validation.userInfo, function(req, res) {
  vivo_main.actLuck(req.userInfo, function (err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });
}]);

//排行榜抽奖
router.post('/user/rankluck', [midware.validation.userInfo, function(req, res) {
  vivo_main.rankLuck(req.userInfo, function (err, result) {
    if (err) {
      logger.error(err);
    }
    util.resJson(res, err, result);
  });
}]);

//跑步排行榜
router.get('/user/runtop', [midware.validation.userInfo, function(req, res) {
  vivo_main.getRuntop(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//骑行排行榜
router.get('/user/ridetop', [midware.validation.userInfo, function(req, res) {
  vivo_main.getRidetop(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//关闭闯关弹窗
router.get('/user/closepop', [midware.validation.userInfo, function(req, res) {
  vivo_main.closePop(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);

//完成最后一关
router.get('/user/final', [midware.validation.userInfo, function(req, res) {
  vivo_main.final(req.userInfo, function (err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  })
}]);


router.post('/user/pageShare', [midware.validation.userInfo, function(req, res) {
  vivo_main.pageShare(req.userInfo, function(err, result) {
    if (err) {
      return logger.error(err);
    }
    util.resJson(res, err, result);
  });
}]);


//用户运动数据流水
consumer.pushGpsFunction({
  eventName:activity_config.eventName,
  func:vivo_main.pushActdata,
  sportType:['run','cycling']
});

//图片审核通过后调用方法处理用户上传照片
imgReview.pushReviewImgFunction(activity_config.eventName, vivo_main.UpdatejjPhotoWall);

module.exports = router;
