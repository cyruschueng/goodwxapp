define(function(require,exports,module){
	var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();
    var nowDate = require("../../src/common.date/nowDate");

    var app = {
    	cardId: setup.getQueryString("cardId"),
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

			setup.commonAjax("giftCard/getGiftCardTransferredRecord.do", params, function(msg){
                //console.log(JSON.stringify(msg,null,2))
            	if(msg && msg.data.length > 0){
            		$.each(msg.data, function(i,v){
            			v.createTime = nowDate.toDate(v.createTime);
            		});
            		var indexTpl = require("../../src/ps_giveList/index.tpl");
    				box.render($("#giveList"), msg, indexTpl);  //我的卡券列表
                    $(".loadingGif, .loadingText").hide();
            	}else{
                    if(params.pageNum == 1){
                      var noDataTpl = require("../../src/ps_giveList/noData.tpl");
                        box.render($("#giveList"), msg, noDataTpl);  
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
	};
    app.showFn();
	 
        
        
});


 