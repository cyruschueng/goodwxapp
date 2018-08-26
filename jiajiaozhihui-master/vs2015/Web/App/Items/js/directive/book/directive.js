app.directive("slideFollow", function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            id: "@",
            datasetData: "="
        },
        //template: "<li ng-repeat = 'data in datasetData'>{{data.option}}</li>",
        templateUrl: "../items/views/book/home/footer.html",
        link: function (scope, elem, attrs) {
            $timeout(function () {
                var className = $("." + $(elem).parent()[0].className);
                var i = 0, sh;
                var liLength = className.children(".weui-cell").length;
                var liHeight = className.children(".weui-cell").height() + parseInt(className.children(".weui-cell").css('border-bottom-width'));
                // 开启定时器
                sh = setInterval(slide, 2000);

                function slide() {
                    if (parseInt(className.css("margin-top")) > (-liLength * liHeight)) {
                        i++;
                        className.animate({
                            marginTop: -(liHeight + 20) * i + "px"
                        }, "slow");
                    } else {
                        i = 0;
                        className.css("margin-top", "0px");
                    }
                }
                // 清除定时器
                className.hover(function () {
                    clearInterval(sh);
                }, function () {
                    clearInterval(sh);
                    sh = setInterval(slide, 4000);
                })


            }, 0)
        }
    }
});

app.directive('loading', ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr) {
            var text = attr.loading;
            if (text == "") {
                text = "数据加载中...";
            };
            var html = '<div style="display:flex;align-items:center;"><div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">' + text + '</span></div></div>';
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