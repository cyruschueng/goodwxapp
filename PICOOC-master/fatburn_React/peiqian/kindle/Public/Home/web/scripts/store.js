 Picooc.store = (function(){
	var store_con_btn = $('.store_con_btn');
	var cart_img = document.querySelector('.head_shopping_cart');
	var num = $('.num');
	store_con_btn.bind('click',addToCart);

	function addToCart(){
		if(!serverId){
			alert("登录后再购买！");
			return ;
		}
		var productId = $(this).attr('data-id');
		//获取购物车图标在页面中的位置
		var scrollP = document.body.scrollTop || document.documentElement.scrollTop;
		if(cart_img){
			var cart_img_position = cart_img.getBoundingClientRect();
			var self = $(this);
			var index = $(this).parent('li').index();

			var img = $('.store_img');

			img_position = img[index].getBoundingClientRect();

			var imgurl = img.eq(index).attr('src');

			var _style ='z-index:1200;'
				+'-webkit-transition:all 1s ease;-moz-transition:all 1s ease;-o-transition:all 1s ease;-ms-transition:all 1s ease;'
				+'transition:all 1s ease;'
				+'position:absolute;'
				+'width:165px;height:165px;'
				+'background-image:url('+imgurl+');'
				+'background-size:100% 100%;'
				+'left:'+(img_position.left)+'px;top:'+(img_position.top+scrollP)+'px;';


			var div = $('<div style="'+_style+'"></div>');
			div.appendTo($('body'));

			var targetP = {
				x:cart_img_position.left-18-43,
				y:cart_img_position.top+scrollP-31-50
			}
			//运动到购物车 1100毫秒后移除
			setTimeout(function(){
				div.css({'left':targetP.x+'px',
						'top':targetP.y+'px',
						'-webkit-transform':'rotate(1080deg) scale(0)',
						'-moz-transform':'rotate(1080deg) scale(0)',
						'-ms-transform':'rotate(1080deg) scale(0)',
						'-o-transform':'rotate(1080deg) scale(0)',
						'transform':'rotate(1080deg) scale(0)',
						});

				setTimeout(function(){
					div.remove();
				},1100);
			},100);
		}
		
		$.post('/index.php?s=/Home/Cart/add.html',{id:productId},function(data){
			if(data.state == 1){
				
				var _s = parseInt(num.html());
				_s+=1;
				num.html(_s);
			}else{
//				window.location.href = data.url;
				//alert(data.info);
			}
		})
	}

})();