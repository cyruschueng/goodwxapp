import config from '../config/index.js'
import Axe from '../modules/axe/index.js'
import { getSid } from '../apis/index'
import store from '../store/index'
import {
  error,
  getCurrentPage
} from '../utils/index.js'
const appid = config.appid
const systemInfo = config.systemInfo
const siteNo = 'T2'

// 1:click、2:enterPage、3:leavePage、4:PageLoad、5:pageUnload、6:pullDownRefresh、7:launch、8:background、9:foreground、10:share、11:switchTab
const eventTypeMap = {
  tap: 1,
  pageShow: 2,
  pageHide: 3,
  pageLoad: 4,
  pageUnload: 5,
  pageRefresh: 6,
  launch: 7,
  background: 8,
  foreground: 9,
  share: 10,
  switchTab: 11
}
function getData ({ pageNo, areaNo, positionNo, eventType = 1, data }) {
  const state = store.getState()
  const curPage = getCurrentPage()
  const psas = [siteNo]
  if (pageNo) {
    psas.push(pageNo)
    if (areaNo) {
      psas.push(areaNo)
      if (positionNo) {
        psas.push(positionNo)
      }
    }
  }
  return {
    // 第三方小程序id
    appId: appid,
    // 网络类型
    userNetworkType: state.networkType,
    // 设备信息
    userDeviceInfo: systemInfo,
    // 会话ID
    sessionId: state.sid,
    // 访客电话
    phoneNumber: '',
    userLocation: {
      latitude: '',
      longitude: ''
    },
    // 上报信息
    uploadEventInfo: {
      pageUrl: curPage && curPage.route,
      eventType,
      occurTime: Date.now(),
      psa: psas.join('.')
    },
    customProperties: {
      data
    }
  }
}

Axe.mixin({
  onReportPSA (e) {
    const data = e.target.dataset
    const pageNo = e.currentTarget.dataset.psa
    const curPage = getCurrentPage().route
    if (pageNo == null) {
      error('[psa][' + curPage + ']没有设置页面PSA编码')
      return
    }
    const psaStr = data.psa
    let areaNo
    let positionNo

    if (!psaStr) {
      return
    }

    const psas = psaStr.split('.')
    if (psas.length === 2) {
      areaNo = psas[0]
      positionNo = psas[1]
    } else {
      return error('[psa][' + curPage + ']设置PSA编码不正确，规则类似 a.b ，在\n', e.target)
    }

    let psaData = {}
    if (data.psaData) {
      try {
        psaData = JSON.parse(data.psaData)
      } catch (e) {
        error('[psa][' + curPage + ']解析psa-data失败，书写格式应该类似这样 data-psa-data=\'{"key":{{item.id}}}\' ')
      }
    }
    reportAnalytics({
      pageNo,
      areaNo,
      eventType: 1,
      data: Object.keys(psaData).map(key => key + '=' + psaData[key]).join(';'),
      positionNo
    })
  }
})

// 通过bus手动触发上报
Axe.$bus.on('psa', (event, psa, data = {}) => {
  const eventType = eventTypeMap[event]
  const curPage = getCurrentPage()
  const route = curPage ? curPage.route : 'app.js'
  if (!eventType) {
    return error('[psa][' + route + ']设置的事件类型不存在，具体事件类型有\n', Object.keys(eventTypeMap))
  }
  let pageNo
  let areaNo
  let positionNo
  const psas = psa && psa.split('.')
  if (psas) {
    pageNo = psas[0]
    areaNo = psas[1]
    positionNo = psas[2]
  } else if (eventType === 'tap') {
    return error('[psa][' + route + ']设置PSA编码不正确，规则类似 a.b.c')
  }

  reportAnalytics({
    pageNo,
    areaNo,
    positionNo,
    eventType,
    data: Object.keys(data).map(key => key + '=' + data[key]).join(';')
  })
})

function reportAnalytics (options) {
  const data = getData(options)
  // 刚进页面sid可能为空
  getSid().then((sid) => {
    data.sessionId = sid
    wx.request({
      url: 'https://shoplet.wuage.com/log/liteapplog',
      data,
      method: 'POST'
    })
  })
}
