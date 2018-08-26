const API_ROOT = 'https://weapp-test.youhaodongxi.com'
const sessionId = wx.getStorageSync('sessionId')
const header = { 'Authorization': `Bearer ${sessionId}`, ver:'2.0.0' }

// wrapper wx.request function for handler all request
function _request ({ url, method = 'POST', data }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_ROOT}${url}`,
      method,
      data,
      header,
      dataType: 'json',
      success (res) {
        const { data, statusCode } = res
        if (statusCode === 401) {
          wx.hideLoading()
          const isReLaunch = wx.getStorageSync('reLaunch')
          // is from reLaunch?
          if (isReLaunch) {
            wx.clearStorageSync()
            const msg = data.msg || data.message || '当前 TOKEN 错误'
            return wx.navigateTo({ url: `/pages/500/500?msg=${msg}`})
          }
          wx.clearStorageSync()
          // add `reLaunch` flag to stop infinite loops reLaunch.
          wx.setStorageSync('reLaunch', true)
          return wx.reLaunch({ url: '/pages/index/index' })
        }
        // 小程序有新的版本
        if (statusCode === 426) {
          const msg = '小程序升级了...'
          return wx.redirectTo({ url: `/pages/500/500?msg=${msg}`})
        }
        if (statusCode === 200 && data.code === 0) {
          // @TODO temp remove `reLaunch` here
          if (!/\/login/g.test(url)) wx.getStorageSync('reLaunch') && wx.removeStorageSync('reLaunch')
          resolve(data.data)
        } else {
          reject(data)
        }
      },
      fail (error) {
        reject(error)
      }
    })
  })
}

exports._request = _request

exports.setAuthHeader = sessionId => {
  header.Authorization = `Bearer ${sessionId}`
}

// id = cityId || provinceId
exports.setLocationHeader = id => {
  header.municAndCityId = id
}
