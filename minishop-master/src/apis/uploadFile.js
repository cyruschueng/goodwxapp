import Promise from 'es6-promise'
import { getSid } from './sid'
import config from 'config'
import {
  noop,
  clone
} from 'utils'
const appid = config.appid
const fileUploadUrl = config.urls.fileUpload
export function uploadFile (options) {
  let {
    fail = noop,
    success = noop,
    formData = {}
  } = options

  return new Promise((resolve, reject) => {
    getSid().then((sid) => {
      formData.sid = sid
      formData.appid = appid

      options.success = (res) => {
        try {
          var data = JSON.parse(res.data)
          success(data)
          resolve(data)
        } catch (e) {
          fail(e)
          reject(e)
        }
      }

      options.fail = (err) => {
        fail(err)
        reject(err)
      }
      options.formData = formData
      wx.uploadFile(options)
    }).catch((err) => {
      fail(err)
      reject(err)
    })
  })
}

export function multiUploadFile (options) {
  const fileIds = options.fileIds || options.filePaths || []
  let arr = options.filePaths.map((filePath, idx) => {
    let _options = clone(options)
    _options.filePath = filePath
    _options.formData = {
      fileId: fileIds[idx]
    }
    return uploadFile(_options)
  })

  return Promise.all(arr)
}

// 默认的上传配置
// 图片或视频：fileId：文件本地路径, imgHeight：高（图片或截屏）, imgWidth：宽（图片或截屏）,  url：地址（图片或视频）,
// 视频：snapshotUrl：视频截屏地址, vedioSize：视频大小
export const uploader = (filePath, fileId = filePath) => uploadFile({
  url: fileUploadUrl,
  formData: {
    fileId
  },
  filePath,
  name: 'file'
})

// 默认多个的上传配置
export const multiUploader = (filePaths, fileIds = filePaths) => multiUploadFile({
  url: fileUploadUrl,
  filePaths,
  fileIds,
  name: 'file'
})
