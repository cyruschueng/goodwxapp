import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'

var app = getApp()

Page({
  data: {
    driverInfo: {}
  },
  onLoad(options){
    wx.showLoading({
      title: '加载中',
    })
    this.auditInfo(options.id)
  },
  auditInfo(id){
    driver_api.auditInfo({
      data: {
        phone: id
      }
    }).then(json => {
      let driverInfo = json.data.driver
      this.setData({
        driverInfo: driverInfo
      })
      wx.hideLoading()
    })
  },
  // auditOwner
  throughAudit: function(e){
    const { currentTarget: { dataset: { id } } } = e
    driver_api.auditOwner({
      data: {
        phone: id,
        status: 4
      }
    }).then(json => {
      if(json.data.status == 200){
        wx.showToast({
          title: '已通过',
          icon: 'success',
          duration: 2000
        })
        this.auditInfo(id)
      }
    })
  },
  refusehAudit: function(e){
    const { currentTarget: { dataset: { id } } } = e
    driver_api.auditOwner({
      data: {
        phone: id,
        status: 2
      }
    }).then(json => {
      if(json.data.status == 200){
        wx.showToast({
          title: '已拒绝',
          icon: 'success',
          duration: 2000
        })
        this.auditInfo(id)
      }
    })
  }
})
