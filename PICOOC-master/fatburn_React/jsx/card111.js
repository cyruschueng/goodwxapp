

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
var cardTypeBg=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-20.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-21.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-22.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-23.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-24.png"];
var arrHasZan=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png"];
var cardTypeBg2=["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-1.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-2.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-3.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-4.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-5.png"]

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
function getList(hasDelete,cardtype,pageIndex,objImgIndex,objImg){

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
					return data;
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

module.exports = getList; 