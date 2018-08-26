var SWeiKaiYing={
	SCategory_SWeiKaiYing:5081000,
	SWeiKaiYing_LiJiTianXieWenJuan:5081001,//立即填写问卷
	SWeiKaiYing_LiJiChaKanRuYingQianZhunBei:5081002//立即查看入营前准备
};
$(function(){
	appNoShare();
	isEdit();
	var myDate = new Date();    
	console.log(myDate.toLocaleDateString());
	// alert(getCookie("isNewVersion"));
	console.log(getCookie("nowDayL"));
	console.log(typeof getCookie("nowDayL"));
	if(getCookie("nowDayL")!=(myDate.toLocaleDateString()) || getCookie("nowDayL")==""){
		isNewVersion();
		setCookie("nowDayL",myDate.toLocaleDateString(),1);
	}
	
	$("#goToQuestion").unbind("click").click(function(event){
		setMaiDian(SWeiKaiYing.SCategory_SWeiKaiYing,SWeiKaiYing.SWeiKaiYing_LiJiTianXieWenJuan);
		setCookie("toQuestionnaire","2",1);
		window.location.href="questionnaire.html"+window.location.search;
		event.stopPropagation();
	});
	$("#goToTip").unbind("click").click(function(event){
		setMaiDian(SWeiKaiYing.SCategory_SWeiKaiYing,SWeiKaiYing.SWeiKaiYing_LiJiChaKanRuYingQianZhunBei);
		window.location.href="http://detection.picooc.com/details358"+window.location.search;
		event.stopPropagation();
	});
});

function isEdit(){
	// alert("测试1");
	// alert(window.location.search);

    var finalUrl=ajaxLink+"/v1/api/campQuestion/isEdit"+window.location.search;
    // var finalUrl=ajaxLink+"/v1/api/campQuestion/isEdit"+"?orderId="+getParamByUrl("orderId")+"&userId="+getParamByUrl("userId");
    // alert("测试1:"+finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
          if(data.code == 200){
          	// alert("测试2================="+data.resp.isEdit);
          	if(data.resp.isEdit){
          		$(".noWrite").css("display","none");
          		$(".Write").css("display","block");
				// var futureBeginTime = getCookie("futureBeginTime");
				$("#futureBeginTime").html(data.resp.beginTime);
          	}else{
          		$(".Write").css("display","none");
          		$(".noWrite").css("display","block");
				// var futureBeginTime = getCookie("futureBeginTime");
				$("#futureBeginTime").html(data.resp.beginTime);
          	}
          	$(".container").css("display","block");
          }else{
            $(".error-main-t").html(data.result.message);
            $(".errorAlert").css("display","block");
            $(".error-main").css("margin-top",-$(".error-main").height()/2);
          }
        }
    })
}
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:"有品燃脂营",
			/*isShare:false,
			backgroundColor:'#2c2f31'*/
			color:"",
			opacity:"",
			backgroundColor:"",
			backgroundOpacity:""
		};
		return JSON.stringify(data);
	};
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
	document.documentElement.style.webkitTouchCallout='none';
}

function isNewVersion(){
 if(getParamByUrl('os')=='iOS'){
    if(getParamByUrl('webver') > 1){   //版本正常
    	$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
    }else{ //版本过低
    		$(".fixbg-main-t-version").html("请您更新至最新版本，即可享受更优质、稳定服务");
			$(".fixbg-version").css("display","block");
			$(".fixbg-main-version").css("margin-top",-$(".fixbg-main-version").height()/2);
			$(".fixbg-main-btn1-version").unbind("click").click(function(event){
				event.stopPropagation();
				// var deviceType=isMobile();//判断是不是app的方法
				// if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
				// 	var getPageInfo = function (){
				// 			var data = {
				// 			backNum:1,//默认为1，
				// 			closeWebview:0,//默认为0
				// 			};
				// 	        return JSON.stringify(data);
				// 	};
				// 	mobileApp.deleteHistory(getPageInfo());
				// }
		    	$("body").css("overflow","auto"); 
				$("body").css("max-height","auto");
				$(".fixbg-version").css("display","none");

			});
			$(".fixbg-main-btn2-version").unbind("click").click(function(event){
				window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8';
				event.stopPropagation();
			});

			var t1=setTimeout(function(){
				$("body").css("max-height",$(window).height());
				$("body").css("overflow","hidden");
				// document.addEventListener('touchmove', function(event) {
				// 	//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				// 	if($("body").css("overflow")=="hidden"){
				// 		event.preventDefault();
				// 	}
				// })
			},200);
    }
}else{
    if(getParamByUrl('webver') > 1){   //版本正常
    	$("body").css("overflow","auto"); 
		$("body").css("max-height","auto");
    }else{ //版本过低
    		$(".fixbg-main-t-version2").html("请您打开手机应用商城，更新至最新版本，即可享受更优质、稳定服务");
			$(".fixbg-version2").css("display","block");
			$(".fixbg-main-version2").css("margin-top",-$(".fixbg-main-version2").height()/2);

			$(".fixbg-main-btn2-version2").unbind("click").click(function(event){
		    	$("body").css("overflow","auto"); 
				$("body").css("max-height","auto");
				$(".fixbg-version2").css("display","none");
				event.stopPropagation();
			});

			var t1=setTimeout(function(){
				$("body").css("max-height",$(window).height());
				$("body").css("overflow","hidden");
				// document.addEventListener('touchmove', function(event) {
				// 	//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				// 	if($("body").css("overflow")=="hidden"){
				// 		event.preventDefault();
				// 	}
				// })
			},200);
    }
}

}

