//初始化查询
function initSearch (num,api){
    var param = new Object;
    param.num = num;
    $.ajax({
        url: "http://localhost:3000/MiddleWare/" + api,
        dataType: "json",
        async: true,
        data: param,
        type: "POST",
        success: function(msn) {
            //列表数据
            var data = msn.aaData;
            var view = $("#view");
            var tpl = $("#tpl").html();
            view.empty();
            showData(view,tpl,data);

            // 分页数据
            var data2 = msn.page;
            var allPages = parseInt(data2[0].count/10) + 1;// 总页数
            data2[0].pages = allPages;
            var pageView = $("#pageView");
            var pageTpl = $("#pageTpl").html();
            pageView.empty();
            showData(pageView,pageTpl,data2);
        }
    })
}


 //下一页
var num = 0;
function nextPage (num,api){
    var allPages = $("#all").html();
    num += 1;
    if (num >= allPages) {
        num = allPages -1;
    }
    initSearch(num,api)
}

//上一页
function prevPage (){
    num -= 1;
    if(num <= 0){
        num = 0
    };
    initSearch(num,api);
}


//显示数据方法
var showData = function(view, tpl, data) {
    if(data.length > 0) {
        var str = "";
        for(var num in data) {
            laytpl(tpl).render(data[num], function(html) {
                str += html;
            });
        }
        view.append(str);
    } else {
        noData(view);
    }
}

//无数据
noData = function(view, error, url) {
    if(!error)
        error = "去逛街吧~~~"
    if(!url)
        url = ""
    var childList = view.childNodes;
    var str = "<div class='container qc_padding '><div class='row '><div class='col - xs - 12 '><p class='sc_xylg '><img src='img/sy_logo.png'></p><p class='sc_xygggj '><span class='sc_xydn '>小源带你</span><a class='sc_qggb ' onclick=loadmain1({action:'" + url + "'})><span>" + error + "</span></a><span class='sc_golj ' onclick=loadmain1({action:'" + url + "'})>GO~</span></p></div></div></div>"
    // 清空容器
    for(var num in childList) {
        view.removeChild(childList[num]);
    }
    // 将空白信息填入容器
    str = "暂无数据";
    view.append(str);
}

//获取页面传参
function GetRequest() {
    var url = location.href; //获取url中"?"符后的字串
    var theRequest = new Object();
    if(url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

$(".sidebar-title").live('click', function() {
    if ($(this).parent(".sidebar-nav").hasClass("sidebar-nav-fold")) {
        $(this).next().slideDown(200);
        $(this).parent(".sidebar-nav").removeClass("sidebar-nav-fold");
    } else {
        $(this).next().slideUp(200);
        $(this).parent(".sidebar-nav").addClass("sidebar-nav-fold");
    }
});