const formatTime = (date, format) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (format) {
    return [year, month, day].map(formatNumber).join('/')
  } else {
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function islogin() {
  wx.showModal({
    // title: '', 
    content: '您还没有登录，请登录后在试',
    success: function (res) {
      if (res.confirm) {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    },
  })
}

function share(){  
 // shareNum(); 
}

function sharTime(){//分享时间
  var num = parseInt(wx.getStorageSync('shareNum'))
  var yesterday = wx.getStorageSync('shareTime');//获得时间
  var nowTime=formatTime(new Date, "Y");
  var num = parseInt(wx.getStorageSync('shareNum'))
  if ( num<=5 ){
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 6000
    })
    //请求后台加米
  } else {//if (yesterday != nowTime)
    wx.showToast({
      title: '大于5次',
      icon: 'success',
      duration: 6000
    })
  }
}

function shareNum() { //分享次数
  var shareNum = wx.getStorageSync('shareNum');
  if (shareNum=="") {
    wx.setStorageSync('shareNum', 1);
  } else {
    let num = parseInt(shareNum) + 1;
    wx.setStorageSync('shareNum', num);
  }
  
  sharTime();
}

module.exports = {
  islogin: islogin, share: share,formatTime
}