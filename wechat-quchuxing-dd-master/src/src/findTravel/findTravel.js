import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import { WATER_BILL_TYPE } from '../../js/constants'
var app = getApp()

Page({
  data: {
    myGroup: [],
    isRecommend: true,
    hotGroups: [],
    page: 1
  },
  onLoad(){
    wx.showLoading({
      title: '加载中',
    })
    const { token, phone } = app.globalData.entities.loginInfo
    phone ? this.initData(phone,token) : this.setIntervalData(this.initData)
  },
  setIntervalData: function(callback){
    let getToken = setInterval(() => {
      const { token, phone } = app.globalData.entities.loginInfo
      if(phone){
        callback(phone, token)
        clearInterval(getToken)
      }
    }, 500)
  },
  initData(phone,token){
    this.getLocationCity(token)
  },
  getLocationCity: function(token){
    let page = this.data.page
    util.loactionAddress().then(res => {
      this.myJoinedGroups(token, res.initial_city)
      this.hotGroups(token, res.initial_city, page)
      this.setData({
        city: res.initial_city
      })
    })
  },
  myJoinedGroups: function(token, city){
    let parmas = Object.assign({}, {token: token}, {currentCity: city}, {pageNo: 1})
    driver_api.myJoinedGroups({data: parmas}).then(json => {
      let data = json.data.myJoinedGroups
      this.setData({
        isRecommend: data.isRecommend,
        myGroup: data.groupsList
      })
    })
  },
  hotGroups: function(token, city, page){
    let parmas = Object.assign({}, {token: token}, {currentCity: city}, {pageNo: page})
    const { hotGroups } = this.data
    driver_api.hotGroups({data: parmas}).then(json => {
      let data = json.data.hotGroups
      data && data.map(json => {
        hotGroups.push(json)
      })
      this.setData({
        hotGroups: hotGroups,
        bottom_line: data.length != 0 ? true : false
      })
    }).then(() => {
      wx.hideLoading()
    })
  },
  joinGroup: function(e){
    const { currentTarget: { dataset: { id } } } = e
    const { token, phone } = app.globalData.entities.loginInfo
    const { city } = this.data
    let parmas = Object.assign({}, {token: token}, {phones: phone}, { groupId: [id] })
    driver_api.postJoinGroup({data: parmas}).then(json => {
      if(json.data.status == 200){
        wx.showToast({
          title: '已加入',
          icon: 'success',
          duration: 2000
        })
        this.myJoinedGroups(token, city)
        this.hotGroups(token, city)
      }
    })
  },
  onReachBottom: function(){
		const { token } = app.globalData.entities.loginInfo
    const { city, page, bottom_line } = this.data
    if(bottom_line){
      let new_page = page + 1
      this.setData({
        page: new_page
      })
      this.hotGroups(token, city, new_page)
    }
	},
  gotoRelease: function(){
    wx.navigateTo({
      url: `/src/index`
    })
  },
  gotoSearch: function(){
    wx.navigateTo({
      url: `/src/search/search`
    })
  },
  gotoLineInfo: function(e){
    const { currentTarget: { dataset: { id } } } = e
    wx.navigateTo({
      url: `/src/lineInfo/lineInfo?groupId=${id}`
    })
  }
})
