/*
* @description: ieºÊ»›placeholder
* @author: xiaoran(804785854@qq.com)
* @update:
*/
jQuery.fn.placeholder = function () {
    var i = document.createElement('input'),
		        placeholdersupport = 'placeholder' in i;
    if (!placeholdersupport) {
        var inputs = jQuery(this);
        inputs.each(function () {
            var input = jQuery(this),
				text = input.attr('placeholder'),
				pdl = 0,
                til = 0,
				height = input.outerHeight(),
				width = input.outerWidth(),
				placeholder = jQuery('<span class="phTips">' + text + '</span>');
            try {
                pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
                til = input.css('text-indent').match(/\d*/i)[0] * 1;
            } catch (e) {
                pdl = 5;
            }
            placeholder.css({ 'margin-left': -(width - pdl - til), 'height': height, 'line-height': height + "px", 'position': 'absolute', 'color': "#cecfc9" });
            placeholder.click(function () {
                input.focus();
            });
            if (input.val() != "") {
                placeholder.css({ display: 'none' });
            } else {
                placeholder.css({ display: 'inline' });
            }
            placeholder.insertAfter(input);
            input.keyup(function (e) {
                if (jQuery(this).val() != "") {
                    placeholder.css({ display: 'none' });
                } else {
                    placeholder.css({ display: 'inline' });
                }
            });
            input.focus(function (e) {
                if (jQuery(this).val() != "") {
                    placeholder.css({ display: 'none' });
                } else {
                    placeholder.css({ display: 'inline' });
                }
                $(".zindex10000").removeClass("zindex10000");
            });
            input.blur(function (e) {
                if (jQuery(this).val() != "") {
                    placeholder.css({ display: 'none' });
                } else {
                    placeholder.css({ display: 'inline' });
                }
            });
        });
    }
    return this;
};
$(document).ready(function () {
    $('input[placeholder]').placeholder();
});