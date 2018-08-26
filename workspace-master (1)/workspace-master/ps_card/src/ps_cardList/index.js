define(function(require,exports,module){
	var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();
    var templateId = setup.getQueryString("templateId");
   

    var app = {
    	cardId: setup.getQueryString("cardId"),
    	isEdit: setup.getQueryString("isEdit") || "",
    	giftIdS: setup.getQueryString("giftId"),
    	scrollData:{
    	        pageNum:1,
    	        pageSize:10
    	},
    	scroll:function(){
    	    var me = this;
    	    $(document).unbind("scroll");
    	    $(document).bind("scroll", function(event){
    	        if( $(document).scrollTop() >= $(document).height()-$(window).height() ){
    	            me.scrollData.pageNum++;
    	            me.getAjaxInit( me.scrollData.pageNum,10);
    	        }
    	    });
    	},
		getAjaxInit: function(pageNum, pageSize){
			var me = this;
			var params = {
				pageNum: pageNum,
				pageSize: pageSize
			};
			
			setup.commonAjax("giftCard/getCardList.do", params, function(msg){
				//console.log(JSON.stringify(msg,null,2));
            	if(msg && msg.data.length > 0){
            		var indexTpl = require("../../src/ps_cardList/index.tpl");
    				box.render($("#cardList"), msg, indexTpl);  //我的卡券列表
    				$("#cardList dl").width($("#cardList ul li").width()-$("#cardList .cardDt").width()-$("#cardList ul li a").width()*0.21);
	                app.clickInit(); 
	                $(".loadingGif, .loadingText").hide();
            	}else{
            		if(params.pageNum == 1){
	            		var noDataTpl = require("../../src/ps_cardList/noData.tpl");
	            		box.render($("#cardList"), msg, noDataTpl);
	            		$(".loadingGif, .loadingText").hide();
	            	}
            	}
            });
		},
		showFn: function(){
		    var me = this;
		    me.getAjaxInit(me.scrollData.pageNum,10);
		    me.scroll();
		},
		clickLi : function(){
			$("#cardList").delegate("li", "click", function(){
				var me = $(this);
				me.find("a").attr("href", "ps_cardDetail.html?cardId="+ me.attr("cardId")+"&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+app.giftIdS);
			});
		},
		clickInit: function(){
			$("#cardList").delegate(" li .r", "click", function(){
				var me = $(this);
				location.href = "ps_give.html?cardId="+me.attr("cardId")+ "&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+me.attr("giftId");
				return false;
			});
		},
	};
	app.showFn(); 
	app.clickLi();
	//加载中

	//返回
	$(".btnParent a").attr("href", "ps_give.html?cardId="+ app.cardId + "&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+app.giftIdS);
});




