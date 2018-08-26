var SGongGaoXiangQing={
    SCategory_SCouchGongGaoXiangQing:5070200,
    SGongGaoXiangQing_ShanChuGongGao:5070201,//删除公告
    SGongGaoXiangQing_QueRenShanChu:5070202,//确认删除
    SGongGaoXiangQing_QuXiaoShanChu:5070203,//取消删除
    SGongGaoXiangQing_BianjiGongGao:5070204//编辑公告
};
$(function(){
    /*appNoShare("公告详情");*/
    
    $("#deleteReport").unbind("click").click(function(){
        setMaiDian(SGongGaoXiangQing.SCategory_SCouchGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_ShanChuGongGao);
        $(".fixbg").css("display","block");
        $(".fixbg-main-btn1").unbind("click").click(function(event){
            setMaiDian(SGongGaoXiangQing.SCategory_SCouchGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_QueRenShanChu);
            toDeleteReport();
            $(".fixbg").css("display","none");
            event.stopPropagation();
        });
        $(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SGongGaoXiangQing.SCategory_SCouchGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_QuXiaoShanChu);
            $(".fixbg").css("display","none");
        });
    });

    $("#editReport").unbind("click").click(function(){
        setMaiDian(SGongGaoXiangQing.SCategory_SCouchGongGaoXiangQing,SGongGaoXiangQing.SGongGaoXiangQing_BianjiGongGao);
        var url="editReport.html"+location.search;
        window.location.href=url;
        /*getNewWebWiew(url);*/
    });

    //获得公告详情
    getReportDetial();
     
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
                //分享
                var userId=getParamByUrl("userId");
                var shareUrl=absoluteUrl+"reportDetial.html?noticeId="+data.resp.id+"&token=655bc92e9a2f49e6613ffb6412553cf0";
                /*var shareUrl=absoluteUrl+"reportDetial.html?noticeId="+data.resp.id+"&token=655bc92e9a2f49e6613ffb6412553cf0&userId="+userId;*/
                console.info(shareUrl);
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
                var realHeight=$(".content").offset().top+$(".content").height()+parseInt($("body").css("fontSize"))*7.5;
               /* alert(realHeight);*/
                var buttonPosition=parseInt(realHeight) > $(window).height();
                /*alert(buttonPosition);*/
                $(".reportHandel").css("display","block");
                if(buttonPosition){
                    $(".reportDetial").css("height",realHeight);
                    /*$(".reportHandel").css("position","static");
                    $(".reportHandel").css("display","block");*/
                }else{
                    /*$(".reportHandel").css("position","absolute");
                    $(".reportHandel").css("bottom","2.5rem");
                    $(".reportHandel").css("display","block");*/
                }
            }else{
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

//删除公告
function toDeleteReport(){
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campCoach/deleteNotice"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                closePage();
            }else{
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}


/*function appNoShare(title){
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
}*/

 function appShare(isShare,title,shareTitle,url,desc){
    var getPageInfo = function (){
        var data = {
            title:'公告详情',
            /*backgroundColor:'#2c2f31',
            isShare:true,
            shareTitle:shareTitle,
            shareUrl:url,
            shareIcon:'http://cdn2.picooc.com/web/res/fatburn/image/student/reportShareIcon.png',
            shareDesc:desc*/
            color:"",
            opacity:"",
            backgroundColor:"",
            backgroundOpacity:""
        };
        return JSON.stringify(data);
    };
    console.info(getPageInfo());
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.controlTitle(getPageInfo());
        }
        else{
            mobileApp.controlTitle.postMessage(getPageInfo());
        }
        //mobileApp.getShareInfo(getPageInfo());
    }
    //document.documentElement.style.webkitUserSelect='none';
    document.documentElement.style.webkitTouchCallout='none';


     //右上角
     var iconUrl = "";
     var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
     if (getParamByUrl("os") == "android") {
         iconUrl = iconShare[0];
     }
     else {
         iconUrl = iconShare[1];
     }
     var getPageInfo2 = function (){
         var data5 = {
             iconType:0,//0走图片逻辑，1走文案逻辑
             rightStr:{
                 str:"",
                 color:"",
                 opacity:"",
                 id:"0"
             },
             rightIcon:[
                 {
                     type:"1",
                     id:"1",
                     functionName:"",
                     iconUrl:iconUrl,
                     iconName:"分享",
                     redDotType:"1",
                     redDotShow:false,
                     redDotNum:"0",
                     nativeType:"0",
                     content:{
                         shareTitle:shareTitle,
                         shareUrl:url,
                         shareIcon:'http://cdn2.picooc.com/web/res/fatburn/image/student/reportShareIcon.png',
                         shareDesc:desc,
                         shareTag:"",
                         shareType:"",
                         shareBackgroundColor:"",
                         shareTypeDesc:"",
                         fatBurnName:''
                     }
                 }]
         };
         return JSON.stringify(data5);
     };
     if(getParamByUrl("os")=="android"){
         mobileApp.controlRight(getPageInfo2());
     }
     else{
         mobileApp.controlRight.postMessage(getPageInfo2());
     }
}

//关闭页面
function closePage(){
    var getPageInfo = function (){
        var data = {
            backNum:1,//默认为1，
            closeWebview:0,//默认为0
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
        if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
            if(getParamByUrl("os")=="android"){
                mobileApp.deleteHistory(getPageInfo());
            }
            else{
                mobileApp.deleteHistory.postMessage(getPageInfo());
            }
            //mobileApp.deleteHistory(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//打开一个新的webWiew
function getNewWebWiew(url){
    url=absoluteUrl+url;
    console.info(url);
    //url="http://"+location.host+"/web/fatburntest/"+url;
    var getPageInfo = function (){
        var data = {
            link:url,
            animation: 2//默认1从右到左，2从下到上
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.openWebview(getPageInfo());
        }
        else{
            mobileApp.openWebview.postMessage(getPageInfo());
        }
        //mobileApp.openWebview(getPageInfo());
    }else{
        window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}

