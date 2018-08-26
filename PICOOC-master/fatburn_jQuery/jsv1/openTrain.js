$(function(){
	$(".container").css("minHeight",$(window).height()+"px");
	 appNoShare("有品燃脂营");
	 isComplete();
	 //alert(window.location.href);
	 //alert(window.location.search);
	//$(".openContent").css("height",parseInt($(window).height()-$(".openTopInfo").height()-3.95*fontHeight)+"px");

	
});
function isComplete(){
	/*alert("调用~");*/
	var targetRoleId=getParamByUrl("roleId");
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campQuestion/complete"+window.location.search;
    /*alert(finalUrl);*/
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
        	console.info(data.resp.sport);
        	/*alert("data.resp.sport:"+data.resp.sport);
        	alert("data.resp.profile:"+data.resp.profile);
        	alert("data.message:"+data.message);*/
            if(data.code == 200){
			    $("#questionnaire").unbind("click").bind("click",function(){
			    	if(data.resp.profile){
			    		window.location.href="questionnaireShow.html"+window.location.search;
			    	}else{
			    		window.location.href="questionnaire2.html"+window.location.search;
			    	} 
			    });

				$("#sportTest").unbind("click").bind("click",function(){
					if(data.resp.sportText){
						//window.location.href="trainExplain.html"+window.location.search;
						//还没有做体侧视频
						if(!data.resp.sportVideo){
							jumpSport(data.resp.campId);
						}else{
							getSportResult(data.resp.campId);
						}
					}else{
						window.location.href="trainExplain.html"+window.location.search;
					}	
				});

				if(data.resp.day >= 60){
					$(".datumBottom").css("display","block");
					$(".datumBottom").html("Tips: 您已经XX天未上秤测量啦~快去测量吧，以便教练综合您的身体与体测结果分配运动计划");
				}else{
					$(".datumBottom").css("display","none");
				}

            }else{
            	$(".error-main-t").html(data.message);
	            $(".errorAlert").css("display","block");
	            $(".error-main").css("margin-top",-$(".error-main").height()/2);
            }
        }

    });
}

var deviceType=isMobile();

//查看运动测试结果
function getSportResult(campId){
    var getPageInfo = function (){
        var data = {
            roleId:roleId,
            campId:campId
        };
        return JSON.stringify(data);
    };
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.getSportResult(getPageInfo());
        }else{
            mobileApp.getSportResult.postMessage(getPageInfo());
        }
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//设置跳到运动视频的方法
function jumpSport(campId){
    //alert("campId:"+campId);
    var roleId = getParamByUrl("roleId");
    var type = 1;
    var getPageInfo = function (){
        var data = {
            roleId:roleId,
            type:type,
            campId:campId
        };
        return JSON.stringify(data);
    };
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        if(getParamByUrl("os")=="android"){
            mobileApp.jumpSport(getPageInfo());
        }else{
            window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
        }
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//设置标题
function appNoShare(title){
	var getPageInfo = function (){
		var data = {
			title:title,
			/*isShare:false,
			backgroundColor:'#2c2f31'*/
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		return JSON.stringify(data);
	};
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
			if(getParamByUrl("os")=="android"){
				mobileApp.controlTitle(getPageInfo());
			}
			else{
				mobileApp.controlTitle.postMessage(getPageInfo());
			}
		//mobileApp.getShareInfo(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}