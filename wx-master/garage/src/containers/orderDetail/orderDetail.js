import {
	ajax,wxLogin
} from '../../../utils/util.js';
var app = getApp()

Page({
	data: {
		id: '',
		orderDetail: {},
		sendMethodVal: 0,
		sendMethodPicker: [{
			value: 0,
			text: '发送微信'
		}, {
			value: 1,
			text: '发送短信'
		}],
		actionSheetHidden: true,
		actionSheetItems: [{
			bindtap: 'Menu1',
			txt: '转发微信'
		}, {
			bindtap: 'Menu2',
			txt: '发送短信'
		}],
		menu: '',
		switchs:{
			  part1:true,
				part2:true
		},
		checkRed:false,
		isLoad:false,
		pop_2:false,
		switchGarageName:'',
		idGarage:''
	},
	_closeTimeline(){
		 this.setData({
			   showTimeLine:false
		 })
	},
	onShareAppMessage: function(res) {
		if(res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: '接车单小程序',
			path: '/src/containers/shareApp/shareApp?id=' + this.data.id,
			success: function(res) {
				// 转发成功
				/*wx.showToast({
			        type: 'success',
			        title: '转发成功'
		    	})*/
			},
			fail: function(res) {
				// 转发失败
			}
		}
	},
	bindMenu1: function() {
		this.setData({
			menu: 1,
			actionSheetHidden: !this.data.actionSheetHidden,
		})

	},
	bindMenu2: function() {
		this.setData({
			menu: 2,
			actionSheetHidden: !this.data.actionSheetHidden
		})
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/sendMsg2Customer',
			data: {
				mobile: this.data.orderDetail.contactMobile
			},
			success: function(res) {
				if(res.resultCode == '1') {
					wx.showToast({
						type: 'success',
						title: '短信发送成功'
					})
				}
			}
		})
	},
	sendMsg: function() {
		this.setData({
			actionSheetHidden: !this.data.actionSheetHidden
		})
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/sendMsg2Customer',
			data: {
				mobile: this.data.orderDetail.contactMobile
			},
			success: function(res) {
				if(res.resultCode == '1') {
					wx.showToast({
						type: 'success',
						title: '短信发送成功'
					})
				}
			}
		})
	},
	bindMethodChange(e) {
		var currentVal = e.detail.value;
		if(currentVal === '1') {
			ajax({
				url: '/do/garageAdmin/receiveCarOrder/sendMsg2Customer',
				data: {
					mobile: this.data.orderDetail.contactMobile
				},
				success: function(res) {
					if(res.resultCode == '1') {
						wx.showToast({
							type: 'success',
							title: '短信发送成功'
						})
					}
				}
			})
		} else if(currentVal === '0') {
			//发送微信通知
			//this.onShareAppMessage()
		}
	},
	_toQuote(){
		wx.navigateTo({
			url: '/src/containers/createOrder/createOrder?id=' + self.data.id+'&step=4'
		})
	},
	_toChange() {
		var self=this;
		wx.showModal({
		  title: '确定要修改接车单吗？',
		  content: self.data.orderDetail.status==7?'':'修改接车单需要客户重新同意',
			confirmColor: "#368fdb",
		  success: function(res) {
		    if (res.confirm) {
					  if(self.data.orderDetail.status==7){
							wx.navigateTo({
								 url:'/src/containers/createHistoryOrder/createHistoryOrder?id='+self.data.id
							})
						}else{
							wx.navigateTo({
								url: '/src/containers/createOrder/createOrder?id=' + self.data.id
							})
						}


		    } else if (res.cancel) {

		    }
		  }
		})
	},
	_toHome(){
		wx.switchTab({
			url: '/src/containers/orderList/orderList'
		})
	},
	_callingPhone(){
		 wx.makePhoneCall({
			 phoneNumber:this.data.orderDetail.contactMobile,
			 success:function(){

			 },
			 fail:function(){
				 // wx.showToast({
					//  type:'warn',
					//  title: '系统繁忙，请稍后再试'
				 // })
			 }
		 })
	},
	_getDetail(id) {
		var self = this;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/queryOrderDetail',
			data: {
				id: id
			},
			success: function(res) {
				self.setData({
					orderDetail: Object.assign(res.resultObject,{endString:+res.resultObject.endString}),
					isLoad:true
				});
				var checkResult = '',
						abnormalCount = 0,
						endDate='',
						endDateArr=['年','月','日'],
						switchs={
							part1:true,
							part2:true
						}
				if(res.resultObject.finishDateStr){
					res.resultObject.finishDateStr.split('-').map(function(ele,index){
							endDate+=ele+endDateArr[index]
					})
				}
				if(res.resultObject.itemList) {
					res.resultObject.itemList.map((ele, i) => {
						if(ele.normal == 2) {
							if(abnormalCount > 0) {
								checkResult += '、' + ele.itemName;
							} else {
								checkResult += ele.itemName;
							}
							abnormalCount++;
						}
					})
					if(abnormalCount > 0) {
						checkResult = '异常项目：'+abnormalCount+'项（'+ checkResult+'）';
						self.setData({checkRed:true})
					} else {
						checkResult = "异常项目：0项"
					}
					self.setData({
						checkResult: checkResult
					})
				}
				if(res.resultObject.planItemList){
            var planItemList=res.resultObject.planItemList.map(function(ele){
							   return Object.assign(ele,{totalPrice:Number(ele.materialPrice)+Number(ele.workingPrice)})
						})
						self.setData({
							planItemList: planItemList,
						})
				}
				self.setData({
					endDate:endDate,
					switchs:switchs
				})
			}
		})
	},
	previewCheckPhotos(e){
		 var index=e.currentTarget.dataset.i;
		 var photos=[];
		 this.data.orderDetail.checkPhotoList.map(function(ele){
			   photos.push(ele.urlBig)
		 })
		 wx.previewImage({
			 current: this.data.orderDetail.checkPhotoList[index].urlBig,
			 urls: photos
		 })
	},
	previewVehicleFrameNoIdPhoto(){
		wx.previewImage({
			current: this.data.orderDetail.vehicleFrameNoIdPhoto.urlBig,
			urls: [this.data.orderDetail.vehicleFrameNoIdPhoto.urlBig]
		})
	},
	previewImg(e) {
		var i = e.currentTarget.dataset.i;
		var j = e.currentTarget.dataset.j;
		var photos = [];
		this.data.orderDetail.itemList[i].abnormalPhotoList.map(function(ele) {
			photos.push(ele.urlBig)
		})
		wx.previewImage({
			current: this.data.orderDetail.itemList[i].abnormalPhotoList[j].urlBig,
			urls: photos
		})
	},
	doChange: function() {
		wx.redirectTo({
			url: '/src/containers/createOrder/createOrder?id=' + this.data.id
		});
	},
	miniProgramCode: function() {
		var self = this;
		var garageName = this.data.orderDetail.garageName,
			autoModelChnName = this.data.orderDetail.autoModelChnName,
			vehicleLicenceCode = this.data.orderDetail.vehicleLicenceCode;
		ajax({
			url: '/do/common/commonInfo/getCustomerReceiveCarQrcode',
			data: {
				garageName: garageName,
				autoModelChnName: autoModelChnName,
				vehicleLicenceCode: vehicleLicenceCode
			},
			success: function(res) {
				var resultObject = res.resultObject;
				wx.previewImage({
				      current: resultObject.bigImgUrl, // 当前显示图片的http链接
				      urls: [resultObject.bigImgUrl] // 需要预览的图片http链接列表
				});
			}
		})
	},
	createShareImg: function() {
		var self = this;
		var garageName = this.data.orderDetail.garageName,
			autoModelChnName = this.data.orderDetail.autoModelChnName,
			vehicleLicenceCode = this.data.orderDetail.vehicleLicenceCode;
		this.setData({
			actionSheetHidden: !this.data.actionSheetHidden
		});
		ajax({
			url: '/do/common/commonInfo/getCustomerReceiveCarQrcode',
			data: {
				garageName: garageName,
				autoModelChnName: autoModelChnName,
				vehicleLicenceCode: vehicleLicenceCode
			},
			success: function(res) {
				var resultObject = res.resultObject;
				wx.showModal({
					title: '请长按发送给朋友',
					//			content: '请长按发送给朋友',
					showCancel: false,
					confirmText: '确定',
					confirmColor: '#368fdb',
					success: function(res) {
						if(res.confirm) {
							wx.previewImage({
								current: resultObject.bigImgUrl, // 当前显示图片的http链接
								urls: [resultObject.bigImgUrl] // 需要预览的图片http链接列表
							});
						}
					}
				});
			}
		})
	},
	_confirm(){
		var self=this;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/changeGarage',
			data:{idGarage:self.data.idGarage},
			success: function(res) {
					self.setData({
						 pop_2:false
					})
					wx.setStorageSync('idGarage',self.data.idGarage);
					self._getDetail(self.data.id);
			}
		})
	},
	onLoad: function(options) {
		wx.setNavigationBarTitle({
			title: '接车单商户端'
		})
		this.setData({
			id: options.id
		})
		wx.showShareMenu({
			withShareTicket: true
		})
		wx.getShareInfo({
			shareTicket: true,
			success() {}
		})

		var targetIdGarage=options.targetIdGarage,
		    idGarage=wx.getStorageSync('idGarage')
		    self=this;

		if(targetIdGarage){  //链接进入


			var Domain = "",
					envVersion = app.globalData.appInfo.envVersion;
			if(envVersion == "release" || envVersion == "trial") {
				Domain = app.globalData.appInfo.prdDomain;
			} else if(envVersion == "develop") {
				Domain = app.globalData.appInfo.stgDomain;
			}
      if(idGarage&&idGarage!==targetIdGarage){
				self.setData({
					pop_2: true,
					switchGarageName:decodeURIComponent(options.targetGarageName),
					idGarage:targetIdGarage
				})
			}else if(!idGarage){
				wxLogin(Domain,null,function(){
					   idGarage=wx.getStorageSync('idGarage');
						 if(idGarage!==targetIdGarage){
							 self.setData({
			 					pop_2: true,
			 					switchGarageName:options.targetGarageName,
			 					idGarage:targetIdGarage
			 				})
						}else{
							self._getDetail(options.id);
						}
				})
			}else{
				this._getDetail(options.id);
			}
		}else{
        this._getDetail(options.id);
		}
	},
	handleSwitch(e){
		 var switchId=e.currentTarget.dataset.switchid;
		 this.setData({
			 ['switchs.'+switchId]:!this.data.switchs[switchId]
		 })
	}
})
