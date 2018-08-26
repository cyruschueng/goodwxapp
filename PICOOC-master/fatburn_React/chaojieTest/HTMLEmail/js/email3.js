$(function(){
    var finalUrl=ajaxLink +"/v1/api/email/verify"+window.location.search;//获取商品信息
    $.ajax({
        type: "get",
        url: finalUrl,
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if(data.code == 200){
                if(data.resp.verifyResult == 0){
                    $('.emailBox .verifyBox').show();
                }else if(data.resp.verifyResult == 1){
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