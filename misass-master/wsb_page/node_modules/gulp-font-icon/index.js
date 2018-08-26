"use strict";

const duplexer = require('plexer');
const gutil = require("gulp-util");
const htmlGen = require("./lib/html-gen");
const iconfontCss = require("gulp-iconfont-css");
const svg2ttf = require('gulp-svg2ttf');
const svgicons2svgfont = require('gulp-svgicons2svgfont');
const through = require('through2');
const ttf2eot = require('gulp-ttf2eot');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const PLUGIN_NAME = "gulp-font-icon";

module.exports = function(options) {

};
function gulpFontIcon(options) {
    let inStream = null;
    let outStream = null;

    options = options || {};

    inStream = iconfontCss({
        fontName: options.fontName,
        targetPath: options.fontName + ".css",
        fontPath: '',
        cssClass: options.fontAlias
    });

    outStream = inStream
      .pipe(svgicons2svgfont(options))
        .pipe(svg2ttf({ clone: true }))
        .pipe(ttf2eot({ clone: true }))
        .pipe(ttf2woff({ clone: true }))
        .pipe(ttf2woff2({ clone: true }));

    inStream = duplexer({ objectMode: true }, inStream, outStream);

    return inStream;
}

module.exports = gulpFontIcon;
gulpFontIcon.htmlGen = htmlGen;
