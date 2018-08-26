/**
 * @description: 我的主页工具类
 * @author: Franco
 * @update:
 */
define('module/homeUtil', [
    'common/interface', 
    'common/util', 
    'module/cookie'
], function(inter, util, cookie){
    var project = $('#project');
    
    return {
        ajaxAbort: function(num){
            var self = this;
            util.trace(window.ajaxList);
            switch(num){
                case 1:
                    self.listAbort(window.ajaxList.home);
                    self.listAbort(window.ajaxList.homeIn);
                    self.listAbort(window.ajaxList.homeLike);
                    self.listAbort(window.ajaxList.homeWallet);
                    break;
                case 2:
                    self.listAbort(window.ajaxList.home);
                    self.listAbort(window.ajaxList.homeTo);
                    self.listAbort(window.ajaxList.homeLike);
                    self.listAbort(window.ajaxList.homeWallet);
                    break;
                case 3:
                    self.listAbort(window.ajaxList.home);
                    self.listAbort(window.ajaxList.homeTo);
                    self.listAbort(window.ajaxList.homeIn);
                    self.listAbort(window.ajaxList.homeWallet);
                    break;
                case 4:
                    self.listAbort(window.ajaxList.home);
                    self.listAbort(window.ajaxList.homeTo);
                    self.listAbort(window.ajaxList.homeIn);
                    self.listAbort(window.ajaxList.homeLike);
                    break;                    
                default:
                    self.listAbort(window.ajaxList.homeTo);
                    self.listAbort(window.ajaxList.homeIn);
                    self.listAbort(window.ajaxList.homeLike);
                    self.listAbort(window.ajaxList.homeWallet);
                    break;
            }
        },
        listAbort: function(arr){            
            if(arr){
                $.each(arr, function(i, n){
                    if(n){
                        n.abort();
                        arr.splice(i, 1);
                    }
                });
            }
            return arr;
        }
    }
});