/**
 * 预加载组件
 * Created by Robot on 2016/6/3.
 */
var User = require('./User');
var Util = require('./Util');

class Preloader{
    /**
     * 构造函数
     * @param opts
     * files: 数组，需要加载的文件
     * progress: function，进度回调函数
     * complete: function，加载完成回调函数
     */
    constructor(opts) {
        var _this = this;
        _this.files = opts.files;
        _this.current = 0;
        _this.progress = opts.progress;
        _this.complete = opts.complete;
        _this.container = document.createElement("div");
        _this.container.style.cssText = "position:absolute;left:-1000px;top:0;width:1px;height:1px;overflow:hidden";
        document.body.appendChild(_this.container);
        for (var i = 0; i < _this.files.length; i++) {
            var file = _this.files[i];
            var fileExt = file.split(".");
            var fileType = fileExt[fileExt.length - 1];
            if (fileType === "css" || fileType === "js" || fileType === "json") {
                _this.loadResource(file)
            } else {
                _this.loadImage(file)
            }
        }
        if (_this.files.length === 0) {
            _this.progress(null, null, 100);
            _this.complete()
        }
    }

    loadTrigger(err, response) {
        var _this = this;
        _this.current++;
        _this.progress(err, response, (_this.current / _this.files.length * 100).toFixed(0));
        if (_this.current == _this.files.length) {
            _this.complete()
        }
    }

    loadImage(file) {
        var _this = this;
        var image = new Image();
        image.onload = function() {
            _this.loadTrigger(null, image);
            image.onload = null;
            _this.container.appendChild(image)
        };
        image.onerror = function() {
            _this.loadTrigger(null, image);
            image.onload = null
        };
        image.src = file
    }

    loadResource(file) {
        var _this = this;
        var request = new XMLHttpRequest();
        request.open("GET", file, true);
        request.addEventListener("load", function() {
            _this.loadTrigger(null, request.response)
        });
        request.addEventListener("error", function() {
            var statusCode = request.status;
            var statusText = request.statusText;
            var error = new Error(statusText);
            error.status = statusCode;
            _this.loadTrigger(error, request.response)
        });
        request.send()
    }
}

module.exports = Preloader;