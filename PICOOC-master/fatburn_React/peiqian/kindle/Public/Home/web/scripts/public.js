if(Picooc == undefined){
	var Picooc = {};
}
//全局所有图片的路径
//Picooc.imgRoot = 'http://www.picooc.com/site/Public/Home/web';
Picooc.imgRoot ='http://1251087842.cdn.myqcloud.com/1251087842/web';
Picooc.imgRootVideo='http://www.picooc.com/site/Public/Home/web';
//组件
Picooc.building = (function(){ 
	/*
	弹出层 蒙版层
	config = {
		html:'<div>...</div>'
	}
	*/
	function Mask(config){
		this.config = config;
	}
	Mask.prototype = {
		init:function(){
			this.open();
		},
		createBox:function(csn){
			var ele = document.createElement('div');
				ele.className = csn;
			return ele;
		},
		open:function(){

			var doc = document.body;
			this.box = this.createBox('picooc-mask');
			doc.appendChild(this.box);
			//this.box.tween({style:'opacity',begin_value:0,end_value:0.4})

			this.con = this.createBox('picooc-win');
			this.con.innerHTML = this.config.html;
			doc.appendChild(this.con);
			//this.con.tween({style:'opacity',begin_value:0,end_value:1})

			//重新为页面元素绑定tween方法
			//Picooc.tween.init();
			//给蒙版层添加动画
			//this.box.tween({style:'opacity',begin_value:0,end_value:0.4},function(){});
			//this.con.tween({style:'opacity',begin_value:0,end_value:1},function(){})
			this.box.style.opacity = 0.4;
			this.con.style.opacity = 1;
				
			var wid = this.con.offsetWidth,
				hei = this.con.offsetHeight;
			this.con.style.marginLeft=-(wid/2)+'px';
			this.con.style.marginTop=-(hei/2)+'px';

		},
		close:function(){
			var doc = document.body;
			doc.removeChild(this.box);
			doc.removeChild(this.con);
		}
	}
	/*地区
	  联动
	  反显
	*/
	var places =[{'province':'北京','city':['东城区','西城区','崇文区','宣武区','朝阳区','海淀区','丰台区','石景山区','门头沟区','房山区','通州区','顺义区','昌平区','大兴县','密云县','平谷县','怀柔县','延庆县']},
				{'province':'上海','city':['黄浦区','卢湾区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','金山区','松江区','青浦区','南汇区','奉贤区','崇明县']},
				{'province':'天津','city':['和平区','河西区','河东区','红桥区','南开区','河北区','西青区','津南区','北辰区','东丽区','汉沽','宝坻','静海','宁河','武清']},
				{'province':'重庆','city':['江北区','渝中区','江北区','南岸区','九龙坡区','沙坪坝区','北碚区','巴南区','大渡口区']}
				,{'province':'河北','city':['石家庄','唐山','秦皇岛','邯郸','邢台','保定','张家口','承德','沧州','廊坊','衡水']}
				,{'province':'山西','city':['太原','大同','阳泉','长治','晋城','朔州','晋中','运城','忻州','临汾','吕梁']}
				,{'province':'内蒙古','city':['呼和浩特','包头','乌海','赤峰','通辽','鄂尔多斯','呼伦贝尔','巴彦淖尔','乌兰察布','兴安','锡林郭勒','阿拉善']}
				,{'province':'辽宁','city':['沈阳','大连','鞍山','抚顺','本溪','丹东','锦州','营口','阜新','辽阳','盘锦','铁岭','朝阳','葫芦岛']}
				,{'province':'吉林','city':['长春','吉林','四平','辽源','通化','白山','松原','白城','延边']}
				,{'province':'黑龙江','city':['哈尔滨','齐齐哈尔','鸡西','鹤岗','双鸭山','大庆','伊春','佳木斯','七台河','牡丹江','黑河','绥化','大兴安岭']}
				,{'province':'江苏','city':['南京','无锡','徐州','常州','苏州','南通','连云港','淮安','盐城','扬州','镇江','泰州','宿迁']}
				,{'province':'浙江','city':['杭州','宁波','温州','嘉兴','湖州','绍兴','金华','衢州','舟山','台州','丽水']}
				,{'province':'安徽','city':['合肥','芜湖','蚌埠','淮南','马鞍山','淮北','铜陵','安庆','黄山','滁州','阜阳','宿州','巢湖','六安','亳州','池州','宣城']}
				,{'province':'福建','city':['福州','厦门','莆田','三明','泉州','漳州','南平','龙岩','宁德']}
				,{'province':'江西','city':['南昌','景德镇','萍乡','九江','新余','鹰潭','赣州','吉安','宜春','抚州','上饶']}
				,{'province':'山东','city':['济南','青岛','淄博','枣庄','东营','烟台','潍坊','威海','济宁','泰安','日照','莱芜','临沂','德州','聊城','滨州','菏泽']}
				,{'province':'河南','city':['郑州','开封','洛阳','平顶山','焦作','鹤壁','新乡','安阳','濮阳','许昌','漯河','三门峡','南阳','商丘','信阳','周口','驻马店']}
				,{'province':'湖北','city':['武汉','黄石','襄樊','十堰','荆州','宜昌','荆门','鄂州','孝感','黄冈','咸宁','随州','恩施']}
				,{'province':'湖南','city':['长沙','株洲','湘潭','衡阳','邵阳','岳阳','常德','张家界','益阳','郴州','永州','怀化','娄底','湘西']}
				,{'province':'广东','city':['广州','深圳','珠海','汕头','韶关','佛山','江门','湛江','茂名','肇庆','惠州','梅州','汕尾','河源','阳江','清远','东莞','中山','潮州','揭阳','云浮']}
				,{'province':'广西','city':['南宁','柳州','桂林','梧州','北海','防城港','钦州','贵港','玉林','百色','贺州','河池','来宾','崇左']}
				,{'province':'海南','city':['海口','三亚']}
				,{'province':'四川','city':['成都','自贡','攀枝花','泸州','德阳','绵阳','广元','遂宁','内江','乐山','南充','宜宾','广安','达州','眉山','雅安','巴中','资阳','阿坝','甘孜','凉山']}
				,{'province':'贵州','city':['贵阳','六盘水','遵义','安顺','铜仁','毕节','黔西南','黔东南','黔南']}
				,{'province':'云南','city':['昆明','曲靖','玉溪','保山','昭通','丽江','普洱','临沧','文山','红河','西双版纳','楚雄','大理','德宏','怒江','迪庆']}
				,{'province':'西藏','city':['拉萨','昌都','山南','日喀则','那曲','阿里','林芝']}
				,{'province':'陕西','city':['西安','铜川','宝鸡','咸阳','渭南','延安','汉中','榆林','安康','商洛']}
				,{'province':'甘肃','city':['兰州','嘉峪关','金昌','白银','天水','武威','张掖','平凉','酒泉','庆阳','定西','陇南','临夏','甘南']}
				,{'province':'青海','city':['西宁','海东','海北','黄南','海南','果洛','玉树','海西']}
				,{'province':'宁夏','city':['银川','石嘴山','吴忠','固原','中卫']}
				,{'province':'新疆','city':['乌鲁木齐','克拉玛依','吐鲁番','哈密','和田','阿克苏','喀什','克孜勒苏柯尔克孜','巴音郭楞蒙古','昌吉','博尔塔拉蒙古','伊犁哈萨克','塔城','阿勒泰']}
				,{'province':'香港','city':['香港']}
				,{'province':'澳门','city':['澳门']}
				,{'province':'台湾','city':['台北','高雄','基隆','台中','台南','新竹','嘉义']}];
	/*
	如果不传入，默认为以下参数
		province:'北京市',
		city:'西城区',
		pBox:province,
		cBox:city
	*/
	function Place(province,city,pBox,cBox){
		this.province = province || '北京';
		this.city = city || '西城区';
		this.pBox = pBox;
		this.cBox = cBox;
	}

	Place.prototype =  {
		init:function(){
			//填充province
			var province_options = this.createOption(places,'province');
			this.pBox.innerHTML = province_options;

			//根据省 填充city 
			var p = this.province,
				city_arr = this.getCity(p),
				city_html = this.createOption(city_arr);
			this.cBox.innerHTML = city_html;

			//根据参数 反显
			this.pBox.value = this.province;
			this.cBox.value = this.city;

			//实现联动
			this.fillCity();
		},
		getCity:function(value){
			var i,
				len = places.length;

			for(i = 0;i<len;i++){
				if(places[i].province == value){
					var _arr = places[i].city;	
					return _arr;
				}
			}
		},
		fillCity:function(){
			var that = this;
			this.pBox.onchange = function(){
				var value = this.value,
					citys = that.getCity(value);

				var options = that.createOption(citys);
				that.cBox.innerHTML = options;
			}
		},
		createOption:function(arr,key){
			var str ='',
				i,
				len = arr.length;

			for(i=0;i<len;i++){
				if(key){
					str+='<option value='+arr[i][key]+'>'+arr[i][key]+'</a>';
				}else{
					str+='<option value='+arr[i]+'>'+arr[i]+'</a>';
				}
			}

			return str;
		}
	}
	/*
	二次弹出提示框
	*/
	function Dialog(config){
		this.config = config;
	}
	Dialog.prototype = {
		init:function(){
			var div = this.dialogwin(),
				con = this.dialogcon(),
				_this = this;

			document.body.appendChild(div);
			div.innerHTML = con;

			this.position(div);

			$('.dialog-btn-rig').click(function(){
				_this.close(div);
			});
			$('.dialog-close').click(function(){
				_this.close(div);
			});

			$('.dialog-btn-left').click(function(){
				_this.config.callback();				
				_this.close(div);
			})
		},
		dialogwin:function(){
			if($('.dialog-win').length>0){
				$('.dialog-win').remove();
			}
			var div = document.createElement('div');
				div.className = 'dialog-win';
			return div;
		},
		dialogcon:function(){
			var _this = this.config;
			var str =  "<div class='dialog-title'>"
						+"	<em class='dialog-icon'></em>"
						+"	<span class='dialog-tips'>Picooc提示</span>"
						+"	<em class='dialog-close'>close</em>"
						+"</div>"
						+"<div class='dialog-con'>"
						+"	<div class='dialog-text'>"+_this.tips+"</div>"
						+"</div>"
						+"<div class='dialog-btn-con'>"
						+"	<a href='javascript:void(0)' class='dialog-btn dialog-btn-left'>确定</a>"
						+"	<a href='javascript:void(0)' class='dialog-btn dialog-btn-rig'>取消</a>"
						+"</div>";
			return str;
		},
		position:function(ele){
			
			var	_this = this.config;

			var o = _this.target.getBoundingClientRect();

			var wid = ele.offsetWidth,
				hei = ele.offsetHeight;
			ele.style.left = (o.left-wid/2)+'px';
			ele.style.top = (o.top+document.body.scrollTop+25)+'px';
		},
		close:function(ele){
			var doc = document.body;
			doc.removeChild(ele);
		}
	}
	/*大图滚动*/
	function Img_scroll(config){
		this.config =  config;
		this.index = 0;
		this.timeer = null;
		this.tt = null;
	}
	Img_scroll.prototype = {
		init:function(){

		var leftbtn = this.leftbtn(),
			rightbtn = this.rightbtn();
			leftbtn.appendTo($('body'));
			rightbtn.appendTo($('body'));

		var str ='',_this = this;
			str+=this.items();
			str+=this.navbtn();			
			str+=this.fill_model();
			this.config.box.html(str);
			//双十一增加功能
			/*var ele = $('.Img-item-set').eq(0);
			ele.css('cursor','pointer');
			ele.click(function(){
				window.location.href = "site/double_eleven_page";
			})*/
			//双十一增加功能结束
			this.update_navbtn();
		var data = this.config.data;
			var _style = _this.config.tab_style;
			if(_style == 'scroll'){
				_this.scroll();
				_this.loadimg(data,function(){
					//大图第一张加载完成之后
					$('.Img-item-set').eq(0).css({'background':'url('+data[0].src+') 50% 50% no-repeat'});
					var _cc = 0,len = data.length;
						for(var j=1;j<len;j++){
							(function(a){
								var m = new Image();
								m.src = data[a].src;
								m.onload = function(){
									var src = this.src;
									$('.Img-item-set').eq(a).css({'background':'url('+src+') 50% 50% no-repeat'});
									_cc+=1;
									if(_cc >= len-1){
										_this.tt = setTimeout(function(){
											_this.autoScrollScroll();
										},100);
									}
								}
								m.onerror = function(){
									var src = this.src;
									$('.Img-item-set').eq(a).css({'background':'url('+src+') 50% 50% no-repeat'});
									_cc+=1;
									if(_cc >= len-1){
										_this.tt = setTimeout(function(){
											_this.autoScrollScroll();
										},100);
									}
								}
							})(j);
						}
				});
			}else if(_style == 'fade'){
				_this.fade();
				_this.loadimg(data,function(){
					//大图第一张加载完成之后
					$('.Img-item-set').eq(0).css({'background':'url('+data[0].src+') 50% 20% no-repeat'});
					var _cc = 0,len = data.length;
						for(var j=1;j<len;j++){
							(function(a){
								var m = new Image();
								m.src = data[a].src;
								m.onload = function(){
									var src = this.src;
									$('.Img-item-set').eq(a).css({'background':'url('+src+') 50% 50% no-repeat'});
									_cc+=1;
									if(_cc >= len-1){
									
										_this.tt = setTimeout(function(){
											
											_this.autoFadeScroll();
										},100);
									}
								}
								m.onerror = function(){
									var src = this.src;
									$('.Img-item-set').eq(a).css({'background':'url('+src+') 50% 50% no-repeat'});
									_cc+=1;
									if(_cc >= len-1){
										_this.tt = setTimeout(function(){
											_this.autoFadeScroll();
										},100);
									}
								}
							})(j);
						}
				});
			}
		},
		leftbtn:function(){
			var sp = $("<span class='"+this.config.btn_left_class + " Img-left-btn' style='left:"+this.config.len+"px;'></span>");
			return sp;
		},
		rightbtn:function(){
			var sp = $("<span class='"+this.config.btn_right_class + " Img-right-btn' style='right:"+this.config.len+"px;'></span>");
			return sp;
		},
		items:function(){
			var csn = this.config.item_class,item_str='',len = this.config.data.length;
			var data = this.config.data;
			for(var i=0;i<len;i++){
				//如果需要点击跳转
				if(data[i].link){
					var linkurl =  "<a href='"+linkurl+"'></a>";
				}else{
					var linkurl = "";
				}
				if(i == 0){
					item_str += "<div class='Img-item-set' style='display:block;z-index:"+(len-i)+";background:url("+data[i].src+") center center no-repeat;'></div>";
				}else{
					item_str += "<div class='Img-item-set' style='z-index:"+(len-i)+";background:url("+Picooc.imgRoot+"/images/loader.gif) center center no-repeat;'></div>";
				}
			}
			return item_str;	
		},
		navbtn:function(){
			var sp ='<ul class="Img-navbtn">',i,len = this.config.data.length;
			for(i =0;i<len;i++){
				sp+='<li></li>';								
			}
			sp+='</ul>';			
			return sp;
		},
		loadimg:function(data,fun){
			var data = this.config.data;
			//第一张大图先加载成功
			var img = new Image();
			img.src = data[0].src;
			img.onload = function(){
				fun();
			}
		},
		update_navbtn:function(){
			var ind = this.index;
			$('.Img-navbtn li').eq(ind).addClass('Img-li-select').siblings().removeClass('Img-li-select');
		},
		fill_model:function(){
			//先隐藏
			var sp = "<div class="+this.config.midcon_class+" style='display:none;'></div>";
			return sp;
		},
		fade:function(){
			var data = this.config.data,
				i,
				len = data.length,
				_this = this;
			if(len<=1){
				return;
			}else{
				
				 window.hit_left = function(){
				 	console.log(_this)
				 	clearInterval(_this.timeer);
				 	if(_this.tt){
				 		clearTimeout(_this.tt);
				 	}
					$('.Img-left-btn').unbind('click');

					var ind = _this.index;
					var _ind = ind-1;
					if(_ind<0){
						_ind = len-1;
					}

					$('.Img-item-set').eq(ind).fadeOut('slow',function(){
						$('.Img-left-btn').bind('click',hit_left);
						data[_this.index].fn();
					});
					$('.Img-item-set').eq(_ind).fadeIn('slow');

					_this.index-=1;
					if(_this.index<0){
						_this.index = len-1;
					}
		
					_this.update_navbtn();
				}				
				$('.Img-left-btn').bind('click',hit_left);

				window.hit_right = function(){

					clearInterval(_this.timeer);
					if(_this.tt){
				 		clearTimeout(_this.tt);
				 	}
					$('.Img-right-btn').unbind('click');

					var ind = _this.index;
					var _ind = ind+1;
					if(_ind >len-1){
						_ind =0;
					}

					$('.Img-item-set').eq(ind).fadeOut('slow',function(){
						$('.Img-right-btn').bind('click',hit_right);
						
					});
					$('.Img-item-set').eq(_ind).fadeIn('slow');

					_this.index +=1;
					if(_this.index>len-1){
						_this.index = 0;
					}
					data[_this.index].fn();
					_this.update_navbtn();
				}
				$('.Img-right-btn').bind('click',hit_right);
			}
		},
		autoFadeScroll:function(){
			var data = this.config.data,
				i,
				len = data.length,
				_this = this;
			window.autoFade =function(){
				
				//执行自动滚动时候先移除左右的点击事件
				$('.Img-left-btn').unbind('click');
				$('.Img-right-btn').unbind('click');
				var ind = _this.index;
				var _ind = ind+1;
				if(_ind >len-1){
					_ind =0;
				}
				$('.Img-item-set').eq(ind).fadeOut('slow',function(){
					//自动滚动切换完成以后，重新绑定左右按钮的点击事件
					$('.Img-right-btn').bind('click',hit_right);
					$('.Img-left-btn').bind('click',hit_left);
				});
				$('.Img-item-set').eq(_ind).fadeIn('slow');

				_this.index +=1;
				if(_this.index>len-1){
					_this.index = 0;
				}
				data[_this.index].fn();
				_this.update_navbtn();

				
			}
			this.timeer = setInterval(autoFade,6121);
			//auto();
		},
		autoScrollScroll:function(){
			var data = this.config.data,
				i,
				len = data.length,
				_this = this;
			
			window.autoScroll = function(){
				
				//执行自动滚动时候先移除左右的点击事件
				$('.Img-left-btn').unbind('click');
				$('.Img-right-btn').unbind('click');
				var ind = _this.index;
				if(ind+1>len-1){
					var _ind = 0;
				}else{
					var _ind = ind+1;
				}
				$('.Img-item-set').eq(_ind).css({left:'100%'});
				$('.Img-item-set').eq(ind).animate({left:'-100%'},'1000',function(){
					//自动滚动切换完成以后，重新绑定左右按钮的点击事件
					$('.Img-right-btn').bind('click',hit_right);
					$('.Img-left-btn').bind('click',hit_left);

				});
				$('.Img-item-set').eq(_ind).animate({left:'0'},'1000',function(){});

				_this.index +=1;
				if(_this.index>len-1){
					_this.index = 0;
				}
				data[_this.index].fn();
				_this.update_navbtn();
				
			}
			this.timeer = setInterval(autoScroll,6121);
			
		},
		scroll:function(){
			var data = this.config.data,
				i,
				len = data.length,
				_this = this;
			if(len<=1){
				return;
			}else{
				window.hit_left = function(){
					clearInterval(_this.timeer);
					if(_this.tt){
				 		clearTimeout(_this.tt);
				 	}
					$('.Img-left-btn').unbind('click');

					var ind = _this.index;
					if(ind-1<0){
						var _ind = len-1;
					}else{
						var _ind = ind-1;
					}

					$('.Img-item-set').eq(_ind).css({left:'-100%'});
					$('.Img-item-set').eq(ind).animate({left:'100%'},'1000',function(){
						$('.Img-left-btn').bind('click',hit_left);
						data[_this.index].fn();
						
					});
					$('.Img-item-set').eq(_ind).animate({left:'0'},'1000',function(){});

					_this.index-=1;
					if(_this.index<0){
						_this.index = len-1;
					}
					
					_this.update_navbtn();
				}

				$('.Img-left-btn').bind('click',hit_left);
				
				window.hit_right = function(){
					clearInterval(_this.timeer);
					if(_this.tt){
				 		clearTimeout(_this.tt);
				 	}
					$('.Img-right-btn').unbind('click');

					var ind = _this.index;
					if(ind+1>len-1){
						var _ind = 0;
					}else{
						var _ind = ind+1;
					}

					$('.Img-item-set').eq(_ind).css({left:'100%'});
					$('.Img-item-set').eq(ind).animate({left:'-100%'},'1000',function(){
						$('.Img-right-btn').bind('click',hit_right);
					});
					$('.Img-item-set').eq(_ind).animate({left:'0'},'1000',function(){});

					_this.index +=1;
					if(_this.index>len-1){
						_this.index = 0;
					}
					data[_this.index].fn();
					_this.update_navbtn();
				}
				$('.Img-right-btn').bind('click',hit_right);

			}
		}
	}
	//数字向上滚动插件 html:<span id='index-steps-box'></span>
	function Num_scrollup(config){
		this.config = config;
		this.t = null;
	}
	Num_scrollup.prototype = {
		init:function(){
			var id = this.config.box,
				ss = this.create_view();
			$('#'+id).html(ss);
		},
		animate:function(arr_ele,end_value){
			var i,
				len = arr_ele.length;
			for(i=len-1;i>=0;i--){
				(function(j){
					this.t = setTimeout(function(){
						arr_ele[j].style.marginTop=end_value+'px';
						//arr_ele[j].tween({'style':'marginTop',begin_value:0,end_value:end_value,unit:'px'},function(){});
					},200*(len-j-1));					
				})(i);
			}
		},
		item:function(end_num){
			var str='';
			for(var i=0;i<10;i++){
				str+='<em>'+i+'</em>';
			}
			var ss = '<span>'+str+'<em>'+end_num+'</em></span>';
			return ss;
		},
		create_view:function(){
			var str='',
				code = this.config.num,
				i,
				len = code.length;
			for(i=0;i<len;i++){
				var _s = this.item(code[i]);
				str+=_s;
			}
			return str;
		}
	}
	//svg动态画半圆
	function DrawCircle(config){
	    this.config = config;
	}

	DrawCircle.prototype = {

	    init:function(){

	        var color = this.config.color;
	        var _this = this.config;
	        var that = this;

	        if(this.svg){
	        	this.svg.clear();
	        }

	        var svg = this.svg;
	        svg = Raphael(_this.box,_this.width,_this.height);
	        
	        var total = _this.total,
	            value = _this.value,
	            width = _this.width,
	            height = _this.height,
	            param = _this.param,
	            endTime = _this.endTime,
	            delay = _this.delay,
	            bg_border = _this.bg_border,	            
	            R = _this.R;

	        var center = {
	            x:width/2,
	            y:height/2
	        }

	        var circle = svg.circle(center.x, center.y, R);
	        	circle.attr("stroke-width", bg_border);
	        	circle.attr("stroke", "rgba(0,0,0,0.4)");

	        var R = _this.R2;
	        svg.customAttributes.arc = function(value,total,R){

	            var alpha = 360 / total * value,
	                a = (90 - alpha) * Math.PI / 180,
	                x = center.x + R * Math.cos(a),
	                y = center.x - R * Math.sin(a),
	                path;

	            var ss = center.x - 0.01;
	            
	            if (total == value) {
	                path = [["M", center.x, center.x - R], ["A", R, R, 0, 1, 1, ss, center.x - R]];
	            } else {
	                path = [["M", center.x, center.x - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
	            }
	            return {path: path, stroke: color.c};
	        }

	        function updateVal(value, total, R, hand,endTime) {
	            
	            hand.animate({arc: [value, total, R]}, endTime, ">",function(){});
	            
	        }

	       //var hor = svg.path().attr(param).attr({arc: [0, total, R+20]}).attr({ "stroke":"#c32ec3", "fill":"90-#fc6512-#fc7710-#fdce06-#ffe303"});;
           var hor = svg.path().attr(param).attr({arc: [0, total, R]});
           setTimeout(function(){
           	updateVal(value, total, R, hor,endTime);
           },delay); 

	         /*var circle = svg.circle(center.x, center.y, R-20);
	        	circle.attr("stroke-width", bg_border);
	        	circle.attr("stroke", "#fff");
	        	circle.attr("fill", "#fff");
	          */
	        return svg;
	    }
	}
	//数字滚动效果
	function Num_run(config){
		this.config = config;
		this.t = null;
	}
	Num_run.prototype = {
		init:function(){
			var id = this.config.box,
				ss = this.create_view();
			console.log(ss)
			$('#'+id).html(ss);
		},
		animate:function(arr_ele){
			var i,
				len = arr_ele.length,
				that = this;
			for(i=len-1;i>=0;i--){
				(function(j){
					this.t = setTimeout(function(){
						that.numadd(arr_ele[j]);
					},200*(len-j-1));					
				})(i);
			}
		},
		numadd:function(parent,num){
			var a = -1,t = null;
			function aa(){
				if(a<10){
					a+=1;
					t = setTimeout(aa,20);
					parent.innerHTML = a;
				}else{
					var n = parent.getAttribute('data-num');
					parent.innerHTML = n;
				}
			}
			aa();
		},
		item:function(endnum){
			var str='';
			for(var i=0;i<1;i++){
				str+='0';
			}
			var ss = '<span data-num='+endnum+'>'+str+'</span>';
			return ss;
		},
		create_view:function(){
			var str='',
				code = this.config.num,
				i,
				len = code.length;
			for(i=0;i<len;i++){
				str+=this.item(code[i]);
			}
			return str;
		}
	}
	function ring(elem) {
		this.init(elem);
	}
	ring.prototype = {
		init: function(elem) {

			this.num = 0;  				// 记录遍历到哪个位置
			this.startAngle = 0;
			this.endAngle = 0;

			this.createCvs(elem);
			this.createColor();
			this.anime();
		},
		createCvs: function(elem) {
			this.cvs = document.createElement("canvas");
			this.cvs.id = "ringCvs";
			this.cvs.width = 370;
			this.cvs.height = 370;

			this.ctx = this.cvs.getContext("2d");
			elem.appendChild(this.cvs);
			this.ctx.beginPath();
			this.ctx.lineWidth = 20;
			this.ctx.arc(185, 185, 175, 0, Math.PI * 2, true);
			this.ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
			this.ctx.stroke();
			this.ctx.closePath();
		},
		anime: function() {
			var self = this;
			setTimeout(function() {

				// var x = 185 + Math.sin(self.num*Math.PI/180)*185,
				// 	y = Math.sin((self.num+270)*Math.PI/180)*185 + 185,
				// 	endX = 185 + Math.sin(self.num*Math.PI/180)*168,
				// 	endY = Math.sin((self.num+270)*Math.PI/180)*168 + 185;

				self.ctx.beginPath();
				self.ctx.lineWidth = 2;
				self.ctx.strokeStyle = "rgba("+ self.colorData[self.num*4] +", "+ self.colorData[self.num*4+1] +", "+
							self.colorData[self.num*4+2] +", "+ self.colorData[self.num*4+3] +")";
				// self.ctx.moveTo(x, y);
				// self.ctx.lineTo(endX, endY);
				self.ctx.lineWidth = 18;
				self.ctx.arc(185, 185, 176, (self.num-90)*Math.PI/180, (self.num-90+1.5)*Math.PI/180, false);

				self.ctx.stroke();
				self.ctx.closePath();

				self.num++;
				if (self.num >= 270) {
					return;
				} else {
					self.anime();
				}
			}, 4.5);
		},
		createColor: function() {

			// 通过getImageData，获取RGBA的数组，连续的四个值为一个rgba值

			this.colorCvs = document.createElement("canvas");
			this.colorCvs.id = "colorCvs";
			this.colorCvs.style.display = "none";
			this.width = this.endAngle-this.startAngle;
			this.height = 1;
			document.getElementsByTagName("body")[0].appendChild(this.colorCvs);
			this.colorCtx = this.colorCvs.getContext("2d");

			var gradient = this.colorCtx.createLinearGradient(0, 0, 270, 0);
			gradient.addColorStop(0, "#fed904");
			gradient.addColorStop(0.33, "#ffe103");
			gradient.addColorStop(0.66, "#fd6d11");
			gradient.addColorStop(1, "#fd6711");

			this.colorCtx.fillStyle = gradient;
			this.colorCtx.rect(0, 0, 270, 1);
			this.colorCtx.fill();

			this.colorData = this.colorCtx.getImageData(0, 0, 270, 1).data;

		}
	}

	function showTips(config){// tips left top delaytime target
		var ele = $('<div>'+config.tips+'</div>');
			ele.addClass('errorTip');
			ele.appendTo($('body'));
			ele.css({
				left:config.left,
				top:config.top
			});
			if(config.delaytime!=undefined){
				setTimeout(function(){
					ele.remove();
				},config.delaytime*1000);
			}
			if(config.target){
				var wid = config.target.width(),
					hei = config.target.height()+4;
				ele.css({
					'width':wid,
					'height':hei,
					'line-height':hei+'px'
				});
			}
	}

	return {
		Mask:Mask,
		Place:Place,
		Dialog:Dialog,
		Img_scroll:Img_scroll,
		DrawCircle:DrawCircle,
		Num_scrollup:Num_scrollup,
		Num_run:Num_run,
		showTips:showTips,
		ring:ring
	}
})();

//正则
Picooc.regx = (function(){

	var nic_name_regx = /^(?!_)(?!.*?_$)[\（\）\(\)a-zA-Z0-9_\u4e00-\u9fa5]+$/,
		pwd_regx = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,
		mobile_regx =/^(13|14|15|16|17|18)\d{9}/,
		phone_regx = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/,
		quhao_regx = /\(\d{3,4}\)|/,
		address_regx = '',
		recevier_regx =nic_name_regx,
		code_regx =/[1-9]\d{5}(?!\d)/,
		yzma_regx = /^[1-9]\d*|0$/,
		int_regx = /^[0-9]*[1-9][0-9]*$/,
		email_regx = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
		reg_number = /^([a-zA-Z0-9]){15,20}$/;

	function show_error(target,tips_text){
		//var error_ele = $('<em class="errorText" style="display:block;margin:4px 10px 0 20px;"><span class="errorbg">&nbsp;</span>'+tips_text+'</em>');
		var error_ele = $('<em class="errorText" style="display:block;"><span class="errorbg">&nbsp;</span>'+tips_text+'</em>');
		var parent = target.parent();
		if(parent.children('em').hasClass('errorText')){
			parent.children('em').remove();
		}
		error_ele.appendTo(parent);
		target.removeClass('blue').addClass('red');
	}

	function remove_error(target){
		var parent = target.parent();
		if(parent.children('em').hasClass('errorText')){
			parent.children('em').remove();
			target.removeClass('red').removeClass('blue');
		}
	}
	function show_tips(target,tips_text){
		var error_ele = $('<em class="errorText2" style="display:block;"><span class="errorbg">&nbsp;</span>'+tips_text+'</em>');
		var parent = target.parent();
		if(parent.children('em').hasClass('errorText2')){
			parent.children('em').remove();
		}
		error_ele.appendTo(parent);
	}
	function remove_tips(target){
		var parent = target.parent();
		if(parent.children('em').hasClass('errorText2')){
			parent.children('em').remove();
			target.removeClass('red').removeClass('blue');
		}
	}
	//纳税人识别号
	function nsrnumber(target){
		var value = target.val(),
			state = false;

		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'不能为空');
			state = false;
		}else if(!reg_number.test(value)){
			show_error(target,'输入的识别号有误');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;	
	}
	//昵称
	function nick_name(target,tipWords){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'不能为空');
			state = false;
		}else if(!nic_name_regx.test(value)){
			if(tipWords){
				show_error(target,tipWords);
			}else{
				show_error(target,'输入的昵称有误');
			}
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//当前密码
	function now_pwd(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请填写当前密码');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//新密码
	function new_pwd(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请输入密码');
			state = false;
		}else if(!pwd_regx.test(value)){
			show_error(target,'请输入正确的密码格式');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//二次确认密码
	function new_pwd2(target,pre_target){
		var value = target.val(),
			value2 = pre_target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请再次输入密码');
			state = false;
		}else if(value2 != value){
			show_error(target,'两次输入不一致');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//手机号码
	function mobile(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请输入手机号');
			state = false;
		}else if(!mobile_regx.test(value)){
			show_error(target,'请输入正确的手机号');
			state = false;
		}else if(mobile_regx.test(value) && value.length == 11){
			state = true;
			remove_error(target);
		}
		return state;
	}
	//区号
	function quhao(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请输入区号');
			state = false;
		}else if(!quhao_regx.test(value)){
			show_error(target,'请输入正确的区号');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//电话号码
	function phone(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请输入电话号');
			state = false;
		}else if(!phone_regx.test(value)){
			show_error(target,'请输入正确的电话号');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//手机或电话
	function mobileOrphone(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请输入电话号');
			state = false;
		}else if(!phone_regx.test(value) && !mobile(target)){
			show_error(target,'请输入正确的电话号');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//手机与电话的结合
	function mobile_phone(_mobile,_quhao,_phone){
		var m_value = _mobile.val(),
			q_value = _quhao.val(),
			p_value = _phone.val(),
			v = q_value+p_value,
			state = false;

		if((m_value == '' || m_value == null || m_value == undefined) && (v == '' || v == null || v == undefined)){
			show_error(_mobile,'手机或电话至少填写一个');
			state = false;
		}else if(mobile(_mobile) && (v == '' || v == null || v == undefined)){//手机通过校验 电话为空
			remove_error(_mobile);
			state = true;
		}else if((m_value == '' || m_value == null || m_value == undefined) && quhao(_quhao) && phone(_phone)){//手机为空 电话通过校验
			remove_error(_mobile);
			state = true;
		}else if((m_value == '' || m_value == null || m_value == undefined) && !quhao(_quhao) && phone(_phone)){//手机为空 区号通不过
			show_error(_mobile,'请填写正确的区号');
			state = false;
		}else if((m_value == '' || m_value == null || m_value == undefined) && quhao(_quhao) && !phone(_phone)){//手机为空 电话通不过
			show_error(_mobile,'请填写正确的电话号码');
			state = false;
		}else if((m_value == '' || m_value == null || m_value == undefined) && !quhao(_quhao) && !phone(_phone)){//手机为空 电话通不过
			show_error(_mobile,'请填写正确的电话号码和区号');
			state = false;
		}else if(mobile(_mobile) && !quhao(_quhao) && !phone(_phone)){//手机为空 电话通不过
			show_error(_mobile,'请填写正确的电话号码和区号2');
			state = false;
		}else if(!mobile(_mobile) && !quhao(_quhao) && !phone(_phone)){//手机通不过 电话通不过
			//18210198857
			show_error(_mobile,'请填写正确的手机号');
			state = false;
		}else if(mobile(_mobile) && quhao(_quhao) && phone(_phone)){//手机通过 电话通过
			remove_error(_mobile);
			state = true;
		}else if(mobile(_mobile) && quhao(_quhao) && !phone(_phone)){//手机通过 区号通过 电话通不过
			show_error(_mobile,'请填写正确的电话号码');
			state = false;
		}else if(mobile(_mobile) && !quhao(_quhao) && phone(_phone)){//手机通过 区号通不过 电话通过
			show_error(_mobile,'请填写正确的区号');
			state = false;
		}else if(!mobile(_mobile) && (v == '' || v == null || v == undefined)){//手机通不过 电话为空
			show_error(_mobile,'请填写正确的手机号');
			state = false;
		}else{
			remove_error();
			state = true;
		}

		return state;
	}
	//收货人姓名
	function recevier_name(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'不能为空');
			state = false;
		}else if(!nic_name_regx.test(value)){
			show_error(target,'输入的收货人姓名有误');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//地址
	function address(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'地址不能为空');
			state = false;
		}else if(value.length<6){
			show_error(target,'至少输入6个字符');
			state = false;
		}else{
			remove_error(target);
			state = true;
		}
		return state;
	}
	//邮编
	function code(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'邮编不能为空');
			state = false;
		}else if(!code_regx.test(value)){
			show_error(target,'输入的邮编有误');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//验证码
	function yzma(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请填写验证码');
			state = false;
		}else if(!yzma_regx.test(value)){
			show_error(target,'验证码格式不正确');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//邮箱
	function email(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请填写邮箱');
			state = false;
		}else if(!email_regx.test(value)){
			show_error(target,'邮箱格式不正确');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//mobile email
	function mobile_email(target){
		var value = target.val(),
			state = false;
		if(mobile(target) || email(target)){
			state = true;
			remove_error(target);
		}else if(value == '' || value==null || value==undefined){
			show_error(target,'请填写手机号或邮箱');
			state = false;
		}else if(!mobile(target) && !email(target)){
			show_error(target,'请填写正确的手机号或邮箱');
			state = false;
		}
		return state;
	}
	//正整数
	function is_int(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'请填写数量');
			state = false;
		}else if(!int_regx.test(value)){
			show_error(target,'只能输入正整数');
			state = false;
		}else{
			state = true;
			remove_error(target);
		}
		return state;
	}
	//问题描述
	function description(target){
		var value = target.val(),
			state = false;
		if(value.length<=0 || value == '' || value == null || value == undefined){
			show_error(target,'描述不能为空');
			state = false;
		}else if(value.length<6){
			show_error(target,'至少输入6个字符');
			state = false;
		}else{
			remove_error(target);
			state = true;
		}
		return state;
	}

	function init(arr){
		var i,len = arr.length;
		for(i=0;i<len;i++){
			(function(j){
				var _ele = arr[j].target,
					_tipWords = arr[j].tipWords,
					fn = arr[j].fun,
					ew = arr[j].ew;

				var ee= arr[j].pre_target,
					ss = arr[j].second;

				if(ew){
					var _ele1 = arr[j].target1,
						_ele2 = arr[j].target2,
						_ele3 = arr[j].target3;
					ew.bind('blur',function(){fn(_ele1,_ele2,_ele3)});
				}else if(ss){
					_ele.bind('blur',function(){fn(_ele,ee)});
				}else if(_tipWords){
					_ele.bind('blur',function(){
						var a = fn(_ele,_tipWords);					
					});
					_ele.bind('focus',function(){
						_ele.addClass('blue');
					})
				}else{
					_ele.bind('blur',function(){
						var a = fn(_ele);					
					});
					_ele.bind('focus',function(){
						_ele.addClass('blue');
					})
				}
				
			})(i)
		}
	}

	function check(arr){
		var i,len = arr.length,aa = '';
		for(i=0;i<len;i++){
			(function(j){
				var _ele = arr[j].target,
					fn = arr[j].fun,
					ew = arr[j].ew,
					_tipWords = arr[j].tipWords,
					state;

				var ee= arr[j].pre_target,
					ss = arr[j].second;
				if(ew){
					var _ele1 = arr[j].target1,
						_ele2 = arr[j].target2,
						_ele3 = arr[j].target3;
					(function(){
						state = fn(_ele1,_ele2,_ele3);
					})();
				}else if(ss){
					state = fn(_ele,ee);
				}else if(_tipWords){
					state = fn(_ele,_tipWords);
				}else{
					(function(){
						state = fn(_ele);					
					})();
				}
				if(!state){
					aa+='false';
				}
  			})(i)
		}
		
		if(aa.length<=0 || aa.indexOf('false') == -1){
			return true;
		}else{
			return false;
		}
	}
	return {
		nick_name:nick_name,
		now_pwd:now_pwd,
		new_pwd:new_pwd,
		new_pwd2:new_pwd2,
		mobile:mobile,
		phone:phone,
		code:code,
		address:address,
		recevier_name:recevier_name,
		mobile_phone:mobile_phone,
		quhao:quhao,
		yzma:yzma,
		email:email,
		mobile_email:mobile_email,
		remove_error:remove_error,
		show_error:show_error,
		show_tips:show_tips,
		remove_tips:remove_tips,
		is_int:is_int,
		description:description,
		nsrnumber:nsrnumber,
		mobileOrphone:mobileOrphone,
		init:init,
		check:check
	}
})();

//数据
Picooc.data = (function(){
	function fajax(config,callback){
		$.ajax({
			url:config.url,
			type:config.type,
			data:config.data,
			success:function(data){
				callback(data);
			}
		})
	}
	return {
		fajax:fajax
	}
})();

//浏览器相关
Picooc.browser = (function(){
	function lessIE10(){
		var sUserAgent = navigator.userAgent,
			isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows"),
			isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") 
					|| (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");

			if(isWin){
				var _src = 'http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandaloneSetup.1405583715.exe';		
			}else if(isMac){
				var _src = 'http://dlsw.baidu.com/sw-search-sp/soft/52/25718/googlechrome.1395901312.dmg';
			}

		return _src;
		/*var _html = '<div class="browser_tips">您的浏览器版本太低，为了更好的体验，请安装谷歌浏览器。点击'
					+'<a href="'+_src+'" class="downloadGoogle">这里</a>'
					+'下载谷歌浏览器</div>';
		var m = new Picooc.building.Mask({html:_html});
			m.init();*/
	}
	function below_ie10(){
		navigator.sayswho = (function(){
		    var ua= navigator.userAgent, tem, 
		    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		    if(/trident/i.test(M[1])){
		        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		        return 'IE '+(tem[1] || '');
		    }
		    if(M[1]=== 'Chrome'){
		        tem= ua.match(/\bOPR\/(\d+)/)
		        if(tem!= null) return 'Opera '+tem[1];
		    }
		    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		    return M.join(':');
		})();
		var o = navigator.sayswho;
		var name = o.split(':')[0],
			verson = o.split(':')[1];
		if(name == 'MISE' && verson!='10'){
			lessIE10();
			var href = window.location.href;
			if(href.indexOf('version_tip.html') == -1){
				window.location.href = '/site/version_tip.html';
			}
		}else{
			var href = window.location.href;
			if(href.indexOf('version_tip.html') != -1){
				window.location.href = '/';
			}
		}
	}
	//检测如果为IE 并且为IE10以下
	below_ie10();
	return{
		src:lessIE10	
	}
})();

//动画
Picooc.tween = (function(){

	function Tween_start(config){
		
	}

	Tween_start.prototype = {
		init:function(){

			var allele = document.all,
				len = allele.length,
				i;
			var that = this;
			for(i=0;i<len;i++){
				(function(j){
					var ele = allele[j];
					ele.tween = function(config,callback){
						config.ele = ele;
						that.start(config,callback)
					}
				})(i)
			}
		},
		start:function(config,callback){
			var styles = config.style,
				ele = config.ele,
				fn = Tween.Quad.easeInOut;

			if(config.unit){
				var unit = config.unit;
			}else{
				var unit = '';
			}

			var t = 0,
				b = config.begin_value,
				c = config.end_value - b,
				d = 30;

			function a(){

				var tt = setTimeout(a,30);
				if(t<d){
					t++;
					ele.style[styles] = fn(t,b,c,d)+unit;
				}else{
					clearTimeout(tt);
					callback();
				}
				
			}
			a();
		}
	}
	/*
		此处初始化tween 可以
		ele.tween({'style':'width',begin_value:0,end_value:100,unit:'px'},function(){});
		这样调用
	*/
	function init(){
		$(document).ready(function(){
			var tw = new Tween_start();
				tw.init();
		})
	}
	
	return{
		init:init
	}
})();
Picooc.tween.init();
//结构初始化
Picooc.init = (function(){
	//鼠标进入
	$(".product").unbind('mouseover').bind('mouseover',function(event){
		//$(".head_product_area").css('display','block');
		$(".head_product_area").css('opacity','1').css('height','auto');
		//$(".head_product_area").css('background','rgba(255,255,255,0.7)').css('height','auto');
		$(".product").css('color','#00bbff');
		$(".product em").addClass("drop-bg1");
		
	})

	$(".product").unbind('mouseout').bind('mouseout',function(){
		$(".head_product_area").css({'opacity':'0','height':'0'});
		//$(".head_product_area").css({'background':'rgba(255,255,255,0)','height':'0'});
		$(".product").css('color','#666');
		$(".product em").removeClass("drop-bg1");
	})

	function _fun(){
		$(".head_product_area").unbind('mouseover').bind('mouseover',function(){
			$(".head_product_area").css('opacity','1').css('height','auto');
			$(".product").css('color','#00bbff');
			$(".product em").addClass("drop-bg1");
		});
		$(".head_product_area").unbind('mouseout').bind('mouseout',function(){
			$(".head_product_area").css({'opacity':'0','height':'0'});
			//$(".head_product_area").css({'background':'rgba(255,255,255,0)','height':'0'});
			$(".product").css('color','#666');
			$(".product em").removeClass("drop-bg1");
		})
	}
	_fun();

})();
Picooc.header = (function(){
	
	function scroll() {
		var body = $('body');
		if(!body.hasClass('index-body')){
			window.onscroll = function(){
				var h = document.body.scrollTop || document.documentElement.scrollTop;
				if(h>73){
					$('.head').addClass('new_head');
				}else{
					$('.head').removeClass('new_head');
				}

				if(h>0 && $('.go_to_top').length>0){
					$('.go_to_top').css('opacity','1').css('z-index','1000');
					jQuery('.go_to_top').unbind('click');
					jQuery('.go_to_top').click(function(){
					    jQuery('html, body').animate({scrollTop:0}, 'slow');
					    return false;
					});
				}else{
					$('.go_to_top').css('opacity','0')
				}
			}
		}
	}
	return {
		scroll:scroll
	}
})();






