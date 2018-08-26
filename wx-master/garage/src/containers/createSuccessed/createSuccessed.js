import {
	ajax
} from '../../../utils/util.js';

Page({
	data: {
		sendMethodVal: 0,
    	contactMobile:'',
    	orderDetail: {},
    	id:'',
    	codeUrl:'../../../images/customerMiniCode.jpg',
		sendMethodPicker: [{
			value: 0,
			text: '发送微信'
		}, {
			value: 1,
			text: '发送短信'
		}],
		actionSheetHidden: true,
 		actionSheetItems:[
		    {bindtap:'Menu1',txt:'转发微信'},
		    {bindtap:'Menu2',txt:'发送短信'}
	    ],
	    menu:''
	},
	actionSheetShow:function(e){
		this.setData({
			actionSheetHidden: false
		})
	},
	actionSheetTap: function(e) {
		this.setData({
			actionSheetHidden: true
		})
	},
	actionSheetChange: function(e) {
		var self = this;
		var garageName = this.data.orderDetail.garageName,
			autoModelChnName = this.data.orderDetail.autoModelChnName,
			vehicleLicenceCode = this.data.orderDetail.vehicleLicenceCode;
		this.setData({
			actionSheetHidden: true
		})
		ajax({
			url: '/do/common/commonInfo/getCustomerReceiveCarQrcode',
			data: {
				garageName: garageName,
				autoModelChnName: autoModelChnName,
				vehicleLicenceCode: vehicleLicenceCode,
				idOrder:self.data.id
			},
			success: function(res) {
				var resultObject = res.resultObject;
				wx.showModal({
					title: '点击确定生成分享图',
					content: '请长按发送给朋友',
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
	_callingPhone(){
		 wx.makePhoneCall({
			 phoneNumber:this.data.contactMobile||this.data.orderDetail.contactMobile,
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
	sendMsg:function(e){
	    this.setData({
		    actionSheetHidden:true
	    })
	    ajax({
			url: '/do/garageAdmin/receiveCarOrder/sendMsg2Customer',
			data: {
				mobile: this.data.contactMobile
			},
			success: function(res) {

				if(res.resultCode == '1') {
					wx.showToast({
						title: '短信发送成功'
					})
				}else{
					wx.showToast({
						title:res.resultMessage
					})
				}
			}
		})
  	},
	onShareAppMessage: function (res) {
	    if (res.from === 'button') {
	      	// 来自页面内转发按钮
	      	console.log(res.target)
	    }
	    return {
	      	title: '接车单小程序',
	      	path: '/src/containers/shareApp/shareApp?id='+this.data.id,
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
  	onLoad: function (options) {
		var that = this;
    	this.setData({
    		contactMobile:options.contactMobile||'',
    		id:options.id
    	});
    	this._getDetail(options.id);

		wx.setNavigationBarTitle({
			title: '检查完成'
		})
		wx.showShareMenu({
			withShareTicket: true
		})
	    wx.getShareInfo({
		    shareTicket: true,
		    	success() {
		    }
	    })
	},
	goOrderList: function() {
		wx.redirectTo({
			url: '/src/containers/orderDetail/orderDetail?id='+this.data.id
		});
	},
	toHome:function(){
		wx.switchTab({
			url: '/src/containers/orderList/orderList'
		});
	},
	doComplete: function() {
		var fromTabbar = wx.setStorageSync('fromTabbar',false);
		wx.switchTab({
			url: '/src/containers/orderList/orderList'
		});
	},
	doSendCustomer: function() {
		//
	},
	bindMethodChange(e) {
		var currentVal = e.detail.value;
		if(currentVal === '1') {
			ajax({
				url: '/do/garageAdmin/receiveCarOrder/sendMsg2Customer',
				data: {
					mobile: this.data.contactMobile
				},
				success: function(res) {
					if(res.resultCode == '1') {
						wx.showToast({
							type: 'success',
							title: '短信发送成功'
						})
					}else{
						wx.showToast({
							type:'success',
							title:res.resultMessage
						})
					}
				}
			});
		}else if(currentVal === '0'){
			//发送微信通知
			/*wx.showToast({
		        type: 'success',
		        title: '微信发送成功'
		    })*/
		}
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
					orderDetail: res.resultObject
				});
			}
		})
	},
})
