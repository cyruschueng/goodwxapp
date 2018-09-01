/**
 * @file 诗词大会排行榜
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
const apiMap = {
    'friend': PATHS.FRIEND_RANK,
    'world': PATHS.WORLD_RANK
}
const app = getApp();
Page({
    data: {
        isLoading: false,
        activeTab: 'friend',
        rankImages: [
            '',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed395dd3e.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed390cce6.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67ed39318f9.png'
        ],
        gradeMap: config.GRADE_MAP,
        showAwardRulesDialog: false,
        items: [],
        hasMore: false,
        currentPage: 1,
        shareShow: null
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_RANK_PAGE);
        var me = this;
        me.setData({
            shareShow: app.globalData.shareShow
        })
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
        me.getRankList('friend', 1);
        wx.updateShareMenu({
            withShareTicket: true
        });
        util.getShareMoney('groupRank', me);
    },
    getRankList: function (type, page) {
        var me = this;
        var items = me.data.items;
        me.setData({
            isLoading: true
        });
        wxService({
            url: serverHost + apiMap[type],
            data: {
                pageDto: {
                    pageSize: 20,
                    pageNum: page
                }
            },
            success: function (backendData, res) {
                var pageDto = res.pageDto;
                var flag = true;
                var rank;
                if (pageDto.pageNum * pageDto.pageSize >= pageDto.count){
                    flag = false;
                }
                if (type === 'world') {
                    rank = backendData.rank;
                    me.setData({
                        myRank: backendData.myRank
                    });
                } else {
                    rank = backendData;
                }
                me.setData({
                    items: items.concat(rank),
                    hasMore: flag,
                    currentPage: pageDto.pageNum,
                    isLoading: false
                })
            },
            isShowLoading: true,
            loadingTip: '加载中',
            loadingMask: true
        });
    },
    switchTab: function (e) {
        t.requestLog('button',
            e.target.dataset.type === 'friend' ? REPORT_LOG.MINI_RANK_TAB_FRIEND : REPORT_LOG.MINI_RANK_TAB_WORLD);

        var me = this;
        var target = e.target;
        var type = target.dataset.type;
        var activeTab = me.data.activeTab;
        if (activeTab !== type) {
            me.setData({
                activeTab: type,
                items: []
            });
            me.getRankList(type, 1);
        }
    },
    showAwardRules: function () {
        t.requestLog('button', REPORT_LOG.MINI_RANK_RULE);

        var me = this;
        me.setData({
            showAwardRulesDialog: true
        });
    },
    loadingMore: function () {
        var me = this;
        var selfData = me.data;
        var activeTab = selfData.activeTab;
        var hasMore = selfData.hasMore;
        var currentPage = selfData.currentPage;
        var isLoading = selfData.isLoading;
        if (hasMore && !isLoading) {
            me.getRankList(activeTab, ++currentPage);
        }
    },
    onShareAppMessage: function (options) {
        var me = this;
        return {
            title: '本群诗词才情排行在此，看看你能排第几？',
            path: util.generateSharePath('/pages/shareRank/index'),
            imageUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c661ab220.png',
            success: function (e) {
                t.requestLog('share', REPORT_LOG.MINI_RANK_SHARE_OK);
                var shareMoney = me.data.shareMoney;
                shareMoney && util.getShareAward('groupRank', function () {
                    me.setData({
                        extraShareInfo: '',
                        shareMoney: 0,
                    });
                });
            },
            fail: function () {

            },
            complete: function () {

            }
        }
    },
    onclickShare() {
        t.requestLog('button', REPORT_LOG.MINI_RANK_SHARE);
    }
});
