/**
 * @description: 密码强度验证模块
 * @author: Franco
 * @update:
 */
define('module/strength', [
    'common/util'
], function(util){
    var template = [
        '<span class="password-status">',
            '<span class="password-strength"></span>',
            '<span class="strength-text">#{text}</span>',
        '</span>'
    ].join('');

    return {
        /**
         * 初始化强度验证模块
         */
        init : function(elem, opt){
            var self = this;
            self.$elem = $(elem);
            self.$opt = opt || {};
            self.$elem.on('keyup keydown blur', function(e) {
                var thisVal = $(this).val(),
                    tvLen = thisVal.length;
                if(self.$opt.min && self.$opt.max && tvLen >= self.$opt.min && tvLen<= self.$opt.max){
                    self.check_strength(thisVal);
                }else{
                    self.remove();
                }
            });
        },
        /**
         * 根据参数获取百分率
         */
        getPercentage : function (a, b) {
            return ((b / a) * 100);
        },
        /**
         * 验证并给出分值
         */
        check_strength : function (thisval){
            var self = this,
                patterns = [
                    new RegExp('^[0-9]+$'),
                    new RegExp('^[a-zA-Z0-9]+$'),
                    new RegExp(//(?=[\x21-\x7e]+)([`,-,+,=,|,\\,!,%,&,@,#,$,^,*,.,?,_,~,\/(,\/)]+)([`,~,!,@,#,$,%,^,&,*,\/(,\/),-,_,+,=,|,\\\\,;,:,\',\",.,\/,?, ,\/{,\/},(\/[),(\/])]+)
                        '^([\\W,_]*)([a-zA-Z0-9]*)' +
                        '([\\W,_]+)([a-zA-Z0-9]*)' +
                        '([\\W,_]*)$'
                    )
                ],
                total = 0;//密码总得分

            if (thisval.length >= 8) {//密码大于8个字符
            	total += 1;
            }
            for (var i = 1; i <= patterns.length; i++) {
            	if (patterns[i-1].test(thisval)) {
            		total = total + i;
            		break;
            	}
            }
            
            self.get_total(total);
        },
        /**
         * 根据分值计算强度
         */
        get_total : function (total){
            var self = this,
                block = self.$elem.parent().siblings('.tips'),
                strength = block.find('.password-status');
            if(!strength.length){
                strength = $(util.template(template,{text : ''}));
                block.html(strength);
            }
            var status = strength.find('.password-strength'),
                text = strength.find('.strength-text');

            if(total == 0){
                status.addClass('password-one');
                status.removeClass('password-two');
                status.removeClass('password-three');
                text.html('空');
            }else if (total <= 2) {
                status.addClass('password-one');
                status.removeClass('password-two');
                status.removeClass('password-three');
                text.html('弱');
            } else if(total == 3){
                status.addClass('password-two');
                status.removeClass('password-one');
                status.removeClass('password-three');
                text.html('中');
            } else if (total > 3) {
                status.addClass('password-three');
                status.removeClass('password-one');
                status.removeClass('password-two');
                text.html('强');
            }
        },
        /**
         * 移除强度提示
         */
        remove : function(){
            var self = this,
                panel = null;
            $('.password-status').remove();
        }
    }
});