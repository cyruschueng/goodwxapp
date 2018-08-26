var React=require("react");
var PubSub = require("pubsub-js");
var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png","image/setcard/setcard-summary.png"];
var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png","http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-summary2.png"];
var arrbg4=[1];
var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐","小结"];
var arrContent3="全部";

var touchTime1;
var touchTime2;
var touchTime3;
var touchTime4;
var shaixuanFrom = ""; //判断是个人进展的筛选，还是我的个人主页，还是它的个人主页的筛选 0 1 2
shaixuanFrom=0;
var shaixuanComment=false;
var touchmoveBtn=true;
var firstweek;
var shaixuan1ComeFrom="";
$("body").on("touchmove",function(event){
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
		
		if(parttopheight==0 || (parttopheight>=fontHeight*3 && $(".shaixuan1").css("position")!= "relative") ||(parttopheight<fontHeight*3 && $(".shaixuan1").css("position")!= "fixed") ){
			touchmoveBtn=true;
		}else{
			touchmoveBtn=false;
		}
		if(touchmoveBtn){
			if(parttopheight>=fontHeight*3 || parttopheight==0){
				$(".campstatusContainer1").css("margin-top","0.6rem");
				$(".shaixuan1").css("position","relative");
				$(".shaixuan1").css("top",0);
				$(".shaixuan1").css("left",0);
				$(".msgType1 .list").css("margin-top",0);
			}else{
				$(".campstatusContainer1").css("margin-top","0");
				$(".shaixuan1").css("position","fixed");
				if(shaixuan1ComeFrom=="studentInfo"){
					$(".shaixuan1").css("top",0);
					$(".shaixuan1").css("left",0);
					$(".campstatusContainer1").css("margin-top","0.6rem");
				}
				else{
					$(".shaixuan1").css("top","3rem");
					$(".shaixuan1").css("left",0);
				}
				$(".msgType1 .list").css("margin-top",$(".shaixuan1").height());
			}
		}
	}
	//替换第几周
	var campstatusContainer1 = $(".campstatus");	
	if(campstatusContainer1.length>0){
		var isWeek = true;
		for(var i=0;i<campstatusContainer1.length;i++){
			var topheight2 = $(".campstatus").eq(i).offset().top-$(window).scrollTop();
			if(topheight2<fontHeight*5.15){
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

$("body").on("touchend",function(event){
	var timeIndex=0;
	partPosition2();
	clearInterval(touchTime3);
	clearTimeout(touchTime4);
	//console.log("end执行");
	touchTime3=setInterval(function(){
		partPosition2();
		timeIndex++;
		//console.log(timeIndex);
		if(timeIndex>200){
			clearInterval(touchTime3);
		}
	},10);
	touchTime4=setTimeout(function(){
		clearInterval(touchTime3);
		clearTimeout(touchTime4);
	},2000);
});

var StudentMsgType1_shaixuan1=React.createClass({
	listDisplay:function(){
		var display = $(".type-container1").css("display");
		
		if(display=="none"){
			var topheight = $(".shaixuan1").offset().top-$(window).scrollTop();
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
	},
	iconClick:function(event){
		//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
		//alert($(".icon1").index(event.currentTarget));
		event.stopPropagation();
		var index=$(".icon1").index(event.currentTarget);

		if(arrbg4.length!=0){
			$(".icon1").eq(arrbg4[0]).find("img").attr("src",arrbg1[arrbg4[0]]);
		}
		arrbg4[0]=index;
		arrContent3 = arrContent[index];
		$(".icon1").eq(index).find("img").attr("src",arrbg2[index]);
		if(index==0){
			publicData.checkType1=0;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
		}else if(index==1){
			publicData.checkType1=9;
		}else if(index==2){
			publicData.checkType1=1;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
		}else if(index==3){
			publicData.checkType1=5;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
		}else if(index==4){
			publicData.checkType1=2;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
		}else if(index==5){
			publicData.checkType1=4;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
		}else if(index==6){
			publicData.checkType1=3;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		}
		else if(index==7){
			//加班的type
			publicData.checkType1=6;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		}
		$(".tabtype1").html(arrContent3);
		$(".type-container1").hide();
		//$(".typeContainer").css("display","none");
		$(".shaixuan1").css("z-index","10");
		$(".type-container1").css("z-index","10");
		
		//tabBtn=false;
		//isFirstLoad=0;
		//isCampOver=false;

		if(publicData.weekSummaryNum==0 && index==7){//周表现总结的数组长度为0
			if(publicData.isCampStatus){//在营

				$(".errorAlert").css("display","none");

				$('.newAlertBox').show();
				$('.newAlertBox .newAlert .content').html('第一周还没有结束哦，请于第二周开始查看总结');
				//$(".newAlertBox .newAlert").css("margin-top",-$(".newAlertBox .newAlert").height()/2 - 20);

				$('html, body').css('overflow', 'hidden').on("touchmove",function(ev){
					ev = ev || event;
					if(ev.preventDefault){
						ev.preventDefault();
					}else{
						return false;
					}
				});

				//$(".error-main-t").html('第一周还没有结束哦，请于第二周开始查看总结');
				//$(".errorAlert").css("display","block");
				//$(".error-main").css("margin-top",-$(".error-main").height()/2 - 20);
			}else{//已结营

				$(".errorAlert").css("display","none");

				$('.newAlertBox').show();
				$('.newAlertBox .newAlert .content').html('当前班级没有小结功能哦，请点击最新班级查看');
				//$(".newAlertBox .newAlert").css("margin-top",-$(".newAlertBox .newAlert").height()/2 - 20);

				$('html, body').css('overflow', 'hidden').on("touchmove",function(ev){
					ev = ev || event;
					if(ev.preventDefault){
						ev.preventDefault();
					}else{
						return false;
					}
				});

				//$(".error-main-t").html('当前班级没有小结功能哦，请点击最新班级查看');
				//$(".errorAlert").css("display","block");
				//$(".error-main").css("margin-top",-$(".error-main").height()/2 - 20);
			}


		}else{
			PubSub.publish("shaixuan",1);
		}

		$(".msgType1 .list").css("margin-top",0);
		$(".shaixuan1").css("position","relative");
		$(".shaixuan1").css("top",0);
		$(".campstatusContainer1").css("margin-top","0.6rem");
		$(".shaixuan1").css("display","block");
		//console.log($(".msgType1 .list").offset().top+"|"+$(".shaixuan1").height());
		$('body').animate({scrollTop:$(".msgType1 .list").offset().top-$(".shaixuan1").height()+0.5*fontHeight},200);

		
	},
	render:function (){
		var shaixuan1Name=this.props.shaixuan1Name;
		shaixuan1ComeFrom=this.props.shaixuan1ComeFrom;
		firstweek=shaixuan1Name;
		var nameDisplay="block";
		if(shaixuan1Name==""){
			nameDisplay="none";
		}
		return (
			<div className="row shaixuan1" style={{display: "block"}}>
				<div className="col-xs-12 col-sm-12 campstatusContainer1">
					<div className="ttab1" onClick={this.listDisplay}>
						<span className="ttab1Inner">
							<img className="shaiXuanPng" src="http://cdn2.picooc.com/web/res/fatburn/image/student/shaixuan.png" alt=""/><span className="tabtype1">全部</span>
						</span>
					</div>
					<div className="col-xs-12 col-sm-12 campstatus1">
						<div className="campstatusContent" style={{display: nameDisplay}}>{shaixuan1Name}</div>
					</div>
				</div>
				<div className="type-container1">
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="image/setcard/setcard-39.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-summary.png" /></div>
				</div>
			</div>
		);
	}
})
module.exports = StudentMsgType1_shaixuan1; 




