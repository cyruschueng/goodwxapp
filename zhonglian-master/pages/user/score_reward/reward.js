
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({

    /**
     * 数据源
     */
    data: {
        pictures: [],
        uploadedFiles: [],
        score: 3
    },

    /**
     * 页面被加载
     */
    onLoad(options) {
        if (options.uids == '' && options.dept_id == '') {
            wx.showModal({
                title: '错误提示',
                content: '请重新进入此页面，如果还是提示这个信息，请联系管理员！',
                showCancel: false,
            });
            return;
        }

        const type = options.type === undefined ? 1 : options.type,
            failAfter = () => { wx.navigateBack(); },
            errorDialog = function () {
                wx.showModal({
                    title: '错误提示',
                    content: '请重新进入此页面，如果还是提示这个信息，请联系管理员！',
                    showCancel: false,
                });
            };
        if (type == 0) {
            if (options.dept_id == '') {
                errorDialog();
                return;
            }
            requestUtil.get(urls.ranking.departments, { dept_id: options.dept_id }, (data, res) => {
                this.setData({ dept: data, dept_id: options.dept_id, type: type, quota: res.quota, fenzhi: res.fenzhi });
            }, { failAfter: failAfter });
        } else {
            if (options.uids == '') {
                errorDialog();
                return;
            }
            requestUtil.get(urls.member.find, { uids: options.uids }, (data, res) => {
				this.setData({ user: data, uids: options.uids, type: type, quota: res.quota, fenzhi: res.fenzhi, is_manager2: res.is_manager2});
            }, { failAfter: failAfter });
        }

    },

    /**
     * 打开图片
     */
    onOpenPictureTap(e) {
        wx.chooseImage({
            count: 6 - this.data.pictures.length, success: (res) => {
                const pictures = this.data.pictures.concat(res.tempFilePaths);
                this.setData({ pictures: _.uniq(pictures) });
            }
        });
    },

    /**
     * 预览图片
     */
    onPreviewTap(e) {
        if (this.isDeleteAction) return;
        const dataset = e.currentTarget.dataset, index = dataset.index;
        wx.previewImage({
            current: this.data.pictures[index],
            urls: this.data.pictures,
        });
    },

    /**
     * 删除选择的图片
     */
    onDeleteImgTap(e) {
        this.isDeleteAction = true;
        const dataset = e.currentTarget.dataset, index = dataset.index;
        wx.showActionSheet({
            itemList: ['删除'],
            success: (res) => {
                if (res.tapIndex !== 0) return;

                this.data.pictures.splice(index, 1);
                this.setData({ pictures: this.data.pictures });
            }, complete: () => {
                this.isDeleteAction = false;
            }
        })
    },

    /**
     * 单选多选框
     */
    onChange: function (e) {
        const dataset = e.currentTarget.dataset, name = dataset.name;
        const info = {};
        info[name] = e.detail.value;
        this.setData(info);
    },

    /**
     * 数据提交
     */
    onPushSubmit: function (e) {
        if (requestUtil.isLoading(this.pushRQId)) return;

        this.uploadedFiles = [];
        this.uploadFile(0, (files) => {
            const values = _.extend({ form_id: e.detail.formId }, files, e.detail.value);
            console.log(values);
            this.pushRQId = requestUtil.post(urls.ranking.reward, values, (data) => {
                if (data > 0) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '录入未全部完成：' + data.join(','),
                        showCancel: false,
                    });
                }
                wx.navigateBack();
            });
        });

    },

    /**
     * 上传文件
     */
    uploadFile(index, callback) {
        const pictures = this.data.pictures, filepath = pictures[index];
        if (pictures.length === 0) {
            callback.apply(this, this.uploadedFiles);
            return;
        }
        //上传后处理
        const completeAfterHandler = () => {
            if (index >= pictures.length - 1) {
                callback.apply(this, [this.uploadedFiles]);
            } else {
                this.uploadFile(index + 1, callback);
            }
        };

        this.pushRQId = requestUtil.upload(urls.public.upload, filepath, "file", {}, (res) => {
            this.uploadedFiles['imgs[' + index + ']'] = res.file.path;
        }, {
                completeAfter: completeAfterHandler
            });

    },

});