module("appengine_class.js",function(){
    com.appengine.core = {};

    com.appengine.core.Platform = {
        chrome : navigator.userAgent.indexOf("Chrome") > -1,
        trident: navigator.userAgent.indexOf('Trident') > -1, //IE内核
        presto: navigator.userAgent.indexOf('Presto') > -1, //opera内核
        webKit: navigator.userAgent.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,//火狐内核
        mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: navigator.userAgent.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: navigator.userAgent.indexOf('iPad') > -1, //是否iPad
        webApp: navigator.userAgent.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: navigator.userAgent.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: navigator.userAgent.match(/\sQQ/i) == " qq", //是否QQ
        appengineiOS: navigator.userAgent.indexOf("appengine-iOS") > -1,
        appengineAndroid: navigator.userAgent.indexOf("appengine-android") > -1,
        appengineMobile: navigator.userAgent.indexOf("appengine-") > -1
    };
    var Platform = com.appengine.core.Platform;

    /**
     * @class com.appengine.core.Object
     * 所有对象的基类
     */
    Class.extend("com.appengine.core.Object",{
        init: function () {
        },
        /**
         * 拦截方法
         * @param methodName
         * @param method
         */
        interceptMethod : function(methodName,method) {
            Object.interceptMethod(this,methodName,method);
        },

        /**
         * @method
         * 获取类名称
         * @returns {*}
         */
        getClassName: function () {
            return this.constructor.className;
        },
        /**
         * @method
         * 获取类名称简称
         * @returns {string}
         */
        getSimpleClassName: function () {
            var stub = this.constructor.className.lastIndexOf(".");
            if (stub < 0) {
                stub = -1;
            }
            return this.constructor.className.substring(stub + 1);
        }
    });
    var Object = com.appengine.core.Object;

    Object.interceptMethod = function(object,methodName,method) {
        var originMethod = object[methodName];
        object[methodName] = function() {
            this._origin = originMethod;
            var ret = method.apply(this,arguments);
            delete this._origin;
            return ret;
        };
    }




    /**
     * @class com.appengine.core.LRUCache
     * LRUCache，当超出缓冲容量之后会自动移除最久没有使用的数据
     */
    Object.extend("com.appengine.core.LRUCache",{
        init : function(capacity) {
            Object.prototype.init.apply(this,arguments);
            this.capacity = capacity;
            this.keyMap = new Set();
            this.queue = [];
            this.onCacheRemoveCallback = null;
        },
        /**
         * 检测是否包含指定的key的数据
         * @param key
         * @returns {*}
         */
        contains : function(key) {
            return this.keyMap.has(key);
        }
        ,
        /**
         * 读取指定的数据，将增加该数据的热度。
         * @param key
         */
        get : function(key) {
            if(this.keyMap.has(key)){
                for(var i = 0; i < this.queue.length; i++){
                    if(this.queue[i].key === key){
                        var value = this.queue[i].value;
                        this.queue = this.queue.slice(0,i).concat(this.queue.slice(i + 1));
                        this.queue.unshift({key : key, value : value});
                        return value;
                    }
                }
            }
            return value;
        },
        /**
         * 添加新的数据
         * @param key
         * @param value
         */
        set : function(key, value) {
            if(this.keyMap.has(key)){
                var index = -1;
                for(var i = 0; i < this.queue.length; i++){
                    if(this.queue[i].key === key){
                        index = i;
                        break;
                    }
                }
                this.queue = this.queue.slice(0,index).concat(this.queue.slice(index + 1));
            }else{
                this.keyMap.add(key);
            }
            this.queue.unshift({key : key, value : value});

            if(this.queue.length > this.capacity){
                var pop = this.queue.pop();
                this.keyMap.delete(pop.key);
                if(this.onCacheRemoveCallback) {
                    this.onCacheRemoveCallback(pop.key,pop.value);
                }
            }
        }
    });


    com.appengine.core.StringUtil = {
        endsWith: function (value, suffix) {
            if (value == null || suffix == null || suffix.length == 0) {
                return false;
            }
            if (value.length < suffix.length) {
                return false;
            }
            return value.substring(value.length - suffix.length, value.length) == suffix;
        },
        startsWith: function (value, prefix) {
            if (value == null || prefix == null || prefix.length == 0) {
                return false;
            }
            if (value.length < prefix.length) {
                return false;
            }
            return value.substring(0, prefix.length) == prefix;
        },
        firstToUpper: function (value) {
            if (value == null || value.length == 0) {
                return value;
            }
            return value.substring(0, 1).toUpperCase() + value.substring(1);
        },
        isEmpty: function (value) {
            if (value == null || value.length == 0) {
                return true;
            }
            return /^\s*$/.test(value);
        },
        trim: function (value) {
            return value.replace(/(^\s*)|(\s*$)/g, '');
        }
    };

    /**
     *
     *  Base64 encode / decode
     *  http://www.webtoolkit.info/
     *
     **/
    com.appengine.core.Base64 = {
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = Base64._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },
        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = Base64._utf8_decode(output);
            return output;
        },
        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
    }
    var Base64 = com.appengine.core.Base64;

    com.appengine.core.RequestUtil = {
        getRequestParam : function(url) {
            var theRequest = {};
            theRequest.params = {};
            theRequest.frameworkParams = {};
            theRequest.setParam = function(name,value) {
                this[name] = value;
                if(name[0] == "@") {
                    this.frameworkParams[name.substring(1)] = value;
                } else {
                    this.params[name] = value;
                }
            }
            theRequest.toString = function() {
                var str = "";
                var first = true;
                for(var name in this.params) {
                    if(!first) {
                        str += "&";
                    } else {
                        first = false;
                    }
                    str += name;
                    str += "=";
                    str += encodeURIComponent(this.params[name]);
                }

                for(var name in this.frameworkParams.length) {
                    if(!first) {
                        str += "&";
                    } else {
                        first = false;
                    }
                    str += ("@"+name);
                    str += "=";
                    str += encodeURIComponent(this.frameworkParams[name]);
                }
                return str;
            }
            if(url == null) {
                return theRequest;
            }
            var stub = url.indexOf("?");
            if(stub >= 0) {
                url = url.substring(stub+1);
            } else {
                return theRequest;
            }

            var strs = url.split("&");
            for(var i = 0; i < strs.length; i ++) {
                var name = strs[i].split("=")[0];
                var value = decodeURIComponent(strs[i].split("=")[1]);
                theRequest[name]=value;
                if(name[0] == "@") {
                    theRequest.frameworkParams[name.substring(1)] = value;
                } else {
                    theRequest.params[name] = value;
                }
            }

            return theRequest;
        }
    }

    /**
     * trace
     * @param [int] [count=10]
     */
    window.trace = function(count) {
        var caller = arguments.callee.caller;
        var i = 0;
        count = count || 10;
        log("APPENGINEPROFILE ***----------------------------------------  ** " + (i + 1));
        while (caller && i < count) {
            var str = caller.toString();
            str = str.replace(/\n/g,"\nAPPENGINEPROFILE ")
            log(caller.toString());
            caller = caller.caller;
            i++;
            log("APPENGINEPROFILE ***---------------------------------------- ** " + (i + 1));
        }
    }

    window.argumentsToArray = function(args) {
        var arr = [];
        for(var i = 0 ; i < args.length; i++) {
            arr.push(args[i]);
        }
        return arr;
    }

    if(window.setInterval == null) {
        window.setInterval = function(callback,interval) {
            var handle = {running:true};
            var runInterval = function() {
                setTimeout(function () {
                    if(!handle.running) {
                        return;
                    }
                    callback();
                    runInterval();
                },interval);
            }
            runInterval();
            return handle;
        }
        window.clearInterval = function(handle) {
            handle.running = false;
        }
    }

})
