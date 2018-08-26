var objImg={};
var cardType=["饮水","早餐","午餐","晚餐","加餐","学习","睡眠","运动"];
var arrHasZan=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png"];

var roleId=getParamByUrl("roleId");
var targetRoleId=getParamByUrl("targetRoleId");
var roleName='';
$(function(){
	var objImgIndex=0;
	var level=0;
	var commentIndex=0;
	var partIndex=0;
	var dataAddMsg={};
getList();
function getList(){
	$(".msgType1 .list").html('');
	var finalUrl=ajaxLink+"/v1/api/camp/checkList"+window.location.search+"&type=1&targetRoleId="+targetRoleId;
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
				var str1='';
				var str2='';
				if(data.resp.checkList.length==0){
					// alert("暂无打卡记录");
	                $(".error-main-t").html("暂无打卡记录");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
				else{
					roleName=data.resp.checkList[0].roleName;
				}
				//roleName=data.resp.checkList[0].roleName;
				for(var i=0;i<data.resp.checkList.length;i++){
					var strImg='';
					var strZan='';
					var strMsg='';
					var objImgName='img'+objImgIndex;
					objImgIndex++;
					//图片添加开始
					var arrTestImg=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/msg-2.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/bg1.jpg"];
					//data.resp.checkList[i].imgs=strToJson(data.resp.checkList[i].imgs);
					if(data.resp.checkList[i].imgs!=null){
						if(data.resp.checkList[i].imgs.length==0){
							//strImg='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div></div>';
							strImg='';
						}
						else if(data.resp.checkList[i].imgs.length==4){
							strImg+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[0].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+data.resp.checkList[i].imgs[1].url+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+data.resp.checkList[i].imgs[2].url+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+data.resp.checkList[i].imgs[3].url+')\"></div></div>';
						}
						else{
							for(var j=0;j<data.resp.checkList[i].imgs.length;j++){
								strImg+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+objImgName+'" style=\"background-image:url('+data.resp.checkList[i].imgs[j].url+')\"></div>';
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
								strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'">'+data.resp.checkList[i].praises[j].praiseRoleName+'</a>';
							}
							else{
								strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.checkList[i].praises[j].praiseRoleId+'">'+data.resp.checkList[i].praises[j].praiseRoleName+'，</a>';
							}
						}
						strZan='<div class="row msgZan"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" />'+strZan+'</div>';
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
							if(data.resp.checkList[i].replys[j].isCoach){
								arrIsCoachBtn=1;
							}
							if(data.resp.checkList[i].replys[j].isReplyCoach){
								arrIsCoachBtn2=1;
							}
							
							if(data.resp.checkList[i].replys[j].level==1){

								strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'">'+data.resp.checkList[i].replys[j].roleName+'：</a>'+data.resp.checkList[i].replys[j].content;
							
							}
							else{
								strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.checkList[i].replys[j].roleId+'">'+data.resp.checkList[i].replys[j].roleName+'</a><span>回复</span><a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.checkList[i].replys[j].replyRoleId+'">'+data.resp.checkList[i].replys[j].replyRoleName+'：</a>'+data.resp.checkList[i].replys[j].content;
							}
							strMsg+='<div class="row msgInfo">'+
											'<img class="msgInfo-header" src="'+data.resp.checkList[i].replys[j].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.checkList[i].replys[j].roleSex]+'" />'+
											'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
												'<span class="msgInfo-msg" checkId="'+data.resp.checkList[i].id+'" replyId="'+data.resp.checkList[i].replys[j].id+'" replyRoleId="'+data.resp.checkList[i].replys[j].roleId+'" partIndex="'+i+'" roleName="'+data.resp.checkList[i].replys[j].roleName+'">'+strMsgName+
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
					console.log(hasZanBtn);
					str1+='<aside class="row part">'+
							'<div class="col-xs-2 col-sm-2 partLeft">'+
								'<div class="row">'+
									'<div class="col-xs-12 col-sm-12 partLeft-p1"><span>DAY</span></div>'+
									'<div class="col-xs-12 col-sm-12 partLeft-p2"><span>'+data.resp.checkList[i].joinDays+'</span></div>'+
									'<div class="col-xs-12 col-sm-12 partLeft-p3"><span>'+data.resp.checkList[i].checkDay+'</span></div>'+
								'</div>'+
							'</div>'+
							'<div class="col-xs-12 col-sm-12 partRight">'+
								'<div class="row ">'+
									'<div class="col-xs-12 col-sm-12 partRight-icon">'+
									'<span>'+cardType[data.resp.checkList[i].type]+'</span>'+
									'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-p1">'+data.resp.checkList[i].content+'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-img">'+strImg+'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-type1">'+
										'<span class="partRight-type1-date">'+data.resp.checkList[i].checkTime+'</span>'+
										'<span class="partRight-type1-zan '+hasZanBtn+'" checkId="'+data.resp.checkList[i].id+'" checkRoleId="'+data.resp.checkList[i].roleId+'"><img src="'+arrHasZan[hasZanImgBtn]+'" /><span>'+data.resp.checkList[i].praiseNum+'</span></span>'+
										'<span class="partRight-type1-msg" checkId="'+data.resp.checkList[i].id+'" replyId="0" replyRoleId="'+data.resp.checkList[i].roleId+'" partIndex="'+i+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-7.png" /></span>'+
									'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+	
									'</div>'+
								'</div>'+
							'</div>'+
						'</aside>';
				//for循环结束
				}
				$(".msgType1 .list").html(str1);
				//$(".msgType2 .list").html(str2);
				$(".partRight-img-li").css("height",$(".partRight-img-li").width());
				bindBigImg();//绑定预览图
				//绑定评论按钮
				$(".partRight-type1-msg").unbind("click").click(function(event){
					var index=$(".partRight-type1-msg").index(this);
					level=1;
					partIndex=$(".partRight-type1-msg").eq(index).attr("partIndex");
					dataAddMsg.level=1;
					dataAddMsg.checkId=$(".partRight-type1-msg").eq(index).attr("checkId");
					dataAddMsg.replyId=$(".partRight-type1-msg").eq(index).attr("replyId");
					dataAddMsg.replyRoleId=$(".partRight-type1-msg").eq(index).attr("replyRoleId");
					$("#comment-msg").attr("placeholder",'回复');
					$(".comment").css("display","block");
					console.log($(".comment").height());
					//$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height()-2*1.1875*parseInt($("html").css("font-size")));
					$("#comment-msg").focus();
					$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
					event.stopPropagation();
				});
				bindZan();//绑定点赞的链接跳转
				bindMsg();//绑定评论
				bindName();//绑定跳转
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
					var deleteIndex=$(".partRight-type1-delete").index(this);
					var deleteCheckId=$(".partRight-type1-delete").eq(deleteIndex).attr("checkId");
					deletePart(deleteIndex,deleteCheckId);
				});
				//绑定点赞
				$(".partRight-type1-zan").unbind("click").click(function(){
					var index=$(".partRight-type1-zan").index(this);
					changeZan(index);
				});
			}
			else{
				// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}
//绑定图片预览方法
function bindBigImg(){
	$(".partRight-img-li").unbind("click").click(function(){
	var name=$(this).attr("objImg");
	console.log(objImg);
	console.log(objImg[name]);
	var str='';
	for(var i=0;i<objImg[name].length;i++){
		str+='<div class="col-xs-12 col-sm-12 swiper-slide bigImg-li" style=\"background-image:url('+objImg[name][i].url+')\"></div>'

	}
	$(".bigImg-main").html('');
	$(".bigImg-main").html(str);
	$(".getImg-bg").css("height",$(".getImg-bg").width());
	$(".bigImg").css("display","block");
	var mySwiper = new Swiper('.swiper-container', {
		pagination : '.swiper-pagination',
	});

	//设置宽高
	$(".bigImg-li").css("width",$(window).width());
	$(".bigImg-li").css("height",$(window).height()+64);
	//退出预览图
	$(".bigImg-li").unbind("click").click(function(){
		$(".bigImg").css("display","none");
		mySwiper.slideTo(0, 1000, false);
		$(".bigImg-main").html('');
		$(".swiper-pagination").html('');
		mySwiper.destroy(true);
		//mySwiper.update();
		//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:true
			}
			data=JSON.stringify(data);
			if(getParamByUrl("os")=="android"){
				mobileApp.showTitle(data);
			}
			else{
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}
	})
	var deviceType6=isMobile();
	if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
		var data={
			display:false
		}
		data=JSON.stringify(data);
		if(getParamByUrl("os")=="android"){
			mobileApp.showTitle(data);
		}
		else{
			mobileApp.showTitle.postMessage(data);
		}
		//mobileApp.showTitle(data);
	}
});
}
//删除打卡记录方法
function deletePart(deleteIndex,deleteCheckId){
	var finalUrl=ajaxLink+"/v1/api/camp/deleteCheckIn"+window.location.search+'&checkId='+deleteCheckId;
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				$(".msgType1 .part").eq(deleteIndex).remove();
			}
			else{
				// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}
function bindZan(){
	$(".msgZanName1").unbind("click").click(function(){
		var index=$(".msgZanName1").index(this);
		$(".msgZanName1").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgZanName1").eq(index).attr("targetRoleId"));
		event.stopPropagation();
	});
}
//绑定点赞方法
function changeZan(index){
	var zanNum=parseInt($(".partRight-type1-zan:eq("+index+") span").html());
	if($(".partRight-type1-zan").eq(index).hasClass("hasZan")){
		var checkId=$(".partRight-type1-zan").eq(index).attr("checkId");
		var checkRoleId=$(".partRight-type1-zan").eq(index).attr("checkRoleId");
		var finalUrl=ajaxLink+"/v1/api/camp/cancelPraise"+window.location.search+"&checkId="+checkId+"&checkRoleId="+checkRoleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					$(".partRight-type1-zan").eq(index).removeClass("hasZan");
					$(".partRight-type1-zan:eq("+index+") img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png");
					$(".partRight-type1-zan:eq("+index+") span").html(zanNum-1);
					//添加点赞名字开始
					if($(".msgZan:eq("+index+") a").length>1){
						for(var i=0;i<$(".msgZan:eq("+index+") a").length;i++){
							if($(".msgZan:eq("+index+") a").eq(i).attr("targetRoleId")==roleId){
								if(i==$(".msgZan:eq("+index+") a").length-1){
									var changeHtml=$(".msgZan:eq("+index+") a").eq(i-1).html().split("，")[0];
									$(".msgZan:eq("+index+") a").eq(i-1).html(changeHtml);
								}
								$(".msgZan:eq("+index+") a").eq(i).remove();
							}
						}
					}
					else{
						$(".msgZan").eq(index).remove();
					}
					//添加点赞名字结束
				}
				else{
					// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	}
	else{
		var checkId=$(".partRight-type1-zan").eq(index).attr("checkId");
		var checkRoleId=$(".partRight-type1-zan").eq(index).attr("checkRoleId");
		var finalUrl=ajaxLink+"/v1/api/camp/praise"+window.location.search+"&checkId="+checkId+"&checkRoleId="+checkRoleId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					$(".partRight-type1-zan").eq(index).addClass("hasZan");
					$(".partRight-type1-zan:eq("+index+") img").attr("src","http://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png");
					$(".partRight-type1-zan:eq("+index+") span").html(zanNum+1);
					//删除点赞名字开始
					if($(".partRight-msg:eq("+index+") div").eq(0).hasClass("msgZan")){
						if($(".msgZan:eq("+index+") a").length>0){
							var len=$(".msgZan:eq("+index+") a").length-1;
							var changeHtml=$(".msgZan:eq("+index+") a").eq(len).html();
							$(".msgZan:eq("+index+") a").eq(len).html(changeHtml+"，");
						}
						$(".partRight-msg:eq("+index+") .msgZan").append('<a class="msgZanName1" targetRoleId="'+roleId+'">'+roleName+'</a>');

					}
					else{
						$(".partRight-msg:eq("+index+")").prepend('<div class="row msgZan"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" /><a class="msgZanName1" targetRoleId="'+roleId+'">'+roleName+'</a></div>');
					}
					//删除点赞名字结束
				}
				else{
					// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			}
		})
	}
}



//绑定回复事件
function bindMsg(){
	$(".msgInfo-msg").unbind("click").click(function(event){
		level=2;
		var index=$(".msgInfo-msg").index(this);
		if(roleId==$(".msgInfo-msg").eq(index).attr("replyRoleId")){
			var finalUrl=ajaxLink+"/v1/api/camp/deleteReply"+window.location.search+'&Id='+$(".msgInfo-msg").eq(index).attr("replyId");
			$.ajax({
				type:"get",
				url:finalUrl,
				dataType:"json",
				success:function(data){
					if(data.code == 200){
						$(".msgInfo").eq(index).remove();
					}
					else{
						// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
					}

				}
			})
		}
		else{
			partIndex=$(".msgInfo-msg").eq(index).attr("partIndex");
			dataAddMsg.level=2;
			dataAddMsg.checkId=$(".msgInfo-msg").eq(index).attr("checkId");
			dataAddMsg.replyId=$(".msgInfo-msg").eq(index).attr("replyId");
			dataAddMsg.replyRoleId=$(".msgInfo-msg").eq(index).attr("replyRoleId");
			$("#comment-msg").attr("placeholder",'回复'+$(".msgInfo-msg:eq("+index+")").attr("roleName"));
			
			$(".comment").css("display","block");
			//$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height()-2*1.1875*parseInt($("html").css("font-size")));
			$("#comment-msg").focus();
			$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
		}
		
		event.stopPropagation();
	});
}
//绑定跳转
function bindName(){
	$(".msgInfo-name").unbind("click").click(function(){
		var index=$(".msgInfo-name").index(this);
		$(".msgInfo-name").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId"));
		event.stopPropagation();
	});
}
	$(".tab").unbind("click").click(function(){
		$(".comment").css("display","none");
	});
	$(".msgType1").unbind("click").click(function(){
		$(".comment").css("display","none");
	});
	$(".msgType2").unbind("click").click(function(){
		$(".comment").css("display","none");
	});

//添加评论

	$("#comment-btn").unbind("click").click(function(){
		if($("#comment-msg").val()==''){
			// alert("留言不能为空");
	                $(".error-main-t").html("留言不能为空");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
		}
		else{
			dataAddMsg.content=$("#comment-msg").val();
			addmsg(dataAddMsg);
			
		}
		
	});
	$("#comment-back").unbind("click").click(function(){
		console.log('112-1');
		$(".comment").css("display","none");
		$("#comment-msg").val("");
	});
//添加评论方法
function addmsg(dataAddMsg){
	var finalUrl=ajaxLink+"/v1/api/camp/reply"+window.location.search+'&checkId='+dataAddMsg.checkId+'&content='+dataAddMsg.content+'&level='+dataAddMsg.level+'&replyId='+dataAddMsg.replyId+'&replyRoleId='+dataAddMsg.replyRoleId;
	//var finalUrl='http://pm.picooc.com:9989/v1/api/camp/reply?checkId=123&roleId=1300&content=heihei&level=1&replyId=56&replyRoleId=1206526';
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				var str='';
				var arrIsCoach=["msgInfo-name","msgInfo-name2"];
				var arrIsCoachBtn=0;
				var arrIsCoachBtn2=0;
				if(data.resp.isCoach){
					arrIsCoachBtn=1;
				}
				if(data.resp.isReplyCoach){
					arrIsCoachBtn2=1;
				}
				if(level==1){
					str='<div class="row msgInfo">'+
							'<img class="msgInfo-header" src="'+data.resp.roleImg+'" onerror="this.src='+arrHeadImg[data.resp.roleSex]+'" />'+
							'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
								'<span class="msgInfo-msg" partIndex="'+partIndex+'" checkId="'+data.resp.checkId+'" replyId="'+data.resp.id+'" replyRoleId="'+data.resp.roleId+'" roleName="'+data.resp.roleName+'"><a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.roleId+'">'+data.resp.roleName+'：</a>'+data.resp.content+'</span>'+
							'</div>'+
						'</div>';
					//str='<div class="row msgInfo"><img class="msgInfo-header" src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-15.png" /><div class="col-xs-12 col-sm-12 msgInfo-mian"><span class="msgInfo-msg" partIndex="'+partIndex+'" checkid="8" replyid="8" replyroleid="8888"><a class="msgInfo-name">狼来了:</a>我来啦啦啦啦啦啦啦啦啦我来啦啦啦啦啦啦啦啦啦我来啦啦</span></div></div>';	
				}
				else{
					str='<div class="row msgInfo">'+
							'<img class="msgInfo-header" src="'+data.resp.roleImg+'" onerror="this.src='+arrHeadImg[data.resp.roleSex]+'" />'+
							'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
								'<span class="msgInfo-msg" partIndex="'+partIndex+'" checkId="'+data.resp.checkId+'" replyId="'+data.resp.id+'" replyRoleId="'+data.resp.roleId+'" roleName="'+data.resp.roleName+'">'+
								'<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.roleId+'">'+data.resp.roleName+'</a>'+
								'<span>回复</span>'+
								'<a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.replyRoleId+'">'+data.resp.replyRoleName+'：</a>'+data.resp.content+'</span>'+
							'</div>'+
						'</div>';
					//str='<div class="row msgInfo"><img class="msgInfo-header" src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-15.png" /><div class="col-xs-12 col-sm-12 msgInfo-mian"><span class="msgInfo-msg" partIndex="'+partIndex+'" checkid="8" replyid="8" replyroleid="8888"><a class="msgInfo-name">狼来了</a><span>回复</span><a class="msgInfo-name">大灰狼：</a>我来啦啦啦啦啦啦啦啦啦我来啦啦啦啦啦啦啦啦啦我来啦啦</span></div></div>';	
				}
				//console.log(pageIndex);
				$(".msgType1 .partRight-msg").eq(partIndex).append(str);
				bindMsg();
				bindName();
				$(".comment").css("display","none");
				$("#comment-msg").val("");
			}
			else{
				// alert(data.result.message);
	                $(".error-main-t").html(data.result.message);
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}
//添加评论结束
//结束的反括号
})

/*$("#comment-msg").bind("focus",function(){
	//$(".comment").css("top",$(window).height()+$(window).scrollTop()-235-$(".comment").height());
	var top1=parseFloat($('.comment').eq(0).offset().top);
	
	setTimeout(function(){
		if(parseFloat($('.comment').eq(0).offset().top)-top1<200){
			$(".comment").css("top",$(window).height()+$(window).scrollTop()-235-$(".comment").height());
		}
		else{
			$(".comment").css("top",$(window).height()+$(window).scrollTop()-10-$(".comment").height());
		}

		//$(".comment").css("top",$(window).height()+$(window).scrollTop()-235-$(".comment").height());
		
	},400);

}).bind("blur",function(){
	console.log('112-2');
	$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
});*/

function getKeyBoard(open,height){
	if(open){
		if(getParamByUrl("os")=="android"){
			$("#comment-msg").css("height","8rem");
			$(".footer-main").css("margin-bottom","6rem");
		}
	}
	else{
		setTimeout(function(){
			$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());
		},100);
	}
}


