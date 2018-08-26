/**
 * 静态文件加载器 - v0.1.1 - 2016-06-01
 * Copyright (c) 2016 Franco
 */
var ued_souce = window.UED_Souce || {},
    ued_root = window.UED_ROOT || ued_conf.root,
    ued_mode = window.UED_IMPORT_MODE || ued_conf.mode,
    ued_version = window.UED_VERSION || ued_conf.version,
    ued_publishTime = window.UED_publishTime || ued_conf.publishTime,
    ued_publishVersion = window.UED_PUBLISH_VERSION || ued_conf.publishVersion;

/** 
 * @function import
 * @param id 静态文件的id名称
 * @param fileType  文件类型  js/css
 * @param mode 运行环境 dev/online dev表示环境加载多个源码文件 online代表线上环境 加载单个合并压缩后的文件
*/
function ued_import(id, fileType, mode, isHead) {
	var __mode = ued_mode,
        __id = id +'.' + fileType,
        jsTemplate = '<script src="${src}" charset="utf-8" type="text/javascript" itemid="${itemid}"><\/script>',
        cssTemplate = '<link rel="stylesheet" type="text/css" href="${href}">';

	if (mode) {
		__mode = mode;
	} else if (window.UED_IMPORT_MODE) {
		__mode = window.UED_IMPORT_MODE;
	}

	if (!ued_souce[__id]) {
		return false;
	}

	function __import(aFiles, type, id) {
		for(var i=0; i<aFiles.length; i++) {
            var outStr = '';
			if (type == "js") {
                outStr = jsTemplate.replace("${src}", ued_root + aFiles[i]+"?_t="+ued_publishTime).replace("${itemid}", id);
			} else if (type == "css") {
                outStr = cssTemplate.replace("${href}", ued_root + aFiles[i]+"?_t="+ued_publishTime).replace("${itemid}", id);
			}
            if(isHead){
                asyncImportJs(ued_root + aFiles[i]+"?_t="+ued_publishTime);
            }else{
                document.write(outStr);
            }
		}
	}

    if (__mode == "online") {
		if ("css" == fileType) {
			__import(["dist/"+ ued_publishVersion + "/css/" + __id.replace(".css", "-min.css")], fileType, __id);
		} else {
			__import(["dist/"+ ued_publishVersion + "/" + __id.replace(".js", "-min.js")], fileType, __id);
		}
    } else if (__mode == "dev") {
        __import(ued_souce[__id], fileType, __id);
    }
} 
/** 
 * @function asyncImport
 * @param src js的路径
*/
function asyncImportJs(src, charset) {
	var container = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = src;

    if (charset) {
        script.charset = charset;
    }
    // 防止没有head标记的情况
    if (!container) {
        document.body.insertBefore(script, document.body.firstChild);
    } else {
        container.appendChild(script);
    }
}