let MIXINS = require("../../common/mixin");
import { LOCAL_TEST_LIST } from '../../utils/const'
Page({
    data: {
        list:LOCAL_TEST_LIST,
		inputValue: ''
    },
    onload() {
        
	},
	inputChangeActive(e) {
		let _value = e.detail.value;
		this.setData({
			inputValue: _value
		})
	},
	emptyInputValueActive() {
		this.setData({
			inputValue: ''
		})
	},
	listToH5Active(p1, p2) {
		let _url = p1.detail.url;
		MIXINS.listToH5Active(_url, p2)
	}
})