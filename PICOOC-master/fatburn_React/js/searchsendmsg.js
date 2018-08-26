var friendUserId=getParamByUrl("friendUserId");
var limitTextNum=parseInt($("#accept-msg-input").width()/parseInt($("html").css("font-size"))/0.875);
var validInfo="";
//var myName=decodeURIComponent(getParamByUrl("myName"));
//ios中文要转义两次
var myName=decodeURIComponent(decodeURIComponent(getParamByUrl("myName")));
var showBtn=true;
var maidian="https://api2.picooc.com";
var SAction={
    SClick_Action:1,// 单击事件
}
var ajaxLink="";
//var ajaxLink="https://pm.picooc.com:444";//测试版
//var ajaxLink="http://pm.picooc.com:8085";//本地测试
//var ajaxLink="https://api2.picooc.com";//正式版
//var ajaxLink=window.location.protocol+"//"+window.location.host;
if(window.location.host=="pm.picooc.com:444" || window.location.host=="pm.picooc.com:445"||window.location.host==""){
  ajaxLink="https://pm.picooc.com:444";
}
else if(window.location.host=="pm.picooc.com:9989"){
  ajaxLink="http://pm.picooc.com:8085";
}
else{
  ajaxLink="https://api2.picooc.com";
}
var SFaSongQingQiu={
	SCategory_SFaSongQingQiu:61300,
	SFaSongQingQiu_ShuRuKuang:61301,//输入框点击
	SFaSongQingQiu_ShanChu:61302,//删除输入框信息小叉
	SFaSongQingQiu_ShenTiShuJu:61303,//查看身体数据0:false 1:true
	SFaSongQingQiu_FaSong:61304,//发送
}
$(function(){
	// $(".loading").css("display","none");
	/*clearInterval(loadingTime);*/
	$(".fixBg-main").css("width",$(window).width()-50);
	$(".fixBg-btn").unbind("click").click(function(){
		$(".fixBg").css("display","none");
	});
	
	$("#accept-msg-input").unbind("click").click(function(){
		$.ajax({
			type: "get",
			//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
			url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+SFaSongQingQiu.SCategory_SFaSongQingQiu+"|"+SFaSongQingQiu.SFaSongQingQiu_ShuRuKuang+'|'+SAction.SClick_Action,
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback:"appAction",
			success : function (data) {
			}
		})
	});
	if(myName=="false"){
		$("#accept-msg-input").attr("placeholder","请输入验证信息");
	}
	else{
		validInfo="我是"+myName+"，想加你为我的亲友";
		var validInfoLen=11+getByteLen(myName);
		var canShowLen=getLetterNum(myName)+limitTextNum-1;
		/*if(validInfo.length > limitTextNum){*/
		if(validInfoLen > limitTextNum){
			/*$("#accept-msg-input").attr("placeholder","我是"+myName+"，想加你为我的亲友");*/
			$("#accept-msg-input").attr("placeholder",validInfo.substring(0,canShowLen)+"...");
		}else{
			$("#accept-msg-input").attr("placeholder",validInfo);
		}
	}
	$(".accept-msg-close").unbind("click").click(function(){
		$("#accept-msg-input").val("");
		$.ajax({
			type: "get",
			//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
			url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+SFaSongQingQiu.SCategory_SFaSongQingQiu+"|"+SFaSongQingQiu.SFaSongQingQiu_ShanChu+'|'+SAction.SClick_Action,
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback:"appAction",
			success : function (data) {
			}
		})
	})
	$(".showBtn").unbind("click").click(function(){
		
		if(showBtn){
			$(".showBtn-main").css("right","1.225rem");
			$(".showBtn-bg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/16.png");
			showBtn=false;
			$.ajax({
				type: "get",
				//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
				url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+SFaSongQingQiu.SCategory_SFaSongQingQiu+"|"+SFaSongQingQiu.SFaSongQingQiu_ShenTiShuJu+'|'+SAction.SClick_Action+'|'+0,
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback:"appAction",
				success : function (data) {
				}
			})
		}
		else{
			$(".showBtn-main").css("right","-2px");
			$(".showBtn-bg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/10.png");
			showBtn=true;
			$.ajax({
				type: "get",
				//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
				url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+SFaSongQingQiu.SCategory_SFaSongQingQiu+"|"+SFaSongQingQiu.SFaSongQingQiu_ShenTiShuJu+'|'+SAction.SClick_Action+'|'+1,
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback:"appAction",
				success : function (data) {
				}
			})
		}
	});


	var deviceType4=isMobile();
	if(deviceType4 == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
		var data4={
			function:"sendMsg"
		};
		data4=JSON.stringify(data4);
		mobileApp.setRightButton(data4);
	}
	else{
		$("#test").css("display","block");
		$("#test").click(function(){
			sendMsg();
		});
	}
})

function sendMsg(){
	$.ajax({
		type: "get",
		//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
		url: maidian+"/v1/api/statistic/appAction"+window.location.search+"&ap="+SFaSongQingQiu.SCategory_SFaSongQingQiu+"|"+SFaSongQingQiu.SFaSongQingQiu_FaSong+'|'+SAction.SClick_Action,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback:"appAction",
		success : function (data) {
		}
	})
	var msg='';
	if($("#accept-msg-input").val()==''){
		/*msg=$("#accept-msg-input").attr("placeholder");*/
		msg=validInfo;
	}else{
		msg=$("#accept-msg-input").val();
	}
	$.ajax({
		type: "get",
		url: ajaxLink+"/v1/api/friend/invite/"+friendUserId+".txt"+window.location.search+"&message="+msg+"&privilege="+showBtn,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback:"flightHandler",
		success : function (data) {
			if(data.result.code==200){
				$(".fixbg1").css("display","block");
				$(".fixbg1").css("margin-top",-($(".fixbg1").height()+parseInt($("html").css("font-size"))*1.875*2)/2);
				$(".fixbg1").css("margin-left",-($(".fixbg1").width()+parseInt($("html").css("font-size"))*1.5625*2)/2);
				setCookie("hasAdd"+friendUserId,true,30);
				setTimeout(function(){
					var deviceType=isMobile();
					if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
						var data={
							reload:true
						};
						data=JSON.stringify(data);
						mobileApp.closeWebview(data);
					}
					else{
						window.history.go(-1);
					}
				},2000);
			}else{
				setCookie("hasAdd"+friendUserId,true,30);
				$(".fixBg-p").html(data.result.message);
				$(".fixBg-p").css("display","block");
				$(".fixBg").css("display","block");
				$(".fixBg-main").css("margin-top",-$(".fixBg-main").height()/2);
			}
		}
	})
}

function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null){
            len += 2;
        }else{
            len += 1;
        }
    }
    len=len/2;
    return len;
}

function getLetterNum(val){
	var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) == null){
        	len += 1;
        }
    }
    len=len/2;
    return len;
}	