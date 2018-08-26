// const app = getApp()
// const regeneratorRuntime = require('../../../lib/regenerator-runtime')
// const { allCityList } = require('../../../api')
// const { navigateErrorPage, alertError, alert, defaultShareAppMessage, handlerAuthFail } = require('../../../utils')



// Page({
//   data:{
//     isShow:false,
//     inputVal: "",
//     hotCity: '',

//   },
//   async onLoad () {
//     try{
//       await allCityList()
//     } catch(err) {
//       alertError(err)
//     } finally {
//       wx.hideLoading()
//     }
//   },
//   searchCity (event) {
//     this.setData({
//       isShow:true,
//       inputVal:event.detail.value
//     })
//   },
//   delCity () {
//     console.log("删除内容")
//     this.setData({
//       inputVal: ''
//     })
//   }
// })


// const app = getApp()
// const regeneratorRuntime = require('../../../lib/regenerator-runtime')
// const { getGroupRankList, findList } = require('../../../api')
// const { navigateErrorPage, alertError, alert, defaultShareAppMessage, handlerAuthFail } = require('../../../utils')

// Page({
//   data:{
//     view: '',
//     tab:'',  // 'rank' or 'weekSale' or 'daySale'
//     // 签到分页
//     rankPagination: {
//       page: 1,
//       limit: 10,
//       completed: false
//     },
//     rankData: null,
//     id: null,
//     hotListType:'',
//     hotList: 0,

//     arrow: false
//   },
//   async onLoad (options) {
//     const { tab } = options
//     try {
//       if (tab === 'rank') {
//         console.log("签到榜")
//       }
//       if(tab === 'weekSale' || tab === 'daySale') {
//         const { hotList } = await findList({ id: 1, hotListType: tab })
//         this.setData({ hotList, tab })
//       }
//     } catch (err) {
//       alertError(err)
//     } finally {
//       wx.hideLoading()
//     }
//   },
//   async changeTab (events) {
//     const { view, id, rankPagination, rankData } = this.data
//     const { tab } = events.target.dataset
//     this.setData({
//       tab,
//       arrow: true
//     })
//     console.log(tab)

//     try{
//       // 签到榜单
//       if(tab === 'rank') {

//       }
//       // 热销榜单
//       if(tab === 'weekSale' || tab === 'daySale') {
//         const { hotList } = await findList({ id: 1, hotListType: tab })
//         this.setData({ hotList, tab })
//       }
//     } catch (err) {
//       alertError(err)
//     } finally {
//       wx.hideLoading()
//     }



//   }
// })


import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { alertError } from '../../../utils'
import { allCityList } from '../../../api/global'
import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { postLocation, getSearchLocation } from '../../../store/actions/global'


const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    location: state.global.location,
    searchLocation:state.global.searchLocation
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  postLocation: ({ locationId, locationName }) => dispatch(postLocation({ locationId, locationName })),
  getSearchLocation: ({ type, locationId }) => dispatch(getSearchLocation({ type, locationId }))
})

const pageConfig = {
  data:{
    isShow:false,
    inputVal: "",
    hotCity: '',
    allCity: '',
    city: '',
    letter: '',
    cityVal: '',
    scrollTopId: '',
    cityArr:[]
  },

  async onShow (options) {
    const { city } = this.data
    try{
      const res = await allCityList()
      this.setData({
        allCity: res.all_city,
        hotCity: res.hot_city
      })
    } catch(err) {
      alertError(err)
    }
  },
  // 选择城市
  async selCity (event) {
    try{
      if (event.currentTarget.dataset.city == "重庆市" || event.currentTarget.dataset.city == "天津市" || event.currentTarget.dataset.city == "上海市" || event.currentTarget.dataset.city == "北京市") {
        await this.getSearchLocation({ type:1, locationId:event.currentTarget.id })
      } else {
        await this.getSearchLocation({ type:2, locationId:event.currentTarget.id })
      }
      await this.postLocation({ locationId:event.currentTarget.id, locationName:event.currentTarget.dataset.city })
      wx.navigateTo({
        url: `/pages/explore/selection/selection`
      })
    } catch(err) {
      alertError(err)
    } finally {
      wx.hideLoading()
    }
  },
  hotCity (event) {
    this.setData({ city: event.currentTarget.dataset.city })
    const { city } = this.data
    wx.navigateTo({
      url: `/pages/explore/selection/selection?city=${city}`
    })
  },
  // 置顶城市
  letterBig (event) {
    const showLetter = event.currentTarget.dataset.letter
    console.log(showLetter)
    this.setData({
      scrollTopId: showLetter
    })
  },
  // 搜索城市(暂不支持简拼)
  searchCity (event) {
    if(this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      const { allCity } = this.data
      const cityArr = []
      for(const i in allCity) {
        for(const j in allCity[i]) {
          if(allCity[i][j].indexOf(event.detail.value) !== -1) {
            cityArr.push({ "cityId":j, "cityName":allCity[i][j] })
          }
        }
      }
      this.setData({
        isShow:true,
        inputVal:event.detail.value,
        cityArr:cityArr
      })
    }, 900)
  },
  // 选择搜索到的城市
  async inputCity (event) {
    try{
      console.log(event)
      await this.postLocation({ locationId:event.currentTarget.dataset.cityid, locationName:event.currentTarget.dataset.cityname })
      wx.navigateBack({
        url: `/pages/explore/selection/selection`
      })
    } catch(err) {
      alertError(err)
    }

  },
  // 删除城市
  delCity () {
    console.log("删除内容")
    this.setData({
      inputVal: ''
    })
  },
  reload () {
    this.clearError()
    this.onShow(this.options)
  },
  onUnload () {
    this.clearError()
  }
}

Page(
  connect(
    mapStateToData,
    mapDispatchToPage
  )(pageConfig)
)
