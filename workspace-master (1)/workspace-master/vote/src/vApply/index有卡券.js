define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");

    var Engine = require("engine");
    var box = Engine.init();
    var wx = require("wxShare");
    var dialog = require("../common.WeUi/index");

    var footerNav = require("../common.footernav/index");
    footerNav.init({
        activityId: setup.getQueryString("activityId"),
        openId: setup.getQueryString("openId"),
    });

    var vote = {
        activityId: setup.getQueryString("activityId"),
        applyId: setup.getQueryString("applyId"),
        openId: setup.getQueryString("openId"),
        localhost: "http://"+(location.host || "wx.yinnima.com:8088"),
        //活动报名
        activityApply: function(){
            var me = this;
            var name = $("#name").val();
            var phone = $("#phone").val();
            var applySlogan = $("#applySlogan").val();
            var image = $(".image").attr("src")

            if(!name || !phone || !image){
                return false;
            }

            var params = {
                activityId: me.activityId,
                openId: me.openId,
                name: name,
                phone: phone,
                applySlogan: applySlogan,
                image: image
            };
            setup.commonAjax("vote/activityApply.do", params, function(msg){ 
                //console.log(JSON.stringify(msg,null,2));  
                /*{
                  "cardList": [],
                  "applyId": 24,
                  "isCheck": "n"
                }*/

                //判断是不是活动是不是在审核
                if(msg.isCheck != "n"){
                    dialog.alert("报名成功，请耐心等待审核！", "提示", function(){
                        //添加卡券
                        //if(msg) me.addCard(msg);
                        //跳转页面
                        location.href = "vAppled.html?type=2&applyId=" + msg.applyId +"&activityId="+me.activityId + "&openId="+ me.openId+"&isCheck=n");
                    });
                }else{
                    dialog.alert("报名成功！恭喜您获得了海洋公园价值120元的电子券礼包！", "提示", function(){
                        //添加卡券
                        //if(msg) me.addCard(msg);
                        //跳转页面
                        location.href = "vAppled.html?type=2&applyId=" + msg.applyId +"&activityId="+me.activityId + "&openId="+ me.openId;
                    });
                }
                
            });
        },
        //图片上传
        uploadImgInit: function(){
            var me = this;
            var PhotoClip = require("../common.photoClip/PhotoClip");
            var winWidth = $(window).width()*0.92;
            var winHeight = winWidth*0.7;
            
            var pc = new PhotoClip('#clipArea', {
                size: [winWidth,winHeight],
                outputSize: [0,0],
                file: '#imageFile',
                ok: '#clipBtn',
                parentBox: "clipBox",
                loadStart: function() {
                    $("body").css({"height": "100%", "overflow": "hidden"});
                    //alert('开始读取照片');
                },
                loadComplete: function() {
                    //alert('照片读取完成');
                },
                done: function(dataURL) {
                    //alert(dataURL);
                    //alert(me.localhost +"/liujia-bank-server/giftCard/uploadBase64Img.do");
                    setup.commonAjax("vote/uploadBase64Img.do", {imgData:dataURL}, function(msg){
                        //alert(msg);
                        me.imgUrl = msg;
                        $(".image").attr("src",msg);
                        $("#clipBox").hide();
                        $("body").attr("style", "");
                    });
                },
                fail: function(msg) {
                    console.log(msg);
                }
            });
        },
        checkSloganCount: function(self){
            var max = $('#count_max').text();
            var text = self.val();
            var len = text.length;   
            $('#count').text(len);    
            if(len > max){
                self.parents('.weui-cell').addClass('weui-cell-warn');
            }else{
                self.parents('.weui-cell').removeClass('weui-cell-warn');
            }     
        },
        //添加卡券到微信卡券
        addCard: function(msg, log){
            var me = this;
            var cardListRet = [];
            console.log(JSON.stringify(msg,null,2));
            msg = log ? msg : msg.cardList;
            if(msg.length>0){
                $.each(msg, function(i,v){
                    var cardExt = '{"code":"'+v.code+'","openid": '+me.openId+ ',"nonce_str":"'+ v.nonceStr
                        +'","timestamp":"'+ v.timestamp + '","signature":"'+ v.signature + '"}';
                    console.log(cardExt);   
                    cardListRet.push({
                        cardId: v.cardId,
                        cardExt: cardExt
                    });
                });

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg[0].appId, // 必填，公众号的唯一标识
                    timestamp: msg[0].timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg[0].nonceStr, // 必填，生成签名的随机串
                    signature: msg[0].signature,// 必填，签名，见$("#timestamp").val()附录1
                    jsApiList: ['addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                    
                wx.ready(function(){
                  wx.addCard({
                      cardList: cardListRet, // 需要添加的卡券列表
                      success: function (res) {
                        console.log("成功");  
                        //$(".giveBtn").html("查看");
                      }
                  });
                });
            }
        },
        //banner
        getActivityVoteConfig: function(){
            var me = this;
            setup.commonAjax("vote/getActivityVoteConfig.do", {activityId: me.activityId}, function(msg){ 
                var banner = msg.activity.mainImgUrl; 
                $(".banner").html("<img src = '"+banner+"' >");  

                var w = $(window).width();
                $(".banner img").css({"height": (w/2).toFixed(0)+"px"});            
            });
        },
        checkHasApply: function(){
            var me = this;
            var params = {
                activityId: me.activityId,
                openId: me.openId,
            };
            setup.commonAjax("vote/checkHasApply.do", params, function(msg){ 
                $("#wrap").show();
                //图片上传
                vote.uploadImgInit();
                vote.getActivityVoteConfig(msg);
            });
        }

    };


    vote.checkHasApply();


    //输入宣言时提示  
    $('#applySlogan').on('input', function(){
        vote.checkSloganCount($(this));   
    });

    //点击我要报名
    $("#submitform").on("submit", function(ev){
        vote.activityApply();
        ev.preventDefault(); 
        return false;
    }); 

    return vote.addCard;
});