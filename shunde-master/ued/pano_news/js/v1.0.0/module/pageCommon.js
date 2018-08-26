/**
 * @description: 页面交互公用模块
 * @author: Franco
 * @update:
 */
define('module/pageCommon', [
    'common/interface',
    'common/util'
], function(inter, util){

    return {
        /**
         * 根据cookie渲染header用户登录状态
         */
        renderHeader : function(call){
            /*var self = this,
                headRight = $('.head-right'),
                headHome = headRight.find('.head-home'),
                headUc = headRight.find('.head-uc'),
                userTpl = [
                    '<div class="head-home fr clearfix">',
                        '<div class="home-nav">',
                            '<ul class="home-menu none">',
                                '<li><a class="logout" href="/me">我的主页</a></li>',
                                '<li><a class="logout" href="/me/setting">我的账号</a></li>',
                                '<li><a class="logout" href="/me/message">我的私信</a></li>',
                                //'<li><a class="logout" href="/me/concern">我的名片夹</a></li>',
                                '<li><a class="logout" href="/logout">退出</a></li>',
                            '</ul>',
                            '<a href="/me"><img id="head-avator" src="#{avatar}" alt="#{username}" width="30" height="30"></a>',
                            '<a class="home-name" href="/me" title="#{username}">#{username}</a>',
                            '<em class="icon icon-drop-white"></em>',
                        '</div>',
                    '</div>'
                ].join('');

            if(!headHome.length){
                self.getUserLoginStatus(function(status, data){
                    if(status){
                        headUc.addClass('none');
                        headHome = $(util.template(userTpl, { // avatorSmall avatorMiddle avatorBig
                            avatar: util.getAvatar(data.head, 30) || ued_conf.root + 'images/common/default-30x30.png',
                            username: data.nickname
                        }));
                        headRight.prepend(headHome);
                        util.imgLoadError(headHome.find('img'));
                        headHome.hover(function(){
                            $(this).find('.home-nav').css('background', '#1b1b1b');
                            $(this).find('.home-menu').width($(this).width()).removeClass('none');
                        }, function(){
                            $(this).find('.home-nav').css('background', '');
                            $(this).find('.home-menu').addClass('none');
                        });
                        window.userId = data.id;
                    }                    
                }, call);
            };
            self.bindSearch();*/
            var oFund = $('#fundStatus'),
                fundStatus = oFund.val();
            if(oFund.length) {
                var investBtn = $('a[href="/m/account/invest"],a[href="/m/account/invest/buy"],a[href="/m/account/redeem"]');
                switch (fundStatus){
                    case '1':
                        investBtn.on('click', function (e) {
                            e.preventDefault();
                            location.href = '/m/account/invest/agreement?referer='+ encodeURIComponent($(this).prop('href'));
                            return false;
                        });
                        return false;
                        break;
                    case '2':
                        break;
                    default :
                        investBtn.on('click', function (e) {
                            e.preventDefault();
                            $.alert('暂未开通宜投宝，敬请期待！');
                            return false;
                        }).prop('href', '#');
                        break;
                }
            }
        },
        /**
         * 获取登录状态
         */
        getUserLoginStatus : function(call, errCall){
            util.setAjax(inter.getApiUrl().getUserStatusUrl, {}, function(json){
                if(json.success) {
                    call && call(json);
                }else{
                    errCall && errCall(json);
                }
            }, function(){}, 'GET');
        },
        /**
         * 防止未登录状态下浏览历史记录
         */
        checkBack: function(){
            var self = this;

            self.getUserLoginStatus(null, function(){
                location.href = '/m';
            });
        }
    }
});