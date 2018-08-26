import Promise from '../utils/npm/bluebird.min';

const methodNamesToPromisify = [

  // 'authorize',
  // 'getSetting',
  // 'uploadFile',
  // 'downloadFile',
  // 'connectSocket',
  // 'sendSocketMessage',
  // 'chooseImage',
  // 'previewImage',
  // 'getImageInfo',
  // 'startRecord',
  // 'playVoice',
  // 'getBackgroundAudioPlayerState',
  // 'playBackgroundAudio',
  // 'pauseBackgroundAudio',
  // 'seekBackgroundAudio',
  // 'stopBackgroundAudio',
  // 'chooseVideo',
  // 'saveFile',
  // 'getSavedFileList',
  // 'getSavedFileInfo',
  // 'removeSavedFile',
  // 'openDocument',
  'setStorage',
  'getStorage',
  'getStorageInfo',
  'removeStorage',
  // 'getLocation',
  // 'chooseLocation',
  // 'openLocation',
  // 'getSystemInfo',
  // 'getNetworkType',
  // 'startAccelerometer',
  // 'stopAccelerometer',
  // 'startCompass',
  // 'stopCompass',
  // 'makePhoneCall',
  // 'scanCode',
  // 'setClipboardData',
  // 'getClipboardData',
  // 'openBluetoothAdapter',
  // 'closeBluetoothAdapter',
  // 'getBluetoothAdapterState',
  // 'startBluetoothDevicesDiscovery',
  // 'stopBluetoothDevicesDiscovery',
  // 'getBluetoothDevices',
  // 'getConnectedBluetoothDevices',
  // 'createBLEConnection',
  // 'closeBLEConnection',
  // 'getBLEDeviceServices',
  // 'getBLEDeviceCharacteristics',
  // 'readBLECharacteristicValue',
  // 'writeBLECharacteristicValue',
  // 'notifyBLECharacteristicValueChange',
  // 'showToast',
  // 'showLoading',
  'showModal',
  // 'showActionSheet',
  // 'setNavigationBarTitle',
  // 'navigateTo',
  // 'redirectTo',
  'switchTab',
  // 'reLaunch',
  // 'canvasToTempFilePath',
  // 'getExtConfig',
  // 'login',
  // 'checkSession',
  // 'getUserInfo',
  'requestPayment',
  // 'showShareMenu',
  // 'hideShareMenu',
  // 'chooseAddress',
  // 'addCard',
  // 'openCard',
  // 'openSetting',
  // 'getWeRunData',
  // 'getShareInfo'
]

function wxPromisifier(originalMethod) {
  // return a function, 因为要使用arguments以及this的scope为返回的方法，此处不要使用 =>
  return function promisified() {
    let args = [].slice.call(arguments);
    // which returns a promise
    return new Promise((resolve, reject) => {
      let argObject = args[0] || {}
      argObject.success = resolve
      argObject.fail = reject
      originalMethod.call(this, argObject);
    });
  };
}

export function promisifyWXAsyncAPI() {
  methodNamesToPromisify.forEach(method => {
    wx[method + 'Async'] = wxPromisifier(wx[method])
  })

  wx.timeoutAsync = (seconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, seconds * 1000)
    })
  }

  wx.requestAsync = (obj) => {
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        if (+res.statusCode >= 200 && +res.statusCode < 400) {
          console.log(obj.url + ' succeed: ' + JSON.stringify(res.data))
          return resolve(res.data)
        } else {
          console.log(obj.url + " failed: " + res.statusCode)
          return reject(+res.statusCode)
        }
      }

      obj.fail = reject

      wx.request(obj)
    })
  }

  wx.getPrevPageInstance = () => {
    let pages = getCurrentPages()
    if (pages.length >= 2) {
      return pages[pages.length - 2]
    } else {
      return null
    }
  }

  wx.syncDataToPrevPage = (data) => {
    let prevPage = wx.getPrevPageInstance()

    if (prevPage) {
      prevPage.setData(data)
    } else {
      console.log('#ERROR: syncDataToPrevPage should not be called.')
    }
  }

  wx.navigateBackWithData = (data) => {
    wx.syncDataToPrevPage(data)
    wx.navigateBack()
  }

  wx.navigateBackToRoot = () => {
    let pages = getCurrentPages()
    wx.navigateBack({
      delta: pages.length
    })
  }

}
