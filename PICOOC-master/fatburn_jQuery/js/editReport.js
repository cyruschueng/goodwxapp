var SEditReport={
    SCategory_SEditReport:5070220,
    SEditReport_BiaoTi:5070221,//标题
    SEditReport_ZhengWen:5070222,//正文
    SEditReport_XuanZeBanJi:5070223,//选择班级
    SEditReport_FaBu:5070224//发布
};
var titleLegal=false;
var contentLegal=false;
var classLegal=false;
var hasChoice="";
$(function(){
    appNoShare("编辑公告");
    leftControl();
    getReportDetial();

    //设置埋点（注意input用的是获取焦点focus事件）
    $('#titleInput').unbind("focus").focus(function(){
        setMaiDian(SEditReport.SCategory_SEditReport,SEditReport.SEditReport_BiaoTi);
    });
    $('.contentCount').unbind("focus").focus(function(){
        setMaiDian(SEditReport.SCategory_SEditReport,SEditReport.SEditReport_ZhengWen);
    });

    //初始化数据
    if($("#titleInput").val() != null && $(".titleInput").val() != ""){
        titleLegal=true;
        $(".titleCount").html($("#titleInput").val().length+"/20");
    }
    if($(".contentCount").val() != null && $(".contentCount").val() != ""){
        contentLegal=true;
        $(".contentCount").html($("#contentInput").val().length+"/500");
    }
     
    $(".publishBtn").unbind("click").click(function(){
        setMaiDian(SEditReport.SCategory_SEditReport,SEditReport.SEditReport_FaBu);
        if($(".publishBtn").hasClass("canPublish")){
            var title=$("#titleInput").val();
            var content=$("#contentInput").val();
            console.info(content);
            content=content.replace(/^\n+|\n+$/g,"");
            console.info(content);
            //对特殊字符转义
            content=content.replace(/\%/g, "%25");
            content=content.replace(/\&/g, "%26");
            content=content.replace(/\+/g, "%2B");
            content=content.replace(/\#/g, "%23");
            content=content.replace(/\n/g, "<br />");
            var campIds=hasChoice;
            console.info("------"+hasChoice);
            var coachRoleId=getParamByUrl("roleId");
            var noticeId=getParamByUrl("noticeId");
            //var reportData='{coachRoleId:'+'"'+coachRoleId+'"'+',title:'+'"'+title+'"'+',content:'+'"'+content+'"'+',campIds:'+'"'+campIds+'"'+',id:'+'"'+noticeId+'"'+'}';
            //var reportData='"coachRoleId":'+'"'+coachRoleId+'"'+',"title":'+'"'+title+'"'+',"content":'+'"'+content+'"'+',"campIds":'+'"'+campIds+'"'+',"id":'+'"'+noticeId+'"';
            var reportData="{"+'"coachRoleId":'+'"'+coachRoleId+'"'+',"title":'+'"'+title+'"'+',"content":'+'"'+content+'"'+',"campIds":'+'"'+campIds+'"'+',"id":'+'"'+noticeId+'"'+"}";
            console.info(reportData);
            publishReport(reportData);
        }

    });
})

//请求服务器，发布公告
function publishReport(reportData){
    var str="";
    var url=window.location.search.substring(1);
    var arr=url.split("&");
    var result=[];

   /* reportData=JSON.stringify(reportData);
    reportData=JSON.parse(reportData);*/
    
    console.log(typeof reportData);
    var host=window.location.protocol+"//"+window.location.host;
    /*var finalUrl=host+"/v1/api/campCoach/postNotice";*/
    var finalUrl=host+"/v1/api/campCoach/postNotice"+window.location.search;
    console.info(reportData);
    console.info(finalUrl);
    $.ajax({
        type:"POST",
        data:reportData,
        url:finalUrl,
        dataType:"json",
        contentType: 'application/json',
        success:function(data){
            if(data.code == 200){
                closePage();
            }else{
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

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
                $("#titleInput").text(data.resp.title);
                $("#titleInput").css("height",$("#titleInput").get(0).scrollHeight+"px");
                data.resp.content=data.resp.content.replace(/<br\s*\/?>/gi,"\r\n");
                $("#contentInput").html(data.resp.content);
                $(".titleCount").html($("#titleInput").val().length+"/20");
                $(".contentCount").html($("#contentInput").val().length+"/500");
                var btnHtml="";
                hasChoice="";
                $(".allClass").empty();
                for(var i=0;i<data.resp.historyCanChooseCamp.length;i++){
                    var btnClass='<div class="class-item" id="'+data.resp.historyCanChooseCamp[i].campId+'">'+data.resp.historyCanChooseCamp[i].campName+'</div>';
                    for(var j=0;j<data.resp.campIds.length;j++){
                        console.info(data.resp.campIds[j] +"||" +data.resp.historyCanChooseCamp[i].campId);
                        if(data.resp.campIds[j] == data.resp.historyCanChooseCamp[i].campId){
                            btnClass='<div class="class-item active" id="'+data.resp.historyCanChooseCamp[i].campId+'">'+data.resp.historyCanChooseCamp[i].campName+'</div>';
                            hasChoice+=data.resp.campIds[j]+"-";
                        }
                    }
                    btnHtml+=btnClass;
                }
                $(".allClass").append(btnHtml);
                //设置提交状态
                titleLegal=true;
                contentLegal=true;
                classLegal=true;
                //设置按钮
                chooseClassBtn();
                hasChoice=hasChoice.substring(0,hasChoice.length-1); 
                console.info("hasChoice"+hasChoice);
                if(titleLegal && contentLegal && classLegal){
                    $(".publishBtn").addClass("canPublish");
                }else{
                    $(".publishBtn").removeClass("canPublish");
                }
            }else{
                    $(".error-main-t").html("服务器开小差了～");
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}



$('#titleInput').bind('input propertychange', function() {  
    var limit=20;
    var str=$(this).val(); 
    var charLen; 
    var byteLen=0; 
    var isAllSpace=$(this).val().replace(/\s/g,"") =='' ? true:false;
    byteLen=str.length; 
    if(byteLen <= limit && byteLen >= 0){
        /*$(".titleCount").html(byteLen+"/20");
        titleLegal=true;*/
        //内容不为空
        if(!isAllSpace){
            titleLegal=true;
        }else{
            titleLegal=false;
        }
        $(".titleCount").html(byteLen+"/20");
    }else{
        if(byteLen > limit){
            $(".titleCount").html("<span style='color:#fb5562;'>"+byteLen+"</span>/20");
        }
        titleLegal=false;
    }
    /*console.info(titleLegal+"||"+contentLegal+"|"+classLegal);*/
    if(titleLegal && contentLegal && classLegal){
        $(".publishBtn").addClass("canPublish");
    }else{
        $(".publishBtn").removeClass("canPublish");
    }

    if(byteLen > 0){
        $("#titleInput2").text(str);
    }

    realTitleHright=$("#titleInput2").css("height");
    $(this).css("height",realTitleHright);
}); 

$('#contentInput').bind('input propertychange', function() {  
    var limit=500;
    var str=$(this).val(); 
    var charLen; 
    var byteLen=0; 
    var isAllSpace=$(this).val().replace(/\s/g,"") =='' ? true:false;
    byteLen=str.length; 
    /*console.info(byteLen <= limit && byteLen > 0);*/
    if(byteLen <= limit && byteLen >= 0){
        /*$(".contentCount").html(byteLen+"/500");
        contentLegal=true;
        console.info(contentLegal);*/
        $(".contentCount").html(byteLen+"/500");
        if(!isAllSpace){
            contentLegal=true;
        }else{
            contentLegal=false;
        }
        console.info(contentLegal);
    }else{
        if(byteLen > limit){
            $(".contentCount").html("<span style='color:#fb5562;'>"+byteLen+"</span>/500");
        }
        contentLegal=false;
    }
    /*console.info(titleLegal+"||"+contentLegal+"|"+classLegal);*/
    if(titleLegal && contentLegal && classLegal){
        $(".publishBtn").addClass("canPublish");
    }else{
        $(".publishBtn").removeClass("canPublish");
    }
}); 

//对选择班级按钮设置
function chooseClassBtn(){
    $(".allClass .class-item").each(function(index){
        $(this).unbind("click").click(function(){
            setMaiDian(SEditReport.SCategory_SEditReport,SEditReport.SEditReport_XuanZeBanJi);
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
            hasChoice="";
            $(".active").each(function(){
                hasChoice+=$(this).attr("id")+"-";
            });
            if(hasChoice.length != 0){
                hasChoice=hasChoice.substring(0,hasChoice.length-1); 
                classLegal=true;
            }else{
                classLegal=false;
            }
           /* console.info(titleLegal+"||"+contentLegal+"|"+classLegal);*/
            if(titleLegal && contentLegal && classLegal){
                $(".publishBtn").addClass("canPublish");
            }else{
                $(".publishBtn").removeClass("canPublish");
            }
            /*console.info(hasChoice);*/
        });
    });
}

/////////////////////////客户端
//页面标题设置
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

//左上角关闭页面时控制返回按钮
function leftControl(){
    var getPageInfo = function (){
        var data = {
            iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
            backNum:1,//1为正常后退，
            closeWebview:0,//默认为0
            iconUrl:""
        };
        return JSON.stringify(data);
    }
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.showLeftBtn(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
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
        mobileApp.deleteHistory(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}