$(function(){
    var finalUrl=ajaxLink +"/v1/api/email/getResetPasswordTimeOut"+window.location.search;//获取商品信息
    $.ajax({
        type: "get",
        url: finalUrl,
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if(data.code == 200){
                if(data.resp.isTimeOut == false){ //没有超时

                    $('.emailBox .timeOutBox').show();
                    $(".emailBox .confirm").unbind("click").click(function(){
                        var showState;
                        var newPsw = $.trim($('#newPsw').val());
                        var confirmPsw = $.trim($('#confirmPsw').val());
                        if((newPsw == confirmPsw) && (newPsw.length >= 6) && (newPsw.length <= 25) && (confirmPsw.length >= 6) && (confirmPsw.length <= 25)){
                            var confirmPswUrl = ajaxLink + '/v1/api/email/resetPassword'+ window.location.search + "&resetPassword="+ confirmPsw;//向后台提交数据
                            $.ajax({
                                type:"POST",
                                url:confirmPswUrl,
                                dataType:"json",
                                contentType: 'application/json',
                                success:function(data){
                                    if(data.code == 200){
                                        //console.log(data);
                                        if(data.resp.isTimeOut == false){//没有超时
                                            showState = 1;
                                        }else{//超时
                                            showState = 0;
                                        }
                                    }else{
                                        showState = 2; //错误页面
                                    }
                                    window.location.href = 'email5.html' + window.location.search+"&showState="+showState;
                                },
                                error:function(){
                                    showState = 2; //错误页面
                                    window.location.href = 'email5.html' + window.location.search+"&showState="+showState;
                                }
                            });
                        }else{
                            $('.emailBox .warning').show();
                        }
                    });

                }else if(data.resp.isTimeOut == true){ //已超时
                    $('.emailBox .errorBox').show();
                    $('.emailBox .errorBox .errorTitle').html("抱歉");
                    $('.emailBox .errorBox .errorInner').html("您点击的链接已经失效，请在有品APP中重新发送邮件。");
                }
            }else{
                $('.emailBox .errorBox').show();
                $('.emailBox .errorBox .errorTitle').html("404");
                $('.emailBox .errorBox .errorInner').html("page not found");
            }
        },
        error:function(){
            $('.emailBox .errorBox').show();
            $('.emailBox .errorBox .errorTitle').html("404");
            $('.emailBox .errorBox .errorInner').html("page not found");
        }
    });
});