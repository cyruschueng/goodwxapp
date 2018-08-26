var pageIndex=1;
var targetRoleId=getParamByUrl("targetRoleId");
var functionType1='studentInfo';
var SWoDeGeRenZhuYe={
    SCategory_SWoDeGeRenZhuYe:5061200,
    SWoDeGeRenZhuYe_ShenTiBianHua:5061201,//查看身体变化
    SWoDeGeRenZhuYe_DaKaJiLu:5061202,//查看打卡记录
    SWoDeGeRenZhuYe_JiBenXinXi:5061203,//查看基本信息
    SWoDeGeRenZhuYe_ChaKanTiZhong:5061204,//查看体重
    SWoDeGeRenZhuYe_ChaKanZhiFang:5061205,//查看脂肪
    SWoDeGeRenZhuYe_ChaKanYaoWei:5061206,//查看腰围
    SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua:5061207,//查看更多指标变化
    SWoDeGeRenZhuYe_TiaoZhuanXiuGaiGeRenZiLiao:5061208,//跳转修改个人资料
    SWoDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai:5061209,//教练查看学员身材
    SWoDeGeRenZhuYe_XiuGaiShenGao:5061210,//修改身高
    SWoDeGeRenZhuYe_XiuGaiShengRi:5061211,//修改生日
    SWoDeGeRenZhuYe_XiuGaiShengLiQi:5061212,//修改生理期
    SWoDeGeRenZhuYe_XiuGaiXiGuanCeLiangShiDuan:5061213,//修改习惯测量时段
    SWoDeGeRenZhuYe_XiuGaiTouXiang:5061214,//修改头像
    SWoDeGeRenZhuYe_DianJiShaiXuan:5061215,//我的个人主页点击筛选
};
$(function(){
	shaixuanFrom = 1;
	leftControl(false);
	
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
				getBodyChange(targetRoleId);
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ShenTiBianHua);
			}else if(nextIndex == 1){
				/*nextColor="#ffa700";*/
				$(".info-tag .info-tag-item:eq(0)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png");
				$(".info-tag .info-tag-item:eq(1)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo3.png");
				$(".info-tag .info-tag-item:eq(2)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo4.png");
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DaKaJiLu);
			}else{
				/*nextColor="#ff6162";*/
				$(".info-tag .info-tag-item:eq(0)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png");
				$(".info-tag .info-tag-item:eq(1)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo4.png");
				$(".info-tag .info-tag-item:eq(2)").children("img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo3.png");
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_JiBenXinXi);
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
	/**/
	var baseInfoStatus=getCookie("baseInfo");
	var isRefresh=getCookie("isRefresh");
	if(baseInfoStatus == 1){
		$(".info-tag-item:eq(2)").click();
		delCookie("baseInfo");
		delCookie("baseInfo");
		if(isRefresh == 1){
			needRefresh=true;
			leftControl(needRefresh,false);
			/*delCookie("isRefresh");
			delCookie("isRefresh");*/
		}
		/*setCookie("baseInfo",2,1);*/
	}

	/*体脂体重tag切换--开始*/
	$(".chartTag").children("span").each(function(){
		$(this).unbind("click").click(function(){
			/*$(this).css({"backgroundColor":"#1daffa","color":"#fff"}).siblings().css({"color":"#1daffa","backgroundColor":"#fff"});*/
			$(this).addClass("active").siblings().removeClass("active");
			if($(this).hasClass("tag-weight")){
				$(".weightContent").css("display","block");
				$(".fatContent").css("display","none");
				$(".waistContent").css("display","none");
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanTiZhong);
			}else if($(this).hasClass("tag-fat")){
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","block");
				$(".waistContent").css("display","none");
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanZhiFang);
			}else{
				$(".weightContent").css("display","none");
				$(".fatContent").css("display","none");
				$(".waistContent").css("display","block");
				setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanYaoWei);
			}
		});
	});
	/*体脂体重tag切换--完*/

	/*数据交互--开始*/
	
	getBodyChange(targetRoleId);
	getBaseInfo(targetRoleId);
	/*数据交互--结束*/
	//设置标题
	var myRoleId=getParamByUrl("roleId");
	var targetRoleId=getParamByUrl("targetRoleId");
	if(myRoleId == targetRoleId && myRoleId != "false"){
		appNoShare("我的主页");
	}else{
		appNoShare("Ta的个人主页");
		$(".myPlan").text("Ta的方案");
		$(".myBody").text("Ta的身材");
	}

	//修改个人资料，页面跳转
	$(".jumpItem").each(function(index){
    	$(this).click(function(){
    		var itemName=$(this).children("span:eq(0)").text();
    		var itemValue=$(this).children("span:eq(1)").text();
            var index=$(".jumpItem").index(this);
            window.location.href="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
            setCookie("baseInfo",1,1);
            setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_TiaoZhuanXiuGaiGeRenZiLiao);
            /*var editUrl="editInfo.html"+window.location.search+"&itemName="+itemName+"&index="+index+"&itemValue="+itemValue;
            getNewWebWiew(editUrl);*/
    	});
    });

    $(".userBody").unbind("click").click(function(){
		/*setCookie("studentStatu",2,1);*/
		var bodyUrl='bodyChange.html'+location.search;
		setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua);
		getNewWebWiew(bodyUrl);
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
				/*头部基本信息数据交互--结束*/
				/*学员基本信息数据交互--开始*/
				/*if(data.resp.title.name != "" && data.resp.title.name != null){
					$(".name").find("span:eq(1)").text();
				}else{
					$(".name").css("display","none");
				}*/
				//初始化信息选择控件
				var weightTime=data.resp.weightPreiod;
				var weightTimeText="";
				/*if(weightTime == 0){
					weightTimeText="凌晨时段 (00:00-04:00)";
				}else */
				if(weightTime == 1){
					weightTimeText="上午时段 (04:00-12:00)";
				}else if(weightTime == 2){
					weightTimeText="下午时段 (12:00-16:00)";
				}else if(weightTime == 3){
					weightTimeText="傍晚时段 (16:00-20:00)";
				}else if(weightTime == 4){
					weightTimeText="夜晚时段 (20:00-24:00)";
				}
				console.info("weightTimeText"+weightTimeText);
				/*getBasicData(data.resp.height,weightTimeText);*/
				getBasicData(data.resp.birthday,data.resp.height,weightTimeText,data.resp.physicalPeriod);
				$(".name").find("span:eq(1)").text(data.resp.title.name);
				$(".periodDesc ").find("input:eq(0)").val(weightTimeText);
				$(".height").find("input:eq(0)").val(data.resp.height);
				$(".age").find("input:eq(0)").val(data.resp.birthday);
				$(".career").find("span:eq(1)").text(data.resp.career);
				if(data.resp.title.sex == 1){
					$(".physicalPeriod").css("display","none");
				}else{
					$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);
				}
				/*$(".physicalPeriod").find("input:eq(0)").val(data.resp.physicalPeriod);*/
				$(".area").find("span:eq(1)").text(data.resp.area);
				/*if(data.resp.height != "" && data.resp.height != null){
					$(".height").find("input:eq(0)").val(data.resp.height);
				}else{
					$(".height").css("display","none");
				}
				if(data.resp.age != "" && data.resp.age != null){
					$(".age").find("input:eq(0)").val(data.resp.age);
				}else{
					$(".age").css("display","none");
				}
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
				}*/

				
				/*学员基本信息数据交互--结束*/
			}else{
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
							 setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai);
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
							setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai);
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
					if(data.resp.wFlag == "1"){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
						$(".wChangePar").css("color","#fb5562");
					}else if(data.resp.wFlag == "2" || data.resp.wChange == "0"){
						$(".wFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
						$(".wChangePar").css("color","#75cc2c");
					}
				}

				console.info(data.resp.fChange == "--");
				if(data.resp.fChange == "--"){
					$(".fFlag").css("display","none");
					$(".fChangePar").html("<span class='fChange'>"+data.resp.fChange+"</span>");
				}else{
					$(".fChangePar").html("<span class='fChange'>"+data.resp.fChange+"</span>"+"%");
					if(data.resp.fFlag == "1"){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
						$(".fChangePar").css("color","#fb5562");
					}else if(data.resp.fFlag == "2" || data.resp.fChange == "0"){
						$(".fFlag").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
						$(".fChangePar").css("color","#75cc2c");
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

