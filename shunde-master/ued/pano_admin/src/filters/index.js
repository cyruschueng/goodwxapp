export const validate = {
  userName: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/,
  trueName: /^[\u4e00-\u9fa5]{2,10}$/,
  password: /^[a-zA-Z0-9''#@%$&^*!-=+_~`./\\]{8,16}$/,
  msgCode: /^\d{6}$/,
  mobile: /^1[34578]\d{9}$/,
  phone: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
  email: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5a-zA-Z0-9._-]{0,80}[\u4E00-\u9FA5a-zA-Z0-9]{0,1}@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,3}$/,
  idCard: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/,
  check (type, value) {
    if (this[type].test(value)) {
      return true
    }
    return false
  }
}

import Exif from 'exif-js'
export function checkPicture (files, callback) {
  var picExif = {}
  var results = []
  let rules = {
    width: 0,
    height: 0,
    focal: 0,
    model: ''
  }
  if (files.length === 0) {
    callback(false)
  } else {
    var length = files.length
    for (let i = 0; i < files.length; i++) {
      Exif.getData(files[i], function () {
        var tags = Exif.getAllTags(this)
        if (i === 0) {
          rules.model = tags.Model
          rules.focal = parseInt(tags.FocalLength)
          if (tags.Orientation === 1 || tags.Orientation === 3) {
            rules.width = tags.PixelXDimension
            rules.height = tags.PixelYDimension
          }
          if (!picExif.width || !picExif.height) {
            getWidthHeight(files[i], (width, height) => {
              if (tags.Orientation === 6 || tags.Orientation === 8) {
                rules.width = height
                rules.height = width
              } else {
                rules.width = width
                rules.height = height
              }
            })
          }
        }
        picExif.model = tags.Model
        picExif.focal = parseInt(tags.FocalLength)
        if (tags.Orientation === 1 || tags.Orientation === 3) {
          picExif.width = tags.PixelXDimension
          picExif.height = tags.PixelYDimension
        }
        if (!picExif.width || !picExif.height) {
          getWidthHeight(files[i], (width, height) => {
            if (tags.Orientation === 6 || tags.Orientation === 8) {
              picExif.width = height
              picExif.height = width
            } else {
              picExif.width = width
              picExif.height = height
            }
            results.push(picExif)
            if (results.length === length) {
              filesjudge(results)
            }
          })
        } else {
          results.push(picExif)
          if (results.length === length) {
            filesjudge(results)
          }
        }
      })
    }
  }
  function filesjudge (results) {
    // console.log(results)
    /***
      json代表成功
      0 exif不统一
      -1 没exif
    ***/
    if (results.length === 1) {
      if (results[0].model === undefined || isNaN(results[0].focal)) {
        callback(-1)
      } else {
        callback(results[0])
      }
    } else if (results.length > 1 && results[0].width === rules.width && results[0].height === rules.height && results[0].focal === rules.focal) {
      for (let j = 0; j < results.length; j++) {
        if (results[j].model === results[0].model && results[j].width === results[0].width && results[j].height === results[0].height && results[j].focal === results[0].focal) {
          if (j === results.length - 1) {
            callback(results[0])
          }
        } else {
          if (results[0].model === undefined || isNaN(results[0].focal)) {
            callback(-1)
          } else {
            callback(0)
          }
        }
      }
    } else {
      callback(0)
    }
  }
}
export function getFileDataURL (fileData, callback = () => {}) {
  var reader = new FileReader()
  reader.onload = (e) => {
    callback(e.target.result)
  }
  reader.readAsDataURL(fileData)
}
function getWidthHeight (fileData, callback) { // 读取图片宽高
  getFileDataURL(fileData, url => {
    var image = new Image()
    image.onload = function () {
      callback(image.width, image.height)
    }
    image.src = url
  })
}

window.jsSHA = require('../assets/js/jssha')
require('../assets/js/spark-md5.min')

export function fileMd5Factory () { // 返回一个验证生成file Md5 值的方法
  var running = false
  return function (file, callback) {
    if (running) {}
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    var chunkSize = 2097152                        // read in chunks of 2MB
    var chunks = Math.ceil(file.size / chunkSize)
    var currentChunk = 0
    /* eslint-disable no-undef */
    var spark = new SparkMD5.ArrayBuffer()
    /* eslint-enable no-undef */
    var fileReader = new FileReader()
    fileReader.onload = function (e) {
      spark.append(e.target.result)                // append array buffer
      currentChunk += 1
      if (currentChunk < chunks) {
        loadNext()
      } else {
        running = false
        callback(spark.end())
      }
    }
    fileReader.onerror = function () {
      running = false
      console.log('error')
    }
    function loadNext () {
      var start = currentChunk * chunkSize
      var end = start + chunkSize >= file.size ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    running = true
    loadNext()
  }
}

export function fileMd5PromiseFactory () { // 返回一个验证生成file Md5 值的方法 promise对象
  return function (file) {
    var promise = new Promise((resolve, reject) => {
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      var chunkSize = 2097152                        // read in chunks of 2MB
      var chunks = Math.ceil(file.size / chunkSize)
      var currentChunk = 0
      /* eslint-disable no-undef */
      var spark = new SparkMD5.ArrayBuffer()
      /* eslint-enable no-undef */
      var fileReader = new FileReader()
      fileReader.onload = function (e) {
        spark.append(e.target.result)                // append array buffer
        currentChunk += 1
        if (currentChunk < chunks) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }
      fileReader.onerror = function () {
        reject()
      }
      function loadNext () {
        var start = currentChunk * chunkSize
        var end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      loadNext()
    })
    return promise
  }
}

/**
 * 获取图片exif信息 参考上面的方法
 * @param {*} file
 */
export function getExifInfo (file) {
  var picExif = {}
  const promise = new Promise((resolve, reject) => {
    if (!file) {
      reject(false)
    } else {
      Exif.getData(file, function () {
        var allMetaData = Exif.getAllTags(this)
        picExif.model = allMetaData.Model ? decodeURI(encodeURI(allMetaData.Model).replace(/%00/g, '')) : ''
        picExif.focal = allMetaData.FocalLength ? parseInt(Math.round(allMetaData.FocalLength.valueOf())) : ''
        picExif.iso = allMetaData.ISOSpeedRatings || ''
        picExif.ColorSpace = allMetaData.ColorSpace || ''
        picExif.ExposureTime = allMetaData.ExposureTime ? allMetaData.ExposureTime.valueOf() : ''
        picExif.FNumber = allMetaData.FNumber ? allMetaData.FNumber.valueOf() : ''
        if (allMetaData.Orientation === 1 || allMetaData.Orientation === 3) {
          picExif.width = allMetaData.PixelXDimension
          picExif.height = allMetaData.PixelYDimension
        }
        if (!picExif.width || !picExif.height) {
          getWidthHeight(file, (width, height) => {
            if (allMetaData.Orientation === 6 || allMetaData.Orientation === 8) {
              picExif.width = height
              picExif.height = width
            } else {
              picExif.width = width
              picExif.height = height
            }
            resolve(picExif)
          })
        } else {
          resolve(picExif)
        }
      })
    }
  })
  return promise
}

var last
export function debounce (idle, action) {
  return function () {
    clearTimeout(last)
    last = setTimeout(function () {
      action()
    }, idle)
  }
}
