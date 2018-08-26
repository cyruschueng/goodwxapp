var React=require("react");
var PubSub = require("pubsub-js");
var arrbg1=["image/setcard/setcard-2.png","image/setcard/all.png","image/setcard/setcard-3.png","image/setcard/diet.png","image/setcard/setcard-4.png","image/setcard/setcard-7.png","image/setcard/setcard-5.png"];
var arrbg2=["image/setcard/setcard-31.png","image/setcard/setcard-39.png","image/setcard/setcard-32.png","image/setcard/setcard-40.png","image/setcard/setcard-33.png","image/setcard/setcard-36.png","image/setcard/setcard-34.png"];
var arrbg4=[1];
var arrContent=["早餐","全部","午餐","饮食","晚餐","运动","加餐"];
var arrContent3="全部";

var touchTime1;
var touchTime2;
var shaixuanComment=false;
var touchmoveBtn=true;

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
		if($(".msgType2 .part").length==0){
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
var StudentMsgType2_shaixuan=React.createClass({
	getInitialState:function(){
		$("body").on("touchmove",function(event){
			$(".type-container").css("display","none");
			$(".typeContainer").css("display","none");
			part2Position();
		});
		$("body").on("touchend",function(event){
			
			clearInterval(touchTime1);
			clearTimeout(touchTime2);
			var timeIndex2=0;
			part2Position();
			touchTime1=setInterval(function(){
				part2Position();
				timeIndex2++;
				if(timeIndex2>200){
					clearInterval(touchTime1);
				}
			},10);
			touchTime2=setTimeout(function(){
				clearInterval(touchTime1);
				clearTimeout(touchTime2);
			},2000);
		});
		return {};
	},
	listDisplay:function(){
		//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiShaixuan);
		var display = $(".type-container").css("display");
		if(display=="none"){
			$(".type-container").css("display","block");
			$(".typeContainer").css("height",$(window).height());
			$(".typeContainer").css("display","block");
		}else{
			$(".type-container").css("display","none");
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
			publicData.checkType2=0;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
		}else if(index==1){
			publicData.checkType2=9;
		}else if(index==2){
			publicData.checkType2=1;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
		}else if(index==3){
			publicData.checkType2=5;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
		}else if(index==4){
			publicData.checkType2=2;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
		}else if(index==5){
			publicData.checkType2=4;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
		}else if(index==6){
			publicData.checkType2=3;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		}
		else if(index==7){
			//加班的type
			publicData.checkType2=6;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		}
		$(".tabtype").html(arrContent3);
		$(".type-container").hide();
		$(".typeContainer").css("display","none");
		//$(".typeContainer").css("display","none");
		$(".shaixuan1").css("z-index","10");
		$(".type-container1").css("z-index","10");
		
		//tabBtn=false;
		//isFirstLoad=0;
		//isCampOver=false;

		PubSub.publish("shaixuan",2);

		$(".shaixuan").css("position","block");
		$(".shaixuan").css("position","relative");
		$(".shaixuan").css("top","0");
		$(".campstatusContainer").css("margin-top","0.6rem");
		// $("body").unbind("touchmove");
		// $("body").unbind("touchend");
		// clearInterval(touchTime1);
		// clearTimeout(touchTime2);
		//营内动态高度
		//$(".msgType2").css("min-height",$(window).height()+700);
		//console.log($(".msgType2 .list").eq(0).offset().top+"|"+$(".msgType2 .shaixuan").height()+"|"+$(".tab").height());		
		//console.log($(".msgType2 .list").eq(0).offset().top-$(".msgType2 .shaixuan").height()-$(".tab").height());
		$('body').animate({scrollTop:$(".msgType2 .list").eq(0).offset().top-$(".msgType2 .shaixuan").height()-3*fontHeight},200);
	},
	render:function (){
		return (
			<div className="row shaixuan" style={{display: "block"}}>
				<div className="col-xs-12 col-sm-12 campstatusContainer">
					<div className="ttab" onClick={this.listDisplay}>
						<div className="ttab1Inner">
							<img className="shaiXuanPng" src="http://cdn2.picooc.com/web/res/fatburn/image/student/shaixuan.png" alt=""/><span className="tabtype">全部</span>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 campstatus2">
						<div className="campstatusContent campstatusContent2">全部动态</div>
					</div>
				</div>
				<div className="type-container">
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="image/setcard/setcard-39.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" /></div>
					<div className="icon1" onClick={this.iconClick}><img src="http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" /></div>
				</div>
			</div>
		);
	}
})
module.exports = StudentMsgType2_shaixuan; 




