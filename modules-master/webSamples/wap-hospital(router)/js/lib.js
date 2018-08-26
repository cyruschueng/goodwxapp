'use strict';
var bs = {
    v: function () {
        var B = navigator.userAgent;
        return {
            android: !!(-1 < B.indexOf('Android')) && (document.documentElement.classList.add('android') || true),
            iPhone: !!(-1 < B.indexOf('iPhone')) && (document.documentElement.classList.add('ios') || true),
            weixin: !!(-1 < B.indexOf('MicroMessenger')) && (document.documentElement.classList.add('weixin') || true),
            uc: !!(-1 < B.indexOf('UCBrowser')),
            app: !!(-1 < B.indexOf('yuerdashi'))
        }
    }(), vn: function () {
        var B = navigator.userAgent;
        if (-1 < B.indexOf('Android'))return /Android (\d+(\.\d)*)/.exec(B)[1];
        return -1 < B.indexOf('iPhone') ? /iPhone OS (\d+(_\d)*)/.exec(B)[1].replace(/_/g, '.') : void 0
    }(), vc: function (B, C) {
        if (B = B || '0.0.0', C = C || '0.0.0', B == C)return false;
        for (var D = B.split('.'), E = C.split('.'), F = Math.max(D.length, E.length), G = 0; G < F; G++) {
            var H = ~~E[G], I = ~~D[G];
            if (H < I)return false;
            if (H > I)return true
        }
        return false
    }
}, docCookies = {
    getItem: function (B) {
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(B).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    }
}, lt = {
    html: '<div id="loadingToast" class="weui_loading_toast" style="display:none"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">\u6570\u636E\u52A0\u8F7D\u4E2D</p></div></div>',
    self: function () {
        return document.getElementById('loadingToast') || document.body.insertAdjacentHTML('beforeend', this.html), document.getElementById('loadingToast')
    },
    show: function () {
        this.self().style.display = 'block'
    },
    hide: function () {
        this.self().style.display = 'none'
    }
}, mask = {
    self: document.getElementById('mask') || function () {
        var B = document.createElement('div');
        return B.id = 'mask', document.body.appendChild(B)
    }(), show: function () {
        this.self.style.display = 'block'
    }, hide: function () {
        this.self.style.display = 'none'
    }
}, config = {
    host: '//api.3uol.com',
    host3y: '//m.3uol.com',
    token: docCookies.getItem('token'),
    appVersion: '2.7.3',
    wxTitle: '\u80B2\u513F\u5927\u5E08_\u8BA9\u80B2\u513F\u66F4\u7B80\u5355',
    wxDescription: '\u968F\u65F6\u968F\u5730\u9884\u7EA6\uFF0C\u4EAB\u53D7\u4E13\u4E1A\u3001\u6743\u5A01\u7684\u54A8\u8BE2\u670D\u52A1',
    wxLink: decodeURIComponent(location.href + (sessionStorage.projectCode ? location.search ? '&projectCode=' + sessionStorage.projectCode : '?projectCode=' + sessionStorage.projectCode : '')),
    wxImgurl: 'http://resource.3uol.com/images/weixin/shi.png',
    wxOnShare: null,
    shareArg: null,
    shareData: {
        shareTimeline: null,
        shareWeixin: null,
        shareQQ: null,
        shareWeibo: null,
        shareOther: {
            title: '\u80B2\u513F\u5927\u5E08_\u8BA9\u80B2\u513F\u66F4\u7B80\u5355',
            desc: '\u968F\u65F6\u968F\u5730\u9884\u7EA6\uFF0C\u4EAB\u53D7\u4E13\u4E1A\u3001\u6743\u5A01\u7684\u54A8\u8BE2\u670D\u52A1',
            link: location.href,
            icon: 'http://resource.3uol.com/images/weixin/shi.png'
        }
    }
}, getUrlParam = function (B) {
    return decodeURI(location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURI(B).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'))
}, alarmToast = function (B) {
    document.getElementById('toast') || document.body.insertAdjacentHTML('beforeend', '<div id="toast"><span></span></div>'), toast.children[0].innerHTML = B, toast.style.display = 'block', setTimeout(function () {
        toast.style.display = 'none'
    }, 2e3)
}, gotoLogin = function () {
    location.replace('https://' + location.host + '/signin.html?returnurl=' + encodeURIComponent(location.href) + (sessionStorage.projectCode ? '&projectCode=' + sessionStorage.projectCode : ''))
}, editPhone = function () {
    location.replace(config.host3y + '/my/bind.html?returnurl=' + encodeURIComponent(location.href) + (sessionStorage.projectCode ? '&projectCode=' + sessionStorage.projectCode : ''))
}, Post = function (B, C, D) {
    var E = new XMLHttpRequest, F = C || {}, G = '';
    for (var H in F.platform = 5, F.appVersion = config.appVersion, F)G += H + '=' + F[H] + '&';
    F = G.replace(/&$/, ''), E.ontimeout = function () {
        lt.hide(), confirm('\u8BF7\u6C42\u8D85\u65F6,\u662F\u5426\u91CD\u8BD5?') && (E.open('POST', B, true), E.send(F))
    }, bs.v.iPhone && !bs.vc(bs.vn, '10.0') && bs.v.uc || (E.timeout = 3e4), E.open('POST', B, true), E.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), E.onload = function () {
        if (200 === this.status) {
            var J = JSON.parse(this.response);
            -1 === J.status || 999 === J.status ? bs.v.app || 8 == getUrlParam('from') || 4 == getUrlParam('from') ? location.href = 'parentingMaster4User://login/' : gotoLogin() : -2 === J.status ? editPhone() : D(J)
        } else alarmToast('\u7F51\u7EDC\u9519\u8BEF\uFF1A' + this.statusText + ' (\u72B6\u6001\u7801:' + this.status + ')')
    }, E.onerror = function () {
        return lt.hide(), void alert('\u7F51\u7EDC\u9519\u8BEF\uFF1A' + (this.statusText || '\u5F53\u524D\u7F51\u7EDC\u672A\u8FDE\u63A5') + ' (\u72B6\u6001\u7801:' + this.status + ')')
    }, E.send(F)
}, Get = function (B, C, D) {
    var E = new XMLHttpRequest;
    E.open('GET', B, false !== D), E.onload = function () {
        200 <= E.status && 300 > E.status || 0 === E.status || 304 === E.status ? C(this.responseText) : alarmToast('\u7F51\u7EDC\u9519\u8BEF\uFF1A' + this.statusText + ' (\u72B6\u6001\u7801:' + this.status + ')')
    }, E.onerror = function () {
        return lt.hide(), void alert('\u7F51\u7EDC\u9519\u8BEF\uFF1A' + (this.statusText || '\u5F53\u524D\u7F51\u7EDC\u672A\u8FDE\u63A5') + ' (\u72B6\u6001\u7801:' + this.status + ')')
    }, E.send()
}, loadJs = function (B) {
    function C(D) {
        throw new URIError('The script ' + D.target.src + ' is not accessible.')
    }

    return function (D, E, F) {
        if (!document.getElementById(D)) {
            var G = document.createElement('script');
            G.id = D, G.type = 'text/javascript', G.async = false, G.onerror = C, F ? G.onload = function () {
                F && F()
            } : null, B.appendChild(G), G.src = E
        } else F && F()
    }
}(document.head || document.getElementsByTagName('head')[0]), getElementIndex = function (B) {
    if (!B)return -1;
    for (var C = B, D = 0; C.previousElementSibling;)D++, C = C.previousElementSibling;
    return D
}, getPosition = function (B, C) {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(function (D) {
        C(D)
    }, function () {
        C()
    }, B) : C()
}, runOnce = function (B, C) {
    return function () {
        try {
            B.apply(C || this, arguments)
        } catch (D) {
        } finally {
            B = null
        }
    }
}, linkImport = function (B, C, D, E) {
    var F = document.createElement('link'), G = function () {
        var I = C ? F.import.querySelector(C).innerHTML.replace(/^\s*|\s*$/g, '') : F.import;
        D && D(I)
    };
    F.rel = 'import', F.href = B, F.onload = G, F.onerror = function () {
        E && E()
    }, document.head.appendChild(F), 'import' in document.createElement('link') || loadJs('htmlimports', '/js/html-imports.min.js', function () {
        window.addEventListener('HTMLImportsLoaded', function () {
            runOnce(G)
        })
    })
}, closeSection = function (B, C) {
    B.classList.add('slideOut'), C.className = 'active', setTimeout(function () {
        B.className = ''
    }, 500)
}, openSection = function (B, C) {
    B.className = 'active slideIn', setTimeout(function () {
        C.className = ''
    }, 500)
}, disablePointer = function (B, C) {
    B.classList.add('pe-none'), setTimeout(function () {
        B.classList.remove('pe-none')
    }, C)
};
Element.prototype._addEventListener = Element.prototype.addEventListener, Element.prototype.addEventListener = function (B, C, D) {
    this._addEventListener(B, C, !!D), this.eventListenerList || (this.eventListenerList = {}), this.eventListenerList[B] = C
}, Element.prototype.getEventListeners = function (B) {
    return this.eventListenerList ? B ? this.eventListenerList[B] : this.eventListenerList : this.eventListenerList = {}
}, Element.prototype.addDelegateListener = function (B, C, D, E) {
    this.addEventListener(B, function (F) {
        for (var G = F.target; G && G !== this && G.tagName !== C && G.id !== C;)G = G.parentNode;
        if (G && G !== this)return G.eventListenerList || (G.eventListenerList = {}), G.eventListenerList[B] = D, D.call(G, F)
    }, !!E)
}, !function () {
    function B(_) {
        return _.replace(U, '').replace(V, ',').replace(W, '').replace(X, '').replace(Y, '').split(Z)
    }

    function C(_) {
        return '\'' + _.replace(/('|\\)/g, '\\$1').replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '\''
    }

    function D(_, aa) {
        function ba(va) {
            return ja += va.split(/\n/).length - 1, ha && (va = va.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '')), va && (va = ma[1] + C(va) + ma[2] + '\n'), va
        }

        function ca(va) {
            var wa = ja;
            if (ga ? va = ga(va, aa) : da && (va = va.replace(/\n/g, function () {
                        return ja++, '$line=' + ja + ';'
                    })), 0 === va.indexOf('=')) {
                var xa = ia && !/^=[=#]/.test(va);
                if (va = va.replace(/^=[=#]?|[\s;]*$/g, ''), xa) {
                    var ya = va.replace(/\s*\([^\)]+\)/, '');
                    O[ya] || /^(include|print)$/.test(ya) || (va = '$escape(' + va + ')')
                } else va = '$string(' + va + ')';
                va = ma[1] + va + ma[2]
            }
            return da && (va = '$line=' + wa + ';' + va), S(B(va), function (za) {
                if (za && !ka[za]) {
                    var Aa;
                    Aa = 'print' === za ? 'function(){var text=\'\'.concat.apply(\'\',arguments);' + na + '}' : 'include' === za ? 'function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);' + na + '}' : O[za] ? '$utils.' + za : P[za] ? '$helpers.' + za : '$data.' + za, qa += za + '=' + Aa + ',', ka[za] = !0
                }
            }), va + '\n'
        }

        var da = aa.debug, ea = aa.openTag, fa = aa.closeTag, ga = aa.parser, ha = aa.compress, ia = aa.escape, ja = 1,
            ka = {$data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1}, la = ''.trim,
            ma = ['$out=\'\';', '$out+=', ';', '$out'], na = '$out+=text;return $out;',
            qa = '\'use strict\';var $utils=this,$helpers=$utils.$helpers,' + (da ? '$line=0,' : ''), ra = ma[0],
            sa = 'return new String(' + ma[3] + ');';
        S(_.split(ea), function (va) {
            va = va.split(fa);
            var wa = va[0], xa = va[1];
            1 === va.length ? ra += ba(wa) : (ra += ca(wa), xa && (ra += ba(xa)))
        });
        var ta = qa + ra + sa;
        da && (ta = 'try{' + ta + '}catch(e){throw {filename:$filename,name:\'Render Error\',message:e.message,line:$line,source:' + C(_) + '.split(/\\n/)[$line-1].replace(/^\\s+/,\'\')};}');
        try {
            var ua = new Function('$data', '$filename', ta);
            return ua.prototype = O, ua
        } catch (va) {
            throw va.temp = 'function anonymous($data,$filename) {' + ta + '}', va
        }
    }

    var E = function (_, aa) {
        return 'string' == typeof aa ? R(aa, {filename: _}) : H(_, aa)
    };
    E.version = '3.0.0', E.config = function (_, aa) {
        F[_] = aa
    };
    var F = E.defaults = {openTag: '<%', closeTag: '%>', escape: !0, cache: !0, compress: !1, parser: null},
        G = E.cache = {};
    E.render = function (_, aa) {
        return R(_)(aa)
    };
    var H = E.renderFile = function (_, aa) {
        var ba = E.get(_) || Q({filename: _, name: 'Render Error', message: 'Template not found'});
        return aa ? ba(aa) : ba
    };
    E.get = function (_) {
        var aa;
        if (G[_]) aa = G[_]; else if ('object' == typeof document) {
            var ba = document.getElementById(_);
            if (ba) {
                var ca = (ba.value || ba.innerHTML).replace(/^\s*|\s*$/g, '');
                aa = R(ca, {filename: _})
            }
        }
        return aa
    };
    var I = function (_, aa) {
        return 'string' != typeof _ && (aa = typeof _, 'number' === aa ? _ += '' : _ = 'function' === aa ? I(_.call(_)) : ''), _
    }, J = {'<': '&#60;', '>': '&#62;', '"': '&#34;', '\'': '&#39;', '&': '&#38;'}, K = function (_) {
        return J[_]
    }, M = Array.isArray || function (_) {
            return '[object Array]' === {}.toString.call(_)
        }, O = E.utils = {
        $helpers: {}, $include: H, $string: I, $escape: function (_) {
            return I(_).replace(/&(?![\w#]+;)|[<>"']/g, K)
        }, $each: function (_, aa) {
            var ba, ca;
            if (M(_))for (ba = 0, ca = _.length; ba < ca; ba++)aa.call(_, _[ba], ba, _); else for (ba in _)aa.call(_, _[ba], ba)
        }
    };
    E.helper = function (_, aa) {
        P[_] = aa
    };
    var P = E.helpers = O.$helpers;
    E.onerror = function (_) {
        for (var ba in _)'<' + ba + '>\n' + _[ba] + '\n\n';
        'object' == typeof console
    };
    var Q = function (_) {
            return E.onerror(_), function () {
                return '{Template Error}'
            }
        }, R = E.compile = function (_, aa) {
            function ba(fa) {
                try {
                    return new ea(fa, da) + ''
                } catch (ga) {
                    return aa.debug ? Q(ga)() : (aa.debug = !0, R(_, aa)(fa))
                }
            }

            for (var ca in aa = aa || {}, F)void 0 === aa[ca] && (aa[ca] = F[ca]);
            var da = aa.filename;
            try {
                var ea = D(_, aa)
            } catch (fa) {
                return fa.filename = da || 'anonymous', fa.name = 'Syntax Error', Q(fa)
            }
            return ba.prototype = ea.prototype, ba.toString = function () {
                return ea.toString()
            }, da && aa.cache && (G[da] = ba), ba
        }, S = O.$each,
        U = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        V = /[^\w$]+/g,
        W = new RegExp(['\\b' + 'break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined'.replace(/,/g, '\\b|\\b') + '\\b'].join('|'), 'g'),
        X = /^\d[^,]*|,\d[^,]*/g, Y = /^,+|,+$/g, Z = /^$|,+/;
    'function' == typeof define ? define(function () {
        return E
    }) : 'undefined' == typeof exports ? window.template = E : module.exports = E
}(), bs.v.android && (bs.v.uc ? 11 > / UCBrowser;
\
/(\d+)\./.exec(navigator.userAgent)[1];
:
bs.vc(bs.vn, '5.0');
)&&
Get('/css/svg/symbol-defs0.svg', function (B) {
    var C = document.createElement('template0');
    document.body.appendChild(C), C.innerHTML = B, '/' === location.pathname ? loadJs('svgxuse', '/js/svgxuse.min.js') : Get('/css/svg/symbol-defs.svg', function (D) {
        var E = document.createElement('template');
        document.body.appendChild(E), E.innerHTML = D, loadJs('svgxuse', '/js/svgxuse.min.js')
    })
}), bs.v.android && (bs.v.uc ? 11 > / UCBrowser;
\
/(\d+)\./.exec(navigator.userAgent)[1];
:
bs.vc(bs.vn, '4.4.4');
)&&
Get('/js/es6-promise.auto.min.js', function (B) {
    var C = document.createElement('script'), D = document.head || document.getElementsByTagName('head')[0];
    C.id = 'es6promise', C.type = 'text/javascript', C.appendChild(document.createTextNode(B)), D.appendChild(C)
}, false), function () {
    var B = [], C = function (I) {
        Post('https://statistics.3uol.com/visit/index', {
            session: localStorage.UDID,
            status: I,
            ua: navigator.appVersion,
            url: encodeURIComponent(document.documentURI),
            refurl: encodeURIComponent(document.referrer),
            btn: B.length ? JSON.stringify(B) : ''
        }, function () {
        })
    }, D = function () {
        document.addEventListener('DOMContentLoaded', function () {
            C(0)
        })
    };
    if (localStorage.UDID) D(); else if ('http:' === location.protocol || bs.v.android && bs.vc(bs.vn, '5.0')) {
        var E = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
        localStorage.UDID = E, D()
    } else {
        var F = window.crypto || window.msCrypto, G = function (I) {
            for (var J = [], K = new DataView(I), L = 0; L < K.byteLength; L += 4) {
                var M = K.getUint32(L), N = M.toString(16), O = '00000000', P = (O + N).slice(-O.length);
                J.push(P)
            }
            return J.join('')
        }, H = function (I) {
            var J = new TextEncoder('utf-8').encode(I),
                K = bs.v.iPhone && bs.vc(bs.vn, '11.0') ? F.webkitSubtle : F.subtle;
            return K.digest('SHA-1', J).then(function (L) {
                return G(L)
            })
        };
        H(F.getRandomValues(new Uint32Array(1))[0]).then(function (I) {
            localStorage.UDID = I, D()
        })
    }
    document.addEventListener('click', function (I) {
        if (I.isTrusted) {
            var J = I.target, K = function () {
                var P = {desc: J.textContent || J.outerHTML, timeStamp: I.timeStamp, x: I.x, y: I.y};
                B.push(P)
            };
            if ('A' === J.tagName || 'BUTTON' === J.tagName || J.onclick) K(); else {
                var L = J.getEventListeners();
                if (L.hasOwnProperty('click') || L.hasOwnProperty('touchend')) K(); else {
                    for (var M = J.parentNode, N = M.getEventListeners(),
                             O = -1; 3 > ++O && M && !N.hasOwnProperty('click') && !N.hasOwnProperty('touchend');)M = M.parentNode;
                    (N.hasOwnProperty('click') || N.hasOwnProperty('touchend')) && (K())
                }
            }
        }
    }), window.addEventListener('beforeunload', function () {
        C(1)
    })
}(), bs.v.weixin && function () {
    window.addEventListener('load', function () {
        loadJs('jweixin', '//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            var B = function (D) {
                wx.config({
                    debug: false,
                    appId: D.appId,
                    timestamp: D.timestamp,
                    nonceStr: D.nonceStr,
                    signature: D.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
                })
            }, C = runOnce(function () {
                Post('/Share/Weixin/AppVerify.aspx', {t: 'wxrefresh', url: location.href}, function (D) {
                    B(D), sessionStorage.wxAppVerify = JSON.stringify(D)
                })
            });
            sessionStorage.wxAppVerify ? B(JSON.parse(sessionStorage.wxAppVerify)) : Post('/Share/Weixin/AppVerify.aspx', {
                t: 'wxshare',
                url: location.href
            }, function (D) {
                B(D), D.signature && (sessionStorage.wxAppVerify = JSON.stringify(D))
            }), wx.error(function () {
                C()
            }), wx.ready(function () {
                config.wxOnShare || (config.wxOnShare = function (D) {
                    wx.onMenuShareTimeline({
                        title: D ? D.shareTimeline ? D.shareTimeline.title : D.shareOther.title : config.wxTitle,
                        link: D ? D.shareTimeline ? D.shareTimeline.link : D.shareOther.link : config.wxLink,
                        imgUrl: D ? D.shareTimeline ? D.shareTimeline.icon : D.shareOther.icon : config.wxImgurl,
                        trigger: function () {
                            this.title = D ? config.shareData.shareTimeline ? config.shareData.shareTimeline.title : config.shareData.shareOther.title : config.wxTitle, this.link = D ? config.shareData.shareTimeline ? config.shareData.shareTimeline.link : config.shareData.shareOther.link : config.wxLink, this.imgUrl = D ? config.shareData.shareTimeline ? config.shareData.shareTimeline.icon : config.shareData.shareOther.icon : config.wxImgurl
                        },
                        success: function () {
                            config.wxShareSuccess && config.wxShareSuccess(4)
                        }
                    }), wx.onMenuShareAppMessage({
                        title: D ? D.shareWeixin ? D.shareWeixin.title : D.shareOther.title : config.wxTitle,
                        desc: D ? D.shareWeixin ? D.shareWeixin.desc : D.shareOther.desc : config.wxDescription,
                        link: D ? D.shareWeixin ? D.shareWeixin.link : D.shareOther.link : config.wxLink,
                        imgUrl: D ? D.shareWeixin ? D.shareWeixin.icon : D.shareOther.icon : config.wxImgurl,
                        trigger: function () {
                            this.title = D ? config.shareData.shareWeixin ? config.shareData.shareWeixin.title : config.shareData.shareOther.title : config.wxTitle, this.desc = D ? config.shareData.shareWeixin ? config.shareData.shareWeixin.desc : config.shareData.shareOther.desc : config.wxDescription, this.link = D ? config.shareData.shareWeixin ? config.shareData.shareWeixin.link : config.shareData.shareOther.link : config.wxLink, this.imgUrl = D ? config.shareData.shareWeixin ? config.shareData.shareWeixin.icon : config.shareData.shareOther.icon : config.wxImgurl
                        },
                        success: function () {
                            config.wxShareSuccess && config.wxShareSuccess(1)
                        }
                    }), wx.onMenuShareQQ({
                        title: D ? D.shareQQ ? D.shareQQ.title : D.shareOther.title : config.wxTitle,
                        desc: D ? D.shareQQ ? D.shareQQ.desc : D.shareOther.desc : config.wxDescription,
                        link: D ? D.shareQQ ? D.shareQQ.link : D.shareOther.link : config.wxLink,
                        imgUrl: D ? D.shareQQ ? D.shareQQ.icon : D.shareOther.icon : config.wxImgurl,
                        trigger: function () {
                            this.title = D ? config.shareData.shareQQ ? config.shareData.shareQQ.title : config.shareData.shareOther.title : config.wxTitle, this.desc = D ? config.shareData.shareQQ ? config.shareData.shareQQ.desc : config.shareData.shareOther.desc : config.wxDescription, this.link = D ? config.shareData.shareQQ ? config.shareData.shareQQ.link : config.shareData.shareOther.link : config.wxLink, this.imgUrl = D ? config.shareData.shareQQ ? config.shareData.shareQQ.icon : config.shareData.shareOther.icon : config.wxImgurl
                        },
                        success: function () {
                            config.wxShareSuccess && config.wxShareSuccess(6)
                        }
                    }), wx.onMenuShareWeibo({
                        title: D ? D.shareWeibo ? D.shareWeibo.title : D.shareOther.title : config.wxTitle,
                        desc: D ? D.shareWeibo ? D.shareWeibo.desc : D.shareOther.desc : config.wxDescription,
                        link: D ? D.shareWeibo ? D.shareWeibo.link : D.shareOther.link : config.wxLink,
                        imgUrl: D ? D.shareWeibo ? D.shareWeibo.icon : D.shareOther.icon : config.wxImgurl,
                        trigger: function () {
                            this.title = D ? config.shareData.shareWeibo ? config.shareData.shareWeibo.title : config.shareData.shareOther.title : config.wxTitle, this.desc = D ? config.shareData.shareWeibo ? config.shareData.shareWeibo.desc : config.shareData.shareOther.desc : config.wxDescription, this.link = D ? config.shareData.shareWeibo ? config.shareData.shareWeibo.link : config.shareData.shareOther.link : config.wxLink, this.imgUrl = D ? config.shareData.shareWeibo ? config.shareData.shareWeibo.icon : config.shareData.shareOther.icon : config.wxImgurl
                        },
                        success: function () {
                            config.wxShareSuccess && config.wxShareSuccess(5)
                        }
                    })
                }), config.shareArg ? Post('/api/getShareInfo', config.shareArg, function (D) {
                    1 === D.status && D.data.shareOther ? (config.shareData = D.data, config.wxOnShare(D.data)) : config.wxOnShare(false)
                }) : config.wxOnShare(false)
            })
        })
    })
}();
var hasmore = function (B) {
    B.lock(), $('.order-panel,.inner').append('<div class="dropload-down" style="height:50px;"><div class="dropload-noData"><svg class="icon-symbol icon-jiazaizhong"><use xlink:href="css/svg/symbol-defs.svg#icon-jiazaizhong"></use></svg><span class="loading noanimation"></span>\u52A0\u8F7D\u5B8C\u6BD5</div></div>'), setTimeout('$(\'.dropload-down\').remove();', 3e3)
}, _hmt = _hmt || [];
(function () {
    var B = document.createElement('script');
    B.src = '//hm.baidu.com/hm.js?2119a3bbfc876c3cc79cac4a426df17f';
    var C = document.getElementsByTagName('script')[0];
    C.parentNode.insertBefore(B, C)
})();