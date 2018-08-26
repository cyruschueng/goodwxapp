//依赖
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed'); //有变化才编译
var babel = require('gulp-babel');

// https://github.com/jairtrejo/simple-gulp-template/blob/master/Gulpfile.js
//test文件夹
var configTest = {
    paths: {
        root: "./",
        html: {
            src: "test/module/*.html",
            dest: "test/module/dist"
        },
        js: {
            src: ["test/module/js/*.js"],
            dest: "test/module/dist"
        },
        css: {
            src: ["test/module/css/*.css"],
            dest: "test/module/dist"
        },
        img: {
            src: ["test/module/img/**/*"],
            dest: "test/module/dist"
        },
        sass: {
            src: ["test/module/sass/*.scss"],
            dest: "test/module/css"
        }
    }
};


var configEs6 = {
    paths: {
        root: "./",
        html: {
            src: "es6/*.html",
            dest: ""
        },
        js: {
            src: ["es6/*.js"],
            dest: "es6/dist/"
        },
        css: {
            src: ["es6/*.css"],
            dest: "es6/dist/"
        },
        sass: {
            src: ["es6/*.scss"],
            dest: "es6/dist"
        }
    }
};

var configSass = {
    paths: {
        root: "./",
        html: {
            src: "sass/*.html",
            dest: ""
        },
        js: {
            src: ["sass/*.js"],
            dest: "sass/dist/"
        },
        css: {
            src: ["sass/*.css"],
            dest: "sass/dist/"
        },
        sass: {
            src: ["sass/bat.scss"],
            dest: "sass/dist"
        }
    }
};

var appConfig = {
    configTest: { paths: configTest.paths },
    configEs6: { paths: configEs6.paths },
    configSass: { paths: configSass.paths },
};

var env = 'configTest'; // 环境

var config = { //配置
    paths: appConfig[env].paths
};

// 静态服务器
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.paths.root
        },
        port: 80,
        notify: false //不显示在浏览器中的任何通知
    });
});

// scss编译css，浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src(config.paths.sass.src)
        .pipe(sass().on('error', sass.logError)) //有错误不中断
        .pipe(autoprefixer({
            "browsers": [
                "last 10 versions",
                "last 12 Chrome versions",
                "Firefox > 20",
                "ie 6-8"
            ],
            cascade: true
        }))
        .pipe(changed(config.paths.sass.dest))
        .pipe(gulp.dest(config.paths.sass.dest))
        .pipe(reload({ stream: true }));
});

/* es6 */
gulp.task('es6', function() {
    return gulp.src(config.paths.js.src)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(changed(config.paths.js.dest))
        .pipe(gulp.dest(config.paths.js.dest))
        .pipe(reload({ stream: true }));
});

//监视更新
gulp.task('watch', function() {
    gulp.watch(config.paths.html.src).on('change', reload); //reload({stream: true})不自动更新
    gulp.watch(config.paths.sass.src, ['sass']);
    gulp.watch(config.paths.js.src, ['es6']);
    gulp.watch(config.paths.js.src).on('change', reload);
});

//默认命令
gulp.task('default', ['serve', 'watch', 'sass', 'es6']);