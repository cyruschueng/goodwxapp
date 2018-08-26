var SWoDeFangAn={
	SCategory_SWoDeFangAn:5060200,
	SWoDeFangAn_YinShiFangAn:5060201,//饮食方案
	SWoDeFangAn_YunDongFangAn:5060202,//运动方案
	SWoDeFangAn_FangAnXiangQing:5060203//方案详情
};
$(function(){
	
	//饮食方案，训练方案tab切换--开始
	$(".classTag li").each(function(index){
		$(this).unbind("click").click(function(){
			if(index == 0){
				setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn,SWoDeFangAn.SWoDeFangAn_YinShiFangAn);
			}else if(index == 1){
				setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn,SWoDeFangAn.SWoDeFangAn_YunDongFangAn);
			}
			$(this).addClass("active").siblings().removeClass("active");
			if(index == 0){
				$(".part1").css("display","block");
				$(".part2").css("display","none");
			}else{
				$(".part1").css("display","none");
				$(".part2").css("display","block");
			}
		});
	});
	//饮食方案，训练方案tab切换--结束
	//运动方案数据交互--开始
	getTrainPlan();
	//运动方案数据交互--结束
	var myRoleId=getParamByUrl("roleId");
	var targetRoleId=getParamByUrl("targetRoleId");
	//教练查看我的方案
	if(myRoleId != targetRoleId && targetRoleId != "false"){
		appNoShare("Ta的方案");
	}else{
		appNoShare("我的方案");
	}
	/*var theDevice=getParamByUrl("os").toLowerCase();
	if(theDevice == "ios"){
		backBeforePage();
	}*/
	
	/*var tagName=getCookie("tagName");
	if(tagName == "train"){
		$(".tagItem:eq(1)").click();
		delCookie("tagName");
	}
*/


})
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

function getTrainPlan(){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getScheme"+window.location.search;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				if(data.resp.length > 0){
					var trainHtml="";
					for(var i=0;i<data.resp.length;i++){
						var url="'"+data.resp[i].url+window.location.search+"'";
						/*trainHtml+='<a href="'+data.resp[i].url+window.location.search+'" class="sportPlan-item">'+data.resp[i].weekNum+'&nbsp;&nbsp;'+data.resp[i].title+'</a>';*/
						trainHtml+='<div onclick="trainPlan('+url+',0)" class="sportPlan-item">'+data.resp[i].weekNum+'&nbsp;&nbsp;'+data.resp[i].title+'</div>';
					}
					$(".part1").empty();
					$(".part1").append(trainHtml);
				}else{
					/*alert("当前没有运动方案~");*/
				}
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}


function trainPlan(url){
	setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn,SWoDeFangAn.SWoDeFangAn_FangAnXiangQing);
	/*setCookie("tagName","train",1);
	window.location.href=url;*/
	// url=url+window.location.search;
	getNewWebWiew(url);
}

function backBeforePage(){
	var getPageInfo = function (){
		var data = {
			iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:2,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:""
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showLeftBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}

//打开一个新的webWiew
function getNewWebWiew(url){
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