
/*头部鼠标放上，移开的事件*/
(function(){
	

	function init_left(_left){

		var xy = $('.model-selected').offset(),
			wid = $('.model-selected').width();

		$('.small-block').stop(0,0).animate({
			left:(xy.left-_left),
			width:wid
		});
	}
	if($('.small-block').length>0){
			

			//当前小滑块的位置
			var _left = $('.nav').offset().left;
			$(window).resize(function(){
				_left = $('.nav').offset().left;
			})

			console.log(_left)
			init_left(_left);
			//导航事件绑定
			$('.nav li').unbind('mouseover').bind('mouseover',function(e){

				var e = e || window.event;
				e.stopPropagation();

				var xy = $(this).offset(),
					wid = $(this).width();	

				$('.small-block').stop(0,0).animate({
					left:(xy.left-_left),
					width:wid
				});

			});

			$('.nav li').unbind('mouseout').bind('mouseout',function(e){

				var e = e || window.event;
				e.stopPropagation();

				init_left();

			});
	}
	//初始化小块的位置
	

	

	//iframe自适应高度
	function addEvt(ifr){

	  var doc=ifr.contentWindow.document;
	  doc.onclick=function(){
	    ifr.style.height=(document.all?doc.body.scrollHeight+300:doc.body.offsetHeight+300)+'px';
	  }
	  console.log(doc.getElementsByTagName('body')[0])
	  var _hei = doc.getElementsByTagName('body')[0].offsetHeight+300;
	  ifr.style.height = _hei +'px';
	  
	}
	$(document).ready(function(){
		
		var iframe = window.top.document.getElementById('userIframe');
		if(iframe){
			addEvt(iframe);
		}
		
	})

})();