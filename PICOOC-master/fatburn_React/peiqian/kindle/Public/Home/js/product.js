Picooc.product = {};

Picooc.product.macPro = (function(){

	//开合笔记本
	var state = true;

	$('.pro-macbook-win').css({

		'-webkit-transform':'rotate3d(1,0,0,0deg) scale(1)',
		'-o-transform':'rotate3d(1,0,0,0deg) scale(1)',
		'-ms-transform':'rotate3d(1,0,0,0deg) scale(1)',
		'-moz-transform':'rotate3d(1,0,0,0deg) scale(1)',

	})

	$('.pro-macbook').click(function(){

		if(!state){
			$('.pro-macbook-win').css({

				'-webkit-transform':'rotate3d(1,0,0,0deg) scale(1)',
				'-o-transform':'rotate3d(1,0,0,0deg) scale(1)',
				'-ms-transform':'rotate3d(1,0,0,0deg) scale(1)',
				'-moz-transform':'rotate3d(1,0,0,0deg) scale(1)',

			})
			state = true;
		}else{
			$('.pro-macbook-win').css({

				'-webkit-transform':'rotate3d(1,0,0,-80deg) scale(0.9)',
				'-o-transform':'rotate3d(1,0,0,-80deg) scale(0.9)',
				'-ms-transform':'rotate3d(1,0,0,-80deg) scale(0.9)',
				'-moz-transform':'rotate3d(1,0,0,-80deg) scale(0.9)',


			})
			state = false;
		}		

	})

	//移除蒙版并播放视频
	$('.pro-video-start').click(function(e){

		 e.stopPropagation();
		$(this).fadeOut().remove();
		$('.pro-macbook-mask').fadeIn();

		var vid = $(this).attr("data-vid");

		$('.pro-macbook-mask').append($('<object type="application/x-shockwave-flash" data="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" width="656" height="380"><param name="wmode" value="transparent"/><param name="movie" value="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" width="656" height="380" /><embed src="http://static.youku.com/v/swf/qplayer.swf?winType=adshow&VideoIDS='+vid+'&isAutoPlay=true&isShowRelatedVideo=false" wmode="transparent" width="656" align="center" border="0" height="380"></embed></object>'));


	})
	 

})();

Picooc.product.gif = (function(){

	//鼠标移上放大
	function bind_mouseover(){
		$('.pro-title-btn').bind('mouseover',function(){

			if(!$(this).hasClass('pro-title-btn2')){

				var index = $(this).index('.pro-title-btn');
				mouseover(index);

			}
		})
	}

	bind_mouseover();

	function mouseover(index){

		$('.pro-title-btn2').removeClass('a-bouncein').removeClass('pro-title-btn2');
		//var index = $(this).index('.pro-title-btn');
		showImg_byIndex(index);
		$('.pro-title-btn').eq(index).addClass('pro-title-btn2').addClass('a-bouncein');

	}

	function showImg_byIndex(index){
		$('.pro-latin-gif').addClass('display-none');
		$('.pro-latin-gif').eq(index).removeClass('display-none');
	}

	/*var COUNT = false;
	window.onscroll = function(){

		var hei = document.body.scrollTop;

			if(hei>=2000 && hei<=2100){

				if(!COUNT){

					COUNT = true;
					$('.pro-title-btn').unbind('mouseover');
					for(var i=0;i<6;i++){

						(function(j){

							setTimeout(function(){
								
								if(j >= 5){
									mouseover(0);									
									bind_mouseover();
									COUNT = false;

								}else{
									mouseover(j);
								}

							},j*800)					
							
						})(i);

					}
				}

			}

	}*/

	/*var aa = false;
	$('.pro-updown-btn').click(function(){

		if(!aa){

			$(this).css('-webkit-transform','rotate(-180deg)');
			$('.pro-updown-line').css('background','url(../images/direction.png) 0 -183px no-repeat');
			aa = true;
			setTimeout(function(){
					var hei = document.body.clientHeight;
				document.body.scrollTop = hei;
			},1000);

		}else{

			$(this).css('-webkit-transform','rotate(0deg)');
			$('.pro-updown-line').css('background','url(../images/direction.png) 0 -76px no-repeat');
			setTimeout(function(){
				document.body.scrollTop = 0;
			},1000)
			aa = false;

		}
		
		//document.body.scrollTop = ;

	})*/

})();

Picooc.product.showapp = (function(){

	var h3 = $('.pro-app-lef-title h3'),
		p = $('.pro-app-lef-con p'),
		sp = $('.pro-iphone-ui span'),
		sp2 = $('.pro-app-line span');

	$('.pro-app-line span').click(function(){

		var index = $(this).index();

		showleft(index);
		showmiddle(index);
		changecolor(index);

	})

	function showleft(index){

		h3.addClass('display-none')
		h3.eq(index).removeClass('display-none');

		p.addClass('display-none');
		p.eq(index).removeClass('display-none');

	}

	function showmiddle(index){

		if(!sp.eq(index).hasClass('s1')){
			$('.s1').stop(true,true).animate({left:'-229px'},'1000',function(){
				$('.s1').css('left','229px');
				$('.s1').removeClass('s1');
			})
			sp.eq(index).stop(true,true).animate({left:'0'},'1000',function(){
				sp.eq(index).addClass('s1');
			})
		}

	}

	function changecolor(index){

		sp2.eq(index)
		.css('color','#15ddda')
		.addClass('pro-app-selected')
		.siblings()
		.css('color','#6a6a6a')
		.removeClass();

	}

})();