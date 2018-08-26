/**************************** App页-手机大图滚动效果 start *********************/

$(function () {

	var ap_small=$('#ap_small');

	var ap_smalll=$('#ap_smalll');

	var ap_oimg=$('#ap_big img');

	var ap_oImg=$('#ap_bigg img');

	var ap_ball=$('#ap_left img');

	var ap_num=0,ap_num1=0;

	var ap_time=null,ap_time1=null,ap_time3=null,ap_time4=null;

	//左边大手机

	function move (ap_start,ap_end) {

		if(ap_time){

			clearInterval(ap_time);

		}

		var ap_start=ap_start;

		var ap_end=ap_end;

		var ap_step=0;

		var ap_stepMax=20;

		var ap_everyStep=(ap_end-ap_start)/ap_stepMax;

		function moveAuto(){

			ap_step++;

			ap_step==ap_stepMax?clearInterval(ap_time):ap_step=ap_step;

			ap_start+=ap_everyStep;

			ap_small.scrollLeft(ap_start);

		}

		ap_time=setInterval(moveAuto,20);

	}

	function everyMover(){

		ap_num++;

		ap_num==ap_oImg.length?ap_num=0:ap_num=ap_num;

		if ($('.en_sing').length==1) {

			changed();

		}

		if ($('.en_changed').length==1) {

			change();

		}

		move(ap_small.scrollLeft(),ap_oimg.eq(0).width()*ap_num);

	}

	function moverRight(){

		ap_num--;

		if(ap_num==-1){ap_num=ap_oimg.length-1};

		if ($('.en_sing').length==1) {

			changed();

		}

		if ($('.en_changed').length==1) {

			change();

		}

		move(ap_small.scrollLeft(),ap_oimg.eq(0).width()*ap_num);

	}

	ap_time1=setInterval(everyMover,5000);

	//右边小手机

	function movee (ap_started,ap_ended) {

		if(ap_time3){

			clearInterval(ap_time3);

		}

		var ap_start=ap_started;

		var ap_end=ap_ended;

		var ap_step=0;

		var ap_stepMax=20;

		var ap_everyStep=(ap_end-ap_start)/ap_stepMax; 

		function moveAuto(){

			ap_step++;

			ap_step==ap_stepMax?clearInterval(ap_time3):ap_step=ap_step;

			ap_start+=ap_everyStep;

			ap_smalll.scrollLeft(ap_start);

		}

		ap_time3=setInterval(moveAuto,20);

	}

	function everyMoverr(){

		ap_num1++;

		ap_num1==ap_oImg.length?ap_num1=0:ap_num1=ap_num1;

		movee(ap_smalll.scrollLeft(),ap_oImg.eq(0).width()*ap_num1);

	}

	function moverRightt(){

		ap_num1--;

		if(ap_num1==-1){ap_num1=ap_oimg.length-1};

		if ($('.en_sing').length==1) {

			changed();

		}

		if ($('.en_changed').length==1) {

			change();

		}

		movee(ap_smalll.scrollLeft(),oImg.eq(0).width()*ap_num1);

	}

	ap_time4=setInterval(everyMoverr,5000);



	/*圆点改变颜色*/

	if ($('.en_sing').length==1) {

		function changed(){

			for (var i = 0; i < ap_ball.length; i++) {

				ap_ball.eq(i).attr('src','images/en/ap_gray.png');

			};

			ap_ball.eq(ap_num).attr('src','images/en/ap_blue.png');

		}

		/*点击圆点事件*/

		for (var i =0; i <ap_ball.length; i++) {

			ap_ball.eq(i).click(function(){

				var ap_this=$(this).index();

				clearInterval(ap_time1);

				clearInterval(ap_time4);

				for (var i = 0; i < ap_ball.length; i++) {

					if (i==ap_this) {

						

						$(this).attr('src','images/en/ap_blue.png');

						

						ap_num=i;

						ap_num1=i;

						move(ap_small.scrollLeft(),ap_oimg.eq(0).width()*ap_num);

						movee(ap_smalll.scrollLeft(),ap_oImg.eq(0).width()*ap_num1);

						ap_time4=setInterval(everyMoverr,5000);

						ap_time1=setInterval(everyMover,5000);						

					} else{

						ap_ball.eq(i).attr('src','images/en/ap_gray.png');

						

					};

				};

			});

		};

	}

	 if ($('.en_changed').length==1) {

		/*点击圆点事件*/

		function change(){

			for (var i = 0; i < ap_ball.length; i++) {

				ap_ball.eq(i).attr('src','../images/en/ap_gray.png');

				

			};

			ap_ball.eq(ap_num).attr('src','../images/en/ap_blue.png');

		}

		/*点击圆点事件*/

		for (var i =0; i <ap_ball.length; i++) {

			ap_ball.eq(i).click(function(){

				var ap_this=$(this).index();

				clearInterval(ap_time1);

				clearInterval(ap_time4);

				for (var i = 0; i < ap_ball.length; i++) {

					if (i==ap_this) {

						

						$(this).attr('src','../images/en/ap_blue.png');

						

						ap_num=i;

						ap_num1=i;

						move(ap_small.scrollLeft(),ap_oimg.eq(0).width()*ap_num);

						movee(ap_smalll.scrollLeft(),ap_oImg.eq(0).width()*ap_num1);

						ap_time4=setInterval(everyMoverr,5000);

						ap_time1=setInterval(everyMover,5000);						

					} else{

						ap_ball.eq(i).attr('src','../images/en/ap_gray.png');

						

					};

				};

			});

		};

	}

});

/**************************** App页-手机大图滚动效果 end *********************/



/**************************** About页-二维码hover效果 start *********************/

$(function () {

	var ab_shoot=$('#ab_pic span:eq(0) img:eq(0)');

	var ab_show=$('#ab_show');

	ab_shoot.mouseover(function () {

		ab_show.css('display','block');

	}).mouseout(function () {

		ab_show.css('display','none');

	})

})

/**************************** About页-二维码hover效果 end ***********************/



/**************************** Latin页 start *************************************/

$(function () {

	/*------- con2 产品换颜色 --------*/

	var productcolor = 0;	//代表白色

	$('#la_btnprowhite').click(function () {

		$('#la_procolor').attr("class","la_prowhite");

		$(this).attr("class","la_btnwhitethis");

		$('#la_btnproblack').attr("class","la_btnblackno");

		productcolor = 0;

	});

	$('#la_btnproblack').click(function () {

		$('#la_procolor').attr("class","la_problack");

		$(this).attr("class","la_btnblackthis");

		$('#la_btnprowhite').attr("class","la_btnwhiteno");

		productcolor = 1;

	});

	//	悬停按钮变大

	$('#la_btnprowhite').hover(function () {

		if (productcolor == 0) {

			return;

		}

		else {

			$(this).attr("class","la_btnwhitethis");

			$('#la_btnproblack').attr("class","la_btnblackno");

		}

	},function () {

		if (productcolor == 0) {

			return;

		}

		else {

			$(this).attr("class","la_btnwhiteno");

			$('#la_btnproblack').attr("class","la_btnblackthis");		

		}

	});

	$('#la_btnproblack').hover(function () {

		if (productcolor == 1) {

			return;

		}

		else {

			$(this).attr("class","la_btnblackthis");

			$('#la_btnprowhite').attr("class","la_btnwhiteno");

		}

	},function () {

		if (productcolor == 1) {

			return;

		}

		else {

			$(this).attr("class","la_btnblackno");

			$('#la_btnprowhite').attr("class","la_btnwhitethis");	

		}

	});

	/*------- con3 大小球转变 --------*/

	function showBigBall(i,iWidthBig,iHeightBig,iWidthSmall) {

		$(".con3ball_"+i+" img").stop().animate({width:iWidthBig+"px",height:iHeightBig+"px",top:0,left:0},100);

		$(".con3ball_"+i).css("z-index","100")

		$(".ballsmallword_"+i).stop().hide();

		$(".ballbigword_"+i).stop().delay(100).fadeIn("fast");

		$(".la_btnball"+i).stop().hide().css("border","0 solid");

	}

	function showSmallBall(i,iWidthBig,iWidthSmall,iHeightSmall,iTop,iLeft) {

		$(".con3ball_"+i+" img").stop().animate({width:iWidthSmall+"px",height:iHeightSmall+"px",top:iTop+"px",left:iLeft+"px"},100);

		$(".con3ball_"+i).css("z-index","1")

		$(".ballbigword_"+i).stop().hide();

		$(".ballsmallword_"+i).stop().delay(100).fadeIn("fast");

		$(".la_btnball"+i).stop().show().css("border","0 solid");

	}



	$('.con3ball_1').bind({"mouseleave":function () {

		showSmallBall(1,291,244,230,23,24);

	},"touchstart":function () {

		showSmallBall(1,291,244,230,23,24);

	}});

	$('.con3ball_2').bind({"mouseleave":function () {

		showSmallBall(2,286,240,232,22,23);

	},"touchstart":function () {

		showSmallBall(2,286,240,232,22,23);

	}});

	$('.con3ball_3').bind({"mouseleave":function () {

		showSmallBall(3,281,236,232,22,23);

	},"touchstart":function () {

		showSmallBall(3,281,236,232,22,23);

	}});

	$('.con3ball_4').bind({"mouseleave":function () {

		showSmallBall(4,280,236,230,23,23);

	},"touchstart":function () {

		showSmallBall(4,280,236,230,23,23);

	}});



	if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){

		$('.la_btnball1').bind({"touchstart":function (e){

			e.stopPropagation();

			showBigBall(1,291,275,244);

		}});

		$('.la_btnball2').bind({"touchstart":function (e){

			e.stopPropagation();

			showBigBall(2,286,276,240);

		}});

		$('.la_btnball3').bind({"touchstart":function (e){

			e.stopPropagation();

			showBigBall(3,281,276,236);

		}});

		$('.la_btnball4').bind({"touchstart":function (e){

			e.stopPropagation();

			showBigBall(4,280,273,236);

		}});

	}

	else {

		$('.la_btnball1').bind({"mouseover":function (e){

			e.stopPropagation();

			showBigBall(1,291,275,244);

		}});

		$('.la_btnball2').bind({"mouseover":function (e){

			e.stopPropagation();

			showBigBall(2,286,276,240);

		}});

		$('.la_btnball3').bind({"mouseover":function (e){

			e.stopPropagation();

			showBigBall(3,281,276,236);

		}});

		$('.la_btnball4').bind({"mouseover":function (e){

			e.stopPropagation();

			showBigBall(4,280,273,236);

		}});

	}



	/*------- con4 视频播放 ----------*/

	$('#la_play').click(function () {

		var vid = $(this).attr("data-vid");

		if (!-[1,]&&!window.XMLHttpRequest)	// IE6下直接渐隐

		{

			$('.la_play').animate({"opacity":"0"},600);

		}

		else {

			$(this).animate({"margin-top":"-135px","margin-left":"-135px"},500);

			$('.la_play').animate({width:"268px",height:"268px","opacity":"0"},500);

		}

		$('.la_videoimg').animate({"opacity":"0"},600,function () {

			$('#la_play').css({"display":"none"});

			$('.la_videoimg').css({"display":"none"});

			$('embed').css({"display":"block"});

		});

		$('.la_con4').append($('<object type="application/x-shockwave-flash" data="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" width="980" height="551"><param name="wmode" value="transparent"/><param name="movie" value="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" width="980" height="551" /><embed src="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" wmode="transparent" width="980" align="center" border="0" height="551"></embed></object>'));



	});







	/*------- con5 文字隐藏/显示 -----*/

	$('.la_con5btn div').hover(function () {

		$('#la_con5show').attr("class","la_con5hide");

		$(this).attr("class","la_con5btnclose");

	},function () {

		$('#la_con5show').attr("class","la_con5show");

		$(this).attr("class","la_con5btnmore");

	});



	/*------- con7 tab切换 -----------*/

	var la_con7before = 0;

	$('.la_con7 li').each(function (i) {

		$(this).click(function (i) {

			return function () {

				if (i == la_con7before) {

					return;

				}

				else {

					$('.la_con7 li').eq(la_con7before).animate({height:"58px"},500);

					$('.la_con7 li').eq(i).animate({height:"240px"},500);	

					$('.la_con7 li').eq(la_con7before).find('.la_tabrect').css("display","none");

					$('.la_con7 li').eq(i).find('.la_tabrect').css("display","block");

					$('#la_tabcon').attr("class","la_con7content"+i);

					la_con7before = i;

				}

			}

		}(i));

	});



	

	/*------- con8 大图滚动 ----------*/

	var la_visibleWidth = $(window).width();

	var la_dotsWidth = ($('.la_con8dotscenter span').length)*16;

	var srollPos = 0;



	//	初始化宽度

	if (la_visibleWidth > 2094) {

		$('.la_body').width(2094);



		$('.la_con8dotscenter').css("width",la_dotsWidth+32+"px");

		$('.la_scrollwidth').css("width",2094+"px");

	}

	else if (la_visibleWidth < 1024) {

		$('.la_body').width(1024);



		$('.la_body .in_move').width(1024) 

		$('.la_body .in_bigone').width(1024);

		$('.la_body .in_bigtwo').width(1024);

		$('.la_body .in_bigthree').width(1024);



		$('.la_con8dotscenter').css("width",la_dotsWidth+"px");

		$('.la_scrollwidth').css("width",1024+"px");

	}

	else {

		$('.la_body').width($(window).width());



		$('.la_body .in_move').width($(window).width()) 

		$('.la_body .in_bigone').width($(window).width());

		$('.la_body .in_bigtwo').width($(window).width());

		$('.la_body .in_bigthree').width($(window).width());



		$('.la_con8dotscenter').css("width",la_dotsWidth+"px");

		$('.la_scrollwidth').css("width",la_visibleWidth+"px");

	}

	

	//	文字显示/隐藏

	for (var i=0; i<4; i++) {

		for (var j=1; j<4; j++) {

			$("#la_con8app"+i+" .la_con8show"+j+" div").eq(1).hover(function (i,j) {

				return function () {

					$("#la_con8app"+i+" .la_con8show"+j+" div").eq(2).css({"display":"block"});

					$(this).attr("class","la_con8btnclose");

				}

			}(i,j),function (i,j) {

				return function () {

					$("#la_con8app"+i+" .la_con8show"+j+" div").eq(2).css({"display":"none"});

					$(this).attr("class","la_con8btnshow");

				}

			}(i,j));

		}

	}



	//	控制左右滚动

	$('#la_con8left').click(function () {

		srollPos--;

		if (srollPos <= 0) {

			$(this).attr("class","la_c8leftdis").css("border","0 solid");

			srollPos = 0;

		}

		else if (srollPos == 2) {

			$('#la_con8right').attr("class","la_c8rightab").css("border","0 solid");

		}

		if ($(window).width() > 2094) {

			$('.la_scroll').animate({scrollLeft:2094*srollPos},500);

		}

		else if ($(window).width() < 1024) {

			$('.la_scroll').animate({scrollLeft:1024*srollPos},500);

		}

		else {

			$('.la_scroll').animate({scrollLeft:$(window).width()*srollPos},500);

		}

		$('.la_con8dots span').eq(srollPos).attr("class","la_con8dotthis").css("border","0 solid");

		$('.la_con8dots span').not($('.la_con8dots span').eq(srollPos)).attr("class","la_con8dotno").css("border","0 solid");

	});

	$('#la_con8right').click(function () {

		srollPos++;

		if (srollPos == 1) {

			$('#la_con8left').attr("class","la_c8leftab").css("border","0 solid");

		}

		else if (srollPos >= 3) {

			$(this).attr("class","la_c8rightdis").css("border","0 solid");

			srollPos = 3;

		}

		if ($(window).width() > 2094) {

			$('.la_scroll').animate({scrollLeft:2094*srollPos},500);

		}

		else if ($(window).width() < 1024) {

			$('.la_scroll').animate({scrollLeft:1024*srollPos},500);

		}

		else {

			$('.la_scroll').animate({scrollLeft:$(window).width()*srollPos},500);

		}

		$('.la_con8dots span').eq(srollPos).attr("class","la_con8dotthis").css("border","0 solid");

		$('.la_con8dots span').not($('.la_con8dots span').eq(srollPos)).attr("class","la_con8dotno").css("border","0 solid");

	});

	

	//	翻页的点

	$('.la_con8dots span').each(function (i) {

		$(this).click(function () {

			$('.la_con8dots span').not(this).attr("class","la_con8dotno");

			$(this).attr("class","la_con8dotthis");

			if (i == 0) {

				$('#la_con8left').attr("class","la_c8leftdis").css("border","0 solid");

				$('#la_con8right').attr("class","la_c8rightab").css("border","0 solid");

			}

			else if (i == 3) {

				$('#la_con8left').attr("class","la_c8leftab").css("border","0 solid");

				$('#la_con8right').attr("class","la_c8rightdis").css("border","0 solid");

			}

			else {

				$('#la_con8left').attr("class","la_c8leftab").css("border","0 solid");

				$('#la_con8right').attr("class","la_c8rightab").css("border","0 solid");

			}



			srollPos = i;

			if ($(window).width() > 2094) {

				$('.la_scroll').animate({scrollLeft:2094*srollPos},500);

			}

			else if ($(window).width() < 1024) {

				$('.la_scroll').animate({scrollLeft:1024*srollPos},500);

			}

			else {

				$('.la_scroll').animate({scrollLeft:$(window).width()*srollPos},500);

			}

		});

	});



	//	窗口被重置

	$(window).resize(function(){

		if ($(window).width() > 2094) {

			$('.la_body').width(2094);



			$('.la_con8dotscenter').css("width",la_dotsWidth+32+"px");

			$('.la_scrollwidth').css("width",2094+"px");

			$('.la_scroll').scrollLeft(2094*srollPos);

		}

		else if ($(window).width() <= 1024) {

			$('.la_body').width(1024);



			$('.la_body .in_move').width(1024) 

			$('.la_body .in_bigone').width(1024);

			$('.la_body .in_bigtwo').width(1024);

			$('.la_body .in_bigthree').width(1024);



			$('.la_con8dotscenter').css("width",la_dotsWidth+"px");

			$('.la_scrollwidth').css("width",1024+"px");

			$('.la_scroll').scrollLeft(1024*srollPos);

		}

		else {

			$('.la_body').width($(window).width());



			$('.la_body .in_move').width($(window).width()) 

			$('.la_body .in_bigone').width($(window).width());

			$('.la_body .in_bigtwo').width($(window).width());

			$('.la_body .in_bigthree').width($(window).width());



			$('.la_con8dotscenter').css("width",la_dotsWidth+"px");

			$('.la_scrollwidth').css("width",$(window).width()+"px");

			$('.la_scroll').scrollLeft($(window).width()*srollPos);

		}

	});

});

/**************************** Latin页 end *********************************************************/



/**************************** index页chi start *********************************************************/

$(function(){

	if ($(".imgslider").length >= 1) {
		return;
	};

	

		if ($(window).width() > 2094) {

			var docWidth = 2094;

			$('#in_body').width(2094);

			$('.in_left').css('left',($(window).width()-1080)/2);

			$('.in_right').css('right',($(window).width()-1080)/2+980);



		}

		else if ($(window).width() <= 1180) {

			var docWidth = 1024;

			$('.in_arrow').width(1024);
			if ($(window).width() <= 1180) {

				$('#in_body').width(1024);

				$('.in_left').css('left','0');

				$('.in_right').css('right','0');

			}

		}

		else {

			var docWidth = $(window).width();

			$('.in_left').css('left',($(window).width()-1080)/2);

			$('.in_right').css('right',($(window).width()-1080)/2);

		}





	$(window).resize(function(){

		if ($(window).width() > 2094) {

			$('#in_body').width(2094);

			$('.in_move').width(2094) 

			$('.in_bigone').width(2094);

			$('.in_bigtwo').width(2094);

			$('.in_bigthree').width(2094);



			$('.in_arrow').width(2094); 

			$('.in_left').css('left',($(window).width()-1080)/2);

			$('.in_right').css('right',($(window).width()-1080)/2);		}

		else if($(window).width() <= 1180){

			$('#in_body').width(1024);

			$('#in_body .in_move').width(1024) 

			$('#in_body .in_bigone').width(1024);

			$('#in_body .in_bigtwo').width(1024);

			$('#in_body .in_bigthree').width(1024);



			$('.in_arrow').width($(window).width()); 

			$('.in_left').css('left','0');

			$('.in_right').css('right','0');

		}

		else {

			$('#in_body').width($(window).width());

			$('.in_move').width($(window).width()) 

			$('.in_bigone').width($(window).width());

			$('.in_bigtwo').width($(window).width());

			$('.in_bigthree').width($(window).width());



			$('.in_arrow').width($(window).width());

			$('.in_left').css('left',($(window).width()-1080)/2);

			$('.in_right').css('right',($(window).width()-1080)/2);

		}

	});





	var in_moveT = null,moveR = true,bigThis = false;

	var in_clockT = null;

	var n1 = 0;	//点击右滚

	var n2 = 2;	//点击左滚

	var n3 = 0;	//自动滚动

	var n4 = 0;	//判断推动

	var strR = 1,strL = 0;

	var isIE6 = !-[1,]&&!window.XMLHttpRequest;





	$('.chi .in_move').width(docWidth) 

	$('.chi .in_bigone').width(docWidth);

	$('.chi .in_bigtwo').width(docWidth);

	$('.chi .in_bigthree').width(docWidth);

	/*

	 算法来源：http://www.robertpenner.com/easing/

	 */

	var Tween = {

		Quart: {

			easeInOut: function(t,b,c,d){

				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;

				return -c/2 * ((t-=2)*t*t*t - 2) + b;

			}

		}

	}

	/* 大图滚动 2013/9/27 BY Shirley Xie

		n 为第N页

		boolean=true 为向右滚，boolean=false 为向左滚	

		boolean1=true 为点操作,boolean1=false 为左右滚动按钮或者自动滚动操作 

	 */

	function move(n,boolean,boolean1) {

		if (in_moveT) {

			clearTimeout(in_moveT);

		}



		if (boolean) {

			var t = docWidth;

			_moveRight();

		}

		else {

			var t = 0;

			_moveLeft();

		}



		function _moveRight() {

			if (t > 0) {	// 向右翻临界

				if (isIE6) {

					t-=30;

				}

				else {

					t-=6;

				}

				

				if (n == 0) {	// 显示第2页

					if (boolean1 && !bigThis && (n4==3||n4==0)) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigtwo').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && n4==2) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigtwo').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigone').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigtwo').css({left:docWidth+"px","z-index":"100"});

						$('.chi .in_bigthree').css({"z-index":"80"});						

					}



					$('.chi .in_bigtwo').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else if (n == 1) {	// 显示第3页

					if (boolean1 && !bigThis && n4==2) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigthree').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && (n4==3||n4==0)) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigthree').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigthree').css({left:docWidth+"px","z-index":"100"});

						$('.chi .in_bigone').css({"z-index":"80"});							

					}

					$('.chi .in_bigthree').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else {	// 显示第1页

					if (boolean1 && !bigThis && n4==1) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigone').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && n4==2) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigone').css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigone').css({left:docWidth+"px","z-index":"100"});

						$('.chi .in_bigtwo').css({"z-index":"80"});					

					}

					$('.chi .in_bigone').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});						

				}

				in_moveT = setTimeout(_moveRight,10);

			}

		}

		function _moveLeft() { 

			if (t < docWidth) {		// 向左翻临界

				if (isIE6) {

					t+=30;

				}

				else {

					t+=6;

				}

				

				if (n == 2) {	// 显示第3页

					if (boolean1 && !bigThis && n4==0) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"120"});

						$('.chi .in_bigtwo').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && (n4==-1||n4==2)) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigtwo').css({"z-index":"80"});											

					}

					$('.chi .in_bigone').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else if (n == 1) {	// 显示第2页

					if (boolean1 && !bigThis && (n4==-1||n4==2)) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"120"});

						$('.chi .in_bigone').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && n4==1) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigone').css({"z-index":"80"});

					}

					$('.chi .in_bigthree').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else {	// 显示第1页

					if (boolean1 && !bigThis && n4==1) {

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigthree').css({left:0+"px","z-index":"120"});

						$('.chi .in_bigthree').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && n4==0) {

						$('.chi .in_bigthree').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigone').css({left:0+"px","z-index":"110"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$('.chi .in_bigone').css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$('.chi .in_bigone').css({left:0+"px","z-index":"90"});

						$('.chi .in_bigtwo').css({left:0+"px","z-index":"100"});

						$('.chi .in_bigthree').css({"z-index":"80"});

					}

					$('.chi .in_bigtwo').css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				in_moveT = setTimeout(_moveLeft,10);

			}

		}

		

		$('.chi .in_pos img').attr({'src':'../images/en/in_gray.png'}).css({'border':'0px red solid','overflow':'hidden'});

		if (n==2 && boolean==true)

		{

			$('.chi .in_pos img').eq(0).attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==2 && boolean==false) {

			$('.chi .in_pos img').eq(2).attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==1 && boolean==false) {

			$('.chi .in_pos img').eq(n).attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==0 && boolean==false) {

			$('.chi .in_pos img').eq(0).attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else {

			$('.chi .in_pos img').eq(n+1).attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

	}



	/* 自动左右滚动 */

	function in_clockRight() {

		if (n3 == 3) {

			n3 = 0;

		}

		move(n3,true,false);

		

		n2 = n3;

		n3++;

		n1 = n3;

	}

	function in_clockLeft() {

		if (n3 == -1) {

			n3 = 2;

		}

		move(n3,false,false);

		n1 = n3;

		n3--;

		n2 = n3;		

	}

	if (isIE6) {

		in_clockT=setInterval(in_clockRight,8000);

	}

	else{

		in_clockT=setInterval(in_clockRight,7000);

	}



	/* 小圆点点击 */

	$('.chi .in_pos span').click(function(){

		$('.chi .in_pos img').attr({'src':'../images/en/in_gray.png'}).css({'border':'0px red solid','overflow':'hidden'});

		$(this).find('img').attr({'src':'../images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		clearInterval(in_clockT);

		n4 = n3;

	})

	function in_dots(nR,strR,nL,strL) {

		if (moveR) {

			if (strR) {

				bigThis = true;

			}

			n3 = nR;

			move(n3,true,true);

			n3++;

			bigThis = false;

			if (isIE6) {

				in_clockT=setInterval(in_clockRight,8000);

			}

			else{

				in_clockT=setInterval(in_clockRight,7000);

			}

		}

		else {

			if (strL) {

				bigThis = true;

			}

			n3 = nL;

			move(n3,false,true);

			n3--;

			bigThis = false;

			if (isIE6) {

				in_clockT=setInterval(in_clockRight,8000);

			}

			else{

				in_clockT=setInterval(in_clockRight,7000);

			}

		}

		n1 = n3;

		n2 = n3;

	}

	$('.chi .in_pos span').eq(0).click(function () {

		strR = (n4==3 || n4==0);

		strL = (n4==-1 || n4==2);

		in_dots(2,strR,0,strL);

	})

	$('.chi .in_pos span').eq(1).click(function () {

		strR = (n4==1);

		strL = (n4==0);

		in_dots(0,strR,1,strL);

	})

	$('.chi .in_pos span').eq(2).click(function () {

		strR = (n4==2);

		strL = (n4==1);

		in_dots(1,strR,2,strL);

	})



	/* 右耳朵点击 */

	$('.chi .in_right').click(function(){

		if (n1 == 3) {

			n1 = 0;

		}

		clearInterval(in_clockT);

		move(n1,true,false);

		n2 = n1;

		n1++;

		n3 = n1;

		if (isIE6) {

			in_clockT=setInterval(in_clockRight,8000);

		}

		else{

			in_clockT=setInterval(in_clockRight,7000);

		}

		moveR = true;

	})

	/* 左耳朵点击 */

	$('.chi .in_left').click(function(){

		if (n2 == -1) {

			n2 = 2;

		}

		clearInterval(in_clockT);

		move(n2,false,false);

		n1 = n2;

		n2--;

		n3 = n2;

		if (isIE6) {

			in_clockT=setInterval(in_clockLeft,8000);

		}

		else{

			in_clockT=setInterval(in_clockLeft,7000);

		}

		moveR = false;

	})//big pic end

	/*hover事件*/

	$('.chi .in_red a').hover(function(){

		$('.in_red').css({'background':"url('../images/en/in_redd.png') 0 0 no-repeat"})

		$('.in_red a').eq(1).css({'background':"url('../images/en/in_latins.png') 0 0 no-repeat"})

	},function(){

		$('.in_red').css({'background':'#ffffff'});

		$('.in_red a').eq(1).css({'background':"url('../images/en/in_latin.png') 0 0 no-repeat"})

	});

	$('.chi .in_reds a').hover(function(){

		$('.in_reds').css({'background':"url('../images/en/in_redd.png') 0 0 no-repeat"});

		$('.in_reds a').eq(1).css({'background':"url('../images/en/in_apps.png') 0 0 no-repeat"})

	},function(){

		$('.in_reds').css({'background':'#ffffff'});

		$('.in_reds a').eq(1).css({'background':"url('../images/en/in_app.png') 0 0 no-repeat"})

	});

	

})/**************************** index页 end *********************************************************///////////////////////////////////

/***************** 大图滚动 START *************************************////////////////////////////////////////////////////////////////////////
$(window).load(function() {

	function slider () {
		// 轮转时间
		this.time = 7000;
		// 转换速度
		this.speed = 1800;
		// 当前显示的图片索引
		this.index = 0;
		// 可视窗口宽度
		this.width = $("#slider").width();
		// 图片数量
		this.num = 0;
		// 是否在动画中
		this.running = 0;
	}
	slider.prototype = {
		init: function() {

			this.createNav();
			this.registerEvt();
			this.setStyle();
			this.loopImage();
			this.updateNav(this.index);
		},
		createNav: function() {
			var num = $("#slider").find(".imgLoop").length;
			this.num = num-1;
			for (var i = 0 ; i < num ; i++) {
				$("<span><img class = 'imageLoopNav lucency' src = '../images/en/in_gray.png'/></span>").appendTo(".sliderNav");	
			}
		},
		registerEvt: function() {

			var self = this;
			// nav的hover事件
			$(".imageLoopNav").hover(function(){
				var idx = $(this).parent().index();
				self.anim(idx);
				clearInterval(self.sit);
			}).unbind("mouseleave").bind("mouseleave" , function(){
				self.loopImage();
			});


			// resize 事件
			$(window).resize(function() {
				this.width = $("#slider").width();
				if(this.width<1024) {return;}
				$(".imgLoop").css({
					"width" : this.width + "px"
				});
				
			});

			//左右事件
			$("#slider").find(".in_left").click(function(){
				
				if (self.index == 0) {
					var idx = self.num;
				} else {
					var idx = self.index - 1;
				}
				self.anim(idx);
			});
			$("#slider").find(".in_right").click(function(){
				if (self.index == self.num) {
					var idx = 0;
				} else {
					var idx = self.index + 1;
				}
				self.anim(idx);
			});
			$("#slider").find(".sliderArrow").hover(function(){
				clearInterval(self.sit);
			}).unbind("mouseleave").bind("mouseleave", function(){
				self.loopImage();
			});
		},
		setStyle: function() {
			$(".imgLoop").css({
				"left" : 0 + "px",
				"z-index" : 110,
				"width" : this.width
			})
			$($(".imgLoop")[0]).css("z-index" , "200");
		},
		anim: function(idx) {
			var self = this;
			var elem = $($(".imgLoop")[idx]);
			var index = $($(".imgLoop")[this.index]);
			if (!elem) {return;}
			this.updateNav(idx);
			if (idx > this.index || (this.index == this.num && idx == 0)) {
				
				

				this.index = elem.index();
				this.running++;
				if (elem.is(":animated")) {
					self.running--;
					$(".imgLoop").css("z-index" , 110);
					elem.css("z-index" , 200);
				}
				index.css({
					"z-index": 210
				});
				elem.css({
					"left" : this.width,
					"z-index" : 300
				}).stop().animate({
					left : "0px"
				} , this.speed , function() {
					self.running--;
					if(self.running === 0) {
						$(".imgLoop").css("z-index" , 110);
						$(this).css("z-index" , 200);
					}
				});

			} else if (idx < this.index || (this.index == 0 && idx == this.num)) {
				
				this.index = elem.index();
				this.running++;
				if (index.is(":animated")) {
					self.running--;
					$(".imgLoop").css("z-index" , 110);
					index.css("z-index" , 200);
				}

				elem.css({
					"left" : "0px",
					"z-index" : 210
				});

				index.css({
					"left" : "0px",
					"z-index" : 300
				}).stop().animate({
					"left" : this.width
				} , this.speed , function() {
					self.running--;
					if(self.running === 0) {
						$(".imgLoop").css("z-index" , 110);
						elem.css("z-index" , 200);
					}
				});
			}
		},
		updateNav: function(idx) {
			$(".sliderNav").children().find(".imageLoopNav").attr("src" , '../images/en/in_gray.png');
			$($(".sliderNav").children()[idx]).find(".imageLoopNav").attr("src" , '../images/en/in_blue.png');
		},
		loopImage: function() {
			var self = this;
			this.sit = setInterval(function(){
				if (self.index == self.num) {
					var idx = 0;
				} else {
					var idx = self.index + 1;
				}
				
				self.anim(idx);
			}, this.time);
		}
	}
	var imageLoop = new slider();
	imageLoop.init();
});



$(function (){
	return;
	if ($(window).width() > 2094) {
		var docWidth = 2094;
	}
	else if ($(window).width() < 1024) {
		var docWidth = 1024;
	}
	else {
		var docWidth = $(window).width();
	}
	var $inBigTwo = $('.in_move .in_bigtwo');
	var $inBigThree = $('.in_move .in_bigthree');
	$inBigTwo.css({"left": docWidth});
	$inBigThree.css({"left": docWidth});
});
window.onload = function(){
	return;
	/*无缝滚动*/

	var  m=0;

	$('#in_pics').html($('#in_pic').html());

	function sport(){

		$('.in_bg').scrollLeft(m+=2);

		

		if($('.in_bg').scrollLeft()>=$('#in_pic').width()){

			m=0;

			$('.in_bg').scrollLeft(0);

		}

		

	}

	t4=setInterval(sport,20);

	$('.in_bg').mouseover(function(){

		if (t4) 

		{

			clearInterval(t4);

		}

	});

	$('.in_bg').mouseout(function(){

		t4=setInterval(sport,20);

	});
	if($(".imgslider").length >= 1){
		return;
	}
	var in_moveT = null,moveR = true,bigThis = false;

	var in_clockT = null;

	var n1 = 0;	//点击右滚

	var n2 = 2;	//点击左滚

	var n3 = 0;	//自动滚动

	var n4 = 0;	//判断推动

	var strR = 1,strL = 0;

	var isIE6 = !-[1,]&&!window.XMLHttpRequest;
	var $inBigOne = $('.in_eng .in_bigone');
	var $inBigTwo = $('.in_eng .in_bigtwo');
	var $inBigThree = $('.in_eng .in_bigthree');
	var $inBigFour = $('.in_eng .in_bigfour');
	// var $inBigFive = $('.in_eng .in_bigfive');
	// var $inBigSix = $('.in_eng .in_bigsix');



	if ($(window).width() > 2094) {

		var docWidth = 2094;

	}

	else if ($(window).width() < 1024) {

		var docWidth = 1024;

	}

	else {

		var docWidth = $(window).width();

	}

	$('.in_eng .in_move').width(docWidth) 

	$inBigOne.width(docWidth);

	$inBigTwo.width(docWidth);

	$inBigThree.width(docWidth);
	$inBigTwo.css({"left": docWidth});
	$inBigThree.css({"left": docWidth});

	/*

	 算法来源：http://www.robertpenner.com/easing/

	 */

	var Tween = {

		Quart: {

			easeInOut: function(t,b,c,d){

				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;

				return -c/2 * ((t-=2)*t*t*t - 2) + b;

			}

		}

	}

	/* 大图滚动 2013/9/27 BY Shirley Xie

		n 为第N页

		boolean=true 为向右滚，boolean=false 为向左滚	

		boolean1=true 为点操作,boolean1=false 为左右滚动按钮或者自动滚动操作 

	 */

	function move(n,boolean,boolean1) {

		if (in_moveT) {

			clearTimeout(in_moveT);

		}



		if (boolean) {

			var t = docWidth;

			_moveRight();

		}

		else {

			var t = 0;

			_moveLeft();

		}



		function _moveRight() {

			if (in_moveT) {

				clearTimeout(in_moveT);

			}

			if (t > 0) {	// 向右翻临界

				if (isIE6) {

					t-=30;

				}

				else {

					t-=6;

				}



				if (n == 0) {	// 显示第2页

					if (boolean1 && !bigThis && (n4==3||n4==0)) {

						$inBigThree.css({left:0+"px","z-index":"100"});

						$inBigFour.css({left:0+"px","z-index":"99"});

						$inBigOne.css({left:0+"px","z-index":"110"});

						$inBigTwo.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && n4==2) {

						$inBigOne.css({left:0+"px","z-index":"100"});

						$inBigThree.css({left:0+"px","z-index":"110"});

						$inBigTwo.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigTwo.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigOne.css({left:0+"px","z-index":"90"});

						$inBigTwo.css({left:docWidth+"px","z-index":"100"});

						$inBigThree.css({"z-index":"80"});

						$inBigFour.css({"z-index":"70"});					

					}



					$inBigTwo.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else if (n == 1) {	// 显示第3页

					if (boolean1 && !bigThis && n4==2) {

						$inBigOne.css({left:0+"px","z-index":"100"});

						$inBigTwo.css({left:0+"px","z-index":"110"});

						$inBigThree.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && (n4==3||n4==0)) {

						$inBigTwo.css({left:0+"px","z-index":"100"});

						$inBigOne.css({left:0+"px","z-index":"110"});

						$inBigThree.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigThree.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigTwo.css({left:0+"px","z-index":"90"});

						$inBigThree.css({left:docWidth+"px","z-index":"100"});

						$inBigOne.css({"z-index":"80"});							

					}

					$inBigThree.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else {	// 显示第1页

					if (boolean1 && !bigThis && n4==1) {

						$inBigThree.css({left:0+"px","z-index":"100"});

						$inBigTwo.css({left:0+"px","z-index":"110"});

						$inBigOne.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && !bigThis && n4==2) {

						$inBigTwo.css({left:0+"px","z-index":"100"});

						$inBigThree.css({left:0+"px","z-index":"110"});

						$inBigOne.css({left:docWidth+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigOne.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigThree.css({left:0+"px","z-index":"90"});

						$inBigOne.css({left:docWidth+"px","z-index":"100"});

						$inBigTwo.css({"z-index":"80"});					

					}

					$inBigOne.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});						

				}

				in_moveT = setTimeout(_moveRight,10);

			}

		}

		function _moveLeft() { 

			if (t < docWidth) {		// 向左翻临界

				if (isIE6) {

					t+=30;

				}

				else {

					t+=6;

				}

				

				if (n == 2) {	// 显示第3页

					if (boolean1 && !bigThis && n4==0) {

						$inBigOne.css({left:0+"px","z-index":"100"});

						$inBigThree.css({left:0+"px","z-index":"110"});

						$inBigTwo.css({left:0+"px","z-index":"120"});

						$inBigTwo.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && (n4==-1||n4==2)) {

						$inBigTwo.css({left:0+"px","z-index":"100"});

						$inBigThree.css({left:0+"px","z-index":"110"});

						$inBigOne.css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigThree.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigThree.css({left:0+"px","z-index":"90"});

						$inBigOne.css({left:0+"px","z-index":"100"});

						$inBigTwo.css({"z-index":"80"});											

					}

					$inBigOne.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else if (n == 1) {	// 显示第2页

					if (boolean1 && !bigThis && (n4==-1||n4==2)) {

						$inBigThree.css({left:0+"px","z-index":"110"});

						$inBigTwo.css({left:0+"px","z-index":"110"});

						$inBigOne.css({left:0+"px","z-index":"120"});

						$inBigOne.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && n4==1) {

						$inBigOne.css({left:0+"px","z-index":"100"});

						$inBigTwo.css({left:0+"px","z-index":"110"});

						$inBigThree.css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigTwo.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigTwo.css({left:0+"px","z-index":"90"});

						$inBigThree.css({left:0+"px","z-index":"100"});

						$inBigOne.css({"z-index":"80"});

					}

					$inBigThree.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				else {	// 显示第1页

					if (boolean1 && !bigThis && n4==1) {

						$inBigTwo.css({left:0+"px","z-index":"100"});

						$inBigOne.css({left:0+"px","z-index":"110"});

						$inBigThree.css({left:0+"px","z-index":"120"});

						$inBigThree.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

					}

					else if (boolean1 && !bigThis && n4==0) {

						$inBigThree.css({left:0+"px","z-index":"100"});

						$inBigOne.css({left:0+"px","z-index":"110"});

						$inBigTwo.css({left:0+"px","z-index":"120"});

					}

					else if (boolean1 && bigThis) {

						$inBigOne.css({left:0+"px","z-index":"120"});

						return;

					}

					else {

						$inBigOne.css({left:0+"px","z-index":"90"});

						$inBigTwo.css({left:0+"px","z-index":"100"});

						$inBigThree.css({"z-index":"80"});

					}

					$inBigTwo.css({left:Math.ceil(Tween.Quart.easeInOut(t,0,docWidth,docWidth)) + "px"});

				}

				in_moveT = setTimeout(_moveLeft,10);

			}

		}

		

		$('.in_eng .in_pos img').attr({'src':'images/en/in_gray.png'}).css({'border':'0px red solid','overflow':'hidden'});

		if (n==2 && boolean==true)

		{

			$('.in_eng .in_pos img').eq(0).attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==2 && boolean==false) {

			$('.in_eng .in_pos img').eq(2).attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==1 && boolean==false) {

			$('.in_eng .in_pos img').eq(n).attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else if (n==0 && boolean==false) {

			$('.in_eng .in_pos img').eq(0).attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

		else {

			$('.in_eng .in_pos img').eq(n+1).attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		}

	}



	/* 自动左右滚动 */

	function in_clockRight() {

		if (n3 == 3) {

			n3 = 0;

		}

		move(n3,true,false);

		

		n2 = n3;

		n3++;

		n1 = n3;

	}

	function in_clockLeft() {

		if (n3 == -1) {

			n3 = 2;

		}

		move(n3,false,false);

		n1 = n3;

		n3--;

		n2 = n3;		

	}

	

	if (isIE6) {

		in_clockT=setInterval(in_clockRight,8000);

	}

	else{

		//in_clockT=setInterval(in_clockRight,7000);

	}

	/* 小圆点点击 */

	$('.in_eng .in_pos span').click(function(){

		$('.in_eng .in_pos img').attr({'src':'images/en/in_gray.png'}).css({'border':'0px red solid','overflow':'hidden'});

		$(this).find('img').attr({'src':'images/en/in_blue.png'}).css({'border':'0px red solid','overflow':'hidden'});

		clearInterval(in_clockT);

		n4 = n3;

	})

	function in_dots(nR,strR,nL,strL) {

		if (moveR) {

			if (strR) {

				bigThis = true;

			}

			n3 = nR;

			move(n3,true,true);

			n3++;

			bigThis = false;

			if (isIE6) {

				in_clockT=setInterval(in_clockRight,8000);

			}

			else{

				in_clockT=setInterval(in_clockRight,7000);

			}

		}

		else {

			if (strL) {

				bigThis = true;

			}

			n3 = nL;

			move(n3,false,true);

			n3--;

			bigThis = false;

			if (isIE6) {

				in_clockT=setInterval(in_clockLeft,8000);

			}

			else{

				in_clockT=setInterval(in_clockLeft,7000);

			}

		}

		n1 = n3;

		n2 = n3;

	}

	$('.in_eng .in_pos span').eq(0).click(function () {

		strR = (n4==3 || n4==0);

		strL = (n4==-1 || n4==2);

		in_dots(2,strR,0,strL);

	})

	$('.in_eng .in_pos span').eq(1).click(function () {

		strR = (n4==1);

		strL = (n4==0);

		in_dots(0,strR,1,strL);

	})

	$('.in_eng .in_pos span').eq(2).click(function () {

		strR = (n4==2);

		strL = (n4==1);

		in_dots(1,strR,2,strL);

	})



	/* 右耳朵点击 */

	$('.in_eng .in_right').click(function(){

		if (n1 == 4) {

			n1 = 0;

		}

		clearInterval(in_clockT);

		move(n1,true,false);

		n2 = n1;

		n1++;

		n3 = n1;

		if (isIE6) {

			in_clockT=setInterval(in_clockRight,8000);

		}

		else{

			// in_clockT=setInterval(in_clockRight,7000);

		}

		moveR = true;

	})

	/* 左耳朵点击 */

	$('.in_eng .in_left').click(function(){

		if (n2 == -1) {

			n2 = 2;

		}

		clearInterval(in_clockT);

		move(n2,false,false);

		n1 = n2;

		n2--;

		n3 = n2;

		if (isIE6) {

			in_clockT=setInterval(in_clockLeft,8000);

		}

		else{

			in_clockT=setInterval(in_clockLeft,7000);

		}

		moveR = false;

	})//big pic end





	/*hover事件*/

	$('.in_eng .in_red a').hover(function(){

		$('.in_red').css({'background':"url('images/en/in_redd.png') 0 0 no-repeat"})

		$('.in_red a').eq(1).css({'background':"url('images/en/in_latins.png') 0 0 no-repeat"})

	},function(){

		$('.in_red').css({'background':'#ffffff'});

		$('.in_red a').eq(1).css({'background':"url('images/en/in_latin.png') 0 0 no-repeat"})

	});

	$('.in_eng .in_reds a').hover(function(){

		$('.in_reds').css({'background':"url('images/en/in_redd.png') 0 0 no-repeat"});

		$('.in_reds a').eq(1).css({'background':"url('images/en/in_apps.png') 0 0 no-repeat"})

	},function(){

		$('.in_reds').css({'background':'#ffffff'});

		$('.in_reds a').eq(1).css({'background':"url('images/en/in_app.png') 0 0 no-repeat"})

	});

	

}/**************************** index页 end *********************************************************///////////////////////////////////

/*********************************图库部分中文start****************************************************/

/*************************上、下页部分**************************/

$(function(){

	$('.chi .ch_prev').children().hover(function(){

		$(this).removeClass("ch_left");

		$(this).addClass("ch_hoverL");

		},function(){

			$(this).removeClass("ch_hoverL");

			$(this).addClass("ch_left");

		})

		$('.ch_next').children().hover(function(){

			$(this).removeClass("ch_rightSelect");

			$(this).addClass("ch_hoverR");

		},function(){

			$(this).removeClass("ch_hoverR");

			$(this).addClass("ch_rightSelect");

		})

		/*下一页点击*/

		var ch_nth=0;

		$('.chi .ch_next').click(function () {

			$('.ch_prev').children().removeClass("ch_leftSelect")

			$('.ch_prev').children().addClass("ch_left")

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_right")

			$(".ch_right").removeClass("ch_rightSelect");

			$(".ch_right").addClass("ch_right");

			$('.ch_next').children().mouseout(function(){

				$(this).removeClass("ch_right")

				$(this).removeClass("ch_hoverR")

				$(this).removeClass("ch_rightSelect");

				$(this).addClass("ch_right");

			})

			$('.ch_next').children().mouseover(function(){

				$(this).removeClass("ch_right")

				$(this).removeClass("ch_hoverR")

				$(this).removeClass("ch_rightSelect");

				$(this).addClass("ch_right");

			})

			if ($('.ch_outter').scrollLeft()==0) 

			{

				$('.ch_outter').animate({'scrollLeft':'+=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980+1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(ch_nth).addClass('ch_red');

			}

		});

		

		

		/*************************鼠标移上出现外框**************************/

		$('.chi .ch_page span').hover(function () {

			$(this).css("position","relative");

			$("<img src='../images/ch/ch_wrap.png'>").appendTo($(this))

			.css({'position':'absolute','top':'0','left':'0'});

		},function () {

			$(this).children($('img')).eq(1).remove();

		});

		

		/*上一页点击*/

		$('.chi .ch_prev').dblclick(function(){

			$('.ch_prev').children().removeClass("ch_left");

			$('.ch_prev').children().addClass("ch_leftSelect");

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_rightSelect")

			$('.ch_next').children().hover(function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_hoverR");

				},function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_rightSelect");

				})

			if ($('.ch_outter').scrollLeft()>0) 

			{

				$('.ch_outter').animate({'scrollLeft':'-=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980-1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(0).addClass('ch_red');

			}

		})

		$('.chi .ch_prev').click(function () {

			$('.ch_prev').children().removeClass("ch_left");

			$('.ch_prev').children().addClass("ch_leftSelect");

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_rightSelect")

			$('.ch_next').children().hover(function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_hoverR");

				},function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_rightSelect");

				})

			if ($('.ch_outter').scrollLeft()>0) 

			{

				$('.ch_outter').animate({'scrollLeft':'-=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980-1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(0).addClass('ch_red');

			}

		});

		

		

		$('.chi .ch_page span').click(function(){

			var inde=$(this).index();

			$("<div class='ch_big'></div>").appendTo($('.ch_page')).css({"position":"absolute","left":"0px","top":"0px"})

			.css({'position':'absolute',"width":"940px","height":"547px"});

			var ch_src=$(this).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px"});

			$("<em class='ch_off'><img class='opacity' src='../images/ch/ch_off.png'/></em>").appendTo($('.ch_page')).css({"width":"39px","height":"39px","position":"absolute","right":"19px","top":"19px",'cursor':'pointer'});

			$("<em class='ch_Cprev'><img class='opacity' src='../images/ch/nd_prev.png'/></em>").appendTo($('.ch_page')).css({"width":"76px","height":"23px","position":"absolute","left":"19px","top":"261px",'cursor':'pointer'});

			$("<em class='ch_Cnext'><img class='opacity' src='../images/ch/ch_nextred.png'/></em>").appendTo($('.ch_page')).css({"width":"77px","height":"23px","position":"absolute","right":"19px","top":"261px",'cursor':'pointer'});



			/*************************点击放大到大图**************************/

		

			ch_left=$(this).position().left;

			ch_top=$(this).position().top;

			$(this).find(".ch_picwrap").hide();

			$(".ch_control").css("display","none")

			if (inde==0)

			{

				$(".ch_Cprev").find('img').attr({"src":"../images/ch/nd_prev.png"}).css("border","0px solid")

				

			}

			else{

				$(".ch_Cprev").find('img').attr({"src":"../images/ch/ch_prev_sel.png"}).css("border","0px solid");

			}

			$(".ch_off").click(function(){

				$(".ch_big").fadeOut(500);

				$(".ch_off").css("display","none");

				$(".ch_Cprev").css("display","none");

				$(".ch_Cnext").css("display","none");

				$(".ch_control").css("display","block")

			});

		$(".chi .ch_Cprev").click(function(){

			$(".ch_Cnext").find('img').attr({"src":"../images/ch/ch_nextred.png"}).css("border","0px solid");

			inde--;

			if (inde==-1)

			{

				inde=0;

			}

			if (inde==0)

			{

				$(this).find('img').attr({"src":"../images/ch/nd_prev.png"}).css("border","0px solid");

				$(".ch_Cnext").find('img').attr({"src":"../images/ch/ch_nextred.png"}).css("border","0px solid");

			}

			var ch_src=$('.ch_page span').eq(inde).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px","position":"absolute","left":"0","top":"0"}).css({'display':'none'}).fadeIn(800);

		})

		$(".ch_Cnext").click(function(){

			$(".ch_Cprev").find('img').attr({"src":"../images/ch/ch_prev_sel.png"}).css("border","0px solid");

			inde++;

			if (inde==18)

			{

				inde=17;

			}

			if (inde==17)

			{

				$(this).find('img').attr({"src":"../images/ch/ch_next_sel.png"}).css("border","0px solid");

				$(".ch_Cprev").find('img').attr({"src":"../images/ch/ch_prev_sel.png"});

			}

			var ch_src=$('.ch_page span').eq(inde).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px","position":"absolute","left":"0","top":"0"}).css({'display':'none'}).fadeIn(800);

		})

	})

})	

/*********************************图库部分中文end****************************************************/

/*********************************图库部分英文start****************************************************/

/*************************上、下页部分**************************/

$(function(){

	$('.eng .ch_prev').children().hover(function(){

		$(this).removeClass("ch_left");

		$(this).addClass("ch_hoverL");

		},function(){

			$(this).removeClass("ch_hoverL");

			$(this).addClass("ch_left");

		})

		$('.ch_next').children().hover(function(){

			$(this).removeClass("ch_rightSelect");

			$(this).addClass("ch_hoverR");

		},function(){

			$(this).removeClass("ch_hoverR");

			$(this).addClass("ch_rightSelect");

		})

		/*下一页点击*/

		var ch_nth=0;

		$('.eng .ch_next').click(function () {

			$('.ch_prev').children().removeClass("ch_leftSelect")

			$('.ch_prev').children().addClass("ch_left")

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_right")

			$(".ch_right").removeClass("ch_rightSelect");

			$(".ch_right").addClass("ch_right");

			$('.ch_next').children().mouseout(function(){

				$(this).removeClass("ch_right")

				$(this).removeClass("ch_hoverR")

				$(this).removeClass("ch_rightSelect");

				$(this).addClass("ch_right");

			})

			$('.ch_next').children().mouseover(function(){

				$(this).removeClass("ch_right")

				$(this).removeClass("ch_hoverR")

				$(this).removeClass("ch_rightSelect");

				$(this).addClass("ch_right");

			})

			if ($('.ch_outter').scrollLeft()==0) 

			{

				$('.ch_outter').animate({'scrollLeft':'+=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980+1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(ch_nth).addClass('ch_red');

			}

		});

		

		

		/*************************鼠标移上出现外框**************************/

		$('.eng .ch_page span').hover(function () {

			$(this).css("position","relative");

			$("<img src='images/ch/ch_wrap.png'>").appendTo($(this))

			.css({'position':'absolute','top':'0','left':'0'});

		},function () {

			$(this).children($('img')).eq(1).remove();

		});

		

		/*上一页点击*/

		$('.eng .ch_prev').dblclick(function(){

			$('.ch_prev').children().removeClass("ch_left");

			$('.ch_prev').children().addClass("ch_leftSelect");

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_rightSelect")

			$('.ch_next').children().hover(function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_hoverR");

				},function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_rightSelect");

				})

			if ($('.ch_outter').scrollLeft()>0) 

			{

				$('.ch_outter').animate({'scrollLeft':'-=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980-1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(0).addClass('ch_red');

			}

		})

		$('.eng .ch_prev').click(function () {

			$('.ch_prev').children().removeClass("ch_left");

			$('.ch_prev').children().addClass("ch_leftSelect");

			$('.ch_next').children().removeClass("ch_hoverR")

			$('.ch_next').children().addClass("ch_rightSelect")

			$('.ch_next').children().hover(function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_hoverR");

				},function(){

					$(this).removeClass("ch_right")

					$(this).removeClass("ch_hoverR")

					$(this).removeClass("ch_rightSelect");

					$(this).addClass("ch_rightSelect");

				})

			if ($('.ch_outter').scrollLeft()>0) 

			{

				$('.ch_outter').animate({'scrollLeft':'-=980'},800);

				ch_nth=$('.ch_outter').scrollLeft()/980-1;

				$('.ch_radio span').removeClass('ch_red');

				$('.ch_radio span').eq(0).addClass('ch_red');

			}

		});

		

		

		$('.eng .ch_page span').click(function(){

			var inde=$(this).index();

			$("<div class='ch_big'></div>").appendTo($('.ch_page')).css({"position":"absolute","left":"0px","top":"0px"})

			.css({'position':'absolute',"width":"940px","height":"547px"});

			var ch_src=$(this).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px"});

			$("<em class='ch_off'><img class='opacity' src='images/ch/ch_off.png'/></em>").appendTo($('.ch_page')).css({"width":"39px","height":"39px","position":"absolute","right":"19px","top":"19px",'cursor':'pointer'});

			$("<em class='ch_Cprev'><img class='opacity' src='images/en/en_prev.png'/></em>").appendTo($('.ch_page')).css({"width":"77px","height":"23px","position":"absolute","left":"19px","top":"261px",'cursor':'pointer'});

			$("<em class='ch_Cnext'><img class='opacity' src='images/en/ch_nextred.png'/></em>").appendTo($('.ch_page')).css({"width":"77px","height":"23px","position":"absolute","right":"19px","top":"261px",'cursor':'pointer'});



			/*************************点击放大到大图**************************/

		

			ch_left=$(this).position().left;

			ch_top=$(this).position().top;

			$(this).find(".ch_picwrap").hide();

			$(".ch_control").css("display","none")

			if (inde==0)

			{

				$(".ch_Cprev").find('img').attr({"src":"images/en/en_prev.png"}).css("border","0px solid");

				

			}

			else{

				$(".ch_Cprev").find('img').attr({"src":"images/en/ch_prev_sel.png"}).css("border","0px solid");

			}

			$(".ch_off").click(function(){

				$(".ch_big").fadeOut(500);

				$(".ch_off").css("display","none");

				$(".ch_Cprev").css("display","none");

				$(".ch_Cnext").css("display","none");

				$(".ch_control").css("display","block")

			});

		$(".eng .ch_Cprev").click(function(){

			$(".ch_Cnext").find('img').attr({"src":"images/en/ch_nextred.png"}).css("border","0px solid");

			inde--;

			if (inde==-1)

			{

				inde=0;

			}

			if (inde==0)

			{

				$(this).find('img').attr({"src":"images/en/en_prev.png"}).css("border","0px solid");

				$(".ch_Cnext").find('img').attr({"src":"images/en/ch_nextred.png"}).css("border","0px solid");

			}

			var ch_src=$('.ch_page span').eq(inde).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px","position":"absolute","left":"0","top":"0"}).css({'display':'none'}).fadeIn(800);

		})

		$(".eng .ch_Cnext").click(function(){

			$(".ch_Cprev").find('img').attr({"src":"images/en/ch_prev_sel.png"}).css("border","0px solid");

			inde++;

			if (inde==18)

			{

				inde=17;

			}

			if (inde==17)

			{

				$(this).find('img').attr({"src":"images/en/ch_next_sel.png"}).css("border","0px solid");

				$(".ch_Cprev").find('img').attr({"src":"images/en/ch_prev_sel.png"}).css("border","0px solid");

			}

			var ch_src=$('.ch_page span').eq(inde).children($('img')).eq(0).attr("src");

			$("<img/>").appendTo($(".ch_big")).attr({"src":ch_src}).css({"width":"940px","height":"547px","position":"absolute","left":"0","top":"0"}).css({'display':'none'}).fadeIn(800);

		})

	})

})	

	/*********************************图库部分end****************************************************/

/*phms页面开始*/

	/*问号hover效果*/

	$(function () {

		/*alert(1);*/

		$(".en .ph_mark").hover(function () {

			$(this).children().attr("src","images/ch/ph_markhover.png");

			$(".en .ph_tm").show();

		},function(){

			$(this).children().attr("src","images/ch/ph_mark.png");

			$(".en .ph_tm").hide();

		

		})



		$(".enchange .ph_mark").hover(function () {

			$(this).children().attr("src","../images/ch/ph_markhover.png");

			$(".enchange .ph_tm").show();

		},function(){

			$(this).children().attr("src","../images/ch/ph_mark.png");

			$(".enchange .ph_tm").hide();

		

		})

	})

/*phms页面结束*/



// 
$(function () {
	var $body = $(".imgslider");
	var $wrap = $body.find(".in_move");
	var $items = $wrap.find(".in_item");
	var $rightBtn = $wrap.find(".in_right");
	var $leftBtn = $wrap.find(".in_left");
	var $dots = $wrap.find(".in_pos img");

	var ind = 0; //当前显示的
	var zind = 101;	// 当前显示的zind起始值,不用动
	var focusDotImg = "../images/en/in_blue.png";
	var unfocusDotImg = "../images/en/in_gray.png";
	var t;

	// 初始化位置
	$items.each(function (i,val) {
		var background = $(val).attr("data-img");
		
		if (i == 0) {
			$(val).css({
				"left":'0px',
				"z-index":zind,
				"background-image":"url("+background+")"
			});
		}else{
			$(val).css({
				"left":winW,
				"z-index":zind,
				"background-image":"url("+background+")"
			});
		}
	});

	var winW = $(window).width();

	var resizet = null;

	$(window).resize(function(){
	
		
		if (resizet) {
			clearTimeout(resizet);
		};


		if ($(window).width() > 2094) {
			winW = 2094
			$('#in_body').width(2094);
			$('.in_move').width(2094) 
			$('.in_bigone').width(2094);
			$('.in_bigtwo').width(2094);
			$('.in_bigthree').width(2094);


			$('.in_arrow').width(2094); 
			$('.in_left').css('left',($(window).width()-1080)/2);
			$('.in_right').css('right',($(window).width()-1080)/2);
		}else if($(window).width() <= 1180){
			winW = 1024
			$('#in_body').width(1024);
			$('#in_body .in_move').width(1024) 
			$('#in_body .in_bigone').width(1024);
			$('#in_body .in_bigtwo').width(1024);
			$('#in_body .in_bigthree').width(1024);

			$('.in_arrow').width(1024); 
			$('.in_left').css('left','0');
			$('.in_right').css('right','0');
		}else {
			winW = $(window).width();
			$('#in_body').width($(window).width());
			$('.in_move').width($(window).width()) 
			$('.in_bigone').width($(window).width());
			$('.in_bigtwo').width($(window).width());
			$('.in_bigthree').width($(window).width());

			$('.in_arrow').width($(window).width());
			$('.in_left').css('left',($(window).width()-1080)/2);
			$('.in_right').css('right',($(window).width()-1080)/2);
		}

		resizet = setTimeout(function () {
			$items.stop(true,true);
			$items.each(function (i,val) {
				var left = $(this).css("left") - 0;
				if (left != 0) {
					$(this).css("left")
				};
			})
		},50)

	});

	$rightBtn.click(next);

	function next () {
		ind++;
		if (ind >= $items.length) {
			ind = 0;
		};

		fixzind();

		tabRight(ind);

		if (t) {
			clearTimeout(t);
		};
		t = setTimeout(next, 7000);
	}

	function tabRight (index) {
		ind = index;
		$items.eq(index).stop().css({
			"left":winW,
			"z-index":getMaxZ()+1
		}).animate({
			"left" : 0
		}, 1500,"linear");

		$dots.each(function (i,val) {
			$(val).attr("src",i==index ? focusDotImg : unfocusDotImg);
		});
	}

	function tabLeft (index) {
		ind = index;
		$items.eq(index).stop().css({
			"left":0,
			"z-index":getMixZ()-1
		})
		$items.not(":eq("+index+")").stop().css({
			
		}).animate({
			"left" : winW
		}, 1500,"linear");

		$dots.each(function (i,val) {
			$(val).attr("src",i==ind ? focusDotImg : unfocusDotImg);
		});
	}

	$leftBtn.click(function () {
		ind--;
		if (ind < 0) {
			ind = $items.length - 1;
		};

		fixzind();

		tabLeft(ind);

		if (t) {
			clearTimeout(t);
		};
		t = setTimeout(next, 7000);

	});

	$dots.hover(function () {
		if (t) {
			clearTimeout(t);
		};
		var index = $dots.index(this);
		
		if (index > ind) {
			tabRight(index)
		}else if(index < ind){
			
			tabLeft(index)
		}

	},function () {
		t = setTimeout(next, 7000);
	})

	function getMixZ() {
		var mix;
		$items.each(function (i,val) {
			if (mix === undefined) {
				mix = $(val).css("z-index") - 0;
				return;
			};
			if (mix > $(val).css("z-index") - 0) {
				mix = $(val).css("z-index") - 0;
			};
		});
		return mix;
	}

	function getMaxZ () {
		var max;
		$items.each(function (i,val) {
			if (max === undefined) {
				max = $(val).css("z-index") - 0;
				return;
			};
			if (max < $(val).css("z-index") - 0) {
				max = $(val).css("z-index") - 0;
			};
		});
		return max;
	}

	function fixzind () {
		if (getMixZ() <= 80) {
			$items.css("z-index","+=20");
		};
		if (getMaxZ() >= 120) {
			$items.css("z-index","-=20");
		};
	}

	t = setTimeout(next, 6000);

})