/**
 * Created by Robot on 2016/6/3.
 */

// 预加载资源
var preload = [
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/music/music.mp3',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/sound.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/bellawang_bg.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/bellawang.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/bencefang_bg.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/bencefang.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/block_black.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/cherryzhou_bg.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/cherryzhou.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/common.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/cover.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/denycui_bg.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/denycui_wd.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/denycui.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/package1.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/package2.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/package3.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/package4.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/shape_19.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/shirt.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/sound_muted.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/sound.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/twinliang_bg.png',
    'http://h5app.qq.com/act/S3/2015CampusRC/assets/images/twinliang.png'
];

// 预加载动画
new preloader({
    files: preload,
    progress: function(err, response, percent) {
        //$('.preloader-percent').text(percent + '%');
        console.log('进度'+percent+'%');
    },
    complete: function() {
        // 隐藏加载器
        //$('.preloader').hide();

        console.log('加载完成');

        return;

        // 判断是否自动播放背景音乐
        if (isAutoPlay === '1') {
            bgAudio.play();
            $(document).one('touchstart', function() {
                bgAudio.play();
            });
        }

        var myslider = new iSlider({
            wrap: '#wrapper',
            item: '.page',
            isVertical: false,
            onslide: function (index) {
                if (index == 0) {
                    var scene = document.getElementById('index_shape');
                    var parallax = new Parallax(scene);
                }

                if (index == 2) {
                    var scene3 = document.getElementById('scene_3');
                    var parallax3 = new Parallax(scene3);
                }

                if (index == 3) {
                    var scene4 = document.getElementById('scene_4');
                    var parallax4 = new Parallax(scene4);
                }

                if (index == 5) {
                    var scene6 = document.getElementById('scene_6');
                    var parallax6 = new Parallax(scene6);
                }
            }
        });
    }
});