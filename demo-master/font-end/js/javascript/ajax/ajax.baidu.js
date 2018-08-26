function Xhr(t, e) {
    this.callbacks = [],
    e = e || function() {}
    ;
    var a;
    a = window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
    a.onreadystatechange = function() {
        if (4 === a.readyState)
            if (200 === a.status) {
                e(a.responseText);
                for (var t = this.callbacks.length, n = 0; t > n; n++)
                    this.callbacks[n].call(this, a.responseText)
            } else
                console.log("Error occured")
    }
    .bind(this);
    var n = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
    a.open("POST", t, !0),
    a.setRequestHeader("Content-type", "text/json; charset=UTF-8"),
    a.setRequestHeader("X-XSRF-TOKEN", n && n[1]),
    a.send()
}
function dateFormat(t, e) {
    void 0 === e && (e = t,
    t = new Date);
    var a = {
        M: t.getMonth() + 1,
        d: t.getDate(),
        h: t.getHours(),
        m: t.getMinutes(),
        s: t.getSeconds(),
        q: Math.floor((t.getMonth() + 3) / 3),
        S: t.getMilliseconds()
    };
    return e = e.replace(/([yMdhmsqS])+/g, function(e, n) {
        var o = a[n];
        return void 0 !== o ? (e.length > 1 && (o = "0" + o,
        o = o.substr(o.length - 2)),
        o) : "y" === n ? (t.getFullYear() + "").substr(4 - e.length) : e
    })
}
Xhr.prototype.done = function(t) {
    return this.callbacks.push(t),
    this
}
;
try {
    var last_active_date = window.localStorage.getItem("lastActiveDate")
      , today = dateFormat(new Date, "yyyy-MM-dd");
    if (window.me && window.me.business && (null === last_active_date || today > last_active_date)) {
        var activityXHR = new Xhr("/api/me/active");
        activityXHR.done(function(t) {
            try {
                var e = JSON.parse(t);
                0 === e.errno && window.localStorage.setItem("lastActiveDate", today)
            } catch (a) {}
        })
    }
} catch (e) {}
