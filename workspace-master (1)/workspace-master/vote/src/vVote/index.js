define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");
    var dialog = require("../common.WeUi/index");
    var Engine = require("engine");
    var box = Engine.init();
    //分享
    require("../common.wxShare/index");

    var footerNav = require("../common.footernav/index");
    var wxShare = require("../common.wxShare/index");

    var vote = {
        activityId: setup.getQueryString("activityId"),
        applyId: setup.getQueryString("applyId"),
        applyName: setup.getQueryString("applyName"),
        applyOpenid: setup.getQueryString("applyOpenid"),
        voteOpenid: setup.getQueryString("voteOpenid"),
        localhost: "http://"+(location.host || "wx.yinnima.com:8088"),
        //排名查询
        getActivityApplyUser: function(activityId,applyId,name, cb){
            var me = this;
            var params = {
                activityId: activityId,
                applyId: applyId
            };
            setup.commonAjax("vote/getActivityApplyUser.do", params, function(msg){ 
                //alert(JSON.stringify(msg,null,2));
                //判断用户是否可以正常投票 用户状态不能投票  用户状态 1 未审核 2审核通过 3审核不通过 4预警中 5 黑名单用户 6票数暂停用户 
                //type=0，不能投票
                if(msg.userInfo.status == 1){
                    msg.userInfo.msg = "报名信息已提交，请耐心等待审核！";
                    msg.userInfo.type = 0;
                }else if(msg.userInfo.status == 3){
                    msg.userInfo.msg = "非常抱歉，您的报名信息未通过审核！";
                    msg.userInfo.type = 0;
                }else if(msg.userInfo.status == 5){
                    msg.userInfo.msg = "该选手涉嫌违规操作，已取消参赛资格！";
                    msg.userInfo.type = 0;
                }else if(msg.userInfo.status == 6){
                    msg.userInfo.msg = "暂时无法为该选手投票！";
                    msg.userInfo.type = 0;
                }else{
                    msg.userInfo.type = 1;
                }

                if(setup.getQueryString("isMe")){
                    msg.userInfo.isMe = 1;
                }else{
                    msg.userInfo.isMe = 0;
                }

                var vVote = require("../vVote/vVote.tpl");
                box.render($(".main"), msg, vVote); 

                me.applyName = msg.userInfo.name;
                me.applyOpenid = msg.userInfo.openId;

                cb && cb(msg);
                setup.commonAjax("vote/getActivityVoteConfig.do", params, function(msg){ 
                    //alert(JSON.stringify(msg,null,2));
                    $(".ticketCon .needKnow").html("活动规则：" +msg.voteConfig.voteNotice +"。");
                    var w = $(window).width();
                    $(".banner").html("<img src="+msg.activity.mainImgUrl+" />");
                    $(".banner img").css({"max-height": (w/2).toFixed(0)+"px"});


                    //给脚部报名按钮添加链接
                    footerNav.init({
                        activityId: me.activityId,
                        openId: me.voteOpenid,
                        activityUrl: msg.activity.activityUrl,
                        host: location.host
                    });
                });
            });
        },
        //投票
        activityVote: function(){
            var me = this;
            var params = {
                activityId: me.activityId,
                applyId: me.applyId,
                applyName: me.applyName,
                applyOpenid: me.applyOpenid,
                voteOpenid: me.voteOpenid
            };
            setup.commonAjax("vote/activityVote.do", params, function(msg){ 
                var msg = msg ? ("恭喜你获得了" + msg +"！"): ""; 
                dialog.alert("投票成功！" + msg, "提示");
            });
        },
    };

    

    //判断是不是在微信中打开
    setup.isWeiXin(function(){
        //获取用户信息
        vote.getActivityApplyUser(vote.activityId, vote.applyId, vote.name);

        //点击投票
        $(".main").delegate("#vote", "click", function(){
            vote.activityVote();    
        });


        //分享
        var params = {
            activityId: vote.activityId,
            applyId: vote.applyId
        };
        setup.commonAjax("vote/getActivityApplyUser.do", params, function(msg){ 
            wxShare.getJsConfig(msg);
        });
    });
});