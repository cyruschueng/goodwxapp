

app.directive('showImage', [function() {
    return {
        compile: function(tElem,attrs) {
            return function(scope,elem,attrs) {
                elem.attr("src",attrs.url);
            };
        }
    };
}]);


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

app.directive('loading',['$http','$compile',function($http,$compile) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var text = attr.loading;
            if (text==""){
                text="数据加载中...";
            };
            var html = '<div id="loadingToast"  class="weui_loading_toast">' +
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

app.directive('seVerticalCenter',function(){
    return{
        restrict:'EA',
        link: function(scope,ele,attr) {
            var height=$(document).height();
            var width=$(document).width();

            ele.css({position:'absolute',top: height/2+'px',left: width/2+'px'});
            //ele.css({position:'absolute',top: '50%',left: '50%'});
        }
    }
});

app.directive('seTest',function($timeout,$interval){
    return{
        restrict:'EA',
        link: function(scope,ele,attr) {
            //获取题库
            var library=scope.question;
            /*执行次数*/
            var time=0;
            /*总题数量*/
            var length=library.length;
            /*循环执行*/
            var interval = $interval(updateClock,1000,length);
            /*循环执行*/
            interval.then(function(){
                //执行成功
                setQuestion();
            },function(){
                //执行失败
            });
            interval.cancel(function(){
                //执行取消

            });
            /*更新计时器*/
            function updateClock(){
                time+=1;
                scope.info.clock=clock;
            };
            /*出题*/
            function setQuestion(){
                var m= library[0];
            }
        }
    }
});
app.directive('seNavbar',function(){
    return{
        restrict:'EA',
        link:function(scope,ele,attr){
            var tab=attr.seNavbar;
            ele.bind('click',function(){
                $(this).addClass('weui_bar_item_on').siblings('.weui_bar_item_on').removeClass('weui_bar_item_on');
                tab=attr.seNavbar;
                show(tab);
                scope.$apply();
            });
            function show(t){
                if(t=='detail'){
                    scope.show.detail=true;
                    scope.show.section=false;
                    scope.show.exercise=false;
                    scope.show.internship=false;
                }else if(t=='section'){
                    scope.show.detail=false;
                    scope.show.section=true;
                    scope.show.exercise=false;
                    scope.show.internship=false;
                }else if(t=='exercise'){
                    scope.show.detail=false;
                    scope.show.section=false;
                    scope.show.exercise=true;
                    scope.show.internship=false;
                }else if(t=='internship'){
                    scope.show.detail=false;
                    scope.show.section=false;
                    scope.show.exercise=false;
                    scope.show.internship=true;
                }
            };
        }
    }
});

app.directive('seMp3',function(){
    return{
        restrict:'EA',
        scope:{
          ctype:'=courseType'
        },
        link:function(scope,element,attr){
            element.on('click',function(){
                if(attr.seMp3==1){

                }
            })
        }
    }
});

app.directive('xlToggle', [
    function() {
        return {
            restrict: 'EA',
            link: function(scope, ele, attrs) {
                var target = attrs.xlToggle;
                if (target != undefined) {
                    var dom = angular.element(document.querySelector(target));
                    ele.bind('click', function() {
                        dom.toggleClass('active');
                    });
                }
            }
        };
    }
]);
app.directive('xlProgressBar', [
    function() {
        return {
            link: function(scope, ele, attrs) {
                var audio = document.getElementById('fr').contentWindow.document.getElementById('audio');
                ele.bind('click', function(e) {
                    var rect = ele[0].getBoundingClientRect(); //进度条rect
                    var _beginX = rect.left;//进度条X坐标
                    var x = e.x;//点击点坐标
                    var percent = (x - _beginX) / rect.width;//百分比
                    percent = percent > 1 ? 1 : percent;
                    var time = scope.song.time;
                    var played = time * percent;
                    audio.currentTime = played;
                    scope.song.currentTime = played;
                });
            }
        }
    }
]);

app.directive('seTimer',['$compile',function($compile){
    return{
        restrict:'EA',
        link:function(scope,ele,attrs){
            var now=moment(attrs.nowadays,"YYYY-MM-DD HH:mm:ss").unix(); //new Date(attrs.nowadays).getTime();
            var startTime=moment(attrs.starttime,"YYYY-MM-DD HH:mm:ss").unix(); //new Date(attrs.starttime).getTime();
            var endTime=moment(attrs.endtime,"YYYY-MM-DD HH:mm:ss").unix();//new Date(attrs.endtime).getTime();

            function countFunc(second, minute, hour, day){
                var m=moment(attrs.starttime).format("YYYY-MM-DD HH:mm");
                var str="";
                if(day!=0){
                    str+="开课时间："+m;
                    return str;
                }
                if(hour!=0){
                    str+="离开课时间还剩："+hour+"小时";
                    return str;
                }
                if(minute!=0){
                    str+=minute+"分";
                }else{
                    str+="0分";
                }
                if(second!=0){
                    str+=+second+"秒";
                }else{
                    str+="0秒";
                }
                str==""?"0":str;
                return "<font color='#f00'>离开课时间还剩："+str+"</font>";
            };
            var Timeer=function(startime,endtime,now,countFunc){
                this.time = Math.floor(startime-now); //时间
                this.end=Math.floor(endtime-now);
                this.countFunc=countFunc;
            };
            Timeer.prototype.start=function(){
                var self = this;
                var ctl=$("#"+attrs.ctl);
                if(isNaN(self.time)){
                    ele.parents("p").next("div").children("div").find(".learn_state").html("<font style='color:#f0ad4e; size:12px;'>进入学习</font>");
                    ele.parents("p").html("&nbsp;");
                    return;
                }
                self.flag = setInterval(function () {
                    if (self.time < 0) {
                        scope.$apply(function(){
                            ele.parents("p").next("div").children("div").find(".learn_state").html("<font style='color:#f0ad4e; size:12px;'>进入学习</font>");
                            ele.parents("p").html("&nbsp;");
                        });
                        ele.parents("p").next("div").children("div").find(".learn_state").html("<font style='color:#f0ad4e; size:12px;'>进入学习</font>");
                        ele.parents("p").html("&nbsp;");
                        clearInterval(self.flag);
                    }else{
                        var minute, hour, day, second;
                        day = Math.floor(self.time / 60 / 60 / 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 / 24) : Math.floor(self.time / 60 / 60 / 24);
                        hour = Math.floor(self.time / 60 / 60 % 24) < 10 ? '0' + Math.floor(self.time / 60 / 60 % 24) : Math.floor(self.time / 60 / 60 % 24);
                        minute = Math.floor(self.time / 60 % 60) < 10 ? '0' + Math.floor(self.time / 60 % 60) : Math.floor(self.time / 60 % 60);
                        second = Math.floor(self.time % 60) < 10 ? '0' + Math.floor(self.time % 60) : Math.floor(self.time % 60);
                        var v= self.countFunc(second, minute, hour, day);
                        ele.html(v);
                        self.time--
                    }
                },1000);
                if(this.end<0){
                    ele.parents("p").next("div").children("div").find(".learn_state").html("<font style='color:#f0ad4e; size:12px;'>进入学习</font>");
                    ele.parents("p").html("&nbsp;");
                }
            };
            var t=new Timeer(startTime,endTime,now,countFunc);
            t.start();
        }
    }
}]);
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};


app.directive('uiLazyload' , ['$document' , '$window' ,function(document , window){

    var $ = function(ele){
        return angular.element(ele);
    }

    var elements = (function(){
        var _uid =0 ;
        var _list = [];

        return {

            // 获取图片集合
            push : function(ele){
                _list[_uid ++] = ele ;
            },

            // 从集合中删除已load的子集
            del : function(key){
                _list[key] && delete _list[key] ;
            },

            get : function(){
                return _list  ;
            },

            size : function(){
                return _list.length ;
            }

        }

    })();


    //  元素是否在可视区域
    var isVisible = function(ele){

        var  rect = ele[0].getBoundingClientRect();
        rect.offsetTop = ele[0].offsetTop

        if($(window)[0].parent.innerHeight < rect.offsetTop
            &&  $(window)[0].pageYOffset + $(window)[0].parent.innerHeight < rect.offsetTop
            ||  $(window)[0].pageYOffset >( rect.offsetTop + rect.height)) {
            return false;
        }else{
            return true;
        }
    }

    //  检查图片是否可见
    var checkImage = function(){
        var eles = elements.get();
        angular.forEach(eles ,function(v , k){
            isVisible(v.elem) ? eles[k].load(k) : false ;
        })
    }

    var initLazyload = function(){
        checkImage();
        $(window).on('scroll' , checkImage)
    }

    return {
        restrict : 'EA',
        scope : {
            watch : '='
        },
        link : function(scope , ele , attrs){

            ele.css({
                'background' : '#fff',
                'opacity' : 0,
                'transition' : 'opacity 1s',
                '-webkit-transition' : 'opacity 1s',
                'animation-duration': '1s'
            })

            elements.push({
                elem : ele ,
                load : function(key){

                    ele.attr('src' ,attrs['uiLazyload']);

                    ele.on('load' , function(){
                        ele.css({
                            'opacity' : '1'
                        })
                    })

                    // 加载后从列队里删除
                    if(key >=0 ) elements.del(key);
                }
            });

            initLazyload();
        }
    }
}]);


app.directive('seCurrPlayer' , [function(){
    return{
        restrict : 'EA',
        link:function(scope,ele,attrs){
            var index= attrs.seCurrPlayer;
            ele.on('click',function(){
                selected();
            });
            function init(){
                if(index==0){
                    selected();
                }
            };
            function selected(){

                ele.siblings().find("span").removeClass("text-primary");
                ele.find("span").addClass("text-primary");
                console.log(ele.siblings());
            };
            init();
        }
    }
}]);
app.directive('seActive',[function(){
    return{
        restrict : 'EA',
        link:function(scope,ele,attrs){
            ele.on('change',function(){
                console.log(attrs);
                var input=$("#"+attrs.seActive);
                var that=$(this);
                console.log(that.val());
                if(that.attr('checked')==true){
                    input.removeClass("disabled");
                }else{
                    input.addClass("disabled");
                }
            })
        }
    };
}]);
app.directive('seTel',[function(){
    return{
        restrict : 'EA',
        replace:true,
        template:'<input type="tel" ng-maxlength="11" ng-minlength="11" required ng-pattern="" name="" >'
    };
}]);