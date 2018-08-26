var base_host = (typeof(base_page)!="undefined"&&base_page=="index")?"":"../";
var base_mode = "dev"; // dev/online
var server_news_host = 'http://182.254.156.20/pano-news-web';
var medias_root = 'http://mediastest.pano.visualbusiness.cn';
var server_tiles_host = 'http://tilestest.pano.visualbusiness.cn';
var server_luna_host = 'http://luna-test.visualbusiness.cn';
var preview_root = 'http://mob.visualbusiness.cn/newsexhibition-debug/index.html';

var server_wx_host = 'http://pay.visualbusiness.cn';
var server_wx_appid='wxf8884f6b1d84257d';  //测试清水湾appid wx0822f1c3513405ef  微景天下正式appid wxf8884f6b1d84257d

if(location.host == "pano.pingtan.visualbusiness.cn"){
	base_host="http://pano.pingtan.visualbusiness.cn/pano_news/";  //***
    preview_root = 'http://webapp.pano.pingtan.visualbusiness.cn/news/src/index.html';
	base_mode = "online";
    server_news_host = 'http://pano.pingtan.visualbusiness.cn/pano-news-web';
    
    server_tiles_host = 'http://tiles.pano.pingtan.visualbusiness.cn';
    // server_luna_host = 'http://pano.pingtan.visualbusiness.cn/vizen-module-user';  //    
    server_luna_host = 'http://luna.visualbusiness.cn';  //

    medias_root = 'http://medias.pano.visualbusiness.cn';
    server_wx_host = 'http://pay.visualbusiness.cn';
    server_wx_appid='wxf8884f6b1d84257d';
} else if(location.host.indexOf("182.254.156.20")!='-1'){
	base_host="http://182.254.156.20/pano_news/";  //***
    preview_root = 'http://webapp.pano.pingtan.visualbusiness.cn/news/src/index.html';
	base_mode = "dev";
    server_news_host = 'http://182.254.156.20/pano-news-web';
    
    server_tiles_host = 'http://tiles.pano.visualbusiness.cn';
    server_luna_host = 'http://182.254.156.20/vizen-module-user';

    medias_root = 'http://medias.pano.visualbusiness.cn';
    server_wx_host = 'http://pay.visualbusiness.cn';
    server_wx_appid='wxf8884f6b1d84257d';
}else if(location.host.indexOf("franco.visualbusiness")!='-1'){
	// base_host="http://182.254.156.20/pano_news/";  //***
    preview_root = 'http://webapp.pano.pingtan.visualbusiness.cn/news/src/index.html';
	base_mode = "dev";
    server_news_host = 'http://182.254.156.20/pano-news-web';
    
    server_tiles_host = 'http://tiles.pano.visualbusiness.cn';
    server_luna_host = 'http://182.254.156.20/vizen-module-user';

    medias_root = 'http://medias.pano.visualbusiness.cn';
    server_wx_host = 'http://pay.visualbusiness.cn';
    server_wx_appid='wxf8884f6b1d84257d';
}else if(location.host.indexOf('localhost')!='-1'){
    // base_host="http://pingtan.visualbusiness.cn/h5/pano_news/";  //***
    preview_root = 'http://webapp.pano.pingtan.visualbusiness.cn/news/index.html';
    base_mode = "dev";
    server_news_host = 'http://192.168.3.194:8080/pano-news-web';

    server_tiles_host = 'http://tiles.pano.visualbusiness.cn';
    server_luna_host = 'http://192.168.3.194:8081/vizen-module-user';

    medias_root = 'http://medias.pano.visualbusiness.cn';
    server_wx_host = 'http://pay.visualbusiness.cn';
    server_wx_appid='wxf8884f6b1d84257d';
}
var ued_conf = {
    root: base_host, //
    amdPath: base_host+'js/v1.0.0/', //
    version: 'v1.0.0',//
    waitTime: 180,
    publishVersion: 'v20170317',
    mode: base_mode // dev/online
};