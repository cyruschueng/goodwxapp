const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    weibaId: 0,
    imgUploadIds: [],
    data: {
        userInfo: {},
        imgs: [],
        btnPushDisable: true
    },
    //页面初始化
    onLoad: function (options) {
        //加载版块数据
        requestUtil.get(urls.bbs.weiba.lists, {}, (data) => {
            this.weibaId = data[0].id;
            this.setData({ weiba_list: data, weiba_name: data[0].weiba_name, btnPushDisable: false });
        });
    },
    //版块被改变
    onPickerChange: function (e) {
        const value = e.detail.value;
        this.weibaId = this.data.weiba_list[value].id;
        this.setData({ weiba_name: this.data.weiba_list[value].weiba_name });
    },
    //选择图片
    onChoiceImageTap: function (e) {
        if (this.data.imgs.length >= 3) {
            wx.showModal({
                title: '提示',
                content: '对不起，最多可上传三张图片',
                showCancel: false
            })
            return false
        }

        wx.chooseImage({
            count: 3 - this.data.imgs.length,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
                this.setData({ imgs: this.data.imgs.concat(res.tempFilePaths) });
            }
        })
    },
    //删除图片
    onDelImgTap: function (e) {
        const dataset = e.currentTarget.dataset, index = dataset.index;
        this.data.imgs.splice(index, 1);
        this.setData({ imgs: this.data.imgs });
    },
    //上传图片
    onFormSubmit: function (e) {
        if (requestUtil.isLoading(this.pushRQId)) return;
        const values = _.extend({
            form_id: e.detail.formId,
            weiba_id: this.weibaId
        }, e.detail.value);

        const handler = (imgIds) => {
            values.img_ids = imgIds.join(',');
            this.pushRQId = requestUtil.post(urls.bbs.post.create, values, (data) => {
                listener.fireEventListener('post.add', data);
                wx.navigateBack();
            });
        };

        if (this.data.imgs.length) {
            //先上传图片
            this.imgUploadIds = [];
            this.updateImages(0, handler);
        } else {
            //直接提交
            handler([]);
        }
    },
    //上传图片
    updateImages: function (index, callback) {
        this.pushRQId = requestUtil.upload(urls.public.upload, this.data.imgs[index], 'img', {}, (res) => {
            this.imgUploadIds.push(res.img.id);
            index++;
            if (index >= this.data.imgs.length) {
                callback(this.imgUploadIds);
            } else {
                this.updateImages(index, callback);
            }
        });
    }
})