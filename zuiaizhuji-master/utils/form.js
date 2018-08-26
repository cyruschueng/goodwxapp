'use strict';
import dg from './dg.js';
import { duoguan_host_api_url as API_HOST } from './data.js';

/**
 * 组件处理 
 */
function onPutHandler(control) {
	if (control.type == 'checkbox') {
		if (!control.options) return control;
		control.value = control.value != null && !(control.value instanceof Array) ? [control.value] : control.value;

		const newItems = [], oldItems = control.options.items;
		for (var i = 0; i < oldItems.length; i++) {
			const value = oldItems[i];
			if (control.value == null) {
				newItems.push({ value: value, checked: false });
			} else {
				newItems.push({ value: value, checked: control.value.indexOf(value) != -1 });
			}
		}
		control.options.items = newItems;
	} else if (control.type == 'datetime') {
		let date = new Date();
		if (control.value) {
			control.value = control.value.split(' ', 2);
		} else {
			control.value = [
				date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
				date.getHours() + ":" + date.getMinutes()
			];
		}
	} else if (control.type == 'date') {
		let date = new Date();
		control.value = control.value || date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	} else if (control.type == 'time') {
		let date = new Date();
		control.value = control.value || date.getHours() + ":" + date.getMinutes();
	} else if (control.type == 'images') {
		control.value = control.value || [];
		control.options = control.options || { count: 6 };

		control.state = [];
		for (let i = 0; i < control.value.length; i++)  control.state.push(1);
	}
	return control;
}

/**
 * 是否为布尔值
 * @param {any}
 */
function isBoolean(val) {
	return val === true || val === false;
}

export default class Form {

	/**
	 * 构造器
	 * @param {Object} pageObj
	 * @param {String} name
	 */
	constructor(pageObj, name = 'form') {
		if (!pageObj) throw new Error("pageObj必须是一个Page对象！");
		if (!name) throw new Error("name必须！");

		//基础组件事件
		pageObj.onFormPrevImage = pageObj.onFormPrevImage || this.onFormPrevImage.bind(this);
		pageObj.onFormCheckboxChange = pageObj.onFormCheckboxChange || this.onFormGroupChange.bind(this);
		pageObj.onFormRadioChange = pageObj.onFormRadioChange || this.onFormGroupChange.bind(this);
		pageObj.onFormSwitchChange = pageObj.onFormSwitchChange || this.onFormGroupChange.bind(this);
		pageObj.onFormSliderChange = pageObj.onFormSliderChange || this.onFormGroupChange.bind(this);
		pageObj.onFormDateChange = pageObj.onFormDateChange || this.onFormGroupChange.bind(this);
		pageObj.onFormRegionChange = pageObj.onFormRegionChange || this.onFormGroupChange.bind(this);
		pageObj.onFormBlur = pageObj.onFormBlur || this.onFormGroupChange.bind(this);

		//图片上传组件事件
		pageObj.onFormChooseImageTap = pageObj.onFormChooseImageTap || this.onFormChooseImageTap.bind(this);
		pageObj.onFormRemoveImageTap = pageObj.onFormRemoveImageTap || this.onFormRemoveImageTap.bind(this);
		pageObj.onFormPreviewImageTap = pageObj.onFormPreviewImageTap || this.onFormPreviewImageTap.bind(this);

		this.pageObj = pageObj;
		this.name = name;
		this.items = [];
	}

	/**
	 * 添加组件
	 * @param {String} title
	 * @param {String} name
	 * @param {String} type
	 * @param {any} value
	 * @param {Array,Object} options
	 * @return {Form}
	 */
	add(title, name, type, value = null, options = {}) {
		this.items.push(onPutHandler({ title, name, type, value, options }));
		return this;
	}

	/**
	 * 插入组件
	 * @param {Number} index
	 * @param {String} title
	 * @param {String} name
	 * @param {String} type
	 * @param {any} value
	 * @param {Array,Object} options
	 * @return {Form}
	 */
	insert(index, title, name, type, value = null, options = {}) {
		this.items.splice(index, 1, onPutHandler({ title, name, type, value, options }));
		return this;
	}

	/**
	 * 替换组件
	 * @param {Number} index
	 * @param {String} title
	 * @param {String} name
	 * @param {String} type
	 * @param {any} value
	 * @param {Array,Object} options
	 * @return {Form}
	 */
	set(index, title, name, type, value = null, options = {}) {
		this.items[index] = onPutHandler({ title, name, type, value, options });
	}

	/**
	 * 移除组件
	 * @param {Number} index
	 * @return {Form}
	 */
	remove(index) {
		this.items.splice(index, 1);
		return this;
	}

	/**
	 * 清空组件
	 * @param {Number} index
	 * @return {Form}
	 */
	clear() {
		this.items = [];
		return this;
	}

	/**
	 * 渲染组件
	 */
	render() {
		const info = {};
		info[this.name] = this.items;
		this.pageObj.setData(info);
	}

	/**
	 * 获取结果
	 * @return {Object}
	 */
	getValues() {
		const values = {};
		for (var i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			if (item.type == 'images') {
				const images = [];
				for (let i = 0; i < item.value.length; i++) {
					if (item.state[i]) {
						images.push(item.value[i]);
					}
				}
				values[item.name] = images;
			} else if (item.type == 'datetime') {
				values[item.name] = item.value.join(' ');
			} else {
				values[item.name] = item.value;
			}
		}
		return values;
	}

	/**
	 * 获取序列化后的结果
	 * @return {Object}
	 */
	getSerializeValues() {
		const values = {};
		for (var i = 0; i < this.items.length; i++) {
			const item = this.items[i];

			if (item.type == 'checkbox') {
				item.value = item.value || [];
				for (let i = 0; i < item.value.length; i++) {
					values[item.name + '[' + i + ']'] = item.value[i];
				}
			} else if (item.type == 'images') {
				for (let i = 0; i < item.value.length; i++) {
					if (item.state[i]) {
						values[item.name + '[' + i + ']'] = item.value[i];
					}
				}
			} else if (item.type == 'datetime') {
				values[item.name] = item.value.join(' ');
			} else {
				values[item.name] = item.value;
			}
		}

		return values;
	}

    /**
     * 根据组件名获取组件
     * @param {String}
     * @return {Object}
     */
	getControl(name) {
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i].name == name) return this.items[i];
		}
		return null;
	}

    /**
     * 图片预览
     * @param {Event}
     */
	onFormPrevImage(e) {
		const dataset = e.currentTarget.dataset, src = dataset.src;
		wx.previewImage({
			urls: [src],
		});
	}

    /**
     * 单选框/多选框数据被改变时
     * @param {Event}
     */
	onFormGroupChange(e) {
		const dataset = e.currentTarget.dataset, value = e.detail.value, name = e.currentTarget.id, refresh = dataset.refresh;

		const control = this.getControl(name);
		if (!control) return;

		if (control.type == 'datetime') {
			let type = dataset.type, datetime = control.value;
			if (type == 'date') datetime[0] = value;
			else datetime[1] = value;
		} else {
			control.value = isBoolean(value) ? (value ? 1 : 0) : value;
		}

		if (refresh) {
			this.render();
		}

		console.log(e, control);
	}

    /**
     * 选择图片
     *  @param {Event}
     */
	onFormChooseImageTap(e) {
		const dataset = e.currentTarget.dataset, name = e.currentTarget.id;
		const control = this.getControl(name);
		if (!control) return;

		dg.chooseImage({
			count: control.options.count - control.value.length,
			success: (res) => {
				console.log(res.tempFilePaths);
				const uploadImgs = res.tempFilePaths;
				const state = [];
				const uploader = (index) => {
					dg.showLoading("正在上传第" + (index + 1) + "张图片...");
					dg.uploadFile({
						url: API_HOST + '/index.php?s=/home/file/uploadPicture',
						filePath: uploadImgs[index],
						name: 'download',
						success: (res) => {
							res = JSON.parse(res.data);
							console.log(res);
							if (res.status == 1) {
								uploadImgs[index] = res.url;
								state.push(1);
							} else {
								state.push(0);
								dg.showToast(res.info);
							}
						},
						fail: (res) => {
							state.push(0);
							if (res.statusCode == 11) {
								dg.showToast('文件不存在！');
							} else if (res.statusCode == 13) {
								dg.showToast('没有权限！');
							}
						},
						complete: () => {
							//判断是否上传完毕
							if (index >= uploadImgs.length - 1) {
								control.value = control.value.concat(res.tempFilePaths);
								control.state = control.state.concat(state);
								this.render();
							} else {
								uploader(index + 1);
							}
							dg.hideLoading();
						}
					});
				};
				uploader(0);


			},
		});
	}

    /**
     * 移除图片
     * @param {Event}
     */
	onFormRemoveImageTap(e) {
		const dataset = e.currentTarget.dataset, name = dataset.name, index = dataset.index;
		dg.confirm('你确定要移除这张图片吗？', (res) => {
			if (!res.confirm) return;

			const control = this.getControl(name);
			if (!control) return;
			control.value.splice(index, 1);

			this.render();
		}, '温馨提示');
	}

    /**
     * 查看图片
     * @param {Event}
     */
	onFormPreviewImageTap(e) {
		const dataset = e.currentTarget.dataset, name = dataset.name, index = dataset.index;
		const control = this.getControl(name);
		if (!control) return;
		dg.previewImage({
			current: control.value[index],
			urls: control.value,
		});
	}

}