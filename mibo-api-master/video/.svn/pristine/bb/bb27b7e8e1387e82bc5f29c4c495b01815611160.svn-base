var HYIP = {};

HYIP = {};
//ajax请求
//timeout：用户未登陆的跳转回调
//error：服务器错误的回调
HYIP.ajaxTryTimes = 0;
HYIP.ajax = function(url, param, success, failed, last, error, errorCount) {
	errorCount = errorCount || 1;
	param.r = Math.random()*10;
	$.ajax({
		url: url,
		dataType: 'json',
		timeout: 30000,
		data: param,
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		cache:false,
		success: function(data){
			if(data.success){
				(success || function(){})(data);
			}else{
				if(data.returnCode==-1){
				    var strFullPath=window.document.location.href;
			        var strPath=window.document.location.pathname;
			        var pos=strFullPath.indexOf(strPath);
			        var prePath1=strFullPath.substring(0,pos);
			        var prePath=strFullPath.substring(pos);
					//location.reload();
			        var str = encodeURIComponent(prePath);
			        window.location.href=prePath1+"/usercenter/loginSession.html?url="+str;
					return;
				}
				if(failed){
					failed(data);
				}else{
					if(data.message){
						HYIP.showDynamicErrorMsg(data.message);
					}
				}
			}
			(last || function(){})(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
//			HYIP.showDynamicErrorMsg('服务器繁忙，请稍后再试！');
		}
	});
};


HYIP.ajaxRedPacket = function(url, param, success) {
	$.ajax({
		url: url,
		dataType: 'json',
		timeout: 30000,
		data: param,
		type: 'post',
		cache:false,
		success: function(data){
			if(data.success){
				(success || function(){})(data);
			}else{
				if(data.returnCode=-1000){
				    var strFullPath=window.document.location.href;
			        var strPath=window.document.location.pathname;
			        var pos=strFullPath.indexOf(strPath);
			        var prePath1=strFullPath.substring(0,pos);
			        var prePath=strFullPath.substring(pos);
					//location.reload();
			        var str = encodeURIComponent(prePath);
			        window.location.href=prePath1+"/usercenter/loginSession.html?url="+str;
					return;
				}
				if(data.message.indexOf('网络错误') != -1){
					//HYIP.showDynamicErrorMsg(data.message);	
					return;
				}
				
				if(data.message){
					if(data.data.isGetRedPacket){
						try{
							if(data.data.qwShopId && data.data.activeId){
								globalQwShopId = data.data.qwShopId;
								globalActiveId = data.data.activeId;
							}
						}catch (e) {
							
						}
						
						$("#textmsglogin_popupdenied").html("您已领取过该商家的优惠券，是否参与抽红包");
						$('#dialog_popupdenied').dialog('open');
					}else{
						HYIP.showDynamicErrorMsg(data.message);	
					}
					
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			HYIP.showDynamicErrorMsg("网络错误");
		}
	});
};

HYIP.dynamicTimers = [];
HYIP.dynamicOption = {};

HYIP.showDynamicMsg = function(id, css, msg, time){
	if($('#' + id).size() == 0){
		$('body').append('<span id="' + id + '"></span>');
		HYIP.dynamicOption[id] = {of: $(window)};
	}
	$('#' + id).hide();
	for(i in HYIP.dynamicTimers){
		clearTimeout(HYIP.dynamicTimers[i]);
	}
	HYIP.dynamicTimers = [];
	
	$('#' + id).removeAttr("class").addClass(css).css('z-index', 9999).html(msg).fadeIn('blind', function() {
		$('#' + id).position(HYIP.dynamicOption[id]);
		var timerId = setTimeout(function(){
			$('#' + id).fadeOut('blind');
		}, time || 3000);
		HYIP.dynamicTimers.push(timerId);
	});
}

HYIP.showMsg = function(id, css, msg){
	if($('#' + id).size() == 0){
		$('body').append('<span id="' + id + '"></span>');
		HYIP.dynamicOption[id] = {of: $(window)};
	}
	$('#' + id).hide();
	for(i in HYIP.dynamicTimers){
		clearTimeout(HYIP.dynamicTimers[i]);
	}
	HYIP.dynamicTimers = [];
	
	$('#' + id).removeAttr("class").addClass(css).css('z-index', 9999).html(msg).fadeIn('blind', function() {
		$('#' + id).position(HYIP.dynamicOption[id]);
	});
}

HYIP.showDynamicSuccessMsg = function(msg, time){
	msg = msg || '';
	var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
	if(isIE6){
		HYIP.showDynamicMsg('hyip_float_message', 'hyip-success', msg, time);
	}else{
		var width = (msg.length > 10)?500:150;
		var height = (msg.length > 70)?52:20;
		$.floatingMessage(msg, {
			show: "blind",
			hide: "puff",
			width: width,
			height: height, 
			time: time || 3000,
			position: 'top-left',
			className: 'hyip-success'
		});
	}
}

HYIP.showDynamicErrorMsg = function(msg, time){
	msg = msg || '';
	if(msg == '' || msg == '网络错误'){
		return;
	}
	var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
	if(isIE6){
		HYIP.showDynamicMsg('hyip_float_message', 'hyip-failed', msg, time);
	}else{
		var width = (msg.length > 10)?500:150;
		$.floatingMessage(msg, {
			show: "blind",
			hide: "puff",
	        width: width,
	        height: 20, 
	        time: time || 3000,
	        position: 'top-left',
	        className: 'hyip-failed'
	    });
	}
}

HYIP.showDynamicErrorMsg4Wap = function(msg, time){
	msg = msg || '';
	if(msg == '' || msg == '网络错误'){
		return;
	}
	var isIE6=!!window.ActiveXObject && !window.XMLHttpRequest;
	if(isIE6){
		HYIP.showDynamicMsg('hyip_float_message', 'popTips', msg, time);
	}else{
		var width = (msg.length > 10)?500:150;
		$.floatingMessage(msg, {
			show: "blind",
			hide: "puff",
	        width: width,
	        height: 20, 
	        time: time || 3000,
	        position: 'top-left',
	        className: 'popTips'
	    });
	}
}

HYIP.isInt = function(text){
	return /^\d+$/.test(text);
}

HYIP.parseInt = function(text){
	return HYIP.isInt(text) ? parseInt(text) : 0;
}

HYIP.formatMoney = function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	t = "";
	for (i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
} 

HYIP.export_timer_running = false;
HYIP.exportExcel = function(ele, exportUrl, param, checkUrl, downloadUrl){
	if($('#export_excel_dialog').size() == 0){
		$('body').append('<div id="export_excel_dialog" title="导出"><div id="export_excel_message"></div></div>');
		$('#export_excel_dialog').dialog({
			minWidth: 300,
			minHeight: 300,
			draggable: false,
			autoOpen: false,
			modal: true,
			show: 'blind',
			hide: 'blind',
			close: function(event, ui) {
				HYIP.export_timer_running = false;
			}
		});
	}
	
	$(ele).attr('disabled', true);
	HYIP.ajax(exportUrl, param, function(data){
		$('#export_excel_message').html('数据处理中，请稍后。。。0.00%');
		HYIP.export_timer_running = true;
		HYIP.checkExport(data.data, checkUrl, downloadUrl, 0);
		$('#export_excel_dialog').dialog('open');
		$(ele).attr('disabled', false);
	}, function(data){
		$(ele).attr('disabled', false);
		HYIP.showDynamicErrorMsg(data.message);
	}, function(data){}, function(){
		$(ele).attr('disabled', false);
		HYIP.showDynamicErrorMsg('出错了，请刷新页面！')
	});
}

HYIP.checkExport = function(fileName, checkUrl, downloadUrl, checkCount){
	if(checkCount < 5 && HYIP.export_timer_running){
		HYIP.ajax(checkUrl, {fileName: fileName}, function(data){
			var result = data.data;
			if(result.loading){
				$('#export_excel_message').html('数据处理中，请稍后。。。' + result.speed);
				setTimeout('HYIP.checkExport("' + fileName + '", "' + checkUrl + '", "' + downloadUrl + '", 0);', 1000);
			}else if(result.success){
				$('#export_excel_message').html('数据下载地址：<a href="' + downloadUrl + '/' + fileName + '">下载数据</a>');
			}else{
				$('#export_excel_message').html('用户数据处理失败，服务器异常！');
			}
		}, function(data){
			$('#export_excel_message').html('用户数据处理失败，服务器异常！');
		}, function(data){}, function(){
			checkCount++;
			setTimeout('HYIP.checkExport("' + fileName + '", "' + checkUrl + '", "' + downloadUrl + '", ' + checkCount + ');', 1000);
			$('#export_excel_message').html('用户数据处理失败，服务器异常！');
		});
	}
}
	
function getEmailUrl(email){
	if(endWidth(email,'@qq.com')||endWidth(email,'@126.com')
			||endWidth(email,'@sina.com')
			||endWidth(email,'@sohu.com')
			||endWidth(email,'@163.com')){
		
		return "mail."+email.substring(email.indexOf('@')+1,email.length);
	}else if(endWidth(email,'@gmail.com')){
		return "gmail.com";
	}else if(endWidth(email,'@hotmail.com')){
		return "hotmail.com";
	}
	return null;
}


function endWidth(email,str){
if(str==null||str==""||email.length==0||str.length>email.length)
  return false;
if(email.substring(email.length-str.length)==str)
  return true;
else
  return false;
}