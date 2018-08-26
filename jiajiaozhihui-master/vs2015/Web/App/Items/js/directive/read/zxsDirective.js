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
                    scope.info.voice.stopRecordVoice();
                    scope.info.voice.clear();
                    scope.$apply(scope.info.voice.seVoiceEmpty=true);
                });
                actionsheet_voice.off('click').on('click',function(){
                    if(scope.info.voice.isStrartRecord==true){
                        hideActionSheet(weuiActionsheet, mask);
                        showVoiceMenu(true,true);
                        scope.info.voice.stopRecordVoice();
                        scope.$apply(scope.info.voice.seVoiceEmpty=false);
                    }else{
                        scope.info.voice.startRecordVoice();
                        actionsheet_record.show();
                        $(this).text("完成");
                        interval= setInterval(function(){
                            if(scope.info.voice.isVoiceComplete==true){
                                clearInterval(interval);
                                hideActionSheet(weuiActionsheet, mask);
                                showVoiceMenu(true,true);
                                scope.$apply(scope.info.voice.seVoiceEmpty=false);
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
                        scope.info.voice.initVoiceState();
                    }
                };

                //$("#msgVoiceEmpty").hide();
                scope.$apply(scope.info.voice.seVoiceEmpty=false);
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
                if(ele.hasClass("btn-success")) return;
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
                ele.removeClass("btn-default").addClass("btn-success");
                addNumber();
            });
            var showLikeHeader=function(wrap){
                var likeHeader="<span  class='glyphicon glyphicon-heart' style='font-size:12px; color:#f00;padding-right:5px;'></span>";
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
                showComment(fileId,wrap);
                $(".weui_tabbar").hide();
            });
            var showComment=function(fileId,wrap){
                var mask = $('#mask');
                var weuiActionsheet = $('#weui_actionsheet');
                var context=$("#commentContext");
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .focus()//
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                    });
                $('#actionsheet_submit').off('click').on('click', function () {
                    if($(this).hasClass("disabled")) return;
                    addCommentHtml();
                    addNumber();
                    scope.addComment(context.val(),fileId);
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
                        submit.addClass("btn-info");
                    }else{
                        submit.removeClass("btn-info");
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
                    submit.removeClass("btn-info");
                    submit.addClass("disabled");
                    submit.addClass("btn-default");
                    $(".weui_tabbar").show();
                };
                function addCommentHtml(){
                    var html='<p style="font-size:11px;"> <span class="text-primary">'+scope.nickName()+'</span>:'+context.val()+'</p>';
                    wrap.append(html);
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
})
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