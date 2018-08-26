var SGongGaoXiangQing={
    SCategory_SGongGaoXiangQing:5061600,
    SGongGaoXiangQing_FenXiangGongGao:5061601,//分享公告
    SGongGaoXiangQing_GuanBiGouMaiTuPian:5061602,//关闭引导购买图片
    SGongGaoXiangQing_DianJiGouMaiTuPian:5061603,//点击引导购买图片
};
$(function(){
    /*appNoShare("公告详情");*/

    $(".reportDetial").css("minHeight",$(window).height());
    //获得公告详情
    getReportDetial();

    var os= getParamByUrl("os") ;
    var isApp= (os=="iOS" || os== "android") ? true : false;
    if(isApp){
        $(".ceng").css("display","none");
    }else{
        $(".reportDetial").css("paddingBottom","6.25rem");
        $(".ceng").css("display","block");
    }

    $(".cengClose").unbind("click").click(function(event){
        $(".ceng").css("display","none");
        setMaiDian(SGongGaoXiangQing.SCategory_SGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_GuanBiGouMaiTuPian);
        event.stopPropagation();
    });

    $(".ceng").unbind("click").click(function(event){
        setMaiDian(SGongGaoXiangQing.SCategory_SGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_DianJiGouMaiTuPian);
        window.location.href="https://wap.koudaitong.com/v2/goods/2fnubhl3q250o";
    });
     
})


//获得公告详情
function getReportDetial(){
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campCommon/getNoticeDesc"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                console.info(data.resp != null && data.resp != "");
                if(data.resp != null && data.resp != ""){
                    //分享
                    var userId=getParamByUrl("userId");
                    var shareUrl=absoluteUrl+"reportDetial.html?noticeId="+data.resp.id+"&token=655bc92e9a2f49e6613ffb6412553cf0";
                    //var shareUrl=absoluteUrl+"reportDetial.html?noticeId="+data.resp.id+"&token=655bc92e9a2f49e6613ffb6412553cf0&userId="+userId;
                    data.resp.content=escapeContent(data.resp.content);
                    var shareContent=data.resp.content;
                    shareContent=shareContent.replace(/<br\s*\/?>/g, "\n");
                    console.info(data.resp.content);
                    if(shareContent.length > 30){
                        shareContent=shareContent.substring(0,30)+"...";
                    }
                    appShare(true,"公告详情",data.resp.title,shareUrl,shareContent);
                    setShare(data.resp.title,shareContent,shareUrl);
                    
                    //将数据赋给页面
                    $(".title").text(data.resp.title);
                    $(".date").text(data.resp.createTime);
                    $(".content").html(data.resp.content);
                    var buttonPosition=$(".content").offset().top+$(".content").height()+parseInt($("body").css("fontSize"))*7.5 > $(window).height();
                    if(buttonPosition){
                        $(".reportHandel").css("position","relative");
                    }else{
                        $(".reportHandel").css("position","absolute");
                        $(".reportHandel").css("bottom","2.5rem");
                    }
                }else{
                    $(".container").css("display","none");
                    $(".bodyMessage").css("display","block");
                }  
            }else{
                appShare(false,"公告详情","","","");
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

/*
function appNoShare(title){
    var getPageInfo = function (){
        var data = {
            title:title,
            isShare:true,
            backgroundColor:'#2c2f31'
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.getShareInfo(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}*/

 function appShare(isShare,title,shareTitle,url,desc){
    var getPageInfo = function (){
        var data = {
            title:'公告详情',
            backgroundColor:'#2c2f31',
            isShare:isShare,
            shareTitle:shareTitle,
            shareUrl:url,
            shareIcon:'http://cdn2.picooc.com/web/res/fatburn/image/student/reportShareIcon.png',
            shareDesc:desc
        };
        return JSON.stringify(data);
    };
   /* console.info(getPageInfo());*/
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        setMaiDian(SGongGaoXiangQing.SCategory_SGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_FenXiangGongGao);
        mobileApp.getShareInfo(getPageInfo());
    }
    //document.documentElement.style.webkitUserSelect='none';
    document.documentElement.style.webkitTouchCallout='none';
}