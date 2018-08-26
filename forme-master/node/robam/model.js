var path = require('path');
var model = require(path.join(rootPath) + '/data/model');
var eventConfig = require('./config');
var json2csv = require('json2csv');//导表
var async = require('async');
var logger = require(path.join(rootPath) + '/util/logger');

//用这种方式建立的Model会自己带userId,userInfo,isJoin字段
var robam_user_model = model.getDefaultUserModel(eventConfig.eventName, {
  join_time:       {type:Date},//加入活动时间

  today_intime:    {type:Date},//今天进入活动的时间

  walk_finishArr:  {},//已完成的步行
  is_add_one:      {type:Boolean},//累计是否加机会(6.9-6.10)
  is_add_two:      {type:Boolean},//累计是否加机会(6.12-6.13)
  is_add_three:    {type:Boolean},//累计是否加机会(6.15-6.16)

  isTodaygetquan:  {type:Boolean},//今天是否每日一领
  isgetBigprize:   {type:Boolean},//是否获得终极大奖

  mediaArr:        [],//勋章［0,0,0,0］0-没有获得，1-获得
  calories:        {type:Number,index:true},//我的卡路里

  totalnum_lot:    {type:Number},//可以抽奖的次数
  isprize:         {type:Boolean},//中过奖没有
  prize_arr:       [],//所获得的奖品
  is_nowprize:     {type:Boolean},//当前是否中奖
  nowprize_name:   {type:String},//当前中奖的奖品名字

  info:            {},//收货信息
  is_fulled:       {type:Boolean},//是否填写收货信息

  // walk_timeArr:    [],//开启走路日
  // mediaStartTimeArr:[],//勋章开启日开启
  walk_timeArr:    [],//开启走路日 0-没有开启，1-开启
  mediaStartTimeArr:[],//勋章开启日开启 0-没有开启，1-开启
});

//用户运动表
var robam_act_model = model.getCustomModelByCustomSchema('robam_act_data', {
  userId: {type: String, index: true},
  totalTime: {type: Number},//秒
  calories:{type: Number},//卡路里 大卡
  meters:{type: Number},//米
  steps:{type: Number},//步数
  date:{type: String},//时间
  createTime:{type:Date,default: Date.now},//本条数据的创建时间（用户上传时间）
  extend:{type:String,index:true} //预留字段
});


// $and: [
//   {prize_arr: {$gt:0}}, {is_fulled:true}
// ]
// 导表{prize_arr: {$size:{$gt:0}}}
var exportData = [
  {
    name: '获得终极大奖的人',
    exportFunction: function(callback) {
      robam_user_model.find(
        {isgetBigprize: true},
        {"_id": 0, "userInfo": 1}).exec(
        function(err, results) {
          if (err) {
            logger.debug('robam');
            return callback(err);
          }
          var data = [];
          results.forEach(function (item) {
            data.push({
              'userId':item.userInfo.userId,
              'nick': item.userInfo.nick,
            })
          })
          var fields = ['userId','nick']
          json2csv({data: data, fields: fields, fieldNames: ['用户ID','用户昵称']}, function (err, csv) {
            callback(err, csv)
          })
        }
      )

    }
  },
  {
    name: '中奖相关信息(填写了收货信息的)',
    exportFunction: function(callback) {
      robam_user_model.find({
          isprize:true,is_fulled:true
      },
        {"_id": 0, "userInfo": 1,"info":1,"prize_arr":1}).exec(
        function(err, results) {
          if (err) {
            logger.debug('robam');
            return callback(err);
          }
          var data = [];
          logger.debug(results);
          results.forEach(function (item) {
            data.push({
              'userId':item.userInfo.userId,
              'nick': item.userInfo.nick,
              'prize_arr':item.prize_arr,
              'name': item.info.name,
              'sexy': item.info.sexy,
              'phone': item.info.phone,
              'address': item.info.address,
              'size_cloth': item.info.size_cloth,
              'size_shoe': item.info.size_shoe,
            })
          })
          var fields = ['userId','nick','prize_arr','name','sexy','phone','address','size_cloth','size_shoe']
          json2csv({data: data, fields: fields, fieldNames: ['用户ID','用户昵称','活的奖品','收货人姓名','性别','电话','收货地址','衣服尺码','鞋子尺码']}, function (err, csv) {
            callback(err, csv)
          })
        }
      )

    }
  },
  {
    name: '中奖相关信息(没有填写收货信息)',
    exportFunction: function(callback) {
      robam_user_model.find(
        {isprize:true,is_fulled:false},
        {"_id": 0, "userInfo": 1,"prize_arr":1}).exec(
        function(err, results) {
          if (err) {
            logger.debug('robam');
            return callback(err);
          }
          var data = [];
          results.forEach(function (item) {
            data.push({
              'userId':item.userInfo.userId,
              'nick': item.userInfo.nick,
              'prize_arr': item.prize_arr,
            })
          })
          var fields = ['userId','nick','prize_arr']
          json2csv({data: data, fields: fields, fieldNames: ['用户ID','用户昵称','获得奖品']}, function (err, csv) {
            callback(err, csv)
          })
        }
      )

    }
  },
];


module.exports = {
  robam_user_model: robam_user_model,
  robam_act_model:robam_act_model,
  exportData:exportData,
}
