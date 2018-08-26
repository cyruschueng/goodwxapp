import promisify from './promisify'

const defaultHeader = {
  version: '1.0'
}

 /**
  * base function for request
  * @param {String} method - 'GET' | 'POST' | 'DELETE' | ...
  * @param {String} url
  * @param {Object} options 发送选项
  * @param {Object} options.data - 发送的数据
  * @param {Object} options.header - http 头
  */
function request(method, url, options = {}) {

  return new Promise((resolve, reject) => {
    const requestObj = {
      method: method.toUpperCase(),
      url: url,
      success: (res) => resolve(res),
      fail: (error) => reject(error)
    };

    const {data, header} = options;
    if (data) {
      requestObj.data = data;
    }

    requestObj.header = Object.assign({}, defaultHeader, header);

    wx.request(requestObj);
  });
}

/**
 *
 * @param {*} url
 * @param {*} options
 */
function get(url, options) {
  return request('GET', url, options);
}

function post(url, options) {
  return request('POST', url, options);
}

/**
 * 对 wx.uploadFile 的简单封装，使其 promise 化
 *
 * 具体文档参加 https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxuploadfileobject
 *
 * @param {object} params - 上传参数
 * @param {string} params.url - 上传 url
 * @param {string} params.filePath - 要上传文件资源的路径
 * @param {string} params.name - 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param {object} params.header - HTTP 请求 Header
 * @param {object} params.formData - HTTP 请求中其他额外的 form data
 */
function upload(params) {
  const wxUpload = promisify(wx.uploadFile)
  console.log('upload params: ', params)
  return wxUpload(params)
}

export default {
  request,
  get,
  post,
  upload
}
