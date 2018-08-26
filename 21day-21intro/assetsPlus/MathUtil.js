/**
 * 数学工具
 * Created by Robot on 2016/7/31.
 */
class MathUtil {
    static addCommas(number) {
        number += '';

        var x, x1, x2;
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    }

    /**
     * 是否命中概率
     * @param pro  概率(0~1)
     * @returns {boolean}
     */
    static isHitting(pro) {
        let t = Math.random();

        return pro <= t;
    }

    /**
     * 万单位（四舍五入）
     */
    static parseWanUnit(val) {
        return MathUtil.toFixed(val/10000, 1)+'万';
    }

    static toFixed(number, decimals){
        if( !decimals ) {
            decimals = 0;
        }

        var denominator = Math.pow(10, decimals);

        if( typeof number == 'string' ){
            number = parseFloat(number);
        }

        number = Math.round(number * denominator)/denominator;

        return number;
    }

    /**
     * 转化成百分比
     * @param number
     */
    static toPercent(number) {
        let prefix = '';
        if( number > 0 ) {
            prefix = '+';
        }else if( number < 0 ) {
            prefix = '';
        }

        return prefix + MathUtil.toFixed(number*100, 2) + '%';
    }
}
window.MathUtil = MathUtil;

module.exports = MathUtil;