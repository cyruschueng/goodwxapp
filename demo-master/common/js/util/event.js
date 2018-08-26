//------------------------------事件-----------------------------
//跨浏览器添加事件
function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + type, function () {
			fn.call(obj);
		});
	}
}

//跨浏览器移除事件
function removeEvent(obj, type, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on' + type, fn);
	}
}

//跨浏览器阻止默认行为
function preDef(evt) {
	var e = evt || window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}

//跨浏览器获取目标对象
function getTarget(evt) {
	if (evt.target) {		//W3C
		return evt.target;
	} else if (window.event.srcElement) {		//IE
		return window.event.srcElement;
	}
}

//跨浏览器获取字符编码
function getCharCode(evt) {
	var e = evt || window.event;
	if (typeof e.charCode == 'number') {
		return e.charCode;
	} else {
		return e.keyCode;
	}
}