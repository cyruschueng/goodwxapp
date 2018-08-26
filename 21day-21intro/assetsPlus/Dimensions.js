/**
 * 尺寸
 * Created by lip on 2016/5/23.
 */

var $ = require('jquery');
const W = screen.width;
const H = screen.height;
const IPHONE6_WIDTH = 375;
const IPHONE6_HEIGHT = 667;

var widthScale,heightScale;

class Dimensions {
    constructor() {
        this.W = W;
        this.H = H;
    }

    init() {
        let html = $('html');
        widthScale = this.widthScale = W / IPHONE6_WIDTH;
        heightScale = this.heightScale = H / IPHONE6_HEIGHT;


        html.css({
            'font-size': 20*heightScale,
            'width': W
        });
    }

    static outInit(outW,outH) {
        let html = $('html');
        widthScale = this.widthScale = outW / IPHONE6_WIDTH;
        heightScale = this.heightScale = outH / IPHONE6_HEIGHT;


        html.css({
            'font-size': 20*heightScale,
            'width': W
        });
    }

    /**
     * 获取(浏览器)屏幕高度
     * @returns {number}
     */
    static getWindowHeight() {
        return Math.min(screen.height, window.innerHeight);
    }

    /**
     * 获取(浏览器)屏幕宽度
     */
    static getWindowWidth() {
        return Math.min(screen.width, window.innerWidth);
    }

    static getWidthScale() {
        return widthScale;
    }

    static getHeightScale() {
        return heightScale;
    }

}

module.exports = Dimensions;
