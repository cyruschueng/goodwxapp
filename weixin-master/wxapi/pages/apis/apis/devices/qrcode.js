/**
 * API -- device qrcode
 * 
 * 二维码
 */

module.exports = {
  scan(opts) {
    const _opts = {
      onlyFromCamera: 'Boolean, 是否只能从相机扫码，不允许从相册选择图片',
      scanType: 'Array, 扫码类型，二维码：qrCode, 一维码：barCode, DataMatrix: datamatrix, pdf417: pdf417',
      success(res) {
        const _res = {
          result: '所扫码的内容',
          scanType: '扫码类型',
          charSet: '所扫码的字符集',
          path: '当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的path'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    wx.scanCode(opts || _opts)
  }
}