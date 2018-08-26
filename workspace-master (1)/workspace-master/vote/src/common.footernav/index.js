define(function(require,exports,module){
	require("../../src/common.footernav/index.css");

    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    //页面逻辑
    var footer = {
    	localhost: "http://"+(location.host || "wx.yinnima.com:8088"),
    	init: function(data){
    		var me = this;
    		var footer = require("../../src/common.footernav/index.tpl");
    			box.render($(".footerNav"), data, footer);

    		$("#cards").attr("href", me.localhost+ "/bankApp/cardCoupons.html");

    		var type = setup.getQueryString("type");
    		if( type == 2 ){
    			$(".footer").removeClass("active");
    			$(".footer").eq(1).addClass("active");
    		}
    	}
    };


    return footer;
});