import * as amapFile from '../../js/amap-wx'
import * as driver_api from '../../js/driver_api'

Page({
	data: {
		video_width: 0,
        video_height: 0,
        latitude: 39.5427,
        longitude: 116.2317,
      	group: {},
      	homeOfWork: [],
      	markers: [],
      	findData: [],
      	detail_people: {},
      	detail_meeting: {},
      	details_id: null,
      	active_switch: 'work'
	},
	onLoad(option){
		let self = this
		wx.getSystemInfo({
		  success: function(res) {
		    self.setData({
		      video_width: res.windowWidth,
		      video_height: res.windowHeight
		    })
		  }
		})

        this.initData(option)
	},
	initData(option){
		const { id, location } = option
        let start_Location = location.split(',').map(json => Number(json))
		driver_api.getGroupInfo({
			data: {
				groupId: id
			}
		}).then(json => {
			let data = json.data.result
			this.setData({
				group: data,
				groupId: data.groupId
			})
			if(data.isHaveGroup == '此群已被删除！'){
				wx.showModal({
				  title: '提示',
				  content: data.isHaveGroup,
				  showCancel: false,
				  success: function(res) {
				    if (res.confirm) {
				        wx.navigateBack({
						  delta: 1
						})
				    }
				  }
				})
				return
			}
			if(data.type != 2){
				this.getGroupDetails(data.groupId)
			}else{
				this.getMeetingGroupDetails()
				this.getGroupDetails(data.groupId)
			}
		})
		this.setData({
			latitude: start_Location[1],
            longitude: start_Location[0],
		})
	},
	getGroupDetails(id){
		driver_api.getGroupDetails({
			data:{
				groupId: id
			}
		}).then(json => {
			let data = json.data.result
			let new_data = []
			let home_location = []
			let company_location = []
			data && data.map((json, index) => {
				json.id = index + 1
				new_data.push({
					id: index + 1,
					img: json.driverPicture
				})
			})
			data && data.map(json => {
				if(json.location_home){
					home_location.push({
		              iconPath: '../../images/icon_map_group@3x.png',
		              id: 0,
		              longitude: json.location_home[0],
		              latitude: json.location_home[1],
		              width: 50,
		              height: 50,
		              anchor: {x: .5, y: .5}
		            })
		            this.setData({
		            	markers: home_location
		            })
				}
				if(json.location_company){
					company_location.push({
		              iconPath: '../../images/icon_map_group@3x.png',
		              id: 1,
		              longitude: json.location_company[0],
		              latitude: json.location_company[1],
		              width:  50 ,
		              height: 50,
		              anchor: {x: .5, y: .5}
		            })
		            this.setData({
		            	markers: company_location
		            })
				}
			})
			this.setData({
				homeOfWork: data,
				findData: new_data
			})
			this.findPeopleDetails(null, data)
		})
	},
	getMeetingGroupDetails(e){
		let type = e ? e.currentTarget.dataset.type : 1
		const { groupId } = this.data
		driver_api.getGroupDetails({
			data:{
				groupId: groupId,
				typeWant: type
			}
		}).then(json => {
			let data = json.data.result
			let new_data = []
			data && data.map((json, index) => {
				json.id = index + 1
				new_data.push({
					id: index + 1,
					img: json.driverPicture
				})
			})
			this.setData({
				meeting: data,
				findData: new_data
			})
			if(type == '0'){
				this.setData({
					active_switch: 'home'
				})
			}else{
				this.setData({
					active_switch: 'work'
				})
			}
			this.findMeetingDetails(null, data)
		})
	},
	findPeopleDetails: function(e, data){
		let id =  e ? e.currentTarget.dataset.id : data[0].id
		const { homeOfWork } = this.data
		let detail_people = homeOfWork && homeOfWork.find(json => json.id == id)
		this.setData({
			detail_people: detail_people,
			details_id: id
		})
	},
	findMeetingDetails: function(e, data){
		let id =  e ? e.currentTarget.dataset.id : data[0].id
		const { meeting } = this.data
		let detail_meeting = meeting && meeting.find(json => json.id == id)
		this.setData({
			detail_meeting: detail_meeting,
			details_id: id
		})
	},
	gotoUserPage: function(){
		wx.showModal({
		  title: '提示',
		  content: '联系客服，开通VIP可查看',
		  showCancel: false,
		  success: function(res) {
		    if (res.confirm) {
		        wx.makePhoneCall({
				  phoneNumber: '15890349336' 
				})
		    }
		  }
		})
	}
})