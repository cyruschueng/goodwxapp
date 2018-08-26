var Fc_MsgTotol={};
Fc_MsgTotol.changeZan=require("./Fc_changezan.jsx").changeZan;
Fc_MsgTotol.changeZanClick=function(){
	/*$(".partRight-type1-zan").unbind("click").click(function(){
		var index=$(".partRight-type1-zan").index(this);
		Fc_MsgTotol.changeZan(index);
	});*/
}

//分享开始
Fc_MsgTotol.shareBtn1=true;//防止连续点击
Fc_MsgTotol.shareLink=function(event){
	// $(".msgType2 .partRight-type1-share").unbind("click").click(function(event){
	// 	event.stopPropagation();
	// 	var checkId=$(this).attr("data-check_id");
	// 	var searchLink="";
	// 	if(getParamByUrl("checkId")!="false"){
	// 		searchLink=removeParamByUrl("checkId");
	// 	}else{
	//  		searchLink=window.location.search;
	// 	}
	// 	if(Fc_MsgTotol.shareBtn1){
	// 		Fc_MsgTotol.shareBtn1=false;
	// 		Fc_MsgTotol.setMessageStatus(0,searchLink,checkId,$(this),2);
	// 	}
	// });
	// $(".msgType1 .partRight-type1-share").unbind("click").click(function(event){
	// 	event.stopPropagation();

	// 	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
	// 	var checkId=$(this).attr("data-check_id");
	// 	var searchLink="";
		
	// 	if(getParamByUrl("checkId")!="false"){
	// 		searchLink=removeParamByUrl("checkId");
	// 	}else{
	//  		searchLink=window.location.search;
	// 	}
	// 	if(Fc_MsgTotol.shareBtn1){
	// 		Fc_MsgTotol.shareBtn1=false;
	// 		Fc_MsgTotol.setMessageStatus(0,searchLink,checkId,$(this),1);
	// 	}
	// });

	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
	var checkId=event.currentTarget.getAttribute("data-check_id");
	var searchLink="";
	
	if(getParamByUrl("checkId")!="false"){
		searchLink=removeParamByUrl("checkId");
	}else{
 		searchLink=window.location.search;
	}
	if(Fc_MsgTotol.shareBtn1){
		Fc_MsgTotol.shareBtn1=false;
		Fc_MsgTotol.setMessageStatus(0,searchLink,checkId,$(this),1);
	}

}
Fc_MsgTotol.setMessageStatus=function(replyId,searchLink,checkId,object,shareType){
    console.info(searchLink);
    console.info(object.parents(".part"));
    event.stopPropagation();
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/camp/checkState"+window.location.search+"&replyId="+replyId+"&checkId="+checkId;
    $.ajax({
        type: "get",
        url: finalUrl,
        success : function (data) {
            if(data.resp.check){

                //打开一个新的webWiew
                var deviceType=isMobile();//判断是不是app的方法
				if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
					var data={
						//link:absoluteUrl+"infoShare.html"+searchLink+"&checkId="+checkId,
						link:absoluteUrl+"cardShare.html"+searchLink+"&checkId="+checkId,
					    animation: 2//默认1从右到左，2从下到上
					};
					data=JSON.stringify(data);
                    appFc.openWebview(data);
					Fc_MsgTotol.shareBtn1=true;
				}
				else{
					Fc_MsgTotol.shareBtn1=true;
					//window.location.href="infoShare.html"+searchLink+"&checkId="+checkId;
					window.location.href="cardShare.html"+searchLink+"&checkId="+checkId;
				}
				event.stopPropagation();
            }else{
                $(".error-main-t").html("啊哦，该打卡已被删除~");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
                Fc_MsgTotol.shareBtn1=true;
                /*if(shareType==1){
					joinweek=0;
					time=0;
					pageIndex1=0;
					tabBtn=false;
					isFirstLoad=0;
					isCampOver=false;
					if(cardtype1 == 1){
						getList("hasDelete",1);
					}else{
						getList("hasDelete",0);
					}
                }else if(shareType ==2){
                	object.parents(".part").remove();
                }*/
                
               /* var noMsgNum=$("#noReadMessage li").length;
                $("#"+checkId).remove();
                if(noMsgNum == 1){
                    $("#getDataButton").find("span").click();
                }*/
            }
        },
        error : function (){
                $(".error-main-t").html("啊哦，您的网络不太给力~");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
                Fc_MsgTotol.shareBtn1=true;
        }
    });
}
//分享结束

//绑定跳转
Fc_MsgTotol.bindStudentInfo=function(event){
	event.stopPropagation();

	//var isStutap1=$(".active").hasClass("tab1");新版本删除了
	//绑定a跳转cookie
	if(event.currentTarget.getAttribute("data-head_is_coach")!="yes"){
		var deviceType=isMobile();
		var targetCampIdHref="";
		//var index=$(".msgInfo-name").index(this);
		//var targetRoleId=$(".msgInfo-name").eq(index).attr("targetRoleId");
		var targetRoleId=event.currentTarget.getAttribute("data-target_role_id");
		var targetCampIdHref="";
		var jumpUrl="";
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			
		}else{
			jumpUrl="studentOtherInfo.html";
		}
		//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
		setCookie("stuPageJump",publicData.pageIndex,1);//新版本营内动态为2
		if(event.currentTarget.getAttribute("data-target_camp_id") != "-1" && event.currentTarget.getAttribute("data-target_camp_id")!=undefined && event.currentTarget.getAttribute("data-target_camp_id")!="undefined" ){
			targetCampIdHref="&targetCampId="+event.currentTarget.getAttribute("data-target_camp_id");
		}
		if(deviceType == "isApp" && (getParamByUrl("testtype")!="tanchao")){
			//var index=$(".msgInfo-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				var data={
					link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+event.currentTarget.getAttribute("data-target_role_id")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
				appFc.openWebview(data);
				//mobileApp.openWebview(data);
			}
			else{
				var data={
					link:absoluteUrl+jumpUrl+window.location.search+"&targetRoleId="+event.currentTarget.getAttribute("data-target_role_id")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
				appFc.openWebview(data);
				//mobileApp.openWebview(data);
				//$(".msgInfo-name").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId"));	
			}
		}
		else{
			if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",publicData.pageIndex,1);
			}
			//var index=$(".msgInfo-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				event.currentTarget.setAttribute("href",jumpUrl+searchLink+"&targetRoleId="+event.currentTarget.getAttribute("data-target_role_id")+targetCampIdHref);
			}
			else{
				event.currentTarget.setAttribute("href",jumpUrl+window.location.search+"&targetRoleId="+event.currentTarget.getAttribute("data-target_role_id")+targetCampIdHref);
			}
		}
	}
}
module.exports = Fc_MsgTotol; 