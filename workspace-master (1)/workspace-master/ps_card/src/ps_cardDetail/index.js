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
                var cardDetailTpl = require("../../src/ps_cardDetail/index.tpl");
                box.render($("#cardList"), msg, cardDetailTpl);  //我的卡券列表
                $(".cardDetail dd p:last-child").html(msg.cardInfo.remark);
                $(".loadingGif, .loadingText").hide();

                //按钮挂载最底端
                /*var h = $("#cardList").height();
                var vh = $(window).height();
                if((vh-h)>42){
                    $(".btnParent").addClass("btnParentFixed");
                }
*/
                app.clickInit(); 
            });
        },
        clickInit: function(){
            var me = this;
            $("#cardList").delegate(" li .r", "click", function(){
                var me = $(this);
                location.href = "ps_give.html?cardId="+me.attr("cardId")+ "&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+me.attr("giftId");
                return false;
            });
        }
    };

    //业务逻辑 卡券详情
    app.getCardDetailInit(app.cardId);
    //返回
    /*$(".btnParent a").attr("href", "ps_cardList.html?cardId="+ app.cardId + "&templateId="+ templateId+"&isEdit="+app.isEdit+"&giftId="+app.giftIdS);*/
    $(".btnParent a").on("click",function(){
        history.go(-1);
    })
});
