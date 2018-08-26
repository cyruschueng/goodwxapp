const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';
import SelectArea from '../../../utils/selectarea/selectarea';

const selectArea = new SelectArea();

Page({
    data: {
    },
    onLoad: function (options) {
        if (options.id) {
            this.setData({ id: options.id });
            //加载数据
            requestUtil.get(urls.member.address.info, { id: options.id }, (info) => {
                this.setData(info);
            }, {
                    failAfter: () => {
                        wx.navigateBack();
                    }
                });
        }
        //初始化区域选择
        selectArea.load(this, {});
    },
    //新增或修改地址
    onWriteSubmit: function (e) {
        if (requestUtil.isLoading(this.weiteRQId)) return;

        const values = _.extend({
            id: this.data.id,
            form_id: e.detail.formId,
        }, selectArea.getResult(), e.detail.value);

        const url = this.data.id ? urls.member.address.update : urls.member.address.create;
        requestUtil.post(url, values, () => {
            listener.fireEventListener('address.update');
            wx.navigateBack();
        });
    },
})