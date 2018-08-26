$(function(){
    if(getParamByUrl("showState") == 0){//超时
        $('.emailBox .errorBox').show();
        $('.emailBox .errorBox .errorTitle').html("抱歉");
        $('.emailBox .errorBox .errorInner').html("您点击的链接已经失效，请在有品APP中重新发送邮件。");
    }else if(getParamByUrl("showState") == 1){//正常
        $('.emailBox .passwordBox').show();
    }else{//错误页面
        $('.emailBox .errorBox').show();
        $('.emailBox .errorBox .errorTitle').html("404");
        $('.emailBox .errorBox .errorInner').html("page not found");
    }
});