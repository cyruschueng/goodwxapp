/**
 * @description: 申购协议
 * @author: Franco
 * @update:
 */
define('module/purchaseAgreement', [
    'common/interface',
    'common/util',
    'common/errCode'
], function(inter, util, errCode){

    return {
        /**
         * 展示弹窗
         */
        show : function(call){
            var self = this,
                agreementInvestTpl = [
                '<div class="agreement-invest-warp">',
                    '<div class="agreement-title pt20 f36">用户协议</div>',
                    '<div class="agreement-info p20">',
                        '<p>',
                            '北京**科技有限公司（以下简称“**科技”）在此特别提醒您（用户）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保您充分理解本协议中各条款。请您审慎阅读并选择接受或不接受本协议。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。',
                        '</p>',
                        '<p>',
                            '本协议约定**科技与用户之间关于“**”软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由**科技随时更新，更新后的协议条款一旦公布即代替原来的协议条款，恕不再另行通知，用户可在本网站查阅最新版协议条款。在**科技修改协议条款后，如果用户不接受修改后的条款，请立即停止使用**科技提供的服务，用户继续使用**科技提供的',
                        '</p>',
                    '</div>',
                    '<div class="agreement-btn-warp">',
                        '<a class="btn-default btn-lg btn-yellow agreement-btn" href="javascript:">同意协议</a>',
                    '</div>',
                '</div>'].join('');

            $.dialog({
                id: 'agreement-invest',
                fixed: true,
                lock: true,
                title: '开通宜投宝用户协议',
                content: agreementInvestTpl,
                dbclickHide: true,
                initialize: function () {
                    var THIS_dialog = this;
                    //THIS_dialog.dom.title.hide();
                    /**
                     * 确认
                     */
                    $(".agreement-btn").on("click", function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        self.account($this, function(){
                            THIS_dialog.close();
                            call && call();
                        });
                    });
                },
                beforeunload: function () {
                }
            });
        },
        /**
         * 开户
         */
        account: function(obj, call){
            obj.html('处理中').addClass('btn-disabled');
            util.setAjax(inter.getApiUrl().applyAccountUrl, {}, function (json) {
                if (json.errorCode) {
                    $.alert(errCode.get(json.errorCode));
                    obj.html('同意协议').removeClass('btn-disabled');
                } else {
                    call && call();
                }
            }, function () {
                $.alert('服务器繁忙，请稍后再试。');
                obj.html('同意协议').removeClass('btn-disabled');
            });
        }
    };
});
