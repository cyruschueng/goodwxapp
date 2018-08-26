import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import urls from '../urls';

//最大上传图片数量
const MAX_UPLOAD_IMAGE_COUNT = 6;

Page({
    /**
     * 数据源
     */
    data: {
        cid: 0,//分类ID
        title: '',//分类标题
        uploadFiles: [],//要上传的文件,{file:String,state:Number}
        isUpload: false,//是否正在上传
        disableBtnPush: true,//禁用发布按钮
        isShowStatement: 0,//是否显示免责声明
        is_top: 0,//开启置顶
        is_wallet: 0,//是否发放红包
        is_wallet_avg: 0,//是否平均发放
        is_wallet_pwd: 0,//红包口令
        isAgreeStatement: false,//是否同意协议
    },

    /**
     * 页面被加载
     */
    onLoad: function (options) {
        const { cid, title } = options;
        if (!cid || cid < 0) {
            wx.showModal({
                title: '错误提示',
                content: '非法打开页面，请退出后重试~',
                showCancel: false,
                success: wx.navigateBack
            });
            return;
        }
        if (title) wx.setNavigationBarTitle({ title: title + ' - 发布' });

        //加载本地配置信息
        const mobile = wx.getStorageSync('servers_mobile'), isAgreeStatement = wx.getStorageSync('servers_is_agree_statement');
        this.setData({ mobile: mobile, options: options, cid: cid, title: title, isAgreeStatement: isAgreeStatement });

        //获取位置信息
        this.getLocation();
        //加载网络配置信息
        this.loadConfig();
    },

	/**
	 * 获取位置信息
	 */
    getLocation: function () {
        wx.getLocation({
            success: res => {
                util.getMapSdk().reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success: res => {
                        res = res.result;
                        this.setData({
                            address: res.address,
                            latitude: res.location.lat,
                            longitude: res.location.lng
                        });
                    }
                });
            },
        });
    },

    /**
     * 加载配置数据
     */
    loadConfig: function (callback) {
        const params = { name: 'config,category,show_mcard', cid: this.data.cid };
        requestUtil.get(urls.config.load, params, data => {
            const { config, category, show_mcard } = data;
            wx.setStorageSync('servers_config', config);

            const info = {};
            if (config.top_rule.length) {
                const rule = config.top_rule[0];
                info.top_day = rule.day;
                info.top_amount = rule.amount;
            }

            category.tags = _.map(category.tags, item => { return { active: false, value: item } });

            this.setData(_.extend({
                config: config,
                category: category,
                show_mcard: show_mcard,
                disableBtnPush: false,
                isAgreeStatement: this.data.isAgreeStatement ? true : !config.statement
            }, info));
        });
    },

	/**
	 * 选择图片
	 */
    onChooseUploadImageTap: function (e) {
        // const dataset = e.currentTarget.dataset, index = dataset.index;
        const uploadFiles = this.data.uploadFiles;

        wx.chooseImage({
            count: MAX_UPLOAD_IMAGE_COUNT - uploadFiles.length,
            success: res => {
                _.each(res.tempFilePaths, file => uploadFiles.push({
                    file: file, state: 0
                }));


                this.setData({ uploadFiles: uploadFiles });

                //上传图片
                this.uploadImage();
            }
        });
    },

	/**
	 * 上传图片
	 */
    uploadImage: function () {
        const isUpload = this.data.isUpload;
        if (isUpload) return;
        this.setData({ isUpload: true });

        let index = 0;
        const uploadFiles = [].concat(this.data.uploadFiles);
        const handler = index => {
            const uploadFile = uploadFiles[index], state = uploadFile.state;
            if (state != 2) {
                uploadFile.state = 1;
                this.setData({ uploadFiles: uploadFiles });

                this.pushRQId = requestUtil.upload(urls.document.upload, uploadFile.file, "file", {}, res => {
                    uploadFile.state = 2;
                    uploadFile.url = res;
                }, this, {
                        completeAfter: () => {
                            const info = { uploadFiles: uploadFiles };

                            index++;
                            if (index < uploadFiles.length) handler(index);
                            else info.isUpload = false;

                            this.setData(info);
                        },
                        error: () => uploadFile.state = 3,
                        failAfter: () => uploadFile.state = 3,
                    });
            } else {
                handler(index + 1);
            }
        };

        handler(0);
    },

    /**
     * 预览图片
     */
    onPreviewTap: function (e) {
        if (this.isDeleteAction) return;

        const dataset = e.target.dataset, index = dataset.index;
        const images = [], uploadFiles = this.data.uploadFiles;
        _.each(uploadFiles, item => images.push(item.file));

        wx.previewImage({
            current: images[index],
            urls: images,
        });
    },

    /**
     * 删除选择的图片
     */
    onDeleteImgTap: function (e) {
        const dataset = e.currentTarget.dataset, index = dataset.index;

        wx.showModal({
            title: '温馨提示',
            content: '你确定要删除这个图片吗？',
            success: res => {
                if (res.cancel) return;
                const uploadFiles = this.data.uploadFiles;
                uploadFiles.splice(index, 1);
                this.setData({ uploadFiles: uploadFiles });
            },
        });
    },

	/**
	 * 选择标签
	 */
    onChooseTag: function (e) {
        const dataset = e.currentTarget.dataset, index = dataset.index,
            tags = this.data.category.tags;
        tags[index].active = !tags[index].active;
        this.setData({ category: this.data.category });
    },

    /**
     * 打开地图
     */
    onGetMapLocationTap: function (e) {
        console.log(e);
        wx.chooseLocation({
            success: res => {
                this.setData({
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                });
            }
        });
    },

	/**
	 * 设置值
	 */
    onSetValueTap: function (e) {
        const dataset = e.currentTarget.dataset, name = dataset.name, value = dataset.value;
        const data = {};
        data[name] = value;
        this.setData(data);
    },

    /**
     * 置顶天数已改变
     */
    onTopDayChange: function (e) {
        const rules = this.data.config.top_rule, index = parseInt(e.detail.value);
        if (rules.length == 0) return;

        this.setData({ top_day: rules[index].day, top_amount: rules[index].amount });
    },

    /**
     * 切换同意协议
     */
    onToggleAgreeStatement: function (e) {
        const isAgreeStatement = e.detail.value.length != 0;
        this.setData({ isAgreeStatement: isAgreeStatement });
        wx.setStorageSync('servers_is_agree_statement', isAgreeStatement)
    },

    /**
     * 提交数据
     */
    onPushSubmit: function (e) {
        if (requestUtil.isLoading(this.pushRQId) || this.data.isUpload) return;

        //尝试同步微信信息
        util.trySyncWechatInfo(() => {
            //上传的图片
            const images = [];
            let imageIndex = 0;
            _.each(this.data.uploadFiles, item => {
                if (item.state == 2) {
                    images['imgs[' + imageIndex + ']'] = item.url;
                    imageIndex++;
                }
            });

            //选择的标签
            const tags = {};
            let tagIndex = 0;
            _.each(this.data.category.tags, item => {
                if (item.active) {
                    tags['tags[' + tagIndex + ']'] = item.value;
                    tagIndex++;
                }
            });

            //合并参数
            const values = _.extend({
                formId: e.detail.formId,
                cid: this.data.cid
            }, e.detail.value, images, tags);
            this.pushRQId = requestUtil.post(urls.document.add, values, (info) => {
                wx.setStorageSync('servers_mobile', values.mobile);
                if (info.status == 0) {
                    //是否开启支付
                    if (info.is_pay == 1 || info.is_top) {
                        info.wallet_amount = values.wallet_amount === undefined ? 0 : values.wallet_amount + 0;
                        this.onPayment(info);
                    } else {
                        //跳转我的发布
                        wx.redirectTo({ url: '../my-lists/my-lists', });
                    }
                } else {
                    listener.fireEventListener('severs.info.add', [info]);
                    wx.switchTab({ url: '../index/index' });
                }
            });

        });

    },

    /**
     * 支付
     */
    onPayment: function (info) {
        if (this.data.show_mcard && this.data.is_wallet == 0) {
            //显示余额支付
            wx.showActionSheet({
                itemList: ['余额', '微信支付'],
                success: (res) => {
                    if (res.tapIndex == 0) {
                        const data = this.data, total_amount = parseFloat(data.category.amount) + (data.is_top ? parseFloat(data.top_amount) : 0) + parseFloat(info.wallet_amount);
                        util.payment({
                            id: info.id,
                            total_amount: total_amount,
                            notify_url: urls.document.imprestPay,
                        }, (res) => {
                            if (res.code != 1) {
                                wx.redirectTo({ url: '../my-lists/my-lists', });
                            } else {
                                listener.fireEventListener('severs.info.add', [info]);
                                wx.switchTab({ url: '../index/index' });
                            }
                        });
                    } else if (res.tapIndex == 1) {
                        //微信支付
                        this.onWechatPayment(info);
                    }
                }, fail: () => {
                    //跳转我的发布
                    wx.redirectTo({ url: '../my-lists/my-lists', });
                }
            });
        } else {
            //直接微信支付
            this.onWechatPayment(info);
        }
    },

    /**
     * 微信付款
     */
    onWechatPayment: function (docInfo) {
        requestUtil.get(urls.document.wechatPay, { id: docInfo.id }, (info) => {
            const handler = () => {
                docInfo.is_pay = 2;
                docInfo.status = 1;
                listener.fireEventListener('severs.info.update', [docInfo]);

                wx.showToast({ title: '已审核通过...', icon: 'success' });
                wx.switchTab({ url: '../index/index' });
            };

            if (info === 1) {
                handler();
            } else {
                info.success = handler;
                info.fail = () => {
                    wx.redirectTo({ url: '../my-lists/my-lists', });
                };
                wx.requestPayment(info);
            }
        }, this, {
                error: () => {
                    wx.redirectTo({ url: '../my-lists/my-lists', });
                }
            });
    },

    /**
     * 跳转页面
     */
    onNavigateTap: function (e) {
        const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
        const url = dataset.url, type = dataset.type, nav = { url: url };
        if (dataset.invalid) return;

        if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);
        if ("switch" == type) {
            nav.fail = function () {
                wx.navigateTo({ url: url });
            };
            wx.switchTab(nav);
        } else {
            wx.navigateTo(nav);
        }

    },
})