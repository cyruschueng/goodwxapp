define(function(require, exports, module) {
	var $ = require("jquery");

    var setupApp = {
        url:"http://"+location.host+"/liujia-bank-server/", //测试
        getQueryString: function(name) { //获取URL的参数，isEit
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            //return unescape(r[2]);
            return decodeURI(r[2]);
          }
          return null;
        },
        commonAjax: function(name, params, succCallback, ofCallback, errCallback){
            var me = this;
            $.ajax({  
                type: "post",  
                url: me.url+ name,  
                data: params,
                dataType: "json",  
                success: function(msg){
                    if(msg.resultCode == 1000){
                        //console.log(JSON.stringify(msg,null,2));
                        msg && succCallback(msg.returnObject);
                    }else if(msg.resultCode == 2005){ //系统异常或故障
                        /*popUp({
                            "title":"错误提示",
                            "content":"卡券创建不成功！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 2000
                        });*/
                         msg && ofCallback(msg.returnObject);
                    }
                }, 
                complete: function (XHR, TS) { XHR = null },
                error: function (msg) {  
                    if(errCallback) errCallback(msg); 
                }  
            }); 
        },
        isIE: function(){ //判断浏览器是不是IE,暂时不需要
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
        }
    };

    module.exports = setupApp;
});