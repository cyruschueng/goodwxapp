import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data:{
		type: 'home',
		keywords: ''
	},
	onShow(){
		const { address_type } = app.globalData.entities
		this.setData({
			type: address_type
		})
	},
	onLoad(option){
		const { location, keywords } = option
		this.setData({
			location: location,
			keywords: keywords
		})
		if(!option.location){
			this.detectionAddress()
		}
	},
	detectionAddress:function(){
		const { token } = app.globalData.entities.loginInfo
		const { address_type } = app.globalData.entities
        driver_api.getSearchAddress({
          data: {
            token: token
          }
        }).then(json => {
        	if(json.data.status == -1){
        		return
        	}
        	let data = json.data.result
        	if(address_type == 'home'){
        		if(data.addr_home != null || data.location_home != null){
	        		this.setData({
						location: data.location_home,
						keywords: data.addr_home
					})
        		}
				return
        	}
        	if(address_type == 'company'){
        		if(data.addr_company != null || data.location_company != null){
	        		this.setData({
						location: data.location_company,
						keywords: data.addr_company
					})
        		}
				return
        	}
        })
	},
	setAddress:function(e){
		const { currentTarget: { dataset: { id } } } = e
		wx.redirectTo({
		  url: `/src/setAddress/searchAddress?id=${id}`
		})
	},
	submit_btn:function(){
		const { type, location, keywords } = this.data
		const { token } = app.globalData.entities.loginInfo
		let parmas = {}
		if( !location && !keywords ){
			wx.showModal({
			  title: '提示',
			  content: '请输入地址',
			  showCancel: false,
			  success: function(res) {
			    if (res.confirm) {
			      console.log('用户点击确定')
			    }
			  }
			})
			return
		}

		if( type == 'home' ){
			parmas = Object.assign({}, { token: token }, {addr_home: keywords}, { location_home: location })
			this.submitAddress(parmas)
			return
		}
		if( type == 'company' ){
			parmas = Object.assign({}, { token: token }, {addr_company: keywords}, { location_company: location })
			this.submitAddress(parmas)
			return
		}
	},
	submitAddress(parmas){
		driver_api.postHomeAndCompanyAddress({
			data: parmas
		}).then(json => {
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
		}, e => {
			wx.showToast({
			  title: '失败',
			  icon: 'success',
			  duration: 2000
			})
		})
	}
})
