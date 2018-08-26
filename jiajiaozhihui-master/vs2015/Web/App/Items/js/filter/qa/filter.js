/**
 * Created by lenovo on 2016/7/14.
 */
app.filter('nullOrUndefinedConvert0',function(){
    return function(n){
        if(n==nul||n==undefined){
            return 0;
        }
        return n;
    }
});

app.filter('resourceUrl',function($sce){
    return function(src){
        return $sce.trustAs($sce.RESOURCE_URL,src);
    }
});

app.filter('trustAsHtml',['$sce',function($sce){
    return function(html){
        return $sce.trustAsHtml(html);
    }
}]);

app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});

