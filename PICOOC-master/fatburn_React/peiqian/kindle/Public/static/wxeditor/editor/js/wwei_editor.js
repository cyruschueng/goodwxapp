var current_active_ueitem = null;
function showSuccessMessage(text) {
    if ($.fn.jGrowl) {
        $.jGrowl("<i class='icon-bell'></i> " + text, {
            theme: 'alert alert-success',
            closer: false,
            life: 2000,
            position: 'bottom-right',
            closeTemplate: 'X'
        });
    } else {
        alert(text);
    }
    return true;
}

function getEditorHtml() {
    var html = wwei_editor.getContent();
    var htmlObj = $('<div>' + html + ' </div>');
    var htmlTable = htmlObj.find('table');
    if (htmlTable.size() > 0) {
        htmlTable.removeAttr('width').attr('style', 'width:100%;');
        htmlTable.find('td').removeAttr('width').attr('style', 'border:1px solid #eeeeee;');
    }
    return htmlObj.html();
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
function getSelectionHtml() {
    var range = wwei_editor.selection.getRange();
    range.select();
    var selectionObj = wwei_editor.selection.getNative();
    var rangeObj = selectionObj.getRangeAt(0);
    var docFragment = rangeObj.cloneContents();
    var testDiv = document.createElement("div");
    testDiv.appendChild(docFragment);
    var selectHtml = testDiv.innerHTML;
    return selectHtml;
}

function insertHtml(html) {
	var select_html = getSelectionHtml();
	if (select_html != "") {
		select_html = strip_tags(select_html, '<br><p><h1><h2><h3><h4><h5><h6><img>');
		var select_obj = $('<div>' + select_html + '</div>');

		/*select_obj.find('*').each(function() {
			$(this).removeAttr('style');
			$(this).removeAttr('class');
			$(this).removeAttr('placeholder');
		});*/
		var obj = $('<div>' + html + '</div>');
		/*select_obj.find('h1,h2,h3,h4,h5,h6').each(function(i) {
			var title = obj.find('.title').eq(i);
			if (title && title.size() > 0) {
				title.html($.trim($(this).text()));
				$(this).remove();
			} else {
				$(this).replaceWith('<p>' + $(this).text() + '</p>');
			}
		});*/
		/*var bgimg_size = obj.find('.135bg').size();
		select_obj.find('img').each(function(i) {
			var bgimg = obj.find('.135bg').eq(i);
			if (bgimg && bgimg.size() > 0) {
				bgimg.css('background-image', 'url(' + $(this).attr('src') + ')');
				$(this).remove();
			}
		});*/
		select_obj.find('img').each(function(i) {
			var img = obj.find('img').eq(i);
			if (img && img.size() > 0) {
				img.attr('src', $(this).attr('src'));
				$(this).remove();
			}
		});
		var brushs = obj.find('.wweibrush');
		var total = brushs.size();
		if (total > 0) {
			if (total == 1) {
				var brush_item = obj.find('.wweibrush:first');
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
		wwei_editor.execCommand('insertHtml', html);
		wwei_editor.undoManger.save();
		return true;
	} else {}

    wwei_editor.execCommand('insertHtml', html);
    wwei_editor.undoManger.save();
    return true;
}

//换色
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
function rgb2hex(color) {
    rgb = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice( - 2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice( - 2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice( - 2) : color;
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
function getColor(color, type, num) {
    var str = '';
    less_parser.parse('*{color:' + type + '(' + color + ',' + num + ')}',
    function(err, tree) {
        str = tree.toCSS();
        str = str.replace(/\n/g, '').replace(/ /g, '').replace('*{color:', '').replace(';}', '');
    });
    return str;
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
        
    });
    return obj;
}

function setBackgroundColor(bgcolor, color, history) {
    if (isGreyColor(bgcolor)) {
        return false;
    }
    if (history) {
        wwei_editor.undoManger.save();
    }
    if (!$('#replace-color-all')[0].checked && current_active_ueitem) {
        parseObject(current_active_ueitem, bgcolor, color);
        wwei_editor.undoManger.save();
    } else {
        if (!$('#replace-color-all')[0].checked) {
            showErrorMessage("没有选择要调色的样式，如要全文换色请勾选配色方案位置的“全文换色”的选择框");
            return;
        }
        parseObject($(wwei_editor.selection.document), bgcolor, color);
    }
    if (history) {
        wwei_editor.undoManger.save();
    }
    return;
}
//ue plugins
UE.plugins["wwei_plugin"] = function() {
    var me = this,
    editor = this;
    var utils = baidu.editor.utils,
    Popup = baidu.editor.ui.Popup,
    Stateful = baidu.editor.ui.Stateful,
    uiUtils = baidu.editor.ui.uiUtils,
    UIBase = baidu.editor.ui.UIBase;
    var domUtils = baidu.editor.dom.domUtils;

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
        _blank: function() {
            $('<p><br/></p>').insertAfter(clickPop.anchorEl);
            clickPop.hide();
        },
        className: 'edui-bubble'
    });

    me.addListener("click",
    function(t, evt) {
        evt = evt || window.event;
        var el = evt.target || evt.srcElement;
        if (el.tagName == "IMG") {
            return;
        }
        if ($(el).parents('.wwei-editor').size() > 0) {
            el = $(el).parents('.wwei-editor:first').get(0);
            /*if (current_active_ueitem) {
                current_active_ueitem.removeAttr('style');
            }*/
            current_active_ueitem = $(el);
            /*current_active_ueitem.css({
                'border': '1px dotted rgb(218, 98, 71)',
                'padding': '2px'
            });*/
            clickPop.render();
            var html = clickPop.formatHtml('<nobr class="otf-poptools">' + '<span class="copy" stateful>' + '复制</span>' + '<span class="cut" stateful>' + '剪切</span>' + '<span onclick="$$._remove()" stateful>' + '删除</span>' + '<span onclick="$$._blank()" stateful>' + '其后插入空行</span>' + '</nobr>');
            var content = clickPop.getDom('content');
            content.innerHTML = html;
            
            clickPop.anchorEl = el;
            clickPop.showAnchor(clickPop.anchorEl);
            var client = new ZeroClipboard($(clickPop.getDom('content')).find('.copy'));
            client.on('ready',
            function(event) {
                client.on('copy',
                function(event) {
                    //$(clickPop.anchorEl).removeAttr('style');
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
                    //$(clickPop.anchorEl).removeAttr('style');
                    event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                    clickPop.hide();
                    $(clickPop.anchorEl).remove();
                    showSuccessMessage("已成功剪切到剪切板");
                });
            });
        } else {
            if (current_active_ueitem) {
                //current_active_ueitem.removeAttr('style');
                current_active_ueitem = null;
            }
        }
    });
};