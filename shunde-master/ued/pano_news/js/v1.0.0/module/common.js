require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm'
], function (inter, util, errCode, cookie, check) {

    $(".ipt-main").on('keyup input paste',function(){
        var maxLen = $(this).attr("max-len");
        if(maxLen){
            var nowLen = $(this).val().length;
            $(this).siblings(".ipt-len-tip").text(nowLen+"/"+maxLen);
            if(nowLen > maxLen){
                $(this).addClass("ipt-err");
            } else {
                $(this).removeClass("ipt-err");
            }
        }
    })

    // $(".select-btn").click(function(event){
    //     $(this).parent().addClass("active");
    // })
    $("body").on("click", ".select-btn", function() {
        $(this).parent().addClass("active");
    });
    $("body").on("click", ".select-box li", function(){
        var selected = $(this).val();
        $(this).parents(".select-box").removeClass("active");
    });

    $(".sort-btn").click(function(){
        if($(this).hasClass("sort-up")){
            $(this).removeClass("sort-up").addClass("sort-down");
        } else {
            $(this).removeClass("sort-down").addClass("sort-up");
        }
    })

    //登录名&退登
    $("#userName").text(localStorage.userName);
    $("#logout").click(function(){
        logout();
    })
    function logout(){
        util.setAjax(inter.getApiUrl().logoutUrl, {}, function (json) {
            if (json.result != "0") {
                $.alert(json.msg);
            } else {
                localStorage.userName = '';
                window.location.href= "../index.html";
            }
        }, function () {
            // $.alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
})
