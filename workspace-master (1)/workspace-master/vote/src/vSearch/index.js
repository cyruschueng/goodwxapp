define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");

    var Engine = require("engine");
    var box = Engine.init();

    var footerNav = require("../common.footernav/index");

    var vote = {
    	activityId: setup.getQueryString("activityId"),
    	applyId: setup.getQueryString("applyId"),
    	name: setup.getQueryString("name"),
    	playInfor: setup.getQueryString("search"),

    	listActivityApplyUser:function(params){
    		var me = this;
    		
            setup.commonAjax("vote/listActivityApplyUser.do", params, function(msg){ 
                //console.log(JSON.stringify(msg,null,2));
                if(msg.length<1){
                    $(".main .inforTab .noInfor").show().siblings().hide();
                }else{
                    $(".main .inforTab .noInfor").hide().siblings("ul").show();

                    $.each(msg, function(i,v){
                        v.voteOpenid = setup.getQueryString("openId");
                    });
                    var search = require("../vSearch/search.tpl");
                    box.render($(".inforTab ul"), msg, search);
                }
            });
    	},
        //banner
        getActivityVoteConfig: function(){
            var me = this;
            setup.commonAjax("vote/getActivityVoteConfig.do", {activityId: me.activityId}, function(msg){ 
                var banner = msg.activity.mainImgUrl; 
                $(".banner").html("<img src = '"+banner+"' >");  

                var w = $(window).width();
                $(".banner img").css({"height": (w/2).toFixed(0)+"px"}); 

                //给脚部报名按钮添加链接
                footerNav.init({
                    activityId: me.activityId,
                    openId: setup.getQueryString("openId"),
                    activityUrl: msg.activity.activityUrl,
                    host: location.host
                });           
            });
        },
        checkParams: function(name){
            var reg = new RegExp("^[0-9]*$");
            var params = {};

            if(!reg.test(name)){
                params.name = name;
            }else{
                params.applyId = name;
            }
            params.activityId = vote.activityId;
            vote.listActivityApplyUser(params); 
        }
    };

    $(".realtimeInfor input").val(vote.playInfor);
    vote.checkParams(vote.playInfor); 
    vote.getActivityVoteConfig(); 

    //搜索
    /*$(".search input").keydown(function(event){ //键盘事件，按下按键触发
        if (event.keyCode==13){
            var playInfor = $(this).val();
            vote.checkParams(playInfor);
        };
    });*/
    $(".main .checkSear").delegate("#weSearch", "click", function () {
        var playInfor = $(".search input").val();

        vote.checkParams(playInfor);
    });
});