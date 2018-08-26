app.directive('showImage', [function() {
    return {
        compile: function(tElem,attrs) {
            return function(scope,elem,attrs) {
                elem.attr("src",attrs.url);
            };
        }
    };
}]);
app.directive('showVoiceRecord',[function(){
    return{
        restrict: 'AE',
        link:function(scope, element, attrs){
            var interval;
            element.on('click',function(){
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                var actionsheet_record=$('#actionsheet_record');
                var actionsheet_voice=$('#actionsheet_voice');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()
                    .addClass('weui_fade_toggle').one('click', function () {
                        //hideActionSheet(weuiActionsheet, mask);
                        //scope.info.voice.stopRecordVoice();
                        //scope.info.voice.clear();
                    });
                actionsheet_voice.text("开始录音");
                $('#actionsheet_cancel').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                    scope.voice.stopRecordVoice();
                    scope.voice.clear();
                    scope.$apply(scope.voice.seVoiceEmpty=true);
                });
                actionsheet_voice.off('click').on('click',function(){
                    if(scope.voice.isStrartRecord==true){
                        hideActionSheet(weuiActionsheet, mask);
                        showVoiceMenu(true,true);
                        scope.voice.stopRecordVoice();
                        scope.$apply(scope.voice.seVoiceEmpty=false);
                        scope.$apply(scope.isShowVoice=true);
                    }else{
                        scope.voice.startRecordVoice();
                        actionsheet_record.show();
                        $(this).text("完成");
                        interval= setInterval(function(){
                            if(scope.voice.isVoiceComplete==true){
                                clearInterval(interval);
                                hideActionSheet(weuiActionsheet, mask);
                                showVoiceMenu(true,true);
                                scope.$apply(scope.voice.seVoiceEmpty=false);
                                scope.$apply(scope.isShowVoice=true);
                            }
                        },500);

                    }
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');
                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                    actionsheet_record.hide();
                    if(interval!=null || interval !=undefined){
                        clearInterval(interval);
                    }
                };
                var showVoiceMenu=function(isStrartRecord,isVoiceComplete){
                    var btnStartRecordVoice=$("#btnStartRecordVoice");
                    var btnTestPlayVoice=$("#btnTestPlayVoice");
                    if(isStrartRecord==false){
                        btnStartRecordVoice.show();
                        btnTestPlayVoice.hide();
                    }
                    if(isStrartRecord==true && isVoiceComplete==true){
                        btnStartRecordVoice.hide();
                        btnTestPlayVoice.show();
                        scope.voice.initVoiceState();
                    }
                };

                //$("#msgVoiceEmpty").hide();
                scope.$apply(scope.voice.seVoiceEmpty=false);
                //console.log(scope.info.voice.seVoiceEmpty);
            })
        }
    }
}]);

/*
app.directive('playerLink', function() {
    return {
        restrict: 'EA',
        require: ['^ngModel'],
        replace: true,
        scope: {
            ngModel: '=',
            player: '=',
        },
        template:'<span ng-click="player.play(ngModel)" class="btn btn-xs btn-success glyphicon glyphicon-volume-up">播放</span>',
        link: function(scope, ele, attr) {

        }
    }
});
*/


app.directive('playerLink', function() {
    return {
        restrict: 'EA',
        link: function(scope, ele, attr) {
            ele.bind('click',function(){
                scope.player.play(attr.src)
            })
        }
    }
});


app.directive('seLike',function(){
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            ele.bind('click',function(){
                var fileId=attr.fileid;
                var wrap=$("#"+attr.showlike);
                if(ele.hasClass("btn-danger")) return;
                var spans= wrap.children("span");
                if(spans.length==1){
                    showLikeHeader(wrap);
                    addLiker(wrap);
                }
                else if(spans.length==2){
                    addLiker(wrap);
                }else if(spans.length>2){
                    addLiker(wrap,",");
                };
                addLike(fileId);
                ele.removeClass("btn-default").addClass("btn-danger");
                addNumber();
            });
            var showLikeHeader=function(wrap){
                var likeHeader="<span  class='glyphicon glyphicon-thumbs-up' style='font-size:12px; color:#f00;padding-right:5px;'></span>";
                wrap.append(likeHeader);
            };
            var addLiker=function(wrap,split){
                var liker='';
                if(split==null || split==""){
                    liker="<span>"+scope.nickName()+"</span>";
                }else{
                    liker="<span>"+split+scope.nickName()+"</span>";
                }
                wrap.append(liker);
            };
            var addLike=function(a){
                scope.addLike(a);
            };
            var addNumber=function(){
                var number= ele.text();
                if(number==null){
                    number=1;
                }else{
                    number= +number+1;
                }
                ele.html("&nbsp;"+number);
            }
        }
    }
});
app.directive('seComment',function(){
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            ele.bind('click',function(){
                var fileId=attr.fileid;
                var wrap=$("#"+attr.showcomment);
                console.log(wrap);
                showComment(fileId,wrap);
                $(".weui_tabbar").hide();
            });
            var showComment=function(fileId,wrap){
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                var context=$("#commentContext");

                var answerInfo=scope.getAnswerInfo();

                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()//
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                $('#actionsheet_submit').off('click').on('click', function () {
                    if($(this).hasClass("disabled")) return;
                    addCommentHtml();
                    //addNumber();
                    scope.addComment(context.val(),fileId,answerInfo.expertType,answerInfo.sex,answerInfo.expertId);
                    hideActionSheet(weuiActionsheet, mask);
                });
                $("#btnClose").click(function(){
                    hideActionSheet(weuiActionsheet, mask);
                });
                context.bind('keyup',function(){
                    var len= $.trim(context.val()).length;
                    var submit= $('#actionsheet_submit');
                    if(len>0){
                        submit.removeClass("disabled");
                        submit.removeClass("btn-default");
                        submit.addClass("btn-success");
                    }else{
                        submit.removeClass("btn-success");
                        submit.addClass("disabled");
                        submit.addClass("btn-default");
                    }
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');

                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    });
                    context.val("");
                    var submit= $('#actionsheet_submit');
                    submit.removeClass("btn-success");
                    submit.addClass("disabled");
                    submit.addClass("btn-default");
                    $(".weui_tabbar").show();
                };
                function addCommentHtml(){


                    var iconclass='';
                    if(answerInfo.sex=='男'){
                        iconclass='icon-male'
                    }else if(answerInfo.sex=='女'){
                        iconclass='icon-female'
                    }
                    var src="";
                    if(answerInfo.expertType!=0){
                        src="../../../content/imgs/v.png";
                    }

                    var html=
                    '<div class="row"  style="padding-top:10px; padding-bottom:10px; border-bottom:1px solid #eee;">'+
                    '<div style="padding: 15px 0;">'+
                        '<div class="col-xs-2">'+
                            '<img class="img-circle" style="width:30px;" src="'+answerInfo.headImgUrl+'">'+
                        '</div>'+
                        '<div class="col-xs-10" style="padding-left:0" >'+
                            '<div class="row">'+
                                '<div class="col-xs-12">'+
                                    '<div class="text-info">'+
                                        '<span>'+answerInfo.nickName+'</span>'+
                                        '<span ng-class="'+iconclass+'"></span>'+
                                        '<img  src="'+src+'" style="width:12px;">'+
                                        '<span style="color:#666; font-size:12px;"> 刚刚</span>'+
                                    '</div>'+
                                    '<div style="padding:10px 0;">'+
                                        context.val()+
                                    '</div>'+
                                '</div>'+
                                '<div class="col-xs-12"></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '</div>';
                    wrap.before(html);

                }
                var addNumber=function(){
                    var number= ele.text();
                    if(number==null){
                        number=1;
                    }else{
                        number= +number+1;
                    }
                    ele.html("&nbsp;"+number);
                }
            }
        }
    }
});
app.directive('seShowShare',function(){
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            ele.bind('click',function(){
                var mask = $('#share_mask');
                var weuiActionsheet = $('#weui_share_actionsheet');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');

                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                    mask.hide();
                };
                setTimeout(function(){
                    hideActionSheet(weuiActionsheet, mask);
                },1000)
            })
        }
    }
});
app.directive('seTop',function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.bind('click',function(){
                var fileId=attr.fileid;
                var showTop=$("#"+attr.showtop);
                if(showTop.hasClass("ng-hide") ){
                    scope.$apply(showTop.removeClass("ng-hide"));
                }else{
                    scope.$apply(showTop.addClass("ng-hide"));
                }
                scope.setTop(fileId);
            });
        }
    }
});
app.directive('seSignin',function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.bind('click',function(){
                var fileId=attr.fileid;
                var showTop=$("#"+attr.showtop);
                if(showTop.hasClass("ng-hide")){
                    scope.$apply(showTop.removeClass("ng-hide"));
                }else{
                    scope.$apply(showTop.addClass("ng-hide"));
                }
                scope.setTop(fileId);
            });
        }
    }
});
app.directive('seTaskDetail',function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.bind('click',function(){
                var info=attr.info;
                var title=attr.title;
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                $('#actionsheet_cancel').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');
                $("#taskIntroduce").html(info);
                $("#taskTitle").html(title);
                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                }
            });
        }
    }
});
app.directive('seSelectTheme',function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.bind('click',function(){
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                $('#actionsheet_cancel').one('click', function () {
                    hideActionSheet(weuiActionsheet, mask);
                });
                $(".weui_actionsheet_cell").bind('click',function(){
                    hideActionSheet(weuiActionsheet, mask);
                });
                mask.unbind('transitionend').unbind('webkitTransitionEnd');
                function hideActionSheet(weuiActionsheet, mask) {
                    weuiActionsheet.removeClass('weui_actionsheet_toggle');
                    mask.removeClass('weui_fade_toggle');
                    mask.on('transitionend', function () {
                        mask.hide();
                    }).on('webkitTransitionEnd', function () {
                        mask.hide();
                    })
                }
            });
        }
    }
});
app.directive('loading',['$http','$compile',function($http,$compile) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var text = attr.loading;
            if (text==""){
                text="数据加载中...";
            };
            var html = '<div id="loadingToast" class="weui_loading_toast">' +
                '<div class="weui_mask_transparent"></div>' +
                '<div class="weui_toast">' +
                '<div class="weui_loading">' +
                '<div class="weui_loading_leaf weui_loading_leaf_0"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_1"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_2"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_3"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_4"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_5"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_6"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_7"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_8"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_9"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_10"></div>' +
                '<div class="weui_loading_leaf weui_loading_leaf_11"></div>' +
                '</div>' +
                '<p class="weui_toast_content">'+ text +'</p>' +
                '</div>' +
                '</div>';
            var template = $compile(angular.element(html))(scope);

            function show(){
                angular.element(document.body).append(template)

            };
            function hide() {
                if (template) {
                    template.remove();
                }
            };

            scope.$watch('isLoading', function (newValue, oldValue) {
                if (newValue==true) {
                    show();
                } else {
                    hide();
                }
            })
        }
    }
}]);

app.directive('mediaDelete',['$http','$compile',function($http,$compile) {
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            var index=attr.index;
            ele.bind('click',function(){
                if(confirm("确定要删除吗？")){
                    $("#row"+index).remove();
                    scope.delete(index);
                }else{
                    return false;
                }
            })
        }
    }
}]);

app.directive('compare',function(){
    return{
        restrict:'EA',
        scope:{
            orgText:'=compare'
        },
        require:'ngModel',
        link:function(scope,ele,attr,con){
            con.$validators.compare=function(v){
                return v==scope.orgText;
            }
            con.$watch('orgText',function(){
                con.$validate();
            })
        }
    }
});
app.directive('seSelect',function(){
   return{
       compile: function(tElem,attrs) {
           tElem.css({"text-align":"right","padding":"0 0 0 85%"})
           tElem.find("option").css({"padding":"0 0 0 85%"});
           return function(scope,elem,attrs) {
           };
       }
   }
});

app.directive('seImageVoice',function(){
    return{
        restrict:'EA',
        link:function(scope,ele,attr){
            ele.bind('click',function(){
                var v=attr.seImageVoice;
                $(this).addClass("text-primary").siblings().removeClass("text-primary");
                if(v=="image"){
                    $(".image").show();
                    $(".voice").hide();
                    $(".expert").hide();
                }else if(v=="voice"){
                    $(".image").hide();
                    $(".expert").hide();
                    $(".voice").show();
                }else if(v=="expert"){
                    $(".image").hide();
                    $(".voice").hide();
                    $(".expert").show();
                }
            })
        }
    }
});
app.directive('seShowImg',function(){
    return{
        restrict:'EA',
        link:function(scope,ele,attr){
            scope.$watch('imageSrc',function(newVal,oldVal){
                scope.$apply(ele.attr('src',newVal));
            })
        }
    }
});

app.directive('seSelectExpert',function(){
   return{
        restrict:'EA',
        link:function(scope,ele,attr){
            ele.on('click',function(){
                var selected= ele.children("span");
                if(selected.hasClass("weui_icon_success")){
                    selected.removeClass("weui_icon_success");
                    scope.currExpert="";
                    $("#expert").text("");
                    scope.tell("");
                }else{
                    var selectId=attr.seSelectExpert;
                    scope.currExpert=selectId;
                    var name=attr.name;
                    $("#expert").text(name);
                    $("span.weui_icon_success").removeClass("weui_icon_success");
                    ele.children("span").addClass("weui_icon_success");
                    scope.tell(selectId);
                }
                scope.$apply();
            });
        }
   }
});

app.directive('seExpertLike',function(){
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            ele.bind('click',function(){
                var fileId=attr.fileid;
                if(ele.hasClass("btn-success")) return;
                addLike(fileId);
                ele.removeClass("btn-default").addClass("btn-success");
                addNumber();
            });
            var addLike=function(a){
                scope.addLike(a);
            };
            var addNumber=function(){
                ele.text("已关注");
            }
        }
    }
});

app.directive('seWordFold',function(){
    return{
        restrict: 'EA',
        link:function(scope, ele, attr){
            ele.on('click',function(){
                var id=attr.warp;
                var $w=$("#"+id);
                console.log($w);
                var hasClass=$w.hasClass("se-fold");
                if(hasClass){
                    $w.removeClass("se-fold");
                    $w.addClass("se-unfold");
                    ele.text("收起");
                }else{
                    $w.removeClass("se-unfold");
                    $w.addClass("se-fold");
                    ele.text("全文");
                }
            })
        }
    };
});


app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // 内层DIV的滚动加载
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

app.directive('sePay',['$compile','payService',function($compile,payService){
    return{
        restrict:'EA',
        link:function(scope,elem,attr,model){

            elem.on('click',function(){
                var headImgUrl=attr.headimgurl;
                var nickName=attr.nickname;
                var imgUrl=attr.imgurl;
                var userName=attr.username;
                var type=attr.experttype;
                var fromOpenId = attr.fromopenid;
                var commonId = attr.commonid;
                console.log("commonId");
                console.log(commonId);
                var toOpenId = attr.toopenid + ',' + attr.commonid;
                var src='',name='';
                if(type==0){
                    src=headImgUrl;
                    name=nickName;
                }else{
                    src=imgUrl;
                    name=userName;
                }
                var has=angular.element("#pay").html();
                if(!has){
                    var template='<div class="weui_dialog_alert hidde-pay-dialog " id="pay" >'+
                        '<div class="weui_mask"></div>'+
                        '<div class="weui_dialog" style="position: fixed;">'+
                            '<span id="btnCancel" class="weui_icon_cancel" style="position: absolute; right:0px; top:0px;"></span>'+
                        '<div class="weui_dialog_hd">'+
                            '<div style="position: relative; text-align: center; padding-top:10px;">' +
                                '<img id="userImg" style=" width: 60px;" class="img-circle" src="'+src+'" >'+
                                '<div id="userName" style="padding:15px;">'+name+'</div>'+
                                '<div class="text-muted" style="font-size:13px;">谢谢您的支持，祝您健康</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="weui_dialog_bd">'+

                            '<hr>'+
                            '<div class="container" style="padding-left:0;padding-right:0;">'+
                                '<div class="row">'+
                                    '<div class="col-xs-4 padding5"><span id="pay2" class="weui_btn weui_btn_plain_primary">2元</span></div>'+
                                    '<div class="col-xs-4 padding5"><span id="pay5" class="weui_btn weui_btn_plain_primary">5元</span></div>'+
                                    '<div class="col-xs-4 padding5"><span id="pay10" class="weui_btn weui_btn_plain_primary">10元</span></div>'+
                                    '<div class="col-xs-4 padding5"><span id="pay20" class="weui_btn weui_btn_plain_primary">20元</span></div>'+
                                    '<div class="col-xs-4 padding5"><span id="pay50" class="weui_btn weui_btn_plain_primary">50元</span></div>'+
                                    '<div class="col-xs-4 padding5"><span id="pay100" class="weui_btn weui_btn_plain_primary">100元</span></div>'+
                                '</div>' +
                                '<div class="row" style="padding-top:15px;">' +
                                    '<div class="col-xs-12"><p>感谢以下用户的支持：</p></div>'+
                                '</div>' +
                                '<div class="row text-left" id="payList" style="">' +
                                '</div>' +
                            '</div>'+
                        '</div>'+
                        '<div class="weui_dialog_ft" style="padding-bottom:15px;">' +
                        '</div>'+
                        '</div>'+
                        '</div>';

                    var dialog=$compile(template)(scope);
                    angular.element("body").append(dialog);
                    angular.element("#btnCancel").bind('click',function(){
                        dialog.toggleClass("hidde-pay-dialog");
                    });
                    angular.element("#pay2").bind('click',function(){
                        initPay(fromOpenId, 99, 1, toOpenId);/*104*/
                    });
                    angular.element("#pay5").bind('click',function(){
                        initPay(fromOpenId, 105, 1, toOpenId);
                    });
                    angular.element("#pay10").bind('click',function(){
                        initPay(fromOpenId, 106, 1, toOpenId);
                    });
                    angular.element("#pay20").bind('click',function(){
                        initPay(fromOpenId, 107, 1, toOpenId);
                    });
                    angular.element("#pay50").bind('click',function(){
                        initPay(fromOpenId, 108, 1, toOpenId);
                    });
                    angular.element("#pay100").bind('click',function(){
                        initPay(fromOpenId, 109, 1, toOpenId);
                    });
                    dialog.toggleClass("hidde-pay-dialog");
                    payList(commonId);
                }else{
                    var dialog=angular.element("#pay");
                    angular.element("#userImg").attr("src",src);
                    angular.element("#userName").text(name);
                    dialog.toggleClass("hidde-pay-dialog");
                    payList(commonId);
                };
                function initPay(openId,productId,number,to){
                    var dialog = angular.element("#pay");
                    dialog.toggleClass("hidde-pay-dialog");
                    payService.pay(openId,productId,number,to).then(function(res){
                        var out_trade_no = res.outTradeNo;
                        var pay_parameters = res.payParameters;

                         wx.chooseWXPay({
                             timestamp: pay_parameters.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                             nonceStr: pay_parameters.nonceStr, // 支付签名随机串，不长于 32 位
                             package: pay_parameters.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                             signType: pay_parameters.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                             paySign: pay_parameters.paySign, // 支付签名
                             success: function (res) {
                             // 支付成功后的回调函数
                             }, error: function (res) {
                             alert(JSON.stringify(res));
                             }, fail: function (res) {
                             alert(JSON.stringify(res));
                             }
                         });
                    });
                };
                function payList(orderId) {
                    payService.payList(orderId).then(function (res) {
                        var list = '';
                        $.each(res, function (index, item) {
                            list += '<div class="col-xs-2"><img class="img-circle" style="width:30px;" src="' + item.headImgUrl + '"></div>';
                        });
                        $("#payList").empty();
                        $("#payList").append(list);
                    })
                }
            });
        }
    }
}]);
app.directive('seShowDialog', ['$compile', '$location', 'subscribeService', function ($compile, $location, subscribeService) {
    return {
        restrict: 'EA',
        link: function (scope, elem, attr) {
            elem.on('click', function () {
                var openId = attr.seShowDialog;
                var has = angular.element("#subscibe").html();
                if (!has) {
                    var template = '<div class="weui_dialog_alert hiddedialog" id="subscibe" >' +
                        '<div class="weui_mask"></div>' +
                        '<div class="weui_dialog">' +
                        '<div class="weui_dialog_hd"><strong class="weui_dialog_title">请先关注服务号</strong></div>' +
                        '<div class="weui_dialog_bd">' +
                            '<img src="./imgs/qa/jiajiaozh.jpg">' +
                        '</div>' +
                        '<div class="weui_dialog_ft">' +
                        '<a href="javascript:;" id="btnok" class="weui_btn_dialog primary">确定</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    var dialog = $compile(template)(scope);
                    angular.element("body").append(dialog);
                    angular.element("#btnok").bind('click', function () {
                        subscribeService.subscribe(openId).then(function (result) {
                            console.log(result);
                            if (result.subscribe == 1) {
                                window.location.href = "http://161s5g6007.51mypc.cn/app/appstart/qav2/baseinfo.ashx?redirect_url=http://161s5g6007.51mypc.cn/app/items/qa.html?r=a=app001|h=start";
                            }
                        });
                        dialog.toggleClass("hiddedialog");
                    });
                    dialog.toggleClass("hiddedialog");
                } else {
                    var dialog = angular.element("#subscibe");
                    dialog.toggleClass("hiddedialog");
                }
            })
        }
    }
}]);


