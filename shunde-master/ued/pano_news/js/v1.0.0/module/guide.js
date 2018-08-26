/**
 * @description: 用户引导
 * @author: xiaoran(804785854@qq.com)
 * @update:
 */
define('module/guide', [
    'module/localStorage'
], function (ls) {

    return {
        /**
        * 初始化
        */
        init: function (lsName) {
            var self = this,
                tpl = [
                    '<div class="guide">',
                        '<div class="guide-box step">',
                            '<a class="guide-btn" href="javascript:">下一步</a>',
                        '</div>',
                        '<div class="guide-bg"></div>',
                    '</div>'
                ].join(''),
                hasGuide = ls.get(lsName || 'guide'),
                guide = $('.guide');
            this.lsName = lsName;
            if (!hasGuide) {
                if (!guide.length) {
                    guide = $(tpl);
                    $('body').append(guide);
                }
                if (!$.support.leadingWhitespace) {
                    guide.find('.guide-bg').css('position', 'absolute').height($(document).height());
                }
                guide.find('.guide-btn').on('click', function (e) {
                    e.preventDefault();
                    self.stepNext();
                });
                self.steps = 6;
                self.step = 1;
                self.target = guide;
                self.stepNext();
            }
        },
        /**
        * 下一步
        */
        stepNext: function () {
            var self = this;
            if (self.step == 4) {
                $("#btn-mobile-menu").trigger("click");
            }
            if (self.step <= self.steps) {
                self.target.find('.step').removeClass('step-' + (self.step - 1)).addClass('step-' + self.step);
                if (self.step == self.steps) {
                    self.target.find(".guide-btn").html("完成");
                } else {
                    self.target.find(".guide-btn").html("下一步");
                }
                self.step++;
            } else {
                self.target.remove();
                self.step = 1;
                ls.set(self.lsName||'guide', '1');
                $("#btn-mobile-menu").trigger("click");
            }
        }
    }

});
