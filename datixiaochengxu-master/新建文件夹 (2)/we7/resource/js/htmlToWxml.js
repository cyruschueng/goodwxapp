var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
var special = makeMap("script,style");
var HTMLParser = function e(t, a) {
    var r, i, n, s = [],
        l = t;
    s.last = function() {
        return this[this.length - 1]
    };
    while (t) {
        i = true;
        if (!s.last() || !special[s.last()]) {
            if (t.indexOf("\x3c!--") == 0) {
                r = t.indexOf("--\x3e");
                if (r >= 0) {
                    if (a.comment) a.comment(t.substring(4, r));
                    t = t.substring(r + 3);
                    i = false
                }
            } else if (t.indexOf("</") == 0) {
                n = t.match(endTag);
                if (n) {
                    t = t.substring(n[0].length);
                    n[0].replace(endTag, c);
                    i = false
                }
            } else if (t.indexOf("<") == 0) {
                n = t.match(startTag);
                if (n) {
                    t = t.substring(n[0].length);
                    n[0].replace(startTag, f);
                    i = false
                }
            }
            if (i) {
                r = t.indexOf("<");
                var o = r < 0 ? t : t.substring(0, r);
                t = r < 0 ? "" : t.substring(r);
                if (a.chars) a.chars(o)
            }
        } else {
            t = t.replace(new RegExp("([\\s\\S]*?)</" + s.last() + "[^>]*>"), function(e, t) {
                t = t.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                if (a.chars) a.chars(t);
                return ""
            });
            c("", s.last())
        }
        if (t == l) throw "Parse Error: " + t;
        l = t
    }
    c();

    function f(e, t, r, i) {
        t = t.toLowerCase();
        if (block[t]) {
            while (s.last() && inline[s.last()]) {
                c("", s.last())
            }
        }
        if (closeSelf[t] && s.last() == t) {
            c("", t)
        }
        i = empty[t] || !! i;
        if (!i) s.push(t);
        if (a.start) {
            var n = [];
            r.replace(attr, function(e, t) {
                var a = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[t] ? t : "";
                n.push({
                    name: t,
                    value: a,
                    escaped: a.replace(/(^|[^\\])"/g, '$1\\"')
                })
            });
            if (a.start) a.start(t, n, i)
        }
    }
    function c(e, t) {
        if (!t) var r = 0;
        else for (var r = s.length - 1; r >= 0; r--) {
            if (s[r] == t) break
        }
        if (r >= 0) {
            for (var i = s.length - 1; i >= r; i--) {
                if (a.end) a.end(s[i])
            }
            s.length = r
        }
    }
};

function makeMap(e) {
    var t = {}, a = e.split(",");
    for (var r = 0; r < a.length; r++) {
        t[a[r]] = true
    }
    return t
}
var global = {};
var debug = function e() {};

function q(e) {
    return '"' + e + '"'
}
function removeDOCTYPE(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "")
}
global.html2json = function e(t) {
    t = removeDOCTYPE(t);
    var a = [];
    var r = {
        node: "root",
        child: []
    };
    HTMLParser(t, {
        start: function e(t, i, n) {
            debug(t, i, n);
            var s = {
                node: "element",
                tag: t
            };
            if (i.length !== 0) {
                s.attr = i.reduce(function(e, t) {
                    var a = t.name;
                    var r = t.value;
                    if (r.match(/ /)) {
                        r = r.split(" ")
                    }
                    if (e[a]) {
                        if (Array.isArray(e[a])) {
                            e[a].push(r)
                        } else {
                            e[a] = [e[a], r]
                        }
                    } else {
                        e[a] = r
                    }
                    return e
                }, {})
            }
            if (n) {
                var l = a[0] || r;
                if (l.child === undefined) {
                    l.child = []
                }
                l.child.push(s)
            } else {
                a.unshift(s)
            }
        },
        end: function e(t) {
            debug(t);
            var i = a.shift();
            if (i.tag !== t) console.error("invalid state: mismatch end tag");
            if (a.length === 0) {
                r.child.push(i)
            } else {
                var n = a[0];
                if (n.child === undefined) {
                    n.child = []
                }
                n.child.push(i)
            }
        },
        chars: function e(t) {
            debug(t);
            var i = {
                node: "text",
                text: t
            };
            if (a.length === 0) {
                r.child.push(i)
            } else {
                var n = a[0];
                if (n.child === undefined) {
                    n.child = []
                }
                n.child.push(i)
            }
        },
        comment: function e(t) {
            debug(t);
            var r = {
                node: "comment",
                text: t
            };
            var i = a[0];
            if (i.child === undefined) {
                i.child = []
            }
            i.child.push(r)
        }
    });
    return r
};
global.json2html = function e(t) {
    var a = ["area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param", "embed"];
    var r = "";
    if (t.child) {
        r = t.child.map(function(t) {
            return e(t)
        }).join("")
    }
    var i = "";
    if (t.attr) {
        i = Object.keys(t.attr).map(function(e) {
            var a = t.attr[e];
            if (Array.isArray(a)) a = a.join(" ");
            return e + "=" + q(a)
        }).join(" ");
        if (i !== "") i = " " + i
    }
    if (t.node === "element") {
        var n = t.tag;
        if (a.indexOf(n) > -1) {
            return "<" + t.tag + i + "/>"
        }
        var s = "<" + t.tag + i + ">";
        var l = "</" + t.tag + ">";
        return s + r + l
    }
    if (t.node === "text") {
        return t.text
    }
    if (t.node === "comment") {
        return "\x3c!--" + t.text + "--\x3e"
    }
    if (t.node === "root") {
        return r
    }
};
var html2wxwebview = function e(t) {
    var a = global.html2json(t);
    a = parseHtmlNode(a);
    a = arrangeNode(a);
    return a
};
var arrangeNode = function e(t) {
    var a = [];
    var r = [];
    for (var i = 0, n = t.length; i < n; i++) {
        if (i == 0) {
            if (t[i].type == "view") {
                continue
            }
            a.push(t[i])
        } else {
            if (t[i].type == "view") {
                if (a.length > 0) {
                    var s = {
                        type: "view",
                        child: a
                    };
                    r.push(s)
                }
                a = []
            } else if (t[i].type == "img") {
                if (a.length > 0) {
                    var s = {
                        type: "view",
                        child: a
                    };
                    r.push(s)
                }
                var s = {
                    type: "img",
                    attr: t[i].attr
                };
                r.push(s);
                a = []
            } else {
                a.push(t[i]);
                if (i == n - 1) {
                    var s = {
                        type: "view",
                        child: a
                    };
                    r.push(s)
                }
            }
        }
    }
    return r
};
var parseHtmlNode = function e(t) {
    var a = [];
    var r = function e(t) {
        var r = {};
        if (t.node == "root") {} else if (t.node == "element") {
            switch (t.tag) {
                case "a":
                    r = {
                        type: "a",
                        text: t.child[0].text
                    };
                    break;
                case "img":
                    r = {
                        type: "img",
                        text: t.text
                    };
                    break;
                case "p":
                    r = {
                        type: "view",
                        text: t.text
                    };
                    break;
                case "div":
                    r = {
                        type: "view",
                        text: t.text
                    };
                    break
            }
        } else if (t.node == "text") {
            r = {
                type: "text",
                text: t.text
            }
        }
        if (t.attr) {
            r.attr = t.attr
        }
        if (Object.keys(r).length != 0) {
            a.push(r)
        }
        if (t.tag == "a") {
            return
        }
        var i = t.child;
        if (i) {
            for (var n in i) {
                e(i[n])
            }
        }
    };
    r(t);
    return a
};
module.exports = {
    html2json: html2wxwebview
};