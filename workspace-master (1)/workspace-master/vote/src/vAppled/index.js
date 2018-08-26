define(function(require,exports,module){
	var $ = require("$");
	var setup = require("setup");

    var Engine = require("engine");
    var box = Engine.init();
    //分享
    require("../common.wxShare/index");
    
    var footerNav = require("../common.footernav/index");
    var wxShare = require("../common.wxShare/index");
    
    var vote = {
        activityId: setup.getQueryString("activityId"),
        applyId: setup.getQueryString("applyId"),
        localhost: "http://"+(location.host || "wx.yinnima.com:8088"),
        getActivityApplyUser: function(activityId,applyId){
            var me = this;
            var params = {
                activityId: activityId,
                applyId: applyId
            };
            setup.commonAjax("vote/getActivityApplyUser.do", params, function(msg){ 
                //判断用户是否可以正常投票 用户状态不能投票  用户状态 1 未审核 2审核通过 3审核不通过 4预警中 5 黑名单用户 6票数暂停用户 
                //type=0，不能投票
                if(msg){
                    if(msg.userInfo.status == 1){
                        msg.userInfo.msg = "该选手报名信息已提交，请耐心等待审核！";
                        msg.userInfo.type = 0;
                    }else if(msg.userInfo.status == 3){
                        msg.userInfo.msg = "审核不通过的，非常抱歉，您的报名信息未通过审核！";
                        msg.userInfo.type = 0;
                    }else if(msg.userInfo.status == 4){
                        msg.userInfo.msg = "该选手涉嫌违规操作，已取消参赛资格！";
                        msg.userInfo.type = 0;
                    }else if(msg.userInfo.status == 5){
                        msg.userInfo.msg = "该选手涉嫌违规操作，已取消参赛资格！";
                        msg.userInfo.type = 0;
                    }else if(msg.userInfo.status == 6){
                        msg.userInfo.msg = "该选手票数暂停！";
                        msg.userInfo.type = 0;
                    }else{
                        msg.userInfo.type = 1;
                    }
                    
                    var index = require("../vAppled/index.tpl");
                    box.render($(".main"), msg, index);  

                    //判断是否在审核
                    var isCheck = setup.getQueryString("isCheck");
                    if(isCheck == "n"){
                        $(".vote").hide();
                    }else{
                        $(".vote").show();
                    }
                    var w = $(".applyImage").width();
                    $(".applyImage").css("height", w*0.7 + "px");
                    me.title = msg.title;
                }
            });
        },
        //活动投票设置
        getActivityVoteConfig: function(){
            var me = this;
            setup.commonAjax("vote/getActivityVoteConfig.do", {activityId: me.activityId}, function(msg){ 

                //给脚部报名按钮添加链接
                footerNav.init({
                    activityId: me.activityId,
                    openId: setup.getQueryString("openId"),
                    activityUrl: msg.activity.activityUrl,
                    host: location.host
                });
            });
        },
    };
    
    //渲染
    vote.getActivityApplyUser(vote.activityId, vote.applyId);
    vote.getActivityVoteConfig();


    //分享
    var params = {
        activityId: vote.activityId,
        applyId: vote.applyId
    };
    setup.commonAjax("vote/getActivityApplyUser.do", params, function(msg){ 
        wxShare.getJsConfig(msg);
    });
    return vote;
});


