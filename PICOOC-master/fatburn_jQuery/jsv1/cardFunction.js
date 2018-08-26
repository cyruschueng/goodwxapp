var SXiaoXiXiangQing={//和info.js匹配
	SCategory_SXiaoXiXiangQing:5060700,
	SXiaoXiXiangQing_ZuoBianTouXiangTiaoZhuan:5060701,//左边头像跳转
	SXiaoXiXiangQing_YouBianNiChengTiaoZhuan:5060702,//右边昵称跳转
	SXiaoXiXiangQing_YuLanTuPian:5060703,//预览图片
	SXiaoXiXiangQing_ShanChuDaka:5060704,//删除打卡
	SXiaoXiXiangQing_QuXiaoShanChu:5060705,//取消删除
	SXiaoXiXiangQing_QueDingShanChu:5060706,//确定删除
	SXiaoXiXiangQing_FenXiangXiaoXi:5060707,//分享消息
	SXiaoXiXiangQing_DianZan:5060708,//点赞
	SXiaoXiXiangQing_PingLunXiaoXi:5060709,//评论消息
	SXiaoXiXiangQing_DianZanXueYuanTouXiang:5060710,//点赞学员头像
	SXiaoXiXiangQing_BangDingHuiFuShiJian:5060711,//绑定回复事件
	SXiaoXiXiangQing_ShanChuZiJiPingLun:5060712,//删除自己评论
	SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun:5060713,//取消删除自己评论
	SXiaoXiXiangQing_HuiFuShuRuKuang:5060714,//回复输入框
	SXiaoXiXiangQing_DianJiFaSong:5060715//点击发送
};
var objImg={};
var cardType=["早餐","午餐","晚餐","加餐","运动"];
var cardTypeBg=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-20.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-21.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-22.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-23.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-24.png"];
var arrHasZan=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png"];
var cardTypeBg2=["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-1.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-2.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-3.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-4.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-5.png"]

//functionType 1、个人主页 2、他人主页 3、营内动态 4、教练端 info、info页
var roleId=getParamByUrl("roleId");
var roleName='';

var objImgIndex=0;
var level=0;
var commentIndex=0;
var partIndex=0;
var dataAddMsg={};
var zanBtn=true;
var msgBtn=true;
var msgScrollTop=0;
var msgScrollAddBtn=false;
var pageBtn=true;
var functionType=0;
var functionType1=0;//card1区分
var windowW=$(window).width();
var windowH=$(window).height();
var count=20;
var time=0;
var hasNextBtn1=true;
var hasNextBtn2=true;
var saveLink;
var mySwiper;
var t1;
var closeImgBtn=true;
var shaixuanComment=false;
// var deleteScrollTop = 0; //删除打卡时的滚动距离

// var deleteScrollTop2 = 0;
var scrollTime1;//inputSelect的延迟时间
var commentBtn=false;
var inputSelect=false;
var firstInputSelect=false;
var nBtn=false;//评论是否回车
var commentHeight=3.1875*parseInt($("html").css("font-size"));
var arrStrLen=[];
var arrScrollHeight=[];
var card1Type=-1;//区分card1的筛选类型
var card2Type=-1;//区分card2的筛选类型
// var msgtest = ""; //评论输入框测试标识
//绑定图片预览方法
function bindBigImg(){
	$(".partRight-img-li").unbind("click").click(function(){
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_YuLanTuPian);
		var name=$(this).attr("objImg");
		var swiperIndex=$(this).attr("objImgIndex");
		//console.log(objImg);
		//console.log(objImg[name]);
		var str='';
		for(var i=0;i<objImg[name].length;i++){
			str+='<div class="col-xs-12 col-sm-12 swiper-slide bigImg-li" style=\"background-image:url('+objImg[name][i].url+')\"></div>'
		}
		if($(".page1").css("display") == "block"){
			$(".setcard-img").css("display","none");
		}
		$(".comment").css("display","none");
		$("#comment-msg").blur();
		$(".bigImg-main").html('');
		$(".bigImg-main").html(str);
		$(".getImg-bg").css("height",$(".getImg-bg").width());
		//设置宽高

		$(".bigImg-li").css("width",windowW);
		if(getParamByUrl("os")=="android"){
			$(".bigImg-li").css("height",windowH+70);
		}
		else{
			$(".bigImg-li").css("height",windowH+64);
		}

		//$(".bigImg-li").css("height",windowH+70);
		//$(".bigImg-li").css("height",windowH+64);
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			//隐藏title
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
			//控制安卓返回键
			if(getParamByUrl("os")=="android"){
				var getPageInfo = function (){
					var data = {
						controlBtn:true,
						function:"closeBigImg"
					};
					return JSON.stringify(data);
				};
				if(getParamByUrl("os")=="android"){
					mobileApp.showBackBtn(getPageInfo());
				}
				else{
					mobileApp.showBackBtn.postMessage(getPageInfo());
				}
				//mobileApp.showBackBtn(getPageInfo());
			}
		}
		
		
		t1=setTimeout(function(){
			$("body").css("max-height",$(window).height());
			$("body").css("overflow","hidden");
			
			$(".swiper-container").css("width",$(window).width());
			$(".swiper-wrapper").css("width",$(window).width());
			$(".bigImg-li").css("width",$(window).width());
			$(".bigImg").css("display","block");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
			//$(".swiper-wrapper").css("-webkit-transform","translate3d(0,0,0)");
			//$(".swiper-wrapper").css("transform","translate3d(0,0,0)");
			if(objImg[name].length==1){
				mySwiper = new Swiper('.swiper-container', {
				});
			}
			else{
				mySwiper = new Swiper('.swiper-container', {
					pagination : '.swiper-pagination',
				    spaceBetween: 1,
					centeredSlides: true,
					initialSlide :swiperIndex
				});
			}
		},200);
		//保存图片
		var timeout;
		
		var timeBtn=true;
		var startX;
		var startY;
		var moveEndX;
		var moveEndY;
		$(".bigImg-li").on("touchstart",function(e){ 
			startX = e.originalEvent.changedTouches[0].pageX,
    		startY = e.originalEvent.changedTouches[0].pageY;
            var x=$(".bigImg-li").index(this);
            saveLink=$(this).css("background-image").split("\(")[1].split("\)")[0];
	        console.log($(this));
	        console.log(saveLink);

	        console.log($(".bigImg").css("display"));
            timeout = setTimeout(function(){
            	if($(".bigImg").css("display")=="block"){
            		$(".saveImg-ceng").css("height",$(window).height());
                	$(".saveImg-ceng").css("display","block");
                	timeBtn=false;
                }
            }, 500);
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
		})

		$(".bigImg-li").on("touchmove",function(e){
			if($(".saveImg-ceng").css("display")=="block"){
				//$(".saveImg-ceng").css("display","none");
				clearTimeout(timeout);
				timeBtn=false;
			}
			else{
				moveEndX = e.originalEvent.changedTouches[0].pageX;
	   			moveEndY = e.originalEvent.changedTouches[0].pageY;
	   			var moveX;
	   			var moveY;
	   			moveX=moveEndX-startX;
	   			moveY=moveEndY-startY;
	   			
	   			if(moveX<-50 || moveX>50 || moveY<-50 || moveY>50){
	   				clearTimeout(timeout);
	   				timeBtn=false;
	   			}
			}
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		//退出保存图片
		$(".bigImg-li").on("touchend",function(event){
			clearTimeout(timeout);
			if(timeBtn){
				closeBigImg();
			}
			timeBtn=true;
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		/*$(".bigImg-li").mouseout(function(){
			clearTimeout(timeout);
		});*/
		//调用客户端保存图片方法
		$(".saveImg-btn").unbind("touchstart").bind("touchstart",function(e){
		//$(".saveImg-btn").unbind("touchstart").touchstart(function(){
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
			var deviceType=isMobile();//判断是不是app的方法
			/*alert(saveLink);
			saveLink=JSON.stringify(saveLink);
			console.log(typeof saveLink);
			console.log(saveLink);*/
			if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
				var getPageInfo = function (){
					var data = {
						url:saveLink
					};
					return JSON.stringify(data);
				};
                if(getParamByUrl("os")=="android"){
                    mobileApp.saveImg(getPageInfo());
                }
                else{
                    mobileApp.saveImg.postMessage(getPageInfo());
                }
				//mobileApp.saveImg(getPageInfo());
			}
			$(".saveImg-ceng").css("display","none");
			//$(".saveImg-btn").unbind("touchstart");
		});
		//取消客户端保存图片
		$(".cancelImg-btn").on("touchstart",function(e){ 
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
			$(".saveImg-ceng").css("display","none");
			
		});
		$(".saveImg-ceng").on("touchstart",function(e){ 

			$(".saveImg-ceng").css("display","none");
			event.stopPropagation();
			event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		});
		
		//退出预览图
		/*$(".bigImg-li").unbind("click").click(function(){
			closeBigImg();
			
		});*/
		/*$(".bigImg-li").bind('mousedown', function(event) { 
			 var timeout = setTimeout(function() {  
		        $(".saveImg").css("display","block");
		        alert($(this).attr("background-image")); 
		    }, 2000);   
		});*/
		/*$(".bigImg-li").unbind("mousedown").mousedown(function(){
			var timeout = setTimeout(function() {  
		        $(".saveImg").css("display","block");
		        var x=$(".bigImg-li").index(this);
		        console.log($(this));
		        console.log(x);
		        //alert($(this).attr("background")); 
		    }, 2000); 
		})*/
		
		
	});
}
//删除打卡记录方法
function deletePart(deleteIndex,deleteCheckId,type){
	if(type==2){

	}else{
		$("body").unbind("touchmove");
		$("body").unbind("touchend");
	}
	$(".fixbg-main-t").html("您确定删除这条打卡吗？");
	$(".fixbg").css("display","block");
	$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
	$(".fixbg-main-btn1").unbind("click").click(function(){
		$(".fixbg").css("display","none");
	});
	$(".fixbg-main-btn2").unbind("click").click(function(){
		var finalUrl=ajaxLink+"/v1/api/camp/deleteCheckIn"+window.location.search+'&checkId='+deleteCheckId;
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					if(type==2){
						/*$(".msgType2 .part").eq(deleteIndex).remove();*/
						
						$(".msgType2 .part").eq(deleteIndex).remove();
						$(".fixbg").css("display","none");
						if(deleteIndex==0){
							$(".msgType2 .part").eq(0).css("padding-top",0);
							$(".msgType2 .partLeft").eq(0).css("top",0);
						}		
					}
					else{
						var appendHtml=$(".msgType1 .part").eq(deleteIndex).children(".partLeft").html();
						var appendHtml2=$(".msgType1 .part").eq(deleteIndex).children(".partLeft2").html();
						console.info(appendHtml);
						$(".msgType1 .part").eq(deleteIndex).remove();
						if(appendHtml2 != null && appendHtml2 != "" && appendHtml2 != undefined && $(".msgType1 .part").eq(deleteIndex).hasClass("lineLength1")){
							//当被删除的是带有日期的节点 并且被删除节点的下一个没有日期
							appendHtml2='<div class="col-xs-2 col-sm-2 partLeft2">'+appendHtml2+'</div>';
							$(".msgType1 .part").eq(deleteIndex).prepend(appendHtml);
							console.info(deleteIndex);
							// $(".msgType1 .part").eq(deleteIndex).removeClass("lineLength1");
						}else if(appendHtml != null && appendHtml != "" && appendHtml != undefined ){
							//当被删除的是带有周标识的节点 并且被删除节点的下一个没有日期
							appendHtml='<div class="col-xs-2 col-sm-2 partLeft">'+appendHtml+'</div>';
							$(".msgType1 .part").eq(deleteIndex).prepend(appendHtml);
							console.info(deleteIndex);
							// $(".msgType1 .part").eq(deleteIndex).removeClass("lineLength1");
						}
						$(".fixbg").css("display","none");
						// deleteScrollTop = $(window).scrollTop();
						joinweek=0;
						time=0;
						pageIndex1=0;
						tabBtn=false;
						isFirstLoad=0;
						isCampOver=false;
						if(cardtype1 == 1){
							getList("hasDelete",1);
						}else{
							getList("hasDelete",0);
						}
						
					}
					
				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
			},
	        error : function (){
	                $(".error-main-t").html("啊哦，您的网络不太给力~");
	                $(".errorAlert").css("display","block");
	                $(".error-main").css("margin-top",-$(".error-main").height()/2);
	        }
		})
	});
	
}
//对于点赞的学员进行跳转设置，跳转页面的时候打开一个新的webwiew
function bindZan(){
	$(".msgZanName1").unbind("click").click(function(){
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_DianZanXueYuanTouXiang);
		/*alert("是否是个人进展："+$(".active").hasClass("tab1"));*/
		var isStutap1=$(".active").hasClass("tab1");
		var index=$(".msgZanName1").index(this);
		var roleId=getParamByUrl("roleId");
		var targetRoleId=$(".msgZanName1").eq(index).attr("targetRoleId");
		var targetCampIdHref="";
		var jumpUrl="";
		if($(".msgZanName1").eq(index).attr("targetcampid") != "-1" && $(".msgZanName1").eq(index).attr("targetcampid")!=undefined && $(".msgZanName1").eq(index).attr("targetcampid")!="undefined" ){
			targetCampIdHref="&targetCampId="+$(".msgZanName1").eq(index).attr("targetcampid");
		}
		var searchLink=window.location.search;
		if(targetRoleId!="false"){
			searchLink=removeParamByUrl("targetRoleId");
		}
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
			if(!isStutap1){
				setCookie("stuPageJump",1,1);
			}else{
				setCookie("stuPageJump",2,1);
			}
		}else{
			jumpUrl="studentOtherInfo.html";
		}
		console.info(searchLink);
		var deviceType=isMobile();//判断是不是app的方法
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			
			var data={
				link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+$(".msgZanName1").eq(index).attr("targetRoleId")+targetCampIdHref,
			    animation: 1//默认1从右到左，2从下到上
			};
			data=JSON.stringify(data);
            if(getParamByUrl("os")=="android"){
                mobileApp.openWebview(data);
            }
            else{
                mobileApp.openWebview.postMessage(data);
            }
			//mobileApp.openWebview(data);
		
		}
		else{
			$(".msgZanName1").attr("href",jumpUrl+searchLink+"&targetRoleId="+$(".msgZanName1").eq(index).attr("targetRoleId")+targetCampIdHref);
		}
		
		event.stopPropagation();
	});
}
//绑定分享跳转
//$(".partRight-type1-share")
var shareBtn1=true;//防止连续点击
function shareLink(){
	$(".msgType2 .partRight-type1-share").unbind("click").click(function(event){
		event.stopPropagation();
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
		var checkId=$(this).attr("checkId");
		var searchLink="";
		if(getParamByUrl("checkId")!="false"){
			searchLink=removeParamByUrl("checkId");
		}else{
	 		searchLink=window.location.search;
		}
		if(shareBtn1){
			shareBtn1=false;
			setMessageStatus(0,searchLink,checkId,$(this),2);
		}
	});
	$(".msgType1 .partRight-type1-share").unbind("click").click(function(event){
		event.stopPropagation();
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
		var checkId=$(this).attr("checkId");
		var searchLink="";
		if(getParamByUrl("checkId")!="false"){
			searchLink=removeParamByUrl("checkId");
		}else{
	 		searchLink=window.location.search;
		}
		if(shareBtn1){
			shareBtn1=false;
			setMessageStatus(0,searchLink,checkId,$(this),1);
		}
	});

}
function setMessageStatus(replyId,searchLink,checkId,object,shareType){
    console.info(searchLink);
    console.info(object.parents(".part"));
    var host=window.location.protocol+"//"+window.location.host;
    var finalUrl=host+"/v1/api/camp/checkState"+window.location.search+"&replyId="+replyId+"&checkId="+checkId;
    $.ajax({
        type: "get",
        url: finalUrl,
        success : function (data) {
            if(data.resp.check){
                
                //打开一个新的webWiew
                var deviceType=isMobile();//判断是不是app的方法
				if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

					var data={
						link:absoluteUrl+"infotest2.html"+searchLink+"&checkId="+checkId,
					    animation: 2//默认1从右到左，2从下到上
					};
					data=JSON.stringify(data);
                    if(getParamByUrl("os")=="android"){
                        mobileApp.openWebview(data);
                    }
                    else{
                        mobileApp.openWebview.postMessage(data);
                    }
					//mobileApp.openWebview(data);
					shareBtn1=true;
				}
				else{
					shareBtn1=true;
					window.location.href="infotest2.html"+searchLink+"&checkId="+checkId;
				}
				event.stopPropagation();
            }else{
                $(".error-main-t").html("啊哦，该打卡已被删除~");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
                shareBtn1=true;
                if(shareType==1){
					joinweek=0;
					time=0;
					pageIndex1=0;
					tabBtn=false;
					isFirstLoad=0;
					isCampOver=false;
					if(cardtype1 == 1){
						getList("hasDelete",1);
					}else{
						getList("hasDelete",0);
					}
                }else if(shareType ==2){
                	object.parents(".part").remove();
                }
                
               /* var noMsgNum=$("#noReadMessage li").length;
                $("#"+checkId).remove();
                if(noMsgNum == 1){
                    $("#getDataButton").find("span").click();
                }*/
            }
        },
        error : function (){
                $(".error-main-t").html("啊哦，您的网络不太给力~");
                $(".errorAlert").css("display","block");
                $(".error-main").css("margin-top",-$(".error-main").height()/2);
                shareBtn1=true;
        }
    });
}

//绑定点赞方法
function changeZan(index){
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_DianZan);
	var index=index;
	console.log(index);
	if(zanBtn){
		zanBtn=false;
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
						console.log(index);
						$(".partRight-type1-zan").eq(index).removeClass("hasZan");
						$(".partRight-type1-zan:eq("+index+") img").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png");
						$(".partRight-type1-zan:eq("+index+") span").html(zanNum-1);
						//删除点赞名字开始
						console.log($(".partRight:eq("+index+") .msgZan a").length);
						if($(".partRight:eq("+index+") .msgZan a").length>1){
							for(var i=0;i<$(".partRight:eq("+index+") .msgZan a").length;i++){
								console.log(roleId);

								if($(".partRight:eq("+index+") .msgZan a").eq(i).attr("targetRoleId")==roleId){
									if(i==$(".partRight:eq("+index+") .msgZan a").length-1){
										var changeHtml=$(".partRight:eq("+index+") .msgZan a").eq(i-1).html().split("，")[0];
										$(".partRight:eq("+index+") .msgZan a").eq(i-1).html(changeHtml);
									}
									$(".partRight:eq("+index+") .msgZan a").eq(i).remove();
								}
							}
						}
						else{
							$(".partRight:eq("+index+") .msgZan").remove();
						}
						if($(".partRight:eq("+index+") .partRight-msg").html()==""){
							$(".partRight:eq("+index+") .partRight-msg").addClass("partRight-msg2");
						}
						//删除点赞名字结束
					}
					else{
						// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
					zanBtn=true;
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
						$(".partRight-type1-zan:eq("+index+") img").attr("src","https://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png");
						$(".partRight-type1-zan:eq("+index+") span").html(zanNum+1);
						//添加点赞名字开始
						if($(".partRight-msg:eq("+index+") div").eq(0).hasClass("msgZan")){
							if($(".partRight:eq("+index+") .msgZan a").length>0){
								var len=$(".partRight:eq("+index+") .msgZan a").length-1;
								var changeHtml=$(".partRight:eq("+index+") .msgZan a").eq(len).html();
								$(".partRight:eq("+index+") .msgZan a").eq(len).html(changeHtml+"，");
							}
							if(data.resp.isCoach){
								$(".partRight-msg:eq("+index+") .msgZan").append('<a class="msgZanName2" targetRoleId="'+data.resp.praiseRoleId+'">'+data.resp.praiseRoleName+'</a>');
							}
							else{
								$(".partRight-msg:eq("+index+") .msgZan").append('<a class="msgZanName1" targetRoleId="'+data.resp.praiseRoleId+'">'+data.resp.praiseRoleName+'</a>');
							}
						}
						else{
							if(data.resp.isCoach){
								$(".partRight-msg:eq("+index+")").prepend('<div class="row msgZan"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" /><a class="msgZanName2" targetRoleId="'+data.resp.praiseRoleId+'">'+data.resp.praiseRoleName+'</a></div>');
							}
							else{
								$(".partRight-msg:eq("+index+")").prepend('<div class="row msgZan"><img src="https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png" /><a class="msgZanName1" targetRoleId="'+data.resp.praiseRoleId+'">'+data.resp.praiseRoleName+'</a></div>');
							}
							
						}
						if($(".partRight:eq("+index+") .partRight-msg").hasClass("partRight-msg2")){
							$(".partRight:eq("+index+") .partRight-msg").removeClass("partRight-msg2");
						}
						//添加点赞名字结束
						bindZan();
					}
					else{
						// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
					}
					zanBtn=true;
				}
			})
		}
	}
}


//绑定回复事件
function bindMsg(){
	$(".msgInfo-msg").unbind("click").click(function(event){
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_BangDingHuiFuShiJian);
		level=2;
		var index=$(".msgInfo-msg").index(this);
		if(roleId==$(".msgInfo-msg").eq(index).attr("replyRoleId")){
			$(".fixbg-main-t").html("您确定要删除此评论吗？删除后就不能恢复了～");
			$(".fixbg").css("display","block");
			$(".fixbg-main").css("margin-top",-$(".fixbg-main").height()/2);
			$(".fixbg-main-btn1").unbind("click").click(function(){
				setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun);
				$(".fixbg").css("display","none");
			});
			$(".fixbg-main-btn2").unbind("click").click(function(){
				setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_ShanChuZiJiPingLun);
				var finalUrl=ajaxLink+"/v1/api/camp/deleteReply"+window.location.search+'&Id='+$(".msgInfo-msg").eq(index).attr("replyId");
				$.ajax({
					type:"get",
					url:finalUrl,
					dataType:"json",
					success:function(data){
						if(data.code == 200){
							var index1=$(".msgInfo-msg").eq(index).attr("partIndex");
							$(".msgInfo").eq(index).remove();
							if($(".msgType"+pageIndex+" .partRight:eq("+index1+") .partRight-msg").html()==""){
								$(".msgType"+pageIndex+" .partRight:eq("+index1+") .partRight-msg").addClass("partRight-msg2");
							}
							$(".fixbg").css("display","none");
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
		else{
		 // if(msgtest && msgtest=="ceshi"){
			if($(".cardListMessage").length>0){
				$(".cardListMessage").css("display","none");
			}
			
		 	if($(".msgInfo-msg").eq(index).attr("replyId")!=dataAddMsg.replyId){
				$("#comment2-msg1").val("");
				$("#comment2-msg2").val("");
				$("#comment2-msg1").css("height",commentHeight);
				$("#comment2-msg2").css("height",commentHeight);
				$(".imgContainer").css("height",commentHeight);
				$(".comment2 .btn").css("height",commentHeight);
				arrStrLen=[];
				arrScrollHeight=[];
		 	}
			partIndex=$(".msgInfo-msg").eq(index).attr("partIndex");
			dataAddMsg.level=2;
			dataAddMsg.checkId=$(".msgInfo-msg").eq(index).attr("checkId");
			dataAddMsg.replyId=$(".msgInfo-msg").eq(index).attr("replyId");
			dataAddMsg.replyRoleId=$(".msgInfo-msg").eq(index).attr("replyRoleId");
			dataAddMsg.msgType=parseInt($(".msgInfo-msg").eq(index).attr("msgType"));
			$("#comment2-msg1").attr("placeholder",'回复'+$(".msgInfo-msg:eq("+index+")").attr("roleName"));
			msgScrollTop=$(window).scrollTop();
			//msgScrollTop=$(".msgInfo-msg").eq(index).offset().top;
			newComment2();
			nBtn=false;
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
			var x=parseInt($(this).attr("partIndex"));
			$(".part").css("display","none");
			$(".partRight").css("display","none");
			for(var i=0;i<x+1;i++){
				$(".msgType"+pageIndex+" .part").eq(i).css("display","block");
				$(".msgType"+pageIndex+" .partRight").eq(i).css("display","block");
			}
			//隐藏周数显示
			var campstatus = $(".campstatus");
			if(campstatus.length>0){
				for(i=0;i<campstatus.length;i++){
					var campstatusIndex = $(".campstatus").eq(i).attr("partindex");
					console.log("campstatusIndex1:"+campstatusIndex);
					if(campstatusIndex>x){
						console.log("campstatusIndex2:"+campstatusIndex);
						$(".campstatus").eq(i).css("visibility","hidden");
					}
				}
				// $(window).off('scroll');
			}

			if(getParamByUrl("os")=="android"){
				$(".comment2").css("padding-bottom","1.5rem");
			}
			$("#comment2-msg1").focus();
			/*var t5=setTimeout(function(){
				$(window).scrollTop($("body").height()+50);
			},200);*/

		// }else{
		// 	partIndex=$(".msgInfo-msg").eq(index).attr("partIndex");
		// 	dataAddMsg.level=2;
		// 	dataAddMsg.checkId=$(".msgInfo-msg").eq(index).attr("checkId");
		// 	dataAddMsg.replyId=$(".msgInfo-msg").eq(index).attr("replyId");
		// 	dataAddMsg.replyRoleId=$(".msgInfo-msg").eq(index).attr("replyRoleId");
		// 	dataAddMsg.msgType=parseInt($(".msgInfo-msg").eq(index).attr("msgType"));
		// 	$("#comment-msg").attr("placeholder",'回复'+$(".msgInfo-msg:eq("+index+")").attr("roleName"));
		// 	msgScrollTop=$(window).scrollTop();
		// 	//alert(msgScrollTop);
		// 	$(".comment").css("display","block");
		// 	$("#comment-msg").focus();
		// 	$(".setcard").css("display","none");
		// 	//$(".comment").css("top",$(window).height()+$(window).scrollTop()-4.3125*parseInt($("html").css("font-size")));
		// 	$(".comment").css("top",$(window).height()+$(window).scrollTop()-$(".comment").height());	
		// }

		}
		event.stopPropagation();
	});
}



//绑定跳转
function bindName(){
	$(".msgInfo-name").unbind("click").click(function(){
		/*alert("是否是个人进展："+$(".active").hasClass("tab1"));*/
		var isStutap1=$(".active").hasClass("tab1");
		//绑定a跳转cookie
		var deviceType=isMobile();
		var targetCampIdHref="";
		var index=$(".msgInfo-name").index(this);
		var roleId=getParamByUrl("roleId");
		var targetRoleId=$(".msgInfo-name").eq(index).attr("targetRoleId");
		var targetCampIdHref="";
		var jumpUrl="";
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
			if(!isStutap1){
				setCookie("stuPageJump",1,1);
			}else{
				setCookie("stuPageJump",2,1);
			}
		}else{
			jumpUrl="studentOtherInfo.html";
		}

		if($(".msgInfo-name").eq(index).attr("targetcampid") != "-1" && $(".msgInfo-name").eq(index).attr("targetcampid")!=undefined && $(".msgInfo-name").eq(index).attr("targetcampid")!="undefined" ){
			targetCampIdHref="&targetCampId="+$(".msgInfo-name").eq(index).attr("targetcampid");
		}
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			var index=$(".msgInfo-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				var data={
					link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
			}
			else{
				var data={
					link:absoluteUrl+jumpUrl+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
				//$(".msgInfo-name").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId"));	
			}
		}
		else{
			if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",pageIndex,1);
			}
			var index=$(".msgInfo-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				$(".msgInfo-name").attr("href",jumpUrl+searchLink+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId")+targetCampIdHref);
			}
			else{
				$(".msgInfo-name").attr("href",jumpUrl+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId")+targetCampIdHref);	
			}
		}
		
		
		event.stopPropagation();
	});
}
//绑定评论头像跳转
function bindMsgHeader(){
	$(".msgInfo-headerHref").unbind("click").click(function(){
		/*alert("是否是个人进展："+$(".active").hasClass("tab1"));*/
		var isStutap1=$(".active").hasClass("tab1");
		//绑定a跳转cookie
		var deviceType=isMobile();
		var targetCampIdHref="";
		var index=$(".msgInfo-headerHref").index(this);
		var roleId=getParamByUrl("roleId");
		var targetRoleId=$(".msgInfo-headerHref").eq(index).attr("targetRoleId");
		var targetCampIdHref="";
		var jumpUrl="";
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
			if(!isStutap1){
				setCookie("stuPageJump",1,1);
			}else{
				setCookie("stuPageJump",2,1);
			}
		}else{
			jumpUrl="studentOtherInfo.html";
		}

		if($(".msgInfo-headerHref").eq(index).attr("targetcampid") != "-1" && $(".msgInfo-headerHref").eq(index).attr("targetcampid")!=undefined && $(".msgInfo-headerHref").eq(index).attr("targetcampid")!="undefined" ){
			targetCampIdHref="&targetCampId="+$(".msgInfo-headerHref").eq(index).attr("targetcampid");
		}
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			/*if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",pageIndex,1);
			}*/
			var index=$(".msgInfo-headerHref").index(this);
			if($(".msgInfo-headerHref").eq(index).attr("headIsCoach")=="no"){
				if(getParamByUrl("targetRoleId")!="false"){
					var searchLink=removeParamByUrl("targetRoleId");
					var data={
						link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref,
					    animation: 1//默认1从右到左，2从下到上
					};
					data=JSON.stringify(data);
                    if(getParamByUrl("os")=="android"){
                        mobileApp.openWebview(data);
                    }
                    else{
                        mobileApp.openWebview.postMessage(data);
                    }
					//mobileApp.openWebview(data);
					//$(".msgInfo-headerHref").attr("href","studentStudentInfo.html"+searchLink+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId"));
				}
				else{
					var data={
						link:absoluteUrl+jumpUrl+window.location.search+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref,
					    animation: 1//默认1从右到左，2从下到上
					};
					data=JSON.stringify(data);
                    if(getParamByUrl("os")=="android"){
                        mobileApp.openWebview(data);
                    }
                    else{
                        mobileApp.openWebview.postMessage(data);
                    }
					//mobileApp.openWebview(data);
					//$(".msgInfo-headerHref").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId"));	
				}
			}
		}
		else{
			if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",pageIndex,1);
			}
			var index=$(".msgInfo-headerHref").index(this);
			if($(".msgInfo-headerHref").eq(index).attr("headIsCoach")=="no"){
				if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
					$(".msgInfo-headerHref").attr("href",jumpUrl+searchLink+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref);
				}
				else{
					$(".msgInfo-headerHref").attr("href",jumpUrl+window.location.search+"&targetRoleId="+$(".msgInfo-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref);	
				}
			}
		}
		
		
		event.stopPropagation();
	})
}
//绑定part2左边头像跳转
function bindpartHeader(){
	$(".partLeft-headerHref").unbind("click").click(function(){
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_ZuoBianTouXiangTiaoZhuan);
		/*alert("是否是个人进展："+$(".active").hasClass("tab1"));*/
		var isStutap1=$(".active").hasClass("tab1");
		//绑定a跳转cookie
		var deviceType=isMobile();
		var targetCampIdHref="";
		var index=$(".partLeft-headerHref").index(this);
		var roleId=getParamByUrl("roleId");
		var targetRoleId=$(".partLeft-headerHref").eq(index).attr("targetRoleId");
		var targetCampIdHref="";
		var jumpUrl="";
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
			if(!isStutap1){
				setCookie("stuPageJump",1,1);
			}else{
				setCookie("stuPageJump",2,1);
			}
		}else{
			jumpUrl="studentOtherInfo.html";
		}

		if($(".partLeft-headerHref").eq(index).attr("targetcampid") != "-1" && $(".partLeft-headerHref").eq(index).attr("targetcampid")!=undefined && $(".partLeft-headerHref").eq(index).attr("targetcampid")!="undefined" ){
			targetCampIdHref="&targetCampId="+$(".partLeft-headerHref").eq(index).attr("targetcampid");
		}
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

			var index=$(".partLeft-headerHref").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				var data={
					link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
				//$(".partLeft-headerHref").attr("href","studentStudentInfo.html"+searchLink+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId"));
			}
			else{
				var data={
					link:absoluteUrl+jumpUrl+window.location.search+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
				//$(".partLeft-headerHref").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId"));	
			}
		}
		else{
			if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",pageIndex,1);
			}
			var index=$(".partLeft-headerHref").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				$(".partLeft-headerHref").attr("href",jumpUrl+searchLink+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref);
			}
			else{
				$(".partLeft-headerHref").attr("href",jumpUrl+window.location.search+"&targetRoleId="+$(".partLeft-headerHref").eq(index).attr("targetRoleId")+targetCampIdHref);	
			}
		}
		

		event.stopPropagation();
	})
}
//绑定part2右边昵称跳转
function bindpartName(){
	$(".partRight-type2-name").unbind("click").click(function(){
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_YouBianNiChengTiaoZhuan);
		/*alert("是否是个人进展："+$(".active").hasClass("tab1"));*/
		var isStutap1=$(".active").hasClass("tab1");
		//绑定a跳转cookie
		var deviceType=isMobile();
		var targetCampIdHref="";
		var index=$(".partRight-type2-name").index(this);
		var roleId=getParamByUrl("roleId");
		var targetRoleId=$(".partRight-type2-name").eq(index).attr("targetRoleId");
		var targetCampIdHref="";
		var jumpUrl="";
		if(roleId == targetRoleId && targetRoleId != "false"){
			jumpUrl="studentStudentInfo.html";
			//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
			if(!isStutap1){
				setCookie("stuPageJump",1,1);
			}else{
				setCookie("stuPageJump",2,1);
			}
		}else{
			jumpUrl="studentOtherInfo.html";
		}

		if($(".partRight-type2-name").eq(index).attr("targetcampid") != "-1" && $(".partRight-type2-name").eq(index).attr("targetcampid")!=undefined && $(".partRight-type2-name").eq(index).attr("targetcampid")!="undefined" ){
			targetCampIdHref="&targetCampId="+$(".partRight-type2-name").eq(index).attr("targetcampid");
		}
		if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){
			var index=$(".partRight-type2-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				var data={
					link:absoluteUrl+jumpUrl+searchLink+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
				//$(".partRight-type2-name").attr("href","studentStudentInfo.html"+searchLink+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId"));
			}
			else{
				var data={
					link:absoluteUrl+jumpUrl+window.location.search+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId")+targetCampIdHref,
				    animation: 1//默认1从右到左，2从下到上
				};
				/*alert(data.link);*/
				data=JSON.stringify(data);
                if(getParamByUrl("os")=="android"){
                    mobileApp.openWebview(data);
                }
                else{
                    mobileApp.openWebview.postMessage(data);
                }
				//mobileApp.openWebview(data);
				//$(".partRight-type2-name").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId"));	
			}
		}
		else{
			if(window.location.pathname=="/web/fatburn/student.html"){
				setCookie("studentStatu",pageIndex,1);
			}
			var index=$(".partRight-type2-name").index(this);
			if(getParamByUrl("targetRoleId")!="false"){
				var searchLink=removeParamByUrl("targetRoleId");
				$(".partRight-type2-name").attr("href",jumpUrl+searchLink+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId")+targetCampIdHref);
			}
			else{
				$(".partRight-type2-name").attr("href",jumpUrl+window.location.search+"&targetRoleId="+$(".partRight-type2-name").eq(index).attr("targetRoleId")+targetCampIdHref);	
			}
		}
		
		event.stopPropagation();
	})
}

$(".tab").unbind("click").click(function(){
	if($(".cardListMessage").length>0){
		$(".cardListMessage").css("display","block");
	}
	if($(".comment2").css("display")=="block"){
		hiddenComment2();
	}
});
$(".msgType1").unbind("click").click(function(){
	if($(".comment2").css("display")=="block"){
		hiddenComment2();
	}
	if($(".cardListMessage").length>0){
		$(".cardListMessage").css("display","block");
	}
});
$(".msgType2").unbind("click").click(function(){
	if($(".comment2").css("display")=="block"){
		hiddenComment2();
	}
	if($(".cardListMessage").length>0){
		$(".cardListMessage").css("display","block");
	}
});

//添加评论

$("#comment-btn").unbind("click").click(function(){
	/*if($("#comment-msg").val()==''){
		alert("留言不能为空");
	}*/
	if($("#comment-msg").val().replace(/\s/g,"") ==''){
		// alert("留言不能为空");
					$(".error-main-t").html("留言不能为空");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
	}else{
		dataAddMsg.content=$("#comment-msg").val();
		addmsg(dataAddMsg);
		
	}
});

$(".comment2-send").unbind("click").click(function(){
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_DianJiFaSong);
	/*if($("#comment-msg").val()==''){
		alert("留言不能为空");
	}*/
	if($("#comment2-msg1").val().replace(/\s/g,"") ==''){
		// alert("留言不能为空");
					$(".error-main-t").html("留言不能为空");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
	}else{
		dataAddMsg.content=$("#comment2-msg1").val();
		addmsg(dataAddMsg);
		$(".part").css("display","block");
		$(".partRight").css("display","block");	
		$(".campstatus").css("visibility","visible");
	}
});
$("#comment-back").unbind("click").click(function(){
	$(".comment").css("display","none");
	$("#comment-msg").val("");
	nBtn=false;
	$(window).scrollTop(msgScrollTop);
	if(pageIndex==1){
		var time1=setTimeout(function(){
			$(".setcard").css("display","block");
		},550);
	}
});
$("#comment-back2").unbind("click").click(function(){
	hiddenComment2();
});

//添加评论方法
function addmsg(dataAddMsg){
	if(msgBtn){
		msgBtn=false;
		dataAddMsg.content=dataAddMsg.content.replace(/\%/g, "%25");
		dataAddMsg.content=dataAddMsg.content.replace(/\&/g, "%26");
		dataAddMsg.content=dataAddMsg.content.replace(/\+/g, "%2B");
		dataAddMsg.content=dataAddMsg.content.replace(/\#/g, "%23");
		dataAddMsg.content=dataAddMsg.content.replace(/\n/g, "<br />");
		var finalUrl=ajaxLink+"/v1/api/camp/reply"+window.location.search+'&checkId='+dataAddMsg.checkId+'&level='+dataAddMsg.level+'&replyId='+dataAddMsg.replyId+'&replyRoleId='+dataAddMsg.replyRoleId+'&content='+dataAddMsg.content;
		//var finalUrl='http://pm.picooc.com:9989/v1/api/camp/reply?checkId=123&roleId=1300&content=heihei&level=1&replyId=56&replyRoleId=1206526';
		$.ajax({
			type:"get",
			url:finalUrl,
			dataType:"json",
			success:function(data){
				if(data.code == 200){
					$("#comment2-msg1").val("");
					$("#comment2-msg2").val("");
					$("#comment2-msg1").css("height",commentHeight);
					$("#comment2-msg2").css("height",commentHeight);
					$(".imgContainer").css("height",commentHeight);
					$(".comment2 .btn").css("height",commentHeight);
					arrStrLen=[];
					arrScrollHeight=[];
					nBtn=false;
					if(dataAddMsg.msgType==3){
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
						for(var i=0;i<$(".part").length;i++){
							if(partIndex==$(".part").eq(i).attr("part")){
								$(".msgType"+pageIndex+" .partRight:eq("+i+") .partRight-msg").append(str);
								if($(".msgType"+pageIndex+" .partRight:eq("+i+") .partRight-msg").hasClass("partRight-msg2")){
									$(".msgType"+pageIndex+" .partRight:eq("+i+") .partRight-msg").removeClass("partRight-msg2");
								}
								var index=i;
								var t3=setTimeout(function(){
									$(".part").eq(index).remove();
									clearTimeout(t3);
									var x=parseInt($(".msgNum").html())-1;
									$(".msgNum").html(x);

									/*if(x == 0){
										setCookiePath("test2","noMsg",1,"/;domain=picooc.com");
									}*/
								},1000);
							}
						}
						bindMsg();
						bindName();
						msgScrollAddBtn=true;
						hiddenComment2();
					}
					else{
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
						console.log(pageIndex);
						$(".msgType"+pageIndex+" .partRight:eq("+partIndex+") .partRight-msg").append(str);
						if($(".msgType"+pageIndex+" .partRight:eq("+partIndex+") .partRight-msg").hasClass("partRight-msg2")){
							$(".msgType"+pageIndex+" .partRight:eq("+partIndex+") .partRight-msg").removeClass("partRight-msg2");
						}
						bindMsg();
						bindName();
						msgScrollAddBtn=true;
						hiddenComment2();

						$("#comment2-msg1").val("");
						$("#comment2-msg2").val("");
						$("#comment2-msg1").css("height",commentHeight);
						$("#comment2-msg2").css("height",commentHeight);
						$(".imgContainer").css("height",commentHeight);
						$(".comment2 .btn").css("height",commentHeight);
						arrStrLen=[];
						arrScrollHeight=[];
						nBtn=false;
						//$(window).scrollTop(msgScrollTop);
					}
					

					
					
				}
				else{
					// alert(data.result.message);
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
				msgBtn=true;
			},
			error:function(data){
				console.log(data);
				if(data.status==400){
					// alert("您输入的字数超出最大长度");
					$(".error-main-t").html("您输入的字数超出最大长度");
					$(".errorAlert").css("display","block");
					$(".error-main").css("margin-top",-$(".error-main").height()/2);
				}
				msgBtn=true;
			}
		})
	}
}
//添加评论结束
//图片预览开始
/*var arrTestImg=["http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/msg-2.png","http://cdn2.picooc.com/web/res/fatburn/image/student/student-13.png","http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/bg1.jpg"];
//var arrTestImg=["http://cdn2.picooc.com/web/res/event/bottle/http://cdn2.picooc.com/web/res/fatburn/image/bg1.jpg"];
$(".partRight-img").eq(0).html('');
if(arrTestImg.length==1){
	$(".partRight-img").eq(0).append('<img class="partRight-img-li" src="'+arrTestImg[0]+'" />');
}
else if(arrTestImg.length==4){
	var str='';
	str+='<div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+arrTestImg[0]+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+arrTestImg[1]+')\"></div></div><div class="row"><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+arrTestImg[2]+')\"></div><div class="col-xs-4 col-sm-4 partRight-img-li" style=\"background-image:url('+arrTestImg[3]+')\"></div></div>';
	$(".partRight-img").eq(0).append(str);
	$(".partRight-img-li").css("height",$(".partRight-img-li").width());
}
else{
	var x='img'+objImgIndex;
	var str='';
	for(var i=0;i<arrTestImg.length;i++){
		str+='<div class="col-xs-4 col-sm-4 partRight-img-li" objImg="'+x+'" style=\"background-image:url('+arrTestImg[i]+')\"></div>';
	}
	str='<div class="row">'+str+'</div>';
	$(".partRight-img").eq(0).append(str);
	$(".partRight-img-li").css("height",$(".partRight-img-li").width());
	
	console.log(x);
	objImg[x]=arrTestImg;
	console.log(objImg);
	console.log(objImg[x]);
	$(".partRight-img-li").unbind("click").click(function(){
		var name=$(this).attr("objImg");
		var str='';
		for(var i=0;i<objImg[name].length;i++){
			str+='<div class="col-xs-12 col-sm-12 swiper-slide bigImg-li" style=\"background-image:url('+objImg[name][i]+')\"></div>'

		}
		$(".bigImg-main").html('');
		$(".bigImg-main").html(str);
		$(".getImg-bg").css("height",$(".getImg-bg").width());
		$(".bigImg").css("display","block");
		var mySwiper = new Swiper('.swiper-container', {
			pagination : '.swiper-pagination',
		});
		//myswiper.reInit();

		//设置宽高
		$(".bigImg-li").css("width",$(window).width());
		$(".bigImg-li").css("height",$(window).height());
		//退出预览图
		$(".bigImg-li").unbind("click").click(function(){
			$(".bigImg").css("display","none");
			mySwiper.slideTo(0, 1000, false);
			$(".bigImg-main").html('');
			$(".swiper-pagination").html('');
			mySwiper.destroy(true);
			mySwiper.update();
			//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
			var deviceType6=isMobile();
			if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
				var data={
					display:true
				}
				data=JSON.stringify(data);
				mobileApp.showTitle(data);
			}
		})
		var deviceType6=isMobile();
		if(deviceType6 == "isApp" && (typeof mobileApp != "undefined")){
			var data={
				display:false
			}
			data=JSON.stringify(data);
			mobileApp.showTitle(data);
		}
	});

}*/
bindScroll();
function bindScroll(){
$(window).scroll(function(){
	console.log(pageIndex+"|"+functionType);
	if(pageIndex==1){
		if($(".msgType1").height()-$(window).height()-$(window).scrollTop()<550){
			if(pageBtn && tabBtn && !commentBtn){
				if(functionType==1){
					getList("hasDelete");
				}
				else if(functionType==2){
					getList("noDelete");
				}
				pageBtn=false;
			}
		}
	}
	else if(pageIndex==2){
		if($(".msgType2").height()-$(window).height()-$(window).scrollTop()<550){
			if(pageBtn && tabBtn && !commentBtn){
				if(functionType==3){
					indexOfCheckList=0;
					getList2(2,0);
				}
				else if(functionType==4){
					indexOfCheckList=0;
					getList2(type2,campId2);
				}
				pageBtn=false;
			}
		}
	}
	if(inputSelect && getParamByUrl("testtype")!="tanchao"){
		if(getParamByUrl("os")== "android"){
			if ($(document).height() - $(window).scrollTop()-$(window).height()-$(".comment2").eq(0).height() > 100 && $(".comment2").eq(0).css("display")=="block" ) {
				hiddenComment2();
			}
			if(firstInputSelect && $(document).height() - $(window).scrollTop()-$(window).height()-$(".comment2").eq(0).height() > 10  && $(".comment2").eq(0).css("display")=="block"){
				hiddenComment2();
			}
		}
		else{
			if ($(document).height() - $(window).scrollTop()-$(window).height()*0.75-$(".comment2").eq(0).height() > 50  && $(".comment2").eq(0).css("display")=="block") {
				hiddenComment2();
			}
			if(firstInputSelect && (($(document).height() - $(window).scrollTop()-$(window).height()*0.45-$(".comment2").eq(0).height() > 50  && $(".comment2").eq(0).css("display")=="block") || ((functionType==4 || functionType==3) && $(window).scrollTop()<(windowH-fontHeight*3.5-50)) )){
				hiddenComment2();
			}
		}
	}
	if($(window).scrollTop()==0){
		if($(".shaixuan1")!=undefined){
			$(".shaixuan1").css("position","relative");
			$(".shaixuan1").css("top",0);
			$(".campstatusContainer1").css("margin-top","0.6rem");
			$(".shaixuan1").css("display","block");
			$(".shaixuan1").css("left",0);
			$(".msgType1 .list").css("margin-top",0);
		}
		
		if($(".shaixuan")!=undefined){
			if(card2Type==4){
				$(".shaixuan").css("position","fixed");
				$(".shaixuan").css("top","5.25rem");
			}
			else{
				if($(".msgType2").css("display")=="block" && $(".msgType2 .part").length>0){
					var parttopheight = $(".msgType2 .part").eq(0).offset().top-$(window).scrollTop();
					
					if(parttopheight>=fontHeight*3){
						$(".campstatusContainer").css("margin-top","0.6rem");
						$(".shaixuan").css("position","relative");
						$(".shaixuan").css("top",0);
						$(".shaixuan").css("left",0);
						// $(".msgType2 .part").eq(0).css("margin-top","0");
						$(".msgType2 .partLeft3").eq(0).css("top","2.8rem");	
					}else{
						$(".campstatusContainer").css("margin-top",0);
						$(".shaixuan").css("position","fixed");
						$(".shaixuan").css("top","3rem");
						$(".shaixuan").css("left",0);
						// $(".msgType2 .part").eq(0).css("margin-top","1.5rem");
						$(".msgType2 .partLeft3").eq(0).css("top","0.5rem");
					}
				}
			}
		}

	}
})
}

//关闭图片预览
function closeBigImg(){
	if(closeImgBtn){
		closeImgBtn=false;
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
			//关闭返回键控制
			if(getParamByUrl("os")=="android"){
				var getPageInfo = function (){
					var data = {
						controlBtn:false,
						function:""
					};
					return JSON.stringify(data);
				};
                if(getParamByUrl("os")=="android"){
                    mobileApp.showBackBtn(getPageInfo());
                }
                else{
                    mobileApp.showBackBtn.postMessage(getPageInfo());
                }
				//mobileApp.showBackBtn(getPageInfo());
			}
		}
		var t2=setTimeout(function(){
			$("body").css("overflow","auto"); 
			//$("body").css("max-height","auto");
			$("body").removeAttr("style");
			$(".bigImg").css("display","none");
			if($(".page1").css("display") == "block"){
				$(".setcard-img").css("display","block");
			}
			$(".saveImg-ceng").css("display","none");
			document.addEventListener('touchmove', function(event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if($("body").css("overflow")=="hidden"){
					event.preventDefault();
				}
			})
			clearTimeout(t1);
			clearTimeout(t2);
			mySwiper.slideTo(0, 1000, false);
			$(".bigImg-main").html('');
			$(".swiper-pagination").html('');
			mySwiper.destroy(true);
			closeImgBtn=true;
		},200);
	}
	//mySwiper.update();
	//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
	event.stopPropagation();
}

$("#comment2-msg1").focus(function(event){
	/*if(getParamByUrl("os")=="android"){
		$('body').animate({scrollTop:$('html').height()+50},500);
	}*/
	if(functionType==4 ){
		if($(".msgType2").height()<windowH+50){
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height",0);
			firstInputSelect=true;
			
			$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else if(functionType==3){
		if($(".msgType2").height()<windowH+50){
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height",0);
			firstInputSelect=true;
			
			//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			$(".container").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else if(functionType=='info'){
		if($(".msgType2").height()<windowH+50){
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height",0);
			firstInputSelect=true;
			
			//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			$(".msgType2").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else if(functionType1=='studentInfo'){
		if($(".msgType1").height()<windowH+50){
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType1").css("min-height",0);
			firstInputSelect=true;
			//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			$(".msgType1").css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else{
		if($(".msgType1 .list").length>0){
			$(".msgType1 .list").eq(0).css("margin-bottom","1rem");
		}
	}
	$('body').animate({scrollTop:$('html').height()+50},300);
	var scrollTime2=setTimeout(function(){
			
			clearTimeout(scrollTime2);
			//$('body').animate({scrollTop:$('html').height()-$(window).height()},600);
		},100);
	
	/*if($(".msgType2")!=undefined){
		if($(".msgType2 .list").eq(0).height()<800){
			//card2Margin=$(".msgType2 .list").css("margin-top");
			$(".msgType2 .list").css("margin-top","400px");
			firstInputSelect=true;
		}
	}*/
	scrollTime1=setTimeout(function(){
			inputSelect=true;
			clearTimeout(scrollTime1);
		},500);
})
$("#comment2-msg1").blur(function(event){
	clearTimeout(scrollTime1);
	inputSelect=false;
	firstInputSelect=false;
	if(functionType==4){
		$(".msgType2").css("min-height",windowH-fontHeight*3.5-commentHeight);
		$(".msgType2 .list").css("margin-top","1.875rem");
		//$(".msgType2").eq(0).css("margin-top",0);
	}
	else if(functionType==3){
		$(".msgType2").css("min-height",windowH-fontHeight*3.5-commentHeight);
		//$(".msgType2 .list").css("margin-top",0);
		$(".container").eq(0).css("margin-top",0);
	}
	else if(functionType=='info'){
		//$(".msgType2").eq(0).css("top","500px");
		$(".msgType2").css("min-height",$(window).height()-commentHeight);
		
		//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		$(".msgType2").eq(0).css("margin-top",0);
	}
	else if(functionType1=='studentInfo'){

		if($(".msgType1").height()<windowH+50){
			$(".msgType1").css("min-height",windowH-fontHeight*3.5-commentHeight);
			firstInputSelect=true;
			$(".msgType1").css("margin-top",0);
		}
	}
	if($(".msgType1 .list").length>0){
		$(".msgType1 .list").eq(0).css("margin-bottom","3.5rem");
	}	
	
})
//燃脂营1.2评论

function newComment2(){
		var time2=setTimeout(function(){
			$(".setcard").css("display","none");
			clearTimeout(time2);
		},550);
		commentBtn=true;
		$("#comment2-msg1").unbind("click").click(function(event){
			setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_HuiFuShuRuKuang);
			event.stopPropagation;
		});
		var scrollHeight=0;
		var height=3.1875*parseInt($("html").css("font-size"));
		var fontSize=parseInt($("html").css("font-size"));
		var padding=parseInt($("html").css("font-size"));
		var border=2;
		var totleHeight=height+padding+fontSize*2;
		var addBtn=true;
		var addLen=0;
		var deleteValBtn=false;

		$("#comment2-msg1").unbind('input propertychange').bind('input propertychange',function(){
			
			var valbtn=false;			
			if($("#comment2-msg1").val()==""){
				nBtn=false;
				valbtn=true;
			}
			if($("#comment2-msg1").val().length==1){
				valbtn=true;
			}
			if($("#comment2-msg1").val().length>=addLen){
				addBtn=true;
			}
			else{
				addBtn=false;
			}
			addLen=$("#comment2-msg1").val().length;
			console.log($("#comment2-msg2")[0].scrollHeight);
			console.log(scrollHeight+"|"+$("#comment2-msg1")[0].scrollHeight);

			$("#comment2-msg2").val($("#comment2-msg1").val().substring(0,$("#comment2-msg1").val().length-1));
			if($("#comment2-msg1").val().substr($("#comment2-msg1").val().length-1,1).indexOf("\n") >= 0){
				nBtn=true;
			}
			else{
				nBtn=false;
			}
			console.log((valbtn && arrStrLen.length==0));
			if((nBtn && arrStrLen.length<4 && (arrStrLen.length==0 || $("#comment2-msg1").val().length>arrStrLen[arrStrLen.length-1])) || (valbtn && arrStrLen.length==0)){
				arrStrLen.push($("#comment2-msg1").val().length);
				arrScrollHeight.push($("#comment2-msg2")[0].scrollHeight);
			}
			
			if(!nBtn && (deleteValBtn || ($("#comment2-msg1")[0].scrollHeight!=scrollHeight && !valbtn))){
				//strLen1=$("#comment-input").val().length;
				if(addBtn && arrScrollHeight.length!=0 && $("#comment2-msg1")[0].scrollHeight<totleHeight){
					var arrBtn=true;
					for(var i=0;i<arrScrollHeight.length;i++){
						if($("#comment2-msg1")[0].scrollHeight==arrScrollHeight[i]){
							arrBtn=false;
						}
					}
					if(arrBtn){
						arrStrLen.push($("#comment2-msg1").val().length);
						arrScrollHeight.push($("#comment2-msg1")[0].scrollHeight);
						console.log(arrScrollHeight);
						$('body').animate({scrollTop:$('html').height()+50},200);
					}
				}
				else if(arrScrollHeight.length==0){
					arrStrLen.push($("#comment2-msg1").val().length);
					arrScrollHeight.push($("#comment2-msg1")[0].scrollHeight);
				}
				
			}
			
			if($("#comment2-msg1")[0].scrollHeight<totleHeight){
				$("#comment2-msg1").css("height",$("#comment2-msg1")[0].scrollHeight);
				$(".imgContainer").css("height",$("#comment2-msg1")[0].scrollHeight);
				$(".comment2 .btn").css("height",$("#comment2-msg1")[0].scrollHeight);
			}
			scrollHeight=$("#comment2-msg1")[0].scrollHeight;
			console.log(arrScrollHeight);
			
			if(deleteValBtn && $("#comment2-msg1").val().length<arrStrLen[arrStrLen.length-1]){
				console.log(arrScrollHeight);
				$("#comment2-msg1").css("height",arrScrollHeight[arrScrollHeight.length-2]);
				$(".imgContainer").css("height",arrScrollHeight[arrScrollHeight.length-2]);
				$(".comment2 .btn").css("height",arrScrollHeight[arrScrollHeight.length-2]);
				arrStrLen.splice(arrStrLen.length-1,1);
				arrScrollHeight.splice(arrScrollHeight.length-1,1);
			}
			if($("#comment2-msg1").val().length<arrStrLen[arrStrLen.length-1] && $("#comment2-msg2")[0].scrollHeight==arrScrollHeight[arrScrollHeight.length-2]){
				deleteValBtn=true;
			}
			else{
				deleteValBtn=false;
			}
			console.log('a'+$("#comment2-msg1").val());
			if($("#comment2-msg1").val()==""){
				console.log('b'+$("#comment2-msg1").val());
				console.log("输入清空");
				$("#comment2-msg1").css("height",height);
				$(".imgContainer").css("height",height);
				$(".comment2 .btn").css("height",height);
				arrStrLen=[];
				arrScrollHeight=[];
			}
			
		});
}

//隐藏评论框
function hiddenComment2(){
	console.log('hiddenComment2执行了');
	$("#comment2-msg1").blur();
	$("#comment2-msg2").blur();
	if(!msgScrollAddBtn){
		$(window).scrollTop(msgScrollTop);
	}
	msgScrollAddBtn=false;
	$(".comment").css("display","none");
	$(".comment3").css("display","none");
	$(".comment2").css("display","none");
	commentBtn=false;
	$(".part").css("display","block");
	$(".partRight").css("display","block");	
	$(".campstatus").css("visibility","visible");
	$(".campstatus").css("display","block");
	//显示没有更多了
	$(".cardListMessage").css("display","block");
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

function getKeyBoard(open,height){
	var card2Margin=1.875*fontHeight;
	if(open){
		if(getParamByUrl("os")=="android"){
			/*$("#comment-msg").css("height","8rem");
			$(".footer-main").css("margin-bottom","6rem");*/
		}else{
			if($(".tab")!=undefined){
				$(".tab").css("position","absolute");
			}
			// if($(".shaixuan")!=undefined){
			// 	$(".shaixuan").css("position","relative");
			// 	// $(".shaixuan").css("top",0);
			// }
			// if($(".shaixuan1")!=undefined){
			// 	$(".shaixuan1").css("position","relative");
			// 	// $(".shaixuan1").css("top",0);
			// }
			if($(".swiper-container1")!=undefined){
				$(".swiper-container1").css("position","absolute");
			}
			if($(".shaixuan1")!=undefined){
				if(card1Type!=-1){
					if(card2Type==0){
						$(".campstatusContainer1").css("margin-top","0.6rem");
						$(".shaixuan1").css("position","relative");
						$(".shaixuan1").css("top",0);
						$(".shaixuan1").css("left",0);
					}else{
						$(".shaixuan1").css("position","absolute");
						$(".shaixuan1").css("top","11rem");
					}
				}
				shaixuanComment=true;
			}

			if($(".shaixuan")!=undefined){
				if(card1Type!=-1){

				}
				else{
					if(card2Type==4){
						$(".shaixuan").css("position","absolute");
						$(".shaixuan").css("top","2rem");
					}
					else{
						$(".campstatusContainer").css("margin-top","0.6rem");
						$(".shaixuan").css("position","relative");
						$(".shaixuan").css("top",0);
						$(".shaixuan").css("left",0);
						$(".msgType2 .part").eq(0).css("margin-top","0");
						// $(".msgType2 .partLeft3").eq(0).css("top","2.8rem");
					}
				}
				
				shaixuanComment=true;
			}

			/*if($(".msgType2")!=undefined && (card2Type==3 || card2Type==4)){
				if($(".msgType2 .list").eq(0).height()<1000){
					//card2Margin=$(".msgType2 .list").css("margin-top");
					$(".msgType2 .list").css("margin-top","500px");
					firstInputSelect=true;
				}
			}*/
			/*$(".msgType2").css("min-height",null);

			if($("body").height()<windowH){
				$("body").css("height",$(".msgType2").height()+60);
				$("body").css("html",$(".msgType2").height()+60);
				$("body").css("background","#000000");
			}*/
			//$('body').animate({scrollTop:$('body').height()-windowH*0.4-fontHeight*3.5},500);
		}
		
		if($(".msgType2")!=undefined){
			$(".msgType2 .list").css("margin-bottom","2rem");
		}
	}
	else{
		if($(".tab")!=undefined){
			$(".tab").css("position","fixed");
		}

		if($(".swiper-container1")!=undefined){
			$(".swiper-container1").css("position","fixed");
		}
		if($(".msgType2")!=undefined){
			$(".msgType2 .list").css("margin-bottom","5rem");
		}
		if(functionType==4){
			$(".msgType2").css("min-height",windowH-fontHeight*3.5-commentHeight);
			$(".msgType2 .list").css("margin-top","1.875rem");
		}
		else if(functionType==3){
			$(".msgType2").css("min-height",windowH-fontHeight*3.5-commentHeight);
			$(".container").eq(0).css("margin-top",0);
		}
		else if(functionType=='info'){
			$(".msgType2").css("min-height",$(window).height()-commentHeight);
			$(".msgType2").eq(0).css("margin-top",0);
		}
		else if(functionType1=='studentInfo'){
			if($(".msgType1").height()<windowH+50){
				$(".msgType1").css("min-height",windowH-fontHeight*3.5-commentHeight);
				firstInputSelect=true;
				$(".msgType1").css("margin-top",0);
			}
		}
		if($(".msgType1 .list").length>0){
			$(".msgType1 .list").eq(0).css("margin-bottom","3.5rem");
		}
		if($(".shaixuan1")!=undefined){
			if(card1Type!=-1){
				if(card2Type==0 && $(".msgType1").css("display")=="block"){
					var parttopheight = $(".msgType1 .part").eq(0).offset().top-$(window).scrollTop();
					
					if(parttopheight>=fontHeight*3){
						$(".campstatusContainer1").css("margin-top","0.6rem");
						$(".shaixuan1").css("position","relative");
						$(".shaixuan1").css("top",0);
						$(".shaixuan1").css("left",0);
					}else{
						$(".campstatusContainer1").css("margin-top","0");
						$(".shaixuan1").css("position","fixed");
						$(".shaixuan1").css("top","3rem");
						$(".shaixuan1").css("left",0);
					}
				}else{
					$(".shaixuan1").css("position","fixed");
					$(".shaixuan1").css("top",0);
				}
			}
			shaixuanComment=false;
		}		
		if($(".shaixuan")!=undefined){
			if(card1Type!=-1){
				
			}
			else{
				if(card2Type==4){
					$(".shaixuan").css("position","fixed");
					$(".shaixuan").css("top","5.25rem");
				}
				else{
					if($(".msgType2").css("display")=="block"){
						var parttopheight = $(".msgType2 .part").eq(0).offset().top-$(window).scrollTop();
						
						if(parttopheight>=fontHeight*3){
							$(".campstatusContainer").css("margin-top","0.6rem");
							$(".shaixuan").css("position","relative");
							$(".shaixuan").css("top",0);
							$(".shaixuan").css("left",0);
							// $(".msgType2 .part").eq(0).css("margin-top","0");
							$(".msgType2 .partLeft3").eq(0).css("top","2.8rem");	
						}else{
							$(".campstatusContainer").css("margin-top",0);
							$(".shaixuan").css("position","fixed");
							$(".shaixuan").css("top","3rem");
							$(".shaixuan").css("left",0);
							// $(".msgType2 .part").eq(0).css("margin-top","1.5rem");
							$(".msgType2 .partLeft3").eq(0).css("top","0.5rem");
							//$(".msgType2 .list").eq(0).css("margin-top",$(".shaixuan").height());
						}
					}
				}
				
			}
		}
		
		$(".msgType2").eq(0).css("top",null);
		
		if(functionType==4){
			$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			$(".list").css("margin-top","1.875rem");
			$(".msgType2").css("margin-top","3.25rem");
		}
		else if(functionType==3){
			$(".msgType2").css("margin-top","3.5rem");
		}
		//$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
		/*if($(".msgType2")!=undefined){
			if((card2Type==3 || card2Type==4)){
				$(".msgType2 .list").css("margin-top",card2Margin);
				firstInputSelect=false;	
			}
			else{
				$(".msgType2 .list").css("margin-top",0);
				firstInputSelect=false;	
			}	*/
		/*if($(".msgType2")!=undefined && (card2Type==3 || card2Type==4)){
			$(".msgType2 .list").css("margin-top",card2Margin);
			firstInputSelect=false;
		}*/
		firstInputSelect=false;
		shaixuanComment=false;
		/*$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
		$("html").css("height",null);
		$("html").removeAttr("style");
		$("body").removeAttr("style");*/
		//$(".msgType2").css("min-height",$(window).height()-fontHeight*3.5);
	}
}

var cardFunctionLoad=true;