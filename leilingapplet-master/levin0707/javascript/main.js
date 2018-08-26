var prevPageName="page01";
var pagenum=0;

function getUrlParam(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
		}
	
	var moudle_code = getUrlParam('ch');
function loadselect(){
	console.log(moudle_code);
	/*begin 省、市、经销商下拉菜单*/
	$.post('data/userinfodata.php',{action:'province',rnd:Math.random()},function(data){
		$('#province').html('<option value="">请选择省份</option>'+data.toString());
	});
	$.post('data/userinfodata.php',{action:'chexing',ch:moudle_code,rnd:Math.random()},function(data){
	    $('#carType').html('<option value="">意向车型</option>'+data.toString());
	    
	});
	$('#province').change(function(){
	    var province=$(this).val();
		$.post('data/userinfodata.php',{action:'city',province:province.toString(),rnd:Math.random()},function(data){
		$('#city').empty();
	    $('<option value="">城市</option>'+data.toString()).appendTo($('#city'));
		filldealerselect(province.toString(),'');
		$('.jxsTel').html('经销商电话');
	});
	});

	$('#city').change(function(){
	    var province=$('#province option:selected').val();
		var city=$(this).val();
		filldealerselect(province.toString(),city.toString());
		$('.jxsTel').html('经销商电话');
	});

	$('#jingxiaoshang').change(function(){
	    var tel=$(this).val();
		if(tel.toString()==''){
		   $('.jxsTel').html('经销商电话');
		}else{
		   tel= '经销商电话:&nbsp;' + tel.split('||')[0].toString();
		   $('.jxsTel').html(tel);
 		}
	});
	/*end 省、市、经销商下拉菜单*/
}

//填充经销商下拉菜单
function filldealerselect(province,city){
    $('#jingxiaoshang').empty();
	$('<option value="">选择经销商</option>').appendTo($('#jingxiaoshang'));
    if(province.toString()!='' || city.toString()!=''){
		$.post('data/userinfodata.php',{action:'jingxiaoshang',province:province.toString(),city:city.toString(),rnd:Math.random()},function(data){
			$('#jingxiaoshang').empty();
			$('<option value="">选择经销商</option>'+data.toString()).appendTo($('#jingxiaoshang'));

		});
	}
}



//----------------- other tools ---------------------------

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]);
	 return null;
}


function trackEvent(category,action,label) { //跟踪事件
	_hmt.push(['_trackEvent', category, action,label]);
	ga('send', 'event', category,action, label);
}


//-------------------- validate -----------------

function validatemobile(mobile) {
    if (mobile.length == 0) {
        return false;
    }
    if (mobile.length != 11) {
         return false;
    }

   var myreg = /^(((13[0-9]{1})|150|151|152|153|154|155|156|157|158|159|180|177|181|182|183|184|185|186|187|188|189)+\d{8})$/;
    if (!myreg.test(mobile)) {
        return false;
    }
    return true;
}
