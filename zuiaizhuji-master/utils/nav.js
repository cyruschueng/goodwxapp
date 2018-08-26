function navTo(url,param){
  var path = param == "" ? url : url + "?" + param;
  wx.navigateTo({
    url: path,
  })
}
function swithTo(url,param){
  var path = param == "" ? url : url + "?" + param;
  wx.switchTab({
    url: path,
  })
}

module.exports = {
  navTo: navTo,
  swithTo: swithTo
}