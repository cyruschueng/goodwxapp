var pageIndex=1;
var functionType1='studentInfo';
var STaDeGeRenZhuYe={
    SCategory_STaDeGeRenZhuYe:5061300,
    STaDeGeRenZhuYe_ShenTiBianHua:5061301,//查看身体变化
    STaDeGeRenZhuYe_DaKaJiLu:5061302,//查看打卡记录
    STaDeGeRenZhuYe_JiBenXinXi:5061303,//查看基本信息
    STaDeGeRenZhuYe_ChaKanTiZhong:5061304,//查看体重
    STaDeGeRenZhuYe_ChaKanZhiFang:5061305,//查看脂肪
    STaDeGeRenZhuYe_ChaKanYaoWei:5061306,//查看腰围
    STaDeGeRenZhuYe_GengDuoZhiBiaoBianHua:5061307,//查看更多指标变化
    STaDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai:5061308,//教练查看学员身材
    STaDeGeRenZhuYe_TianJiaQinYou:5061309,//添加亲友
    STaDeGeRenZhuYe_DianJiShaiXuan:5061310,//Ta的个人主页点击筛选
};
$(function(){
	shaixuanFrom = 2;
	/*页面显示tag--开始*/
	$(".info-tag .info-tag-item").each(function(index){
		$(this).unbind("click").click(function(){
			var currentIndex=0;
			var nextIndex=index;
			var slideWidth=(parseInt(nextIndex-currentIndex)*0.33+0.15)*$(window).width();
			var nextColor="";
			$(".page"+(parseInt(nextIndex)+1)).css("display","block").siblings().css("display","none");
			$(".info-tag .info-tag-item:eq("+nextIndex+")").css("color","#fff").siblings().css("color","rgba(255,255,255,0.5)");
			$(window).scrollTop(0);
			$(".info-tag").removeClass("nav-fixed");
        	$("#tag-content").removeClass("content");
        	$(".navBar").animate({left:slideWidth},200);
			if(nextIndex == 0){
				/*nextColor="#7cce1c";*/
				$(".info-tag .info-tag-item:eq(0)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange3.png");
				$(".info-tag .info-tag-item:eq(1)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo4.png");
				$(".info-tag .info-tag-item:eq(2)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo4.png");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_ShenTiBianHua);
			}else if(nextIndex == 1){
				/*nextColor="#ffa700";*/
				$(".info-tag .info-tag-item:eq(0)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png");
				$(".info-tag .info-tag-item:eq(1)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo3.png");
				$(".info-tag .info-tag-item:eq(2)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo4.png");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_DaKaJiLu);
			}else{
				/*nextColor="#ff6162";*/
				$(".info-tag .info-tag-item:eq(0)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png");
				$(".info-tag .info-tag-item:eq(1)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo4.png");
				$(".info-tag .info-tag-item:eq(2)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo3.png");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_JiBenXinXi);
			}
			/*$(".navBar").animate({left:slideWidth,borderBottomColor:nextColor},200);*/
			console.info(currentIndex+"||"+nextIndex+"||"+slideWidth);
			if(nextIndex == 1){
				tabBtn=false;
				pageIndex1=0;
				joinweek = 0;
				isFirstLoad=0;
				isCampOver=false;
				getList("noDelete",1);
				if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
					$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
				}
				else{
					$(".partLeft-p3").css("padding-left",($(".partLeft-p1 span").width()-$(".partLeft-p3 span").width())/2);
				}
				for(var i=0;i<$(".partLeft-p1 span").length;i++){
					if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
						$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2-1);
					}
				}
				$(".partRight-img-li").css("height",$(".partRight-img-li").width());
			}
			//page2初始化开始
			var fontHeight=parseInt($("html").css("font-size"));
			if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
				$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
			}
			if($(".partLeft-p1 span").width()>$(".partLeft-p2 span").width()){
				$(".partLeft-p2").css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").width()-$(".partLeft-p2 span").width())/2);
			}
			//page2初始化结束
			//对tag的定位
			//有滚动
			/*if($(window).height() >= $(".container").height()){
				$(".info-tag").removeClass("nav-fixed");
			}*/
		});
	});
	/*页面显示tag--完*/

	/*体脂体重tag切换--开始*/
	$(".chartTag").children("span").each(function(){
		$(this).unbind("click").click(function(){
			/*$(this).css({"backgroundColor":"#1daffa","color":"#fff"}).siblings().css({"color":"#1daffa","backgroundColor":"#fff"});*/
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("tag-weight")){
				$(".weightContent").css("display","block");
				$(".fatContent").css("display","none");
				$(".waistContent").css("display","none");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_ChaKanTiZhong);
			}else if($(this).hasClass("tag-fat")){
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","block");
				$(".waistContent").css("display","none");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_ChaKanZhiFang);
			}else{
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","none");
				$(".waistContent").css("display","block");
				setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_ChaKanYaoWei);
			}
		});
	});
	/*体脂体重tag切换--完*/

	/*身体变化区域--开始*/
	/*$(".bodyChange-title").css("height",$(window).width()/750*80);
	$(".bodyChange-title").css("lineHeight",$(window).width()/750*80+"px");
	$(".bodyChange-container").css("height",$(window).width()/750*90);
	$(".bodyChange-container").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-tagName").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lowNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-highNum").css("lineHeight",$(window).width()/750*90+"px");
	$(".bodyChange-lastImg").css("top",($(window).width()/750*90-0.4375*parseInt($("html").css("font-size"))*15/12)/2);
	$(".bodyChange-icon").css("top",($(window).width()/750*90-1.25*parseInt($("html").css("font-size")))/2);*/
	
	/*身体变化区域--完*/

	/*数据交互--开始*/
	var targetRoleId=getParamByUrl("targetRoleId");
	getBodyChange(targetRoleId);
	getBaseInfo(targetRoleId);
	/*数据交互--结束*/
	//设置标题
	var myRoleId=getParamByUrl("roleId");
	var targetRoleId=getParamByUrl("targetRoleId");
	if(myRoleId == targetRoleId && myRoleId != "false"){
		appNoShare("我的个人主页");
	}else{
		appNoShare("Ta的个人主页");
		$(".myPlan").text("Ta的方案");
		$(".myBody").text("Ta的身材");
	}


		//添加亲友
	$(".addFriend").click(function(){
		var friendUserId=$("#friendUserId").text();
		var hasAddFriend=getCookie("hasAdd"+friendUserId);
		var isReply= $(".isReply").text() == "true" ? true : false;
		console.info(isReply);
		console.info(hasAddFriend+"||" + (hasAddFriend == "true"));
		/*alert(hasAddFriend+"||" + (hasAddFriend == "true"));*/
		if(hasAddFriend == "true"){
			/*alert("触发了~");*/
			$(".container").css("height",$(window).height());
			$(".fixbg2").css("height",$(window).height());
			$(".fixbg2").css("display","block");
			$(".fixbg-main-btn1").click(function(){
				$(".fixbg2").css("display","none");
			});
		}else{
			var name=$(".roleName").text();
			var friendUserId=$("#friendUserId").text();
			addFriend(name,friendUserId);
		}
		setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_TianJiaQinYou);
	});

	$(".userBody").unbind("click").click(function(){
		/*setCookie("studentStatu",2,1);*/
		var bodyUrl='bodyChange.html'+location.search;
		getNewWebWiew(bodyUrl);
		setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_GengDuoZhiBiaoBianHua);
	});
	
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
function getBaseInfo(targetRoleId){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getBasicInfo"+window.location.search+"&targetRoleId="+targetRoleId;
	/*var finalUrl=host+"/v1/api/camp/getBasicInfo?roleId="+roleId;*/
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				/*头部基本信息数据交互--开始*/
				/*$("#first-weight").text(data.resp.title.firstWeight);
				$("#first-fat").text(data.resp.title.firstFat);
				$("#first-in-fat").text(data.resp.title.firstInfat);*/
				$("#accountVal").text(data.resp.title.name);
				$("#friendUserId").text(data.resp.friendUserId);
				$(".roleName").text(data.resp.roleName);
				/*if(data.resp.friendType){
					$(".hasAddFriend").css("display","block");
					$(".addFriend").css("display","none");
				}else{
					$(".hasAddFriend").css("display","none");
					$(".addFriend").css("display","block");
				}*/
				//未添加好友，添加好友被拒绝，被邀请，删除好友之后 ,拒绝对方添加我为好友 都可以添加
				if(data.resp.friendType == 0 || data.resp.friendType == 3 || data.resp.friendType == 4 ||  data.resp.friendType == 9 ||  data.resp.friendType == 5){
					$(".hasAddFriend").css("display","none");
					$(".addFriend").css("display","block");
					setCookie("hasAdd"+data.resp.friendUserId,false,30);
				}else if(data.resp.friendType == 1){
					$(".hasAddFriend").css("display","none");
					$(".addFriend").css("display","block");
					setCookie("hasAdd"+data.resp.friendUserId,true,30);
				}else if(data.resp.friendType == 2){
					$(".hasAddFriend").css("display","block");
					$(".addFriend").css("display","none");
					setCookie("hasAdd"+data.resp.friendUserId,false,30);
				}

				var headerImg="";
				if(data.resp.title.sex == 0){
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/girl.png");
					headerImg="'http://cdn2.picooc.com/web/res/sex0.png'";
				}else{
					$(".sex").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/boy.png");
					headerImg="'http://cdn2.picooc.com/web/res/sex1.png'";
				}
				$(".head").attr("src",data.resp.title.head);
				$(".head").attr("onerror","this.src="+headerImg);
				$(".top-img").css("visibility","visible");
				/*头部基本信息数据交互--结束*/
				/*学员基本信息数据交互--开始*/
				if(data.resp.height != "" && data.resp.height != null){
					$(".height").find("span:eq(1)").text(data.resp.height);
				}else{
					$(".height").css("display","none");
				}
				if(data.resp.birthday != "" && data.resp.birthday != null){
					$(".age").find("span:eq(1)").text(data.resp.birthday);
				}else{
					$(".age").css("display","none");
				}
				/*if(data.resp.goalFat != "" && data.resp.goalFat != null){
					$(".goalFat").find("span:eq(1)").text(data.resp.goalFat);
				}else{
					$(".goalFat").css("display","none");
				}
				if(data.resp.goalWeight != "" && data.resp.goalWeight != null){
					$(".goalWeight").find("span:eq(1)").text(data.resp.goalWeight);
				}else{
					$(".goalWeight").css("display","none");
				}*/
				if(data.resp.career != "" && data.resp.career != null){
					$(".career").find("span:eq(1)").text(data.resp.career);
				}else{
					$(".career").css("display","none");
				}
				if(data.resp.physicalPeriod  != "" && data.resp.physicalPeriod  != null){
					$(".physicalPeriod ").find("span:eq(1)").text(data.resp.physicalPeriod );
				}else{
					$(".physicalPeriod ").css("display","none");
				}
				if(data.resp.area != "" && data.resp.area != null){
					$(".area").find("span:eq(1)").text(data.resp.area);
				}else{
					$(".area").css("display","none");
				}
				/*if(data.resp.periodDesc != "" && data.resp.periodDesc != null){
					$(".periodDesc").find("span:eq(1)").text(data.resp.periodDesc);
				}else{
					$(".periodDesc").css("display","none");
				}*/
				/*if(data.resp.wechat != "" && data.resp.wechat != null){
					$(".wechat").find("span:eq(1)").text(data.resp.wechat);
				}else{
					$(".wechat").css("display","none");
				}
				if(data.resp.phoneNo != "" && data.resp.phoneNo != null){
					$(".phoneNo").find("span:eq(1)").text(data.resp.phoneNo);
				}else{
					$(".phoneNo").css("display","none");
				}*/
				/*学员基本信息数据交互--结束*/
			}else{
				// alert("服务器开小差了～");
	                $(".error-main-t").html("服务器开小差了～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

function getBodyChange(targetRoleId){
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search+"&targetRoleId="+targetRoleId;
	/*var finalUrl=host+"/v1/api/camp/getBodyChange?roleId="+roleId;*/
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				//判断是不是学员自己或者教练查看，以此判断是否显示我的身材部分
				var myRoleId=getParamByUrl("roleId");
				var coachRoleId=data.resp.coachRoleId;
				if( myRoleId == coachRoleId ){
					$(".change").css("display","block");

					if(data.resp.pictureCount && data.resp.pictureCount==1){
						var deviceType=isMobile();//判断是不是app的方法
						if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
							$(".changeList-main2").unbind("click").click(function(){
							var data={
								link:absoluteUrl+"photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId,
							    animation: 1//默认1从右到左，2从下到上
							};
							data=JSON.stringify(data);
							mobileApp.openWebview(data);
							});
						}else{
							$(".changeList-main2").attr("href","photoAlbumTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId);
						}
						event.stopPropagation();
					}else{
						var deviceType=isMobile();//判断是不是app的方法
						if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
							$(".changeList-main2").unbind("click").click(function(){
							var data={
								link:absoluteUrl+"figureContrastTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId,
							    animation: 1//默认1从右到左，2从下到上
							};
							data=JSON.stringify(data);
							mobileApp.openWebview(data);
							});
						}else{
							$(".changeList-main2").attr("href","figureContrastTrainer.html"+window.location.search+"&targetRoleId="+targetRoleId);
						}
						event.stopPropagation();	
					}
				}
				/*身体数据变化数据交互--开始*/
				if(data.resp.flag == 1){
					$(".bodyChange").css("display","block");
					/*测量时段数据交互--开始*/
					$(".measure-time").find("span").text(data.resp.period);
					$(".measure-time").find("img").attr("src",data.resp.url);
					$(".measure-time").css("top",($(".bodyChange-bottom").height()-$(".measure-time").height())/2);
					/*测量时段数据交互--结束*/
				}else{
					$(".bodyChange").css("display","none");
				}

				/*身体数据变化数据交互--结束*/
				/*体重变化--开始*/
				if(data.resp.wChange == "--"){
					$(".wFlag").css("display","none");
					$(".wChangePar").html("<span class='wChange'>"+data.resp.wChange+"</span>");
				}else{
					$(".wChangePar").html("<span class='wChange'>"+data.resp.wChange+"</span>"+"KG");
					$(".wFlag").css("visibility","visible");
					if(data.resp.wFlag == "1"){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
						$(".wChangePar").css("color","#fb5562");
					}else if(data.resp.wFlag == "2" || data.resp.wChange == "0"){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
					}
				}

				console.info(data.resp.fChange == "--");
				if(data.resp.fChange == "--"){
					$(".fFlag").css("display","none");
					$(".fChangePar").html("<span class='fChange'>"+data.resp.fChange+"</span>");
				}else{
					$(".fChangePar").html("<span class='fChange'>"+data.resp.fChange+"</span>"+"%");
					$(".fFlag").css("visibility","visible");
					if(data.resp.fFlag == "1"){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
						$(".fChangePar").css("color","#fb5562");
					}else if(data.resp.fFlag == "2" || data.resp.fChange == "0"){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
					}
				}

				/*体重变化--结束*/
				if(data.resp.fat.length >0 || data.resp.weight.length >0 || data.resp.bodyMeasure.length >0){
					$(".chartContent").css("display","block");
					$(".message").css("display","none");
					$(".message").css("bodyMessage","none");
					/*画图区域--开始*/
					$(".line").css("height",$(window).width()/750*120);
					$(".lineNum").css("height",$(window).width()/750*158);
					/*$(".chartBottom").css("width","100%");*/
					$("#weight").css("width",$(".chartBottom").width()*0.8);
					$("#fat").css("width",$(".chartBottom").width()*0.8);
					$("#waist").css("width",$(".chartBottom").width()*0.8);
					//体重折线图
					var weightArr=data.resp.weight;
					var weightEntity={
						"originArr":weightArr,             //初始数组		
						"chartID":"weight",					//折线canvas的id名称
						"chartNumID":"weightNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#1daffa",		//折线颜色
						"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"#d2effe",			//折线点的外圈颜色
						"dotFillColor2":"#1daffa",			//折线点的内圈颜色
						"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					getLineChart(weightEntity);

					//体脂折线图
					var fatArr=data.resp.fat;
					var fatEntity={
						"originArr":fatArr,            		//初始数组		
						"chartID":"fat",					//折线canvas的id名称
						"chartNumID":"fatNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#1daffa",		//折线颜色
						"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"#d2effe",			//折线点的外圈颜色
						"dotFillColor2":"#1daffa",			//折线点的内圈颜色
						"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					getLineChart(fatEntity);

					//体围（胸围）折线图
					var waistArr=data.resp.bodyMeasure;
					var waistEntity={
						"originArr":waistArr,            		//初始数组		
						"chartID":"waist",					//折线canvas的id名称
						"chartNumID":"waistNum",			//折线点的区域的名称
						"lineFillColor":"#c1e9fb",			//折线填充颜色
						"lineStrokeColor":"#1daffa",		//折线颜色
						"lineStrokeColor2":"#d2effe",		//折线颜色(数据时不满足7个时)
						"dotFillColor1":"#d2effe",			//折线点的外圈颜色
						"dotFillColor2":"#1daffa",			//折线点的内圈颜色
						"dotFillColor3":"#fff",				//折线点的内圈颜色(没有数据时)
						"waveHeight":(2*parseFloat($("html").css("font-size")))
					};
					getLineChart(waistEntity);
					/*画图区域--完*/
				}else{
					$(".chartContent").css("display","none");
					$(".message").css("display","block");
					$(".bodyMessage").css("display","block");
				}
			}else{
				// alert("服务器开小差了～");
                $(".error-main-t").html("服务器开小差了～");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				$(".bodyChange").css("display","none");
			}
		}
	});
}

function getLineChart(chartEntity){
	$("#"+chartEntity.chartNumID).empty();
	console.info(chartEntity);
	var fontSize=parseFloat($("html").css("font-size"));
	console.info(fontSize);
	var dateIsSame=false;
	var noData= chartEntity.originArr.length==0?true:false;
	var hPercentArr=[];
	var wPercentArr=[];
	//小于7的时候是7天数据，补全后面数据
	var originArr2=[];
	if(noData){
		originArr2=[50,50,50,50,50,50,50];
	}else{
		originArr2=chartEntity.originArr.concat();
	}

	//补充数据
	while(originArr2.length < 7){
		originArr2.push(chartEntity.originArr[chartEntity.originArr.length-1]);
	}
	console.info(originArr2);
	var canScale=window.devicePixelRatio;
	//获得数组最大值
	var maxWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.max.apply(null, chartEntity.originArr);
	//获得数组最大值的下标
	var maxWeightIndex=chartEntity.originArr.lastIndexOf(maxWeight);
	//获得数组最小值
	var minWeight= chartEntity.originArr.length == 0 ? originArr2[0]:Math.min.apply(null, chartEntity.originArr);
	//获得数组最小值的下标
	var minWeightIndex=chartEntity.originArr.lastIndexOf(minWeight);
	//获得最大值最小值差值
	var weightDef= maxWeight-minWeight;
	console.info(maxWeight+"||"+minWeight);

	var minHeight=2*fontSize;


	//获取每天间隔
	var dateArr=[];
	var date=0;
	var dateLength=0;
	if(chartEntity.originArr.length > 7){
		dateLength=chartEntity.originArr.length;
	}else{
		dateLength=7;
	}
	for(var i=0;i<dateLength;i++){
		if(i == 0){
			dateArr.push(0);
		}else{
			date+=1/(dateLength-1);
			dateArr.push(date);
		}
		
	}
	console.info(dateArr);
	console.info(chartEntity.waveHeight);

	//最大值最小值一样
	if(weightDef == 0){
		weightDef = 1;
		dateIsSame=true;
	}

	console.info("--------"+$("#"+chartEntity.chartID).width());

	//初始坐标数据处理
	for(var i=0;i<originArr2.length;i++){
		hPercentArr[i] = (maxWeight-originArr2[i])/weightDef*chartEntity.waveHeight*canScale+minHeight;
		wPercentArr[i] = dateArr[i]*($("#"+chartEntity.chartID).width()-15)*canScale+15;
		console.info(hPercentArr[i]+"||"+wPercentArr[i]);
	}
	var diffWidth=(wPercentArr[1]-wPercentArr[0])/canScale;


	//画布初始化
	var canvas=document.getElementById(chartEntity.chartID);
	var context=canvas.getContext("2d");
	canvas.width=$("#"+chartEntity.chartID).width()*canScale;
	canvas.height=$("#"+chartEntity.chartID).height()*canScale;

	//小于7个点
	if(chartEntity.originArr.length <= 7){
		console.info("originArr2.length"+originArr2.length);
		//画线
		for(var i=0;i<originArr2.length;i++){
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
			}
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			if(i < chartEntity.originArr.length){
				if(dateIsSame){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-13)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else{
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-1.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}
		}
		//alert($("#weightNum").children("div:eq("+maxWeightIndex+")").attr("style")+"("+maxWeightIndex+")");
		if(chartEntity.originArr.length < 7){
			context.strokeStyle = chartEntity.lineStrokeColor2;
		}else{
			context.strokeStyle = chartEntity.lineStrokeColor;
		}
		context.lineWidth = 1*canScale;
		context.stroke();
		//描点
		for(var i=0;i<originArr2.length;i++){
			context.lineWidth=1*canScale;
			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],4*canScale,0,2*Math.PI);
			context.closePath();
			context.fillStyle= chartEntity.dotFillColor1;
			context.fill();

			context.beginPath();
			context.arc(wPercentArr[i],hPercentArr[i],2*canScale,0,2*Math.PI);
			context.closePath();
			

			if(i < chartEntity.originArr.length){
				context.fillStyle= chartEntity.dotFillColor2;
			}else{
				context.fillStyle= chartEntity.dotFillColor3;
			}
			context.fill();
		}

	}else{
		for(var i=0;i<chartEntity.originArr.length;i++){
			context.lineTo(wPercentArr[i],hPercentArr[i]);
			var hNumPosition=0;
			//用户数据不变
			if(dateIsSame){
				$("#"+chartEntity.chartID).css("marginTop","1.75rem");
				if(i == chartEntity.originArr.length-1){
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}else{
			//用户数据变化
				hNumPosition=hPercentArr[i]/canScale;
				if(i == maxWeightIndex){
				//最高点
					if((chartEntity.originArr.length-1-maxWeightIndex)*diffWidth <= 24){
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[chartEntity.originArr.length-1]/canScale-10-24)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}else{
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}
				}else if(i == minWeightIndex){
					//最低点
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+0.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
				//最后一点
				if(i == chartEntity.originArr.length-1 && minWeight != chartEntity.originArr[chartEntity.originArr.length-1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length-1]){
					//当前一个点比最后一个点高，这时候数据应该展示在折线下方
					if(hPercentArr[i] > hPercentArr[i-1]){
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+0.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}else{
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-1.5*fontSize+0.75*fontSize)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}
				}
			}			
		}
		//alert($("#weightNum").children("div:eq("+maxWeightIndex+")").attr("style")+"("+maxWeightIndex+")");
		console.info(chartEntity.lineStrokeColor);
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1*canScale;
		context.stroke();
	}

}



function addFriend(name,friendUserId){
	/*var linkJump=window.location.protocol+"//"+window.location.host+"/app/friend/";*/
	var linkJump=absoluteUrl;
	var myName="有品燃脂营"+name;
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
		if(getParamByUrl("os")=="iOS"){
			if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
				var data={
					title: "亲友验证",
					rightDisplay: true,
					hasRightImg: true,
					rightImg: "http://cdn2.picooc.com/web/res/appFriend/rightIcon/righticon10-ios.png",
					hasLeftImg: true,
					leftImg: "http://cdn2.picooc.com/web/res/appFriend/rightIcon/lefticon5-ios.png",
					url: linkJump+"searchsendmsg.html"+window.location.search+"&myName="+myName+"&friendUserId="+friendUserId,
					animation: 1
				};
				data=JSON.stringify(data);
				mobileApp.setPageInfo(data);
			}
			else{
				var data={
					title: "亲友验证",
					rightDisplay: true,
					hasRightImg: true,
					rightImg: "http://cdn2.picooc.com/web/res/appFriend/righticon10-ios.png",
					hasLeftImg: true,
					leftImg: "http://cdn2.picooc.com/web/res/appFriend/lefticon5-ios.png",
					url: linkJump+"searchsendmsg.html"+window.location.search+"&myName="+myName+"&friendUserId="+friendUserId,
					animation: 1
				};
				data=JSON.stringify(data);
				mobileApp.setPageInfo(data);
			}
			
		}
		else{
			if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
				var data={
					title: "亲友验证",
					rightDisplay: true,
					hasRightImg: true,
					rightImg: "http://cdn2.picooc.com/web/res/appFriend/rightIcon/righticon5.png",
					hasLeftImg: true,
					leftImg: "http://cdn2.picooc.com/web/res/appFriend/rightIcon/lefticon2.png",
					url: linkJump+"searchsendmsg.html"+window.location.search+"&myName="+myName+"&friendUserId="+friendUserId,
					animation: 1
				};
				data=JSON.stringify(data);
				mobileApp.setPageInfo(data);
			}
			else{
				var data={
					title: "亲友验证",
					rightDisplay: true,
					hasRightImg: true,
					rightImg: "http://cdn2.picooc.com/web/res/appFriend/righticon5.png",
					hasLeftImg: true,
					leftImg: "http://cdn2.picooc.com/web/res/appFriend/lefticon2.png",
					url: linkJump+"searchsendmsg.html"+window.location.search+"&myName="+myName+"&friendUserId="+friendUserId,
					animation: 1
				};
				data=JSON.stringify(data);
				mobileApp.setPageInfo(data);
			}
		}
	}else{
			window.location.href=linkJump+"searchsendmsg.html"+window.location.search+"&myName="+myName+"&friendUserId="+friendUserId;
	}
}

//打开一个新的webWiew
function getNewWebWiew(url){
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
    }else{
    	window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}