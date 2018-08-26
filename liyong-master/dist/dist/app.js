import { createStore, compose, applyMiddleware } from './lib/redux'
import thunk from './lib/redux-thunk'
import { Provider } from './lib/wechat-weapp-redux'
import devtools from './lib/remote-redux-devtools'
import reducers from './store/reducers/index'
import regeneratorRuntime from './lib/regenerator-runtime'
import promisify from './lib/promisify'
import { fetchLocation } from './store/actions/global'
import { jsGlobal } from './api/homePage'
import Global from './api/global'


const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  devtools({
    hostname: 'localhost',
    realtime: true,
    port: 5678,
    secure: false
  })
))

App(
  Provider(store)({
    globalData: {
      province: {},
      oldProvince: {},
      trigger: true
    },

    async onLaunch (options) {
      console.log('onLaunch')
      wx.setEnableDebug({
        enableDebug: true
      })

      // try {
      //   const { latitude: lat, longitude: lng} = await promisify(wx.getLocation)({ type: 'wgs84'})
      //   const { province, city } = await Global.getLocation({ lat, lng })
      //   const oldProvince = await jsGlobal({ ver: '2.0.0' })
      //   this.globalData.province = { province, city }
      //   this.globalData.oldProvince = oldProvince.province
      //   const res = {
      //     province:{
      //       id:oldProvince.province.provinceId,
      //       name:oldProvince.province.provinceName
      //     },
      //     city:{
      //       id:oldProvince.city.cityId,
      //       name:oldProvince.city.cityName,
      //     },
      //   }
      //   store.dispatch(fetchLocation({ province:res.province, city:res.city }))
      //   // console.log("看看")
      //   // if(await confirm('检测到您地理位置发生改变，是否切换?')) {
      //   //   console.log(province)
      //   // } else {
      //   //   console.log(oldProvince.province)
      //   //   store.dispatch(fetchLocation({ lat, lng }))
      //   // }
      // } catch (err) {
      //   alertError(err)
      // }

      const { path, query, scene, shareTicket = null, reLaunch = null } = options

      if (!scene) return

      store.dispatch({
        type: 'WEAPP_ENTRY_OPTIONS',
        payload: { path: `/${path}`, query, scene, shareTicket, reLaunch }
      })

      if (path === 'pages/index/index') return
      if (scene != 1044 || path !== 'pages/index/index') {
        wx.reLaunch({ url: '/pages/index/index' })
      }
    },

    onShow (options) {
      console.log(options)
      const { query, scene } = options
      if ((query && query.from == 'shareApp')
        || (scene && scene != 1044)) {
        console.log('onShow')
        this.onLaunch(options)
      }
    },

    onHide () {
      console.log('hide')
    },

    onPageNotFound (options) {
      const { path, query, isEntryPage } = options
    },

    onError (error) {
      console.log(`App:onError => ${error}`)
    }
  })
)
