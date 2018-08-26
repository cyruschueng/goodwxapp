export default class Request {
  static serverHost(schema = 'https') {
    return schema + '://dotalust_dev.com'
  }

  static send(opts) {
    wx.request({
      url: `${this.serverHost()}${opts.url}`,
      data: opts.data || {},
      header: Object.assign(
        opts.header || {}, { 'content-type': 'application/json' }
      ),
      method: opts.method || 'GET',
      success: (response) => {
        opts.success && opts.success(response.data, response)
      },
      fail: () => {
        opts.fail && opts.fail()
      },
      complete: () => {
        opts.complete && opts.complete()
      }
    })
  }

  static authSend(authentication, opts) {
    authentication.executeAuthTask((session) => {
      if (opts.header) {
        opts.header.token = session.token
      } else {
        opts.header = { token: session.token }
      }

      this.send(opts)
    })
  }
}
