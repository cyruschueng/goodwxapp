/*eslint-disable */
/*
 依赖
<script src="//cdn.vizen.cn/public/qq/cos-js-sdk-v4.js"></script>
<script src="//cdn.vizen.cn/public/qq/ugcUploader.js"></script>
<script src="<%=request.getContextPath()%>/plugins/js-spark-md5/spark-md5.min.js"></script>
<script src="<%=request.getContextPath() %>/plugins/axios/axios.min.js"></script>
// 初始化
this.uploader = new QCloudUploader({
    type: '', //image ，audio，video，
    maxSize: {
        'image': this.picMax || '2M',
        'video': this.videoMax || '30M'
    }
})
上传文件：
this.uploader.uploadFiles({
    file: event.target.files[0],
    loaded: function (response) {
        console.log(response)
        that.uploaded([response])
    },
    uploadProgress: function (progress) {
        if (progress == 1) {
            that.tips = '上传完成'
            console.log('上传完成,稍等')
        } else {
            that.tips = '上传中(' + Math.round(progress * 100) + '%)'
            console.log(that.tips)
        }
        console.log(progress)
    },
    success: function (response) {
        // that.uploaded([response])
        that.resetTips()
    },
    error: function () {
        that.resetTips()
    }
})

TODO:
写一个工厂函数，封闭两个之间的区别
 */

require('../assets/js/spark-md5.min')
import { myBucket } from '@/api'
let picBucket = 'luna'

const ERROR_MAP = {
  '0': 'success',
  '1': '文件太大,已经超过上限{0}',
  '2': '上传服务错误',
  '3': '签名失败',
  '4': '{0}获取md5值出错了',
  '5': '获取 remotePath 失败',
  '409': '资源已经存在'
}

const cosConfig ={
  bucket: picBucket, // luna
  appid: '10002033',
  region: 'sh',
}


function QCloudUploader (initOptions) {
  var defaultOptions = {
    type: '', // image ，audio，video，
    files: [],
    chunkSize: 2097152, // 文件的chunk大小
    cosConfig, 
    imagePath: '',
    defaultUrl: 'http://cdn.vizen.cn/public/nongjia/img/no_picture.jpg',
    maxSize: {
      'image': '2M',
      'video': '30M',
      'audio': '5M'
    },
    $api:{},
  }
  this.globalOptions = Object.assign(defaultOptions, initOptions)
}

/**
 * 上传文件
 * 支持多个文件一起上传
 */
QCloudUploader.prototype.uploadFiles = function (options) {
  var that = this,file = options.file;
  var mediaObj = {
    resourceType:'', // 上传资源的类型,全景资源，普通资源、视频资源
    readProgress: 0,
    progress: 0,
    url: '',
    remoteUrl: '',
    localUrl: '',
    defaultUrl: 'http://cdn.vizen.cn/public/nongjia/img/no_picture.jpgs',
    type: '',
    md5: '',
    name: '',
    errMsg: '',
    code: '0',
    exifData: '', // exif 信息
    tips: '' // tips信息
  }
  if (options.previewLocal) {
    mediaObj.localUrl = createObjUrl(file)
  }
  mediaObj.type = getFileType(file)
  mediaObj.exifData = file.exifData
  mediaObj.name = file.name
  mediaObj.md5 = file.md5
  
  // 此处回调，那边产生占位
  mediaObj.url = setUrl(mediaObj)

  options.loaded(mediaObj)

  var checkResult = that.checkFile(file, mediaObj)
  if (checkResult.code == '0') {
    if (mediaObj.type == 'image' || mediaObj.type == 'audio' || mediaObj.type == 'attach' || mediaObj.type == 'download') {
      that.initCosConfig(mediaObj, file, options).then(uploadedSuccess.bind(this)).catch((error) => {
        revokeObjUrl(mediaObj)
        mediaObj.code = error.code
        mediaObj.errMsg = error.message
        options.error(mediaObj)
      })
    } else if (mediaObj.type == 'video') {
      that.initVideoConfig(mediaObj, file, options).then(uploadedSuccess.bind(this)).catch((error) => {
        console.error(error)
        revokeObjUrl(mediaObj)
        options.error(mediaObj)
      })
    }
  } else {
    revokeObjUrl(mediaObj)
    mediaObj.code = checkResult.code
    mediaObj.errMsg = checkResult.msg
    options.error(mediaObj)
    return false
  }
}

/**
 * 
 * 
 * @param {any} mediaObj 媒体对象
 * @param {any} GOptions 全局的参数
 * @param {any} successFn 成功的方法
 * @param {any} failFn 失败的方法
 */
function getRemotePath (mediaObj,file, GOptions,options, successFn,failFn) {
  if (options.resourceType == 'panoPiece') {
    var remotePath = '/vizen/' + options.panoInfo.id + '/' + file.name;
    successFn(remotePath)
  } else {
    GOptions.$api.getCosFilePath({
      params: {
        type: mediaObj.type == 'image'?'pic':mediaObj.type, // type: 'pic',
        name: file.name,
        md5: md5Value
      }
    }).then((res)=>{
      var path = res.data;
      if (res.code == '0') {
        successFn();
      } else if (res.code == '409') {
        resolve({
          result: res,
          options: options,
          mediaObj: mediaObj
        })
      } else {
        reject(new MyError('5', ERROR_MAP['5']))
      }
    }).catch(() => {
      reject(new MyError('5', ERROR_MAP['5']))
    })
  }
}

/**
 * 初始cos 配置
 */
QCloudUploader.prototype.initCosConfig = function (mediaObj, file, options) {
  if (CosCloud) {
    var GOptions = this.globalOptions;
    GOptions.cosConfig = setBucket(options);
    const getSignFn = setGetSignFn(GOptions,options);
    return getFileMD5(mediaObj, file, options, GOptions).then((md5Value) => {
      mediaObj.md5 = md5Value;
      var insertOnly = 0 // 0 表示允许覆盖文件 1表示不允许 其他值忽略
      var uploadPromise = new Promise((resolve, reject) => {
        getRemotePath(mediaObj, file, GOptions, options,function(remotePath) {
          var cos = new CosCloud({
            appid: GOptions.cosConfig.appid, // APPID 必填参数
            bucket: GOptions.cosConfig.bucket, // bucketName 必填参数
            region: GOptions.cosConfig.region, // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
            getAppSign: function (callback) { // 获取签名 必填参数
              getSignFn({
                params: {
                  remotePath: remotePath
                }
              }).then((signRes) => {
                if (signRes.code == '0') {
                  callback(signRes.data)
                } else {
                  reject(new MyError('3', ERROR_MAP['3']))
                }
              }).catch((error) => {
                console.error(error)
                reject(new MyError('2', ERROR_MAP['2']))
              });
            }
          })
          cos.uploadFile((response) => {
            response.md5 = mediaObj.md5;
            response.type = 'image';
            resolve({
              result: response,
              options: options,
              mediaObj: mediaObj
            })
          }, function (response) {
            reject(new MyError('2', ERROR_MAP['2']))
          }, function (progress) {
            mediaObj.progress = progress
            options.uploadProgress(mediaObj, progress)
          }, GOptions.cosBucket, remotePath, file, insertOnly)
        }, function(error){
          console.error(error)
          reject(new MyError('5', ERROR_MAP['5']))
        });
      })
      return uploadPromise
    })
  } else {
    console.log('缺少cos 的引用')
    return Promise.reject(new Error('缺少cos 的引用'))
  }
}

/**
 * 初始视频 配置
 * index 是文件在文件数组中的排序
 */
QCloudUploader.prototype.initVideoConfig = function (mediaObj, file, options, GOptions) {
  if (qcVideo) {
    var GOptions = this.globalOptions
    var md5Promise = getFileMD5(mediaObj, file, options, GOptions).then(function (md5Value) {
      var uploadPromise = new Promise((resolve, reject) => {
        var videoUploader = qcVideo.ugcUploader.start({
          videoFile: file,
          getSignature: function (callback) {
            GOptions.$api.getQcloudVideoSign({
              params: {
                md5: md5Value,
                type: mediaObj.type
              }
            }).then(function (returnData) {
              var res = returnData.data
              if (res.code == '0') {
                callback(res.data)
              } else if (res.code == '409') {
                resolve({
                  result: res,
                  options: options,
                  mediaObj: mediaObj
                })
              } else {
                reject(new MyError('获取视频签名失败'))
              }
            })
          },
          success: function (result) {
            console.log('上传成功的文件类型：' + result.type)
          },
          error: function (result) {
            reject(new MyError('2', ERROR_MAP['2']))
            console.log('上传失败的文件类型：' + result.type)
            console.log('上传失败的原因：' + result.msg)
          },
          progress: function (result) {
            options.uploadProgress(result.curr)
            mediaObj.uploadProgress = result.curr
            console.log('上传进度的文件类型：' + result.type)
            console.log('上传进度的文件名称：' + result.name)
            console.log('上传进度：' + result.curr)
          },
          finish: function (result) {
            result.type = 'video'
            result.md5 = md5Value
            result.code = '0'
            resolve({
              result: result,
              options: options,
              mediaObj: mediaObj
            })
            console.log('上传结果的fileId：' + result.fileId)
            console.log('上传结果的视频名称：' + result.videoName)
            console.log('上传结果的视频地址：' + result.videoUrl)
          }
        })
        console.log(videoUploader)
      })
      return uploadPromise
    })
    return md5Promise
  } else {
    console.error('缺少qcVideo引用')
    return Promise.reject(new Error('缺少cos 的引用'))
  }
}



/**
 * 检查文件合法性
 */
QCloudUploader.prototype.checkFile = function (file, mediaObj) {
  var maxSize = transterUnit(this.globalOptions.maxSize[mediaObj.type])
  if (file.size <= maxSize || maxSize == 0) {
    return {
      code: '0',
      msg: ''
    }
  } else {
    return {
      code: '1',
      msg: ERROR_MAP['1'].replace('{0}', this.globalOptions.maxSize[mediaObj.type])
    }
  }
}
/**
 * 设置url
 */
function setUrl (mediaObj) {
  return mediaObj.remotePath || mediaObj.localUrl || mediaObj.defaultUrl
}
/**
 * 不同资源使用额bucket 不一样
 * @param {*} options 
 */
function setBucket (options) {
  if(options.resourceType == 'panoPiece') {
    return {
      bucket: myBucket, 
      appid: '10002033',
      region: 'sh',
    }
  } else {
    return cosConfig;
  }
}
function setGetSignFn (GOptions,options) {
  if(options.resourceType == 'panoPiece') {
    return GOptions.$api.getSignature;
  } else {
    return GOptions.$api.uploadSign;
  }
}

/**
 * 上传后成功的回调函数
 */
function uploadedSuccess (response) {
  var result = response.result
  var options = response.options
  var mediaObj = response.mediaObj

  revokeObjUrl(mediaObj)
  if (result.code == '0') {
    mediaObj.md5 = result.md5
    mediaObj.msg = ''
    if (mediaObj.type == 'video') {
      mediaObj.url = result.videoUrl
      mediaObj.name = result.videoName
      mediaObj.fileId = result.fileId
    } else if (mediaObj.type == 'image') {
      mediaObj.url = result.data.access_url.replace('http://luna-10002033.file.myqcloud.com', 'https://cimg.vizen.cn')
    } else {
      mediaObj.url = result.data.access_url.replace('http://luna-10002033.file.myqcloud.com', 'http://view.luna.vizen.cn')
    }
    options.success(mediaObj)
    if (options.resourceType == 'panoPiece') {
      console.log('全景相关图片不用保存到素材库')
      return false;
    }
    var postData = {
      type: mediaObj.type,
      md5: mediaObj.md5,
      access_url: mediaObj.url,
      fileId: mediaObj.fileId || ''
    }
    this.globalOptions.$api.saveMd5AndUrl(stringfyPostData(postData)).then(function (response) {
      var res = response.data
      if (res.code == '0') {
        console.log('url 保存成功')
      } else {
        console.error(res.msg)
      }
    }).catch(function (error) {
      console.error(error)
    })
  } else if (result.code == '409') {
    mediaObj.url = result.data.access_url
    options.success(mediaObj)
  } else {
    mediaObj.url = ''
    mediaObj.md5 = result.md5
    mediaObj.code = '2'
    mediaObj.msg = ERROR_MAP[mediaObj.code]
    options.error(mediaObj)
  }
}

/**
 * 获取md5 值
 * @param {any} file
 * @returns
 */
function getFileMD5 (mediaObj, file, options, GOptions) {
  var promise = new Promise(function (resolve, reject) {
    // if (mediaObj.md5) {
    //   resolve(mediaObj.md5)
    //   return true
    // }
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      // file = options.files[index],
    var chunkSize = GOptions.chunkSize // Read in chunks of 2MB
    var chunks = Math.ceil(file.size / chunkSize)
    var currentChunk = 0
    var spark = new SparkMD5.ArrayBuffer()
    var fileReader = new FileReader()

    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of', chunks)
      spark.append(e.target.result) // Append array buffer
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        resolve(spark.end())
      }
    }
    fileReader.onerror = function (error) {
      console.error(error)
      reject(new MyError('4', ERROR_MAP['4'].replace('{0}', file.name)))
    }
    function loadNext () {
      var start = currentChunk * chunkSize
      var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext()
  })
  return promise
}
/**
 * 获取文件类型
 * @param {any} file
 * @returns
 */
function getFileType (file) {
  if (file.type.indexOf('image') >= 0) {
    return 'image'
  } else if (file.type.indexOf('video') >= 0) {
    return 'video'
  } else if (file.type.indexOf('audio') >= 0) {
    return 'audio'
  } else {
    if (/.apk/.test(file.name)) {
      return 'download'
    } else {
      return 'attach'
    }
  }
}
// window.QCloudUploader = QCloudUploader
/**
 * 转换文件大小的单位
 * @param {any} size
 * @returns
 */
function transterUnit (size) {
  if (size == 0) {
    return 0
  } else if (size) {
    var matchArr = size.match(/(\d+)(\D)/)
    if (matchArr[1] && matchArr[2]) {
      var unit = matchArr[2].toLowerCase()
      switch (unit) {
        case 'k':
          return matchArr[1] * 1024
        case 'm':
          return matchArr[1] * 1024 * 1024
      }
    } else {
      if (/\d/.test(size)) {
        return size
      } else {
        return ''
      }
    }
  } else {
    return ''
  }
}

/**
 * 生成本地url
 */
function createObjUrl (file) {
  try {
    var url = URL.createObjectURL(file)
    return url
  } catch (error) {
    console.error('生成本地url失败')
    return ''
  }
}
/**
 * @param {any} url
 */
function revokeObjUrl (mediaObj) {
  try {
    if (mediaObj.localUrl) {
      URL.revokeObjectURL(mediaObj.localUrl)
      mediaObj.localUrl = ''
    }
  } catch (error) {
    console.error('消除本地url失败')
    return
  }
}
function extend (deep, target, options) {
  for (var name in options) {
    var copy = options[name]
    if (deep && copy instanceof Array) {
      target[name] = extend(deep, [], copy)
    } else if (deep && Object.prototype.toString.call(copy) == '[object Function]') {
      target[name] = options[name]
    } else if (deep && copy instanceof Object) {
      target[name] = extend(deep, {}, copy)
    } else {
      target[name] = options[name]
    }
  }
  return target
}
/**
 * 转换post数据
 * @param {any} obj
 */
function stringfyPostData (obj) {
  var arr = []
  for (var key in obj) {
    arr.push(key + '=' + obj[key])
  }
  return arr.join('&')
}
/**
 * 自定义错误
 * @param {any} code
 * @param {any} message
 */
function MyError (code, message) {
  this.code = code
  this.name = 'UploadError'
  this.message = message || 'Default Message'
  // this.stack = (new Error()).stack
}
MyError.prototype = Object.create(Error.prototype)
MyError.prototype.constructor = MyError

export default QCloudUploader;
/*eslint-enable */
