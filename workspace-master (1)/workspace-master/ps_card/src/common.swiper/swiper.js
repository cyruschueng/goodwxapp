define(function(require, exports, module) {
    var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
        //require("../../src/common.swiper/swiper.min.css");
    var swiperTpl = require("../../src/common.swiper/swiper.tpl");
    var Swiper = require("swiper");


    var swiperApp = {
        swiperInit: function(banner){
            box.render($(".temp_banner"), banner, swiperTpl);
            var len = banner.length;
            
            var swiper = new Swiper('.temp_banner', {
                pagination: '.swiper-pagination',
                spaceBetween: 0,
                centeredSlides: true, //活动块居中
                autoplay: 3000
            }); 
        }
    };
    
    module.exports = swiperApp;
});