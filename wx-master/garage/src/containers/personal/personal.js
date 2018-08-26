//index.js
//获取应用实例

import {
	ajax
} from '../../../utils/util.js';
var app = getApp()

Page({
	data: {
		photoThumbUrl: '',
		garageName: '',
		totalOrderCount: 0,
		todayOrderCount: 0,
		pop_1:false,
		garageList:[]
	},
	_toModelSet() {
		wx.navigateTo({
			url: '/src/containers/setModel/setModel'
		})
	},
	_about() {
    wx.navigateTo({
			url: '/src/containers/aboutUs/aboutUs'
		})
	},
	_teacher(){
		wx.navigateTo({
			url: '/src/containers/teacher/teacher'
		})
	},
	_getPersonalInfo() {
		var self = this;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/queryMyInfo',
			success: function(res) {
				if(res.resultObject) {
					self.setData({
						photoThumbUrl: res.resultObject.photoThumbUrl ,
						garageName: res.resultObject.garageName,
						totalOrderCount: res.resultObject.totalOrderCount,
						todayOrderCount: res.resultObject.todayOrderCount,
						showChangeGarage:res.resultObject.showChangeGarage
					})
				}
			}
		})
	},
	_getGarageList(fn){
		var self = this;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/queryMultiGarageList',
			success: function(res) {
				if(res.resultObject) {
					self.setData({
						 garageList:res.resultObject.multiGarageList,
					})
				}
				if(fn)fn();
			}
		})
	},
	_showSwitchGarage(){
		 var self=this;
		 if(!this.data.garageList.length){
			  this._getGarageList(function(){
					  self.setData({
							pop_1:true
						})
				})
		 }else{
			 this.setData({
					pop_1:true
			 })
		 }
	},
	_cancel(){
		this.setData({
				pop_1:false
		})
	},
	_switchGarage(e){
		var self = this;
		var idGarage=e.currentTarget.dataset.idgarage;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/changeGarage',
			data:{idGarage:idGarage},
			success: function(res) {
				  self._getPersonalInfo()
					self._getGarageList()
					self.setData({
						 pop_1:false
					})
					wx.setStorageSync('idGarage',idGarage);
			}
		})
	},
	onLoad: function() {
		var that = this;
		this._getPersonalInfo();
		wx.setNavigationBarTitle({
			title: '接车单商户端'
		})
	},
	onShow:function(){
		wx.setStorageSync('fromTabbarUrl', "/src/containers/personal/personal");
	}
})
