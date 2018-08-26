var path = require('path');
var sha1 = require('sha1');
var UPYUN = require('upyun');

var activity = require(path.join(rootPath) + '/routes/activity');
var logger = require(path.join(rootPath) + '/util/logger');
var newApi = require(path.join(rootPath) + '/api/newApi');
// var userFun = require(path.join(rootPath) + '/api/userFunction');
var luckyDraw = require(path.join(rootPath) + '/routes/luckyDraw');
var xmall = require(path.join(rootPath) + '/routes/xmall/xmall');
// var eventConfigModel = require(path.join(rootPath) + '/data/model').eventConfigModel;
var reviewFunc = require(path.join(rootPath) + '/routes/review/reviewFunction');

var eventConfig = require('./config');
var async = require('async');
var moment = require('moment');
var vivo_user_model = require('./model').vivo_user_model;
var vivo_act_model = require('./model').vivo_act_model;
var vivoimg_model = require('./model').vivoimg_model;

var oneActivity = require(path.join(rootPath) + '/routes/main');
var vivoAc = new oneActivity(eventConfig.eventId, eventConfig, vivo_user_model);


//用户信息
var actuserInfo = function (userInfo, callback) {
  var now = new Date();
  var uactData={};
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (user,cb) {
      if (user) {
        //每天需要清空的记录
        if(!moment(now).isSame(user.today_intime,'day')){
          logger.debug('新的一天。clear');
          user.today_intime=now;
          user.isshare_img=false;
        }
        user.save(function (err) {
          return cb(err, user);
        });

      } else {
        //create New
        vivoAc.bothJoin(userInfo, {
          //默认字段
          userId: userInfo.userId,
          isJoin: true,
          userInfo: userInfo,
          //自定义的
          join_time:        now,//加入活动时间
          today_intime:            now,//今天进入活动的时间
          is_ranklot:       false,//排行榜是否开始抽奖

          img_arr:          [],//上传的所有图片
          shareimgtime:     '',//分享图片时间
          isshare_img:      false,//上传图片今日是否分享

          page_share_day: '',
          
          totalnum_run:     0,//闯关可以抽奖的次数
          isaddrun:         false,//闯完4关是否添加了机会
          totalnum_img:     0,//分享图片可以抽奖的次数(终极)
          totalnum_rank_run:    0,//跑步排行榜可以抽奖的次数
          totalnum_rank_ride:   0,//骑行排行榜可以抽奖的次数
          isAddrank_run:     false,//排行榜是否加机会(跑步)
          isAddrank_ride:    false,//排行榜是否加机会(骑行)
          prize_arr:        [],//所获得的奖品
          istop200_run:    false,//是否是top200(跑步)
          istop200_ride:   false,//是否是top200(骑行)
          run_ranknum:     0,//跑步排行榜第几名(没有就0)
          ride_ranknum:    0,//骑行排行榜第几名(没有就0)
          isget_prize:      false,//活动中是否获得过奖
          is_nowprize:      false,//当前是否中奖
          nowprize_name:    '',//当前中奖的奖品名字

          light_arr:        [],//点亮logo的时间数组
          islasefinish:     false,//最后一关是否完成
          isshowtoast:      false,//是否弹完成一关弹窗
          isgetmedia:       false,//是否获得勋章
          mylength_count_run:   0,//我一共跑的活动的总里程(跑步)
          mylength_count_ride:  0,//我一共跑的活动的总里程(骑行)
        }, cb);
      }
    },
    function (user,cb) {
      uactData=user;
      vivoAc.getEventConfig(cb);
    },
    function (eventconf,cb) {
      if(moment(now).isBetween(eventconf.eventData.rankLot_start,eventconf.eventData.rankLot_end,'day','[]')){
        uactData.is_ranklot = true;
      }else {
        uactData.is_ranklot = false;
      }
      uactData.save(function (err) {
        cb(err, uactData);
      });

    },
    function (user,cb) {
      if(user.is_ranklot){
        //查询是否在跑步 top10,top200
        logger.debug('runRanktop');
        vivo_user_model
          .find({"mylength_count_run": { $gt: 0 }},{"_id": 0, "userId": 1})
          .sort({'mylength_count_run': -1})
          .limit(200)
          .exec(function (err, result) {
            var uidArr=[];
            result.forEach(function(element) {
              uidArr.push(element.userId)
            });
            logger.debug(uidArr.indexOf(user.userId));

            if(uidArr.indexOf(user.userId) != -1){
              user.run_ranknum=uidArr.indexOf(user.userId)+1;
              user.istop200_run=true;
              if(!user.isAddrank_run){
                user.totalnum_rank_run++;
                user.isAddrank_run=true;
              }
            }
            user.save(function (err) {
              cb(err, user);
            });
          })
      }else {
        cb(null, user);
      }


    },
    function (user,cb) {
      if(user.is_ranklot){
        //查询是否在骑行 top10,top200
        // logger.debug(user.userId);
        logger.debug('runRidetop');
        vivo_user_model
          .find({"mylength_count_ride": { $gt: 0 }},{"_id": 0, "userId": 1})
          .sort({'mylength_count_ride': -1})
          .limit(200)
          .exec(function (err, result) {
            var uidArr=[];
            result.forEach(function(element) {
              uidArr.push(element.userId)
            });
            logger.debug(uidArr.indexOf(user.userId));

            if(uidArr.indexOf(user.userId) != -1){
              user.ride_ranknum=uidArr.indexOf(user.userId)+1
              user.istop200_ride=true;

              if(!user.isAddrank_ride){
                user.totalnum_rank_ride++;
                user.isAddrank_ride=true;
              }

            }
            user.save(function (err) {
              cb(err, user);
            });
          })
      }else {
        cb(null,user);
      }
    },
  ],function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
}

//图片分享
var imgShare = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }

      activityInfo.isshare_img = true;
      //logger.debug(moment('2011-02-01').isSame('2010-02-01', 'day'));
      //logger.debug(moment('2011-02-01').isSame('', 'day'));//test
      var now=new Date();
      if(!moment(now).isSame(activityInfo.shareimgtime,'day')) {
        activityInfo.totalnum_img++;
        activityInfo.shareimgtime = now;
      }
      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    }
  ], function(err, result){

    if(err){
      logger.error('share_img', err);
    }
    callback(err, result);
  })
};

//图片上传
var imgUpload = function(imgData,userInfo,callback) {

  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function(activityInfo, cb) {
      if(!activityInfo){
        return cb('用户信息获取失败！');
      }
      imgData = imgData.replace('data:image/png;base64,', '');
      var files = new Buffer(imgData, "base64");

      var upaiyun = require(path.join(rootPath) + '/config').upaiyun,
        upyun = new UPYUN(upaiyun.bucket, upaiyun.username, upaiyun.password, 'v0', 'legacy'),
        remoteName = '/vivo-x9/image/' + sha1(files),
        url = "";
      upyun.uploadFile(
        remoteName,
        files,
        "image/png",
        true, function(err) {
          if (err) {
            return cb(err);
          }
          url = "http://activity-codoon.b0.upaiyun.com" + remoteName;
          cb(null, activityInfo, url);
        });
    },
    function (activityInfo, imgurl, cb) {
      //logger.debug(imgurl+'lalalala');
      //上传图片
      var eventImgInfo = {
        eventId:eventConfig.eventId,
        eventName:eventConfig.eventName,
        userId:userInfo.userId,
        nick:userInfo.nick,
        imgData:   {
          src: [imgurl],
          des: {}
        }
      };

      reviewFunc.uploadImg(eventImgInfo,function (err,postRlt) {
        if(err) return callback(err);
        activityInfo.img_arr.push(imgurl);
        activityInfo.markModified('img_arr');
        logger.debug(postRlt);
        activityInfo.save(function(err) {
          cb(err,activityInfo);
        });
      });
    }
  ], function(err, result){

    if(err){
      return logger.error('上传图片', err);
    }
    callback(err, result);
  })
};

//展示的图片(pagesize,pagenum)
var imgList = function(pagesize,pagenum,userInfo,callback) {
  logger.debug('pagesize:'+pagesize);
  logger.debug('pagenum:'+pagenum);
  var pagesize=parseInt(pagesize);

  var maxNum = 30;
  var getNum = 0;
  var lastRandom = 0;
  
  var resJson = {};
  vivoimg_model
    .find({isPass:1})
    .sort({'updateTime': -1})
    .$where(function() {
      var a = Math.random() / 10;
      if (Math.random() > a) {
        return true;
      }
      return false;
    })
    .limit(30)
    .exec(function (err, result) {
      // var isLastPage = (result.length < pagesize);
      // resJson['items'] = result;
      // resJson['isLastPage'] = isLastPage;
      // if(result.length === 0)  resJson['isLastPage'] = true;
      callback(err, result);
    })
};

//发奖章
var getMedia = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {
      if(!activityInfo){
        return cb('用户信息获取失败！');
      }
      if(activityInfo.light_arr.length>=4 && !activityInfo.isgetmedia){
        var _newApi = new newApi();
        var mcode = 'mm442';
        if (process.env.NODE_ENV === "product") {
          mcode = eventConfig.eventData.mcode;
        }
        _newApi.UserFunction.addMedalByUserId(userInfo.userId, mcode, function(err, data) {
          if (err) {
            return cb(err);
          }
          //logger.debug(data);
          activityInfo.isgetmedia = true;

          activityInfo.save(function(err) {
            cb(err,activityInfo);
          });
        })
      }else {
        return cb(null,'还没有资格领取奖牌或者已经领取过！');
      }

    }
  ], function(err, result){
    if(err){
      return logger.error('getmedia', err);
    }
    callback(err, result);
  })
};

//抽实体奖(lottype:(1-闯关),(2-终极图片),(3-rank_run),(4-rank_ride))
var lotEntity = function (activityInfo,lotlevel,lottype,cb) {
  if(lottype == 1){
    activityInfo.totalnum_run--;
  }
  else if(lottype == 2){
    activityInfo.totalnum_img--;
  }
  else if(lottype == 3){
    activityInfo.totalnum_rank_run--;
  }
  else if(lottype == 4){
    activityInfo.totalnum_rank_ride--;
  }

  luckyDraw.luckyDrawEntityByEventId(activityInfo.userInfo.userId, eventConfig.eventId, {level:lotlevel,minLevel:lotlevel}, function(err, lotteryDetail) {
    if (err) return cb(err);
    if (lotteryDetail) {
      activityInfo.isget_prize = true;

      activityInfo.nowprize_name = lotteryDetail.entityName;//中奖的名字
      activityInfo.is_nowprize = true;//当前是否中奖
      activityInfo.prize_arr.push(lotteryDetail.entityName);
      activityInfo.markModified('prize_arr');
      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    } else {
      activityInfo.is_nowprize=false;
      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });
    }
  })
}

//抽奖函数(活动中)
var actLuck = function(userInfo, callback) {
  async.waterfall([
    function(cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {
      if (!activityInfo) {
        return cb('用户信息获取失败！');
      }
      //有抽奖机会
      if((activityInfo.totalnum_run+activityInfo.totalnum_img)>0){
        //清空当前中奖信息
        activityInfo.is_nowprize=false;
        activityInfo.nowprize_name='';
        //闯关有机会
        if(activityInfo.totalnum_run>0){
          //判断中过奖没有
          if(activityInfo.isget_prize){
            activityInfo.totalnum_run--;
            activityInfo.save(function(err) {
              cb(err,activityInfo);
            });
          }else {
            lotEntity(activityInfo,1,1,cb);
          }
        }
        //图片有机会
        else {
          //判断中过奖没有
          if(activityInfo.isget_prize){
            activityInfo.totalnum_img--;
            activityInfo.save(function(err) {
              cb(err,activityInfo);
            });
          }else {
            lotEntity(activityInfo,1,2,cb);
          }

        }

      }
      //没有抽奖机会
      else {
        cb('暂时没有抽奖次数哦～');
      }

    },
  ], function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
};

//抽奖函数(排行榜)
var rankLuck = function(userInfo, callback) {
  async.waterfall([
    function(cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {
      if (!activityInfo) {
        return cb('用户信息获取失败！');
      }
      //有抽奖机会
      if((activityInfo.totalnum_rank_run+activityInfo.totalnum_rank_ride)>0){
        //清空当前中奖信息
        activityInfo.is_nowprize=false;
        activityInfo.nowprize_name='';

        //排行榜run有机会
        if(activityInfo.totalnum_rank_run>0){
          //判断中过奖没有
          if(activityInfo.isget_prize){
            activityInfo.totalnum_rank_run--;
            activityInfo.save(function(err) {
              cb(err,activityInfo);
            });
          }else {
            lotEntity(activityInfo,1,3,cb);
          }
        }
        //排行榜ride有机会
        else {
          //判断中过奖没有
          if(activityInfo.isget_prize){
            activityInfo.totalnum_rank_ride--;
            activityInfo.save(function(err) {
              cb(err,activityInfo);
            });
          }else {
            lotEntity(activityInfo,1,4,cb);
          }

        }

      }
      //没有抽奖机会
      else {
        cb('暂时没有抽奖次数哦～');
      }

    },
  ], function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
};

//跑步排行榜mylength_count_run
var getRuntop = function(userInfo,callback) {
  var resJson = {};

  vivo_user_model
    .find({"mylength_count_run": { $gt: 0 }},{"_id": 0, "userInfo": 1,"mylength_count_run": 1})
    .sort({'mylength_count_run': -1})
    .limit(50)
    .exec(function (err, result) {
      // logger.debug(result.userInfo)
      resJson['items'] = result;
      callback(err,resJson);
    })
};

//骑行排行榜mylength_count_ride
var getRidetop = function(userInfo,callback) {

  var resJson = {};

  vivo_user_model
    .find({"mylength_count_ride": { $gt: 0 }},{"_id": 0, "userInfo": 1,"mylength_count_ride": 1})
    .sort({'mylength_count_ride': -1})
    .limit(50)
    .exec(function (err, result) {
      // logger.debug(result.userInfo)
      resJson['items'] = result;
      callback(err,resJson);
    })
};

//关闭闯关弹窗
var closePop = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }

      activityInfo.isshowtoast = false;

      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    }
  ], function(err, result){

    if(err){
      return logger.error('closePop', err);
    }
    callback(err, result);
  })
};

var final = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }

      activityInfo.islasefinish = true;

      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    }
  ], function(err, result){

    if(err){
      return logger.error('final', err);
    }
    callback(err, result);
  })
};

function addLength(a, b, floatNum) {
  if (floatNum === undefined) {
    floatNum = 2;
  }

  var _wei = 1;

  for (var i = 0; i < floatNum; i++) {
    _wei = 10 * _wei;
  }

  var c = Math.round((a + b) * _wei) / _wei;
  return c;
}

//pushData,处理push过来的数据
// 第一关卡：每天完成累计1KM的跑步任务；或完成累计3KM的骑行任务。
// 第二关卡：每天完成累计3KM的跑步任务；或完成累计9KM的骑行任务。
// 第三关卡：每天完成累计5KM的跑步任务；或完成累计15KM的骑行任务。
// 第四关卡：每天完成累计7KM的跑步任务；或完成累计21KM的骑行任务。
var pushActdata = function (pushdata,callback){
  logger.debug('vivoPushfuction');
  async.waterfall([
      function(cb){
        vivoAc.isUserInEventModel(pushdata.user_id, cb);
      },
      function (activityInfo, cb) {
        if(!activityInfo) return cb('用户还没加入活动');
        logger.debug('come in in in');
        //存入数据表中
        var vivoact_Model = new vivo_act_model({
          routeId: pushdata.route_id,
          userId: pushdata.user_id,
          startTime:pushdata.start_time,
          endTime:pushdata.end_time,
          totalTime: pushdata.total_time,
          totalLength: pushdata.total_length,
          sport_type: pushdata.sports_type,
          createTime:new Date(),//本条数据的创建时间
          extend:'' //预留字段
        })

        vivoact_Model.save(
          function (err) {
            cb(err, vivoact_Model);
          }
        );
      },
      function (activityInfo,cb) {
        vivoAc.isUserInEventModel(pushdata.user_id, cb);
      },
      function(activityInfo, cb) {
        if (!activityInfo) {
          return cb('用户信息获取失败！');
        }
        //跑步
        if(pushdata.sports_type && pushdata.sports_type == 'run'){
          activityInfo.mylength_count_run=addLength(activityInfo.mylength_count_run,pushdata.total_length);
        }
        //骑行
        else if(pushdata.sports_type && pushdata.sports_type == 'cycling'){
          activityInfo.mylength_count_ride=addLength(activityInfo.mylength_count_ride,pushdata.total_length);
        }


        var now = new Date();

        // var runArr=[1,4,9,16];//1,3,5,7
        // var rideArr=[3,12,27,48];//3,9,15,21

        var runArr=[1,3,5,7];
        var rideArr=[3,9,15,21];
        if(activityInfo.light_arr.length<4){
          logger.debug(activityInfo.light_arr.length);
          var guanlength=activityInfo.light_arr.length;
          //累计跑步
          if((pushdata.sports_type == 'run') && (pushdata.total_length>runArr[guanlength])){
            activityInfo.light_arr.push(now);
            activityInfo.markModified('light_arr');
            activityInfo.isshowtoast = true;
          }
          //累计骑行
          if((pushdata.sports_type == 'cycling') && (pushdata.total_length>rideArr[guanlength])){
            activityInfo.light_arr.push(now);
            activityInfo.markModified('light_arr');
            activityInfo.isshowtoast = true;
          }
        }


        if((activityInfo.light_arr.length>=4) && !activityInfo.isaddrun){
          activityInfo.totalnum_run++;
          activityInfo.isaddrun=true;
        }

        activityInfo.save(function(err) {
          cb(err,activityInfo);
        });


      },
    ],
    function (err) {
      if (err && err != '用户还没加入活动') {
        logger.error(err);
      }
      callback(err);
    })
};

//更新用户上传照片是否通过
var UpdatejjPhotoWall=function(data,callback) {
  //审核通过了就放到自己件的表里面去
  async.waterfall([
      function (cb) {
        vivoAc.isUserInEventModel(data.userId, cb);
      },
      function (activityInfo,cb) {
        if(!activityInfo) return callback('用户没有参加活动!');
        cb(null,activityInfo);
      },
      function (activityInfo,cb) {
        vivoimg_model
          .findOne({photoId:data._id},function (err, doc) {
            if(err) return cb(err);
            cb(null,doc,activityInfo);
          })
      },
      function (photoInfo,activityInfo, cb) {
        logger.debug('审核图片的返回信息:',data);
        if(parseInt(data.eventId) != 1908){
          return callback('not 1908')
        }
        if(!photoInfo && parseInt(data.eventId) === 1908){
          var photoWall = new vivoimg_model({
            photoId:   data._id,
            userId:    data.userId,
            nick:      data.nick,
            photo:     data.imgData.src[0],
            isPass:    data.flag,  //1:通过,2:通过
            updateTime:new Date()
          })

          photoWall.save(function (err, doc) {
            cb(err,doc);
          })
        }else{
          photoInfo.isPass = data.flag;
          photoInfo.save(function (err, doc) {
            cb(err,doc);
          })
        }
      }
    ],
    function (err, result) {
      callback(err,result);
    })
}

function pageShare(userInfo, callback) {
  async.waterfall([
    function (cb) {
      vivoAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {
      if(!activityInfo) return callback('用户没有参加活动!');
      cb(null, activityInfo);
    },
    function (activityInfo, cb) {
      var now = new Date();
      var dayString = moment(now).format("YYYY-MM-DD");
      if (dayString != activityInfo.page_share_day) {
        activityInfo.page_share_day = dayString;
        activityInfo.totalnum_img++;  // 增加到图片分享到接口里
      } 
      activityInfo.save(function(err) {
        cb(err, activityInfo);
      });
    }
  ], function(err, response) {
    callback(err, response)
  });
}

module.exports = {
  actuserInfo: actuserInfo,
  imgShare:imgShare,
  imgUpload:imgUpload,
  imgList:imgList,
  getMedia:getMedia,
  actLuck:actLuck,
  rankLuck:rankLuck,
  getRuntop:getRuntop,
  getRidetop:getRidetop,
  closePop:closePop,
  final:final,
  pushActdata:pushActdata,
  UpdatejjPhotoWall:UpdatejjPhotoWall,
  pageShare: pageShare
}
