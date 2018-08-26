/**
 * @description: flash上传模块
 * @author: Franco
 * @update:
 */
define('module/swfUpload', [
    'common/util',
    'common/errCode',
    'module/cookie'
], function(util, errCode, cookie){
	return {
        /**
         * 初始化上传组件
         */
		init : function(uploadUrl, panel, call){
            var self = this;
            self.uploadUrl = uploadUrl;
            window.uploadevent = self.uploadEvent;
            if(call) {
                window.uploadCall = call;
            }
            self.initData();
            if(swfobject.hasFlashPlayerVersion("9.0.18")){
                self.flashvars.uploadUrl = self.uploadUrl;
                self.getAvatar(panel, function(){
                    swfobject.embedSWF("/FaustCplus.swf", panel, "650", "500", "9.0.0", "/expressInstall.swf", self.flashvars, self.params, self.attributes);
                });
            }else{
                $('#'+panel).html('<div style="width: 650px; height:500px; text-align: center;"><div style="height:100%" class="picture"><div style="line-height:460px;"><span style="font-size:18px">您还没有安装flash播放器,请点击<a target="_blank" href="http://www.adobe.com/go/getflash">这里</a>安装</span></div></div></div>');
            }

		},
        /**
         * 初始化组件配置
         */
        initData : function(){
            var self = this;
            self.flashvars = {
                "jsfunc": "uploadevent",
                "token": cookie.get('_u_token'),
                "imgUrl": ued_conf.root + "images/defaultAvatar.jpg",
                "pid": "75642723",
                "uploadSrc": true,
                "showBrow": true,
                "showCame": true,
                "uploadUrl": self.uploadUrl
            };

            self.params = {
                menu: "true",
                scale: "noScale",
                allowFullscreen: "true",
                allowScriptAccess: "always",
                wmode: "transparent",
                bgcolor: "#FFFFFF"
            };

            self.attributes = {
                id: "FaustCplus"
            };
        },
        /**
         * 上传回调函数
         */
        uploadEvent : function (data){
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
                    if(window.uploadCall){
                        window.uploadCall(json);
                        window.uploadCall = null;
                    }
                }
            }

        },
        /**
         * 获取原头像
         */
        getAvatar : function(panel, call){
            var self = this,
                headUrl = $('#'+panel).attr('data-avatar');
            if(headUrl && headUrl.indexOf('defaultAv') == -1){
                var image = new Image();
                image.src = headUrl;
                image.onload = function(){
                    self.flashvars.imgUrl = headUrl;
                    call && call();
                };
                image.onerror = function(){
                    call && call();
                };
            }else{
                call && call();
            }
        }
	}
});