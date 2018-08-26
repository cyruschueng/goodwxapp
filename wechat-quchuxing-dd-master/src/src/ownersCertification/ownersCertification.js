import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'

var app = getApp()

Page({
	data: {
		one_img: '',
		two_img: ''
	},
	onLoad(){

	},
	getCarCode: function(e){
		this.setData({
			car_code: e.detail.value
		})
	},
	getCarModel: function(e){
		this.setData({
			car_model: e.detail.value
		})
	},
	getCarColor: function(e){
		this.setData({
			car_color: e.detail.value
		})
	},
	getName: function(e){
		this.setData({
			car_name: e.detail.value
		})
	},
	getDriverLicense: function () {
		let self = this
	    wx.chooseImage({
		  success: function(res) {
		    var tempFilePaths = res.tempFilePaths
		    self.setData({
		    	driver_licence: tempFilePaths,
		    	one_img: tempFilePaths ? tempFilePaths[0] : '',
		    })
		  }
		})
	},
	submitDriverLicense: function(){
		const { one_img } = this.data
		const { token } = app.globalData.entities.loginInfo
    wx.uploadFile({
      url: 'https://v1.driver.quchuxing.com.cn/driver/upload/audit_weapp',
      filePath: one_img,
      name: 'driverLicencePictureMain',
			formData:{
				'token': token
			},
      header: {
      	'content-type': 'multipart/form-data'
      },
			success(res){
			}
    })
	},
	getDrivingLicense: function () {
		let self = this
	    wx.chooseImage({
		  success: function(res) {
		    var tempFilePaths = res.tempFilePaths
		    self.setData({
		    	driving_licence: tempFilePaths,
		    	two_img: tempFilePaths ? tempFilePaths[0] : '',
		    })
		  }
		})
	},
	submitDrivingLicense: function(){
		const { token } = app.globalData.entities.loginInfo
		const { two_img } = this.data
		let self = this
    wx.uploadFile({
      url: 'https://v1.driver.quchuxing.com.cn/driver/upload/audit_weapp',
      filePath: two_img,
      name: 'drivingLicensePictureMain',
			formData:{
				'token': token
			},
      header: {
      	'content-type': 'multipart/form-data'
      },
			success(res){
			}
    })
	},
	submit: function(){
		const { car_code, car_model, car_color, car_name } = this.data
    const { token } = app.globalData.entities.loginInfo
    if(!car_name){
        wx.showModal({
          title: '提示',
          content: '请输入真实姓名',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('')
            }
          }
        })
        return
    }
    if(!car_code){
        wx.showModal({
          title: '提示',
          content: '请输入车牌号',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('')
            }
          }
        })
        return
    }
    if(!car_model || !car_color){
        wx.showModal({
          title: '提示',
          content: '请填写正确的车型和车体颜色',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('')
            }
          }
        })
        return
    }
    let parmas = Object.assign({}, {token: token}, {carNumber: car_code}, {car: car_model + car_color}, {carMaster: car_name})
		driver_api.postCarInfo({
			data: parmas,
			header : {
		        'post_type': true
		    }
		}).then(json => {
			let data = json.data
			if(data.status == 200){
				this.submitDrivingLicense()
				this.submitDriverLicense()
				wx.showToast({
				  title: '成功',
				  icon: 'success',
				  duration: 2000
				})
				setTimeout(()=>{
					wx.navigateBack({
					  delta: 1
					})
				}, 2000)
			}
		})
	}
})
