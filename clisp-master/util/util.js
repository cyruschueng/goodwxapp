function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function uploadFile(filePath, callback) {
  const uploadFileUrl = 'https://bala.so/wxapp/uploadFile'
  const user = getApp().globalData.user
  wx.uploadFile({
    url: uploadFileUrl,
    filePath: filePath,
    name: 'file',
    formData: {
      'userId': user && user._id || ''
    },
    success: function (res) {
      var data = res.data
      callback && callback(res)
    },
    fail: function (res) {
      console.log(res)
    }
  })
}

module.exports = {
  uploadFile: uploadFile,
  formatTime: formatTime,
  formatLocation: formatLocation
}
