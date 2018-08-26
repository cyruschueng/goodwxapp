function requestPost(url,data,callback){
  var htp = 'https://teacherapi.gaosiedu.com/';

  wx.request({  
      url: htp + url,  //query：api+参数
      method:'post',
      // header: {
      //   // "Content-Type": "application/json"
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      data:data,
      dataType: JSON,
      success: function(res) {
        callback(res)
      },
      fail: function(err){
        console.log(err)
        wx.showToast({
          title: '数据储存失败,请稍后重试',
          icon: 'loading',
          duration: 2000
        })
      }
    })
}
module.exports = {  
  requestPost : requestPost 
}  