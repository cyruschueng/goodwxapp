Page({
    data:{
		config:{
			name: {
				focus: true,
				title: '姓名',
			},
			phone: {
				inputType: 'date',
				title: '出生日期',
			},
			idCard: {
				inputType: 'select',
				title: '性别',
			},
        }
	},
    onShow:function(){
        
    },
    handleDateFieldClick() {
        this.setData({
            'pickerViewConfig.show': true
        });
    },
    hideDatePopup() {
        this.setData({
            'pickerViewConfig.show': false
        });
    }
})