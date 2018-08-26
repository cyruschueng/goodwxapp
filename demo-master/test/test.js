



if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
}


/*var createToken = function(routname) {
    return 'sl' + md5.hex(routname + this.gettime()) + 'mgfm'
}
var gettime = function() {
    let time = Date.parse(new Date())
    return (time = time / 1000)
}
var imgLogo = function(item) {
    return Vue.prototype.HOST + "/getImg?sid=" + item;
}

var setPaddingBottom = function() {
    if (!this.$route.meta.ishideplay) {
        let oClass = document.getElementsByClassName("set-padding-bottom");
        oClass[0].style.paddingBottom = "60px";
    }
}
*/

var _$encode = function (_map, _content) {
    _content = '' + _content;
    if (!_map || !_content) {
        return _content || '';
    }
    return _content.replace(_map.r, function ($1) {
        var _result = _map[!_map.i ? $1.toLowerCase() : $1];
        return _result != null ? _result : $1;
    });
};
var _$escape = (function () {
    var _reg = /<br\/?>$/,
        _map = {
            r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
            '<': '&lt;', '>': '&gt;', '&': '&amp;', ' ': '&nbsp;',
            '"': '&quot;', "'": '&#39;', '\n': '<br/>', '\r': ''
        };
    return function (_content) {
        _content = _$encode(_map, _content);
        return _content.replace(_reg, '<br/><br/>');
    };
})();