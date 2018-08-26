var get = {
	byId: function(id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	byClass: function(sClass, oParent) {
		var aClass = [];
		var reClass = new RegExp("(^| )" + sClass + "( |$)");
		var aElem = this.byTagName("*", oParent);
		for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
		return aClass
	},
	byTagName: function(elem, obj) {
		return (obj || document).getElementsByTagName(elem)
	}
};
var dragMinWidth = 800;
var dragMinHeight = 600;
/*-------------------------- +
 拖拽函数
 +-------------------------- */
function drag(oDrag, handle) {
	var disX = dixY = 0;
	var oMax = get.byClass("max", oDrag)[0];
	var oRevert = get.byClass("revert", oDrag)[0];
	var oClose = get.byClass("close", oDrag)[0];
	var allMap = document.getElementById("allmap");
	handle = handle || oDrag;
	handle.style.cursor = "move";
	handle.onmousedown = function(event) {
		var event = event || window.event;
		disX = event.clientX - oDrag.offsetLeft;
		disY = event.clientY - oDrag.offsetTop;
		document.onmousemove = function(event) {
			var event = event || window.event;
			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
			var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
			iL <= 0 && (iL = 0);
			iT <= 0 && (iT = 0);
			iL >= maxL && (iL = maxL);
			iT >= maxT && (iT = maxT);
			oDrag.style.left = iL + "px";
			oDrag.style.top = iT + "px";
			return false
		};
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
			this.releaseCapture && this.releaseCapture()
		};
		this.setCapture && this.setCapture();
		return false
	};
	//最大化按钮
	oMax.onclick = function() {
		oDrag.style.top = oDrag.style.left = 0;
		//整个窗体
		oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
		oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
		//地图大小
		allMap.style.width = document.documentElement.clientWidth - 15 + "px";
		allMap.style.height = document.documentElement.clientHeight - 100 + "px";
		this.style.display = "none";
		oRevert.style.display = "block";
	};
	//还原按钮
	oRevert.onclick = function() {
		oDrag.style.width = dragMinWidth + "px";
		oDrag.style.height = dragMinHeight + "px";
		oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
		oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
		//地图大小
		allMap.style.width = "790px";
		allMap.style.height = "500px";
		this.style.display = "none";
		oMax.style.display = "block";
	};
	//关闭按钮
	oClose.onclick = function() {
		map.clearOverlays();
		document.getElementById("lng").value = '';
		document.getElementById("lat").value = '';
		oDrag.style.display = "none";
	};
}
window.onload = window.onresize = function() {
	var oDrag = document.getElementById("drag");
	var oTitle = get.byClass("title", oDrag)[0];
	drag(oDrag, oTitle);
	oDrag.style.left = (document.documentElement.clientWidth - 800) / 2 + "px";
	oDrag.style.top = (document.documentElement.clientHeight - 600) / 2 + "px";
}