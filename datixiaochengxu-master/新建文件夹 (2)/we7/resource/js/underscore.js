var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(n) {
        return typeof n
    } : function(n) {
        return n && typeof Symbol === "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    };
(function() {
    var n = Array.prototype,
        r = Object.prototype,
        t = Function.prototype;
    var e = n.push,
        i = n.slice,
        u = r.toString,
        a = r.hasOwnProperty;
    var o = Array.isArray,
        f = Object.keys,
        l = t.bind,
        c = Object.create;
    var s = function n() {};
    var v = function n(r) {
        if (r instanceof n) return r;
        if (!(this instanceof n)) return new n(r);
        this._wrapped = r
    };
    module.exports = v;
    v.VERSION = "1.8.2";
    var p = function n(r, t, e) {
        if (t === void 0) return r;
        switch (e == null ? 3 : e) {
            case 1:
                return function(n) {
                    return r.call(t, n)
                };
            case 2:
                return function(n, e) {
                    return r.call(t, n, e)
                };
            case 3:
                return function(n, e, i) {
                    return r.call(t, n, e, i)
                };
            case 4:
                return function(n, e, i, u) {
                    return r.call(t, n, e, i, u)
                }
        }
        return function() {
            return r.apply(t, arguments)
        }
    };
    var h = function n(r, t, e) {
        if (r == null) return v.identity;
        if (v.isFunction(r)) return p(r, t, e);
        if (v.isObject(r)) return v.matcher(r);
        return v.property(r)
    };
    v.iteratee = function(n, r) {
        return h(n, r, Infinity)
    };
    var y = function n(r, t) {
        return function(n) {
            var e = arguments.length;
            if (e < 2 || n == null) return n;
            for (var i = 1; i < e; i++) {
                var u = arguments[i],
                    a = r(u),
                    o = a.length;
                for (var f = 0; f < o; f++) {
                    var l = a[f];
                    if (!t || n[l] === void 0) n[l] = u[l]
                }
            }
            return n
        }
    };
    var d = function n(r) {
        if (!v.isObject(r)) return {};
        if (c) return c(r);
        s.prototype = r;
        var t = new s;
        s.prototype = null;
        return t
    };
    var g = Math.pow(2, 53) - 1;
    var m = function n(r) {
        var t = r != null && r.length;
        return typeof t == "number" && t >= 0 && t <= g
    };
    v.each = v.forEach = function(n, r, t) {
        r = p(r, t);
        var e, i;
        if (m(n)) {
            for (e = 0, i = n.length; e < i; e++) {
                r(n[e], e, n)
            }
        } else {
            var u = v.keys(n);
            for (e = 0, i = u.length; e < i; e++) {
                r(n[u[e]], u[e], n)
            }
        }
        return n
    };
    v.map = v.collect = function(n, r, t) {
        r = h(r, t);
        var e = !m(n) && v.keys(n),
            i = (e || n).length,
            u = Array(i);
        for (var a = 0; a < i; a++) {
            var o = e ? e[a] : a;
            u[a] = r(n[o], o, n)
        }
        return u
    };

    function b(n) {
        function r(r, t, e, i, u, a) {
            for (; u >= 0 && u < a; u += n) {
                var o = i ? i[u] : u;
                e = t(e, r[o], o, r)
            }
            return e
        }
        return function(t, e, i, u) {
            e = p(e, u, 4);
            var a = !m(t) && v.keys(t),
                o = (a || t).length,
                f = n > 0 ? 0 : o - 1;
            if (arguments.length < 3) {
                i = t[a ? a[f] : f];
                f += n
            }
            return r(t, e, i, a, f, o)
        }
    }
    v.reduce = v.foldl = v.inject = b(1);
    v.reduceRight = v.foldr = b(-1);
    v.find = v.detect = function(n, r, t) {
        var e;
        if (m(n)) {
            e = v.findIndex(n, r, t)
        } else {
            e = v.findKey(n, r, t)
        }
        if (e !== void 0 && e !== -1) return n[e]
    };
    v.filter = v.select = function(n, r, t) {
        var e = [];
        r = h(r, t);
        v.each(n, function(n, t, i) {
            if (r(n, t, i)) e.push(n)
        });
        return e
    };
    v.reject = function(n, r, t) {
        return v.filter(n, v.negate(h(r)), t)
    };
    v.every = v.all = function(n, r, t) {
        r = h(r, t);
        var e = !m(n) && v.keys(n),
            i = (e || n).length;
        for (var u = 0; u < i; u++) {
            var a = e ? e[u] : u;
            if (!r(n[a], a, n)) return false
        }
        return true
    };
    v.some = v.any = function(n, r, t) {
        r = h(r, t);
        var e = !m(n) && v.keys(n),
            i = (e || n).length;
        for (var u = 0; u < i; u++) {
            var a = e ? e[u] : u;
            if (r(n[a], a, n)) return true
        }
        return false
    };
    v.contains = v.includes = v.include = function(n, r, t) {
        if (!m(n)) n = v.values(n);
        return v.indexOf(n, r, typeof t == "number" && t) >= 0
    };
    v.invoke = function(n, r) {
        var t = i.call(arguments, 2);
        var e = v.isFunction(r);
        return v.map(n, function(n) {
            var i = e ? r : n[r];
            return i == null ? i : i.apply(n, t)
        })
    };
    v.pluck = function(n, r) {
        return v.map(n, v.property(r))
    };
    v.where = function(n, r) {
        return v.filter(n, v.matcher(r))
    };
    v.findWhere = function(n, r) {
        return v.find(n, v.matcher(r))
    };
    v.max = function(n, r, t) {
        var e = -Infinity,
            i = -Infinity,
            u, a;
        if (r == null && n != null) {
            n = m(n) ? n : v.values(n);
            for (var o = 0, f = n.length; o < f; o++) {
                u = n[o];
                if (u > e) {
                    e = u
                }
            }
        } else {
            r = h(r, t);
            v.each(n, function(n, t, u) {
                a = r(n, t, u);
                if (a > i || a === -Infinity && e === -Infinity) {
                    e = n;
                    i = a
                }
            })
        }
        return e
    };
    v.min = function(n, r, t) {
        var e = Infinity,
            i = Infinity,
            u, a;
        if (r == null && n != null) {
            n = m(n) ? n : v.values(n);
            for (var o = 0, f = n.length; o < f; o++) {
                u = n[o];
                if (u < e) {
                    e = u
                }
            }
        } else {
            r = h(r, t);
            v.each(n, function(n, t, u) {
                a = r(n, t, u);
                if (a < i || a === Infinity && e === Infinity) {
                    e = n;
                    i = a
                }
            })
        }
        return e
    };
    v.shuffle = function(n) {
        var r = m(n) ? n : v.values(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0, u; i < t; i++) {
            u = v.random(0, i);
            if (u !== i) e[i] = e[u];
            e[u] = r[i]
        }
        return e
    };
    v.sample = function(n, r, t) {
        if (r == null || t) {
            if (!m(n)) n = v.values(n);
            return n[v.random(n.length - 1)]
        }
        return v.shuffle(n).slice(0, Math.max(0, r))
    };
    v.sortBy = function(n, r, t) {
        r = h(r, t);
        return v.pluck(v.map(n, function(n, t, e) {
            return {
                value: n,
                index: t,
                criteria: r(n, t, e)
            }
        }).sort(function(n, r) {
            var t = n.criteria;
            var e = r.criteria;
            if (t !== e) {
                if (t > e || t === void 0) return 1;
                if (t < e || e === void 0) return -1
            }
            return n.index - r.index
        }), "value")
    };
    var w = function n(r) {
        return function(n, t, e) {
            var i = {};
            t = h(t, e);
            v.each(n, function(e, u) {
                var a = t(e, u, n);
                r(i, e, a)
            });
            return i
        }
    };
    v.groupBy = w(function(n, r, t) {
        if (v.has(n, t)) n[t].push(r);
        else n[t] = [r]
    });
    v.indexBy = w(function(n, r, t) {
        n[t] = r
    });
    v.countBy = w(function(n, r, t) {
        if (v.has(n, t)) n[t]++;
        else n[t] = 1
    });
    v.toArray = function(n) {
        if (!n) return [];
        if (v.isArray(n)) return i.call(n);
        if (m(n)) return v.map(n, v.identity);
        return v.values(n)
    };
    v.size = function(n) {
        if (n == null) return 0;
        return m(n) ? n.length : v.keys(n).length
    };
    v.partition = function(n, r, t) {
        r = h(r, t);
        var e = [],
            i = [];
        v.each(n, function(n, t, u) {
            (r(n, t, u) ? e : i).push(n)
        });
        return [e, i]
    };
    v.first = v.head = v.take = function(n, r, t) {
        if (n == null) return void 0;
        if (r == null || t) return n[0];
        return v.initial(n, n.length - r)
    };
    v.initial = function(n, r, t) {
        return i.call(n, 0, Math.max(0, n.length - (r == null || t ? 1 : r)))
    };
    v.last = function(n, r, t) {
        if (n == null) return void 0;
        if (r == null || t) return n[n.length - 1];
        return v.rest(n, Math.max(0, n.length - r))
    };
    v.rest = v.tail = v.drop = function(n, r, t) {
        return i.call(n, r == null || t ? 1 : r)
    };
    v.compact = function(n) {
        return v.filter(n, v.identity)
    };
    var _ = function n(r, t, e, i) {
        var u = [],
            a = 0;
        for (var o = i || 0, f = r && r.length; o < f; o++) {
            var l = r[o];
            if (m(l) && (v.isArray(l) || v.isArguments(l))) {
                if (!t) l = n(l, t, e);
                var c = 0,
                    s = l.length;
                u.length += s;
                while (c < s) {
                    u[a++] = l[c++]
                }
            } else if (!e) {
                u[a++] = l
            }
        }
        return u
    };
    v.flatten = function(n, r) {
        return _(n, r, false)
    };
    v.without = function(n) {
        return v.difference(n, i.call(arguments, 1))
    };
    v.uniq = v.unique = function(n, r, t, e) {
        if (n == null) return [];
        if (!v.isBoolean(r)) {
            e = t;
            t = r;
            r = false
        }
        if (t != null) t = h(t, e);
        var i = [];
        var u = [];
        for (var a = 0, o = n.length; a < o; a++) {
            var f = n[a],
                l = t ? t(f, a, n) : f;
            if (r) {
                if (!a || u !== l) i.push(f);
                u = l
            } else if (t) {
                if (!v.contains(u, l)) {
                    u.push(l);
                    i.push(f)
                }
            } else if (!v.contains(i, f)) {
                i.push(f)
            }
        }
        return i
    };
    v.union = function() {
        return v.uniq(_(arguments, true, true))
    };
    v.intersection = function(n) {
        if (n == null) return [];
        var r = [];
        var t = arguments.length;
        for (var e = 0, i = n.length; e < i; e++) {
            var u = n[e];
            if (v.contains(r, u)) continue;
            for (var a = 1; a < t; a++) {
                if (!v.contains(arguments[a], u)) break
            }
            if (a === t) r.push(u)
        }
        return r
    };
    v.difference = function(n) {
        var r = _(arguments, true, true, 1);
        return v.filter(n, function(n) {
            return !v.contains(r, n)
        })
    };
    v.zip = function() {
        return v.unzip(arguments)
    };
    v.unzip = function(n) {
        var r = n && v.max(n, "length").length || 0;
        var t = Array(r);
        for (var e = 0; e < r; e++) {
            t[e] = v.pluck(n, e)
        }
        return t
    };
    v.object = function(n, r) {
        var t = {};
        for (var e = 0, i = n && n.length; e < i; e++) {
            if (r) {
                t[n[e]] = r[e]
            } else {
                t[n[e][0]] = n[e][1]
            }
        }
        return t
    };
    v.indexOf = function(n, r, t) {
        var e = 0,
            u = n && n.length;
        if (typeof t == "number") {
            e = t < 0 ? Math.max(0, u + t) : t
        } else if (t && u) {
            e = v.sortedIndex(n, r);
            return n[e] === r ? e : -1
        }
        if (r !== r) {
            return v.findIndex(i.call(n, e), v.isNaN)
        }
        for (; e < u; e++) {
            if (n[e] === r) return e
        }
        return -1
    };
    v.lastIndexOf = function(n, r, t) {
        var e = n ? n.length : 0;
        if (typeof t == "number") {
            e = t < 0 ? e + t + 1 : Math.min(e, t + 1)
        }
        if (r !== r) {
            return v.findLastIndex(i.call(n, 0, e), v.isNaN)
        }
        while (--e >= 0) {
            if (n[e] === r) return e
        }
        return -1
    };

    function j(n) {
        return function(r, t, e) {
            t = h(t, e);
            var i = r != null && r.length;
            var u = n > 0 ? 0 : i - 1;
            for (; u >= 0 && u < i; u += n) {
                if (t(r[u], u, r)) return u
            }
            return -1
        }
    }
    v.findIndex = j(1);
    v.findLastIndex = j(-1);
    v.sortedIndex = function(n, r, t, e) {
        t = h(t, e, 1);
        var i = t(r);
        var u = 0,
            a = n.length;
        while (u < a) {
            var o = Math.floor((u + a) / 2);
            if (t(n[o]) < i) u = o + 1;
            else a = o
        }
        return u
    };
    v.range = function(n, r, t) {
        if (arguments.length <= 1) {
            r = n || 0;
            n = 0
        }
        t = t || 1;
        var e = Math.max(Math.ceil((r - n) / t), 0);
        var i = Array(e);
        for (var u = 0; u < e; u++, n += t) {
            i[u] = n
        }
        return i
    };
    var x = function n(r, t, e, i, u) {
        if (!(i instanceof t)) return r.apply(e, u);
        var a = d(r.prototype);
        var o = r.apply(a, u);
        if (v.isObject(o)) return o;
        return a
    };
    v.bind = function(n, r) {
        if (l && n.bind === l) return l.apply(n, i.call(arguments, 1));
        if (!v.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var t = i.call(arguments, 2);
        var e = function e() {
            return x(n, e, r, this, t.concat(i.call(arguments)))
        };
        return e
    };
    v.partial = function(n) {
        var r = i.call(arguments, 1);
        var t = function t() {
            var e = 0,
                i = r.length;
            var u = Array(i);
            for (var a = 0; a < i; a++) {
                u[a] = r[a] === v ? arguments[e++] : r[a]
            }
            while (e < arguments.length) {
                u.push(arguments[e++])
            }
            return x(n, t, this, this, u)
        };
        return t
    };
    v.bindAll = function(n) {
        var r, t = arguments.length,
            e;
        if (t <= 1) throw new Error("bindAll must be passed function names");
        for (r = 1; r < t; r++) {
            e = arguments[r];
            n[e] = v.bind(n[e], n)
        }
        return n
    };
    v.memoize = function(n, r) {
        var t = function t(e) {
            var i = t.cache;
            var u = "" + (r ? r.apply(this, arguments) : e);
            if (!v.has(i, u)) i[u] = n.apply(this, arguments);
            return i[u]
        };
        t.cache = {};
        return t
    };
    v.delay = function(n, r) {
        var t = i.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null, t)
        }, r)
    };
    v.defer = v.partial(v.delay, v, 1);
    v.throttle = function(n, r, t) {
        var e, i, u;
        var a = null;
        var o = 0;
        if (!t) t = {};
        var f = function r() {
            o = t.leading === false ? 0 : v.now();
            a = null;
            u = n.apply(e, i);
            if (!a) e = i = null
        };
        return function() {
            var l = v.now();
            if (!o && t.leading === false) o = l;
            var c = r - (l - o);
            e = this;
            i = arguments;
            if (c <= 0 || c > r) {
                if (a) {
                    clearTimeout(a);
                    a = null
                }
                o = l;
                u = n.apply(e, i);
                if (!a) e = i = null
            } else if (!a && t.trailing !== false) {
                a = setTimeout(f, c)
            }
            return u
        }
    };
    v.debounce = function(n, r, t) {
        var e, i, u, a, o;
        var f = function f() {
            var l = v.now() - a;
            if (l < r && l >= 0) {
                e = setTimeout(f, r - l)
            } else {
                e = null;
                if (!t) {
                    o = n.apply(u, i);
                    if (!e) u = i = null
                }
            }
        };
        return function() {
            u = this;
            i = arguments;
            a = v.now();
            var l = t && !e;
            if (!e) e = setTimeout(f, r);
            if (l) {
                o = n.apply(u, i);
                u = i = null
            }
            return o
        }
    };
    v.wrap = function(n, r) {
        return v.partial(r, n)
    };
    v.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    };
    v.compose = function() {
        var n = arguments;
        var r = n.length - 1;
        return function() {
            var t = r;
            var e = n[r].apply(this, arguments);
            while (t--) {
                e = n[t].call(this, e)
            }
            return e
        }
    };
    v.after = function(n, r) {
        return function() {
            if (--n < 1) {
                return r.apply(this, arguments)
            }
        }
    };
    v.before = function(n, r) {
        var t;
        return function() {
            if (--n > 0) {
                t = r.apply(this, arguments)
            }
            if (n <= 1) r = null;
            return t
        }
    };
    v.once = v.partial(v.before, 2);
    var A = !{
        toString: null
    }.propertyIsEnumerable("toString");
    var k = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];

    function O(n, t) {
        var e = k.length;
        var i = n.constructor;
        var u = v.isFunction(i) && i.prototype || r;
        var a = "constructor";
        if (v.has(n, a) && !v.contains(t, a)) t.push(a);
        while (e--) {
            a = k[e];
            if (a in n && n[a] !== u[a] && !v.contains(t, a)) {
                t.push(a)
            }
        }
    }
    v.keys = function(n) {
        if (!v.isObject(n)) return [];
        if (f) return f(n);
        var r = [];
        for (var t in n) {
            if (v.has(n, t)) r.push(t)
        }
        if (A) O(n, r);
        return r
    };
    v.allKeys = function(n) {
        if (!v.isObject(n)) return [];
        var r = [];
        for (var t in n) {
            r.push(t)
        }
        if (A) O(n, r);
        return r
    };
    v.values = function(n) {
        var r = v.keys(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0; i < t; i++) {
            e[i] = n[r[i]]
        }
        return e
    };
    v.mapObject = function(n, r, t) {
        r = h(r, t);
        var e = v.keys(n),
            i = e.length,
            u = {}, a;
        for (var o = 0; o < i; o++) {
            a = e[o];
            u[a] = r(n[a], a, n)
        }
        return u
    };
    v.pairs = function(n) {
        var r = v.keys(n);
        var t = r.length;
        var e = Array(t);
        for (var i = 0; i < t; i++) {
            e[i] = [r[i], n[r[i]]]
        }
        return e
    };
    v.invert = function(n) {
        var r = {};
        var t = v.keys(n);
        for (var e = 0, i = t.length; e < i; e++) {
            r[n[t[e]]] = t[e]
        }
        return r
    };
    v.functions = v.methods = function(n) {
        var r = [];
        for (var t in n) {
            if (v.isFunction(n[t])) r.push(t)
        }
        return r.sort()
    };
    v.extend = y(v.allKeys);
    v.extendOwn = v.assign = y(v.keys);
    v.findKey = function(n, r, t) {
        r = h(r, t);
        var e = v.keys(n),
            i;
        for (var u = 0, a = e.length; u < a; u++) {
            i = e[u];
            if (r(n[i], i, n)) return i
        }
    };
    v.pick = function(n, r, t) {
        var e = {}, i = n,
            u, a;
        if (i == null) return e;
        if (v.isFunction(r)) {
            a = v.allKeys(i);
            u = p(r, t)
        } else {
            a = _(arguments, false, false, 1);
            u = function n(r, t, e) {
                return t in e
            };
            i = Object(i)
        }
        for (var o = 0, f = a.length; o < f; o++) {
            var l = a[o];
            var c = i[l];
            if (u(c, l, i)) e[l] = c
        }
        return e
    };
    v.omit = function(n, r, t) {
        if (v.isFunction(r)) {
            r = v.negate(r)
        } else {
            var e = v.map(_(arguments, false, false, 1), String);
            r = function n(r, t) {
                return !v.contains(e, t)
            }
        }
        return v.pick(n, r, t)
    };
    v.defaults = y(v.allKeys, true);
    v.create = function(n, r) {
        var t = d(n);
        if (r) v.extendOwn(t, r);
        return t
    };
    v.clone = function(n) {
        if (!v.isObject(n)) return n;
        return v.isArray(n) ? n.slice() : v.extend({}, n)
    };
    v.tap = function(n, r) {
        r(n);
        return n
    };
    v.isMatch = function(n, r) {
        var t = v.keys(r),
            e = t.length;
        if (n == null) return !e;
        var i = Object(n);
        for (var u = 0; u < e; u++) {
            var a = t[u];
            if (r[a] !== i[a] || !(a in i)) return false
        }
        return true
    };
    var I = function n(r, t, e, i) {
        if (r === t) return r !== 0 || 1 / r === 1 / t;
        if (r == null || t == null) return r === t;
        if (r instanceof v) r = r._wrapped;
        if (t instanceof v) t = t._wrapped;
        var a = u.call(r);
        if (a !== u.call(t)) return false;
        switch (a) {
            case "[object RegExp]":
            case "[object String]":
                return "" + r === "" + t;
            case "[object Number]":
                if (+r !== +r) return +t !== +t;
                return +r === 0 ? 1 / +r === 1 / t : +r === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +r === +t
        }
        var o = a === "[object Array]";
        if (!o) {
            if ((typeof r === "undefined" ? "undefined" : _typeof(r)) != "object" || (typeof t === "undefined" ? "undefined" : _typeof(t)) != "object") return false;
            var f = r.constructor,
                l = t.constructor;
            if (f !== l && !(v.isFunction(f) && f instanceof f && v.isFunction(l) && l instanceof l) && "constructor" in r && "constructor" in t) {
                return false
            }
        }
        e = e || [];
        i = i || [];
        var c = e.length;
        while (c--) {
            if (e[c] === r) return i[c] === t
        }
        e.push(r);
        i.push(t);
        if (o) {
            c = r.length;
            if (c !== t.length) return false;
            while (c--) {
                if (!n(r[c], t[c], e, i)) return false
            }
        } else {
            var s = v.keys(r),
                p;
            c = s.length;
            if (v.keys(t).length !== c) return false;
            while (c--) {
                p = s[c];
                if (!(v.has(t, p) && n(r[p], t[p], e, i))) return false
            }
        }
        e.pop();
        i.pop();
        return true
    };
    v.isEqual = function(n, r) {
        return I(n, r)
    };
    v.isEmpty = function(n) {
        if (n == null) return true;
        if (m(n) && (v.isArray(n) || v.isString(n) || v.isArguments(n))) return n.length === 0;
        return v.keys(n).length === 0
    };
    v.isElement = function(n) {
        return !!(n && n.nodeType === 1)
    };
    v.isArray = o || function(n) {
        return u.call(n) === "[object Array]"
    };
    v.isObject = function(n) {
        var r = typeof n === "undefined" ? "undefined" : _typeof(n);
        return r === "function" || r === "object" && !! n
    };
    v.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        v["is" + n] = function(r) {
            return u.call(r) === "[object " + n + "]"
        }
    });
    if (!v.isArguments(arguments)) {
        v.isArguments = function(n) {
            return v.has(n, "callee")
        }
    }
    if (typeof / . / != "function" && (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) != "object") {
        v.isFunction = function(n) {
            return typeof n == "function" || false
        }
    }
    v.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    };
    v.isNaN = function(n) {
        return v.isNumber(n) && n !== +n
    };
    v.isBoolean = function(n) {
        return n === true || n === false || u.call(n) === "[object Boolean]"
    };
    v.isNull = function(n) {
        return n === null
    };
    v.isUndefined = function(n) {
        return n === void 0
    };
    v.has = function(n, r) {
        return n != null && a.call(n, r)
    };
    v.noConflict = function() {
        root._ = previousUnderscore;
        return this
    };
    v.identity = function(n) {
        return n
    };
    v.constant = function(n) {
        return function() {
            return n
        }
    };
    v.noop = function() {};
    v.property = function(n) {
        return function(r) {
            return r == null ? void 0 : r[n]
        }
    };
    v.propertyOf = function(n) {
        return n == null ? function() {} : function(r) {
            return n[r]
        }
    };
    v.matcher = v.matches = function(n) {
        n = v.extendOwn({}, n);
        return function(r) {
            return v.isMatch(r, n)
        }
    };
    v.times = function(n, r, t) {
        var e = Array(Math.max(0, n));
        r = p(r, t, 1);
        for (var i = 0; i < n; i++) {
            e[i] = r(i)
        }
        return e
    };
    v.random = function(n, r) {
        if (r == null) {
            r = n;
            n = 0
        }
        return n + Math.floor(Math.random() * (r - n + 1))
    };
    v.now = Date.now || function() {
        return (new Date).getTime()
    };
    var S = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };
    var F = v.invert(S);
    var E = function n(r) {
        var t = function n(t) {
            return r[t]
        };
        var e = "(?:" + v.keys(r).join("|") + ")";
        var i = RegExp(e);
        var u = RegExp(e, "g");
        return function(n) {
            n = n == null ? "" : "" + n;
            return i.test(n) ? n.replace(u, t) : n
        }
    };
    v.escape = E(S);
    v.unescape = E(F);
    v.result = function(n, r, t) {
        var e = n == null ? void 0 : n[r];
        if (e === void 0) {
            e = t
        }
        return v.isFunction(e) ? e.call(n) : e
    };
    var M = 0;
    v.uniqueId = function(n) {
        var r = ++M + "";
        return n ? n + r : r
    };
    v.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var N = /(.)^/;
    var B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    };
    var T = /\\|'|\r|\n|\u2028|\u2029/g;
    var R = function n(r) {
        return "\\" + B[r]
    };
    v.template = function(n, r, t) {
        if (!r && t) r = t;
        r = v.defaults({}, r, v.templateSettings);
        var e = RegExp([(r.escape || N).source, (r.interpolate || N).source, (r.evaluate || N).source].join("|") + "|$", "g");
        var i = 0;
        var u = "__p+='";
        n.replace(e, function(r, t, e, a, o) {
            u += n.slice(i, o).replace(T, R);
            i = o + r.length;
            if (t) {
                u += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'"
            } else if (e) {
                u += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"
            } else if (a) {
                u += "';\n" + a + "\n__p+='"
            }
            return r
        });
        u += "';\n";
        if (!r.variable) u = "with(obj||{}){\n" + u + "}\n";
        u = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + u + "return __p;\n";
        try {
            var a = new Function(r.variable || "obj", "_", u)
        } catch (n) {
            n.source = u;
            throw n
        }
        var o = function n(r) {
            return a.call(this, r, v)
        };
        var f = r.variable || "obj";
        o.source = "function(" + f + "){\n" + u + "}";
        return o
    };
    v.chain = function(n) {
        var r = v(n);
        r._chain = true;
        return r
    };
    var q = function n(r, t) {
        return r._chain ? v(t).chain() : t
    };
    v.mixin = function(n) {
        v.each(v.functions(n), function(r) {
            var t = v[r] = n[r];
            v.prototype[r] = function() {
                var n = [this._wrapped];
                e.apply(n, arguments);
                return q(this, t.apply(v, n))
            }
        })
    };
    v.mixin(v);
    v.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(r) {
        var t = n[r];
        v.prototype[r] = function() {
            var n = this._wrapped;
            t.apply(n, arguments);
            if ((r === "shift" || r === "splice") && n.length === 0) delete n[0];
            return q(this, n)
        }
    });
    v.each(["concat", "join", "slice"], function(r) {
        var t = n[r];
        v.prototype[r] = function() {
            return q(this, t.apply(this._wrapped, arguments))
        }
    });
    v.prototype.value = function() {
        return this._wrapped
    };
    v.prototype.valueOf = v.prototype.toJSON = v.prototype.value;
    v.prototype.toString = function() {
        return "" + this._wrapped
    }
}).call(undefined);