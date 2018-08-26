define(function(require,exports,module){
	var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    var app = {
        cardId: setup.getQueryString("cardId"),
        getGiftCardTempalteTypeInit: function(){
            var me = this;
            setup.commonAjax("giftCard/getGiftCardTemplateType.do", {}, function(msg){
                //console.log(JSON.stringify(msg,null,2))
                if(msg && msg.length > 0){
                    var tempTpl = require("../../src/ps_template/template.tpl");
                    box.render($(".temp_tab"), msg, tempTpl);  //我的卡券列表
                    $(".temp_tab li:eq(0)").addClass("active");
                }
            });
        },
		getAjaxInit: function(grandType,pageNum, pageSize){
			var me = this;
			var params = {
                id: grandType,
				//pageNum: pageNum,
				//pageSize: pageSize
			};

			setup.commonAjax("giftCard/getGiftCardTemplate.do", params, function(msg){
            	if(msg && msg.length > 0){
                    $.each(msg, function(i,v){
                        v.type = (v.template)[0].type;
                        v.typeName = (v.template)[0].typeName;
                        
                        var len = (v.template).length;
                        v.childList = [];
                        for(var j=0;j<len;j++){
                            v.childList.push({
                                id: (v.template)[j].id,
                                imageUrl: (v.template)[j].imageUrl,
                                name: (v.template)[j].name,
                                parentId: (v.template)[j].parentId,
                                cardId: setup.getQueryString("cardId")
                            });
                        }
                        v.template = "";
                    });

                    for(var i=0; i<msg.length;i++){
                        for (var j in msg[i]) {
                            if (msg[i][j] === '' ||  msg[i][j] === {}) {
                                delete msg[i][j]
                            }
                        }
                    }
            		var indexTpl = require("../../src/ps_template/index.tpl");
                    $("#temp_List").html("");
                    box.render($("#temp_List"), msg, indexTpl);  //我的卡券列表
                    $(".loadingGif, .loadingText").hide();
            	}
            });
		},
        /*swiperInit: function(){
            var me = this;
            setup.commonAjax("giftCard/getCarouselGiftCardTemplate.do", {}, function(msg){
                $.each(msg, function(i,v){
                    v.cardId = me.cardId;
                });
                swiper.swiperInit(msg);
            });
        }*/
	};
    /*app.swiperInit();*/
    app.getGiftCardTempalteTypeInit();
	app.getAjaxInit(1,10,1); 
    //加载中

    //点击分类tab
    $(".temp_tab").delegate(" li", "click", function(){
    	var me = $(this);
    	var index = me.index()+1;
    	me.addClass("active").siblings().removeClass("active");
        app.getAjaxInit(index)
    });
});
