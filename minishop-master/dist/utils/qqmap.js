import QQMap from '../modules/qqmap/index.js'
var instance
export function getQQMap () {
  if (!instance) {
    instance = new QQMap({
      key: 'YKYBZ-HZEWP-HHDD6-VANQR-2BCKE-GCBCK'
    })
  }

  return instance
}
