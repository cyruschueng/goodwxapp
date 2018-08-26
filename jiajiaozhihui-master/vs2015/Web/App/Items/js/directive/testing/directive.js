app.directive('seShowActionsheet',['$location',function ($location) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.on('click',function(){
                var activityId= attr.seShowActionsheet;
                var $iosActionsheet = $('#iosActionsheet');
                var $iosMask = $('#iosMask');
                function hideActionSheet() {
                    $iosActionsheet.removeClass('weui-actionsheet_toggle');
                    $iosMask.fadeOut(200);
                    globalData.exerciseActivityId="";
                }
                function showActionSheet() {
                    $iosActionsheet.addClass('weui-actionsheet_toggle');
                    $iosMask.fadeIn(200);
                }
                $iosMask.on('click', hideActionSheet);
                $('#iosActionsheetCancel').on('click', hideActionSheet);
                $('#iosActionsheetStart').on('click',function(){
                    globalData.exerciseActivityId=activityId;
                    scope.$apply(function(){
                        $location.path('/exercisetesting');
                    })
                });
                $('#iosActionsheetRank').on('click',function(){
                    globalData.exerciseActivityId=activityId;
                    scope.$apply(function(){
                        $location.path('/exerciserank');
                    })
                });
                showActionSheet();
            })
        }
    }
}]);

app.directive('seShowExerciseRank',['$location',function ($location) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {

            ele.on('click',function(){
                var rankMethod = attr.seShowExerciseRank;
                var $iosActionsheet = $('#iosActionsheet');
                var $iosMask = $('#iosMask');

                $('#iosActionsheetClass').off('click').on('click',function(){
                    var text= $('#iosActionsheetClass').text();
                    scope.$apply(function(){
                        scope.rankMethod=text;
                    });
                    scope.rankClass();
                    hideActionSheet();
                });
                $('#iosActionsheetAll').off('click').on('click',function(){
                    var text= $('#iosActionsheetAll').text();
                    console.log("iosActionsheetAll");
                    scope.$apply(function(){
                        scope.rankMethod=text;
                    });
                    scope.rankSchool();
                    hideActionSheet();
                });
                $('#iosActionsheetCancel').off('click').on('click', hideActionSheet);
                $iosMask.on('click', hideActionSheet);
                function hideActionSheet() {
                    $iosActionsheet.removeClass('weui-actionsheet_toggle');
                    $iosMask.fadeOut(200);
                }
                function showActionSheet() {
                    $iosActionsheet.addClass('weui-actionsheet_toggle');
                    $iosMask.fadeIn(200);
                }
                showActionSheet();
            })
        }
    }
}]);

app.directive('loading', ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var text = attr.loading;
            if (text == "") {
                text = "数据加载中...";
            };
            var html='<div id="loadingToast" style="display:none;"><div class="weui-mask_transparent"></div><div class="weui-toast"><i class="weui-loading weui-icon_toast"></i><p class="weui-toast__content">' + text + '</p></div></div>';
            var template = $compile(angular.element(html))(scope);

            function show() {
                angular.element(document.body).append(template)
            };
            function hide() {
                if (template) {
                    template.remove();
                }
            };
            scope.$watch('isLoading', function (newValue, oldValue) {
                if (newValue == true) {
                    show();
                } else {
                    hide();
                }
            })
        }
    }
}]);

app.directive('seSelectNavbar', ['$location', function ($location) {
    return {
        restrict: 'EA',
        link:function (scope, ele, attr) {
            ele.on('click',function(){
                var index= attr.seSelectNavbar;
                $(this).addClass('se-weui-bar__item').siblings('.se-weui-bar__item').removeClass('se-weui-bar__item');
                scope.$apply(function(){
                    scope.data.tabs.tabActiveIndex=index;
                })
            })
        }
    }
}]);

app.directive('seNewSelectNavbar', ['$location', function ($location) {
    return {
        restrict: 'EA',
        link:function (scope, ele, attr) {
            ele.on('click',function(){
                var index= attr.seNewSelectNavbar;
                console.log(index);
                $(this).addClass('se-weui-bar__item').siblings('.se-weui-bar__item').removeClass('se-weui-bar__item');
                scope.$apply(function(){
                    if(index==1){
                        //$location.path("/habits");
                        scope.data.tabs.tabActiveIndex=index;
                    }else{
                        scope.data.tabs.tabActiveIndex=index;
                    }
                    scope.data.tabs.tabActiveIndex=index;
                })
            })
        }
    }
}]);

/*滚动加载*/
app.directive("seLoadMore",  ["$window", "$document",function ($window, $document) {
    return function(scope, element) {
        angular.element($window).bind("scroll", function() {
            var pageYOffset = $window.pageYOffset;
            var clientHeight = $document[0].documentElement.clientHeight;
            var offsetHeight = $document[0].body.offsetHeight;
            //当滚动到90%的时候去加载
            if(pageYOffset+clientHeight>offsetHeight*0.8)
            {

                //scope.shopWorkCanLoad是否可加载,controller中定义
                //scope.shopWorkOnLoad是否正在加载,controller中定义
                console.log("load more");
                /*
                if(scope.shopWorkCanLoad==true && scope.shopWorkOnLoad==false){
                    //加载数据,controller中定义
                    scope.loadShopWork();//
                }
                */
            }
        });
    };
}]);
/*点赞*/
app.directive('seHabitLike',[function(){
    return{
        restrict: 'EA',
        link:function(scope, element,attr) {
            element.on('click',function(){
                var index=attr.seHabitLike;
                var islike= scope.habits[index].like.isLike;
                scope.$apply(function(){
                    scope.habits[index].like.isLike=!islike;
                });

                if(islike){
                    removeLike(index);
                }else{
                    addLike(index);
                }
            });
            function addLike(index){
                var userInfo=scope.data.userInfo;
                var headImgUrl=userInfo.headImgUrl;
                scope.$apply(function(){
                    scope.habits[index].like.list.push(headImgUrl);
                });
                updateLike();
            }
            function  removeLike(index){
                var userInfo=scope.data.userInfo;
                var m= scope.habits[index].like.list;
                removeByValue(m,userInfo.headImgUrl);
                scope.$apply(function(){
                    scope.habits[index].like.list=m
                });
                updateLike();
            }
            function removeByValue(arr, val) {
                for(var i=0; i<arr.length; i++) {
                    if(arr[i] == val) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            function updateLike(){
                var detailId=attr.detailid;
                var habitId=attr.habitid;
                scope.likeUpdate(detailId,habitId);
            }
        }
    }
}]);
/*评论*/
app.directive('seHabitComment',[function () {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.on('click',function(){
                var $habitComment = $('#habitComment');
                var $habitCommentMask = $('#habitCommentMask');
                var commentContext=$('#commentContext');

                var maxlenght=attr.maxlenght;
                $("#habitCommentMaxLenght").text(maxlenght);
                var lenght=0;
                $("#habitCommentSend").off('click').on('click',function(){
                    var habitId = attr.habitid;
                    var detailId = attr.detailid;
                    var index = attr.index;
                    var context=commentContext.val();
                    var lenght=$.trim(context).length;
                    if(lenght==0) return;
                    scope.commentSend(detailId,habitId,context,index);
                    hideActionSheet();
                    $('#commentContext').val("");
                });
                $('#commentContext').off('click').on('input',function(){
                    setCommentContext();
                    setInputNum();
                    setCommentSend();
                });
                function setCommentContext(){
                    var lenght=$.trim(commentContext.val()).length;
                    if(lenght>maxlenght){
                        var value= commentContext.val();
                        var val= value.substring(0,maxlenght);
                        commentContext.val(val);
                    }
                    var height=commentContext[0].scrollHeight+'px';
                    commentContext.height(height);
                }
                function setCommentSend(){
                    var lenght=$.trim(commentContext.val()).length;
                    if(lenght==0){
                        $("#habitCommentSend").addClass("weui-btn_disabled");
                    }else{
                        $("#habitCommentSend").removeClass("weui-btn_disabled");
                    }
                }
                function setInputNum(){
                    var lenght=$.trim(commentContext.val()).length;
                    $("#habitCommentInputNum").text(lenght);
                }
                $('#habitCommentCancel').off('click').on('click', hideActionSheet);
                $habitCommentMask.on('click', hideActionSheet);
                function hideActionSheet() {
                    $habitComment.removeClass('weui-actionsheet_toggle');
                    $habitCommentMask.fadeOut(200);
                }

                function showActionSheet() {
                    $habitComment.addClass('weui-actionsheet_toggle');
                    $habitCommentMask.fadeIn(200);
                }
                showActionSheet();
                $('#commentContext').focus();
            })
        }
    }
}]);
/*回复*/
app.directive('seHabitReply',[function () {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.on('click',function(){
                console.log("seHabitReply");
                var $habitComment = $('#habitReply');
                var $habitCommentMask = $('#habitReplyMask');
                var commentContext=$('#replyContext');

                var maxlenght=attr.maxlenght;
                $("#habitReplyMaxLenght").text(maxlenght);
                var lenght=0;
                $("#habitReplySend").off('click').on('click',function(){
                    var habitId = attr.habitid;
                    var detailId = attr.detailid;
                    var index = attr.index;
                    var commentId=attr.commentid;
                    var context=commentContext.val();
                    var lenght=$.trim(context).length;
                    if(lenght==0) return;

                    scope.replySend(detailId,habitId,commentId,context,index);
                    hideActionSheet();
                    commentContext.val("");
                });
                $('#replyContext').off('click').on('input',function(){
                    setCommentContext();
                    setInputNum();
                    setCommentSend();
                });
                function setCommentContext(){
                    var lenght=$.trim(commentContext.val()).length;
                    if(lenght>maxlenght){
                        var value= commentContext.val();
                        var val= value.substring(0,maxlenght);
                        commentContext.val(val);
                    }
                    var height=commentContext[0].scrollHeight+'px';
                    commentContext.height(height);
                }
                function setCommentSend(){
                    var lenght=$.trim(commentContext.val()).length;
                    if(lenght==0){
                        $("#habitReplySend").addClass("weui-btn_disabled");
                    }else{
                        $("#habitReplySend").removeClass("weui-btn_disabled");
                    }
                }
                function setInputNum(){
                    var lenght=$.trim(commentContext.val()).length;
                    $("#habitReplyInputNum").text(lenght);
                }
                $('#habitReplyCancel').off('click').on('click', hideActionSheet);
                $habitCommentMask.on('click', hideActionSheet);
                function hideActionSheet() {
                    $habitComment.removeClass('weui-actionsheet_toggle');
                    $habitCommentMask.fadeOut(200);
                }

                function showActionSheet() {
                    $habitComment.addClass('weui-actionsheet_toggle');
                    $habitCommentMask.fadeIn(200);
                }
                showActionSheet();
                $('#replyContext').focus();
            })
        }
    }
}]);

app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // 内层DIV的滚动加载
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                console.log("scrollTop offsetHeight:"+raw.scrollTop + raw.offsetHeight+"&scrollHeight"+raw.scrollHeight);
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

app.directive('seHabitRecordsValidateMinLength',[function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.input(function(){
                var context= $.trim($(this).val());
                context.length>0?scope.data.minLenght=context.length:scope.data.minLenght=0;
            })
        }
    }
}]);
app.directive('seHabitSelect',[function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.select(scope.data.habitaim);

        }
    }
}]);
app.directive('seHabitSwiper',[function(){
    return{
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.swiper({
                loop: true,
                autoplay: 3000
            });
        }
    }
}]);

app.directive('seSelectAge',[function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var data= {
                title: "请选择年龄",
                cols:[
                    {
                        textAlign: 'center',
                        values:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90]
                    }
                ]
            };
            ele.picker(data);
        }
    }
}]);
app.directive('seSelectSex',[function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var data= {
                title: "请选择性别",
                cols:[
                    {
                        textAlign: 'center',
                        values:['女','男']
                    }
                ]
            };
            ele.picker(data);
        }
    }
}]);
app.directive('seSelectGrade',[function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var data= {
                title: "请选择年级",
                cols:[
                    {
                        textAlign: 'center',
                        values:['幼儿园','一年级','二年级','三年级','四年级','五年级','六年级','初一','初二','初三','高一','高二','高三']
                    }
                ]
            };
            ele.picker(data);
        }
    }
}]);
app.directive('seShowShare',[function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            ele.on('click',function(){
                $.notification({
                    title: "分享",
                    text: "点击右上角的 <span style='color:#f90;font-size: 16px' class='fa fa-ellipsis-v'></span> 或 <span style='color:#f90;font-size: 16px' class='fa fa-ellipsis-h'></span> 分享",
                    media: "<img src='./imgs/gardenia/share.png'>",
                    data: "123",
                    time:3000,
                    onClick: function(data) {

                    },
                    onClose: function(data) {

                    }
                });
            })
        }
    }
}]);
app.directive('memberAction',['$location',function($location){
    return {
        restrict: 'AE',
        controller: function($scope) {
            this.check=function(state){
                if(state==-1){
                    //注册审核失败
                    $location.path("/result").search({
                        title:'权限受限',
                        desc:'审核失败！',
                        success:false,
                        hash:'task'
                    });
                }else if(state==0){
                    //注册审核中
                    $location.path("/result").search({
                        title:'权限受限',
                        desc:'正在审核中，请耐心等待',
                        hash:'task',
                        success:true
                    });
                }else if(state==404){
                    //未注册
                    $location.path("/result").search({
                        title:'权限受限',
                        desc:'请选注册，再使用！',
                        success:true,
                        hash:'memberregist'
                    });
                }
            }
        }
    }
}]);
app.directive('seMemberAction',[function(){
    return {
        restrict: 'EA',
        require:'^memberAction',
        link: function (scope, ele, attr,ctr) {
            var state=attr.seMemberAction;
            ele.on('click',function(){
                ctr.check(state);
            })
        }
    }
}]);

app.directive('checkMemberAudio',[function(){
    return {
        restrict: 'EA',
        require:'^memberAction',
        link: function (scope, ele, attr,ctr) {
            var state=attr.checkMemberAudio;
            ele.on('click',function(){
                if(state!=1){
                    scope.audio.stop();
                    ctr.check(state);
                }else{
                    scope.audio.play();
                }
            })
        }
    }
}]);
app.directive('checkMemberExercise',[function(){
    return {
        restrict: 'EA',
        require:'^memberAction',
        link: function (scope, ele, attr,ctr) {
            var state=attr.checkMemberExercise;
            var exercisesId=attr.exerciseid;
            console.log("checkMemberExercise");
            console.log(attr);
            console.log(exercisesId);
            ele.on('click',function(event){
                if(state!=1){
                    ctr.check(state);
                }else{
                    scope.startExercise(attr.exerciseid);
                }
            })
        }
    }
}]);
app.directive('checkMemberHibitPunch',[function(){
    return {
        restrict: 'EA',
        require:'^memberAction',
        link: function (scope, ele, attr,ctr) {
            var state=attr.checkMemberHibitPunch;
            ele.on('click',function(event){
                console.log('checkMemberHibitPunch');
                console.log(state);
                if(state!=1){
                    ctr.check(state);
                }else{
                    scope.punchCard();
                }
            })
        }
    }
}]);
app.directive('checkMemberHibitRecord',[function(){
    return {
        restrict: 'EA',
        require:'^memberAction',
        link: function (scope, ele, attr,ctr) {
            var state=attr.checkMemberHibitRecord;
            ele.on('click',function(event){
                if(state!=1){
                    ctr.check(state);
                }else{
                    scope.addRecord();
                }
            })
        }
    }
}]);
app.directive('checkMemberHistoryAudio',[function(){
    return {
        restrict: 'EA',
        link: function (scope, ele, attr,ctr) {
            ele.on('click',function(event){
                var index=attr.checkMemberHistoryAudio;
                scope.play(index);
            })
        }
    }
}]);
