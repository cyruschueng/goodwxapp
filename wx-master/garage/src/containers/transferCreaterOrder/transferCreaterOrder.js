import {
  ajax
} from '../../../utils/util.js';

Page({
	data: {
		showModal:false
	},
	onLoad: function() {
		wx.setStorageSync('fromTabbar', false);
	},
	onShow: function() {
		var fromTabbar = wx.getStorageSync('fromTabbar');
		if(fromTabbar) {
			var fromTabbarUrl = wx.getStorageSync('fromTabbarUrl');
			wx.switchTab({
				url: fromTabbarUrl
			});
			wx.setStorageSync('fromTabbar', false);
		} else {
			// wx.navigateTo({
			// 	url: '/src/containers/createOrder/createOrder'
			// });
			// wx.setStorageSync('fromTabbar', true);
		}
		var self=this;
		ajax({
			  url:'/do/garageAdmin/receiveCarOrder/queryShowGuide',
        unloading:true,
				success:function(res){
					 res.resultObject.showGuide?self.setData({showModal:true}):''
				}
		})

	},
	createNew(){
		wx.navigateTo({
			url: '/src/containers/createOrder/createOrder'
		});
		wx.setStorageSync('fromTabbar', true);
	},
  switchModal(){
     this.setData({showModal:!this.data.showModal})
  },
	createHistory(){
		wx.navigateTo({
			url: '/src/containers/createHistoryOrder/createHistoryOrder'
		});
		wx.setStorageSync('fromTabbar', true);
	}
})
