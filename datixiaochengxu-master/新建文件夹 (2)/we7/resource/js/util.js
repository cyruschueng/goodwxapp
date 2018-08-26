var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
        return typeof e
    } : function(e) {
        return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };

function _defineProperty(e, t, a) {
    if (t in e) {
        Object.defineProperty(e, t, {
            value: a,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        e[t] = a
    }
    return e
}
var util = {};
util.url = function(e, t) {
    var a = getApp();
    var r = a.siteInfo.siteroot + "?i=" + a.siteInfo.uniacid + "&t=" + a.siteInfo.multiid + "&v=" + a.siteInfo.version + "&from=wxapp&";
    if (e) {
        e = e.split("/");
        if (e[0]) {
            r += "c=" + e[0] + "&"
        }
        if (e[1]) {
            r += "a=" + e[1] + "&"
        }
        if (e[2]) {
            r += "do=" + e[2] + "&"
        }
    }
    if (t && (typeof t === "undefined" ? "undefined" : _typeof(t)) === "object") {
        for (var n in t) {
            if (n && t.hasOwnProperty(params) && t[n]) {
                r += n + "=" + t[n] + "&"
            }
        }
    }
    return r
};

function getQuery(e) {
    var t = [];
    if (e.indexOf("?") != -1) {
        var a = e.split("?")[1];
        var r = a.split("&");
        for (var n = 0; n < r.length; n++) {
            if (r[n].split("=")[0] && unescape(r[n].split("=")[1])) {
                t[n] = {
                    name: r[n].split("=")[0],
                    value: unescape(r[n].split("=")[1])
                }
            }
        }
    }
    return t
}
function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)");
    var r = e.split("?")[1].match(a);
    if (r != null) return unescape(r[2]);
    return null
}
function getSign(e, t, a) {
    var r = require("underscore.js");
    var n = require("md5.js");
    var i = "";
    var s = getUrlParam(e, "sign");
    if (s || t && t.sign) {
        return false
    } else {
        if (e) {
            i = getQuery(e)
        }
        if (t) {
            var o = [];
            for (var u in t) {
                if (u && t[u]) {
                    o = o.concat({
                        name: u,
                        value: t[u]
                    })
                }
            }
            i = i.concat(o)
        }
        i = r.sortBy(i, "name");
        i = r.uniq(i, true, "name");
        var c = "";
        for (var f = 0; f < i.length; f++) {
            if (i[f] && i[f].name && i[f].value) {
                c += i[f].name + "=" + i[f].value;
                if (f < i.length - 1) {
                    c += "&"
                }
            }
        }
        a = a ? a : getApp().siteInfo.token;
        s = n(c + a);
        return s
    }
}
util.request = function(e) {
    var t;
    var a = require("underscore.js");
    var r = require("md5.js");
    var n = getApp();
    var e = e ? e : {};
    e.cachetime = e.cachetime ? e.cachetime : 0;
    var i = wx.getStorageSync("userInfo").sessionid;
    var s = e.url;
    if (s.indexOf("http://") == -1 && s.indexOf("https://") == -1) {
        s = util.url(s)
    }
    var o = getUrlParam(s, "state");
    if (!o && !(e.data && e.data.state) && i) {
        s = s + "&state=we7sid-" + i
    }
    if (!e.data || !e.data.m) {
        var u = getCurrentPages();
        if (u.length) {
            u = u[getCurrentPages().length - 1];
            if (u && u.__route__) {
                s = s + "&m=" + u.__route__.split("/")[0]
            }
        }
    }
    var c = getSign(s, e.data);
    if (c) {
        s = s + "&sign=" + c
    }
    if (!s) {
        return false
    }
    wx.showNavigationBarLoading();
    if (e.showLoading) {
        util.showLoading()
    }
    if (e.cachetime) {
        var f = r(s);
        var l = wx.getStorageSync(f);
        var g = Date.parse(new Date);
        if (l && l.data) {
            if (l.expire > g) {
                if (e.complete && typeof e.complete == "function") {
                    e.complete(l)
                }
                if (e.success && typeof e.success == "function") {
                    e.success(l)
                }
                console.log("cache:" + s);
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                return true
            } else {
                wx.removeStorageSync(f)
            }
        }
    }
    wx.request((t = {
        url: s,
        data: e.data ? e.data : {},
        header: e.header ? e.header : {},
        method: e.method ? e.method : "GET"
    }, _defineProperty(t, "header", {
        "content-type": "application/x-www-form-urlencoded"
    }), _defineProperty(t, "success", function t(a) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        if (a.data.errno) {
            if (a.data.errno == "41009") {
                wx.setStorageSync("userInfo", "");
                util.getUserInfo(function() {
                    util.request(e)
                });
                return
            } else {
                if (e.fail && typeof e.fail == "function") {
                    e.fail(a)
                } else {
                    if (a.data.message) {
                        if (a.data.data != null && a.data.data.redirect) {
                            var r = a.data.data.redirect
                        } else {
                            var r = ""
                        }
                        n.util.message(a.data.message, r, "error")
                    }
                }
                return
            }
        } else {
            if (e.success && typeof e.success == "function") {
                e.success(a)
            }
            if (e.cachetime) {
                var i = {
                    data: a.data,
                    expire: g + e.cachetime * 1e3
                };
                wx.setStorageSync(f, i)
            }
        }
    }), _defineProperty(t, "fail", function t(a) {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
        var r = require("md5.js");
        var n = r(s);
        var i = wx.getStorageSync(n);
        if (i && i.data) {
            if (e.success && typeof e.success == "function") {
                e.success(i)
            }
            console.log("failreadcache:" + s);
            return true
        } else {
            if (e.fail && typeof e.fail == "function") {
                e.fail(a)
            }
        }
    }), _defineProperty(t, "complete", function t(a) {
        if (e.complete && typeof e.complete == "function") {
            e.complete(a)
        }
    }), t))
};
util.getUserInfo = function(e) {
    var t = function t() {
        console.log("start login");
        var a = {
            sessionid: "",
            wxInfo: "",
            memberInfo: ""
        };
        wx.login({
            success: function t(r) {
                util.request({
                    url: "auth/session/openid",
                    data: {
                        code: r.code
                    },
                    cachetime: 0,
                    success: function t(r) {
                        if (!r.data.errno) {
                            a.sessionid = r.data.data.sessionid;
                            wx.setStorageSync("userInfo", a);
                            wx.getUserInfo({
                                success: function t(r) {
                                    a.wxInfo = r.userInfo;
                                    wx.setStorageSync("userInfo", a);
                                    util.request({
                                        url: "auth/session/userinfo",
                                        data: {
                                            signature: r.signature,
                                            rawData: r.rawData,
                                            iv: r.iv,
                                            encryptedData: r.encryptedData
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        cachetime: 0,
                                        success: function t(r) {
                                            if (!r.data.errno) {
                                                a.memberInfo = r.data.data;
                                                wx.setStorageSync("userInfo", a)
                                            }
                                            typeof e == "function" && e(a)
                                        }
                                    })
                                },
                                fail: function e() {},
                                complete: function e() {}
                            })
                        }
                    }
                })
            },
            fail: function e() {
                wx.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function e(t) {
                        if (t.confirm) {
                            util.getUserInfo()
                        }
                    }
                })
            }
        })
    };
    var a = wx.getStorageSync("userInfo");
    if (a.sessionid) {
        wx.checkSession({
            success: function t() {
                typeof e == "function" && e(a)
            },
            fail: function e() {
                a.sessionid = "";
                console.log("relogin");
                wx.removeStorageSync("userInfo");
                t()
            }
        })
    } else {
        t()
    }
};
util.navigateBack = function(e) {
    var t = e.delta ? e.delta : 1;
    if (e.data) {
        var a = getCurrentPages();
        var r = a[a.length - (t + 1)];
        if (r.pageForResult) {
            r.pageForResult(e.data)
        } else {
            r.setData(e.data)
        }
    }
    wx.navigateBack({
        delta: t,
        success: function t(a) {
            typeof e.success == "function" && e.success(a)
        },
        fail: function t(a) {
            typeof e.fail == "function" && e.
            function(a)
        },
        complete: function t() {
            typeof e.complete == "function" && e.complete()
        }
    })
};
util.footer = function(e) {
    var t = getApp();
    var a = e;
    var r = t.tabBar;
    for (var n in r["list"]) {
        r["list"][n]["pageUrl"] = r["list"][n]["pagePath"].replace(/(\?|#)[^"]*/g, "")
    }
    a.setData({
        tabBar: r,
        "tabBar.thisurl": a.__route__
    })
};
util.message = function(e, t, a) {
    if (!e) {
        return true
    }
    if ((typeof e === "undefined" ? "undefined" : _typeof(e)) == "object") {
        t = e.redirect;
        a = e.type;
        e = e.title
    }
    if (t) {
        var r = t.substring(0, 9),
            n = "",
            i = "";
        if (r == "navigate:") {
            i = "navigateTo";
            n = t.substring(9)
        } else if (r == "redirect:") {
            i = "redirectTo";
            n = t.substring(9)
        } else {
            n = t;
            i = "redirectTo"
        }
    }
    if (!a) {
        a = "success"
    }
    if (a == "success") {
        wx.showToast({
            title: e,
            icon: "success",
            duration: 2e3,
            mask: n ? true : false,
            complete: function e() {
                if (n) {
                    setTimeout(function() {
                        wx[i]({
                            url: n
                        })
                    }, 1800)
                }
            }
        })
    } else if (a == "error") {
        wx.showModal({
            title: "系统信息",
            content: e,
            showCancel: false,
            complete: function e() {
                if (n) {
                    wx[i]({
                        url: n
                    })
                }
            }
        })
    }
};
util.user = util.getUserInfo;
util.showLoading = function() {
    var e = wx.getStorageSync("isShowLoading");
    if (e) {
        wx.hideLoading();
        wx.setStorageSync("isShowLoading", false)
    }
    wx.showLoading({
        title: "加载中",
        complete: function e() {
            wx.setStorageSync("isShowLoading", true)
        },
        fail: function e() {
            wx.setStorageSync("isShowLoading", false)
        }
    })
};
util.showImage = function(e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) {
        return false
    }
    wx.previewImage({
        urls: [t]
    })
};
util.parseContent = function(e) {
    if (!e) {
        return e
    }
    var t = ["\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]"];
    var a = e.match(new RegExp(t.join("|"), "g"));
    if (a) {
        for (var r in a) {
            e = e.replace(a[r], "[U+" + a[r].codePointAt(0).toString(16).toUpperCase() + "]")
        }
    }
    return e
};
util.date = function() {
    this.isLeapYear = function(e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0)
    };
    this.dateToStr = function(e, t) {
        e = arguments[0] || "yyyy-MM-dd HH:mm:ss";
        t = arguments[1] || new Date;
        var a = e;
        var r = ["日", "一", "二", "三", "四", "五", "六"];
        a = a.replace(/yyyy|YYYY/, t.getFullYear());
        a = a.replace(/yy|YY/, t.getYear() % 100 > 9 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100);
        a = a.replace(/MM/, t.getMonth() > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1));
        a = a.replace(/M/g, t.getMonth());
        a = a.replace(/w|W/g, r[t.getDay()]);
        a = a.replace(/dd|DD/, t.getDate() > 9 ? t.getDate().toString() : "0" + t.getDate());
        a = a.replace(/d|D/g, t.getDate());
        a = a.replace(/hh|HH/, t.getHours() > 9 ? t.getHours().toString() : "0" + t.getHours());
        a = a.replace(/h|H/g, t.getHours());
        a = a.replace(/mm/, t.getMinutes() > 9 ? t.getMinutes().toString() : "0" + t.getMinutes());
        a = a.replace(/m/g, t.getMinutes());
        a = a.replace(/ss|SS/, t.getSeconds() > 9 ? t.getSeconds().toString() : "0" + t.getSeconds());
        a = a.replace(/s|S/g, t.getSeconds());
        return a
    };
    this.dateAdd = function(e, t, a) {
        a = arguments[2] || new Date;
        switch (e) {
            case "s":
                return new Date(a.getTime() + 1e3 * t);
            case "n":
                return new Date(a.getTime() + 6e4 * t);
            case "h":
                return new Date(a.getTime() + 36e5 * t);
            case "d":
                return new Date(a.getTime() + 864e5 * t);
            case "w":
                return new Date(a.getTime() + 864e5 * 7 * t);
            case "m":
                return new Date(a.getFullYear(), a.getMonth() + t, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
            case "y":
                return new Date(a.getFullYear() + t, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds())
        }
    };
    this.dateDiff = function(e, t, a) {
        switch (e) {
            case "s":
                return parseInt((a - t) / 1e3);
            case "n":
                return parseInt((a - t) / 6e4);
            case "h":
                return parseInt((a - t) / 36e5);
            case "d":
                return parseInt((a - t) / 864e5);
            case "w":
                return parseInt((a - t) / (864e5 * 7));
            case "m":
                return a.getMonth() + 1 + (a.getFullYear() - t.getFullYear()) * 12 - (t.getMonth() + 1);
            case "y":
                return a.getFullYear() - t.getFullYear()
        }
    };
    this.strToDate = function(dateStr) {
        var data = dateStr;
        var reCat = /(\d{1,4})/gm;
        var t = data.match(reCat);
        t[1] = t[1] - 1;
        eval("var d = new Date(" + t.join(",") + ");");
        return d
    };
    this.strFormatToDate = function(e, t) {
        var a = 0;
        var r = -1;
        var n = t.length;
        if ((r = e.indexOf("yyyy")) > -1 && r < n) {
            a = t.substr(r, 4)
        }
        var i = 0;
        if ((r = e.indexOf("MM")) > -1 && r < n) {
            i = parseInt(t.substr(r, 2)) - 1
        }
        var s = 0;
        if ((r = e.indexOf("dd")) > -1 && r < n) {
            s = parseInt(t.substr(r, 2))
        }
        var o = 0;
        if (((r = e.indexOf("HH")) > -1 || (r = e.indexOf("hh")) > 1) && r < n) {
            o = parseInt(t.substr(r, 2))
        }
        var u = 0;
        if ((r = e.indexOf("mm")) > -1 && r < n) {
            u = t.substr(r, 2)
        }
        var c = 0;
        if ((r = e.indexOf("ss")) > -1 && r < n) {
            c = t.substr(r, 2)
        }
        return new Date(a, i, s, o, u, c)
    };
    this.dateToLong = function(e) {
        return e.getTime()
    };
    this.longToDate = function(e) {
        return new Date(e)
    };
    this.isDate = function(e, t) {
        if (t == null) {
            t = "yyyyMMdd"
        }
        var a = t.indexOf("yyyy");
        if (a == -1) {
            return false
        }
        var r = e.substring(a, a + 4);
        var n = t.indexOf("MM");
        if (n == -1) {
            return false
        }
        var i = e.substring(n, n + 2);
        var s = t.indexOf("dd");
        if (s == -1) {
            return false
        }
        var o = e.substring(s, s + 2);
        if (!isNumber(r) || r > "2100" || r < "1900") {
            return false
        }
        if (!isNumber(i) || i > "12" || i < "01") {
            return false
        }
        if (o > getMaxDay(r, i) || o < "01") {
            return false
        }
        return true
    };
    this.getMaxDay = function(e, t) {
        if (t == 4 || t == 6 || t == 9 || t == 11) return "30";
        if (t == 2) if (e % 4 == 0 && e % 100 != 0 || e % 400 == 0) return "29";
        else return "28";
        return "31"
    };
    this.isNumber = function(e) {
        var t = /^\d+$/g;
        return t.test(e)
    };
    this.toArray = function(e) {
        e = arguments[0] || new Date;
        var t = Array();
        t[0] = e.getFullYear();
        t[1] = e.getMonth();
        t[2] = e.getDate();
        t[3] = e.getHours();
        t[4] = e.getMinutes();
        t[5] = e.getSeconds();
        return t
    };
    this.datePart = function(e, t) {
        t = arguments[1] || new Date;
        var a = "";
        var r = ["日", "一", "二", "三", "四", "五", "六"];
        switch (e) {
            case "y":
                a = t.getFullYear();
                break;
            case "M":
                a = t.getMonth() + 1;
                break;
            case "d":
                a = t.getDate();
                break;
            case "w":
                a = r[t.getDay()];
                break;
            case "ww":
                a = t.WeekNumOfYear();
                break;
            case "h":
                a = t.getHours();
                break;
            case "m":
                a = t.getMinutes();
                break;
            case "s":
                a = t.getSeconds();
                break
        }
        return a
    };
    this.maxDayOfDate = function(e) {
        e = arguments[0] || new Date;
        e.setDate(1);
        e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 24 * 60 * 60 * 1e3;
        var a = new Date(t);
        return a.getDate()
    }
};
module.exports = util;