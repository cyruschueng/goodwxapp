var async = require('async');

var luckDraw = require('./../../../../routes/luckyDraw');

var fivequan = require('./5.js');
var tenquan = require('./10.js');
var libaocode = require('./libao.js');

var eventId = 1904;

function importCodePrize(codePrize, name, level, callback) {
  //var count = 0
  async.mapLimit(
    codePrize,
    100,
    function (itemPrizeId, cb) {
      //console.log(count++)
      luckDraw.setSecuritiesPrize(eventId, {
        SecuritiesCodeId: codePrize.indexOf(itemPrizeId),
        SecuritiesName: name,         // '劲酒商城30元代金券',
        SecuritiesCode: itemPrizeId,
        isConsumed: false,
        odds: 1000,
        level: level
      }, false, function (err) {
        console.log(codePrize.indexOf(itemPrizeId));
        if (err === '1001') {
          return cb(null);
        }
        cb(err);
      })
    },
    function (err) {
      if (err) {
        console.log(err)
      }
      callback(err)
    }
  )
}

function importAllCodePrize(callback) {
  async.waterfall([
    function (cb) {
      importCodePrize(fivequan, '劲酒商城5元代金券', 1, cb)
    },
    function (cb) {
      importCodePrize(tenquan, '劲酒商城10元代金券', 2, cb)
    },
    function (cb) {
      importCodePrize(libaocode, '幸运大礼包', 3, cb)
    },
  ], function (err) {
    if (err) {
      console.log('importAllCodePrize' + err);
    }
    callback(err);
  })
}

async.waterfall([
  function (cb) {
    importAllCodePrize(cb)
  }
], function (err) {
  if (err) {
    console.log(err);
  }
  console.log('ok');
  process.exit();
})

