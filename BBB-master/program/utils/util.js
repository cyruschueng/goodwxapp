const HOST = 'https://bit.macsen318.com/xcx';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
 
  return [year, month, day]
}
const requestPost = (url, data, callback)=>{
  wx.showLoading({
    title:'',
    mask:true,
  });
  data['token'] = wx.getStorageSync('token');
  data['openId'] = wx.getStorageSync('openid');
    wx.request({
      url: `${HOST}/${url}`,
      data: data,
      method: 'post',
      header: {
        'token': wx.getStorageSync('token'),
        'openId': wx.getStorageSync('openid'),
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading();
        callback && callback(res.data);
        //console.log(res.data)
      },
      fail:function(r){
        wx.hideLoading();
      }
    })
}

const requestGet = (url, callback) => {
  wx.showLoading({
    title: '',
    mask: true,
  });
  let token = wx.getStorageSync('token');
  let openId = wx.getStorageSync('openid');
    wx.request({
      url: `${HOST}/${url}?token=${token}&openId=${openId}`,
      header:{
         'token': wx.getStorageSync('token'),
        'openId': wx.getStorageSync('openid'),
      },
      success: function (res) {
        wx.hideLoading();
        callback && callback(res.data);
        //console.log(res.data)
      }, fail: function (r) {
        wx.hideLoading();
      }
    })

}
module.exports = {
  formatTime,
  requestPost,
  requestGet
}
