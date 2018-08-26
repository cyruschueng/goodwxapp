/**
 * 合并两个字典
 * @param {*} json1
 * @param {*} json2
 */
function mergeJson (json1, json2) {
    var rtn = {}
    for (var key in json1) {
        rtn[key] = json1[key]
    }
    for (var key in json2) {
        rtn[key] = json2[key]
    }
    return rtn
}

/**
 * json格式转换为url参数
*/
function dataToUrlStr (data) {
    var arr = [];
    for (var key in data) {
        arr.push(key + '=' + data[key]);
    }
    return arr.join('&');
}

function tyrand (randseed) {
    var randomNext = randseed * 1103515245 + 12345;
    return ((randomNext/65536) % 32768);
}

function xorCodeing(_seed, data) {
    var length = data.length;
    var grandom = length;
    for(var i = 0; i < length; i++) {
        grandom = tyrand( grandom );
        data[i] = data[i] ^ ( grandom % 255);
    }
}

// public method for decoding
function base64decodeRaw (input) {
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    var len = input.length;
    var output = [];
    while (i < len) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output.push(chr1);

        if (enc3 != 64) {
            output.push(chr2);
        }
        if (enc4 != 64) {
            output.push(chr3);
        }
    }
    return output;
}

// private method for UTF-8 encoding
function utf8Encode (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0, len = string.length; n < len; n++) {
        var c = string[n]//.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}

// private method for UTF-8 decoding
function utf8Decode (array) {
    var string = "";
    var i = 0, c1, c2;
    var c = c1 = c2 = 0;
    var len = array.length;
    while (i < len) {
        c = array[i];
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = array[i + 1];
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = array[i + 1];
            c3 = array[i + 2];
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
};

module.exports = {
    mergeJson: mergeJson,
    dataToUrlStr: dataToUrlStr,
    xorCodeing: xorCodeing,
    base64decodeRaw: base64decodeRaw,
    utf8Encode: utf8Encode,
    utf8Decode: utf8Decode
}