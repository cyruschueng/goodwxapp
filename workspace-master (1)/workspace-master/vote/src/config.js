(function(){
	var config = {
		//base: "../vote/src/",
		alias: {
			"jquery": "jquery/jquery-1.8.3.min",
			"$" : "jquery/jquery-1.8.3.min",
			"handlebars": "handlebars/handlebars.seajs.min",
			"engine": "setup/engine", //模板引擎
			"setup": "setup/setup", //ajax配置
			"swiper": "../../src/common.swiper/swiper.min", //swiper配置
			"wxShare": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
			"PhotoClip": "../../common.photoClip/PhotoClip",
			"weui": "../../common.WeUi/index",
		}
	};

	seajs.config(config);
})();