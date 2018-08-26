
var pageIndex=2;
var tabBtn=false;
functionType='info';
$(function(){
	$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
	$(".msgType2 .list").css("margin-top",0);
	appNoShare();
	/*closeWebview();*/
	var fontHeight=parseInt($("html").css("font-size"));
	$(".info-t img").css("top",(2*fontHeight-0.8*fontHeight*33/29)/2);
	if($(".partLeft-p3 span").width()>$(".partLeft-p1 span").width()){
		$(".partLeft-p1").css("padding-left",($(".partLeft-p3 span").width()-$(".partLeft-p1 span").width())/2);
	}
	for(var i=0;i<$(".partLeft-p1 span").length;i++){
		if($(".partLeft-p1 span").eq(i).width()>$(".partLeft-p2 span").eq(i).width()){
			$(".partLeft-p2").eq(i).css("padding-left",parseInt($(".partLeft-p1").eq(0).css("padding-left"))+($(".partLeft-p1 span").eq(i).width()-$(".partLeft-p2 span").eq(i).width())/2);
		}
	}

	//评论开始
getList();
function getList(){
	$(".msgType2 .list").html('');
	var finalUrl=ajaxLink+"/v1/api/camp/checkDetail"+window.location.search+"&type=1";
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				if(data.resp.hasNews){
					$(".hasMsg").css("display","block");
					$(".hasMsg span").html(data.resp.unReadNum);
				}

				var canDelete=false;
				var roleId=getParamByUrl("roleId");
				var deleteHtml="";
				if(roleId == data.resp.roleId){
					canDelete=true;
				}
				// var strShare='';
				if(canDelete){
					deleteHtml='<span class="partRight-type1-delete" checkId="'+data.resp.id+'">删除</span>';
					// strShare='<span class="partRight-type1-share"  checkId="'+data.resp.id+'" checkRoleId="'+data.resp.roleId+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></span>';
				}
				var strShare='<span class="partRight-type1-share"  checkId="'+data.resp.id+'" checkRoleId="'+data.resp.roleId+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/cardShare/share.png" /></span>';
				var str1='';
				var str2='';
				
					var strImg='';
					var strZan='';
					var strMsg='';
					var objImgName='img'+objImgIndex;
					objImgIndex++;
					//图片添加开始
					var arrTestImg=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/msg-2.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/bg1.jpg"];
					//data.resp.imgs=strToJson(data.resp.imgs);
					if(data.resp.imgs.length==0){
						//strImg='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.imgs[0].url+')\"></div></div>';
						strImg='';
					}
					else if(data.resp.imgs.length==4){
						//strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.imgs[3].url+')\"></div></div>';
						var strImg1="";
						for(var j=0;j<2;j++){
							strImg1+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.imgs[j].url+')\"></div>';
						}
						strImg+='<div class="row">'+strImg1+'</div>';
						var strImg2="";
						for(var j=2;j<4;j++){
							strImg2+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.imgs[j].url+')\"></div>';
						}
						strImg+='<div class="row">'+strImg2+'</div>';

					}
					else if(data.resp.imgs.length==1){
						strImg+='<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2" objImg="'+objImgName+'" objImgIndex="'+0+'" style=\"background-image:url('+data.resp.imgs[0].url+')\"></div>';
					}
					else{
						for(var j=0;j<data.resp.imgs.length;j++){
							strImg+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" objImgIndex="'+j+'" style=\"background-image:url('+data.resp.imgs[j].url+')\"></div>';
						}
						strImg='<div class="row">'+strImg+'</div>';
					}
					objImg[objImgName]=data.resp.imgs;
					
					//图片添加结束
					//点赞的人开始
					if(data.resp.praises.length==0){
						strZan='';
					}
					else{
						var arrMsgZan=["msgZanName1","msgZanName2"];
						for(var j=0;j<data.resp.praises.length;j++){
							var msgZanBtn=0;
							if(data.resp.praises[j].isCoach){
								msgZanBtn=1;
							}
							if(j==data.resp.praises.length-1){
								strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.praises[j].praiseRoleId+'">'+data.resp.praises[j].praiseRoleName+'</a>';
							}
							else{
								strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.praises[j].praiseRoleId+'">'+data.resp.praises[j].praiseRoleName+'，</a>';
							}
						}
						strZan='<div class="row msgZan"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" />'+strZan+'</div>';
					}
					//点赞的人结束
					//评论内容开始
					if(data.resp.replys.length==0){

					}
					else{
						for(var j=0;j<data.resp.replys.length;j++){
							var strMsgName='';
							var arrIsCoach=["msgInfo-name","msgInfo-name2"];
							var arrIsCoachBtn=0;
							var arrIsCoachBtn2=0;
							var headIsCoach="no";
							if(data.resp.replys[j].isCoach){
								arrIsCoachBtn=1;
								headIsCoach="yes";
							}
							if(data.resp.replys[j].isReplyCoach){
								arrIsCoachBtn2=1;
							}
							
							if(data.resp.replys[j].level==1){

								strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.replys[j].roleId+'">'+data.resp.replys[j].roleName+'：</a>'+data.resp.replys[j].content;
							
							}
							else{
								strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.replys[j].roleId+'">'+data.resp.replys[j].roleName+'</a><span>回复</span><a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.replys[j].replyRoleId+'">'+data.resp.replys[j].replyRoleName+'：</a>'+data.resp.replys[j].content;
							}
							strMsg+='<div class="row msgInfo">'+
											'<a class="msgInfo-headerHref" headIsCoach="'+headIsCoach+'" targetRoleId="'+data.resp.replys[j].roleId+'"><img class="msgInfo-header" src="'+data.resp.replys[j].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.replys[j].roleSex]+'" /></a>'+
											'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
												'<span class="msgInfo-msg" checkId="'+data.resp.id+'" replyId="'+data.resp.replys[j].id+'" replyRoleId="'+data.resp.replys[j].roleId+'" partIndex="'+0+'" roleName="'+data.resp.replys[j].roleName+'">'+strMsgName+
											'</div>'+
										'</div>';
						}
					}
					
					//评论内容结束
					//添加打卡内容
					var hasZanBtn="";
					var hasZanImgBtn=0;
					if(data.resp.hasPraised){
						hasZanBtn="hasZan";
						hasZanImgBtn=1;
					}
					console.log(hasZanBtn);
					var strMsgTotol='';
					if(strZan!="" || strMsg!=""){
						strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+'</div>';
					}
					else{
						strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>';
					}
					var strDate="";
					if(data.resp.isToday){
						strDate=data.resp.checkTime;
					}
					else{
						strDate='<span>'+data.resp.checkDay+'</span>'+data.resp.checkTime;
					}
					//strDate='<span>'+data.resp.checkDay+'</span>'+data.resp.checkTime;
					str2+='<aside class="row part">'+
							'<div class="partLeft"><a class="partLeft-headerHref" targetRoleId="'+data.resp.roleId+'"><img src="'+data.resp.roleImg+'" onerror="this.src='+arrHeadImg[data.resp.roleSex]+'" /></a></div>'+
							'<div class="col-xs-12 col-sm-12 partRight">'+
								'<div class="row ">'+
									'<div class="col-xs-12 col-sm-12 partRight-type2">'+
									'<a class="partRight-type2-name" targetRoleId="'+data.resp.roleId+'">'+data.resp.roleName+'</a>'+
									'<div class="partRight-type2-date">'+strDate+'</div>'+
									'<span class="tag" style="background-image:url('+cardTypeBg[data.resp.type]+')">'+cardType[data.resp.type]+'</span>'+
									'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-p1">'+data.resp.content+'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-img">'+strImg+'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-type1">'+strShare+
										deleteHtml+
										'<span class="partRight-type1-zan '+hasZanBtn+'" checkId="'+data.resp.id+'" checkRoleId="'+data.resp.roleId+'"><img src="'+arrHasZan[hasZanImgBtn]+'" /><span>'+data.resp.praiseNum+'</span></span>'+
										'<span class="partRight-type1-msg" checkId="'+data.resp.id+'" replyId="0" replyRoleId="'+data.resp.roleId+'" partIndex="'+0+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-7.png" /></span>'+
									'</div>'+strMsgTotol+
								'</div>'+
							'</div>'+
						'</aside>';
			
				$(".msgType2 .list").html(str2);
				//$(".msgType2 .list").html(str2);
				$(".partRight-img-li").css("height",$(".partRight-img").width()/3);
				$(".partRight-img-li2").css("height",$(".partRight-img-li2").width()*3/4);
				bindBigImg();//绑定预览图
				shareLink();
				//绑定评论按钮
				// $(".partRight-type1-msg").unbind("click").click(function(event){
				// 	var index=$(".partRight-type1-msg").index(this);
				// 	level=1;
				// 	partIndex=$(".partRight-type1-msg").eq(index).attr("partIndex");
				// 	dataAddMsg.level=1;
				// 	dataAddMsg.checkId=$(".partRight-type1-msg").eq(index).attr("checkId");
				// 	dataAddMsg.replyId=$(".partRight-type1-msg").eq(index).attr("replyId");
				// 	dataAddMsg.replyRoleId=$(".partRight-type1-msg").eq(index).attr("replyRoleId");
				// 	$("#comment-msg").attr("placeholder",'回复');
				// 	msgScrollTop=$(window).scrollTop();
				// 	$(".comment").css("display","block");
				// 	console.log($(".comment").height());
				// 	$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
				// 	$("#comment-msg").focus();
				// 	event.stopPropagation();
				// });

				$(".partRight-type1-msg").unbind("click").click(function(event){
					setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_PingLunXiaoXi);
					var index=$(".partRight-type1-msg").index(this);
					level=1;
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
					$("#comment2-msg1").focus();
					// if(getParamByUrl("os")=="iOS"){
					// var x=parseInt($(this).attr("partindex"));
					// $(".part").css("display","none");
					// $(".partRight").css("display","none");
					// for(var i=0;i<x+1;i++){
					// 	$(".msgType2 .part").eq(i).css("display","block");
					// 	$(".msgType2 .partRight").eq(i).css("display","block");
					// }

					if(getParamByUrl("os")=="android"){
						
						$(".comment2").css("padding-bottom","1.5rem");
					}
					//$('body').animate({scrollTop:$(window).scrollTop()+50},500);
					newComment2();
					event.stopPropagation();
				});

				bindZan();//绑定点赞的链接跳转
				bindMsg();//绑定评论
				bindName();//绑定跳转
				bindpartHeader();//绑定part2左边头像跳转
				bindpartName();//绑定part2昵称
				jumpToTarget();//从消息列表跳转的评论跳到指定位置
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
                    setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_ShanChuDaka);
					var deleteIndex=$(".partRight-type1-delete").index(this);
					var deleteCheckId=$(".partRight-type1-delete").eq(deleteIndex).attr("checkId");
					deletePart1(deleteIndex,deleteCheckId);
				});
				//绑定点赞
				$(".partRight-type1-zan").unbind("click").click(function(){
                    setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_DianZan);
					var index=$(".partRight-type1-zan").index(this);
					changeZan(index);
				});
			}
			else{
				// alert("您好,该打卡已被删除!");
                $(".error-main-t").html("您好,该打卡已被删除!");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				var theDevice=getParamByUrl("os");
				/*if(theDevice == "android"){
					closeWebview();
				}*/
				closeWebview();
			}

		}
	})
}


//结束的反括号
})
function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'打卡详情',
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
function jumpToTarget(){
	var replyId=getParamByUrl("replyId");
	/*alert($("span[replyid = '"+replyId+"']").length == 1);
	alert(replyId);*/
	if(replyId != "false" && replyId != "" && replyId != null){
		/*$('html,body').scrollTop($("#"+mcid).offset().top-80);*/
		if($("span[replyid = '"+replyId+"']").length == 1){
			$('html,body').scrollTop($("span[replyid = '"+replyId+"']").offset().top);
		}else{
			// alert("该评论已被删除~");
            $(".error-main-t").html("该评论已被删除~");
            $(".errorAlert").css("display","block");
            $(".error-main").css("margin-top",-$(".error-main").height()/2);
		}
		
	}
}

function deletePart1(deleteIndex,deleteCheckId){
	$(".fixbg-main-t").html("您确定删除这条打卡吗？");
	$(".fixbg").css("display","block");
	$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
	$(".fixbg-main-btn1").unbind("click").click(function(){
        setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_QuXiaoShanChu);
		$(".fixbg").css("display","none");
	});
	$(".fixbg-main-btn2").unbind("click").click(function(){
        setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_QueDingShanChu);
		var finalUrl=ajaxLink+"/v1/api/camp/deleteCheckIn"+window.location.search+'&checkId='+deleteCheckId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					$(".msgType1 .part").eq(deleteIndex).remove();
					$(".fixbg").css("display","none");
					var theDevice=getParamByUrl("os");
					closeWebview();
					/*if(theDevice == "android"){
						closeWebview();
					}*/
					/*getList("hasDelete");*/
				}
				else{
					// alert(data.result.message);
		            $(".error-main-t").html(data.result.message);
		            $(".errorAlert").css("display","block");
		            $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	});
	
}

//关闭webview
function closeWebview(){
    var getPageInfo = function (){
        var data = {
            backNum:0,//默认为1，
            closeWebview:1,//默认为0
        };
        return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
		if(getParamByUrl("os")=="android"){
			mobileApp.deleteHistory(getPageInfo());
		}
		else{
			mobileApp.deleteHistory.postMessage(getPageInfo());
		}
        //mobileApp.deleteHistory(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}