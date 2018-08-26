/**
 * Created by chenxinxin on 10/20/16.
 * 此文件是跨平台开发引擎的web渲染容器实现，实现了引擎需要用到的平台相关的接口实现
 */
(function(){

    window.__appengine__baseurl = document.scripts[document.scripts.length-1].src.substring(0,document.scripts[document.scripts.length-1].src.lastIndexOf("/"));

    window.__appengine__bundleurl = window.__appengine__baseurl + "/AppEngine.bundle";

    // will change after user define app location
    window.__app__baseurl = window.__appengine__bundleurl;

    // TODO: fix conflit for web pages
    if(window.jQuery == null) {
        document.write("<script src=\"http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js\"></script>");
    }
    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/third.pack.min.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/CSS3DRenderer.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/dms.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/latlon-spherical.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/OBJLoader.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/DDSLoader.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/MTLLoader.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/draco_decoder.js\"></script>");
//    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/DRACOLoader.js\"></script>");
    document.write("<script src=\"http://res.wx.qq.com/open/js/jweixin-1.0.0.js\"></script>");
    document.write("<script src=\""+window.__appengine__baseurl+"/thirdparty/share.js\"></script>");

    window.log = function(mess) {
        console.log(mess);
    }

    window.evaluateScript = function(script,name) {
        var jsWithName = "//# sourceURL=http://www.visualbusiness.cn/debugsrc" + name + "\n";
        var ret = eval(jsWithName+script);
        return ret;
    }

    window.createNativeObject = function(clazz) {
        return eval("new "+clazz+"()");
    }
    window.resourceCache = {};
    window.loadBundleXML = function(path,callback) {
        _loadNetResource(path+"/bundle.xml",function(text,absPath){
            if(text != null) {
                var xmlDoc = _parseXMLDoc(text);
                var basePath = absPath.substring(0, absPath.length - 11);
                for (var i = 0; i < xmlDoc.childNodes[0].childNodes.length; i++) {
                    var res = xmlDoc.childNodes[0].childNodes[i];
                    if (res.nodeName == "res") {
                        var resPath = basePath + res.getAttribute("path").substring(1);
                        // TODO: 如果path包含http开头，需要拼接，以满足插件开发需求
                        resPath = cleanPath(resPath);
                        window.resourceCache[resPath] = res.textContent;
                    }
                }
            }
            callback();
        });
    }

    window.loadBundleXMLs = function(paths,callback) {
        var count = 0;
        for(var i = 0 ; i < paths.length; i++) {
            loadBundleXML(paths[i],function(){
                count++;
                if(count == paths.length) {
                    callback();
                }
            });
        }
    }

    var cleanPath = function(path) {
        // 去除/./
        while(true){
            var stub = path.indexOf("/./");
            if(stub < 0) {
                break;
            }
            path = path.replace(/\/\.\//g,"/");
        }


        /**
         *  ../folder ->  ../folder
         *  /../folder -> /../folder
         *  folder/../subfolder -> subfolder
         *  /folder/../subfolder -> /subfolder
         */

        // 去除../
        while(true) {
            var stub = path.indexOf("/../");
            if(stub < 0) {
                break;
            }
            var prefix = path.substring(0,stub);
            var pstub = prefix.lastIndexOf("/");
            var newprefix = "";
            if(pstub >= 0) {
                newprefix = prefix.substring(0,pstub+1);
            }
            path = newprefix + path.substring(stub+4);
        }
        return path;
    }

    window._loadNetResource = function(path,callback) {
        if(path.substring(0,15) == "/libs/appengine") {
            path = window.__appengine__bundleurl + path;
        } else if(path.substring(0,4)!="http") {
            path = window.__app__baseurl + path;
        }
        path = cleanPath(path);
        if(window.resourceCache[path] != null) {
            log("cache hit for:"+path);
            callback(window.resourceCache[path],path);
            return path;
        }
        log("cache miss for:"+path);
        var xmlhttp=null;
        if (window.XMLHttpRequest)
        {// code for all new browsers
            xmlhttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {// code for IE5 and IE6
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp!=null)
        {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {// 4 = "loaded"
                    if (xmlhttp.responseText != null)
                    {// 200 = OK
                        // ...our code here...
                        if(xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.status == 0) {
                            callback(xmlhttp.responseText,path);
                        } else {
                            log(xmlhttp.responseText);
                            callback(null,path);
                        }
                    }
                    else
                    {
                        callback(null,path);
                    }
                }
            };
            xmlhttp.open("GET",path,true);
            xmlhttp.send(null);
        }
        else
        {
            return "Your browser does not support XMLHTTP.";
        }
        return path;
    }

    window.loadResource = function(path,callback) {

        _loadNetResource(path,callback);
    }

    if ("undefined" == typeof com) {
        com = {};
    }
    if ("undefined" == typeof com.appengine) {
        com.appengine = {};
    }



    NativeView = function(div) {
        if(div == null) {
            var element = document.createElement("div");
            element.style.position = "absolute";
            div = element;
        }
        if(typeof div == "object") {
           // div.style.visibility = "hidden";
        }
        this.div = div;
        this.borderDiv = null;
        this.anchorX = 0;
        this.anchorY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.rotateX = null;
        this.rotateY = null;
        this.rotateZ = null;
        this.cameraDistance = 500;
        this.borderWidth = 0;
        this.visible = true;
        this.clipToBounds = false;
        this.borderCorner = 0;

        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.contentGravity = 0;
    }

    NativeView.prototype.setId = function(id) {
        this.div.id = id;
    }

    NativeView.prototype.setBlur = function(blur) {
        this.div.style.webkitFilter = "blur("+blur + "px)";
    }

    NativeView.prototype.setAnchorX = function(anchorX) {
        this.anchorX = anchorX;
        this.updateAnchor();
    }

    NativeView.prototype.setAnchorY = function(anchorY) {
        this.anchorY = anchorY;
        this.updateAnchor();
    }

    NativeView.prototype.updateAnchor = function() {
        var anchor = this.anchorX * this.width + "px " + this.anchorY * this.height + "px";
        this.div.style.webkitTransformOrigin = anchor;
    }

    NativeView.prototype.setRotateX = function(rotateX) {
        this.rotateX = rotateX;
        this.updateTransform();
    }

    NativeView.prototype.setRotateY = function(rotateY) {
        this.rotateY = rotateY;
        this.updateTransform();
    }

    NativeView.prototype.setRotateZ = function(rotateZ) {
        this.rotateZ = rotateZ;
        this.updateTransform();
    }

    NativeView.prototype.setScaleX = function(scaleX) {
        this.scaleX = scaleX;
        this.updateTransform();
    }

    NativeView.prototype.setScaleY = function(scaleY) {
        this.scaleY = scaleY;
        this.updateTransform();
    }

    NativeView.prototype.setAlpha = function(alpha) {
        this.alpha = alpha;
        this.div.style.opacity = alpha;
    }

    NativeView.prototype.prepareBorderDiv = function() {
        if(this.borderDiv == null) {
            this.borderDiv = document.createElement("div");
            this.borderDiv.style.pointerEvents="none";
            this.borderDiv.style.position = "absolute";
            this.div.appendChild(this.borderDiv);
        }
    }

    NativeView.prototype.setBorderCorner = function(corner) {
        this.borderCorner = corner;
        this.prepareBorderDiv();
        this.borderDiv.style.borderRadius = corner + "px";
    }

    NativeView.prototype.setBorderWidth = function(width) {
        this.borderWidth = width;
        this.prepareBorderDiv();
        this.borderDiv.style.borderStyle = "solid";
        this.borderDiv.style.borderWidth = width + "px";
    }

    NativeView.prototype.setBorderColor = function(color) {
        this.prepareBorderDiv();
        this.borderDiv.style.borderColor = color;
    }

    NativeView.prototype.setClipToBounds = function(clip) {
        this.clipToBounds = (clip != 0);
        this.div.style.overflow = this.clipToBounds ? "hidden" : "visible";
    }

    NativeView.prototype.setTranslateX = function(x) {
        this.translateX = x;
        this.updateTransform();
    }

    NativeView.prototype.setTranslateY = function(y) {
        this.translateY = y;
        this.updateTransform();
    }

    NativeView.prototype.setCameraDistance = function(distance) {
        this.cameraDistance = distance;
        this.updateTransform();
    }

    NativeView.prototype.updateTransform = function() {
        var use3D = this.rotateX != null || this.rotateY != null;


        var transform = null;
        if(use3D) {
            transform = "perspective("+this.cameraDistance+"px) ";
        } else {
            transform = "";
        }

        if(use3D) {
            transform += "translate3d(" + this.translateX + "px," + this.translateY + "px," + 0 + "px)";
        } else {
            transform += "translate(" + this.translateX + "px," + this.translateY + "px)";
        }

        if(this.rotateX != null) {
            transform += " rotate3d(1,0,0," + this.rotateX + "deg)";
        }
        if(this.rotateY != null) {
            transform += " rotate3d(0,1,0," + this.rotateY + "deg)";
        }
        if(this.rotateZ != null) {
            transform += " rotate3d(0,0,1," + this.rotateZ + "deg)";
        }

        if(this.scaleX != null) {
            transform += " scale("+this.scaleX+",1)";
        }

        if(this.scaleY != null) {
            transform += " scale(1,"+this.scaleY+")";
        }

        this.div.style.webkitTransform = transform;
    }

    NativeView.prototype.setFrame = function(x,y,width,height) {
        if(this.virtualView == window.rootView) {
            return;
        }
        this.div.style.left = x + "px";
        this.div.style.top = y + "px";
        this.div.style.width = width + "px";
        this.div.style.height = height + "px";
        if(this.borderDiv != null) {
            this.borderDiv.style.width = (width-this.borderWidth*2) + "px";
            this.borderDiv.style.height = (height-this.borderWidth*2) + "px";
        }
        if(this.clipToBounds){
            this.div.style.webkitClipPath = "inset(0 0 0 0 round "+this.borderCorner+"px "+this.borderCorner+"px "+this.borderCorner+"px "+this.borderCorner+"px)";
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.updateAnchor();
    }

    NativeView.prototype.setVirtualView = function(view) {
        this.virtualView = view;
        this.div.virtualView = view;
    }

    NativeView.prototype.setBackground = function(background) {
        var color = new com.appengine.view.Color();
        color.setByHex(background);
        this.div.style.background = "rgba(" + color.r + "," + color.g + "," + color.b + "," + (color.a / 255) + ")";
    }

    NativeView.prototype.addNativeView = function(view,index) {
        if(index < 0 || index > this.div.children.length) {
            return;
        }

        if(this.div.children.length == 0 || index == this.div.children.length) {
            this.div.appendChild(view.div);
            return;
        }

        this.div.insertBefore(view.div,this.div.children[index]);
    }

    NativeView.prototype.removeNativeViewAt = function(index) {
        if(index < 0 || index > this.div.children.length - 1) {
            return;
        }
        this.div.removeChild(this.div.children[index]);
    }

    NativeView.prototype.setTouchable = function(touchable) {
        this.div.style.pointerEvents = touchable != 0 ? "auto" : "none";
    }

    NativeView.prototype.setVisible = function(visible) {
        this.visible = (visible != 0);
        NativeView.requestUpdateDivVisible();
    }

    NativeView.updateDivVisibleRequested = false;
    NativeView.requestUpdateDivVisible = function() {
        if(NativeView.updateDivVisibleRequested) {
            return;
        }
        NativeView.updateDivVisibleRequested = true;
        setTimeout(function(){
            NativeView.updateDivVisibleRequested = false;
            window.rootView._nativeView.updateDivVisible(true);
        },0);
    }

    NativeView.prototype.updateDivVisible = function(inhertVisible) {
        var myVisible = inhertVisible && this.visible;
        this.div.style.visibility = myVisible ? "visible" : "hidden";
        if(this.borderDiv) {
            this.borderDiv.style.visibility = myVisible ? "visible" : "hidden";
        }
        for(var i = 0 ; i < this.virtualView.subViews.length; i++) {
            var view = this.virtualView.subViews[i];
            view._nativeView.updateDivVisible(myVisible);
        }
    }

    NativeView.prototype.getViewportWidth = function() {
        return window.nativeRootView.div.clientWidth;
    }

    NativeView.prototype.getViewportHeight = function() {
        return window.nativeRootView.div.clientHeight;
    }

    NativeView.prototype.setContentGravity = function(gravity) {
        this.contentGravity = gravity;
    }

    NativeView.prototype.isAlignRight = function() {
        return (this.contentGravity & (1 << 2))!=0;
    }

    NativeView.prototype.isAlignLeft = function(){
        if(!this.isAlignRight() && !this.isAlignHorizontalCenter()) {
            return true;
        }
        return false;
    }

    NativeView.prototype.isAlignHorizontalCenter = function() {
        // 明确指定居中
        if ((this.contentGravity & (1 << 4))!=0){
            return true;
        };

        // 明确指定向右
        if((this.contentGravity & (1<<2)) != 0) {
            return false;
        }

        // 明确指定向左
        if((this.contentGravity & (1<<0)) != 0) {
            return false;
        }

        // 明确指定泛居中
        if((this.contentGravity & (1<<6)) != 0) {
            return true;
        }

        return false;
    }

    NativeView.prototype.isAlignBottom = function() {
        return (this.contentGravity & (1 << 3))!=0;
    }

    NativeView.prototype.isAlignTop = function() {
        if(!this.isAlignBottom() && !this.isAlignVerticalCenter()) {
            return true;
        }
        return false;
    }

    NativeView.prototype.isAlignVerticalCenter = function() {
        // 明确指定垂直居中
        if ((this.contentGravity & (1 << 5))!=0){
            return true;
        };

        // 明确指定向下
        if((this.contentGravity & (1<<3)) != 0) {
            return false;
        }

        // 明确指定向上
        if((this.contentGravity & (1<<1)) != 0) {
            return false;
        }

        // 明确指定泛居中
        if((this.contentGravity & (1<<6)) != 0) {
            return true;
        }

        return false;
    }



    NativeImageView = function(){
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        //this.div.style.visibility="hidden";
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;
        this.stretchX = null;
        this.stretchWidth = null;
        this.stretchY = null;
        this.stretchHeight = null;
        this.image = null;
        this.ratio = 1;
        this.src = null;
    }

    NativeImageView.prototype = new NativeView(0);

    NativeImageView.prototype.setStretchX = function(x) {
        this.stretchX = x;
        if(this.stretchWidth == null) {
            this.stretchWidth = 1;
        }
    }

    NativeImageView.prototype.setStretchWidth = function(width) {
        this.stretchWidth = width;
        if(this.stretchWidth == 0) {
            this.stretchWidth = 1;
        }
    }

    NativeImageView.prototype.setStretchY = function(y) {
        this.stretchY = y;
        if(this.stretchHeight == null) {
            this.stretchHeight = 1;
        }
    }

    NativeImageView.prototype.setStretchHeight = function(height) {
        this.stretchHeight = height;
        if(this.stretchHeight == 0) {
            this.stretchHeight = 1;
        }
    }

    NativeImageView.prototype.setImageRatioBySrc = function(src) {
        var atIndex = src.lastIndexOf('@');
        var exIndex = src.lastIndexOf('x.');
        if(atIndex >= 0 && atIndex+1 < exIndex) {
            var rs = src.substring(atIndex+1,exIndex);
            this.ratio = parseFloat(rs);
        }
    }

    NativeImageView.prototype.setDefaultSrc = function(src,callback) {
        // TODO: 实现默认图片逻辑
    }

    NativeImageView.prototype.setSrc = function(src,callback) {
        this.src = src;
        if(src == null || src == "") {
            for (var i = this.div.children.length - 1; i >= 0; i--) {
                this.div.removeChild(this.div.children[i]);
            }
            if(callback) {
                callback();
            }
            return;
        }

        this.setImageRatioBySrc(src);
        if(src.substring(0,4) != "http" && src.substring(0,5) != "data:") {
            src = window.__app__baseurl + src;
        }

        var imgEle = document.createElement("img");
        var self = this;
        this.currentLoadingImgEle = imgEle;
        imgEle.onload = function() {
            if(self.currentLoadingImgEle != imgEle) {
                return;
            }
            self.imgWidth = imgEle.width;
            self.imgHeight = imgEle.height;
            for (var i = self.div.children.length - 1; i >= 0; i--) {
                self.div.removeChild(self.div.children[i]);
            }
            var canvas = document.createElement("canvas");
            canvas.style.position = "absolute";
            self.div.appendChild(canvas);
            self.image = imgEle;
            if(callback) {
                callback();
            }
        }
        imgEle.src = src;
    }

    NativeImageView.prototype.setPadding = function(left,top,right,bottom) {
        this.paddingLeft = left;
        this.paddingTop = top;
        this.paddingRight = right;
        this.paddingBottom = bottom;
    }

    NativeImageView.prototype.getImageWidth = function() {
        return this.imgWidth / this.ratio;
    }

    NativeImageView.prototype.getImageHeight = function() {
        return this.imgHeight / this.ratio;
    }

    var nativeImageViewSuperSetFrame = NativeImageView.prototype.setFrame;
    NativeImageView.prototype.setFrame = function(x,y,width,height) {
        nativeImageViewSuperSetFrame.call(this,x,y,width,height);
        if(this.div.children.length > 0 && width > 0 && height > 0) {
            var canvasEle = this.div.children[0];
            canvasEle.style.left = this.paddingLeft + "px";
            canvasEle.style.top = this.paddingTop + "px";
            var targetWidth = (width-this.paddingLeft-this.paddingRight);
            var targetHeight = (height-this.paddingTop-this.paddingBottom);
            canvasEle.style.width = targetWidth + "px";
            canvasEle.style.height = targetHeight + "px";
            canvasEle.width = targetWidth * window.devicePixelRatio;
            canvasEle.height = targetHeight * window.devicePixelRatio;

            if(this.image != null) {
                var x0 = 0;
                var x1 = this.stretchX != null ? this.stretchX : 0;
                var x2 = this.stretchWidth != null ? x1 + this.stretchWidth : this.imgWidth;
                var x3 = this.imgWidth;
                var y0 = 0;
                var y1 = this.stretchY != null ? this.stretchY : 0;
                var y2 = this.stretchHeight != null ? y1 + this.stretchHeight : this.imgHeight;
                var y3 = this.imgHeight;

                //targetWidth *= window.devicePixelRatio;
                //targetHeight *= window.devicePixelRatio;

                var tx0 = x0/this.ratio;
                var tx1 = x1/this.ratio;
                var tx2 = targetWidth - (x3-x2)/this.ratio;
                var tx3 = targetWidth;
                var ty0 = y0/this.ratio;
                var ty1 = y1/this.ratio;
                var ty2 = targetHeight - (y3-y2)/this.ratio;
                var ty3 = targetHeight;

                tx0 *= window.devicePixelRatio;
                tx1 *= window.devicePixelRatio;
                tx2 *= window.devicePixelRatio;
                tx3 *= window.devicePixelRatio;
                ty0 *= window.devicePixelRatio;
                ty1 *= window.devicePixelRatio;
                ty2 *= window.devicePixelRatio;
                ty3 *= window.devicePixelRatio;


                var canvas = canvasEle.getContext("2d");
                // left top
                if(x0 < x1 && y0 < y1) {
                    canvas.drawImage(this.image, x0, y0, x1, y1, tx0, ty0, tx1, ty1);
                }
                // top
                if(x1 < x2 && y0 < y1) {
                    canvas.drawImage(this.image, x1, y0, x2-x1, y1,tx1 , ty0, tx2-tx1, ty1);
                }
                // right top
                if(x2 < x3 && y0 < y1) {
                    canvas.drawImage(this.image, x2, y0, x3-x2, y1,tx2 , ty0, tx3-tx2, ty1);
                }
                // left
                if(x0 < x1 && y1 < y2) {
                    canvas.drawImage(this.image, x0, y1, x1, y2-y1,tx0 , ty1, tx1, ty2-ty1);
                }
                // center
                if(x1 < x2 && y1 < y2) {
                    canvas.drawImage(this.image, x1, y1, x2-x1, y2-y1,tx1 , ty1, tx2-tx1, ty2-ty1);
                }
                // right
                if(x2 < x3 && y1 < y2) {
                    canvas.drawImage(this.image, x2, y1,x3-x2,y2-y1,tx2,ty1,tx3-tx2,ty2-ty1);
                }
                // left bottom
                if(x0 < x1 && y2 < y3) {
                    canvas.drawImage(this.image, x0, y2,x1,y3-y2,tx0,ty2,tx1,ty3-ty2);
                }
                // bottom
                if(x1 < x2 && y2 < y3) {
                    canvas.drawImage(this.image, x1, y2,x2-x1,y3-y2,tx1,ty2,tx2-tx1,ty3-ty2);
                }
                // right bottom
                if(x2 < x3 && y2 < y3) {
                    canvas.drawImage(this.image, x2, y2,x3-x2,y3-y2,tx2,ty2,tx3-tx2,ty3-ty2);
                }
            }
        }
    }


    NativeTextView = function(){
        this.div = document.createElement("div");
        this.div.style.position = "absolute";

        this.textDiv = document.createElement("div");
        this.textDiv.style.position = "absolute";
        this.textDiv.style.display = "-webkit-box";
        //this.textDiv.style.overflow = "hidden";

        this.div.appendChild(this.textDiv);

        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;

        this.fontSize = 16;
        this.lineSpace = 0;
        this.wordSpace = 0;
    };

    NativeTextView.prototype = new NativeView(0);


    var nativeTextViewSuperSetFrame = NativeTextView.prototype.setFrame;
    NativeTextView.prototype.setFrame = function(x,y,width,height) {
        nativeTextViewSuperSetFrame.call(this,x,y,width,height);

        if(this.div.children.length > 0) {
            var txtDiv = this.div.children[0];

            var txtheight = this.measureTextHeight(width);

            if(this.isAlignBottom()) {
                txtDiv.style.top = (height - this.paddingBottom - txtheight)+"px";
            } else if(this.isAlignVerticalCenter()) {
                txtDiv.style.top = (this.paddingTop + (height-this.paddingTop-this.paddingBottom-txtheight)/2) + "px";
            } else {
                txtDiv.style.top = this.paddingTop + "px";
            }

            if(this.isAlignRight()) {
                txtDiv.style.justifyContent = "flex-end";
                txtDiv.style.webkitBoxPack = "end";
                txtDiv.style.textAlign = "right";
            } else if(this.isAlignHorizontalCenter()) {
                txtDiv.style.justifyContent = "center";
                txtDiv.style.webkitBoxPack = "center";
                txtDiv.style.textAlign = "center";
            } else {
                txtDiv.style.justifyContent = "flex-start";
                txtDiv.style.webkitBoxPack = "start";
                txtDiv.style.textAlign = "left";
            }

            txtDiv.style.left = this.paddingLeft + "px";
            txtDiv.style.width = (width-this.paddingLeft-this.paddingRight) + "px";
        }
    }

    NativeTextView.prototype.setPadding = function(left,top,right,bottom) {
        this.paddingLeft = left;
        this.paddingTop = top;
        this.paddingRight = right;
        this.paddingBottom = bottom;
    }

    NativeTextView.prototype.setText = function(text) {
        this.textDiv.innerText = text;
    }

    NativeTextView.prototype.setHtml = function(html) {
        this.textDiv.innerHTML = html;
    }

    NativeTextView.prototype.setFontColor = function(fontColor) {
        var color = new com.appengine.view.Color();
        color.setByHex(fontColor);
        var colorExpress = "rgba(" + color.r + "," + color.g + "," + color.b + "," + (color.a / 255) + ")";
        this.textDiv.style.color = colorExpress;
    }

    NativeTextView.prototype.updateLineSpace = function() {
        this.textDiv.style.lineHeight = (this.fontSize + this.lineSpace) + "px";
    }

    NativeTextView.prototype.setFontSize = function(fontSize) {
        this.fontSize = fontSize;
        this.textDiv.style.fontSize = fontSize + "px";
        this.updateLineSpace();
    }

    NativeTextView.prototype.setLineSpace = function(lineSpace) {
        this.lineSpace = lineSpace;
        this.updateLineSpace();
    }

    NativeTextView.prototype.setWordSpace = function(wordSpace) {
        this.wordSpace = wordSpace;
        this.textDiv.style.letterSpacing = wordSpace + "px";
    }

    NativeTextView.prototype.setFontBold = function(fontBold) {
        this.textDiv.style.fontWeight = fontBold ? "bold" : "normal";
    }
    
    NativeTextView.prototype.setMaxLine = function (maxLine) {
        this.textDiv.style.wordBreak = "break-all";
        this.textDiv.style.webkitBoxOrient = "vertical";
        this.textDiv.style.overflow = "hidden";
        this.textDiv.style.setProperty("-webkit-line-clamp", maxLine);
    }

    NativeTextView.prototype.measureTextWidth = function() {
        this.textDiv.style.wordBreak =  "keep-all";
        this.textDiv.style.width = "auto";
        this.textDiv.style.whiteSpace = "nowrap";
        var width = this.textDiv.clientWidth;
        this.textDiv.style.wordBreak =  "normal";
        if(this.div.virtualView.layoutParam.width == com.appengine.view.LayoutConstrain.WRAP) {
            this.textDiv.style.whiteSpace = "nowrap";
        } else {
            this.textDiv.style.whiteSpace = "normal";
        }
        return width;
    }

    NativeTextView.prototype.measureTextHeight = function(width) {
        this.textDiv.style.width = width + "px";
        return this.textDiv.clientHeight;
    }




    NativeInputView = function() {
        var self = this;
        this.div = document.createElement("div");
        this.div.style.position = "absolute";

        this.textDiv = document.createElement("input");
        this.textDiv.style.position = "absolute";
        this.textDiv.style.display = "-webkit-box";
        this.textDiv.style.outline = "none";
        this.textDiv.style.listStyleType = "none";
        this.textDiv.style.borderColor = "transparent";
        this.textDiv.style.background = "transparent";
        this.textDiv.style.borderWidth = "0px";
        this.textDiv.style.padding = "0px";
        this.textDiv.onfocus = function(){
            if(self.onFocusChangeCallback != null) {
                self.onFocusChangeCallback(true);
            }
        };
        this.textDiv.onblur = function() {
            if(self.onFocusChangeCallback != null) {
                self.onFocusChangeCallback(false);
            }
        }

        this.div.appendChild(this.textDiv);

        this.paddingLeft = 0;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;

        this.fontSize = 16;
        this.lineSpace = 0;

        this.onInputCallback = null;
        this.onFocusChangeCallback = null;
        this.onConfirmCallback = null;

        var self = this;
        this.textDiv.oninput = function(){
            if(self.onInputCallback != null) {
                self.onInputCallback(self.textDiv.value);
            }
        }
    }


    NativeInputView.prototype = new NativeView(0);


    var nativeInputViewSuperSetFrame = NativeInputView.prototype.setFrame;
    NativeInputView.prototype.setFrame = function(x,y,width,height) {
        nativeInputViewSuperSetFrame.call(this,x,y,width,height);

        var txtDiv = this.textDiv;
        txtDiv.style.top = this.paddingTop + "px";
        txtDiv.style.left = this.paddingLeft + "px";
        txtDiv.style.width = (width-this.paddingLeft-this.paddingRight) + "px";
        txtDiv.style.height = (height-this.paddingTop-this.paddingBottom) + "px";

        if(this.isAlignRight()) {
            txtDiv.style.justifyContent = "flex-end";
            txtDiv.style.webkitBoxPack = "end";
            txtDiv.style.textAlign = "right";
        } else if(this.isAlignHorizontalCenter()) {
            txtDiv.style.justifyContent = "center";
            txtDiv.style.webkitBoxPack = "center";
            txtDiv.style.textAlign = "center";
        } else {
            txtDiv.style.justifyContent = "flex-start";
            txtDiv.style.webkitBoxPack = "start";
            txtDiv.style.textAlign = "left";
        }
    }



    NativeInputView.prototype.setPadding = function(left,top,right,bottom) {
        this.paddingLeft = left;
        this.paddingTop = top;
        this.paddingRight = right;
        this.paddingBottom = bottom;
    }

    NativeInputView.prototype.setText = function(text) {
        this.textDiv.value = text;
    }

    NativeInputView.prototype.getText = function() {
        return this.textDiv.value;
    }

    NativeInputView.prototype.setHint = function(hint) {
        this.textDiv.placeholder = hint;
    }

    NativeInputView.prototype.setHintColor = function(hint) {
        //this.textDiv.placeholder = hint;
    }

    NativeInputView.prototype.setFontColor = function(fontColor) {
        var color = new com.appengine.view.Color();
        color.setByHex(fontColor);
        var colorExpress = "rgba(" + color.r + "," + color.g + "," + color.b + "," + (color.a / 255) + ")";
        this.textDiv.style.color = colorExpress;
    }

    NativeInputView.prototype.updateLineSpace = function() {
        this.textDiv.style.lineHeight = (this.fontSize + this.lineSpace) + "px";
    }

    NativeInputView.prototype.setFontSize = function(fontSize) {
        this.fontSize = fontSize;
        this.textDiv.style.fontSize = fontSize + "px";
        this.updateLineSpace();
    }

    NativeInputView.prototype.setLineSpace = function(lineSpace) {
        this.lineSpace = lineSpace;
        this.updateLineSpace();
    }

    NativeInputView.prototype.setFontBold = function(fontBold) {
        this.textDiv.style.fontWeight = fontBold ? "bold" : "normal";
    }

    NativeInputView.prototype.setInputType = function(type) {
        this.textDiv.type = type;
    }

    NativeInputView.prototype.setOnInputCallback = function(callback) {
        this.onInputCallback = callback;
    }

    NativeInputView.prototype.setOnFocusChangeCallback = function(callback) {
        this.onFocusChangeCallback = callback;
    }

    NativeInputView.prototype.setOnConfirmCallback = function(callback) {
        // TODO: implement confirm callback
        this.onConfirmCallback = callback;
    }

    NativeInputView.prototype.setFocus = function(focus) {
        if(focus!=0) {
            this.textDiv.focus();
        } else {
            this.textDiv.blur();
        }
    }

    NativeInputView.prototype.measureContentHeight = function() {
        return this.fontSize + this.paddingTop + this.paddingBottom;
    }

    NativeWebView = function(){
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.div.frameBorder = "no";
        this.div.border = 0;
        this.div.marginWidth = 0;
        this.div.marginHeight = 0;
        this.div.onload = function(){
            if(this.virtualView){
                this.virtualView.requestLayout();
            }
        }
    }

    var removeAllSubdiv = function(div) {
        for(var i = div.children.length-1; i >= 0 ; i--) {
            div.removeChild(div.children[i]);
        }
    }

    NativeWebView.prototype = new NativeView(0);

    NativeWebView.prototype.setSrc = function(url) {
        removeAllSubdiv(this.div);
        var div = document.createElement("iframe");
        div.style.position = "absolute";
        div.frameBorder = "no";
        div.border = 0;
        div.marginWidth = 0;
        div.marginHeight = 0;
        div.style.width = "100%";
        div.style.height = "100%";
        div.onload = function(){
            window.rootView.requestLayout();
        }
        div.src = url;
        this.div.appendChild(div);
    }



    NativeWebView.prototype.setData = function(data) {
        removeAllSubdiv(this.div);
        this.div.innerHTML = data;
    }

    function setIframeHeight(iframe) {
        if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
        }
    };

    NativeWebView.prototype.measureContentHeight = function(width) {
        this.div.style.width = width+"px";
        this.div.style.height = "auto";
        return this.div.offsetHeight;
    }

    NativeMapView = function(){
        this.div = document.createElement("div");
        this.div.style.position = "absolute";
        this.qqmap = new qq.maps.Map(this.div,{
            mapTypeControl : false,
            zoomControl : false,
            panControl : false
        });

        this.viewportChangeCallback = null;

        this.changingViewport = false;
        this.idle = true;

        var self = this;

//        qq.maps.event.addListener(this.qqmap, 'drag', function() {
//            if(self.viewportChangeCallback != null) {
//                self.viewportChangeCallback();
//            }
//        });
//
//        qq.maps.event.addListener(this.qqmap, "dragstart" , function(){
//            log("drag start");
//            if(!self.changingViewport) {
//                self.changingViewport = true;
//                self.idle = false;
//                self.continueChangeViewport();
//            }
//        })
//
//        qq.maps.event.addListener(this.qqmap, "dragend" , function(){
//            log("drag end");
//        })

        qq.maps.event.addListener(this.qqmap,"idle",function(){
            if(self.viewportChangeCallback != null) {
                self.viewportChangeCallback();
            }
        });

    };

    if ("undefined" == typeof qq) {
        document.write("<script src=\"http://map.qq.com/api/js?v=2.exp\"></script>");
        document.write("<script src=\"https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js\"></script>");
    }

    NativeMapView.prototype = new NativeView(0);

    NativeMapView.prototype.start = function () {
    };
    NativeMapView.prototype.stop = function () {
    };

    var nativeMapViewSuperSetFrame = NativeMapView.prototype.setFrame;
    NativeMapView.prototype.setFrame = function(x,y,width,height) {
        nativeMapViewSuperSetFrame.call(this,x,y,width,height);
        this.div.style.height = (height+20) + "px"; // 隐藏腾讯logo
    }

    NativeMapView.prototype.setMapBound = function(bound,animate) {

    }

    NativeMapView.prototype.setViewportChangeCallback = function(callback) {
        this.viewportChangeCallback = callback;
    }

    NativeMapView.prototype.getCoordinate = function(point) {
        var latlng = this.qqmap.mapCanvasProjection.fromContainerPixelToLatLng(new qq.maps.Point(point.x,point.y));
        return {
            latitude : latlng.getLat(),
            longitude : latlng.getLng()
        }
    }

    NativeMapView.prototype.getPoint = function(coordinate) {
        var p = this.qqmap.mapCanvasProjection.fromLatLngToContainerPixel(new qq.maps.LatLng(coordinate.latitude,coordinate.longitude))
        return {
            x : p.getX(),
            y : p.getY()
        }
    }

    NativeMapView.prototype.setMapCenter = function(coordinate,animate) {
        this.qqmap.setCenter(new qq.maps.LatLng(coordinate.latitude,coordinate.longitude));
    }

    NativeMapView.prototype.setZoom = function(level,animate) {
        level = Math.round(level);// 腾讯2D web地图不支持小数点的level
        this.qqmap.setZoom(level);
    }

    NativeMapView.prototype.getZoom = function() {
        return this.qqmap.getZoom();
    }

    var EventUtil = {
        addHandler : function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                elmenet["on" + type] = handler;
            }
        },
        removeHandler : function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    };


    nativeHttpFetch = function(method,url,headers,param,callback) {
        //jQuery.get(url,param,callback);

        var useFormData = false;
        for(var key in param) {
            var value = param[key];
            if(value instanceof File) {
                useFormData = true;
                break;
            }
        }

        if(useFormData){
            var formdata = new FormData();
            for(var key in param) {
                var value = param[key];
                if(value instanceof File) {
                    formdata.append(key,value,value.name);
                } else {
                    formdata.append(key,value);
                }
            }
            param = formdata;
        }


        $.ajax({
            type: method,
            headers : headers,
            data: param,
            url: url,
            dataType: "text",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function(data){
                callback(data);
            },
            error:function(){
                callback(null);
            }
        })
    }

    nativePutByKey = function(key,value) {
        //document.cookie = key + "="+ escape(value);
        localStorage.setItem(key,value);
    }

    nativeGetByKey = function(key) {
//        if (document.cookie.length>0){ //先查询cookie是否为空，为空就return ""
//            c_start=document.cookie.indexOf(key + "=")   //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
//            if (c_start!=-1){
//                c_start=c_start + key.length+1;//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
//                c_end=document.cookie.indexOf(";",c_start) //其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
//                if (c_end==-1) c_end=document.cookie.length;
//                return unescape(document.cookie.substring(c_start,c_end)) //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
//            }
//        }
//        return null;
        return localStorage.getItem(key);
    }

    nativeRemoveByKey = function(key,isRegex) {
        if(isRegex != 0) {
            var regx = new RegExp("^"+key+"$",'g');
            for(var i=localStorage.length - 1 ; i >=0; i--){
                var ikey = localStorage.key(i);
                if(regx.test(ikey)){
                    localStorage.removeItem(ikey);
                }
            }
        } else {
            localStorage.removeItem(key);
        }
    }

    window._parseXMLDoc = function(xmlString) {
        var xmlDoc=null;

        if(window.DOMParser)  //IE9+,FF,webkit
        {
            try{
                domParser = new  DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            }catch(e){
            }
        }
        else if(!window.DOMParser && window.ActiveXObject)
        {   //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML2.DOMDocument','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                }catch(e){
                    continue;
                }
            }
        }

        if(xmlDoc == null) {
            throw new TypeError("cannot parse xml :"+xmlString);
        }

        return xmlDoc;
    }

    nativeParseXMLToJson = function(xmlString) {
        var xmlDoc=_parseXMLDoc(xmlString);
        return convertXMLToJson(xmlDoc.childNodes[0]);
    }


    nativeShare = function(param,callback) {
        // TODO: share
    }

    nativeIsSupportShareTo = function(type) {
        // TODO: share
        return false;
    }

    nativeIsSupportNaviTo = function(type) {
        // TODO: navi
        return false;
    }

    nativeNavi = function(param) {
        // TODO: navi
    }

    nativeSetStatusBarLight = function(isWhite) {
        // TODO
    }

    nativeGetMedia = function(source,type,callback) {
        var inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.onchange = function() {
            callback(inputFile.files[0])
        }
        inputFile.click();
    }
    /**
     *
     * {
     *    "type" : "View",
     *    "attributes" : [
     *       {
     *          "name" : "width",
     *          "value" : "fill"
     *       }
     *    ],
     *    "children" : [
     *    ]
     * }
     *
     * @param element
     */
    var convertXMLToJson = function(element) {
        var json = '{"type":"';
        json += element.nodeName;
        json += '","attributes":{';
        for(var i = 0 ; i < element.attributes.length; i++) {
            var attr = element.attributes[i];
            if(i > 0) {
                json += ',';
            }
            json += '"';
            json += attr.name;
            json += '":"';
            json += attr.value;
            json += '"'
        }
        json += '},';

        json += '"children":[';
        var first = true;
        for(var i = 0 ; i < element.childNodes.length; i++) {
            var node = element.childNodes[i];
            if(node.nodeType == 1) {
                if (first) {
                    first = false;
                } else {
                    json += ',';
                }
                var subjson = convertXMLToJson(node);
                json += subjson;
            } else if(node.nodeType == 3) {
                json += node.data;
            }
        }

        json += ']}';
        return json;
    }

    var convertLocation = function(loc) {
        var locInfo = {};
        locInfo.latitude = loc.lat;
        locInfo.longitude = loc.lng;

        locInfo.adcode = loc.adcode; // 行政区划代码
        locInfo.nation = loc.nation; // 国家
        locInfo.province = loc.province; // 省 / 直辖市
        locInfo.city = loc.city; // 市 / 地级区 及同级行政区划
        locInfo.district = loc.district; // 区 / 县级市 及同级行政区划
        return locInfo;
    }

    nativeGetLocation = function(param,callback) {
        if(window.qqLocationProvider == null) {
            window.qqLocationProvider = new qq.maps.Geolocation("DGPBZ-7V6RX-ANC4R-ZLIA3-ROB7F-ESBTM", "nongplus");
        }
        var options = {timeout: 8000};
        window.qqLocationProvider.getLocation(function(locInfo){
            // success
            var loc = convertLocation(locInfo);
            callback(loc);
        }, function(){
            // failed
            log(arguments);
            callback(null);
        }, options)
    }

    nativeCallup = function(phonenum) {
        window.location.href="tel:"+phonenum;
    }

    nativeEmailTo = function(address) {
        window.location.href="mailto:"+address;
    }

    com.appengine.RequestUtil = {
        getRequestParam : function() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            theRequest.params = [];
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    var name = strs[i].split("=")[0];
                    var value = decodeURIComponent(strs[i].split("=")[1]);
                    theRequest[name]=value;
                    theRequest.params.push({
                        name : name,
                        value : value
                    });
                }
            }
            theRequest.setParam = function(name,value) {
                this[name] = value;
                for(var i = 0 ; i < this.params.length; i++) {
                    var p = this.params[i];
                    if(p.name == name) {
                        p.value = value;
                        return;
                    }
                }
                this.params.push({
                    name : name,
                    value : value
                })
            }
            theRequest.toString = function() {
                var str = "";
                for(var i = 0 ; i < this.params.length; i++) {
                    var p = this.params[i];
                    if(i > 0) {
                        str += "&";
                    }
                    str += p.name;
                    str += "=";
                    str += encodeURIComponent(p.value);
                }
                return str;
            }
            return theRequest;
        },
        getRequest : function() {
            return com.appengine.RequestUtil.getRequestParam();
        }
    }

    window.onAppEngineLoaded = function() {
        // support light app
        if(window.main != null) {
            var mainFuncOrView = window.main;
            // TODO: 网页参数传递给主页面
            if(mainFuncOrView != null) {
                window.initRootView(mainFuncOrView);
            }
            return;
        }

        com.appengine.view.Page.loadPage(window.__app__entry,null,function(view){
            if(view != null) {
                window.initRootView(view);
            }
        });

//        module(window.__app__entry,function(view){
//            if(view != null){
//                window.initRootView(view);
//            }
//        });
    }

    com.appengine.App = function(div,bundleOrMain,entry){
        div.style.overflow = "hidden";
        window.nativeRootView = new NativeView(div);

        if(bundleOrMain == null) {
            bundleOrMain = "App.bundle";
        }

        if(entry == null) {
            entry = "/main.js";
        }

        window.__app__entry = entry;
        if(typeof bundleOrMain == "function") {
            window.main = bundleOrMain;
            window.__app__baseurl = ".";
            loadBundleXML("",function(){
                loadResource("/libs/appengine.js",function(data){
                    evaluateScript(data,"/libs/appengine.js");
                });
            })
        } else {
            window.__app__baseurl = bundleOrMain;
            loadBundleXMLs(["",window.__appengine__bundleurl],function(){
                loadResource("/libs/appengine.js",function(data){
                     evaluateScript(data,"/libs/appengine.js");
                });
            });
        }

        EventUtil.addHandler(window, "resize", function() {
            if(window.rootView){
                window.rootView.requestLayout();
                window.rootView.resize();
            }
        });

        (function() {
            var mousePressed = false;


            var hoverdViews = [];

            var updateHover = function(x,y) {
                if(window.rootView == null) {
                    return;
                }

                for(var i = 0 ; i < hoverdViews.length; i++) {
                    // hoverdViews[i].setVisible(false);
                    if(hoverdViews[i].hoverHandler) hoverdViews[i].hoverHandler("out");
                }
                hoverdViews.length = 0;

                var views = [];
                window.rootView.findViewsByXY(x,y,views);
                for(var i = 0 ; i < views.length; i++) {
                    var targetView = views[i];
                    if(targetView.hover){
                        // targetView.setVisible(true);
                        hoverdViews.push(targetView);
                        if(targetView.hoverHandler) {
                            targetView.hoverHandler("in");
                            break;
                        };
                        
                    }
                }
            }

            var clearHover = function() {
                for(var i = 0 ; i < hoverdViews.length; i++) {
                    hoverdViews[i].setVisible(false);
                }
                hoverdViews.length = 0;
            }

            function touch(e) {
                window.__preventDefault__ = true;
                var event = e || window.event;

                var containerRect = div.getBoundingClientRect();
                var divLeft = containerRect.left;
                var divTop = containerRect.top;

                var useTouchEvent = false;

                var touches = [];

                switch (event.type) {
                    case "touchstart":
                        useTouchEvent = true;

                        for ( var i = 0; i < event.touches.length; i++) {
                            var t = event.touches[i];
                            touches[i*2] = (t.clientX - divLeft) ;
                            touches[i*2+1] = (t.clientY -  divTop) ;
                        }
                        window.nativeTouch(0,touches);
                        break;
                    case "touchend":
                        for ( var i = 0; i < event.touches.length; i++) {
                            var t = event.touches[i];
                            touches[i*2] = (t.clientX - divLeft) ;
                            touches[i*2+1] = (t.clientY -  divTop) ;
                        }
                        window.nativeTouch(2,touches);
                        break;
                    case "touchmove":
                        for ( var i = 0; i < event.touches.length; i++) {
                            var t = event.touches[i];
                            touches[i*2] = (t.clientX - divLeft) ;
                            touches[i*2+1] = (t.clientY -  divTop) ;
                        }
                        window.nativeTouch(1,touches);
                        break;
                    case "mousedown":
                        if(useTouchEvent) {
                            break;
                        }
                        if(event.button != 0) {
                            window.__preventDefault__ = false;
                            break;
                        }
                        mousePressed = true;
                        touches[0] = (event.clientX - divLeft) ;
                        touches[1] = (event.clientY - divTop) ;
                        window.nativeTouch(0,touches);
                        break;
                    case "mousemove":
                        if(useTouchEvent) {
                            break;
                        }
                        if(event.button != 0) {
                            window.__preventDefault__ = false;
                            break;
                        }
                        touches[0] = (event.clientX - divLeft) ;
                        touches[1] = (event.clientY - divTop) ;
                        if(!mousePressed) {
                            updateHover(touches[0],touches[1]);
                            break;
                        } else {
                            clearHover();
                        }
                        window.nativeTouch(1,touches);
                        break;
                    case "mouseup":
                        if(useTouchEvent) {
                            break;
                        }
                        if(event.button != 0) {
                            window.__preventDefault__ = false;
                            break;
                        }
                        mousePressed = false;
                        touches[0] = (event.clientX - divLeft) ;
                        touches[1] = (event.clientY - divTop) ;
                        window.nativeTouch(2,touches);
                        break;
                    default:
                        console.write(event.type);
                }

                if(window.__preventDefault__) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }

            div.addEventListener('touchstart', touch, false);
            div.addEventListener('touchmove', touch, false);
            div.addEventListener('touchend', touch, false);
            div.addEventListener('mousedown', touch, false);
            div.addEventListener('mousemove', touch, false);
            div.addEventListener('mouseup', touch, false);

            /**
             * 以下代码是为了适配PC上鼠标滚轮事件
             * @type {null}
             */

            var latestScrollView = null;
            var latestScrollX = null;
            var latestScrollY = null;

            var getScrollView = function(x,y) {
                /**
                 * 优化，避免每次鼠标滚轮事件都重新查找ScrollView
                 */
                if(latestScrollView != null && latestScrollX == x && latestScrollY == y) {
                    return latestScrollView;
                }
                var scrollView = null;
                var view = window.rootView.findViewByXY(x,y);
                while(view != null) {
                    if(view instanceof com.appengine.view.ScrollView) {
                        scrollView = view;
                        latestScrollView = view;
                        latestScrollX = x;
                        latestScrollY = y;
                        return scrollView;
                    }
                    view = view.parentView;
                }
                return null;
            }
            var scrollFunc = function (e) {
                var value = 0;
                e = e || window.event;

                if (e.wheelDelta) {//IE/Opera/Chrome
                    value = e.wheelDelta;
                } else if (e.detail) {//Firefox
                    value = e.detail;
                }



                var containerRect = div.getBoundingClientRect();
                var divLeft = containerRect.left;
                var divTop = containerRect.top;

                var x = e.clientX - divLeft;
                var y = e.clientY - divTop;

                var view = getScrollView(x,y);
                if(view == null) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                var minY = view.getMinTranslateY();
                var maxY = view.getMaxTranslateY();
                var targetY = view.translateY+value;
                if(targetY > maxY) {
                    targetY = maxY;
                }
                if(targetY < minY) {
                    targetY = minY;
                }
                view.setTranslateY(targetY);
            }
            // 默认AppEngine将以全屏模式工作，此时将拦截鼠标滚轮事件来控制内部滚动
            /*注册事件*/
            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            }//W3C
            window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari
        })();
    };


    // depressed api
    // depress api
    com.vbr3d = {}
    var Model = com.vbr3d.Model = function(){
        this.init.apply(this,arguments);
    }
    Model.prototype.init = function(div,param) {
        this.div = div;
        this.param = param;
        this.onLoadedCallback = null;
        this.model3dView = null;
        this.modelSrc = null;
        this.viewMode = null;
        this.levelCount = null;
        this.baseUrl = null;
        this.heading = null;
        this.pitch = null;
        var self = this;
        this.app = new com.appengine.App(div,function(){
            self.model3dView = new com.appengine.view.Model3DView();
            self.onSceneLoadedCallback = self.onLoadedCallback;
            if(self.viewMode) {
                self.model3dView.setViewMode(self.viewMode);
            }
            if(self.levelCount) {
                self.model3dView.setLevelCount(self.levelCount);
            }
            if(self.center) {
                self.model3dView.setCenter(self.center);
            }
            if(self.modelSrc) {
                self.model3dView.setModelSrc(self.modelSrc,function(){
                    if(self.onLoadedCallback) {
                        self.onLoadedCallback();
                    }
                });
            }
            if(self.heading != null) {
                self.model3dView.setHeading(self.heading);
            }
            if(self.pitch != null) {
                self.model3dView.setPitch(self.pitch);
            }
            if(self.backgroundSrc) {
                self.model3dView.setBackgroundTexture(self.backgroundSrc);
            }


            return self.model3dView;
        });
    }

    /**
     * 设置模型地址
     * @param modelSrc
     */
    Model.prototype.setModelSrc = function(modelSrc) {
        this.modelSrc = modelSrc;
        if(this.model3dView) {
            var self = this;
            this.model3dView.setModelSrc(modelSrc,function(){
                if(self.onLoadedCallback) {
                    self.onLoadedCallback();
                }
            });
        }
    }

    /**
     * 设置模型浏览模式
     * @param value true为内部浏览，false为外部浏览
     */
    Model.prototype.setViewMode = function(value) {
        this.viewMode = value;
        if(this.model3dView) {
            this.model3dView.setViewMode(value);
        }
    }

    Model.prototype.getViewMode = function() {
        return this.viewMode;
    }

    /**
     * 设置最大加载模型的层数
     * @param value
     */
    Model.prototype.setLevelCount = function(value) {
        this.levelCount = value;
        if(this.model3dView) {
            this.sceneView.setLevelCount(value);
        }
    }

    /**
     * 设置旋转角
     * @param value
     */
    Model.prototype.setHeading = function(value) {
        this.heading = value;
        if(this.model3dView) {
            this.model3dView.setHeading(value);
        }
    }

    /**
     * 设置俯仰角
     * @param value
     */
    Model.prototype.setPitch = function(value) {
        this.pitch = value;
        if(this.model3dView) {
            this.model3dView.setPitch(value);
        }
    }

    /**
     * 设置背景图片的链接
     * @param value
     */
    Model.prototype.setBackgroundSrc = function(value) {
        this.backgroundSrc = value;
        if(this.model3dView) {
            this.model3dView.setBackgroundTexture(value);
        }
    }

    /**
     * 设置模型旋转的中心点
     * @param center
     */
    Model.prototype.setCenter = function(center) {
        this.center = center;
        if(this.model3dView) {
            this.model3dView.setCenter(center);
        }
    }

    nativeTrackBeginPage = function (pageName) {
        
    }

    nativeTrackEndPage = function (pageName) {
        
    }

    nativeTrackCustomEvent = function (eventId) {
        
    }

})();