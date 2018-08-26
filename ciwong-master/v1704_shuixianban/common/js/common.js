// var DOMAIN = 'http://123.56.154.119:8877/'; 	// 测试域名
// var DOMAIN = 'http://m.teacher.jiaofuyun.com/'; 	// 正式域名
var DOMAIN = 'http://'+location.host+'/'; 	// 自动域名设置
var HOST = DOMAIN + 'gateway/';		// 接口头
var HOST_project = DOMAIN + 'v1704_shuixianban/';		// 项目服务器地址

var API = {
	getUserInfo : HOST + 'h5/v5/user/getUserInfo',	// 获取我的班级列表
	getBrand : HOST + 'h5/v1/brand/getbyid',	// 根据id查询品牌信息
	
	getRecords : HOST  + 'v2/epaperwork/submit_work_records',	// 获取学习记录列表

	getWordReading : HOST + 'h5/v1/Package/SyncFollowReadData',	// 获取单词跟读
	getSentenceReading : HOST + 'h5/v1/Package/SyncFollowReadTextData',	// 获取句子跟读

	getOnlineExamination : HOST + 'h5/v1/Package/ExaminationDataForApp',	// 获取在线作答试卷

	getLsExamination : HOST + 'h5/tools/listen_speak_examination',	// 获取听说模考试卷信息（包括总分）
	// getWorkAnswers : HOST + 'h5/epaperwork/getWorkAnswers',	// 获取用户答案 [旧接口]
	getDoWorkInfo : HOST + 'h5/epaperwork/v2/getDoWorkInfo',	// 获取用户答案（包括用户总得分）/老师选题（checkResouresIds）/当前批改状态（workStatus）
}

// 弹出框
$.alert = function(msg,delay){
	if(typeof $ =='undefined'){
		return alert(msg);
	}
    delay = delay || 2000;
    if($('.dialog').css('display')=='none'){
        $('.dialog-inner').html(msg)
        $('.dialog').show();
        setTimeout(function(){$('.dialog').hide();},delay)
    }
}
// 错误信息
$.error = function(msg){
	if(typeof $ =='undefined'){
		return alert(msg);
	}
	msg = msg+'';
    typeof firstTimer !='undefined' && clearTimeout(firstTimer)
    $('.m-error_inner').removeClass('no-record')

    if(msg.indexOf('未找到有效token')>-1){
        $.alert('您的登录已过期或者您已在另一设备登录',5000)
    }else if(msg.indexOf('还没有学习记录')>-1){
        $('.m-error_inner').addClass('no-record')
    }
    $('.loading').hide();
    $('.wrap').html('');
	document.querySelector('.loading').style.display='none'
	document.querySelector('.wrap').innerHTML=''
    if(msg) $('.m-error .u-txt').html('( '+msg+' )')
    $('.m-error').show();
}

// 设置超时报错
var firstTimer = setTimeout(function(){
    if(typeof apiData=='undefined'){
        $.error('Api请求超时')
        return;
    }
},10000)

window.onerror = function(e){
// 	// cordova 插件加载错误不显示
// 	// $.alert(JSON.stringify(e));return;
// 	if(e=='Uncaught SyntaxError: Unexpected token :' || $('.loading').css('display')!='none' || $('.wrap').css('display')!='none') return;
// 	setTimeout(function(){
// 		if(e=='Uncaught SyntaxError: Unexpected token :' || $('.loading').css('display')!='none' || $('.wrap').css('display')!='none') return;
// 		$.alert('网络不稳定，请稍后重试')
// 	},2000)
}
 
var $common = {
	// 弹出框
	alert:function(msg){
		if(typeof $.alert == 'function'){
			$.alert(msg)
		}else{
			alert(msg)
		}
	},
	// 获取url参数
	getUrlPara:function(name,url) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		var r = (url || window.location.search).substr(1).match(reg);
		if (r!=null) return (r[2]); return null;
	},
	// 获取base64加密的url参数
	getUrlParaBase64:function(name) {
		var url = (window.location.hash && window.location.hash.split('?')[0]) || window.location.search ||  localStorage.getItem('url') || '';
		var result = this.getUrlPara(name,url);
		if(result==null){
			var base64Param = url.substr(1).split('&')[0];	// 防止微信在url后面加参数
			var paramStr;
			if(base64Param.length>4){
				try {
					paramStr = window.atob(base64Param).split(name+'=')[1];
				} catch (error) {
					paramStr = '';
					console.log('异常:'+error)
				}
			}
			result = paramStr && paramStr.indexOf('&')>-1? paramStr.split('&')[0] : paramStr;
		}
		return result;
	},
	// 格式化日期
	formatDate:function(timestamp,fmt) {    // timestamp = 1492141656,"W yyyy-MM-dd hh:mm:ss"
        var now=new Date(parseInt(timestamp)*1000); 
        var weekStr = ['周日','周一','周二','周三','周四','周五','周六'];
		var o = {
			"M+": now.getMonth() + 1, //月份 
			"d+": now.getDate(), //日 
			"h+": now.getHours(), //小时 
			"m+": now.getMinutes(), //分 
			"s+": now.getSeconds(), //秒 
			"q+": Math.floor((now.getMonth() + 3) / 3), //季度 
			"S": now.getMilliseconds(), //毫秒
			"W": weekStr[now.getDay()], //周
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	// 封装异步请求
	ajax:function(url,success,userId,method,param,complete,error){
		var _self = this;
		var headers = null;
		if(userId){
			var userIdBase64 = 'Basic ' + window.btoa(userId+":");
			headers = {
	   			Authorization: userIdBase64	// 请求头用户认证
	        }
		}
		// alert('异步请求开始，url)
		// _self.allAjaxLoad(1)
		$.ajax({
	        headers:headers,
			type:method || 'GET',
	        data:param || {},
	        timeout : 10000, //超时时间设置，单位毫秒
	        dataType: 'json',
	        url: url,
	        success: success,// 返回成功的回调函数
	        error:function(){
				var log = '网络不稳定（请求未响应）~'
	　　　　　  	_self.alert(log);
				typeof $.error == 'function' && $.error(log)
	        },
	        complete:function(XMLHttpRequest,status){
				if(status=='timeout'){//超时,status还有success,error等值的情况
					var log = '网络不稳定（请求超时）~'
		　　　　　  _self.alert(log);
					typeof $.error == 'function' && $.error(log)
	　　　　	}
				typeof complete == 'function' && complete()
				// _self.allAjaxLoad(-1)
	        }
		});
	},
	// 下拉加载更多
	loadMore:function(param,callback){
		var range = param.range || 10;	// 到底部的距离
		var totalHeight = 0;
		var winH = $(window).height();
		$(window).scroll(function(){
			var winTop = $(window).scrollTop();
			totalHeight = winTop + winH;

			if($(document).height() - range <= totalHeight){
				callback();
			}
		})
	},
	// 所有ajax请求结束后回调函数，type:1[新增一个ajax请求]，2[请求完成一个ajax]
	allAjaxLoad:function(type){
		!this._ajaxNum && (this._ajaxNum=0);
		if(type===1){
			this._ajaxNum +=1;
		}else if(type===-1){
			this._ajaxNum -=1;
		}else{
			return;
		}
		// 所有ajax请求完毕
		// if(this._ajaxNum===0){
		// 	setTimeout(function(){
		// 		document.getElementsByTagName('html')[0] && document.getElementsByTagName('html')[0].attributes && !document.getElementsByTagName('html')[0].attributes.manifest && document.getElementsByTagName('html')[0].setAttribute('manifest','../common.appcache')
		// 	},2000)
		// }
	}
}