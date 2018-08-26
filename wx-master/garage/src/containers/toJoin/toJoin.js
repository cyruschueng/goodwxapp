import {
	wxLogin
} from '../../../utils/util.js';
var app = getApp();
Page({
	data: {
		codeUrl: "../../../images/garageCode@3x.png"
	},
	onLoad: function() {
		var self = this
		wx.setNavigationBarTitle({
			title: '接车单商户端'
		});
	},
	onShow:function(){
		this.login()
	},
	onHide:function(){
		if(wx.getStorageSync('showNewFollow')){
			 wx.removeStorageSync('showNewFollow')
		}
	},
	longTap: function() {
		// 允许从相机和相册扫码
		wx.scanCode({
			success: (res) => {
				console.log(res)
			}
		})
	},
	login:function(){
		var Domain = "",
				envVersion = app.globalData.appInfo.envVersion;
		if(envVersion == "release" || envVersion == "trial") {
			Domain = app.globalData.appInfo.prdDomain;
		} else if(envVersion == "develop") {
			Domain = app.globalData.appInfo.stgDomain;
		}
	  wxLogin(Domain,null,function(){
				if(wx.getStorageSync('token')){
					if(wx.getStorageSync('showNewFollow')){
						wx.navigateTo({
							url: '/src/containers/aboutUs/aboutUs'
						})
					}else{
						wx.removeStorageSync('showNewFollow')
						wx.switchTab({url: '/src/containers/orderList/orderList'})
					}

				}
		})
	},
	toOrderList(){
		 wx.switchTab({url: '/src/containers/orderList/orderList'})
	},
	toTeacher(){
		wx.navigateTo({
			url: '/src/containers/teacher/teacher'
		})
	},
	previewImage: function(e) {
		return;
		var dataset = e.currentTarget.dataset;
		var previewImages = [dataset.urlbig];
		wx.previewImage({
			current: dataset.urlbig, // 当前显示图片的http链接
			urls: previewImages // 需要预览的图片http链接列表
		})
	},
	_copy:function(){
		wx.setClipboardData({
				data:'pahqx03',
				success:function(){
					 wx.showToast({
							title:'复制成功'
					 })
				},
				fail:function(){
					wx.showToast({
						 title:'该微信版本不支持，请升级微信'
					})
				}
		})
	}
});
