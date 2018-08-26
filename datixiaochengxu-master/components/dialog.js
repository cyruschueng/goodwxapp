Component({
	options: {
		multipleSlots: true
	},
	properties: {
		title: {
			type: String,
			value: '标题'
		},
		content: {
			type: String,
			value: '弹窗内容'
		},
		// 弹窗取消按钮文字
	    cancelText :{
	    	type : String ,
	    	value : '取消'
	    },
	    // 弹窗确认按钮文字
	    confirmText :{
	    	type : String ,
	    	value : '确定'
	    }
	},
	data: {
		isShow: false
	},
	methods: {
		hideDialog() {
			this.setData({
				isShow: !this.data.isShow
			})
		},
		showDialog() {
			this.setData({
				isShow: !this.data.isShow
			})
		},
		_cancelEvent() {
			this.triggerEvent("cancelEvent")
		},
		_confiemEvent() {
			this.triggerEvent("confirmEvent")
		}
	}
})