/**
 * @fileoverview 鐧惧害鍦板浘鐨勮嚜瀹氫箟淇℃伅绐楀彛锛屽澶栧紑鏀俱€�
 * 鐢ㄦ埛鑷畾涔変俊鎭獥鍙ｇ殑鍚勭鏍峰紡銆備緥濡傦細border锛宮argin锛宲adding锛宑olor锛宐ackground绛�
 * 涓诲叆鍙ｇ被鏄�<a href="symbols/BMapLib.InfoBox.html">InfoBox</a>锛�
 * 鍩轰簬Baidu Map API 1.2銆�
 *
 * @author Baidu Map Api Group
 * @version 1.2
 */
/**
 * @namespace BMap鐨勬墍鏈塴ibrary绫诲潎鏀惧湪BMapLib鍛藉悕绌洪棿涓�
 */
var BMapLib = window.BMapLib = BMapLib || {};
//甯搁噺锛宨nfoBox鍙互鍑虹幇鐨勪綅缃紝姝ょ増鏈彧鍙疄鐜颁笂涓嬩袱涓柟鍚戙€�
var INFOBOX_AT_TOP = 1, INFOBOX_AT_RIGHT = 2, INFOBOX_AT_BOTTOM = 3, INFOBOX_AT_LEFT = 4;
(function() {
    //澹版槑baidu鍖�
    var T, baidu = T = baidu || {version: '1.5.0'};
    baidu.guid = '$BAIDU$';
    //浠ヤ笅鏂规硶涓虹櫨搴angram妗嗘灦涓殑鏂规硶锛岃鍒癶ttp://tangram.baidu.com 鏌ョ湅鏂囨。
    (function() {
        window[baidu.guid] = window[baidu.guid] || {};

		baidu.lang = baidu.lang || {};
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };
        baidu.lang.isFunction = function (source) {
            return '[object Function]' == Object.prototype.toString.call(source);
        };
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };


        baidu.object = baidu.object || {};
        baidu.extend =
        baidu.object.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }

            return target;
        };
        baidu.event = baidu.event || {};
        baidu.event._listeners = baidu.event._listeners || [];
        baidu.dom = baidu.dom || {};

        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };
        baidu._g = baidu.dom._g;
        baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu.dom._g(element);
            var realListener = function (ev) {
                    // 1. 杩欓噷涓嶆敮鎸丒ventArgument,  鍘熷洜鏄法frame鐨勪簨浠舵寕杞�
                    // 2. element鏄负浜嗕慨姝his
                    listener.call(element, ev);
                },
                lis = baidu.event._listeners,
                filter = baidu.event._eventFilter,
                afterFilter,
                realType = type;
            type = type.toLowerCase();
            // filter杩囨护
            if(filter && filter[type]){
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }

            // 浜嬩欢鐩戝惉鍣ㄦ寕杞�
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }
            // 灏嗙洃鍚櫒瀛樺偍鍒版暟缁勪腑
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };

        baidu.on = baidu.event.on;
        baidu.event.un = function (element, type, listener) {
            element = baidu.dom._g(element);
            type = type.replace(/^on/i, '').toLowerCase();

            var lis = baidu.event._listeners,
                len = lis.length,
                isRemoveAll = !listener,
                item,
                realType, realListener;
            while (len--) {
                item = lis[len];

                if (item[1] === type
                    && item[0] === element
                    && (isRemoveAll || item[2] === listener)) {
                   	realType = item[4];
                   	realListener = item[3];
                    if (element.removeEventListener) {
                        element.removeEventListener(realType, realListener, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + realType, realListener);
                    }
                    lis.splice(len, 1);
                }
            }

            return element;
        };
        baidu.un = baidu.event.un;
        baidu.dom.g = function (id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];
        baidu.dom._styleFilter.filter = function (key, value, method) {
            for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
                if (filter = filter[method]) {
                    value = filter(key, value);
                }
            }
            return value;
        };
        baidu.string = baidu.string || {};

        baidu.string.toCamelCase = function (source) {
            //鎻愬墠鍒ゆ柇锛屾彁楂榞etStyle绛夌殑鏁堢巼 thanks xianwei
            if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
                return source;
            }
            return source.replace(/[-_][^-_]/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
        };

        baidu.dom.setStyle = function (element, key, value) {
            var dom = baidu.dom, fixer;

            // 鏀惧純浜嗗firefox 0.9鐨刼pacity鐨勬敮鎸�
            element = dom.g(element);
            key = baidu.string.toCamelCase(key);

            if (fixer = dom._styleFilter) {
                value = fixer.filter(key, value, 'set');
            }

            fixer = dom._styleFixer[key];
            (fixer && fixer.set) ? fixer.set(element, value) : (element.style[fixer || key] = value);

            return element;
        };

         baidu.setStyle = baidu.dom.setStyle;

        baidu.dom.setStyles = function (element, styles) {
            element = baidu.dom.g(element);
            for (var key in styles) {
                baidu.dom.setStyle(element, key, styles[key]);
            }
            return element;
        };
         baidu.setStyles = baidu.dom.setStyles;
        baidu.browser = baidu.browser || {};
        baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
        baidu.dom._NAME_ATTRS = (function () {
            var result = {
                'cellpadding': 'cellPadding',
                'cellspacing': 'cellSpacing',
                'colspan': 'colSpan',
                'rowspan': 'rowSpan',
                'valign': 'vAlign',
                'usemap': 'useMap',
                'frameborder': 'frameBorder'
            };

            if (baidu.browser.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }

            return result;
        })();
        baidu.dom.setAttr = function (element, key, value) {
            element = baidu.dom.g(element);
            if ('style' == key){
                element.style.cssText = value;
            } else {
                key = baidu.dom._NAME_ATTRS[key] || key;
                element.setAttribute(key, value);
            }
            return element;
        };
         baidu.setAttr = baidu.dom.setAttr;
        baidu.dom.setAttrs = function (element, attributes) {
            element = baidu.dom.g(element);
            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key]);
            }
            return element;
        };
        baidu.setAttrs = baidu.dom.setAttrs;
        baidu.dom.create = function(tagName, opt_attributes) {
            var el = document.createElement(tagName),
                attributes = opt_attributes || {};
            return baidu.dom.setAttrs(el, attributes);
        };
        T.undope=true;
    })();

    /**
     * @exports InfoBox as BMapLib.InfoBox
     */

    var InfoBox =
    /**
     * InfoBox绫荤殑鏋勯€犲嚱鏁�
     * @class InfoBox <b>鍏ュ彛</b>銆�
     * 鍙互鑷畾涔塨order,margin,padding,鍏抽棴鎸夐挳绛夌瓑銆�
     * @constructor
         * @param {Map} map Baidu map鐨勫疄渚嬪璞�.
         * @param {String} content infoBox涓殑鍐呭.
         * @param {Json Object} opts 鍙€夌殑杈撳叆鍙傛暟锛岄潪蹇呭～椤广€傚彲杈撳叆閫夐」鍖呮嫭锛�<br />
         * {<br />"<b>offset</b>" : {Size} infoBox鐨勫亸绉婚噺
         * <br />"<b>boxClass</b>" : {String} 瀹氫箟infoBox鐨刢lass,
         * <br />"<b>boxStyle</b>" : {Json} 瀹氫箟infoBox鐨剆tyle,姝ら」浼氳鐩朾oxClass<br />
         * <br />"<b>closeIconMargin</b>" : {String} 鍏抽棴鎸夐挳鐨刴argin    <br />
         * <br />"<b>closeIconUrl</b>" : {String} 鍏抽棴鎸夐挳鐨剈rl鍦板潃    <br />
         * <br />"<b>enableAutoPan</b>" : {Boolean} 鏄惁鍚姩鑷姩骞崇Щ鍔熻兘    <br />
         * <br />"<b>align</b>" : {Number} 鍩轰簬鍝釜浣嶇疆杩涜瀹氫綅锛屽彇鍊间负[INFOBOX_AT_TOP,INFOBOX_AT_BOTTOM]<br />
         * }<br />.
         * @example <b>鍙傝€冪ず渚嬶細</b><br />
         * var infoBox = new BMapLib.InfoBox(map,"鐧惧害鍦板浘api",{boxStyle:{background:"url('tipbox.gif') no-repeat
          center top",width: "200px"},closeIconMargin: "10px 2px 0 0",enableAutoPan: true
          ,alignBottom: false});
     */
        BMapLib.InfoBox = function(map, content, opts) {

        this._content = content || "";
        this._isOpen = false;
        this._map = map;

        this._opts = opts = opts || {};
        this._opts.offset =  opts.offset || new BMap.Size(0,0);
        this._opts.boxClass = opts.boxClass || "infoBox";
        this._opts.boxStyle = opts.boxStyle || {};
        this._opts.closeIconMargin = opts.closeIconMargin || "2px";
        this._opts.closeIconUrl = opts.closeIconUrl || "close.png";
        this._opts.enableAutoPan = opts.enableAutoPan  ? true : false;
        this._opts.align = opts.align || INFOBOX_AT_TOP;

        this.initialize(map);
    }
    InfoBox.prototype = new BMap.Overlay();
    InfoBox.prototype.initialize = function(map) {
        var me = this;
        var div = this._div = baidu.dom.create('div', {"class": this._opts.boxClass});
        baidu.dom.setStyles(div, this._opts.boxStyle);
        //璁剧疆position涓篴bsolute锛岀敤浜庡畾浣�
        div.style.position = "absolute";
        this._setContent(this._content);

        var floatPane = map.getPanes().floatPane;
        floatPane.style.width = "auto";
        floatPane.appendChild(div);
        //璁剧疆瀹屽唴瀹瑰悗锛岃幏鍙杁iv鐨勫搴�,楂樺害
        this._getInfoBoxSize();
        //this._boxWidth = parseInt(this._div.offsetWidth,10);
        //this._boxHeight = parseInt(this._div.offsetHeight,10);
        //闃绘鍚勭鍐掓场浜嬩欢
        baidu.event.on(div,"onmousedown",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"onmouseover",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"click",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"dblclick",function(e){
            me._stopBubble(e);
        });
        return div;
    }
    InfoBox.prototype.draw = function() {
        this._isOpen && this._adjustPosition(this._point);
    }
    /**
     * 鎵撳紑infoBox
     * @param {Marker|Point} anchor 瑕佸湪鍝釜marker鎴栬€卲oint涓婃墦寮€infobox
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.open();
     */
    InfoBox.prototype.open = function(anchor){
        var me = this,poi;
        if(!this._isOpen) {
            this._map.addOverlay(this);
            this._isOpen = true;
            //寤惰繜10ms娲惧彂open浜嬩欢锛屼娇鍚庣粦瀹氱殑浜嬩欢鍙互瑙﹀彂銆�
            setTimeout(function(){
                me._dispatchEvent(me,"open",{"point" : me._point});
            },10);
        }
        if(anchor instanceof BMap.Point){
            poi = anchor;
            //娓呴櫎涔嬪墠瀛樺湪鐨刴arker浜嬩欢缁戝畾锛屽鏋滃瓨鍦ㄧ殑璇�
            this._removeMarkerEvt();
        }else if(anchor instanceof BMap.Marker){
        	//濡傛灉褰撳墠marker涓嶄负绌猴紝璇存槑鏄浜屼釜marker锛屾垨鑰呯浜屾鐐筼pen鎸夐挳,鍏堢Щ闄ゆ帀涔嬪墠缁戝畾鐨勪簨浠�
        	if(this._marker){
        		this._removeMarkerEvt();
        	}
            poi = anchor.getPosition();
            this._marker = anchor;
            !this._markerDragend && this._marker.addEventListener("dragend",this._markerDragend = function(e){
            	me._point = e.point;
            	me._adjustPosition(me._point);
            	me._panBox();
            	me.show();
            });
             //缁檓arker缁戝畾dragging浜嬩欢锛屾嫋鍔╩arker鐨勬椂鍊欙紝infoBox涔熻窡闅忕Щ鍔�
            !this._markerDragging && this._marker.addEventListener("dragging",this._markerDragging = function(){
            	me.hide();
            	me._point = me._marker.getPosition();
                me._adjustPosition(me._point);
            });
        }
        //鎵撳紑鐨勬椂鍊欙紝灏唅nfowindow鏄剧ず
        this.show();
        this._point = poi;
        this._panBox();
        this._adjustPosition(this._point);
    }
    /**
     * 鍏抽棴infoBox
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.close();
     */
    InfoBox.prototype.close = function(){
        if(this._isOpen){
            this._map.removeOverlay(this);
            this._remove();
            this._isOpen = false;
            this._dispatchEvent(this,"close",{"point" : this._point});
        }
    }

	/**
   	 * 鎵撳紑infoBox鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
     * @name InfoBox#Open
     * @event
     * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
     * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
     * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
     * <br />"<b>point</b>锛歿Point} infoBox鐨勬墦寮€浣嶇疆}
     *
     * @example <b>鍙傝€冪ず渚嬶細</b>
     * infoBox.addEventListener("open", function(e) {
     *     alert(e.type);
     * });
     */
   /**
   	 * 鍏抽棴infoBox鏃讹紝娲惧彂浜嬩欢鐨勬帴鍙�
     * @name InfoBox#Close
     * @event
     * @param {Event Object} e 鍥炶皟鍑芥暟浼氳繑鍥瀍vent鍙傛暟锛屽寘鎷互涓嬭繑鍥炲€硷細
     * <br />{"<b>target</b> : {BMap.Overlay} 瑙﹀彂浜嬩欢鐨勫厓绱�,
     * <br />"<b>type</b>锛歿String} 浜嬩欢绫诲瀷,
     * <br />"<b>point</b>锛歿Point} infoBox鐨勫叧闂綅缃畗
     *
     * @example <b>鍙傝€冪ず渚嬶細</b>
     * infoBox.addEventListener("close", function(e) {
     *     alert(e.type);
     * });
     */
  /**
     * 鍚敤鑷姩骞崇Щ
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.enableAutoPan();
     */
    InfoBox.prototype.enableAutoPan = function(){
        this._opts.enableAutoPan = true;
    }
    /**
     * 绂佺敤鑷姩骞崇Щ
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.disableAutoPan();
     */
    InfoBox.prototype.disableAutoPan = function(){
        this._opts.enableAutoPan = false;
    }
    /**
     * 璁剧疆infoBox鐨勫唴瀹�
     * @param {String|HTMLElement} content 寮瑰嚭姘旀场涓殑鍐呭
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.setContent("鐧惧害鍦板浘API");
     */
    InfoBox.prototype.setContent = function(content){
      	this._setContent(content);
      	this._getInfoBoxSize();
        this._adjustPosition(this._point);
    }
    /**
     * 璁剧疆淇℃伅绐楃殑鍦扮悊浣嶇疆
     * @param {Point} point 璁剧疆position
     * @return none
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.setPosition(new BMap.Point(116.35,39.911));
     */
    InfoBox.prototype.setPosition = function(poi){
        this._point = poi;
        this._adjustPosition(poi);
        this._removeMarkerEvt();
    }
    /**
     * 鑾峰緱淇℃伅绐楃殑鍦扮悊浣嶇疆
     * @param none
     * @return {Point} 淇℃伅绐楃殑鍦扮悊鍧愭爣
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.getPosition();
     */
    InfoBox.prototype.getPosition = function(){
        return this._point;
    }
    /**
     * 杩斿洖淇℃伅绐楀彛鐨勭澶磋窛绂讳俊鎭獥鍙ｅ湪鍦板浘
     * 涓婃墍閿氬畾鐨勫湴鐞嗗潗鏍囩偣鐨勫儚绱犲亸绉婚噺銆�
     * @return {Size} Size
     *
     * @example <b>鍙傝€冪ず渚嬶細</b><br />
     * infoBox.getOffset();
     */
    InfoBox.prototype.getOffset = function(){
        return this._opts.offset;
    },
    /**
   	 *@ignore
     * 鍒犻櫎overlay锛岃皟鐢∕ap.removeOverlay鏃跺皢璋冪敤姝ゆ柟娉曪紝
     * 灏嗙Щ闄よ鐩栫墿鐨勫鍣ㄥ厓绱�
     */
    InfoBox.prototype._remove = function(){
        var me = this;
        if(this.domElement && this.domElement.parentNode){
          //闃叉鍐呭瓨娉勯湶
          baidu.event.un(this._div.firstChild, "click", me._closeHandler());
          this.domElement.parentNode.removeChild(this.domElement);
        }
        this.domElement = null;
        this._isOpen = false;
        this.dispatchEvent("onremove");
    },
    baidu.object.extend(InfoBox.prototype,{
        /**
         * 鑾峰彇鍏抽棴鎸夐挳鐨刪tml
         * @return IMG 鍏抽棴鎸夐挳鐨凥TML浠ｇ爜
         */
        _getCloseIcon: function(){
            var img = "<img src='"+ this._opts.closeIconUrl +"' align='right' style='position:absolute;right:0px;cursor:pointer;margin:"+ this._opts.closeIconMargin +"'/>";
            return img;
        },
        /**
	     * 璁剧疆infoBox鐨勫唴瀹�
	     * @param {String|HTMLElement} content 寮瑰嚭姘旀场涓殑鍐呭
	     * @return none
	     *
	     * @example <b>鍙傝€冪ず渚嬶細</b><br />
	     * infoBox.setContent("鐧惧害鍦板浘API");
	     */
        _setContent: function(content){
	        if(!this._div){
	            return;
	        }
	        // var closeHtml = this._getCloseIcon();
	        //string绫诲瀷鐨刢ontent
	        if(typeof content.nodeType === "undefined"){
	            // this._div.innerHTML = closeHtml + content;
                this._div.innerHTML = content; 
	        }else{
	            // this._div.innerHTML = closeHtml;
	            this._div.appendChild(content);
	        }
	        this._content = content;
	        //娣诲姞click鍏抽棴infobox浜嬩欢
	        this._addEventToClose();

   	    },
        /**
         * 璋冩暣infobox鐨刾osition
         * @return none
         */
        _adjustPosition: function(poi){
            var pixel = this._getPointPosition(poi);
            var icon = this._marker && this._marker.getIcon();
            switch(this._opts.align){
                case INFOBOX_AT_TOP:
                    if(this._marker){
                        this._div.style.bottom = -(pixel.y - this._opts.offset.height - icon.anchor.height + icon.infoWindowAnchor.height) - this._marker.getOffset().height + 2 + "px";
                    }else{
                        this._div.style.bottom = -(pixel.y - this._opts.offset.height) + "px";
                    }
                    break;
                case INFOBOX_AT_BOTTOM:
                    if(this._marker){
          		        this._div.style.top = pixel.y + this._opts.offset.height - icon.anchor.height + icon.infoWindowAnchor.height + this._marker.getOffset().height + "px";
                    }else{
                        this._div.style.top = pixel.y + this._opts.offset.height + "px";
                    }
                    break;
            }

            if(this._marker){
                this._div.style.left = pixel.x - icon.anchor.width + this._marker.getOffset().width + icon.infoWindowAnchor.width - this._boxWidth / 2 + "px";
            }else{
                this._div.style.left = pixel.x - this._boxWidth / 2 + "px";
            }
        },
        /**
         * 寰楀埌infobox鐨刾osition
         * @return Point  infobox褰撳墠鐨刾osition
         */
        _getPointPosition: function(poi){
            this._pointPosition = this._map.pointToOverlayPixel(poi);
            return this._pointPosition;
        },
        /**
         * 寰楀埌infobox鐨勯珮搴﹁窡瀹藉害
         * @return none
         */
        _getInfoBoxSize: function(){
        	this._boxWidth = parseInt(this._div.offsetWidth,10);
        	this._boxHeight = parseInt(this._div.offsetHeight,10);
        },
        /**
         * 娣诲姞鍏抽棴浜嬩欢
         * @return none
         */
        _addEventToClose: function(){
            var me = this;
            baidu.event.on(this._div.firstChild, "click", me._closeHandler());
            this._hasBindEventClose = true;
        },
        /**
         * 澶勭悊鍏抽棴浜嬩欢
         * @return none
         */
        _closeHandler: function(){
            var me = this;
            return function(e){
                me.close();
            }
        },
        /**
         * 闃绘浜嬩欢鍐掓场
         * @return none
         */
        _stopBubble: function(e){
            if(e && e.stopPropagation){
                e.stopPropagation();
            }else{
                window.event.cancelBubble = true;
            }
        },
        /**
         * 鑷姩骞崇Щinfobox锛屼娇鍏跺湪瑙嗛噹涓叏閮ㄦ樉绀�
         * @return none
         */
        _panBox: function(){
            if(!this._opts.enableAutoPan){
                return;
            }
            var mapH = parseInt(this._map.getContainer().offsetHeight,10),
                mapW = parseInt(this._map.getContainer().offsetWidth,10),
                boxH = this._boxHeight,
                boxW = this._boxWidth;
            //infobox绐楀彛鏈韩鐨勫搴︽垨鑰呴珮搴﹁秴杩噈ap container
            if(boxH >= mapH || boxW >= mapW){
                return;
            }
            //濡傛灉point涓嶅湪鍙鍖哄煙鍐�
            if(!this._map.getBounds().containsPoint(this._point)){
                this._map.setCenter(this._point);
            }
            var anchorPos = this._map.pointToPixel(this._point),
                panTop,panBottom,panY,
                //宸︿晶瓒呭嚭
                panLeft = boxW / 2 - anchorPos.x,
                //鍙充晶瓒呭嚭
                panRight = boxW / 2 + anchorPos.x - mapW;
            if(this._marker){
                var icon = this._marker.getIcon();
            }
            //鍩轰簬bottom瀹氫綅锛屼篃灏辨槸infoBox鍦ㄤ笂鏂圭殑鎯呭喌
            switch(this._opts.align){
                case INFOBOX_AT_TOP:
                    //涓婁晶瓒呭嚭
                    var h = this._marker ? icon.anchor.height + this._marker.getOffset().height - icon.infoWindowAnchor.height : 0;
                    panTop = boxH - anchorPos.y + this._opts.offset.height + h + 2 ;
                    break;
                case INFOBOX_AT_BOTTOM:
                    //涓嬩晶瓒呭嚭
                    var h = this._marker ? -icon.anchor.height + icon.infoWindowAnchor.height + this._marker.getOffset().height + this._opts.offset.height : 0;
                    panBottom = boxH + anchorPos.y - mapH + h + 4;
                    break;
            }

            panX = panLeft > 0 ? panLeft : (panRight > 0 ? -panRight : 0);
            panY = panTop > 0 ? panTop : (panBottom > 0 ? -panBottom : 0);
            this._map.panBy(panX,panY);
        },
        _removeMarkerEvt: function(){
			this._markerDragend && this._marker.removeEventListener("dragend", this._markerDragend);
            this._markerDragging && this._marker.removeEventListener("dragging", this._markerDragging);
            this._markerDragend = this._markerDragging = null;
        },
      	/**
	     * 闆嗕腑娲惧彂浜嬩欢鍑芥暟
	     *
	     * @private
	     * @param {Object} instance 娲惧彂浜嬩欢鐨勫疄渚�
	     * @param {String} type 娲惧彂鐨勪簨浠跺悕
	     * @param {Json} opts 娲惧彂浜嬩欢閲屾坊鍔犵殑鍙傛暟锛屽彲閫�
	     */
	     _dispatchEvent: function(instance, type, opts) {
	        type.indexOf("on") != 0 && (type = "on" + type);
	        var event = new baidu.lang.Event(type);
	        if (!!opts) {
	            for (var p in opts) {
	                event[p] = opts[p];
	            }
	        }
	        instance.dispatchEvent(event);
	    }
    });
})();

