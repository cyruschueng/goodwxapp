$(function() {
	if(top.location.href.indexOf('index.html')<0) {
		window.location.href = '../login.html';
	}
	$.ajaxSetup({
		xhrFields: {
	       withCredentials: true
	    }
	});
}); 
function loginDialog() {
	var dialogContent = '用户未登录，请先登录。';
	if(localStorage.userName){
		dialogContent = '登录超时，请重新登录。';
	}
	dialogContent += '<div class="loginDialog">'+
				'<div class="input-item user">'+
					'<span class="input-item-ico user-ico">'+
					'</span>'+
					'<input type="text" id="userName" class="user" placeholder="用户名">'+
				'</div>'+
				'<div class="input-item pwd">'+
					'<span class="input-item-ico pwd-ico">'+
					'</span>'+
					'<input type="password" id="password" class="pwd" placeholder="密码">'+
				'</div>'+
			'</div>';
	var d = new Dialog({
		title: '登录', 
		content: dialogContent, 
		ok: function($dialog) {
			var data = {
				userName: $dialog.find('#userName').val(),
				password: $dialog.find('#password').val()
			};
			if(!data.userName || !data.password) {
				alert('用户名或密码不能为空。');
				return;
			}
			$.ajax({
				type: 'post',
				url: url_root + '/auth/login',
				data: data,
				success: function(data) {
					if(data.result == 0 ){
						$('.main-header .name').html(data.data.userName);
					} else {
						alert('登录失败，请重新登录。');
					}
				}
			});
		}
	});
}