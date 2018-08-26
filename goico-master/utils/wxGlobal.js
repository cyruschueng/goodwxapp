var wxCrypt = require("./WXBizDataCrypt.js")
var appid = 'wx1b9e3b5dba4aa5ca'

function shareComplete(res) {
  console.log("----on Share Success wxg----\n", res)
  wx.getShareInfo({
    shareTicket: res.shareTickets[0],
    complete(res) {
      console.log("---- share info wxg----\n", res)
    }
  })
}


module.exports = {
  shareComplete: shareComplete,
}