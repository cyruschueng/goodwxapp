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


