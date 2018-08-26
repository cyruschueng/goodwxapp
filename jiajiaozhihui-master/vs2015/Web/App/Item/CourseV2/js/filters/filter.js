

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

app.filter('formattime', [
    function() {
        return function(input) {
            input = parseInt(input) || 0;
            var min = 0;
            var sec = 0;
            if (input > 60) {
                min = parseInt(input / 60);
                sec = input - 60 * min;
                min = min >= 10 ? min : '0' + min;
                sec = sec >= 10 ? sec : '0' + sec;
            }
            else {
                min = '00';
                sec = input >= 10 ? input : '0' + input;
            }
            return min + ':' + sec;
        }
    }
]);

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

/*
* 显示直播的内容
* 如果当前时间大于直播内容定义的时间就要立即显示出来
* */
app.filter('onlineShowed',function(){
    return function(array,now,field){
        var v=[];
        if(array.constructor == Array){
            for(var i=0;i<array.length;i++){
                var o= array[i];
                if(o.constructor == Object){
                    if(o.atOnceShow!=1){
                        var testDate=moment(o[field],"YYYY-MM-DD HH:mm:ss").unix();
                        var date=moment(now,"YYYY-MM-DD HH:mm:ss").unix();
                        if(testDate<=date){
                            v.push(o);
                        }
                    }
                }
            }
        }
        console.log(v);
        return v;
    }
});

/*
 * 显示直播的内容
 * 如果当前时间大于直播内容定义的时间就要立即显示出来
 * */
app.filter('onlineShowing',function(){
    return function(array,now,field){
        var v=[];
        if(array.constructor == Array){
            for(var i=0;i<array.length;i++){
                var o= array[i];
                if(o.constructor == Object){
                    if(o.atOnceShow!=1){
                        var testDate=moment(o[field],"YYYY-MM-DD HH:mm:ss").unix();
                        var date=moment(now,"YYYY-MM-DD HH:mm:ss").unix();
                        if(testDate>date){
                            v.push(o);
                        }
                    }
                }
            }
        }
        return v;
    }
});