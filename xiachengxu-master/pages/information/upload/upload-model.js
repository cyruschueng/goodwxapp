import { Base } from '../../../utils/base.js';
import { Config } from '../../../utils/config.js';

class Upload extends Base {
  constructor() {
    super()
  }
  /**
   * 上传图片到后台服务器
   * 使用表单提交的形式
   */
  uploadToServer(params, callback) {
    var that = this;
    wx.uploadFile({
      url: `${Config.restUrl}/wxserver/user/fileUpload`,
      header: {
        'content-type': 'multipart/form-data'
      },
      filePath: params.file,
      name: params.file.substr(30, 50) + '.png',
      formData: params,
      success: res => {
        if (res.statusCode == 200)
          callback && callback(JSON.parse(res.data));
        else
          callback && callback({ status: false });
      },
      fail: err => {
        callback && callback({ status: false });
      }
    })
  }
}

module.exports = {
  Upload
}