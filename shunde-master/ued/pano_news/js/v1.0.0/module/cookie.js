/**
 * @description: cookie
 * @author: Franco
 * @update:
 */
define('module/cookie', [], function(){

    return {
        /**
         * 读取cookie
         * @param String name
         * @return String value
         */
        get: function (name) {
            var cookieStr = "; " + document.cookie + "; ";
            var index = cookieStr.indexOf("; " + name + "=");
            if (index != -1) {
                var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
                return decodeURIComponent(s.substring(0, s.indexOf("; ")));
            } else {
                return null;
            }
        },
        /**
         * 设置cookie
         * @param String name, String value, Int days
         * @return
         */
        set: function (name, value, exp, domain) {
            var cookieStr = null,
                expires = null;
            if (exp) {
                expires = "; expires=" + exp.toGMTString();
            }else{
                expires = "";
            }
            cookieStr = name + "=" + encodeURIComponent(value) + expires + "; path=/";
            if(domain){
                cookieStr += ';domain=' + domain;
            }
            document.cookie = cookieStr;
        },
        /**
         * 删除cookie
         * @param String name
         * @return
         */
        del: function (name) {
            var exp = new Date(new Date().getTime() - 1);
            var s = this.get(name);
            if (s != null) {
                document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ";path=/"
            };
        },
        /**
         * 清除所有cookie
         * @return
         */
        clearAllCookie : function (){
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            if (keys) {
                for (var i = keys.length; i--;)
                    document.cookie = keys[i]+'=0;expires=' + new Date( 0).toUTCString() + ";path=/";
            }
        }
    }

});
