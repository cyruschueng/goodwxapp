/**
 * @description: 动态Token
 * @author: Franco
 * @update:
 */
define('module/dynamicToken', [

], function(){

    return {
        /**
         * 获取动态token
         */
        getNewToken: function(oldToken, current) {
            var self = this,
                str = self.changeToken(oldToken),
                l = current & 0xFFFFFFFF,
                factor = 0;
            if (self.isOdd(current)) {
                factor = l ^ 0xFDB99BDF;
                factor = factor < 0 ? factor+4294967296 : factor;
                return faultylabs.MD5(str + factor.toString(2));
            } else {
                factor = l ^ 0x9BDFFDB9;
                factor = factor < 0 ? factor+4294967296 : factor;
                return faultylabs.MD5(factor.toString(2) + str);
            }
        },

        changeToken: function(token) {
            var sb = [],
                i = 0;
            for (i = 31; i >= 26; i--) {
                sb.push(token.charAt(i));
            }
            for (i = 15; i >= 9; i--) {
                sb.push(token.charAt(i));
            }
            for (i = 0; i <= 8; i++) {
                sb.push(token.charAt(i));
            }
            for (i = 16; i <= 25; i++) {
                sb.push(token.charAt(i));
            }
            return sb.join('');
        },

        isOdd: function(current) {
            return ( current & 0x1) == 1;
        }
    }
});