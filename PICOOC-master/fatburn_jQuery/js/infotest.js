var pageIndex=2;
$(function(){
	var deviceType=isMobile();
	var getPageInfo = function (){
		var data = {
			iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,
			closeWebview:0,//默认为0
			iconUrl:""
		};
		return JSON.stringify(data);
	};
	mobileApp.showLeftBtn(getPageInfo());
	//样式调整
    $(".partTop").css("height",$(".partTop").width()*845/1242); 
    $(".partRight-img-li2").css("height",$(".partRight-img-li2").width()*3/4);
    $(".headimg").css("height",$(".headimg").width()); 
    $(".line").css("height",$(".line").width()*7/527);
    $(".partBottom").css("height",$(".partBottom").width()*357/1242); 
    $(".tag").css("height",$(".tag").width()*264/76);
    $(".tag").css("top",$(".partTop").height()*500/510);
    $(".partTop-content").css("margin-top",$(".partTop").height()*110/510);


	//appNoShare();
	shareInfo();
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
	// alert("测试："+finalUrl);
	$.ajax({
		type:"get",
		url:finalUrl,
		dataType:"json",
		success:function(data){
			if(data.code == 200){
				// alert("测试："+JSON.stringify(data));
				if(data.resp.hasNews){
					$(".hasMsg").css("display","block");
					$(".hasMsg span").html(data.resp.unReadNum);
				}
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
					// if(data.resp.praises.length==0){
					// 	strZan='';
					// }
					// else{
					// 	var arrMsgZan=["msgZanName1","msgZanName2"];
					// 	for(var j=0;j<data.resp.praises.length;j++){
					// 		var msgZanBtn=0;
					// 		if(data.resp.praises[j].isCoach){
					// 			msgZanBtn=1;
					// 		}
					// 		if(j==data.resp.praises.length-1){
					// 			strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.praises[j].praiseRoleId+'">'+data.resp.praises[j].praiseRoleName+'</a>';
					// 		}
					// 		else{
					// 			strZan+='<a class="'+arrMsgZan[msgZanBtn]+'" targetRoleId="'+data.resp.praises[j].praiseRoleId+'">'+data.resp.praises[j].praiseRoleName+'，</a>';
					// 		}
					// 	}
					// 	strZan='<div class="row msgZan"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" />'+strZan+'</div>';
					// }
					//点赞的人结束
					//评论内容开始
					// if(data.resp.replys.length==0){

					// }
					// else{
					// 	for(var j=0;j<data.resp.replys.length;j++){
					// 		var strMsgName='';
					// 		var arrIsCoach=["msgInfo-name","msgInfo-name2"];
					// 		var arrIsCoachBtn=0;
					// 		var arrIsCoachBtn2=0;
					// 		var headIsCoach="no";
					// 		if(data.resp.replys[j].isCoach){
					// 			arrIsCoachBtn=1;
					// 			headIsCoach="yes";
					// 		}
					// 		if(data.resp.replys[j].isReplyCoach){
					// 			arrIsCoachBtn2=1;
					// 		}
							
					// 		if(data.resp.replys[j].level==1){

					// 			strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.replys[j].roleId+'">'+data.resp.replys[j].roleName+'：</a>'+data.resp.replys[j].content;
							
					// 		}
					// 		else{
					// 			strMsgName='<a class="'+arrIsCoach[arrIsCoachBtn]+'" targetRoleId="'+data.resp.replys[j].roleId+'">'+data.resp.replys[j].roleName+'</a><span>回复</span><a class="'+arrIsCoach[arrIsCoachBtn2]+'" targetRoleId="'+data.resp.replys[j].replyRoleId+'">'+data.resp.replys[j].replyRoleName+'：</a>'+data.resp.replys[j].content;
					// 		}
					// 		strMsg+='<div class="row msgInfo">'+
					// 						'<a class="msgInfo-headerHref" headIsCoach="'+headIsCoach+'" targetRoleId="'+data.resp.replys[j].roleId+'"><img class="msgInfo-header" src="'+data.resp.replys[j].roleImg+'" onerror="this.src='+arrHeadImg[data.resp.replys[j].roleSex]+'" /></a>'+
					// 						'<div class="col-xs-12 col-sm-12 msgInfo-mian">'+
					// 							'<span class="msgInfo-msg" checkId="'+data.resp.id+'" replyId="'+data.resp.replys[j].id+'" replyRoleId="'+data.resp.replys[j].roleId+'" partIndex="'+0+'" roleName="'+data.resp.replys[j].roleName+'">'+strMsgName+
					// 						'</div>'+
					// 					'</div>';
					// 	}
					// }
					
					//评论内容结束
					//添加打卡内容
					// var hasZanBtn="";
					// var hasZanImgBtn=0;
					// if(data.resp.hasPraised){
					// 	hasZanBtn="hasZan";
					// 	hasZanImgBtn=1;
					// }
					// console.log(hasZanBtn);
					// var strMsgTotol='';
					// if(strZan!="" || strMsg!=""){
					// 	strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+'</div>';
					// }
					// else{
					// 	strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>';
					// }

					//标签显示
					if(data.resp.type==0 || data.resp.type){
						$(".tag").css('background','url('+cardTypeBg2[data.resp.type]+') no-repeat center center');
						$(".tag").css('background-size','cover');
						$("#type").html(cardType[data.resp.type]);
					}else{}


					var strDate="";
					if(data.resp.checkDay && data.resp.checkTime){
						$(".date").html(data.resp.checkDay);
						$(".time").html(data.resp.checkTime);
				  //       var now = new Date();
				       
				  //       // var year = now.getFullYear();       //年
				  //       var month = now.getMonth() + 1;     //月
				  //       var day = now.getDate();            //日
				       
				  //       var hh = now.getHours();            //时
				  //       var mm = now.getMinutes();          //分
				  //       var checkDay ="";
				  //       var checkTime = "";
				  //       if(month < 10){
				  //           month = "0"+month+"月";
				  //       }
				  //       if(day < 10){
				  //           day = "0"+day+"日";
				  //       }
				           
				  //       checkDay = month + day;
				       
				  //       if(hh < 10){
				  //           hh = "0"+hh;
				  //       }
				  //       if (mm < 10){
				  //       	mm = '0'+ mm;
				  //       } ; 
				  //       checkTime = hh+":"+mm; 
						// $(".date").html(checkDay);
						// $(".time").html(checkTime);
					}
					else{
						// // strDate='<span>'+data.resp.checkDay+'</span>'+data.resp.checkTime;
						// $(".date").html(data.resp.checkDay);
						// $(".time").html(data.resp.checkTime);
					}
					//用户昵称显示
					if(data.resp.roleName){
						$(".username").html(data.resp.roleName);
					}else{
						$(".username").html("");
					}
					//用户头像显示
					if(data.resp.roleImg && data.resp.roleName!=""){
						$(".headimg").css('background','url('+data.resp.roleImg+') no-repeat center center');
						$(".headimg").css('background-size','100% 100%');
					}else{
						$(".headimg").css('background','url('+arrHeadImg[data.resp.roleSex]+') no-repeat center center');
						$(".headimg").css('background-size','100% 100%');
					}
					//用户
					//strDate='<span>'+data.resp.checkDay+'</span>'+data.resp.checkTime;
					str2+='<aside class="row part">'+
							'<div class="partLeft"></div>'+
							'<div class="col-xs-12 col-sm-12 partRight">'+
								'<div class="row ">'+
									'<div class="col-xs-12 col-sm-12 partRight-type2">'+data.resp.content+
									// '<div class="partRight-type2-name">'+data.resp.roleName+'</div>'+
									// '<div class="partRight-type2-date">'+strDate+'</div>'+
									// '<span class="tag" style="background-image:url('+cardTypeBg[data.resp.type]+')">'+cardType[data.resp.type]+'</span>'+
									'</div>'+
									// '<div class="col-xs-12 col-sm-12 partRight-p1">'+data.resp.content+'</div>'+
									'<div class="col-xs-12 col-sm-12 partRight-img">'+strImg+'</div>'+
									// '<div class="col-xs-12 col-sm-12 partRight-type1">'+
									// 	'<span class="partRight-type1-zan '+hasZanBtn+'" checkId="'+data.resp.id+'" checkRoleId="'+data.resp.roleId+'"><img src="'+arrHasZan[hasZanImgBtn]+'" /><span>'+data.resp.praiseNum+'</span></span>'+
									// 	'<span class="partRight-type1-msg" checkId="'+data.resp.id+'" replyId="0" replyRoleId="'+data.resp.roleId+'" partIndex="'+0+'"><img src="http://cdn2.picooc.com/web/res/fatburn/image/student/student-7.png" /></span>'+
									// '</div>'+strMsgTotol+
								'</div>'+
							'</div>'+
						'</aside>';
			
				$(".msgType2 .list").html(str2);
				if(strImg==""){
					$(".partRight-type2").css("margin","6rem 0");
				}
				//$(".msgType2 .list").html(str2);
				$(".partRight-img-li").css("height",$(".partRight-img").width()/3);
				$(".partRight-img-li2").css("height",$(".partRight-img-li2").width()*3/4);

			    if(($(".container").height()+$(".partBottom").height())<window.innerHeight){
			      $(".partBottom").css("position","absolute");
			      $(".partBottom").css("left","0");
			      $(".partBottom").css("bottom","0");
			    }else{}
				//bindBigImg();//绑定预览图
				// //绑定评论按钮
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
				// bindZan();//绑定点赞的链接跳转
				// bindMsg();//绑定评论
				// bindName();//绑定跳转
				// jumpToTarget();//从消息列表跳转的评论跳到指定位置
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
				// $(".partRight-type1-delete").unbind("click").click(function(){
				// 	var deleteIndex=$(".partRight-type1-delete").index(this);
				// 	var deleteCheckId=$(".partRight-type1-delete").eq(deleteIndex).attr("checkId");
				// 	deletePart(deleteIndex,deleteCheckId);
				// });
				//绑定点赞
				// $(".partRight-type1-zan").unbind("click").click(function(){
				// 	var index=$(".partRight-type1-zan").index(this);
				// 	changeZan(index);
				// });
			}
			else{
				// alert("您好,该打卡已被删除!");
	            $(".error-main-t").html(data.result.message);
	            $(".errorAlert").css("display","block");
	            $(".error-main").css("margin-top",-$(".error-main").height()/2);
			}

		}
	})
}


//结束的反括号
})
/*function appNoShare(){
	var getPageInfo = function (){
		var data = {
			title:'打卡详情',
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
        mobileApp.deleteHistory(getPageInfo());
    }
    document.documentElement.style.webkitTouchCallout='none';
}

//截图分享
function shareInfo(){
    var getPageInfo = function (){
      var data = {
        title:'分享',
        backgroundColor:'#2c2f31',
        isShare:true,
        shareTitle:'有品·燃脂营',
        shareUrl:"",
        shareIcon:'',
        shareDesc:'#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
        shareType:2,
        shareTypeDesc:""
      };
      return JSON.stringify(data);
    };
    var deviceType=isMobile();
    if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
        mobileApp.getShareInfo(getPageInfo());
    }
	document.documentElement.style.webkitTouchCallout='none';
}
