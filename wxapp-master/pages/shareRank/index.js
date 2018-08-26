/**
 * @file 诗词大会分享后排行榜
 * @author niejianhui
 */
import config from '../../utils/config';
import util from '../../utils/util';
import wxService from '../../utils/wxService';
import * as t from '../../utils/loginKey';
import REPORT_LOG from '../../enums/REPORT_LOG';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
const bgMusicManager = util.bgMusicManager;
const bgMusics = util.getBgMusics;
Page({
    data: {
        isLoading: false,
        rankImages: [
            '',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed395dd3e.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed390cce6.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed39318f9.png'
        ],
        gradeMap: config.GRADE_MAP,
        hasMore: false,
        currentPage: 1,
        items: []
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_SHARE_RANK_PAGE);
        var me = this;
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
        wx.updateShareMenu({
            withShareTicket: true
        });
        var shareTicket = wx.getStorageSync('SHARETICKET');
        console.log('shareTicket #########');
        wx.getShareInfo({
            shareTicket: shareTicket,
            success: function (data) {
                console.log('getshareInfo success');
                me.setData({
                    iv: data.iv,
                    encryptedData: data.encryptedData
                });
                me.getRankList(1);
            },
            fail: function () {
                console.log('getshareInfo fail');
            },
            complete: function () {
                console.log('getshareInfo complete');
            }
        });
    },
    getRankList: function (page) {
        var me = this;
        var selfData = me.data;
        var items = selfData.items;
        var iv = selfData.iv;
        var encryptedData = selfData.encryptedData;
        me.setData({
            isLoading: true
        });
        wxService({
            url: serverHost + PATHS.GROUP_RANK,
            data: {
                pageDto: {
                    pageSize: 20,
                    pageNum: page
                },
                encryptedData,
                iv
            },
            success: function (backendData, res) {
                var pageDto = res.pageDto;
                var flag = true;
                if (pageDto.pageNum * pageDto.pageSize >= pageDto.count){
                    flag = false;
                }
                me.setData({
                    items: items.concat(backendData),
                    hasMore: flag,
                    currentPage: page.pageNum,
                    isLoading: false
                });
            },
            isShowLoading: true,
            loadingTip: '加载中',
            loadingMask: true
        });
    },
    loadingMore: function () {
        var me = this;
        var selfData = me.data;
        var hasMore = selfData.hasMore;
        var currentPage = selfData.currentPage;
        var isLoading = selfData.isLoading;
        if (hasMore && !isLoading) {
            me.getRankList(++currentPage);
        }
    },
    onShareAppMessage: function (options) {
        var me = this;
        return {
            title: '本群诗词才情排行在此，看看你能排第几？',
            path: util.generateSharePath('/pages/shareRank/index'),
            imageUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c661ab220.png',
            success: function () {
                t.requestLog('share', REPORT_LOG.MINI_SHARE_RANK_SHARE_OK);
            },
            fail: function () {

            },
            complete: function () {

            }
        }
    },
    onclickShare() {
        t.requestLog('button', REPORT_LOG.MINI_SHARE_RANK_SHARE);
    }
});
