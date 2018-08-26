import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import { WATER_BILL_TYPE } from '../../js/constants'
var app = getApp()

Page({
  data: {
    userInfo: {},
    travelVoList: [],
    videoHeight: 300,
    masking: true,
    minePhone: '',
    code_type: 'travel',
    moneyIncome : 0.00,
    moneyCard : 0.00,
    aliPay : '',
    waterBill : [],
    WATER_BILL_TYPE: WATER_BILL_TYPE
  },
  onLoad(){
    const { token, phone } = app.globalData.entities.loginInfo
    if(phone) {
      this.initData()
    }else{
      setIntervalData(this.initData)
    }
  },
  setIntervalData: function(callback){
    let getToken = setInterval(() => {
      const { token, openId } = app.globalData.entities.loginInfo
      if(openId){
        callback()
        clearInterval(getToken)
      }
    }, 500)
  },
  initData(){
    let self = this
    const { deviceInfo } = app.globalData.entities
    wx.getUserInfo({
      withCredentials: true,
      success (res) {
        self.setData({
          userInfo: res.userInfo,
          videoHeight: deviceInfo.windowHeight
        })
      }
    })
    this.getUserInfo()
    this.getMineTravelList()
  },
  switch_code: function(e){
      const { currentTarget: { dataset: { id } } } = e
      if(id === 'wallet'){
        this.getMoneyDetails()
      }
      this.setData({
        code_type: id
      })
  },
  getUserInfo(){
    const { token, phone } = app.globalData.entities.loginInfo
    driver_api.getUserInfo({
      data: {
        token: token,
        otherPhone: phone
      }
    }).then(json => {
      const { personalInfo } = json.data
      this.setData({
        personalInfo: personalInfo,
        minePhone: phone
      })
    })
  },
  getMineTravelList(){
    const { token, phone } = app.globalData.entities.loginInfo
    driver_api.getMineTravelList({
      data: {
        token: token,
        feedPhone: phone,
        pageNo: 1
      }
    }).then(json => {
      const { travelVoList } = json.data.eachFeedList
      travelVoList && travelVoList.map(json => {
				if(json.surplusSeats != 0){
          let seat_true = util.seats_true(json.seats - json.surplusSeats)
          let seat_false = util.seats_false(json.surplusSeats)
          json.seat_true = seat_true
          json.seat_false = seat_false
        }else{
          let seat_true = util.seats_true(json.seats)
      	  json.seat_true = seat_true
        }
			})
      this.setData({
        travelVoList: travelVoList
      })
    })
  },
  deleteTravel: function(e){
    const { token } = app.globalData.entities.loginInfo
    let self = this
    const { currentTarget: { dataset: { id } } } = e
    wx.showModal({
      title: '提示',
      content: '确定取消行程吗',
      success: function(res) {
        if (res.confirm) {
          driver_api.deleteTravel({
            data: {
              token: token,
              travelId: id
            }
          }).then(json => {
            if(json.data.status == 200){
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              })
              self.getMineTravelList()
            }
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  beforePassengerDelete: function(e){
    const { token } = app.globalData.entities.loginInfo
    let self = this
    const { currentTarget: { dataset: { id } } } = e
    wx.showModal({
      title: '提示',
      content: '确定取消行程吗',
      success: function(res) {
        if (res.confirm) {
          passenger_api.beforePassengerDelete({
            data: {
              token: token,
              passengerTravelId: id
            }
          }).then(json => {
            if(json.data.status == 110){
              wx.showToast({
                title: '取消成功',
                icon: 'success',
                duration: 2000
              })
              self.getMineTravelList()
            }
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  shareClick:function(e){
    const { currentTarget: { dataset: { id } } } = e
    const { travelVoList } = this.data
    let order = travelVoList.find(json => json.travelId == id)
    this.setData({
      travel_order: order,
      masking: false
    })
  },
  closeShare: function(){
    this.setData({
      masking: true
    })
  },
  onShareAppMessage() {
		const { travel_order } = this.data
    const { token } = app.globalData.entities.loginInfo
    let self = this
    return {
      title: travel_order.type == 1 ? '人找车 车主快来抢单吧~' : '车找人 乘客快来订座吧~',
      path: `/src/shareTravelDetails/shareTravelDetails?travelId=${travel_order.travelId}&phone=${travel_order.travelPhone}&travelType=${travel_order.type}`,
      success(res){
	    	driver_api.shareTravel({
					data: {
						token: token,
						travelId: travel_order.travelId,
						travelType: Number(travel_order.type)
					}
				}).then(json => {
					if(json.data.status == 200){
						wx.showToast({
						  title: '分享成功',
						  icon: 'success',
						  duration: 2000
						})
            self.setData({
              masking: true
            })
					}
				})
      }
    }
  },
  clearLogin: function(){
    wx.showModal({
      title: '提示',
      content: '宋丹，你确定要退出嘛？',
      success: function(res) {
        if(res.confirm) {
          const { loginInfo } = app.globalData.entities
          let clear_loginInfo = Object.assign({}, {openId: loginInfo.openId})
          util.setEntities({
            key: 'loginInfo',
            value: clear_loginInfo
          })
          wx.navigateTo({
            url: `/src/index`
          })
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getMoneyDetails(){
    const { token } = app.globalData.entities.loginInfo
    driver_api.getMoneyDetails({
      data:{
        token: token
      }
    }).then(json => {
      let data = json.data
      let moneyIncome = data.moneyIncome
      let moneyCard = data.moneyCard
      let aliPay = data.aliPay
      let waterBill = data.waterBill
      this.setData({
        moneyIncome : data.moneyIncome,
        moneyCard : data.moneyCard,
        aliPay : data.aliPay,
        waterBill : data.waterBill
      })
    })
  },
  withdraw: function(){
    util.gotoApp()
  }
})
