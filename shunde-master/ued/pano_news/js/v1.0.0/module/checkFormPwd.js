/**
 * @description: 密码强度和验证类型
 * @author: xiaoran(804785854@qq.com)
 * @update:
 */
define('module/checkFormPwd', [], function () {

    var checkItem = {
        length: "6-16位字符",
        contain: "只能包含大小写字母、数字",
        must2: "大写字母、小写字母、数字至少包含2种字符",
        must3: "必须包含大写字母、小写字母、数字3种字符",
        different: "不能与登录密码相同",
        equalTo: "请重复输入设置的密码"
    };

    return {
        /*初始化提示框*/
        init: function (obj) {
            var i = null,
                opt = $(obj).attr("check-item").split(","),
                gradePwdHtmlArr = ['<div class="grade-pwd">',
                                        '<span>密码强度：</span>',
                                        '<ul class="">',
                                            '<li class="block01"></li>',
                                            '<li class="block02"></li>',
                                            '<li class="block03"></li>',
                                        '</ul>',
                                        '<span class="grade-text">中</span>',
                                    '</div>'],
                checkPwdHtmlArr = ['<div class="check-form-info">',
                                        '<span class="warp-arrows"><i class="icon icon-tips-arrows"></i></span>'];
            if ($(obj).attr("check-type") == "pwd") {
                checkPwdHtmlArr.push(gradePwdHtmlArr.join(""));
            }
            checkPwdHtmlArr.push('<ul class="pwdStrength f12 p5">');
            for (i = 0; i < opt.length; i++) {
                checkPwdHtmlArr.push('<li><i class="icon icon-tips check-item-' + opt[i] + '"></i>' + checkItem[opt[i]] + '</li>');
            }
            checkPwdHtmlArr.push('</ul></div>');
            return checkPwdHtmlArr.join("");
        },
        /**
        * 展示
        */
        show: function (obj) {
            if ($(obj).length < 1) {
                return;
            }
            var self = this,
                i = null,
                opt = $(obj).attr("check-item") ? $(obj).attr("check-item").split(",") : [],
                THISp = $(obj).parents('.check-form-warp'),
                THISopt = null;

            if (THISp.children(".check-form-info").length > 0) {
                THISp.children(".check-form-info").show();
            } else {
                THISp.append(self.init(obj)).show();
            }
            $(obj).siblings("em").addClass("none");
            $(obj).removeClass("inp-error");
            self.level(obj);
            THISopt = THISp.find(".check-form-info .pwdStrength");
            for (i = 0; i < opt.length; i++) {
                THISitem = $(".check-item-" + opt[i], THISopt);
                if ($(obj).val() == "") {
                    THISitem.removeClass("icon-error").removeClass("icon-correct");
                } else if (opt[i] == "length") {
                    if ($(obj).val().length < 6 || $(obj).val().length > 16) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                } else if (opt[i] == "contain") {
                    if (!$(obj).val().match(/^[A-Za-z0-9]+$/)) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                } else if (opt[i] == "must2") {
                    if (self.level(obj) < 2) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                } else if (opt[i] == "must3") {
                    if (self.level(obj) < 3) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                } else if (opt[i] == "different") {
                    if ($(obj).val() == $("#" + $(obj).attr("different")).val()) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                } else if (opt[i] == "equalTo") {
                    if ($(obj).val() != $("#" + $(obj).attr("equalTo")).val()) {
                        THISitem.addClass("icon-error").removeClass("icon-correct");
                    } else {
                        THISitem.removeClass("icon-error").addClass("icon-correct");
                    }
                }
            }
            if ($(obj).attr("equalBy") && $(obj).attr("equalBy") != "") {
                self.show($("#" + $(obj).attr("equalBy")));
                self.hide($("#" + $(obj).attr("equalBy")));
            }
        },
        hide: function (obj) {
            var THISp = $(obj).parents('.check-form-warp');
            //THISp.children(".check-form-info").hide();
            if ($(obj).val() != "") {
                if ($(".icon-error", THISp.children(".check-form-info")).length > 0) {
                    $(obj).siblings("em").addClass("icon-form-error").removeClass("icon-form-right").removeClass("none");
                    $(obj).addClass("inp-error");
                } else {
                    $(obj).siblings("em").addClass("icon-form-right").removeClass("icon-form-error").removeClass("none");
                    $(obj).removeClass("inp-error");
                }
            }
        },
        level: function (obj) {
            var levelnum = 0,
                levelUL = $(obj).parents('.check-form-warp').find('.check-form-info .grade-pwd ul');
            if (levelUL.length < 1) {
                return levelnum;
            }
            if (!$(obj).val().match(/[0-9]+/)) {
            } else {
                levelnum++;
            }
            if (!$(obj).val().match(/[A-Z]+/)) {
            } else {
                levelnum++;
            }
            if (!$(obj).val().match(/[a-z]+/)) {
            } else {
                levelnum++;
            }
            if (levelnum == 0) {
                levelUL.removeClass("ruo").removeClass("zhong").removeClass("qiang");
                levelUL.siblings(".grade-text").html("");
            } else if (levelnum == 1 || $(obj).val().length < 6) {
                levelUL.addClass("ruo").removeClass("zhong").removeClass("qiang");
                levelUL.siblings(".grade-text").html("弱");
            } else if (levelnum == 2 && $(obj).val().length >= 6) {
                levelUL.removeClass("ruo").addClass("zhong").removeClass("qiang");
                levelUL.siblings(".grade-text").html("中");
            } else if (levelnum == 3 && $(obj).val().length >= 6) {
                levelUL.removeClass("ruo").removeClass("zhong").addClass("qiang");
                levelUL.siblings(".grade-text").html("强");
            }
            return levelnum;
        }
    };
});
