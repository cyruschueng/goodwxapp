
// 获取班级列表并排序
function check(obj,md51){
    // 时间戳
    var stamp = new Date().getTime();
    // 教师token
    var token = obj.data.teacherToken;

    var query1 = 'appid=web&timestamp='+stamp+'&token='+token;
    var query2 = 'appid=web&timestamp='+stamp+'&token='+token+'test';
    var sign = md51.md5(query2); 
    var query = query1 + '&sign=' + sign;
    // console.log(query)
   wx.request({
      url: 'https://teacherapi.gaosiedu.com/api/Login?'+ query, 
      method:'GET',
      header: {
        // "Content-Type": "application/x-www-form-urlencoded"
        "content-type": "application/x-www-form-urlencoded"
      },
      // dataType: JSON,
      success: function(res) {
        console.log(res)
        if(res.data.ResultType == 7){
          wx.showModal({
            title: '提示',
            content: '请重新登陆',
            showCancel: false,
            success:function(){
              wx.clearStorageSync();
              wx.reLaunch({ url: '/pages/index/index'})
            }
          })
        }
      },
      fail: function(err){
        console.log(err)
      }
    })
}

module.exports = {
  check:check
}