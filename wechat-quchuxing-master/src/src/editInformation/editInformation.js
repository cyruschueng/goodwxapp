import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import * as amapFile from '../../js/amap-wx'

var app = getApp()

Page({
	data:{
		submit_active: true,
		title: '',
		code_type: '',
		input_name: '',
		input_age: '',
		input_sex: '',
		input_value: '',
		userInfo: {},
		items: [
	      {name: 'boy', value: '男'},
	      {name: 'gril', value: '女'},
	    ]
	},
	onLoad(option){
		let self = this
		wx.getSystemInfo({
	      success: function(res) {
	        self.setData({
	          width: res.windowWidth,
	          height: res.windowHeight,
	          phone: option.phone
	        })
	      }
	    })
	    this.getUserInfo(option)
	},
	getUserInfo(option){
		const { token } = app.globalData.entities.loginInfo
		const { phone } = this.data
		driver_api.getUserInfo({data:{
			token: token,
			otherPhone: phone
		}}).then(json => {
			let data = json.data.personalInfo
			if(data.sex == 0){
				data.textSex = '保密'
			}else if(data.sex == 1){
				data.textSex = '男'
			}else if(data.sex == 2){
				data.textSex = '女'
			}
			this.setData({
				userInfo: data
			})
		})
	},
	gotoEdit: function(e){
		const { currentTarget: { dataset: { id, type } } } = e
		if(id == 'name' && type == 'text'){
			this.setData({
				title: '昵称'
			})
		}
		if(id == 'sex' && type == 'text'){
			this.setData({
				title: '性别'
			})
		}
		if(id == 'age' && type == 'text'){
			this.setData({
				title: '年龄'
			})
		}
		this.setData({
			submit_active: false,
			code_type: type,
			code_id: id
		})
	},
	closeEdit: function(){
		this.setData({
			submit_active: true
		})
	},
	radioChange: function(e) {
    	let sex = e.detail.value
    	this.setData({
	      input_sex: e.detail.value
	    })
  	},
	getHeaderImg: function(e){
		const { currentTarget: { dataset: { id } } } = e
		let self = this
		const { token } = app.globalData.entities.loginInfo
		wx.chooseImage({
		  count: 1, // 默认9
		  success: function (res) {
		    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
		    var file = res.tempFilePaths
		    self.getFilePathImg(file, id, token)
		  }
		})
	},
	getFilePathImg: function(file, id, token){
		let self = this
		wx.uploadFile({
	      url: 'https://v1.driver.quchuxing.com.cn/driver/detail/picture', 
	      filePath: file[0],
	      name: 'picture',
	      formData:{
	        'token': token
	      },
	      header: {
	      	'content-type': 'multipart/form-data' 
	      },
	      success: function(res){
	        wx.showToast({
			  title: '修改成功',
			  icon: 'success',
			  duration: 2000
			})
			self.getUserInfo()
	      }
	    })
	},
	gotoSesameCertification: function(){
		// wx.navigateTo({
  //       	url: `/src/ownersCertification/sesameCertification`
  //     	})
  		wx.showModal({
		  title: '提示',
		  content: '开发中...稍安勿躁',
		  showCancel: false,
		  success: function(res) {
		    if (res.confirm) {
		      console.log('用户点击确定')
		    }
		  }
		})
	},
	gotoOwnersCertification: function(){
		wx.navigateTo({
        	url: `/src/ownersCertification/ownersCertification`
      	})
	},
	getInputDetail: function(e){
		const { code_id } = this.data
		if(code_id == 'name'){
			this.setData({
		      input_name: e.detail.value
		    })
		}
		if(code_id == 'age'){
			this.setData({
		      input_age: e.detail.value
		    })
		}
		this.setData({
			input_value: e.detail.value
		})
	},
	submit: function(){
		const { input_name, input_sex, input_age, userInfo } = this.data
		const { token } = app.globalData.entities.loginInfo
		let sex = userInfo.sex
		if(input_sex == 'boy'){
			sex = 1
		}else if(input_sex == 'gril'){
			sex = 2
		}else{
			sex = userInfo.sex
		}
		let parmas = Object.assign({}, {token: token}, {nickName: input_name}, {sex: sex}, {age: input_age})
		driver_api.updateUserInfo({
			data: parmas
		}).then(json => {
			wx.showToast({
			  title: '修改成功',
			  icon: 'success',
			  duration: 2000
			})
			this.getUserInfo()
		})
		this.closeEdit()
		this.setData({
			input_value: ''
		})
	}
})