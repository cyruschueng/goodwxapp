Picooc.index = {};

Picooc.index.href = (function(){

	var win = window;

	var href = win.location.href,
		a = href.indexOf('/CH/'),
		b = href.indexOf('/EN/'),
		c = href.indexOf('/AU/'),
		d = href.indexOf('/UK/');

	if(a == -1 && b == -1 && c == -1 && d == -1){

		win.location.href = 'CH/index_CH.html';

	}

})();

Picooc.index.datu = (function(){

	
	
})();

Picooc.index.sport = (function(){

	$('.sport-lef').click(function(){

		$('.sport-rig').css('z-index','1').stop(true,true).animate({'width':'50%'});
		
		$(this).css('z-index','100').stop(true,true).animate({'width':'100%'},'1000',function(){
			$('.sport-tips-mask').css({'width':'50%',left:'50%'}).fadeIn();
		});

	}).mouseout(function(){

		$('.sport-lef').css('z-index','1').stop(true,true).animate({'width':'50%'});
		$('.sport-tips-mask').fadeOut('1000',function(){
			$('.sport-lef').stop(true,true).animate({'width':'50%'});
		});
	})

	$('.sport-rig').click(function(){

		$('.sport-lef').css('z-index','1').stop(true,true).animate({'width':'50%'});
		$(this).css('z-index','100').stop(true,true).animate({'width':'100%'},'1000',function(){

			$('.sleep-tips-mask').css({'width':'50%',right:'50%'}).fadeIn();

		});

	}).mouseout(function(){

		$('.sport-rig').css('z-index','1').stop(true,true).animate({'width':'50%'});
		$('.sleep-tips-mask').fadeOut('1000',function(){
			$('.sport-rig').stop(true,true).animate({'width':'50%'});
		});

	})

})();

Picooc.index.svg = (function(){

	var hasInit = false;

	var $ = function(id){
		return document.getElementById(id);
	}
	
	function Tweens(ele,begin,change,len,styles){

		this.ele = ele;
		this.begin = begin;
		this.change = change;
		this.len = len;
		this.styles = styles;
		this.time = null;

	}

	Tweens.prototype = {
		move:function(fn){

			var b = this.begin,
				c = this.change,
				d = this.len,
				t = 0,
				styles = this.styles,
				ele = this.ele;

			function a(){
				if(t<d){
					t++;
					ele.style[styles] = fn(t,b,c,d) +'px';
					setTimeout(a,30);
				}

			}
			a();
			
		}
	}

	function DrawCircle(config){
		this.config = config;
	}

	DrawCircle.prototype = {

		init:function(){

			var color = this.config.color;
			var _this = this.config;
			var that = this;

			var svg = Raphael(_this.box,_this.width,_this.height);
			

			var total = _this.total,
				value = _this.value,
				width = _this.width,
				height = _this.height,
				param = _this.param,
				endTime = _this.endTime,
				delay = _this.delay,
				R = _this.R;

			var circle = svg.circle(86, 86, R);
				circle.attr("stroke-width", 8);
				circle.attr("stroke", "#ebebeb");

			svg.customAttributes.arc = function(value,total,R){
				var alpha = 360 / total * value,
		            a = (90 - alpha) * Math.PI / 180,
		            x = 86 + R * Math.cos(a),
		            y = 86 - R * Math.sin(a),
		            path;
		        if (total == value) {
		            path = [["M", 86, 86 - R], ["A", R, R, 0, 1, 1, 85.99, 86 - R]];
		        } else {
		            path = [["M", 86, 86 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
		        }
		        return {path: path, stroke: color.c};
			}

			function updateVal(value, total, R, hand,endTime) {
		        hand.animate({arc: [value, total, R]}, endTime, "elastic",function(){
		        	
		        });

		        setTimeout(function(){

		        	//绑定事件
		        	$(_this.box).onmouseover = function(){
			        	hand.stop().animate({transform: "s1.1 1.1 " + 100 + " " + 100}, '1200', "elastic");
			        }
			        $(_this.box).onmouseout = function(){
			        	hand.stop().animate({transform: "s1 1 " + 100 + " " + 100}, '1600', "elastic");
			        }

		        	hand.stop().animate({transform: "s1.1 1.1 " + 100 + " " + 100}, '1200', "elastic");
		        },parseInt(endTime)-1000)

		        setTimeout(function(){
		        	hand.stop().animate({transform: "s1 1 " + 100 + " " + 100}, '1600', "elastic");
		        },parseInt(endTime)-1000+500)

		    }

		    var hor = svg.path().attr(param).attr({arc: [0, total, R]});
    			setTimeout(function(){
    				updateVal(value, total, R, hor,endTime);
    			},delay);

		}
	}

	function createView(box,code){

		var code = code;
		var a = '';
		var list = function(num){

			var str='<span class="sp">';

			for(var i=0;i<10;i++){
				str+='<em>'+i+'</em>';
			}
			str+='<em>'+num+'</em>';

			str+='</span>';

			return str;
		}

		for (var i = 0; i < code.length; i++) {

			a += list(code[i]);
		};

		box.innerHTML = a;

		return code.length;

	}

	function init(){

		var endTime = {};
		var l1 = createView($('sp'),'123456');
		var l2 = createView($('sp2'),'1212');
		var l3 = createView($('sp3'),'90');

		var len1 = 30,
			len2 = 30,
			len3 = 30;

		endTime.one = l1*30*30;
		endTime.two = l2*30*30;
		endTime.three = l3*30*30;

		var delay = {
			one:0,
			two:'3000',
			three:'4900'
		}

		var sp = $('sp').getElementsByTagName('span');

		function m1_init(){
			for(var i =0,len = sp.length;i<len;i++){

				(function(j){

					setTimeout(function(){
						var hei = sp[j].offsetHeight;
						var m = new Tweens(sp[len-1-j],33,-(hei+6),30,'marginTop');
						m.move(Tween.Quad.easeOut);
					},j*500);
					
				})(i);

			}
		}

		function m2_init(){
			var sp2 = $('sp2').getElementsByTagName('span');
			for(var i =0,len = sp2.length;i<len;i++){

				(function(j){

					setTimeout(function(){
						var hei = sp2[j].offsetHeight;
						var m = new Tweens(sp2[len-1-j],33,-(hei+6),30,'marginTop');
						m.move(Tween.Quad.easeOut);
					},j*500);
					
				})(i);

			}
		}
	
		function m3_init(){
			var sp3 = $('sp3').getElementsByTagName('span');
			for(var i =0,len = sp3.length;i<len;i++){

				(function(j){

					setTimeout(function(){
						var hei = sp3[j].offsetHeight;
						var m = new Tweens(sp3[len-1-j],33,-(hei+6),30,'marginTop');
						m.move(Tween.Quad.easeOut);
					},j*500);
					
				})(i);

			}
		}

		setTimeout(function(){
			m1_init();
		},delay.one);

		setTimeout(function(){
			m2_init();
		},delay.two);

		setTimeout(function(){
			m3_init();
		},delay.three);

		var ss = new DrawCircle({
			box:'holder',
			width:172,
			height:172,
			total:100,
			value:70,
			R:70,
			color:{c:'#ffe400'},
			endTime:endTime.one,
			delay:delay.one,
			param : {stroke: "red", "stroke-width": 8}
		})
		

		var ss2 = new DrawCircle({
			box:'holder2',
			width:172,
			height:172,
			total:100,
			value:50,
			R:70,
			color:{c:'#ff8500'},
			endTime:endTime.two,
			delay:delay.two,
			param : {stroke: "red", "stroke-width": 8}
		})


		var ss3 = new DrawCircle({
			box:'holder3',
			width:172,
			height:172,
			total:100,
			value:60,
			R:70,
			color:{c:'#48dbb6'},
			endTime:endTime.three,
			delay:delay.three,
			param : {stroke: "red", "stroke-width": 8}
		})

		ss.init();
		ss2.init();
		ss3.init();

	}

	return {
		hasInit : hasInit,
		init : init
	}

})();

window.onscroll = function(){

	var _h = $('.index-svg')[0].getBoundingClientRect().top,
		winh = window.innerHeight;

	if(_h<=560){

		if(!Picooc.index.svg.hasInit){

			Picooc.index.svg.init();
			Picooc.index.svg.hasInit = true;

		}

	}
}
