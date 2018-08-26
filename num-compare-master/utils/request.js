const host = 'https://api.tupiaopiao.com'
/*https://api.tupiaopiao.com*/
/*http://l.test.81youxi.com*/

const request = (url, data, callback, fail)=>{
  data.app_id = 'wx3931df9508de4d23'

  wx.request({
    url: host + url, //仅为示例，并非真实的接口地址
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (res) {
      if(fail.isFunction){
        fail(res);
      }else{
        console.log('获取失败');
      }
      
    }
  })
}

module.exports = {
  request: request
}