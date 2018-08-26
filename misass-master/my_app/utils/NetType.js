
// const dev = "https://wl.bjike.com/",
const dev = "https://wl.bjike.com/";   
function devUel(){    //固定的url
  return dev
}
//post请求 url：请求路径，请求header，params请求参数
function networkpost(url, headers, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      header: headers,
      data: params,
      method: 'POST',
      success: function (res) {
        resolve(res);
      }
    })
  })
}
//get请求
function networkget(url, headers, params) {
  return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        header: headers,
        data: params,
        method: 'GET',
        success: function (res) {
          resolve(res)
        }
      })
  });
}
module.exports = {
  networkget: networkget,
  networkpost: networkpost,
  devUel: devUel
}

