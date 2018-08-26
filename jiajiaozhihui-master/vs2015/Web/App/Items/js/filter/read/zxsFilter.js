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
}])