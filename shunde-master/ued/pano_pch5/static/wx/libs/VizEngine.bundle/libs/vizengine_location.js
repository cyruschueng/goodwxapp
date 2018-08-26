module("vizengine_global.js",function(){
    var Object = com.vizengine.core.Object;
    var $ = com.vizengine.$;

    Object.extend("com.vizengine.location.LocationManager",{

    });

    var LocationManager = com.vizengine.location.LocationManager;


    // h5版本不会调用这个方法，这只会在app内部调到这里，
    // 因为h5版本已经带有除经纬度以外的其他信息了
    var wareLocInfo = function(locInfo,callback) {
        $.get(window.location.protocol+"//apis.map.qq.com/ws/geocoder/v1/?location="+locInfo.latitude+","+locInfo.longitude+"&key=DGPBZ-7V6RX-ANC4R-ZLIA3-ROB7F-ESBTM",{},function(data){
            var json = JSON.parse(data);
            if(json == null || json.result == null || json.result.ad_info == null) {
                callback(locInfo);
                return;
            }

            var loc = json.result.ad_info;
            locInfo.adcode = loc.adcode; // 行政区划代码
            locInfo.nation = loc.nation; // 国家
            locInfo.province = loc.province; // 省 / 直辖市
            locInfo.city = loc.city; // 市 / 地级区 及同级行政区划
            locInfo.district = loc.district; // 区 / 县级市 及同级行政区划

            callback(locInfo);
        })
    }

    /*
     * 获取位置信息
     * @param param
     * @param callback
     */
    LocationManager.getLocation = function(param,callback) {
        nativeGetLocation(param,function(locInfo) {
            if(locInfo != null && locInfo.nation == null) {
                wareLocInfo(locInfo,callback);
                return;
            }
            callback(locInfo);
        });
    }



})