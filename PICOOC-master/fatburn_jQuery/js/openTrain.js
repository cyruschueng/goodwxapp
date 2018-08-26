$(function(){
	$(".container").css("minHeight",$(window).height()+"px");
	appNoShare("有品燃脂营");

    $(".errorAlert").unbind("click").bind("click",function(){
        $(this).css("display","none");
    });

    $("#questionnaire").unbind("click").bind("click",function(){
        if(getParamByUrl("os")=="android"){
            $(".error-main-t").text("当前版本太低，不支持个人资料完善哦！快去应用商店更新吧~");
            $(".errorAlert").css("display","block");
        }else{
            $(".error-main-t").text("当前版本太低，不支持个人资料完善哦！快去APP store更新吧~");
            $(".errorAlert").css("display","block");
        }
    });

    $("#sportTest").unbind("click").bind("click",function(){
        if(getParamByUrl("os")=="android"){
            $(".error-main-t").text("当前版本太低，不支持运动能力测试哦！快去应用商店更新吧~");
            $(".errorAlert").css("display","block");
        }else{
            $(".error-main-t").text("当前版本太低，不支持运动能力测试哦！快去APP store更新吧~");
            $(".errorAlert").css("display","block");
        }
    })
});

function isComplete(){
    var targetRoleId=getParamByUrl("roleId");
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campQuestion/complete"+window.location.search;
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
                /*$("#questionnaire").unbind("click").bind("click",function(){
                    if(data.resp.profile){
                        window.location.href="questionnaireShow.html"+window.location.search;
                    }else{
                        window.location.href="questionnaire2.html"+window.location.search;
                    } 
                });

                $("#sportTest").unbind("click").bind("click",function(){
                    if(data.resp.sport){
                        window.location.href="trainExplain.html"+window.location.search;
                    }else{
                        window.location.href="trainExplain.html"+window.location.search;
                    }   
                });*/

                if(data.resp.day >= 60){
                    $(".datumBottom").css("display","block");
                    $(".datumBottom").html("Tips: 您已经XX天未上秤测量啦~快去测量吧，以便教练综 合您的身体与体测结果分配运动计划");
                }else{
                    $(".datumBottom").css("display","none");
                }

            }else{
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
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