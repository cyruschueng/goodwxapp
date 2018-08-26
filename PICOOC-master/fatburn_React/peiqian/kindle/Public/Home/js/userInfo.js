Picooc.userInfo = (function(){

	/*var btn = $('.user_upload_btn')[0],
		preview = $('.user_preview')[0];
	Picooc.uploadImg.init({
		btnId:btn,
		previewId:preview
	})

	Picooc.crop.init({
		previewId:preview
	})*/

	$('#user_mesg_change').click(function(){

		$('.user_info_area').eq(0).addClass('display-none');
		$('.user_info_area').eq(1).removeClass('display-none');

		$(this).html('保存');
		var name = $('.user_name_auto').html(),
			email = $('.user_email_auto').html(),
			mobile = $('.user_mobile_auto').html(),
			sex = $('.user_sex_auto').html(),
			qq = $('.user_qq_auto').html(),
			src = $('.user_photo_auto').attr('src');
		$('.user_name').val(name);
		$('.user_email').val(email);
		$('.user_mobile').val(mobile);
		if(sex == '男'){
			$('.input_radio').eq(0).attr('checked',true);
		}else{
			$('.input_radio').eq(1).attr('checked',true);
		}
		
		$('.user_qq').val(qq);
		$('.head_portrait_pic img').attr('src',src);

	})

	//正则校验
	var common = Picooc.common,
		regx = common.regx;

	function user_name(target){

		var val = target.val(),
			parent = target.parent('div'),
			state='';

		if(regx.isEmpty(val)){

			state = false;
			common.showtips(target,'不能为空');

		}else if(val.length>=1 && val.length<=20){
			if(!regx.is_forbid(val)){

				common.showtips(target,'不允许有特殊字符');
				state = false

			}else{

				state = true;
				common.removetips(target);

			}
		}else{

			state = false;
			common.showtips(target,'长度为5-20之间');

		}

		return state;

	}

	function user_mobile(target){

		var val = target.val(),
			parent = target.parent('div'),
			state='';

		if(regx.isEmpty(val)){

			state = false;
			common.showtips(target,'不能为空');

		}else if(!regx.check_mobile(val)){

			state = false;
			common.showtips(target,'格式不正确');

		}else{

			state = true;
			common.removetips(target);

		}

		return state;

	}

	function user_qq(target){

		var val = target.val(),
			parent = target.parent('div'),
			state='';

		if(regx.isEmpty(val)){
            common.removetips(target);
            return true;
			state = false;
			common.showtips(target,'不能为空');

		}else if(!regx.isQQ(val)){

			state = false;
			common.showtips(target,'格式不正确');

		}else{

			state = true;
			common.removetips(target);

		}

		return state;
	}
	$('#user_mesg_sure').click(function(){

		var i =0,arr = [];
		arr[i++] = user_name($('.user_name'));
		//arr[i++] = user_mobile($('.user_mobile'));
		arr[i++] = user_qq($('.user_qq'));

		var str = arr.join(',');
		if(str.indexOf('false')!=-1){
			return false;
		}else{
			$(this).closest('form').submit();
		}

	})

	$('.user_name').bind('blur',function(){
		user_name($(this))
	});

	$('.user_mobile').bind('blur',function(){
		user_mobile($(this))
	});

	$('.user_qq').bind('blur',function(){
		user_qq($(this))
	});

	$('.change_password_btn').click(function(){
        remoteurl = '../user_center/user_change_mm.html';
        if($(this).attr('remote')){
            remoteurl = $(this).attr('remote');
        }
		//修改密码
		common.fajax({
	            url:remoteurl,
	            type:'get',
	            data:''
	    },function(data){

	    	var _mask = common.mask({
			    		diy:true,
			    		htm:data
			    	});

	    	//移除弹出框
	        var bd = $('#user_close', parent.document);
	        

	        bd.click(function(){

	            _mask.remove();

	        });

	        //校验
			init_check();

	    });

	});
	function oldpwd(target){
        var _state = false;
        var val = target.val();
        if(regx.isEmpty(val)){
            common.showtips(target,'原始密码不为空');
            _state = false;
        }else if(!regx.isPwd(val)){
            common.showtips(target,'请输入正确的密码格式');
            _state = false;
        }else{
        	_state = true;
        	common.removetips(target)
        }

        return _state;
    }

    function newpwd(target){
    	var _state = false;
        var val = target.val();
        if(regx.isEmpty(val)){
            common.showtips(target,'新密码不能为空');
            _state = false;
        }else if(!regx.isPwd(val)){
            common.showtips(target,'请输入正确的密码格式');
            _state = false;
        }else if(val.length>22 || val.length<6){
        	common.showtips(target,'长度为6-22个字符');
            _state = false;
        }else{
        	_state = true;
        	common.removetips(target)
        }

        return _state;
    }

    function newpwd2(target1,target2){
    	var _state = false;
        var val1 = target1.val();
        var val2 = target2.val();
        if(regx.isEmpty(val2)){
            common.showtips(target2,'新密码不能为空');
            _state = false;
        }else if(!regx.isPwd(val2)){
            common.showtips(target2,'请输入正确的密码格式');
            _state = false;
        }else if(val1 != val2){
        	 common.showtips(target2,'与上次输入密码不一致');
            _state = false;
        }else{
        	_state = true;
        	common.removetips(target2)
        }

        return _state;
    }
	function init_check(){

        var _oldpwd = $('.user_oldpwd').length == 0 ? $('.user_oldpwd',window.top.document) : $('.user_oldpwd'),
            _newpwd = $('.user_newpwd').length == 0 ? $('.user_newpwd',window.top.document) : $('.user_newpwd'),
            _newpwd2 = $('.user_newpwd2').length == 0 ? $('.user_newpwd2',window.top.document) : $('.user_newpwd2');

        _oldpwd.bind('blur',function(){oldpwd(_oldpwd)});
        _newpwd.bind('blur',function(){newpwd(_newpwd)});
        _newpwd2.bind('blur',function(){newpwd2(_newpwd,_newpwd2)});

    }
   //点击保存收货人信息
  $(document).on('click','.user_pwd_s',function(){

  		var _oldpwd = $('.user_oldpwd').length == 0 ? $('.user_oldpwd',window.top.document) : $('.user_oldpwd'),
            _newpwd = $('.user_newpwd').length == 0 ? $('.user_newpwd',window.top.document) : $('.user_newpwd'),
            _newpwd2 = $('.user_newpwd2').length == 0 ? $('.user_newpwd2',window.top.document) : $('.user_newpwd2');
        var arr =[];

        	arr[0]= oldpwd(_oldpwd),
        	arr[1]= newpwd(_newpwd),
        	arr[2]= newpwd2(_newpwd,_newpwd2);

        var re = arr.join(',');
        console.log(re)
        if(re.indexOf('false') !=-1){
            return false;
        }else{
            $(this).closest('form').submit();
            //alert('ok')
        }

   });
      

})();