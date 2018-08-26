;
(function(win) {
    win.util = {
        GetQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return decodeURIComponent(r[2]);
            return null;
        },

        //设置cookie
        setCookie: function(key, value, t) {
            var cookie_key = M.Const.cookie_prefix + key;
            var oDate = new Date();
            oDate.setHours(oDate.getHours() + t);
            if (!t) {
                oDate = new Date(0x7fffffff * 1e3);
            }
            document.cookie = cookie_key + '=' + value + ';expires=' + oDate.toGMTString() + ';path=/';
        },
        //删除cookie    
        delCookie: function(key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(key);
            var cookie_key = M.Const.cookie_prefix + key;
            if (cval != null) {
                document.cookie = cookie_key + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/';
            }
        },

        //获得cookie
        getCookie: function(key) {
            var cookie_key = M.Const.cookie_prefix + key;

            var arr1 = document.cookie.split('; ');
            for (var i = 0; i < arr1.length; i++) {
                var arr2 = arr1[i].split('=');
                if (arr2[0] == cookie_key) {
                    return decodeURI(arr2[1]);
                }
            }

        }
    }
})(window.win = window.win || {}, window);