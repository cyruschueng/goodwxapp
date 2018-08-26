/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-17 02:34:34
 * @modify date 2018-01-17 02:34:34
 * @desc 微信异步接口Promisify封装
*/

import { Promise } from 'es6-promise'
import requestfix from './requestfix'

// 接口promise化函数
function promisify (options, callback) {
  return new Promise((resolve, reject) => {
    const settings = Object.assign({}, options, {
      success: resolve,
      fail: reject
    })

    callback(settings)
  })
}

class Weios {
  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject
  request (options) {
    return promisify(options, settings => requestfix(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxuploadfileobject
  uploadFile (options) {
    return promisify(options, settings => wx.uploadFile(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-file.html#wxdownloadfileobject
  downloadFile (options) {
    return promisify(options, settings => wx.downloadFile(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxchooseimageobject
  chooseImage (options) {
    return promisify(options, settings => wx.chooseImage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxpreviewimageobject
  previewImage (options) {
    return promisify(options, settings => wx.previewImage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxgetimageinfoobject
  getImageInfo (options) {
    return promisify(options, settings => wx.getImageInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-picture.html#wxsaveimagetophotosalbumobject
  saveImageToPhotosAlbum (options) {
    return promisify(options, settings => wx.saveImageToPhotosAlbum(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-video.html#wxchoosevideoobject
  chooseVideo (options) {
    return promisify(options, settings => wx.chooseVideo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/media-video.html#wxsavevideotophotosalbumobject
  saveVideoToPhotosAlbum (options) {
    return promisify(options, settings => wx.saveVideoToPhotosAlbum(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxsavefileobject
  saveFile (options) {
    return promisify(options, settings => wx.saveFile(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/getFileInfo.html
  getFileInfo (options) {
    return promisify(options, settings => wx.getFileInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxgetsavedfilelistobject
  getSavedFileList () {
    return promisify(null, settings => wx.getSavedFileList(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxgetsavedfileinfoobject
  getSavedFileInfo (options) {
    return promisify(options, settings => wx.getSavedFileInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxremovesavedfileobject
  removeSavedFile (options) {
    return promisify(options, settings => wx.removeSavedFile(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/file.html#wxopendocumentobject
  openDocument (options) {
    return promisify(options, settings => wx.openDocument(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstorageobject
  setStorage (options) {
    return promisify(options, settings => wx.setStorage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstorageobject
  getStorage (options) {
    return promisify(options, settings => wx.getStorage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstorageinfoobject
  getStorageInfo () {
    return promisify(null, settings => wx.getStorageInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxremovestorageobject
  removeStorage (options) {
    return promisify(options, settings => wx.removeStorage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxgetlocationobject
  getLocation (options) {
    return promisify(options, settings => wx.getLocation(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxchooselocationobject
  chooseLocation (options) {
    return promisify(options, settings => wx.chooseLocation(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/location.html#wxopenlocationobject
  openLocation (options) {
    return promisify(options, settings => wx.openLocation(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/systeminfo.html#wxgetsysteminfoobject
  getSystemInfo (options) {
    return promisify(options, settings => wx.getSystemInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html#wxgetnetworktypeobject
  getNetworkType () {
    return promisify(null, settings => wx.getNetworkType(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html
  setScreenBrightness (options) {
    return promisify(options, settings => wx.setScreenBrightness(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html
  getScreenBrightness () {
    return promisify(null, settings => wx.getScreenBrightness(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html
  vibrateLong () {
    return promisify(null, settings => wx.vibrateLong(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/device.html
  vibrateShort () {
    return promisify(null, settings => wx.vibrateShort(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/accelerometer.html#wxstartaccelerometerobject
  startAccelerometer () {
    return promisify(null, settings => wx.startAccelerometer(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/accelerometer.html#wxstopaccelerometerobject
  stopAccelerometer () {
    return promisify(null, settings => wx.stopAccelerometer(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html#wxstartcompassobject
  startCompass () {
    return promisify(null, settings => wx.startCompass(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/compass.html#wxstopcompassobject
  stopCompass () {
    return promisify(null, settings => wx.stopCompass(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/phonecall.html#wxmakephonecallobject
  makePhoneCall (options) {
    return promisify(options, settings => wx.makePhoneCall(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/scancode.html
  scanCode (options) {
    return promisify(options, settings => wx.scanCode(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html#wxsetclipboarddataobject
  setClipboardData (options) {
    return promisify(options, settings => wx.setClipboardData(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/clipboard.html#wxgetclipboarddataobject
  getClipboardData () {
    return promisify(null, settings => wx.getClipboardData(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxopenbluetoothadapterobject
  openBluetoothAdapter () {
    return promisify(null, settings => wx.openBluetoothAdapter(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxclosebluetoothadapterobject
  closeBluetoothAdapter () {
    return promisify(null, settings => wx.closeBluetoothAdapter(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxgetbluetoothadapterstateobject
  getBluetoothAdapterState () {
    return promisify(null, settings => wx.getBluetoothAdapterState(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxstartbluetoothdevicesdiscoveryobject
  startBluetoothDevicesDiscovery (options) {
    return promisify(options, settings => wx.startBluetoothDevicesDiscovery(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxstopbluetoothdevicesdiscoveryobject
  stopBluetoothDevicesDiscovery () {
    return promisify(null, settings => wx.stopBluetoothDevicesDiscovery(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxgetbluetoothdevicesobject
  getBluetoothDevices () {
    return promisify(null, settings => wx.getBluetoothDevices(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxgetconnectedbluetoothdevicesobject
  getConnectedBluetoothDevices (options) {
    return promisify(null, settings => wx.getConnectedBluetoothDevices(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxcreatebleconnectionobject
  createBLEConnection (options) {
    return promisify(options, settings => wx.createBLEConnection(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxclosebleconnectionobject
  closeBLEConnection (options) {
    return promisify(options, settings => wx.closeBLEConnection(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxgetbledeviceservicesobject
  getBLEDeviceServices (options) {
    return promisify(options, settings => wx.getBLEDeviceServices(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxgetbledevicecharacteristicsobject
  getBLEDeviceCharacteristics (options) {
    return promisify(options, settings => wx.getBLEDeviceCharacteristics(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxreadblecharacteristicvalueobject
  readBLECharacteristicValue (options) {
    return promisify(options, settings => wx.readBLECharacteristicValue(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxwriteblecharacteristicvalueobject
  writeBLECharacteristicValue (options) {
    return promisify(options, settings => wx.writeBLECharacteristicValue(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#wxnotifyblecharacteristicvaluechangeobject
  notifyBLECharacteristicValueChange (options) {
    return promisify(options, settings => wx.notifyBLECharacteristicValueChange(settings))
  }

  // 蓝牙错误码列表：https://mp.weixin.qq.com/debug/wxadoc/dev/api/bluetooth.html#%E8%93%9D%E7%89%99%E9%94%99%E8%AF%AF%E7%A0%81errcode%E5%88%97%E8%A1%A8

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxstartbeacondiscoveryobject
  startBeaconDiscovery (options) {
    return promisify(options, settings => wx.startBeaconDiscovery(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxstopbeacondiscoveryobject
  stopBeaconDiscovery () {
    return promisify(null, settings => wx.stopBeaconDiscovery(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/iBeacon.html#wxgetbeaconsobject
  getBeacons () {
    return promisify(null, settings => wx.getBeacons(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/setKeepScreenOn.html
  setKeepScreenOn (options) {
    return promisify(options, settings => wx.setKeepScreenOn(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/phone-contact.html#wxaddphonecontactobject
  addPhoneContent (options) {
    return promisify(options, settings => wx.addPhoneContent(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxgethcestateobject
  getHCEState () {
    return promisify(null, settings => wx.getHCEState(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxstarthceobject
  startHCE (options) {
    return promisify(options, settings => wx.startHCE(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wxstophceobject
  stopHCE () {
    return promisify(null, settings => wx.stopHCE(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/nfc.html#wx.sendhcemessageobject
  sendHCEMessage (options) {
    return promisify(options, settings => wx.sendHCEMessage(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxstartwifiobject
  startWifi () {
    return promisify(null, settings => wx.startWifi(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxstopwifiobject
  stopWifi () {
    return promisify(null, settings => wx.stopWifi(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxconnectwifiobject
  connectWifi (options) {
    return promisify(options, settings => wx.connectWifi(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxgetwifilistobject
  getWifiList () {
    return promisify(null, settings => wx.getWifiList(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxsetwifilistobject
  setWifiList (options) {
    return promisify(options, settings => wx.setWifiList(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/wifi.html#wxgetconnectedwifiobject
  getConnectedWifi () {
    return promisify(null, settings => wx.getConnectedWifi(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowtoastobject
  showToast (options) {
    return promisify(options, settings => wx.showToast(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowloadingobject
  showLoading (options) {
    return promisify(options, settings => wx.showLoading(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowmodalobject
  showModal (options) {
    return promisify(options, settings => wx.showModal(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-react.html#wxshowactionsheetobject
  showActionSheet (options) {
    return promisify(options, settings => wx.showActionSheet(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui.html#wxsetnavigationbartitleobject
  setNavigationBarTtile (options) {
    return promisify(options, settings => wx.setNavigationBarTtile(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/setNavigationBarColor.html
  setNavigationBarColor (options) {
    return promisify(options, settings => wx.setNavigationBarColor(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui.html#wxsettopbartextobject
  setTopBarText (options) {
    return promisify(options, settings => wx.setTopBarText(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxnavigatetoobject
  navigateTo (options) {
    return promisify(options, settings => wx.navigateTo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxredirecttoobject
  redirectTo (options) {
    return promisify(options, settings => wx.redirectTo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxswitchtabobject
  switchTab (options) {
    return promisify(options, settings => wx.switchTab(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxrelaunchobject
  reLaunch (options) {
    return promisify(options, settings => wx.reLaunch(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/pulldown.html#wxstartpulldownrefresh
  startPullDownRefresh () {
    return promisify(null, settings => wx.startPullDownRefresh(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/ext-api.html#wxgetextconfigobject
  getExtConfig () {
    return promisify(null, settings => wx.getExtConfig(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject
  login () {
    return promisify(null, settings => wx.login(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxchecksessionobject
  checkSession () {
    return promisify(null, settings => wx.checkSession(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/authorize.html#wxauthorizeobject
  authorize (options) {
    return promisify(options, settings => wx.authorize(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html#wxgetuserinfoobject
  getUserInfo (options) {
    return promisify(options, settings => wx.getUserInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html
  requestPayment (options) {
    return promisify(options, settings => wx.requestPayment(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxshowsharemenuobject
  showShareMenu (options) {
    return promisify(options, settings => wx.showShareMenu(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxhidesharemenuobject
  hideShareMenu () {
    return promisify(null, settings => wx.hideShareMenu(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxupdatesharemenuobject
  updateShareMenu (options) {
    return promisify(options, settings => wx.updateShareMenu(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxgetshareinfoobject
  getShareInfo (options) {
    return promisify(options, settings => wx.getShareInfo(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/address.html#wxchooseaddressobject
  chooseAddress () {
    return promisify(null, settings => wx.chooseAddress(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxaddcardobject
  addCard (options) {
    return promisify(options, settings => wx.addCard(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/card.html#wxopencardobject
  openCard (options) {
    return promisify(options, settings => wx.openCard(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html#wxopensettingobject
  openSetting () {
    return promisify(null, settings => wx.openSetting(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html#wxgetsettingobject
  getSetting () {
    return promisify(null, settings => wx.getSetting(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/we-run.html#wxgetwerundataobject
  getWeRunData () {
    return promisify(null, settings => wx.getWeRunData(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/navigateToMiniProgram.html
  navigateToMiniProgram (options) {
    return promisify(options, settings => wx.navigateToMiniProgram(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/navigateBackMiniProgram.html
  navigateBackMiniProgram (options) {
    return promisify(options, settings => wx.navigateBackMiniProgram(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/chooseInvoiceTitle.html
  chooseInvoiceTitle () {
    return promisify(null, settings => wx.chooseInvoiceTitle(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSupportSoterAuthentication.html
  checkIsSupportSoterAuthentication () {
    return promisify(null, settings => wx.checkIsSupportSoterAuthentication(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/startSoterAuthentication.html
  startSoterAuthentication (options) {
    return promisify(options, settings => wx.startSoterAuthentication(settings))
  }

  // https://mp.weixin.qq.com/debug/wxadoc/dev/api/checkIsSoterEnrolledInDevice.html
  checkIsSoterEnrolledInDevice (options) {
    return promisify(options, settings => wx.checkIsSoterEnrolledInDevice(settings))
  }
}

export default new Weios()
