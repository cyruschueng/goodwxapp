/**
 * @description: flash上传头像模块
 * @author: Franco
 * @update:
 */
define('module/swfAvatar', [
    'common/util',
    'common/errCode',
    'module/cookie'
], function(util, errCode, cookie){
	function uploadEvent(data){
        console.log('data----'+data);
        if( data == 'M01109' ){
            $.alert('摄像头已被程序占用，请先停止占用程序再试。');
        }else if( data == 'M01108' ){
            $.alert('您选择的文件过大，请选择2M以内的文件。');
        }else if( data == 'M01107' ){
            $.alert('您选择的文件格式错误，请选择格式为JPG、GIF、PNG的文件。');
        }else if( $.type(data) === "string" ){
            var json = $.parseJSON(data);
            if(json.code){
                $.alert(errCode.get(json.code));
            }else{
                json.data.head = util.isURL(json.data.head) ? json.data.head : (ued_conf.imgPath + json.data.head);
                $('#head-avator').attr('src', util.getAvatar(json.data.head||'', 30) + '?' + Math.random());
            }
            /*switch(data.code){
                case 1: // 上传头像成功
                    $('#head-avator').attr('src', util.getAvatar(data.head, 30) + '?' + Math.random());
                    break;
                case 2:
                    break;
                case -1:
                    break;
                case -2: // 上传头像失败
                    $.alert('上传失败！');
                    break;
                case 3:
                    $('#head-avator').attr('src', ued_conf.root + 'images/defaultAvatar.jpg');
                    break;
                default:
                    break;
            }*/
        }

	}

	var uploadUrl = null;

    window.uploadevent = uploadEvent;

	var flashvars = {
	    "jsfunc": "uploadevent",
        "token": cookie.get('_u_token'),
	    "imgUrl": ued_conf.root + "images/defaultAvatar.jpg",
	    "pid": "75642723",
	    "uploadSrc": true,
	    "showBrow": true,
	    "showCame": true,
	    "uploadUrl": uploadUrl
	};

	var params = {
		menu: "true",
		scale: "noScale",
		allowFullscreen: "true",
		allowScriptAccess: "always",
		wmode: "transparent",
		bgcolor: "#FFFFFF"
	};

	var attributes = {
		id: "FaustCplus"
	};

    var getAvator = function(panel, call){
        var headUrl = $('#'+panel).attr('data-avator');
        headUrl = util.isURL(headUrl) ? headUrl : (ued_conf.imgPath + headUrl);
        if(headUrl && headUrl.indexOf('defaultAv') == -1){
            var image = new Image();
            image.src = headUrl;
            image.onload = function(){
                flashvars.imgUrl = headUrl; 
                call && call();               
            };
            image.onerror = function(){
                call && call(); 
            };
        }else{
            call && call(); 
        }
    };

	return {
		init : function(uploadUrl, panel){
            if(swfobject.hasFlashPlayerVersion("9.0.18")){
                flashvars.uploadUrl = uploadUrl;
                getAvator(panel, function(){
                    swfobject.embedSWF("/FaustCplus.swf", panel, "650", "500", "9.0.0", "/expressInstall.swf", flashvars, params, attributes);
                });
            }else{
                $('#'+panel).html('<div style="width: 650px; height:500px; text-align: center;"><div style="height:100%" class="picture"><div style="line-height:460px;"><span style="font-size:18px">您还没有安装flash播放器,请点击<a target="_blank" href="http://www.adobe.com/go/getflash">这里</a>安装</span></div></div></div>');
            }

		}
	}
});