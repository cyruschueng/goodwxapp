/**
 * 娉ㄦ剰锛氭湰鎻掍欢杩愮敤浜唕em灞忓箷閫傞厤鏂规锛屼竴寰嬮噰鐢╮em浣滀负鍗曚綅锛岃嫢椤圭洰涓笉鏄噰鐢ㄨ繖绉嶆柟妗堢殑锛岃鍦╧inerTreeMenu.css涓慨鏀规牱寮忥紝姝ゆ浠ｇ爜涓嶄細褰卞搷鍔熻兘浣跨敤锛屼粎浼氬奖鍝嶆帶浠舵牱寮�
 */

(function(win, doc, $) {

    var defaultOpt = {

        rotateNum: 5, //杞洏杞姩鍦堟暟
        body: "", //澶ц浆鐩樻暣浣撶殑閫夋嫨绗︽垨zepto瀵硅薄


        disabledHandler: function() {}, //绂佹鎶藉鏃跺洖璋�

        clickCallback: function() {}, //鐐瑰嚮鎶藉鎸夐挳,鍐嶆鍥炶皟涓疄鐜拌闂悗鍙拌幏鍙栨娊濂栫粨鏋�,鎷垮埌鎶藉缁撴灉鍚庢樉绀烘娊濂栫敾闈�

        KinerLotteryHandler: function(deg) {} //鎶藉缁撴潫鍥炶皟


    };



    function KinerLottery(opts) {

        this.opts = $.extend(true, {}, defaultOpt, opts);

        this.doing = false;

        this.init();

    }

    KinerLottery.prototype.setOpts = function(opts) {


        this.opts = $.extend(true, {}, defaultOpt, opts);

        this.init();

    };

    KinerLottery.prototype.init = function() {

        var self = this;


        this.defNum = this.opts.rotateNum * 360; //杞洏闇�瑕佽浆鍔ㄧ殑瑙掑害
        // console.log(this.defNum);


        // alert(this.defNum);

        //鐐瑰嚮鎶藉
        $('body').on('click', ".KinerLotteryBtn", function() {
            if ($(this).hasClass('start') && !self.doing) {
                console.log('鐐瑰嚮');

                wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

            } else {


                var key = $(this).hasClass('no-start') ? "noStart" : $(this).hasClass('completed') ? "completed" : "illegal";

                self.opts.disabledHandler(key);

            }


        });

        $(this.opts.body).find('.KinerLotteryContent').get(0).addEventListener('webkitTransitionEnd', function() {
            self.doing = false;
            var deg = $(self.opts.body).attr('data-deg');

            if (self.opts.direction == 0) {
                $(self.opts.body).attr('data-deg', 360 - deg);
                $(self.opts.body).find('.KinerLotteryContent').css({
                    '-webkit-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'rotate(' + (deg) + 'deg)',
                    'transform': 'rotate(' + (deg) + 'deg)'
                });
                self.opts.KinerLotteryHandler(360 - deg);
            } else {
                $(self.opts.body).attr('data-deg', deg);
                $(self.opts.body).find('.KinerLotteryContent').css({
                    '-webkit-transition': 'none',
                    'transition': 'none',
                    '-webkit-transform': 'rotate(' + (-deg) + 'deg)',
                    'transform': 'rotate(' + (-deg) + 'deg)'
                });
                self.opts.KinerLotteryHandler(deg);
            }



        });



    };


    KinerLottery.prototype.goKinerLottery = function(_deg) {

        if (this.doing) {
            return;
        }
        var deg = _deg + this.defNum;
        var realDeg = this.opts.direction == 0 ? deg : -deg;
        this.doing = true;
        $(this.opts.body).find('.KinerLotteryBtn').addClass('doing');

        $(this.opts.body).find('.KinerLotteryContent').css({
            '-webkit-transition': 'all 5s',
            'transition': 'all 5s',
            '-webkit-transform': 'rotate(' + (realDeg) + 'deg)',
            'transform': 'rotate(' + (realDeg) + 'deg)'
        });
        $(this.opts.body).attr('data-deg', _deg);

    };



    win.KinerLottery = KinerLottery;

})(window, document, $);