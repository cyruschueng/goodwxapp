app.directive('checkClassName',['homeService',function(homeService){
    return {
        restrict: 'AE',
        require: "ngModel",
        link : function(scope, element, attrs,ctrl) {
            element.on('input',function(){
                var v= element.val();
                console.log(v);
                homeService.checkClass(v).then(function(res){
                    
                })
            })
        }
    };
}]);


app.directive('selectClass',['memberService',function(memberService){
    return {
        restrict: 'AE',
        link : function(scope, element, attrs) {
            element.on('click',function(){
                element.select({
                    title: "选择班级",
                    items: scope.classList|| [],
                    onChange:function(res){
                        console.log(res.values);
                        scope.getList(res.values);
                    }
                });
             })
        }
    };
}]);


