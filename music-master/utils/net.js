const apiUrl = 'http://neteasemusic.leanapp.cn';
function apiRequest({url,method,data, success, fail, complete}){
  return wx.request({
    url: `${apiUrl+url}`,
    method,
    data,
    success,
    fail, 
    complete
  })
}
module.exports= {
  apiRequest
}