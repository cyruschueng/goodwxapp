import Vue from  'vue'
let bindToGlobal = (obj, key='_const') => {
	if (typeof window[key] === 'undefined') {
		window[key] = {}
	}

	for (let i in obj) {
		window[key][i] = obj[i]
	}
}

let host
bindToGlobal(host)
// _const.host='http://localhost:36742'
// _const.host='https://www.dlyunzhi.cn/apis'
_const.host='http://www.secds.cn/apis'