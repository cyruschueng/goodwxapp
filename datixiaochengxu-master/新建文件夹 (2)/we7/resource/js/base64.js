function base64_encode(e) {
    var r, a, t;
    var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var o = 0,
        c = e.length,
        d = "";
    while (o < c) {
        r = e.charCodeAt(o++) & 255;
        if (o == c) {
            d += h.charAt(r >> 2);
            d += h.charAt((r & 3) << 4);
            d += "==";
            break
        }
        a = e.charCodeAt(o++);
        if (o == c) {
            d += h.charAt(r >> 2);
            d += h.charAt((r & 3) << 4 | (a & 240) >> 4);
            d += h.charAt((a & 15) << 2);
            d += "=";
            break
        }
        t = e.charCodeAt(o++);
        d += h.charAt(r >> 2);
        d += h.charAt((r & 3) << 4 | (a & 240) >> 4);
        d += h.charAt((a & 15) << 2 | (t & 192) >> 6);
        d += h.charAt(t & 63)
    }
    return d
}
function base64_decode(e) {
    var r, a, t, h;
    var o = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c = 0,
        d = e.length,
        i = "";
    while (c < d) {
        do {
            r = o[e.charCodeAt(c++) & 255]
        } while (c < d && r == -1);
        if (r == -1) break;
        do {
            a = o[e.charCodeAt(c++) & 255]
        } while (c < d && a == -1);
        if (a == -1) break;
        i += String.fromCharCode(r << 2 | (a & 48) >> 4);
        do {
            t = e.charCodeAt(c++) & 255;
            if (t == 61) return i;
            t = o[t]
        } while (c < d && t == -1);
        if (t == -1) break;
        i += String.fromCharCode((a & 15) << 4 | (t & 60) >> 2);
        do {
            h = e.charCodeAt(c++) & 255;
            if (h == 61) return i;
            h = o[h]
        } while (c < d && h == -1);
        if (h == -1) break;
        i += String.fromCharCode((t & 3) << 6 | h)
    }
    return i
}
module.exports = {
    base64_encode: base64_encode,
    base64_decode: base64_decode
};