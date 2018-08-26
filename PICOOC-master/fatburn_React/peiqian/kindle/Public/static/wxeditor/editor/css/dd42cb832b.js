(function($) {
    $.cookie = function(key, value, options) {
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({},
            options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires,
                t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [encodeURIComponent(key), '=', options.raw ? value: encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path: '', options.domain ? '; domain=' + options.domain: '', options.secure ? '; secure': ''].join(''));
        }
        options = value || {};
        var decode = options.raw ?
        function(s) {
            return s;
        }: decodeURIComponent;
        var pairs = document.cookie.split('; ');
        for (var i = 0,
        pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || '');
        }
        return null;
    };
})(jQuery);
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 滚动条

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});;
 */

var random_color_step = 1;
var custom_style_set = false;
var current_select_bgcolor = null;
var current_select_color = '#FFF';
var tizi_brush_on = true;
var durring_pcc = false;
function brushOn() {
    tizi_brush_on = true;
    $('.n1-1 .filter').each(function() {
        var filter = $(this).attr('data-filter');
        if (filter.indexOf('-brush') == -1) {
            $(this).attr('data-filter', filter + '-brush');
        }
    });
    showSuccessMessage('已进入格式刷模式，选中编辑器中要调整格式的文字后，点击左侧的样式，即可使用样式效果');
}
function brushOff() {
    tizi_brush_on = false;
    $('.n1-1 .filter').each(function() {
        var filter = $(this).attr('data-filter');
        $(this).attr('data-filter', filter.replace('-brush', ''));
    });
}
function strip_stack_span(html) {
    var docObj = $('<div>' + html + '</div>');
    var has_secspan = false;
    do {
        has_secspan = false;
        docObj.find('span:has(span)').each(function(i) {
            var innerobj = $(this).find('span');
            if ($.trim($(this).text()) == $.trim(innerobj.text())) {
                has_secspan = true;
                var style = $(this).attr('style');
                var innserstyle = innerobj.attr('style');
                $(this).attr('style', style + ";" + innserstyle).html($(this).text());
            }
        });
    } while ( has_secspan && docObj . find ('span:has(span)').size() > 0);
    return docObj.html();
}
function strip_tags(input, allowed) {
    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags,
    function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0: '';
    });
}
function getDealingHtml() {
    var html = getSelectionHtml();
    if (html == "") {
        return current_editor.getContent();
    } else {
        return html;
    }
}
function getSelectionHtml() {
    var range = current_editor.selection.getRange();
    range.select();
    var selectionObj = current_editor.selection.getNative();
    var rangeObj = selectionObj.getRangeAt(0);
    var docFragment = rangeObj.cloneContents();
    var testDiv = document.createElement("div");
    testDiv.appendChild(docFragment);
    var selectHtml = testDiv.innerHTML;
    return selectHtml;
}
function setDealingHtml(newHtml) {
    var html = getSelectionHtml();
    if (html != "") {
        insertHtml(newHtml);
        custom_style_set = true;
        current_editor.undoManger.save();
        return;
    } else {
        current_editor.setContent(newHtml);
        current_editor.undoManger.save();
        return;
    }
}
function getEditorHtml() {
    var html = current_editor.getContent();
    var htmlObj = $('<div>' + html + ' </div>');
    var htmlTable = htmlObj.find('table');
    if (htmlTable.size() > 0) {
        htmlTable.removeAttr('width').attr('style', 'width:100%;');
        htmlTable.find('td').removeAttr('width').attr('style', 'border:1px solid #eeeeee;');
    }
    htmlObj.find('.135editor').each(function() {
        $(this).removeAttr('style');
    });
    return htmlObj.html();
}
function setEditorHtml(newHtml) {
    current_editor.undoManger.save();
    current_editor.setContent(newHtml);
    current_editor.undoManger.save();
}
function insertHtml(html) {
    if (tizi_brush_on && !durring_pcc) {
        var select_html = getSelectionHtml();
        if (select_html != "") {
            select_html = strip_tags(select_html, '<br><p><h1><h2><h3><h4><h5><h6><img>');
            var select_obj = $('<div>' + select_html + '</div>');
            select_obj.find('*').each(function() {
                $(this).removeAttr('style');
                $(this).removeAttr('class');
                $(this).removeAttr('placeholder');
            });
            var obj = $('<div>' + html + '</div>');
            select_obj.find('h1,h2,h3,h4,h5,h6').each(function(i) {
                var title = obj.find('.135title').eq(i);
                if (title && title.size() > 0) {
                    title.html($.trim($(this).text()));
                    $(this).remove();
                } else {
                    $(this).replaceWith('<p>' + $(this).text() + '</p>');
                }
            });
            var bgimg_size = obj.find('.135bg').size();
            select_obj.find('img').each(function(i) {
                var bgimg = obj.find('.135bg').eq(i);
                if (bgimg && bgimg.size() > 0) {
                    bgimg.css('background-image', 'url(' + $(this).attr('src') + ')');
                    $(this).remove();
                }
            });
            select_obj.find('img').each(function(i) {
                var img = obj.find('img').eq(i);
                if (img && img.size() > 0) {
                    img.attr('src', $(this).attr('src'));
                    $(this).remove();
                }
            });
            var brushs = obj.find('.135brush');
            var total = brushs.size();
            if (total > 0) {
                if (total == 1) {
                    var brush_item = obj.find('.135brush:first');
                    if (brush_item.data('brushtype') == 'text') {
                        brush_item.html($.trim(select_obj.text()));
                    } else {
                        select_obj.contents().each(function(i) {
                            var $this = this;
                            if (this.tagName == "IMG") {
                                return;
                            };
                            if ($.trim($($this).text()) == "" || this.tagName == 'BR' || $(this).html() == "" || $(this).html() == "&nbsp;" || $(this).html() == "<br>" || $(this).html() == "<br/>") {
                                $(this).remove();
                            }
                        });
                        var style = brush_item.data('style');
                        if (style) {
                            select_obj.find('*').each(function() {
                                $(this).attr('style', style);
                            });
                        }
                        brush_item.html(select_obj.html());
                    }
                } else {
                    select_obj.contents().each(function(i) {
                        var $this = this;
                        if (this.tagName == "IMG") {
                            return;
                        };
                        if ($.trim($($this).text()) == "" || this.tagName == 'BR' || $(this).html() == "" || $(this).html() == "&nbsp;" || $(this).html() == "<br>" || $(this).html() == "<br/>") {
                            $(this).remove();
                        }
                    });
                    select_obj.contents().each(function(i) {
                        var $this = this;
                        if ($this.nodeType == 3) {
                            $this = $('<p>' + $(this).text() + '</p>').get(0);
                        }
                        if (i < total) {
                            var brush_item = brushs.eq(i);
                            if (brush_item.data('brushtype') == 'text') {
                                brush_item.html($.trim($($this).text()));
                            } else {
                                var style = brush_item.data('style');
                                if (style) {
                                    $($this).attr('style', style);
                                }
                                brush_item.empty().append($($this));
                            }
                        } else {
                            var brush_item = brushs.eq(total - 1);
                            if (brush_item.data('brushtype') == 'text') {
                                brush_item.append($($this).text());
                            } else {
                                var style = brush_item.data('style');
                                if (style) {
                                    $($this).attr('style', style);
                                }
                                brush_item.append($($this));
                            }
                        }
                    });
                }
                obj.find('p').each(function(i) {
                    if ($(this).html() == "" || $(this).html() == "&nbsp;" || $(this).html() == "<br>" || $(this).html() == "<br/>") {
                        if (typeof $(this).attr('style') == 'undefined') {
                            $(this).remove();
                        }
                    }
                });
            }
            html = obj.html();
            current_editor.execCommand('insertHtml', html);
            current_editor.undoManger.save();
            return true;
        } else {}
    }
    current_editor.execCommand('insertHtml', html);
    current_editor.undoManger.save();
    return true;
}
function setBackgroundColor(bgcolor, color, history) {
    if (isGreyColor(bgcolor)) {
        return false;
    }
    if (history) {
        current_editor.undoManger.save();
    }
    if (!$('#replace-color-all')[0].checked && current_active_135item) {
        parseObject(current_active_135item, bgcolor, color);
        current_editor.undoManger.save();
    } else {
        if (!$('#replace-color-all')[0].checked) {
            showErrorMessage("没有选择要调色的样式，如要全文换色请勾选配色方案位置的“全文换色”的选择框");
            return;
        }
        parseObject($(current_editor.selection.document), bgcolor, color);
    }
    if (history) {
        current_editor.undoManger.save();
    }
    return;
}
function parseObject(obj, bgcolor, color) {
    if (isGreyColor(bgcolor)) {
        return false;
    }
    obj.find("*").each(function() {
        if (this.nodeName == "HR" || this.nodeName == "hr") {
            $(this).css('border-color', bgcolor);
            return;
        }
        if (this.nodeName == "") {
            return;
        }
        if ($(this).data('bcless')) {
            var persent = $(this).data('bclessp') ? $(this).data('bclessp') : '10%';
            var bc_color;
            if (isLightenColor(bgcolor) || $(this).data('bcless') == 'darken') {
                bc_color = getColor(rgb2hex(bgcolor), 'darken', persent);
            } else {
                bc_color = getColor(rgb2hex(bgcolor), 'lighten', persent);
            }
            $(this).css('borderBottomColor', bc_color);
            $(this).css('borderTopColor', bc_color);
            $(this).css('borderLeftColor', bc_color);
            $(this).css('borderRightColor', bc_color);
        } else {
            setColor(this, 'borderBottomColor', bgcolor);
            setColor(this, 'borderTopColor', bgcolor);
            setColor(this, 'borderLeftColor', bgcolor);
            setColor(this, 'borderRightColor', bgcolor);
        }
        if ($(this).data('ct') == 'fix') {
            return;
        }
        var bgimg = $(this).css('backgroundImage');
        if (bgimg.substring(0, 24) == '-webkit-linear-gradient(') {
            var colors;
            var type;
            if (bgimg.substring(0, 30) == '-webkit-linear-gradient(left, ') {
                type = 'left';
                colors = bgimg.substring(30, (bgimg.length - 1));
            } else if (bgimg.substring(0, 29) == '-webkit-linear-gradient(top, ') {
                type = 'top';
                colors = bgimg.substring(29, (bgimg.length - 1));
            } else if (bgimg.substring(0, 31) == '-webkit-linear-gradient(right, ') {
                type = 'right';
                colors = bgimg.substring(31, (bgimg.length - 1));
            } else if (bgimg.substring(0, 32) == '-webkit-linear-gradient(bottom, ') {
                type = 'bottom';
                colors = bgimg.substring(32, (bgimg.length - 1));
            }
            var color_arr = colors.split('),');
            var txt_color, gradient_color, main_color;
            if (isLightenColor(bgcolor)) {
                txt_color = getColor(rgb2hex(bgcolor), 'darken', '50%');
                txt_color = getColor(rgb2hex(txt_color), 'saturate', '30%');
                gradient_color = getColor(rgb2hex(bgcolor), 'darken', '10%');
                main_color = getColor(rgb2hex(bgcolor), 'saturate', '20%');
            } else {
                txt_color = '#FFF';
                getColor(rgb2hex(bgcolor), 'lighten', '50%');
                gradient_color = getColor(rgb2hex(bgcolor), 'lighten', '10%');
                main_color = getColor(rgb2hex(bgcolor), 'lighten', '5%');
                main_color = getColor(rgb2hex(main_color), 'desaturate', '10%');
                main_color = getColor(rgb2hex(main_color), 'fadein', '20%');
            }
            if (color_arr.length == 3) {
                $(this).css('backgroundImage', '-webkit-linear-gradient(' + type + ', ' + main_color + ', ' + gradient_color + ', ' + main_color + ')');
                $(this).css('color', txt_color);
            } else if (color_arr.length == 2) {
                $(this).css('backgroundImage', '-webkit-linear-gradient(' + type + ', ' + main_color + ', ' + gradient_color + ')');
                $(this).css('color', txt_color);
            }
            return;
        }
        var persent = $(this).data('clessp') ? $(this).data('clessp') : '50%';
        var bgC = $(this).get(0).style.backgroundColor;
        if (!bgC || bgC === 'initial' || bgC === 'transparent' || bgC === "") {
            var fc = $(this).get(0).style.color;
            if (fc && fc != "" && fc != 'inherit' && !isGreyColor(fc)) {
                var txt_color;
                if (isLightenColor(bgcolor)) {
                    txt_color = getColor(rgb2hex(bgcolor), 'darken', persent);
                    $(this).css('color', txt_color);
                } else {
                    $(this).css('color', bgcolor);
                }
            }
        } else {
            if ($(this).data('bgless')) {
                var bgpersent = $(this).data('bglessp') ? $(this).data('bglessp') : '30%';
                var bg_color;
                if ($(this).data('bgless') == "true" || $(this).data('bgless') == true) {
                    if (isLightenColor(bgcolor)) {
                        bg_color = getColor(rgb2hex(bgcolor), 'darken', bgpersent);
                        bg_color = getColor(rgb2hex(bg_color), 'saturate', '20%');
                    } else {
                        bg_color = getColor(rgb2hex(bgcolor), 'lighten', bgpersent);
                    }
                } else {
                    bg_color = getColor(rgb2hex(bgcolor), $(this).data('bgless'), bgpersent);
                }
                if (isLightenColor(bg_color)) {
                    txt_color = getColor(rgb2hex(bg_color), 'darken', persent)
                } else {
                    txt_color = color;
                }
                $(this).css('backgroundColor', bg_color);
                $(this).css('color', txt_color);
            } else if (!isGreyColor(bgC)) {
                $(this).css('backgroundColor', bgcolor);
                var txt_color;
                if (isLightenColor(bgcolor)) {
                    txt_color = getColor(rgb2hex(bgcolor), 'darken', persent)
                } else {
                    txt_color = color;
                }
                $(this).css('color', txt_color);
            } else {
                var fc = $(this).get(0).style.color;
                if (fc && fc != "" && fc != 'inherit' && !isGreyColor(fc)) {
                    $(this).css('color', bgcolor);
                }
            }
        }
    });
    obj.find("*").each(function() {
        var fc = $(this).css('color');
        $(this).find('*').each(function() {
            var nfc = $(this).css('color');
            if (nfc == fc) {
                $(this).css('color', 'inherit')
            }
        });
    });
    return obj;
}
function parseHtml(html, bgcolor, color) {
    var obj = $('<div id="editor-content">' + html + "</div>");
    obj = parseObject(obj, bgcolor, color);
    var result = obj.html();
    obj = null;
    return result;
}
function style_click(id) {
    var url = BASEURL + '/editor_styles/click_num/';
    ajaxAction(url, {
        id: id
    });
    return false;
}
function setColor(obj, colorType, color) {
    var c = $(obj).css(colorType);
    if (c === 'transparent') {
        return;
    } else {
        if (!isGreyColor(c)) {
            $(obj).css(colorType, color);
        }
    }
}
function rgb2hex(color) {
    rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice( - 2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice( - 2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice( - 2) : color;
}
function isLightenColor(color) {
    var c = rgb2hex(color);
    var r = ("" + c.substring(1, 3));
    var g = ("" + c.substring(3, 5));
    var b = ("" + c.substring(5, 7));
    if (r > 'C0' && g > 'C0' && b > 'C0') {
        return true;
    } else {
        return false;
    }
}
function isGreyColor(color) {
    var c = rgb2hex(color);
    var r = "" + c.substring(1, 3);
    var g = "" + c.substring(3, 5);
    var b = "" + c.substring(5, 7);
    if (r == g && g == b) {
        return true;
    } else {
        return false;
    }
}
function saveTemplate(form) {
    
    if (getEditorHtml() == " ") {
        alert("请先输入内容");
        ckeditors['WxMsgContent'].focus();
        return false;
    }
    /*
    if (!sso.check_userlogin({
        "callback": saveTemplate,
        "callback_args": arguments
    })) return false;
    */
    $('#myModal').modal('show');
    $('#dialog-save-template').unbind('click').click(function() {
        if ($('#dialog-template-name').val() == "") {
            $('#dialog-template-name').focus();
        } else {
            $('#template_name').val($('#dialog-template-name').val());
            //form.action = '/editor_styles/saveTemplate';
            $("#WxMsgViewForm").submit();
            return true;
            /*
            ajaxSubmitForm(form,
            function() {
                $('#myModal').modal('hide');
            });*/
        }
    });
}
function getColor(color, type, num) {
    var str = '';
    less_parser.parse('*{color:' + type + '(' + color + ',' + num + ')}',
    function(err, tree) {
        str = tree.toCSS();
        str = str.replace(/\n/g, '').replace(/ /g, '').replace('*{color:', '').replace(';}', '');
    });
    return str;
}
function openTplModal() {
    $('#templateModal').modal('show');
    $('#template-modal-body').html('正在加载').load(BASEURL + '/editor_styles/myTemplates #my-templates',
    function() {
        $('#my-templates .nav-tabs a:first').tab('show')
    })
}
function set_style(styles) {
    ckeditors['WxMsgContent'].execCommand('removeFormat');
    var element = ckeditors['WxMsgContent'].getSelection().getStartElement();
    if (element.getName() == 'img') {
        element.setStyles(styles);
    } else {
        var style = new CKEDITOR.style({
            element: element.getName(),
            styles: styles
        });
        ckeditors['WxMsgContent'].applyStyle(style);
    }
}; !
function(a) {
    var b = function() {
        return ! 1 === a.support.boxModel && a.support.objectAll && a.support.leadingWhitespace
    } ();
    a.jGrowl = function(b, c) {
        0 === a("#jGrowl").size() && a('<div id="jGrowl"></div>').addClass(c && c.position ? c.position: a.jGrowl.defaults.position).appendTo("body"),
        a("#jGrowl").jGrowl(b, c)
    },
    a.fn.jGrowl = function(b, c) {
        if (a.isFunction(this.each)) {
            var d = arguments;
            return this.each(function() {
                void 0 === a(this).data("jGrowl.instance") && (a(this).data("jGrowl.instance", a.extend(new a.fn.jGrowl, {
                    notifications: [],
                    element: null,
                    interval: null
                })), a(this).data("jGrowl.instance").startup(this)),
                a.isFunction(a(this).data("jGrowl.instance")[b]) ? a(this).data("jGrowl.instance")[b].apply(a(this).data("jGrowl.instance"), a.makeArray(d).slice(1)) : a(this).data("jGrowl.instance").create(b, c)
            })
        }
    },
    a.extend(a.fn.jGrowl.prototype, {
        defaults: {
            pool: 0,
            header: "",
            group: "",
            sticky: !1,
            position: "top-right",
            glue: "after",
            theme: "default",
            themeState: "highlight",
            corners: "10px",
            check: 250,
            life: 3e3,
            closeDuration: "normal",
            openDuration: "normal",
            easing: "swing",
            closer: !0,
            closeTemplate: "&times;",
            closerTemplate: "<div>[ close all ]</div>",
            log: function() {},
            beforeOpen: function() {},
            afterOpen: function() {},
            open: function() {},
            beforeClose: function() {},
            close: function() {},
            animateOpen: {
                opacity: "show"
            },
            animateClose: {
                opacity: "hide"
            }
        },
        notifications: [],
        element: null,
        interval: null,
        create: function(b, c) {
            var d = a.extend({},
            this.defaults, c);
            "undefined" != typeof d.speed && (d.openDuration = d.speed, d.closeDuration = d.speed),
            this.notifications.push({
                message: b,
                options: d
            }),
            d.log.apply(this.element, [this.element, b, d])
        },
        render: function(b) {
            var c = this,
            d = b.message,
            e = b.options;
            e.themeState = "" === e.themeState ? "": "ui-state-" + e.themeState;
            var f = a("<div/>").addClass("jGrowl-notification " + e.themeState + " ui-corner-all" + (void 0 !== e.group && "" !== e.group ? " " + e.group: "")).append(a("<div/>").addClass("jGrowl-close").html(e.closeTemplate)).append(a("<div/>").addClass("jGrowl-header").html(e.header)).append(a("<div/>").addClass("jGrowl-message").html(d)).data("jGrowl", e).addClass(e.theme).children("div.jGrowl-close").bind("click.jGrowl",
            function() {
                a(this).parent().trigger("jGrowl.beforeClose")
            }).parent();
            a(f).bind("mouseover.jGrowl",
            function() {
                a("div.jGrowl-notification", c.element).data("jGrowl.pause", !0)
            }).bind("mouseout.jGrowl",
            function() {
                a("div.jGrowl-notification", c.element).data("jGrowl.pause", !1)
            }).bind("jGrowl.beforeOpen",
            function() {
                e.beforeOpen.apply(f, [f, d, e, c.element]) !== !1 && a(this).trigger("jGrowl.open")
            }).bind("jGrowl.open",
            function() {
                e.open.apply(f, [f, d, e, c.element]) !== !1 && ("after" == e.glue ? a("div.jGrowl-notification:last", c.element).after(f) : a("div.jGrowl-notification:first", c.element).before(f), a(this).animate(e.animateOpen, e.openDuration, e.easing,
                function() {
                    a.support.opacity === !1 && this.style.removeAttribute("filter"),
                    null !== a(this).data("jGrowl") && (a(this).data("jGrowl").created = new Date),
                    a(this).trigger("jGrowl.afterOpen")
                }))
            }).bind("jGrowl.afterOpen",
            function() {
                e.afterOpen.apply(f, [f, d, e, c.element])
            }).bind("jGrowl.beforeClose",
            function() {
                e.beforeClose.apply(f, [f, d, e, c.element]) !== !1 && a(this).trigger("jGrowl.close")
            }).bind("jGrowl.close",
            function() {
                a(this).data("jGrowl.pause", !0),
                a(this).animate(e.animateClose, e.closeDuration, e.easing,
                function() {
                    a.isFunction(e.close) ? e.close.apply(f, [f, d, e, c.element]) !== !1 && a(this).remove() : a(this).remove()
                })
            }).trigger("jGrowl.beforeOpen"),
            "" !== e.corners && void 0 !== a.fn.corner && a(f).corner(e.corners),
            a("div.jGrowl-notification:parent", c.element).size() > 1 && 0 === a("div.jGrowl-closer", c.element).size() && this.defaults.closer !== !1 && a(this.defaults.closerTemplate).addClass("jGrowl-closer " + this.defaults.themeState + " ui-corner-all").addClass(this.defaults.theme).appendTo(c.element).animate(this.defaults.animateOpen, this.defaults.speed, this.defaults.easing).bind("click.jGrowl",
            function() {
                a(this).siblings().trigger("jGrowl.beforeClose"),
                a.isFunction(c.defaults.closer) && c.defaults.closer.apply(a(this).parent()[0], [a(this).parent()[0]])
            })
        },
        update: function() {
            a(this.element).find("div.jGrowl-notification:parent").each(function() {
                void 0 !== a(this).data("jGrowl") && void 0 !== a(this).data("jGrowl").created && a(this).data("jGrowl").created.getTime() + parseInt(a(this).data("jGrowl").life, 10) < (new Date).getTime() && a(this).data("jGrowl").sticky !== !0 && (void 0 === a(this).data("jGrowl.pause") || a(this).data("jGrowl.pause") !== !0) && a(this).trigger("jGrowl.beforeClose")
            }),
            this.notifications.length > 0 && (0 === this.defaults.pool || a(this.element).find("div.jGrowl-notification:parent").size() < this.defaults.pool) && this.render(this.notifications.shift()),
            a(this.element).find("div.jGrowl-notification:parent").size() < 2 && a(this.element).find("div.jGrowl-closer").animate(this.defaults.animateClose, this.defaults.speed, this.defaults.easing,
            function() {
                a(this).remove()
            })
        },
        startup: function(c) {
            this.element = a(c).addClass("jGrowl").append('<div class="jGrowl-notification"></div>'),
            this.interval = setInterval(function() {
                a(c).data("jGrowl.instance").update()
            },
            parseInt(this.defaults.check, 10)),
            b && a(this.element).addClass("ie6")
        },
        shutdown: function() {
            a(this.element).removeClass("jGrowl").find("div.jGrowl-notification").trigger("jGrowl.close").parent().empty(),
            clearInterval(this.interval)
        },
        close: function() {
            a(this.element).find("div.jGrowl-notification").each(function() {
                a(this).trigger("jGrowl.beforeClose")
            })
        }
    }),
    a.jGrowl.defaults = a.fn.jGrowl.prototype.defaults
} (jQuery);;

var swfu_array = [];
var ckeditors = {};
var swfu_array = [];
var last_open_dialog = null;
var jqgrid_scrollOffset = null;
var form_submit_flag_for_swfupload = false;
var form_submit_obj_for_swfupload = null;
function singleSubmitDigg(model, data_id, question_id, option_id, callback) {
    var postdata = {
        model: model,
        data_id: data_id
    };
    postdata['options[' + question_id + '][' + option_id + ']'] = 1;
    $.ajax({
        type: 'post',
        url: BASEURL + '/appraiseresults/singlesubmit',
        data: postdata,
        success: function(data) {
            if (data.error) {
                alert(data.error);
                return false;
            }
            if (typeof(callback) == 'function') {
                var obj = callback(data);
            }
        },
        dataType: 'json'
    });
    return false;
}
function setDiggNum(data, total) {
    var id = '#Digg-' + data.model + '-' + data.data_id + '-' + data.question_id + '-' + data.option_id;
    $(id).html('(' + data.value + ')');
    if (total) {
        var bar = '#Diggbar-' + data.model + '-' + data.data_id + '-' + data.question_id + '-' + data.option_id;
        var p = data.value / total * 100;
        $(bar).attr("width", p);
    } else {
        var bar = '#Diggbar-' + data.model + '-' + data.data_id + '-' + data.question_id + '-' + data.option_id;
        if ($(bar).size() > 0) {
            var total = 0;
            $("[id^='Digg-" + data.model + "-" + data.data_id + "-']").each(function() {
                var num = $(this).html();
                num = num.replace(/\(|\)/g, '');
                total += parseInt(num);
            });
            $("[id^='Diggbar-" + data.model + "-" + data.data_id + "-']").each(function() {
                var numid = this.id.replace(/Diggbar-/, 'Digg-');
                var num = $('#' + numid).html();
                num = num.replace(/\(|\)/g, '');
                var height = parseInt(num);
                var p = height / total * 100;
                $('span', this).css("width", p);
                $(this).next().html(p.toFixed(2) + '%');
            });
        }
    }
}
var rs_callbacks = {
    loginSucess: function(request) {
        if (request.success) {
            publishController.close_dialog();
            if (sso.form) {
                $(sso.form).trigger("submit");
                sso.form = null;
            }
            if (sso.callback) {
                sso.callback.apply(sso.callback, sso.callback_args);
            }
            if (request.userinfo && request.userinfo.session_flash) {
                showSuccessMessage(request.success + request.userinfo.session_flash);
            }
        }
    },
    addtoCart: function(request) {
        $('#shopping-cart-num').html(request.total);
    },
    deleteFromCart: function(request) {},
    deleteGridRow: function(request, obj) {
        $(obj).closest('tr.jqgrow').remove();
    },
    reloadGrid: function(request, obj) {
        var grid = $(obj).closest('table.jqgrid-list').remove();
        var page = grid.jqGrid("getGridParam", "page");
        grid.jqGrid("setGridParam", {
            page: page
        }).trigger("reloadGrid");
    }
};
function ajaxAction(url, postdata, form, callback_func_name, moreags) {
    if (url.search(/\?/) != -1) {
        url += '&inajax=1';
    } else {
        url += '?inajax=1';
    }
    if (form) {
        $(':submit', form).each(function() {
            var html = $(this).html();
            $(this).data('html', html).html('<img src="' + BASEURL + '/img/ajax/circle_ball.gif"> ' + html).attr('disabled', 'disabled');
        });
    }
    $.ajax({
        type: 'post',
        url: url,
        data: postdata,
        complete: function(XMLHttpRequest, textStatus) {
            if (form) {
                $(':submit', form).each(function() {
                    var html = $(this).data('html');
                    $(this).html(html).removeAttr('disabled');
                })
            }
        },
        success: function(request) {
            if (form) {
                $(':submit', form).each(function() {
                    var html = $(this).data('html');
                    $(this).html(html).removeAttr('disabled');
                })
            }
            if (typeof(callback_func_name) == 'function') {
                callback_func_name(request);
            } else if (callback_func_name && rs_callbacks[callback_func_name]) {
                var func = rs_callbacks[callback_func_name];
                if (moreags) {
                    func(request, moreags);
                } else {
                    func(request);
                }
            }
            if (request.success) {
                showSuccessMessage(request.success);
            } else if (request.error && !request.tasks) {
                showErrorMessage(request.error);
                var errorinfo = '';
                for (var i in request) {
                    errorinfo += "<span class='ui-state-error ui-corner-all'><span class='ui-icon ui-icon-alert'></span>" + request[i] + "</span>";
                }
            }
            if (request.tasks) {
                $(request.tasks).each(function(i) {
                    var task = request.tasks[i];
                    if (task.dotype == "html") {
                        if ($(task.selector, form).size()) {
                            $(task.selector, form).html(task.content).show();
                        } else {
                            $(task.selector).html(task.content).show();
                        }
                    } else if (task.dotype == "value") {
                        if ($(task.selector, form).size()) {
                            $(task.selector, form).val(task.content);
                        } else {
                            $(task.selector).val(task.content);
                        }
                    } else if (task.dotype == "append") {
                        $(task.content).appendTo(task.selector);
                    } else if (task.dotype == "dialog") {
                        $(task.content).appendTo(task.selector);
                    } else if (task.dotype == "location") {
                        window.location.href = task.url;
                    } else if (task.dotype == "reload") {
                        window.location.reload();
                    } else if (task.dotype == "callback") {
                        var callback = null,
                        thisArg = null;
                        eval("callback= " + task.callback + ";");
                        eval("thisArg= " + task.thisArg + ";");
                        var args = [];
                        for (var i in task.callback_args) {
                            args[args.length] = task.callback_args[i];
                        }
                        if (callback) {
                            callback.apply(thisArg, args);
                        }
                    }
                });
            }
        },
        dataType: "json"
    });
    return false;
}
function ajaxActionHtml(url, selector, callback) {
    $.ajax({
        async: true,
        type: 'get',
        url: url,
        success: function(data) {
            $(selector).html(data);
            if (typeof(callback) == 'function') {
                callback(selector);
            } else if (callback) {
                eval(callback);
            }
        },
        dataType: "html"
    });
}
function setCKEditorVal(form) {
    if (typeof(CKEDITOR) != 'undefined') {
        if (form) {
            $(form).find('textarea').each(function(i) {
                if (this.id && this.id != "") {
                    var oEditor = CKEDITOR.instances[this.id];
                    if (typeof(oEditor) != 'undefined') {
                        var content = oEditor.getData();
                        $(this).val(content);
                    }
                }
            });
        } else {
            $('form .wygiswys').find('textarea').each(function() {
                var oEditor = CKEDITOR.instances[this.id];
                if (typeof(oEditor) != 'undefined') {
                    var content = oEditor.getData();
                    $(this).val(content);
                }
            });
        }
    }
}
function ajaxSubmitForm(form, callback_func_name) {
    setCKEditorVal(form);
    ajaxAction(form.action, $(form).serialize(), form, callback_func_name);
    return false;
}
var sso = {
    usercookie: $.cookie('MIAOCMS[Auth][User]'),
    form: null,
    callback: null,
    callback_args: null,
    check_userlogin: function(params) {
        this.usercookie = $.cookie('MIAOCMS[Auth][User]');
        if (this.usercookie == null || this.usercookie == "" || typeof(this.usercookie) == 'undefined') {
            if (params && params.callback) {
                this.callback = params.callback;
            } else {
                this.callback = '';
            }
            if (params && params.form) {
                this.form = params.form;
            } else {
                this.form = null;
            }
            if (params && params.callback_args) {
                this.callback_args = params.callback_args;
            } else {
                this.callback_args = '';
            }
            publishController.open_dialog(BASEURL + '/users/login', {
                'title': $.jslanguage.needlogin,
                selector: '#login-form',
                width: 400
            });
            return false;
        }
        return true;
    },
    is_login: function() {
        this.usercookie = $.cookie('MIAOCMS[Auth][User]');
        if (this.usercookie == null || this.usercookie == "" || typeof(this.usercookie) == 'undefined') {
            return false;
        }
        return true;
    }
};
var publishController = {
    _crontroller: 'questions',
    dialogid: null,
    overlays: {},
    open_dialog: function(url, options, postdata) {
        var $dialog = this;
        if ($dialog.dialogid) {
            $('#' + $dialog.dialogid).modal('hide')
        }
        $dialog.dialogid = url.replace(/\/|\.|:|,| |\?|=|&/g, '_') + '-ajax—action';
        function dialog_loaded() {
            $('.nav-tabs a', '#' + $dialog.dialogid).click(function(e) {
                e.preventDefault();
                $(this).blur();
                $(this).tab('show');
            });
            $('.nav-tabs a:first', '#' + $dialog.dialogid).tab('show');
            $('.dropdown-toggle', '#' + $dialog.dialogid).dropdown();
            $('button', '#' + $dialog.dialogid).addClass('btn');
            $('#' + $dialog.dialogid).find('form').each(function() {
                if (typeof($(this).attr('onsubmit')) == "undefined") {
                    $(this).on('submit',
                    function() {
                        ajaxSubmitForm(this,
                        function(request) {
                            if (request.success) {
                                $('#' + $dialog.dialogid).modal('hide');
                            }
                        });
                        return false;
                    })
                }
            })
        }
        function load_url() {
            dialog_loaded();
            if (typeof(options.callback) == 'function') {
                options.callback($('#' + $dialog.dialogid));
            }
            $('#' + $dialog.dialogid).find('a').click(function() {
                var url = $(this).attr('href');
                var re = /^#/;
                if (typeof($(this).attr('onclick')) != "undefined" || (typeof($(this).attr('target')) != 'undefined') || re.test(url) || url.substr(0, 10).toLowerCase() == 'javascript') {
                    return true;
                }
                $('#' + $dialog.dialogid).find('.modal-body').load(url,
                function() {
                    dialog_loaded();
                });
                return false;
            });
        }
        if ($('#' + $dialog.dialogid).size() < 1) {
            $('<div  class="modal fade" id="' + $dialog.dialogid + '"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3 id="myModalLabel">' + options.title + '</h3></div><div class="modal-body">正在加载...</div></div></div></div>').appendTo('body');
        }
        if (postdata != null) {
            $.ajax({
                type: 'post',
                url: url,
                data: postdata,
                complete: function(XMLHttpRequest, textStatus) {},
                success: function(html) {
                    if (options.selector) {
                        $('#' + $dialog.dialogid).find('.modal-body').html($(html).find(options.selector).html());
                    } else {
                        $('#' + $dialog.dialogid).find('.modal-body').html(html);
                    }
                    load_url();
                },
                dataType: "html"
            });
        } else {
            if (options.selector) {
                var obj = $('#' + $dialog.dialogid).find('.modal-body').load(url + ' ' + options.selector, {},
                function() {
                    load_url();
                });
            } else {
                var obj = $('#' + $dialog.dialogid).find('.modal-body').load(url, {},
                function() {
                    load_url();
                });
            }
        }
        $('#' + $dialog.dialogid).modal('show');
        if (options.width) {
            $('#' + $dialog.dialogid + ' .modal-dialog').width(options.width);
        }
        return false;
    },
    load_url: function(url, selector) {
        var $dialog = this;
        var re = /^#/;
        if (re.test(url) || url.substr(0, 10).toLowerCase() == 'javascript') {
            return false;
        }
        if (selector) {
            url += ' ' + selector;
        }
        $('#' + $dialog.dialogid).load(url,
        function() {
            $('#' + $dialog.dialogid).find('a').click(function() {
                $dialog.load_url($(this).attr('href'));
                return false;
            });
            page_loaded();
        });
    },
    close_dialog: function() {
        if (this.dialogid) {
            $('#' + this.dialogid).modal('hide');
        }
    },
    open_html_dialog: function(dialogid) {
        this.dialogid = dialogid;
        $('#' + dialogid).modal('show');
    },
    invite_tabs: {}
};
function follow_wx(id) {
    var url = BASEURL + '/user_follows/follow/' + id;
    if (!sso.check_userlogin({
        "callback": follow_wx,
        "callback_args": arguments
    })) return false;
    publishController.open_dialog(url, {
        'title': 'Follow',
        width: 400
    });
    return false;
}
function addtofavor(model, id, obj, callback) {
    var url = BASEURL + '/favorites/add/';
    var postdata = {
        'data[Favorite][model]': model,
        'data[Favorite][data_id]': id
    };
    if (!sso.check_userlogin({
        "callback": addtofavor,
        "callback_args": arguments
    })) return false;
    var evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation();
    if (typeof(callback) == 'function') {
        ajaxAction(url, postdata, null, callback);
    } else {
        ajaxAction(url, postdata, null,
        function(request) {
            if (request.success) {
                if (obj) {
                    $(obj).attr('disabled', 'disabled').removeClass('text-primary').addClass('text-success');
                    if ($(obj).find('.fa-heart-o').size() > 0) {
                        $(obj).find('.fa-heart-o').removeClass('fa-heart-o').addClass('fa-heart');
                    }
                }
                var num_selector = '#Stats-' + request.data.model + '-' + request.data.data_id + '-favor_nums';
                if ($(num_selector).size() > 0) {
                    var num = $(num_selector).html();
                    num = num.replace(/\(|\)/g, '');
                    if (num == '') num = 0;
                    num = parseInt(num);
                    num++;
                    $(num_selector).html(num);
                }
            }
        });
    }
    return false;
}
function unfavorite(obj) {
    var evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation();
    if (!confirm($.jslanguage.cancel_fav_confirm)) {
        return false;
    }
    var url = $(obj).data('url');
    if (!sso.check_userlogin({
        "callback": unfavorite,
        "callback_args": arguments
    })) return false;
    ajaxAction(url, null, null,
    function(request) {
        if (request.success) {
            $(obj).attr('disabled', 'disabled');
            if ($(obj).find('.fa-heart').size() > 0) {
                $(obj).find('.fa-heart').removeClass('fa-heart').addClass('fa-heart-o');
            } else {
                $(obj).parents('li:first').remove();
            }
        }
    });
    return false;
}
function refreshfavorite(obj) {
    var evt = window.event || arguments.callee.caller.arguments[0];
    evt.stopPropagation();
    var url = $(obj).data('url');
    if (!sso.check_userlogin({
        "callback": refreshfavorite,
        "callback_args": arguments
    })) return false;
    ajaxAction(url, null, null,
    function(request) {
        if (request.ret == 0) {
            $(obj).parents('li:first').prependTo($(obj).parents('ul:first'));
        }
    });
    return false;
}
function addtoCart(id, num, model) {
    if (!model) {
        model = 'product';
    }
    var url = BASEURL + '/carts/add';
    var postdata = {
        'data[Cart][num]': num,
        'data[Cart][product_id]': id,
        'data[Cart][product_model]': model
    };
    if (!sso.check_userlogin({
        "callback": addtoCart,
        "callback_args": arguments
    })) return false;
    ajaxAction(url, postdata, null, 'addtoCart');
    return false;
}
function directBuy(id, num, model) {
    if (!model) {
        model = 'product';
    }
    var url = BASEURL + '/carts/add?redirect=/orders/info&ck_ids=' + id;
    var postdata = {
        'data[Cart][num]': num,
        'data[Cart][product_id]': id,
        'data[Cart][product_model]': model
    };
    if (!sso.check_userlogin({
        "callback": directBuy,
        "callback_args": arguments
    })) return false;
    ajaxAction(url, postdata, null,
    function() {
        location.href = BASEURL + '/orders/info';
    });
    return false;
}
function loadDiggData() {
    var models = [];
    var ids = {};
    $('.ui-dig-num').each(function(i) {
        var info = this.id.split('-');
        if ($.inArray(info[1], models) < 0) {
            models[models.length] = info[1];
        }
        if (!ids[info[1]]) {
            ids[info[1]] = [];
        }
        if ($.inArray(info[2], ids[info[1]]) < 0) {
            var id_length = ids[info[1]].length;
            ids[info[1]][id_length] = info[2];
        }
    });
    for (var i in models) {
        var model = models[i];
        var data_id = ids[models];
        loadModelDataDigg(model, data_id);
    }
}
function loadModelDataDigg(model, data_id) {
    $.ajax({
        type: 'get',
        url: BASEURL + '/appraiseresults/getdigdata',
        data: {
            'model': model,
            'data_id': data_id
        },
        success: function(data) {
            for (var i in data) {
                setDiggNum(data[i]['Appraiseresult']);
            }
        },
        dataType: 'json'
    });
}
function loadStatsData() {
    var models = [];
    var ids = {};
    $('.ui-stats-num').each(function(i) {
        var s = this.id;
        var info = s.split('-');
        if ($.inArray(info[1], models) < 0) {
            models[models.length] = info[1];
        }
        if (!ids[info[1]]) {
            ids[info[1]] = [];
        }
        if ($.inArray(info[2], ids[info[1]]) < 0) {
            var id_length = ids[info[1]].length;
            ids[info[1]][id_length] = info[2];
        }
    });
	/*
    for (var i in models) {
        var model = models[i];
        var data_id = ids[model];
        if (model && model != "") {
            loadModelDataStats(model, data_id);
        }
    }*/
}
/*
function loadModelDataStats(model, data_id) {
    $.ajax({
        type: 'get',
        url: BASEURL + '/stats_days/getdata',
        data: {
            'model': model,
            'data_id': data_id
        },
        success: function(data) {
            for (var i in data) {
                setStatsNum(data[i]['StatsDay']);
            }
        },
        dataType: 'json'
    });
}*/
function setStatsNum(data) {
    if (parseInt(data.favor_nums) > 0) {
        var id = '#Stats-' + data.model + '-' + data.data_id + '-favor_nums';
        setQuoteNum(id, data.favor_nums);
    }
    if (parseInt(data.comment_nums) > 0) {
        var id = '#Stats-' + data.model + '-' + data.data_id + '-comment_nums';
        setQuoteNum(id, data.comment_nums);
    }
    if (parseInt(data.view_nums) > 0) {
        var id = '#Stats-' + data.model + '-' + data.data_id + '-view_nums';
        setQuoteNum(id, data.view_nums);
    }
}
function setQuoteNum(select, value) {
    if ($(select).size() > 0) {
        var num = $(select).eq(0).html();
        num = num.replace(/&nbsp;| /g, '');
        num = num.replace(/\(|\)/g, '');
        if (num == '') num = 0;
        num = parseInt(num);
        num = num + parseInt(value);
        $(select).html(num);
    }
}
function loadModelDataMood(model, data_id) {
    $.ajax({
        type: 'get',
        url: BASEURL + '/appraiseresults/getdigdata',
        data: {
            'model': model,
            'data_id': data_id
        },
        success: function(data) {
            var total = 0;
            for (var i in data) {
                if (data[i]['Appraiseresult'].question_id == 3) {
                    total += parseInt(data[i]['Appraiseresult'].value);
                }
            }
            for (var i in data) {
                setDiggNum(data[i]['Appraiseresult'], total);
            }
        },
        dataType: 'json'
    });
}
function loadComments(model, id) {
    $.get(BASEURL + '/comments/get_comments_data/' + model + '/' + id, {},
    function(comments) {
        var current = null;
        var commentstarget = '.comments-' + model + '-' + id;
        $(commentstarget).html('');
        for (var i = 0; i < comments.length; i++) {
            current = comments[i].Comment;
            var comment_html = '<li><span class="t">' + current.name + '  ' + current.created + '</span><p>' + current.body + '</p><li>';
            $(commentstarget).append(comment_html);
        }
    },
    "json");
}
function loadMoodDigg(model, id) {
    $.get(BASEURL + '/appraises/load/3/' + id + '/' + model + '?inajax=1', {},
    function(MoodData) {
        $('#mood-' + model + '-' + id).html(MoodData);
    },
    "html");
}
var page_hash = {
    storedHash: '',
    currentTabHash: '',
    cache: '',
    interval: null,
    listen: true,
    startListening: function() {
        setTimeout(function() {
            page_hash.listen = true;
        },
        600);
    },
    stopListening: function() {
        page_hash.listen = false;
    },
    checkHashChange: function() {
        var locStr = page_hash.currHash();
        if (page_hash.storedHash != locStr) {
            if (page_hash.listen == true) page_hash.refreshToHash();
            page_hash.storedHash = locStr;
        }
        if (!page_hash.interval) page_hash.interval = setInterval(page_hash.checkHashChange, 500);
    },
    refreshToHash: function(locStr) {
        if (locStr) var newHash = true;
        locStr = locStr || page_hash.currHash();
        var hash_array = locStr.split('&');
        for (var i in hash_array) {
            var pageinfo = hash_array[i].split('=');
            if (pageinfo[0] && pageinfo[1] && pageinfo[0].substr(0, 5) == 'page_') {
                var portletid = pageinfo[0].replace('page_', '');
                var page = pageinfo[1];
                $('.page_' + page, '#' + portletid).trigger('click');
            }
        }
        if (newHash) {
            page_hash.updateHash(locStr, true);
        }
    },
    updateHash: function(locStr, ignore) {
        if (ignore == true) {
            page_hash.stopListening();
        }
        window.location.hash = locStr;
        if (ignore == true) {
            page_hash.storedHash = locStr;
            page_hash.startListening();
        }
    },
    clean: function(locStr) {
        return locStr.replace(/%23/g, "").replace(/[\?#]+/g, "");
    },
    currHash: function() {
        return page_hash.clean(window.location.hash);
    },
    currSearch: function() {
        return page_hash.clean(window.location.search);
    },
    init: function() {
        page_hash.storedHash = '';
        page_hash.checkHashChange();
    }
};
function Html5Uploadfile(file_id) {
    this.file_input = null;
    var uploading_id = file_id + randomString(10);
    this.upload = function(file_input, options) {
        this.file_input = file_input;
        var file = file_input.files[0];
        if (file) {
            var fileSize = 0;
            if (file.size > 1024 * 1024) fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            else fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            var fd = new FormData();
            fd.append("file_post_name", options.file_post_name);
            fd.append("file_model_name", options.file_model_name);
            fd.append("no_db", options.no_db);
            fd.append("data_id", options.data_id);
            fd.append("item_css", options.item_css);
            fd.append("save_folder", options.save_folder);
            fd.append("return_type", options.return_type);
            fd.append(options.file_post_name, file);
            this.uploading_files[options.file_post_name] = {};
            this.uploading_files[options.file_post_name][file.name] = true;
            var append_html = '<div id="' + uploading_id + '-status" class="uploading-item clearfix"><span class="filename">' + file.name + '</span> <div class="progress pull-left" style="width:200px;">' + '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:0%">' + '<span class="sr-only">0%</span>' + '</div></div> </div>';
            $(file_input).after(append_html);
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", this.uploadProgress, false);
            xhr.addEventListener("load", this.uploadComplete, false);
            xhr.addEventListener("error", this.uploadFailed, false);
            xhr.addEventListener("abort", this.uploadCanceled, false);
            xhr.open("POST", options.upload_url);
            xhr.send(fd);
        }
    },
    this.uploading_files = {},
    this.check_upload = function() {
        return false;
    },
    this.uploadProgress = function(evt) {
        if (evt.lengthComputable) {
            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
            $('#' + uploading_id + '-status').find('.progress-bar').css('width', percentComplete.toString() + '%');
        } else {
            alert('Unable to compute.Please retry.');
        }
    },
    this.uploadComplete = function(evt) {
        var data = eval('(' + evt.target.responseText + ')');
        $('#fileuploadinfo_' + data.fieldname).append(data.message);
        $('#' + uploading_id + '-status').fadeOut("slow").remove();
    },
    this.uploadFailed = function(evt) {
        alert("There was an error attempting to upload the file.");
    },
    this.uploadCanceled = function(evt) {
        alert("The upload has been canceled by the user or the browser dropped the connection.");
    };
}
function debug_object(obj) {
    var str = '';
    for (var i in obj) {
        str += i + '=' + obj[i] + ";\t";
    }
    $('body').append('<hr/>' + str);
}
function getAvatarUrl(uid) {
    return BASEURL + '/files/avatar/' + parseInt(uid / 1000 % 1000) + '/' + parseInt(uid % 1000) + '/' + uid + '_0.jpg';
}
$(function() {
    $('.nav .dropdown,.navbar-nav .dropdown,header .dropdown').hover(function(e) {
        $(this).addClass('open');
    },
    function() {
        $(this).removeClass('open');
    }).click(function(e) {
        e.stopPropagation();
    });
    if ($.fn.validate) {
        jQuery.validator.addMethod("biggerThen",
        function(value, element) {
            var biggerThan = $(element).attr('biggerThen');
            var type = $(element).data('type');
            if (type == 'string') {
                return value > $(biggerThan).val();
            } else {
                return parseInt(value) > parseInt($(biggerThan).val());
            }
        },
        "Please check the value is in the right range");
        $('form').each(function() {
            validateForm(this);
        })
    }
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('.delete-pop').on('shown.bs.popover',
    function() {
        var $this = $(this);
        $('.popover-content').html('<div class="popover_inner"> <div class="jsPopOverContent">确定删除此内容吗？    </div>' + ' <div class="popover_bar"><a href="javascript:;" class="btn btn-primary pop-comfirm">确定</a>&nbsp;<a href="javascript:;" class="btn btn-default pop-cancel">取消</a></div>' + '</div>');
        $('.popover-content').find('.pop-cancel').click(function() {
            $this.popover('hide');
        });
        $('.popover-content').find('.pop-comfirm').click(function() {
            $this.popover('hide');
            ajaxAction($this.data('url'), null, null,
            function(request) {
                if (request.success || request.ret == 0) {
                    $this.parents('.appmsg:first').remove();
                }
            });
        })
    });
    $("div#ajaxestatus").ajaxStart(function() {
        $(this).show();
    }).ajaxStop(function() {
        $(this).hide();
    });
    $(document).on('click.bs.collapse.data-api', '.collapse-itemmenu > a',
    function(e) {
        var $this = $(this);
        e.preventDefault();
        $this.parents('.collapse-itemmenu:first').toggleClass('open');
        if ($this.find('.glyphicon-plus').size() > 0) {
            $this.find('.glyphicon-plus').addClass('glyphicon-minus').removeClass('glyphicon-plus');
        } else {
            $this.find('.glyphicon-minus').addClass('glyphicon-plus').removeClass('glyphicon-minus');
        }
    });
    $('.collapse-menu > li.open').each(function() {
        $(this).find('a:first>.glyphicon-plus').addClass('glyphicon-minus').removeClass('glyphicon-plus');
    });
    $(document).on('click', '.upload-fileitem .remove',
    function() {
        if (!confirm('Are you sure to delete this file.')) {
            return false;
        }
        var $this = $(this);
        var data_id = $(this).data('id');
        $.ajax({
            type: 'post',
            url: BASEURL + '/uploadfiles/delete',
            data: {
                id: data_id
            },
            success: function(data) {
                if (data.error) {
                    alert(data.error);
                    return false;
                } else {
                    $this.parents('.upload-fileitem:first').remove();
                }
            },
            dataType: 'json'
        });
    });
    loadStatsData();
});
function getUnreadMsgNum() {
    $.ajax({
        type: 'get',
        url: BASEURL + '/shortmessages/unreadnum/',
        success: function(data) {
            var num = parseInt(data);
            if (num > 0) {
                $('.user-unread-msgnum').html(data).show();
            }
        },
        dataType: 'html'
    });
}
var stack_custom = {
    "dir1": "right",
    "dir2": "down"
};
function validateForm(form) {
    if (typeof($(form).data('noajax')) != 'undefined' || typeof($(form).attr('target')) != 'undefined' || $(form).attr('method') == 'get' || $(form).attr('method') == 'GET') {
        return true;
    }
    var validator = $(form).validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: true,
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success: function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function(error, element) {
            element.parent('div').append(error);
        },
        submitHandler: function(form) {
            if ($(form).validate().form()) {
                if (typeof($(form).data('noajax')) != 'undefined' || typeof($(form).attr('target')) != 'undefined' || $(form).attr('method') == 'get' || $(form).attr('method') == 'GET') {
                    return true;
                } else {
                    ajaxSubmitForm(form);
                }
            }
        }
    });
    return validator;
}
function randomString(len) {
    len = len || 8;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
function substr(str, start, len) {
    var i = 0,
    allBMP = true,
    es = 0,
    el = 0,
    se = 0,
    ret = '';
    str += '';
    var end = str.length;
    this.php_js = this.php_js || {};
    this.php_js.ini = this.php_js.ini || {};
    switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
    case 'on':
        for (i = 0; i < str.length; i++) {
            if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                allBMP = false;
                break;
            }
        }
        if (!allBMP) {
            if (start < 0) {
                for (i = end - 1, es = (start += end); i >= es; i--) {
                    if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                        start--;
                        es--;
                    }
                }
            } else {
                var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
                while ((surrogatePairs.exec(str)) != null) {
                    var li = surrogatePairs.lastIndex;
                    if (li - 2 < start) {
                        start++;
                    } else {
                        break;
                    }
                }
            }
            if (start >= end || start < 0) {
                return false;
            }
            if (len < 0) {
                for (i = end - 1, el = (end += len); i >= el; i--) {
                    if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
                        end--;
                        el--;
                    }
                }
                if (start > end) {
                    return false;
                }
                return str.slice(start, end);
            } else {
                se = start + len;
                for (i = start; i < se; i++) {
                    ret += str.charAt(i);
                    if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
                        se++;
                    }
                }
                return ret;
            }
            break;
        }
    case 'off':
    default:
        if (start < 0) {
            start += end;
        }
        end = typeof len === 'undefined' ? end: (len < 0 ? len + end: len + start);
        return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
    }
    return undefined;
};

UE.plugins["section135"] = function() {
    var me = this,
    editor = this;
    var utils = baidu.editor.utils,
    Popup = baidu.editor.ui.Popup,
    Stateful = baidu.editor.ui.Stateful,
    uiUtils = baidu.editor.ui.uiUtils,
    UIBase = baidu.editor.ui.UIBase;
    var domUtils = baidu.editor.dom.domUtils;
    var _135BgDialog = new UE.ui.Dialog({
        iframeUrl: (editor.options.UEDITOR_HOME_URL + 'dialogs/135bg/135BgDialog.html'),
        editor: me,
        name: '135BgDialog',
        title: "背景图设置",
        cssRules: "width:600px;height:300px;",
        buttons: [{
            className: 'edui-okbutton',
            label: '确定',
            onclick: function() {
                _135BgDialog.close(true);
            }
        },
        {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function() {
                _135BgDialog.close(false);
            }
        }]
    });
    var _135BdBgDialog = new UE.ui.Dialog({
        iframeUrl: (editor.options.UEDITOR_HOME_URL + 'dialogs/135bg/135BdBgDialog.html'),
        editor: me,
        name: '135BdBgDialog',
        title: "边框底纹设置",
        cssRules: "width:600px;height:300px;",
        buttons: [{
            className: 'edui-okbutton',
            label: '确定',
            onclick: function() {
                _135BgDialog.close(true);
            }
        },
        {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function() {
                _135BgDialog.close(false);
            }
        }]
    });
    var clickPop = new baidu.editor.ui.Popup({
        content: "",
        editor: me,
        _remove: function() {
            $(clickPop.anchorEl).remove();
            clickPop.hide();
        },
        _copy: function() {
            $(clickPop.anchorEl).prop('outerHTML');
            clickPop.hide();
        },
        select: function() {
            var range = current_editor.selection.getRange();
            range.selectNode(clickPop.anchorEl);
            range.select();
        },
        _blank: function() {
            $('<p><br/></p>').insertAfter(clickPop.anchorEl);
            clickPop.hide();
        },
        _135bg: function() {
            _135BgDialog.render();
            _135BgDialog.open();
            _135BgDialog.anchorEl = clickPop.anchorEl;
        },
        _135item: null,
        className: 'edui-bubble'
    });
    me.addListener('ready',
    function(editor) {
        var editor_document = me.selection.document;
        jQuery(editor_document).on('mousewheel', '.autonum',
        function(event) {
            if (event.deltaY < 0) {
                $(this).html(parseInt($(this).html()) - 1);
            } else {
                $(this).html(parseInt($(this).html()) + 1);
            }
            return false;
        });
        jQuery(editor_document).on('dblclick', 'img',
        function() {
            current_editor.ui._dialogs['insertimageDialog'] && current_editor.ui._dialogs['insertimageDialog'].open();
        });
        jQuery(editor_document).on('mouseover', '.135bg',
        function(evt) {
            jQuery(this).tooltip({
                'title': '点击样式底部操作按钮中的“背景图”更换背景图片'
            });
        });
    });
    me.addListener("click",
    function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        if (el.tagName == "IMG") {
            return;
        }
        if ($(el).parents('.135editor').size() > 0) {
            el = $(el).parents('.135editor:first').get(0);
            if (current_active_135item) {
                current_active_135item.removeAttr('style');
            }
            current_active_135item = $(el);
            current_active_135item.css({
                'border': '1px dotted rgb(218, 98, 71)',
                'padding': '2px'
            });
            clickPop.render();
            var html = clickPop.formatHtml('<nobr class="otf-poptools">' + '<span class="copy" stateful>' + '复制</span>' + '<span class="cut" stateful>' + '剪切</span>' + '<span class="select"  onclick="$$.select()" stateful>' + '选择</span>' + '<span class="_135bg hidden" onclick="$$._135bg()" stateful>' + '背景图</span>' + '<span class="_135bdbg hidden" onclick="$$._135bgbd()" stateful>' + '边框底纹</span>' + '<span onclick="$$._remove()" stateful>' + '删除</span>' + '<span onclick="$$._blank()" stateful>' + '其后插入空行</span>' + '</nobr>');
            var content = clickPop.getDom('content');
            content.innerHTML = html;
            if ($(el).find('.135bg').size()) {
                $(content).find('._135bg').removeClass('hidden');
            }
            clickPop.anchorEl = el;
            clickPop.showAnchor(clickPop.anchorEl);
            var client = new ZeroClipboard($(clickPop.getDom('content')).find('.copy'));
            client.on('ready',
            function(event) {
                client.on('copy',
                function(event) {
                    $(clickPop.anchorEl).removeAttr('style');
                    event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                    clickPop.hide();
                    showSuccessMessage("已成功复制到剪切板");
                });
            });
            var cut_client = new ZeroClipboard($(clickPop.getDom('content')).find('.cut'));
            cut_client.on('ready',
            function(event) {
                cut_client.on('copy',
                function(event) {
                    $(clickPop.anchorEl).removeAttr('style');
                    event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                    clickPop.hide();
                    $(clickPop.anchorEl).remove();
                    showSuccessMessage("已成功剪切到剪切板");
                });
            });
        } else {
            if (current_active_135item) {
                current_active_135item.removeAttr('style');
                current_active_135item = null;
            }
        }
    });
};

var setAmount = {
    min: 1,
    max: 999,
    reg: function(x) {
        return new RegExp("^[1-9]\\d*$").test(x);
    },
    amount: function(obj, mode) {
        var x = $(obj).val();
        if (this.reg(x)) {
            if (mode) {
                x++;
            } else {
                x--;
            }
        } else {
            alert("请输入正确的数量！");
            $(obj).val(1);
            $(obj).focus();
        }
        return x;
    },
    reduce: function(obj) {
        var x = this.amount(obj, false);
        if (x >= this.min) {
            $(obj).val(x);
        } else {
            alert("商品数量最少为" + this.min);
            $(obj).val(1);
            $(obj).focus();
        }
    },
    add: function(obj) {
        var x = this.amount(obj, true);
        if (x <= this.max) {
            $(obj).val(x);
        } else {
            alert("商品数量最多为" + this.max);
            $(obj).val(999);
            $(obj).focus();
        }
    },
    modify: function(obj) {
        var x = $(obj).val();
        if (x < this.min || x > this.max || !this.reg(x)) {
            alert("请输入正确的数量！");
            $(obj).val(1);
            $(obj).focus();
        }
    }
};
function showSuccessMessage(text) {
    if ($.fn.jGrowl) {
        $.jGrowl("<i class='glyphicon glyphicon-ok'></i> " + text, {
            theme: 'alert alert-success pull-left',
            closer: false,
            life: 2000,
            closerTemplate: '',
            themeState: '',
            position: 'top-right',
            closeTemplate: ''
        });
    } else {
        alert(text);
    }
    return true;
}
function showErrorMessage(text) {
    if ($.fn.jGrowl) {
        $.jGrowl("<i class='glyphicon glyphicon-remove'></i> " + text, {
            theme: 'alert alert-warning pull-left',
            position: 'center',
            closer: false,
            closerTemplate: '',
            life: 5000,
            themeState: '',
            closeTemplate: ''
        });
    } else {
        alert(text);
    }
    return true;
}
function page_loaded() {
    $('.popover-trigger').popover({
        trigger: "hover"
    });
    $('.ui-portlet-content').each(function() {
        if (jQuery.trim($(this).html()) == '') {
            $(this).parent('.ui-portlet').hide();
        }
    });
}
$(document).ready(function() {
    $('.popover-trigger').popover({
        trigger: "hover"
    });
    page_loaded();
});
function detectCapsLock(e, obj) {
    var valueCapsLock = e.keyCode ? e.keyCode: e.which;
    var valueShift = e.shiftKey ? e.shiftKey: (valueCapsLock == 16 ? true: false);
    obj.className = (valueCapsLock >= 65 && valueCapsLock <= 90 && !valueShift || valueCapsLock >= 97 && valueCapsLock <= 122 && valueShift) ? 'form-control clck txt': 'form-control txt';
    $(obj).blur(function() {
        $(this).className = 'form-control txt';
    });
}
function showValidateErrors(request, model, suffix) {
    var tempmodel = model;
    var field_name = '';
    var error_message = '';
    var firsterror = true;
    for (var i in request) {
        tempmodel = model;
        field_name = i;
        var split_str = i.split('.');
        if (split_str.length > 1) {
            tempmodel = split_str[0];
            field_name = split_str[1];
        }
        var field = field_name.replace(/\b\w+\b/g,
        function(word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        });
        field = field.replace(/\_\w/g,
        function(word) {
            return word.substring(1, 2).toUpperCase();
        });
        if (firsterror) {
            window.location.hash = '#' + tempmodel + field + suffix;
            firsterror = false;
        }
        $("#error_" + tempmodel + field + suffix).remove();
        $('#' + tempmodel + field + suffix).parent('div:first').append("<span id='error_" + tempmodel + field + suffix + "' name='error_" + tempmodel + field + suffix + "' class='ui-state-error ui-corner-all' style='position: absolute;'><span class='ui-icon ui-icon-alert'></span>" + request[i] + "</span>");
        var txt = $('label[for="' + tempmodel + field + suffix + '"]').html();
        error_message += txt + ':' + request[i] + "<br/>";
    }
    if (error_message != '') {
        show_message(error_message, 8);
    }
}
function addNewCrawlRegular() {
    var field = $('.model-schema-list').val();
    $('.model-schema-area').before($('<div class="regexp-add"><label for="CrawlRegexp' + field + '">Regexp ' + field + '</label><textarea id="CrawlRegexp' + field + '" cols="60" rows="2" name="data[Crawl][regexp_' + field + ']"></textarea></div>'));
}
var AjaxHelper = {
    dialog_open: false,
    open_help: function() {
        $('#ajax_doing_help').html('<img src="/img/ajax/circle_ball.gif" /> 正在提交...');
        $('#ajax_doing_help').dialog({
            width: 650,
            close: function(event, ui) {
                $('#invite-user-html').hide().appendTo('body');
            }
        });
        this.dialog_open = true;
    },
    has_init_tab: false,
    friends_tab: null
};
function showAlert(info, obj, infoSign) {
    if ($('#' + infoSign).size() > 0) {
        return;
    }
    var newd = document.createElement("span");
    newd.id = infoSign;
    newd.className = 'ui-state-error';
    newd.innerHTML = info;
    $(obj).append($(newd));
}
function removeAlert(infoSign) {
    $(infoSign).remove();
}
function clearSubmitError(obj) {
    $(obj).parent().find('.errorInfo').remove();
}
function clearWaitInfo(obj) {
    if (obj) {
        $(obj).parent().find('.waitInfo').remove();
    } else {
        $(".waitInfo").remove();
    }
}
function showWaitInfo(info, obj) {
    try {
        if (obj == null) return;
        clearWaitInfo();
        var newd = document.createElement("span");
        newd.className = 'waitInfo';
        newd.id = 'waitInfo';
        newd.innerHTML = info;
        obj.parentNode.appendChild(newd);
    } catch(e) {}
}
function showWaitInfoOnInner(info, obj) {
    try {
        if (obj == null) return;
        clearWaitInfo();
        var newd = document.createElement("span");
        newd.className = 'waitInfo';
        newd.id = 'waitInfo';
        newd.innerHTML = info;
        obj.innerHTML = '';
        obj.appendChild(newd);
    } catch(e) {}
}
function upload_multi_file(file, serverData) {
    try {
        var progress = progress_list[file.id];
        progress.setComplete();
        if (serverData === " ") {
            this.customSettings.upload_successful = false;
        } else {
            var data = eval("(" + serverData + ")");
            if (data.status == 1) {
                this.customSettings.upload_successful = true;
                var filesize = '';
                if (data.size / 1024 / 1024 > 1) {
                    filesize = Math.round(data.size / 1024 / 1024 * 100) / 100 + 'MB';
                } else if (data.size / 1024 > 1) {
                    filesize = Math.round(data.size / 1024 * 100) / 100 + 'KB';
                } else {
                    filesize = data.size + 'B';
                }
                $("#fileuploadinfo_" + data.fieldname + "_" + data.data_id).append('<div class="col-md-4  upload-fileitem">' + ' <a target="_blank" href="' + BASEURL + '/uploadfiles/download/' + data.id + '" class="btn btn-success "><i class="glyphicon glyphicon-cloud-download"></i><div>' + data.name + '</div><small>File Size: ' + filesize + '</small></a>' + '<i class="glyphicon glyphicon-remove remove" data-id="' + data.data_id + '" title="Remove"></i>' + '</div>');
            }
        }
    } catch(e) {
        alert(serverData);
    }
}
$(function() {
    $('.ui-navi li').hover(function() {
        $(this).children(".ui-drop-menu:first").show();
    },
    function() {
        $(this).children(".ui-drop-menu:first").hide();
    });
    if (sso.is_login()) {
        getUnreadMsgNum();
    }
    $(".ui-sidemenu li").hover(function() {
        var li_width = $(this).width();
        var li_offset = $(this).offset();
        $(this).children("a").addClass("ui-state-default");
        var submenu = $(this).children(".ui-secondmenu");
        if (li_offset.left > $(window).width() / 2) {
            submenu.css('left', -submenu.width() + 2).show();
        } else {
            submenu.css('left', li_width - 2).show();
        }
        var offset = submenu.offset();
        if (li_offset.top - $(window).scrollTop() + submenu.height() > $(window).height()) {
            if (submenu.height() < $(window).height()) {
                submenu.css('top', $(window).height() - 2 - li_offset.top - submenu.height() + $(window).scrollTop());
            } else {
                submenu.css('top', -li_offset.top + $(window).scrollTop() + 2);
            }
        }
    },
    function() {
        $(this).children("a").removeClass("ui-state-default");
        $(".ui-secondmenu", this).hide();
    });
}); (function($) {
    $.fn.UItoTop = function(options) {
        var defaults = {
            text: 'To Top',
            min: 200,
            inDelay: 600,
            outDelay: 400,
            containerID: 'toTop',
            containerHoverID: 'toTopHover',
            scrollSpeed: 1200,
            easingType: 'linear'
        },
        settings = $.extend(defaults, options),
        containerIDhash = '#' + settings.containerID,
        containerHoverIDHash = '#' + settings.containerHoverID;
        $('body').append('<a href="#" id="' + settings.containerID + '">' + settings.text + '</a>');
        $(containerIDhash).hide().on('click.UItoTop',
        function() {
            $('html, body').animate({
                scrollTop: 0
            },
            settings.scrollSpeed, settings.easingType);
            $('#' + settings.containerHoverID, this).stop().animate({
                'opacity': 0
            },
            settings.inDelay, settings.easingType);
            return false;
        }).prepend('<span id="' + settings.containerHoverID + '"></span>').hover(function() {
            $(containerHoverIDHash, this).stop().animate({
                'opacity': 1
            },
            600, 'linear');
        },
        function() {
            $(containerHoverIDHash, this).stop().animate({
                'opacity': 0
            },
            700, 'linear');
        });
        $(window).scroll(function() {
            var sd = $(window).scrollTop();
            if (typeof document.body.style.maxHeight === "undefined") {
                $(containerIDhash).css({
                    'position': 'absolute',
                    'top': sd + $(window).height() - 50
                });
            }
            if (sd > settings.min) $(containerIDhash).fadeIn(settings.inDelay);
            else $(containerIDhash).fadeOut(settings.Outdelay);
        });
    };
})(jQuery);
$(function() {
    $().UItoTop({
        easingType: 'easeOutQuart'
    });
});
/**!
 * MixItUp v2.0.6
 *
 * @copyright Copyright 2014 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!
function(a, b) {
    a.MixItUp = function() {
        var b = this;
        b._execAction("_constructor", 0),
        a.extend(b, {
            selectors: {
                target: ".mix",
                filter: ".filter",
                sort: ".sort"
            },
            animation: {
                enable: !0,
                effects: "fade scale",
                duration: 600,
                easing: "ease",
                perspectiveDistance: "3000",
                perspectiveOrigin: "50% 50%",
                queue: !0,
                queueLimit: 1,
                animateChangeLayout: !1,
                animateResizeContainer: !0,
                animateResizeTargets: !1,
                staggerSequence: !1,
                reverseOut: !1
            },
            callbacks: {
                onMixLoad: !1,
                onMixStart: !1,
                onMixBusy: !1,
                onMixEnd: !1,
                onMixFail: !1,
                _user: !1
            },
            controls: {
                enable: !0,
                live: !1,
                toggleFilterButtons: !1,
                toggleLogic: "or",
                activeClass: "active"
            },
            layout: {
                display: "inline-block",
                containerClass: "",
                containerClassFail: "fail"
            },
            load: {
                filter: "all",
                sort: !1
            },
            _$body: null,
            _$container: null,
            _$targets: null,
            _$parent: null,
            _$sortButtons: null,
            _$filterButtons: null,
            _suckMode: !1,
            _mixing: !1,
            _sorting: !1,
            _clicking: !1,
            _loading: !0,
            _changingLayout: !1,
            _changingClass: !1,
            _changingDisplay: !1,
            _origOrder: [],
            _startOrder: [],
            _newOrder: [],
            _activeFilter: null,
            _toggleArray: [],
            _toggleString: "",
            _activeSort: "default:asc",
            _newSort: null,
            _startHeight: null,
            _newHeight: null,
            _incPadding: !0,
            _newDisplay: null,
            _newClass: null,
            _targetsBound: 0,
            _targetsDone: 0,
            _queue: [],
            _$show: a(),
            _$hide: a()
        }),
        b._execAction("_constructor", 1)
    },
    a.MixItUp.prototype = {
        constructor: a.MixItUp,
        _instances: {},
        _actions: {},
        _filters: {},
        _init: function(b, c) {
            var d = this;
            if (d._execAction("_init", 0, arguments), c && a.extend(!0, d, c), d._$body = a("body"), d._domNode = b, d._$container = a(b), d._$container.addClass(d.layout.containerClass), d._id = b.id, d._platformDetect(), d._brake = d._getPrefixedCSS("transition", "none"), d._refresh(!0), d._$parent = d._$targets.parent().length ? d._$targets.parent() : d._$container, d.load.sort && (d._newSort = d._parseSort(d.load.sort), d._newSortString = d.load.sort, d._activeSort = d.load.sort, d._sort(), d._printSort()), d._activeFilter = "all" === d.load.filter ? d.selectors.target: "none" === d.load.filter ? "": d.load.filter, d.controls.enable && d._bindHandlers(), d.controls.toggleFilterButtons) {
                d._buildToggleArray();
                for (var e = 0; e < d._toggleArray.length; e++) d._updateControls({
                    filter: d._toggleArray[e],
                    sort: d._activeSort
                },
                !0)
            } else d.controls.enable && d._updateControls({
                filter: d._activeFilter,
                sort: d._activeSort
            });
            d._filter(),
            d._init = !0,
            d._$container.data("mixItUp", d),
            d._execAction("_init", 1, arguments),
            d._buildState(),
            d._$targets.css(d._brake),
            d._goMix(d.animation.enable)
        },
        _platformDetect: function() {
            var a = this,
            c = ["Webkit", "Moz", "O", "ms"],
            d = ["webkit", "moz"],
            e = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1,
            f = "undefined" != typeof InstallTrigger,
            g = function(a) {
                for (var b = 0; b < c.length; b++) if (c[b] + "Transition" in a.style) return {
                    prefix: "-" + c[b].toLowerCase() + "-",
                    vendor: c[b]
                };
                return "transition" in a.style ? "": !1
            },
            h = g(a._domNode);
            a._execAction("_platformDetect", 0),
            a._chrome = e ? parseInt(e[1], 10) : !1,
            a._ff = f ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : !1,
            a._prefix = h.prefix,
            a._vendor = h.vendor,
            a._suckMode = window.atob && a._prefix ? !1 : !0,
            a._suckMode && (a.animation.enable = !1),
            a._ff && a._ff <= 4 && (a.animation.enable = !1);
            for (var i = 0; i < d.length && !window.requestAnimationFrame; i++) window.requestAnimationFrame = window[d[i] + "RequestAnimationFrame"];
            "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ?
            function(a) {
                return a.__proto__
            }: function(a) {
                return a.constructor.prototype
            }),
            a._domNode.nextElementSibling === b && Object.defineProperty(Element.prototype, "nextElementSibling", {
                get: function() {
                    for (var a = this.nextSibling; a;) {
                        if (1 === a.nodeType) return a;
                        a = a.nextSibling
                    }
                    return null
                }
            }),
            a._execAction("_platformDetect", 1)
        },
        _refresh: function(a) {
            var c = this;
            c._execAction("_refresh", 0, arguments),
            c._$targets = c._$container.find(c.selectors.target);
            for (var d = 0; d < c._$targets.length; d++) {
                var e = c._$targets[d];
                if (e.dataset === b) {
                    e.dataset = {};
                    for (var f = 0; f < e.attributes.length; f++) {
                        var g = e.attributes[f],
                        h = g.name,
                        i = g.nodeValue;
                        if (h.indexOf("data-") > -1) {
                            var j = c._helpers._camelCase(h.substring(5, h.length));
                            e.dataset[j] = i
                        }
                    }
                }
                e.mixParent === b && (e.mixParent = c._id)
            }
            if (c._$targets.length && a || !c._origOrder.length && c._$targets.length) {
                c._origOrder = [];
                for (var d = 0; d < c._$targets.length; d++) {
                    var e = c._$targets[d];
                    c._origOrder.push(e)
                }
            }
            c._execAction("_refresh", 1, arguments)
        },
        _bindHandlers: function() {
            var b = this;
            b._execAction("_bindHandlers", 0),
            b.controls.live ? b._$body.on("click.mixItUp." + b._id, b.selectors.sort,
            function() {
                b._processClick(a(this), "sort")
            }).on("click.mixItUp." + b._id, b.selectors.filter,
            function() {
                b._processClick(a(this), "filter")
            }) : (b._$sortButtons = a(b.selectors.sort), b._$filterButtons = a(b.selectors.filter), b._$sortButtons.on("click.mixItUp." + b._id,
            function() {
                b._processClick(a(this), "sort")
            }), b._$filterButtons.on("click.mixItUp." + b._id,
            function() {
                b._processClick(a(this), "filter")
            })),
            b._execAction("_bindHandlers", 1)
        },
        _processClick: function(b, c) {
            var d = this;
            if (d._execAction("_processClick", 0, arguments), !d._mixing || d.animation.queue && d._queue.length < d.animation.queueLimit) {
                if (d._clicking = !0, "sort" === c) {
                    var e = b.attr("data-sort"); (!b.hasClass(d.controls.activeClass) || e.indexOf("random") > -1) && (a(d.selectors.sort).removeClass(d.controls.activeClass), b.addClass(d.controls.activeClass), d.sort(e))
                }
                if ("filter" === c) {
                    var f, g = b.attr("data-filter"),
                    h = "or" === d.controls.toggleLogic ? ",": "";
                    d.controls.toggleFilterButtons ? (d._buildToggleArray(), b.hasClass(d.controls.activeClass) ? (b.removeClass(d.controls.activeClass), f = d._toggleArray.indexOf(g), d._toggleArray.splice(f, 1)) : (b.addClass(d.controls.activeClass), d._toggleArray.push(g)), d._toggleArray = a.grep(d._toggleArray,
                    function(a) {
                        return a
                    }), d._toggleString = d._toggleArray.join(h), d.filter(d._toggleString)) : b.hasClass(d.controls.activeClass) || (a(d.selectors.filter).removeClass(d.controls.activeClass), b.addClass(d.controls.activeClass), d.filter(g))
                }
                d._execAction("_processClick", 1, arguments)
            } else "function" == typeof d.callbacks.onMixBusy && d.callbacks.onMixBusy.call(d._domNode, d._state, d),
            d._execAction("_processClickBusy", 1, arguments)
        },
        _buildToggleArray: function() {
            var a = this,
            b = a._activeFilter.replace(/\s/g, "");
            if (a._execAction("_buildToggleArray", 0, arguments), "or" === a.controls.toggleLogic) a._toggleArray = b.split(",");
            else {
                a._toggleArray = b.split("."),
                !a._toggleArray[0] && a._toggleArray.shift();
                for (var c, d = 0; c = a._toggleArray[d]; d++) a._toggleArray[d] = "." + c
            }
            a._execAction("_buildToggleArray", 1, arguments)
        },
        _updateControls: function(c, d) {
            var e = this,
            f = {
                filter: c.filter,
                sort: c.sort
            },
            g = function(a, b) {
                d && "filter" == h && "none" !== f.filter && "" !== f.filter ? a.filter(b).addClass(e.controls.activeClass) : a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)
            },
            h = "filter",
            i = null;
            e._execAction("_updateControls", 0, arguments),
            c.filter === b && (f.filter = e._activeFilter),
            c.sort === b && (f.sort = e._activeSort),
            f.filter === e.selectors.target && (f.filter = "all");
            for (var j = 0; 2 > j; j++) i = e.controls.live ? a(e.selectors[h]) : e["_$" + h + "Buttons"],
            i && g(i, "[data-" + h + '="' + f[h] + '"]'),
            h = "sort";
            e._execAction("_updateControls", 1, arguments)
        },
        _filter: function() {
            var b = this;
            b._execAction("_filter", 0);
            for (var c = 0; c < b._$targets.length; c++) {
                var d = a(b._$targets[c]);
                d.is(b._activeFilter) ? b._$show = b._$show.add(d) : b._$hide = b._$hide.add(d)
            }
            b._execAction("_filter", 1)
        },
        _sort: function() {
            var a = this,
            b = function(a) {
                for (var b = a.slice(), c = b.length, d = c; d--;) {
                    var e = parseInt(Math.random() * c),
                    f = b[d];
                    b[d] = b[e],
                    b[e] = f
                }
                return b
            };
            a._execAction("_sort", 0),
            a._startOrder = [];
            for (var c = 0; c < a._$targets.length; c++) {
                var d = a._$targets[c];
                a._startOrder.push(d)
            }
            switch (a._newSort[0].sortBy) {
            case "default":
                a._newOrder = a._origOrder;
                break;
            case "random":
                a._newOrder = b(a._startOrder);
                break;
            case "custom":
                a._newOrder = a._newSort[0].order;
                break;
            default:
                a._newOrder = a._startOrder.concat().sort(function(b, c) {
                    return a._compare(b, c)
                })
            }
            a._execAction("_sort", 1)
        },
        _compare: function(a, b, c) {
            c = c ? c: 0;
            var d = this,
            e = d._newSort[c].order,
            f = function(a) {
                return a.dataset[d._newSort[c].sortBy] || 0
            },
            g = isNaN(1 * f(a)) ? f(a).toLowerCase() : 1 * f(a),
            h = isNaN(1 * f(b)) ? f(b).toLowerCase() : 1 * f(b);
            return h > g ? "asc" == e ? -1 : 1 : g > h ? "asc" == e ? 1 : -1 : g == h && d._newSort.length > c + 1 ? d._compare(a, b, c + 1) : 0
        },
        _printSort: function(a) {
            var b = this,
            c = a ? b._startOrder: b._newOrder,
            d = b._$parent[0].querySelectorAll(b.selectors.target),
            e = d[d.length - 1].nextElementSibling,
            f = document.createDocumentFragment();
            b._execAction("_printSort", 0, arguments);
            for (var g = 0; g < d.length; g++) {
                var h = d[g],
                i = h.nextSibling;
                "absolute" !== h.style.position && (i && "#text" == i.nodeName && b._$parent[0].removeChild(i), b._$parent[0].removeChild(h))
            }
            for (var g = 0; g < c.length; g++) {
                var j = c[g];
                if ("default" != b._newSort[0].sortBy || "desc" != b._newSort[0].order || a) f.appendChild(j),
                f.appendChild(document.createTextNode(" "));
                else {
                    var k = f.firstChild;
                    f.insertBefore(j, k),
                    f.insertBefore(document.createTextNode(" "), j)
                }
            }
            e ? b._$parent[0].insertBefore(f, e) : b._$parent[0].appendChild(f),
            b._execAction("_printSort", 1, arguments)
        },
        _parseSort: function(a) {
            for (var b = this,
            c = "string" == typeof a ? a.split(" ") : [a], d = [], e = 0; e < c.length; e++) {
                var f = "string" == typeof a ? c[e].split(":") : ["custom", c[e]],
                g = {
                    sortBy: b._helpers._camelCase(f[0]),
                    order: f[1] || "asc"
                };
                if (d.push(g), "default" == g.sortBy || "random" == g.sortBy) break
            }
            return b._execFilter("_parseSort", d, arguments)
        },
        _parseEffects: function() {
            var a = this,
            b = {
                opacity: "",
                transformIn: "",
                transformOut: "",
                filter: ""
            },
            c = function(b, c) {
                if (a.animation.effects.indexOf(b) > -1) {
                    if (c) {
                        var d = a.animation.effects.indexOf(b + "(");
                        if (d > -1) {
                            var e = a.animation.effects.substring(d),
                            f = /\(([^)]+)\)/.exec(e),
                            g = f[1];
                            return {
                                val: g
                            }
                        }
                    }
                    return ! 0
                }
                return ! 1
            },
            d = function(a, b) {
                return b ? "-" === a.charAt(0) ? a.substr(1, a.length) : "-" + a: a
            },
            e = function(a, e) {
                for (var f = [["scale", ".01"], ["translateX", "20px"], ["translateY", "20px"], ["translateZ", "20px"], ["rotateX", "90deg"], ["rotateY", "90deg"], ["rotateZ", "180deg"]], g = 0; g < f.length; g++) {
                    var h = f[g][0],
                    i = f[g][1],
                    j = e && "scale" !== h;
                    b[a] += c(h) ? h + "(" + d(c(h, !0).val || i, j) + ") ": ""
                }
            };
            return b.opacity = c("fade") ? c("fade", !0).val || "0": "",
            e("transformIn"),
            a.animation.reverseOut ? e("transformOut", !0) : b.transformOut = b.transformIn,
            b.transition = {},
            b.transition = a._getPrefixedCSS("transition", "all " + a.animation.duration + "ms " + a.animation.easing + ", opacity " + a.animation.duration + "ms linear"),
            a.animation.stagger = c("stagger") ? !0 : !1,
            a.animation.staggerDuration = parseInt(c("stagger") ? c("stagger", !0).val ? c("stagger", !0).val: 100 : 100),
            a._execFilter("_parseEffects", b)
        },
        _buildState: function(a) {
            var b = this,
            c = {};
            return b._execAction("_buildState", 0),
            c = {
                activeFilter: "" === b._activeFilter ? "none": b._activeFilter,
                activeSort: b._activeSort,
                fail: !b._$show.length && "" !== b._activeFilter,
                $targets: b._$targets,
                $show: b._$show,
                $hide: b._$hide,
                totalTargets: b._$targets.length,
                totalShow: b._$show.length,
                totalHide: b._$hide.length,
                display: b.layout.display
            },
            b._execAction("_buildState", 1),
            a ? b._execFilter("_buildState", c) : (b._state = c, void 0)
        },
        _goMix: function(a) {
            var b = this,
            c = function() {
                b._chrome && 31 === b._chrome && f(b._$parent[0]),
                b._setInter(),
                d()
            },
            d = function() {
                var a = window.scrollY,
                c = window.scrollX,
                d = window.innerHeight;
                b._getInterMixData(),
                b._setFinal(),
                b._getFinalMixData(),
                a + d > window.innerHeight && window.scrollTo(c, a),
                b._prepTargets(),
                window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(function() {
                    e()
                },
                20)
            },
            e = function() {
                b._animateTargets(),
                0 === b._targetsBound && b._cleanUp()
            },
            f = function(a) {
                var b = a.parentElement,
                c = document.createElement("div"),
                d = document.createDocumentFragment();
                b.insertBefore(c, a),
                d.appendChild(a),
                b.replaceChild(a, c)
            },
            g = b._buildState(!0);
            b._execAction("_goMix", 0, arguments),
            !b.animation.duration && (a = !1),
            b._mixing = !0,
            b._$container.removeClass(b.layout.containerClassFail),
            "function" == typeof b.callbacks.onMixStart && b.callbacks.onMixStart.call(b._domNode, b._state, g, b),
            b._$container.trigger("mixStart", [b._state, g, b]),
            b._getOrigMixData(),
            a && !b._suckMode ? window.requestAnimationFrame ? requestAnimationFrame(c) : c() : b._cleanUp(),
            b._execAction("_goMix", 1, arguments)
        },
        _getTargetData: function(a, b) {
            var c, d = this;
            a.dataset[b + "PosX"] = a.offsetLeft,
            a.dataset[b + "PosY"] = a.offsetTop,
            d.animation.animateResizeTargets && (c = window.getComputedStyle(a), a.dataset[b + "MarginBottom"] = parseInt(c.marginBottom), a.dataset[b + "MarginRight"] = parseInt(c.marginRight), a.dataset[b + "Width"] = a.offsetWidth, a.dataset[b + "Height"] = a.offsetHeight)
        },
        _getOrigMixData: function() {
            var a = this,
            b = a._suckMode ? {
                boxSizing: ""
            }: window.getComputedStyle(a._$parent[0]),
            c = b.boxSizing || b[a._vendor + "BoxSizing"];
            a._incPadding = "border-box" === c,
            a._execAction("_getOrigMixData", 0),
            !a._suckMode && (a.effects = a._parseEffects()),
            a._$toHide = a._$hide.filter(":visible"),
            a._$toShow = a._$show.filter(":hidden"),
            a._$pre = a._$targets.filter(":visible"),
            a._startHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height();
            for (var d = 0; d < a._$pre.length; d++) {
                var e = a._$pre[d];
                a._getTargetData(e, "orig")
            }
            a._execAction("_getOrigMixData", 1)
        },
        _setInter: function() {
            var a = this;
            a._execAction("_setInter", 0),
            a._changingLayout && a.animation.animateChangeLayout ? (a._$toShow.css("display", a._newDisplay), a._changingClass && a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)) : a._$toShow.css("display", a.layout.display),
            a._execAction("_setInter", 1)
        },
        _getInterMixData: function() {
            var a = this;
            a._execAction("_getInterMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "inter")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "inter")
            }
            a._execAction("_getInterMixData", 1)
        },
        _setFinal: function() {
            var a = this;
            a._execAction("_setFinal", 0),
            a._sorting && a._printSort(),
            a._$toHide.removeStyle("display"),
            a._changingLayout && a.animation.animateChangeLayout && a._$pre.css("display", a._newDisplay),
            a._execAction("_setFinal", 1)
        },
        _getFinalMixData: function() {
            var a = this;
            a._execAction("_getFinalMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "final")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "final")
            }
            a._newHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height(),
            a._sorting && a._printSort(!0),
            a._$toShow.removeStyle("display"),
            a._$pre.css("display", a.layout.display),
            a._changingClass && a.animation.animateChangeLayout && a._$container.removeClass(a._newClass).addClass(a.layout.containerClass),
            a._execAction("_getFinalMixData", 1)
        },
        _prepTargets: function() {
            var b = this,
            c = {
                _in: b._getPrefixedCSS("transform", b.effects.transformIn),
                _out: b._getPrefixedCSS("transform", b.effects.transformOut)
            };
            b._execAction("_prepTargets", 0),
            b.animation.animateResizeContainer && b._$parent.css("height", b._startHeight + "px");
            for (var d = 0; d < b._$toShow.length; d++) {
                var e = b._$toShow[d],
                f = a(e);
                e.style.opacity = b.effects.opacity,
                e.style.display = b._changingLayout && b.animation.animateChangeLayout ? b._newDisplay: b.layout.display,
                f.css(c._in),
                b.animation.animateResizeTargets && (e.style.width = e.dataset.finalWidth + "px", e.style.height = e.dataset.finalHeight + "px", e.style.marginRight = -(e.dataset.finalWidth - e.dataset.interWidth) + 1 * e.dataset.finalMarginRight + "px", e.style.marginBottom = -(e.dataset.finalHeight - e.dataset.interHeight) + 1 * e.dataset.finalMarginBottom + "px")
            }
            for (var d = 0; d < b._$pre.length; d++) {
                var e = b._$pre[d],
                f = a(e),
                g = {
                    x: e.dataset.origPosX - e.dataset.interPosX,
                    y: e.dataset.origPosY - e.dataset.interPosY
                },
                c = b._getPrefixedCSS("transform", "translate(" + g.x + "px," + g.y + "px)");
                f.css(c),
                b.animation.animateResizeTargets && (e.style.width = e.dataset.origWidth + "px", e.style.height = e.dataset.origHeight + "px", e.dataset.origWidth - e.dataset.finalWidth && (e.style.marginRight = -(e.dataset.origWidth - e.dataset.interWidth) + 1 * e.dataset.origMarginRight + "px"), e.dataset.origHeight - e.dataset.finalHeight && (e.style.marginBottom = -(e.dataset.origHeight - e.dataset.interHeight) + 1 * e.dataset.origMarginBottom + "px"))
            }
            b._execAction("_prepTargets", 1)
        },
        _animateTargets: function() {
            var b = this;
            b._execAction("_animateTargets", 0),
            b._targetsDone = 0,
            b._targetsBound = 0,
            b._$parent.css(b._getPrefixedCSS("perspective", b.animation.perspectiveDistance + "px")).css(b._getPrefixedCSS("perspective-origin", b.animation.perspectiveOrigin)),
            b.animation.animateResizeContainer && b._$parent.css(b._getPrefixedCSS("transition", "height " + b.animation.duration + "ms ease")).css("height", b._newHeight + "px");
            for (var c = 0; c < b._$toShow.length; c++) {
                var d = b._$toShow[c],
                e = a(d),
                f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                },
                g = b._getDelay(c),
                h = {};
                d.style.opacity = "";
                for (var i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix: "";
                    b._ff && b._ff <= 20 && (h[j + "transition-property"] = "all", h[j + "transition-timing-function"] = b.animation.easing + "ms", h[j + "transition-duration"] = b.animation.duration + "ms"),
                    h[j + "transition-delay"] = g + "ms",
                    h[j + "transform"] = "translate(" + f.x + "px," + f.y + "px)"
                } (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e),
                b._ff && b._ff <= 20 ? e.css(h) : e.css(b.effects.transition).css(h)
            }
            for (var c = 0; c < b._$pre.length; c++) {
                var d = b._$pre[c],
                e = a(d),
                f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                },
                g = b._getDelay(c); (d.dataset.finalPosX !== d.dataset.origPosX || d.dataset.finalPosY !== d.dataset.origPosY) && b._bindTargetDone(e),
                e.css(b._getPrefixedCSS("transition", "all " + b.animation.duration + "ms " + b.animation.easing + " " + g + "ms")),
                e.css(b._getPrefixedCSS("transform", "translate(" + f.x + "px," + f.y + "px)")),
                b.animation.animateResizeTargets && (d.dataset.origWidth - d.dataset.finalWidth && 1 * d.dataset.finalWidth && (d.style.width = d.dataset.finalWidth + "px", d.style.marginRight = -(d.dataset.finalWidth - d.dataset.interWidth) + 1 * d.dataset.finalMarginRight + "px"), d.dataset.origHeight - d.dataset.finalHeight && 1 * d.dataset.finalHeight && (d.style.height = d.dataset.finalHeight + "px", d.style.marginBottom = -(d.dataset.finalHeight - d.dataset.interHeight) + 1 * d.dataset.finalMarginBottom + "px"))
            }
            b._changingClass && b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);
            for (var c = 0; c < b._$toHide.length; c++) {
                for (var d = b._$toHide[c], e = a(d), g = b._getDelay(c), k = {},
                i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix: "";
                    k[j + "transition-delay"] = g + "ms",
                    k[j + "transform"] = b.effects.transformOut,
                    k.opacity = b.effects.opacity
                }
                e.css(b.effects.transition).css(k),
                (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e)
            }
            b._execAction("_animateTargets", 1)
        },
        _bindTargetDone: function(b) {
            var c = this,
            d = b[0];
            c._execAction("_bindTargetDone", 0, arguments),
            d.dataset.bound || (d.dataset.bound = !0, c._targetsBound++, b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",
            function(e) { (e.originalEvent.propertyName.indexOf("transform") > -1 || e.originalEvent.propertyName.indexOf("opacity") > -1) && a(e.originalEvent.target).is(c.selectors.target) && (b.off(".mixItUp"), delete d.dataset.bound, c._targetDone())
            })),
            c._execAction("_bindTargetDone", 1, arguments)
        },
        _targetDone: function() {
            var a = this;
            a._execAction("_targetDone", 0),
            a._targetsDone++,
            a._targetsDone === a._targetsBound && a._cleanUp(),
            a._execAction("_targetDone", 1)
        },
        _cleanUp: function() {
            var b = this,
            c = b.animation.animateResizeTargets ? "transform opacity width height margin-bottom margin-right": "transform opacity";
            unBrake = function() {
                b._$targets.removeStyle("transition", b._prefix)
            },
            b._execAction("_cleanUp", 0),
            b._changingLayout ? b._$show.css("display", b._newDisplay) : b._$show.css("display", b.layout.display),
            b._$targets.css(b._brake),
            b._$targets.removeStyle(c, b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),
            b._$hide.removeStyle("display"),
            b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin", b._prefix),
            b._sorting && (b._printSort(), b._activeSort = b._newSortString, b._sorting = !1),
            b._changingLayout && (b._changingDisplay && (b.layout.display = b._newDisplay, b._changingDisplay = !1), b._changingClass && (b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass), b.layout.containerClass = b._newClass, b._changingClass = !1), b._changingLayout = !1),
            b._refresh(),
            b._buildState(),
            b._state.fail && b._$container.addClass(b.layout.containerClassFail),
            b._$show = a(),
            b._$hide = a(),
            window.requestAnimationFrame && requestAnimationFrame(unBrake),
            b._mixing = !1,
            "function" == typeof b.callbacks._user && b.callbacks._user.call(b._domNode, b._state, b),
            "function" == typeof b.callbacks.onMixEnd && b.callbacks.onMixEnd.call(b._domNode, b._state, b),
            b._$container.trigger("mixEnd", [b._state, b]),
            b._state.fail && ("function" == typeof b.callbacks.onMixFail && b.callbacks.onMixFail.call(b._domNode, b._state, b), b._$container.trigger("mixFail", [b._state, b])),
            b._loading && ("function" == typeof b.callbacks.onMixLoad && b.callbacks.onMixLoad.call(b._domNode, b._state, b), b._$container.trigger("mixLoad", [b._state, b])),
            b._queue.length && (b._execAction("_queue", 0), b.multiMix(b._queue[0][0], b._queue[0][1], b._queue[0][2]), b._queue.splice(0, 1)),
            b._execAction("_cleanUp", 1),
            b._loading = !1
        },
        _getPrefixedCSS: function(a, b, c) {
            var d = this,
            e = {};
            for (i = 0; 2 > i; i++) {
                var f = 0 === i ? d._prefix: "";
                e[f + a] = c ? f + b: b
            }
            return d._execFilter("_getPrefixedCSS", e, arguments)
        },
        _getDelay: function(a) {
            var b = this,
            c = "function" == typeof b.animation.staggerFunction ? b.animation.staggerFunction.call(b._domNode, a, b._state) : a,
            d = b.animation.stagger ? c * b.animation.staggerDuration: 0;
            return b._execFilter("_getDelay", d, arguments)
        },
        _parseMultiMixArgs: function(a) {
            for (var b = this,
            c = {
                command: null,
                animate: b.animation.enable,
                callback: null
            },
            d = 0; d < a.length; d++) {
                var e = a[d];
                null !== e && ("object" == typeof e || "string" == typeof e ? c.command = e: "boolean" == typeof e ? c.animate = e: "function" == typeof e && (c.callback = e))
            }
            return b._execFilter("_parseMultiMixArgs", c, arguments)
        },
        _parseInsertArgs: function(b) {
            for (var c = this,
            d = {
                index: 0,
                $object: a(),
                multiMix: {
                    filter: c._state.activeFilter
                },
                callback: null
            },
            e = 0; e < b.length; e++) {
                var f = b[e];
                "number" == typeof f ? d.index = f: "object" == typeof f && f instanceof a ? d.$object = f: "object" == typeof f && f instanceof HTMLElement ? d.$object = a(f) : "object" == typeof f && null !== f ? d.multiMix = f: "boolean" != typeof f || f ? "function" == typeof f && (d.callback = f) : d.multiMix = !1
            }
            return c._execFilter("_parseInsertArgs", d, arguments)
        },
        _execAction: function(a, b, c) {
            var d = this,
            e = b ? "post": "pre";
            if (!d._actions.isEmptyObject && d._actions.hasOwnProperty(a)) for (var f in d._actions[a][e]) d._actions[a][e][f].call(d, c)
        },
        _execFilter: function(a, b, c) {
            var d = this;
            if (d._filters.isEmptyObject || !d._filters.hasOwnProperty(a)) return b;
            for (var e in d._filters[a]) return d._filters[a][e].call(d, c)
        },
        _helpers: {
            _camelCase: function(a) {
                return a.replace(/-([a-z])/g,
                function(a) {
                    return a[1].toUpperCase()
                })
            }
        },
        isMixing: function() {
            var a = this;
            return a._execFilter("isMixing", a._mixing)
        },
        filter: function() {
            var a = this,
            b = a._parseMultiMixArgs(arguments);
            a._clicking && (a._toggleString = ""),
            a.multiMix({
                filter: b.command
            },
            b.animate, b.callback)
        },
        sort: function() {
            var a = this,
            b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                sort: b.command
            },
            b.animate, b.callback)
        },
        changeLayout: function() {
            var a = this,
            b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                changeLayout: b.command
            },
            b.animate, b.callback)
        },
        multiMix: function() {
            var a = this,
            c = a._parseMultiMixArgs(arguments);
            if (a._execAction("multiMix", 0, arguments), a._mixing) a.animation.queue && a._queue.length < a.animation.queueLimit ? (a._queue.push(arguments), a.controls.enable && !a._clicking && a._updateControls(c.command), a._execAction("multiMixQueue", 1, arguments)) : ("function" == typeof a.callbacks.onMixBusy && a.callbacks.onMixBusy.call(a._domNode, a._state, a), a._$container.trigger("mixBusy", [a._state, a]), a._execAction("multiMixBusy", 1, arguments));
            else {
                a.controls.enable && !a._clicking && (a.controls.toggleFilterButtons && a._buildToggleArray(), a._updateControls(c.command, a.controls.toggleFilterButtons)),
                a._queue.length < 2 && (a._clicking = !1),
                delete a.callbacks._user,
                c.callback && (a.callbacks._user = c.callback);
                var d = c.command.sort,
                e = c.command.filter,
                f = c.command.changeLayout;
                a._refresh(),
                d && (a._newSort = a._parseSort(d), a._newSortString = d, a._sorting = !0, a._sort()),
                e !== b && (e = "all" === e ? a.selectors.target: e, a._activeFilter = e),
                a._filter(),
                f && (a._newDisplay = "string" == typeof f ? f: f.display || a.layout.display, a._newClass = f.containerClass || "", (a._newDisplay !== a.layout.display || a._newClass !== a.layout.containerClass) && (a._changingLayout = !0, a._changingClass = a._newClass !== a.layout.containerClass, a._changingDisplay = a._newDisplay !== a.layout.display)),
                a._$targets.css(a._brake),
                a._goMix(c.animate ^ a.animation.enable ? c.animate: a.animation.enable),
                a._execAction("multiMix", 1, arguments)
            }
        },
        insert: function() {
            var a = this,
            b = a._parseInsertArgs(arguments),
            c = "function" == typeof b.callback ? b.callback: null,
            d = document.createDocumentFragment(),
            e = b.index < a._$targets.length ? a._$targets[b.index] : a._$targets[a._$targets.length - 1].nextElementSibling;
            if (a._execAction("insert", 0, arguments), b.$object) {
                for (var f = 0; f < b.$object.length; f++) {
                    var g = b.$object[f];
                    d.appendChild(g),
                    d.appendChild(document.createTextNode(" "))
                }
                a._$parent[0].insertBefore(d, e)
            }
            a._execAction("insert", 1, arguments),
            "object" == typeof b.multiMix ? a.multiMix(b.multiMix, c) : a._refresh()
        },
        prepend: function() {
            var a = this,
            b = a._parseInsertArgs(arguments);
            a.insert(0, b.$object, b.multiMix, b.callback)
        },
        append: function() {
            var a = this,
            b = a._parseInsertArgs(arguments);
            a.insert(a._state.totalTargets, b.$object, b.multiMix, b.callback)
        },
        getOption: function(a) {
            var c = this,
            d = function(a, c) {
                for (var d = c.split("."), e = d.pop(), f = d.length, g = 1, h = d[0] || c; (a = a[h]) && f > g;) h = d[g],
                g++;
                return a !== b ? a[e] !== b ? a[e] : a: void 0
            };
            return a ? c._execFilter("getOption", d(c, a), arguments) : c
        },
        setOptions: function(b) {
            var c = this;
            c._execAction("setOptions", 0, arguments),
            "object" == typeof b && a.extend(!0, c, b),
            c._execAction("setOptions", 1, arguments)
        },
        getState: function() {
            var a = this;
            return a._execFilter("getState", a._state, a)
        },
        destroy: function(b) {
            var c = this;
            c._execAction("destroy", 0, arguments),
            c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");
            for (var d = 0; d < c._$targets.length; d++) {
                var e = c._$targets[d];
                b && (e.style.display = ""),
                delete e.mixParent
            }
            c._execAction("destroy", 1, arguments),
            delete a.MixItUp.prototype._instances[c._id]
        }
    },
    a.fn.mixItUp = function() {
        var c, d = arguments,
        e = [],
        f = function(b, c) {
            var d = new a.MixItUp,
            e = function() {
                return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr( - 6).toUpperCase()
            };
            d._execAction("_instantiate", 0, arguments),
            b.id = b.id ? b.id: "MixItUp" + e(),
            d._instances[b.id] || (d._instances[b.id] = d, d._init(b, c)),
            d._execAction("_instantiate", 1, arguments)
        };
        return c = this.each(function() {
            if (d && "string" == typeof d[0]) {
                var c = a.MixItUp.prototype._instances[this.id];
                if ("isLoaded" == d[0]) e.push(c ? !0 : !1);
                else {
                    var g = c[d[0]](d[1], d[2], d[3]);
                    g !== b && e.push(g)
                }
            } else f(this, d[0])
        }),
        e.length ? e.length > 1 ? e: e[0] : c
    },
    a.fn.removeStyle = function(a, c) {
        return c = c ? c: "",
        this.each(function() {
            for (var d = this,
            e = a.split(" "), f = 0; f < e.length; f++) for (var g = 0; 2 > g; g++) {
                var h = g ? e[f] : c + e[f];
                if (d.style[h] !== b && "unknown" != typeof d.style[h] && d.style[h].length > 0 && (d.style[h] = ""), !c) break
            }
            d.attributes && d.attributes.style && d.attributes.style !== b && "" === d.attributes.style.nodeValue && d.attributes.removeNamedItem("style")
        })
    }
} (jQuery);