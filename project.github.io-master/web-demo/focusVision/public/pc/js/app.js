function application(){
	var _self = this;
	
	this.config = {
		api: '4DD845D1BB619BEEFB641EC49A7D8735',
		searchval: '请输入您要搜索的关键字',
		reg: {
			phone: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
			email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
		}
	}
	// 案例
	$('#icaseClassify a').bind({
		'mouseenter': function(){
			var _index = $(this).index();
			$('#icaseMain .list').eq(_index).show().siblings('.list').hide();
		}
	})
    
	// 顶部导航
    $("#nav").width($("#nav > li").length * $("#nav > li").width()); 
    $('#nav .nav2_box').each(function(index, element){
          if($(this).find('dd').length == 0){
            $(this).remove();
          }
          var nav2Wid = $(this).find('dd').length*$(this).find('dd a').innerWidth();
          $(this).css({width:nav2Wid,left:"50%", marginLeft:-nav2Wid/2});
    });
  $("#nav li").each(function(){
  	if($(this).index() < 4){
          if($(this).find(".nav2_box dd").length>=9){
                $(this).find(".nav2_box").css({marginLeft:-270});
          }
    }
  })


	$('#nav li').hover(function(){
			$(this).children('.nav2_box').stop(true, true).slideDown(200);
              if($(this).children('.nav2_box').length){
                $(".nav2_bgcolor").stop(true, true).slideDown(200);
              }
		},function(){
			$(this).children('.nav2_box').stop(false, false).slideUp(200);
          $(".nav2_bgcolor").stop(true, true).slideUp(200);
		})
	
    // 菜单
    $('#menu .drop').each(function(index, element){
        if($(this).children('li').length == 0){
			$(this).remove();
        }else{
            $(this).parent().addClass('isdrop');
        }
    })
    $('#menu dd > a').bind('click', function(e){
        if($(this).siblings('.drop').length == 0){
			//  超链接跳转
        }else{
            if($(this).siblings('.drop').is(':hidden')){
				$(this).parent().addClass('current').siblings().removeClass('current');
				$(this).siblings('.drop').stop(true, true).slideDown(200).end().parent('dd').siblings('dd').children('.drop').stop(false, false).slideUp(200);
            }else{
				$(this).parent().removeClass('current');
            	$(this).siblings('.drop').stop(false, false).slideUp(200);
            }
          	e.preventDefault();
        }
    })
    
    // 首页新闻切换
    $('#inews .tabed > *').bind('click', function(){
        $(this).addClass('current').siblings().removeClass('current');
        $('#inews .tabed').siblings('.main').children('*').eq($(this).index()).show().siblings().hide();
    })
    
	// 格式化电话号码
    $('[ig-phone]').each(function(index, element){
        var tel400 = $.trim($(this).text()), telLength = tel400.length;
        if(telLength == 11){  // 手机号码 OR 座机号码
            var firstNum = tel400.substr(0,1);
            if(firstNum == 0){
                var tel1 = tel400.substr(0, 4);
                var tel2 = tel400.substr(4, 7);
                tel400 = tel1+ "-" + tel2;
            }else{
                var tel1 = tel400.substr(0, 3);
                var tel2 = tel400.substr(3, 4);
                var tel3 = tel400.substr(7, 4);
                tel400 = tel1+ "-" + tel2 + "-" + tel3;
            }
        }else if(telLength == 12){
            var tel1 = tel400.substr(0, 4);
            var tel2 = tel400.substr(4, 8);
            tel400 = tel1+ "-" + tel2;
        }else if(telLength == 10){
            var tel1 = tel400.substr(0, 3);
            var tel2 = tel400.substr(3, 4);
            var tel3 = tel400.substr(7, 3);
            tel400 = tel1+ "-" + tel2 + "-" + tel3;
        }
        $(this).html(tel400);
    })
    
    // 加入收藏
	$('#addFavo').bind('click', function(){
		app.addFavorite($('title').html(), location.href, '');
	});
	
	// 返回顶部
	$('#top').bind('click', function(){
		$('body, html').animate({'scrollTop': 0}, 200);
	})
	
	// API验证
	if(typeof(_self.config.api) == 'undefined' || _self.config.api.substr(13,4) != 'BEEF'){
		return false;
	}
	
	this.scroller();
	this.searcher();
	this.toolbar();
	this.plugs();
	this.former();
	this.photo();
    this.album();
    this.bdmap();
  	this.icaseScroll();
  this.xuanfu();
}
application.prototype = {
	plugs: function(){
		// 百度分享-浮窗+图标
		window._bd_share_config={
			"common": {
				"bdSnsKey":{},
				"bdText":"",
				"bdMini":"2",
				"bdMiniList":false,
				"bdPic":"",
				"bdStyle":"0",
				"bdSize":"24"
			},
			"slide": {
				"type":"slide",
				"bdImg":"5",
				"bdPos":"left",
				"bdTop":"160.5"
			},
			"share": {}
		};
		with(document)0[(getElementsByTagName('head')[0]||body)
			.appendChild(createElement('script'))
			.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
		
		// 
	},
    xuanfu:function(){
  $(".xuanfu .leftClose").bind('click', function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active').siblings().show();
			}else{
				$(this).addClass('active').siblings().hide();
			}
   });
},
   icaseScroll:function(){
    var oCUl = $("#icaseScroll"), oCLi = oCUl.children("li"), oCLiLength = oCLi.length, oCLiLengthA = Math.ceil(oCLiLength/8), oMaxBox = $("#icaseMaxBox"),
        spanBox = oMaxBox.find(".spanBox"), spanHtml = '' , oUlWid = 1100, speed5 = 300, speed6 = 5000, t2 , n = 0;
    if(oCLiLengthA < 2){return false;}
    oCUl.width(oCLiLengthA*oUlWid);//设置宽度
	for(var i=0; i<oCLiLengthA; i++){
		if(i==0){ spanHtml += '<span class="curr"></span>'; }else{ spanHtml += '<span></span>'; }
	}
     spanBox.html(spanHtml);//追加span
    	oCUl.hover(function(){  clearInterval(t2); },function(){ t2 = setInterval(autoCase,speed6); });//清除定时器
       function autoCase(){
         if(n >= oCLiLengthA - 1){ n = 0; }else{n ++; }
         oCUl.stop().animate({left:-oUlWid*n},speed5);
      	 spanBox.children("span").eq(n).addClass("curr").siblings().removeClass("curr");
      };
     spanBox.children("*").click(function(){
           clearInterval(t2);
            n = $(this).index();
            oCUl.stop().animate({left:-oUlWid*n},speed5);
            $(this).addClass("curr").siblings().removeClass("curr");
        	t2 = setInterval(autoCase,speed6);
        });
      t2 = setInterval(autoCase,speed6);
  },
toolbar: function(){
		var $toolbar = $('#toolbar'),
			_self = this;
		
		$toolbar.find('.pointer').bind('click', function(){
			if($(this).hasClass('checked')){
				$(this).removeClass('checked').children('span').html('>>');
				$toolbar.animate({'right': 0}, 300);
			}else{
				$(this).addClass('checked').children('span').html('<<');
				$toolbar.animate({'right': -130}, 300);
			}
		})
		
		if(!_self.toolAuto){
			$toolbar.find('.pointer').children('span').html('<<');
			$toolbar.show();
		}else{
			$toolbar.find('.pointer').removeClass('checked').children('span').html('>>');
			$toolbar.show().animate({'right': 0}, 300);
		}
	},
    bdmap: function(){
        var func = function(){
        	if($(".BMap_bubble_title a").length < 1){
                setTimeout(func, 100);
              }else{
                $(".BMap_bubble_title a").attr({"target":"_blank"});
              }
            }
        func();  // 执行函数
    },
    album: function(){
		$("#albumList .item").click(function(){
            $("#dialogAlbum").show();
            var windowHeight = $(window).height(), windowWidth = $(window).width();
            create();
            var f = $(this).index()+1;
            funny(f);
        });
        function create(){
			var _html = '';
            $("#albumList .item").each(function(index, element){
				_html +='<li><table cellpadding="0" cellspacing="0" border="0" class="img"><tr><td align="center" valign="middle"><img src="'+ $(element).attr('url') +'" /></td></tr></table></li>'; 
            });
            $("#dialogAlbumContainer ul").html(_html).find("img");
        }
        function funny(f){
            var windowHeight = $(window).height(), windowWidth = $(window).width(), t, interval = 5000, speed = 300, n = f,	clones = $("#dialogAlbumContainer li").eq(0).clone(true),	N = $("#dialogAlbumContainer li").length+1, htmlTip = "", isAuto = false;
            $("#dialogAlbumContainer ul").append(clones);
            $("#dialogAlbumContainer ul").css({"width":N*windowWidth});
            $("#dialogAlbumContainer li").css({"width":windowWidth});
            // 自动生成tip标签
            for(var i=1; i<N; i++){
                if(i==f){
                    htmlTip += "<span class='cur'></span>";
                }else{
                    htmlTip += "<span></span>";
                }
            }
            $("#dialogAlbumTip").html(htmlTip);
            // 点击打开默认位置
            $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n-1))});
            // 执行函数
            var func = function(){
                if(n >= N){
                    $("#dialogAlbumContainer ul").css({"margin-left":0});
                    n = 1;
                    setTimeout(func, 0)
                }else if(n < 0){
                    n = N-2;
                    $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n+1))});
                    setTimeout(func, 0);
                }else{
                    n++;
                    $("#dialogAlbumContainer ul").stop().animate({"margin-left":(-windowWidth*(n-1))}, speed);
                    $("#dialogAlbumTip span").eq(n-1).addClass("cur").siblings().removeClass("cur");
                    if(n == N){
                        $("#dialogAlbumTip span").eq(0).addClass("cur").siblings().removeClass("cur");
                    }
                }
            }
            // 点击执行
            $("#dialogAlbumTip span").click(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
                n = $(this).index();
                $("#dialogAlbumContainer ul").animate({"margin-left":(-windowWidth*n)}, speed);

            });
            // 关闭.自动播放.左滑动.右滑动
            $("#dialogAlbum .close").click(function(){ $("#dialogAlbum").hide(); });
            $("#imgPlayAuto").click(function(){
                if(!isAuto){ t = setInterval(func, interval); isAuto=true; $(this).attr({"class":"play"}); }else{ clearInterval(t); isAuto=false; $(this).attr({"class":"plus"}); }
            });
            $("#dialogAlbum .left").click(function(){ n-=2; func(); });
            $("#dialogAlbum .right").click(function(){ func(); });
            $(window).resize(function(){
                windowHeight = $(window).height();
                windowWidth = $(window).width();
                $("#dialogAlbumContainer ul").css({"width":N*windowWidth});
                $("#dialogAlbumContainer li").css({"width":windowWidth});
                $("#dialogAlbumContainer ul").css({"margin-left":(-windowWidth*(n-1))});
            });
        }
    },
	photo: function(){
		var $photo = $('#productPhoto'),
			$original = $('#productPhoto .original img'),
			$prev = $('#productPhoto .prev'),
			$next = $('#productPhoto .next'),
			$thum = $('#productPhoto .thum dl'),
			index = 0,
			_os = 4,
			_size = 0,
			_width = 101;
		
		// 载入结构
        if(typeof(multigraph) != 'undefined'){
            var _html = '';
            $(multigraph).each(function(index, element){
                if(index == 0){
					_html += '<dd class="current"><img src="'+ element.src +'" title="'+ element.title +'" alt="'+ element.title +'" /></dd>';
                  	$original.attr({'src': element.src});
                }else{
					_html += '<dd><img src="'+ element.src +'" title="'+ element.title +'" alt="'+ element.title +'" /></dd>';
                }
            });
            $thum.html(_html);
            _size = multigraph.length;
        	$thum.width(_width*_size);
        };
		
		// 点击显示大图
		$photo.on('click', '.thum dd', function(){
			$(this).addClass('current').siblings().removeClass('current');
			$original.attr({'src': $(this).children('img').attr('src')});
		})
		
		// 左右翻页
		function fun(){
			$thum.animate({'left': -index*_width}, 300, function(){
				$prev.removeClass('nodrop');
				$next.removeClass('nodrop');
				if(index == (_size - _os)){
					$next.addClass('nodrop');
				}else if(index == 0){
					$prev.addClass('nodrop');
				}
			});
		}
		$prev.bind('click', function(){
			if(index > 0){
				index --;
				fun();
			}
		})
		$next.bind('click', function(){
			if(index < _size - _os){
				index ++;
				fun();
			}
		})
	},
	former: function(){
        var _self =this;
		$postform = $('#formPost');
		$postform.find('.txt, .text, .code').bind({
			'focus': function(){
				$(this).parent().addClass('onfocus');
				if ($(this).val() == $(this).attr('placeholder')) {
					$(this).val('');
				}
			},
			'blur': function(){
				$(this).parent().removeClass('onfocus');
				$('#jLog').hide();
				if ($(this).val() == '') {
					$(this).val($(this).attr('placeholder'));
				}
			},
			'keyup': function(){
				$('#jLog').hide();
			}
		});
		$postform.find('[type="submit"]').bind('click', function () {
			var $name = $postform.find('[name="Name"]'),
				$phone = $postform.find('[name="Phone"]'),
				$email = $postform.find('[name="Email"]'),
				$code = $postform.find('[name="txtImageCode"]');
			
			// 姓名
			if ($name.val() == '' || $name.val() == $name.attr('placeholder')) {
				app.jLog($name.attr('empty'), $name.offset().left, $name.offset().top);
				$name.focus();
				return false;
			}
			// 联系方式
			if ($phone.val() == '' || $phone.val() == $phone.attr('placeholder')) {
				app.jLog($phone.attr('empty'), $phone.offset().left, $phone.offset().top);
				$phone.focus();
				return false;
			}
			if (!$phone.val().match(_self.config.reg.phone)) {
				app.jLog($phone.attr('error'), $phone.offset().left, $phone.offset().top);
				$phone.focus();
				return false;
			}
			// 电子邮箱
			if (($email.val() != '' || $email.val() != $email.attr('placeholder')) && !$email.val().match(_self.config.reg.email)) {
				app.jLog($email.attr('error'), $email.offset().left, $email.offset().top);
				$email.focus();
				return false;
			}
			// 验证码
			if ($code.val() == '' || $code.val() == $code.attr('placeholder')) {
				app.jLog($code.attr('empty'), $code.offset().left, $code.offset().top);
				$code.focus();
				return false;
			}
		})
	},
	searcher: function(){
		var _self = this,
			isFocus = false;
        $('#SearchTxt').bind({
            'focus': function(){
                
            },
            'blur': function(){
                
            }
        })
		$('#SearchTxt').bind({
			'focus': function(){
				isFocus = true;
				$(this).val('');
			},
			'blur': function(){
				isFocus = false;
                if($(this).val() == ''){
					$(this).val(_self.config.searchval);
                }
			}
		})
		$('#SearchSubmit').bind('click', function(){
			if($('#SearchTxt').val() == '' || $('#SearchTxt').val() == $('#SearchTxt').attr('placeholder')){
				app.jAlert(_self.config.searchval);
				return false;
			}
			search();
		});
		$(document).keydown(function(event){
			event = event ? event : ( window.event ? window.event : null );
			if(event.keyCode == 13 && isFocus == true){
				$('#SearchSubmit').trigger('click');
			}
		});
        
        // 添加热门关键词
        $('#SearchLink a').each(function(){
          	$(this).attr({'href': $('#Searchtype').val() + '&where=Title:' + $(this).text()});
        })
	},
    addFavorite: function(title, url){
      try {
          window.external.addFavorite(url, title);
      }
      catch (e) {
         try {
           window.sidebar.addPanel(title, url, "");
        }
         catch (e) {
             alert('抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加');
         }
      }
    },
	scroller: function(){
		if($('#banner').length > 0){
			!function banner(){
				var $banner = $('#banner'),
					$list = $banner.children('.list'),
					$tip = $banner.children('.tip'),
					t,
					interval = 5000,
					speed = 1000,
					speed2 = 700,
					n = 0,
					N = $list.children('li').length;

				if($tip.length){
					var html = '';
					for(var i=0; i<N; i++){
						if(i==0){ html += '<span class="cur"></span>'; }else{ html += '<span></span>'; }
					}
					$tip.html(html);
				}
				function func(){
					if(n >= N-1){ n = 0; }else{	n ++; }
					$list.children('li').eq(n).css({'z-index':2}).stop().fadeIn(speed).siblings('li').css({'z-index':1}).stop().fadeOut(speed2);
					if($tip.length){
						$tip.children('*').eq(n).addClass('cur').siblings().removeClass('cur');
					}
				}
				$tip.children('*').click(function(){
					clearInterval(t);
					n = $(this).index()-1;
					func();
					t = setInterval(func, interval);
				})
				t = setInterval(func, interval);
			}()
		}
        
        // 首页新闻-单个滚动可触发
		if($('#icase .list2 .item').length > 3){
			!function(){
				var $id = $('#icase'),
                    $list = $id.find('.list2'),
					$prev = $id.find('.prev'),
					$next = $id.find('.next'),
					index = 0,
					_width = 241,
					_speed = 300,
					_size = $list.children('li').length,
					t,
					_interval = 5000;
				
                $list.append($list.html()).width(2*_width*_size);
                
				function fun(){
					if(index > _size){
						$list.css({'left': 0});
						index = 1;
                        fun();
					}else if(index < 1){
						$list.css({'left': -_size*_width});
						index = _size - 1;
                        fun();
                    }else{
                        $list.stop().animate({'left': -index*_width}, _speed);
                    }
				}
				$next.bind('click', function(){
					index --;
					fun();
				})
				$prev.bind('click', function(){
					index ++;
					fun();
				})
				
				$id.hover(
					function(){
						clearInterval(t);
					},
					function(){
						t = setInterval(function(){
							index ++;
							fun();
						}, _interval);
					}
				)
				
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
				
			}()
		}
		
		// 新闻滚动-单个滚动
		if($('#inewsImg .item').length > 1){
			!function(){
				var $id = $('#inewsImg'),
					$list = $id.find('.list'),
					$tip = $id.find('.tip'),
					t,
					index = 0,
					_size = $list.find('.item').length,
					_width = 425,
					_interval = 5000,
					_sped = 200;

				$list.append($list.html()).width(2*_size*_width);
				
				var html = '';
				for(var i=0; i<_size; i++){
					if(i==0){ html += '<span class="current"></span>'; }else{ html += '<span></span>'; }
				}
				$tip.html(html);
				
				function fun(){
					$list.stop().animate({'left': -index*_width}, _sped, function(){
						$tip.children('*').eq(index).addClass('current').siblings().removeClass('current');
						if(index == _size){
							$list.css({'left': 0});
							$tip.children('*').eq(0).addClass('current').siblings().removeClass('current');
							index = 0;
						}
					});
				}
				$tip.children('*').bind('click', function(){
					index = $(this).index();
					fun();
				})
                $id.bind({
                    'mouseenter': function(){
						clearInterval(t);
                    },
                    'mouseleave': function(){
						t = setInterval(function(){
                            index ++;
                            fun();
                        }, _interval);
                    }
                })
				
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
			}()
		}
		
		// 客户评价
		if($('#icomment .list .item').length > 2){
			!function(){
				var $id = $('#icomment'),
                    $list = $id.find('.list'),
					$prev = $id.find('.prev'),
					$next = $id.find('.next'),
					index = 0,
					_width = 560,
					_speed = 300,
					_size = $list.children('li').length,
					t,
					_interval = 5000;
				
                $list.append($list.html()).width(2*_width*_size);
                
				function fun(){
					if(index > _size){
						$list.css({'left': 0});
						index = 1;
                        fun();
					}else if(index < 1){
						$list.css({'left': -_size*_width});
						index = _size - 1;
                        fun();
                    }else{
                        $list.stop().animate({'left': -index*_width}, _speed);
                    }
				}
				$next.bind('click', function(){
					index --;
					fun();
				})
				$prev.bind('click', function(){
					index ++;
					fun();
				})
				
				$id.hover(
					function(){
						clearInterval(t);
					},
					function(){
						t = setInterval(function(){
							index ++;
							fun();
						}, _interval);
					}
				)
				
				t = setInterval(function(){
					index ++;
					fun();
				}, _interval);
				
			}()
		}
	},
	jAlert: function(info, title, callback){
		var _self = this,
			_html = '';
		
		if(typeof(title) == 'function'){
			callback = title;
			title = '温馨提示';
		}else if(title == null){
			title = '温馨提示';
		}
		
		_self.layout(1);
		
		_html += '<div class="dialog-alert" id="jAlear">';
		_html += '<div class="head">';
		_html += '<h2>'+ title +'</h2>';
		_html += '<a href="javascript:;" class="close"></a>';
		_html += '</div>';
		_html += '<div class="main">';
		_html += '<p>'+ info +'</p>';
		_html += '</div>';
		_html += '<div class="foot">';
		_html += '<a href="javascript:;" class="ok">我知道了</a>';
		_html += '</div>';
		_html += '</div>';		
				
		var $obj = $(_html);
		$obj.appendTo('body').show();
		$obj.find('.close')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			});
		$obj.find('.ok')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(true);
				}
			})
	},
	jConfirm: function(info, title, callback){
		var _self = this,
			_html = '';
		
		if(typeof(title) == 'function'){
			callback = title;
			title = '温馨提示';
		}else if(title == null){
			title = '温馨提示';
		}
		
		_self.layout(1);		
		
		_html += '<div class="dialog-confirm" id="jConfirm">';
		_html += '<div class="head">';
		_html += '<h2>'+ title +'</h2>';
		_html += '<a href="javascript:;" class="close"></a>';
		_html += '</div>';
		_html += '<div class="main">';
		_html += '<p>'+ info +'</p>';
		_html += '</div>';
		_html += '<div class="foot">';
		_html += '<a href="javascript:;" class="ok">确定</a>';
		_html += '<a href="javascript:;" class="cancel">取消</a>';
		_html += '</div>';
		_html += '</div>';		
				
		var $obj = $(_html);
		$obj.appendTo('body').show();
		$obj.find('.close')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			});
		$obj.find('.ok')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(true);
				}
			})
		$obj.find('.cancel')
			.bind('click', function(){
				_self.layout(0);
				$obj.hide().remove();
				if(callback){
					callback(false);
				}
			})
	},
	jLog: function(i, l, t){
		var _offsetX = 0, _offsetY = 44;
		if(i == null){
			i = '必填字段，请输入正确的内容';
		}
        if ($('#jLog').length) {
            $('#jLog').html(i + '<i></i>').show().css({ 'left': (l + _offsetX), 'top': (t + _offsetY) });
        } else {
            $('<div class="dialog-log" id="jLog">' + i + '<i></i></div>').appendTo('body').css({ 'left': (l + _offsetX), 'top': (t + _offsetY) });
        }
    },
	layout: function(u){
		if(u == 0){
			$('#dialogLayout').remove();
		}else{
			if(!$('#dialogLayout').length){
				$('<div class="dialog-layout" id="dialogLayout"></div>').appendTo('body').show();
			}
		}
	}
}
var app = new application();
// 设为首页
function SetHome(obj,url){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage(url);
   }catch(e){
	   if(window.netscape){
		  try{
			  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		 }catch(e){
			  alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
		  }
	   }else{
		alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
	   }
  }
};
$("#setHome").click(function(){
        SetHome(this, location.href);
});

function browser(){
 var plhh = window.devicePixelRatio
 var plie = window.screen.deviceXDPI
 var html ="<div class='plsb1'style='z-index: 999;width:100%; height:50px; line-height:50px; background:#FFC; position:fixed; top:0; left:0;'><span style=' width:1070px; height:50px; margin:0 auto; display:block'><h1 style='text-align:left; float:left; line-height:50px; font-size:18px; font-weight:blod; color:red;'>您的浏览器目前分辨率异常，会导致网站显示不正常，您可以键盘按“ctrl+数字0”组合键恢复初始状态。</h1><h2 style=' width:100px; height:30px; display:block; float:right; margin:10px 10px 0 0; background:#fff; text-align:center; line-height:30px; font-size:16px; font-weight:blod; color:red; border:1px solid #06f; cursor:pointer;'>点击关闭</h2></span></div>"
 if(plhh > 1 || plhh < 1 ){
  $("body").append(html);
 }else if(plhh = "undefined"){
  if(plie >96 || plie < 96){
   $("body").append(html);
  }else if(plie = 96){
   $(".plsb1").remove();
  }
 }
 var t = setTimeout('browser()',1000);
 $(".plsb1 span h2").click(function(){
  $(".plsb1").remove();
  clearInterval(t);
  setTimeout('browser()',10000);
 })
}
var broShiBie = new browser();
//图片滚动 ipro
function ipro(){
    if(!$(".iproduct").length){return false;}
    $(".iproduct ul,.icase ul").each(function(){
        var time=70,speed=2;
        var clone=$(this).html();
        var _this=$(this);
        $(this).prepend(clone);
        var len=$(this).find("li").length;
        var wid=$(this).find("li").width();
        $(this).css({"width":len*wid});//宽度
        var func=function(){
            var f=parseInt(_this.css("margin-left"));
            if(f<=(-len*wid/2)){
                _this.css({"margin-left":0});
            }else{
                _this.css({"margin-left":(f-speed)});
            }
        }
        //移动至触发
        $(this).parent().mouseenter(function(){
            clearInterval(t);
        }).mouseleave(function(){
            t=setInterval(func,time)
        });
        //计时器
        var t=setInterval(func,time);
    });
}
ipro(); //ipro