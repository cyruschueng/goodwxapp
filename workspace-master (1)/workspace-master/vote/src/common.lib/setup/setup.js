define(function(require, exports, module) {
	var $ = require("jquery");
    var dialog = require("weui");

    var setupApp = {
        url:"http://"+(location.host||"wx.yinnima.com:8088")+"/", //测试
        getQueryString: function(name) { //获取URL的参数，isEit
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            //return unescape(r[2]);
            return decodeURI(r[2]);
          }
          return null;
        },
        //isBank,是否流加银行路径
        commonAjax: function(name, params, succCallback, errCallback, log, async, isBank){
            var me = this;
            $.ajax({  
                type: "POST",  
                url: isBank ? name : me.url+ name,  
                data: params,
                dataType: "json",
                async:async||true,  
                success: function(msg){
                    //alert(JSON.stringify(msg,null,2));
                    if(msg.resultCode == 1000){
                        msg && succCallback(msg.returnObject);
                    }else if(msg.resultCode == 4002 || msg.resultCode == 2008 || msg.resultCode == 2013){ 
                        dialog.alert(msg.returnObject+"！", "提示");
                    }else if(msg.resultCode == 2012){
                        //2012： 用户状态不能投票  用户状态 1 未审核 2审核通过 3审核不通过 4预警中 5 黑名单用户 6票数暂停用户 
                        if(msg.returnObject == 1){
                           dialog.alert("用户未审核！", "提示");
                        }else if(msg.returnObject == 3){
                           dialog.alert("审核不通过！", "提示");
                        }else if(msg.returnObject == 4){
                           dialog.alert("预警中！", "提示");
                        }else if(msg.returnObject == 5){
                           dialog.alert("黑名单用户！", "提示");
                        }else if(msg.returnObject == 6){
                           dialog.alert("票数暂停用户！", "提示");
                        } 
                    }else if(msg.resultCode == 1008){
                        if(log){$(".main #apply").hide(); 
                        }else{
                            //跳转页面
                            location.href = "vAppled.html?type=2&applyId=" + msg.returnObject.id +"&activityId="+ msg.returnObject.activityId + "&openId="+ msg.returnObject.openId;
                            //dialog.alert("您已报过名了！", "提示");
                        }
                    }else if(msg.resultCode == 4013){
                        dialog.alert("对不起，报名人数已满！", "提示");
                    }else if(msg.resultCode == 4007){ //活动已结束
                        dialog.alert("该活动已结束！", "提示");
                    }else if(msg.resultCode == 9998){
                        dialog.alert(msg.returnObject, "提示");
                    }else{ 
                        dialog.alert(msg.returnObject, "提示");
                    }
                }, 
                complete: function (XHR, TS) { XHR = null },
                error: function (msg) {  
                    //alert(JSON.stringify(msg,null,2));
                    if(errCallback) errCallback(msg); 
                }  
            }); 
        },
        isIE: function(){ //判断浏览器是不是IE,暂时不需要
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
        },
        isWeiXin: function(cb){
            var ua = window.navigator.userAgent.toLowerCase(); 
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                cb && cb();
            }else{ 
                location.href = "../vote/weixinerror.html";
            } 
        }
    };

    module.exports = setupApp;
});