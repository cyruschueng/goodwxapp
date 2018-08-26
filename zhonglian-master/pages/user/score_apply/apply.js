// pages/user/info/score_apply.js

const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pictures: [],
        uploadedFiles: [],
        depts: [
            { deptId: 2, title: '综合办公室' },
            { deptId: 3, title: '投资安全部' },
            { deptId: 4, title: '营销加管部' },
            { deptId: 7, title: '财务资产部' }
        ],
        deptIndex: 0,
        score: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //加载用户信息
        requestUtil.get(urls.member.info, {}, (info) => {
            this.setData({ userInfo: info });
        });
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
     * 选择三部一室
     */
    onDeptChange(e) {
        const index = e.detail.value;
        this.setData({ deptIndex: index });
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
            if (this.data.userInfo.is_manager) {
                values.dept_id = this.data.depts[this.data.deptIndex].deptId;
            }
            console.log(values);
            this.pushRQId = requestUtil.post(urls.ranking.apply, values, (data) => {
                console.log(data, urls.ranking.apply);
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

})