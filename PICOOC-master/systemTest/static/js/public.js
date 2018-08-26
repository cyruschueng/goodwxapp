var ajaxLink;
if(window.location.host == "a.picooc.com"){
	ajaxLink="https://a.picooc.com/";
}
else if(window.location.host == "pm.picooc.com:9989"){
	ajaxLink="http://pm.picooc.com:8079/";
}
else if(window.location.host == "a.picooc.com:10000"){
	ajaxLink="https://a.picooc.com:10000/";
}
else{
	ajaxLink="http://pm.picooc.com:8079/";
}

var arrHeadImg = ['http://cdn2.picooc.com/web/res/sex0.png', 'http://cdn2.picooc.com/web/res/sex1.png'];
//var windowSearch=window.location.href.split("?")[1];
function getParamByUrl(paramKey) {
	var url = window.location.href.split("?")[1];
	if(typeof url!= "undefined"){
		var arr = url.split("&");
		var result = [];
		for (var i = 0; i < arr.length; i++) {
			var param = arr[i].split("=");
			if (paramKey == param[0]) {
				if (paramKey == "webver") {
					return parseInt(param[1]);
				}
				return param[1];
			}
		}
	}
	return "false";
}
function removeParamByUrl(paramKey) {
	var url = window.location.search.substring(1);
	var arr = url.split("&");
	var result = [];
	var str = '?';
	for (var i = 0; i < arr.length; i++) {
		var param = arr[i].split("=");
		if (paramKey != param[0] && param[0] != "") {
			str += '&' + param[0] + '=' + param[1];
			//return  param[1];
		}
	}
	return str;
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "false";
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//设置带路径的cookie
function setCookiePath(c_name, value, expiredays, path) {
	//setCookiePath("test2","noMsg",1,"/;domain=picooc.com");
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + '; path=' + path;
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function delCookiePath(name,path) {
	//delCookiePath("token","/;domain=picooc.com");
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+'; path=' + path;
}
function strToJson(str) {
	//var json = eval('(' + str + ')');
	if (typeof (str) == 'string') {
		var json = eval('(' + str + ')');
	}
	else {
		var json = str;
	}
	return json;
}
function escapeContent(str) {
	/*str=str.replace(/<br\s*\/?>/g, "\n");*/
	str = str.replace(/\%25/g, "%");
	str = str.replace(/\%26/g, "&");
	str = str.replace(/\%2B/g, "+");
	str = str.replace(/\%23/g, "#");
	return str;
}

//commonPopBox2:第二种弹窗：//提示信息，标题，左边按钮名称，右边按钮名称，左边函数名，右边函数名；
function commonPopFun2(dataMsg, title, leftBtnName, rightBtnName, fun1, fun2){
  var top = $(document).scrollTop();
  $('.commonPopBox2').show().css('top',top);//滚动条的高度
  $('.commonPopBox2 .commonPop .title').html(title);
  $('.commonPopBox2 .commonPop .detailTip').html(dataMsg);
  if($('.commonPopBox2').is(':visible')){
    $('body, html').css({
      'overflow': 'hidden',
      'height':'100%'
    });
  }
  $('.commonPopBox2 .commonPop .confirmBox .confirmBtn1').html(leftBtnName).unbind('click').click(function(){
    fun1();
    $('.commonPopBox2').hide();
    $('body, html').css({
      'overflow': 'auto',
      'height':'auto'
    });
  });
  $('.commonPopBox2 .commonPop .confirmBox .confirmBtn2').html(rightBtnName).unbind('click').click(function(){
    fun2();
    $('.commonPopBox2').hide();
    $('body, html').css({
      'overflow': 'auto',
      'height':'auto'
    });
  });
}
