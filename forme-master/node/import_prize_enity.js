/**
 * Created by yummy on 17/4/12.
 */
var async = require('async');

var luckDraw = require('./../../../../routes/luckyDraw');

var eventId = 1904;

//礼包内容
var prizeObjects = [
  {
    entityName: 'Beats耳机',
    entityId: 19040001,
    totalCount: 3,
    consumeCount: 0,
    odds: 0,
    level: 4
  },
];


async.mapLimit(
  prizeObjects,
  1,
  function(prize, cb) {
    luckDraw.setEntityPrize(eventId, prize, false, function (err) {
      cb(err);
    });
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('prize ok ~');
    }
    process.exit();
  }
);

