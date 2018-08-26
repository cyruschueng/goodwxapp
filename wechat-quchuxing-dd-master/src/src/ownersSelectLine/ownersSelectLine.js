import * as amapFile from '../../js/amap-wx'
import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data: {
		latitude: 39.5427,
        longitude: 116.2317,
      	video_height: 0,
      	type: 0,
      	markers: [],
      	polyline: [],
      	new_strategy: []
	},
	onLoad(option){
		let self = this
        const { end_location, start_Location } = option
        wx.getSystemInfo({
          success: function(res) {
            self.setData({
              video_height: res.windowHeight - 182,
            })
          }
        })
        let start = start_Location.split(',').map(json => Number(json))
        let end = end_location.split(',').map(json => Number(json))
        self.setData({
          startLocation: start,
          latitude: start[1],
          longitude: start[0],
          endLocation: end
        })
        self.getLine()
	},
	selectLine:function(e){
		const { currentTarget: { dataset: { id } } } = e
		this.setData({
			type: id
		})
		util.setEntities({
	        key: 'strategy',
	        value: String(id)
	    })
		this.getLine()
	},
	getLine(){
        const { token } = app.globalData.entities.loginInfo
        const { startLocation, type, endLocation, new_strategy } = this.data
        let parmas = Object.assign({}, { token: token }, { start: startLocation }, { end: endLocation }, { strategy: Number(type) })
		driver_api.getLine({data: parmas}).then(json => {
			let data = json.data.routes
			if(new_strategy.length == 0){
				let strategy = []
				strategy.push(data.strategy0, data.strategy2, data.strategy9)
				strategy && strategy.map(json => {
					json.distance = json.distance.toFixed(2)
				})
				util.setEntities({
			        key: 'strategy',
			        value: String(strategy[0].strategy)
			    })
				this.setData({
		        	new_strategy: strategy
				})
			}
			this.setData({
				markers: [{
	              iconPath: '../../images/icon_map_star@3x.png',
	              id: 0,
	              longitude: startLocation[0],
	              latitude: startLocation[1],
	              width: 32,
	              height: 50
	            },{
	              iconPath: '../../images/icon_map_end@3x.png',
	              id: 1,
	              longitude: endLocation[0],
	              latitude: endLocation[1],
	              width: 32,
	              height: 50
	            }],
	            polyline: [{
		          points: data.route,
		          color:"#57AD68",
		          width: 10,
		          dottedLine: false,
		          arrowLine: true,
		          borderColor: '#458A53',
		          borderWidth: 1
		        }]
			})
		})
	},
	submit_btn:function(){
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
