var checkDayBtn=0;
var pageIndex1=0;
var clickBtn=true;
var checkType = 9;
var joinweek = 0;
var isCampOver = false;
var isFirstLoad=0; 
var arrContent3="全部"; //筛选按钮显示内容
var arrbg4=[];
var selectImgIndex1=1; //筛选选项索引
var cardtype1=""; //区分是个人进展打卡列表还是学员个人主页打卡列表
var touchmoveBtn=true;
var count=20;
var firstweek="";
var touchTime1;
var touchTime2;
var touchTime3;
var touchTime4;
var roleId=getParamByUrl("roleId");
var bodycampid="";

var shaixuanFrom = ""; //判断是个人进展的筛选，还是我的个人主页，还是它的个人主页的筛选 0 1 2
var SXueYuanShouYe={
	SCategory_SXueYuanShouYe:5060100,
	SXueYuanShouYe_GeRenJinZhan:5060101,//个人进展
	SXueYuanShouYe_YingNeiDongTai:5060102,//营内动态
	SXueYuanShouYe_WoDeTouXiang:5060103,//我的头像
	SXueYuanShouYe_GengDuoZhiBiao:5060104,//更多指标
	SXueYuanShouYe_TiZhong:5060105,//体重
	SXueYuanShouYe_ZhiFang:5060106,//脂肪
	SXueYuanShouYe_YaoWei:5060107,//腰围
	SXueYuanShouYe_WoDeFangAn:5060108,//我的方案
	SXueYuanShouYe_WoDeShenCai:5060109,//我的身材
	SXueYuanShouYe_DianJiShaixuan:5060110,//学员首页点击切筛选
	SXueYuanShouYe_DianJiQieHuanBiaoQian:5060111,//点击切换标签
	SXueYuanShouYe_WoYaoDaKa:5060112,//我要打卡
	SXueYuanShouYe_YingNeiGongGao:5060113,//营内公告
	SXueYuanShouYe_JianZhiPaiMingXiangQing:5060114,//减脂排名详情
	SXueYuanShouYe_ShaiXuanZaoCanDaKa:5060115,//筛选早餐打卡
	SXueYuanShouYe_ShaiXuanWuCanDaKa:5060116,//筛选午餐打卡
	SXueYuanShouYe_ShaiXuanWanCanDaKa:5060117,//筛选晚餐打卡
	SXueYuanShouYe_ShaiXuanJiaCanDaKa:5060118,//筛选加餐打卡
	SXueYuanShouYe_ShaiXuanYinShiDaKa:5060119,//筛选饮食打卡
	SXueYuanShouYe_ShaiXuanYunDongDaKa:5060120,//筛选运动打卡
};
//cardtype:0个人进展，1个人主页
function getList(hasDelete,cardtype){

	// $(".msgType1 .list").css("min-height","100px");
	// if((".loading-load")!= undefined){
	// 	$(".loading-load").css("display","block");
	// }
	clearInterval(touchTime1);
	clearTimeout(touchTime2);
	clearInterval(touchTime3);
	clearTimeout(touchTime4);
	var loadingstr = '<aside class="loading-load" style="display:block"><span class="loading-point loading-point-active"></span><span class="loading-point"></span><span class="loading-point"></span></aside>';
	if(cardtype==0){  //个人进展营内动态切换
		$(".shaixuan").css("display","none");
		$(".campstatusContent").css("display","none");
		$(".shaixuan1").css("display","block");
		$(".shaixuan1").css("position","relative");
		$(".shaixuan1").css("top",0);
		$(".campstatusContainer1").css("margin-top","0.6rem");
	}else if(cardtype==1){
		$(".campstatusContent").css("display","none");
		$(".shaixuan1").css("display","block");
		$(".shaixuan1").css("position","relative");
		$(".shaixuan1").css("top",0);
		$(".campstatusContainer1").css("margin-top","0.6rem");

		$(".msgType1 .list").css("margin-bottom","0");
	}
	if(pageIndex==2){
		$(".shaixuan").css("position","relative");
		$(".shaixuan").css("top","0");
		$(".campstatusContainer").css("margin-top","0.6rem");
		$(".shaixuan").css("display","block");
		$(".shaixuan1").css("display","none");
	}
	//$(".msgType1").css("min-height",$(window).height()+700);
	if(window.location.pathname=="/web/fatburn/student.html" || window.location.pathname=="/web/fatburntest/student.html"){
		$(".headimg").css("display","block");
		// $(".shaixuan").css("display","none");
	}
	// console.log(1);
	//评论输入框测试开始
	// if(msg){
	// 	msgtest=msg;
	// }
	//评论输入框测试结束

	var targetCampId=-1;
	//$(".msgType1 .list").html('');
	if(pageIndex1==0){
		hasNextBtn1=true;
		$(".msgType1 .list").html('');
		$(".msgType1 .list").html(loadingstr);
		loading();
	}
	if(hasNextBtn1 && clickBtn){
		clickBtn=false;
		var ajaxStr1="";
		if(pageIndex1==0){
			checkDayBtn=0;
			// $(".msgType1 .list").html('');
			// $(".msgType1 .list").html(loadingstr);
			// loading();
			ajaxStr1="&count="+count;
		}
		else{
			ajaxStr1="&count="+count+"&time="+time;
		}
		if(cardtype==1){
			cardtype1 = cardtype;
		}
		if(hasDelete=="hasDelete"){
			functionType=1;
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=1&targetRoleId="+roleId+ajaxStr1+"&checkType="+checkType;			
		}
		else{
			functionType=2;
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=1"+ajaxStr1+"&checkType="+checkType;
		}
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					// if(window.location.pathname=="/web/fatburn/student.html" || window.location.pathname=="/web/fatburntest/student.html"){
					// 	if(data.resp.couponFlag){
					// 		showPrompt();
					// 	}
					// }
					hasNextBtn1=data.resp.hasNext;

					if(data.resp.time!= undefined){
						time=data.resp.time;
					}
					if(data.resp.hasNews){
						$(".hasMsg").css("display","block");
						$(".hasMsg span").html(data.resp.unReadNum);
					}
					else{
						$(".hasMsg").css("display","none");
					}

					if(data.resp.hasHistory){
						$(".history").css("display","block");
					}

					var str1='';
					var str2='';
					var campId=data.resp.campId;
					if(window.location.pathname=="/web/fatburn/student.html" || window.location.pathname=="/web/fatburntest/student.html"){
						mybodyLink(campId);
					}
					if(data.resp.checkList.length>0){
						//给我的身材添加id
						
						$(".changeList-main2").attr("campId",data.resp.campId);
						$(".changeList-main2").attr("roleId",data.resp.checkList[0].roleId);
						


						for(var i=0;i<data.resp.checkList.length;i++){
							var strImg='';
							var strZan='';
							var strMsg='';
							var objImgName='img'+objImgIndex;
							objImgIndex++;
							//图片添加开始
							var arrTestImg=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","https://cdn2.picooc.com/web/res/fatburn/image/msg-2.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","https://cdn2.picooc.com/web/res/fatburn/image/bg1.jpg"];
							//data.resp.checkList[i].imgs=strToJson(data.resp.checkList[i].imgs);
							if(data.resp.checkList[i].imgs!=null){
								if(data.resp.checkList[i].imgs.length==0){
									//strImg='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div></div>';
									strImg='';
								}
								else if(data.resp.checkList[i].imgs.length==4){
									//strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[3].url+')\"></div></div>';
									var strImg1="";
									for(var j=0;j<2;j++){
										strImg1+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@200h_200w_1e)\"></div>';
										//strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[3].url+')\"></div></div>';
									}
									strImg+='<div class="row">'+strImg1+'</div>';
									var strImg2="";
									for(var j=2;j<4;j++){
										strImg2+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@200h_200w_1e)\"></div>';
									}
									strImg+='<div class="row">'+strImg2+'</div>';
								}
								else if(data.resp.checkList[i].imgs.length==1){
									strImg+='<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2" objImg="'+objImgName+'" objImgIndex="'+0+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+'@400h_400w_1e)\"></div>';
								}
								else if(data.resp.checkList[i].imgs.length==2){
									for(var j=0;j<data.resp.checkList[i].imgs.length;j++){
										strImg+='<div class="col-xs-6 col-sm-6 partRight-img-li partRight-img-li3" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@300h_300w_1e)\"></div>';
									}
									strImg='<div class="row">'+strImg+'</div>';
								}
								else{
									for(var j=0;j<data.resp.checkList[i].imgs.length;j++){
										strImg+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@100h_100w_1e)\"></div>';
									}
									strImg='<div class="row">'+strImg+'</div>';
								}
							}
							objImg[objImgName]=data.resp.checkList[i].imgs;
							
							//图片添加结束
							//点赞的人开始
							if(data.resp.checkList[i].praises.length==0){
								strZan='';
							}
							else{
								var arrMsgZan=["msgZanName1","msgZanName2"];
								for(var j=0;j<data.resp.checkList[i].praises.length;j++){
									var msgZanBtn=0;
									if(data.resp.checkList[i].praises[j].isCoach){
										msgZanBtn=1;
									}
									if(j==data.resp.checkList[i].praises.length-1){
										strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].praises[j].praiseRoleName+'</a>';
									}
									else{
										strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].praises[j].praiseRoleName+'，</a>';
									}
								}
								strZan='<div class="row msgZan"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" />'+strZan+'</div>';
							}
							//点赞的人结束
							//评论内容开始
							if(data.resp.checkList[i].replys.length==0){

							}
							else{
								for(var j=0;j<data.resp.checkList[i].replys.length;j++){
									var strMsgName='';
									var arrIsCoach=["msgInfo-name","msgInfo-name2"];
									var arrIsCoachBtn=0;
									var arrIsCoachBtn2=0;
									var headIsCoach="no";
									if(data.resp.checkList[i].replys[j].isCoach){
										arrIsCoachBtn=1;
										headIsCoach="yes";
									}
									if(data.resp.checkList[i].replys[j].isReplyCoach){
										arrIsCoachBtn2=1;
									}
									
									if(data.resp.checkList[i].replys[j].level==1){

										strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].replys[j].roleName+'：</a>'+data.resp.checkList[i].replys[j].content;
									
									}
									else{
										strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].replys[j].roleName+'</a><span>回复</span><a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.checkList[i].replys[j].replyRoleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].replys[j].replyRoleName+'：</a>'+data.resp.checkList[i].replys[j].content;
									}
									strMsg+='<div class="row msgInfo">'+
													'<a class="msgInfo-headerHref" headIsCoach="'+headIsCoach+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'" targetCampId="'+targetCampId+'"><img class="msgInfo-header" src="'+data.resp.checkList[i].replys[j].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.checkList[i].replys[j].roleSex]+'" /></a>'+
													'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
														'<span class="msgInfo-msg" checkId="'+data.resp.checkList[i].id+'" replyId="'+data.resp.checkList[i].replys[j].id+'" replyRoleId="'+data.resp.checkList[i].replys[j].roleId+'" partIndex="'+(count*pageIndex1+parseInt(i))+'" roleName="'+data.resp.checkList[i].replys[j].roleName+'">'+strMsgName+
													'</div>'+
												'</div>';
								}
							}
							
							//评论内容结束
							//添加打卡内容
							var hasZanBtn="";
							var hasZanImgBtn=0;
							if(data.resp.checkList[i].hasPraised){
								hasZanBtn="hasZan";
								hasZanImgBtn=1;
							}
							var strMsgTotol='';
							if(strZan!="" || strMsg!=""){
								strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+'</div>';
							}
							else{
								strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>';
							}

							var strDelete='';
							var shareStr='<a class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="https://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></a>';
							if(hasDelete=="hasDelete"){
								strDelete='<span class="partRight-type1-delete" checkId="'+data.resp.checkList[i].id+'">删除</span>';
								// shareStr='<a class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></a>';
							}else if(hasDelete=="noDelete" && getParamByUrl("roleId")!="false" && getParamByUrl("roleId")==getParamByUrl("targetRoleId") ){
								strDelete='<span class="partRight-type1-delete" checkId="'+data.resp.checkList[i].id+'">删除</span>';
								// shareStr='<a class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></a>';
							}
							/*var shareStr='';
							if(hasDelete=="hasDelete"){
								shareStr='<a class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="image/cardshare/share.png" /></a>';
							}
							else if(hasDelete=="noDelete"){
								shareStr="";
							}*/
							console.log(hasZanBtn);
							var strPartLeft="";
							var lineLength="";
							var weekshow = "";
							if(data.resp.checkList[i].isDayDisplay){
								console.log(checkDayBtn+"|"+data.resp.checkList[i].checkDay);
								if(data.resp.checkList[i].isCampOver){
									var month = data.resp.checkList[i].checkDay.substring(0,3);//月份
    								var dayth = data.resp.checkList[i].checkDay.substring(3,5);//日期
    								if(checkDayBtn==data.resp.checkList[i].checkDay){
										strPartLeft='';
										lineLength="lineLength3";
									}
									else{
										if(isCampOver){
											weekshow="";
											strPartLeft='<div class="col-xs-2 col-sm-2 partLeft2">'+
													'<div class="row">'+
														
														'<div class="col-xs-12 col-sm-12 partLeft-p4"><span>'+dayth+'</span></div>'+
														'<div class="col-xs-12 col-sm-12 partLeft-p5"><span>'+month+'</span></div>'+
													'</div>'+
												'</div>';
											lineLength="lineLength1";	
										}else{
											if(isFirstLoad==0){
												// weekshow ='<div class="shaixuan1"><div class="row col-xs-12 col-sm-12 campstatusContainer1">'+
												// '<div class="ttab1"><span class="tabtype1">全部</span></div>'+
												// '<div class="row col-xs-12 col-sm-12 campstatus1">'+
												// '<div class="campstatusContent">已结营</div>'+
												// '</div>'+
												// '</div>'+
												// '<div class="type-container1">'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/all.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>'+
												// '</div></div>';
												$(".shaixuan1").css("display","block");
												$(".campstatusContent").css("display","block");
												$(".campstatusContent").html("已结营");
												isFirstLoad++;
											}else{
												weekshow = '<div class="col-xs-12 col-sm-12 campstatus">'+
															'<div class="campstatusContent">已结营</div>'+
															'</div>';
											}	
		
										strPartLeft='<div class="col-xs-2 col-sm-2 partLeft">'+
												'<div class="row">'+
													
													'<div class="col-xs-12 col-sm-12 partLeft-p4"><span>'+dayth+'</span></div>'+
													'<div class="col-xs-12 col-sm-12 partLeft-p5"><span>'+month+'</span></div>'+
												'</div>'+
											'</div>';	
										}

									}
									isCampOver=true;
								}else{
									isCampOver=false;
									if(checkDayBtn==data.resp.checkList[i].checkDay){
										strPartLeft='';
										lineLength="lineLength3";
									}
									else{
										if(joinweek == data.resp.checkList[i].joinWeeks){
											weekshow="";
											lineLength="lineLength1";
										strPartLeft='<div class="col-xs-2 col-sm-2 partLeft2">'+
												'<div class="row">'+
													// '<div class="col-xs-12 col-sm-12 partLeft-p1"><span>DAY</span></div>'+
													// '<div class="col-xs-12 col-sm-12 partLeft-p2"><span>'+data.resp.checkList[i].joinDays+'</span></div>'+
													// '<div class="col-xs-12 col-sm-12 partLeft-p3"><span>'+data.resp.checkList[i].checkDay+'</span></div>'+  
													'<div class="col-xs-12 col-sm-12 partLeft-p6"><span class="partLeft-p6-span"><span>第</span><span class="joinDays">'+data.resp.checkList[i].joinDays+'</span><span>天</span></span></div>'+
													'<div class="col-xs-12 col-sm-12 partLeft-p7"><span>'+data.resp.checkList[i].checkDay+'</span></div>'+
												'</div>'+
											'</div>';
										}else{
											if(isFirstLoad==0){
												// weekshow ='<div class="shaixuan1"><div class="row col-xs-12 col-sm-12 campstatusContainer1">'+
												// '<div class="ttab1"><span class="tabtype1">全部</span></div>'+
												// '<div class="row col-xs-12 col-sm-12 campstatus1">'+
												// '<div class="campstatusContent">第'+data.resp.checkList[i].joinWeeks+'周</div>'+
												// '</div>'+
												// '</div>'+
												// '<div class="type-container1">'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/all.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>'+
												// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>'+
												// '</div></div>';
												$(".shaixuan1").css("display","block");
												$(".campstatusContent").css("display","block");
												$(".campstatusContent").html('第'+data.resp.checkList[i].joinWeeks+'周');
												isFirstLoad++;
											}else{
												weekshow = '<div class="row col-xs-12 col-sm-12 campstatus" partIndex='+(count*pageIndex1+parseInt(i))+' >'+
													'<div class="campstatusContent">第'+data.resp.checkList[i].joinWeeks+'周</div>'+
													'</div>';
											}

											joinweek= data.resp.checkList[i].joinWeeks;
											// weekshow = '<div class="row col-xs-12 col-sm-12 campstatus">'+
											// 	'<div class="campstatusContent">第'+data.resp.checkList[i].joinWeeks+'周</div>'+
											// 	'</div>';
											strPartLeft='<div class="col-xs-2 col-sm-2 partLeft">'+
													'<div class="row">'+
														// '<div class="col-xs-12 col-sm-12 partLeft-p1"><span>DAY</span></div>'+
														// '<div class="col-xs-12 col-sm-12 partLeft-p2"><span>'+data.resp.checkList[i].joinDays+'</span></div>'+
														// '<div class="col-xs-12 col-sm-12 partLeft-p3"><span>'+data.resp.checkList[i].checkDay+'</span></div>'+  
														'<div class="col-xs-12 col-sm-12 partLeft-p6"><span class="partLeft-p6-span"><span>第</span><span class="joinDays">'+data.resp.checkList[i].joinDays+'</span><span>天</span></span></div>'+
														'<div class="col-xs-12 col-sm-12 partLeft-p7"><span>'+data.resp.checkList[i].checkDay+'</span></div>'+
													'</div>'+
												'</div>';
										}
									}
									
								}


							}
							else{
								lineLength="lineLength3";
							}
							str1+= weekshow+'<aside class="row part '+lineLength+'">'+strPartLeft+
									'<div class="col-xs-12 col-sm-12 partRight" part="'+(count*pageIndex1+parseInt(i))+'">'+
										'<div class="row partRight-paddingleft">'+
											'<div class="col-xs-12 col-sm-12 partRight-icon">'+
											'<span style="background-image:url('+cardTypeBg[data.resp.checkList[i].type]+')">'+cardType[data.resp.checkList[i].type]+'</span>'+
											'</div>'+
											'<div class="col-xs-12 col-sm-12 partRight-p1">'+data.resp.checkList[i].content+'</div>'+
											'<div class="col-xs-12 col-sm-12 partRight-img">'+strImg+'</div>'+
											'<div class="col-xs-12 col-sm-12 partRight-type1">'+
												'<span class="partRight-type1-date">'+data.resp.checkList[i].checkTime+'</span>'+strDelete+shareStr+
												'<span class="partRight-type1-zan '+hasZanBtn+'" checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="'+arrHasZan[hasZanImgBtn]+'" /><span>'+data.resp.checkList[i].praiseNum+'</span></span>'+
												'<span class="partRight-type1-msg" checkId="'+data.resp.checkList[i].id+'" replyId="0" replyRoleId="'+data.resp.checkList[i].roleId+'" partIndex="'+(count*pageIndex1+parseInt(i))+'"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/student-7.png" /></span>'+
											'</div>'+strMsgTotol+
										'</div>'+
									'</div>'+
								'</aside>';
						//for循环结束
						checkDayBtn=data.resp.checkList[i].checkDay;
						}
						stopLoading();
						var noCardList = '<div class="cardListMessage"><span>没有更多内容了</span></div>';
						$(".msgType1 .list").append(str1);
						if( $("body").height()>$(window).height() && !hasNextBtn1){
							$(".msgType1 .list").append(noCardList);
							$(".cardListMessage").css("display","block");
						}else{
							$(".cardListMessage").css("display","none");
						}
						
						$(".msgType1 .list").css("min-height",0);
						$(".msgType1 .part").eq(0).css("padding-top",0);
						$(".msgType1 .partLeft").eq(0).css("top",0);
						if(pageIndex1==0){
							firstweek = $(".campstatus1 .campstatusContent").html();
						}
						console.log("firstweek1------"+firstweek);
						pageIndex1++;
						if(cardtype==0){  //个人进展营内动态切换
							
							$(".shaixuan1").css("position","relative");
							$(".shaixuan1").css("top",0);
							$(".campstatusContainer1").css("margin-top","0.6rem");
							$(".shaixuan1").css("display","block");
							$(".msgType1 .list").css("margin-top",0);
						}else if(cardtype==1){
							
							$(".shaixuan1").css("position","relative");
							$(".shaixuan1").css("top",0);
							$(".campstatusContainer1").css("margin-top","0.6rem");
							$(".shaixuan1").css("display","block");
							$(".msgType1 .list").css("margin-top",0);
						}
						// $(".msgType1 .part").eq(0).css("padding","3.2rem 1.25rem 1rem");
						// $(window).scrollTop(deleteScrollTop);						//$(".msgType2 .list").html(str2);
						//alert($(".msgType1 .partRight-img").eq(0).width()/3+"||"+$(".msgType1 .partRight-img-li2").eq(0).width());
						console.log("测试z"+($(window).width()-(2.5+3.75)*fontHeight)/3);
						$(".msgType1 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
						$(".msgType1 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
						$(".msgType1 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
						console.log("测试z"+$(".msgType1 .partRight-img-li").eq(0).height()+"|"+$(".msgType1 .partRight-img-li2").height());

						/*$(".partRight-img-li").css("height",$(".msgType1 .partRight-img").eq(0).width()/3);
						$(".partRight-img-li2").css("height",$(".msgType1 .partRight-img-li2").eq(0).width()*3/4);*/
						bindBigImg();//绑定预览图
						shareLink();//绑定分享事件
						//绑定评论按钮
						// if(msg=="ceshi"){
						$(".partRight-type1-msg").unbind("click").click(function(event){
							if($(".cardListMessage").length>0){
								$(".cardListMessage").css("display","none");
							}
							setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_PingLunXiaoXi);
							//getKeyBoard(true);
							var index=$(".partRight-type1-msg").index(this);
							level=1;
							if(dataAddMsg.replyId!=$(".partRight-type1-msg").eq(index).attr("replyId") || dataAddMsg.checkId!=$(".partRight-type1-msg").eq(index).attr("checkId")){
								$("#comment2-msg1").val("");
								$("#comment2-msg2").val("");
								$("#comment2-msg1").css("height",commentHeight);
								$("#comment2-msg2").css("height",commentHeight);
								$(".imgContainer").css("height",commentHeight);
								$(".comment2 .btn").css("height",commentHeight);
								arrStrLen=[];
								arrScrollHeight=[];
							}
							partIndex=$(".partRight-type1-msg").eq(index).attr("partIndex");
							dataAddMsg.level=1;
							dataAddMsg.checkId=$(".partRight-type1-msg").eq(index).attr("checkId");
							dataAddMsg.replyId=$(".partRight-type1-msg").eq(index).attr("replyId");
							dataAddMsg.replyRoleId=$(".partRight-type1-msg").eq(index).attr("replyRoleId");
							$("#comment2-msg1").attr("placeholder",'回复:');
							//$(".footer-top-3").html("回复");
							
							commentBtn=false;
							$(".comment2").css("position","static");
							$(".comment2").css("top","auto");
							$(".comment2").css("bottom","0");
							$(".comment2").css("display","block");
							$(".comment3").css("display","block");
							//$("#comment-msg").css("height","3rem");
							//$(".footer-main").css("margin-bottom","0.5rem");
							//$(".comment").css("margin-bottom","26px");
							$(".setcard").css("display","none");
							console.log($(".comment2").height());
							
							// if(getParamByUrl("os")=="iOS"){
							var x=parseInt($(this).attr("partindex"));
							$(".part").css("display","none");
							$(".partRight").css("display","none");
							for(var i=0;i<x+1;i++){
								$(".part").eq(i).css("display","block");
								$(".partRight").eq(i).css("display","block");
							}
							//隐藏没有更多了
							$(".cardListMessage").css("display","none");
							//隐藏周数显示
							var campstatus = $(".campstatus");
							if(campstatus.length>0){
								for(i=0;i<campstatus.length;i++){
									var campstatusIndex = $(".campstatus").eq(i).attr("partindex");
									console.log("campstatusIndex1:"+campstatusIndex);
									if(campstatusIndex>x){
										console.log("campstatusIndex2:"+campstatusIndex);
										$(".campstatus").eq(i).css("visibility","hidden");
										$(".campstatus").eq(i).css("display","none");
									}
								}
							}
							$("#comment2-msg1").focus();
							if(getParamByUrl("os")=="android"){
								$(".comment2").css("padding-bottom","1.5rem");
							}
							msgScrollTop=$(window).scrollTop();
							newComment2();
							event.stopPropagation();
						});


						bindZan();//绑定点赞的链接跳转
						bindMsg();//绑定评论
						bindName();//绑定跳转
						bindMsgHeader();//绑定评论头像跳转

						//part左边距离
						for(var i=0;i<$(".partLeft-p7 span").length;i++){
							if($(".partLeft-p6 .partLeft-p6-span").eq(i).width()>$(".partLeft-p7 span").eq(i).width()){
								$(".partLeft-p7 span").eq(i).css("padding-left",(($(".partLeft-p6 .partLeft-p6-span").eq(i).width()-$(".partLeft-p7 span").eq(i).width())/2));
							}else{
								$(".partLeft-p6 .partLeft-p6-span").eq(i).css("padding-left",(($(".partLeft-p7 span").eq(i).width()-$(".partLeft-p6 .partLeft-p6-span").eq(i).width())/2));
								
							}
							
						}
						$(".tabtype1").html(arrContent3);
						var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png"];
						var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png"];
						var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐"];
						if(arrbg4.length!=0){
							$(".icon1").eq(arrbg4[0]).find("img").attr("src",arrbg1[arrbg4[0]]);
						}
						arrbg4[0]=selectImgIndex1;
						$(".icon1").eq(selectImgIndex1).find("img").attr("src",arrbg2[selectImgIndex1]);
						//展示筛选
						$(".ttab1").unbind("click").click(function(){
							if(shaixuanFrom==0){
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiShaixuan);
							}else if(shaixuanFrom == 1){
								setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DianJiShaiXuan);
							}else if(shaixuanFrom == 2){
								setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_DianJiShaiXuan);
							}
							
							var display = $(".type-container1").css("display");
							if(display=="none"){
								var topheight = $(this).offset().top-$(window).scrollTop();
								// console.log("topheight-----"+topheight);
								if(topheight>$(window).height()/2){
									$(".type-container1").css("top","-11.5rem");
									$(".type-container1").css("background-image","url(image/studentList/bg2.png)");
									$(".type-container1").css("padding","1rem 1rem");
								}else{
									$(".type-container1").css("top","2.5rem");
									$(".type-container1").css("background-image","url(image/studentList/bg.png)");
									$(".type-container1").css("padding","1.3rem 1rem");
								}
								$(".type-container1").css("display","block");
								$(".typeContainer").css("height",$(window).height());
								$(".typeContainer").css("display","block");
								// $(".shaixuan1").css("z-index","120");
								$(".type-container1").css("z-index","120");
							}else{
								$(".type-container1").hide();
							}

							event.stopPropagation();
						});
						//选中筛选选项
						$(".icon1").unbind("click").click(function(){
							setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
							// $(".msgType1 .list").css("min-height",$(".msgType1 .list").css("height"));
							var index=$(".icon1").index(this);
							btnType=index;
							selectImgIndex1=index;
							if(arrbg4.length!=0){
								$(".icon1").eq(arrbg4[0]).find("img").attr("src",arrbg1[arrbg4[0]]);
							}
							arrbg4[0]=index;
							$(".icon1").eq(index).find("img").attr("src",arrbg2[index]);
							// showBtn();
							arrContent3 = arrContent[index];
							$(".type-container1").hide();
							$(".typeContainer").css("display","none");
							// $(".shaixuan1").css("z-index","10");
							$(".type-container1").css("z-index","10");
							if(index==0){
								checkType=0;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
							}else if(index==1){
								checkType=9;
							}else if(index==2){
								checkType=1;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
							}else if(index==3){
								checkType=5;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
							}else if(index==4){
								checkType=2;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
							}else if(index==5){
								checkType=4;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
							}else if(index==6){
								checkType=3;
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
							}
							joinweek=0;
							time=0;
							pageIndex1=0;
							tabBtn=false;
							isFirstLoad=0;
							isCampOver=false;
							if(cardtype==1){
								if(hasDelete == "noDelete"){
									
									$(".shaixuan1").css("position","relative");
									$(".shaixuan1").css("top",0);
									$(".campstatusContainer1").css("margin-top","0.6rem");
									$(".shaixuan1").css("display","block");
									$("body").unbind("touchmove");
									$("body").unbind("touchend");
									clearInterval(touchTime1);
									clearTimeout(touchTime2);
									clearInterval(touchTime3);
									clearTimeout(touchTime4);
									$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
									//个人进展高度
									$(".msgType1").css("min-height",$(window).height()+700);
									$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-3*fontHeight},200);
									
									getList("noDelete",1);
								}else{
									
									$(".shaixuan1").css("position","relative");
									$(".shaixuan1").css("top",0);
									$(".campstatusContainer1").css("margin-top","0.6rem");
									$(".shaixuan1").css("display","block");
									$("body").unbind("touchmove");
									$("body").unbind("touchend");
									clearInterval(touchTime1);
									clearTimeout(touchTime2);
									clearInterval(touchTime3);
									clearTimeout(touchTime4);
									$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
									//个人进展高度
									$(".msgType1").css("min-height",$(window).height()+700);
									$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-3*fontHeight},200);
									getList("hasDelete",1);
								}
							}else{
								
								$(".shaixuan1").css("position","relative");
								$(".shaixuan1").css("top",0);
								$(".campstatusContainer1").css("margin-top","0.6rem");
								$(".shaixuan1").css("display","block");
								$("body").unbind("touchmove");
								$("body").unbind("touchend");
								clearInterval(touchTime1);
								clearTimeout(touchTime2);
								clearInterval(touchTime3);
								clearTimeout(touchTime4);
								$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
								//个人进展高度
								$(".msgType1").css("min-height",$(window).height()+700);
								$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-5.5*fontHeight},200);
								getList("hasDelete",0);
							}
							event.stopPropagation();
						});
						//隐藏筛选选项卡
						$(".type-container1").unbind("click").click(function(){
							event.stopPropagation();
						});	
						$(".shaixuan1").unbind("click").click(function(){
							event.stopPropagation();
							$(".type-container1").css("display","none");
							$(".typeContainer").css("display","none");
							$(".shaixuan1").css("z-index","10");
							$(".type-container1").css("z-index","10");
						});	
						$(".typeContainer").unbind("click").click(function(){
							event.stopPropagation();
							$(".type-container1").css("display","none");
							$(".typeContainer").css("display","none");
							$(".shaixuan1").css("z-index","10");
							$(".type-container1").css("z-index","10");
						});


						for(var i=0;i<$(".partLeft-p5 span").length;i++){
								$(".partLeft-p5").eq(i).css("padding-left",($(".partLeft-p4 span").eq(i).width())/4);
								
						}
						//绑定删除打卡记录
						$(".partRight-type1-delete").unbind("click").click(function(event){
							event.stopPropagation();
							var deleteIndex=$(".partRight-type1-delete").index(this);
							var deleteCheckId=$(".partRight-type1-delete").eq(deleteIndex).attr("checkId");
							deletePart(deleteIndex,deleteCheckId);
						});
						//绑定点赞
						$(".partRight-type1-zan").unbind("click").click(function(){
							var index=$(".partRight-type1-zan").index(this);
							changeZan(index);
						});

						//筛选位置判断
						if(cardtype && cardtype==1){
							card1Type=1;
							card2Type=1;
						}else{
							card1Type=0;
							card2Type=0;
						}
						
						if(cardtype==1){ //个人主页 筛选定位
							$("body").unbind("touchmove").on("touchmove",function(event){
								$(".type-container1").css("display","none");
								$(".typeContainer").css("display","none");
								partPosition1();
							});
							function partPosition1(){
								if(!shaixuanComment){
									var parttopheight=0;
									if($(".msgType1 .part").length>0){
										parttopheight = $(".msgType1 .part").eq(0).offset().top-$(window).scrollTop();	
									}
									
									if(parttopheight>=0){
										$(".shaixuan1").css("position","relative");
										$(".shaixuan1").css("top",0);
										$(".shaixuan1").css("left",0);
										$(".msgType1 .list").css("margin-top",0);
									}else{
										$(".shaixuan1").css("position","fixed");
										$(".shaixuan1").css("top",0);
										$(".shaixuan1").css("left",0);
										$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
									}

								}
								console.log("定时器1");
								//替换第几周
								var campstatusContainer1 = $(".campstatus");	
								if(campstatusContainer1.length>0){
									var isWeek = true;
									for(i=0;i<campstatusContainer1.length;i++){	
										var topheight2 = $(".campstatus").eq(i).offset().top-$(window).scrollTop();
										if(topheight2<fontHeight*2.9){
											var week = $(".campstatus .campstatusContent").eq(i).html();
											$(".campstatus1 .campstatusContent").html(week);
											isWeek=false;
										}else{
											if(isWeek){
												$(".campstatus1 .campstatusContent").html(firstweek);
											}	
										}
									}
								}
							}
							$("body").unbind("touchend").on("touchend",function(event){
								partPosition1();
								clearInterval(touchTime1);
								clearTimeout(touchTime2);
								console.log("end1");
								touchTime1=setInterval(function(){
									partPosition1();
								},10);
								touchTime2=setTimeout(function(){
									clearInterval(touchTime1);
									clearTimeout(touchTime2);
									console.log("清定时器1");
								},500);
							})
						}else{ //个人进展 筛选定位
							$("body").unbind("touchmove").on("touchmove",function(event){
								$(".type-container1").css("display","none");
								$(".typeContainer").css("display","none");
								partPosition2();
							});
							function partPosition2(){

								if(!shaixuanComment){
									var parttopheight=0;
									if($(".msgType1 .part").length>0){
										parttopheight = $(".msgType1 .part").eq(0).offset().top-$(window).scrollTop();	
									}
									
									if((parttopheight>=fontHeight*3 && $(".shaixuan1").css("position")!= "relative") ||(parttopheight<fontHeight*3 && $(".shaixuan1").css("position")!= "fixed") ){
										touchmoveBtn=true;
									}else{
										touchmoveBtn=false;
									}

									if(touchmoveBtn){
										if(parttopheight>=fontHeight*3){
											$(".campstatusContainer1").css("margin-top","0.6rem");
											$(".shaixuan1").css("position","relative");
											$(".shaixuan1").css("top",0);
											$(".shaixuan1").css("left",0);
											$(".msgType1 .list").css("margin-top",0);
										}else{
											$(".campstatusContainer1").css("margin-top","0");
											$(".shaixuan1").css("position","fixed");
											$(".shaixuan1").css("top","3rem");
											$(".shaixuan1").css("left",0);
											$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
										}
									}
								}
								//替换第几周
								var campstatusContainer1 = $(".campstatus");	
								if(campstatusContainer1.length>0){
									var isWeek = true;
									for(i=0;i<campstatusContainer1.length;i++){
										var topheight2 = $(".campstatus").eq(i).offset().top-$(window).scrollTop();
										if(topheight2<fontHeight*5.15){
											var week = $(".campstatus .campstatusContent").eq(i).html();
											$(".campstatus1 .campstatusContent").html(week);
											isWeek=false;
										}else{
											if(isWeek){
												console.log("firstweek2------"+firstweek);
												$(".campstatus1 .campstatusContent").html(firstweek);
											}	
										}
									}
								}
							}
							
							$("body").unbind("touchend").on("touchend",function(event){
								var timeIndex=0;
								partPosition2();
								clearInterval(touchTime3);
								clearTimeout(touchTime4);
								console.log("end执行");
								touchTime3=setInterval(function(){
									partPosition2();
									timeIndex++;
									console.log(timeIndex);
									if(timeIndex>60){
										clearInterval(touchTime3);
									}
								},10);
								touchTime4=setTimeout(function(){
									clearInterval(touchTime3);
									clearTimeout(touchTime4);
									console.log("清定时器2");
								},500);
							});
							
						}
						bindScroll();			
					}
					else{
						if(pageIndex1==0){
								stopLoading();
								//tabBtn=false;
								//$('body').animate({scrollTop:$(".msgType1 .list").offset().top},200);
								$("body").unbind("touchmove");
								$("body").unbind("touchend");
								clearInterval(touchTime1);
								clearTimeout(touchTime2);
								clearInterval(touchTime3);
								clearTimeout(touchTime4);
								$(".msgType1 .list").html('');
								//$(".msgType1 .list").css("min-height",0);
							// if(hasDelete!="hasDelete"){
								// var weekshow ='<div class="shaixuan1"><div class="row col-xs-12 col-sm-12 campstatusContainer1">'+
								// '<div class="ttab1"><span class="tabtype1">全部</span></div>'+
								// '<div class="row col-xs-12 col-sm-12 campstatus1">'+
								
								// '</div>'+
								// '</div>'+
								// '<div class="type-container1">'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/all.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>'+
								// 	'<div class="icon1"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>'+
								// '</div></div>';
								
								//alert(touchTime1);
								if(cardtype==1){
									cardtype1 = cardtype;
									$(".msgType1").css("min-height",$(window).height()-fontHeight*11.1125);
								}else{
									$(".msgType1").css("min-height",$(window).height()-fontHeight*4.25);
								}
								$(window).unbind('scroll');
								$(".campstatusContent").css("display","none");
								$(".shaixuan1").css("position","relative");
								$(".shaixuan1").css("display","block");
								$(".msgType1 .list").html('<div class="row noRecord">暂无相关打卡记录哦～</div>');
								
								if(cardtype==0){  //个人进展营内动态切换
									
									$(".shaixuan1").css("position","relative");
									$(".shaixuan1").css("top",0);
									$(".campstatusContainer1").css("margin-top","0.6rem");
									$(".shaixuan1").css("left",0);
									$(".shaixuan1").css("display","block");
									$(".msgType1 .list").css("margin-top",0);
								}else if(cardtype==1){
									$(".shaixuan1").css("position","relative");
									$(".shaixuan1").css("top",0);
									$(".campstatusContainer1").css("margin-top","0.6rem");
									$(".shaixuan1").css("left",0);
									$(".shaixuan1").css("display","block");
									$(".msgType1 .list").css("margin-top",0);
								}
								
								//$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-5.5*fontHeight},200);
								$(".tabtype1").html(arrContent3);
								var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png"];
								var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png"];
								var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐"];
								if(arrbg4.length!=0){
									$(".icon1").eq(arrbg4[0]).find("img").attr("src",arrbg1[arrbg4[0]]);
								}
								arrbg4[0]=selectImgIndex1;
								$(".icon1").eq(selectImgIndex1).find("img").attr("src",arrbg2[selectImgIndex1]);

								$(".ttab1").unbind("click").click(function(){
									if(shaixuanFrom==0){
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiShaixuan);
									}else if(shaixuanFrom == 1){
										setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe,SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DianJiShaiXuan);
									}else if(shaixuanFrom == 2){
										setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_DianJiShaiXuan);
									}
									var display = $(".type-container1").css("display");
									if(display=="none"){
										var topheight = $(this).offset().top-$(window).scrollTop();
										// console.log("topheight-----"+topheight);
										if(topheight>$(window).height()/2){
											$(".type-container1").css("top","-11.5rem");
											$(".type-container1").css("background-image","url(image/studentList/bg2.png)");
											$(".type-container1").css("padding","1rem 1rem");
										}else{
											$(".type-container1").css("top","2.5rem");
											$(".type-container1").css("background-image","url(image/studentList/bg.png)");
											$(".type-container1").css("padding","1.3rem 1rem");
										}
										$(".type-container1").css("display","block");
										$(".typeContainer").css("height",$(window).height());
										$(".typeContainer").css("display","block");
										// $(".shaixuan1").css("z-index","120");
										$(".type-container1").css("z-index","120");
									}else{
										$(".type-container1").hide();
									}
									event.stopPropagation();
								});
								$(".icon1").unbind("click").click(function(){
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
									var index=$(".icon1").index(this);
									btnType=index;
									selectImgIndex1=index;
									if(arrbg4.length!=0){
										$(".icon1").eq(arrbg4[0]).find("img").attr("src",arrbg1[arrbg4[0]]);
									}
									arrbg4[0]=index;
									$(".icon1").eq(index).find("img").attr("src",arrbg2[index]);
									// showBtn();
									arrContent3 = arrContent[index];
									$(".type-container1").hide();
									$(".typeContainer").css("display","none");
									$(".shaixuan1").css("z-index","10");
									$(".type-container1").css("z-index","10");
									if(index==0){
										checkType=0;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
									}else if(index==1){
										checkType=9;
									}else if(index==2){
										checkType=1;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
									}else if(index==3){
										checkType=5;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
									}else if(index==4){
										checkType=2;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
									}else if(index==5){
										checkType=4;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
									}else if(index==6){
										checkType=3;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
									}
									joinweek=0;
									time=0;
									pageIndex1=0;
									tabBtn=false;
									isFirstLoad=0;
									isCampOver=false;
									if(cardtype==1){
										if(hasDelete == "noDelete"){
											$(".shaixuan1").css("display","block");
											$(".shaixuan1").css("position","relative");
											$(".shaixuan1").css("top",0);
											$(".campstatusContainer1").css("margin-top","0.6rem");
											
											$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
											clearInterval(touchTime1);
											clearTimeout(touchTime2);
											clearInterval(touchTime3);
											clearTimeout(touchTime4);
											//个人进展高度
											$(".msgType1").css("min-height",$(window).height()+700);
											$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-3*fontHeight},200);
											getList("noDelete",1);
										}else{
											$(".shaixuan1").css("display","block");
											$(".shaixuan1").css("position","relative");
											$(".shaixuan1").css("top",0);
											$(".campstatusContainer1").css("margin-top","0.6rem");
											$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
											clearInterval(touchTime1);
											clearTimeout(touchTime2);
											clearInterval(touchTime3);
											clearTimeout(touchTime4);
											//个人进展高度
											$(".msgType1").css("min-height",$(window).height()+700);
											$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-3*fontHeight},200);
											getList("hasDelete",1);
										}
									}else{
										$(".shaixuan1").css("display","block");
										$(".shaixuan1").css("position","relative");
										$(".shaixuan1").css("top",0);
										$(".campstatusContainer1").css("margin-top","0.6rem");
										$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
										clearInterval(touchTime1);
										clearTimeout(touchTime2);
										clearInterval(touchTime3);
										clearTimeout(touchTime4);
										//个人进展高度
										$(".msgType1").css("min-height",$(window).height()+700);
										$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()-5.5*fontHeight},200);
										getList("hasDelete",0);
									}
									event.stopPropagation();
								});
								$(".type-container1").unbind("click").click(function(){
									event.stopPropagation();
								});	
								$(".shaixuan1").unbind("click").click(function(){
									event.stopPropagation();
									$(".type-container1").css("display","none");
									$(".typeContainer").css("display","none");
									$(".shaixuan1").css("z-index","10");
									$(".type-container1").css("z-index","10");
								});	
								$(".typeContainer").unbind("click").click(function(){
									event.stopPropagation();
									$(".type-container1").css("display","none");
									$(".typeContainer").css("display","none");
									$(".shaixuan1").css("z-index","10");
									$(".type-container1").css("z-index","10");
								});
								var touchTime3=setTimeout(function(){
									clearInterval(touchTime1);
									clearTimeout(touchTime2);
									$(".shaixuan1").css("position","relative");
								},700);
						}
					}
				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
				if(cardtype==1){
					$(".msgType1").css("min-height",$(window).height()-fontHeight*11.1125);
				}else{
					$(".msgType1").css("min-height",$(window).height()-fontHeight*4.25);
				}
				pageBtn=true;
				tabBtn=true;
				clickBtn=true;
			}
		})
	}
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
    var finalUrl=ajaxLink+"/v1/api/campCommon/campPictureCount"+window.location.search+"&campId="+campId;
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

var card1Load=true;