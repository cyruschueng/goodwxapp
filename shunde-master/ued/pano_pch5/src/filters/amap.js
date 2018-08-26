/**
 * 初始化地图脚本
 * @returns {*}
 */
export default {
  AMap: null,
  AMapUI: null,
  key: 'a9cb25d44dba7d95d54701188b994562',
  // plugins: 'AMap.Geocoder',
  createScript (options) {
    let $script = document.createElement('script')
    $script.type = 'text/javascript'
    $script.async = true
    $script.defer = true
    let src = `//webapi.amap.com/maps?v=1.3&key=${this.key}&callback=_init`
    if (options.plugins) {
      src += `&plugin=${options.plugins}`
    }
    $script.src = src
    return $script
    // //cache.amap.com/lbs/static/addToolbar.js
    // const $scriptToolbar = document.createElement('script')
    // $scriptToolbar.src = '//cache.amap.com/lbs/static/addToolbar.js'
    // global.document.body.appendChild($scriptToolbar)
  },
  createMapUi (options) {
    let $script = document.createElement('script')
    $script.type = 'text/javascript'
    $script.async = true
    $script.defer = true
    let src = `//webapi.amap.com/ui/1.0/main-async.js`
    $script.src = src
    return $script
  },
  loadScript (options) {
    if (global.AMap) {
      this.AMap = global.AMap
      this.AMapUI = global.AMapUI
      return Promise.resolve()
    }

    let $script = this.createScript(options)
    // let $mapUi = this.createMapUi(options)
    let _scriptLoadingPromise = new Promise((resolve, reject) => {
      global._init = () => {
        this.AMap = global.AMap
        this.AMapUI = global.AMapUI
        global.document.body.removeChild($script)
        // global.document.body.removeChild($mapUi)
        global._init = null
        return resolve()
      }
      $script.onerror = error => reject(error)
      // $mapUi.onerror = error => reject(error)
    })
    global.document.body.appendChild($script)
    // global.document.body.appendChild($mapUi)
    return _scriptLoadingPromise
  },
  autoComplete (options, keyword, callback) {
    this.AMap.service(['AMap.Autocomplete'], () => {
      var auto = new this.AMap.Autocomplete(options)
      auto.search(keyword, (status, result) => {
        callback(status, result)
      })
    })
  },
  // loadMapUI (callback) {
  //   console.log(global.AMapUI)
  //   global.AMapUI.load(['lib/$'], function ($) {
  //     global.AMapUI.setDomLibrary($)
  //  // $ 即为UI组件库最终使用的DomLibrary
  //   })
  //   global.AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
  //     var zoomCtrl1 = new BasicControl.Zoom({
  //       position: 'br'
  //     })
  //     callback(zoomCtrl1)
  //   })
  // },
  searchBox (searchItem, callback) {
    this.AMap.service(['AMap.PlaceSearch'], () => {
      // 构造地点查询类
      let placeSearch = new this.AMap.PlaceSearch({
        pageSize: searchItem.pageSize || 7,
        type: '',
        pageIndex: searchItem.pageIndex || 1,
        city: searchItem.city
      })
      placeSearch.search(searchItem.address, (status, result) => {
        callback(status, result)
      })
    })
  },
  regeocoder (lnglatXY, callback) {  // 逆地理编码
    this.AMap.service(['AMap.Geocoder'], () => {
      var geocoder = new this.AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getAddress(lnglatXY, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          callback(result.regeocode)
        } else {
          callback()
        }
      })
    })
  },
  setCenter (map, center) {
    map.setCenter(center)
  },
  setCity (map, city) {
    map.setCity(city)
  },
  setZoom (map, zoom) {
    map.setZoom(zoom)
  },
  setMarker (options) {
    let marker = new this.AMap.Marker(options)
    return marker
  },
  clearMarker (marker) {
    marker.setMap(null)
  },
  lngLat (lng, lat) {
    let lnglat = new this.AMap.LngLat(lng, lat)
    return lnglat
  }
}
