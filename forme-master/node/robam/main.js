var path = require('path');
var activity = require(path.join(rootPath) + '/routes/activity');
var logger = require(path.join(rootPath) + '/util/logger');
var newApi = require(path.join(rootPath) + '/api/newApi');
var luckyDraw = require(path.join(rootPath) + '/routes/luckyDraw');
var xmall = require(path.join(rootPath) + '/routes/xmall/xmall');

var eventConfig = require('./config');
var async = require('async');
var moment = require('moment');
var oneActivity = require(path.join(rootPath) + '/routes/main');
var robam_user_model = require('./model').robam_user_model;
var robam_act_model = require('./model').robam_act_model;

var robamAc = new oneActivity(eventConfig.eventId, eventConfig, robam_user_model);

function parseTime(time) {
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  if(m<10){
    m='0'+m;
  }
  if(d<10){
    d='0'+d;
  }
  return y+'-'+m+'-'+d
}


//用户信息
var actuserInfo=function (userInfo, callback) {
  var now = new Date();
  var eventCon={};
  var medaiaOpenArr=[0,0,0,0];
  var walkOpenArr=[0,0,0,0,0,0];

  async.waterfall([
    function (cb) {
      robamAc.getEventConfig(cb);
    },
    function(eventConfig,cb){
      eventCon=eventConfig

      //判断是否开启Start
      var nowTime=new Date(parseTime(now)).getTime();
      for(var i=0;i<eventCon.eventData.mediaStartTimeArr.length;i++){
        if(nowTime>=new Date(eventCon.eventData.mediaStartTimeArr[i]).getTime()){
          medaiaOpenArr[i]=1;
        }else {
          medaiaOpenArr[i]=0;
        }
      }
      for(var i=0;i<eventCon.eventData.walk_timeArr.length;i++){
        if(nowTime>=new Date(eventCon.eventData.walk_timeArr[i]).getTime()){
          walkOpenArr[i]=1;
        }else {
          walkOpenArr[i]=0;
        }
      }
      //判断是否开启end
      robamAc.isUserInEventModel(userInfo.userId, cb);

    },
    function (user, cb) {
      if (user) {
        if(!moment(now).isSame(user.today_intime,'day')){
          logger.debug('新的一天。clear');
          user.today_intime=now;
          user.isTodaygetquan = false;
        }
        user.walk_timeArr=eventCon.eventData.walk_timeArr;//开启走路日
        user.mediaStartTimeArr=eventCon.eventData.mediaStartTimeArr;//勋章开启日开启
        //判断走路增加抽奖机会
        var condition_a=(user.walk_finishArr[0]>=6000) && (user.walk_finishArr[1]>=6000)
        if(!user.is_add_one && condition_a){
          user.is_add_one=true;
          user.totalnum_lot++;
        }

        var condition_b=(user.walk_finishArr[2]>=6000) && (user.walk_finishArr[3]>=6000)
        if(!user.is_add_two && condition_b){
          user.is_add_two=true;
          user.totalnum_lot++;
        }

        var condition_c=(user.walk_finishArr[4]>=6000) && (user.walk_finishArr[5]>=6000)
        if(!user.is_add_three && condition_c){
          user.is_add_three=true;
          user.totalnum_lot++;
        }

        user.mediaStartTimeArr=medaiaOpenArr;
        user.walk_timeArr=walkOpenArr;
        user.markModified('mediaStartTimeArr');
        user.markModified('walk_timeArr');

        user.save(function(err) {
          cb(err,user);
        });
      }
     robamAc.bothJoin(userInfo, {
        //基础字段
       userId: userInfo.userId,
       isJoin: true,
       userInfo: userInfo,
       //自定义的
       join_time:    now,//加入活动时间
       today_intime: now,//今天进入活动的时间
       walk_finishArr:[
         0,//2017-06-09
         0,//2017-06-10
         0,//2017-06-12
         0,//2017-06-13
         0,//2017-06-15
         0,//2017-06-16
       ],//已完成的步行
       is_add_one:      false,//累计是否加机会(6.9-6.10)
       is_add_two:      false,//累计是否加机会(6.12-6.13)
       is_add_three:    false,//累计是否加机会(6.15-6.16)

       isTodaygetquan:  false,//今天是否每日一领
       isgetBigprize:   false,//是否获得终极大奖

       mediaArr:        [0,0,0,0],//勋章［0,0,0,0］0-没有获得，1-获得
       calories:        0,//我的卡路里

       totalnum_lot:    0,//可以抽奖的次数
       isprize:         false,//中过奖没有
       prize_arr:       [],//所获得的奖品
       is_nowprize:     false,//当前是否中奖
       nowprize_name:   '',//当前中奖的奖品名字

       info:            {},//收货信息
       is_fulled:       false,//是否填写收货信息
       walk_timeArr:    walkOpenArr,//开启走路日 0-没有开启，1-开启
       mediaStartTimeArr:medaiaOpenArr,//勋章开启日开启 0-没有开启，1-开启
      }, cb);
    }
  ],function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
}

//获得勋章
var getmedia=function(whichmedia,userInfo, callback) {
  var now = new Date();
  var uactData={};
  async.waterfall([
    function(cb) {
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo,cb) {
      if (!activityInfo) {
        return cb('用户信息获取失败！');
      }
      uactData=activityInfo;
      robamAc.getEventConfig(cb);
    },
    function (eventconf,cb) {
      var startday=new Date(eventconf.eventData.mediaStartTimeArr[whichmedia]).getTime();
      var endday=new Date(eventconf.eventData.mediaEndTimeArr[whichmedia]).getTime();
      var nowTime=new Date(parseTime(now)).getTime();
      // logger.debug(nowTime);
      // logger.debug(startday);
      // logger.debug(endday);

      var canTime=(nowTime>=startday) && (nowTime<=endday)

      logger.debug(uactData.mediaArr[whichmedia] == 0);
      logger.debug(canTime);

      if(uactData.mediaArr[whichmedia] == 0 && canTime){
        uactData.mediaArr[whichmedia] = 1;
        uactData.markModified('mediaArr');
        uactData.totalnum_lot++;
      }
      uactData.save(function (err) {
        cb(err, uactData);
      });

    }
  ], function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
};

//填写收货信息
var baoMing = function(baominginfo,userInfo, callback) {
  async.waterfall([
    function(cb) {
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function(activityInfo, cb) {
      if (!activityInfo) {
        return cb('用户信息获取失败！');
      }

      activityInfo.is_fulled=true;
      activityInfo.info=baominginfo;

      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    }
  ], function(err, result) {
    if (err) {
      logger.error(err);
    }
    callback(err, result);
  });
};

//抽实体奖
function lotEntity(activityInfo,lotlevel,cb) {
  luckyDraw.luckyDrawEntityByEventId(activityInfo.userInfo.userId, eventConfig.eventId, {level:lotlevel}, function(err, lotteryDetail) {
    if (err) return cb(err);
    activityInfo.totalnum_lot--;
    if (lotteryDetail) {
      activityInfo.nowprize_name = lotteryDetail.entityName;//中奖的名字
      activityInfo.is_nowprize = true;//当前是否中奖
      activityInfo.prize_arr.push(lotteryDetail.entityName);
      activityInfo.markModified('prize_arr');
      activityInfo.isprize = true;
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
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {
      if (!activityInfo) {
        return cb('用户信息获取失败！');
      }
      //有抽奖机会
      if(activityInfo.totalnum_lot>0){
        //清空当前中奖信息
        activityInfo.is_nowprize=false;
        activityInfo.nowprize_name='';
        //判断中过奖没有(最多中4个)
        if(activityInfo.prize_arr.length>=4){
          activityInfo.totalnum_lot--;
          activityInfo.save(function(err) {
            cb(err,activityInfo);
          });
        }else {
          lotEntity(activityInfo,8,cb);
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

//每日一领弹窗
var getquan = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }

      activityInfo.isTodaygetquan = true;

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

//卡路里top10
var gettop = function(userInfo,callback) {
  var resJson = {};
  async.waterfall([
    function (cb) {
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }
      robam_user_model
        .find({"calories": { $gt: -1 }},{"_id": 0, "userInfo": 1,"calories": 1})
        .sort({'calories': -1})
        .limit(10)
        .exec(function (err, result) {
          resJson['items'] = result;
          // callback(err,resJson);
          cb(err,resJson);
        })
    },
    function (resJson,cb) {
      robam_user_model
        .find({"calories": { $gt: -1 }},{"_id": 0, "userInfo": 1,"calories": 1})
        .sort({'calories': -1})
        .exec(function (err, result) {
          var uidArr=[];
          result.forEach(function(element) {
            uidArr.push(element.userInfo.userId)
          });
          logger.debug(uidArr.indexOf(userInfo.userId));

          if(uidArr.indexOf(userInfo.userId) != -1){
            resJson['mine'] = uidArr.indexOf(userInfo.userId)+1;
          }
          cb(err,resJson);
        })
    }
  ], function(err, result){

    if(err){
      return logger.error('closePop', err);
    }
    callback(err, result);
  })
};

//获得终极大奖
var getbigprize = function(userInfo, callback) {
  async.waterfall([
    function (cb) {
      robamAc.isUserInEventModel(userInfo.userId, cb);
    },
    function (activityInfo, cb) {

      if(!activityInfo){
        return cb('用户信息获取失败！');
      }
      if(activityInfo.mediaArr[3] != 1){
        return cb('还没有机会获得终极大奖！');
      }
      activityInfo.isgetBigprize = true;
      activityInfo.save(function(err) {
        cb(err,activityInfo);
      });

    }
  ], function(err, result){

    if(err){
      return logger.error('Bigprize', err);
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
var pushActdata = function (pushdata,callback){
  logger.debug('robamPushStepfuction');
  var eventCon={};
  async.waterfall([
      function (cb) {
        robamAc.getEventConfig(cb);
      },
      function (eventConfig,cb){
        eventCon=eventConfig
        robamAc.isUserInEventModel(pushdata.user_id, cb);
      },
      function (activityInfo, cb) {
        if(!activityInfo) return cb('用户还没加入活动');
        logger.debug(pushdata);

        //存入数据表中
        var robam_Model = new robam_act_model({
          userId: pushdata.user_id,
          totalTime:pushdata.totalTime,
          calories:pushdata.calories,
          meters: pushdata.meters,
          steps: pushdata.steps,
          date:pushdata.date,
          createTime:new Date(),//本条数据的创建时间
          extend:'' //预留字段
        })

        robam_Model.save(
          function (err) {
            cb(err, robam_Model);
          }
        );

      },
      function (activityInfo, cb) {
        robamAc.isUserInEventModel(pushdata.user_id, cb);
      },
      function (activityInfo, cb) {
        // logger.debug(eventCon.eventData.walk_timeArr)
        // walk_finishArr:[
        //   0,//2017-06-09
        //   0,//2017-06-10
        //   0,//2017-06-12
        //   0,//2017-06-13
        //   0,//2017-06-15
        //   0,//2017-06-16
        // ],//已完成的步行
        var now=pushdata.date;
        logger.debug(now);
        var isSameDay_a=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[0]).getTime();
        var isSameDay_b=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[1]).getTime();
        var isSameDay_c=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[2]).getTime();
        var isSameDay_d=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[3]).getTime();
        var isSameDay_e=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[4]).getTime();
        var isSameDay_f=new Date(now).getTime() == new Date(eventCon.eventData.walk_timeArr[5]).getTime();

        if(isSameDay_a){
          activityInfo.walk_finishArr[0]=Number(pushdata.steps);
        }else if(isSameDay_b){
          activityInfo.walk_finishArr[1]=Number(pushdata.steps);;
        }else if(isSameDay_c){
          activityInfo.walk_finishArr[2]=Number(pushdata.steps);;
        }else if(isSameDay_d){
          activityInfo.walk_finishArr[3]=Number(pushdata.steps);;
        }else if(isSameDay_e){
          activityInfo.walk_finishArr[4]=Number(pushdata.steps);
        }else if(isSameDay_f){
          activityInfo.walk_finishArr[5]=Number(pushdata.steps);
        }

        activityInfo.markModified('walk_finishArr');

        if(pushdata.calories){
          activityInfo.calories=Number(pushdata.calories);
        }


        activityInfo.save(function(err) {
          cb(err,activityInfo);
        });


      }
    ],
    function (err) {
      if (err && err != '用户还没加入活动') {
        logger.error(err);
      }
      callback(err);
    })
};



module.exports = {
  actuserInfo:actuserInfo,
  getmedia:getmedia,
  baoMing:baoMing,
  actLuck:actLuck,
  getquan:getquan,
  gettop:gettop,
  getbigprize:getbigprize,
  pushActdata:pushActdata,
}
