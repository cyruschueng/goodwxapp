var path = require('path');
var model = require(path.join(rootPath) + '/data/model');
var eventConfig = require('./config');
var json2csv = require('json2csv');//导表
var async = require('async');
var logger = require(path.join(rootPath) + '/util/logger');

//用这种方式建立的Model会自己带userId,userInfo,isJoin字段
var vivo_user_model = model.getDefaultUserModel(eventConfig.eventName, {
  join_time:        {type:Date},//加入活动时间
  today_intime:     {type:Date},//今天进入活动的时间
  is_ranklot:       {type:Boolean},//排行榜是否开始抽奖

  img_arr:          [],//上传的所有图片
  shareimgtime:     {type:Date},//分享图片时间
  isshare_img:      {type:Boolean},//上传图片今日是否分享

  totalnum_run:     {type:Number},//闯关可以抽奖的次数
  isaddrun:         {type:Boolean},//闯完4关是否添加了机会
  totalnum_img:     {type:Number},//分享图片可以抽奖的次数(终极)

  page_share_day:     {type: String},  // 最近分享页面的日期 (每天一般分享1次 获得一次抽奖机会)


  totalnum_rank_run:    {type:Number},//跑步排行榜可以抽奖的次数
  totalnum_rank_ride:   {type:Number},//骑行排行榜可以抽奖的次数
  isAddrank_run:    {type:Boolean},//排行榜是否加机会(跑步)
  isAddrank_ride:    {type:Boolean},//排行榜是否加机会(骑行)
  prize_arr:        [],//所获得的奖品
  istop200_run:    {type:Boolean},//是否是top200(跑步)
  istop200_ride:   {type:Boolean},//是否是top200(骑行)
  run_ranknum:     {type:Number},//跑步排行榜第几名
  ride_ranknum:    {type:Number},//骑行排行榜第几名
  isget_prize:      {type:Boolean},//是否获得过奖
  is_nowprize:      {type:Boolean},//当前是否中奖
  nowprize_name:    {type:String},//当前中奖的奖品名字

  light_arr:        [],//点亮logo的时间数组
  islasefinish:     {type:Boolean},//最后一关是否完成
  isshowtoast:      {type:Boolean},//是否弹完成一关弹窗
  isgetmedia:       {type:Boolean},//是否获得勋章
  mylength_count_run:   {type:Number},//我一共跑的活动的总里程(跑步)
  mylength_count_ride:  {type:Number},//我一共跑的活动的总里程(骑行)
});

//所有用户上传的图片
var vivoimg_model = model.getCustomModelByCustomSchema('vivo_img', {
  userId:    {type:String},//用户id
  photoId:   {type:String},//照片id
  nick:      {type:String},
  isPass:    {type:Number}, //  1、审核通过 2、审核未通过
  photo:     {type:String},    //  图片地址
  updateTime:{type:Date},//  上传时间
});

//用户运动表
var vivo_act_model = model.getCustomModelByCustomSchema('vivo_act_data', {
  routeId: {type: String, index: true},//记录唯一
  userId: {type: String, index: true},
  startTime:{type:String},
  endTime:{type:String},
  totalTime: {type: Number},
  totalLength: {type: Number},
  sport_type: {type:String},//运动类型
  createTime:{type:Date,default: Date.now},//本条数据的创建时间（用户上传时间）
  extend:{type:String,index:true} //预留字段
});

// 导出中奖数据 中奖名单+结束后两个top榜200的昵称
var exportData = [
  {
    name: '活动中奖信息',
    exportFunction: function(callback) {
      vivo_user_model.find({
        $or: [
          {isget_rankprize: true}, {isget_prize: true}
        ]
      },{'prize_arr': 1, "_id": 0, "userInfo": 1}).exec(
        function(err, results) {
          if (err) {
            logger.debug('vivoX9');
            return callback(err);
          }
          var data = [];
          results.forEach(function (item) {
            data.push({
              'nick': item.userInfo.nick,
              'userId': item.userInfo.userId,
              'prize_arr':item.prize_arr,
            })
          })
          var fields = ['nick','userId','prize_arr']
          json2csv({data: data, fields: fields, fieldNames: ['昵称','用户ID','中奖信息']}, function (err, csv) {
            callback(err, csv)
          })
        }
      )

    }
  },
  {
    name: '跑步排行榜top200信息',
    exportFunction: function(callback) {
        vivo_user_model.find(
          {"mylength_count_run": { $gt: 0 }},
          {"_id": 0, "userInfo": 1, "mylength_count_run": 1}
        )
        .sort({'mylength_count_run': -1})
        .limit(200)
        .exec(
          function(err, results) {
            if (err) {
              logger.debug('vivoX9ranktoprun');
              return callback(err);
            }
            var data = [];
            results.forEach(function (item) {
              data.push({
                'nick': item.userInfo.nick,
                'userId': item.userInfo.userId,
                'mylength_count_run':item.mylength_count_run,
              })
            })
            var fields = ['nick','userId','mylength_count_run']
            json2csv({data: data, fields: fields, fieldNames: ['昵称','用户ID','跑步里程']}, function (err, csv) {
              callback(err, csv)
            })
          }
        )

    }
  },
  {
    name: '骑行排行榜top200信息',
    exportFunction: function(callback) {
      vivo_user_model.find(
        {"mylength_count_ride": { $gt: 0 }},
        {"_id": 0, "userInfo": 1, "mylength_count_ride": 1}
      )
        .sort({'mylength_count_ride': -1})
        .limit(200)
        .exec(
          function(err, results) {
            if (err) {
              logger.debug('vivoX9ranktopride');
              return callback(err);
            }
            var data = [];
            results.forEach(function (item) {
              data.push({
                'nick': item.userInfo.nick,
                'userId': item.userInfo.userId,
                'mylength_count_ride':item.mylength_count_ride,
              })
            })
            var fields = ['nick','userId','mylength_count_ride']
            json2csv({data: data, fields: fields, fieldNames: ['昵称','用户ID','骑行里程']}, function (err, csv) {
              callback(err, csv)
            })
          }
        )

    }
  },
];


module.exports = {
  vivo_user_model: vivo_user_model,
  vivo_act_model:vivo_act_model,
  vivoimg_model:vivoimg_model,
  exportData:exportData,
}
