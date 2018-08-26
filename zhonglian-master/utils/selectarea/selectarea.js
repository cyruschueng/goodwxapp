"use strict";
import CityData from "../city-data";
import _ from "../underscore";
import listener from "../listener";

const SelectArea = (function () {
	/**
	 * 城市数据
	 * @type {Array}
	 */
	let data = [];

	/**
	 * 结果
	 * @type {Object}
	 */
	const result = {};

	/**
	 * 目标器
	 * @type {Object}
	 */
	let target;

	/**
	 * 基础key
	 * @type {string}
	 */
	const key = "selectArea" + new Date().getTime();


	/**
	 * 默认构造器
	 * @constructor
	 */
	function SelectArea() {
		data = _.clone(CityData);
	}

	/**
	 * 根据pid获取城市列表
	 * @param pid
	 */
	function getListByPid(pid) {
		const result = [];
		if (!(pid instanceof Number)) pid = parseInt(pid);

		_.each(data, function (item) {
			if (item.pid === pid) {
				addDot(item);
				result.push(item);
			}
		});
		return result;
	}

	/**
	 * 字符长度截取
	 * @param {Object} item
	 */
	function addDot(item) {
		if (item.name.length > 4) {
			item.nameDot = item.name.slice(0, 4) + '...';
			return item;
		} else {
			item.nameDot = item.name;
			return item;
		}
	}

	/**
	 * 设置为活动
	 * @param {Array} data
	 * @param {Number} index
	 */
	function setActive(data, index) {
		if (!(index instanceof Number)) index = parseInt(index);
		_.each(data, function (item, itemIndex) {
			item.active = itemIndex === index;
		});
	}

	/**
	 * 省份改变了
	 * @param {Object} item
	 */
	function onProvinceChange(item) {
		result.province = item.name;

		//加载城市数据
		const cityData = getListByPid(item.id);
		cityData[0].active = true;
		listener.fireEventListener(key + ".city.change", [cityData[0]]);
		target.setData({cityData: cityData,});
	}

	/**
	 * 城市改变了
	 * @param {Object} item
	 */
	function onCityChange(item) {
		result.city = item.name;

		//加载区域数据
		const districtData = getListByPid(item.id);
		districtData[0].active = true;
		listener.fireEventListener(key + ".district.change", [districtData[0]]);
		target.setData({districtData: districtData,});
	}

	/**
	 * 区域改变了
	 * @param {Object} item
	 */
	function onDistrictChange(item) {
		result.district = item.name;
	}

	/**
	 * 开始加载数据
	 * @param {Object} targetTmp
	 * @param {Object} options
	 */
	SelectArea.prototype.load = function (targetTmp, options) {
		this.options = _.extend({}, options || {});
		target = targetTmp;

		//加载省份数据
		const provinceData = getListByPid(1);
		console.log(provinceData);
		result.province = provinceData[0].name;
		provinceData[0].active = true;
		listener.fireEventListener(key + ".province.change", [provinceData[0]]);
		target.setData({provinceData: provinceData,});

		/**
		 * 显示区域选择
		 */
		target.onAreaShowTap = function (e) {
			this.setData({isAreaShow: true});
		};

		/**
		 * 点击省份区域选择
		 */
		target.onProvinceTap = function (e) {
			const dataset = e.currentTarget.dataset, index = dataset.index;

			setActive(this.data.provinceData, index);
			const item = this.data.provinceData[index];
			listener.fireEventListener(key + ".province.change", [item]);

			this.setData({provinceData: this.data.provinceData});
		};

		/**
		 * 点击城市区域选择
		 */
		target.onCityTap = function (e) {
			const dataset = e.currentTarget.dataset, index = dataset.index;

			setActive(this.data.cityData, index);
			const item = this.data.cityData[index];
			listener.fireEventListener(key + ".city.change", [item]);

			this.setData({cityData: this.data.cityData});
		};

		/**
		 * 点击城镇区域选择
		 */
		target.onDistrictTap = function (e) {
			const dataset = e.currentTarget.dataset, index = dataset.index;

			setActive(this.data.districtData, index);
			const item = this.data.districtData[index];
			listener.fireEventListener(key + ".district.change", [item]);

			this.setData({districtData: this.data.districtData});
		};

		/**
		 * 确认地址选择
		 */
		target.onAreaConfirmTap = function () {
			this.setData({isAreaShow: false});
		};
	};

	/**
	 * 获取结果
	 * @return {Object}
	 */
	SelectArea.prototype.getResult = function () {
		return result;
	};

	/**
	 * 销毁组件释放资源
	 * @return {Object}
	 */
	SelectArea.prototype.destroy = function () {
		listener.removeEventListener(key + ".province.change", onProvinceChange);
		listener.removeEventListener(key + ".city.change", onCityChange);
		listener.removeEventListener(key + ".district.change", onDistrictChange);
	};

	listener.addEventListener(key + ".province.change", onProvinceChange);
	listener.addEventListener(key + ".city.change", onCityChange);
	listener.addEventListener(key + ".district.change", onDistrictChange);

	return SelectArea;
}());
module.exports = SelectArea;