Picooc.index = (function(){
	function a1(){

	}
	function aa(){}
	function ab(){}
	function ac(){}

	//一个公用的蒙版层
	function mele(){
		var m = new Picooc.building.Mask({html:"<img src='../images/loader.gif'/>"});
		m.init();	
		$('.picooc-mask').css({'background-color':'#fff'},{"opacity":"1"});
		return m;
	}
	//每个模块的图片是否全部加载完毕
	var indexObj = {
		app:false,
		experience:false,
		sport:false,
		data:false,
		phms:false
	}
	//首页图片加载函数
	function loadimgs(arr,fun,bool){
		if(bool){
			return false;
		}
		var i,len = arr.length,ind = 0;
		for(i = 0;i<len;i++){
			var img = new Image();
			img.src = arr[i];
			img.onload = function(){
				ind+=1;
				if(ind == len){
					fun();
				}
			}
			img.onerror = function(){
				ind+=1;
				if(ind == len){
					fun();
				}
			}
		}
	}

	//当前第几屏
	var page_index = 0,
		li_page = 0,//此处是当前第几屏
		H = 0,
		AUTO_HEI = 679,
		isScrolling = false;
	var video = document.querySelector('.index-video'),
		header = document.querySelectorAll('.head'),
		i,item = document.querySelectorAll('.index-item'),
		main = document.querySelector('.main'),
		ul_nav = document.querySelector('.index-nav-ul');

	var dc_state = false;
	//兼容各个浏览器的页面上下滑动transform
	var _elementStyle = main.style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ){
				return vendors[i].substr(0, vendors[i].length-1);
			}
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	var _transform = _prefixStyle('transform');
	main.style[_transform]='translate3d(0px,0px,0px)';   
	
	//鼠标滚轮方法
	function mousescroll(delta){
	
		$(document).unbind('mousewheel');
		var h = get_body_hei();
    	//向上
       if(delta>0){
       		if(li_page>0){	
				li_page-=1;
				if(li_page == 0){//此处向上时候 可以直接到顶部
					H = 0;
				}else{
					H = -li_page*h;
				}														
			}			
       }else{
       		if(li_page<7-1){//右边li为7个
       			li_page+=1;
				if(li_page == 6){
					//+30为增加底部高度
					H = -(main.offsetHeight - h +73+30);					
				}else{
					H = -li_page*h;				
				}														
			}
       }
       selected_li(li_page);
 		
 	  
       main.style[_transform]='translate3d(0px,'+H+'px,0px)';
       setTimeout(function(){
		   	$(document).
			bind('mousewheel', function(event, delta) {  
				$(document).unbind('mousewheel');
				mousescroll(delta);
			});
       },1000);
	}

	//获取当前浏览器显示高度
	function get_body_hei(){
		var h = window.innerHeight;
		if(h<AUTO_HEI){
			//h = AUTO_HEI;
		}
		return h;
	}
	//根据当前浏览器高度 设置页面中各个模块的高度
	function set_item_hei(){
		var h = get_body_hei();

		//document.body.style.height=h+'px';
		for(i =0 ;i<item.length;i++){
			if(i!=0 && i!=item.length-1 && i!=1){
				item[i].style.height = h+'px';
			}else if(i == 1){
				//video.style.height = '170px';
				//item[i].style.height = (h-video.offsetHeight-73-2)+'px';
				if(h-73-2>810){
					//大图的高度
					var _hdatu = h-video.offsetHeight-73-2;
					if(_hdatu>780){
						item[i].style.height = '780px';
						video.style.height = (h-780-73-2)+'px';
					}else{
						video.style.height = '170px';
						item[i].style.height = (h-video.offsetHeight-73-2)+'px';
					}
					
				}else if(h-73-2>640 && h-73-2 <810){
					video.style.height = (h-73-2-640)+'px';
					item[i].style.height = 640+'px';
				}else if(h-73-2<640){
					$('.index-datu').css('overflow','hidden');
					item[i].style.height = (h-75-70)+'px';
					video.style.height = '70px';
				}
				$('.hover').css('height',video.offsetHeight+'px');
			}			
		}

		if(li_page !=0){
			if(li_page!=6){
				H = -h*li_page;
			}else{
				H = -(main.offsetHeight - h +73);
			}

			main.style[_transform]='translate3d(0px,'+H+'px,0px)';
		}

		//体验
		$('.index-experience-bg').css('height',(h-390)+'px');
		
	}

	//创建右侧导航小列表
	function create_li(){
		var i,len = item.length,str='';
		var texts = ['首页','全新的软件','一切只为体验','记录你的每一步','更多的数据','极复杂，极简单'];
		for(i=0;i<len-2;i++){
			if(i == 0){
		str+='<li class="index-nav-first"><em class="nav_em"></em><span class="nav_sp">'+texts[i]+'</span></li>';
			}else{
				str+='<li><em class="nav_em"></em><span class="nav_sp">'+texts[i]+'</span></li>';
			}			
		}
		return str;
	}	
	function _aa(){
		setTimeout(function(){
			sport_circle();
		},0);
		
		var ele = document.getElementById('index-steps-box').getElementsByTagName('span');
		if(ele[0] == undefined){
			var a = new Picooc.building.Num_run({
				num:'7500',
				box:'index-steps-box'
			});
			a.init();
			setTimeout(function(){
				a.animate(ele);
			},200);	
		}
	}
	//右侧导航某个被选中
	function selected_li(index){
		var p = Picooc.imgRoot;
		var h = get_body_hei();
		var lis = ul_nav.getElementsByTagName('li');
		for(var i=0,len = lis.length;i<len;i++){
			if(i!= 0){
				lis[i].className = '';
			}else{
				lis[i].className = 'index-nav-first';
			}
		}
		if(index<lis.length && index>0){
			lis[index].className += ' index-nav-selected';
		}else if(index <0){
			index = 0;
		}else if(index>=lis.length){
			index = lis.length - 1;
		}
		
		if(index !=0){
			var str = header[0].className;
			if(str.indexOf('new_head') == -1){
				header[0].className+=' new_head';
			}
			$('.logo img').animate({'width':'200px','height':'28px','margin-top':'6px'},'200');
			$('.Img-left-btn').css('z-index','-1').css('opacity','0');
			$('.Img-right-btn').css('z-index','-1').css('opacity','0');
		}else{
			$('.logo img').animate({'width':'234px','height':'34px','margin-top':'0px'},'200');
			var str = header[0].className;
			if(str.indexOf('new_head')!=-1){
				header[0].className = str.replace('new_head','');
			}
		}

		if(index == 0){
			$('.Img-left-btn').css('z-index','2002').css('opacity','1');
			$('.Img-right-btn').css('z-index','2002').css('opacity','1');

		}else if(index == 1){
			if(indexObj.app){
				setTimeout(function(){
					$('.index-app-iphone').css({'background-position':'right 43px'});
					$('.index-app-eight').css({'background-position':'0 0'});
				},1200);
			}
			
		}else if(index == 2){
			if(indexObj.experience){
				tiyan_auto();
				setTimeout(function(){
					$('.index-experience-title').css({'opacity':'1'});
					$('.index-experience-text').css({'opacity':'1'});
					$('.index-learn-more2').css({'opacity':'1'});
				},1200);
			}
		}else if (index == 3){
	
			if(indexObj.sport){
				_aa();
			}		
			
		}else if (index == 4){
			if(indexObj.data){
				setTimeout(function(){
					$('.index-data-con').css('opacity',1);
				},1000);
			}
		
		}else if (index == 5){
			
			if(indexObj.phms){
				setTimeout(function(){
					if(h>768){
						$('.index-phms-left').css('left','0');
						$('.index-phms-right').css('right','0');
					}else{
						$('.index-phms-left').css('left','140px');
						$('.index-phms-right').css('right','140px');
					}
					
				},800)
			}	
		}else if (index == 6){
			
		}else if (index == 7){
			
		}
	}
	//右侧导航绑定点击事件
	function li_bind_event(){
		var lis = ul_nav.getElementsByTagName('li');
		for(var i=0,len = lis.length;i<len;i++){
			(function(j){
				lis[j].onclick = function(){
					click(j);
				}
			})(i)
		}

		function click(j){
			var h = get_body_hei();			
			li_page = j;
			selected_li(j);

			if(j == 6){
				H = -(main.offsetHeight - h +73);
			}else{
				H = -j*h;
			}
			main.style[_transform]='translate3d(0px,'+H+'px,0px)';
		}
	}
	
	function sport_circle(r){

		var h = get_body_hei(),
			ele = document.getElementById('index-sport-circle');
		var ss = new Picooc.building.ring(ele,r);

	}
	//绘制半圆的方法
	function draw_circle_init(){
		var _w = $('#index-sport-circle').width(),
			_h = $('#index-sport-circle').height();

		var h = get_body_hei();
		if(dc_state){
			dc_state.clear();
			dc_state.remove();
		}else{
			
		}
		if(h<867){
			r = 10;
		}else if(h>=867){
			//r = 20;
			r = 10;
		}
		var ss = new Picooc.building.DrawCircle({
		    box:'index-sport-circle',
		    width:_w,
		    height:_w,
		    total:100,
		    value:70,
		    R:_w/2-10,
		    R2:_w/2-8,
		    color:{c:'#ffe400'},
		    endTime:2000,
		    param : {stroke: "red", "stroke-width": (r-4)},
		    delay:0,
		    bg_border:r
		});

		setTimeout(function(){
			dc_state = ss.init();
		},600);
	}

	//体验模块背景图位置的设置
	function tiyan_auto(){
		var ss,h=get_body_hei();
		if(h<=679){
			ss = -390;
		}else{
			ss = h-1080;
		}
		$('.index-experience').css({'background-position':'center '+ss+'px'});
	}
	//初始化首页所有模块
	function _init(){

		jQuery(function($) {  
	    $(document).
	    		bind('mousewheel', function(event, delta) {      			
	    			mousescroll(delta);
	    		});  
		});

		var lis = create_li();
			ul_nav.innerHTML = lis;
			set_item_hei();
			li_bind_event();

		$('.nav_em').mouseover(function(){
			$('.nav_sp').css('display','none');
			$(this).siblings('span').fadeIn();
		}).mouseout(function(){
			$(this).siblings('span').fadeOut();
		})

		window.onresize = function(){
			set_item_hei();
			//暂时先添加注释 等图片都加载完成后解除注释
			//tiyan_auto();			
		}
		//定制大图滚动
		//{src:Picooc.imgRoot+'/images/index-banner.jpg',fn:function(){}},
		var urls = [
				{src:Picooc.imgRoot+'/images/index-datu1.jpg',fn:aa},
				{src:Picooc.imgRoot+'/images/index-datu2.jpg',fn:ab},
				//{src:Picooc.imgRoot+'/images/index-datu3.jpg',fn:ac},
				{src:Picooc.imgRoot+'/images/index-datu4.jpg',fn:ac}];
		var im = new Picooc.building.Img_scroll({
			btn_left_class:'btn_class_left',//左右键的class名称,
			btn_right_class:'btn_class_right',
			midcon_class:'midcon_class',//中间一个容器div的class名称 用来展现其他效果
			len:100,//左右键距离左右边的距离
			tab_style:'fade',//切换方式  滚动或渐变 fade
			data:urls,//数据 及点击左右按钮 调用的函数
			box:$('.index-datu')//最外层的容器
		});
		im.init();
		var img = new Image();
		img.src = urls[0].src;
		img.onload = function(){
			loadAllImages();
		}
		img.onerror = function(){
			loadAllImages();
		}
		function loadAllImages(){
			var p = Picooc.imgRoot;
			var h = get_body_hei();
			//loadapp
			var app = (function(){
				var _ii = 0,arr=[];
				arr[_ii++] = p +'/images/index-app.jpg';
				arr[_ii++] = p +'/images/index-iphone.png';
				arr[_ii++] = p +'/images/index-app-text.png';
				arr[_ii++] = p +'/images/index-app-eight.png';
				arr[_ii++] = p +'/images/index-learn-more.png';
				
				loadimgs(arr,function(){
					indexObj.app = true;
					$('.index-app').css('opacity',0);
					setTimeout(function(){
						$('.index-app').css('opacity',1);
						$('.index-app').css('background-image','url('+arr[0]+')');
						$('.index-app-iphone').css('background-image','url('+arr[1]+')');
						$('.index-app-text').css('background-image','url('+arr[2]+')');
						$('.index-app-eight').css('background-image','url('+arr[3]+')');
						$('.learn_more3').css('background-image','url('+arr[4]+')');
					},800);
					if(li_page == 1){
						setTimeout(function(){
							$('.index-app-iphone').css({'background-position':'right 43px'});
							$('.index-app-eight').css({'background-position':'0 0'});
						},1200);
					}
				},indexObj.app);
			})();
			//load experience
			var experience = (function(){
				var _ii2 = 0,arr = [];
				arr[_ii2++] = p +'/images/index-foot.jpg';
				arr[_ii2++] = p +'/images/index-experience-title.png';
				arr[_ii2++] = p +'/images/index-experience-text.png';
				arr[_ii2++] = p +'/images/index-learn-more.png';

				loadimgs(arr,function(){
					indexObj.experience = true;
					$('.index-experience').css('opacity',0);
					setTimeout(function(){
						$('.index-experience').css('opacity',1);
						$('.index-experience').css('background-image','url('+arr[0]+')');
						tiyan_auto();
						$('.index-experience-title').css('background-image','url('+arr[1]+')');
						$('.index-experience-text').css('background-image','url('+arr[2]+')');
						$('.learn_more2').css('background-image','url('+arr[3]+')');
						if(li_page == 2){
							tiyan_auto();
							setTimeout(function(){
								$('.index-experience-title').css({'opacity':'1'});
								$('.index-experience-text').css({'opacity':'1'});
								$('.index-learn-more2').css({'opacity':'1'});
							},1200);
						}
					},800)
				},indexObj.experience)
			})();
			//load sport
			var sport  = (function(){
				if(h<878){
						var arr  = [p+'/images/index-sport.jpg',p+'/images/index-sport-timeline.png',
					p+'/images/index-sport-title.png',p+'/images/index-sport-text2.png',p+'/images/index-learn-more.png'];
				}else{
					var arr  = [p+'/images/index-sport.jpg',p+'/images/index-sport-timeline.png',
					p+'/images/index-sport-title.png',p+'/images/index-sport-text.png',p+'/images/index-learn-more.png'];
				}
				
				loadimgs(arr,function(index){
					indexObj.sport = true;
					$('.index-sport').css('opacity',0);
					setTimeout(function(){
						$('.index-sport').css('opacity',1);
						$('.index-sport').css('background-image','url('+arr[0]+')');
						$('.index-sport-timeline').css('background-image','url('+arr[1]+')');
						$('.index-sport-title').css('background-image','url('+arr[2]+')');
						$('.index-sport-text').css('background-image','url('+arr[3]+')');
						$('.learn_more12').css('background-image','url('+arr[4]+')');
						if(li_page == 3){
							_aa();
						}
					},800)

				},indexObj.sport)
			})();
			//load data
			var data = (function(){
				var arr  = [p+'/images/index-data.jpg',p+'/images/index-data-title.png',
				p+'/images/index-data-text.png',p+'/images/index-learn-more.png'];
				loadimgs(arr,function(){
					indexObj.data = true;
					$('.index-data').css('opacity',0);

					setTimeout(function(){
						$('.index-data').css('opacity',1);
						$('.index-data').css('background-image','url('+arr[0]+')');
						$('.index-data-title').css('background-image','url('+arr[1]+')');
						$('.index-data-text').css('background-image','url('+arr[2]+')');
						$('.learn_more0').css('background-image','url('+arr[3]+')');
						if(li_page == 4){
							setTimeout(function(){
								$('.index-data-con').css('opacity',1);
							},1000);
						}
					},800);
				},indexObj.data)
			})();
			//load phms
			var phms = (function(){
				var arr  = [p+'/images/index-phms-title.png',p+'/images/index-phms-text1.png',
				p+'/images/index-phms-text2.png',p+'/images/index-phms-iphone1.png',p+'/images/index-phms-iphone2.png',
				p+'/images/index-phms-iphone3.png'];
				loadimgs(arr,function(){
					$('.index-phms-con').css('background-image','none');
					indexObj.phms = true;
					$('.index-phms').css('opacity',0);
					setTimeout(function(){
						$('.index-phms').css('opacity',1);
						$('.index-phms-title').css('background-image','url('+arr[0]+')');
						$('.index-phms-text1').css('background-image','url('+arr[1]+')');
						$('.index-phms-text2').css('background-image','url('+arr[2]+')');
						$('.index-phms-left').css('background-image','url('+arr[3]+')');
						$('.index-phms-middle').css('background-image','url('+arr[4]+')');
						$('.index-phms-right').css('background-image','url('+arr[5]+')');
						if(li_page == 5){
							setTimeout(function(){
								if(h>768){
									$('.index-phms-left').css('left','0');
									$('.index-phms-right').css('right','0');
								}else{
									$('.index-phms-left').css('left','140px');
									$('.index-phms-right').css('right','140px');
								}
								
							},800)
						}
					},800)
						
				},indexObj.phms)
			})();
		}

		//高度在600左右时候
		$('.index-datu .Img-item-set').eq(0).css('background-position','50% 20%');

		//下面1070多行处 有同样一段代码
		var preVideo = "",pmask;
		$('.hover').unbind('click').bind('click',function(){

			var id = $(this).attr("data-id");
			var lens = $('.picooc-mask').length;
			
			if(lens < 1 || id != preVideo){

				if(pmask){
					pmask.close();
				}

				if(id == "v1"){
					var video_src = "picooc2.mp4";
				}else{
					var video_src = "designUnder.mp4";
					console.log('1:'+video_src)
				}
				
				console.log('2:'+video_src)
				pmask = new Picooc.building.Mask({
					html:'<span class="video_close" style="left:-60px;top:-60px;"></span>'
							+'<video controls="controls" width="768px" height="405px" id="videos">'
							+'您的浏览器不支持 video 标签。'
							+'<source src="'+Picooc.imgRootVideo+'/videos/'+video_src+'" type="video/mp4"/>'
							//+'<source src="'+Picooc.imgRootVideo+'/videos/" type="video/ogg"/>'
							+'</video>'
				});	
				pmask.init();
				$('.picooc-mask').css('background','#fff').css('opacity',1);
				
			}else if( lens > 0 && id == preVideo){
				//p.close();
				$('.picooc-win').css('display','');
				$('.picooc-mask').css('display','');
			}
			
			var videos = document.getElementById('videos');
				videos.play();

			preVideo = id;
			
			$('.video_close').unbind('click').bind('click',function(){
				var videos = document.getElementById('videos');
				videos.pause();
				$('.picooc-win').css('display','none');
				$('.picooc-mask').css('display','none');
			})

		});
	}

	return {
		init:_init
	}
})();

Picooc.indexIpad = (function(){
	function aa (argument) {
		// body...
	}
	function ab(){}
	function ac(){}

	//一个公用的蒙版层
	function mele(){
		var m = new Picooc.building.Mask({html:"<img src='../images/loader.gif'/>"});
		m.init();	
		$('.picooc-mask').css({'background-color':'#fff'},{"opacity":"1"});
		return m;
	}
	//每个模块的图片是否全部加载完毕
	var indexObj = {
		app:false,
		experience:false,
		sport:false,
		data:false,
		phms:false
	}
	//首页图片加载函数
	function loadimgs(arr,fun,bool){
		if(bool){
			return false;
		}
		var i,len = arr.length,ind = 0;
		for(i = 0;i<len;i++){
			var img = new Image();
			img.src = arr[i];
			img.onload = function(){
				ind+=1;
				if(ind == len){
					fun();
				}
			}
			img.onerror = function(){
				ind+=1;
				if(ind == len){
					fun();
				}
			}
		}
	}

	//当前第几屏
	var page_index = 0,
		li_page = 0,//此处是当前第几屏
		H = 0,
		AUTO_HEI = 679,
		isScrolling = false;
	var video = document.querySelector('.index-video'),
		header = document.querySelectorAll('.head'),
		i,item = document.querySelectorAll('.index-item'),
		main = document.querySelector('.main'),
		ul_nav = document.querySelector('.index-nav-ul');

	var dc_state = false;
	

	//获取当前浏览器显示高度
	function get_body_hei(){
		var h = window.innerHeight;
		if(h<AUTO_HEI){
			//h = AUTO_HEI;
		}
		return h;
	}
	//根据当前浏览器高度 设置页面中各个模块的高度
	function set_item_hei(){
		var h = get_body_hei();

		//document.body.style.height=h+'px';
		for(i =0 ;i<item.length;i++){
			if(i!=0 && i!=item.length-1 && i!=1){
				item[i].style.height = h+'px';
			}else if(i == 1){
				//video.style.height = '170px';
				//item[i].style.height = (h-video.offsetHeight-73-2)+'px';
				if(h-73-2>810){
					//大图的高度
					var _hdatu = h-video.offsetHeight-73-2;
					if(_hdatu>780){
						item[i].style.height = '780px';
						video.style.height = (h-780-73-2)+'px';
					}else{
						video.style.height = '170px';
						item[i].style.height = (h-video.offsetHeight-73-2)+'px';
					}
					
				}else if(h-73-2>640 && h-73-2 <810){
					video.style.height = (h-73-2-640)+'px';
					item[i].style.height = 640+'px';
				}else if(h-73-2<640){
					$('.index-datu').css('overflow','hidden');
					item[i].style.height = (h-75-70)+'px';
					video.style.height = '70px';
				}
				$('.hover').css('height',video.offsetHeight+'px');
			}			
		}

		if(li_page !=0){
			if(li_page!=6){
				H = -h*li_page;
			}else{
				H = -(main.offsetHeight - h +73);
			}

			main.style[_transform]='translate3d(0px,'+H+'px,0px)';
		}

		//体验
		$('.index-experience-bg').css('height',(h-390)+'px');
		
	}

	function _aa(){
		setTimeout(function(){
			sport_circle();
		},0);
		
		var ele = document.getElementById('index-steps-box').getElementsByTagName('span');
		if(ele[0] == undefined){
			var a = new Picooc.building.Num_run({
				num:'7500',
				box:'index-steps-box'
			});
			a.init();
			setTimeout(function(){
				a.animate(ele);
			},200);	
		}
	}
	
	var p = Picooc.imgRoot;
	var h = get_body_hei();
	//$('.logo img').animate({'width':'120px','height':'28px','margin-top':'6px'},'200');
	$('.Img-left-btn').css('z-index','-1').css('opacity','0');
	$('.Img-right-btn').css('z-index','-1').css('opacity','0');
	//$('.logo img').animate({'width':'140px','height':'33px','margin-top':'0px'},'200');

	
	function sport_circle(r){

		var h = get_body_hei(),
			ele = document.getElementById('index-sport-circle');
		var ss = new Picooc.building.ring(ele,r);

	}
	//绘制半圆的方法
	function draw_circle_init(){
		var _w = $('#index-sport-circle').width(),
			_h = $('#index-sport-circle').height();

		var h = get_body_hei();
		if(dc_state){
			dc_state.clear();
			dc_state.remove();
		}else{
			
		}
		if(h<867){
			r = 10;
		}else if(h>=867){
			//r = 20;
			r = 10;
		}
		var ss = new Picooc.building.DrawCircle({
		    box:'index-sport-circle',
		    width:_w,
		    height:_w,
		    total:100,
		    value:70,
		    R:_w/2-10,
		    R2:_w/2-8,
		    color:{c:'#ffe400'},
		    endTime:2000,
		    param : {stroke: "red", "stroke-width": (r-4)},
		    delay:0,
		    bg_border:r
		});

		setTimeout(function(){
			dc_state = ss.init();
		},600);
	}

	//体验模块背景图位置的设置
	function tiyan_auto(){
		var ss,h=get_body_hei();
		if(h<=679){
			ss = -390;
		}else{
			ss = h-1080;
		}
		$('.index-experience').css({'background-position':'center 0px'});
	}
	//初始化首页所有模块
	function _init(){

		window.onresize = function(){
			//set_item_hei();
			//暂时先添加注释 等图片都加载完成后解除注释
			//tiyan_auto();			
		}
		
		//获取大图图片的src
		var ele = $('.swiper-img'),_len = ele.length,arr =[],_index =0;
		for(var i=0;i<_len;i++){
			(function(j){
				var img = new Image();
				img.src = ele.eq(j).attr('adapter');
				if(j!=0){
					ele.eq(j).css('display','none');
				}
				img.onload = function(){
					var src = this.src;
					ele.eq(j).attr('src',src);
					_index+=1;
					//第一张大图加载完毕
					if(_index==1){
						loadAllImages();
					}
					//大图加载完毕
					if(_index>=_len){
						
						for(i=1;i<_len;i++){
							ele.eq(i).css('display','block');
						}
						scrollInit();
					}
					
				}
				img.onerror = function(){
					var src = this.src;
					ele.eq(j).attr('src',src);
					_index+=1;
					//第一张大图加载完毕
					if(_index==1){
						loadAllImages();
					}
					//大图加载完毕
					if(_index>=_len){
						
						for(i=1;i<_len;i++){
							ele.eq(i).css('display','block');
						}
						scrollInit();
					}
				}
			})(i)
		}
		
		function scrollInit(){
			// 初始化滚动控件
			var mySwiper = new Swiper('.swiper-container', {
				pagination: '.pagination4',
				loop: true,
				autoplay: 3000, // 轮播间隙
				speed: 400, // 滑动速度
				grabCursor: true,
				paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
				calculateHeight: true, // 解决自动设置1000+的高度
				autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
				onImagesReady: function() {
					// alert(1);
				}
			});
		}
		
		$('.index-datu').css('height','auto');
		/*var urls = [{src:Picooc.imgRoot+'/images/index-datu1.jpg',fn:aa},
				{src:Picooc.imgRoot+'/images/index-datu2.jpg',fn:ab},
				{src:Picooc.imgRoot+'/images/index-datu3.jpg',fn:ac},
				{src:Picooc.imgRoot+'/images/index-datu4.jpg',fn:ac}];
		var im = new Picooc.building.Img_scroll({
			btn_left_class:'btn_class_left',//左右键的class名称,
			btn_right_class:'btn_class_right',
			midcon_class:'midcon_class',//中间一个容器div的class名称 用来展现其他效果
			len:100,//左右键距离左右边的距离
			tab_style:'scroll',//切换方式  滚动或渐变 fade
			data:urls,//数据 及点击左右按钮 调用的函数
			box:$('.index-datu')//最外层的容器
		});
		im.init();*/
		/*var img = new Image();
		img.src = urls[0].src;
		img.onload = function(){
			loadAllImages();
		}
		img.onerror = function(){
			loadAllImages();
		}*/
		
		function loadAllImages(){
			var p = Picooc.imgRoot;
			var h = get_body_hei();
			//loadapp
			var app = (function(){
				var _ii = 0,arr=[];
				arr[_ii++] = p +'/images/index-app.jpg';
				arr[_ii++] = p +'/images/index-iphone.png';
				arr[_ii++] = p +'/images/index-app-text.png';
				arr[_ii++] = p +'/images/index-app-eight.png';
				arr[_ii++] = p +'/images/index-learn-more.png';
				
				loadimgs(arr,function(){
					indexObj.app = true;
					$('.index-app').css('opacity',0);
					setTimeout(function(){
						$('.index-app').css('opacity',1);
						$('.index-app').css('background-image','url('+arr[0]+')');
						$('.index-app-iphone').css('background-image','url('+arr[1]+')');
						$('.index-app-text').css('background-image','url('+arr[2]+')');
						$('.index-app-eight').css('background-image','url('+arr[3]+')');
						$('.learn_more3').css('background-image','url('+arr[4]+')');
					},800);
					setTimeout(function(){
						$('.index-app-iphone').css({'background-position':'right 43px'});
						$('.index-app-eight').css({'background-position':'0 0'});
					},1200);
				},indexObj.app);
			})();
			//load experience
			var experience = (function(){
				var _ii2 = 0,arr = [];
				arr[_ii2++] = p +'/images/index-foot.jpg';
				arr[_ii2++] = p +'/images/index-experience-title.png';
				arr[_ii2++] = p +'/images/index-experience-text.png';
				arr[_ii2++] = p +'/images/index-learn-more.png';

				loadimgs(arr,function(){
					indexObj.experience = true;
					$('.index-experience').css('opacity',0);
					setTimeout(function(){
						$('.index-experience').css('opacity',1);
						$('.index-experience').css('background-image','url('+arr[0]+')');
						tiyan_auto();
						$('.index-experience-title').css('background-image','url('+arr[1]+')');
						$('.index-experience-text').css('background-image','url('+arr[2]+')');
						$('.learn_more2').css('background-image','url('+arr[3]+')');
						tiyan_auto();
						setTimeout(function(){
							$('.index-experience-title').css({'opacity':'1'});
							$('.index-experience-text').css({'opacity':'1'});
							$('.index-learn-more2').css({'opacity':'1'});
						},1200);
					},800)
				},indexObj.experience)
			})();
			//load sport
			var sport  = (function(){
				if(h<878){
						var arr  = [p+'/images/index-sport.jpg',p+'/images/index-sport-timeline.png',
					p+'/images/index-sport-title.png',p+'/images/index-sport-text2.png',p+'/images/index-learn-more.png'];
				}else{
					var arr  = [p+'/images/index-sport.jpg',p+'/images/index-sport-timeline.png',
					p+'/images/index-sport-title.png',p+'/images/index-sport-text.png',p+'/images/index-learn-more.png'];
				}
				
				loadimgs(arr,function(index){
					indexObj.sport = true;
					$('.index-sport').css('opacity',0);
					setTimeout(function(){
						$('.index-sport').css('opacity',1);
						$('.index-sport').css('background-image','url('+arr[0]+')');
						$('.index-sport-timeline').css('background-image','url('+arr[1]+')');
						$('.index-sport-title').css('background-image','url('+arr[2]+')');
						$('.index-sport-text').css('background-image','url('+arr[3]+')');
						$('.learn_more12').css('background-image','url('+arr[4]+')');
						_aa();
					},800)

				},indexObj.sport)
			})();
			//load data
			var data = (function(){
				var arr  = [p+'/images/index-data.jpg',p+'/images/index-data-title.png',
				p+'/images/index-data-text.png',p+'/images/index-learn-more.png'];
				loadimgs(arr,function(){
					indexObj.data = true;
					$('.index-data').css('opacity',0);

					setTimeout(function(){
						$('.index-data').css('opacity',1);
						$('.index-data').css('background-image','url('+arr[0]+')');
						$('.index-data-title').css('background-image','url('+arr[1]+')');
						$('.index-data-text').css('background-image','url('+arr[2]+')');
						$('.learn_more0').css('background-image','url('+arr[3]+')');
						setTimeout(function(){
							$('.index-data-con').css('opacity',1);
						},1000);
					},800);
				},indexObj.data)
			})();
			//load phms
			var phms = (function(){
				var arr  = [p+'/images/index-phms-title.png',p+'/images/index-phms-text1.png',
				p+'/images/index-phms-text2.png',p+'/images/index-phms-iphone1.png',p+'/images/index-phms-iphone2.png',
				p+'/images/index-phms-iphone3.png'];
				loadimgs(arr,function(){
					$('.index-phms-con').css('background-image','none');
					indexObj.phms = true;
					$('.index-phms').css('opacity',0);
					setTimeout(function(){
						$('.index-phms').css('opacity',1);
						$('.index-phms-title').css('background-image','url('+arr[0]+')');
						$('.index-phms-text1').css('background-image','url('+arr[1]+')');
						$('.index-phms-text2').css('background-image','url('+arr[2]+')');
						$('.index-phms-left').css('background-image','url('+arr[3]+')');
						$('.index-phms-middle').css('background-image','url('+arr[4]+')');
						$('.index-phms-right').css('background-image','url('+arr[5]+')');
						setTimeout(function(){
							if(h>768){
								$('.index-phms-left').css('left','0');
								$('.index-phms-right').css('right','0');
							}else{
								$('.index-phms-left').css('left','140px');
								$('.index-phms-right').css('right','140px');
							}
							
						},800)
					},800)
						
				},indexObj.phms)
			})();
		}

		//高度在600左右时候
		$('.index-datu .Img-item-set').eq(0).css('background-position','50% 20%');

		/*var preVideo = "",pmask;
		$('.hover').unbind('click').bind('click',function(){

			var id = $(this).attr("data-id");
			var lens = $('.picooc-mask').length;
			
			if(lens < 1 || id != preVideo){

				if(pmask){
					pmask.close();
				}

				if(id == "v1"){
					var video_src = "picooc2.mp4";
				}else{
					var video_src = "designUnder.mp4";
					console.log('1:'+video_src)
				}
				
				console.log('2:'+video_src)
				pmask = new Picooc.building.Mask({
					html:'<span class="video_close" style="left:-60px;top:-60px;"></span>'
							+'<video controls="controls" width="768px" height="405px" id="videos">'
							+'您的浏览器不支持 video 标签。'
							+'<source src="'+Picooc.imgRootVideo+'/videos/'+video_src+'" type="video/mp4"/>'
							//+'<source src="'+Picooc.imgRootVideo+'/videos/" type="video/ogg"/>'
							+'</video>'
				});	
				pmask.init();
				$('.picooc-mask').css('background','#fff').css('opacity',1);
				
			}else if( lens > 0 && id == preVideo){
				//p.close();
				$('.picooc-win').css('display','');
				$('.picooc-mask').css('display','');
			}
			
			var videos = document.getElementById('videos');
				videos.play();

			preVideo = id;
			
			$('.video_close').unbind('click').bind('click',function(){
				var videos = document.getElementById('videos');
				videos.pause();
				$('.picooc-win').css('display','none');
				$('.picooc-mask').css('display','none');
			})

		});*/
	}

	return {
		init:_init
	}
})();

Picooc.news = (function(){

})();
Picooc.app = (function(){

	function app_init(){
		var s1 = new Scroll(
			"#app_win1",
			"#app_sp_win1",
			['/images/app_signs_img1.png','/images/app_signs_img2.png','/images/app_signs_img3.png'],
			1000);
		s1.init();

		var s2 = new Scroll(
			"#app_win2",
			"#app_sp_win2",
			['/images/app_sport_img1.png','/images/app_sport_img2.png'],
			2221);
		s2.init();

		var s3 = new Scroll(
			"#app_win3",
			"#app_sp_win3",
			['/images/app_body_round_img1.png','/images/app_body_round_img2.png','/images/app_body_round_img3.png'],
			3211);
		s3.init();

		var s4 = new Scroll(
			"#app_win4",
			"#app_sp_win4",
			['/images/app_trend_img1.png','/images/app_trend_img2.png','/images/app_trend_img3.png'],
			4212);
		s4.init();

		var s5 = new Scroll(
			"#app_win5",
			"#app_sp_win5",
			['/images/app_social_contact_img1.png','/images/app_social_contact_img2.png'],
			5123);
		s5.init();


	}

	function Scroll(box,btnBox,imgUrls,delay){
		this.imgUrls = imgUrls;
		this.delay = delay;
		this.index = 0;
		this.box = box;
		this.btnBox = btnBox;
		this.tt = null;
	}
	Scroll.prototype = {
		init:function(){
			var _this = this;
			if(this.tt){
				clearTimeout(_this.tt)
			}else{
				this.createView(this.box,this.btnBox);
			}
			
		},
		createView:function(box,btnBox){
			var i,len = this.imgUrls.length,
				strCon ='',
				strBtn = '';

			var _this = this;

			this.box = document.getElementById(box.replace('#',''));
			this.btnBox = document.getElementById(btnBox.replace('#',''));

			for(i=0;i<len;i++){
				
				if(this.index == i){
					strBtn+="<span class='cur temp_sp_class'></span>";
					strCon+="<img class='temp_img_class' src="+Picooc.imgRoot+this.imgUrls[i]+" style='left:0;'/>";
				}else{
					strBtn+="<span class='temp_sp_class'></span>";
					strCon+="<img class='temp_img_class' src="+Picooc.imgRoot+this.imgUrls[i]+" style='left:100%;'/>";
				}
			}
			this.box.innerHTML = strCon;
			this.btnBox.innerHTML = strBtn;

			//this.eleBox = $("#"+_this.box+" .temp_img_class");
			//this.eleBtnBox = $("#"+_this.btnBox+" .temp_sp_class");

			this.eleBox = $(_this.box).children();
			this.eleBtnBox = $(_this.btnBox).children();

			this.len = this.eleBox.length;
			

			var srcs = this.imgUrls;
			var i,len2=srcs.length,COUNT=0;
			for(i = 0;i<len2;i++){
				var _src = srcs[i];
				var img = new Image();
				img.src = Picooc.imgRoot+_src;
				img.onload = function(){
					COUNT+=1;
					if(COUNT == len){
						//自动切换
						setTimeout(function(){
							_this.autorun(_this.eleBox,_this.eleBtnBox);
						},_this.delay);
						
						//绑定点击事件
						_this.eleBtnBox.unbind('click').bind('click',function(){
							if(_this.t){
								clearTimeout(_this.t);
							}
							if(_this.t2){
								clearTimeout(_this.t2);
							}
							var index = $(this).index();
							_this.updateImg(_this.eleBox,index);
							_this.updateBtn(_this.eleBtnBox,index);

							_this.t2 = setTimeout(function(){_this.autorun(_this.eleBox,_this.eleBtnBox)},5000);
						})
					}
				}
			}
			
		},
		autorun:function(a,b){
			var i = this.index;
			this.t = null;
			var _this = this;
			function run(){	
				_this.t = setTimeout(run,5000);
				i+=1;
				_this.updateBtn(b,i);
				if(i>a.length-1){
					a.eq(0).css('left','100%');
					a.eq(_this.index).animate({'left':'-100%'},'',function(){
						a.eq(_this.index).css('left','100%');
					});
					a.eq(0).animate({'left':'0'},'',function(){
						i = 0;
						_this.index = i;
						_this.updateBtn(b,i);
					});
				}else{
					a.eq(i).css({'left':'100%'});
					a.eq(_this.index).animate({'left':'-100%'},'',function(){
						a.eq(_this.index).css({'left':'100%'});
					});
					a.eq(i).animate({'left':'0'},'',function(){
						_this.index = i;
						_this.updateBtn(b,i);
					});
				}
				
			}
			run();
		},
		updateBtn:function(ele,index){
			ele.eq(index).addClass('cur').siblings().removeClass('cur');
		},
		updateImg:function(ele,index){
			var _this = this;
			var i = this.index;
			//alert('当前下标i:'+i);
			//alert('点击下标index:'+index);

			if(i<index){
				//alert('//当前下标小于点击下标')
				ele.eq(index).css('left','100%');
				ele.eq(i).animate({left:'-100%'});
				ele.eq(index).animate({left:'0'},'',function(){
					//更新当前下标
					_this.index = index;
				})
				
			}else if(i>index){
				//alert('//当前坐标大于点击下标')
				ele.eq(index).css('left','-100%');
				ele.eq(i).animate({left:'100%'},'',function(){
					//更新当前下标
					_this.index = index;
				});
				ele.eq(index).animate({left:'0'})
			}
		}
	}
	return {
		init:app_init
	}
})();

Picooc.userInfo = (function(){

})();

Picooc.aboutus = (function(){

})();