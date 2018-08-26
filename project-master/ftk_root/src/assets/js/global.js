let bindToGlobal = (obj, key='_const') => {
	if (typeof window[key] === 'undefined') {
		window[key] = {}
	}

	for (let i in obj) {
		window[key][i] = obj[i]
	}
}

// 获取host接口
(function getHost(url) {
	let xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObiect('Microsoft.XMLHTTP');
	}

	xhr.open('GET', url, false);// 同步
	xhr.onreadystatechange = handler;
	// xhr.responseType = 'json';
	xhr.send();

	function handler() {
		if (this.readyState !== 4) {
			return;
		}
		if (this.status === 200) {
			let data = JSON.parse(this.response)
			let host,dtk_host
			bindToGlobal(host)
			bindToGlobal(dtk_host)
			_const.host = data.ftk_host
			_const.dtk_host = data.dtk_host
		} else {
			new Error(this.statusText)
		}
	}
})('./static/api.json')

/**
 * 正式：
 * 
 * root   13333333333/123123
 * admin  15524629698/111111
 *
 * 开发：
 *
 * root   13333333333/123123
 * admin  15524629698/111111
 * http://localhost:8084
 */