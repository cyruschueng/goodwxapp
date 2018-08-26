require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm'
], function (inter, util, errCode, cookie, check) {
  
    //登录名&退登
    $("#userName").text(cookie.get("username"));
    $("#logout").click(function(){
        logout();
    })
    //退出登录
    function logout(){
        util.setAjax(inter.getApiUrl().logoutUrl, {}, function (json) {
            if (json.status != "0") {
                $.alert(json.msg);
            } else {
                cookie.del('username');
                window.location.href= "login.html";
            }
        }, function () {
            // $.alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
    
    getPermission();
    $("#permissionList").on("click", ".nav-btn", function(){
        var href = $(this).find("a").attr("data-href");
        $("#iframeContent").attr("src", href);
        $(".nav-btn").find("a").removeClass("active");
        $(this).find("a").addClass("active");
    })
    iframeCall();
    setInterval(function(){
        iframeCall();
    }, 500);
    function getPermission(){
        util.setAjax(inter.getApiUrl().showYourPermissions, {}, function (json) {
            if (json.status != "0") {
                $.alert(json.msg);
            } else {
                renderSidebar(json.data);
            }
        }, function () {
            $.alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
    function renderSidebar(data){
        var tmpl1 = '<li class="nav-header"><a class=""><i class="icon icon-actives"></i>#{functionName}</a></li>';
        var tmpl2 = '<li class="nav-btn"><a data-href="#{functionUrl}" #{hasClass}>#{functionName}</a></li>';
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(util.template(tmpl1, data[i].FatherFunction));
            var children = data[i].ChildrenFunction;
            for (var j = 0; j < children.length; j++) {
                if(i == 0 && j == 0){
                    children[j].hasClass = 'class="active"';
                } else {
                    children[j].hasClass = '';
                }
                arr.push(util.template(tmpl2, children[j]));
            }
        }
        $("#permissionList").html(arr.join(""));
    }
    function iframeCall(){
        var contentHeight = $("#iframeContent").contents().find(".cemp-container").height() + 60;
        var windowHeight = $(window).height();
        var iframe = $("#iframeContent")[0];
        iframe.height = contentHeight > windowHeight ? contentHeight : windowHeight;
        // var oldHeight = $("#iframeContent").height();
        // console.log($("#iframeContent").contents().find("body").height());
        // console.log($("#iframeContent")[0].contentDocument.body.scrollHeight);
        // $("#iframeContent").attr("scrolling", "no");
        // $("#iframeContent").height($("#iframeContent").contents().find("body")[0].scrollHeight);
    }
});