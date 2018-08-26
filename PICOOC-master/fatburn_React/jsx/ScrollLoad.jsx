var cardFunction={};





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


cardFunction.saveLink;

cardFunction.t1;
cardFunction.closeImgBtn=true;
cardFunction.shaixuanComment=false;
// cardFunction.deleteScrollTop = 0; //删除打卡时的滚动距离

// var deleteScrollTop2 = 0;

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
