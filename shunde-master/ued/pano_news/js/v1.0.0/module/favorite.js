/**
 * @description: 喜欢
 * @author: Franco
 * @update:
 */
define('module/favorite', [
    'common/interface', 
    'common/util',  
    'common/errCode'
], function(inter, util, errCode){
    var ajaxObj = null;
    
    return {
        /**
         * 喜欢
         */
        init: function(linkObj, call){
            var self = this;
            linkObj.on('click', function(e){
                e.preventDefault();
                var $this = $(this),
                    projectId = $this.attr('data-pid') || $this.attr('data-projectid') || 0,
                    likeNum = parseInt($this.find('.p-love-num').text()) || 0,
                    ajaxLoading = $this.hasClass('ajaxLoading'),
                    active = $this.hasClass('active');

                if(!ajaxLoading){
                    self.hasActive(active, function(){
                        $this.addClass('ajaxLoading');
                        self.do(projectId, active ? 'DELETE' : 'POST', function(json){
                            $this.removeClass('ajaxLoading');
                            if(active){
                                $this.removeClass('active').prop('title', '喜欢').find('.p-love-num').text(likeNum - 1);
                            }else{
                                $this.addClass('active').prop('title', '已喜欢').find('.p-love-num').text(likeNum + 1);
                            }
                            call && call($this);
                        }, function(){
                             $this.removeClass('ajaxLoading');
                             $.alert('服务器繁忙，请稍后再试。');
                        });                        
                    });
                }
            });
        },
        hasActive: function(active, call){
            if(active){
                $.confirm('确认取消喜欢？', function(){
                    call && call();
                }, function(){});
            }else{
                call && call();
            }
        },
        /**
         * 喜欢ajax
         */
        do: function(projectId, method, call, errCall){
            ajaxObj && ajaxObj.abort();
            ajaxObj = util.setAjax(util.strFormat(inter.getApiUrl().favoriteUrl, [projectId]), {}, function(json){
                if(json.code){
                    $.alert(errCode.get(json.code));
                }else{
                    call && call(json);
                }
            }, function(){
                errCall && errCall();
            }, method || 'POST')
        }
    }
});