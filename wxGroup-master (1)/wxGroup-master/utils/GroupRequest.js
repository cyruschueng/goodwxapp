
var mNetInfo = {};
function request(params){
  if(params.method == 'POST'){
    params.header = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    params.data = JSON.stringify(params.data);
  }
  console.log(params.data)
  wx.request({
    url: mNetInfo.prefixUrl +params.url,
    data: params.data,
    method:params.method,
    header: params.header,
    fail:function(){
      wx.showToast({
        title: '网络开小差了，去别的地方逛逛吧',
      })
      if(params.fail && typeof params.fail == 'function'){
        params.fail();
      }
    },
    success:function(res){
      if(res && res.data){
        console.log(res);
        var result = res.data;
        if(result.status.code == '10001'){
          if (params.success && typeof params.success == 'function') {
            params.success(result.result)
          }
        }else{
          wx.showToast({
            title: result.status.msg,
          })
        }
      }
    }, complete:function(){
      if (params.compelete && typeof params.compelete == 'function') {
          params.compelete()
      }
    }
  })
}
var  uploadFile = function(params){
  console.log(params)
  wx.uploadFile({
    url: mNetInfo.prefixUrl + params.url,
    filePath: params.filePath,
    name: 'file',
    success:function(res){
      if(res && res.data){
        var result = res.data;
        console.log(result);
        result = JSON.parse(result);
        if (result.status.code == '10001') {
          if (params.success && typeof params.success == 'function') {
            params.success(result.result)
          }
        } else {
          wx.showToast({
            title: result.status.msg,
          })
        }
      }
    },
    fail:function(res){
      console.log(res)
      wx.showToast({
        title: '网络开小差了，去别的地方逛逛吧',
      })
      if (params.fail && typeof params.fail == 'function') {
        params.fail();
      }
    },complete:function(){
      if (params.compelete && typeof params.compelete == 'function') {
        params.compelete()
      }
    }
  })
}
function initNetDev(dev){
  mNetInfo.prefixUrl = dev;
}

var NetDev = (function(){
  return {
    preRelease:'https://preapi.atling.cn/group',
    release: 'https://api.atling.cn/group',
    dev:'http://presocket.atling.cn:9999'
  }
})()

module.exports={
  request:request,
  initNetDev: initNetDev,
  NetDev: NetDev,
  uploadFile: uploadFile
}