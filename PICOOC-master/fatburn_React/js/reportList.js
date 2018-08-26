var SGongGaoLieBiao={
    SCategory_SGongGaoLieBiao:5061500,
    SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing:5061501,//跳转到公告详情页
};
$(function(){
    appNoShare("公告列表");
    //获得公告列表
    getReportList();
})

//获得公告列表
function getReportList(){
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campStu/noticeList"+window.location.search;
    console.info(finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            console.info(data);
            if(data.code == 200){
                var reportList=data.resp;
                var reportHtml="";
                $(".reportList").empty();
                for(var i=0;i<reportList.length;i++){
                    //对内容进行转义（特殊部分处理）
                    reportList[i].content=escapeContent(reportList[i].content);
                    
                    var reportDetialUrl="'"+"reportDetial.html"+location.search+"&noticeId="+reportList[i].id+"'";
                    reportHtml+='<div class="report-item" onclick="getNewWebWiew('+reportDetialUrl+')">'
                                    +'<div class="item-title">'+reportList[i].title+'</div>'
                                    +'<div class="item-content">'+reportList[i].content+'</div>'
                                    +'<div class="item-date">'+reportList[i].createTime+'</div>'
                                    +'<div class="item-icon"></div>'
                                +'</div>';
                }
                $(".reportList").append(reportHtml);
                /*$(".reportList").find(".report-item").each(function(){
                    var module = $(this).find(".item-content");
                    $clamp(module, {clamp: 3});
                });*/
            }
        }
    });
}


function appNoShare(title){
    var getPageInfo = function (){
        var data = {
            title:title,
            isShare:false,
            backgroundColor:'#2c2f31'
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.getShareInfo(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//打开一个新的webWiew
function getNewWebWiew(url){
    url=absoluteUrl+url;
    console.info(url);
    setMaiDian(SGongGaoLieBiao.SCategory_SGongGaoLieBiao,SGongGaoLieBiao.SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing);
    //url="http://"+location.host+"/web/fatburntest/"+url;
    var getPageInfo = function (){
        var data = {
            link:url,
            animation: 1//默认1从右到左，2从下到上
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.openWebview(getPageInfo());
    }else{
        window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}