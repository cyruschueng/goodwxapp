(function($) {
    $.fn.spasticNav = function(options) {
        options = $.extend({
            tpl : '<li id="blob"><a></a></li>',
            overlap : 20,
            speed : 300,
            reset : 50,
            color : 'none',
            easing : 'easeOutExpo'
        }, options);
        return this.each(function() {
            var nav = $(this),
                currentPageItem = $('.current', nav),
                blob = $('#blob', nav),
                reset;
            if(nav.data('fn-nav') == 'spasticNav'){
                blob.css({
                    width : currentPageItem.outerWidth(),
                    height : currentPageItem.outerHeight() + options.overlap,
                    left : currentPageItem.position().left,
                    top : currentPageItem.position().top - options.overlap / 2,
                    backgroundColor : options.color
                })
            }else{
                $(options.tpl).css({
                    width : currentPageItem.outerWidth(),
                    height : currentPageItem.outerHeight() + options.overlap,
                    left : currentPageItem.position().left,
                    top : currentPageItem.position().top - options.overlap / 2,
                    backgroundColor : options.color
                }).appendTo(this);
                nav.data('fn-nav', 'spasticNav');
                blob = $('#blob', nav);
            }
            $('li:not(#blob)', nav).off('mouseenter mouseleave').hover(function() {
                // mouse over
                clearTimeout(reset);
                blob.stop().animate(
                    {
                        left : $(this).position().left,
                        width : $(this).width()
                    },
                    {
                        duration : options.speed,
                        easing : options.easing,
                        queue : false
                    }
                );
            }, function() {
                // mouse out
                reset = setTimeout(function() {
                    blob.stop().animate({
                        width : currentPageItem.outerWidth(),
                        left : currentPageItem.position().left
                    }, options.speed)
                }, options.reset);

            });
        }); // end each
    };
})(jQuery);