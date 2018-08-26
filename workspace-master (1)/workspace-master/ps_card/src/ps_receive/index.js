define(function(require,exports,module){
    var $ = require("jquery");
    var wx = require("wxShare");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();
    
    var app = {
        sign: setup.getQueryString("sign"),
        init: function(){
            var me = this;
            
            setup.commonAjax("giftCard/getWxGiftCardConfig.do", {sign: me.sign}, function(msg){
                //console.log(JSON.stringify(msg,null,2))
                $(".banner").attr("src", msg.imageUrl);
                $(".cardInfo").html(msg.content);

                me.getCardDetailInit(msg.cardId);

                me.cardId= msg.cardId;
                me.code = msg.code;
                me.nonceStr = msg.nonceStr;
                me.timestamp = msg.timestamp;
                me.signature = msg.signature;

                if(msg.status == "3"){
                    $(".giveBtn").html("领取");
                }else{
                    $(".giveBtn").html("查看");
                }
                
            },function(msg){
                //console.log(JSON.stringify(msg,null,2))
                $(".banner").attr("src", msg.imageUrl);
                $(".cardInfo").html(msg.content);

                me.getCardDetailInit(msg.cardId);

                me.cardId= msg.cardId;
                me.code = msg.code;
                me.nonceStr = msg.nonceStr;
                me.timestamp = msg.timestamp;
                me.signature = msg.signature;
                $(".giveBtn").html("该卡券已被领取").css("background","#ccc");
                $(".giveBtn").unbind(); 

            });
        },
        getCardDetailInit: function(cardId){
            setup.commonAjax("giftCard/getCardDetail.do", {cardId: cardId}, function(msg){
                var cardDetailTpl = require("../../src/ps_receive/cardDetail.tpl");
                box.render($("#cardList"), msg, cardDetailTpl);  //我的卡券列表
                $("#cardList").show();
            });
        }
    };

    //业务逻辑
    app.init();

    $(".giveBtn").click(function(){
        if($(this).html() == "查看"){
            setup.commonAjax("bank/getJsConfig.do", {url: location.href}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.appId, // 必填，公众号的唯一标识
                    timestamp: msg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
                    signature: msg.signature,// 必填，签名，见$("#timestamp").val()附录1
                    jsApiList: ["openCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                var cardExt = '{"code":"'+app.code+'","openid":"","nonce_str":"'+ app.nonceStr
                    +'","timestamp":"'+ app.timestamp
                    + '","signature":"'+ app.signature + '"}';

                wx.ready(function(){
                    wx.openCard({
                        cardList: [{
                            cardId: app.cardId,
                            code: app.code
                        }], // 需要添加的卡券列表
                    });
                });

            });
        }else if($(this).html() == "领取"){
            setup.commonAjax("bank/getJsConfig.do", {url: location.href}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.appId, // 必填，公众号的唯一标识
                    timestamp: msg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
                    signature: msg.signature,// 必填，签名，见$("#timestamp").val()附录1
                    jsApiList: ["addCard"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                var cardExt = '{"code":"'+app.code+'","openid":"","nonce_str":"'+ app.nonceStr
                    +'","timestamp":"'+ app.timestamp
                    + '","signature":"'+ app.signature + '"}';

              wx.ready(function(){
                  wx.addCard({
                      cardList: [{
                          cardId: app.cardId,
                          cardExt: cardExt
                      }], // 需要添加的卡券列表
                      success: function (res) {
                          $(".giveBtn").html("查看");
                      }
                  });
              });

            });
        }
    });
});