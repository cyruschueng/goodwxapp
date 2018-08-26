function requestGet( url,callback){
  // 域名
  var htp = 'https://teacherapi.gaosiedu.com/';

  wx.request({  
      url: htp + url,  //query：api+参数
      method:'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        callback(res)
      },
      fail: function(err){
        wx.showToast({
          title: '数据加载失败,请检查网络配置',
          icon: 'loading',
          duration: 2000
        })
      }
    })
}
module.exports = {  
  requestGet : requestGet 
}  