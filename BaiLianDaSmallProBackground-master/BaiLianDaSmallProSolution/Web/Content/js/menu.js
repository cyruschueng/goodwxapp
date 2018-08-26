function getTempNavs() {
    var myNav = [];
    layui.config({
        base: "/content/js/"
    }).use(['jquery'], function () {
        var $ = layui.jquery;
        $.ajax({
            url: "/LayUI/LayUiMenu/GetMenuJson",
            type: "post",
            data: "json",
            async: false,
            success: function (data) {
                myNav = data;
                var tempMyNav = [
        {
            "Title": "后台首页",
            "Icon": "icon-computer",
            "Href": "/page/main",
            "Spread": false,
            "ModuleId": 1
        }, {
            "Title": "文章列表",
            "Icon": "icon-text",
            "Href": "/page/NewsList",
            "Spread": false,
            "ModuleId": 1
        },
        {
            "Title": "友情链接",
            "Icon": "icon-text",
            "Href": "page/links/linksList.html",
            "Spread": false,
            "ModuleId": 1
        }, {
            "Title": "404页面",
            "Icon": "&#xe61c;",
            "Href": "page/404.html",
            "Spread": false,
            "ModuleId": 2
        }, {
            "Title": "系统基本参数",
            "Icon": "&#xe631;",
            "Href": "page/systemParameter/systemParameter.html",
            "Spread": false,
            "ModuleId": 2
        }, {
            "Title": "LayUi框架",
            "Icon": "icon-computer",
            "Href": "/admin/layui",
            "Spread": false,
            "ModuleId": 3
        }, {
            "Title": "二级菜单演示",
            "Icon": "&#xe61c;",
            "Href": "",
            "Spread": false,
            "Children": [
                {
                    "Title": "二级菜单1",
                    "Icon": "&#xe631;",
                    "Href": "",
                    "Spread": false
                },
                {
                    "Title": "二级菜单2",
                    "Icon": "&#xe631;",
                    "Href": "",
                    "Spread": false
                }
            ],
            "ModuleId": 2
        }
                ];

            }
        });
        
    });
    
    return myNav;
}