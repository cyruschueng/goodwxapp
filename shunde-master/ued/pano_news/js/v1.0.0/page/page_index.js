/**
 * @description: 首页登录
 * @author: Franco
 * @update:
 */

require([
    'common/interface',
    'common/util',
    'common/errCode',
    'module/cookie',
    'module/checkForm'
], function (inter, util, errCode, cookie, check) {
    $("#menuList").on("click", ".tab-link", function(){
        var href = $(this).attr("data-href");
        $(".tab-link").removeClass("active");
        $(this).addClass("active");
        $("#iframeBox").attr("src", href);
    })
    
    
    getPermission();
    function getPermission(){
        util.setAjax(inter.getApiUrl().getDirectories, {}, function (json) {
            if (json.result != "0") {
                $.alert(json.msg);
            } else {
                renderSidebar(json.data);
            }
        }, function () {
            $.alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
    function renderSidebar(data){
        var tmpl = '<li class="menu-sort">#{name}</li>';
        var tmpl1 = '<li><a href="#{link}">#{name}</a></li>';
        var tmpl2 = '<li class="tab-link" data-href="#{link}"><a>#{name}</a></li>';
        var arr = [];
        for (var i = 0; i < data.length; i++) {
            arr.push(util.template(tmpl, data[i]));
            var children = data[i].children;
            for (var j = 0; j < children.length; j++) {
                if(children[j].type == "new"){
                    arr.push(util.template(tmpl1, children[j]));
                } else {
                    arr.push(util.template(tmpl2, children[j]));
                }
            }
        }
        $("#menuList").html(arr.join(""));

        $($("#menuList").find(".tab-link")[0]).addClass("active");
    }

});