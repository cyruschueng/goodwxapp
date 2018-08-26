import { connect } from '../../../lib/wechat-weapp-redux'
import { clearError } from '../../../store/actions/loader'
import { fetchLocation, getSearchLocation } from '../../../store/actions/global'
import { alertError } from '../../../utils'
import promisify from '../../../lib/promisify'
import regeneratorRuntime from '../../../lib/regenerator-runtime'
import { confirm } from '../../../utils'
import { specialShow, jsGlobal, promotion } from '../../../api/homePage'

const mapStateToData = (state, options) => {
  return {
    isFetching: state.loader.isFetching,
    displayError: state.loader.displayError,
    id: state.global.group.id,

    location: state.global.location,
    searchLocation: state.global.searchLocation
  }
}

const mapDispatchToPage = dispatch => ({
  clearError: _ => dispatch(clearError()),
  fetchLocation: ({ province, city }) => dispatch(fetchLocation({ province, city })),
  getSearchLocation: ({ type, locationId }) => dispatch(getSearchLocation({ type, locationId }))
})

const pageConfig = {
  data: {
    view: '',
    filePath: '',
    homePageData: [],
    todaysale:[],
    specialTopicId: '',
    globalData:getApp().globalData
  },

  async onLoad (options) {
    // try {
    //   if (getApp().globalData.province.province.id !== getApp().globalData.oldProvince.provinceId || getApp().globalData.trigger == true) {
    //     if(await confirm('检测到您地理位置发生改变，是否切换?')) {
    //       console.log("切换新定位")
    //       await this.fetchLocation({ province:getApp().globalData.province.province, city:getApp().globalData.province.city })
    //       if(getApp().globalData.province.province.name == "北京市" || getApp().globalData.province.province.name == "上海市" || getApp().globalData.province.province.name == "重庆市" || getApp().globalData.province.province.name == "天津市") {
    //         await this.getSearchLocation({ type:1, locationId:getApp().globalData.province.province.id })
    //         getApp().globalData.trigger = false
    //       }else{
    //         await this.getSearchLocation({ type:2, locationId:getApp().globalData.province.province.id })
    //         getApp().globalData.trigger = false
    //       }
    //     } else {
    //       console.log("不切换新定位")
    //       getApp().globalData.trigger = false
    //     }
    //   }
    // } catch (err) {
    //   alertError(err)
    // }
    // try {
    //   const {latitude: lat, longitude: lng} = await promisify(wx.getLocation)({ type: 'wgs84'})
    //   this.fetchLocation({ lat, lng })
    // } catch (err) {
    //   alertError(err)
    // }
  },
  async onShow (options) {
    try {
      const { id } = this.data
      const { location } = this.data
      const { nickname, avatar, description, isVipUser, isUpdateSalerInfo, carouselFigureList, specialTopicList } = await specialShow({ id, cityId: 1, provinceId: 41 })
      this.setData({
        carouselFigureList,
        specialTopicList,
        description,
        indicatorDots: false,
        avatar,
        nickname,
        isVipUser,
        isUpdateSalerInfo,
        todaysale: {},
        startTime: '',
        endTime: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
      })
    } catch (err) {
      alertError(err)
    }

    // 公告
    try {
      // const { id } = this.data
      const { notifications, categories } = await jsGlobal({ ver: '2.0.0' })
      this.setData({
        notifications,
        categories
      })
    } catch (err) {
      alertError(err)
    }
    // 特卖
    try {
      const { id } = this.data
      const res = await promotion({ id, type: '0' })
      this.setData({
        specialGoods : res
      })
      const { specialGoods } = this.data
      specialGoods.map((item, index) => {
        // const { startTime, endTime } = item
        // this.setData({
        //   startTime,
        //   endTime
        // })
        const timer = setInterval(() => {
          // clearInterval(timer)
          const { startTime, endTime } = this.data
          const nowtime = new Date()
          const endtime = new Date(endTime)
          const newtime = endtime - nowtime
          const day = Math.floor(newtime / 1000 / 60 / 60 / 24)
          const hour = Math.floor((newtime / 1000 / 60 / 60) % 24)
          const minute = Math.floor((newtime / 1000 / 60) % 60)
          const second = Math.floor(newtime / 1000 % 60)
          this.setData({
            day,
            hour,
            minute,
            second
          })
        }, 1000)
        const { startTime, endTime } = this.data.todaysale
        this.setData({
          startTime,
          endTime
        })
      })
    } catch (err) {
      alertError(err)
    }
  },
  // 跳转公告链接
  tapContent () {
    console.log("公告详情")
    const { notifications } = this.data
    notifications.map((item, index) => {
      const { content } = item
      console.log(content)
      wx.navigateTo({
        url: `/pages/webView/webView?url=${content}`
      })
    })
  },

  editMessage () {
    const { nickname, avatar } = this.data
    wx.navigateTo({
      url:`/pages/explore/editMess/editMess?nickname=${nickname}&avatar=${avatar}`
    })
  },
  selectCity () {
    const { province} = this.data
    wx.navigateTo({
      url:`/pages/explore/location/location?city=${province}`
    })
  },
  selectThing () {
    console.log("搜索商品")
    wx.navigateTo({
      url:'/pages/explore/search/search'
    })
  },

  // 轮播专题
  swiperTheme (event) {
    const { specialtopicid } = event.target.dataset
    console.log(event.target.dataset)
    this.setData({
      specialTopicId: specialtopicid
    })
    wx.navigateTo({
      url: `/pages/explore/moreGoods/moreGoods?specialTopicId=${this.data.specialTopicId}`
    })
  },

  textSpecial (event) {
    const { specialtopicid } = event.target.dataset
    console.log(event.target.dataset)
    this.setData({
      specialTopicId: specialtopicid
    })
    wx.navigateTo({
      url: `/pages/explore/moreGoods/moreGoods?specialTopicId=${this.data.specialTopicId}`
    })
  },

  gotoMerchShow (event) {
    console.log("商品详情页")
    const { id } = event.currentTarget.dataset
    wx.navigateTo({ url: `/pages/group/merchShow/merchShow?id=${id}` })
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


