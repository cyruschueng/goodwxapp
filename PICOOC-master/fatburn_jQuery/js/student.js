
var pageIndex=1;
var joinDate=0;
var tabBtn=true;
var bodycampid="";
var isCheckNotify = false;
$(function(){
	shaixuanFrom = 0;
	shaixuanFrom2 = 0;
	var myDate = new Date();   
	//判断是否是最新版本App

	if(getCookie("nowDayL")!=(myDate.toLocaleDateString()) || getCookie("nowDayL")==""){
		isNewVersion();
		setCookie("nowDayL",myDate.toLocaleDateString(),1);
	}
	var deviceType=isMobile();
	var theDevice=getParamByUrl("os").toLocaleLowerCase();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined") && theDevice == "ios"){
        FastClick.attach(document.body);
    }

    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        $(".rightTop").css("display","none");
    }else{
    	$(".rightTop").css("display","block");
    }

	/*FastClick.attach(document.body);*/
	/*FastClick.attach($(".messageList"));
	FastClick.attach($(".history"));*/
	$(".info-t img").css("top",(2-1.125)*fontHeight/2);

	$(".headimg").css("left",$(window).width()/2-(1.5625*fontHeight/2)-12);

	/*$(".info-t img").css("top",(2*fontHeight-0.8*fontHeight*33/29)/2);*/
	/*if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
		$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
	}
	for(var i=0;i<$(".partLeft-p1 span").length;i++){
		if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
			$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2);
		}
	}*/
	getList("hasDelete");
		//排行榜
	getRankList();
	  //在营续营是否填写填写入营前调查问卷
	isSubmit();
	//在营是否填写结营前调查问卷
	// isEndSubmit();
	//刷新营内动态
	var isCampTrendJump=getCookie("campTrend");
	if(isCampTrendJump == 1){
		$(".tab").css("z-index",996);
		$(".headimg").css("display","none");
		//$(".tabList:eq(1)").click();
		setCookie("campTrend",2,1);

		delCookie("campTrend");
		delCookie("campTrend");
		$(".tab").css("display","block");
		$(".tab").css("position","fixed");
		$(".tabList").eq(0).removeClass("active");
		$(".tabList").eq(1).addClass("active");
		$(".msgType1").css("display","none");
		$(".msgType2").css("display","block");
		time=0;
		pageIndex=2;
		pageIndex2=0;
		tabBtn=false;
		indexOfCheckList=0;
		getList2(2,0,true);
		console.log(1);
		$(".setcard").css("display","none");
		$(".headimg").css("display","none");
	    getReportist();
	    var time1=setTimeout(function(){
			if(pageIndex==1){
				$(".setcard").css("display","block");
			}
			else{
				$(".setcard").css("display","none");
			}
			$(".tab").css("display","block");
			$(".tab").css("position","fixed");
			clearTimeout(time1);
		},550);

	}
	
	//我的身材点击跳转
	
	//公告swiper切换初始化
	var swiper = new Swiper('.swiper-container2', {
        pagination: '.swiper-pagination2',
        paginationClickable: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
		observeParents:true//修改swiper的父元素时，自动初始化swiper
    });

	
	//公告栏数据获取
	/*getReportist();*/
	var swiper ="";
	$(".reportTitle").unbind("click").click(function(){
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_YingNeiGongGao);
		/*$(".reportContent").css("display","none");
		$(this).css("border","none");*/
		setCookie("campTrend",1,1);
		var url='reportList.html'+location.search;
		window.location.href=url;

		/*getNewWebWiew(url);*/
		/*window.location.href=url;*/
	})

	//个人资料页面跳转
	$(".headimg").unbind("click").click(function(){
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoDeTouXiang);
		window.location.href='personInfo.html'+location.search;
	});

	$(".tabList").unbind("click").click(function(){
		
		var index=$(".tabList").index(this);
		if(index == 0){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_GeRenJinZhan);
		}else if(index == 1){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_YingNeiDongTai);
		}
		if(!$(".tabList").eq(index).hasClass("active")){
			$(".shaixuan1").css("display","none");
			$(".shaixuan").css("display","none");
			$(".tabList").removeClass("active");
			$(".tabList").eq(index).addClass("active");
			pageIndex=index+1;
			$(".msgType1").css("display","none");
			$(".msgType2").css("display","none");
			$(".headimg").css("display","block");
			$(".msgType"+pageIndex+"").css("display","block");
			if(pageIndex==1){
				$(".shaixuan1").css("position","relative");
				$(".shaixuan1").css("top",0);
				$(".campstatusContainer1").css("margin-top","0.6rem");
				$("body").unbind("touchmove");
				$("body").unbind("touchend");
				$(window).unbind("scroll");
				$(".shaixuan1").css("display","block");
				$(".shaixuan").css("display","none");
				$('body,html').animate({scrollTop:0},10);
				$(".type-container1").css("display","none");
				$(".type-container").css("display","none");
				$(".typeContainer").css("display","none");
				joinweek=0;
				time=0;
				pageIndex1=0;
				tabBtn=false;
				isFirstLoad=0;
				isCampOver=false;
				getList("hasDelete",0);
				getCanvasData();
				$(".setcard").css("display","block");
				//setCookie("studentStatu",1,1);
			}else{
				$(".shaixuan").css("position","relative");
				$(".shaixuan").css("top","0");
				$(".campstatusContainer").css("margin-top","0.6rem");
				$(".shaixuan").css("display","block");
				$(".shaixuan1").css("display","none");
				$("body").unbind("touchmove");
				$("body").unbind("touchend");
				$('body,html').animate({scrollTop:0},10);
				$(".type-container1").css("display","none");
				$(".type-container").css("display","none");
				$(".typeContainer").css("display","none");
				time=0;
				pageIndex2=0;
				tabBtn=false;
				indexOfCheckList=0;
				getList2(2,0,true);
				console.log(1);
				$(".setcard").css("display","none");
				$(".headimg").css("display","none");

				/*//公告
				swiper = new Swiper('.swiper-container1', {
			        pagination: '.swiper-pagination1',
			        paginationClickable: true
			    });*/
			    getReportist();

				//setCookie("studentStatu",2,1);
				//排行榜
				getRankList();
			}
			
		}
		console.log(pageIndex);
	});



/*	var studentStatu=getCookie("studentStatu");
	if(studentStatu == 2){
		$(".tabList:eq(1)").click();	
		delCookie("studentStatu");
	}*/

	/*体脂体重tag切换--开始*/
	/*$(".info-tab").find("span").each(function(){
		$(this).unbind("click").click(function(){
			//$(this).css({"backgroundColor":"#1daffa","color":"#fff"}).siblings().css({"color":"#1daffa","backgroundColor":"#fff"});
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("tag-weight")){
				$(".weightContent").css("display","block");
				$(".fatContent").css("display","none");
			}else{
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","block");
			}
		});
	});*/

	$(".info-tab-btn").on("touchstart",function(){
		/*$(this).css({"backgroundColor":"#1daffa","color":"#fff"}).siblings().css({"color":"#1daffa","backgroundColor":"#fff"});*/
		//$(this).addClass("active").siblings().removeClass("active");
		var btnIndex=$(".info-tab-btn").index(this);
		$(".info-tab-btn").removeClass("active");
		$(".info-tab-btn").eq(btnIndex).addClass("active");
		if($(this).hasClass("tag-weight")){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_TiZhong);
			$(".weightContent").css("display","block");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","none");
		}else if($(this).hasClass("tag-fat")){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ZhiFang);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","block");
			$(".waistContent").css("display","none");
		}else{
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_YaoWei);
			$(".weightContent").css("display","none");
			$(".fatContent").css("display","none");
			$(".waistContent").css("display","block");
		}
	});
	/*体脂体重tag切换--完*/
	
	/*画图区域--开始*/
	getCanvasData();
	/*画图区域--完*/

	$("#comment-msg").bind('input propertychange',function(){
		//$(this).css("height",this.scrollHeight+'px');
		/*console.log(this.scrollHeight);
		console.log($("textarea").height());*/
	})

	$(".rank").unbind("click").click(function(){
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_JianZhiPaiMingXiangQing);
		/*setCookie("studentStatu",2,1);*/
		var rankUrl='rankList.html'+location.search;
		setCookie("campTrend",1,1);
		window.location.href=rankUrl;
		/*getNewWebWiew(rankUrl);*/
	});

	$(".bodyChange").unbind("click").click(function(){
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_GengDuoZhiBiao);
		/*setCookie("studentStatu",2,1);*/
		var bodyUrl='bodyChange.html'+location.search;
		getNewWebWiew(bodyUrl);
	});
	

	if(getCookie("setCardL") && getCookie("setCardL")=="1" && getCookie("cardShareNotify")!="0"){
		
		var cardSareTip=setTimeout(function(){
			rightBtnHidden();
			leftControl(true);
			$('body').bind("touchmove",function(e){  
		        e.preventDefault();  
		    });
		    $("body").css("overflowY","hidden");
		    var theDevice=getParamByUrl("os");
			if(theDevice == "android"){
				backControl(true,"notifyHidden");
			}
			$(".fixbg-notify").css("display","block");
			$(".fixbg-main-notify").css("margin-top",-$(".fixbg-main-notify").height()/2);
			$(".fixbg-main-btn1-notify").unbind("click").click(function(event){
				event.stopPropagation();
				// $(".fixbg-notify").css("display","none");
				notifyHidden();
			});
			$(".fixbg-main-btn2-notify").unbind("click").click(function(event){
				// $(".fixbg-notify").css("display","none");
				notifyHidden();
				var setCardLId = getCookie("setCardId");
				var deviceType=isMobile();//判断是不是app的方法
				if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

					var data={
						link:absoluteUrl+"infotest2.html"+window.location.search+"&checkId="+setCardLId,
					    animation: 2//默认1从右到左，2从下到上
					};
					data=JSON.stringify(data);
					mobileApp.openWebview(data);
				
				}
				else{
					window.location.href="infotest2.html"+window.location.search+"&checkId="+setCardLId;
				}
				event.stopPropagation();
			});
			$(".fixbg-main-n-notify #notify").unbind("click").click(function(event){
				event.stopPropagation();
		        if(!isCheckNotify){
		            $(this).attr("src","image/student/check4.png");
		            setCookie("cardShareNotify","0",100);
		            isCheckNotify=true;
		        }else{
		            $(this).attr("src","image/student/check3.png");
		            setCookie("cardShareNotify","1",100);
		            isCheckNotify=false;
		        }
			});
			setCookie("setCardL","0",1);
			clearTimeout(cardSareTip);
		},550);
	}else{
		$(".fixbg-notify").css("display","none");
		setCookie("setCardL","0",1);
	}
/*function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'有品燃脂营',
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
}*/
/*appNoShare();*/

/*$(".setcard-img").unbind("click").click(function(){
	//setCookie("studentStatu",pageIndex,1);
	//window.location.href="setcard.html"+location.search;
	//$(".setcard-img").attr("href","setcard.html"+location.search+"&joinDate="+joinDate);
});*/

//结束的反括号

	//自定义监听我的方案和我的身材埋点
	$('.changeList').unbind('click').click(function () {
		var index = $(this).index();
		if(index == 0){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoDeFangAn);
		}else if(index == 1){
			setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoDeShenCai);
		}
	});
	$('.setcard').unbind('click').click(function () {
		setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_WoYaoDaKa);
		window.location.href = 'setcard1.html'+window.location.search;
	});
})



function getCanvasData(){
	var targetRoleId=getParamByUrl("roleId");
	var host=window.location.protocol+"//"+window.location.host;
	/*var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search;*/
	var finalUrl=host+"/v1/api/camp/getTrend"+window.location.search;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				if(data.resp.headPortraitUrl && data.resp.headPortraitUrl!=null && data.resp.headPortraitUrl!=""){
					$(".headimg").css("background-image","url("+data.resp.headPortraitUrl+")");
					
				}else{
					$(".headimg").css('background-image',"url("+arrHeadImg[data.resp.sex]+")");
					
				}
				var arrIcon=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-10.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-11.png"];
				if(data.resp.isOver){
					$(".joinStatus").html("已结营 "+data.resp.beginTime+"-"+data.resp.endTime);
					// $(".campstatus").css("display","block");
					appNoShare("有品燃脂营"+data.resp.campName);
				}else{
					$(".joinWeek").html(data.resp.week);
					$(".joinDay").html(data.resp.day);
					// $(".campstatus").css("display","none");
					appNoShare("有品燃脂营");
				}
				//调用右上角方法
				getMessage("getEntrance");
				joinDate=data.resp.day;
				if(data.resp.wFlag!=undefined ){
					$(".info-change1-p2").eq(0).html("<span></span>");
					$(".info-change1-p2").eq(1).html("<span></span>");
					$(".info-change1-p2 span").eq(0).html('<img src="'+arrIcon[data.resp.wFlag-1]+'">'+data.resp.wChange);
					$(".info-change1-p2").eq(0).append("kg");
					$(".info-change1-p2 span").eq(1).html('<img src="'+arrIcon[data.resp.fFlag-1]+'">'+data.resp.fChange);
					$(".info-change1-p2").eq(1).append("%");
				}
				else{
					$(".info-change1-p2").eq(0).html('<span>'+data.resp.wChange+'</span>');
					$(".info-change1-p2").eq(1).html('<span>'+data.resp.fChange+'</span>');
				}
				
				$(".info-change1-p2 span").eq(2).html(data.resp.inFat);
				/*画图区域--开始*/
				$(".line").css("height",$(window).width()/750*120);
				$(".lineNum").css("height",$(window).width()/750*158);
				$(".chartBottom").css("width","100%");
				$("#weight").css("width",$(".chartBottom").width()*0.96);
				$("#fat").css("width",$(".chartBottom").width()*0.96);
				$("#waist").css("width",$(".chartBottom").width()*0.96);
				//体重折线图
				var weightArr=data.resp.weight;
				var weightEntity={
					"originArr":weightArr,              //初始数组		
					/*"dateArr":dateArr1,				//称量时间*/
					"chartID":"weight",					//折线canvas的id名称
					"chartNumID":"weightNum",			//折线点的区域的名称
					"lineFillColor":"#c1e9fb",			//折线填充颜色
					"lineStrokeColor":"#fff",		//折线颜色
					"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
					"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
					"dotFillColor2":"#fff",			    //折线点的内圈颜色
					"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
					"waveHeight":(2*parseFloat($("html").css("font-size")))
				};
				getLineChart(weightEntity);
				//体脂折线图
				var fatArr=data.resp.fat;
				var fatEntity={
					"originArr":fatArr,            		//初始数组		
					/*"dateArr":dateArr1,				//称量时间*/
					"chartID":"fat",					//折线canvas的id名称
					"chartNumID":"fatNum",			//折线点的区域的名称
					"lineFillColor":"#c1e9fb",			//折线填充颜色
					"lineStrokeColor":"#fff",		//折线颜色
					"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
					"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
					"dotFillColor2":"#fff",			    //折线点的内圈颜色
					"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
					"waveHeight":(2*parseFloat($("html").css("font-size")))
				};
				getLineChart(fatEntity);
				//体围（胸围）折线图
				var waistArr=data.resp.bodyMeasure;
				var waistEntity={
					"originArr":waistArr,            		//初始数组		
					/*"dateArr":dateArr1,				//称量时间*/
					"chartID":"waist",					//折线canvas的id名称
					"chartNumID":"waistNum",			//折线点的区域的名称
					"lineFillColor":"#c1e9fb",			//折线填充颜色
					"lineStrokeColor":"#fff",		//折线颜色
					"lineStrokeColor2":"rgba(255,255,255,0.3)",		//折线颜色(数据时不满足7个时)
					"dotFillColor1":"rgba(255,255,255,0.3)",			//折线点的外圈颜色
					"dotFillColor2":"#fff",			    //折线点的内圈颜色
					"dotFillColor3":"#1daffa",			//折线点的内圈颜色(没有数据时)
					"waveHeight":(2*parseFloat($("html").css("font-size")))
				};
				getLineChart(waistEntity);
				/*画图区域--完*/
			}else{
                $(".error-main-t").html("服务器开小差了~");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

function getLineChart(chartEntity){
	console.info(chartEntity);
	$("#"+chartEntity.chartNumID).empty();
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

	var minHeight=2*parseFloat($("html").css("font-size"));


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
	console.info("dateIsSame"+dateIsSame);

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
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-15)+"px;left:"+(wPercentArr[i]/canScale-5)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else{
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-25)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}
		}
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
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hPercentArr[i]/canScale-15)+"px;left:"+(wPercentArr[i]/canScale-5)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
			}else{
			//用户数据变化
				hNumPosition=hPercentArr[i]/canScale;
					if(i == maxWeightIndex){
				//最高点
					if((chartEntity.originArr.length-1-maxWeightIndex)*diffWidth <= 24){
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[chartEntity.originArr.length-1]/canScale-10-24)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}else{
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[i]/canScale-10)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}
					//$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}else if(i == minWeightIndex){
					//最低点
					$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+8)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
				}
				//最后一点
				if(i == chartEntity.originArr.length-1 && minWeight != chartEntity.originArr[chartEntity.originArr.length-1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length-1]){
					//当前一个点比最后一个点高，这时候数据应该展示在折线下方
					if(hPercentArr[i] > hPercentArr[i-1]){
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition+8)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}else{
						$("#"+chartEntity.chartNumID).append("<div class='weightNum-item' style='position:absolute;top:"+(hNumPosition-25)+"px;left:"+(wPercentArr[i]/canScale-16)+"px;'>"+chartEntity.originArr[i]+"</div>");
					}
					
				}
			}
			
			
			
		}
		console.info(chartEntity.lineStrokeColor);
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1*canScale;
		context.stroke();
	}
}

function getRankList(){
    var targetRoleId=getParamByUrl("roleId");
    var host=window.location.protocol+"//"+window.location.host;
    /*var finalUrl=host+"/v1/api/camp/getBodyChange"+window.location.search;*/
    var finalUrl=host+"/v1/api/campCommon/campRankList"+window.location.search;
    console.info(finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
            	if(data.resp.stuList == null && data.resp.count == 0){
            		$(".rank").css("display","none");
            	}else{
            		$(".rank").css("display","block");
	            	var rankLists=data.resp.stuList;
	            	var isOverCamp= getParamByUrl("targetCampId")== "false" ? false:true;
	            	if(isOverCamp){
	            		$(".rankTitle").children("span").text(data.resp.campName);
	            	}else{
	            		$(".rankTitle").children("span").text("第"+data.resp.week+"周减脂排行");
	            	}
	            	$("#firstHeader").attr("src",rankLists[0].url);
	            	$("#firstHeader").attr("onerror",getDefaultHeader(rankLists[0].sex));
	            	$("#firstRank").text(rankLists[0].name);

	            	$("#secondHeader").attr("src",rankLists[1].url);
	            	$("#secondHeader").attr("onerror",getDefaultHeader(rankLists[1].sex));
	            	$("#secondRank").text(rankLists[1].name);

	            	$("#thirdHeader").attr("src",rankLists[2].url);
	            	$("#thirdHeader").attr("onerror",getDefaultHeader(rankLists[2].sex));
	            	$("#thirdRank").text(rankLists[2].name);

	            	function getDefaultHeader(sex){
	            		var headerImg="";
	            		 if(sex == 0){
	                        headerImg="this.src='http://cdn2.picooc.com/web/res/sex0.png'";
	                    }else{
	                        headerImg="this.src='http://cdn2.picooc.com/web/res/sex1.png'";
	                    }
	                    return headerImg;
	            	}
	            }
            }
        }
    })
}

//获得公告列表
function getReportist(){
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/campStu/noticeList"+window.location.search;
    console.info(finalUrl);
    $.ajax({
        type:"get",
        url:finalUrl,
        dataType:"json",
        success:function(data){
            if(data.code == 200){
            	var reportHtml="";
            	var reportList=data.resp;
            	var reportLength=data.resp.length > 3 ? 3 : data.resp.length;
            	if(reportLength > 0){
            		$(".campReport").css("display","block");
            		$("#reportList").empty();
	            	for(var i=0;i<reportLength;i++){
	            		var url="'"+"reportDetial.html"+location.search+"&noticeId="+reportList[i].id+"'";
	            		reportHtml+='<div class="swiper-slide report-item" onclick="reportJump('+url+')">'
						            	+'<div class="item-title">'+data.resp[i].title+'</div>'
						            	+'<div class="item-content">'+data.resp[i].content+'</div>'
						            	+'<div class="item-date">'+data.resp[i].createTime+'</div>'
						            +'</div>';
	            	}
	            	$("#reportList").append(reportHtml);
	            	var nowReportId=reportList[0].id;
	            	var oldReportId=getCookie("oldReportId");
	            	console.info(nowReportId+"||"+oldReportId);
	            	if(nowReportId <= oldReportId){
	            		$(".reportContent").css("display","none");
						$(".reportTitle").css("border","none");
						$(".reportTitle").css("borderStyle","none");
						$(".reportTitle").css("borderWidth","0px");
	            	}else{
	            		$(".reportTitle").css("border-width","0px 0px 1px");
	            		$(".reportTitle").css("border-style","solid");
	            		$(".reportTitle").css("border-color","rgb(238, 220, 206)");
	            		$(".reportContent").css("display","block");

	            		/*$(".reportTitle").addClass("reportHasNew");*/
	            	}
	            	setCookie("oldReportId",reportList[0].id,30);
	            	
	            	if(reportLength == 1){
	            		$("#report-pagination").css("display","none");
	            	}
            	}else{
            		$(".campReport").css("display","none");
            	}
            }
        }
    });
} 

function reportJump(url){
	setCookie("campTrend",1,1);
	window.location.href=url;
}

//我的身材跳转页面
function mybodyLink(campId){
		bodycampid=campId;
		// var storage = window.localStorage;
		// storage.setItem("uploadurl",0); //在本地缓存中设置上传照片的入口标识
		setCookie("uploadurl",0,1);

		var roleId=getParamByUrl("roleId");
		// var campId =  $(".changeList-main2").attr("campId");
		// var roleId =  $(".changeList-main2").attr("roleId");
		console.log(campId);
		console.log(roleId);
		var finalUrl=ajaxLink+"/v1/api/campCommon/campPictureCount"+window.location.search+"&campId="+campId+"&roleId="+roleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					console.log("success");
						if(data.resp==0){
							setCookie("loadtourl",0,1);
							// var deviceType=isMobile();//判断是不是app的方法
							// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
							// 	$(".changeList-main2").unbind("click").click(function(){
							// 		var t5=setTimeout(mybodyLink2(),2000);
							// 		// var t5=setTimeout(function(){alert("111")},500);
							// 	var data={
							// 		link:absoluteUrl+"figureContrast.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
							// 	    animation: 2//默认1从右到左，2从下到上
							// 	};
							// 	data=JSON.stringify(data);
							// 	mobileApp.openWebview(data);
							// 	})
							// }else{
								$(".changeList-main2").attr("href","figureContrast.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
							// }
							event.stopPropagation();

						}else if(data.resp==1){
							setCookie("loadtourl",1,1);
							setCookie("toPhoto",1,1);
							// var deviceType=isMobile();//判断是不是app的方法
							// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
							// 	$(".changeList-main2").unbind("click").click(function(){
							// 		// var t5=setTimeout(function(){alert("111")},500);
							// 		var t5=setTimeout(mybodyLink2(),2000);
							// 	var data={
							// 		link:absoluteUrl+"photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
							// 	    animation: 2//默认1从右到左，2从下到上
							// 	};
							// 	data=JSON.stringify(data);
							// 	mobileApp.openWebview(data);
							// 	})
							// }else{
								$(".changeList-main2").attr("href","photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
							// }
							event.stopPropagation();
						}else if(data.resp>1){
							setCookie("loadtourl",1,1);
							// var deviceType=isMobile();//判断是不是app的方法
							// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
							// 	$(".changeList-main2").unbind("click").click(function(){
							// 		// var t5=setTimeout(function(){alert("111")},500);
							// 		var t5=setTimeout(mybodyLink2(),2000);
							// 	var data={
							// 		link:absoluteUrl+"figureContrast2.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
							// 	    animation: 2//默认1从右到左，2从下到上
							// 	};
							// 	data=JSON.stringify(data);
							// 	mobileApp.openWebview(data);
							// 	})
							// }else{
								$(".changeList-main2").attr("href","figureContrast2.html"+window.location.search+"&campId="+campId+"&roleId="+roleId);
							// }
							event.stopPropagation();
						}

				}
				else{
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
}

function mybodyLink2(){
	mybodyLink(bodycampid);
}

$(".rightTop").unbind("click").click(function(){
	getEntrance();
});

//点击右上角的获得消息入口和历史参营入口
function getEntrance(){
	var cengHeight=Math.max($(window).height(),$(".ceng").height());
	$(".ceng").css("position","fixed");
	$(".ceng").css("top",0);
	var u = navigator.userAgent.toLowerCase();
	if(u.indexOf("gt-i9300") > 0){
		$(".ceng").css("height","843px");
	}else{
		$(".ceng").css("height",cengHeight);
	}	
	$(".ceng").css("display","block");
	$('body').bind("touchmove",function(e){  
        e.preventDefault();  
    });
    $("body").css("overflowY","hidden");
    getMessage("cengHidden");
    leftControl(true);
    var theDevice=getParamByUrl("os");
	if(theDevice == "android"){
		backControl(true,"cengHidden");
	}
}

function cengHidden(){
	$(".ceng").css("display","none");
	$('body').unbind("touchmove");
	$("body").css("overflowY","auto");
	getMessage("getEntrance");
	leftControl(false);
	var theDevice=getParamByUrl("os");
	if(theDevice == "android"){
		backControl(false,"");
	}
}

function notifyHidden(){
	$(".fixbg-notify").css("display","none");
	$('body').unbind("touchmove");
	$("body").css("overflowY","auto");
	getMessage("getEntrance");
	leftControl(false);
	var theDevice=getParamByUrl("os");
	if(theDevice == "android"){
		backControl(false,"");
	}
}

$(".ceng").unbind("click").click(function(){
	cengHidden();
});

$(".messageList").unbind("click").click(function(e){
	var isCampTrend=$(".active").hasClass("tab1") ? false:true;
	if(isCampTrend){
		setCookie("campTrend",1,1);
	}
	window.location.href=absoluteUrl+'messageList.html'+location.search;
	e.preventDefault(); 
});


/*$(".history").unbind("click").click(function(e){
	window.location.href=absoluteUrl+'historyFatburn.html'+location.search;
	e.preventDefault();
});*/

/*$(".messageList").on("touchstart",function(e){
	window.location.href=absoluteUrl+'messageList.html'+location.search;
	e.preventDefault(); 
});

$(".history").on("touchstart",function(e){
	window.location.href=absoluteUrl+'historyFatburn.html'+location.search;
	e.preventDefault();
});*/

/*$(".messageList").on('touchstart',function(e){
	window.location.href='messageList.html'+location.search;
	e.preventDefault(); 
});

$(".history").on('touchstart',function(e){
	window.location.href='historyFatburn.html'+location.search;
	e.preventDefault();
});
*/
//刷新营内动态
//在修改信息后跳转到营内动态
function infoRefresh(){
	/*setCookie("stuPageJump",true,1);*/
	var stuNeedJump=getCookie("stuPageJump");
 	if(stuNeedJump == 1){
 		$(".tab").css("z-index",996);
		getCampTrend();
		delCookie("stuPageJump");
		delCookie("stuPageJump");
 	}

 	delCookie("isRefresh");
	delCookie("isRefresh");	
	
}

function getCampTrend(){
	$(".tab").css("display","block");
	$(".tab").css("position","fixed");
	$(".tabList").eq(0).removeClass("active");
	$(".tabList").eq(1).addClass("active");
	$(".msgType1").css("display","none");
	$(".msgType2").css("display","block");
	time=0;
	pageIndex=2;
	pageIndex2=0;
	tabBtn=false;
	indexOfCheckList=0;
	getList2(2,0,true);
	console.log(1);
	$(".setcard").css("display","none");
	$(".headimg").css("display","none");
    getReportist();
    var time1=setTimeout(function(){
		if(pageIndex==1){
			$(".setcard").css("display","block");
		}
		else{
			$(".setcard").css("display","none");
		}
		clearTimeout(time1);
	},550);
}
//右上角消息入口
function getMessage(functionName){
	var theDevice=getParamByUrl("os");
	var img="";
	if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){

		if(theDevice == "android"){
			img="http://cdn2.picooc.com/web/res/fatburn/image/icon/rightTop.png";
		}else{
			img="http://cdn2.picooc.com/web/res/fatburn/image/icon/rightTop5.png";
		}
	}
	else{
		if(theDevice == "android"){
			img="http://cdn2.picooc.com/web/res/fatburn/image/student/rightTop.png";
		}else{
			img="http://cdn2.picooc.com/web/res/fatburn/image/student/rightTop5.png";
		}
	}
	var getPageInfo = function (){
		var data={
			rightImg: img,//右上角图片
			function:functionName//右上角点击后需要调的h5的方法名
		};
		return JSON.stringify(data);
	};

	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showRightBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}
//右上角隐藏消息入口
function rightBtnHidden(){
	var getPageInfo = function (){
		var data={
			rightImg: "http://cdn2.picooc.com/web/res/fatburn/image/student/noRight.png",//右上角图片
			function:"noRight"//右上角点击后需要调的h5的方法名
		};
		return JSON.stringify(data);
	};
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showRightBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}
function noRight(){

}
//左上角隐藏返回功能
function leftControl(isHidden){
	var getPageInfo = function (){
		var data = {
			iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			hidden:isHidden,
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

//右下角返回按钮设置
function backControl(isHidden,functionName){
	var getPageInfo = function (){
		var data = {
			controlBtn:isHidden,
			function:functionName
		};
		return JSON.stringify(data);
	};

	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showBackBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
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
// //调查问卷弹框
// function showPrompt(){

// 	leftControl(true);
//  	if(getParamByUrl("os")=="android"){
// 		var getPageInfo = function (){
// 			var data = {
// 				controlBtn:true,
// 				function:"promptAndroid"
// 			};
// 			return JSON.stringify(data);
// 		};
// 		var deviceType=isMobile();
// 		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
// 			mobileApp.showBackBtn(getPageInfo());
// 		}
//  	}
// 	$(".prompt-back").css("display","block");
// 	$("body").css("max-height",$(window).height());
// 	$("body").css("overflow","hidden");

// 	var paddingTop = 1.4375*fontHeight;
// 	$(".prompt-back").css("height",$(window).height());
// 	$(".prompt-main").css("width",$(window).width()-50);
// 	$(".prompt-main").css("margin-top",-$(".prompt-main").height()/2-paddingTop);

// 	$(".prompt-main").unbind("click").click(function(event){
// 		event.stopPropagation();
// 	});
// 	$(".prompt-main .del").unbind("click").click(function(event){
// 		event.stopPropagation();
// 		$(".prompt-back").css("display","none");
//     	$("body").css("overflow","auto"); 
// 		$("body").css("max-height","auto");
// 		leftBtnShow();
// 	});
// 	$(".prompt-back").unbind("click").click(function(event){
// 		event.stopPropagation();
// 		$(".prompt-back").css("display","none");
//     	$("body").css("overflow","auto"); 
// 		$("body").css("max-height","auto");
// 		leftBtnShow();
// 	});

// 	$(".prompt-main .button").unbind("click").click(function(event){
// 		leftBtnShow();
// 		var getPageInfo = function (){
// 			var data={
// 				rightImg: "",//右上角图片
// 				function:""//右上角点击后需要调的h5的方法名
// 			};
// 			return JSON.stringify(data);
// 		};

// 		var deviceType=isMobile();
// 		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
// 			mobileApp.showRightBtn(getPageInfo());
// 		}
// 		document.documentElement.style.webkitTouchCallout='none';
// 		event.stopPropagation();
// 		window.location.href="http://form.mikecrm.com/xF1hNk?eventName=fatBurn";
// 	});
// }
// function promptAndroid(){
// 	leftBtnShow();
// 	$(".prompt-back").css("display","none");
// }
function leftBtnShow(){
	var deviceType=isMobile();//判断是不是app的方法
	var getPageInfo = function (){
		var data = {
			iconType:0,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:"",
			hidden:false
		};
		return JSON.stringify(data);
	};
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		mobileApp.showLeftBtn(getPageInfo());
	}
 	if(getParamByUrl("os")=="android"){
		var getPageInfo1 = function (){
			var data = {
				controlBtn:false,
				function:""
			};
			return JSON.stringify(data);
		};
		var deviceType=isMobile();
		if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
			mobileApp.showBackBtn(getPageInfo1());
		}
 	}
}
//在营是否填写入营前调查问卷
function isSubmit(){
		var finalUrl=ajaxLink+"/v1/api/campQuestion/isSubmit"+window.location.search;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					if(data.resp.hasFuture && !data.resp.isSubmit){
						$(".campBeginQue").css("display","block");
						$(".campBeginQue").unbind("click").click(function(e){
								setCookie("toQuestionnaire","3",1); //跳转到入营前调查问卷标识 3为在营首页跳转的
								window.location.href="questionnaire.html"+window.location.search+"&orderId="+data.resp.orderId;
								event.stopPropagation();
						});
					}
				}
			}
		})

}
//在营是否填写结营前调查问卷
// function isEndSubmit(){
// 		var lCampId = getParamByUrl("campId");
// 		var tCampId = getParamByUrl("targetCampId");
// 		// console.log("lCampId==========="+lCampId);
// 		// console.log("tCampId==========="+tCampId);
// 		// console.log(typeof tCampId);
// 		var lastCampId = "";
// 		if(tCampId !="false" && tCampId != ""){
// 			lastCampId = tCampId;
// 		}else{
// 			lastCampId = lCampId;
// 		}
		
// 		var finalUrl=ajaxLink+"/v1/api/campQuestion/isEndSubmit"+window.location.search+"&lastCampId="+lastCampId;
// 		$.ajax({
// 			type:"get",
// 			url:finalUrl,
// 			dataType:"json",
// 			success:function(data){
// 				if(data.code == 200){
// 					if(data.resp.isTwoDays && !data.resp.issubmit){
// 						$(".campOverQue").css("display","block");
// 						$(".campOverQue").unbind("click").click(function(e){
// 							setCookie("windowSearch",window.location.search,1);
// 							// var getPageInfo11 = function (){
// 							// 	var data={
// 							// 		rightImg: "",//右上角图片
// 							// 		function:""//右上角点击后需要调的h5的方法名
// 							// 	};
// 							// 	return JSON.stringify(data);
// 							// };

// 							// var deviceType=isMobile();
// 							// if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
// 							// 	mobileApp.showRightBtn(getPageInfo11());
// 							// }
// 						    window.location.href="http://form.mikecrm.com/xF1hNk?eventName=fatBurn";
// 							e.preventDefault(); 
// 						});
// 					}
// 				}
// 			}
// 		})

// }

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