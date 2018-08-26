/**
 * @description: 格式化活动时间
 * @author: Franco
 * @update:
 */
define('module/formatTimes', [ 
    'common/util'
], function(util){
    return {
        /**
         * 根据json数据格式化输出时间
         */
        init: function(json){
            var self = this,
                returnStr = "";
            try{
                json = $.parseJSON(json);
                switch (json.projectTime){
                    case '0':
                        returnStr = json.times.projectDate + ' ' + json.times.projectStartTime + '至' + json.times.projectEndTime;
                        break;
                    case '1':
                        returnStr = json.times.numberOfStartDate + '至' + json.times.numberOfEndDate + ' 每天 ' + json.times.numberOfStartTime + '至' + json.times.numberOfEndTime;
                        break;
                    case '2':
                        returnStr = json.times.weekHookStartDate + '至' + json.times.weekHookEndDate + ' 每周' + self.numToZh(json.times.weekHookArr) +' ' + json.times.weekHookStartTime + '至' + json.times.weekHookEndTime;
                        break;
                    case '3':
                        var arrStr = [];
                        $.each(json.times, function(i, n){
                            arrStr.push(n.customDate + ' ' + n.customStartTime + '至' + n.customEndTime);
                        });
                        returnStr = arrStr.join('<br>');
                        break;
                }
            }catch(e){
                returnStr = "";
            }finally{
                return returnStr;                
            }
        },
        /**
         * 数字转星期
         */
        numToZh: function (arr){
            var zh = ['一','二','三','四','五','六','日'],
                newArr = [];
            $.each(arr, function(i, n){
                newArr.push(zh[n-1]);
            });
            return newArr.join('、');
        }
    }
});