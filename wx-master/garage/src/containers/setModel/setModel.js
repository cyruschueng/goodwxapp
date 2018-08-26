var app = getApp()
import {
	ajax
} from '../../../utils/util.js';
Page({
	data: {
		radioItems: [],
	},

	_getModelInfo() {
		let self = this;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/queryTemplateSetting',
			success: function(res) {
				console.log(res)
				let radioItems = [];
				if(typeof res.resultObject.templateList === 'object') {
					res.resultObject.templateList.map(function(ele, index) {
						radioItems.push({
								name: ele.templateName,
								text: filter_text(index, ele.itemList),
								value: ele.templateCode,
								checked: ele.selected
							})
							//radioItems.push({name:ele.templateName,text:filter_text(ele.itemList),value:ele.templateCode,checked:ele.selected})
					})
				}
				self.setData({
					radioItems: radioItems
				})
			}
		})
	},
	_changeModel(e) {
		var value = e.detail.value;
		ajax({
			url: '/do/garageAdmin/receiveCarOrder/saveTemplateSetting',
			data: {
				templateCode: value
			},
			success: function(res) {
				setTimeout(function() {
					wx.showToast({
						icon: 'success',
						title: '保存成功',
						duration: 1500
					});
				}, 0);
			}
		})
	},
	onLoad: function() {
		var that = this
		this._getModelInfo();
		wx.setNavigationBarTitle({
			title: '接车单商户端'
		})
	}
})

function filter_text(index, val) {
	let result = '包含';
	// if(typeof val==='object'){
	// 	  for(var i=0,len=val.length;i<4&&i<len;i++){
	// 	  	result+=i===3?val[i].itemName:val[i].itemName+'、';
	// 	  }
	if(index == 0) {
		result += '轮胎、胎压、外观、刹车'
	} else {
		result += '轮胎、外观，油水电，发动机'
	}
	result += '等共' + val.length + '项检查'
		// }
	return result;
}