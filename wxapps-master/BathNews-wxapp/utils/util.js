function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function request(url,params,success,fail){
  this.requestLoading(url,params,'',success,fail)
}
//url：网络请求的url
//params:请求参数
//message:进度条的提示信息
//success:成功的回调函数
//fail:失败的回调
function requestLoading(url,params,message,success,fail){
  wx.showNavigationBarLoading()
  if(message != ""){
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url:url,
    data:params,
    header:{
      'content-type':'application/json'
    },
    method:'get',
    success:function(res){
      wx.hideNavigationBarLoading()
      if(message != ""){
        wx.hideLoading()
      }
      if(res.statusCode == 200){
        success(res.data)
      }else{
        fail()
      }
    },
    fail:function(res){
      wx.hideNavigationBarLoading()
      if(message != ""){
        wx.hideLoading()
      }
      fail()
    },
    complete:function(res){

    }
  })
}

module.exports = {
  formatTime: formatTime,
  request:request,
  requestLoading:requestLoading
}
