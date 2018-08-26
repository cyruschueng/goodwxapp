/**
 * @description: 登录注册验证模块
 * @author: fangyuan(43726695@qq.com)
 * @update:
 */
define('module/checkForm', [
    'common/interface',
    'common/util',
    'common/errCode'
], function(inter, util, errCode){

    var errStr = {
            required: "请输入{0}。",
            email: "请输入正确格式的电子邮箱",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            digits: "{0}错误，请重新输入。",
			postiveDigits: "{0}输入格式错误，请重新输入。",
            bankCard: "{0}错误，请重新输入。",
            IDCard: "请输入合法的{0}",
            equalBy: "两次密码不一致，请重新输入",
            equalTo: "两次密码不一致，请重新输入",
            notEqualTo: '{0}不能相同，请重新输入。',
            accept: "请输入拥有合法后缀名的字符串",
            maxLength: "请输入一个长度最多是 {1} 的字符串",
            minLength: "{0}错误，请重新输入。",
            rangeLength: "{0}长度错误。",
            range: "请输入一个介于 {0} 和 {1} 之间的值",
            max: "请输入一个最大为{0} 的值",
            min: "请输入一个最小为{0} 的值",
            isAmount: '{0}必须为正整数或小数，小数点后不超过{1}位。',
            notMoreThan: '{0}不能大于{1}，请重新输入。',
            notLessThan: '请输入大于{1}的{0}。',
            isMobile: '手机号码错误，请重新输入。',
            isDate: '{0}错误，请重新输入。',
            isPwd: '登录密码格式不正确，请重新输入。',
            isPayPwd: '支付密码格式不正确，请重新输入。',
            uniqueExist: '{0}已存在，请重新输入。',
            uniqueChecking: '正在验证中...',
            isYear: '{0}错误，请重新输入。',
            isMonth: '{0}错误，请重新输入。',
            isDay: '{0}错误，请重新输入。',
            isSpecChar: '{0}包含非法字符(<>=^\\?)，请重新输入',
            isLegalPass: '{0}包含非法字符(%@$或者多余空格)，请重新输入',
        },
        sendFrom = true,
        checking = null,
        checkObject = {},
        checkCall = null,
        timer = null;
    return {
        /**
         * 初始化表单验证
         */
        init : function(obj, submitCall, opts){
            var self = this;
                self.$elem = $(obj);
            self.options = opts || {};
            var allItem = $(obj).find('button[type="text"],input[type="text"],input[type="password"],textarea');
            allItem.each(function (i, n) {
                var valid = $(n).attr('data-validate'),
                    rule = $(n).attr('data-rule'),
                    name = $(n).attr('data-name');
                if (valid) {
                    $(n).on('blur', function (e) {
                        var $this = $(this);
                        self.checkData($this);
                        e.stopPropagation();
                    });
                }
            });
            $(obj).data('submitCall', submitCall);

            $(obj).on('submit', function (e) {
                var $this = $(this),
                    formCall = $this.data('submitCall');

                allItem.trigger('blur');
                checkCall = function(){
                    if ($this.find('.icon-form-error').length) {
                        return false;
                    }
                    if (formCall) {
                        e.preventDefault();
                        formCall(util.formToJson($this));
                        return false;
                    }
                };
                self.checkAjax(checkCall);
            });
        },
        checkAjax: function(call){
            var self = this;
            clearTimeout(timer);
            if(checkObject.ing){
                timer = setTimeout(function(){
                    self.checkAjax(call);
                }, 500)
            }else{
                call();
            }
        },
        /**
         * 根据伪属性规则进行验证
         */
        checkData : function(o){
            var self = this,
                val = o.val(),
                valid = o.attr('data-validate'),
                name = o.attr('data-name'),
                errMsg = o.attr('data-err'),
                rule = o.attr('data-rule'),
                right = o.attr('data-right'),
                r = {},
                regHasParam = new RegExp('\\(.*?\\)'),
                regGetParam = new RegExp('\\((.*?)\\)'),
                tipWarp = self.options.tipWarp ? self.options.tipWarp(o) : o.parent();

            if(!self.isSpecChar(val, name).match){
                self.changeClass(self.isSpecChar(val, name).match, o, tipWarp.find('.tips'), self.isSpecChar(val, name).msg);
                var newText = o.val().replace(/[\<\>\=\^\\\[\]\{\}\"]/g, '');
                $.alert('请勿输入特殊字符(<>[]{}=^\")');
                o.val(newText);
            }
            if(valid.indexOf('|') > -1){
                valid = valid.split('|');
                $.each(valid, function(i, n){
                    if(n.indexOf('unique') > -1){
                        if (regHasParam.test(n)) {
                            r = self[n.replace(regHasParam, '')](val, regGetParam.exec(n)[1], name, function(rr){
                                if (!rr.match) {
                                    self.changeClass(rr.match, o, tipWarp.find('.tips'), errMsg || rr.msg, '');
                                    return false;
                                }
                                if (rr.match && i === valid.length - 1) {
                                    self.changeClass(rr.match, o, tipWarp.find('.tips'), errMsg, right ? 'icon-form-right' : -1);
                                }
                            });
                            if (!r.match) {
                                self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg || r.msg, '');
                                return false;
                            }
                            if (r.match && i === valid.length - 1) {
                                self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg, right ? 'icon-form-right' : -1);
                            }
                        }
                    }else {
                        if (regHasParam.test(n)) {
                            r = self[n.replace(regHasParam, '')](val, regGetParam.exec(n)[1], name);
                        } else {
                            r = self[n](val, name);
                        }
                        if (n.indexOf('optional') > -1) {
                            self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg, right ? 'has-success' : -1);
                            return !r.match;
                        }
                        if (n.indexOf('isAmount') > -1 && r.match) {
                            o.val(parseFloat(val));
                        }
                        if (!r.match) {
                            self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg || r.msg, '');
                            return false;
                        }
                        if (r.match && i === valid.length - 1) {
                            self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg, right ? 'icon-form-right' : -1);
                        }
                    }
                });
            }else {
                if(regHasParam.test(valid)){
                    r = self[valid.replace(regHasParam, '')](val, regGetParam.exec(valid)[1], name);
                }else{
                    r = self[valid](val, name);
                }
                if (valid.indexOf('optional') > -1) {
                    self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg, right ? 'has-success' : -1);
                    return !r.match;
                }
                if(valid.indexOf('isAmount') > -1 && r.match){
                    o.val(parseFloat(val));
                }
                self.changeClass(r.match, o, tipWarp.find('.tips'), errMsg || r.msg, r.match ? (right ? 'icon-form-right' : -1) : '');
            }
        },
        /**
         * input状态，附带图标和提示
         * match: 显示图标正确或错误, o:input jQuery对象, errBox 错误提示的<div>jquery对象, errMsg 错误信息
         */
        changeClass : function(match, o, errBox, errMsg, tipCls){
            var self = this,
                tipWarp = o.parent();
            if(self.options.tipWarp){
                tipWarp = self.options.tipWarp(o);
            }
            tipCls = tipCls || 'icon-form-error';
            if(errBox.length){
                errBox.removeClass('none');
            }else{
                errBox = $('<span class="tips txt-red"></span>');
                tipWarp.append(errBox);
            }
            switch (match){
                case -1:
                    o.addClass('inp-alert');
                    sendFrom = false;
                    if(errBox)errBox.html(errMsg);
                    break;
                case 0:
                case false:
                   // o.addClass('inp-error');
                    sendFrom = false;
                    if(errBox)errBox.html(errMsg);
                    break;
                case 1:
                case true:
                    o.removeClass('inp-error');
                    if(errBox)errBox.html('&nbsp;');
                    sendFrom = true;
                    break;
                default:
                    break;
            }
            if(tipCls == -1){
                errBox.addClass('none');
            }else{
                var tip = errBox.find('em');
                if (!tip.length) {
                    errBox.prepend('<em class="icon ' + tipCls + '"></em>');
                } else {
                    tip.attr('class', 'icon ' + tipCls);
                }
            }
        },
        /**
         * 邮箱账号补全
         */
        emailTips : function(obj, call){
            var self = this,
                loginObj = $(obj),
                oldData = ["qq.com","163.com","yahoo.com","yahoo.cn","126.com","sina.com","sohu.com","gmail.com","hotmail.com","foxmail.com"];

            loginObj.on('keyup', function(){
                var inpVal = $(this).val(),
                    newData = [],
                    lastData = null;
                $.each(oldData, function (i, n){
                    var newStr = '';
                    if (inpVal.indexOf("@" ) <= -1){
                        newStr = inpVal + "@" + n;
                    }else{
                        newStr = inpVal.substring(0, inpVal.indexOf( "@" ))+"@" + n;
                    }
                    if(lastData != newStr){
                        lastData =  newStr;
                        newData.push(newStr);
                    }
                });

                /**
                 * 调用自动补全插件
                 */
                loginObj.AutoComplete({
                    'follow': true,
                    'width': 'auto',
                    'maxHeight': "160",
                    'afterSelectedHandler': function(){
                        call && call();
                    },
                    'data': newData
                });
            });
        },
        /**
         * 数据唯一
         */
        unique : function(s, n, name, call){
            (checking && n == checkObject.n) && checking.abort();
            checkObject.n = n;
            checkObject.ing = true;
            checking = util.setAjax(util.strFormat(inter.getApiUrl().existInfo, [n, s]), {}, function(json){
                if(json.errCode && !json.success){
                    call({
                        match : false,
                        msg : util.strFormat(errStr.uniqueExist, [name])
                    });
                }else{
                    call({
                        match : true,
                        msg : ''
                    });
                }
                checkObject.ing = false;
            }, function(){
                call({
                    match : false,
                    msg : '服务器繁忙，请稍后再试。'
                });
                checkObject.ing = false;
            });
            return {
                match : false,
                msg : errStr.uniqueChecking
            };
        },
        /**
         * 必须的
         */
        required : function(s, name){
            return {
                match : /\S+/.test(s),
                msg : util.strFormat(errStr.required, [name])
            };
        },
        /**
         * 选填的
         */
        optional : function(s){
            return {
                match : !(/\S+/.test(s))
            };
        },
        /**
         * 金额
         */
        isAmount: function(s, n, name){
            var reg = new RegExp("^\\d+\\.?\\d{0,"+ n +"}$");
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isAmount, [name, n])
            };
        },
        /**
         * 不能大于
         */
        notMoreThan: function(s, n, name){
            var sName = '账户可用余额';
            if(n.indexOf(",") > -1){
                n = n.split(",");
                sName = n[1];
                n = n[0];
            }
            return {
                match : parseFloat(s) <= parseFloat(n),
                msg : util.strFormat(errStr.notMoreThan, [name, sName])
            };
        },
        /**
         * 不能小于
         */
        notLessThan: function(s, n, name){
            return {
                match : parseFloat(s) >= parseFloat(n),
                msg : util.strFormat(errStr.notLessThan, [name, n])
            };
        },
        /**
         * 邮箱
         */
        email : function(s){
            var reg = new RegExp(/^[0-9a-zA-Z_][_.0-9a-zA-Z-]{0,31}@([0-9a-zA-Z][0-9a-zA-Z-]{0,30}\.){1,4}[a-zA-Z]{2,4}$/);

            return {
                match : reg.test(s),
                msg : errStr.email
            };
        },
        /**
         * 链接地址
         */
        url : function(s){
            var strRegex = /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            var re = new RegExp(strRegex);
            return re.test(s);
        },
        date : function(){
            try{

            }catch(e){

            }
        },
        /**
         * 整数
         */
        digits : function(s, name){
            return {
                match : /^-?\d+$/.test(s),
                msg : util.strFormat(errStr.digits, [name])
            };
        },
		/**
         * 正整数
         */
        postiveDigits : function(s, name){
            return {
                match : /^\d*[1-9]\d*$/.test(s),
                msg : util.strFormat(errStr.postiveDigits, [name])
            };
        },
        /**
         * 身份证号码
         */
        IDCard : function(s, name){
            return {
                match : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s),
                msg : util.strFormat(errStr.IDCard, [name])
            };
        },
        /**
         * 被某个对象值相等
         */
        equalBy : function(s, o){
            var self = this,
                result = {
                    match : true,
                    msg : '正确'
                },
                v = $(o).val();
            if(v && s !== v ){
                result = {
                    match : false,
                    msg : errStr.equalBy
                }
            }
            return result;
        },
        /**
         * 与某个对象值相等
         */
        equalTo : function(s, o){
            var result = {
                match : true,
                msg : '正确'
            };
            if(s && s !== $(o).val() ){
                result = {
                    match : false,
                    msg : errStr.equalTo
                }
            }
            return result;
        },
        /**
         * 与某个对象值不相等
         */
        notEqualTo : function(s, o, n){
            var result = {
                    match : true,
                    msg : '正确'
                },
                sName = null;
            if(o.indexOf(",") > -1){
                o = o.split(",");
                sName = o[1];
                o = o[0];
            }
            if(s && s == $(o).val() ){
                result = {
                    match : false,
                    msg : sName ? util.strFormat(errStr.notEqualTo, [sName+'与'+n]) : util.strFormat(errStr.notEqualTo, ['新旧密码'])
                }
            }else{
                $(o).trigger('blur');
            }
            return result;
        },
        accept : function(){

        },
        /**
         * 最大长度
         */
        maxLength : function(s, n, name){
            return {
                match : s.length <= n,
                msg : util.strFormat(errStr.maxLength, [name, n])
            };
        },
        /**
         * 最小长度
         */
        minLength : function(s, n, name){
            return {
                match : s.length >= n,
                msg : util.strFormat(errStr.minLength, [name, n])
            };
        },
        /**
         * 长度在一个范围内
         */
        rangeLength : function(s, r, name){
            var rule = r.split(',');
            return {
                match : s.length >= rule[0] && s.length <= rule[1],
                msg : util.strFormat(errStr.rangeLength, [name, rule[0], rule[1]])
            };

        },
        /**
         * 手机号码
         */
        isMobile : function (s) {
            //严格
            //var reg = /^(13[0-9]|15[012356789]|18[0-9]|14[57]|00852)[0-9]{8}$/;
            //宽松
            var reg = /^(1)[0-9]{10}$/;
            return {
                match : reg.test(s),
                msg : errStr.isMobile
            };
        },
        /**
         * 日期时间
         */
        isDate: function(s, name){
            var match = false,
                msg = util.strFormat(errStr.isDate, [name]);
            s = s.replace('年', '-');
            s = s.replace('月', '-');
            s = s.replace('日', '');
            if($.trim(s).length) {
                var r = s.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r) {
                    var d = new Date(r[1], r[3] - 1, r[4]);
                    var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
                    if (num) {
                        match = true;
                        msg = '';
                    }
                }
            }
            return {
                match : match,
                msg : msg
            };
        },
        /**
         * 短日期时间
         */
        isShortDate: function(s, name){
            var self = this,
                match = false,
                msg = util.strFormat(errStr.isDate, [name]);

            s = s + '01日';

            return self.isDate(s, name);
        },
        /**
         * 用户名
         */
        isUserName: function(str){
            var reg = /^.{1,16}$/;
            return reg.test(str);
        },
        /**
         * 登录密码
         */
        isPwd: function(s){
            var reg = /^(?=.*?[a-zA-Z])(?=.*?\d)(?=.*?[0-9])[a-zA-Z0-9]*$/;
            return {
                match : reg.test(s),
                msg : errStr.isPwd
            };
        },
        /**
         * 支付密码
         */
        isPayPwd: function(s){
            var reg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[0-9])[a-zA-Z0-9]*$/;
            return {
                match : reg.test(s),
                msg : errStr.isPayPwd
            };
        },
        /**
         * 银行卡号
         * 允许存在空格
         */
        isBankCard: function(s, name){
            var self = this;
            s = s.replace(/\s/ig, '');
            return {
                match : self.rangeLength(s, '15,19', name).match && self.digits(s, name).match,
                msg : util.strFormat(errStr.bankCard, [name])
            };
        },
        /**
         * 十进制
         */
        isDecimal: function(n){
            var reg = /^[0-9]+.[0-9]+$/;
            return reg.test(n);
        },
        /**
         * 正整数和零
         */
        isPositiveInt : function(n){
            var reg = /^[0-9]+$/;
            return reg.test(n);
        },
        isDecimalAndPositiveInt: function(n){
            var reg = /^[0-9]+(\.[0-9]+)?$/;
            return reg.test(n);
        },
        isLimitInt : function(n, w){
            var self = this;
            if((n+'').length <= w){
                return self.isPositiveInt(n);
            }else{
                return false;
            }
        },
        range : function(){

        },
        max : function(){

        },
        min : function(){

        },
        /**
         * 日期中的 年
         */
        isYear : function(s, name){
            var self = this;
            var reg = /^\d{4}$/;
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isYear, [name])
            };
        },
        /**
         * 日期中的 月
         */
        isMonth : function(s, name){
            var self = this;
            var reg = /^([1-9]|0[1-9]|1[0-2])$/;
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isMonth, [name])
            };
        },
        /**
         * 日期中的 日
         */
        isDay : function(s, name){
            var self = this;
            var reg = /^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[01])$/;
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isDay, [name])
            };
        },
        isSpecChar : function (s, name){
            var self = this,
                reg = /^[^\<\>\=\^\\\[\]\{\}\"]*$/;
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isSpecChar, [name])
            }
        },
        isLegalPass : function (s, name){
            var self = this,
                reg = /^[^\%@\$ ]*$/;
            return {
                match : reg.test(s),
                msg : util.strFormat(errStr.isLegalPass, [name])
            }
        }
    };
});
