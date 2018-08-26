//导航

//获取地理位置和导航等信息
var myLongitude;
var myLatitude;
var latlng={"lng":"116.397390","lat":"39.908860"};
var navDestination={"lng":"116.397390","lat":"39.908860","title":"目的地","address":"地址"};
function showNav(obj) {
    if(!is_weixn()){
      if(obj){
        navDestination.lat=$(obj).attr("lat");
        navDestination.lng=$(obj).attr("lng");
        navDestination.title=$(obj).attr("title");
        navDestination.address=$(obj).attr("address");
         window.location.href="http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=" + navDestination.title + "&tocoord="+ navDestination.lat +"," + navDestination.lng + "&policy=1&referer=myapp";
      }
      // alert($(obj).attr("lat")+","+$(obj).attr("lng"));
        // getMyLocation();
    }
 }
// HTML填充信息窗口内容

function getMyLocation(){

  var options={
      enableHighAccuracy:true,
      maximumAge:1000
  }
  if(navigator.geolocation){
      //浏览器支持geolocation
      // alert("before");
      navigator.geolocation.getCurrentPosition(getMyLocationOnSuccess,getMyLocationOnError,options);
      // alert("end");
  }else{
      //浏览器不支持geolocation
      alert("请检查手机定位设置，或者更换其他支持定位的浏览器尝试！");
  }
}

//成功?
function getMyLocationOnSuccess(position){
//返回用户位置
//经度
myLongitude = position.coords.longitude;
//纬度
myLatitude = position.coords.latitude;
// alert(myLatitude);
//将经纬度转换成腾讯坐标
qq.maps.convertor.translate(new qq.maps.LatLng(myLatitude,myLongitude), 1, function(res){
//取出经纬度并且赋值
 latlng = res[0];
    var url = "http://map.qq.com/nav/drive?start="+latlng.lng+"%2C"+latlng.lat+"&dest="+navDestination.lng+"%2C"+navDestination.lat+"&sword=我的位置&eword="+navDestination.title+"&ref=mobilemap&referer=";
    // alert(url);
    window.location.href=url;
});
// alert("经度"+myLongitude);
// alert("纬度"+myLatitude);
}

//失败?
function getMyLocationOnError(error){
    switch(error.code){
        case 1:
        alert("位置服务被拒绝?");
        break;

        case 2:
        alert("暂时获取不到位置信息");
        break;

        case 3:
        alert("获取信息超时");
        break;

        default:
         alert("未知错误");
        break;
    }
}

 function is_weixn(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
}  
