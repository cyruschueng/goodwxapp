define(function(require,exports,module){
    var $ = require("jquery");
    var wx = require("wxShare");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();
    var giftId = setup.getQueryString("giftId");
    var titleName = setup.getQueryString("title");
    
    var app = {
        cardId: setup.getQueryString("cardId") || "",
        templateId: setup.getQueryString("templateId") || "",
        type: setup.getQueryString("typeId"),

        descContent: "",
        title: titleName, 
        titleShare : "我",
        desc: $(".cardInfo").val(), // 分享描述
        link: location.href.split("bankApp")[0]+"bankApp/ps_card/ps_receive.html",  // 分享链接
        shareUrl: location.href.split("bankApp")[0]+"bankApp/ps_card/ps_receive.html?cardId="+ this.cardId+"&templateId=" + this.templateId,  // 分享链接
        imgUrl: $(".banner").attr("src"),
        imgUrlShare : $(".banner").attr("src"),
        isEdit: setup.getQueryString("isEdit"), //判断是不是上传了卡面

        wxShareParams: function(){
            var me = this;
            return {
                title: me.titleShare+"有一份情意送给你！", // 分享标题
                desc:"心里有你不论心意，收下我的小礼物吧！", // 分享描述
                link: me.link,  // 分享链接
                shareUrl: me.shareUrl, // 分享链接
                imgUrl: me.imgUrlShare,
                cb: function(){
                    me.addGiftCardTransferRecord();
                }
            }
        },
        init: function(){
            var me = this;

            if(titleName){
                $("title").text(titleName);
                sessionStorage.setItem("titleSession",titleName);
            }else{
                $("title").text(sessionStorage.getItem("titleSession"));
            }
            
            if(app.type){
                sessionStorage.setItem("typeName",app.type);
                var typeS = app.type;
            }else{
                var typeS = sessionStorage.getItem("typeName");
            }
            
            $(".cardImg").attr("type",typeS);
            $("#addCard a").attr("href","ps_cardList.html?templateId="+ me.templateId+"&isEdit=true");

            if(!me.cardId || me.cardId=="null" || me.ardId=="" || me.cardId==null){
                $("#addCard").show();
                $("#cardList").hide();
            }else{
                me.getCardDetailInit(me.cardId);
                $("#addCard").hide();
                $("#cardList").show();
            }

            //判断是不是有选中的模板
            if(me.isEdit){
                var imgUrl = sessionStorage.getItem("imgUrl");
                var desc = sessionStorage.getItem("desc");
                var title = sessionStorage.getItem("title");
                var descContent = sessionStorage.getItem("descContent");
                me.descContent = descContent;
                me.imgUrl = imgUrl;
                me.desc = desc;
                me.title = title;
                $(".banner").attr("src", imgUrl);
                $(".cardInfo").val(desc);
            }else if(me.templateId && me.templateId != "null"){
                me.getGiftCardTemplateDetail(me.templateId);
            }

            //分享
            me.getJsConfig(function(){
                wx.showOptionMenu();
                var wxShare = require("../common.wxShare/index");
                var wxShareParams = me.wxShareParams();
                wxShareParams.shareUrl = location.href;
                wxShare.init(wxShareParams);
            });
        },
        getGiftCardTemplateDetail: function(templateId){
            var me = this;
            setup.commonAjax("giftCard/getGiftCardTemplateDetail.do", {id: templateId}, function(msg){
                sessionStorage.setItem("desc",  msg.content);
                sessionStorage.setItem("imgUrl", msg.imageUrl);
                sessionStorage.setItem("title", msg.name);
                sessionStorage.setItem("descContent",msg.content);
                $(".banner").attr("src", msg.imageUrl);
                $(".cardImg").attr("templateId", msg.id).attr("name",msg.name);
                $(".cardInfo").val(msg.content);
                me.imgUrl = msg.imageUrl;
                me.desc = msg.content;
                me.title = msg.name;
                app.descContent = msg.content;
                //me.isEdit = "true";
            });
        },
        getCardDetailInit: function(cardId){
            var me = this;
            setup.commonAjax("giftCard/getCardDetail.do", {cardId: cardId}, function(msg){
                var amountFloat = msg.amount.toFixed(2);
                if(amountFloat == 0.00 || amountFloat == "0.00"){
                     $(".giveBtn").html("请选择好友并赠送")
                }else{
                     $(".giveBtn").html("支付<b>"+msg.amount+"</b>元");
                }
                $("#cardList li").attr("amount",msg.amount);
                msg.templateId = me.templateId;
                msg.isEdit = me.isEdit;
                var cardDetailTpl = require("../../src/ps_give/cardDetail.tpl");
                box.render($("#cardList"), msg, cardDetailTpl);  //我的卡券
                $("#cardList").show();
                me.imgUrlShare = msg.appInfo.appImg;
            });
        },
        //礼品卡图片上传接口
        uploadImgInit: function(){
            var me = this;
            var PhotoClip = require("PhotoClip");
            var winWidth = $(window).width()*0.92;
            var winHeight = winWidth/2;
            
            var pc = new PhotoClip('#clipArea', {
                size: [winWidth,winHeight],
                outputSize: [0,0],
                //adaptive: ['100%', '100%'],
                file: '#imageFile',
                ok: '#clipBtn',
                //img: 'img/mm.jpg',
                parentBox: "clipBox",
                loadStart: function() {
                    //console.log('开始读取照片');
                },
                loadComplete: function() {
                    //console.log('照片读取完成');
                },
                done: function(dataURL) {
                    setup.commonAjax("giftCard/uploadBase64Img.do", {imgData:dataURL}, function(msg){
                        me.imgUrl = msg;
                        $(".banner").attr("src",msg);
                        $("#clipBox").hide();
                        $("#cardList a#cardDetail").attr("href", "ps_cardDetail-give.html?cardId="+me.cardId+"&isEdit=true");
                        $("#cardList a.chooseAgain").attr("href", "ps_cardList.html?cardId="+me.cardId+"&isEdit=true");
                        sessionStorage.setItem("imgUrl", msg);
                        me.isEdit = "true";
                    });
                },
                fail: function(msg) {
                    alert(msg);
                }
            });
        },
        addGiftCardTransferRecord: function(){
            var me = this;
            var amount = $("#cardList li").attr("amount");
            var orderId =  $("#cardList ul li").attr("orderId") || "";
            var params = {
                content: me.desc,
                imageUrl: me.imgUrl,
                cardId: me.cardId,
                transferredOpenid:"",
                transferredNickname: "",
                name: me.title,
                Remark: "",
                sign: me.cardCode,
                amount: amount,
                orderId: orderId,
            };
            //console.log(params)
            setup.commonAjax("giftCard/addGiftCardTransferRecord.do", params, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                location.href = "ps_shareCallback.html";
            });
        },
        getCardCode: function(){
            var me = this;
            setup.commonAjax("giftCard/getSignByCardId.do", {cardId: me.cardId}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                var redirectUrl = msg.link.split("redirectUrl=")[1].split("&appKey")[0];
                redirectUrl = decodeURIComponent(redirectUrl);
                me.cardCode = redirectUrl.split("sign=")[1];
                //console.log(msg.link)
                me.shareUrl = msg.link;
                if(msg.nickname == undefined || msg.nickname == ""){
                    me.titleShare == "我";
                }else{
                    me.titleShare = msg.nickname;
                }
                //console.log(msg.nickname)
                //分享
                me.getJsConfig(function(){
                    wx.showOptionMenu();
                    var wxShare = require("../common.wxShare/index");
                    var wxShareParams = me.wxShareParams();
                    wxShareParams.shareUrl = msg.link;
                    if(msg.nickname == undefined || msg.nickname == ""){
                        wxShareParams.title = "我有一份情意送给你！";
                    }else{
                        wxShareParams.title = msg.nickname+"有一份情意送给你！";
                    }
                    wxShare.init(wxShareParams);
                });
            });
        },
        getJsConfig: function(cb){
            var shareUrl = location.href;
            setup.commonAjax("bank/getJsConfig.do", {url: shareUrl}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.appId, // 必填，公众号的唯一标识
                    timestamp: msg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
                    signature: msg.signature,// 必填，签名，见$("#timestamp").val()附录1
                    jsApiList: ['onMenuShareAppMessage','hideOptionMenu',"showOptionMenu"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                cb && cb();
            });
        },
        //chooseModal选择模板
        chooseModal: function(){
            var typeName = $(".cardImg").attr("type");
            var params = {
                id: typeName
            };
            setup.commonAjax("giftCard/getGiftCardTemplate.do", params, function(msg){
                if(msg && msg.length > 0){
                    $("#chooseModal").show();
                    var childList = [];
                    $.each(msg, function(i,v){
                        var len = (v.template).length;
                        for(var j=0;j<len;j++){
                                childList.push({
                                id: (v.template)[j].id,
                                imageUrl: (v.template)[j].imageUrl,
                                name: (v.template)[j].name,
                                cardId: setup.getQueryString("cardId"),
                                type: (v.template)[j].type,
                            });
                        }
                    });

                    //console.log(JSON.stringify(childList,null,2))
                    var cardDetailTpl = require("../../src/ps_give/chooseModal.tpl");
                    $("#chooseModal").html("");
                    box.render($("#chooseModal"), childList, cardDetailTpl);  //我的卡券
                }else{
                    $("#chooseModal").html("<em>暂无数据！</em>").show();
                }
               /* $("#chooseModal").append("<img src='../ps_card/imgs/close1.png' class='closeModal'/>")*/
            });
        },
        payment : function(){       //付款接口
            var params = {
                giftId : giftId,
                source : "JSAPI"
            };
            setup.commonAjax("../../liujia-bank-server/giftCard/createGiftOrder.do", params, function(msg){
                // console.log(JSON.stringify(msg,null,2));
                 wx.chooseWXPay({
                     timestamp: msg.paySign.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                     nonceStr: msg.paySign.nonceStr, // 支付签名随机串，不长于 32 位
                     package: msg.paySign.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                     signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                     paySign: msg.paySign.sign, // 支付签名
                     success: function (res) {
                         // 支付成功后的回调函数
                         $(".mask").find("img").attr("src","../ps_card/imgs/guide.png");
                         $(".mask").show();
                         $("#cardList li .r").hide();
                         $(".giveBtn").html("请选择好友并赠送");
                         $("#cardList ul li").attr("orderId",msg.orderId);
                         app.getCardCode();
                     }
                 });
            });
        },
    };

    //业务逻辑
    app.init();
    app.uploadImgInit();

    //点击选择好友赠送
   $(".giveBtn").click(function(e){
        e.stopPropagation();
        if($("#cardList li").length>0){
            //$(".mask").show();
            //app.getCardCode();
            if($(".giveBtn").html() == "请选择好友并赠送"){
                $(".mask").find("img").attr("src","../ps_card/imgs/guide1.png");
                $(".mask").show();
                app.getCardCode();
            }else{
                app.payment();
            }

        }else{
            $(".markTip").show();
            setTimeout(function(){
                $(".markTip").hide();
            },2000);
        }
    });
    $(".mask").click(function(e){
        e.stopPropagation();
        $(this).hide();
    });

   /* $(window,"body").click(function(){
        $("#addCard a").attr("href","ps_cardList.html?templateId="+ app.templateId+"&isEdit=true");
        $("#cardList a").attr("href","ps_cardDetail-give.html?templateId="+ app.templateId+"&isEdit=true"+"&cardId="+ app.cardId);
        sessionStorage.setItem("desc", $(".cardInfo").text());
        sessionStorage.setItem("imgUrl", app.imgUrl);
        sessionStorage.setItem("title", $(".cardImg").attr("name"));
    });
*/
    //选择模板
    $(".chooseModal").click(function(){
        app.chooseModal();
    });
    //重新选择
    $("#cardList").delegate("li .r", "click", function(){
        var me = $(this);
        location.href = "ps_cardList.html?cardId="+app.cardId+"&templateId="+ app.templateId+"&isEdit=true&giftId="+me.attr("giftId");
    });

    //点击弹出的模板，选择模板
    $("#chooseModal").delegate(" dd", "click", function(){
        app.templateId = $(this).attr("templateId");
        $(".cardImg").attr("isEdit","true");
        app.getGiftCardTemplateDetail(app.templateId);
        $("#chooseModal").hide();
        app.isEdit = "true";
    });

    //关闭模板选择列表
    $("#chooseModal").delegate(".closeModal","click",function(){
        $("#chooseModal").hide();
    })

    //聚焦情况描述文字清空
    $(".cardInfo").on("focus",function(){
        //console.log(app.descContent)
        if($(".cardInfo").val() == app.descContent){
            $(".cardInfo").val("");
        }
    }).on("blur",function(){
        //console.log($(".cardInfo").val())
        if($(".cardInfo").val() == "" || $(".cardInfo").val() == "<br>"){
            $(".cardInfo").val(app.descContent);
        };
        sessionStorage.setItem("desc",  $(".cardInfo").val());
    })
    
});

