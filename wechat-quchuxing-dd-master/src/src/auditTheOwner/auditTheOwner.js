import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'

var app = getApp()

Page({
  data:{
    driverList: [],
    pageNo: 1
  },
  onLoad(){
    wx.showLoading({
      title: '加载中',
    })
    this.auditOwnerList(1)
  },
  auditOwnerList(page){
    const { driverList } = this.data
    driver_api.auditOwnerList({
      data: {
        pageNo: page
      }
    }).then(json => {
      json.data.driver.map(json => {
        driverList.push(json)
      })
      this.setData({
        driverList: driverList,
        pageNo: page
      })
    }).then(() => {
      // wx.hideLoading()
    })
  },
  onReachBottom: function(){
    const { pageNo } = this.data
		let page = pageNo + 1
    this.auditOwnerList(page)
	},
  gotoInfo: function(e){
    const { currentTarget: { dataset: { id } } } = e
    wx.navigateTo({
      url: `/src/auditTheOwner/auditInfo?id=${id}`
    })
    // this.setData({
    //   driverList: []
    // })
  }
})
