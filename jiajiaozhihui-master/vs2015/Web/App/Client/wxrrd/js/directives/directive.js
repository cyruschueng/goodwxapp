app.directive('loading', ['$http', '$compile', function ($http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, ele, attr, ctrl) {
            var text = attr.loading;
            if (text == "") {
                text = "数据加载中...";
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
                '<p class="weui_toast_content">' + text + '</p>' +
                '</div>' +
                '</div>';
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
} ]);

app.directive('cityPicker',[function(){
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (scope, ele, attr,ctrl) {
            ele.cityPicker({
                title: "请选择收货地址"
            });
            scope.$watch(attr.ngModel,function(){
                var area=attr.cityPicker;
                var values= area.split(' ');
                scope.card.province=values[0];
                scope.card.city=values[1];
                scope.card.district=values[2];
            });
        }
    }
}]);

app.directive('verifyMachineCode', function () {
    return {
        require: 'ngModel',
        scope: true,
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function (code) {
                if (code != '') {
                    console.log(code);
                    var index = code.toLowerCase().indexOf("sr");
                    if (index == -1) {
                        ctrl.$setValidity('invalidCode', false);
                        return false;
                    } else {
                        ctrl.$setValidity('invalidCode', true);
                        return true;
                    }
                } else {
                    ctrl.$setValidity('invalidCode', true);
                    return true;
                }
            });

            /*
            ctrl.$parsers.push(function (viewValue) {
            console.log(viewValue);
            var index = viewValue.toLowerCase().indexOf("sr");
            var verify = index == -1 ? true : false;
            ctrl.$setValidity('invalidCode', !verify);
            return viewValue;
            });
            */
        }
    }
});

app.directive('existMachineCode', ['registService', '$timeout', function (registService, $timeout) {
    return {
        require: 'ngModel',
        scope: true,
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function (code) {
                var timeout;
                if (code != '') {
                    if (timeout) {
                        $timeout.cancel(timeout);
                    };
                    timeout=$timeout(function () {
                        registService.sameCode(code).then(function (result) {
                            if (result == "true") {
                                ctrl.$setValidity('existCode', false);
                                return false;
                            } else {
                                ctrl.$setValidity('existCode', true);
                                return true;
                            }
                        })
                    }, 500);
                } else {
                    ctrl.$setValidity('existCode', true);
                    return true;
                }
            });
            /*
            ctrl.$parsers.push(function (viewValue) {
            registService.sameCode(viewValue).then(function (result) {
            var same = result == "true" ? true : false;
            ctrl.$setValidity('exist', !same);
            })
            });
            */
        }
    }
} ])
