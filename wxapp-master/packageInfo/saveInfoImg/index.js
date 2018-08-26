/**
 * @file 诗词大会保存个人信息页
 * @author niejianhui
 */
import config from '../../utils/config';
import wxService from '../../utils/wxService';
import util from '../../utils/util';
import * as t from '../../utils/loginKey';
import REPORT_LOG from '../../enums/REPORT_LOG';
var Charts = require('../../utils/Charts.js')
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
const bgMusicManager = util.bgMusicManager;
const bgMusics = util.getBgMusics;
var radarChart;
var textsMap = [
    '一个人只拥有此生此世是不够的，他还应该拥有诗意的世界',
    '生活不只眼前的苟且，还有诗和远方',
    '诗歌是一团火，在人的灵魂里燃烧。这火燃烧着，发热发光',
    '我们读诗写诗，并非因为它的灵巧。我们读诗写诗，因为我们是人类的一员',
    '粗缯大布裹生涯，腹有诗书气自华'
];
var textIndex = Math.floor(Math.random() * 5);
const app = getApp();

var canvasContext = wx.createCanvasContext('saveinfo-canvas');
var systemInfo = wx.getSystemInfoSync();
var windowWidth = systemInfo.windowWidth;
var windowHeight = systemInfo.windowHeight;
var pxPercent = windowWidth * 2 / 750;
var radarWidth = 221 * pxPercent - 10;
var radarHeight = 210 * pxPercent;
Page({
    data: {
        gradeMap: config.GRADE_MAP,
        userUniqText: textsMap[textIndex],
        saveInfoImgPath: '',
        isHTC: util.isHTC(),
        shareShow: null,
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_USER_PROFILE_PAGE);
        this.setData({
            shareShow: app.globalData.shareShow
        })
        wxService({
            url: serverHost + PATHS.GET_MY_VALUE,
            data: {
                key: 'um:qun:fe:saveImg'
            },
            success(res) {
                me.setData({
                    saveImg: +res
                })
            }
        });
        var me = this;
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
        wxService({
            url: serverHost + PATHS.PROFILE,
            data: {},
            success: function (backendData) {
                me.setData({
                    profile: backendData.profile
                });
            },
            isShowLoading: true,
            loadingTip: '登录中',
            loadingMask: true
        });
        //radar 图
        wxService({
            url: serverHost + PATHS.RADAR,
            data: {},
            success: function (backendData) {
                var radar = backendData.radar;
                me.setData({
                    radar: radar
                });
                radarChart = new Charts({
                    canvasId: 'info-canvas',
                    type: 'radar',
                    animation: false,
                    dataPointShape: false,
                    legend: false,
                    categories: me.getItemArray(radar.polar, 'text'),
                    categoriesOffset: {
                        '0': {
                            Y: -8
                        },
                        '3': {
                            Y: 3
                        },
                        '4': {
                            X: -12,
                            Y: -3
                        },
                        '5': {
                            X: -15,
                            Y: 3
                        },
                    },
                    series: [
                        {
                            data: radar.series,
                            color: '#31D486'
                        }
                    ],
                    width: radarWidth,
                    height: radarHeight,
                    extra: {
                        radar: {
                            maxDataArray: me.getItemArray(radar.polar, 'max'),
                            gridColor: '#9D9D9E',
                            labelColor: '#ffffff',
                            labelFontSize: '16'
                        }
                    }
                });
                setTimeout(function () {
                    me.drawSaveInfoCanvas();
                }, 300);
            },
            isShowLoading: true,
            loadingTip: '加载中',
            loadingMask: true
        });
    },
    getItemArray: function (objArray, key) {
        var arr = [];
        for(var i = 0; i < objArray.length; i++) {
            arr.push(objArray[i][key]);
        }
        return arr;
    },
    drawQrcode: function () {
        var me = this;
        wx.getImageInfo({
            src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a71401d408a3.jpg',
            success: function (res) {
                var qrcodeWidth = 73 * pxPercent;
                canvasContext.drawImage(res.path,  260 * pxPercent, (windowHeight - 100), qrcodeWidth, qrcodeWidth);
                canvasContext.draw();
                //导出图片
                setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'saveinfo-canvas',
                        success: function(data) {
                            console.log(data.tempFilePath);
                            me.setData({
                                saveInfoImgPath: data.tempFilePath
                            });
                        }
                    });
                }, 500);
            }
        });
    },
    drawAvatar: function () {
        var me = this;
        var profile = me.data.profile;
        var avatarUrl = profile.headImgUrl;
        var nickName = profile.nickName;
        //绘制头像
        canvasContext.setLineWidth(8);
        canvasContext.setStrokeStyle('#e4cdd1');
        wx.getImageInfo({
            src: avatarUrl,
            success: function (res) {
                canvasContext.save();
                canvasContext.beginPath();
                canvasContext.arc(190 * pxPercent, 70 * pxPercent, 35 * pxPercent, 0, 2 * Math.PI)
                canvasContext.stroke();
                canvasContext.clip();
                canvasContext.drawImage(res.path, 155 * pxPercent, 35 * pxPercent, 70 * pxPercent, 70 * pxPercent);
                canvasContext.restore();

                canvasContext.setFontSize(16 * pxPercent);
                canvasContext.setTextAlign('center');
                canvasContext.fillText(nickName + '的诗词气质', 185 * pxPercent, 135 * pxPercent);
                me.drawQrcode();
            }
        });
    },
    drawDotLeft: function () {
        var me = this;
        wx.getImageInfo({
            src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a697eca18159.png',
            success: function (res) {
                canvasContext.drawImage(res.path, 23 * pxPercent, 145 * pxPercent, 14 * pxPercent, 14 * pxPercent);
                me.drawAvatar();
            }
        });
    },
    drawDotRight: function (multipleLine) {
        var me = this;
        var yPos = 175 * pxPercent;
        if (multipleLine) {
            yPos = 200 * pxPercent;
        }
        wx.getImageInfo({
            src: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a697eca4b7b0.png',
            success: function (res) {
                canvasContext.drawImage(res.path, 325 * pxPercent, yPos, 14 * pxPercent, 14 * pxPercent);
                me.drawDotLeft();
            }
        });
    },
    drawBackgroundImg: function () {
        var me = this;
        var userUniqText = me.data.userUniqText;
        //绘制背景图和静态文字
        wx.getImageInfo({
            src: 'https://imgs.genshuixue.com/0baijiatools/484b5ea2840e21cc8faafec6ab90dccc/saveImgBgc.jpg',
            success: function (res) {
                canvasContext.drawImage(res.path, 0, 0, windowWidth, windowHeight);
                //绘制雷达图
                var imgPath = radarChart.context.canvasImgPath;
                canvasContext.drawImage(imgPath, 75 * pxPercent, 225 * pxPercent, radarWidth, radarHeight);
                //绘制文本
                canvasContext.setFillStyle('#FFD517');
                canvasContext.setFontSize(16 * pxPercent);
                canvasContext.setTextAlign('left');
                var multipleLine = false;
                if (userUniqText.length > 17) {
                    multipleLine = true;
                    var firstLineText = userUniqText.substr(0, 18);
                    var secondLineText = userUniqText.substring(18);
                    canvasContext.fillText(firstLineText, 36 * pxPercent, 175 * pxPercent);
                    canvasContext.fillText(secondLineText, 36 * pxPercent, 200 * pxPercent);
                }
                else {
                    canvasContext.fillText(userUniqText, 36 * pxPercent, 175 * pxPercent);
                }

                canvasContext.setFillStyle('#FFFFFF');
                canvasContext.setFontSize(14 * pxPercent);
                canvasContext.fillText('扫码测测我的诗词气质', 45 * pxPercent, (windowHeight - 60));
                me.drawDotRight(multipleLine);
            }
        });
    },
    drawSaveInfoCanvas: function () {
        var me = this;
        me.drawBackgroundImg();
    },
    saveInfoImg: function () {
        t.requestLog('button', REPORT_LOG.MINI_USER_PROFILE_SAVE_IMG);
        var me = this;
        var saveInfoImgPath = me.data.saveInfoImgPath;
        wx.showLoading({
            title: '正在保存'
        });
        if (!saveInfoImgPath) {
            setTimeout(function () {
                me.doSaveInfoImg();
            }, 2000);
        }
        else {
            me.doSaveInfoImg();
        }
    },
    doSaveInfoImg: function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.saveInfoImgPath,
            success: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '保存成功'
                });
            },
            fail: function (err) {
                wx.hideLoading();
                wx.showToast({
                    title: '保存失败'
                });
            }
        });
    }
});
