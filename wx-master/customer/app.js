//app.js
import Colin from "./src/assets/js/public.js"
import {
	ajax
} from 'utils/util.js'
App({
	onLaunch: function() {
     wx.removeStorageSync('token')
	},
	globalData: {
		appInfo: {
			 			envVersion: "release", //正式版
			//  		envVersion: "trial", //体验版本
			//envVersion: "develop", //开发版
			prdDomain: "https://pamap-gr.pingan.com.cn", //生产域名
			stgDomain: "https://test-pamap-gr-stg2.pingan.com.cn" //测试域名
		},
		alreadyLogin: null,
		token: ""
	}
})
