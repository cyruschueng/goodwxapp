var marker, oDrag = document.getElementById("drag");
// 百度地图API功能
var map = new BMap.Map("allmap"); // 创建Map实例
map.enableScrollWheelZoom(true);
map.addControl(new BMap.ScaleControl({
	anchor: BMAP_ANCHOR_BOTTOM_RIGHT
})); // 右下比例尺
map.setDefaultCursor("Crosshair"); //鼠标样式
map.addControl(new BMap.NavigationControl({
	anchor: BMAP_ANCHOR_TOP_RIGHT
})); //右上角，仅包含平移和缩放按钮
var cityList = new BMapLib.CityList({
	container: 'container',
	map: map
});
map.addEventListener("click", showInfo);

function showInfo(e) {
	map.clearOverlays();
	marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat)); // 创建标注
	map.addOverlay(marker);
	//获取经纬度
	document.getElementById("lng").value = e.point.lng;
	document.getElementById("lat").value = e.point.lat;
	document.getElementById("Coordinates").value = e.point.lng + "," + e.point.lat
}

function show() {
	$(".show_map").height("350")
	$("#show_map").height("300")
	window.parent.goTop()
	map.centerAndZoom('成都', 12); // 初始化地图,设置城市和地图级别。
	oDrag.style.display = "block";
}

function dhide() {
	map.clearOverlays();
	document.getElementById("lng").value = '';
	document.getElementById("lat").value = '';
	oDrag.style.display = "none";
}

function showMap() {
	oDrag.style.display = "none";
	var map1 = new BMap.Map("show_map");
	var lng = document.getElementById("lng").value;
	var lat = document.getElementById("lat").value;
	map1.centerAndZoom(new BMap.Point(lng, lat), map.getZoom());
	var marker1 = new BMap.Marker(new BMap.Point(lng, lat)); // 创建标注
	map1.addOverlay(marker1); // 将标注添加到地图中
}