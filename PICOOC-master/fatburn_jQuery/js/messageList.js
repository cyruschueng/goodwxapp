var SXiaoXiLieBiao={
    SCategory_SXiaoXiLieBiao:5060600,
    SXiaoXiLieBiao_QianWangXiaoXiXiangQing:5060601,//前往消息详情
    SXiaoXiLieBiao_ChaKanGengZaoHuiFu:5060602//查看更早回复
};
$(function(){
    if(getParamByUrl("messageFrom") == 2){
        getNoReadList(2);
    }else{
        getNoReadList(1);
    }
   
    appNoShare();
    /*closeWebview();*/
    /*setCookiePath("test1","noMsg",1,"/;domain=picooc.com");*/
    
})
function appNoShare(){
    var getPageInfo = function (){
        var data = {
            title:'消息列表',
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

function getNoReadList(type){
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/camp/getReplyList"+window.location.search+"&type="+type;
    /*console.info(finalUrl);*/
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                var noReadList="";
                var headerImg="";
                /*var readedList="";*/
                var noReadListNum=data.resp.replyList.length;
                /*if($("span").hasClass("newMsg")){
                    $(".newMsg").text(noReadListNum);
                }*/
                if(noReadListNum > 0){
                    $(".loading").css("display","none");
                    for(var i=0;i<noReadListNum;i++){
                        if(data.resp.replyList[i].sex == 0){
                            headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic02.png'";
                        }else{
                            headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic01.png'";
                        }
                        var notifyUrl="info.html"+window.location.search+"&checkId="+data.resp.replyList[i].checkId+"&replyId="+data.resp.replyList[i].replyId;
                        
                        var replyHtml="";
                        if(data.resp.replyList[i].isCoach){
                            replyHtml='<div><div class="tidings_list_one"><span class="tidings_list_name" style="color:#ffa200;">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                        }else{
                            replyHtml='<div><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                        }
                        noReadList+=
                        '<li id='+data.resp.replyList[i].checkId+' class="li_border">'
                            +'<div class="tidings_list_header">'
                                +'<img src="'+data.resp.replyList[i].headImg+'" onerror="this.src='+headerImg+'" />'
                            +'</div>'
                            +'<div class="tidings_list_right" onclick="setMessageStatus('+"'"+data.resp.replyList[i].replyId+"','"+notifyUrl+"','"+data.resp.replyList[i].checkId+"'"+')">'
                                /*+'<div><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>'*/
                                +replyHtml
                                +'<div class="tidings_list_con">'+data.resp.replyList[i].content+'</div>'
                                +'<div class="tidings_list_time">'+data.resp.replyList[i].time+'</div>'
                                +'<span class="tidings_list_icon"></span>'
                            +'</div></div>'
                        +'</li>';
                    }
                    $("#noReadMessage").empty();
                    $("#noReadMessage").append(noReadList);

                    //已读消息按钮
                    var getMoreData="";
                    var noMoreData="";
                    var getDataButton="";
                    if(data.resp.hasNext == 1){
                        getMoreData='<span style="display:block;" onclick="getReadedComment('+data.resp.time+","+type+')">查看更早的回复&nbsp;</span>&nbsp;&nbsp;<span class="tidings_list_icon2"></span>';
                        noMoreData='<li class="tidings_list_prompt noMoreData">';
                        getDataButton=noMoreData+'<div class="tidings_list_prompt_div">'+getMoreData+'</div>'+'</li>';
                    }else{
                        getMoreData='<span style="display:block;"></span>';
                        noMoreData='<li class="tidings_list_prompt noMoreData">';
                        getDataButton=noMoreData+'<div class="tidings_list_prompt_div">'+getMoreData+'</div>'+'</li>';
                    }
                    $("#getDataButton").empty();
                    $("#getDataButton").append(getDataButton);
                }else if(noReadListNum <= 0 && data.resp.hasNext == 1){
                    $(".loading").css("display","none");
                    getReadedComment(data.resp.time,type);
                }else{
                    $(".loading").css("display","block");
                    $(".loading").text("目前没有消息回复哦");
                }
            }else{
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

function getReadedComment(lastDateTime,type){
    setMaiDian(SXiaoXiLieBiao.SCategory_SXiaoXiLieBiao,SXiaoXiLieBiao.SXiaoXiLieBiao_ChaKanGengZaoHuiFu);
    var dataNum=10;
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/camp/getReplyList"+window.location.search+"&count="+dataNum+"&time="+lastDateTime+"&type="+type;
    $.ajax({
        type: "get",
        url: finalUrl,
        dataType:"json",
        success : function (data) {
            console.info(data);
            if(data.code == 200){
                var unreadComment="";
                var headerImg="";
                var noReadListNum=data.resp.replyList.length;
                for(var i=0;i<noReadListNum;i++){
                    if(data.resp.replyList[i].sex == 0){
                        headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic02.png'";
                    }else{
                        headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic01.png'";
                    }

                    var notifyUrl="info.html"+window.location.search+"&checkId="+data.resp.replyList[i].checkId+"&replyId="+data.resp.replyList[i].replyId;
                    //var notifyUrl="'info.html"+window.location.search+"&checkId="+data.resp.replyList[i].checkId+"&replyId="+data.resp.replyList[i].replyId+"'";

                    var replyHtml="";
                    if(data.resp.replyList[i].isCoach){
                        replyHtml='<div onclick="setMessageStatus('+"'"+data.resp.replyList[i].replyId+"','"+notifyUrl+"','"+data.resp.replyList[i].checkId+"'"+')"><div class="tidings_list_one"><span class="tidings_list_name" style="color:#ffa200;">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                    }else{
                        replyHtml='<div onclick="setMessageStatus('+"'"+data.resp.replyList[i].replyId+"','"+notifyUrl+"','"+data.resp.replyList[i].checkId+"'"+')"><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                    }
                    /*if(data.resp.replyList[i].isCoach){
                        replyHtml='<div onclick="readedJump('+notifyUrl+')"><div class="tidings_list_one"><span class="tidings_list_name" style="color:#ffa200;">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                    }else{
                        replyHtml='<div onclick="readedJump('+notifyUrl+')"><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>';
                    }*/
                   /* unreadComment+=
                    '<li class="li_border">'
                        +'<div class="tidings_list_header">'
                            +'<img src="'+data.resp.replyList[i].headImg+'" onerror="this.src='+headerImg+'" />'
                        +'</div>'
                        +'<div class="tidings_list_right">'
                            +'<a href='+notifyUrl+'><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>'
                            +'<div class="tidings_list_con">'+data.resp.replyList[i].content+'</div>'
                            +'<div class="tidings_list_time">'+data.resp.replyList[i].time+'</div>'
                            +'<span class="tidings_list_icon"></span>'
                        +'</a></div>'
                    +'</li>';*/
                     unreadComment+=
                    '<li class="li_border" id='+data.resp.replyList[i].checkId+'>'
                        +'<div class="tidings_list_header">'
                            +'<img src="'+data.resp.replyList[i].headImg+'" onerror="this.src='+headerImg+'" />'
                        +'</div>'
                        +'<div class="tidings_list_right">'
                            +replyHtml
                            /*+'<div onclick="readedJump('+notifyUrl+')"><div class="tidings_list_one"><span class="tidings_list_name">'+data.resp.replyList[i].roleName+'</span>回复了您：</div>'*/
                            +'<div class="tidings_list_con">'+data.resp.replyList[i].content+'</div>'
                            +'<div class="tidings_list_time">'+data.resp.replyList[i].time+'</div>'
                            +'<span class="tidings_list_icon"></span>'
                        +'</div></div>'
                    +'</li>';
                }
                /*$("#readedMessage").empty();*/
                $("#readedMessage").append(unreadComment);

                var getMoreData="";
                var noMoreData='<li class="tidings_list_prompt noMoreData">';
                var getDataButton="";
                if(data.resp.hasNext == 0){
                    getMoreData='<span style="display:block;"></span>';
                }else{
                    getMoreData='<span style="display:block;" onclick="getReadedComment('+data.resp.time+","+type+')">查看更早的回复&nbsp;</span>&nbsp;&nbsp;<span class="tidings_list_icon2"></span>';
                }
                getDataButton=noMoreData+'<div class="tidings_list_prompt_div">'+getMoreData+'</div>'+'</li>';
                /*$("#readedMessage").empty();*/
                $("#getDataButton").empty();
                $("#getDataButton").append(getDataButton); 
            }else{
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }
    });
}

function setMessageStatus(replyId,url,checkId){
    setMaiDian(SXiaoXiLieBiao.SCategory_SXiaoXiLieBiao,SXiaoXiLieBiao.SXiaoXiLieBiao_QianWangXiaoXiXiangQing);
    console.info(url);
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/camp/checkState"+window.location.search+"&replyId="+replyId+"&checkId="+checkId;
    $.ajax({
        type: "get",
        url: finalUrl,
        success : function (data) {
            if(data.resp.check && data.resp.reply){
                var host1=window.location.protocol+"//"+window.location.host;
                var finalUrl1=host1+"/v1/api/camp/changeReplyRead"+window.location.search+"&replyId="+replyId;
                $.ajax({
                    type: "get",
                    url: finalUrl1,
                    success : function (data1) {
                        if(data1.code != 200){
                            $(".error-main-t").html("服务器开小差了～");
                            $(".errorAlert").css("display","block");
                            $(".error-main").css("margin-top",-$(".error-main").height()/2);
                        }else{
                            /*window.location.href=url;*/
                            //打开一个新的webWiew
                            var deviceType=isMobile();
                            if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
                                openNewWebview(url);
                            }else{
                                window.location.href=url;
                            }
                            
                        }
                    }
                });
            }else{
                if(!data.resp.check){
                    $(".error-main-t").html("该条打卡已被删除~");
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                }else{
                    $(".error-main-t").html("该条评论已被删除~");
                    $(".errorAlert").css("display","block");
                    $(".error-main").css("margin-top",-$(".error-main").height()/2);
                } 
                var noMsgNum=$("#noReadMessage li").length;
                $("#"+checkId).remove();
                if(noMsgNum == 1){
                    $("#getDataButton").find("span").click();
                }
            }
        }
    });
}

function readedJump(notifyUrl){
    openNewWebview(notifyUrl);
}

function openNewWebview(url){
    url=absoluteUrl+url;
    console.info(url);
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
    }
    document.documentElement.style.webkitTouchCallout='none';
}

