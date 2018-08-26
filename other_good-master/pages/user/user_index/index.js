var app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import {
    duoguan_host_api_url as API_URL,
    duoguan_get_user_menu_url as API_MENU_URL,
    duoguan_user_info_url as API_USER_INFO_URL,
    duoguan_user_info_post_url as API_USER_INFO_SAVE_URL,
    duoguan_config_version as VERSION
} from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';

Page({
    data: {
        userInfo: {},
        bbs_show_status: true,
        shop_show_status: true,
        menu_list: '',
        is_loaded: false,
        has_coupon: true,
        is_open_card: false,
    },

    /**
     * 页面加载完成
     */
    onLoad: function () {
        this.onPullDownRefresh();
        var isFirstSyncUserInfo = wx.getStorageSync('is_first_sync_user_info');
        if (!isFirstSyncUserInfo) {
            this.onSyncWechatInfo();
            wx.setStorageSync('is_first_sync_user_info', true);
        }
    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh: function () {
        //加载用户信息
        requestUtil.get(API_USER_INFO_URL, {}, (data) => {
            const userInfo = _.extend(this.data.userInfo || {}, data);
            this.setData({ userInfo: userInfo });
        }, this, { completeAfter: wx.stopPullDownRefresh });

        //加载菜单信息
        requestUtil.get(API_MENU_URL, { ver_id: VERSION }, (data,res) => {
            //同步微信信息
            data.unshift({
                menus: [{ name: "wechat_info_sync", text: "同步微信信息", link: "wechat_info_sync", icon: "icon-sync", }],
                type: "line"
            });
            data.push({
                menus: [
                    { name: "wechat_address", text: "收货地址", link: "wechat_address", icon: "icon-shouhuodizhi", },
                    { name: "wechat_setting", text: "授权设置", link: "wechat_setting", icon: "icon-xitongshezhi", },
                    { name: "wechat_clear", text: "清除缓存", link: "wechat_clear", icon: "icon-duoguan-qingchuhuancun", }
                ], type: 'line'
            });

            var hasCoupon = _.find(data, { name: 'DuoguanCoupon' }) != null;
            this.setData({ menus: data, is_loaded: true, is_open_card: res.is_open_card });

            // //加载会员卡
            if (res.is_open_card) this.loadMemberCard();
        });

    },

    /**
     * 加载会员卡信息
     */
    loadMemberCard: function () {
        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
            this.setData({ card_info: info });
        }, this, { isShowLoading: false });
    },

    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const dataset = e.currentTarget.dataset, url = dataset.url, name = dataset.name;
        if ("wechat_info_sync" == name) {
            this.onSyncWechatInfo();
        } else if ("wechat_address" == name) {
            wx.chooseAddress({});
        } else if ("wechat_setting" == name) {
            wx.openSetting({});
        } else if ("wechat_clear" == name) {
            wx.showToast({ title: '正在清理中...', icon: 'loading', duration: 10 });
            wx.clearStorageSync();
            wx.showToast({ title: '清理完成', icon: 'success', duration: 1500 });
        } else {
            wx.navigateTo({ url: url })
        }
    },

    /**
     * 同步微信信息
     */
    onSyncWechatInfo: function () {
        if (requestUtil.isLoading(this.syncWechatInfoId)) return;
        util.getUserInfo((info) => {
            //保存用户信息
            this.syncWechatInfoId = requestUtil.post(API_USER_INFO_SAVE_URL, {
                nickname: info.nickName,
                headimgurl: info.avatarUrl,
                sex: info.gender,
                city: info.city, province: info.province,
                country: info.country, language: info.language,
            }, (data) => {
                console.log(data);
                wx.showToast({
                    title: '同步成功！',
                    icon: 'success',
                    duration: 2000
                });
                const userInfo = _.extend(this.data.userInfo || {}, data);
                this.setData({ userInfo: userInfo });
            });
        });
    },

    /**
     * 展开或收缩
     */
    onToggleTap: function (e) {
        const dataset = e.currentTarget.dataset, name = dataset.name;
        const item = _.find(this.data.menus, { name: name });
        if (!item) return;
        item.isshow = !item.isshow;
        this.setData({ menus: this.data.menus });
    },
});