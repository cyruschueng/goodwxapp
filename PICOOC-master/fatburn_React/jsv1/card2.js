var pageIndex2=0;
var ajaxBtn=true;
var type2=0;
var campId2=0;//原本的班级id
var hasNextBtn2=true;
var checkType2 = 9;
var indexOfCheckList=0;
var arrbg3=[];
var arrContent2="全部";
var selectImgIndex2 = 1;
var camCampId = 0;
var checkType4=9;
var touchTime21;
var touchTime22;
var count=20;
var roleId=getParamByUrl("roleId");
// $(function(){
// 	if(getParamByUrl("os")=="android"){
// 		$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
// 	}
// 	$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);


// })
var shaixuanFrom2 = ""; //判断是营内动态的筛选，还是教练的筛选 0 1 
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

function getList2(type,campId,isRefresh){
	// $(".msgType2 .list").css("min-height","100px");

	var loadingstr = '<aside class="loading-load2" style="display:block"><span class="loading-point2 loading-point-active2"></span><span class="loading-point2"></span><span class="loading-point2"></span></aside>';

	if(isRefresh && type==2){
		$(".shaixuan").css("position","relative");
		$(".shaixuan").css("top","0");
		$(".shaixuan").css("display","block");
		$(".campstatusContainer").css("margin-top","0.6rem");
	}

	if($(".headimg").length>0){
		$(".headimg").css("display","none");
	}
	camCampId=campId; //班级筛选的营ID
	var targetCampId=-1;
	/*if(type==3 || type==4){
		targetCampId=campId;
	}*/
	if(type==3){
		checkType2=9;
	}else if(type==4){
		checkType2 = checkType4;
		targetCampId=campId;
	}
	console.log(campId);
	console.log(campId2);
	if(functionType==0){
		pageIndex2=0;
		time=0;
		hasNextBtn2=true;
	}
	if(ajaxBtn || checkCampId!=campId){
		ajaxBtn=false;
		checkCampId=campId;//避免教练来回切换把数据带过去
		console.log(campId);
		console.log(campId2);
		if(type==3 || type==4){
			if(campId2!=campId || isRefresh){
				console.log(campId);
				console.log(campId2);
				$(".msgType2 .list").html('');
				pageIndex2=0;
				time=0;
				hasNextBtn2=true;
				indexOfCheckList=0;
			}
			/*$(".msgType2 .list").css("padding","0.5rem 1.25rem 0");*/
		}else{
			if(isRefresh){
				$(".msgType2 .list").html('');
				$(".msgType2 .list").html(loadingstr);
				loading2();
				pageIndex2=0;
				time=0;
				hasNextBtn2=true;
				indexOfCheckList=0;
			}
		}
		var ajaxStr2="";
		if(pageIndex2==0){
			$(".msgType2 .list").html('');
			if(type==2){
				$(".msgType2 .list").html(loadingstr);
				loading2();
			}
			ajaxStr2="&count="+count;
			hasNextBtn2=true;
		}
		else{
			ajaxStr2="&count="+count+"&time="+time;
		}

		if(type==2){
			functionType=3;
			console.log(ajaxStr2);
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=2&targetRoleId="+roleId+ajaxStr2+"&checkType="+checkType2;
			console.log(ajaxStr2);
			console.log(finalUrl);
		}
		else{
			functionType=4;
			type2=type;
			campId2=campId;
			var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&targetRoleId="+roleId+"&type="+type+"&campId="+campId+ajaxStr2+"&checkType="+checkType2;
		}
		if(hasNextBtn2){
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						var str1='';
						var str2='';
						var str5="";
						if(type==3){
							$("#cardList .tagItem .msgNum").eq(0).html(data.resp.checkNum);
						}

						hasNextBtn2=data.resp.hasNext;
						
						if(data.resp.time!= undefined){
							time=data.resp.time;
						}
						if(data.resp.checkList.length>0){
							
							for(var i=0;i<data.resp.checkList.length;i++){
								if(type==3){
									targetCampId=data.resp.checkList[i].campId;
								}
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
										//strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[3].url+')\"></div></div>';
										var strImg1="";
										for(var j=0;j<2;j++){
											strImg1+='<div class="col-xs-4 col-sm-4 partRight-img-li " objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@200h_200w_1e)\"></div>';
											//strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[3].url+')\"></div></div>';
										}
										strImg+='<div class="row">'+strImg1+'</div>';
										var strImg2="";
										for(var j=2;j<4;j++){
											strImg2+='<div class="col-xs-4 col-sm-4 partRight-img-li " objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+'@200h_200w_1e)\"></div>';
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
											strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'" targetCampId="'+targetCampId+'" >'+data.resp.checkList[i].praises[j].praiseRoleName+'</a>';
										}
										else{
											strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'" targetCampId="'+targetCampId+'" >'+data.resp.checkList[i].praises[j].praiseRoleName+'，</a>';
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
										var msgType=0;
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
											strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].replys[j].roleName+'</a><span>回复</span><a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.checkList[i].replys[j].replyRoleId+'" targetCampId="'+targetCampId+'" >'+data.resp.checkList[i].replys[j].replyRoleName+'：</a>'+data.resp.checkList[i].replys[j].content;
										}
										if(type==3){
											msgType=3;
										}
										strMsg+='<div class="row msgInfo">'+
														'<a class="msgInfo-headerHref" headIsCoach="'+headIsCoach+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'" targetCampId="'+targetCampId+'"><img class="msgInfo-header" src="'+data.resp.checkList[i].replys[j].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.checkList[i].replys[j].roleSex]+'" /></a>'+
														'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
															'<span class="msgInfo-msg" msgType="'+msgType+'" checkId="'+data.resp.checkList[i].id+'" replyId="'+data.resp.checkList[i].replys[j].id+'" replyRoleId="'+data.resp.checkList[i].replys[j].roleId+'" partIndex="'+(count*pageIndex2+parseInt(i))+'" roleName="'+data.resp.checkList[i].replys[j].roleName+'">'+strMsgName+
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
								var strDate="";
								if(data.resp.checkList[i].isToday){
									strDate=data.resp.checkList[i].checkTime;
								}
								else{
									strDate='<span>'+data.resp.checkList[i].checkDay+'</span>'+data.resp.checkList[i].checkTime;
								}
								var strDelete='';
								var strShare='';
								if(getParamByUrl("roleId")!="false" && getParamByUrl("roleId")==data.resp.checkList[i].roleId ){
									strDelete='<span class="partRight-type1-delete" checkId="'+data.resp.checkList[i].id+'">删除</span>';
									// strShare='<span class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></span>';
								}
								strShare='<span class="partRight-type1-share"  checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="https://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></span>';
								var msgType=0;
								if(type==3){
									msgType=3;
								}
								if(type==3 || type==4){
									strShare='';
								}
								var str3 = "";
								// if(indexOfCheckList==0){
								// 	if(type==3){
								// 		str3 = '<div class="partLeft5">';
								// 	}else{
								// 		if(isRefresh){
								// 			str3 = '<div class="partLeft3">';
								// 		}else{
								// 			str3 = '<div class="partLeft">';
								// 		}
										
								// 	}
									
								// 	indexOfCheckList=1;
								// }else{
									str3 = '<div class="partLeft">';
								// }
								str2+='<aside class="row part line-length" part="'+(count*pageIndex2+parseInt(i))+'">'+
										str3+'<a class="partLeft-headerHref" targetRoleId="'+data.resp.checkList[i].roleId+'" targetCampId="'+targetCampId+'"><img src="'+data.resp.checkList[i].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.checkList[i].roleSex]+'" /></a></div>'+
										'<div class="col-xs-12 col-sm-12 partRight">'+
											'<div class="row ">'+
												'<div class="col-xs-12 col-sm-12 partRight-type2">'+
												'<a class="partRight-type2-name" targetRoleId="'+data.resp.checkList[i].roleId+'" targetCampId="'+targetCampId+'">'+data.resp.checkList[i].roleName+'</a>'+
												'<div class="partRight-type2-date">'+strDate+'</div>'+
												'<span class="tag" style="background-image:url('+cardTypeBg[data.resp.checkList[i].type]+')">'+cardType[data.resp.checkList[i].type]+'</span>'+
												'</div>'+
												'<div class="col-xs-12 col-sm-12 partRight-p1">'+data.resp.checkList[i].content+'</div>'+
												'<div class="col-xs-12 col-sm-12 partRight-img">'+strImg+'</div>'+
												'<div class="col-xs-12 col-sm-12 partRight-type1">'+strDelete+
													strShare+
													'<span class="partRight-type1-zan '+hasZanBtn+'" checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="'+arrHasZan[hasZanImgBtn]+'" /><span>'+data.resp.checkList[i].praiseNum+'</span></span>'+
													'<span class="partRight-type1-msg" msgType="'+msgType+'" checkId="'+data.resp.checkList[i].id+'" replyId="0" replyRoleId="'+data.resp.checkList[i].roleId+'" partIndex="'+(count*pageIndex2+parseInt(i))+'"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/student-7.png" /></span>'+
												'</div>'+strMsgTotol+
											'</div>'+
										'</div>'+
									'</aside>';
							//for循环结束
							}
							// var str4 ='<div class="shaixuan"><div class="row col-xs-12 col-sm-12 campstatusContainer">'+
							// '<div class="ttab"><span class="tabtype">全部</span></div>'+
							// '<div class="row col-xs-12 col-sm-12 campstatus2"></div>'+
							// '</div>'+
							// '<div class="type-container">'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/all.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>'+
							// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>'+
							// '</div></div>';
							
							// str5 = str4+str2;

							if(type==3){
								$(".shaixuan").css("display","none");
							}else{
								$(".shaixuan").css("display","block");
								// if(type==4){
								// 	$(".shaixuan").css("margin-top",0);
								// }
							}
							stopLoading2();
							var noCardList = '<div class="cardListMessage"><span>没有更多内容了</span></div>';
							$(".msgType2 .list").append(str2);
							console.log("body========="+$("body").height());
							console.log("window========="+$(window).height());
							if( $("body").height()>$(window).height() && !hasNextBtn2){
								$(".msgType2 .list").append(noCardList);
								$(".cardListMessage").css("display","block");
							}else{
								$(".cardListMessage").css("display","none");
							}


							if(isRefresh && type==2){
								$(".shaixuan").css("position","relative");
								$(".shaixuan").css("top","0");
								$(".campstatusContainer").css("margin-top","0.6rem");
								$(".shaixuan").css("display","block");
							}
							// }else{
							// 	if(isRefresh){
							// 		$(".msgType2 .list").append(str5);
							// 	}else{
							// 		$(".msgType2 .list").append(str2);
							// 	}
								
							// }
							// $(".msgType2 .list").css("min-height",0);
							if(type==2){
								$(".msgType2 .part").eq(0).css("padding-top",0);
								$(".msgType2 .partLeft").eq(0).css("top",0);
							}

							/*$(".msgType2 .partRight-img-li").css("height",$(".msgType2 .partRight-img").eq(0).width()/3);
							$(".msgType2 .partRight-img-li2").css("height",$(".msgType2 .partRight-img-li2").width()*3/4);*/
							$(".msgType2 .partRight-img-li").css("height",($(window).width()-(2.5+3.75)*fontHeight)/3);
							$(".msgType2 .partRight-img-li2").css("height",($(window).width()-(2.5+3.75)*fontHeight)*3/4);
							$(".msgType2 .partRight-img-li3").css("height",($(window).width()-(2.5+3.75)*fontHeight)/2);
							
							pageIndex2++;
							console.log("container========="+$(".container").height());
							bindBigImg();//绑定预览图
							shareLink();//绑定分享事件
							$(".tabtype").html(arrContent2);

							// if(type!=3){
							// 	$(".shaixuan").css("display","block");
							// }
							var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png"];
							var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png"];
							var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐"];
							if(arrbg3.length!=0){
								$(".icon").eq(arrbg3[0]).find("img").attr("src",arrbg1[arrbg3[0]]);
							}
							arrbg3[0]=selectImgIndex2;
							$(".icon").eq(selectImgIndex2).find("img").attr("src",arrbg2[selectImgIndex2]);

							$(".ttab").unbind("click").click(function(){
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiShaixuan);
									var display = $(".type-container").css("display");
									if(display=="none"){
										$(".type-container").css("display","block");
										$(".typeContainer").css("height",$(window).height());
										$(".typeContainer").css("display","block");
									}else{
										$(".type-container").css("display","none");
									}
								event.stopPropagation();
								event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
							});
							$(".icon").unbind("click").click(function(){
								setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
								var index=$(".icon").index(this);
								btnType=index;
								selectImgIndex2=index;
								if(arrbg3.length!=0){
									$(".icon").eq(arrbg3[0]).find("img").attr("src",arrbg1[arrbg3[0]]);
								}
								arrbg3[0]=index;
								$(".icon").eq(index).find("img").attr("src",arrbg2[index]);
								// showBtn();
								arrContent2 = arrContent[index];
								$(".type-container").hide();
								$(".typeContainer").css("display","none");
								if(index==0){
									checkType2=0; 
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
								}else if(index==1){
									checkType2=9; 
								}else if(index==2){
									checkType2=1;
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
								}else if(index==3){
									checkType2=5;
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
								}else if(index==4){
									checkType2=2;
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
								}else if(index==5){
									checkType2=4;
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
								}else if(index==6){
									checkType2=3;
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
								}
								checkType4=checkType2;
								time=0;
								pageIndex2=0;
								tabBtn=false;
								indexOfCheckList=0;
								if(type==4){
									if($(".shaixuan").css("top") == (5.25*fontHeight+"px")){
										$(".shaixuan").css("margin-top",0);
									}else{
										$(".shaixuan").css("margin-top","2rem");
									}
									getList2(type,camCampId,true);									
								}else{
									$(".shaixuan").css("position","block");
									$(".shaixuan").css("position","relative");
									$(".shaixuan").css("top","0");
									$(".campstatusContainer").css("margin-top","0.6rem");
									$("body").unbind("touchmove");
									$("body").unbind("touchend");
									clearInterval(touchTime21);
									clearTimeout(touchTime22);
									// $(".msgType2 .list").css("margin-top",$(".shaixuan").height());
									//个人进展高度
									$(".msgType2").css("min-height",$(window).height()+700);
									$('body').animate({scrollTop:$(".msgType2 .list").offset().top-$(".shaixuan1").height()-5.5*fontHeight},200);
									
									getList2(type,0,true);	
								}
								event.stopPropagation();
							});
							$(".type-container").unbind("click").click(function(){
								event.stopPropagation();
							});	
							$(".shaixuan").unbind("click").click(function(){
								event.stopPropagation();
								$(".type-container1").css("display","none");
								$(".typeContainer").css("display","none");
							});	
							$(".typeContainer").unbind("click").click(function(){
								event.stopPropagation();
								$(".type-container").css("display","none");
								$(".typeContainer").css("display","none");
							});
							// $(".typeContainer").on("touchstart",function(event){
							// 	event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
							// 	event.stopPropagation();
							// 	$(".type-container").css("display","none");
							// 	$(".typeContainer").css("display","none");
							// });
							//绑定评论按钮
							// $(".partRight-type1-msg").unbind("click").click(function(event){
							// 	var index=$(".partRight-type1-msg").index(this);
							// 	level=1;
							// 	partIndex=$(".partRight-type1-msg").eq(index).attr("partIndex");
							// 	dataAddMsg.level=1;
							// 	dataAddMsg.checkId=$(".partRight-type1-msg").eq(index).attr("checkId");
							// 	dataAddMsg.replyId=$(".partRight-type1-msg").eq(index).attr("replyId");
							// 	dataAddMsg.replyRoleId=$(".partRight-type1-msg").eq(index).attr("replyRoleId");
							// 	dataAddMsg.msgType=parseInt($(".partRight-type1-msg").eq(index).attr("msgType"));
							// 	$("#comment-msg").attr("placeholder",'回复');
							// 	msgScrollTop=$(window).scrollTop();
							// 	$(".comment").css("display","block");
							// 	$(".setcard").css("display","none");
							// 	$("#comment-msg").focus();
							// 	console.log($(".comment").height());
							// 	$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
							// 	//$(".comment").css("top",$(window).height()+$(window).scrollTop()-4.3125*parseInt($("html").css("font-size")));
								
							// 	console.log($(".comment").height());

							// 	event.stopPropagation();
							// });

						$(".partRight-type1-msg").unbind("click").click(function(event){
							if($(".cardListMessage").length>0){
								$(".cardListMessage").css("display","none");
							}
							setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_PingLunXiaoXi);
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
							dataAddMsg.msgType=parseInt($(".partRight-type1-msg").eq(index).attr("msgType"));
							$("#comment2-msg1").attr("placeholder",'回复:');
							msgScrollTop=$(window).scrollTop();
							commentBtn=false;
							$(".comment2").css("position","static");
							$(".comment2").css("top","auto");
							$(".comment2").css("bottom","0");
							$(".comment2").css("display","block");
							$(".comment3").css("display","block");
							$(".setcard").css("display","none");
							console.log($(".comment2").height());
							
							// if(getParamByUrl("os")=="iOS"){
							//隐藏后面的评论
							var x=parseInt($(this).attr("partIndex"));
							var y=parseInt($(".msgType2 .part").eq(0).attr("part"));//教练待评论会删除评论
							$(".part").css("display","none");
							$(".partRight").css("display","none");
							/*if(type==3){

							}
							else{
								for(var i=0;i<x+1;i++){
									$(".msgType2 .part").eq(i).css("display","block");
									$(".msgType2 .partRight").eq(i).css("display","block");
								}
							}*/
							for(var i=0;i<x-y+1;i++){
								$(".msgType2 .part").eq(i).css("display","block");
								$(".msgType2 .partRight").eq(i).css("display","block");
							}
							if(getParamByUrl("os")=="android"){
								
								$(".comment2").css("padding-bottom","1.5rem");
							}
							// else if(getParamByUrl("os")=="iOS"){
							// 	var t2 = setTimeout(function(){
							// 		$(".shaixuan").css("position","relative");
							// 	},200);
							// }
							$("#comment2-msg1").focus();
							//$('body').animate({scrollTop:$(window).scrollTop()+50},500);
							newComment2();
							event.stopPropagation();
						});


							bindZan();//绑定点赞的链接跳转
							bindMsg();//绑定评论
							bindName();//绑定跳转
							bindMsgHeader();//绑定评论头像跳转
							bindpartHeader();//绑定part2左边头像跳转
							bindpartName();//绑定part2昵称
							//bindCookie();
							//part左边距离
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
							//绑定删除打卡记录
							$(".partRight-type1-delete").unbind("click").click(function(){
								var deleteIndex=$(".msgType2 .partRight-type1-delete").index(this);
								var deleteCheckId=$(".msgType2 .partRight-type1-delete").eq(deleteIndex).attr("checkId");
								//var deletePartIndex=$(".msgType2 .partRight-type1-delete").eq(deleteIndex).parent().parent().parent().parent(".part").attr("part");
								var deletePartIndex=$(".msgType2 .partRight-type1-delete").eq(deleteIndex).parent().parent().parent().parent(".part").index()-1;
								
								deletePart(deletePartIndex,deleteCheckId,2);
							});
							//绑定点赞
							$(".partRight-type1-zan").unbind("click").click(function(){
								var index=$(".partRight-type1-zan").index(this);
								changeZan(index);
							});
							//滚动判断筛选按钮位置
							card1Type=-1;
							card2Type=type;
							// $(window).on("touchend",function(){
								
								$("body").unbind("touchmove");
								$("body").unbind("touchend");
								if(type==4){ //如果是教练端访问 筛选定位
									$(".shaixuan").css("position","fixed");
									$(".shaixuan").css("top","5.25rem");
									$(".shaixuan").css("left",0);
									$(".msgType2 .part").eq(0).css("margin-top","2.8rem");
									$(".msgType2 .partLeft3").css("top","0.6rem");
									// $(window).off('scroll');
									if($(".shaixuan").css("top") == (5.25*fontHeight+"px")){
										$(".shaixuan").css("margin-top",0);
									}else{
										$(".shaixuan").css("margin-top","2rem");
									}
									
									$("body").on("touchmove",function(event){
										$(".type-container").css("display","none");
										$(".typeContainer").css("display","none");
										if(!shaixuanComment){
											$(".shaixuan").css("position","fixed");
											$(".shaixuan").css("top","5.25rem");
											$(".shaixuan").css("left",0);
											$(".msgType2 .part").eq(0).css("margin-top","2.8rem");
											$(".msgType2 .partLeft3").css("top","0.6rem");
											$(".campstatusContainer").css("margin-top","0.6rem");
										}
									});
								}
								else if(type==2){
									function part2Position(){
										if(!shaixuanComment){
											var parttopheight=0;
											if($(".msgType2 .part").length>0){
												parttopheight = $(".msgType2 .part").eq(0).offset().top-$(window).scrollTop();	
											}
											if((parttopheight>=fontHeight*3 && $(".shaixuan").css("position")!= "relative") ||(parttopheight<fontHeight*3 && $(".shaixuan").css("position")!= "fixed") ){
												touchmoveBtn=true;
											}else{
												touchmoveBtn=false;
											}

											if(touchmoveBtn){
												if(parttopheight>=fontHeight*3){
													$(".campstatusContainer").css("margin-top","0.6rem");
													$(".shaixuan").css("position","relative");
													$(".shaixuan").css("top",0);
													$(".shaixuan").css("left",0);
													$(".msgType2 .part").eq(0).css("margin-top","0");
													$(".msgType2 .partLeft3").eq(0).css("top","2.8rem");	
												}else{
													$(".campstatusContainer").css("margin-top",0);
													$(".shaixuan").css("position","fixed");
													$(".shaixuan").css("top","3rem");
													$(".shaixuan").css("left",0);
													$(".msgType2 .part").eq(0).css("margin-top","1.5rem");
													$(".msgType2 .partLeft3").eq(0).css("top","0.5rem");
												}	
											}
										}
									}

									$("body").on("touchmove",function(event){
										$(".type-container").css("display","none");
										$(".typeContainer").css("display","none");
										console.log("move");
										part2Position();
									});


									$("body").unbind("touchend").on("touchend",function(event){
										console.log("move");
										clearInterval(touchTime21);
										clearTimeout(touchTime22);
										part2Position();
										touchTime21=setInterval(function(){
											part2Position();
										},10);
										touchTime22=setTimeout(function(){
											clearInterval(touchTime21);
											clearTimeout(touchTime22);
										},500);
									});	
								}
								bindScroll();
								console.log("container========="+$(".container").height());
						}
						else{
							if(pageIndex2==0){
								stopLoading2();
								$("body").unbind("touchmove");
								$("body").unbind("touchend");
								clearInterval(touchTime21);
								clearTimeout(touchTime22);
								$(".msgType2 .list").html('');
								$(window).unbind('scroll');
								// $(".msgType2 .list").css("min-height",0);
								// var str4 ='<div class="shaixuan"><div class="row col-xs-12 col-sm-12 campstatusContainer">'+
								// '<div class="ttab"><span class="tabtype">全部</span></div>'+
								// '<div class="row col-xs-12 col-sm-12 campstatus2"></div>'+
								// '</div>'+
								// '<div class="type-container">'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/all.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>'+
								// 	'<div class="icon"><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>'+
								// '</div></div>';
								if(type==3){
									$(".shaixuan").css("display","none");
									$(".msgType2 .list").html('<div class="row noRecord">暂无相关打卡记录哦～</div>');
								}else{
									$(".shaixuan").css("display","block");
									if(type==4){
										if($(".shaixuan").css("top") == (5.25*fontHeight+"px")){
											$(".shaixuan").css("margin-top",0);
										}else{
											$(".shaixuan").css("margin-top","2rem");
										}	
									}
									$(".msgType2 .list").html('<div class="row noRecord">暂无相关打卡记录哦～</div>');
								}
								
								if(isRefresh && type==2){
									$(".shaixuan").css("position","relative");
									$(".shaixuan").css("top","0");
									$(".campstatusContainer").css("margin-top","0.6rem");
									$(".shaixuan").css("display","block");
								}
								$(".tabtype").html(arrContent2);
								var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png"];
								var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png"];
								var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐"];
								if(arrbg3.length!=0){
									$(".icon").eq(arrbg3[0]).find("img").attr("src",arrbg1[arrbg3[0]]);
								}
								arrbg3[0]=selectImgIndex2;
								$(".icon").eq(selectImgIndex2).find("img").attr("src",arrbg2[selectImgIndex2]);

								$(".ttab").unbind("click").click(function(){
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiShaixuan);
									var display = $(".type-container").css("display");
									if(display=="none"){
										$(".type-container").css("display","block");
										$(".typeContainer").css("height",$(window).height());
										$(".typeContainer").css("display","block");
									}else{
										$(".type-container").css("display","none");
									}
									event.stopPropagation();
								});
								$(".icon").unbind("click").click(function(){
									setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
									var index=$(".icon").index(this);
									btnType=index;
									selectImgIndex2 = index;
									if(arrbg3.length!=0){
										$(".icon").eq(arrbg3[0]).find("img").attr("src",arrbg1[arrbg3[0]]);
									}
									arrbg3[0]=index;
									$(".icon").eq(index).find("img").attr("src",arrbg2[index]);
									// showBtn();
									arrContent2 = arrContent[index];
									$(".type-container").hide();
									$(".typeContainer").css("display","none");
									if(index==0){
										checkType2=0;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
									}else if(index==1){
										checkType2=9;
										
									}else if(index==2){
										checkType2=1;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
									}else if(index==3){
										checkType2=5;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
									}else if(index==4){
										checkType2=2;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
									}else if(index==5){
										checkType2=4;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
									}else if(index==6){
										checkType2=3;
										setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
									}
									checkType4=checkType2;
									time=0;
									pageIndex2=0;
									tabBtn=false;
									indexOfCheckList=0;
									if(type==4){
										getList2(type,camCampId,true);									
									}else{
										$(".shaixuan").css("position","block");
										$(".shaixuan").css("position","relative");
										$(".shaixuan").css("top","0");
										$(".campstatusContainer").css("margin-top","0.6rem");
										$("body").unbind("touchmove");
										$("body").unbind("touchend");
										clearInterval(touchTime21);
										clearTimeout(touchTime22);
										// $(".msgType2 .list").css("margin-top",$(".shaixuan").height());
										//个人进展高度
										$(".msgType2").css("min-height",$(window).height()+700);
										$('body').animate({scrollTop:$(".msgType2 .list").offset().top-$(".shaixuan1").height()-5.5*fontHeight},200);
										getList2(type,0,true);	
									}
									event.stopPropagation();
								});
								$(".type-container").unbind("click").click(function(){
									event.stopPropagation();
								});	
								$(".shaixuan").unbind("click").click(function(){
									event.stopPropagation();
									$(".type-container1").css("display","none");
									$(".typeContainer").css("display","none");
								});	
								$(".typeContainer").unbind("click").click(function(){
									event.stopPropagation();
									$(".type-container").css("display","none");
									$(".typeContainer").css("display","none");
								});
								$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
							}
						}
					}
					else{
						// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
					$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
					ajaxBtn=true;
					pageBtn=true;
					tabBtn=true;
				}
			})
		}
		else{
			ajaxBtn=true;
		}
	}
}


var card2Load=true;