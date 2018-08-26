var $, tab, skyconsWeather, navs = [],tempNavs=[];
layui.config({
    base: "/content/js/"
}).use(['bodyTab', 'form', 'element', 'layer', 'jquery'], function() {
    var form = layui.form(),
        layer = layui.layer,
        element = layui.element();
    $ = layui.jquery;
    tab = layui.bodyTab();

    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade');

    treeMobile.on('click', function() {
        $('body').addClass('site-mobile');
    });

    shadeMobile.on('click', function() {
        $('body').removeClass('site-mobile');
    });

    // 添加新窗口
    $("body").on("click", ".left-nav .left-nav-item a", function () {
        addTab($(this));
        $(this).parent("li").siblings().removeClass("layui-nav-itemed");
    });

    $("body").on("click", ".top_menu .layui-nav-item .layui-nav-child a", function () {
        if ($(this).data('type') && $(this).data('type') == "action") {
            window.location = $(this).data('url');
        } else {
            addTab($(this));
        }
    });

    //刷新后还原打开的窗口
    if (window.sessionStorage.getItem("menu") != null) {
        var menu = JSON.parse(window.sessionStorage.getItem("menu"));
        var curmenu = window.sessionStorage.getItem("curmenu");
        var openTitle = '';
        for (var i = 0; i < menu.length; i++) {
            openTitle = '';
            if (menu[i].icon.split("-")[0] == 'icon') {
                openTitle += '<i class="iconfont ' + menu[i].icon + '"></i>';
            } else {
                openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
            }
            openTitle += '<cite>' + menu[i].title + '</cite>';
            openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
            element.tabAdd("bodyTab", {
                title: openTitle,
                content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                id: menu[i].layId
            });
            //定位到刷新前的窗口
            if (curmenu != "undefined") {
                if (curmenu == '' || curmenu == "null") { //定位到后台首页
                    element.tabChange("bodyTab", '');
                } else if (JSON.parse(curmenu).title == menu[i].title) { //定位到刷新前的页面
                    element.tabChange("bodyTab", menu[i].layId);
                }
            } else {
                element.tabChange("bodyTab", menu[menu.length - 1].layId);
            }
        }
    }

    function showMenu(currentNavs) {
        $(".navBar").html(navBar(currentNavs)).height($(window).height() - 230);
        element.init(); //初始化页面元素
        $(window).resize(function () {
            $(".navBar").height($(window).height() - 230);
        });
    }
    function filterNavs(currentModuleId) {
        $.each(tempNavs, function (i, obj) {
            if (obj.ModuleId == currentModuleId) {
                navs.push(obj);
            }
        });
    }

    tempNavs = getTempNavs();
    filterNavs(1);
    showMenu(navs);

    $(".top_menu .top_menu_item").on("click", function () {
        navs = [];
        var $self = $(this);
        var moduleId = $self.data('moduleId');
        filterNavs(moduleId);
        showMenu(navs);
    });

    $(".layui-body").on("click", "[lay-filter] cite", function (e) {
        var layId = $(this).closest("[lay-id]").attr("lay-id");
        if (layId) {
            layer.confirm('是否刷新页面？', {
                btn: ['是', '否'] //按钮
            }, function (index) {
                $(".layui-show").find("iframe").attr("src", $(".layui-show").find("iframe").attr("src"));
                layer.close(index);
            }, function () {
                
            });
        }
    });

    $(".layui-body").on("contextmenu", function (e) {

        e.preventDefault();

    });
    
    $(".layui-body").on("contextmenu", "[lay-filter] .layui-this cite", function (e) {

        e.preventDefault();

    });
    
});

//打开新窗口
function addTab(tabObj){
    tab.tabAdd(tabObj);
}
