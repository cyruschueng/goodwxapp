var cardFunction={};


cardFunction.SXiaoXiXiangQing={//和info.js匹配
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
cardFunction.objImg={};
cardFunction.cardType=["早餐","午餐","晚餐","加餐","运动"];
cardFunction.cardTypeBg=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-20.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-21.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-22.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-23.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-24.png"];
cardFunction.arrHasZan=["https://cdn2.picooc.com/web/res/fatburn/image/student/student-6.png","https://cdn2.picooc.com/web/res/fatburn/image/student/student-30.png"];
cardFunction.cardTypeBg2=["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-1.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-2.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-3.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-4.png","https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-5.png"]

//functionType 1、个人主页 2、他人主页 3、营内动态 4、教练端 info、info页
cardFunction.roleId=getParamByUrl("roleId");
cardFunction.roleName='';

cardFunction.objImgIndex=0;
cardFunction.level=0;
cardFunction.commentIndex=0;
cardFunction.partIndex=0;
cardFunction.dataAddMsg={};
cardFunction.zanBtn=true;
cardFunction.msgBtn=true;
cardFunction.msgScrollTop=0;
cardFunction.msgScrollAddBtn=false;
cardFunction.pageBtn=true;
cardFunction.functionType=0;
cardFunction.functionType1=0;//card1区分
cardFunction.windowW=$(window).width();
cardFunction.windowH=$(window).height();
cardFunction.count=20;
cardFunction.time=0;
cardFunction.hasNextBtn1=true;
cardFunction.hasNextBtn2=true;
cardFunction.saveLink;
cardFunction.mySwiper;
cardFunction.t1;
cardFunction.closeImgBtn=true;
cardFunction.shaixuanComment=false;
// cardFunction.deleteScrollTop = 0; //删除打卡时的滚动距离

// var deleteScrollTop2 = 0;
cardFunction.scrollTime1;//inputSelect的延迟时间
cardFunction.commentBtn=false;
cardFunction.inputSelect=false;
cardFunction.firstInputSelect=false;
cardFunction.nBtn=false;//评论是否回车
cardFunction.commentHeight=3.1875*parseInt($("html").css("font-size"));
cardFunction.arrStrLen=[];
cardFunction.arrScrollHeight=[];
cardFunction.card1Type=-1;//区分card1的筛选类型
cardFunction.card2Type=-1;//区分card2的筛选类型

//图片预览开始

cardFunction.tabBtn=true;
cardFunction.bindScroll=function(){
$(window).scroll(function(){

	if(cardFunction.pageIndex==1){
		if($(".msgType1").height()-$(window).height()-$(window).scrollTop()<550){
			if(cardFunction.pageBtn && cardFunction.tabBtn && !cardFunction.commentBtn){
				if(cardFunction.functionType==1){
					window.student.getList1Fc("hasDelete");
				}
				else if(cardFunction.functionType==2){
					window.student.getList1Fc("noDelete");
				}
				cardFunction.pageBtn=false;
			}
		}
	}
	/*else if(pageIndex==2){
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
	}*/
	if($(window).scrollTop()==0){
		if($(".shaixuan1")!=undefined){
			$(".shaixuan1").css("position","relative");
			$(".shaixuan1").css("top",0);
			$(".campstatusContainer1").css("margin-top","0.6rem");
			$(".shaixuan1").css("display","block");
			$(".shaixuan1").css("left",0);
			$(".msgType1 .list").css("margin-top",0);
		}
	}
	/*
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

	}*/
})
}
cardFunction.bindScroll();

module.exports = cardFunction; 
