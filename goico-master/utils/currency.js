var network = require("./network.js")
var settings = require("../secret/settings.js")

// callbacks:
//{
//  success: function (res) {...},
//  fail: function (res) {...},
//  complete: function (res) {...},
//}
function loadCurrency(scope, params, page=1, size=20, callbacks) {
  let validScope = ['rank', 'change', 'selected', 'filter', 'markets']
  if (validScope.indexOf(scope) < 0) {
    return false
  }

  let url = ''
  if (scope == 'rank') {
    url = settings.currencyListUrl + '?page=' + page + '&size=' + size + '&sort=rank' 
  }

  if (scope == 'change') {
    url = settings.currencyListUrl + '?page=' + page + '&size=' + size + '&sort=change&direction=' + params.direction
  }

  if (scope == 'markets') {
    url = settings.currencyListUrl + '?page=' + page + '&size=' + size + '&market_id=' + params.market_id
  }

  if (scope == 'selected') {
    url = settings.favoriteListUrl
  }

  network.GET({
    url: url,
    success: callbacks.success,
    fail: callbacks.fail,
    complete: callbacks.complete,
  })
}

function getAvailableMarkets(callbacks) {
  let that = this
  let url = settings.availableMarketUrl

  network.GET({
    url: url,
    success: callbacks.success,
    fail: callbacks.fail,
    complete: callbacks.complete,
  })
}

module.exports = {
  loadCurrency: loadCurrency,
  getAvailableMarkets: getAvailableMarkets,
}