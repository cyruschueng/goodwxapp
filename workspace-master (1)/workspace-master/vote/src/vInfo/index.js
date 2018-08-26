define(function(require,exports,module){
    var $ = require("$");
    var setup = require("setup");
    
    var Engine = require("engine");
    var box = Engine.init();


    var vote = {
        activityId: setup.getQueryString("activityId"),
        getAcInfor: function(activityId){
            var me = this;
            var params = {
                activityId: activityId,
            };
            setup.commonAjax("vote/getActivityVoteConfig.do", params, function(msg){ 
                //console.log(JSON.stringify(msg,null,2));
                var vInfo = require("../vInfo/vInfo.tpl");
                box.render($(".main"), msg.voteConfig, vInfo);  
            });
        }
    };

    vote.getAcInfor(vote.activityId);
});