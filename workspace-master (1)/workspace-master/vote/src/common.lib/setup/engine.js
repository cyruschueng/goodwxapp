define(function(require, exports, module) {
	var Handlebars = require('handlebars');
	var box  = {
		init:function(){
			return box;
		},
		clicked:function(){},
		render:function($dom, data, tpl, type){
	    	var tplc = Handlebars.compile(tpl);
	    	type ?  $dom.append(tplc(data)) : $dom.html(tplc(data));

	    	box.$dom = $dom;
	    	$dom.click(function() {
	    	  box.clicked && box.clicked();
	    	});
		},
	};

	Handlebars.registerHelper("siteStatus",function(v){ 
		if(v == "0" ){
			return "编辑中";
		}else if(v == "1"){
			return "已下线";
		}else if(v == "2"){
			return "";
		}
	});
	Handlebars.registerHelper("siteStatusClass",function(v){ 
		if(v == "0" ){
			return "bBlue";
		}else if(v == "1"){
			return "bGray";
		}else if(v == "2"){
			return "";
		}
	});
	Handlebars.registerHelper("siteQl",function(v){ 
		var h0 = "<dt><a class='qrcode'></dt><dt><a class='link'></a></dt><dd><a class='del'><i></i>删除</a></dd><dd><a class='down'></a></dd>";
		var h1 = "<dt><a class='qrcode'></a></dt><dt><a class='link'></dt><dd><a class='del'><i></i>删除</a></dd><dd><a class='up'><i></i>上线</a></dd>";
		var h2 = "<dt><a class='qrcode'><i></i>二维码</a></dt><dt><a class='link'><i></i>链接</a></dt><dd><a class='del'><i></i>删除</a></dd><dd><a class='down'><i></i>下线</a></dd>";
		if(v == "0" ){
			return h0;
		}else if(v == "1"){
			return h1;
		}else if(v == "2"){
			return h2;
		}
	});
	Handlebars.registerHelper("siteTime",function(str){ 
        var myDate = new Date(str);
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        function formatterDate(t){
        	return (t<10) ? "0"+t : t;
        }
        return year + '-' + formatterDate(month) + '-' + formatterDate(day);
	});

	Handlebars.registerHelper("className",function(v){ 
	 	if(v == "图片" ){
	 		return "picture";
	 	}else if(v == "文字"){
	 		return "text";
	 	}
	 });

	Handlebars.registerHelper("qrcode",function(v){ 
	 	if(v == "图片" ){
	 		return "picture";
	 	}else if(v == "文字"){
	 		return "text";
	 	}
	 });
	module.exports = box;
});