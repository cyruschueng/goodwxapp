
var pageIndex=2;
var tabBtn=true;
var SJiaoLianShouYe={
	SCategory_SJiaoLianShouYe:5070100,
    SJiaoLianShouYe_YouShangJiaoXiaoXiRuKou:5070101,//右上角消息入口
	SJiaoLianShouYe_DaKaJiLu:5070102,//打卡记录
	SJiaoLianShouYe_YingYuanLieBiao:5070103,//营员列表
	SJiaoLianShouYe_GongGaoGuanLi:5070104,//公告管理
    SJiaoLianShouYe_HuoQuErJiCaiDanLieBiao:5070105,//获取二级菜单列表
    SJiaoLianShouYe_DianJiQieHuanQuanBu:5070106,//点击切换'全部'
    SJiaoLianShouYe_DianJiQieHuanBiaoQian:5070107,//点击切换标签
    SJiaoLianShouYe_HuoQuYingYuanLieBiao:5070108,//获取营员列表
    SJiaoLianShouYe_JinRuYingYuanXiangQing:5070109,//进入营员详情
	SJiaoLianShouYe_FaBuGongGao:5070110,//发布公告
    SJiaoLianShouYe_JinRuGongGaoXiangQing:5070111//进入公告详情
};
$(function(){
	var swiper1 = new Swiper('.swiper-container1', {
		slidesPerView : 4
	});
	
	//获得所带班级
	getClassID();
	/*//获得公告列表
	getNoticeList();*/
	appNoShare();
	//下拉刷新
	/*pushOnLoad();*/
	var classContent=$(window).height()-($(".tab").height()+parseFloat($("html").css("font-size"))*4-1);
	$(".studentContent").css("minHeight",classContent);
	$(".page3").css("minHeight",$(window).height()-parseInt($("html").css("font-size"))*3.25);
 
 	$(".report-btn").unbind("click").click(function(){
		setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_FaBuGongGao);
 		var url="publishReport.html"+location.search;
 		setReportLocation2(url);
 		/*window.location.href=url;*/
 		/*getNewWebWiew(url);*/
 	});


	$(".tabList").unbind("click").click(function(){
		var index=$(".tabList").index(this);
		if(index == 0){
			setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_DaKaJiLu);
		}else if(index == 1){
			setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_YingYuanLieBiao);
		}else if(index == 2){
			setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_GongGaoGuanLi);
		}
		if(!$(".tabList").eq(index).hasClass("tabActive")){
			$(".tabList").removeClass("tabActive");
			$(".tabList").eq(index).addClass("tabActive");
			var pageIndex=index+1;
			$(".page1").css("display","none");
			$(".page2").css("display","none");
			$(".page3").css("display","none");
			$(".page"+pageIndex+"").css("display","block");
			
			if(pageIndex==1){
				$("#cardList li").eq(0).click();
				//getList2(3,0);
			}else if(pageIndex==2){
				$("body").scrollTop(0);
			}else if(pageIndex==3){
				//获得公告列表
				getNoticeList();
			}	
		}
	});
		//设置读取是否进入页面的是公告页
	 	var isReport=getCookie("reportLocation");
	 	console.info(isReport == "true");
	 	if(isReport == "true"){
	 		console.info("-------触发");
	 		$(".tabList").eq(2).click();
	 	}
 	

});
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'有品燃脂营',
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

function getClassID(){
	var coachRoleId=getParamByUrl("roleId");
	var host=window.location.protocol+"//"+window.location.host;
	/*var finalUrl=host+"/v1/api/camp/getCampList"+window.location.search;*/
	var finalUrl=host+"/v1/api/camp/getCampList"+window.location.search+"&coachRoleId="+coachRoleId;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				var classNum=data.resp.camps.length;
				var classNum2=data.resp.camps.length;
				var classNum3=data.resp.historyCamps.length;
				//消息红点的控制
				getMessage(data.resp.unReadNum);
				//营员列表开始
				$("#studentList").empty();
				var classHtml="";
				if(classNum > 0){
					for(var i=0;i<classNum;i++){
						var classWidth = "col-xs-3"+" "+"col-sm-3";
						if(classNum <= 4){
							classWidth = "col-xs-"+parseInt(12/classNum)+" "+"col-sm-"+parseInt(12/classNum);
						}
						if(i == 0){
							/*var activeHeight=1.875*parseFloat($("html").css("font-size"))+2;
							alert(parseFloat($("html").css("font-size")));
							alert("这里："+activeHeight);*/
							classHtml+= '<li id='+"'"+data.resp.camps[i].id+"'"+' onclick="getClassStudent('+data.resp.camps[i].id+')" class="tagItem '+classWidth+' swiper-slide active"><span>'+data.resp.camps[i].name+'</span></li>';
						}else{
							classHtml+= '<li id='+"'"+data.resp.camps[i].id+"'"+' onclick="getClassStudent('+data.resp.camps[i].id+')" class="tagItem '+classWidth+' swiper-slide"><span>'+data.resp.camps[i].name+'</span></li>';
						}
						
					}
					$("#studentList").append(classHtml);
					classNum = classNum >= 4 ? 4:classNum;
					console.info(classNum);
					$(".tabList").unbind("click").click(function(){
						var index=$(".tabList").index(this);
						if(index == 0){
							setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_DaKaJiLu);
						}else if(index == 1){
							setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_YingYuanLieBiao);
						}else if(index == 2){
							setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_GongGaoGuanLi);
						}
						if(!$(".tabList").eq(index).hasClass("tabActive")){
							$(".tabList").removeClass("tabActive");
							$(".tabList").eq(index).addClass("tabActive");
							var pageIndex=index+1;
							$(".page1").css("display","none");
							$(".page2").css("display","none");
							$(".page3").css("display","none");
							$(".page"+pageIndex+"").css("display","block");
							/*alert("触发2");*/
							if(pageIndex==1){
								$("#cardList li").eq(0).click();
								//getList2(3,0);
							}else if(pageIndex==2){
								/*alert(12);*/
								$("body").scrollTop(0);
							}else if(pageIndex==3){
								//获得公告列表
								getNoticeList();
							}
							var swiper2 = new Swiper('.swiper-container2', {
								slidesPerView : classNum
							});
							
						}
					});
					var classIndex=getCookie("classTagName");
					if(classIndex != "" && classIndex != null){
						$(".tabList:eq(1)").click();
						$("#"+classIndex).addClass("active").siblings().removeClass("active");
						delCookie("classTagName");
						getClassStudent(classIndex);
						$(".tabList:eq(0)").click(function(){
							var liNum=$("#cardList li").length;
							var swiper1 = new Swiper('.swiper-container1', {
								slidesPerView : liNum
							});
						});
					}else{
						getClassStudent(data.resp.camps[0].id);
					}
					
					//营员列表结束
					//打卡记录开始
					var cardHtml='';
					var cardTotalNum=classNum2+classNum3;
					console.log(classNum2);
					var classWidth = "col-xs-3"+" "+"col-sm-3";
					if(cardTotalNum <= 3){
						classWidth = "col-xs-"+parseInt(12/(cardTotalNum+1))+" "+"col-sm-"+parseInt(12/(cardTotalNum+1));
					}
					class2Width =classNum2;
					cardHtml= '<li onclick="getList2(3,0,true)" class="tagItem active '+classWidth+' swiper-slide"><span>待评论(<span class="msgNum"></span>)</span></li>';
					for(var i=0;i<classNum2;i++){
						if(classNum2 == 1){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.camps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide classCard firstItem lastItem"><span>'+data.resp.camps[i].name+'</span></li>';
						}else if(i == 0){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.camps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide classCard firstItem"><span>'+data.resp.camps[i].name+'</span></li>';
						}else if(i == (classNum2-1)){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.camps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide classCard lastItem"><span>'+data.resp.camps[i].name+'</span></li>';
						}else{
							cardHtml+= '<li onclick="getList2(4,'+data.resp.camps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide classCard"><span>'+data.resp.camps[i].name+'</span></li>';
						}
						/*cardHtml+= '<li onclick="getList2(4,'+data.resp.camps[i].id+')" class="'+classWidth+' tagItem1 swiper-slide classCard"><span>'+data.resp.camps[i].name+'</span></li>';*/
					}
					for(var i=0;i<classNum3;i++){
						if(classNum3 == 1){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard firstItem lastItem"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else if(i == 0){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard firstItem"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else if(i == (classNum3-1)){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard lastItem"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else{
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}
						/*cardHtml+= '<li class="'+classWidth+' tagItem1 swiper-slide historyCard"><span>历史'+i+'班</span></li>';*/
					}
					console.log(cardHtml);
					$("#cardList").append(cardHtml);
					cardTotalNum= cardTotalNum >= 3 ? 4:cardTotalNum+1;
					/*alert(4);*/
					var swiper1 = new Swiper('.swiper-container1', {
							slidesPerView : cardTotalNum
						});
					$(".tabList:eq(0)").click(function(){
						swiper1 = new Swiper('.swiper-container1', {
							slidesPerView : cardTotalNum
						});
					});

					//打卡记录结束
					$(".classTag li").each(function(index){
						$(this).unbind("click").click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					});
					getList2(3,0);
				}else if(classNum3 > 0 && classNum == 0){
					/*alert("当前账号没有燃脂营班级~");*/
					console.info("一出发~~~~");
					var cardHtml='';
					var cardTotalNum=classNum3;
					var classWidth = "col-xs-3"+" "+"col-sm-3";
					if(cardTotalNum <= 3){
						classWidth = "col-xs-"+parseInt(12/cardTotalNum)+" "+"col-sm-"+parseInt(12/cardTotalNum);
					}
					//cardHtml= '<li onclick="getList2(3,0,true)" class="tagItem active '+classWidth+' swiper-slide"><span>待评论(<span class="msgNum"></span>)</span></li>';
					for(var i=0;i<classNum3;i++){
						if(classNum3 == 1){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard firstItem lastItem active"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else if(i == 0){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard firstItem active"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else if(i == (classNum3-1)){
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard lastItem"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}else{
							cardHtml+= '<li onclick="getList2(4,'+data.resp.historyCamps[i].id+',true)" class="'+classWidth+' tagItem1 swiper-slide historyCard"><span>'+data.resp.historyCamps[i].name+'</span></li>';
						}
						/*cardHtml+= '<li class="'+classWidth+' tagItem1 swiper-slide historyCard"><span>历史'+i+'班</span></li>';*/
					}
					$("#cardList").append(cardHtml);
					cardTotalNum= cardTotalNum >= 4 ? 4:cardTotalNum;
					var swiper1 = new Swiper('.swiper-container1', {
							slidesPerView : cardTotalNum
					});
					$(".tabList:eq(0)").click(function(){
						swiper1 = new Swiper('.swiper-container1', {
							slidesPerView : cardTotalNum
						});
					});

					getList2(4,data.resp.historyCamps[0].id);
					$(".studentContent").css("display","none");
					$(".noStudent").css("display","block");
					//打卡记录结束
					$(".tab .tabList").each(function(index){
						$(this).unbind("click").click(function(){
							$(this).addClass("tabActive").siblings().removeClass("tabActive");
							var pageIndex=index+1;
							$(".page1").css("display","none");
							$(".page2").css("display","none");
							$(".page3").css("display","none");
							$(".page"+pageIndex+"").css("display","block");
							/*alert("触发3");*/
							if(pageIndex==3){
								//获得公告列表
								getNoticeList();
							}
						});
					})
					

					$(".classTag li").each(function(index){
						$(this).unbind("click").click(function(){
							$(this).addClass("active").siblings().removeClass("active");
						});
					});
					
				}else{
					// alert("当前账号无燃脂营～");
	                $(".error-main-t").html("当前账号无燃脂营～");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了~");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

function getClassStudent(classID){
	setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_HuoQuYingYuanLieBiao);
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/camp/getCampInfo"+window.location.search+"&campId="+classID;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			console.info(data);
			if(data.code == 200){
				console.info(data.resp.count > 0);
				if(data.resp.count > 0){
					$(".classInfo").attr("id",classID);
					$(".studentContent").css("display","block");
					if(data.resp.hasRank){
						$(".classInfo").css("display","block");
						$(".studentNum").text(data.resp.count);
						$(".class-right").children("span").text("第"+data.resp.weekNum+"周减脂排名");
					}
					
					/*$(".avg-weight").text(data.resp.avgWeightC);
					$(".avg-fat").text(data.resp.avgFatC);*/
					var studentHtml="";
					var headerImg="";
					var studentList=data.resp.stuList;
					var weightTrend="";
					var fatTrend="";
					$(".studentList").empty();
					for(var i=0;i<data.resp.count;i++){
						if(studentList[i].sex == 0){
							headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic02.png'";
						}else{
							headerImg="'http://cdn2.picooc.com/web/res/appFriend/head_portrait_pic01.png'";
						}
						if(studentList[i].weightChange.substring(0,1) == "-" && studentList[i].weightChange != "--"){
							studentList[i].weightChange=Math.abs(parseFloat(studentList[i].weightChange));
							weightTrend='<div>体重</div><div class="tag trend"><span class="tag-value">+'+studentList[i].weightChange+'</span>KG</div>';
						}else if(studentList[i].weightChange.substring(0,1) != "-" && studentList[i].weightChange != "0"){
							weightTrend='<div>体重</div><div class="tag"><span class="tag-value">-'+studentList[i].weightChange+'</span>KG</div>';
						}else if(studentList[i].weightChange == "--"){
							weightTrend='<div>体重</div><div class="tag"><span class="tag-value">'+studentList[i].weightChange+'</span></div>';
						}else{
							weightTrend='<div>体重</div><div class="tag"><span class="tag-value">'+studentList[i].weightChange+'</span>KG</div>';
						}

						if(studentList[i].fatChange.substring(0,1) == "-" && studentList[i].fatChange != "--"){
							studentList[i].fatChange=Math.abs(parseFloat(studentList[i].fatChange));
							fatTrend='<div>脂肪</div><div class="tag trend"><span class="tag-value">+'+studentList[i].fatChange+'</span>%</div>';
						}else if(studentList[i].fatChange.substring(0,1) != "-" && studentList[i].fatChange != "0"){
							fatTrend='<div>脂肪</div><div class="tag"><span class="tag-value">-'+studentList[i].fatChange+'</span>%</div>';
						}else if(studentList[i].fatChange == "--"){
							fatTrend='<div>脂肪</div><div class="tag"><span class="tag-value">'+studentList[i].fatChange+'</span></div>';
						}else{
							fatTrend='<div>脂肪</div><div class="tag"><span class="tag-value">'+studentList[i].fatChange+'</span>%</div>';
						}
						var infoUrl="studentOtherInfo.html"+window.location.search+"&targetRoleId="+studentList[i].roleId+"&targetCampId="+classID;
						/*studentHtml+='<div class="student-item" onclick="setTagLocation('+"'"+infoUrl+"',"+classID+')">'
									+'<img src="'+studentList[i].url+'" onerror="this.src='+headerImg+'" />'
									+'<span class="student-name">'+studentList[i].name+'</span>'
									+'<div class="student-tag">'
										+fatTrend+studentList[i].fatChange+'</div><div>%</div>'
									+'</div>'
									+'<div class="student-tag">'
										+weightTrend+studentList[i].weightChange+'</div><div>KG</div>'
									+'</div>'
									+'<div class="student-tag">'
										+'<div>今日打卡</div><div class="tag-value">'+studentList[i].checkCount+'</div><div>次</div>'
									+'</div>'
								+'</div>';*/

						studentHtml+='<div class="row student-item" onclick="setTagLocation('+"'"+infoUrl+"',"+classID+')">'
										+'<div class="col-xs-3 col-sm-3 student-left">'
											+'<div><img src="'+studentList[i].url+'" onerror="this.src='+headerImg+'" /></div>'
											+'<div><span class="student-name">'+studentList[i].name+'</span></div>'
										+'</div>'
										+'<div class="col-xs-9 col-sm-9">'
											+'<div class="row student-right">'
												+'<div class="student-tag col-xs-4 col-sm-4">'+fatTrend+'</div>'
												+'<div class="student-tag col-xs-4 col-sm-4">'+weightTrend+'</div>'
												+'<div class="student-tag col-xs-4 col-sm-4">'
													+'<div>今日打卡</div>'
													+'<div class="tag"><span class="tag-value">'+studentList[i].checkCount+'</span>次</div>'
												+'</div>'
											+'</div>'
										+'</div>'
									+'</div>';
					}
					$(".studentList").append(studentHtml);
				}else{
					$(".studentContent").css("display","none");
				}
			}else{
				// alert("服务器开小差了~");
	                $(".error-main-t").html("服务器开小差了~");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}
		}
	});
}

//获得公告列表
function getNoticeList(){
	var coachRoleId=getParamByUrl("roleId");
	var host=window.location.protocol+"//"+window.location.host;
	var finalUrl=host+"/v1/api/campCoach/noticeList"+window.location.search+"&coachRoleId="+coachRoleId;
	console.info(finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			console.info(data);
			if(data.code == 200){
				var reportList=data.resp;
				var reportHtml="";
				$(".reportList").empty();
				for(var i=0;i<reportList.length;i++){
					var classTag="";
					for(var j=0;j<reportList[i].campName.length;j++){
						/*classTag+='<span class="col-xs-4 col-sm-4 report-class-item"><span class="report-item-tag">'+reportList[i].campName[j]+'</span></span>';*/
						//classTag+='<span class="report-class-item"><img style="vertical-align:middle;" src="image/studentList/report-icon1a.png" /><span class="report-item-tag">'+reportList[i].campName[j]+'</span></span>';
						//classTag+='<span class="report-class-item"><span class="report-item-icon"></span><span class="report-item-tag">'+reportList[i].campName[j]+'</span></span>';
						classTag+='<span class="report-class-item">'+reportList[i].campName[j]+'</span>';
					}
					//对内容进行转义（特殊部分处理）
					reportList[i].content=escapeContent(reportList[i].content);
					var reportDetialUrl="'"+"reportDetialTrainer.html"+location.search+"&noticeId="+reportList[i].id+"'";
					reportHtml+='<div class="report-item"  id='+"'"+reportList[i].id+"'"+' onclick="setReportLocation('+reportDetialUrl+','+reportList[i].id+')">'
					/*reportHtml+='<div class="report-item" onclick="javascript:this.href='+reportDetialUrl+'">'*/
									+'<div class="item-title">'+reportList[i].title+'</div>'
					            	+'<div class="item-content">'+reportList[i].content+'</div>'
					            	+'<div class="classList row">'+classTag+'</div>'
					            	+'<div class="item-date">'+reportList[i].createTime+'</div>'
					            	+'<div class="item-icon"></div>'
								+'</div>';
				}
				$(".reportList").append(reportHtml);
				if(reportList.length == 0){
					$(".noReport").css("display","block");
				}

				var reportLocation=getCookie("reportLocation");
				if(reportLocation == "true"){
					var reportId=getCookie("reportId");
					var nowLocation=getCookie("nowLocation");
					/*alert(nowLocation);*/
					$("html,body").animate({scrollTop:nowLocation},10);
					delCookie("nowLocation");
					delCookie("nowLocation");
					
					setCookiePath("reportLocation","false",2,"/;domain=picooc.com");
					delCookie("reportLocation");
				}
			
			}
		}
	});

}

function setTagLocation(hrefUrl,classID){
	setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_JinRuYingYuanXiangQing);
	setCookie("classTagName",classID,1);
	window.location.href=hrefUrl+"&campId="+classID;
}

function setReportLocation(hrefUrl,reportId){
    setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_JinRuGongGaoXiangQing);
	/*alert(reportId);*/
	var nowLocation=$(document).scrollTop();
	/*console.info(nowLocation);*/
	/*alert(nowLocation);*/
	setCookie("nowLocation",nowLocation,2);
	setCookie("reportId",reportId,2);
	setCookiePath("reportLocation","true",2,"/;domain=picooc.com");
	window.location.href=hrefUrl;
} 

function setReportLocation2(hrefUrl,reportId){
	setCookiePath("reportLocation","true",2,"/;domain=picooc.com");
	window.location.href=hrefUrl;
}

//右上角消息入口
function getMessage(noReadNum){
    setMaiDian(SJiaoLianShouYe.SCategory_SJiaoLianShouYe,SJiaoLianShouYe.SJiaoLianShouYe_YouShangJiaoXiaoXiRuKou);
	var theDevice=getParamByUrl("os");
	var img="";
	if(theDevice == "android"){
		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
			if(noReadNum > 0){
				img="http://cdn2.picooc.com/web/res/fatburn/image/icon/msg3.png";
			}else{
				img="http://cdn2.picooc.com/web/res/fatburn/image/icon/msg.png";
			}
		}
		else{
			if(noReadNum > 0){
				img="http://cdn2.picooc.com/web/res/fatburn/image/studentList/msg3.png";
			}else{
				img="http://cdn2.picooc.com/web/res/fatburn/image/studentList/msg.png";
			}
		}
		
	}else{
		if(getParamByUrl('webver')!="false" && getParamByUrl('webver')>1){
			if(noReadNum > 0){
				img="http://cdn2.picooc.com/web/res/fatburn/image/icon/msg3-ios.png";
			}else{
				img="http://cdn2.picooc.com/web/res/fatburn/image/icon/msg5-ios.png";
			}
		}
		else{
			if(noReadNum > 0){
				img="http://cdn2.picooc.com/web/res/fatburn/image/studentList/msg3-ios.png";
			}else{
				img="http://cdn2.picooc.com/web/res/fatburn/image/studentList/msg5-ios.png";
			}
		}
		
	}
	var getPageInfo = function (){
		var data={
			rightImg: img,//右上角图片
			function:"jumpMessage"//右上角点击后需要调的h5的方法名
		};
		return JSON.stringify(data);
	};
	
	var deviceType=isMobile();
	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.showRightBtn(getPageInfo());
		}
		else{
			mobileApp.showRightBtn.postMessage(getPageInfo());
		}
		//mobileApp.showRightBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout='none';
}

function jumpMessage(){
	window.location.href="messageList.html"+window.location.search+"&messageFrom=2";
}
function pushOnLoad(){
	//返回角度
	function GetSlideAngle(dx, dy) {
	    return Math.atan2(dy, dx) * 180 / Math.PI;
	}
	 
	//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
	function GetSlideDirection(startX, startY, endX, endY) {
	    var dy = startY - endY;
	    var dx = endX - startX;
	    var angle = GetSlideAngle(dx, dy);  
	    var result = 0;
	 
	    /*//往下滑的，并且滚动条已经到顶
	 	if (angle >= -135 && angle < -45 && $(window).scrollTop() == 0) {
	        result = 2;
	    }//如果滑动距离太短
	    else if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	        return 0;
	    }*/

	    if (dy < 0 && $(window).scrollTop() == 0) {
	        result = 2;
	    }

	    return result;
	}
	 
	//滑动处理
	var startX, startY,isRefresh;
	document.addEventListener('touchstart', function (ev) {
	    startX = ev.touches[0].pageX;
	    startY = ev.touches[0].pageY;   
	    isRefresh=false;
	    /*alert("start"+isRefresh);*/
	}, false);
	document.addEventListener('touchmove', function (ev) {
	    var endX, endY;
	    endX = ev.changedTouches[0].pageX;
	    endY = ev.changedTouches[0].pageY;
	    /*console.info(endY);*/
	    var direction = GetSlideDirection(startX, startY, endX, endY);
	    if(direction == 2){
	    	if($("#cardList li").eq(0).hasClass("active")){
	    		/*if(isRefresh){
					$(".refresh").css("display","block");
					$(".msgType2 .list").css("marginTop",0);
					isRefresh=false;
				}*/
				$(".refresh").css("display","block");
				$(".msgType2 .list").css("marginTop",0);
				isRefresh=true;
	    	}
	    }

	}, false);
	document.addEventListener('touchend', function (ev) {
	    var endX, endY;
	    endX = ev.changedTouches[0].pageX;
	    endY = ev.changedTouches[0].pageY;
	    var direction = GetSlideDirection(startX, startY, endX, endY);
    	/*if($("#cardList li").eq(0).hasClass("active")){
    		$(".refresh").css("display","none");
			$(".msgType2 .list").css("marginTop","1.875rem");
    		if(isRefresh){
				$("#cardList li").eq(0).click();
			}
	    }*/
	   /* alert(isRefresh);*/
	   /*alert($(".refresh").css("display") == "block");*/
	    if(isRefresh && $(".refresh").css("display") == "block"){
	    	$(".refresh").css("display","none");
			$(".msgType2 .list").css("marginTop","1.875rem");
			$("#cardList li").eq(0).click();
			isRefresh=false;
			/*alert("end"+isRefresh);*/
		}

	}, false);
}

/*function pushOnLoad(){
	//返回角度
	function GetSlideAngle(dx, dy) {
	    return Math.atan2(dy, dx) * 180 / Math.PI;
	}
	 
	//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
	function GetSlideDirection(startX, startY, endX, endY) {
	    var dy = startY - endY;
	    var dx = endX - startX;
	    var angle = GetSlideAngle(dx, dy);  
	    var result = 0;
	 
	    //往下滑的，并且滚动条已经到顶
	 	if (angle >= -135 && angle < -45 && $(window).scrollTop() == 0) {
	        result = 2;
	    }//如果滑动距离太短
	    else if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	        return 0;
	    }

	    return result;
	}
	 
	//滑动处理
	var startX, startY;
	document.addEventListener('touchstart', function (ev) {
	    startX = ev.touches[0].pageX;
	    startY = ev.touches[0].pageY;   
	}, false);
	document.addEventListener('touchend', function (ev) {
	    var endX, endY;
	    endX = ev.changedTouches[0].pageX;
	    endY = ev.changedTouches[0].pageY;
	    var direction = GetSlideDirection(startX, startY, endX, endY);
	    if(direction == 2){
	    	if($("#cardList li").eq(0).hasClass("active")){
	    		$("#cardList li").eq(0).click();
	    	}
	    }

	}, false);
}*/

//打开一个新的webWiew
function getNewWebWiew(url){
    url=absoluteUrl+url;
    console.info(url);
    //url="http://"+location.host+"/web/fatburntest/"+url;
    var getPageInfo = function (){
        var data = {
            link:url,
            animation: 2//默认1从右到左，2从下到上
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.openWebview(getPageInfo());
		}
		else{
			mobileApp.openWebview.postMessage(getPageInfo());
		}
        //mobileApp.openWebview(getPageInfo());
    }else{
        window.location.href=url;
    }
    document.documentElement.style.webkitTouchCallout='none';
}