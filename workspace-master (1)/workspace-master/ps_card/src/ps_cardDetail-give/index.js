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
        getCardDetailInit: function(cardId){
            var me = this;
            setup.commonAjax("giftCard/getCardDetail.do", {cardId: cardId}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                var cardDetailTpl = require("../../src/ps_cardDetail-give/index.tpl");
                box.render($("#cardList"), msg, cardDetailTpl);  //我的卡券列表
                 $(".cardDetail dd p:last-child").html(msg.cardInfo.remark);
                 $(".loadingGif, .loadingGif").hide();
            });
        }
    };

    //业务逻辑 卡券详情
    app.getCardDetailInit(app.cardId);
    //返回
    $(".btnParent a").attr("href", "ps_give.html?cardId="+ app.cardId + "&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+app.giftIdS);

});
