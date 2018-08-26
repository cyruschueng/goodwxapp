// var DOMAIN = 'http://123.56.154.119:8877/'; 			// 测试域名
// var DOMAIN = 'http://m.teacher.jiaofuyun.com/'; 		// 正式域名
var DOMAIN = 'http://' + location.host + '/'; // 自动域名设置
var HOST = DOMAIN + 'gateway/'; // 接口头
var HOST_project = DOMAIN + 'v1708_yueji/';  // 项目服务器地址

var API = {
    getUserInfo: HOST + 'h5/v5/user/getUserInfo', // 获取我的班级列表
    getBrand: HOST + 'h5/v1/brand/getbyid', // 根据id查询品牌信息

    getRecords: HOST + 'v2/epaperwork/submit_work_records', // 获取学习记录列表
    dowork_report: HOST + 'h5/v1/epaperwork/dowork_report', // 获取成绩单[17.08]
    getCurrentRecordStatistics: HOST + 'h5/v2/statistic/getCurrentRecordStatistics', // 获取成绩统计列表[17.08]

    getWordReading: HOST + 'h5/v1/Package/SyncFollowReadData', // 获取单词跟读
    getSentenceReading: HOST + 'h5/v1/Package/SyncFollowReadTextData', // 获取句子跟读

    getOnlineExamination: HOST + 'h5/v1/Package/ExaminationDataForApp', // 获取在线作答试卷

    getLsExamination: HOST + 'h5/tools/listen_speak_examination', // 获取听说模考试卷信息（包括总分）
    // getWorkAnswers : HOST + 'h5/epaperwork/getWorkAnswers',				// 获取用户答案 [旧接口]
    getDoWorkInfo: HOST + 'h5/epaperwork/v2/getDoWorkInfo', // 获取用户答案（包括用户总得分）/老师选题（checkResouresIds）/当前批改状态（workStatus）

    getWechat: HOST + 'h5/wct/oauth/generateJsApiSign', // 微信认证
}

// 弹出框组件，css在common.css
$.alert = function(msg, delay) {
    if($('.dialog').length==0){
        $('body').append('<div class="dialog" style="display:none;">\
            <div class="dialog-inner"> <span>暂无信息~</span> </div>\
        </div>')
    }
    
    if (typeof $ == 'undefined') {
        return alert(msg);
    }
    delay = delay || 2000;
    if ($('.dialog').css('display') == 'none') {
        $('.dialog-inner').html(msg)
        $('.dialog').show();
        setTimeout(function() { $('.dialog').hide(); }, delay)
    }
}
// 加载动效组件，css在common.css
$.loading = function(display) {
    if($('.loading').length==0){
        $('body').append('<div class="loading">\
            <div class="load-inner"> <span>加载中...</span> </div>\
        </div>')
    }
    if(display=='show'){
        $('.loading').show();
    }else{
        $('.loading').hide();
    }
}
// 错误信息组件，css在common.css
$.error = function(msg,element) {
    if($('.m-error').length==0){
        $('body').append('<div class="m-error" style="display:none;">\
                            <div class="m-error_inner">\
                                <div class="u-img1"></div>\
                                <div class="u-img2"></div>\
                                <div class="f-btn mt20" onclick="javascript:location.reload()">重 试</div>\
                                <div class="u-txt mt30" onclick="$(this).css(\'opacity\',1)"></div>\
                            </div>\
                        </div>').css('background-color','#fff')
    }
    
    if (typeof $ == 'undefined') {
        return alert(msg);
    }
    msg = msg + '';
    typeof firstTimer != 'undefined' && clearTimeout(firstTimer)
    $('.m-error_inner').removeClass('no-record')

    if (msg.indexOf('未找到有效token') > -1) {
        $.alert('您的登录已过期或者您已在另一设备登录', 5000)
    } else if (msg.indexOf('还没有学习记录') > -1) {
        $('.m-error_inner').addClass('no-record')
    }
    $.loading('hide')
    $(element || '.wrap').html('');
    if (msg) $('.m-error .u-txt').html('( ' + msg + ' )')
    $('.m-error').show();
}

window.onerror = function(e) {
    // 	// cordova 插件加载错误不显示
    // 	// $.alert(JSON.stringify(e));return;
    // 	if(e=='Uncaught SyntaxError: Unexpected token :' || $('.loading').css('display')!='none' || $('.wrap').css('display')!='none') return;
    // 	setTimeout(function(){
    // 		if(e=='Uncaught SyntaxError: Unexpected token :' || $('.loading').css('display')!='none' || $('.wrap').css('display')!='none') return;
    // 		$.alert('网络不稳定，请稍后重试')
    // 	},2000)
}

var $tools = {
    trim: function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 去除回车换行，移除所有空白、隐藏字符
    removeEnter: function(str) {
        // return str.replace(/[\r\n]/g, "");
        return str.replace(/\r|\n|\t|\f|\x0b|\xa0|\u2000|\u2001|\u2002|\u2003|\u2004|\u2005|\u2006|\u2007|\u2008|\u2009|\u200a|\u200b|\u2028|\u2029|\u3000/g, "");
    },
    // 禁止输入emoji表情字符串到输入框
    removeEmoticons: function(str) {
        return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
    },
    // 1.用正则表达式实现html转码
    htmlEncode: function(str) {
        if (str.length == 0) return "";
        str = str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            //  .replace(/ /g,"&nbsp;")
            .replace(/'/g, "&#39;")
            .replace(/"/g, "&quot;");
        return str;
    },
    // 2.用正则表达式实现html解码,html格式字符串替换 空格
    htmlDecode: function(sourceStr) {
        if (!sourceStr) return sourceStr;
        sourceStr = sourceStr.replace(/&nbsp;/g, " ");
        var temp = document.createElement("div");
        temp.innerHTML = sourceStr;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    // 中文字符串转换,将特殊字符 全部转换成把半角格式的字符串
    chineseConvert: function(content) {
        if (!content) return content;
        var output = "";
        for (var i = 0; i < content.length; i++) {
            var chartCode = content.charCodeAt(i);
            var str;
            if (chartCode == 12288 || chartCode == 160) { //中文空格转换英文空格
                str = String.fromCharCode(32);
            } else if (chartCode == 8217) { //中文半角单引号转成英文单引号
                str = String.fromCharCode(39);
            } else if (chartCode == 12290) { //中文句号转换英文句号
                str = String.fromCharCode(46);
            } else if (chartCode > 65280 && chartCode < 65375) { //中文标点数字转换英文
                str = String.fromCharCode(chartCode - 65248);
            } else {
                str = String.fromCharCode(chartCode);
            }
            output += str;
        }
        return output;
    },
    /// 英文实体类
    wordShort: function(shortword, intactword) {
        this.ShortWord = shortword;
        this.IntactWord = intactword;
    },
    /// 正则表达式需要更换html标签
    htmlFilter: function(sourceStr) {
        if (!sourceStr) return sourceStr;
        sourceStr = sourceStr.replace(/&(nbsp|#160);/g, " ");
        //return new this.RegFilter('<[a-zA-Z]+? [^<>]*?>|</[a-zA-Z]+?>|<[a-zA-Z]+?>|<[a-zA-Z]+?/>'); 
        var regValue = "<script[^>]*?>.*?</script>|<(.[^>]*)>|([\r\n])[\s]+|-->|<!--.*|&(quot|#34);|&(amp|#38);|&(lt|#60);|&(gt|#62);|&(iexcl|#161);|&(cent|#162);|&(pound|#163);|&(copy|#169);|&#(\d+);|<|>|\r\n";
        return sourceStr.replace(new RegExp(regValue, 'gmi'), '');
    },
    // 英文字符串转换
    englishShort: function() {
        var methods = this;
        //字符串缩写替换
        this.getWordLibrary = function() {
            var _list = [];
            _list.push(new methods.WordShort("I'm", "I am"));
            _list.push(new methods.WordShort("he's", "he has"));
            _list.push(new methods.WordShort("he's", "he is"));
            _list.push(new methods.WordShort("she's", "she is"));
            _list.push(new methods.WordShort("she's", "she has"));
            _list.push(new methods.WordShort("Tony's", "Tony is"));
            _list.push(new methods.WordShort("it's", "it is"));
            _list.push(new methods.WordShort("what's", "what is"));
            _list.push(new methods.WordShort("who's", "who is"));
            _list.push(new methods.WordShort("where's", "where is"));
            _list.push(new methods.WordShort("name's", "name is"));
            _list.push(new methods.WordShort("that's", "that is"));
            _list.push(new methods.WordShort("how's", "how is"));
            _list.push(new methods.WordShort("let's", "let us"));

            _list.push(new methods.WordShort("isn't", "is not"));
            _list.push(new methods.WordShort("aren't", "are not"));
            _list.push(new methods.WordShort("can't", "can not"));
            _list.push(new methods.WordShort("don't", "do not"));
            _list.push(new methods.WordShort("doesn't", "does not"));
            _list.push(new methods.WordShort("didn't", "did not"));
            _list.push(new methods.WordShort("won't", "will not"));
            _list.push(new methods.WordShort("wasn't", "was not"));
            _list.push(new methods.WordShort("weren't", "were not"));
            _list.push(new methods.WordShort("couldn't", "could not"));
            _list.push(new methods.WordShort("shouldn't", "should not"));
            _list.push(new methods.WordShort("wouldn't", "would not"));
            _list.push(new methods.WordShort("mustn't", "must not"));
            _list.push(new methods.WordShort("needn't", "need not"));
            _list.push(new methods.WordShort("hasn't", "has not"));
            _list.push(new methods.WordShort("haven't", "have not"));

            _list.push(new methods.WordShort("we're", "we are"));
            _list.push(new methods.WordShort("you're", "you are"));
            _list.push(new methods.WordShort("they're", "they are"));
            _list.push(new methods.WordShort("who're", "who are"));
            _list.push(new methods.WordShort("what're", "what are"));
            _list.push(new methods.WordShort("where're", "where are"));
            _list.push(new methods.WordShort("I'll", "I will"));
            _list.push(new methods.WordShort("we'll", "we will"));
            _list.push(new methods.WordShort("there'll ", "there will"));
            _list.push(new methods.WordShort("I'd like", "I would like"));
            _list.push(new methods.WordShort("I'd", "I had"));
            _list.push(new methods.WordShort("you'd better", "you had better"));
            _list.push(new methods.WordShort("I've", "I have"));
            return _list;
        };
        //字符串转换方法
        this.convert = function(sourceStr) {
            if (sourceStr === null || sourceStr === '' || !sourceStr) {
                return sourceStr;
            }
            var wordLibrary = this.getWordLibrary();
            for (var a = 0, b = wordLibrary.length; a < b; a++) {
                var reg = new RegExp(wordLibrary[a].shortWord, 'gmi');
                sourceStr = sourceStr.replace(reg, wordLibrary[a].intactWord);
            }

            return sourceStr.replace(reg, '');
        }
    }
}

var $common = {
    // 弹出框
    alert: function(msg) {
        if (typeof $.alert == 'function') {
            $.alert(msg)
        } else {
            alert(msg)
        }
    },
    // 获取url参数
    getUrlPara: function(name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = (url || window.location.search).substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    },
    // 获取base64加密的url参数
    getUrlParaBase64: function(name) {
        var url = (window.location.hash && window.location.hash.split('?')[0]) || window.location.search || localStorage.getItem('url') || '';
        var result = this.getUrlPara(name, url);
        if (result == null) {
            var base64Param = url.substr(1).split('&')[0]; // 防止微信在url后面加参数
            var paramStr;
            if (base64Param.length > 4) {
                try {
                    paramStr = window.atob(base64Param).split(name + '=')[1];
                } catch (error) {
                    paramStr = '';
                    console.warn('URL参数异常:' + error)
                }
            }
            result = paramStr && paramStr.indexOf('&') > -1 ? paramStr.split('&')[0] : paramStr;
        }
        return result;
    },
    // 格式化日期
    formatDate: function(timestamp, fmt) { // timestamp = 1492141656,"W yyyy-MM-dd hh:mm:ss"
        var now = new Date(parseInt(timestamp) * 1000);
        var weekStr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var o = {
            "M+": now.getMonth() + 1, //月份 
            "d+": now.getDate(), //日 
            "h+": now.getHours(), //小时 
            "m+": now.getMinutes(), //分 
            "s+": now.getSeconds(), //秒 
            "q+": Math.floor((now.getMonth() + 3) / 3), //季度 
            "S": now.getMilliseconds(), //毫秒
            "W": weekStr[now.getDay()], //周
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // 封装异步请求
    ajax: function(url, success, userId, method, param, complete, error) {
        var _self = this;
        var headers = null;
        if (userId) {
            var userIdBase64 = 'Basic ' + window.btoa(userId + ":");
            headers = {
                Authorization: userIdBase64 // 请求头用户认证
            }
        }
        // alert('异步请求开始，url)
        // _self.allAjaxLoad(1)
        $.ajax({
            headers: headers,
            type: method || 'GET',
            data: param || {},
            timeout: 15000, //超时时间设置，单位毫秒
            dataType: 'json',
            url: url,
            success: success, // 返回成功的回调函数
            error: function() {
                var log = '网络不稳定（请求未响应）~'　　　　　
                _self.alert(log);
                typeof $.error == 'function' && $.error(log)
            },
            complete: function(XMLHttpRequest, status) {
                if (status == 'timeout') { //超时,status还有success,error等值的情况
                    var log = '网络不稳定（请求超时）~'　　　　　
                    _self.alert(log);
                    typeof $.error == 'function' && $.error(log)　　　　
                }
                typeof complete == 'function' && complete()
                    // _self.allAjaxLoad(-1)
            }
        });
    },
    // 下拉加载更多
    loadMore: function(param, callback) {
        var range = param.range || 10; // 到底部的距离
        var totalHeight = 0;
        var winH = $(window).height();
        $(window).scroll(function() {
            var winTop = $(window).scrollTop();
            totalHeight = winTop + winH;

            if ($(document).height() - range <= totalHeight) {
                callback();
            }
        })
    },
    // 所有ajax请求结束后回调函数，type:1[新增一个ajax请求]，2[请求完成一个ajax]
    allAjaxLoad: function(type) {
        !this._ajaxNum && (this._ajaxNum = 0);
        if (type === 1) {
            this._ajaxNum += 1;
        } else if (type === -1) {
            this._ajaxNum -= 1;
        } else {
            return;
        }
        // 所有ajax请求完毕
        // if(this._ajaxNum===0){
        // 	setTimeout(function(){
        // 		document.getElementsByTagName('html')[0] && document.getElementsByTagName('html')[0].attributes && !document.getElementsByTagName('html')[0].attributes.manifest && document.getElementsByTagName('html')[0].setAttribute('manifest','../common.appcache')
        // 	},2000)
        // }
    },
    // 分享链接
    // moduleId = 5(单元测试)/7(时文)/10(同步跟读)/15(听说模考)/30(报听写)/126(视频讲解)/124(线上作答)
    shareUrl: function(score, moduleId) {
        var href = location.href;
        var url = href.indexOf('#') > -1 ? href.split('#')[1] : href.split('?')[1];
        var moduleId = moduleId;
        var _score = score || (url.indexOf('score=') > -1 ? url.split('score=')[1] : '0');
        if (typeof _score == 'string' && _score.indexOf('&') > -1) _score = _score.split('&')[0];

        href = href.indexOf('#') > -1 ? href.split('#')[0] : href.split('?')[0];
        if (!url || !href) {
            this.alert('当前页面不支持分享')
            return;
        }
        if (/\/reading\/index.html/i.test(href)) { // 跟读
            moduleId = 10;
            url = url.replace('pageType=1', 'pageType=2').replace('pageType=3', 'pageType=4');
        } else if (/\/ls\/index.html/i.test(href)) { // 听说模考
            moduleId = 15;
            href = href.replace('\/ls\/', '\/lsShare\/');
        } else if (/\/onlinePaper\//i.test(href)) { // 在线作答
            moduleId = 124;
            url = url.replace('pageType=1', 'pageType=2');
        } else if (/\/ranking\//i.test(href)) { // 排行榜
            url = url.replace('pageType=1', 'pageType=2');
        }
        url = href + '#' + window.btoa(url);
        ciwongPlugin && ciwongPlugin.createEvent('GetShareInfo', [{ source: 3, url: url, title: document.title, moduleId: moduleId || 0, score: score || 0 }], function(response) {
            log = '返回分享链接'
            debug && alert(log + (typeof response == 'string' ? response : JSON.stringify(response)))
        })
    },
    // 老师微信端分享
    wxShare: function(params) {
        var url = location.href;
        if (/\/reading\/index.html/i.test(url)) { // 跟读
            url = url.replace('pageType=1', 'pageType=2').replace('pageType=3', 'pageType=4');
        } else if (/\/ls\/index.html/i.test(url)) { // 听说模考
            url = url.replace('\/ls\/', '\/lsShare\/');
        } else if (/\/onlinePaper\//i.test(url)) { // 在线作答
            url = url.replace('pageType=1', 'pageType=2');
        } else if (/\/ranking\//i.test(url)) { // 排行榜
            url = url.replace('pageType=1', 'pageType=2');
        }
        if (!params) {
            params = {
                username: apiData.answers.userName,
                actualScore: apiData.answers.actualScore || 0,
                url: url,
                moduleId: apiData.answers.moduleId,
                workStatus: apiData.answers.workStatus,
            }
        }
        var elm = document.createElement('script');
        elm.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
        document.getElementsByTagName('body')[0].appendChild(elm)
        elm.onload = function() {
            var elm2 = document.createElement('script');
            elm2.src = 'http://prevm.teacher.jiaofuyun.com/genearch/dist/js/wechatConfig.js';
            document.getElementsByTagName('body')[0].appendChild(elm2)
            elm2.onload = function() {
                wxShare(params);
            }
        }
    },
    // 老师点评
    teacherComment: function(comment) {
        var teacherComment = document.getElementById('teacherComment')
        if (teacherComment && comment) {
            var html = '<div class="teacher-comment">\
                <div class="teacher-comment-head">老师点评:</div>\
                <div class="teacher-comment-body">' + comment + '</div>\
            </div>';
            teacherComment.innerHTML = html;
        }
    }
}