/**
 * @description: 常用方法、工具
 * @author: Franco
 * @update:
 */
define('common/util', [
    'module/cookie',
    'module/dynamicToken',
    'common/interface'
], function(cookie, dynamicToken, inter){
    var countdownTimer = {},
        countdownCacheTime = {},
        cookieName = 'countdownCookie';

    return {
        /**
         * ajax封装函数
         * 参数：url 请求连接  data 参数  sucCall 成功回调函数  errCall失败回调函数
         */
        setAjax : function(url, args, sucCall, errCall, method){
            var self = this,
                bToken = cookie.get('bToken') || '';

            // var cemp_session=cookie.get('cemp_session') || '';
            // if(cemp_session){
            //     args["cemp_session"]=cemp_session;
            // }
            args = self.objectToStr(args);
            var ajaxOptions = {
                type: method || 'POST',
                dataType: 'json',
                // data: JSON.stringify(args),
                xhrFields: {withCredentials: true },  //跨域访问带cookie等
                crossDomain: true,  //允许跨域
                data: args,
                cache: false,
                url: url,
                success: function(json){
                    if(json) {
                        if (json.result && json.result == 2) {
                            // cookie.del('cemp_session');
                            try{
                                top.location.href = '../index.html?referer=' + encodeURIComponent(location.href);
                            } catch (err) {
                                location.href = '../index.html';
                            }
                            
                        } else if(json.errorCode && json.errorCode == 10019){
                            alert('服务器繁忙，请稍后再试！');
                        }else {
                            sucCall(json);
                        }
                    }else{
                        if(errCall){
                            errCall();
                        }else{
                            alert('服务器繁忙，请稍后再试！');
                        }
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    switch (textStatus){
                        case "timeout":
                            //alert('服务无反应，请稍后再试！');
                            break;
                        case "error":
                            if(XMLHttpRequest.status != 0){
                                if(errCall){
                                    errCall();
                                }else{
                                    alert('服务器繁忙，请稍后再试！');
                                }
                            }
                            break;
                        case "notmodified":
                            //
                            break;
                        case "parsererror":
                            if(errCall){
                                errCall();
                            }else{
                                alert('服务器繁忙，请稍后再试！');
                            }
                            break;
                        default:
                            break;
                    }
                }
            };
            if( bToken ){
                var tokenKey = $.now();
                ajaxOptions.headers = {dToken: dynamicToken.getNewToken(bToken, tokenKey)+tokenKey};
            }
            if( method && method === 'GET' ){
                ajaxOptions.data = args;
            }else{
                // ajaxOptions.contentType = 'text/html; charset=utf-8';
                ajaxOptions.contentType= "application/json; charset=utf-8";
            }
            // if(window.location.href.indexOf("/html/")>0 || window.location.href.indexOf("/admin/")>0 ){
            //     // if(base_mode == "online"){
            //         ajaxOptions.xhrFields={"withCredentials": true };//跨域访问带cookie等
            //     // }
            // }
            return $.ajax(ajaxOptions);
        },
        
        objectToStr : function(args){
            var self = this;
            if(typeof args === 'object'){
                $.each(args, function(i, n){
                    args[i] = self.objectToStr(n);
                })
            }else{
                args = self.safeHTML(args);
            }
            return args;
        },
        /**
         * 判断URL格式合法性
         * 参数：str_url 需要验证的字符串
         * 返回：布尔值
         */
        isURL : function (str_url){
            var strRegex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            var re = new RegExp(strRegex);
            return re.test(str_url);
        },
        /**
         * 字符串格式化
         * 参数：s 模板  arr 数据数组
         * 返回：格式化后的字符串
         */
        strFormat : function(s, arr){
            if( !s || s.length == 0 ){
                s = '';
            }else{
                for(var i=0; i<s.length; i++){
                    s = s.replace(new RegExp("\\{"+i+"\\}","g"), arr[i]);
                }
            }
            return s;
        },
        /**
         * HTML模板处理
         * 参数：src 模板  options 数据JSON  ori 规则
         * 返回：HTML代码
         */
        template : function(src, options, ori) {
            var curStr='';
            if(this.isIE()){
                curStr = src;
            }else{
                curStr = [];
                var len = src.length;
                var i;
                for(i=0; i<len; i++){
                    curStr.push(src[i]);
                }
                curStr = curStr.join("");
            }

            var formatReg = new RegExp("#{([a-z0-9_\u4e00-\u9fa5-]+)}", "ig");
            curStr = curStr.replace(formatReg, function(match, f1, index, srcStr){
                //如果option[f1]返回undefined或null，将会被转为空字符串""
                //如果option[f1]返回0, 将会返回0
                //options[f1] = (options[f1] == 0 || options[f1] == "0") ? "0" : options[f1];
                if (options[f1] == 0 || options[f1] == "0") {
                    return options[f1];
                }else{
                    return options[f1] ? options[f1] : (ori?match:"");
                };
            });
            return curStr;
        },
        /**
         * Tab选项卡
         * 参数：obj 为tab按钮（必需）；
                 curCls 处于激活状态的按钮样式（必需）；
                 nomCls 处于普通状态的按钮样式；（非必须）；
                 callBack：回调（非必须）；
         */
        tab : function(obj, curCls, nomCls, callBack){
            var that = this,
                tabPanel = $(obj);
            tabPanel.on('click',function(e){
                var self = $(this),
                    index = tabPanel.index(this);

                tabPanel.removeClass(curCls);
                self.addClass(curCls);
                if (nomCls) {
                    if(that.isNullString(nomCls)){
                        tabPanel.addClass(nomCls);
                        self.removeClass(nomCls);
                    };
                };

                if(callBack)callBack(index);
                e.preventDefault();
            })
        },
        /**
         * 设置/获取地址栏参数
         */
        location : function(){
            var args = {},
                data = null,
                urlData = location.search,
                arrData;
            if(arguments.length == 1){
                data = arguments[0];
                if(typeof data === "string"){
                    var arr = this.location();
                    args = arr[data] || '';
                }else if(typeof data === "object"){
                    if(urlData.indexOf('?')>-1){
                        var oldLocation = this.location();
                        var newLocation = $.extend(oldLocation, data);
                        args = '?' + $.param(newLocation);
                    }else{
                        args = '?' + $.param(data);
                    }
                }
            }else if(arguments.length == 2){
                if(arguments[1] === ''){
                    args = this.location();
                    if(args[arguments[0]]){
                        delete args[arguments[0]];
                    }
                    args = $.isEmptyObject(args) ? '' : ('?' + $.param(args));
                }else{
                    args[arguments[0]] = arguments[1];
                    args = this.location(args);
                }
            }else{
                urlData = urlData.replace('?','');
                if(urlData.indexOf('&')>-1){
                    arrData = urlData.split('&');
                    $.each(arrData,function(i,n){
                        if(n.indexOf('=')>-1){
                            n = n.split('=');
                            args[n[0]] = decodeURIComponent(n[1]+'');
                        }else{
                            args[n] = '';
                        }
                    })
                }else{
                    if(urlData.indexOf('=')>-1){
                        arrData = urlData.split('=');
                        args[arrData[0]] = arrData[1];
                    }else{
                        args[urlData] = '';
                    }
                }
            }
            return args;
        },
        /**
         * 格式化时间戳
         */
        dateFormat : function(date,format){ 
            if(/^\d{10}$/.test(date)){
                var dateTime = new Date(date*1000);
            } else {
                var dateTime = new Date(date);
            }
            
            var o = { 
                "M+" : dateTime.getMonth()+1, //month 
                "d+" : dateTime.getDate(), //day 
                "h+" : dateTime.getHours(), //hour 
                "m+" : dateTime.getMinutes(), //minute 
                "s+" : dateTime.getSeconds(), //second 
                "q+" : Math.floor((dateTime.getMonth()+3)/3), //quarter 
                "S" : dateTime.getMilliseconds() //millisecond 
            };
            if(/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (dateTime.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            }
            for(var k in o){ 
                if(new RegExp("("+ k +")").test(format)){ 
                    format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
                } 
            } 
            return format; 
            /*var testDate = new Date( 1320336000000 );//这里必须是整数，毫秒 
            var testStr = testDate.format("yyyy年MM月dd日hh小时mm分ss秒"); 
            var testStr2 = testDate.format("yyyyMMdd hh:mm:ss"); 
            alert(testStr + " " + testStr2);*/
        },
        /**
         * 根据name获取表单对象
         * 参数：name 表单的name属性
         * 返回：jquery object 对象
         */
        getByName : function(name){
            var objInput = $('.main input[name="'+ name +'"]'),
                objSelect = $('.main select[name="'+ name +'"]'),
                objTextArea = $('.main textarea[name="'+ name +'"]');
            if(objInput.length>0 && (objInput.attr('type') === 'radio' || objInput.attr('type') === 'checkbox')){
                objInput = $('.main input[name="'+ name +'"]:checked');
            }
            return objInput.length>0 ? objInput : objSelect.length>0 ? objSelect : objTextArea.length>0 ? objTextArea : null;

        },

        //判断是否是空字符串 => ''
        //
        isNullString: function(s){
            return s.replace(/(^\s*)|(\s*$)/g, "").length == 0;
        },
        //判断是否是数组
        isArray: function(s){
            return s instanceof Array;
        },
        /**
         * 获取email,使用星号隐藏部分内容,例如:ice****@qq.com
         * @return 例如:ice****@qq.com
         */
        getMaskEmail : function(email) {
            if (this.isNullString(email)) {
                return email;
            }else{
                var split = email.split("@"),
                    prefixLength = split[0].length,
                    starCount = prefixLength < 4 ? prefixLength : 4,
                    prefix = '';

                prefix += split[0].substring(0, prefixLength - starCount);

                for (var i = 0; i < starCount; i++) {
                    prefix += "*";
                }

                return prefix + "@" + split[1];
            }
        },
        /**
         * 图片加载失败处理
         */
        imgLoadError : function(obj, size){
            var oImg = obj || $('img'),
                imgSize = size || 30;
            oImg.each(function(i, n){
                n.onerror = function(){
                    $(n).prop('src', ued_conf.root + 'images/common/default-'+ imgSize +'x'+ imgSize +'.png');
                }
            })
        },
        /**
         * 转换为安全的HTML
         */
        safeHTML : function (str) {
            if(str && typeof str === 'string'){
                str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            return str;
        },
        /**
         * 转换用户头像
         */
        getAvatar : function(avatar, w, h){
            !h && (h = w);
            if(avatar != null){
                if(avatar.indexOf("http://") == -1){
                    avatar = ued_conf.imgPath + avatar;
                }
                if(w != 0 && h != 0 && avatar.indexOf(ued_conf.imgPath) != -1){
                    avatar = avatar.replace(/(\_\d+\*\d+\.(?!.*\_\d+\*\d+\.))|\.(?!.*\.)/, "_" + w + "*" + h + ".");
                }
            }else{
                avatar = ued_conf.root + "images/defaultAvatar.jpg";
            }
            return avatar;
        },
        /**
         * 清除HTML
         */
        removeHTMLTag : function (str) {
            if(str && typeof str === 'string'){
                str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
                str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
                //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
                str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
            }
            return str;
        },
        /**
         * 倒计时
         * 参数：obj 显示倒计时对象   t 倒计时时间 单位（秒）  callback 倒计时为0时回调函数  name 定时器名字
         */
        countdown : function(obj, t, callback, eachCall, name, isCookie){
            var self = this,
                oldTime = 0,
                diffTime = 0,
                nowTime = $.now(),
                countdownSysTime = isCookie ? ($.parseJSON(cookie.get(cookieName)) || {}) : countdownCacheTime;
            name = name || 'default';
            oldTime = countdownSysTime[name] || 0;
            if(!oldTime){
                countdownSysTime[name] = nowTime;
                if(isCookie){
                    cookie.set(cookieName, JSON.stringify(countdownSysTime));
                }else{
                    countdownCacheTime[name] = nowTime;
                }
            }else{
                diffTime = nowTime - oldTime;
            }
            if(obj){
                $(obj+':input').val(parseInt((t*1000-diffTime)/1000));
                $(obj).text(parseInt((t*1000-diffTime)/1000));
            }

            if(t && diffTime < t*1000){
                countdownTimer[name] = setTimeout(function(){
                    self.countdown(obj, t, callback, eachCall, name, isCookie);
                }, 1000);
                eachCall && eachCall(t);
            }else{
                countdownSysTime[name] = 0;
                if(isCookie){
                    cookie.set(cookieName, JSON.stringify(countdownSysTime));
                }
                callback && callback();
            }
        },
        /**
         * 检查是否有未完成的倒计时
         */
        checkCountDown: function (btn, name){
            var self = this,
                cd = $.parseJSON(cookie.get('countdownCookie')) || {};
            if(cd[name]) {
                var timeLeft = parseInt((ued_conf.waitTime*1000 - ($.now() - cd[name]))/1000);
                if(timeLeft) {
                    btn.addClass('btn-disabled')
                        .html('<span class="countdown">' + timeLeft + '</span>秒后可重新发送');
                    self.countdown('.countdown', ued_conf.waitTime, function () {
                        btn.html('点击发送校验码').removeClass('btn-disabled');
                    }, null, name, 1);
                }
            }
        },
        /**
         * 清除倒计时对象
         */
        clearCountdown : function(name){
            name = name || 'default';
            clearTimeout(countdownTimer[name]);
        },
        /**
         * 字符串计数
         */
        wordsCount : function(input, tips, num, defaultNum){
            if(defaultNum && tips){
                $(tips).text(num - defaultNum);
            }
            $(input).on('keydown keyup blur mousecenter mouseleave mousemove',function(){
                var len = $(this).val().length || 0,
                    chrLen = num - len;
                tips && $(tips).text(chrLen > 0 ? chrLen : 0);
                if(chrLen < 0){
                    $(this).val($(this).val().substring(0, num))
                    return false;
                }
            });
        },
        /**
        * 处理过长的字符串，截取并添加省略号
        * 注：半角长度为1，全角长度为2
        *
        * pStr:字符串
        * pLen:截取长度
        *
        * return: 截取后的字符串
        */
        autoAddEllipsis : function (pStr, pLen, pEll) {
            var self = this,
                _ret = self.cutString(pStr, pLen),
                _cutFlag = _ret.cutFlag,
                _cutStringN = _ret.cutString;

            if ("1" == _cutFlag) {
                return _cutStringN + (pEll || "...");
            } else {
                return _cutStringN;
            }
        },

        /**
        * 取得指定长度的字符串
        * 注：半角长度为1，全角长度为2
        *
        * pStr:字符串
        * pLen:截取长度
        *
        * return: 截取后的字符串
        */
        cutString :function (pStr, pLen) {
            var self = this;
            if(!pStr){
                return {
                    "cutString": '',
                    "cutFlag": ''
                };
            }
            // 原字符串长度
            var _strLen = pStr.length,
                _tmpCode,
                _cutString,
                _cutFlag = "1",// 默认情况下，返回的字符串是原字符串的一部分
                _lenCount = 0,
                _ret = false;

            if (_strLen <= pLen/2) {
                _cutString = pStr;
                _ret = true;
            }

            if (!_ret) {
                for (var i = 0; i < _strLen ; i++ ) {
                    if (self.isFull(pStr.charAt(i))) {
                        _lenCount += 2;
                    } else {
                        _lenCount += 1;
                    }

                    if (_lenCount > pLen) {
                        _cutString = pStr.substring(0, i);
                        _ret = true;
                        break;
                    } else if (_lenCount == pLen) {
                        _cutString = pStr.substring(0, i + 1);
                        _ret = true;
                        break;
                    }
                }
            }

            if (!_ret) {
                _cutString = pStr;
                _ret = true;
            }

            if (_cutString.length == _strLen) {
                _cutFlag = "0";
            }

            return {
                "cutString": _cutString,
                "cutFlag": _cutFlag
            };
        },
        /**
        * 判断是否为全角
        *
        * pChar: 长度为1的字符串
        * return: true:全角
        *         false:半角
        */
        isFull : function (pChar) {
            for (var i = 0; i < pChar.length ; i++ ) {
                return pChar.charCodeAt(i) > 128
            }
        },
        /**
         * 关闭标签/浏览器 或 刷新浏览器
         * call: 回调函数
         */
        onBeforeBomUnload : function(call){
            if (this.isIE()) {
                window.document.body.onbeforeunload = call;
            }else{
                window.onBeforeUnload = call;
                $('body').attr('onbeforeunload', 'return onBeforeUnload();')
            }
        },
        /**
         * JSON序列化表单
         */
        formToJson : function(form){
            var param = $.type(form) == 'string' ? form : (form.serialize() || ''),
                arrParam = [],
                arrMap = [],
                returnJSON = {};
            if(param.indexOf('&')>-1){
                arrParam = param.split('&');
                $.each(arrParam, function(i, n){
                    if(n.indexOf('=')>-1){
                        arrMap = n.split('=');
                        returnJSON[arrMap[0]] = decodeURIComponent(arrMap[1]);
                    }
                })
            }
            return returnJSON;
        },/**
         * 保留2位或多位小数
         * pos 需要保留小数的位数，默认为2位
         */
        toFixed : function (num, pos){
            var floatNum = parseFloat(num),
                floatPos = pos || 2,
                roundNum = Math.pow(10, floatPos),
                returnNum = '0',
                indexNum = 0,
                remainNum = 0,
                i = 0;

            if(floatNum){
                returnNum = (Math.round(floatNum * roundNum)/roundNum) + '';
            }
            indexNum = returnNum.indexOf('.');
            if(indexNum == -1){
                returnNum += '.';
            }
            indexNum = returnNum.indexOf('.');
            remainNum = returnNum.substring(indexNum, returnNum.length).length - 1;
            if(remainNum >= floatPos){
                returnNum = returnNum.substring(0, indexNum + floatPos + 1);
            }else{
                for(; i < floatPos-remainNum; i++){
                    returnNum += '0';
                }
            }
            return returnNum;
        },
        /**
         * 判断是否为IE 并返回IE版本
         */
        isIE : function(){
            var ua = navigator.userAgent,
                returnBrowser = null;
            if(ua){
                ua = ua.toLocaleLowerCase();

                if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
                    returnBrowser = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
                }
            }
            return returnBrowser;
        },
        /**
         * 阿拉伯数字转中文
         */
        numToCharacter : function(num){
            if(!/^\d*(\.\d*)?$/.test(num)){
                return num;
            }
            var AA = ["〇","一","二","三","四","五","六","七","八","九"],
                BB = ["","十","百","千","万","亿","元",""],
                a = (""+ num).replace(/(^0*)/g, ""), k = 0, re = "";

            for(var i = a.length-1; i>=0; i--){
                switch(k){
                    case 0 : re = BB[7] + re; break;
                    case 4 : if(!new RegExp("0{4}\\d{"+ (a[0].length-i-1) +"}$").test(a))
                        re = BB[4] + re; break;
                    case 8 : re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
                }
                if(k%4 == 2 && a.charAt(i)=="0" && a.charAt(i+2) != "0") re = AA[0] + re;
                if(a.charAt(i) != 0) re = AA[a.charAt(i)] + BB[k%4] + re; k++;
            }
            return re;
        },
        /**
         * 本地图片预览
         */
        previewImage : function (divPreview, fileObj, noCall){
            var browserVersion = window.navigator.userAgent.toUpperCase(),
                imgPreview = divPreview.find('img');

            if(fileObj.files){//HTML5实现预览，兼容chrome、火狐7+等
                if(window.FileReader){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        imgPreview.prop("src", e.target.result);
                    };
                    reader.readAsDataURL(fileObj.files[0]);
                }else if(browserVersion.indexOf("SAFARI")>-1){
                    //alert("不支持Safari6.0以下浏览器的图片预览!");
                    if(noCall){
                        return noCall();
                    }
                }
            }else if (browserVersion.indexOf("MSIE")>-1){
                if(browserVersion.indexOf("MSIE 6")>-1){//ie6
                    imgPreview.prop("src", fileObj.value);
                }else{//ie[7-9]
                    var imgUrl = '';
                    fileObj.select();
                    try{
                        imgUrl = document.selection.createRange().text;
                    }catch (e){
                        fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问
                        imgUrl = document.selection.createRange().text;
                    }finally{
                        var newPreview = divPreview.find('.newImageBox');
                        if(!newPreview.length){
                            newPreview = $('<div class="newImageBox"></div>');
                            newPreview.width(divPreview.width());
                            newPreview.height(divPreview.height());
                            newPreview.css({
                                "margin": "auto"
                            });
                            imgPreview.before(newPreview);
                        }
                        newPreview[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + imgUrl + "')";
                        imgPreview.hide();
                    }
                }
            }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
                var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
                if(firefoxVersion<7){//firefox7以下版本
                    imgPreview.prop("src", fileObj.files[0].getAsDataURL());
                }else{//firefox7.0+
                    imgPreview.prop("src",window.URL.createObjectURL(fileObj.files[0]));
                }
            }else{
                imgPreview.prop("src", fileObj.value);
            }
        },        
        /**
         * 创建一段时间
         * containType 0 不包含前后
         *             1 包含前不包含后
         *             2 包含后不包含前
         *             3 包含前后
         */
        createTime : function (start, end, split, containType){
            var timeArr = [];
            start = (start || 0)*60;
            end = (end || 24)*60;
            split = split || 30;
            containType = containType || 3;
            for(var i = start; i <= end; i = i + split){
                var timeMod = i%60;
                    timeData = parseInt(i/60);
                if(timeData < 10){
                    timeData = '0' + timeData;
                }
                timeData = timeData + ':' + (timeMod || '00');
                if((containType == 0 && (i == start) || (i == end)) || (containType == 1 && i == end) || (containType == 2 && i == start)){

                }else{
                    timeArr.push(timeData);
                }
            }
            return timeArr;
        },
        /**
         * 控制台输出
         */
        trace : function(msg, color){
            if(ued_conf.mode === 'dev'){
                if(window.console){
                    if(color){
                        console.log('%c'+msg, 'color:'+color);
                    }else{
                        console.log(msg);
                    }
                }
            }
        },
        /**
         * 相关转码函数
         */
        arrayBufferToString:function(arrayBuffer){
            var binarry = this.arrayBufferToBase64(arrayBuffer);
            return this.binaryToString(binarry);
        },
        binaryToString:function(binary){
            var error;
            try {
                console.info(decodeURIComponent(escape(binary)));
                return decodeURIComponent(escape(binary));
            } catch (_error) {
                error = _error;
                if (error instanceof URIError) {
                    return binary;
                } else {
                    throw error;
                }
            }
        },
        arrayBufferToBase64:function(buffer){
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        },
        /**
         * 移动端微信或QQ访问
         * 0-否 1-微信 2-QQ
         */
        mobileQQOrWx: function(){
            var agent = window.navigator.userAgent;
            if(agent.indexOf('Android') > -1 || agent.indexOf('iPhone') > -1 || agent.indexOf('iPad') > -1) {
                if (agent.indexOf('MicroMessenger') > -1) {
                    //$.alert('微信访问。');
                    return 1;
                }
                if (agent.indexOf('QQ') > -1 && agent.indexOf('MQQBrowser') == -1) {
                    //$.alert('QQ访问。');
                    return 2;
                }
            }
            return 0;
        },
        getQueryString: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        uploadToLuna: function(file,callback,isBlob,type) {
            var url = inter.getApiUrl().uploadToLuna;
            var formData = null;
            if(isBlob) {
                file.name = 'blob.jpg';
            }
            if(window.FormData) {
                var formData = new FormData();
                formData.append('type', type || 'pic')
                if(isBlob) {
                    formData.append('file', file, 'blob.jpg');
                    // file.name = 'blob.jpg';
                } else {
                    formData.append('file', file);
                }
                formData.append('resource_type','app');
            }
            $.ajax({
                type: 'post',
                url: url,
                dataType: 'json',
                processData: false,
                contentType: false,
                data: formData,
                success: function(data) {
                    console.log('data', data)
                    if(data.code == 0 ) {
                        callback(data.data.access_url);
                    } else {
                        alert(data.msg);
                    }
                }
            });
        },
        // upload: function(path, file, callbackFun, callbackCallback) {
        //     $.ajax({
        //         xhrFields: {
        //            withCredentials: true
        //         },
        //         type: 'get',
        //         url: inter.getApiUrl().getSignature +'?path='+path,
        //         success: function(data) {
        //             if(data.result == 0 ) {
        //                 callbackFun && callbackFun(data.data,file, callbackCallback);
        //             } else {
        //                 alert(data.msg);
        //                 // var d = new Dialog({title: '提示', content: data.msg});
        //             }
        //         }
        //     });
        // },
        splitUrl: function(url) {
            url = url.replace(/\"/g,'').replace(/\'/g,'').replace(/'\s'/g,'');
            url = url.substr(4, url.length-5);
            url = url.split('?')[0];
            return url;
        },
        /*
          时间格式：YY-MM-DD
         */
        getDate: function(dateStr) {
            return new Date(dateStr);
        },
        getDateStr: function(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day =date.getDate();
            if(month < 10) {
                month = '0' + month;
            }
            if(day < 10) {
                day = '0' + day;
            }
            return ''+ year + month + day;
        },
        getPickerDateStr: function(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if(month < 10) {
                month = '0' + month;
            }
            // return '' + year +'-'+ month + '-01' ;
            return year + '/' + month + '/01';
        },
        getNowDateStr: function() {
            var date = new Date();
            // return getDateStr(date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day =date.getDate();
            if(month < 10) {
                month = '0' + month;
            }
            if(day < 10) {
                day = '0' + day;
            }
            return ''+ year + month + day;
        },
        getLaterDateStr: function(date, interval) {
            var date = new Date(date.getTime() - interval * 24 * 3600 * 1000);
            // return getDateStr(laterDate);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day =date.getDate();
            if(month < 10) {
                month = '0' + month;
            }
            if(day < 10) {
                day = '0' + day;
            }
            return ''+ year + month + day;
        },
        
    }
});