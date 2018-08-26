define(function(require, exports, module) {
	var $ = require("jquery");

	var Handlebars = require('handlebars');
	var setup = require("setup");
	var box  = {
		init:function(){
			return box;
		},
		clicked:function(){},
		render:function($dom, data, tpl){
	    	var tplc = Handlebars.compile(tpl);
	    	$dom.append(tplc(data));
	    	box.$dom = $dom;
	    	$dom.click(function() {
	    	  box.clicked && box.clicked();
	    	});
		},
		scroll:function(scrollData,cb){
		    var me = this;
		    $(document).unbind("scroll");
		    $(document).bind("scroll", function(event){
		        if( $(document).scrollTop() >= $(document).height()-$(window).height() ){
		            scrollData++;
		            cb && cb();
		        }
		    });
		},
	};

	Handlebars.registerHelper("templateStatus",function(v){ //"CHECKING" 审核中, "APPROVED" , 已通过；"REJECTED"被驳回, "EXPIRED"协议已过期
		if(v == "0" ){
			return "已领取";
		}else if(v == "1"){
			return "已使用";
		}else if(v == "2"){
			return "已过期";
		}else if(v == "3"){
			return "未领取";
		}else if(v == "4"){
			return "已转赠";
		}else if(v == "5"){
			return "已删除";
		}else{
			return "已占用";
		}
	});

	Handlebars.registerHelper("amountChange",function(v){ //金额保留2位小数
		var vFloat = v.toFixed(2);
		if(vFloat == "0.00" || vFloat == 0.00){
			return "免费";
		}else{
			return vFloat;
		}
	});

	Handlebars.registerHelper("ifFree",function(v){ //金额保留2位小数
		var vFloat = v.toFixed(2);
		if(vFloat == "0.00" || vFloat == 0.00){
			return "isFree";
		}else{
			return "noFree";
		}
	});

	Handlebars.registerHelper("cardSelected",function(v){ //金额保留2位小数
		var giftId = setup.getQueryString("giftId");
		if(giftId == v){
			return "已选";
		}else{
			return "添加卡券";
		}
	});

	Handlebars.registerHelper("moneySign",function(v){ //免费收费卡券￥
		var vFloat = v.toFixed(2);
		if(vFloat == "0.00" || vFloat == 0.00){
			return "moneyFree";
		}
	});
	
	module.exports = box;
});