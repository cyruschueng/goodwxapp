$(function(){
	/*身体变化区域--开始*/
	$(".bodyChange-title").css("height",$(window).width()/750*80);
	$(".bodyChange-title").css("lineHeight",$(window).width()/750*80+"px");
	$(".bodyChange-container").css("height",$(window).width()/750*90);
	$(".bodyChange-container").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-tagName").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lowNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-highNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lastImg").css("top",($(window).width()/750*90-0.4375*parseInt($("html").css("font-size"))*15/12)/2);
	/*$(".bodyChange-lastImg-type1").css("top",($(window).width()/750*90-0.4375*parseInt($("html").css("font-size"))*6/10)/2);*/
	$(".bodyChange-icon").css("top",($(window).width()/750*90-1.25*parseInt($("html").css("font-size")))/2);
	/*身体变化区域--完*/

	/*数据交互--开始*/
	getBodyChange();
	/*数据交互--结束*/
	leftControl();
	/*截图分享方法调用--开始*/
	
	
	/*截图分享方法调用--开始*/
})

function getBodyChange(){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getContrast"+window.location.search;
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				var targetRoleId=getParamByUrl("targetRoleId");
				var roleId=getParamByUrl("roleId");
				if(data.resp.flag == 1){
					$(".bodyChange").css("display","block");
					$(".message").css("display","none");
					/*对比周期数据交互--开始*/
					$(".start-time").text(data.resp.start);
					$(".end-time").text(data.resp.end);
					/*对比周期数据交互--结束*/
					/*指标对比数据交互--开始*/
					var bodyData=data.resp.data;
					$(".bodyChange-content .bodyChange-container").each(function(index){
						if(data.resp.showAge){
							$(".bodyAge").css("display","block");
						}
						$(this).children(".bodyChange-lowNum").text(bodyData[index][0]);
						$(this).children(".bodyChange-highNum").text(bodyData[index][1]);
						if(bodyData[index][2] == "0"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-10.png");
						}else if(bodyData[index][2] == "1"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-12.png");
						}else if(bodyData[index][2] == "2"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-11.png");
						}else if(bodyData[index][2] == "3"){
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-13.png");
						}else{
							$(this).children(".bodyChange-lastImg").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-14.png");
						}
					});
					/*指标对比数据交互--结束*/
					/*测量时段数据交互--开始*/
					$(".measure-time").find("span").text(data.resp.period+" ["+data.resp.periodDetail+"]");
					$(".measure-time").find("img").attr("src",data.resp.url);
					/*var timeTop=1.8125*parseFloat($("html").css("font-size"))/2;
					$(".measure-time").css("top",timeTop);*/
					/*测量时段数据交互--结束*/
					if(targetRoleId == "false" || targetRoleId == "" || targetRoleId == roleId){
						appShare(true,data.resp.roleName);
					}else{
						appShare(false,data.resp.roleName);
					}	
				}else{
					$(".bodyChange").css("display","none");
					$(".message").css("display","block");
					appShare(false,data.resp.roleName);
				}
			}else{
				$(".bodyChange").css("display","none");
				$(".message").css("display","block");
				$(".message").text("服务器开小差了，请稍候再试~");
			}
		}
	});
}

//设置截图分享数据
function appShare(isShare,userName){
	var getPageInfo = function (){
		var data = {
			title:'指标对比',
			backgroundColor:'#2c2f31',
			isShare:isShare,
			shareTitle:'有品·燃脂营',
			shareUrl:"",
			shareIcon:'',
			shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
			shareType:1,
			fatBurnName:userName,
			shareBackgroundColor:'#ffffff',
			shareTypeDesc:"有品燃脂营 · 指标对比"
		};
			return JSON.stringify(data);
	};
	var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.getShareInfo(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}

function leftControl(){
	var getPageInfo = function (){
		var data = {
			iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:0,//1为正常后退，
			closeWebview:1,//默认为0
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