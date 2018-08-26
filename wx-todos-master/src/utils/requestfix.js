/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-18 04:45:13
 * @modify date 2018-01-18 04:45:13
 * @desc 微信请求BUGFIX
*/

const RequestObserver = {
  requestLength: 0,
  concurrency: 10,
  workers: [],
  update () {
    if (this.workers.length && this.requestLength < this.concurrency) {
      this.workers.pop().request()
    }
  }
}

class WXRequest {
  constructor (options) {
    this.options = Object.assign({}, options, {
      complete () {
        // 请求完成，修改请求状态
        RequestObserver.requestLength--
        RequestObserver.update()
      }
    })
  }

  request () {
    wx.request(this.options)
  }
}

export default function (options) {
  let wxrequest = new WXRequest(options)
  RequestObserver.workers(wxrequest)
  RequestObserver.update()

  return wxrequest
}
