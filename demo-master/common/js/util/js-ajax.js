


function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != 'undefined') {
		var version = [
									'MSXML2.XMLHttp.6.0',
									'MSXML2.XMLHttp.3.0',
									'MSXML2.XMLHttp'
		];
		for (var i = 0; version.length; i ++) {
			try {
				return new ActiveXObject(version[i]);
			} catch (e) {
				//跳过
			}	
		}
	} else {
		throw new Error('您的系统或浏览器不支持XHR对象！');
	}
}


/*
//POST请求
addEvent(document, 'click', function () {
	var xhr = createXHR();		
	var url = 'demo.php?rand=' + Math.random();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				alert(xhr.responseText);
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
	};
	xhr.open('post', url, true);							//第一步改为post
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');		//第三步，模拟表单提交
	xhr.send('name=Lee&age=100');			//第二步将名值对放入send方法里
});
*/


//名值对转换为字符串
function params(data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
}


//封装ajax
function ajax(obj) {
	var xhr = createXHR();
	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);
	if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	if (obj.async === true) {
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				callback();
			}
		};
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method === 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);	
	} else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callback();
	}
	function callback() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);			//回调传递参数
		} else {
			alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
		}	
	}
}


//调用ajax
addEvent(document, 'click', function () {
	ajax({
		method : 'post',
		url : 'demo3.php',
		data : {
			'name' : 'Lee',
			'age' : 100
		},
		success : function (text) {
			alert(text);
		},
		async : true
	});
});



/*
//作用域，无法返回
function a() {
	function b() {
		return 123;
	}
	return 456;
}

alert(a());
*/



