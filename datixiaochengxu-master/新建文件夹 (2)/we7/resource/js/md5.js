(function(r) {
    "use strict";

    function n(r, n) {
        var t = (r & 65535) + (n & 65535);
        var e = (r >> 16) + (n >> 16) + (t >> 16);
        return e << 16 | t & 65535
    }
    function t(r, n) {
        return r << n | r >>> 32 - n
    }
    function e(r, e, u, o, a, f) {
        return n(t(n(n(e, r), n(o, f)), a), u)
    }
    function u(r, n, t, u, o, a, f) {
        return e(n & t | ~n & u, r, n, o, a, f)
    }
    function o(r, n, t, u, o, a, f) {
        return e(n & u | t & ~u, r, n, o, a, f)
    }
    function a(r, n, t, u, o, a, f) {
        return e(n ^ t ^ u, r, n, o, a, f)
    }
    function f(r, n, t, u, o, a, f) {
        return e(t ^ (n | ~u), r, n, o, a, f)
    }
    function c(r, t) {
        r[t >> 5] |= 128 << t % 32;
        r[(t + 64 >>> 9 << 4) + 14] = t;
        var e;
        var c;
        var i;
        var v;
        var h;
        var d = 1732584193;
        var g = -271733879;
        var l = -1732584194;
        var s = 271733878;
        for (e = 0; e < r.length; e += 16) {
            c = d;
            i = g;
            v = l;
            h = s;
            d = u(d, g, l, s, r[e], 7, -680876936);
            s = u(s, d, g, l, r[e + 1], 12, -389564586);
            l = u(l, s, d, g, r[e + 2], 17, 606105819);
            g = u(g, l, s, d, r[e + 3], 22, -1044525330);
            d = u(d, g, l, s, r[e + 4], 7, -176418897);
            s = u(s, d, g, l, r[e + 5], 12, 1200080426);
            l = u(l, s, d, g, r[e + 6], 17, -1473231341);
            g = u(g, l, s, d, r[e + 7], 22, -45705983);
            d = u(d, g, l, s, r[e + 8], 7, 1770035416);
            s = u(s, d, g, l, r[e + 9], 12, -1958414417);
            l = u(l, s, d, g, r[e + 10], 17, -42063);
            g = u(g, l, s, d, r[e + 11], 22, -1990404162);
            d = u(d, g, l, s, r[e + 12], 7, 1804603682);
            s = u(s, d, g, l, r[e + 13], 12, -40341101);
            l = u(l, s, d, g, r[e + 14], 17, -1502002290);
            g = u(g, l, s, d, r[e + 15], 22, 1236535329);
            d = o(d, g, l, s, r[e + 1], 5, -165796510);
            s = o(s, d, g, l, r[e + 6], 9, -1069501632);
            l = o(l, s, d, g, r[e + 11], 14, 643717713);
            g = o(g, l, s, d, r[e], 20, -373897302);
            d = o(d, g, l, s, r[e + 5], 5, -701558691);
            s = o(s, d, g, l, r[e + 10], 9, 38016083);
            l = o(l, s, d, g, r[e + 15], 14, -660478335);
            g = o(g, l, s, d, r[e + 4], 20, -405537848);
            d = o(d, g, l, s, r[e + 9], 5, 568446438);
            s = o(s, d, g, l, r[e + 14], 9, -1019803690);
            l = o(l, s, d, g, r[e + 3], 14, -187363961);
            g = o(g, l, s, d, r[e + 8], 20, 1163531501);
            d = o(d, g, l, s, r[e + 13], 5, -1444681467);
            s = o(s, d, g, l, r[e + 2], 9, -51403784);
            l = o(l, s, d, g, r[e + 7], 14, 1735328473);
            g = o(g, l, s, d, r[e + 12], 20, -1926607734);
            d = a(d, g, l, s, r[e + 5], 4, -378558);
            s = a(s, d, g, l, r[e + 8], 11, -2022574463);
            l = a(l, s, d, g, r[e + 11], 16, 1839030562);
            g = a(g, l, s, d, r[e + 14], 23, -35309556);
            d = a(d, g, l, s, r[e + 1], 4, -1530992060);
            s = a(s, d, g, l, r[e + 4], 11, 1272893353);
            l = a(l, s, d, g, r[e + 7], 16, -155497632);
            g = a(g, l, s, d, r[e + 10], 23, -1094730640);
            d = a(d, g, l, s, r[e + 13], 4, 681279174);
            s = a(s, d, g, l, r[e], 11, -358537222);
            l = a(l, s, d, g, r[e + 3], 16, -722521979);
            g = a(g, l, s, d, r[e + 6], 23, 76029189);
            d = a(d, g, l, s, r[e + 9], 4, -640364487);
            s = a(s, d, g, l, r[e + 12], 11, -421815835);
            l = a(l, s, d, g, r[e + 15], 16, 530742520);
            g = a(g, l, s, d, r[e + 2], 23, -995338651);
            d = f(d, g, l, s, r[e], 6, -198630844);
            s = f(s, d, g, l, r[e + 7], 10, 1126891415);
            l = f(l, s, d, g, r[e + 14], 15, -1416354905);
            g = f(g, l, s, d, r[e + 5], 21, -57434055);
            d = f(d, g, l, s, r[e + 12], 6, 1700485571);
            s = f(s, d, g, l, r[e + 3], 10, -1894986606);
            l = f(l, s, d, g, r[e + 10], 15, -1051523);
            g = f(g, l, s, d, r[e + 1], 21, -2054922799);
            d = f(d, g, l, s, r[e + 8], 6, 1873313359);
            s = f(s, d, g, l, r[e + 15], 10, -30611744);
            l = f(l, s, d, g, r[e + 6], 15, -1560198380);
            g = f(g, l, s, d, r[e + 13], 21, 1309151649);
            d = f(d, g, l, s, r[e + 4], 6, -145523070);
            s = f(s, d, g, l, r[e + 11], 10, -1120210379);
            l = f(l, s, d, g, r[e + 2], 15, 718787259);
            g = f(g, l, s, d, r[e + 9], 21, -343485551);
            d = n(d, c);
            g = n(g, i);
            l = n(l, v);
            s = n(s, h)
        }
        return [d, g, l, s]
    }
    function i(r) {
        var n;
        var t = "";
        var e = r.length * 32;
        for (n = 0; n < e; n += 8) {
            t += String.fromCharCode(r[n >> 5] >>> n % 32 & 255)
        }
        return t
    }
    function v(r) {
        var n;
        var t = [];
        t[(r.length >> 2) - 1] = undefined;
        for (n = 0; n < t.length; n += 1) {
            t[n] = 0
        }
        var e = r.length * 8;
        for (n = 0; n < e; n += 8) {
            t[n >> 5] |= (r.charCodeAt(n / 8) & 255) << n % 32
        }
        return t
    }
    function h(r) {
        return i(c(v(r), r.length * 8))
    }
    function d(r, n) {
        var t;
        var e = v(r);
        var u = [];
        var o = [];
        var a;
        u[15] = o[15] = undefined;
        if (e.length > 16) {
            e = c(e, r.length * 8)
        }
        for (t = 0; t < 16; t += 1) {
            u[t] = e[t] ^ 909522486;
            o[t] = e[t] ^ 1549556828
        }
        a = c(u.concat(v(n)), 512 + n.length * 8);
        return i(c(o.concat(a), 512 + 128))
    }
    function g(r) {
        var n = "0123456789abcdef";
        var t = "";
        var e;
        var u;
        for (u = 0; u < r.length; u += 1) {
            e = r.charCodeAt(u);
            t += n.charAt(e >>> 4 & 15) + n.charAt(e & 15)
        }
        return t
    }
    function l(r) {
        return unescape(encodeURIComponent(r))
    }
    function s(r) {
        return h(l(r))
    }
    function C(r) {
        return g(s(r))
    }
    function A(r, n) {
        return d(l(r), l(n))
    }
    function m(r, n) {
        return g(A(r, n))
    }
    function p(r, n, t) {
        if (!n) {
            if (!t) {
                return C(r)
            }
            return s(r)
        }
        if (!t) {
            return m(n, r)
        }
        return A(n, r)
    }
    module.exports = p
})(undefined);