Picooc.address = {};

Picooc.address.init = (function(){

    var pic = Picooc.common;

	//修改收货地址
	$('.user_address_ch').unbind('click').bind('click',function(){

        /*此处为数据反显*/
        var tempAdres = {
            provinceVal:'河南',
            cityVal:'郑州',
            name:'张三',
            address:'北京市西城区新街口外大街',
            mobile:'18210198812',
            quhao:'010',
            phone:'1234567',
            yzcode:'100000',
            isauto:false
        }
        
        pic.tempAdres = tempAdres;

        pic.fajax({
            url:'../user_center/user_change_dz.html',
            type:'get',
            data:''
        },function(data){
            var htm = data,
                config = {
                    diy:true,
                    htm:htm
                },
                mask = pic.mask(config);

                var  ads = Picooc.address;
                ads.init.init_check();

                var province = $('#user_province2',window.top.document),
                    city = $('#user_city2',window.top.document);
                    
                    pic.place({
                        provinceId : province,
                        cityId : city,
                        reshow : true,
                        provinceVal : pic.tempAdres.provinceVal,
                        cityVal : pic.tempAdres.cityVal
                    })  

                    $('.user_name',window.top.document).val(pic.tempAdres.name)
                    $('.user_address_txt',window.top.document).val(pic.tempAdres.address)
                    $('.user_mobile',window.top.document).val(pic.tempAdres.mobile)
                    $('.user_quhao',window.top.document).val(pic.tempAdres.quhao)
                    $('.user_phone',window.top.document).val(pic.tempAdres.phone)
                    $('.user_yzcode',window.top.document).val(pic.tempAdres.yzcode)
                    if(pic.tempAdres.isauto){
                        $('.input_checkbox',window.top.document).attr('checked',true);
                    }

            //移除弹出框
            var bd = $('#user_close', parent.document);
            window.mask = mask;

            bd.click(function(){

                mask.remove();

            });

        })

	})

    //删除收货地址
	$('.user_aa_de').click(function(e){

		e.stopPropagation();
        var _this = this;
        var _hei = $(this).height()+6,_wid = $(this).width();
        var xy = $(this).offset();
        xy.left-=250-30;
        xy.top +=_hei; //title tips callback left top

        Picooc.common.confirm({
            title:'删除地址',
            tips:'确定删除此地址吗？',
            callback:function(){
                alert('还没有后台接口啊 亲');
                $(_this).parents('tr').remove();
            },
            left:xy.left,
            top:xy.top
        });

	})

	//地区联动
	Picooc.common.place({
		provinceId:$('#user_province1'),
		cityId:$('#user_city1'),
		reshow:true,
		provinceVal:'河南',
		cityVal:'新乡'
	});

	
    //var save_btn =  $('.user_address_s').length == 0 ? $('.user_address_s',window.top.document) : $('.user_address_s');
    function init_check(){
        //点击保存收货人信息
      $(document).on('click','.user_address_s',function(){

            var re = Picooc.address.regx.check().join(',');
            console.log('re:'+re)
            if(re.indexOf('false') !=-1){
                return false;
            }else{
                var i=0,arr=[];

                var _username = $('.user_name').length == 0 ? $('.user_name',window.top.document) : $('.user_name'),
                    _province = $('.province').length == 0 ? $('.province',window.top.document) : $('.province'),
                    _city = $('.user_city').length == 0 ? $('.user_city',window.top.document) : $('.user_city'),
                    _address = $('.user_address_txt').length == 0 ? $('.user_address_txt',window.top.document) : $('.user_address_txt'),
                    _yzcode = $('.user_yzcode').length == 0 ? $('.user_yzcode',window.top.document) : $('.user_yzcode'),
                    _mobile = $('.user_mobile').length == 0 ? $('.user_mobile',window.top.document) : $('.user_mobile'),
                    _phone = $('.user_phone').length == 0 ? $('.user_phone',window.top.document) : $('.user_phone'),
                    _quhao = $('.user_quhao').length == 0 ? $('.user_quhao',window.top.document) : $('.user_quhao');

                arr[i++] = _username.val();
                arr[i++] = _province.val()+' '+_city.val();
                arr[i++] = _address.val();
                arr[i++] = _mobile.val();
                arr[i++] = _quhao.val()+'-'+_phone.val();
                arr[i++] = _yzcode.val();
                console.log(arr)
                alert('ok')
            }

        });
    }

    init_check();

    return {
        init_check:init_check
    }
})();

Picooc.address.regx = (function(){

        var common = Picooc.common,
	 	    fun = common.regx,
            str ='';

        function reciver_name(target){
            var _state = false;
            var val = target.val();
            console.log(fun)
            if(fun.isEmpty(val)){
                common.showtips(target,'请输入收货人姓名');
                _state = false;
            }else if(val.length<2){
                common.showtips(target,'收货人姓名至少两个字符');
                _state = false;
            }else if(!fun.is_forbid(val)){
                common.showtips(target,'收货人姓名不能包含特殊字符');
                _state = false;
            }else{
                common.removetips(target)
                _state = true;
            }
            return _state;
        }

        function reciver_city(target){
            var _state = false;
            var val = target.val();
            if(fun.isEmpty(val)){
                common.showtips(target,'省市必须选择');
                _state = false;
            }else{
                _state = true;
                common.removetips(target)
            }
            return _state;
        }

        function reciver_adress(target){
            var _state = false;
            var val = target.val();
            if(fun.isEmpty(val)){
                common.showtips(target,'请输入收货人地址');
                _state = false;
            }else if(val.length<5){
                common.showtips(target,'收货人地址至少5个字符');
                _state = false;
            }else if(!fun.is_forbid(val)){
                common.showtips(target,'收货人地址不能包含特殊字符');
                _state = false;
            }else{
                _state = true;
                common.removetips(target)
            }
            return _state;
        }

        function mobile(target){
            var _state = false;                 
            var val = target.val();
            var _mobile = $('.user_mobile').length == 0 ? $('.user_mobile',window.top.document) : $('.user_mobile');
            var _phone = $('.user_phone').length == 0 ? $('.user_phone',window.top.document) : $('.user_phone');
            if(fun.isEmpty(val)){
                var _val = _phone.val();
                if(fun.isEmpty(_val)){//手机input失去焦点时候 如果电话为空 则为true
                    _state = false;
                    common.showtips(_phone,'请输入手机号码或者电话号码');
                }else{
                    _state = phone(_phone);
                }
            }else if(!fun.check_mobile(val)){
                common.showtips(target,'请输入正确的手机号码');
                _state = false;
            }else{
                _state = true;
                common.removetips(target)
            }
            if(_state){
                
            }
            return _state;
        }

        function phone(target){
            var _state = false;  
            var _quhao = $('.user_quhao').length == 0 ? $('.user_quhao',window.top.document) : $('.user_quhao');   
            var val = target.val();
            var quhao = _quhao.val();
            var _mobile = $('.user_mobile').length == 0 ? $('.user_mobile',window.top.document) : $('.user_mobile');
            var _phone = $('.user_phone').length == 0 ? $('.user_phone',window.top.document) : $('.user_phone');
            if(fun.isEmpty(val)){//如果当前为空则检查另外一个
                var _val = _mobile.val();
                if(fun.isEmpty(_val)){
                    common.showtips(_phone,'请输入手机号码或者电话号码');
                    _state = false;
                }else{
                    _state = mobile(_mobile);
                }
            }else if(fun.isEmpty(quhao)){
                common.showtips(target,'请输入区号');
                _state = false;
            }else if(!fun.checkPhone(quhao+'-'+val)){
                common.showtips(target,'请输入正确的电话号码');
                _state = false;
            }else{
                _state = true;
                common.removetips(target)
            }
            
            return _state;
        }

        function yzcode(target){
            var _state = false;
            var val = target.val();
            if(fun.isEmpty(val)){
                common.showtips(target,'邮政编码');
                _state = false;
            }else if(!fun.check_yzcode(val)){
                common.showtips(target,'请输入正确的邮政编码');
                _state = false;
            }else{
                _state = true;
                common.removetips(target)
            }
            return _state;
        }
      
        function _check(){

            var arr = [],i=0;
            var _username = $('.user_name').length == 0 ? $('.user_name',window.top.document) : $('.user_name'),
                _province = $('.province').length == 0 ? $('.province',window.top.document) : $('.province'),
                _city = $('.user_city').length == 0 ? $('.user_city',window.top.document) : $('.user_city'),
                _address = $('.user_address_txt').length == 0 ? $('.user_address_txt',window.top.document) : $('.user_address_txt'),
                _yzcode = $('.user_yzcode').length == 0 ? $('.user_yzcode',window.top.document) : $('.user_yzcode'),
                _mobile = $('.user_mobile').length == 0 ? $('.user_mobile',window.top.document) : $('.user_mobile'),
                _phone = $('.user_phone').length == 0 ? $('.user_phone',window.top.document) : $('.user_phone'),
                _quhao = $('.user_quhao').length == 0 ? $('.user_quhao',window.top.document) : $('.user_quhao');

            arr[i++] = reciver_name(_username);
            arr[i++] = reciver_city(_city);
            arr[i++] = reciver_adress(_address);
            arr[i++] = yzcode(_yzcode);
            var a = mobile(_mobile);           
            if(!a){
                var b =  phone(_phone);
                if(!b){
                    common.showtips(_phone,'请输入手机号码或者电话号码');
                    arr[i++] = false;
                }else{
                    arr[i++] = true;
                }               
            }else{
                arr[i++] = true;
            }
            console.log(arr)
            return arr;
        }
        
        function bindClick(){

            var _username = $('.user_name').length == 0 ? $('.user_name',window.top.document) : $('.user_name'),
                _province = $('.province').length == 0 ? $('.province',window.top.document) : $('.province'),
                _city = $('.user_city').length == 0 ? $('.user_city',window.top.document) : $('.user_city'),
                _address = $('.user_address_txt').length == 0 ? $('.user_address_txt',window.top.document) : $('.user_address_txt'),
                _yzcode = $('.user_yzcode').length == 0 ? $('.user_yzcode',window.top.document) : $('.user_yzcode'),
                _mobile = $('.user_mobile').length == 0 ? $('.user_mobile',window.top.document) : $('.user_mobile'),
                _phone = $('.user_phone').length == 0 ? $('.user_phone',window.top.document) : $('.user_phone'),
                _quhao = $('.user_quhao').length == 0 ? $('.user_quhao',window.top.document) : $('.user_quhao');

            _username.bind('blur',function(){
                reciver_name(_username)
            });

            _city.bind('blur',function(){
                reciver_city(_city)
            });

            _address.bind('blur',function(){
                reciver_adress(_address)
            });

            _mobile.bind('blur',function(){
                mobile(_mobile)
            });

            _phone.bind('blur',function(){
                phone(_phone)
            });

            _quhao.bind('blur',function(){
                phone(_phone)
            })

            _yzcode.bind('blur',function(){
                yzcode(_yzcode)
            });

        }

        bindClick();
        
        return {
            check:_check,
            bindClick:bindClick
        }

    })();