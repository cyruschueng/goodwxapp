/**
 * API -- 文件上传下载
 * 
 * 1. wx.uploadFile(object), return: uploadTask
 *  最大并发限制是：10个，超时和最大超时时间是60s
 * 
 * 2. wx.downloadFile(object), return: downloadTask
 * 
 */

/************* upload */
function upload(opts) {
  var _opts = {
    url: 'String, required, 开发者服务器url',
    filePath: 'String, required, 要上传的资源路径',
    name: 'String, required, 文件对应的key，开发者通过这个key可以获取到文件二进制内容',
    header: {
      // ...
    },
    formData: {
      // 'Object, HTTP请求中额外的form data'
    },
    success: function (res) {
      var _res = {
        data: 'String',
        statusCode: 'Number'
      }
      console.log('/file/upload/success/data', res.data)
      console.log('file/upload/success/statusCode', res.statusCode)
    },
    fail: 'Funtion',
    complete: 'Function'
  }

  const uploadTask = wx.uploadFile(opts || _opts)

  return uploadTask
}

/************* download */
function download(opts) {
  const _opts = {
    url: 'String, required',
    header: 'Object',
    success: function (res) {
      // 'Function, 下载成功后以 tempFilePath 形式传给页面， res = { tempFilePath: "文件临时路径" }'
      console.log('/file/download/success', res.tempFilePath)
    },
    fail: 'Function',
    complete: 'Function'
  }

  const downloadTask = wx.downloadFile(opts || _opts)

  return downloadTask
}

// 本地文件存储限制大小：10M
function  save(opts) {
  const _opts = {
    tempFilePath: 'String, required, 保存文件的临时路径',
    success(res) {
      const _res = {
        savedFilePath: '文件的保存路径'
      }
    },
    fail(res) {},
    complete(res) {}
  }

  wx.saveFile(opts || _opts)
}

function getSavedFileList(opts) {
  const _opts = {
    success(res) {
      const _res = {
        errMsg: 'String, 调用结果',
        // 'Object Array, 文件列表'
        fileList: [{
          filePath: 'String, 本地文件路径',
          createTime: 'Number, 文件保存的时间戳，从1970/01/01 08:00:00到当前时间的描述',
          size: 'Number, 文件大小，单位：B'
        }]
      }
    },
    fail(res) {},
    complete(res) {}
  }
}

function getSavedFileInfo(opts) {
  const _opts = {
    filePath: 'String, required, 文件路径',
    success(res) {
      const _res = {
        errMsg: 'String, 调用结果',
        size: 'Number, 文件大小，单位：B',
        createTime: 'Number, 文件保存的时间戳，从1970/01/01 08:00:00到当前时间的描述'
      }
    },
    fail(res) {},
    complete(res) {}
  }
}

function removeSavedFile(opts) {
  const _opts = {
    filePath: 'String, required, 要删除文件的路径',
    success(res) {},
    fail(res) {},
    complete(res) {}
  }
}

// 支持格式：doc, xls, ppt, pdf, docx, xlx, pptx
function openDoc(opts) {
  const _opts = {
    filePath: 'String, required, 文件路径，可通过downFile获得',
    fileType: 'String, 文件类型，有效值：doc, xls, ppt, pdf, docx, xlx, pptx',
    success(res) {},
    fail(res) {},
    complete(res) {}
  }
}

const task = {
  upload: {
    onProgressUpdate: function (res) {
      // 'Function, 参数：callback, 1.4.0'
      const _res = {
        progress: 'Number, 上传进度百分比',
        totalBytesSent: 'Number, 已上传的数据长，单位 Bytes',
        totalBytesExpectedToSend: 'Number, 预期需要上传的数据总长，单位：Bytes'
      }
    },
    abort: 'Function, 1.4.0'
  },

  download: {
    onProgressUpdate: function (res) {
      // 'Function, 参数：callback, 1.4.0'
      const _res = {
        progress: 'Number, 下载进度百分比',
        totalBytesWritten: 'Number, 已下载的数据长，单位 Bytes',
        totalBytesExpectedToWrite: 'Number, 预期需要下载的数据总长，单位：Bytes'
      }
    },
    abort: 'Function, 1.4.0'
  }
}

module.exports = {
  upload, download
}
