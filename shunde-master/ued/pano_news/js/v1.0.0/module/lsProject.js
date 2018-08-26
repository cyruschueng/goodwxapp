/**
 * @description: 发起项目信息本地存储模块
 * @author: Franco
 * @update:
 */
define('module/lsProject', [
    'module/localStorage'
], function(ls){
    var lsKey = 'PROJECT';
    return {
        /**
         * 保存数据
         */
        save: function(json){
            var lsProject = this.read() || {},
                newObj = {},
                isInsert = true;

            if(json.projectId){
                newObj = lsProject[json.projectId] || {};
                $.each(json, function(i, n){
                    newObj[i] = n;
                });
                if(!$.isEmptyObject(newObj)){
                    lsProject[json.projectId] = newObj;
                    ls.set(lsKey, JSON.stringify(lsProject));
                }
            }
        },
        /**
         * 获取数据
         */
        read: function(){
            var self = this,
                lsValue = ls.get(lsKey),
                returnData = null;

            try{
                return $.parseJSON(lsValue);
            }catch (e){
                return returnData;
            }
        },  
        /**
         * 根据一条数据
         */
        readOne: function(pid){
            var self = this,
                lsValue = ls.get(lsKey),
                returnData = null;

            try{
                returnData = $.parseJSON(lsValue);
                return returnData[pid] || {};
            }catch (e){
                return returnData;
            }
        },         
        /**
         * 根据id编辑数据
         */
        edit : function(id, call){
            var lsProject = this.read();
            $.each(lsProject, function(i, n){
                $.each(n, function(x, y){
                    if(y.projectId == mid){
                        if(call){
                            lsProject[i][x] = call(y);
                            ls.set(lsKey, JSON.stringify(lsProject));
                        }
                        return false;
                    }
                })
            });
        }
    }
});