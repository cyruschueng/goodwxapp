var config =function (){
	return {
		onlineFlag:false
	}
}();
var url_root = 'http://datatest.pano.visualbusiness.cn/rest';
var medias_root = 'http://mediastest.pano.visualbusiness.cn';
var luna_root = 'http://luna-test.visualbusiness.cn';
// var url_root = 'http://datatest.pano.visualbusiness.cn/rest';
var pano_url = 'http://mob.visualbusiness.cn/album_pano-debug/index.html';
if(location.host.indexOf('pano.visualbusiness')!='-1') {
	url_root = 'http://data.pano.visualbusiness.cn/rest';
	pano_url = 'http://mob.visualbusiness.cn/album_pano/index.html';
	config.onlineFlag = true;
  medias_root = 'http://medias.pano.visualbusiness.cn';
  luna_root = 'http://luna.visualbusiness.cn';
}else if(location.host.indexOf('pano.shunde.vizen.cn')!='-1') {
	url_root = 'http://pano.shunde.vizen.cn/pano-viewer-web/rest';
	pano_url = 'http://pano.shunde.vizen.cn/album/src/index.html';
	config.onlineFlag = true;
  	medias_root = 'http://medias.pano.visualbusiness.cn';
  	// luna_root = 'http://pano.pingtan.visualbusiness.cn/vizen-module-user';
  	luna_root = 'http://luna.visualbusiness.cn';
}else if(location.host.indexOf('franco.visualbusiness.cn')!='-1') {
	url_root = 'http://111.231.53.151/pano-viewer-web/rest';
	pano_url = 'http://pano.shunde.vizen.cn/album/src/index.html';
	config.onlineFlag = true;
		medias_root = 'http://medias.pano.visualbusiness.cn';
		luna_root = 'http://111.231.53.151/vizen-module-user';
}else if(location.host.indexOf('localhost')!='-1') {
	// url_root = 'http://192.168.3.194:8080/pano-viewer-web/rest';
	url_root1 = 'http://111.231.53.151:8088';
    url_root = 'http://111.231.53.151/pano-viewer-web/rest';
	pano_url = 'http://pano.shunde.vizen.cn/album/src/index.html';
	config.onlineFlag = true;
  	medias_root = 'http://medias.pano.visualbusiness.cn';
  	// luna_root = 'http://192.168.3.194:8081/vizen-module-user';
  	luna_root = 'http://luna.visualbusiness.cn';
}
else if(location.host.indexOf('111.231.53.151')!='-1') {
    // url_root = 'http://192.168.3.194:8080/pano-viewer-web/rest';
    url_root1 = 'http://111.231.53.151:8088';
    url_root = 'http://111.231.53.151/pano-viewer-web/rest';
    pano_url = 'http://pano.shunde.vizen.cn/album/src/index.html';
    config.onlineFlag = true;
    medias_root = 'http://medias.pano.visualbusiness.cn';
    // luna_root = 'http://192.168.3.194:8081/vizen-module-user';
    luna_root = 'http://luna.visualbusiness.cn';
}else if(location.host.indexOf('shunde.vizen.cn')!='-1') {
  // url_root = 'http://192.168.3.194:8080/pano-viewer-web/rest';
  url_root1 = 'http://shunde.vizen.cn';
  url_root = 'http://shunde.vizen.cn/pano-viewer-web/rest';
  pano_url = 'http://pano.shunde.vizen.cn/album/src/index.html';
  config.onlineFlag = true;
  medias_root = 'http://medias.pano.visualbusiness.cn';
  // luna_root = 'http://192.168.3.194:8081/vizen-module-user';
  luna_root = 'http://luna.visualbusiness.cn';
}
