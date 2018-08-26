   
function getEventCoords(e) {
    var first, coords = {};
    if (e.changedTouches != undefined) {
        first = e.changedTouches[0];
        coords.pageX = first.pageX;
        coords.pageY = first.pageY;
    } else {
        coords.pageX = e.pageX;
        coords.pageY = e.pageY;
    }
    return coords;
};

function getLocalCoords(elem, coords) {

    var ox = 0,
        oy = 0;

    while (elem != null) {
        ox += elem.offsetLeft;
        oy += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return {
        'x': coords.pageX - ox,
        'y': coords.pageY - oy
    };
};
/**
 * 定义一个可涂抹区域：
 */
function Scratcher(canvasId, coverImg, babyImg, canvasWidth, canvasHeight) {
    var self = this;
    this.canvas = {
        'main': document.getElementById(canvasId),
        'temp': null,
        'draw': null
    };
    this.isTouch = typeof window.ontouchstart !== 'undefined';
    this.mouseDown = false;
    this.canvasId = canvasId;
    this.coverImg = document.createElement('img'); // 足球宝贝
    this.babyImg = babyImg;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    self.addEvent(this.coverImg, 'load', function() {
        self.reset(babyImg);
        self.dispatchEvent(self.createEvent('imgload'));
    });

    if (coverImg) {
        this.setImg(coverImg);
    }

    this._setupCanvases();
    this._eventListeners = {};
};

Scratcher.prototype.setImg = function(imgUrl) {
    this.coverImg.src = imgUrl;
};

Scratcher.prototype.fullAmount = function(stride) {

    var i, l;
    var count, total;
    var pixels, pdata;

    if (!stride || stride < 1) {
        stride = 1;
    }

    stride *= 4;

    pixels = this.drawctx.getImageData(0, 0, this.width, this.height);
    pdata = pixels.data;
    l = pdata.length;

    total = (l / stride) | 0;

    for (i = count = 0; i < l; i += stride) {
        if (pdata[i] != 0) {
            count++;
        }
    }


    return count / total;
};

Scratcher.prototype.recompositeCanvases = function() {
    this.canvas.temp.width = this.width;

    this.tempctx.drawImage(this.canvas.draw, 0, 0, this.canvasWidth, this.canvasHeight);

    this.tempctx.globalCompositeOperation = 'source-atop';
    this.tempctx.drawImage(this.coverImg, 0, 0, this.canvasWidth, this.canvasHeight);
    this.mainctx.drawImage(this.canvas.temp, 0, 0);
};


Scratcher.prototype.scratchLine = function(x, y, fresh) {
    this.drawctx.lineWidth = 20; //笔触宽度
    this.drawctx.lineCap = this.drawctx.lineJoin = 'round';
    this.drawctx.strokeStyle = 'rgba(255,255,255,0.1)'; //不能用#000
    if (fresh) {
        this.drawctx.beginPath();
        this.drawctx.moveTo(x, y);
    }
    this.drawctx.lineTo(x, y);
    this.drawctx.stroke();

    this.dispatchEvent(this.createEvent('scratch'));
};

//还原
Scratcher.prototype._setupCanvases = function() {
    var c = this.canvas.main;
    c.width = this.width = this.canvasWidth;
    c.height = this.height = this.canvasHeight;

    this.canvas.temp = document.createElement('canvas');
    this.canvas.draw = document.createElement('canvas');

    this.tempctx = this.canvas.temp.getContext('2d');
    this.drawctx = this.canvas.draw.getContext('2d');
    this.mainctx = this.canvas.main.getContext('2d');

    this.canvas.temp.width = this.canvas.draw.width = this.width;
    this.canvas.temp.height = this.canvas.draw.height = this.height;


    function mousedown_handler(e) {
        var local = getLocalCoords(c, getEventCoords(e));
        this.mouseDown = true;

        this.scratchLine(local.x, local.y, true);
        this.recompositeCanvases();

        this.dispatchEvent(this.createEvent('scratchesbegan'));
        //if(isTrue){
        //	clock();
        //}
        return false;
    };


    function mousemove_handler(e) {

        if (!this.mouseDown) {
            return true;
        }

        var local = getLocalCoords(c, getEventCoords(e));
        this.scratchLine(local.x, local.y);
        this.recompositeCanvases();
        //if($('.tip').css('display') == 'block'){
            this.dispatchEvent(this.createEvent('scratchesMove'));
        e.preventDefault();
        //if($('.tip').css('display') == 'block'){
        //	clearTimeout(timer); //停止计时器
        //}
        //isTrue = false;
        return false;
    };


    function mouseup_handler(e) {
        if (this.mouseDown) {
            this.mouseDown = false;

            this.dispatchEvent(this.createEvent('scratchesended'));

            return false;
        }

        return true;
    };

    this.addEvent(c, this.isTouch ? 'touchstart' : 'mousedown', mousedown_handler);
    this.addEvent(document.body, this.isTouch ? 'touchmove' : 'mousemove', mousemove_handler);
    this.addEvent(document.body, this.isTouch ? 'touchend' : 'mouseup', mouseup_handler);

};

Scratcher.prototype.addEvent = function(o, evt, fn) {
    var self = this;
    var cfn = function(e) {
        fn.call(self, e);
    };
    o.addEventListener(evt, cfn, false);
}

Scratcher.prototype.removeEvent = function(o, evt, fn){
    var self = this;
    var cfn = function(e){
        if(fn){
            fn.call(self,e);
        }
    }

    o.removeEventListener(evt,cfn,false);
}
Scratcher.prototype.one = false;
Scratcher.prototype.reset = function(nextCoverImg) {
    var _this = this;
    this.canvas.draw.width = this.canvasWidth;
    this.recompositeCanvases();

    function drawCover(babyImg) {
        _this.mainctx.drawImage(babyImg, 0, 0 , _this.canvasWidth, _this.canvasHeight);
    }

    function load(nextCoverImg) {
        var babyImg = new Image();
        if(nextCoverImg){
            babyImg.src = nextCoverImg;
        }else if(!Scratcher.prototype.one){
            Scratcher.prototype.one = true;
            babyImg.src = _this.babyImg;
        }
        if (babyImg.complete) {
            drawCover(babyImg);
        } else {
            babyImg.onload = function() {
                drawCover(babyImg);
            };
            babyImg.onerror = function() {
                window.alert('图片加载失败，请刷新重试');
            };
        };
    }

    load(nextCoverImg);

    //加载回调函数
    this.dispatchEvent(this.createEvent('reset'));
};

Scratcher.prototype.mainCanvas = function() {
    return this.canvas.main;
};


Scratcher.prototype.createEvent = function(type) {
    var ev = {
        'type': type,
        'target': this,
        'currentTarget': this
    };

    return ev;
};

Scratcher.prototype.on = function(type, handler) {
    var el = this._eventListeners;

    type = type.toLowerCase();

    if (!el.hasOwnProperty(type)) {
        el[type] = [];
    }

    if (el[type].indexOf(handler) == -1) {
        el[type].push(handler);
    }
};


Scratcher.prototype.off = function(type, handler) {
    var el = this._eventListeners;
    var i;

    type = type.toLowerCase();

    if (!el.hasOwnProperty(type)) {
        return;
    }

    if (handler) {
        if ((i = el[type].indexOf(handler)) != -1) {
            el[type].splice(i, 1);
        }
    } else {
        el[type] = [];
    }
};


Scratcher.prototype.dispatchEvent = function(ev) {
    var el = this._eventListeners;
    var i, len;
    var type = ev.type.toLowerCase();

    if (!el.hasOwnProperty(type)) {
        return;
    }

    len = el[type].length;

    for (i = 0; i < len; i++) {
        el[type][i].call(this, ev);
    }
};

if (typeof(module) !== 'undefined') {
    module.exports = Scratcher;
}/*  |xGv00|ee4698dbbfa05eaf70dd55afb9ea8956 */
