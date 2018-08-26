(function(){
	var config = {
		//base: "../../",
		alias: {
			"jquery": "jquery/jquery-1.8.3.min",
			"handlebars": "handlebars/handlebars.seajs.min",
			"engine": "setup/engine", //模板引擎
			"setup": "setup/setup", //ajax配置
			"wxShare": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",
			"swiper": "../common.swiper/swiper.min",
			"PhotoClip": "../common.photoClip/PhotoClip",
		},
	};

	seajs.config(config);
})();