//index.js
import Colin from "../../assets/js/public.js"
import {
	ajax
} from '../../../utils/util.js';
//获取应用实例
const app = getApp()
Page({
	data: {
		orderDetail: {},
		abnormalstr: "",
		userInfo: {},
		switchs:{
			 part1:true,
			 part2:true
		},
		id:'',
		hasUserInfo: false,
		timeline:0,
		endDate:'',
		showTimeLine:true,
    checkRed:false,
		showPhoneModal:false,
		step:'1',
		canIUse: wx.canIUse('button.open-type.getUserInfo')
			//控件用
	},
	onLoad: function(option) {

		var scene=decodeURIComponent(option.scene||'');
    //var scene="29218a3a043c4457b171428455fdbfa4"
		if(scene){
			 this.updateScanStatus(scene);
		}else{
			 this.renderView(option.id);
			 this.setData({
				   id:option.id
			 })
		}
	},
	renderView: function(id) {
		var self = this;
		wx.showLoading({
			title: '加载中',
		});

		ajax({
			url: '/do/customer/receiveCarOrder/queryOrderDetail',
			data: {
				id: id
			},
			success: function(res) {
				var data = res;
				if(data.resultCode == "1") {
					wx.hideToast();
					self.setData({
						orderDetail: Object.assign(res.resultObject,{status:+res.resultObject.status,endString:+res.resultObject.endString})
					});
					var checkResult = '',
						  abnormalCount = 0,
              endDate='',
							step=1,
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

					if(res.resultObject.status=='4'){

					}
				  switch(res.resultObject.status){
						  case 1:
							  step=2;
							break;
							case 2:
							  step=3;
							break;
							case 3:
							  step=4;
							break;
							case 4:
							  switchs.part1=false;
								step=4
							break;
							case 5:
							  step=5;
							break;
							case 6:
							  step=5;
							break;
							default:
							  step=5;
								break;
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
							checkResult: checkResult,

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
							switchs:switchs,
							step:step,
							showPhoneModal:res.resultObject.needWxAuth
					})

				} else {

				}

			},
			fail: function() {
				wx.hideToast();
			}
		});
	},
	_callingPhone(){
		 wx.makePhoneCall({
			 phoneNumber:this.data.orderDetail.contactMobileList[0],
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
	previewVehicleFrameNoIdPhoto(){
		wx.previewImage({
			current: this.data.orderDetail.vehicleFrameNoIdPhoto.urlBig,
			urls: [this.data.orderDetail.vehicleFrameNoIdPhoto.urlBig]
		})
	},
	closeTimeline(){
		this.setData({
			showTimeLine:false
		})
	},
	handleSwitch(e){
		if(this.data.orderDetail.status>=4){
			var switchId=e.currentTarget.dataset.switchid;
			this.setData({
				['switchs.'+switchId]:!this.data.switchs[switchId]
			})
		}

	},
	updateScanStatus:function(id){
		 var self=this;
		 ajax({
			   url:'/do/customer/receiveCarOrder/dealReceiveCarOrder',
				 data:{id:id,scanStatus:2},
				 success:function(res){
					  if(res.resultCode=='1'){
							 self.renderView(id);
						}
						if(res.resultCode=='3'){
							 wx.redirectTo({
								  url:'../effective/effective'
							 })
						}
				 }
		 })
	},
	_toHome(){
		wx.reLaunch({
			url: '../orderListSwiper/orderListSwiper'
		});
	},
	doRefuse: function(e) {
		var self = this,formId=e.detail.formId;
		var scanStatus=self.data.orderDetail.status=='1'?4:6;
		wx.showModal({
			title: scanStatus===4?'确定拒绝接车单？':'确定不同意报价?',
			content:'点击确定后，将通知修理厂修改',
			confirmColor: "#ff6600",
			success: function(res) {
				if(res.confirm) {
					wx.showLoading({
						title: '加载中',
					});
					ajax({
						url: '/do/customer/receiveCarOrder/dealReceiveCarOrder',
						data: {
							id: self.data.orderDetail.id,
							userFormId:formId,
							scanStatus:scanStatus
						},
						success: function(res) {
							wx.hideToast();
							var data = res;
							if(data.resultCode == 1) {
                 if(scanStatus==4){
									 self.setData({
										  'orderDetail.scanStatus':4,
									 })
								 }
								 if(scanStatus==6){
									 self.setData({
											'orderDetail.status':6,
									 })
								 }
							} else {
								wx.showModal({
									title: '提示',
									content: data.resultMessage,
									showCancel: false,
									confirmColor: "#ff6600"
								});
							}
						},
						fail: function() {
							wx.hideToast();
						}
					});
				} else if(res.cancel) {}
			}
		})
	},
	doConfirm: function(e) {
		var self = this,formId=e.detail.formId;
		var scanStatus=self.data.orderDetail.status=='1'?3:5;
		wx.showModal({
			title: scanStatus===3?'确认接车单？':'确定同意报价?',
			content:scanStatus===3?'点击确认后，将通知修理厂开始检车':'点击确定后，将通知修理厂安排施工',
			confirmColor: "#ff6600",
			confirmText:scanStatus===3?'确认':'确定',
			success: function(res) {
				if(res.confirm) {
					wx.showLoading({
						title: '加载中',
					});
					ajax({
						url: '/do/customer/receiveCarOrder/dealReceiveCarOrder',
						data: {
							id: self.data.orderDetail.id,
							userFormId:formId,
							scanStatus: scanStatus
						},
						success: function(res) {
							wx.hideToast();
							var data = res;
							if(data.resultCode == 1) {
								if(scanStatus==3){
									self.setData({
										 'orderDetail.scanStatus':3,
										 'orderDetail.status':2,
									})
								}
								if(scanStatus==5){
									self.setData({
										 'orderDetail.scanStatus':3,
										 'orderDetail.status':5,

									})
									setTimeout(function(){
										wx.showToast({
											 title:'已通知修理厂',
											 duration:3000
										})
									},300)

								}
							} else {
								wx.showModal({
									title: '提示',
									content: data.resultMessage,
									showCancel: false,
									confirmColor: "#ff6600"
								});
							}
						},
						fail: function() {
							wx.hideToast();
						}
					});
				} else if(res.cancel) {}
			}
		})
	},
	getPhoneNumber: function(e) {
		let self=this;
		if(e.detail.encryptedData){
			ajax({
					url:'/do/customer/receiveCarOrder/decryptPhoneNumber',
					data:{
							encryptedData:e.detail.encryptedData,
							iv:e.detail.iv,
							id:self.data.id
					},
					success:function(res){
						  self.setData({
								showPhoneModal:false,
								'orderDetail.contactMobile':res.resultObject.contactMobile
							})
					}
			})
		}else{
			self.setData({
				showPhoneModal:false
			})
		}

  }
})
