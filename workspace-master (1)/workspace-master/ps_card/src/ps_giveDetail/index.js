define(function(require,exports,module){
	var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();
    var nowDate = require("../../src/common.date/nowDate");
    
    var app = {
        cardId: setup.getQueryString("cardId"),
        getTemplateDetailInit: function(cardId){
            setup.commonAjax("giftCard/getGiftCardTransferredDetail.do", {id: cardId}, function(msg){

                //console.log(JSON.stringify(msg,null,2));
                $(".banner").attr("src",msg.imageUrl);
                $(".cardInfo").html(msg.content);
                $(".cardInfo img").hide();
                msg.createTime = nowDate.toDate(msg.createTime);
                var indexTpl = require("../../src/ps_giveDetail/index.tpl");
                box.render($("#cardList"), msg, indexTpl);  //我的卡券列表

                if(msg.amount != undefined){
                    var amountFloat = msg.amount.toFixed(2);
                }else{
                    amountFloat == 0.00;
                }
                if(msg.orderId != undefined){
                    var orderId = msg.orderId.replace(/0/gi,"");
                }

                var giveDetailTpl = require("../../src/ps_giveDetail/giveDetail.tpl");
                box.render($("#giveDetail"), msg, giveDetailTpl);  //我的卡券列表
                $(".giveDetail li:first-child").find("span").html(msg.createTime);
                if(amountFloat && amountFloat != "0.00"){
                    $(".giveDetail .payAmount").show();
                    $(".giveDetail .payAmount").find("span").html(amountFloat+"元");
                }else{
                    $(".giveDetail .payAmount").hide();
                }
                if(orderId && orderId!=0){
                    $(".giveDetail .orderId").show();
                    $(".giveDetail .orderId").find("span").html(orderId);
                }else{
                     $(".giveDetail .orderId").hide();
                }
            });
        },
    };

    app.getTemplateDetailInit(app.cardId);

});
