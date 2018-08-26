
Picooc.user = {};

Picooc.user.load = (function(){

	function router(){

		var _router = [{
			name:'user_Info_CH',
			url:'user_info_CH.html',
			index:4
		},{
			name:'user_Order_CH',
			url:'user_order_CH.html',
			index:1
		},{
			name:'user_Back_CH',
			url:'user_back_CH.html',
			index:3
		},{
			name:'user_Address_CH',
			url:'user_address_CH.html',
			index:2
		},{
			name:'user_Account_CH',
			url:'user_account_CH.html',
			index:0
		}];

		return _router;
	}

	function controller(){

		//页面刷新的时候
		var href = window.location.href,
			rs = router(),
			i,
			len = rs.length;

		for(i=0;i<len;i++){
			if(href.indexOf(rs[i].name)!=-1){
				nav_btn_selected(rs[i].index);
				$('#userIframe').attr('src','user_center/'+rs[i].url);
				return;
			}
		}
		
		//$('#userIframe').attr('src','user_center/user_account_CH.html');

	}

	function add_hash(href){
		var rs = router(),
			i,
			len = rs.length;

		for(i=0;i<len;i++){
			if(href.indexOf(rs[i].url)!=-1){
				window.location.hash = rs[i].name;
				return;
			}
		}
	}

	function nav_btn_selected(index){

		$('.user_nav a').removeClass();
		$('.user_nav a').eq(index).addClass('cur');

	}

	//切换个人中心的页面
	$('.user_nav a').bind('click',function(){

		$(this).addClass('cur').siblings().removeClass();

		var href = $(this).attr('href');
		add_hash(href);

	})
	
	return {
		init:controller
	}

})();



